import { Link, useParams } from 'react-router';
import {
  ArrowRight,
  CircleDollarSign,
  Construction,
  FileSearch,
  Landmark,
} from 'lucide-react';
import SEO from '../components/SEO';
import FinancialTransparency from '../components/civic/FinancialTransparency';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import {
  fdpDocumentRecords,
  financialSnapshots,
  transparencySections,
} from '../data/civicRecords';

const icons = {
  financial: CircleDollarSign,
  procurement: FileSearch,
  infrastructure: Construction,
} as const;

export default function Transparency() {
  const { section } = useParams();
  const selected = transparencySections.find(item => item.slug === section);

  if (!selected) {
    return (
      <>
        <SEO
          title="Transparency"
          description="Source-first financial, procurement, and infrastructure information for Lal-lo, Cagayan."
          keywords="Lal-lo transparency, budget, procurement, infrastructure"
        />
        <main className="container mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-start gap-3">
            <Landmark
              className="mt-1 h-8 w-8 shrink-0 text-primary-700"
              aria-hidden="true"
            />
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
                Open records
              </p>
              <h1 className="text-3xl font-bold text-gray-900">Transparency</h1>
              <p className="mt-3 max-w-3xl text-gray-600">
                Explore financial, procurement, and infrastructure records
                through verified source links. Lal-lo-specific records remain
                pending until a public document can be checked and cited.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {transparencySections.map(item => {
              const Icon = icons[item.slug];
              return (
                <Link
                  key={item.slug}
                  to={`/transparency/${item.slug}`}
                  className="group rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <Icon
                    className="h-8 w-8 text-primary-700"
                    aria-hidden="true"
                  />
                  <h2 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-primary-700">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-primary-700">
                    Explore section{' '}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </main>
      </>
    );
  }

  const Icon = icons[selected.slug];

  return (
    <>
      <SEO
        title={selected.title}
        description={selected.description}
        keywords={`Lal-lo ${selected.slug}, transparency, public records`}
      />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <Link
          to="/transparency"
          className="text-sm font-semibold text-primary-700 hover:text-primary-900"
        >
          ← Back to transparency
        </Link>
        <div className="mt-6 flex items-start gap-3">
          <Icon
            className="mt-1 h-8 w-8 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">
                {selected.title}
              </h1>
              <VerificationBadge status={selected.status} />
            </div>
            <p className="mt-3 max-w-3xl text-gray-600">
              {selected.description}
            </p>
          </div>
        </div>

        <section
          className="mt-8 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6"
          aria-labelledby="transparency-status-heading"
        >
          <h2
            id="transparency-status-heading"
            className="text-xl font-semibold text-gray-900"
          >
            Current data status
          </h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            {selected.summary}
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Every register entry keeps its owning authority, geographic scope,
            period, source link, and integrity label visible.
          </p>
        </section>

        {selected.slug === 'financial' && (
          <FinancialTransparency
            snapshots={financialSnapshots}
            fdpRecords={fdpDocumentRecords}
          />
        )}

        <section
          className="mt-8"
          aria-labelledby="transparency-records-heading"
        >
          <h2
            id="transparency-records-heading"
            className="mb-4 text-xl font-semibold text-gray-900"
          >
            {selected.slug === 'financial'
              ? 'Related approved-budget source'
              : 'Records register'}
          </h2>
          {selected.records?.length ? (
            <div className="space-y-4">
              {selected.records.map(record => (
                <article
                  key={record.id}
                  className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {record.title}
                    </h3>
                    <VerificationBadge status={record.status} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {record.summary}
                  </p>
                  <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <dt className="text-gray-500">Authority</dt>
                      <dd className="font-medium capitalize text-gray-900">
                        {record.authority}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Scope</dt>
                      <dd className="font-medium text-gray-900">
                        {record.jurisdiction}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Period</dt>
                      <dd className="font-medium text-gray-900">
                        {record.period}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Amount / status</dt>
                      <dd className="font-medium text-gray-900">
                        {record.amount ??
                          record.projectStatus ??
                          'Not published'}
                      </dd>
                    </div>
                  </dl>
                  {record.amount && record.projectStatus && (
                    <p className="mt-2 text-sm text-gray-600">
                      Status: {record.projectStatus}
                    </p>
                  )}
                  <SourceMeta source={record.source} />
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-700">
              No Lal-lo records are published in this section yet. The source
              register below shows where the next review can begin.
            </div>
          )}
        </section>

        <section
          className="mt-8"
          aria-labelledby="transparency-sources-heading"
        >
          <h2
            id="transparency-sources-heading"
            className="mb-4 text-xl font-semibold text-gray-900"
          >
            Official source destinations
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {selected.sources.map(source => (
              <div
                key={source.url}
                className="rounded-lg border border-gray-200 bg-white p-5"
              >
                <SourceMeta source={source} />
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/government/transparency"
            className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Read the transparency guide{' '}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/search?q=transparency"
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:border-primary-300 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Search related records
          </Link>
        </div>
      </main>
    </>
  );
}
