import {
  getPublicChatCatalog,
  getPublicChatRecord,
  getPublicChatRecords,
  searchPublicChatRecords,
} from '../data/publicChatKnowledge.js';
import {
  getPublicChatSourceDescriptor,
  getPublicChatSourceDescriptors,
  lookupPublicChatSource,
  type PublicChatSourceDescriptor,
} from './publicChatAdapters.js';
import type {
  ChatLookupType,
  ChatSourceFamily,
  PublicChatEvidence,
  PublicChatSourceId,
} from '../types/publicChat.js';

export interface PublicChatLookupRequest {
  query: string;
  family?: ChatSourceFamily;
  recordId?: string;
  collection?: 'services';
  limit?: number;
}

export interface PublicChatSelectedSourceLookupRequest {
  query: string;
  operation: ChatLookupType;
  family?: ChatSourceFamily;
  recordId?: string;
  collection?: 'services';
  sourceIds: PublicChatSourceId[];
  limit?: number;
  fetchImpl: typeof fetch;
  signal: AbortSignal;
}

export interface PublicChatSelectedSourceLookupResult {
  evidence: PublicChatEvidence[];
  unavailableSourceIds: PublicChatSourceId[];
  failedSourceIds: PublicChatSourceId[];
}

const localSourceDescriptor: PublicChatSourceDescriptor = {
  id: 'local_betterlallo',
  label: 'BetterLal-lo source registry',
  description:
    'Code-defined BetterLal-lo services, contacts, guides, statistics, updates, heritage, and policy records.',
  hosts: [],
  sourceUrl: '/resources',
  capabilities: ['search', 'list', 'exact_record', 'faq'],
  availability: 'ready',
  authority: 'BetterLal-lo source registry',
  jurisdiction: 'Lal-lo, Cagayan',
  sourceType: 'repository-managed source record',
  limitations: [
    'Repository-managed records remain pending when a source does not establish a local detail.',
  ],
};

function asksVerificationPolicy(query: string): boolean {
  const normalizedQuery = query.toLowerCase();

  return (
    /\b(verif|review|source|pending)\w*\b/.test(normalizedQuery) &&
    /\b(information|record|contact|update|statistic|field)\w*\b/.test(
      normalizedQuery
    )
  );
}

function asksForServiceList(query: string): boolean {
  const normalizedQuery = query
    .toLowerCase()
    .trim()
    .replace(/[?!.,]+$/, '');
  const hasServices = /\bservices?\b/.test(normalizedQuery);
  const hasListLanguage =
    /\b(list|listed|available|offer|provide|browse|show)\b/.test(
      normalizedQuery
    );
  const isShortOverview =
    /^(?:services?|(?:what|which)\s+(?:are\s+)?(?:the\s+)?services?)$/.test(
      normalizedQuery
    );

  return hasServices && (hasListLanguage || isShortOverview);
}

export function getSourceCatalog(query?: string) {
  const catalog = getPublicChatCatalog();
  if (!query) return catalog;

  const asksForServiceListRequest = asksForServiceList(query);
  const asksVerificationPolicyRequest = asksVerificationPolicy(query);

  if (asksForServiceListRequest) {
    return catalog
      .filter(record => record.id.startsWith('service:'))
      .slice(0, 12);
  }

  if (asksVerificationPolicyRequest) {
    return catalog.filter(record => record.id === 'faq:review-policy');
  }

  const candidateIds = new Set(
    searchPublicChatRecords(query, undefined, 12).map(record => record.id)
  );

  return catalog.filter(record => candidateIds.has(record.id));
}

export function lookupPublicChatSources({
  query,
  family,
  recordId,
  collection,
  limit = 6,
}: PublicChatLookupRequest): PublicChatEvidence[] {
  if (recordId && recordId !== 'none' && recordId !== 'unclear') {
    const record = getPublicChatRecord(recordId);

    return record && (!family || record.family === family) ? [record] : [];
  }

  if (asksVerificationPolicy(query)) {
    const record = getPublicChatRecord('faq:review-policy');

    return record && (!family || family === 'faq_policy') ? [record] : [];
  }

  if (collection === 'services') {
    return getPublicChatRecords()
      .filter(record => record.id.startsWith('service:'))
      .filter(record => !family || record.family === family)
      .slice(0, Math.min(Math.max(limit, 1), 12));
  }

  return searchPublicChatRecords(
    query,
    family,
    Math.min(Math.max(limit, 1), 6)
  );
}

export function getApprovedSourceDescriptors(): PublicChatSourceDescriptor[] {
  return getPublicChatSourceDescriptors();
}

export function getAllApprovedSourceDescriptors(): PublicChatSourceDescriptor[] {
  return [localSourceDescriptor, ...getPublicChatSourceDescriptors()];
}

export function getApprovedSourceDescriptor(
  sourceId: PublicChatSourceId
): PublicChatSourceDescriptor | undefined {
  try {
    return getPublicChatSourceDescriptor(sourceId);
  } catch {
    return undefined;
  }
}

export async function lookupSelectedPublicChatSources({
  query,
  operation,
  family,
  recordId,
  collection,
  sourceIds,
  limit = 5,
  fetchImpl,
  signal,
}: PublicChatSelectedSourceLookupRequest): Promise<PublicChatSelectedSourceLookupResult> {
  const uniqueSourceIds = [...new Set(sourceIds)].slice(0, 3);
  const unavailableSourceIds: PublicChatSourceId[] = [];
  const lookupPromises: Array<Promise<PublicChatEvidence[]>> = [];
  const lookupSourceIds: PublicChatSourceId[] = [];

  for (const sourceId of uniqueSourceIds) {
    if (sourceId === 'local_betterlallo') {
      lookupPromises.push(
        Promise.resolve(
          collection === 'services'
            ? lookupPublicChatSources({
                query,
                family: family ?? 'structured_records',
                collection,
                limit,
              })
            : lookupPublicChatSources({
                query,
                family,
                recordId,
                limit,
              })
        )
      );
      lookupSourceIds.push(sourceId);
      continue;
    }

    const descriptor = getApprovedSourceDescriptor(sourceId);
    if (!descriptor || descriptor.availability !== 'ready') {
      unavailableSourceIds.push(sourceId);
      continue;
    }

    lookupPromises.push(
      lookupPublicChatSource(sourceId, {
        query,
        operation,
        recordId,
        limit: Math.min(Math.max(limit, 1), 5),
        fetchImpl,
        signal,
      })
    );
    lookupSourceIds.push(sourceId);
  }

  const settled = await Promise.allSettled(lookupPromises);
  const evidence: PublicChatEvidence[] = [];
  const failedSourceIds: PublicChatSourceId[] = [];

  settled.forEach((result, index) => {
    const sourceId = lookupSourceIds[index];
    if (!sourceId) return;

    if (result.status === 'fulfilled') {
      evidence.push(...result.value);
    } else {
      failedSourceIds.push(sourceId);
    }
  });

  const seen = new Set<string>();

  return {
    evidence: evidence.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    }),
    unavailableSourceIds,
    failedSourceIds,
  };
}
