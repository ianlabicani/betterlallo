import { ArrowRight, ClipboardList, ExternalLink, Globe2 } from 'lucide-react';
import { Link } from 'react-router';
import { onlineServiceLinks, serviceRecords } from '../../data/civicRecords';
import { SourceMeta, VerificationBadge } from './SourceMeta';

export default function ServiceRecordDirectory() {
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
              Each record follows a consistent format for eligibility,
              requirements, fees, processing time, steps, and the responsible
              office. Details are shown only when supported by a source.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceRecords.map(record => (
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
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                {record.description}
              </p>
              {record.pendingFields && (
                <p className="mt-4 rounded-md bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
                  Not published from the cited source:{' '}
                  {record.pendingFields.join(', ')}.
                </p>
              )}
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
