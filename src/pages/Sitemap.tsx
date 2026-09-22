import { Link } from 'react-router';
import SEO from '../components/SEO';

const sections = [
  {
    title: 'Start here',
    links: [
      ['Home', '/'],
      ['About BetterLal-lo', '/about'],
      ['Search', '/search'],
      ['Verified resources', '/resources'],
      ['Updates', '/updates'],
      ['Contact and emergency information', '/contact'],
    ],
  },
  {
    title: 'Services',
    links: [
      ['All services', '/services'],
      ['Health services', '/services/health-services'],
      ['Business and livelihood', '/services/business'],
      ['Certificates and vital records', '/services/certificates'],
      ['Tax payments', '/services/tax-payments'],
      ['Barangay services', '/services/barangay-services'],
      ['Social welfare', '/services/social-welfare'],
      ['Disaster preparedness', '/services/disaster-preparedness'],
    ],
  },
  {
    title: 'Government and records',
    links: [
      ['Government overview', '/government'],
      ['Officials', '/government/officials'],
      ['Office directory', '/government/directory'],
      ['Barangay directory', '/government/barangays/directory'],
      ['Statistics', '/statistics'],
      ['OpenLGU', '/openlgu'],
      ['Transparency', '/transparency'],
      ['Heritage and tourism', '/heritage'],
    ],
  },
  {
    title: 'Help and legal',
    links: [
      ['Frequently asked questions', '/faq'],
      ['Suggest a correction', '/contribute'],
      ['Accessibility', '/accessibility'],
      ['Privacy', '/privacy'],
      ['Terms of use', '/terms-of-use'],
    ],
  },
];

export default function Sitemap() {
  return (
    <>
      <SEO
        title="Sitemap"
        description="Browse BetterLal-lo pages for services, government information, records, and help."
        keywords="BetterLal-lo sitemap, Lal-lo information portal"
      />
      <main className="container mx-auto max-w-5xl px-4 py-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
          Browse the portal
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Sitemap</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-gray-700">
          A plain-language directory of BetterLal-lo’s main routes.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(section => (
            <section
              key={section.title}
              aria-labelledby={`sitemap-${section.title}`}
            >
              <h2
                id={`sitemap-${section.title}`}
                className="text-lg font-semibold text-gray-900"
              >
                {section.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {section.links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="text-sm text-primary-700 underline underline-offset-2 hover:text-primary-950 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
