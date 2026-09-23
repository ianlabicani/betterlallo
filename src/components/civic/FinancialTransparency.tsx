import { useState } from 'react';
import type {
  FinancialMetricKey,
  FinancialSnapshot,
  FdpDocumentRecord,
} from '../../types/civic';
import { SourceMeta, VerificationBadge } from './SourceMeta';

const summaryMetrics: Array<{
  key: FinancialMetricKey;
  label: string;
}> = [
  {
    key: 'currentOperatingIncome',
    label: 'Current operating income',
  },
  {
    key: 'currentOperatingExpenditures',
    label: 'Current operating expenditures',
  },
  {
    key: 'netOperatingIncome',
    label: 'Net operating income',
  },
  {
    key: 'cashBalanceEnd',
    label: 'Cash balance, end',
  },
];

const incomeMetrics: Array<{
  key: FinancialMetricKey;
  label: string;
}> = [
  { key: 'localSources', label: 'Local sources' },
  { key: 'externalSources', label: 'External sources' },
];

const expenditureMetrics: Array<{
  key: FinancialMetricKey;
  label: string;
}> = [
  { key: 'generalPublicServices', label: 'General public services' },
  { key: 'socialServices', label: 'Social services' },
  { key: 'economicServices', label: 'Economic services' },
  { key: 'debtServiceInterest', label: 'Debt service, interest' },
];

const currencyFormatter = new Intl.NumberFormat('en-PH', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatMillions(value: number) {
  return `₱${currencyFormatter.format(value / 1_000_000)}M`;
}

function formatPercent(value: number, total: number) {
  if (total === 0) return 'Not available';
  return `${Math.round((value / total) * 100)}%`;
}

function isReconciled(snapshot: FinancialSnapshot) {
  const { metrics } = snapshot;
  const incomeDifference = Math.abs(
    metrics.localSources +
      metrics.externalSources -
      metrics.currentOperatingIncome
  );
  const expenditureDifference = Math.abs(
    metrics.generalPublicServices +
      metrics.socialServices +
      metrics.economicServices +
      metrics.debtServiceInterest -
      metrics.currentOperatingExpenditures
  );
  const netDifference = Math.abs(
    metrics.currentOperatingIncome -
      metrics.currentOperatingExpenditures -
      metrics.netOperatingIncome
  );

  return (
    incomeDifference < 0.01 &&
    expenditureDifference < 0.01 &&
    netDifference < 0.01
  );
}

function MetricTable({
  heading,
  metrics,
  snapshot,
  total,
}: {
  heading: string;
  metrics: Array<{ key: FinancialMetricKey; label: string }>;
  snapshot: FinancialSnapshot;
  total: number;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
      <div className="mt-5 space-y-4">
        {metrics.map(metric => {
          const value = snapshot.metrics[metric.key];
          const percentage = total > 0 ? (value / total) * 100 : 0;
          return (
            <div key={metric.key}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span className="font-medium text-gray-800">
                  {metric.label}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatMillions(value)}{' '}
                  <span className="font-normal text-gray-500">
                    ({formatPercent(value, total)})
                  </span>
                </span>
              </div>
              <div
                className="mt-2 h-3 overflow-hidden rounded-full bg-gray-100"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full bg-primary-700"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 border-t border-gray-100 pt-3 text-sm font-semibold text-gray-900">
        Total: {formatMillions(total)}
      </p>
    </div>
  );
}

function FdpRegister({ records }: { records: FdpDocumentRecord[] }) {
  return (
    <section aria-labelledby="fdp-register-heading" className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="fdp-register-heading"
            className="text-2xl font-bold text-gray-900"
          >
            Full Disclosure Policy register
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
            The DILG portal is the official destination for local financial and
            governance documents. Only an exact Lal-lo document URL is treated
            as published evidence here.
          </p>
        </div>
        <a
          href="https://fdpp.dilg.gov.ph/fdpp/report"
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-md border border-primary-300 px-4 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Open FDP report portal
        </a>
      </div>
      <div className="mt-5 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <caption className="sr-only">
            Full Disclosure Policy document source review register
          </caption>
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th scope="col" className="px-4 py-3">
                Document
              </th>
              <th scope="col" className="px-4 py-3">
                Period
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3">
                Evidence
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {records.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-5 text-gray-600">
                  No exact Lal-lo document matched this review. Use the official
                  portal filters before treating a document as published
                  evidence.
                </td>
              </tr>
            ) : (
              records.map(record => (
                <tr key={record.id} className="align-top">
                  <th
                    scope="row"
                    className="px-4 py-4 font-semibold text-gray-900"
                  >
                    {record.documentType}
                  </th>
                  <td className="px-4 py-4 text-gray-600">
                    {record.fiscalPeriod}
                  </td>
                  <td className="px-4 py-4">
                    {record.status === 'pending' ? (
                      <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
                        Lal-lo document not matched in this review
                      </span>
                    ) : (
                      <VerificationBadge status={record.status} />
                    )}
                  </td>
                  <td className="min-w-80 px-4 py-4 text-gray-600">
                    <a
                      href={record.documentUrl ?? record.sourcePortal}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
                    >
                      {record.documentUrl
                        ? 'Open Lal-lo document'
                        : 'Search the FDP portal'}
                    </a>
                    <p className="mt-2 leading-relaxed">{record.reviewNote}</p>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {records[0] ? <SourceMeta source={records[0].source} /> : null}
    </section>
  );
}

export default function FinancialTransparency({
  snapshots,
  fdpRecords,
}: {
  snapshots: FinancialSnapshot[];
  fdpRecords: FdpDocumentRecord[];
}) {
  const [selectedYear, setSelectedYear] = useState(2025);
  const selected =
    snapshots.find(snapshot => snapshot.fiscalYear === selectedYear) ??
    snapshots[0];

  if (!selected) return null;

  const incomeTotal = selected.metrics.currentOperatingIncome;
  const expenditureTotal = selected.metrics.currentOperatingExpenditures;

  return (
    <>
      <section
        aria-labelledby="financial-performance-heading"
        className="mt-8 rounded-lg border border-primary-100 bg-primary-50 p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
              Verified annual BLGF SRE snapshot
            </p>
            <h2
              id="financial-performance-heading"
              className="mt-2 text-2xl font-bold text-gray-900"
            >
              Financial performance
            </h2>
            <p className="mt-2 max-w-3xl text-gray-700">
              Annual Statement of Receipts and Expenditures records for the
              Municipality of Lal-Lo. The figures are reported through the BLGF
              LIFT system from LGU submissions and are not an audit opinion.
            </p>
          </div>
          <div className="rounded-md bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
            <span className="font-semibold">Selected fiscal year:</span> FY
            {selected.fiscalYear}
          </div>
        </div>

        <div
          className="mt-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Select annual financial snapshot"
        >
          {snapshots.map(snapshot => (
            <button
              key={snapshot.fiscalYear}
              type="button"
              aria-pressed={snapshot.fiscalYear === selected.fiscalYear}
              onClick={() => setSelectedYear(snapshot.fiscalYear)}
              className={`rounded-md px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                snapshot.fiscalYear === selected.fiscalYear
                  ? 'bg-primary-700 text-white'
                  : 'border border-gray-300 bg-white text-gray-800 hover:border-primary-300 hover:text-primary-700'
              }`}
            >
              FY{snapshot.fiscalYear}
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="financial-summary-heading" className="mt-8">
        <h2
          id="financial-summary-heading"
          className="mb-4 text-xl font-semibold text-gray-900"
        >
          FY{selected.fiscalYear} summary
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryMetrics.map(metric => (
            <article
              key={metric.key}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-gray-700">
                {metric.label}
              </h3>
              <p className="mt-4 text-2xl font-bold text-gray-900">
                {formatMillions(selected.metrics[metric.key])}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Source-reported annual amount
              </p>
              <SourceMeta source={selected.source} compact />
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="financial-composition-heading" className="mt-8">
        <div className="mb-4">
          <h2
            id="financial-composition-heading"
            className="text-xl font-semibold text-gray-900"
          >
            Income and expenditure composition
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            The bars are visual summaries. The accessible values and percentages
            are repeated in the text labels and source table below.
          </p>
          <SourceMeta source={selected.source} compact />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <MetricTable
            heading="Income composition"
            metrics={incomeMetrics}
            snapshot={selected}
            total={incomeTotal}
          />
          <MetricTable
            heading="Expenditure allocation"
            metrics={expenditureMetrics}
            snapshot={selected}
            total={expenditureTotal}
          />
        </div>
      </section>

      <section aria-labelledby="financial-data-table-heading" className="mt-8">
        <h2
          id="financial-data-table-heading"
          className="mb-4 text-xl font-semibold text-gray-900"
        >
          Annual data table
        </h2>
        <SourceMeta source={selected.source} compact />
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <caption className="sr-only">
              Lal-Lo FY{selected.fiscalYear} financial metrics
            </caption>
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Metric
                </th>
                <th scope="col" className="px-4 py-3">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3">
                  Source meaning
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {summaryMetrics
                .concat(incomeMetrics, expenditureMetrics)
                .map(metric => (
                  <tr key={metric.key}>
                    <th
                      scope="row"
                      className="px-4 py-3 font-semibold text-gray-900"
                    >
                      {metric.label}
                    </th>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {formatMillions(selected.metrics[metric.key])}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      FY{selected.fiscalYear} BLGF annual SRE row
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="financial-integrity-heading"
        className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="financial-integrity-heading"
            className="text-lg font-semibold text-gray-900"
          >
            Data checks
          </h2>
          <VerificationBadge status={selected.status} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">
          {isReconciled(selected)
            ? 'The selected row reconciles: local and external sources equal current operating income, expenditure categories equal current operating expenditures, and income less expenditures equals net operating income.'
            : 'The selected row needs source review because the published subtotals do not reconcile.'}
        </p>
        <SourceMeta source={selected.source} />
        {selected.reviewNote && (
          <p className="mt-3 rounded-md bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
            {selected.reviewNote}
          </p>
        )}
      </section>

      <p className="mt-6 text-sm text-gray-600">
        Quarterly Lal-Lo SRE values are not included in this release because an
        individually reviewed quarterly source record has not been approved.
      </p>

      <FdpRegister records={fdpRecords} />
    </>
  );
}
