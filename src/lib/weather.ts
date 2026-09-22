import { createContext, useContext } from 'react';
import { REVIEW_DATE } from '../data/civicRecords';
import { lalloLocation } from '../data/location';
import type { SourceRecord, WeatherSnapshot } from '../types/civic';

export type WeatherState = 'loading' | 'success' | 'error' | 'offline';

export const weatherSource: SourceRecord = {
  label: 'Open-Meteo forecast API',
  url: 'https://open-meteo.com/',
  lastVerified: REVIEW_DATE,
  status: 'verified',
  authority: 'national',
  jurisdiction: 'Live forecast for configured Lal-lo coordinates',
  sourceType: 'open-data',
  verificationNote:
    'Live weather is fetched at runtime and is not a municipal civic record.',
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

export function labelForWeatherCode(code: number) {
  return weatherLabels[code] ?? 'Weather conditions';
}

export function formatForecastDay(date: string) {
  return new Intl.DateTimeFormat('en-PH', { weekday: 'short' }).format(
    new Date(`${date}T12:00:00`)
  );
}

export function weatherStateMessage(state: WeatherState) {
  return state === 'offline'
    ? 'You appear to be offline. Weather will load when a connection is available.'
    : state === 'error'
      ? 'Weather is temporarily unavailable. The portal did not receive a usable response.'
      : 'Loading the current forecast from Open-Meteo...';
}

function asNumber(record: Record<string, unknown>, key: string): number {
  const value = record[key];
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`Malformed weather response: ${key}`);
  }
  return value;
}

export function parseWeatherResponse(payload: unknown): WeatherSnapshot {
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

export interface WeatherContextValue {
  weather: WeatherSnapshot | null;
  state: WeatherState;
  reload: () => void;
}

export const WeatherContext = createContext<WeatherContextValue | undefined>(
  undefined
);

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}

export { lalloLocation };
