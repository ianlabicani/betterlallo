import { ExternalLink } from 'lucide-react';
import type { SourceRecord, VerificationStatus } from '../../types/civic';

const statusLabels: Record<VerificationStatus, string> = {
  verified: 'Verified source',
  pending: 'Source review pending',
  unverified: 'Unverified',
};

const statusClasses: Record<VerificationStatus, string> = {
  verified: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  unverified: 'bg-red-100 text-red-800',
};

export function VerificationBadge({
  status,
  compact = false,
}: {
  status: VerificationStatus;
  compact?: boolean;
}) {
  const label =
    compact && status === 'verified' ? 'Verified' : statusLabels[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}
    >
      {label}
    </span>
  );
}

export function SourceMeta({
  source,
  compact = false,
}: {
  source: SourceRecord;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
        <VerificationBadge status={source.status} compact />
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open source details: ${source.label}`}
          className="inline-flex items-center gap-1 font-semibold text-gray-600 underline underline-offset-2 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Source details
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <div className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-600">
      <div className="flex flex-wrap items-center gap-2">
        <VerificationBadge status={source.status} />
        <span>
          Source:{' '}
          <a
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary-700 underline underline-offset-2 hover:text-primary-900"
          >
            {source.label}
          </a>
        </span>
      </div>
      <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
        <div>
          <dt className="inline font-semibold text-gray-700">Authority:</dt>{' '}
          <dd className="inline capitalize">{source.authority}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-gray-700">Scope:</dt>{' '}
          <dd className="inline">{source.jurisdiction}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-gray-700">Record type:</dt>{' '}
          <dd className="inline capitalize">{source.sourceType}</dd>
        </div>
        {source.dataPeriod && (
          <div>
            <dt className="inline font-semibold text-gray-700">Period:</dt>{' '}
            <dd className="inline">{source.dataPeriod}</dd>
          </div>
        )}
        {source.publicationDate && (
          <div>
            <dt className="inline font-semibold text-gray-700">Published:</dt>{' '}
            <dd className="inline">
              <time dateTime={source.publicationDate}>
                {source.publicationDate}
              </time>
            </dd>
          </div>
        )}
        {source.extractionDate && (
          <div>
            <dt className="inline font-semibold text-gray-700">Extracted:</dt>{' '}
            <dd className="inline">
              <time dateTime={source.extractionDate}>
                {source.extractionDate}
              </time>
            </dd>
          </div>
        )}
      </dl>
      <p className="mt-2">
        Last reviewed{' '}
        <time dateTime={source.lastVerified}>{source.lastVerified}</time>.
      </p>
      {source.verificationNote && (
        <p className="mt-2 rounded-md bg-gray-50 p-2 leading-relaxed">
          {source.verificationNote}
        </p>
      )}
    </div>
  );
}
