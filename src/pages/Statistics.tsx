import { BarChart3, Info } from 'lucide-react';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import { statisticRecords } from '../data/civicRecords';
import WeatherMapSection from '../components/civic/WeatherMapSection';

function formatValue(value: string | number | undefined) {
  return typeof value === 'number'
    ? new Intl.NumberFormat('en-PH').format(value)
    : value;
}

export default function Statistics() {
  return (
    <>
      <SEO
        title="Statistics"
        description="Source-backed population, barangay, budget, and development indicators for Lal-lo, Cagayan."
        keywords="Lal-lo statistics, population, barangays, Cagayan data"
      />
      <main>
        <section className="bg-primary-50 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-3">
              <BarChart3
                className="mt-1 h-8 w-8 shrink-0 text-primary-700"
                aria-hidden="true"
              />
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
                  Open data snapshot
                </p>
                <h1 className="text-3xl font-bold text-gray-900">
                  Lal-lo statistics
                </h1>
                <p className="mt-3 max-w-3xl text-gray-700">
                  A lightweight, accessible dashboard for verified Lal-lo
                  indicators. Every metric includes its period, source, and
                  review date; unavailable values remain pending rather than
                  being inferred.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="container mx-auto px-4 py-10"
          aria-labelledby="summary-heading"
        >
          <h2
            id="summary-heading"
            className="mb-5 text-2xl font-bold text-gray-900"
          >
            Summary indicators
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statisticRecords.slice(0, 4).map(statistic => (
              <article
                key={statistic.id}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {statistic.label}
                  </h3>
                  <VerificationBadge status={statistic.status} />
                </div>
                <p className="mt-5 text-3xl font-bold text-gray-900">
                  {formatValue(statistic.value) ?? 'Not published'}
                  {statistic.value !== undefined && statistic.unit && (
                    <span className="ml-1 text-base font-medium text-gray-600">
                      {statistic.unit}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-xs text-gray-500">{statistic.period}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="container mx-auto px-4 pb-12"
          aria-labelledby="metrics-heading"
        >
          <div className="mb-5 flex items-center gap-2">
            <h2
              id="metrics-heading"
              className="text-2xl font-bold text-gray-900"
            >
              Metric register
            </h2>
            <span
              title="Every row includes source metadata"
              className="text-gray-400"
            >
              <Info className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <caption className="sr-only">
                Lal-lo statistics and source metadata
              </caption>
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Metric
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Value
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Period
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Integrity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {statisticRecords.map(statistic => (
                  <tr key={statistic.id} className="align-top">
                    <th
                      scope="row"
                      className="px-4 py-4 font-semibold text-gray-900"
                    >
                      {statistic.label}
                    </th>
                    <td className="px-4 py-4 text-gray-700">
                      {formatValue(statistic.value) ?? 'Not published'}
                      {statistic.value !== undefined && statistic.unit
                        ? ` ${statistic.unit}`
                        : ''}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {statistic.period}
                    </td>
                    <td className="px-4 py-4">
                      <VerificationBadge status={statistic.status} />
                    </td>
                    <td className="min-w-72 px-4 py-4 text-gray-600">
                      <p>{statistic.description}</p>
                      <SourceMeta source={statistic.source} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <WeatherMapSection />
      </main>
    </>
  );
}
