import { describe, expect, it, vi } from 'vitest';
import {
  answerPublicChat,
  parsePublicChatRequest,
  ChatUnavailableError,
} from './publicChat';
import { getSourceCatalog } from './publicChatSources';
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
      source_1: {
        type: 'choice',
        choice: 'local_betterlallo',
        confidence: 0.95,
      },
      source_2: { type: 'choice', choice: 'none', confidence: 0.95 },
      source_3: { type: 'choice', choice: 'none', confidence: 0.95 },
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

function listEvidenceResponse(overrides: Record<string, unknown> = {}) {
  return response({
    model: 'jev-1.13.0',
    answers: {
      collection_relevant: { type: 'noul', noul: 0.98 },
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

  it('exposes the complete service collection for a broad service-list request', () => {
    for (const query of [
      'services',
      'what are the services',
      'What services are listed?',
    ]) {
      const catalog = getSourceCatalog(query);

      expect(catalog.length).toBeGreaterThan(1);
      expect(catalog.every(record => record.id.startsWith('service:'))).toBe(
        true
      );
    }
  });

  it('matches the verification FAQ wording used by the chat prompt', () => {
    const results = searchPublicChatRecords(
      'How is information verified?',
      'faq_policy',
      3
    );

    expect(results[0]?.id).toBe('faq:review-policy');
  });

  it('finds the source-backed Lal-lo origin record', () => {
    const results = searchPublicChatRecords(
      'origin of lallo',
      'structured_records',
      3
    );

    expect(results[0]?.id).toBe('heritage:lalloc-nueva-segovia');
  });

  it('finds the approved Lal-lo overview guide', () => {
    const results = searchPublicChatRecords('about lallo', 'local_guides', 3);

    expect(results[0]?.id).toBe('guide:government-overview-about-lallo');
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
  it('lists the approved service records for a broad service question', async () => {
    const result = await answerPublicChat(
      validRequest({ message: 'What services are listed?' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
          TYPESAFE_MODEL: 'jev-latest',
        },
        fetchImpl: queuedFetch([
          routeResponse({
            topic: { type: 'choice', choice: 'services', confidence: 0.95 },
            lookup_type: {
              type: 'choice',
              choice: 'list',
              confidence: 0.95,
            },
            record_id: {
              type: 'choice',
              choice: 'none',
              confidence: 0.95,
            },
          }),
          listEvidenceResponse(),
        ]),
      }
    );

    expect(result.kind).toBe('answer');
    expect(result.reply.text).toContain('Services currently listed:');
    expect(result.reply.text).toContain('Lal-lo Rural Health Unit information');
    expect(result.reply.text).toContain('Business permits and registration');
    expect(result.reply.links).toHaveLength(
      getSourceCatalog('What services are listed?').length
    );
  });

  it('answers short service collection prompts', async () => {
    for (const message of ['services', 'what are the services']) {
      const result = await answerPublicChat(validRequest({ message }), {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
          TYPESAFE_MODEL: 'jev-latest',
        },
        fetchImpl: queuedFetch([
          routeResponse({
            topic: { type: 'choice', choice: 'services', confidence: 0.95 },
            source_family: {
              type: 'choice',
              choice: 'structured_records',
              confidence: 0.95,
            },
            lookup_type: {
              type: 'choice',
              choice: 'list',
              confidence: 0.95,
            },
            record_id: {
              type: 'choice',
              choice: 'none',
              confidence: 0.95,
            },
          }),
          listEvidenceResponse(),
        ]),
      });

      expect(result.kind).toBe('answer');
      expect(result.reply.text).toContain('Services currently listed:');
    }
  });

  it('answers the built-in verification prompt from the policy record', async () => {
    const result = await answerPublicChat(
      validRequest({ message: 'How is information verified?' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
          TYPESAFE_MODEL: 'jev-latest',
        },
        fetchImpl: queuedFetch([
          routeResponse({
            topic: { type: 'choice', choice: 'faq', confidence: 0.95 },
            source_family: {
              type: 'choice',
              choice: 'faq_policy',
              confidence: 0.95,
            },
            lookup_type: {
              type: 'choice',
              choice: 'scope_policy',
              confidence: 0.95,
            },
            record_id: {
              type: 'choice',
              choice: 'none',
              confidence: 0.95,
            },
          }),
          evidenceResponse(),
        ]),
      }
    );

    expect(result.kind).toBe('answer');
    expect(result.reply.text).toContain('Published records include');
    expect(result.reply.text).toContain('last-reviewed date');
  });

  it('answers a Lal-lo origin question from the historical record', async () => {
    const result = await answerPublicChat(
      validRequest({ message: 'origin of lallo' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
          TYPESAFE_MODEL: 'jev-latest',
        },
        fetchImpl: queuedFetch([
          routeResponse({
            topic: { type: 'choice', choice: 'heritage', confidence: 0.95 },
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
            record_id: {
              type: 'choice',
              choice: 'heritage:lalloc-nueva-segovia',
              confidence: 0.95,
            },
          }),
          evidenceResponse(),
        ]),
      }
    );

    expect(result.kind).toBe('answer');
    expect(result.reply.text).toContain('named Nueva Segovia');
    expect(result.reply.sources[0]?.label).toContain('National Historical');
  });

  it('answers the short Lal-lo overview prompt from the approved guide', async () => {
    const result = await answerPublicChat(
      validRequest({ message: 'about lallo' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
          TYPESAFE_MODEL: 'jev-latest',
        },
        fetchImpl: queuedFetch([
          routeResponse({
            topic: { type: 'choice', choice: 'scope', confidence: 0.95 },
            source_family: {
              type: 'choice',
              choice: 'local_guides',
              confidence: 0.95,
            },
            lookup_type: {
              type: 'choice',
              choice: 'exact_record',
              confidence: 0.95,
            },
            record_id: {
              type: 'choice',
              choice: 'guide:government-overview-about-lallo',
              confidence: 0.95,
            },
          }),
          evidenceResponse(),
        ]),
      }
    );

    expect(result.kind).toBe('answer');
    expect(result.reply.text).toContain(
      'municipality in the province of Cagayan'
    );
    expect(result.reply.links[0]?.url).toBe('/government/overview/about-lallo');
  });

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

  it('queries a Jev-selected live source and only exposes generated allowlisted links', async () => {
    let typesafeCalls = 0;
    const calls: string[] = [];
    const fetchImpl = (async (input: RequestInfo | URL) => {
      const url = String(input);
      calls.push(url);

      if (url.includes('api.typesafe.ai')) {
        typesafeCalls += 1;

        return typesafeCalls === 1
          ? routeResponse({
              topic: {
                type: 'choice',
                choice: 'transparency',
                confidence: 0.95,
              },
              source_family: {
                type: 'choice',
                choice: 'official_sources',
                confidence: 0.95,
              },
              lookup_type: {
                type: 'choice',
                choice: 'search',
                confidence: 0.95,
              },
              record_id: {
                type: 'choice',
                choice: 'none',
                confidence: 0.95,
              },
              source_1: {
                type: 'choice',
                choice: 'bettergov_budget',
                confidence: 0.95,
              },
              source_2: { type: 'choice', choice: 'none', confidence: 0.95 },
              source_3: { type: 'choice', choice: 'none', confidence: 0.95 },
            })
          : evidenceResponse({
              evidence_0: { type: 'noul', noul: 0.98 },
              related_link_0: { type: 'noul', noul: 0.95 },
            });
      }

      if (url.includes('budget.bettergov.ph')) {
        return response({
          data: [
            {
              id: 'program-1',
              program: 'Flood control and mitigation',
              department: 'Department of Public Works and Highways',
              amount: 1200000,
            },
          ],
        });
      }

      throw new Error('Unexpected source request.');
    }) as typeof fetch;

    const result = await answerPublicChat(
      validRequest({ message: 'What is in the flood control budget?' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
          PUBLIC_CHAT_EXTERNAL_SOURCES_ENABLED: 'true',
        },
        fetchImpl,
      }
    );

    expect(result.kind).toBe('answer');
    expect(result.reply.text).toContain('Flood control and mitigation');
    expect(
      result.reply.links.some(link =>
        link.url.startsWith('https://budget.bettergov.ph/')
      )
    ).toBe(true);
    expect(result.reply.relatedLinks?.[0]?.url).toBe(
      'https://budget.bettergov.ph/docs'
    );
    expect(
      calls.filter(url => url.includes('budget.bettergov.ph'))
    ).toHaveLength(1);
  });

  it('does not query an unavailable Jev-selected source', async () => {
    let calls = 0;
    const result = await answerPublicChat(
      validRequest({ message: 'What does the Data Privacy Act say?' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
          PUBLIC_CHAT_EXTERNAL_SOURCES_ENABLED: 'true',
        },
        fetchImpl: (async () => {
          calls += 1;
          return routeResponse({
            topic: { type: 'choice', choice: 'search', confidence: 0.95 },
            source_family: {
              type: 'choice',
              choice: 'official_sources',
              confidence: 0.95,
            },
            lookup_type: {
              type: 'choice',
              choice: 'search',
              confidence: 0.95,
            },
            record_id: {
              type: 'choice',
              choice: 'none',
              confidence: 0.95,
            },
            source_1: {
              type: 'choice',
              choice: 'juris_law',
              confidence: 0.95,
            },
            source_2: { type: 'choice', choice: 'none', confidence: 0.95 },
            source_3: { type: 'choice', choice: 'none', confidence: 0.95 },
          });
        }) as typeof fetch,
      }
    );

    expect(result.kind).toBe('clarification');
    expect(result.reply.text).toContain('approved source');
    expect(calls).toBe(1);
  });

  it('returns a retryable response when a selected live source fails', async () => {
    let typesafeCalls = 0;
    const result = await answerPublicChat(
      validRequest({ message: 'flood control budget' }),
      {
        env: {
          TYPESAFE_API_KEY: 'test-key',
          TYPESAFE_CHAT_ENABLED: 'true',
          PUBLIC_CHAT_EXTERNAL_SOURCES_ENABLED: 'true',
        },
        fetchImpl: (async (input: RequestInfo | URL) => {
          if (String(input).includes('api.typesafe.ai')) {
            typesafeCalls += 1;
            return routeResponse({
              source_1: {
                type: 'choice',
                choice: 'bettergov_budget',
                confidence: 0.95,
              },
              source_2: { type: 'choice', choice: 'none', confidence: 0.95 },
              source_3: { type: 'choice', choice: 'none', confidence: 0.95 },
            });
          }

          throw new Error('Budget service unavailable.');
        }) as typeof fetch,
      }
    );

    expect(result.kind).toBe('fallback');
    expect(result.reply.retryable).toBe(true);
    expect(typesafeCalls).toBe(1);
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
