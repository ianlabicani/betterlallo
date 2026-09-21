import { useState } from 'react';
import { FileText, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import { legislationRecords } from '../data/civicRecords';
import type { LegislationType } from '../types/civic';

const typeLabels: Record<LegislationType, string> = {
  ordinance: 'Ordinance',
  resolution: 'Resolution',
  'executive-order': 'Executive order',
};

export default function OpenLGU() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [year, setYear] = useState('all');
  const [author, setAuthor] = useState('all');
  const [term, setTerm] = useState('all');

  const authors = Array.from(
    new Set(legislationRecords.map(record => record.author).filter(Boolean))
  ) as string[];
  const terms = Array.from(
    new Set(
      legislationRecords.map(record => record.legislativeTerm).filter(Boolean)
    )
  ) as string[];
  const years = Array.from(
    new Set(legislationRecords.map(record => record.year).filter(Boolean))
  ).sort((left, right) => Number(right) - Number(left));

  const results = legislationRecords.filter(record => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      `${record.title} ${record.number ?? ''} ${record.author ?? ''}`
        .toLowerCase()
        .includes(normalizedQuery);
    const matchesType = type === 'all' || record.type === type;
    const matchesYear = year === 'all' || String(record.year) === year;
    const matchesAuthor = author === 'all' || record.author === author;
    const matchesTerm = term === 'all' || record.legislativeTerm === term;
    return (
      matchesQuery && matchesType && matchesYear && matchesAuthor && matchesTerm
    );
  });

  return (
    <>
      <SEO
        title="OpenLGU legislation"
        description="Searchable ordinances, resolutions, and executive orders for Lal-lo, Cagayan."
        keywords="Lal-lo ordinances, resolutions, executive orders, legislation"
      />
      <main className="container mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-start gap-3">
          <FileText
            className="mt-1 h-8 w-8 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
              OpenLGU
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              Lal-lo legislation
            </h1>
            <p className="mt-3 max-w-3xl text-gray-600">
              Browse ordinances, resolutions, and executive orders with document
              metadata and source links. The register stays empty until Lal-lo
              records can be published from a verifiable source.
            </p>
          </div>
        </div>

        <section
          className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          aria-labelledby="filters-heading"
        >
          <h2
            id="filters-heading"
            className="mb-4 text-lg font-semibold text-gray-900"
          >
            Search and filters
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            <div className="relative lg:col-span-2">
              <label htmlFor="legislation-search" className="sr-only">
                Search legislation by title, number, or author
              </label>
              <SearchIcon
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="legislation-search"
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Title, number, or author"
                className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <label className="text-sm text-gray-700">
              Type
              <select
                value={type}
                onChange={event => setType(event.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All types</option>
                {Object.entries(typeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-gray-700">
              Year
              <select
                value={year}
                onChange={event => setYear(event.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All years</option>
                {years.map(value => (
                  <option key={value} value={String(value)}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-gray-700">
              Author
              <select
                value={author}
                onChange={event => setAuthor(event.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All authors</option>
                {authors.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-gray-700">
              Legislative term
              <select
                value={term}
                onChange={event => setTerm(event.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All terms</option>
                {terms.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <p className="mt-5 text-sm text-gray-500" aria-live="polite">
          {results.length} record{results.length !== 1 ? 's' : ''} shown
        </p>

        {results.length > 0 ? (
          <div className="mt-4 space-y-4">
            {results.map(record => (
              <article
                key={record.id}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                      {typeLabels[record.type]}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-gray-900">
                      {record.title}
                    </h2>
                  </div>
                  <VerificationBadge status={record.status} />
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                  <div>
                    <dt className="text-gray-500">Number</dt>
                    <dd className="font-medium text-gray-900">
                      {record.number ?? 'Not published'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Year</dt>
                    <dd className="font-medium text-gray-900">
                      {record.year ?? 'Not published'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Author</dt>
                    <dd className="font-medium text-gray-900">
                      {record.author ?? 'Not published'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Legislative term</dt>
                    <dd className="font-medium text-gray-900">
                      {record.legislativeTerm ?? 'Not published'}
                    </dd>
                  </div>
                </dl>
                <SourceMeta source={record.source} />
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              No Lal-lo legislation records published yet
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600">
              This is an explicit empty state, not an indication that no
              legislation exists. Add a record only when its title, metadata,
              and source document can be checked.
            </p>
            <Link
              to="/government/departments/legislative"
              className="mt-5 inline-flex font-semibold text-primary-700 hover:text-primary-900"
            >
              Read the legislative information guide
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
