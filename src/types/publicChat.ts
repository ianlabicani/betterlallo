import type { VerificationStatus } from './civic';

export type ChatLanguage = 'en' | 'fil';

export type ChatRole = 'user' | 'assistant';

export type ChatSourceFamily =
  'structured_records' | 'faq_policy' | 'local_guides' | 'official_sources';

export type ChatLookupType =
  'exact_record' | 'list' | 'search' | 'faq' | 'scope_policy';

export type ChatTopic =
  | 'greeting'
  | 'scope'
  | 'services'
  | 'contacts'
  | 'emergency'
  | 'statistics'
  | 'transparency'
  | 'updates'
  | 'heritage'
  | 'faq'
  | 'search'
  | 'unsupported'
  | 'unclear';

export interface ChatHistoryMessage {
  role: ChatRole;
  content: string;
}

export interface PublicChatRequest {
  message: string;
  history: ChatHistoryMessage[];
  language: ChatLanguage;
}

export interface ChatSourceMetadata {
  label: string;
  url: string;
  lastVerified: string;
  authority: string;
  jurisdiction: string;
  sourceType: string;
}

export interface ChatLink {
  label: string;
  url: string;
}

export interface ChatReply {
  text: string;
  links: ChatLink[];
  sources: ChatSourceMetadata[];
  suggestedPrompts: string[];
  retryable: boolean;
}

export interface PublicChatResponse {
  kind: 'answer' | 'clarification' | 'fallback';
  reply: ChatReply;
}

export interface PublicChatRecord {
  id: string;
  family: ChatSourceFamily;
  title: string;
  summary: string;
  answerText: string;
  searchText: string;
  internalPath: string;
  status: VerificationStatus;
  sources: ChatSourceMetadata[];
  pendingFields?: string[];
}

export interface PublicChatEvidence extends PublicChatRecord {
  relevance?: number;
}

export interface ChatAnswerContext {
  language: ChatLanguage;
  topic: ChatTopic;
  message: string;
  evidence: PublicChatEvidence[];
  conflict: boolean;
}
