import {
  getPublicChatCatalog,
  getPublicChatRecord,
  getPublicChatRecords,
  searchPublicChatRecords,
} from '../data/publicChatKnowledge.js';
import type {
  ChatSourceFamily,
  PublicChatEvidence,
} from '../types/publicChat.js';

export interface PublicChatLookupRequest {
  query: string;
  family?: ChatSourceFamily;
  recordId?: string;
  collection?: 'services';
  limit?: number;
}

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
