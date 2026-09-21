import { ArrowRight, ClipboardList } from 'lucide-react';
import { Link } from 'react-router';
import { serviceRecords } from '../../data/civicRecords';
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
      </div>
    </section>
  );
}
