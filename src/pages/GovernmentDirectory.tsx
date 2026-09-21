import { useMemo, useState } from 'react';
import { ExternalLink, Search as SearchIcon } from 'lucide-react';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import { departmentRecords } from '../data/civicRecords';

export default function GovernmentDirectory() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const departments = useMemo(
    () =>
      departmentRecords.filter(department =>
        `${department.name} ${department.description}`
          .toLowerCase()
          .includes(normalizedQuery)
      ),
    [normalizedQuery]
  );

  return (
    <>
      <SEO
        title="Municipal office directory"
        description="Search the source-first municipal office directory for Lal-lo, Cagayan."
        keywords="Lal-lo departments, municipal offices, government directory"
      />
      <main className="container mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
          Government
        </p>
        <h1 className="text-3xl font-bold text-gray-900">
          Municipal office directory
        </h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          Searchable office profiles for the Municipality of Lal-lo. Verified
          contact details are shown only when a primary source publishes them;
          other profiles remain clearly marked as pending.
        </p>

        <div className="relative mt-8 max-w-xl">
          <label htmlFor="department-search" className="sr-only">
            Search municipal departments
          </label>
          <SearchIcon
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="department-search"
            type="search"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search offices and departments..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <p className="mt-5 text-sm text-gray-500" aria-live="polite">
          {departments.length} office profile
          {departments.length !== 1 ? 's' : ''} shown
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departments.map(department => (
            <article
              key={department.slug}
              className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {department.name}
                </h2>
                <VerificationBadge status={department.status} />
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                {department.description}
              </p>
              {department.head && (
                <p className="mt-4 text-sm text-gray-800">
                  <span className="font-semibold">Head:</span> {department.head}
                </p>
              )}
              {department.telephone && (
                <p className="mt-1 text-sm text-gray-800">
                  <span className="font-semibold">Telephone:</span>{' '}
                  {department.telephone}
                </p>
              )}
              {department.email && (
                <p className="mt-1 text-sm text-gray-800">
                  <span className="font-semibold">Email:</span>{' '}
                  {department.email}
                </p>
              )}
              {department.website && (
                <a
                  href={department.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 underline underline-offset-2"
                >
                  Official website{' '}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              <SourceMeta source={department.source} />
            </article>
          ))}
        </div>

        {departments.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-gray-600">
            No office profiles match “{query}”.
          </div>
        )}
      </main>
    </>
  );
}
