import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  Landmark,
  MapPinned,
  Shell,
} from 'lucide-react';
import { Link } from 'react-router';
import { lalloHistoryRecords } from '../../data/lalloHistory';

const historyHighlights = [
  {
    icon: Landmark,
    title: 'Former capital of Cagayan',
    description:
      'Lalloc served as Cagayan’s capital until the provincial government moved to Tuguegarao in 1839.',
  },
  {
    icon: BookOpen,
    title: 'A northern diocese seat',
    description:
      'Lalloc was the seat of the Diocese of Nueva Segovia from its creation in 1595 until 1755.',
  },
  {
    icon: Shell,
    title: 'Archaeological landscape',
    description:
      'Shell-midden sites in Lal-lo and Gattaran connect the municipality to Cagayan’s early communities.',
  },
];

export default function HistorySection() {
  return (
    <section
      id="history"
      aria-labelledby="history-heading"
      className="border-t border-gray-200 bg-gray-50 py-12 sm:py-14"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl border-l-4 border-accent-500 pl-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary-700">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              Lal-lo through time
            </div>
            <h2
              id="history-heading"
              className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl"
            >
              Brief history of Lal-lo
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
              A short timeline of the names, roles, and heritage records that
              help place Lal-lo in Cagayan’s history.
            </p>
          </div>
          <Link
            to="/heritage"
            className="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            View heritage references
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)] lg:gap-14">
          <div className="relative pl-7">
            <div
              className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-primary-600 via-primary-300 to-primary-100"
              aria-hidden="true"
            />
            <ol className="space-y-4">
              {lalloHistoryRecords.map(record => (
                <li key={record.id} className="relative">
                  <span
                    className="absolute -left-7 top-4 z-10 h-3.5 w-3.5 rounded-full border-[3px] border-primary-700 bg-gray-50 ring-4 ring-gray-50"
                    aria-hidden="true"
                  />
                  <article className="rounded-md border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-primary-300">
                    <span className="inline-flex rounded-full bg-primary-700 px-3 py-1 text-xs font-bold text-white">
                      {record.year}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold leading-tight text-gray-900">
                      {record.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {record.description}
                    </p>
                    <a
                      href={record.source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 underline underline-offset-2 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      {record.source.label}
                      <ExternalLink
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <h3 className="text-lg font-bold text-gray-900">
              What the record shows
            </h3>
            {historyHighlights.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="flex gap-4 rounded-lg border border-primary-100 bg-white p-5 shadow-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-700 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="font-semibold leading-snug text-gray-900">
                    {title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {description}
                  </p>
                </div>
              </article>
            ))}
            <div className="flex items-start gap-3 rounded-lg border border-accent-200 bg-accent-50 p-4 text-sm leading-relaxed text-gray-700">
              <MapPinned
                className="mt-0.5 h-5 w-5 shrink-0 text-accent-700"
                aria-hidden="true"
              />
              <p>
                This timeline uses official historical and provincial sources.
                It stays short where a dated Lal-lo-specific record is not
                available.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
