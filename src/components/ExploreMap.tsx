import { useEffect } from 'react';
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import L, { type LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Coordinates, ExplorePlaceResult, ExploreMode } from '../types/explore';

interface ExploreMapProps {
  center: Coordinates;
  results: ExplorePlaceResult[];
  selectedPlaceId: string | null;
  onSelectPlace: (id: string) => void;
  radiusKm: number;
  mode: ExploreMode;
  showSearchRadius: boolean;
}

const MarkerIcon = (number: number, selected: boolean) =>
  L.divIcon({
    className: 'explore-marker-wrapper',
    html: `<span class="explore-marker${selected ? ' selected' : ''}">${number}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

const FitResults = ({ results }: { results: ExplorePlaceResult[] }) => {
  const map = useMap();

  useEffect(() => {
    if (results.length === 1) {
      map.setView([results[0].coordinates.lat, results[0].coordinates.lng], 13);
    } else if (results.length > 1) {
      const bounds: LatLngBoundsExpression = results.map((place) => [
        place.coordinates.lat,
        place.coordinates.lng,
      ]);
      map.fitBounds(bounds, { padding: [36, 36], maxZoom: 13 });
    }
  }, [map, results]);

  return null;
};

const CenterMap = ({ center, selectedPlaceId, results }: {
  center: Coordinates;
  selectedPlaceId: string | null;
  results: ExplorePlaceResult[];
}) => {
  const map = useMap();

  useEffect(() => {
    const selected = results.find((place) => place.id === selectedPlaceId);
    if (selected) {
      map.panTo([selected.coordinates.lat, selected.coordinates.lng]);
    } else if (!results.length) {
      map.setView([center.lat, center.lng], 8);
    }
  }, [center, map, results, selectedPlaceId]);

  return null;
};

const ExploreMap = ({
  center,
  results,
  selectedPlaceId,
  onSelectPlace,
  radiusKm,
  mode,
  showSearchRadius,
}: ExploreMapProps) => (
  <MapContainer
    center={[center.lat, center.lng]}
    zoom={8}
    scrollWheelZoom={false}
    className="leaflet-map"
    aria-label="Map of places in Sri Lanka"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <CenterMap center={center} selectedPlaceId={selectedPlaceId} results={results} />
    <FitResults results={results} />
    {mode === 'nearby' && showSearchRadius ? (
      <>
        <Circle
          center={[center.lat, center.lng]}
          radius={radiusKm * 1000}
          pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.08, weight: 2 }}
        />
        <Marker
          position={[center.lat, center.lng]}
          icon={L.divIcon({
            className: 'explore-center-wrapper',
            html: '<span class="explore-center-marker" aria-label="Search center"></span>',
            iconSize: [18, 18],
            iconAnchor: [9, 9],
          })}
        />
      </>
    ) : null}
    {results.map((place, index) => (
      <Marker
        key={place.id}
        position={[place.coordinates.lat, place.coordinates.lng]}
        icon={MarkerIcon(index + 1, selectedPlaceId === place.id)}
        eventHandlers={{ click: () => onSelectPlace(place.id) }}
      >
        <Popup>
          <strong>{place.name}</strong>
          <br />
          {place.category}
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default ExploreMap;
