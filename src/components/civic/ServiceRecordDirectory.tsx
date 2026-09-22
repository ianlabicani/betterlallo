import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ClipboardList,
  ExternalLink,
  Filter,
  Globe2,
  Search,
  X,
} from 'lucide-react';
import { Link } from 'react-router';
import {
  citizenCharter2026Document,
  onlineServiceLinks,
  serviceRecords,
} from '../../data/civicRecords';
import { SourceMeta, VerificationBadge } from './SourceMeta';

function uniqueSorted(values: string[]) {
  return [...new Set(values.filter(Boolean))].sort((left, right) =>
    left.localeCompare(right)
  );
}

function selectClassName() {
  return 'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500';
}

export default function ServiceRecordDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [office, setOffice] = useState('');
  const [transactionType, setTransactionType] = useState('');

  const categories = useMemo(
    () => uniqueSorted(serviceRecords.map(record => record.category)),
    []
  );
  const offices = useMemo(
    () =>
      uniqueSorted(
        serviceRecords.map(record => record.responsibleOffice ?? '')
      ),
    []
  );
  const transactionTypes = useMemo(
    () =>
      uniqueSorted(
        serviceRecords.flatMap(record => record.transactionTypes ?? [])
      ),
    []
  );

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return serviceRecords.filter(record => {
      const searchable = [
        record.title,
        record.description,
        record.category,
        record.classification,
        record.responsibleOffice,
        record.transactionTypes?.join(' '),
        record.charterPages,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return (
        (!normalizedQuery || searchable.includes(normalizedQuery)) &&
        (!category || record.category === category) &&
        (!office || record.responsibleOffice === office) &&
        (!transactionType || record.transactionTypes?.includes(transactionType))
      );
    });
  }, [category, office, query, transactionType]);

  const hasFilters = Boolean(query || category || office || transactionType);

  function clearFilters() {
    setQuery('');
    setCategory('');
    setOffice('');
    setTransactionType('');
  }

  return (
    <section
      className="border-t border-gray-200 bg-gray-50 py-12"
      aria-labelledby="service-records-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-start gap-3">
          <ClipboardList
            className="mt-1 h-7 w-7 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <h2
              id="service-records-heading"
              className="text-2xl font-bold text-gray-900"
            >
              Structured service records
            </h2>
            <p className="mt-2 max-w-3xl text-gray-600">
              Search the Lal-lo Citizen’s Charter 2026 procedures alongside the
              portal’s existing source-backed service guides. Charter records
              preserve the published classification, transaction type,
              requirements, fees, processing times, steps, and page reference.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <div>
              <label
                htmlFor="service-record-search"
                className="mb-1 block text-sm font-semibold text-gray-800"
              >
                Search procedures
              </label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="service-record-search"
                  type="search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder="Search titles, requirements, offices, or pages..."
                  className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="service-record-category"
                className="mb-1 block text-sm font-semibold text-gray-800"
              >
                Office category
              </label>
              <select
                id="service-record-category"
                value={category}
                onChange={event => setCategory(event.target.value)}
                className={selectClassName()}
              >
                <option value="">All categories</option>
                {categories.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="service-record-office"
                className="mb-1 block text-sm font-semibold text-gray-800"
              >
                Responsible office
              </label>
              <select
                id="service-record-office"
                value={office}
                onChange={event => setOffice(event.target.value)}
                className={selectClassName()}
              >
                <option value="">All offices</option>
                {offices.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="service-record-transaction"
                className="mb-1 block text-sm font-semibold text-gray-800"
              >
                Transaction type
              </label>
              <select
                id="service-record-transaction"
                value={transactionType}
                onChange={event => setTransactionType(event.target.value)}
                className={selectClassName()}
              >
                <option value="">All transaction types</option>
                {transactionTypes.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-600" aria-live="polite">
              Showing{' '}
              <span className="font-semibold text-gray-900">
                {filteredRecords.length}
              </span>{' '}
              of {serviceRecords.length} service records
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>
        </div>

        {filteredRecords.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecords.map(record => (
              <article
                key={record.slug}
                className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                    {record.category}
                  </span>
                  <VerificationBadge status={record.status} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {record.title}
                </h3>
                {record.recordKind === 'charter-procedure' && (
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-1 font-semibold text-primary-800">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      Citizen’s Charter 2026
                    </span>
                    {record.charterPages && (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                        PDF page {record.charterPages}
                      </span>
                    )}
                  </div>
                )}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                  {record.description}
                </p>
                {record.transactionTypes?.length ? (
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Transaction: {record.transactionTypes.join(' · ')}
                  </p>
                ) : null}
                {record.pendingFields?.length ? (
                  <p className="mt-4 rounded-md bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                    Not published from the cited source:{' '}
                    {record.pendingFields.join(', ')}.
                  </p>
                ) : null}
                <SourceMeta source={record.source} />
                <Link
                  to={`/services/record/${record.slug}`}
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  View service record{' '}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-center text-gray-600">
            No service records match the current search and filters.
          </div>
        )}

        <div
          className="mt-10 rounded-lg border border-primary-100 bg-primary-50 p-5"
          aria-labelledby="charter-downloads-heading"
        >
          <div className="flex items-start gap-3">
            <ClipboardList
              className="mt-1 h-6 w-6 shrink-0 text-primary-700"
              aria-hidden="true"
            />
            <div>
              <h3
                id="charter-downloads-heading"
                className="text-xl font-bold text-gray-900"
              >
                Lal-lo Citizen’s Charter 2026 PDF
              </h3>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-gray-700">
                The official Google Drive copy is the canonical source. The
                local mirror is provided for dependable access and is not an
                automatically refreshed copy.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={citizenCharter2026Document.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                >
                  Open official PDF{' '}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={citizenCharter2026Document.localUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-primary-700 px-4 py-2 text-sm font-semibold text-primary-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                >
                  Open local mirror{' '}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-3 inline-flex items-center gap-2 text-xs text-gray-600">
                <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                {citizenCharter2026Document.pageCount}-page municipal source
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10" aria-labelledby="online-services-heading">
          <div className="mb-4 flex items-start gap-3">
            <Globe2
              className="mt-1 h-6 w-6 shrink-0 text-primary-700"
              aria-hidden="true"
            />
            <div>
              <h3
                id="online-services-heading"
                className="text-xl font-bold text-gray-900"
              >
                Verified online service links
              </h3>
              <p className="mt-1 max-w-3xl text-sm text-gray-600">
                Only links with a source that identifies the Lal-lo service are
                published here. A general agency homepage is not treated as a
                local application channel.
              </p>
            </div>
          </div>
          {onlineServiceLinks.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {onlineServiceLinks.map(link => (
                <article
                  key={link.id}
                  className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <h4 className="font-semibold text-gray-900">{link.label}</h4>
                  <p className="mt-2 text-sm text-gray-600">
                    {link.description}
                  </p>
                  <p className="mt-3 text-sm text-gray-600">
                    Authority: {link.authority}
                  </p>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1 font-semibold text-primary-700 underline underline-offset-2"
                  >
                    Open service link{' '}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <SourceMeta source={link.source} />
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-amber-300 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">
              No Lal-lo-specific online application or payment links have been
              verified yet. Use the source-backed guide and contact the
              responsible office before submitting documents or payment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
