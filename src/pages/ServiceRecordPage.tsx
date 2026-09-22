import { Link, useParams } from 'react-router';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import { SourceMeta, VerificationBadge } from '../components/civic/SourceMeta';
import {
  citizenCharter2026Document,
  serviceRecords,
} from '../data/civicRecords';

function DetailValue({
  label,
  value,
  pending = false,
  pendingReason,
}: {
  label: string;
  value?: string;
  pending?: boolean;
  pendingReason?: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd
        className={`mt-2 text-sm ${value ? 'text-gray-900' : 'text-amber-800'}`}
      >
        {value ??
          (pending
            ? (pendingReason ??
              'Not published: the cited source does not include this field.')
            : 'Not published: the cited source does not include this field.')}
      </dd>
    </div>
  );
}

export default function ServiceRecordPage() {
  const { serviceSlug } = useParams();
  const record = serviceRecords.find(item => item.slug === serviceSlug);

  if (!record) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900">
          Service record not found
        </h1>
        <p className="mt-3 text-gray-600">
          The service record may not have been published yet.
        </p>
        <Link
          to="/services"
          className="mt-6 inline-flex font-semibold text-primary-700"
        >
          Back to services
        </Link>
      </main>
    );
  }

  const pending = new Set(record.pendingFields ?? []);

  return (
    <>
      <SEO
        title={record.title}
        description={record.description}
        keywords={`${record.title}, Lal-lo services, public service record`}
      />
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <Link
          to="/services"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to services
        </Link>
        <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-700">
              {record.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-900">{record.title}</h1>
            <p className="mt-3 max-w-3xl text-gray-600">{record.description}</p>
          </div>
          <VerificationBadge status={record.status} />
        </div>

        <section aria-labelledby="service-details-heading">
          <h2
            id="service-details-heading"
            className="mb-4 text-xl font-bold text-gray-900"
          >
            Service details
          </h2>
          <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DetailValue label="Service category" value={record.category} />
            <DetailValue
              label="Transaction classification"
              value={record.classification}
            />
            <DetailValue
              label="Transaction type"
              value={record.transactionTypes?.join(' · ')}
              pending={pending.has('transaction type')}
            />
            <DetailValue
              label="Charter page reference"
              value={record.charterPages}
              pending={pending.has('source location')}
            />
            <DetailValue
              label="Who may apply"
              value={record.whoMayApply}
              pending={pending.has('eligibility')}
              pendingReason="Not published: no directly applicable Lal-lo eligibility rule has been located."
            />
            <DetailValue
              label="Processing time"
              value={record.processingTime}
              pending={pending.has('processing time')}
              pendingReason="Not published: the cited source does not give a Lal-lo-specific processing time."
            />
            <DetailValue
              label="Fees"
              value={record.fees}
              pending={pending.has('fees')}
              pendingReason="Not published: no directly applicable Lal-lo fee schedule has been located."
            />
            <DetailValue
              label="Responsible office"
              value={record.responsibleOffice}
              pending={pending.has('responsible office')}
              pendingReason="Not published: the cited source does not identify a Lal-lo municipal office for this field."
            />
            <DetailValue
              label="Contact"
              value={record.contact}
              pending={pending.has('contact')}
              pendingReason="Not published: no directly applicable contact has been located."
            />
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Online portal
              </dt>
              <dd className="mt-2 text-sm">
                {record.onlinePortal ? (
                  <a
                    href={record.onlinePortal}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-primary-700 underline underline-offset-2"
                  >
                    Open official portal{' '}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="text-amber-800">
                    Not published: no official online application channel has
                    been located.
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </section>

        <section
          className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2"
          aria-label="Requirements and application steps"
        >
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-xl font-bold text-gray-900">Requirements</h2>
            {record.requirements?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
                {record.requirements.map(requirement => (
                  <li key={requirement.name}>
                    {requirement.name}
                    {requirement.notes ? ` — ${requirement.notes}` : ''}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-amber-800">
                Not published: the cited source does not provide a complete
                Lal-lo checklist. Do not treat this page as a complete
                checklist.
              </p>
            )}
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <h2 className="text-xl font-bold text-gray-900">
              Application steps
            </h2>
            {record.steps?.length ? (
              <ol className="mt-4 space-y-3 text-sm text-gray-700">
                {record.steps.map((step, index) => (
                  <li key={`${step.number}-${index}`}>
                    <span className="mr-2 font-semibold text-primary-700">
                      {step.number}
                    </span>
                    {step.role === 'agency' && (
                      <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Agency action:
                      </span>
                    )}
                    {step.action}
                    {step.office ? ` (${step.office})` : ''}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-sm text-amber-800">
                Not published: the cited source does not provide a
                Lal-lo-specific application sequence.
              </p>
            )}
          </div>
        </section>

        <SourceMeta source={record.source} />
        {record.recordKind === 'charter-procedure' && (
          <div className="mt-4 rounded-lg border border-primary-100 bg-primary-50 p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">
              Citizen’s Charter 2026 source document
            </p>
            <p className="mt-1">
              This procedure was transcribed from PDF page {record.charterPages}
              . The official Drive URL is canonical; the local mirror is a
              static copy for reliable access.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={citizenCharter2026Document.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary-700 underline underline-offset-2"
              >
                Open official PDF
              </a>
              <a
                href={citizenCharter2026Document.localUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary-700 underline underline-offset-2"
              >
                Open local PDF mirror
              </a>
            </div>
          </div>
        )}
        {record.relatedSources?.map(relatedSource => (
          <SourceMeta key={relatedSource.url} source={relatedSource} />
        ))}
      </main>
    </>
  );
}
