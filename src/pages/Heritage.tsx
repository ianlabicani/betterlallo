import { ExternalLink, Landmark, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import { heritageRecords } from '../data/civicRecords';
import { Link } from 'react-router';

export default function Heritage() {
  return (
    <>
      <SEO
        title="Heritage and tourism"
        description="Source-backed heritage references for Lal-lo, Cagayan, with visitor details left pending until officially published."
        keywords="Lal-lo heritage, Lal-lo tourism, Cagayan historical sites"
      />
      <main>
        <section className="bg-primary-50 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3 text-primary-700">
                <Landmark className="h-8 w-8" aria-hidden="true" />
                <p className="text-sm font-semibold uppercase tracking-wide">
                  Heritage and tourism
                </p>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Lal-lo places and heritage references
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-gray-700">
                Start with sites identified by public heritage sources. Opening
                hours, ticket prices, facilities, accessibility, and visitor
                arrangements remain pending unless a source publishes them.
              </p>
            </div>
          </div>
        </section>

        <section
          className="container mx-auto px-4 py-10"
          aria-labelledby="heritage-heading"
        >
          <div className="mb-6 max-w-3xl">
            <h2
              id="heritage-heading"
              className="text-2xl font-bold text-gray-900"
            >
              Source-backed places
            </h2>
            <p className="mt-2 text-gray-600">
              Verify local access before traveling and use the source link for
              the most current context.
            </p>
          </div>
          {heritageRecords.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {heritageRecords.map(record => (
                <article
                  key={record.id}
                  id={record.id}
                  className="flex h-full scroll-mt-36 flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Landmark
                      className="h-7 w-7 text-primary-700"
                      aria-hidden="true"
                    />
                    <VerificationBadge status={record.status} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {record.name}
                  </h3>
                  <p className="mt-2 inline-flex items-start gap-2 text-sm font-medium text-gray-600">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    {record.location}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">
                    {record.description}
                  </p>
                  <a
                    href={record.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
                  >
                    Open heritage source
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <SourceMeta source={record.source} />
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-600">
              No verified heritage records have been published yet.
            </div>
          )}
          <div className="mt-8 rounded-lg border border-primary-100 bg-primary-50 p-5">
            <h2 className="font-semibold text-gray-900">Planning a visit?</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              BetterLal-lo does not publish guessed visitor information. Check
              the source and confirm access locally before traveling.
            </p>
            <Link
              to="/contribute"
              className="mt-3 inline-flex font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
            >
              Submit a current official source
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
