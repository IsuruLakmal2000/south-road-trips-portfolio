import type { Coordinates, CuratedPlace, ExplorePlaceResult, OpenMapPlace, PlaceCategory } from '../types/explore';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
let lastNominatimRequestAt = 0;

interface NominatimResult {
  lat?: string;
  lon?: string;
  display_name?: string;
}

interface OverpassElement {
  type?: string;
  id?: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements?: OverpassElement[];
}

const categoryExpressions: Record<Exclude<PlaceCategory, 'All'>, string[]> = {
  Attractions: [
    '["tourism"~"^(attraction|viewpoint|zoo|aquarium|theme_park)$"]',
  ],
  Beaches: [
    '["natural"="beach"]',
    '["leisure"="beach_resort"]',
  ],
  Nature: [
    '["leisure"~"^(nature_reserve|park)$"]',
    '["natural"~"^(wood|water|wetland|peak|waterfall|cave_entrance)$"]',
  ],
  'Historical places': [
    '["historic"]',
    '["tourism"="museum"]',
  ],
  'Restaurants & cafes': [
    '["amenity"~"^(restaurant|cafe|fast_food)$"]',
  ],
  'Outdoor activities': [
    '["leisure"~"^(sports_centre|stadium|water_park|marina)$"]',
    '["sport"]',
    '["tourism"~"^(camp_site|adventure)$"]',
  ],
};
const allCategoryExpressions = [
  '["tourism"~"^(attraction|viewpoint|zoo|aquarium|theme_park|museum|camp_site|adventure)$"]',
  '["natural"~"^(beach|wood|water|wetland|peak|waterfall|cave_entrance)$"]',
  '["leisure"~"^(beach_resort|nature_reserve|park|sports_centre|stadium|water_park|marina)$"]',
  '["historic"]',
  '["amenity"~"^(restaurant|cafe|fast_food)$"]',
  '["sport"]',
];

const getCategory = (tags: Record<string, string>): Exclude<PlaceCategory, 'All'> | null => {
  if (['restaurant', 'cafe', 'fast_food'].includes(tags.amenity ?? '')) return 'Restaurants & cafes';
  if (tags.natural === 'beach' || tags.leisure === 'beach_resort') return 'Beaches';
  if (tags.historic || tags.tourism === 'museum') return 'Historical places';
  if (
    ['nature_reserve', 'park'].includes(tags.leisure ?? '') ||
    ['wood', 'water', 'wetland', 'peak', 'waterfall', 'cave_entrance'].includes(tags.natural ?? '')
  ) {
    return 'Nature';
  }
  if (
    tags.sport ||
    ['sports_centre', 'stadium', 'water_park', 'marina'].includes(tags.leisure ?? '') ||
    ['camp_site', 'adventure'].includes(tags.tourism ?? '')
  ) {
    return 'Outdoor activities';
  }
  if (['attraction', 'viewpoint', 'zoo', 'aquarium', 'theme_park'].includes(tags.tourism ?? '')) {
    return 'Attractions';
  }
  return null;
};

const getPlaceArea = (tags: Record<string, string>) =>
  tags['addr:suburb'] ?? tags['addr:city'] ?? tags['addr:town'] ?? tags['addr:village'] ?? tags['addr:county'];

const fetchWithTimeout = async (
  url: string,
  init: RequestInit,
  signal: AbortSignal,
  timeoutMs: number,
  timeoutMessage: string,
) => {
  const controller = new AbortController();
  let timedOut = false;
  const abortRequest = () => controller.abort();
  if (signal.aborted) {
    controller.abort();
  } else {
    signal.addEventListener('abort', abortRequest, { once: true });
  }

  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (requestError) {
    if (timedOut) throw new Error(timeoutMessage);
    throw requestError;
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener('abort', abortRequest);
  }
};

const waitForNominatimSlot = (signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('The request was aborted.', 'AbortError'));
      return;
    }

    const delay = Math.max(0, 1000 - (Date.now() - lastNominatimRequestAt));
    const startRequest = () => {
      lastNominatimRequestAt = Date.now();
      signal.removeEventListener('abort', abortRequest);
      resolve();
    };
    const timer = setTimeout(startRequest, delay);
    const abortRequest = () => {
      clearTimeout(timer);
      reject(new DOMException('The request was aborted.', 'AbortError'));
    };
    signal.addEventListener('abort', abortRequest, { once: true });
  });

export const findMapLocation = async (query: string, signal: AbortSignal) => {
  await waitForNominatimSlot(signal);
  const params = new URLSearchParams({
    format: 'jsonv2',
    q: query,
    countrycodes: 'lk',
    limit: '1',
  });
  const response = await fetchWithTimeout(
    `${NOMINATIM_URL}?${params.toString()}`,
    {
      referrerPolicy: 'strict-origin-when-cross-origin',
      headers: { 'Accept-Language': 'en' },
    },
    signal,
    12000,
    'OpenStreetMap location search timed out. Please try again.',
  );

  if (!response.ok) {
    throw new Error(
      response.status === 429
        ? 'The OpenStreetMap location search is rate-limited. Please wait a moment and try again.'
        : `Location search failed (HTTP ${response.status}). Please retry later.`,
    );
  }

  const matches = (await response.json()) as NominatimResult[];
  const first = matches[0];
  const lat = Number(first?.lat);
  const lng = Number(first?.lon);

  if (!first || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return {
    lat,
    lng,
    label: first.display_name?.split(',').slice(0, 2).join(',') ?? query,
  };
};

const buildOverpassQuery = (center: Coordinates, radiusKm: number, category: PlaceCategory) => {
  const radiusMeters = Math.round(radiusKm * 1000);
  const expressions = category === 'All' ? allCategoryExpressions : categoryExpressions[category];
  const clauses = expressions.map(
    (expression) => `nwr(around:${radiusMeters},${center.lat},${center.lng})${expression};`,
  );

  return `[out:json][timeout:25];(${clauses.join('')});out center tags 100;`;
};

export const findNearbyPlaces = async (
  center: Coordinates,
  radiusKm: number,
  category: PlaceCategory,
  signal: AbortSignal,
): Promise<OpenMapPlace[]> => {
  const query = buildOverpassQuery(center, radiusKm, category);
  const response = await fetchWithTimeout(
    OVERPASS_URL,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: new URLSearchParams({ data: query }),
    },
    signal,
    20000,
    'OpenStreetMap place search timed out. Try a smaller radius or retry later.',
  );

  if (!response.ok) {
    throw new Error(
      response.status === 429 || response.status === 504
        ? 'The public OpenStreetMap places service is busy. Please wait and try again.'
        : `Place search failed (HTTP ${response.status}). Please retry later.`,
    );
  }

  const data = (await response.json()) as OverpassResponse;
  const places = (data.elements ?? []).flatMap((element): OpenMapPlace[] => {
    const tags = element.tags ?? {};
    const name = tags.name ?? tags['name:en'] ?? tags.official_name;
    const coordinates =
      element.center && Number.isFinite(element.center.lat) && Number.isFinite(element.center.lon)
        ? { lat: element.center.lat, lng: element.center.lon }
        : Number.isFinite(element.lat) && Number.isFinite(element.lon)
          ? { lat: element.lat as number, lng: element.lon as number }
          : undefined;
    const category = getCategory(tags);

    if (!name || !coordinates || !category || !element.type || element.id === undefined) {
      return [];
    }

    return [{
      id: `osm-${element.type}-${element.id}`,
      name,
      category,
      area: getPlaceArea(tags),
      coordinates,
      osmUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
      source: 'OpenStreetMap',
    }];
  });

  return deduplicateOpenMapPlaces(places);
};

const normalizeName = (value: string) => value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

const distanceKm = (a: Coordinates, b: Coordinates) => {
  const radians = (value: number) => (value * Math.PI) / 180;
  const dLat = radians(b.lat - a.lat);
  const dLng = radians(b.lng - a.lng);
  const haversine =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
};

export const deduplicateOpenMapPlaces = (places: OpenMapPlace[]) => {
  const deduplicated: OpenMapPlace[] = [];

  for (const place of places) {
    const duplicate = deduplicated.some(
      (existing) =>
        normalizeName(existing.name) === normalizeName(place.name) &&
        distanceKm(existing.coordinates, place.coordinates) <= 0.1,
    );
    if (!duplicate) deduplicated.push(place);
  }

  return deduplicated;
};

export const mergeCuratedPlaces = (
  externalPlaces: OpenMapPlace[],
  curatedPlaces: CuratedPlace[],
  distanceFromCenter: (coordinates: Coordinates) => number,
) : ExplorePlaceResult[] => {
  const curatedMatches = curatedPlaces.map((place) => ({
    ...place,
    source: 'South Road Trips' as const,
    distanceKm: distanceFromCenter(place.coordinates),
  }));

  const externalMatches = externalPlaces.map((place) => {
    const matchingCurated = curatedMatches.find(
      (curated) =>
        normalizeName(curated.name) === normalizeName(place.name) &&
        distanceKm(curated.coordinates, place.coordinates) <= 0.25,
    );

    if (matchingCurated) {
      return {
        ...matchingCurated,
        id: matchingCurated.id,
        source: 'South Road Trips + OpenStreetMap' as const,
        osmUrl: place.osmUrl,
        distanceKm: distanceFromCenter(matchingCurated.coordinates),
      };
    }

    return {
      ...place,
      distanceKm: distanceFromCenter(place.coordinates),
    };
  });

  const mergedCurated = curatedMatches.filter(
    (place) =>
      !externalMatches.some((external) => external.id === place.id && external.source === 'South Road Trips + OpenStreetMap'),
  );

  return [...externalMatches, ...mergedCurated]
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
};

export const googleDirectionsUrl = (origin: string, destination: string) => {
  const params = new URLSearchParams({ api: '1', origin, destination });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
};
