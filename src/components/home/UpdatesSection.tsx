import { ArrowRight, CalendarDays, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import Section from '../ui/Section';
import { SourceMeta } from '../civic/SourceMeta';
import { updateRecords } from '../../data/civicRecords';

function labelForType(type: string) {
  return type.replace('-', ' ');
}

export default function UpdatesSection() {
  const updates = updateRecords.slice(0, 3);

  return (
    <Section className="bg-gray-50" aria-label="Latest source-backed updates">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
            Latest updates
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Public information recently reviewed
          </h2>
          <p className="mt-2 max-w-3xl text-gray-600">
            This feed contains dated public records and announcements with a
            visible source. It is not a live government announcement channel.
          </p>
        </div>
        <Link
          to="/updates"
          className="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-900"
        >
          View all updates <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {updates.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {updates.map(update => (
            <article
              key={update.id}
              className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-primary-700">
                <span>{labelForType(update.type)}</span>
                {update.publishedDate && (
                  <span className="inline-flex items-center gap-1 text-gray-500 normal-case tracking-normal">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    <time dateTime={update.publishedDate}>
                      {update.publishedDate}
                    </time>
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {update.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                {update.summary}
              </p>
              <a
                href={update.href}
                target={update.href.startsWith('/') ? undefined : '_blank'}
                rel={update.href.startsWith('/') ? undefined : 'noreferrer'}
                className="mt-4 inline-flex items-center gap-1 font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900"
              >
                Open source{' '}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <SourceMeta source={update.source} />
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
          No source-backed updates have been published yet.
        </div>
      )}
    </Section>
  );
}
