import { BarChart3, Building2, FileText, Landmark } from 'lucide-react';
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
    <Section className="bg-white">
      <div className="mb-6 max-w-3xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
          Quick access
        </p>
        <h2 className="text-2xl font-bold text-gray-900">
          Find the public record you need
        </h2>
        <p className="mt-2 text-gray-600">
          Shortcuts inspired by BetterLB’s information architecture, adapted for
          source-first Lal-lo content.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              to={card.href}
              className="group rounded-lg border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <Icon className="h-7 w-7 text-primary-700" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary-700">
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
