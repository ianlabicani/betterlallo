import { BarChart3, Download, Info, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import {
  barangayRecords,
  financialSnapshots,
  statisticRecords,
} from '../data/civicRecords';
import { buildBarangayCsv } from '../lib/barangayCsv';
import WeatherMapSection from '../components/civic/WeatherMapSection';

function formatValue(value: string | number | undefined) {
  return typeof value === 'number'
    ? new Intl.NumberFormat('en-PH').format(value)
    : value;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value);
}

const municipalPopulation =
  Number(
    statisticRecords.find(statistic => statistic.id === 'population')?.value
  ) || barangayRecords.reduce((total, record) => total + record.population, 0);

const barangayCsvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(buildBarangayCsv(barangayRecords))}`;

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
                <SourceMeta source={statistic.source} compact />
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
                  <tr
                    key={statistic.id}
                    id={`statistic-${statistic.id}`}
                    className="align-top scroll-mt-36"
                  >
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

        <section
          className="bg-gray-50 py-12"
          aria-labelledby="barangay-population-heading"
        >
          <div className="container mx-auto px-4">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <h2
                  id="barangay-population-heading"
                  className="text-2xl font-bold text-gray-900"
                >
                  Population by barangay
                </h2>
                <p className="mt-2 text-gray-600">
                  2024 Census of Population values for all 35 barangays. The
                  bars show relative population size; no historical trend is
                  inferred from a single census period.
                </p>
              </div>
              <a
                href={barangayCsvHref}
                download="betterlallo-barangay-population-2024.csv"
                className="inline-flex items-center gap-2 rounded-md border border-primary-700 px-4 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download CSV
              </a>
            </div>

            {barangayRecords.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  {[...barangayRecords]
                    .sort((left, right) => right.population - left.population)
                    .slice(0, 10)
                    .map(record => {
                      const percentage =
                        (record.population / municipalPopulation) * 100;
                      return (
                        <div
                          key={record.code}
                          className="rounded-lg border border-gray-200 bg-white p-4"
                        >
                          <div className="flex items-center justify-between gap-4 text-sm">
                            <span className="font-semibold text-gray-900">
                              {record.name}
                            </span>
                            <span className="shrink-0 text-gray-600">
                              {formatValue(record.population)}
                            </span>
                          </div>
                          <div
                            className="mt-3 h-2 rounded-full bg-gray-100"
                            role="progressbar"
                            aria-label={`${record.name} population share`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Number(percentage.toFixed(1))}
                          >
                            <div
                              className="h-2 rounded-full bg-primary-600"
                              style={{ width: `${Math.max(percentage, 1)}%` }}
                            />
                          </div>
                          <p className="mt-2 text-xs text-gray-500">
                            {percentage.toFixed(1)}% of Lal-lo’s 2024 population
                            · {record.classification}
                          </p>
                        </div>
                      );
                    })}
                </div>

                <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200 bg-white">
                  <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                    <caption className="sr-only">
                      Lal-lo population and household counts by barangay in 2024
                    </caption>
                    <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                      <tr>
                        <th scope="col" className="px-4 py-3">
                          Barangay
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Population
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Household population
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Households
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Classification
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {barangayRecords.map(record => (
                        <tr key={record.code}>
                          <th
                            scope="row"
                            className="px-4 py-3 font-semibold text-gray-900"
                          >
                            {record.name}
                          </th>
                          <td className="px-4 py-3 text-gray-700">
                            {formatValue(record.population)}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {formatValue(record.householdPopulation)}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {formatValue(record.households)}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {record.classification}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <SourceMeta source={barangayRecords[0].source} />
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">
                No barangay population records have been published yet.
              </div>
            )}
          </div>
        </section>

        <section
          className="container mx-auto px-4 py-12"
          aria-labelledby="financial-trend-heading"
        >
          <div className="mb-6 flex items-start gap-3">
            <TrendingUp
              className="mt-1 h-7 w-7 shrink-0 text-primary-700"
              aria-hidden="true"
            />
            <div className="max-w-3xl">
              <h2
                id="financial-trend-heading"
                className="text-2xl font-bold text-gray-900"
              >
                Municipal income trend
              </h2>
              <p className="mt-2 text-gray-600">
                Current operating income reported in BLGF annual Statement of
                Receipts and Expenditures snapshots. These are reported values,
                not an audit opinion or an approved-budget forecast.
              </p>
            </div>
          </div>
          {financialSnapshots.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {financialSnapshots.map(snapshot => {
                const maxIncome = Math.max(
                  ...financialSnapshots.map(
                    item => item.metrics.currentOperatingIncome
                  )
                );
                const width =
                  (snapshot.metrics.currentOperatingIncome / maxIncome) * 100;
                return (
                  <article
                    key={snapshot.id}
                    id={`financial-${snapshot.id}`}
                    className="scroll-mt-36 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        FY {snapshot.fiscalYear}
                      </h3>
                      <VerificationBadge status={snapshot.status} />
                    </div>
                    <p className="mt-4 text-2xl font-bold text-gray-900">
                      {formatCurrency(snapshot.metrics.currentOperatingIncome)}
                    </p>
                    <div
                      className="mt-4 h-3 rounded-full bg-gray-100"
                      role="img"
                      aria-label={`FY ${snapshot.fiscalYear} current operating income comparison`}
                    >
                      <div
                        className="h-3 rounded-full bg-primary-600"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      Net operating income:{' '}
                      {formatCurrency(snapshot.metrics.netOperatingIncome)}
                    </p>
                    <SourceMeta source={snapshot.source} />
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-600">
              No financial snapshots have been published yet.
            </div>
          )}
        </section>

        <WeatherMapSection />
      </main>
    </>
  );
}
