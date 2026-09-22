import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router';
import type { ServiceRecord } from '../../types/civic';

interface CharterProcedureLinksProps {
  records: ServiceRecord[];
}

export default function CharterProcedureLinks({
  records,
}: CharterProcedureLinksProps) {
  if (!records.length) return null;

  return (
    <section
      className="mt-12"
      aria-labelledby="citizen-charter-procedures-heading"
    >
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <Check
            className="mt-1 h-6 w-6 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <h2
              id="citizen-charter-procedures-heading"
              className="text-2xl font-bold text-gray-900"
            >
              Citizen’s Charter 2026 procedures
            </h2>
            <p className="mt-2 max-w-3xl text-gray-600">
              Official procedures matching this service area, transcribed from
              the Lal-lo Citizen’s Charter 2026. Open a procedure for its
              requirements, fees, processing time, steps, and source links.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {records.map(record => (
          <article
            key={record.slug}
            className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-primary-300 hover:shadow-md"
          >
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-primary-50 px-2 py-1 font-semibold text-primary-800">
                Citizen’s Charter 2026
              </span>
              {record.charterPages && (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                  PDF page {record.charterPages}
                </span>
              )}
            </div>
            <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900">
              {record.title}
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-gray-500">
                  Transaction type
                </dt>
                <dd className="mt-1 text-gray-800">
                  {record.transactionTypes?.join(' · ') || 'Not published'}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-500">
                  Responsible office
                </dt>
                <dd className="mt-1 text-gray-800">
                  {record.responsibleOffice || 'Not published'}
                </dd>
              </div>
            </dl>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
              {record.description}
            </p>
            <Link
              to={`/services/record/${record.slug}`}
              className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              View full procedure
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
