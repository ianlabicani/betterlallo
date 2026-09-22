import { Link } from 'react-router';
import { Compass, Search } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page not found"
        description="The BetterLal-lo page you requested could not be found."
      />
      <main className="container mx-auto max-w-2xl px-4 py-16 text-center">
        <Compass
          className="mx-auto h-12 w-12 text-primary-700"
          aria-hidden="true"
        />
        <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-primary-700">
          Error 404
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Page not found
        </h1>
        <p className="mt-4 leading-relaxed text-gray-600">
          That address is not part of the BetterLal-lo portal. Try a known page
          or search for the information you need.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-primary-700 px-4 py-2 font-semibold text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Go home
          </Link>
          <Link
            to="/services"
            className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:border-primary-400 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Browse services
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-800 hover:border-primary-400 hover:text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Search
          </Link>
        </div>
      </main>
    </>
  );
}
