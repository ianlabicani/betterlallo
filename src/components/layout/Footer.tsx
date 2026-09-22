import React from 'react';
import {
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { footerNavigation } from '../../data/navigation';

const socialIcons = {
  Facebook: Facebook,
  Twitter,
  Instagram,
  YouTube: Youtube,
} as const;

const isExternalLink = (href: string) => /^https?:\/\//.test(href);

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <CheckCircle2 className="h-12 w-12 mr-3" aria-hidden="true" />
              <div>
                <div className="font-bold">{t('site_name')}</div>
                <div className="text-xs text-gray-400">
                  Community civic information portal
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A community-maintained guide to public information, services, and
              sources for the Municipality of Lal-lo, Cagayan.
            </p>
            {footerNavigation.socialLinks.length > 0 && (
              <div className="flex space-x-4" aria-label="Social links">
                {footerNavigation.socialLinks.map(link => {
                  const Icon =
                    socialIcons[link.label as keyof typeof socialIcons];
                  return Icon ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.label}>
                    {isExternalLink(link.href) ? (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link
                to="/accessibility"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Accessibility
              </Link>
              <a
                href="https://github.com/ianlabicani/betterlallo"
                className="text-gray-400 hover:text-white text-sm transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                View source on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
