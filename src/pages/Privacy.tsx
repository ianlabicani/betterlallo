import SEO from '../components/SEO';
import { Link } from 'react-router';

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy"
        description="The BetterLal-lo privacy notice for this static-first civic information portal."
        keywords="BetterLal-lo privacy, data policy"
      />
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
          Legal and data use
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Privacy notice</h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: 2026-09-21</p>
        <div className="prose prose-gray mt-8 max-w-none">
          <h2>What this portal is</h2>
          <p>
            BetterLal-lo is a static-first, community-run civic information
            portal. It does not provide user accounts, a backend database, a
            citizen-report intake system, or a payment service.
          </p>
          <h2>Information you provide</h2>
          <p>
            The portal does not ask you to submit personal information to read
            pages. If you contact the maintainers through an external GitHub
            issue or pull request, GitHub’s own privacy terms apply to that
            service.
          </p>
          <h2>Technical data</h2>
          <p>
            Your browser may store the selected language preference locally.
            Search terms can appear in the page URL so a result can be shared.
            An optional remote search service may receive a search query only
            when that service is configured for a deployment; the local search
            index remains available without it.
          </p>
          <p>
            Hosting, security, and access logs may be processed by the service
            that serves the site. BetterLal-lo does not claim that a hosting
            provider collects no technical logs.
          </p>
          <h2>External sources and links</h2>
          <p>
            Pages link to government sites, maps, and GitHub. Those services
            have their own policies. Review the destination before sharing
            documents or personal details.
          </p>
          <h2>Questions and corrections</h2>
          <p>
            For data corrections, use the{' '}
            <Link to="/contribute" className="font-semibold text-primary-700">
              contribution guide
            </Link>
            . Do not include sensitive personal information in a public issue.
          </p>
        </div>
      </main>
    </>
  );
}
