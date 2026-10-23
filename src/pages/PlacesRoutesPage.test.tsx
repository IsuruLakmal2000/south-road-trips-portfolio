import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/header';
import PlacesRoutesPage from './PlacesRoutesPage';

vi.mock('../components/ExploreMap', () => ({
  default: ({
    results,
    onSelectPlace,
  }: {
    results: Array<{ id: string; name: string }>;
    onSelectPlace: (id: string) => void;
  }) => (
    <div data-testid="explore-map">
      {results.map((place) => (
        <button key={place.id} type="button" onClick={() => onSelectPlace(place.id)}>
          Map marker: {place.name}
        </button>
      ))}
    </div>
  ),
}));

const mockFetch = vi.fn();

const renderPage = () =>
  render(
    <BrowserRouter>
      <PlacesRoutesPage />
    </BrowserRouter>,
  );

describe('PlacesRoutesPage', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockImplementation(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('nominatim.openstreetmap.org')) {
        return {
          ok: true,
          json: async () => [{ lat: '6.0325', lon: '80.2168', display_name: 'Galle Fort, Galle, Sri Lanka' }],
        };
      }

      return {
        ok: true,
        json: async () => ({
          elements: [
            {
              type: 'way',
              id: 123,
              center: { lat: 6.0325, lon: 80.2168 },
              tags: { name: 'Galle Fort', historic: 'fort' },
            },
            {
              type: 'node',
              id: 456,
              lat: 6.034,
              lon: 80.218,
              tags: { name: 'Local Museum', tourism: 'museum' },
            },
          ],
        }),
      };
    });
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the Places / Routes modes and OpenStreetMap attribution', () => {
    renderPage();

    expect(screen.getByRole('heading', { name: /explore sri lanka/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /^nearby places$/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.queryByRole('tab', { name: /^places along a route$/i })).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/starting point|destination/i)).not.toBeInTheDocument();
    expect(screen.getByText(/OpenStreetMap contributors/i)).toBeInTheDocument();
  });

  it('keeps the exact Places / Routes navigation link', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link', { name: 'Places / Routes' })).toHaveAttribute('href', '/places-routes');
  });

  it('geocodes a manual location and applies selected radius and category to the OSM query', async () => {
    renderPage();

    fireEvent.change(screen.getByLabelText(/location in sri lanka/i), { target: { value: 'Galle' } });
    fireEvent.change(screen.getByLabelText(/search radius/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Historical places' } });
    fireEvent.click(screen.getByRole('button', { name: /search nearby places/i }));

    expect(await screen.findByRole('heading', { name: 'Galle Fort' })).toBeInTheDocument();
    expect(screen.getAllByText(/South Road Trips \+ OpenStreetMap/i)).not.toHaveLength(0);

    const overpassCall = mockFetch.mock.calls.find(([url]) => String(url).includes('overpass-api.de'));
    expect(overpassCall).toBeDefined();
    const request = overpassCall?.[1] as RequestInit;
    expect(String(request.body)).toContain('around%3A5000');
    expect(String(request.body)).toContain('historic');
  });

  it('synchronizes list selection with map marker selection', async () => {
    renderPage();
    fireEvent.change(screen.getByLabelText(/location in sri lanka/i), { target: { value: 'Galle' } });
    fireEvent.click(screen.getByRole('button', { name: /search nearby places/i }));
    await screen.findByRole('heading', { name: 'Galle Fort' });

    fireEvent.click(screen.getByRole('button', { name: /map marker: local museum/i }));
    expect(screen.getByRole('heading', { name: 'Local Museum' })).toBeInTheDocument();
  });

  it('keeps location optional and explains permission denial', () => {
    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: (_success: PositionCallback, failure: PositionErrorCallback) =>
          failure({ code: 1, message: 'denied', PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 }),
      },
    });
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: /use my location/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/permission was denied/i);
    expect(screen.getByLabelText(/location in sri lanka/i)).toBeInTheDocument();
  });

  it('uses browser coordinates when permission is granted', async () => {
    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: (success: PositionCallback) =>
          success({
            coords: {
              latitude: 6.0325,
              longitude: 80.2168,
              altitude: null,
              accuracy: 100,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
              toJSON: () => ({ latitude: 6.0325, longitude: 80.2168 }),
            },
            timestamp: Date.now(),
            toJSON: () => ({}),
          }),
      },
    });
    renderPage();

    fireEvent.click(screen.getByRole('button', { name: /use my location/i }));

    expect(await screen.findByRole('heading', { name: 'Galle Fort' })).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('shows curated fallbacks and a provider warning when Overpass is unavailable', async () => {
    mockFetch.mockImplementationOnce(async () => ({
      ok: true,
      json: async () => [{ lat: '6.0325', lon: '80.2168', display_name: 'Galle Fort, Galle, Sri Lanka' }],
    }));
    mockFetch.mockRejectedValueOnce(new Error('network unavailable'));
    renderPage();
    fireEvent.change(screen.getByLabelText(/location in sri lanka/i), { target: { value: 'Galle' } });
    fireEvent.click(screen.getByRole('button', { name: /search nearby places/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/OpenStreetMap place search is temporarily unavailable/i);
    expect(screen.getByRole('heading', { name: 'Galle Fort' })).toBeInTheDocument();
  });
});
