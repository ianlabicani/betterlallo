import { ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';

const sources = [
  {
    label: 'Provincial Government of Cagayan — city and municipal directory',
    href: 'https://cagayan.gov.ph/city-and-municipalities/',
  },
  {
    label: 'Philippine Statistics Authority — Lal-lo PSGC profile',
    href: 'https://psa.gov.ph/classification/psgc/barangays/0201516000',
  },
  {
    label: 'Cagayan PDRRMO — We Care Lal-lo program',
    href: 'https://pdrrmo.cagayan.gov.ph/we-care-lal-lo-program-municipality-of-lal-lo/',
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About BetterLal-lo"
        description="How BetterLal-lo collects, checks, and presents public information for Lal-lo, Cagayan."
        keywords="BetterLal-lo, Lal-lo Cagayan, civic technology, public information"
      />
      <main className="flex-grow">
        <Section className="bg-primary-50">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-700">
              About the portal
            </p>
            <Heading>Better information for Lal-lo</Heading>
            <p className="text-lg leading-relaxed text-gray-700">
              BetterLal-lo is an independent, open-source community project that
              makes public information about the Municipality of Lal-lo, Cagayan
              easier to find and understand.
            </p>
          </div>
        </Section>

        <Section>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Heading level={2}>How information is handled</Heading>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We start with public records and official government sources.
                  Pages should identify where information came from and when it
                  was last checked.
                </p>
                <p>
                  BetterLal-lo is not the official website of the Municipal
                  Government of Lal-lo. It does not replace official notices,
                  applications, or emergency instructions.
                </p>
                <p>
                  When a detail cannot be verified, it is left out or marked as
                  pending instead of being guessed.
                </p>
              </div>
            </div>
            <div>
              <Heading level={2}>Reference sources</Heading>
              <ul className="space-y-3">
                {sources.map(source => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-start gap-2 text-primary-700 underline hover:text-primary-900"
                    >
                      <ExternalLink
                        className="mt-1 h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{source.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="accessibility" className="bg-gray-50">
          <div className="max-w-3xl">
            <Heading level={2}>Accessibility and contribution</Heading>
            <p className="text-gray-700 leading-relaxed">
              The portal is designed for mobile use, keyboard navigation, clear
              headings, and readable language. Corrections, translations, and
              verified public records can be contributed through the project’s
              GitHub repository.
            </p>
          </div>
        </Section>
      </main>
    </>
  );
}
