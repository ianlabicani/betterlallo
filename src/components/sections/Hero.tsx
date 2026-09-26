import { ArrowRight, ExternalLink, Facebook, MapPinned } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { FacebookFeedCard } from '../home/FacebookSection';
import { facebookPageUrl } from '../../data/navigation';

export default function Hero() {
  const { t } = useTranslation('common');

  return (
    <section className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 py-12 text-white md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-12">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-primary-100">
              <MapPinned className="h-5 w-5" aria-hidden="true" />
              Cagayan Valley · Region II
            </div>
            <Heading className="mb-3 leading-tight text-white">
              BetterLal-lo
            </Heading>
            <Text className="max-w-2xl text-xl leading-snug text-primary-50">
              {t('hero.subtitle')}
            </Text>
            <p className="mb-7 max-w-2xl leading-relaxed text-primary-100">
              A community-run guide to public services, local offices,
              barangays, and transparency records for the Municipality of
              Lal-lo, Cagayan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-primary-700 shadow-sm transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
              >
                Browse services{' '}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/government/barangays"
                className="inline-flex items-center rounded-md border border-primary-200 px-5 py-3 font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View barangays
              </Link>
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-primary-200 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
                Follow local updates
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="w-full lg:pt-2">
            <div className="mb-3 flex items-center justify-between gap-3 text-sm font-semibold text-primary-50">
              <span>Community pulse</span>
              <span className="text-xs font-normal text-primary-100">
                Live from Facebook
              </span>
            </div>
            <FacebookFeedCard />
          </div>
        </div>
      </div>
    </section>
  );
}
