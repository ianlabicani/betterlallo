import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useQueryState } from 'nuqs';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { searchClient, SEARCH_INDEX } from '../lib/meilisearch';
import {
  searchLocalContent,
  type ContentSearchHit,
} from '../data/contentIndex';
import SEO from '../components/SEO';

const suggestions = [
  { label: 'Services', query: 'service', href: '/services' },
  {
    label: 'Barangays',
    query: 'barangay',
    href: '/government/barangays/directory',
  },
  { label: 'Transparency', query: 'transparency', href: '/transparency' },
];

export default function Search() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' });
  const [remoteResults, setRemoteResults] = useState<{
    query: string;
    results: ContentSearchHit[];
  } | null>(null);
  const [isRemoteLoading, setIsRemoteLoading] = useState(false);

  const localResults = useMemo(() => searchLocalContent(query ?? ''), [query]);
  const hasQuery = Boolean(query?.trim());

  useEffect(() => {
    if (!hasQuery || !searchClient) return;
    const client = searchClient;

    const timer = setTimeout(async () => {
      setIsRemoteLoading(true);
      try {
        const index = client.index(SEARCH_INDEX);
        const response = await index.search(query!.trim(), { limit: 20 });
        setRemoteResults({
          query: query!.trim(),
          results: response.hits.map(hit => ({
            id: hit.id,
            title: hit.title,
            description: hit.description,
            type: hit.type,
            category: hit.category,
            categorySlug: hit.categorySlug,
            slug: hit.slug,
            url: hit.url,
          })),
        });
      } catch {
        // The local build-time index remains the fallback when Meilisearch is unavailable.
        setRemoteResults(null);
      } finally {
        setIsRemoteLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [hasQuery, query]);

  const results =
    remoteResults?.query === query?.trim()
      ? remoteResults.results
      : localResults;

  return (
    <>
      <SEO
        title="Search"
        description="Search BetterLal-lo services, government information, and source-first guides."
        keywords="Lal-lo search, government services, public records, barangays"
      />
      <main className="container mx-auto max-w-4xl px-4 py-10">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
            BetterLal-lo index
          </p>
          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            Search local information
          </h1>
          <p className="mb-6 text-gray-600">
            Search the build-time civic information index. Results stay
            available even when an optional remote search service is not
            configured.
          </p>
        </div>

        <label htmlFor="site-search" className="sr-only">
          Search services, departments, guides, and records
        </label>
        <div className="relative mb-5">
          <SearchIcon
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="site-search"
            type="search"
            value={query ?? ''}
            onChange={event => setQuery(event.target.value || null)}
            placeholder="Search services, departments, barangays..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            autoFocus
          />
        </div>

        <div
          className="mb-8 flex flex-wrap gap-2"
          aria-label="Search suggestions"
        >
          {suggestions.map(suggestion => (
            <button
              key={suggestion.label}
              type="button"
              onClick={() => setQuery(suggestion.query)}
              className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-800 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {suggestion.label}
            </button>
          ))}
          <Link
            to="/services"
            className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:border-primary-300 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Browse all <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {isRemoteLoading && (
            <p className="mb-4 text-sm text-gray-500">Updating results...</p>
          )}

          {hasQuery && !isRemoteLoading && results.length === 0 && (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center text-gray-600">
              No results for <span className="font-medium">“{query}”</span>. Try
              a service name, barangay, or department.
            </div>
          )}

          {hasQuery && results.length > 0 && (
            <div className="space-y-3">
              <p className="mb-4 text-sm text-gray-500">
                {results.length} result{results.length !== 1 ? 's' : ''} for “
                {query}”
              </p>
              {results.map(hit => (
                <Link key={hit.id} to={hit.url} className="group block">
                  <article className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50 focus-within:ring-2 focus-within:ring-primary-500">
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${hit.type === 'service' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}
                      >
                        {hit.category}
                      </span>
                    </div>
                    <h2 className="text-base font-semibold text-gray-900 group-hover:text-primary-700">
                      {hit.title}
                    </h2>
                    {hit.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                        {hit.description}
                      </p>
                    )}
                  </article>
                </Link>
              ))}
            </div>
          )}

          {!hasQuery && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-10 text-center text-gray-600">
              Start typing to search across services and government information.
            </div>
          )}
        </div>
      </main>
    </>
  );
}
