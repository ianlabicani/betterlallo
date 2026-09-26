import {
  CircleAlert,
  CloudRain,
  MapPinned,
  RefreshCw,
  Wind,
} from 'lucide-react';
import { divIcon } from 'leaflet';
import {
  GeoJSON,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  lalloBoundarySource,
  lalloLocation,
  lalloLocationSource,
} from '../../data/location';
import { lalloBoundary, lalloBoundaryBounds } from '../../data/lalloBoundary';
import { SourceMeta } from './SourceMeta';
import {
  formatForecastDay,
  labelForWeatherCode,
  useWeather,
  weatherSource,
  weatherStateMessage,
} from '../../lib/weather';

const municipalHallIcon = divIcon({
  className: 'lallo-hall-marker',
  html: `
    <span class="lallo-hall-marker__body">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 21h18M5 21V9l7-4 7 4v12M8 21v-8h8v8M9 10h.01M12 10h.01M15 10h.01" />
      </svg>
    </span>
  `,
  iconSize: [40, 48],
  iconAnchor: [20, 43],
  popupAnchor: [0, -40],
  tooltipAnchor: [0, -36],
});

function WeatherPanel() {
  const { weather, state, reload } = useWeather();

  if (!lalloLocation) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-5 text-sm text-gray-700">
        Weather is unavailable because verified municipality coordinates are not
        configured.
      </div>
    );
  }

  if (state !== 'success' || !weather) {
    return (
      <div
        className="rounded-lg border border-gray-200 bg-white p-5"
        role={state === 'loading' ? 'status' : undefined}
      >
        <div className="flex items-start gap-3">
          {state === 'error' || state === 'offline' ? (
            <CircleAlert
              className="h-5 w-5 text-amber-700"
              aria-hidden="true"
            />
          ) : (
            <CloudRain
              className="h-5 w-5 text-primary-700"
              aria-hidden="true"
            />
          )}
          <p className="flex-1 text-sm text-gray-700">
            {weatherStateMessage(state)}
          </p>
          {state !== 'loading' && (
            <button
              type="button"
              onClick={reload}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" /> Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold tracking-wide text-primary-700">
            Current conditions
          </p>
          <p className="mt-2 text-4xl font-bold text-gray-900">
            {Math.round(weather.current.temperature)}°C
          </p>
          <p className="mt-1 text-sm text-gray-600">
            {labelForWeatherCode(weather.current.weatherCode)} · Feels like{' '}
            {Math.round(weather.current.apparentTemperature)}°C
          </p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <p>{weather.current.humidity}% humidity</p>
          <p className="mt-1 inline-flex items-center gap-1">
            <Wind className="h-4 w-4" aria-hidden="true" />{' '}
            {Math.round(weather.current.windSpeed)} km/h
          </p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 text-sm">
        {weather.daily.map(day => (
          <div key={day.date} className="rounded-md bg-gray-50 p-3 text-center">
            <p className="font-semibold text-gray-800">
              {formatForecastDay(day.date)}
            </p>
            <p className="mt-1 text-gray-600">
              {Math.round(day.minimum)}°–{Math.round(day.maximum)}°
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {labelForWeatherCode(day.weatherCode)}
            </p>
          </div>
        ))}
      </div>
      <SourceMeta source={weatherSource} />
    </div>
  );
}

export default function WeatherMapSection() {
  return (
    <section
      className="border-t-4 border-primary-100 bg-gray-50 py-12 sm:py-14"
      aria-labelledby="weather-map-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-start gap-3">
          <MapPinned
            className="mt-1 h-7 w-7 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <h2
              id="weather-map-heading"
              className="text-2xl font-bold text-gray-900"
            >
              Lal-lo now
            </h2>
            <p className="mt-2 max-w-3xl text-gray-600">
              Live weather for Lal-lo with the municipality boundary shown over
              public OpenStreetMap tiles. Weather is live; civic records remain
              repository-managed.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WeatherPanel />
          <div
            className="relative isolate z-0 overflow-hidden rounded-lg border border-gray-200 bg-white"
            role="region"
            aria-label="Map of Lal-lo municipality"
          >
            <MapContainer
              bounds={lalloBoundaryBounds}
              boundsOptions={{ padding: [20, 20] }}
              scrollWheelZoom={false}
              className="h-80 w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <GeoJSON
                data={lalloBoundary}
                pathOptions={{
                  color: '#0052bc',
                  fillColor: '#0066eb',
                  fillOpacity: 0.16,
                  weight: 2,
                }}
              />
              {lalloLocation && (
                <Marker
                  position={[lalloLocation.latitude, lalloLocation.longitude]}
                  icon={municipalHallIcon}
                  alt={lalloLocation.label}
                  title={lalloLocation.label}
                  riseOnHover
                >
                  <Tooltip direction="top" offset={[0, -24]}>
                    {lalloLocation.label}
                  </Tooltip>
                  <Popup>{lalloLocation.label}</Popup>
                </Marker>
              )}
            </MapContainer>
            <div className="p-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">
                Lal-lo municipal boundary
              </p>
              <p className="mt-1">
                Base map data © OpenStreetMap contributors. The shaded outline
                shows the municipality boundary.
              </p>
              {lalloLocation ? (
                <p className="mt-1">
                  The Municipal Hall pin is an orientation reference.
                </p>
              ) : (
                <p className="mt-1">
                  The Municipal Hall pin is unavailable until verified
                  coordinates are configured.
                </p>
              )}
              <SourceMeta source={lalloBoundarySource} compact />
              {lalloLocation && (
                <a
                  href={lalloLocationSource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block font-semibold text-primary-700 underline underline-offset-2"
                >
                  View Municipal Hall source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
