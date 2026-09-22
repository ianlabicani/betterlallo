import {
  getPublicChatCatalog,
  getPublicChatRecord,
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
  limit?: number;
}

export function getSourceCatalog(query?: string) {
  const catalog = getPublicChatCatalog();
  if (!query) return catalog;

  const candidateIds = new Set(
    searchPublicChatRecords(query, undefined, 12).map(record => record.id)
  );

  return catalog.filter(record => candidateIds.has(record.id));
}

export function lookupPublicChatSources({
  query,
  family,
  recordId,
  limit = 6,
}: PublicChatLookupRequest): PublicChatEvidence[] {
  if (recordId && recordId !== 'none' && recordId !== 'unclear') {
    const record = getPublicChatRecord(recordId);

    return record && (!family || record.family === family) ? [record] : [];
  }

  return searchPublicChatRecords(
    query,
    family,
    Math.min(Math.max(limit, 1), 6)
  );
}
