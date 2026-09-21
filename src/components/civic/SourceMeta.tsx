import type { SourceRecord, VerificationStatus } from '../../types/civic';

const statusLabels: Record<VerificationStatus, string> = {
  verified: 'Verified source',
  pending: 'Pending verification',
  unverified: 'Unverified',
};

const statusClasses: Record<VerificationStatus, string> = {
  verified: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  unverified: 'bg-red-100 text-red-800',
};

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

export function SourceMeta({ source }: { source: SourceRecord }) {
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
      <p className="mt-1">
        Last reviewed{' '}
        <time dateTime={source.lastVerified}>{source.lastVerified}</time>.
      </p>
    </div>
  );
}
