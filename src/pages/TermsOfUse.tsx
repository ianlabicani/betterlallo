import { Link } from 'react-router';
import SEO from '../components/SEO';

export default function TermsOfUse() {
  return (
    <>
      <SEO
        title="Terms of use"
        description="Terms for using the BetterLal-lo community civic information portal."
        keywords="BetterLal-lo terms of use, civic information"
      />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
          Legal and scope
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Terms of use</h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: 2026-09-21</p>
        <div className="prose prose-gray mt-8 max-w-none">
          <h2>Community information only</h2>
          <p>
            BetterLal-lo is an independent open-source project. It is not the
            official website of the Municipal Government of Lal-lo and does not
            accept applications, payments, emergency reports, or official
            filings.
          </p>
          <h2>Verify before acting</h2>
          <p>
            Use each page’s source and last-reviewed date to check the original
            record. Confirm current fees, requirements, schedules, office
            availability, eligibility, and procedures directly with the
            responsible office before relying on them.
          </p>
          <h2>Emergency and financial decisions</h2>
          <p>
            Do not use this portal as the sole basis for an emergency response,
            payment, legal decision, travel plan, or application. The{' '}
            <Link to="/contact" className="font-semibold text-primary-700">
              contact hub
            </Link>{' '}
            identifies published references but cannot guarantee availability.
          </p>
          <h2>Corrections</h2>
          <p>
            If you find an error, send the exact source and field through the{' '}
            <Link to="/contribute" className="font-semibold text-primary-700">
              contribution guide
            </Link>
            . Maintainers may mark information pending or remove a record when
            the evidence is no longer current.
          </p>
          <h2>External services</h2>
          <p>
            Linked government sites, maps, GitHub, hosting providers, and other
            services are governed by their own terms. BetterLal-lo does not
            control their availability or content.
          </p>
        </div>
      </main>
    </>
  );
}
