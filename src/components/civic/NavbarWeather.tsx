import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  CircleAlert,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  RefreshCw,
  Sun,
  Wind,
} from 'lucide-react';
import { lalloLocation } from '../../data/location';
import { SourceMeta } from './SourceMeta';
import {
  formatForecastDay,
  labelForWeatherCode,
  useWeather,
  weatherSource,
  weatherStateMessage,
} from '../../lib/weather';

interface NavbarWeatherProps {
  mobile?: boolean;
}

function WeatherIcon({
  code,
  className,
}: {
  code?: number;
  className?: string;
}) {
  const Icon =
    code === 0
      ? Sun
      : code !== undefined && code >= 95
        ? CloudLightning
        : code !== undefined && code >= 1 && code <= 3
          ? CloudSun
          : code !== undefined && (code === 45 || code === 48)
            ? Cloud
            : CloudRain;

  return <Icon className={className} aria-hidden="true" />;
}

export default function NavbarWeather({ mobile = false }: NavbarWeatherProps) {
  const { weather, state, reload } = useWeather();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!lalloLocation) return null;

  const hasWeather = state === 'success' && weather;
  const currentLabel = hasWeather
    ? `${Math.round(weather.current.temperature)}°C`
    : state === 'loading'
      ? 'Weather'
      : 'Unavailable';
  const conditionLabel = hasWeather
    ? labelForWeatherCode(weather.current.weatherCode)
    : 'Live forecast';
  const popoverId = mobile
    ? 'navbar-weather-popover-mobile'
    : 'navbar-weather-popover-desktop';

  return (
    <div
      ref={containerRef}
      className={mobile ? 'border-b border-gray-100 px-4 py-3' : 'relative'}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(value => !value)}
        aria-expanded={isOpen}
        aria-controls={popoverId}
        aria-haspopup="dialog"
        aria-label={
          hasWeather
            ? `Lal-lo weather: ${currentLabel}, ${conditionLabel}. Show forecast.`
            : 'Show Lal-lo weather status and forecast'
        }
        className={`inline-flex items-center rounded-md text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 ${mobile ? 'w-full justify-between px-2 py-2' : 'gap-2 px-2 py-1.5 text-sm'}`}
      >
        <span className="inline-flex items-center gap-2">
          <WeatherIcon
            code={hasWeather ? weather.current.weatherCode : undefined}
            className={`h-5 w-5 ${state === 'error' || state === 'offline' ? 'text-amber-700' : 'text-primary-700'}`}
          />
          {mobile && <span className="font-medium text-gray-700">Weather</span>}
          <span className="font-semibold text-gray-900">{currentLabel}</span>
          {hasWeather && (
            <span className="hidden text-gray-600 xl:inline">
              · {conditionLabel}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={popoverId}
          role="dialog"
          aria-labelledby={`${popoverId}-title`}
          className={`rounded-lg border border-gray-200 bg-white text-left shadow-lg ${mobile ? 'mt-3 w-full' : 'absolute right-0 top-full z-[60] mt-3 w-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-1rem)] overflow-y-auto'}`}
        >
          {hasWeather ? (
            <div className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p
                    id={`${popoverId}-title`}
                    className="text-xs font-semibold uppercase tracking-wide text-primary-700"
                  >
                    Current conditions
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {currentLabel}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {conditionLabel} · Feels like{' '}
                    {Math.round(weather.current.apparentTemperature)}°C
                  </p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{Math.round(weather.current.humidity)}% humidity</p>
                  <p className="mt-1 inline-flex items-center gap-1">
                    <Wind className="h-4 w-4" aria-hidden="true" />
                    {Math.round(weather.current.windSpeed)} km/h
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 text-sm">
                {weather.daily.slice(0, 3).map(day => (
                  <div
                    key={day.date}
                    className="rounded-md bg-gray-50 p-2 text-center"
                  >
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
          ) : (
            <div
              className="flex items-start gap-3 p-4"
              role={state === 'loading' ? 'status' : undefined}
            >
              {state === 'error' || state === 'offline' ? (
                <CircleAlert
                  className="h-5 w-5 shrink-0 text-amber-700"
                  aria-hidden="true"
                />
              ) : (
                <CloudRain
                  className="h-5 w-5 shrink-0 text-primary-700"
                  aria-hidden="true"
                />
              )}
              <p
                id={`${popoverId}-title`}
                className="flex-1 text-sm text-gray-700"
              >
                {weatherStateMessage(state)}
              </p>
              {state !== 'loading' && (
                <button
                  type="button"
                  onClick={reload}
                  className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" /> Retry
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
