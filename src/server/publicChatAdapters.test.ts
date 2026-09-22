import { describe, expect, it, vi } from 'vitest';
import {
  getPublicChatSourceDescriptors,
  lookupPublicChatSource,
} from './publicChatAdapters';

function response(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('public chat source adapters', () => {
  it('registers every requested source and marks unverified contracts unavailable', () => {
    const descriptors = getPublicChatSourceDescriptors();
    const ids = descriptors.map(descriptor => descriptor.id);

    expect(ids).toEqual([
      'juris_law',
      'juris_bills',
      'bettergov_budget',
      'bettergov_services',
      'bettergov_officials',
      'bettergov_statistics',
      'bettergov_classifications',
      'bettergov_flood_control',
      'dpwh_public_works',
      'asean_regional_indicators',
    ]);
    expect(
      descriptors
        .filter(descriptor => descriptor.availability === 'ready')
        .map(descriptor => descriptor.id)
    ).toEqual(['bettergov_budget', 'bettergov_statistics']);
  });

  it('normalizes a bounded Budget API search into evidence and allowlisted links', async () => {
    const result = await lookupPublicChatSource('bettergov_budget', {
      query: 'flood control',
      operation: 'search',
      limit: 5,
      fetchImpl: (async () =>
        response({
          meta: { dataset: 'gaa' },
          data: [
            {
              id: 'program-1',
              program: 'Flood control and mitigation',
              department: 'Department of Public Works and Highways',
              amount: 1200000,
            },
          ],
        })) as typeof fetch,
      signal: new AbortController().signal,
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      sourceId: 'bettergov_budget',
      status: 'verified',
      canonicalUrl: expect.stringContaining(
        'https://budget.bettergov.ph/api/v1/gaa/search'
      ),
    });
    expect(
      result[0]?.linkCandidates?.every(candidate =>
        candidate.url.startsWith('https://budget.bettergov.ph/')
      )
    ).toBe(true);
  });

  it('returns no records for an unavailable adapter without making a request', async () => {
    const fetchSpy = vi.fn<typeof fetch>();

    const result = await lookupPublicChatSource('juris_law', {
      query: 'Data Privacy Act',
      operation: 'search',
      limit: 5,
      fetchImpl: fetchSpy,
      signal: new AbortController().signal,
    });

    expect(result).toEqual([]);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
