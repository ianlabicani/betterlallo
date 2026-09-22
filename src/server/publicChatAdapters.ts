import type {
  ChatLookupType,
  ChatSourceMetadata,
  PublicChatEvidence,
  PublicChatSourceAvailability,
  PublicChatSourceCapability,
  PublicChatSourceId,
} from '../types/publicChat.js';

const MAX_SOURCE_RESPONSE_BYTES = 64 * 1024;
const MAX_EXTERNAL_QUERY_LENGTH = 240;

export interface PublicChatSourceDescriptor {
  id: PublicChatSourceId;
  label: string;
  description: string;
  hosts: readonly string[];
  sourceUrl: string;
  capabilities: readonly PublicChatSourceCapability[];
  availability: PublicChatSourceAvailability;
  authority: string;
  jurisdiction: string;
  sourceType: string;
  limitations: readonly string[];
}

export interface PublicChatAdapterRequest {
  query: string;
  operation: ChatLookupType;
  recordId?: string;
  limit: number;
  fetchImpl: typeof fetch;
  signal: AbortSignal;
}

export interface PublicChatSourceAdapter {
  descriptor: PublicChatSourceDescriptor;
  lookup(request: PublicChatAdapterRequest): Promise<PublicChatEvidence[]>;
}

export class PublicChatSourceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PublicChatSourceError';
  }
}

const sourceDescriptors: readonly PublicChatSourceDescriptor[] = [
  {
    id: 'juris_law',
    label: 'Juris — Philippine jurisprudence and laws',
    description: 'Philippine laws and court decisions.',
    hosts: ['juris.ph'],
    sourceUrl: 'https://juris.ph/',
    capabilities: ['search'],
    availability: 'unavailable',
    authority: 'Juris',
    jurisdiction: 'Philippines',
    sourceType: 'research database',
    limitations: ['A verified machine-readable search contract is pending.'],
  },
  {
    id: 'juris_bills',
    label: 'BatasWatch — Philippine bills and authors',
    description: 'Philippine bills, authors, and legislative references.',
    hosts: ['bills.juris.ph'],
    sourceUrl: 'https://bills.juris.ph/',
    capabilities: ['search'],
    availability: 'unavailable',
    authority: 'BatasWatch',
    jurisdiction: 'Philippines',
    sourceType: 'research database',
    limitations: ['A verified machine-readable search contract is pending.'],
  },
  {
    id: 'bettergov_budget',
    label: 'BetterGov.PH Budget Data API',
    description: 'Public Philippine national budget data and budget searches.',
    hosts: ['budget.bettergov.ph'],
    sourceUrl: 'https://budget.bettergov.ph/docs',
    capabilities: ['search'],
    availability: 'ready',
    authority: 'BetterGov.PH Budget Data API',
    jurisdiction: 'Philippines',
    sourceType: 'open-data API',
    limitations: [
      'Budget figures are published source data and should be checked against official DBM documents for formal work.',
    ],
  },
  {
    id: 'bettergov_services',
    label: 'BetterGov.PH Government Services',
    description: 'Philippine government service information.',
    hosts: ['bettergov.ph'],
    sourceUrl: 'https://bettergov.ph/',
    capabilities: ['search', 'list'],
    availability: 'unavailable',
    authority: 'BetterGov.PH',
    jurisdiction: 'Philippines',
    sourceType: 'government information portal',
    limitations: ['A verified read-only search contract is pending.'],
  },
  {
    id: 'bettergov_officials',
    label: 'BetterGov.PH Officials and Elections',
    description: 'Philippine officials and election information.',
    hosts: ['officials.bettergov.ph'],
    sourceUrl: 'https://officials.bettergov.ph/',
    capabilities: ['search', 'list'],
    availability: 'unavailable',
    authority: 'BetterGov.PH',
    jurisdiction: 'Philippines',
    sourceType: 'civic records portal',
    limitations: ['A verified read-only search contract is pending.'],
  },
  {
    id: 'bettergov_statistics',
    label: 'Philippine Data Explorer Statistics API',
    description: 'Searchable Philippine statistics datasets and snapshots.',
    hosts: ['statistics.bettergov.ph'],
    sourceUrl: 'https://statistics.bettergov.ph/api',
    capabilities: ['search'],
    availability: 'ready',
    authority: 'BetterGov.PH Philippine Data Explorer',
    jurisdiction: 'Philippines',
    sourceType: 'open-data snapshot API',
    limitations: [
      'Results come from saved snapshots and are not a live PSA feed; check units, definitions, and release dates.',
    ],
  },
  {
    id: 'bettergov_classifications',
    label: 'Philippine classification codes',
    description:
      'PSA geographic, industry, occupation, and other classifications.',
    hosts: ['statistics.bettergov.ph'],
    sourceUrl: 'https://statistics.bettergov.ph/api',
    capabilities: ['search'],
    availability: 'unavailable',
    authority: 'BetterGov.PH Philippine Data Explorer',
    jurisdiction: 'Philippines',
    sourceType: 'classification snapshot API',
    limitations: ['A safe natural-language code lookup contract is pending.'],
  },
  {
    id: 'bettergov_flood_control',
    label: 'BetterGov.PH Flood Control',
    description:
      'Philippine flood-control project and public-record information.',
    hosts: ['flood-control.bettergov.ph'],
    sourceUrl: 'https://flood-control.bettergov.ph/',
    capabilities: ['search'],
    availability: 'unavailable',
    authority: 'BetterGov.PH',
    jurisdiction: 'Philippines',
    sourceType: 'public records portal',
    limitations: ['A verified read-only search contract is pending.'],
  },
  {
    id: 'dpwh_public_works',
    label: 'DPWH Public Works API',
    description: 'Department of Public Works and Highways project information.',
    hosts: ['api.dpwh.bettergov.ph'],
    sourceUrl: 'https://api.dpwh.bettergov.ph/',
    capabilities: ['search'],
    availability: 'unavailable',
    authority: 'Department of Public Works and Highways / BetterGov.PH',
    jurisdiction: 'Philippines',
    sourceType: 'public records API',
    limitations: ['A verified read-only search contract is pending.'],
  },
  {
    id: 'asean_regional_indicators',
    label: 'ASEAN regional indicators',
    description: 'Regional indicators and comparative public statistics.',
    hosts: ['asean.bettergov.ph'],
    sourceUrl: 'https://asean.bettergov.ph/',
    capabilities: ['search'],
    availability: 'unavailable',
    authority: 'BetterGov.PH ASEAN indicators',
    jurisdiction: 'ASEAN region',
    sourceType: 'regional indicators portal',
    limitations: ['A verified read-only search contract is pending.'],
  },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function cleanText(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string' && typeof value !== 'number') return '';

  return String(value)
    .split('')
    .filter(character => {
      const code = character.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function normalizeQuery(query: string): string {
  return cleanText(query, MAX_EXTERNAL_QUERY_LENGTH);
}

function stableKey(value: string): string {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36);
}

function nowMetadata(): { retrievedAt: string; lastVerified: string } {
  const retrievedAt = new Date().toISOString();

  return {
    retrievedAt,
    lastVerified: retrievedAt.slice(0, 10),
  };
}

function descriptorFor(id: PublicChatSourceId): PublicChatSourceDescriptor {
  const descriptor = sourceDescriptors.find(item => item.id === id);
  if (!descriptor) throw new PublicChatSourceError('Unknown source.');
  return descriptor;
}

function safeUrl(url: string, descriptor: PublicChatSourceDescriptor): string {
  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    throw new PublicChatSourceError('Source returned an invalid URL.');
  }

  if (parsed.protocol !== 'https:' || !descriptor.hosts.includes(parsed.host)) {
    throw new PublicChatSourceError(
      'Source returned a URL outside its allowlist.'
    );
  }

  return parsed.toString();
}

async function fetchJson(
  url: string,
  request: PublicChatAdapterRequest,
  descriptor: PublicChatSourceDescriptor
): Promise<unknown> {
  const response = await request.fetchImpl(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'User-Agent': 'BetterLal-lo public chat source adapter',
    },
    signal: request.signal,
  });

  if (!response.ok) {
    throw new PublicChatSourceError(
      `${descriptor.id} returned HTTP ${response.status}.`
    );
  }

  const body = await response.text();
  if (body.length > MAX_SOURCE_RESPONSE_BYTES) {
    throw new PublicChatSourceError(`${descriptor.id} returned too much data.`);
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    throw new PublicChatSourceError(
      `${descriptor.id} returned malformed JSON.`
    );
  }
}

function payloadRows(payload: unknown): Record<string, unknown>[] {
  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    throw new PublicChatSourceError(
      'Source returned an invalid data envelope.'
    );
  }

  return payload.data.filter(isRecord);
}

function valueFrom(
  row: Record<string, unknown>,
  keys: readonly string[]
): string {
  for (const key of keys) {
    const value = cleanText(row[key]);
    if (value) return value;
  }

  return '';
}

function rowSummary(row: Record<string, unknown>): string {
  const keys = [
    'description',
    'summary',
    'title',
    'program',
    'agency',
    'department',
    'topic',
    'source',
    'unit',
    'release',
    'year',
    'amount',
    'value',
  ];
  const parts: string[] = [];

  for (const key of keys) {
    const value = cleanText(row[key], 240);
    if (!value || parts.some(part => part.startsWith(`${key}:`))) continue;
    parts.push(`${key}: ${value}`);
  }

  return parts.join('; ').slice(0, 1400);
}

function sourceMetadata(
  descriptor: PublicChatSourceDescriptor,
  metadata: ReturnType<typeof nowMetadata>,
  release?: string
): ChatSourceMetadata {
  return {
    label: descriptor.label,
    url: descriptor.sourceUrl,
    lastVerified: metadata.lastVerified,
    authority: descriptor.authority,
    jurisdiction: descriptor.jurisdiction,
    sourceType: descriptor.sourceType,
    sourceId: descriptor.id,
    retrievedAt: metadata.retrievedAt,
    ...(release ? { release } : {}),
    limitations: [...descriptor.limitations],
  };
}

function externalEvidence(
  descriptor: PublicChatSourceDescriptor,
  recordId: string,
  title: string,
  summary: string,
  answerText: string,
  canonicalUrl: string,
  release?: string
): PublicChatEvidence {
  const metadata = nowMetadata();
  const safeCanonicalUrl = safeUrl(canonicalUrl, descriptor);
  const source = sourceMetadata(descriptor, metadata, release);
  const sourceKey = `${descriptor.id}:${recordId}`;

  return {
    id: `external:${sourceKey}`,
    family: 'official_sources',
    title: cleanText(title, 180) || descriptor.label,
    summary: cleanText(summary, 900) || descriptor.description,
    answerText: cleanText(answerText, 1800) || descriptor.description,
    searchText: cleanText(`${title} ${summary} ${answerText}`, 2400),
    internalPath: '',
    status: 'verified',
    sources: [source],
    sourceId: descriptor.id,
    canonicalUrl: safeCanonicalUrl,
    retrievedAt: metadata.retrievedAt,
    ...(release ? { release } : {}),
    limitations: [...descriptor.limitations],
    linkCandidates: [
      {
        id: `${sourceKey}:evidence`,
        label: `Open ${descriptor.label}`,
        url: safeCanonicalUrl,
        kind: 'evidence',
        sourceId: descriptor.id,
      },
      {
        id: `${sourceKey}:source`,
        label: `About ${descriptor.label}`,
        url: descriptor.sourceUrl,
        kind: 'related',
        sourceId: descriptor.id,
      },
    ],
  };
}

function budgetAdapter(
  descriptor: PublicChatSourceDescriptor
): PublicChatSourceAdapter {
  return {
    descriptor,
    async lookup(request) {
      const query = normalizeQuery(request.query);
      if (query.length < 2) return [];

      const url = new URL('https://budget.bettergov.ph/api/v1/gaa/search');
      url.searchParams.set('q', query);
      url.searchParams.set('year', '2026');
      url.searchParams.set(
        'limit',
        String(Math.min(Math.max(request.limit, 1), 5))
      );
      const responseUrl = safeUrl(url.toString(), descriptor);
      const payload = await fetchJson(responseUrl, request, descriptor);
      const rows = payloadRows(payload);

      return rows.slice(0, 5).map((row, index) => {
        const title =
          valueFrom(row, ['title', 'program', 'description', 'name']) ||
          `Budget search result ${index + 1}`;
        const summary = rowSummary(row);
        const id = valueFrom(row, ['id', 'code', 'slug']) || stableKey(title);

        return externalEvidence(
          descriptor,
          id,
          title,
          summary,
          `Budget API result for the 2026 GAA search. ${summary}`,
          responseUrl,
          '2026 GAA'
        );
      });
    },
  };
}

function statisticsAdapter(
  descriptor: PublicChatSourceDescriptor
): PublicChatSourceAdapter {
  return {
    descriptor,
    async lookup(request) {
      const query = normalizeQuery(request.query);
      if (query.length < 2) return [];

      const url = new URL('https://statistics.bettergov.ph/api/v1/datasets');
      url.searchParams.set('q', query);
      url.searchParams.set('ready', 'true');
      url.searchParams.set(
        'limit',
        String(Math.min(Math.max(request.limit, 1), 5))
      );
      const responseUrl = safeUrl(url.toString(), descriptor);
      const payload = await fetchJson(responseUrl, request, descriptor);
      const rows = payloadRows(payload);

      return rows.slice(0, 5).map((row, index) => {
        const title =
          valueFrom(row, ['title', 'name', 'label', 'dataset_title']) ||
          `Statistics dataset ${index + 1}`;
        const summary = rowSummary(row);
        const id =
          valueFrom(row, ['id', 'dataset_id', 'code']) || stableKey(title);
        const release = valueFrom(row, ['release', 'release_id', 'updatedAt']);

        return externalEvidence(
          descriptor,
          id,
          title,
          summary,
          `Statistics dataset search result. ${summary}`,
          responseUrl,
          release || undefined
        );
      });
    },
  };
}

const adapters = new Map<PublicChatSourceId, PublicChatSourceAdapter>();

for (const descriptor of sourceDescriptors) {
  if (descriptor.id === 'bettergov_budget') {
    adapters.set(descriptor.id, budgetAdapter(descriptor));
  }

  if (descriptor.id === 'bettergov_statistics') {
    adapters.set(descriptor.id, statisticsAdapter(descriptor));
  }
}

export function getPublicChatSourceDescriptors(): PublicChatSourceDescriptor[] {
  return sourceDescriptors.map(descriptor => ({
    ...descriptor,
    hosts: [...descriptor.hosts],
    capabilities: [...descriptor.capabilities],
    limitations: [...descriptor.limitations],
  }));
}

export function getPublicChatSourceDescriptor(
  sourceId: PublicChatSourceId
): PublicChatSourceDescriptor {
  return descriptorFor(sourceId);
}

export function getPublicChatSourceAdapter(
  sourceId: PublicChatSourceId
): PublicChatSourceAdapter | undefined {
  return adapters.get(sourceId);
}

export async function lookupPublicChatSource(
  sourceId: PublicChatSourceId,
  request: PublicChatAdapterRequest
): Promise<PublicChatEvidence[]> {
  const adapter = adapters.get(sourceId);
  if (!adapter || adapter.descriptor.availability !== 'ready') return [];

  return adapter.lookup(request);
}
