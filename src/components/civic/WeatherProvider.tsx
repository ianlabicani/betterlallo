import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  lalloLocation,
  parseWeatherResponse,
  WeatherContext,
} from '../../lib/weather';
import type { WeatherState } from '../../lib/weather';

export function WeatherProvider({ children }: PropsWithChildren) {
  const [weather, setWeather] = useState<ReturnType<
    typeof parseWeatherResponse
  > | null>(null);
  const [state, setState] = useState<WeatherState>(() =>
    navigator.onLine ? 'loading' : 'offline'
  );
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    if (!lalloLocation) return;
    setState(navigator.onLine ? 'loading' : 'offline');
    setReloadKey(value => value + 1);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setState('loading');
      setReloadKey(value => value + 1);
    };
    const handleOffline = () => setState('offline');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!lalloLocation || !navigator.onLine) return;

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
        if (controller.signal.aborted) return;
        setWeather(parseWeatherResponse(payload));
        setState('success');
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        if (!navigator.onLine) {
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

  return (
    <WeatherContext.Provider value={{ weather, state, reload }}>
      {children}
    </WeatherContext.Provider>
  );
}
