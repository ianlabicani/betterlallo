import React, { useEffect, useState } from 'react';
import { X, Menu, ChevronDown, Globe, CheckCircle2 } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';
import NavbarWeather from '../civic/NavbarWeather';

const LALLO_TIME_ZONE = 'Asia/Manila';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    let intervalId: number | undefined;
    const updateTime = () => setCurrentTime(new Date());
    const millisecondsUntilNextMinute = 60_000 - (Date.now() % 60_000);
    const timeoutId = window.setTimeout(() => {
      updateTime();
      intervalId = window.setInterval(updateTime, 60_000);
    }, millisecondsUntilNextMinute);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveMenu(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const changeLanguage = (newLanguage: LanguageType) => {
    i18n.changeLanguage(newLanguage);
  };

  const locale =
    i18n.language === 'fil'
      ? 'fil-PH'
      : i18n.language === 'ilo'
        ? 'ilo-PH'
        : 'en-PH';
  const fullDate = new Intl.DateTimeFormat(locale, {
    timeZone: LALLO_TIME_ZONE,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(currentTime);
  const compactDate = new Intl.DateTimeFormat(locale, {
    timeZone: LALLO_TIME_ZONE,
    month: 'short',
    day: 'numeric',
  }).format(currentTime);
  const time = new Intl.DateTimeFormat(locale, {
    timeZone: LALLO_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(currentTime);

  return (
    <nav className="bg-white shadow-sm">
      {/* Top bar with language switcher and additional links */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center gap-3 h-10 overflow-x-auto whitespace-nowrap">
          <time
            dateTime={currentTime.toISOString()}
            aria-label={t('navbar.currentdatetime', {
              date: fullDate,
              time,
            })}
            className="shrink-0 text-xs text-gray-600"
          >
            <span className="hidden sm:inline">
              {fullDate} · {time}
            </span>
            <span className="sm:hidden">
              {compactDate} · {time}
            </span>
          </time>
          <div className="ml-auto flex shrink-0 items-center space-x-4">
            <a
              href="https://bettergov.ph/join-us"
              className="text-xs text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              🚀 Join Us
            </a>
            <a
              href="https://bettergov.ph/about"
              className="text-xs text-gray-800 hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              About BetterGov
            </a>
            <a
              href="https://www.gov.ph"
              className="text-xs text-gray-800 hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Official Gov.ph
            </a>

            <a
              href="https://bettergov.ph/philippines/hotlines"
              className="text-xs text-gray-800 hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noreferrer"
            >
              Hotlines
            </a>
            <div className="hidden md:block">
              <select
                value={i18n.language}
                onChange={e => changeLanguage(e.target.value as LanguageType)}
                className="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 hover:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
              >
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <CheckCircle2 className="h-12 w-12 mr-3" />
              {/* <img
                src="/ph-logo.webp"
                alt="Philippines Coat of Arms"
                className="h-12 w-12 mr-3"
              /> */}
              <div>
                <div className="text-black font-bold">
                  {import.meta.env.VITE_GOVERNMENT_NAME}
                </div>
                <div className="text-xs text-gray-800">
                  {t('site_description')}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8 pr-24">
            {mainNavigation.map(item => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  {t(`navbar.${item.label.replace(/\s/g, '').toLowerCase()}`)}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-800 group-hover:text-primary-600 transition-colors" />
                  )}
                </Link>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <NavbarWeather />
            <Link
              to="/about"
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              About
            </Link>
            {/* <Link
              to="/sitemap"
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Sitemap
            </Link> */}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-navigation"
        className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}
      >
        <div className="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
          {isOpen && <NavbarWeather mobile />}
          {mainNavigation.map(item => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full flex justify-between items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                    aria-expanded={activeMenu === item.label}
                  >
                    {t(`navbar.${item.label.replace(/\s/g, '').toLowerCase()}`)}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        activeMenu === item.label ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {activeMenu === item.label && (
                    <div className="pl-6 py-2 space-y-1 bg-gray-50">
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={closeMenu}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={closeMenu}
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                >
                  {t(`navbar.${item.label.replace(/\s/g, '').toLowerCase()}`)}
                </Link>
              )}
            </div>
          ))}
          <a
            href="https://bettergov.ph/join-us"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-semibold text-primary-600 hover:bg-primary-50 hover:text-primary-700"
          >
            🚀 Join Us
          </a>
          <Link
            to="/about"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          >
            About
          </Link>
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-800 mr-2" />
              <select
                value={i18n.language}
                onChange={e => changeLanguage(e.target.value as LanguageType)}
                className="text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 hover:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
              >
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
