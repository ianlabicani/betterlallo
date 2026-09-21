import { ArrowRight, MapPinned } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';

export default function Hero() {
  const { t } = useTranslation('common');

  return (
    <section className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 text-white py-14 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-primary-100 text-sm font-semibold uppercase tracking-wide mb-4">
            <MapPinned className="h-5 w-5" aria-hidden="true" />
            Cagayan Valley · Region II
          </div>
          <Heading className="text-white">BetterLal-lo</Heading>
          <Text className="text-xl text-primary-50 max-w-2xl">
            {t('hero.subtitle')}
          </Text>
          <p className="text-primary-100 max-w-2xl leading-relaxed mb-8">
            A community-run guide to public services, local offices, barangays,
            and transparency records for the Municipality of Lal-lo, Cagayan.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-semibold text-primary-700 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
            >
              Browse services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/government/barangays"
              className="inline-flex items-center rounded-md border border-primary-200 px-5 py-3 font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-white"
            >
              View barangays
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
