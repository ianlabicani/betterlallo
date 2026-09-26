import { FileText, MapPinned, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';

const highlights = [
  {
    icon: MapPinned,
    title: '35 barangays',
    description: 'Browse the current PSA barangay classification for Lal-lo.',
    href: '/government/barangays/directory',
  },
  {
    icon: ShieldCheck,
    title: 'Verified sources',
    description:
      'Each public-information page identifies its source and update date.',
    href: '/government/overview/about-lallo',
  },
  {
    icon: FileText,
    title: 'Public records',
    description:
      'Find links to budgets, projects, ordinances, and resolutions.',
    href: '/government/transparency',
  },
];

export default function PortalHighlights() {
  return (
    <Section className="border-b border-primary-100 bg-primary-50 py-10 sm:py-12">
      <div className="mb-7 max-w-3xl border-l-4 border-accent-500 pl-4 sm:mb-8">
        <Heading level={2} className="leading-tight">
          Start with trusted local information
        </Heading>
        <p className="max-w-2xl leading-relaxed text-gray-700">
          BetterLal-lo organizes public records in plain language so residents
          can find the right office, service, or source more quickly.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {highlights.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={title}
            to={href}
            className="group rounded-lg border border-primary-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
          >
            <Icon
              className="mb-4 h-7 w-7 text-primary-600"
              aria-hidden="true"
            />
            <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-700">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
