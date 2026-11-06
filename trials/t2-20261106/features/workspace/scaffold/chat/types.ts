import type {
  AssistantDelta,
  AssistantPart,
  ComposerRequestContext,
  UIMessage,
} from 'huawei-partner-ai-ui';

export type { AssistantDelta, AssistantPart, ComposerRequestContext, UIMessage };
export interface ChatPart {
  type: string;
}
export type PartValidator<Extension extends ChatPart> = (value: unknown) => value is Extension;
export type ChatDelta<Extension extends ChatPart = never> =
  { kind: 'text'; text: string } | { kind: 'part'; part: AssistantPart | Extension };
export type ChatMessage<Extension extends ChatPart = never> = UIMessage<AssistantPart | Extension>;

/** Assumed transport envelope. Hosts must adapt it to their verified API contract. */
export interface ChatRequest<Extension extends ChatPart = never> {
  requestId: string;
  idempotencyKey: string;
  query: string;
  context: ComposerRequestContext;
  messages: ChatMessage<Extension>[];
}

export interface ChatTransport<Extension extends ChatPart = never> {
  stream(request: ChatRequest<Extension>, signal: AbortSignal): AsyncIterable<ChatDelta<Extension>>;
}

export interface ChatSnapshot<Extension extends ChatPart = never> {
  version: 1;
  messages: ChatMessage<Extension>[];
}

/** Injection alone never starts persistence; call session.restore()/persist() explicitly. */
export interface ChatStorage<Extension extends ChatPart = never> {
  read(): Promise<ChatSnapshot<Extension> | null>;
  write(snapshot: ChatSnapshot<Extension>): Promise<void>;
}

export interface ChatSessionOptions<Extension extends ChatPart = never> {
  storage?: ChatStorage<Extension>;
  /** Only unknown part types reach this validator; malformed public parts are always rejected. */
  partValidator?: PartValidator<Extension>;
  createId?: () => string;
}

export interface BusinessActionContext {
  signal: AbortSignal;
  /** Caller-owned operation identity. Reuse this value for explicit retries. */
  idempotencyKey: string;
}
