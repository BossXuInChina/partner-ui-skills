import { computed, getCurrentScope, onScopeDispose, readonly, ref, shallowRef } from 'vue';
import { abortable, isAbortError } from './abort';
import { chatErrorCode, ChatTransportError } from './errors';
import { createDeltaValidator, createPartValidator, isAssistantPart } from './protocol';
import type {
  AssistantPart,
  ChatPart,
  ChatDelta,
  ChatMessage,
  ChatRequest,
  ChatSessionOptions,
  ChatSnapshot,
  ChatTransport,
  ComposerRequestContext,
} from './types';

interface Attempt {
  query: string;
  context: ComposerRequestContext;
  userId: string;
  assistantId: string;
  idempotencyKey: string;
}

function copy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function applyDelta<Extension extends ChatPart>(
  message: ChatMessage<Extension>,
  delta: ChatDelta<Extension>,
): ChatMessage<Extension> {
  const parts = [...(message.uiParts ?? [])];
  let content = typeof message.content === 'string' ? message.content : '';
  if (delta.kind === 'text') {
    content += delta.text;
    const last = parts.at(-1);
    if (isAssistantPart(last) && last.type === 'text')
      parts[parts.length - 1] = { type: 'text', text: last.text + delta.text };
    else parts.push({ type: 'text', text: delta.text });
  } else parts.push(copy(delta.part));
  const hasOutput = delta.kind === 'part' || delta.text.length > 0;
  return {
    ...message,
    content,
    uiParts: parts,
    uiPartsOrdered: true,
    loading: hasOutput ? false : message.loading,
  };
}

function validSnapshot<Extension extends ChatPart>(
  value: unknown,
  isPart: (part: unknown) => part is AssistantPart | Extension,
): value is ChatSnapshot<Extension> {
  const record = (candidate: unknown): candidate is Record<string, unknown> =>
    candidate !== null && typeof candidate === 'object' && !Array.isArray(candidate);
  if (!record(value)) return false;
  const snapshot = value;
  return (
    snapshot.version === 1 &&
    Array.isArray(snapshot.messages) &&
    snapshot.messages.every(
      (message) =>
        record(message) &&
        typeof message.id === 'string' &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        (message.uiParts === undefined ||
          (Array.isArray(message.uiParts) && message.uiParts.every(isPart))),
    )
  );
}

export function useChatSession<Extension extends ChatPart = never>(
  transport: ChatTransport<Extension>,
  options: ChatSessionOptions<Extension> = {},
) {
  const isDelta = createDeltaValidator(options.partValidator);
  const isPart = createPartValidator(options.partValidator);
  const messageState = shallowRef<ChatMessage<Extension>[]>([]);
  const processing = ref(false);
  const error = ref('');
  const aborted = ref(false);
  const storageError = ref('');
  const createId = options.createId ?? (() => crypto.randomUUID());
  let epoch = 0;
  let disposed = false;
  let active: { controller: AbortController; attempt: Attempt } | undefined;
  let lastAttempt: Attempt | undefined;
  let storageWrites: Promise<void> = Promise.resolve();

  function replaceAssistant(
    id: string,
    change: (message: ChatMessage<Extension>) => ChatMessage<Extension>,
  ) {
    messageState.value = messageState.value.map((message) =>
      message.id === id ? change(message) : message,
    );
  }

  function abort() {
    if (!active) return;
    const previous = active;
    epoch++;
    active = undefined;
    processing.value = false;
    aborted.value = true;
    error.value = '';
    replaceAssistant(previous.attempt.assistantId, (message) => ({
      ...message,
      loading: false,
      thinkingStatus: 'interrupted',
      state: { ...message.state, completion: 'interrupted' },
    }));
    previous.controller.abort();
  }

  async function run(attempt: Attempt) {
    const currentEpoch = ++epoch;
    const controller = new AbortController();
    active = { controller, attempt };
    lastAttempt = attempt;
    processing.value = true;
    aborted.value = false;
    error.value = '';
    const assistant: ChatMessage<Extension> = {
      id: attempt.assistantId,
      role: 'assistant',
      content: '',
      uiParts: [],
      uiPartsOrdered: true,
      loading: true,
      state: { completion: 'streaming' },
      requestContext: copy(attempt.context),
    };
    messageState.value = messageState.value
      .filter((message) => message.id !== attempt.assistantId)
      .concat(assistant);
    let iterator: AsyncIterator<ChatDelta<Extension>> | undefined;
    let finished = false;
    try {
      const request: ChatRequest<Extension> = {
        requestId: createId(),
        idempotencyKey: attempt.idempotencyKey,
        query: attempt.query,
        context: copy(attempt.context),
        messages: copy(messageState.value.filter((message) => message.id !== attempt.assistantId)),
      };
      iterator = transport.stream(request, controller.signal)[Symbol.asyncIterator]();
      while (true) {
        const next = await abortable(iterator.next(), controller.signal);
        if (currentEpoch !== epoch || disposed) return;
        if (next.done) {
          finished = true;
          break;
        }
        if (!isDelta(next.value)) throw new ChatTransportError('CHAT_INVALID_DELTA');
        replaceAssistant(attempt.assistantId, (message) => applyDelta(message, next.value));
      }
      replaceAssistant(attempt.assistantId, (message) => ({
        ...message,
        loading: false,
        thinkingStatus: 'completed',
        state: { ...message.state, completion: 'completed' },
      }));
    } catch (cause) {
      if (currentEpoch !== epoch || disposed) return;
      const stopped = controller.signal.aborted || isAbortError(cause);
      aborted.value = stopped;
      error.value = stopped ? '' : chatErrorCode(cause);
      replaceAssistant(attempt.assistantId, (message) => ({
        ...message,
        loading: false,
        thinkingStatus: 'interrupted',
        replyError: stopped ? undefined : error.value,
        state: {
          ...message.state,
          completion: stopped ? 'interrupted' : 'failed',
        },
      }));
    } finally {
      const close = iterator?.return?.bind(iterator);
      if (!finished && close)
        void Promise.resolve()
          .then(close)
          .catch(() => undefined);
      if (currentEpoch === epoch && !disposed) {
        processing.value = false;
        active = undefined;
      }
    }
  }

  async function send(
    query: string,
    context: ComposerRequestContext = { aiEnabled: true, mode: '' },
  ) {
    if (disposed || processing.value || !query.trim()) return;
    const userId = createId();
    const attempt: Attempt = {
      query: query.trim(),
      context: copy(context),
      userId,
      assistantId: createId(),
      idempotencyKey: createId(),
    };
    messageState.value = messageState.value.concat({
      id: userId,
      role: 'user',
      content: attempt.query,
      requestContext: copy(context),
      state: { completion: 'completed' },
    });
    await run(attempt);
  }

  async function retry() {
    if (disposed || processing.value || !lastAttempt) return;
    await run(lastAttempt);
  }

  async function reset() {
    if (disposed) return;
    abort();
    epoch++;
    lastAttempt = undefined;
    messageState.value = [];
    error.value = '';
    aborted.value = false;
    storageError.value = '';
  }

  async function restore() {
    if (disposed || processing.value) return;
    const stamp = ++epoch;
    if (!options.storage) {
      storageError.value = 'CHAT_STORAGE_UNAVAILABLE';
      return;
    }
    try {
      const snapshot = await options.storage.read();
      if (stamp !== epoch || disposed) return;
      if (snapshot !== null && !validSnapshot(snapshot, isPart))
        throw new ChatTransportError('CHAT_STORAGE_INVALID');
      messageState.value = copy(snapshot?.messages ?? []).map((message) =>
        message.loading
          ? {
              ...message,
              loading: false,
              thinkingStatus: 'interrupted',
              state: { ...message.state, completion: 'interrupted' },
            }
          : message,
      );
      lastAttempt = undefined;
      error.value = '';
      aborted.value = false;
      storageError.value = '';
    } catch (cause) {
      if (stamp === epoch && !disposed)
        storageError.value =
          cause instanceof ChatTransportError ? cause.code : 'CHAT_STORAGE_FAILED';
    }
  }

  async function persist() {
    if (disposed) return;
    const storage = options.storage;
    if (!storage) {
      storageError.value = 'CHAT_STORAGE_UNAVAILABLE';
      return;
    }
    const stamp = epoch;
    const snapshot: ChatSnapshot<Extension> = {
      version: 1,
      messages: copy(messageState.value),
    };
    const operation = storageWrites.then(() => storage.write(snapshot));
    storageWrites = operation.catch(() => undefined);
    try {
      await operation;
      if (stamp === epoch && !disposed) storageError.value = '';
    } catch {
      if (stamp === epoch && !disposed) storageError.value = 'CHAT_STORAGE_FAILED';
    }
  }

  if (getCurrentScope())
    onScopeDispose(() => {
      abort();
      disposed = true;
      epoch++;
    });

  return {
    messages: computed(() => messageState.value),
    processing: readonly(processing),
    error: readonly(error),
    aborted: readonly(aborted),
    storageError: readonly(storageError),
    canRetry: computed(() => Boolean(lastAttempt) && !processing.value),
    send,
    abort,
    retry,
    reset,
    restore,
    persist,
  };
}
