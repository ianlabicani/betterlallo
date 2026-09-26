import { ArrowRight, CalendarDays, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import Section from '../ui/Section';
import { SourceMeta, VerificationBadge } from '../civic/SourceMeta';
import { updateRecords } from '../../data/civicRecords';

function labelForType(type: string) {
  const label = type.replace('-', ' ');
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default function UpdatesSection() {
  const updates = updateRecords.slice(0, 3);
  const [leadUpdate, ...supportingUpdates] = updates;

  return (
    <Section
      className="border-y border-gray-200 bg-gray-50 py-12 sm:py-14"
      aria-label="Latest source-backed updates"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl border-l-4 border-accent-500 pl-4">
          <p className="mb-2 text-sm font-semibold tracking-wide text-primary-700">
            What’s new
          </p>
          <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            Public information recently reviewed
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
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

      {leadUpdate ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <article className="flex flex-col border border-gray-200 bg-white p-6 shadow-sm md:col-span-6 sm:p-7">
            <div className="flex items-center justify-between gap-3 text-sm font-semibold text-primary-700">
              <span>{labelForType(leadUpdate.type)}</span>
              {leadUpdate.publishedDate && (
                <span className="inline-flex items-center gap-1 text-xs font-normal text-gray-500">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                  <time dateTime={leadUpdate.publishedDate}>
                    {leadUpdate.publishedDate}
                  </time>
                </span>
              )}
            </div>
            <h3 className="mt-4 text-2xl font-bold leading-tight text-gray-900">
              {leadUpdate.title}
            </h3>
            <p className="mt-3 flex-1 leading-relaxed text-gray-600">
              {leadUpdate.summary}
            </p>
            <a
              href={leadUpdate.href}
              target={leadUpdate.href.startsWith('/') ? undefined : '_blank'}
              rel={leadUpdate.href.startsWith('/') ? undefined : 'noreferrer'}
              className="mt-6 inline-flex items-center gap-1 self-start font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Open source{' '}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <SourceMeta source={leadUpdate.source} />
          </article>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-6">
            {supportingUpdates.map(update => (
              <article
                key={update.id}
                className="flex flex-col border-t-2 border-primary-200 pt-5"
              >
                <div className="flex items-center justify-between gap-3 text-sm font-semibold text-primary-700">
                  <span>{labelForType(update.type)}</span>
                  {update.publishedDate && (
                    <span className="inline-flex items-center gap-1 text-xs font-normal text-gray-500">
                      <CalendarDays
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      <time dateTime={update.publishedDate}>
                        {update.publishedDate}
                      </time>
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-xl font-semibold leading-tight text-gray-900">
                  {update.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {update.summary}
                </p>
                <a
                  href={update.href}
                  target={update.href.startsWith('/') ? undefined : '_blank'}
                  rel={update.href.startsWith('/') ? undefined : 'noreferrer'}
                  className="mt-5 inline-flex items-center gap-1 self-start font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  Open source{' '}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <VerificationBadge status={update.source.status} compact />
                  <SourceMeta source={update.source} compact />
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
          No source-backed updates have been published yet.
        </div>
      )}
    </Section>
  );
}
