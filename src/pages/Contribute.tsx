import { ExternalLink, GitPullRequest, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/SEO';

const issueUrl = 'https://github.com/ianlabicani/betterlallo/issues';
const pullRequestUrl = 'https://github.com/ianlabicani/betterlallo/pulls';

export default function Contribute() {
  return (
    <>
      <SEO
        title="Suggest a correction"
        description="How to suggest a source-backed correction or addition to BetterLal-lo."
        keywords="BetterLal-lo contribute, correction, civic data source"
      />
      <main>
        <section className="bg-primary-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
                Community contribution
              </p>
              <h1 className="text-3xl font-bold text-gray-900">
                Suggest a correction or addition
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-gray-700">
                BetterLal-lo remains static-first. Send a source and a clear
                description through GitHub so a maintainer can review it before
                publication.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-4xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <LinkIcon
                className="h-7 w-7 text-primary-700"
                aria-hidden="true"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                What to include
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
                <li>The exact page or field that needs changing</li>
                <li>A direct official source URL or document</li>
                <li>Publication date, period, and jurisdiction if available</li>
                <li>What should be corrected, added, or marked pending</li>
                <li>No private personal information or unverified claims</li>
              </ul>
              <a
                href={issueUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Open GitHub issues
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
            <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <GitPullRequest
                className="h-7 w-7 text-primary-700"
                aria-hidden="true"
              />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                Prefer a pull request?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                Keep the source metadata, review date, jurisdiction, and
                verification status with the change. If a local detail cannot be
                confirmed, add it to the pending state instead of filling in a
                guess.
              </p>
              <a
                href={pullRequestUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
              >
                View pull requests
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </div>
          <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-semibold text-gray-900">Safety reminder</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Do not use a contribution form as an emergency channel. For
              current published responder references, visit the{' '}
              <Link
                to="/contact#emergency"
                className="font-semibold text-primary-800 underline underline-offset-2"
              >
                contact hub
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
