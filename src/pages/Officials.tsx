import { Users } from 'lucide-react';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import { departmentRecords } from '../data/civicRecords';

export default function Officials() {
  const officials = departmentRecords.filter(record =>
    ['office-of-the-mayor', 'sangguniang-bayan'].includes(record.slug)
  );

  return (
    <>
      <SEO
        title="Elected officials"
        description="Source-first elected-official information for the Municipality of Lal-lo, Cagayan."
        keywords="Lal-lo mayor, Sangguniang Bayan, elected officials"
      />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-start gap-3">
          <Users
            className="mt-1 h-8 w-8 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
              Government
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              Elected officials
            </h1>
            <p className="mt-3 max-w-3xl text-gray-600">
              Published names and roles are linked to their source. Office
              contacts and additional council details stay pending until a
              primary publication confirms them.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {officials.map(official => (
            <article
              key={official.slug}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  {official.name}
                </h2>
                <VerificationBadge status={official.status} />
              </div>
              {official.head ? (
                <p className="mt-5 text-lg font-medium text-gray-900">
                  {official.head}
                </p>
              ) : (
                <p className="mt-5 text-sm text-amber-800">
                  Current names pending verification.
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {official.description}
              </p>
              <SourceMeta source={official.source} />
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
