import { useEffect, useState } from 'react';
import {
  CircleAlert,
  CloudRain,
  MapPinned,
  RefreshCw,
  Wind,
} from 'lucide-react';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { lalloLocation, lalloLocationSource } from '../../data/location';
import type { WeatherSnapshot } from '../../types/civic';
import { SourceMeta } from './SourceMeta';

type WeatherState = 'loading' | 'success' | 'error' | 'offline';

const weatherSource = {
  label: 'Open-Meteo forecast API',
  url: 'https://open-meteo.com/',
  lastVerified: '2026-09-21',
  status: 'verified' as const,
};

const weatherLabels: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  80: 'Rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail',
};

function asNumber(record: Record<string, unknown>, key: string): number {
  const value = record[key];
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`Malformed weather response: ${key}`);
  }
  return value;
}

function parseWeatherResponse(payload: unknown): WeatherSnapshot {
  if (!payload || typeof payload !== 'object')
    throw new Error('Malformed weather response');
  const response = payload as {
    current?: unknown;
    daily?: unknown;
    timezone?: unknown;
  };
  if (
    !response.current ||
    typeof response.current !== 'object' ||
    !response.daily ||
    typeof response.daily !== 'object'
  ) {
    throw new Error('Malformed weather response');
  }

  const current = response.current as Record<string, unknown>;
  const daily = response.daily as Record<string, unknown>;
  const dates = daily.time;
  const minimums = daily.temperature_2m_min;
  const maximums = daily.temperature_2m_max;
  const codes = daily.weather_code;
  if (
    !Array.isArray(dates) ||
    !Array.isArray(minimums) ||
    !Array.isArray(maximums) ||
    !Array.isArray(codes)
  ) {
    throw new Error('Malformed weather response');
  }

  const dailyForecast = dates.map((date, index) => {
    const minimum = minimums[index];
    const maximum = maximums[index];
    const code = codes[index];
    if (
      typeof date !== 'string' ||
      typeof minimum !== 'number' ||
      typeof maximum !== 'number' ||
      typeof code !== 'number'
    ) {
      throw new Error('Malformed weather response');
    }
    return { date, minimum, maximum, weatherCode: code };
  });

  return {
    fetchedAt: new Date().toISOString(),
    timezone:
      typeof response.timezone === 'string' ? response.timezone : 'Asia/Manila',
    current: {
      temperature: asNumber(current, 'temperature_2m'),
      apparentTemperature: asNumber(current, 'apparent_temperature'),
      humidity: asNumber(current, 'relative_humidity_2m'),
      windSpeed: asNumber(current, 'wind_speed_10m'),
      weatherCode: asNumber(current, 'weather_code'),
    },
    daily: dailyForecast,
  };
}

function labelForWeatherCode(code: number) {
  return weatherLabels[code] ?? 'Weather conditions';
}

function WeatherPanel() {
  const [weather, setWeather] = useState<WeatherSnapshot | null>(null);
  const [state, setState] = useState<WeatherState>(() =>
    navigator.onLine ? 'loading' : 'offline'
  );
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!lalloLocation) return;
    if (!navigator.onLine) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    const endpoint = new URL('https://api.open-meteo.com/v1/forecast');
    endpoint.search = new URLSearchParams({
      latitude: String(lalloLocation.latitude),
      longitude: String(lalloLocation.longitude),
      current:
        'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,weather_code',
      timezone: 'Asia/Manila',
      forecast_days: '3',
    }).toString();

    fetch(endpoint, { signal: controller.signal })
      .then(response => {
        if (!response.ok)
          throw new Error(`Weather request failed: ${response.status}`);
        return response.json() as Promise<unknown>;
      })
      .then(payload => {
        setWeather(parseWeatherResponse(payload));
        setState('success');
      })
      .catch(error => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setState('error');
        } else if (!navigator.onLine) {
          setState('offline');
        } else {
          setState('error');
        }
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [reloadKey]);

  if (!lalloLocation) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-5 text-sm text-gray-700">
        Weather is unavailable because verified municipality coordinates are not
        configured.
      </div>
    );
  }

  if (state !== 'success' || !weather) {
    const message =
      state === 'offline'
        ? 'You appear to be offline. Weather will load when a connection is available.'
        : state === 'error'
          ? 'Weather is temporarily unavailable. The portal did not receive a usable response.'
          : 'Loading the current forecast from Open-Meteo...';
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
          <p className="flex-1 text-sm text-gray-700">{message}</p>
          {state !== 'loading' && (
            <button
              type="button"
              onClick={() => {
                setState('loading');
                setReloadKey(value => value + 1);
              }}
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
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
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
              {new Intl.DateTimeFormat('en-PH', { weekday: 'short' }).format(
                new Date(`${day.date}T12:00:00`)
              )}
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
      className="border-t border-gray-200 bg-gray-50 py-12"
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
              A municipality-level forecast and map using public, no-key
              services. Weather is live; all civic records remain
              repository-managed.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WeatherPanel />
          {lalloLocation ? (
            <div
              className="overflow-hidden rounded-lg border border-gray-200 bg-white"
              role="region"
              aria-label="Map of Lal-lo Municipal Hall"
            >
              <MapContainer
                center={[lalloLocation.latitude, lalloLocation.longitude]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-80 w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CircleMarker
                  center={[lalloLocation.latitude, lalloLocation.longitude]}
                  radius={10}
                  pathOptions={{
                    color: '#0052bc',
                    fillColor: '#0066eb',
                    fillOpacity: 0.85,
                  }}
                >
                  <Popup>{lalloLocation.label}</Popup>
                </CircleMarker>
              </MapContainer>
              <div className="p-4 text-sm text-gray-600">
                <p className="font-semibold text-gray-900">
                  {lalloLocation.label}
                </p>
                <p className="mt-1">Map data © OpenStreetMap contributors.</p>
                <a
                  href={lalloLocationSource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block font-semibold text-primary-700 underline underline-offset-2"
                >
                  View location source
                </a>
              </div>
            </div>
          ) : (
            <div className="flex min-h-80 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-600">
              Map unavailable until verified Lal-lo coordinates are configured.
            </div>
          )}
        </div>
        {!lalloLocation && <SourceMeta source={lalloLocationSource} />}
      </div>
    </section>
  );
}
