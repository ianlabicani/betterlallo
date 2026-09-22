import { ArrowRight, CalendarDays, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import { updateRecords } from '../data/civicRecords';

function formatDate(value?: string) {
  if (!value) return 'Date not published';
  return new Intl.DateTimeFormat('en-PH', { dateStyle: 'medium' }).format(
    new Date(`${value}T00:00:00`)
  );
}

function typeLabel(value: string) {
  return value.replace('-', ' ');
}

export default function Updates() {
  return (
    <>
      <SEO
        title="Updates and advisories"
        description="A source-backed feed of recent Lal-lo public information, data releases, and heritage updates."
        keywords="Lal-lo updates, advisories, public information, Cagayan news"
      />
      <main>
        <section className="bg-primary-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
                Source-backed feed
              </p>
              <h1 className="text-3xl font-bold text-gray-900">
                Updates and advisories
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-gray-700">
                This page collects public records that have a dated,
                attributable source. It is not a live government announcement
                channel, and a missing entry does not mean that no announcement
                exists.
              </p>
            </div>
          </div>
        </section>

        <section
          className="container mx-auto px-4 py-10"
          aria-labelledby="updates-heading"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2
                id="updates-heading"
                className="text-2xl font-bold text-gray-900"
              >
                Published records
              </h2>
              <p className="mt-2 text-gray-600">
                Each entry shows its publication or extraction date, source,
                jurisdiction, and last review date.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-900"
            >
              Need a contact? View the hub
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {updateRecords.length > 0 ? (
            <div className="space-y-5">
              {updateRecords.map(update => {
                const isInternal = update.href.startsWith('/');
                return (
                  <article
                    key={update.id}
                    className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-primary-700">
                      <span>{typeLabel(update.type)}</span>
                      <VerificationBadge status={update.status} />
                      {update.publishedDate && (
                        <span className="inline-flex items-center gap-1 text-gray-500 normal-case tracking-normal">
                          <CalendarDays
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          <time dateTime={update.publishedDate}>
                            {formatDate(update.publishedDate)}
                          </time>
                        </span>
                      )}
                    </div>
                    <h2 className="mt-3 text-xl font-semibold text-gray-900">
                      {update.title}
                    </h2>
                    <p className="mt-2 max-w-4xl leading-relaxed text-gray-700">
                      {update.summary}
                    </p>
                    {isInternal ? (
                      <Link
                        to={update.href}
                        className="mt-4 inline-flex items-center gap-1 font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
                      >
                        Read the portal record
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : (
                      <a
                        href={update.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1 font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
                      >
                        Open the source
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    <SourceMeta source={update.source} />
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-600">
              No source-backed updates have been published yet.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
