import {
  ArrowUpRight,
  BarChart3,
  Building2,
  FileText,
  Landmark,
} from 'lucide-react';
import { Link } from 'react-router';
import Section from '../ui/Section';

const cards = [
  {
    title: 'Budget and financial records',
    description:
      'See what is available from COA, DBM, and other verified public sources.',
    href: '/transparency/financial',
    icon: Landmark,
  },
  {
    title: 'Projects and infrastructure',
    description:
      'Browse source-backed project information without invented status updates.',
    href: '/transparency/infrastructure',
    icon: Building2,
  },
  {
    title: 'Ordinances and resolutions',
    description:
      'Search the OpenLGU register and see an explicit pending state when records are not published.',
    href: '/openlgu',
    icon: FileText,
  },
  {
    title: 'Statistics and demographics',
    description:
      'Review dated indicators with a source, period, and integrity label for every metric.',
    href: '/statistics',
    icon: BarChart3,
  },
];

export default function QuickAccessSection() {
  return (
    <Section className="bg-white py-10 sm:py-12">
      <div className="mb-7 max-w-3xl border-l-4 border-accent-500 pl-4 sm:mb-8">
        <p className="mb-2 text-sm font-semibold tracking-wide text-primary-700">
          Start here
        </p>
        <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
          Find the public record you need
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
          Shortcuts inspired by BetterLB’s information architecture, adapted for
          source-first Lal-lo content.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              to={card.href}
              className="group flex min-h-44 flex-col border-t border-gray-200 py-5 transition-colors hover:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 sm:min-h-48"
            >
              <div className="flex items-start justify-between gap-4">
                <Icon
                  className="h-7 w-7 shrink-0 text-primary-700"
                  aria-hidden="true"
                />
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-gray-400 transition-colors group-hover:text-primary-700"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-gray-900 group-hover:text-primary-700">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
