import type {
  AssistantDelta,
  AssistantPart,
  ComposerRequestContext,
  UIMessage,
} from 'huawei-partner-ai-ui';

export type { AssistantDelta, AssistantPart, ComposerRequestContext, UIMessage };
export type ChatMessage = UIMessage<AssistantPart>;

/** Assumed transport envelope. Hosts must adapt it to their verified API contract. */
export interface ChatRequest {
  requestId: string;
  idempotencyKey: string;
  query: string;
  context: ComposerRequestContext;
  messages: ChatMessage[];
}

export interface ChatTransport {
  stream(request: ChatRequest, signal: AbortSignal): AsyncIterable<AssistantDelta>;
}

export interface ChatSnapshot {
  version: 1;
  messages: ChatMessage[];
}

/** Injection alone never starts persistence; call session.restore()/persist() explicitly. */
export interface ChatStorage {
  read(): Promise<ChatSnapshot | null>;
  write(snapshot: ChatSnapshot): Promise<void>;
}

export interface ChatSessionOptions {
  storage?: ChatStorage;
  createId?: () => string;
}

export interface BusinessActionContext {
  signal: AbortSignal;
  /** Caller-owned operation identity. Reuse this value for explicit retries. */
  idempotencyKey: string;
}
