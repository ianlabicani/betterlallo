import {
  ExternalLink,
  LoaderCircle,
  MessageCircle,
  RefreshCw,
  Send,
  X,
} from 'lucide-react';
import type {
  FormEvent,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  SyntheticEvent,
} from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  ChatHistoryMessage,
  ChatLanguage,
  ChatReply,
  PublicChatResponse,
} from '../types/publicChat';

interface ChatMessage {
  role: ChatHistoryMessage['role'];
  text: string;
  reply?: ChatReply;
}

const MAX_MESSAGES = 6;
const MAX_MESSAGE_LENGTH = 2000;

function initialMessage(language: ChatLanguage): ChatMessage {
  const text =
    language === 'fil'
      ? 'Kumusta! Makakatulong ako sa mga na-verify na serbisyo, tanggapan, pampublikong rekord, emergency references, at patakaran ng BetterLal-lo.'
      : 'Hello! I can help with verified services, offices, public records, emergency references, and BetterLal-lo’s information policy.';

  return {
    role: 'assistant',
    text,
    reply: {
      text,
      links: [],
      sources: [],
      suggestedPrompts:
        language === 'fil'
          ? ['Ano ang mga serbisyo?', 'Paano sinusuri ang impormasyon?']
          : ['What services are listed?', 'How is information verified?'],
      retryable: false,
    },
  };
}

function isChatResponse(value: unknown): value is PublicChatResponse {
  if (typeof value !== 'object' || value === null) return false;

  const response = value as Partial<PublicChatResponse>;
  const reply = response.reply;

  return (
    (response.kind === 'answer' ||
      response.kind === 'clarification' ||
      response.kind === 'fallback') &&
    typeof reply === 'object' &&
    reply !== null &&
    typeof reply.text === 'string' &&
    Array.isArray(reply.links) &&
    reply.links.every(
      link =>
        typeof link === 'object' &&
        link !== null &&
        typeof link.label === 'string' &&
        typeof link.url === 'string'
    ) &&
    Array.isArray(reply.sources) &&
    reply.sources.every(
      source =>
        typeof source === 'object' &&
        source !== null &&
        typeof source.label === 'string' &&
        typeof source.url === 'string' &&
        typeof source.lastVerified === 'string'
    ) &&
    Array.isArray(reply.suggestedPrompts) &&
    reply.suggestedPrompts.every(prompt => typeof prompt === 'string') &&
    typeof reply.retryable === 'boolean'
  );
}

function isSafeInternalLink(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin !== window.location.origin) return false;

    return [
      '/about',
      '/contact',
      '/contribute',
      '/faq',
      '/government',
      '/heritage',
      '/resources',
      '/search',
      '/services',
      '/statistics',
      '/transparency',
      '/updates',
    ].some(
      path => parsed.pathname === path || parsed.pathname.startsWith(`${path}/`)
    );
  } catch {
    return false;
  }
}

function isSafeSourceUrl(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

function currentLanguage(language: string): ChatLanguage {
  return language.startsWith('fil') ? 'fil' : 'en';
}

function errorMessage(language: ChatLanguage): string {
  return language === 'fil'
    ? 'Hindi makumpleto ang kahilingan. Subukan muli.'
    : 'I could not complete that request. Please try again.';
}

export default function PublicChat() {
  const { i18n } = useTranslation('common');
  const language = currentLanguage(i18n.language);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    initialMessage(language),
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [lastSubmittedMessage, setLastSubmittedMessage] = useState<
    string | null
  >(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const enabled = import.meta.env.VITE_PUBLIC_CHAT_ENABLED === 'true';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => composerRef.current?.focus());
    }

    if (!open && dialog.open) {
      dialog.close();
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'end',
    });
  }, [messages, isLoading, open]);

  if (!enabled) return null;

  const submitMessage = async (value: string) => {
    const nextMessage = value.trim();
    if (!nextMessage || isLoading) return;

    const history = messages.slice(-MAX_MESSAGES).map(chatMessage => ({
      role: chatMessage.role,
      content: chatMessage.text,
    }));

    setMessages(current =>
      [...current, { role: 'user' as const, text: nextMessage }].slice(
        -MAX_MESSAGES
      )
    );
    setMessage('');
    setRequestError(null);
    setLastSubmittedMessage(nextMessage);
    setIsLoading(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: nextMessage, history, language }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Chat request failed.');

      const payload: unknown = await response.json();
      if (!isChatResponse(payload))
        throw new Error('Chat response was invalid.');

      setMessages(current =>
        [
          ...current,
          {
            role: 'assistant' as const,
            text: payload.reply.text,
            reply: payload.reply,
          },
        ].slice(-MAX_MESSAGES)
      );
      setLastSubmittedMessage(payload.reply.retryable ? nextMessage : null);
    } catch {
      setRequestError(errorMessage(language));
    } finally {
      window.clearTimeout(timeout);
      setIsLoading(false);
    }
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitMessage(message);
  };

  const handleComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(message);
    }
  };

  const handleDialogCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    setOpen(false);
  };

  const handleDialogMouseDown = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) setOpen(false);
  };

  const retry = () => {
    if (lastSubmittedMessage) void submitMessage(lastSubmittedMessage);
  };

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={
          language === 'fil' ? 'Magtanong sa BetterLal-lo' : 'Ask BetterLal-lo'
        }
        title={
          language === 'fil' ? 'Magtanong sa BetterLal-lo' : 'Ask BetterLal-lo'
        }
        aria-expanded={open}
        aria-controls="public-chat-dialog"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-700 text-white shadow-lg transition hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        id="public-chat-dialog"
        aria-labelledby="public-chat-title"
        aria-describedby="public-chat-description"
        onCancel={handleDialogCancel}
        onMouseDown={handleDialogMouseDown}
        className="m-0 ml-auto h-full max-h-full w-full max-w-xl overflow-hidden border-0 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/40 sm:my-4 sm:mr-4 sm:h-[min(720px,calc(100vh-2rem))] sm:rounded-xl"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-start justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2
                id="public-chat-title"
                className="text-lg font-semibold text-gray-900"
              >
                {language === 'fil'
                  ? 'Magtanong sa BetterLal-lo'
                  : 'Ask BetterLal-lo'}
              </h2>
              <p
                id="public-chat-description"
                className="mt-1 text-sm text-gray-600"
              >
                {language === 'fil'
                  ? 'Mga sagot mula sa na-verify na rekord at opisyal na source.'
                  : 'Source-backed answers from verified records and official sources.'}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={language === 'fil' ? 'Isara ang chat' : 'Close chat'}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div
            role="log"
            aria-live="polite"
            aria-label={
              language === 'fil' ? 'Mga mensahe sa chat' : 'Chat messages'
            }
            className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5"
          >
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={
                  item.role === 'user'
                    ? 'ml-8 flex justify-end'
                    : 'mr-8 flex justify-start'
                }
              >
                <div
                  className={
                    item.role === 'user'
                      ? 'max-w-[90%] rounded-2xl rounded-br-md bg-primary-700 px-4 py-3 text-sm leading-relaxed text-white'
                      : 'max-w-[95%] rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 text-sm leading-relaxed text-gray-800'
                  }
                >
                  <p className="whitespace-pre-wrap">{item.text}</p>
                  {item.reply && item.role === 'assistant' && (
                    <div className="mt-3 space-y-3 border-t border-gray-300/70 pt-3">
                      {item.reply.links.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.reply.links
                            .filter(link => isSafeInternalLink(link.url))
                            .map(link => (
                              <a
                                key={link.url}
                                href={link.url}
                                onClick={close}
                                className="inline-flex items-center gap-1 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-xs font-semibold text-primary-800 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              >
                                {link.label}
                                <ExternalLink
                                  className="h-3 w-3"
                                  aria-hidden="true"
                                />
                              </a>
                            ))}
                        </div>
                      )}
                      {item.reply.sources.filter(source =>
                        isSafeSourceUrl(source.url)
                      ).length > 0 && (
                        <details className="text-xs text-gray-600">
                          <summary className="cursor-pointer font-semibold text-primary-800">
                            {language === 'fil'
                              ? 'Mga na-verify na source'
                              : 'Verified sources'}
                          </summary>
                          <ul className="mt-2 space-y-2">
                            {item.reply.sources
                              .filter(source => isSafeSourceUrl(source.url))
                              .map(source => (
                                <li key={source.url}>
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-medium text-primary-700 underline"
                                  >
                                    {source.label}
                                  </a>{' '}
                                  <span>(reviewed {source.lastVerified})</span>
                                </li>
                              ))}
                          </ul>
                        </details>
                      )}
                      {item.reply.suggestedPrompts.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.reply.suggestedPrompts.map(prompt => (
                            <button
                              key={prompt}
                              type="button"
                              onClick={() => void submitMessage(prompt)}
                              disabled={isLoading}
                              className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:border-primary-400 hover:text-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div
                className="mr-8 flex justify-start"
                aria-label="Loading response"
              >
                <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 text-sm text-gray-600">
                  <LoaderCircle
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  {language === 'fil'
                    ? 'Sinusuri ang mga source…'
                    : 'Checking verified sources…'}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {(requestError || lastSubmittedMessage) && !isLoading && (
            <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
              {requestError && (
                <p className="text-sm text-error-700">{requestError}</p>
              )}
              {lastSubmittedMessage && (
                <button
                  type="button"
                  onClick={retry}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 underline focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  {language === 'fil' ? 'Subukan muli' : 'Try again'}
                </button>
              )}
            </div>
          )}

          <form onSubmit={submitForm} className="border-t border-gray-200 p-4">
            <label htmlFor="public-chat-message" className="sr-only">
              {language === 'fil'
                ? 'I-type ang iyong tanong'
                : 'Type your question'}
            </label>
            <div className="flex items-end gap-2">
              <textarea
                ref={composerRef}
                id="public-chat-message"
                value={message}
                maxLength={MAX_MESSAGE_LENGTH}
                onChange={event => setMessage(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder={
                  language === 'fil'
                    ? 'Halimbawa: Ano ang mga na-verify na serbisyo?'
                    : 'For example: What verified services are listed?'
                }
                rows={2}
                className="min-h-20 flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                aria-label={
                  language === 'fil' ? 'Ipadala ang tanong' : 'Send question'
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {language === 'fil'
                ? 'Huwag magpadala ng personal na dokumento o sensitibong impormasyon.'
                : 'Do not send personal documents or sensitive information.'}
            </p>
          </form>
        </div>
      </dialog>
    </>
  );
}
