import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { curatedPlaces } from '../data/curatedPlaces';
import { findMapLocation, findNearbyPlaces, googleDirectionsUrl, mergeCuratedPlaces } from '../services/openMap';
import type { Coordinates, ExploreMode, ExplorePlaceResult, PlaceCategory, PlaceSearchCenter } from '../types/explore';
import './PlacesRoutesPage.css';

const ExploreMap = lazy(() => import('../components/ExploreMap'));

const categories: PlaceCategory[] = [
  'All',
  'Attractions',
  'Beaches',
  'Nature',
  'Historical places',
  'Restaurants & cafes',
  'Outdoor activities',
];
const radiiKm = [5, 10, 20, 50];
const sriLankaCenter = { lat: 7.8731, lng: 80.7718 };
const SHOW_ROUTE_FINDING = false;

const toRadians = (value: number) => (value * Math.PI) / 180;

const distanceKm = (a: Coordinates, b: Coordinates) => {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const haversine =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.lat)) * Math.cos(toRadians(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
};

const PlacesRoutesPage = () => {
  const [mode, setMode] = useState<ExploreMode>('nearby');
  const [locationQuery, setLocationQuery] = useState('');
  const [category, setCategory] = useState<PlaceCategory>('All');
  const [radiusKm, setRadiusKm] = useState(20);
  const [routeOrigin, setRouteOrigin] = useState('');
  const [routeDestination, setRouteDestination] = useState('');
  const [routeError, setRouteError] = useState('');
  const [center, setCenter] = useState<PlaceSearchCenter>({ ...sriLankaCenter, label: 'Sri Lanka' });
  const [hasSearchCenter, setHasSearchCenter] = useState(false);
  const [results, setResults] = useState<ExplorePlaceResult[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');
  const requestId = useRef(0);
  const controllerRef = useRef<AbortController | null>(null);

  const selectedPlace = useMemo(
    () => results.find((place) => place.id === selectedPlaceId) ?? results[0] ?? null,
    [results, selectedPlaceId],
  );

  useEffect(
    () => () => {
      requestId.current += 1;
      controllerRef.current?.abort();
    },
    [],
  );

  const beginRequest = () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    const id = requestId.current + 1;
    requestId.current = id;
    controllerRef.current = controller;
    setLoading(true);
    setError('');
    setHasSearched(true);
    return { controller, id };
  };

  const loadNearbyPlaces = async (searchCenter: PlaceSearchCenter, controller: AbortController, id: number) => {
    try {
      const externalPlaces = await findNearbyPlaces(searchCenter, radiusKm, category, controller.signal);
      if (requestId.current !== id) return;

      const curatedMatches = curatedPlaces.filter(
        (place) =>
          (category === 'All' || place.category === category) &&
          distanceKm(searchCenter, place.coordinates) <= radiusKm,
      );
      const merged = mergeCuratedPlaces(
        externalPlaces,
        curatedMatches,
        (coordinates) => distanceKm(searchCenter, coordinates),
      );

      setCenter(searchCenter);
      setHasSearchCenter(true);
      setResults(merged);
      setSelectedPlaceId(merged[0]?.id ?? null);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
      if (requestId.current !== id) return;

      const curatedMatches = curatedPlaces
        .filter(
          (place) =>
            (category === 'All' || place.category === category) &&
            distanceKm(searchCenter, place.coordinates) <= radiusKm,
        )
        .map((place) => ({
          ...place,
          distanceKm: distanceKm(searchCenter, place.coordinates),
        }))
        .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));

      setCenter(searchCenter);
      setHasSearchCenter(true);
      setResults(curatedMatches);
      setSelectedPlaceId(curatedMatches[0]?.id ?? null);
      setError(
        curatedMatches.length
          ? 'OpenStreetMap place search is temporarily unavailable. Showing South Road Trips recommendations instead.'
          : requestError instanceof Error
            ? requestError.message
            : 'Place search failed. Please retry.',
      );
    } finally {
      if (requestId.current === id) setLoading(false);
    }
  };

  const handleNearbySearch = async () => {
    if (!locationQuery.trim()) {
      controllerRef.current?.abort();
      requestId.current += 1;
      setLoading(false);
      setError('Enter a city, town, or place in Sri Lanka to search nearby.');
      setHasSearched(true);
      setResults([]);
      return;
    }

    const { controller, id } = beginRequest();
    try {
      const foundLocation = await findMapLocation(locationQuery.trim(), controller.signal);
      if (requestId.current !== id) return;
      if (!foundLocation) {
        setResults([]);
        setError('We could not find that location in Sri Lanka. Check the spelling or try a nearby town.');
        setCenter({ ...sriLankaCenter, label: 'Sri Lanka' });
        setHasSearchCenter(false);
        return;
      }

      await loadNearbyPlaces(foundLocation, controller, id);
    } catch (requestError) {
      if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
      if (requestId.current !== id) return;
      setResults([]);
      setError(requestError instanceof Error ? requestError.message : 'Location search failed. Please retry.');
    } finally {
      if (requestId.current === id) setLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('This browser does not support location access. You can search by entering a location instead.');
      setHasSearched(true);
      return;
    }

    const { controller, id } = beginRequest();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (requestId.current !== id || controller.signal.aborted) return;
        const searchCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: 'Your location',
        };
        void loadNearbyPlaces(searchCenter, controller, id);
      },
      (positionError) => {
        if (requestId.current !== id) return;
        setLoading(false);
        setHasSearched(true);
        setError(
          positionError.code === positionError.PERMISSION_DENIED
            ? 'Location permission was denied. You can still search by manually entering a place name.'
            : positionError.code === positionError.TIMEOUT
              ? 'The location request timed out. Try again or enter a location manually.'
              : 'Your current location could not be determined. Try a manual location search.',
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  };

  const changeMode = (nextMode: ExploreMode) => {
    controllerRef.current?.abort();
    requestId.current += 1;
    setMode(nextMode);
    setResults([]);
    setSelectedPlaceId(null);
    setError('');
    setRouteError('');
    setLoading(false);
    setHasSearched(false);
  };

  const routeHref =
    routeOrigin.trim() && routeDestination.trim()
      ? googleDirectionsUrl(routeOrigin.trim(), routeDestination.trim())
      : null;

  return (
    <>
      <Helmet>
        <title>Places / Routes | South Road Trips</title>
        <meta
          name="description"
          content="Explore nearby attractions and plan journeys across Sri Lanka with South Road Trips."
        />
      </Helmet>

      <div className="explore-page">
        <div className="explore-hero">
          <div>
            <p className="eyebrow">Travel planning</p>
            <h1>Explore Sri Lanka</h1>
          </div>
          <p className="hero-copy">
            Find nearby places from OpenStreetMap and browse South Road Trips recommendations, or open your journey in Google Maps.
          </p>
        </div>

        <div className="explore-controls">
          <div className="mode-tabs" role="tablist" aria-label="Search mode selector">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'nearby'}
              className={mode === 'nearby' ? 'mode-tab active' : 'mode-tab'}
              onClick={() => changeMode('nearby')}
            >
              Nearby Places
            </button>
            {SHOW_ROUTE_FINDING ? (
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'route'}
                className={mode === 'route' ? 'mode-tab active' : 'mode-tab'}
                onClick={() => changeMode('route')}
              >
                Places Along a Route
              </button>
            ) : null}
          </div>

          {mode === 'nearby' || !SHOW_ROUTE_FINDING ? (
            <form
              className="search-panel"
              onSubmit={(event) => {
                event.preventDefault();
                void handleNearbySearch();
              }}
            >
              <label className="field-label" htmlFor="nearby-location">
                Location in Sri Lanka
              </label>
              <div className="input-row">
                <input
                  id="nearby-location"
                  value={locationQuery}
                  onChange={(event) => setLocationQuery(event.target.value)}
                  placeholder="Enter a city, town, or landmark"
                  disabled={loading}
                />
                <button type="button" className="secondary-button" onClick={handleUseMyLocation} disabled={loading}>
                  Use My Location
                </button>
              </div>

              <div className="filter-row">
                <div className="filter-group">
                  <label htmlFor="nearby-radius">Search radius (straight-line distance)</label>
                  <select id="nearby-radius" value={radiusKm} onChange={(event) => setRadiusKm(Number(event.target.value))} disabled={loading}>
                    {radiiKm.map((value) => (
                      <option key={value} value={value}>
                        {value} km
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter-group">
                  <label htmlFor="nearby-category">Category</label>
                  <select id="nearby-category" value={category} onChange={(event) => setCategory(event.target.value as PlaceCategory)} disabled={loading}>
                    {categories.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="button-row">
                <button type="submit" className="primary-button" disabled={loading}>
                  {loading ? 'Searching…' : 'Search nearby places'}
                </button>
                <button
                  type="button"
                  className="link-button"
                  disabled={loading}
                  onClick={() => {
                    setCategory('All');
                    setRadiusKm(20);
                    setResults([]);
                    setSelectedPlaceId(null);
                    setHasSearched(false);
                  }}
                >
                  Reset filters
                </button>
              </div>
              <p className="search-hint">
                Search runs only when submitted. Manual queries go to OpenStreetMap Nominatim; current coordinates are sent to Overpass
                only after you choose Use My Location. Location permission is optional.
              </p>
            </form>
          ) : (
            <div className="search-panel">
              <div className="route-grid">
                <div>
                  <label className="field-label" htmlFor="route-origin">Starting point</label>
                  <input
                    id="route-origin"
                    value={routeOrigin}
                    onChange={(event) => {
                      setRouteOrigin(event.target.value);
                      setRouteError('');
                    }}
                    placeholder="Origin"
                  />
                </div>
                <div>
                  <label className="field-label" htmlFor="route-destination">Destination</label>
                  <input
                    id="route-destination"
                    value={routeDestination}
                    onChange={(event) => {
                      setRouteDestination(event.target.value);
                      setRouteError('');
                    }}
                    placeholder="Destination"
                  />
                </div>
              </div>
              <div className="route-info">
                <p>
                  Route calculation is not provided on this page. Open the entered locations in Google Maps to see available directions.
                </p>
                {routeHref ? (
                  <a className="primary-button route-link" href={routeHref} target="_blank" rel="noopener noreferrer">
                    Open directions in Google Maps
                  </a>
                ) : (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => setRouteError('Enter both a starting point and destination to open directions.')}
                  >
                    Open directions in Google Maps
                  </button>
                )}
                {routeError ? <p className="route-error" role="alert">{routeError}</p> : null}
              </div>
            </div>
          )}
        </div>

        {error ? <div className="status-banner" role="alert">{error}</div> : null}

        <div className="content-grid">
          <aside className="results-panel" aria-live="polite">
            <div className="panel-header">
              <h2>Nearby results</h2>
              {loading ? <span className="loading-pill">Loading places…</span> : null}
            </div>

            {!results.length && !error && !loading ? (
              <p className="empty-state">
                {hasSearched
                  ? 'No places found in that radius and category. Try a wider radius or another location.'
                  : mode === 'nearby'
                    ? 'Search a location to discover attractions, beaches, nature, history, food, and outdoor activities.'
                    : 'Route directions open externally. Switch to Nearby Places to search attractions around a location.'}
              </p>
            ) : null}

            <div className="results-list">
              {results.map((place, index) => (
                <button
                  type="button"
                  key={place.id}
                  className={selectedPlace?.id === place.id ? 'result-card active' : 'result-card'}
                  onClick={() => setSelectedPlaceId(place.id)}
                  aria-pressed={selectedPlace?.id === place.id}
                >
                  <div className="result-header">
                    <div>
                      <p className="result-category">{place.category}</p>
                      <h3>{index + 1}. {place.name}</h3>
                    </div>
                    {place.distanceKm !== undefined ? <span>{place.distanceKm.toFixed(1)} km</span> : null}
                  </div>
                  {place.description ? <p className="result-description">{place.description}</p> : null}
                  <div className="result-meta">
                    <span>{place.area ?? 'Sri Lanka'}</span>
                    <span>{place.source}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="detail-panel">
            <div className="map-header">
              <h2>Map overview</h2>
              <span className="live-map-badge">OpenStreetMap</span>
            </div>

            <div className="map-frame">
              <Suspense fallback={<p className="map-loading">Loading map…</p>}>
                <ExploreMap
                  center={center}
                  results={results}
                  selectedPlaceId={selectedPlace?.id ?? null}
                  onSelectPlace={setSelectedPlaceId}
                  radiusKm={radiusKm}
                  mode={mode}
                  showSearchRadius={hasSearchCenter}
                />
              </Suspense>
            </div>
            <p className="map-attribution">
              Map data &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>.
              Place data from OpenStreetMap; South Road Trips recommendations are editorial content.
            </p>

            <div className="detail-card">
              {selectedPlace ? (
                <>
                  <div className="detail-header">
                    <div>
                      <p className="result-category">{selectedPlace.category}</p>
                      <h3>{selectedPlace.name}</h3>
                    </div>
                    {selectedPlace.osmUrl ? (
                      <a href={selectedPlace.osmUrl} target="_blank" rel="noreferrer" className="maps-link">
                        View OpenStreetMap record
                      </a>
                    ) : null}
                  </div>
                  {selectedPlace.description ? <p>{selectedPlace.description}</p> : null}
                  {selectedPlace.area ? <p className="detail-location">Location: {selectedPlace.area}</p> : null}
                  <p className="detail-source">{selectedPlace.source}</p>
                  <div className="detail-links">
                    {selectedPlace.link ? <a href={selectedPlace.link}>Related South Road Trips content</a> : null}
                    <a href="/#tours">Explore South Road Trips tours</a>
                    <a href="/#vehicles">Explore vehicle rentals</a>
                    <a
                      href={`https://wa.me/94764549169?text=${encodeURIComponent(`Hi South Road Trips! I’m interested in visiting ${selectedPlace.name}. Can you help me plan?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ask about booking on WhatsApp
                    </a>
                    {selectedPlace.area ? (
                      <a
                        href={googleDirectionsUrl(`${center.lat},${center.lng}`, `${selectedPlace.name}, ${selectedPlace.area}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Directions in Google Maps
                      </a>
                    ) : null}
                  </div>
                </>
              ) : (
                <p className="empty-state">Select a result to view its details here.</p>
              )}
            </div>

            <p className="maps-note">
              Nominatim permits at most 1 request per second for the whole website and does not allow autocomplete; this browser cannot
              enforce that aggregate limit across all visitors. Public map tiles and Overpass are shared community services without an
              availability guarantee. Higher traffic requires self-hosted or dedicated services.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PlacesRoutesPage;
