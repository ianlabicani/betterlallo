import { useMemo, useState } from 'react';
import { ExternalLink, Mail, Phone, Search as SearchIcon } from 'lucide-react';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import {
  departmentRecords,
  publicDirectoryRecords,
} from '../data/civicRecords';
import type { DepartmentRecord } from '../types/civic';

function DirectoryCard({ record }: { record: DepartmentRecord }) {
  return (
    <article
      id={record.slug}
      className="flex h-full scroll-mt-36 flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">{record.name}</h3>
        <VerificationBadge status={record.status} />
      </div>
      {record.scope && (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary-700">
          {record.scope}
        </p>
      )}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
        {record.description}
      </p>
      {record.head && (
        <p className="mt-4 text-sm text-gray-800">
          <span className="font-semibold">Head / contact:</span> {record.head}
        </p>
      )}
      {record.telephone && (
        <a
          href={`tel:${record.telephone.replace(/[^+\d]/g, '')}`}
          className="mt-2 inline-flex items-center gap-2 text-sm text-gray-800 hover:text-primary-700"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span>{record.telephone}</span>
        </a>
      )}
      {record.email && (
        <a
          href={`mailto:${record.email}`}
          className="mt-2 inline-flex items-center gap-2 break-all text-sm text-gray-800 hover:text-primary-700"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>{record.email}</span>
        </a>
      )}
      {record.website && (
        <a
          href={record.website}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 underline underline-offset-2"
        >
          Official website{' '}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
      {record.mapUrl && (
        <a
          href={record.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 underline underline-offset-2"
        >
          Open map <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
      <SourceMeta source={record.source} />
      {record.relatedSources?.map(source => (
        <SourceMeta key={source.url} source={source} />
      ))}
    </article>
  );
}

export default function GovernmentDirectory() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const matches = useMemo(() => {
    const allRecords = [...departmentRecords, ...publicDirectoryRecords];
    return allRecords.filter(record =>
      [
        record.name,
        record.description,
        record.scope,
        record.head,
        record.telephone,
        record.email,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery]);
  const municipalDepartments = matches.filter(record =>
    departmentRecords.some(item => item.slug === record.slug)
  );
  const publicRecords = matches.filter(record =>
    publicDirectoryRecords.some(item => item.slug === record.slug)
  );

  return (
    <>
      <SEO
        title="Government directory"
        description="Search the source-first municipal and public-office directory for Lal-lo, Cagayan."
        keywords="Lal-lo departments, municipal offices, government directory, public contacts"
      />
      <main className="container mx-auto max-w-6xl px-4 py-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
          Government
        </p>
        <h1 className="text-3xl font-bold text-gray-900">
          Government directory
        </h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          Search municipal offices and verified public-agency records relevant
          to Lal-lo. A provincial, regional, or national record is labeled with
          its scope and is not presented as a municipal office.
        </p>

        <div className="relative mt-8 max-w-xl">
          <label htmlFor="department-search" className="sr-only">
            Search government offices and public records
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
            placeholder="Search offices, services, names, or contacts..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <p className="mt-5 text-sm text-gray-500" aria-live="polite">
          {matches.length} record{matches.length !== 1 ? 's' : ''} shown
        </p>

        {municipalDepartments.length > 0 && (
          <section
            className="mt-7"
            aria-labelledby="municipal-directory-heading"
          >
            <h2
              id="municipal-directory-heading"
              className="mb-4 text-2xl font-bold text-gray-900"
            >
              Municipal offices
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {municipalDepartments.map(record => (
                <DirectoryCard key={record.slug} record={record} />
              ))}
            </div>
          </section>
        )}

        {publicRecords.length > 0 && (
          <section className="mt-10" aria-labelledby="public-directory-heading">
            <h2
              id="public-directory-heading"
              className="mb-4 text-2xl font-bold text-gray-900"
            >
              Other verified public records
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {publicRecords.map(record => (
                <DirectoryCard key={record.slug} record={record} />
              ))}
            </div>
          </section>
        )}

        {matches.length === 0 && (
          <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center text-gray-600">
            No government records match “{query}”.
          </div>
        )}
      </main>
    </>
  );
}
