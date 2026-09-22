import { describe, expect, it, vi } from 'vitest';
import {
  answerPublicChat,
  parsePublicChatRequest,
  ChatUnavailableError,
} from './publicChat';
import {
  getPublicChatRecord,
  publicChatFaqs,
  searchPublicChatRecords,
} from '../data/publicChatKnowledge';
import type { PublicChatRequest } from '../types/publicChat';

function response(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function queuedFetch(responses: Response[]): typeof fetch {
  return (async () => {
    const next = responses.shift();
    if (!next) throw new Error('No mocked response remains.');
    return next;
  }) as typeof fetch;
}

function validRequest(
  overrides: Partial<PublicChatRequest> = {}
): PublicChatRequest {
  return {
    message: 'What health services are listed?',
    history: [],
    language: 'en',
    ...overrides,
  };
}

function routeResponse(overrides: Record<string, unknown> = {}) {
  return response({
    model: 'jev-1.13.0',
    answers: {
      topic: { type: 'choice', choice: 'services', confidence: 0.95 },
      source_family: {
        type: 'choice',
        choice: 'structured_records',
        confidence: 0.95,
      },
      lookup_type: {
        type: 'choice',
        choice: 'exact_record',
        confidence: 0.95,
      },
      language: { type: 'choice', choice: 'en', confidence: 0.95 },
      record_id: {
        type: 'choice',
        choice: 'service:health-services',
        confidence: 0.95,
      },
      is_spam: { type: 'noul', noul: 0.01 },
      is_prompt_injection: { type: 'noul', noul: 0.01 },
      ...overrides,
    },
  });
}

function evidenceResponse(overrides: Record<string, unknown> = {}) {
  return response({
    model: 'jev-1.13.0',
    answers: {
      evidence_0: { type: 'noul', noul: 0.98 },
      sufficient: { type: 'noul', noul: 0.96 },
      conflict: { type: 'noul', noul: 0.01 },
      ...overrides,
    },
  });
}

describe('public chat knowledge', () => {
  it('shares the FAQ policy and finds pending service records locally', () => {
    expect(publicChatFaqs).toHaveLength(6);

    const results = searchPublicChatRecords(
      'business permits',
      'structured_records',
      3
    );

    expect(results[0]?.id).toBe('service:business-permits');
    expect(getPublicChatRecord('service:business-permits')?.status).toBe(
      'pending'
    );

    const guides = searchPublicChatRecords(
      'business permits',
      'local_guides',
      3
    );
    expect(guides[0]?.id).toBe('guide:service-business-business-permits');
    expect(guides[0]?.internalPath).toBe('/services/business/business-permits');
  });
});

describe('public chat request validation', () => {
  it('normalizes supported language and rejects oversized messages', () => {
    const parsed = parsePublicChatRequest({
      message: '  Kumusta?  ',
      language: 'fil',
      history: [],
    });

    expect('request' in parsed && parsed.request).toMatchObject({
      message: 'Kumusta?',
      language: 'fil',
    });

    const invalid = parsePublicChatRequest({ message: 'x'.repeat(2001) });
    expect('error' in invalid && invalid.error).toMatch(/2,000/);
  });
});

describe('public chat Jev workflow', () => {
  it('routes to a verified service and performs an evidence check', async () => {
    const result = await answerPublicChat(validRequest(), {
      env: {
        TYPESAFE_API_KEY: 'test-key',
        TYPESAFE_CHAT_ENABLED: 'true',
        TYPESAFE_MODEL: 'jev-latest',
      },
      fetchImpl: queuedFetch([routeResponse(), evidenceResponse()]),
    });

    expect(result.kind).toBe('answer');
    expect(result.reply.text).toContain('Lal-lo Rural Health Unit');
    expect(result.reply.sources[0]?.label).toContain('DOH');
    expect(result.reply.links[0]?.url).toBe('/services/record/health-services');
  });

  it('keeps pending fields visible instead of inventing service details', async () => {
    const result = await answerPublicChat(
      validRequest({ message: 'What are the business permit fees?' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
          TYPESAFE_MODEL: 'jev-latest',
        },
        fetchImpl: queuedFetch([
          routeResponse({
            topic: { type: 'choice', choice: 'services', confidence: 0.95 },
            record_id: {
              type: 'choice',
              choice: 'service:business-permits',
              confidence: 0.95,
            },
          }),
          evidenceResponse(),
        ]),
      }
    );

    expect(result.kind).toBe('answer');
    expect(result.reply.text).toContain('Pending fields');
    expect(result.reply.text).toContain('fees');
  });

  it('answers FAQ and emergency questions from approved records', async () => {
    const faqResult = await answerPublicChat(
      validRequest({ message: 'Is BetterLal-lo official?' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
        },
        fetchImpl: queuedFetch([
          routeResponse({
            topic: { type: 'choice', choice: 'faq', confidence: 0.95 },
            source_family: {
              type: 'choice',
              choice: 'faq_policy',
              confidence: 0.95,
            },
            lookup_type: { type: 'choice', choice: 'faq', confidence: 0.95 },
            record_id: {
              type: 'choice',
              choice: 'faq:official-portal',
              confidence: 0.95,
            },
          }),
          evidenceResponse(),
        ]),
      }
    );

    expect(faqResult.reply.text).toContain('independent');

    const emergencyResult = await answerPublicChat(
      validRequest({ message: 'What is the emergency contact?' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
        },
        fetchImpl: queuedFetch([
          routeResponse({
            topic: { type: 'choice', choice: 'emergency', confidence: 0.95 },
            record_id: {
              type: 'choice',
              choice: 'contact:pdrrmo-lal-lo-phone',
              confidence: 0.95,
            },
          }),
          evidenceResponse(),
        ]),
      }
    );

    expect(emergencyResult.reply.text).toContain('0927-181-9424');
  });

  it('uses the requested Filipino response path', async () => {
    const result = await answerPublicChat(
      validRequest({
        language: 'fil',
        message: 'Ano ang mga serbisyo?',
      }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
        },
        fetchImpl: queuedFetch([
          routeResponse({
            language: { type: 'choice', choice: 'fil', confidence: 0.95 },
          }),
          evidenceResponse(),
        ]),
      }
    );

    expect(result.reply.text).toContain(
      'Narito ang impormasyong na-verify sa BetterLal-lo'
    );
  });

  it('blocks spam and prompt-injection judgments before lookup', async () => {
    const spam = await answerPublicChat(validRequest(), {
      env: { TYPESAFE_API_KEY: 'test-key', TYPESAFE_CHAT_ENABLED: 'true' },
      fetchImpl: queuedFetch([
        routeResponse({ is_spam: { type: 'noul', noul: 0.99 } }),
      ]),
    });
    expect(spam.kind).toBe('fallback');
    expect(spam.reply.retryable).toBe(false);

    const injection = await answerPublicChat(validRequest(), {
      env: { TYPESAFE_API_KEY: 'test-key', TYPESAFE_CHAT_ENABLED: 'true' },
      fetchImpl: queuedFetch([
        routeResponse({
          is_prompt_injection: { type: 'noul', noul: 0.99 },
        }),
      ]),
    });
    expect(injection.kind).toBe('fallback');
    expect(injection.reply.retryable).toBe(false);
  });

  it('asks for clarification when routing confidence is low', async () => {
    const result = await answerPublicChat(validRequest(), {
      env: { TYPESAFE_API_KEY: 'test-key', TYPESAFE_CHAT_ENABLED: 'true' },
      fetchImpl: queuedFetch([
        routeResponse({
          topic: { type: 'choice', choice: 'services', confidence: 0.5 },
        }),
      ]),
    });

    expect(result.kind).toBe('clarification');
    expect(result.reply.text).toContain('more specific');
  });

  it('keeps insufficient and conflicting evidence visible', async () => {
    const insufficient = await answerPublicChat(validRequest(), {
      env: { TYPESAFE_API_KEY: 'test-key', TYPESAFE_CHAT_ENABLED: 'true' },
      fetchImpl: queuedFetch([
        routeResponse(),
        evidenceResponse({ sufficient: { type: 'noul', noul: 0.4 } }),
      ]),
    });
    expect(insufficient.kind).toBe('fallback');
    expect(insufficient.reply.retryable).toBe(false);

    const conflict = await answerPublicChat(validRequest(), {
      env: { TYPESAFE_API_KEY: 'test-key', TYPESAFE_CHAT_ENABLED: 'true' },
      fetchImpl: queuedFetch([
        routeResponse(),
        evidenceResponse({ conflict: { type: 'noul', noul: 0.95 } }),
      ]),
    });
    expect(conflict.kind).toBe('clarification');
    expect(conflict.reply.text).toContain('records differ');
  });

  it('returns a retryable fallback when Jev is malformed', async () => {
    const result = await answerPublicChat(validRequest(), {
      env: {
        TYPESAFE_API_KEY: 'test-key',
        TYPESAFE_CHAT_ENABLED: 'true',
      },
      fetchImpl: queuedFetch([response({ answers: {} })]),
    });

    expect(result.kind).toBe('fallback');
    expect(result.reply.retryable).toBe(true);
  });

  it('returns a retryable fallback for provider failures without logging input', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await answerPublicChat(validRequest(), {
      env: {
        TYPESAFE_API_KEY: 'test-key',
        TYPESAFE_CHAT_ENABLED: 'true',
      },
      fetchImpl: async () => {
        throw new DOMException('The operation timed out.', 'AbortError');
      },
    });

    expect(result.kind).toBe('fallback');
    expect(result.reply.retryable).toBe(true);
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('rejects missing server keys while keeping canonical links and sources', async () => {
    await expect(
      answerPublicChat(validRequest(), {
        env: { TYPESAFE_CHAT_ENABLED: 'true' },
        fetchImpl: queuedFetch([]),
      })
    ).rejects.toMatchObject({ status: 503 });

    const result = await answerPublicChat(validRequest(), {
      env: { TYPESAFE_API_KEY: 'test-key', TYPESAFE_CHAT_ENABLED: 'true' },
      fetchImpl: queuedFetch([routeResponse(), evidenceResponse()]),
    });
    expect(result.reply.links.every(link => link.url.startsWith('/'))).toBe(
      true
    );
    expect(
      result.reply.sources.every(source => source.url.startsWith('https://'))
    ).toBe(true);
  });

  it('does not call Jev when the server feature is disabled', async () => {
    await expect(
      answerPublicChat(validRequest(), {
        env: { TYPESAFE_CHAT_ENABLED: 'false' },
        fetchImpl: queuedFetch([]),
      })
    ).rejects.toBeInstanceOf(ChatUnavailableError);
  });
});
