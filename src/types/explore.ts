export type ExploreMode = 'nearby' | 'route';

export type PlaceCategory =
  | 'All'
  | 'Attractions'
  | 'Beaches'
  | 'Nature'
  | 'Historical places'
  | 'Restaurants & cafes'
  | 'Outdoor activities';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CuratedPlace {
  id: string;
  name: string;
  category: Exclude<PlaceCategory, 'All'>;
  description?: string;
  area?: string;
  coordinates: Coordinates;
  link?: string;
  image?: string;
  relatedUrl?: string;
  source: 'South Road Trips';
}

export interface ExplorePlaceResult {
  id: string;
  name: string;
  category: Exclude<PlaceCategory, 'All'>;
  description?: string;
  area?: string;
  coordinates: Coordinates;
  link?: string;
  image?: string;
  source: 'South Road Trips' | 'OpenStreetMap' | 'South Road Trips + OpenStreetMap';
  distanceKm?: number;
  osmUrl?: string;
}

export interface PlaceSearchCenter extends Coordinates {
  label: string;
}

export interface OpenMapPlace {
  id: string;
  name: string;
  category: Exclude<PlaceCategory, 'All'>;
  area?: string;
  coordinates: Coordinates;
  osmUrl: string;
  source: 'OpenStreetMap';
}
