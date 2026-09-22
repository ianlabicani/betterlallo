import {
  answerPublicChat,
  ChatUnavailableError,
  createErrorResponse,
  parsePublicChatRequest,
} from '../src/server/publicChat.js';

const chatApi = {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'POST') {
      return createErrorResponse(405, 'Only POST requests are supported.');
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return createErrorResponse(400, 'The request body must be valid JSON.');
    }

    const parsed = parsePublicChatRequest(body);
    if ('error' in parsed) {
      return createErrorResponse(400, parsed.error);
    }

    try {
      const response = await answerPublicChat(parsed.request);
      return Response.json(response);
    } catch (error) {
      if (error instanceof ChatUnavailableError) {
        return createErrorResponse(
          error.status,
          error.status === 404
            ? 'Chat is not enabled for this deployment.'
            : 'Chat is temporarily unavailable. Please try again later.'
        );
      }

      return createErrorResponse(
        503,
        'Chat is temporarily unavailable. Please try again later.'
      );
    }
  },
};

export default chatApi;
