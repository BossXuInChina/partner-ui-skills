import { effectScope } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatTransportError } from '@scaffold/chat/errors';
import { useChatSession } from '@scaffold/chat/useChatSession';
import type {
  AssistantDelta,
  ChatRequest,
  ChatSessionOptions,
  ChatTransport,
} from '@scaffold/chat/types';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

function controlled() {
  const waiting: ReturnType<typeof deferred<IteratorResult<AssistantDelta>>>[] = [];
  const queued: IteratorResult<AssistantDelta>[] = [];
  const push = (value: IteratorResult<AssistantDelta>) => {
    const next = waiting.shift();
    if (next) next.resolve(value);
    else queued.push(value);
  };
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return this;
      },
      next() {
        const value = queued.shift();
        if (value) return Promise.resolve(value);
        const next = deferred<IteratorResult<AssistantDelta>>();
        waiting.push(next);
        return next.promise;
      },
      return() {
        return Promise.resolve({ done: true as const, value: undefined });
      },
    },
    push: (delta: AssistantDelta) => push({ done: false, value: delta }),
    finish: () => push({ done: true, value: undefined }),
  };
}

const scopes: ReturnType<typeof effectScope>[] = [];
function createSession(transport: ChatTransport, options: ChatSessionOptions = {}) {
  const scope = effectScope();
  scopes.push(scope);
  let id = 0;
  const session = scope.run(() =>
    useChatSession(transport, { createId: () => 'id-' + ++id, ...options }),
  );
  if (!session) throw new Error('test scope unavailable');
  return { session, scope };
}
afterEach(() => {
  for (const scope of scopes.splice(0)) scope.stop();
});

describe('production chat session', () => {
  it('sends real transport deltas in order with public UIMessage parts and completion state', async () => {
    const requests: ChatRequest[] = [];
    const { session } = createSession({
      async *stream(request) {
        requests.push(request);
        yield { kind: 'text', text: 'first' };
        yield { kind: 'part', part: { type: 'ai-summary', text: 'summary' } };
        yield { kind: 'text', text: 'last' };
      },
    });
    await session.send(' query ', { aiEnabled: true, mode: 'host-supplied' });
    expect(session.messages.value.map((message) => message.role)).toEqual(['user', 'assistant']);
    expect(session.messages.value[1]).toMatchObject({
      content: 'firstlast',
      loading: false,
      state: { completion: 'completed' },
      uiPartsOrdered: true,
      uiParts: [
        { type: 'text', text: 'first' },
        { type: 'ai-summary', text: 'summary' },
        { type: 'text', text: 'last' },
      ],
    });
    expect(requests[0]).toMatchObject({ query: 'query', context: { mode: 'host-supplied' } });
    expect(requests[0]?.messages).toHaveLength(1);
    expect(session.processing.value).toBe(false);
    expect(session.error.value).toBe('');
  });

  it('guards a second submit while the first request owns processing', async () => {
    const stream = controlled();
    const transport = { stream: vi.fn(() => stream.iterator) };
    const { session } = createSession(transport);
    const pending = session.send('first');
    await session.send('duplicate');
    expect(transport.stream).toHaveBeenCalledTimes(1);
    expect(session.messages.value).toHaveLength(2);
    stream.finish();
    await pending;
    await session.send('   ');
    expect(transport.stream).toHaveBeenCalledTimes(1);
  });

  it('releases the public Bubble loading renderer on first visible delta while the request is still processing', async () => {
    for (const delta of [
      { kind: 'text', text: 'streamed-content' },
      { kind: 'part', part: { type: 'empty-result' } },
    ] satisfies AssistantDelta[]) {
      const stream = controlled();
      const { session } = createSession({ stream: () => stream.iterator });
      const pending = session.send('query');
      stream.push({ kind: 'text', text: '' });
      await flushPromises();
      expect(session.messages.value[1]?.loading).toBe(true);
      stream.push(delta);
      await flushPromises();
      expect(session.messages.value[1]?.loading).toBe(false);
      expect(session.processing.value).toBe(true);
      expect(session.messages.value[1]?.state?.completion).toBe('streaming');
      stream.finish();
      await pending;
      expect(session.processing.value).toBe(false);
    }
  });

  it('settles abort promptly even when transport ignores it and rejects late writes into a newer request', async () => {
    const streams = [controlled(), controlled()];
    const signals: AbortSignal[] = [];
    let call = 0;
    const { session } = createSession({
      stream(_request, signal) {
        signals.push(signal);
        const stream = streams[call++];
        if (!stream) throw new Error('unexpected request');
        return stream.iterator;
      },
    });
    const old = session.send('old');
    streams[0]?.push({ kind: 'text', text: 'partial' });
    await flushPromises();
    session.abort();
    await old;
    expect(signals[0]?.aborted).toBe(true);
    expect(session.aborted.value).toBe(true);
    expect(session.processing.value).toBe(false);
    const next = session.send('new');
    streams[0]?.push({ kind: 'text', text: 'late-old' });
    await flushPromises();
    expect(session.processing.value).toBe(true);
    streams[1]?.push({ kind: 'text', text: 'fresh' });
    streams[1]?.finish();
    await next;
    expect(
      session.messages.value
        .filter((message) => message.role === 'assistant')
        .map((message) => message.content),
    ).toEqual(['partial', 'fresh']);
    expect(session.messages.value[1]?.state?.completion).toBe('interrupted');
    expect(session.aborted.value).toBe(false);
    expect(session.error.value).toBe('');
  });

  it('retries explicitly without adding another user message and reuses the original request idempotency key', async () => {
    const requests: ChatRequest[] = [];
    const { session } = createSession({
      async *stream(request) {
        requests.push(request);
        if (requests.length === 1) {
          yield { kind: 'text', text: 'partial-failure' };
          throw new ChatTransportError('CHAT_HTTP_ERROR', 503);
        }
        yield { kind: 'text', text: 'replacement' };
      },
    });
    await session.send('query');
    const assistantId = session.messages.value[1]?.id;
    expect(session.error.value).toBe('CHAT_HTTP_ERROR');
    expect(session.messages.value[1]?.replyError).toBe('CHAT_HTTP_ERROR');
    await session.retry();
    expect(session.messages.value).toHaveLength(2);
    expect(session.messages.value[1]).toMatchObject({ id: assistantId, content: 'replacement' });
    expect(requests[0]?.idempotencyKey).toBe(requests[1]?.idempotencyKey);
    expect(requests[0]?.requestId).not.toBe(requests[1]?.requestId);
    expect(requests[1]?.messages).toHaveLength(1);
    expect(session.error.value).toBe('');
  });

  it('reset clears retry ownership and ignores the old pending stream', async () => {
    const stream = controlled();
    const transport = { stream: vi.fn(() => stream.iterator) };
    const { session } = createSession(transport);
    const pending = session.send('query');
    await session.reset();
    await pending;
    stream.push({ kind: 'text', text: 'late' });
    await flushPromises();
    await session.retry();
    expect(session.messages.value).toEqual([]);
    expect(session.error.value).toBe('');
    expect(session.aborted.value).toBe(false);
    expect(session.canRetry.value).toBe(false);
    expect(transport.stream).toHaveBeenCalledTimes(1);
  });

  it('scope disposal cancels work and prevents a disposed owner from starting another request', async () => {
    const stream = controlled();
    const signals: AbortSignal[] = [];
    const transport = {
      stream: vi.fn((_request: ChatRequest, signal: AbortSignal) => {
        signals.push(signal);
        return stream.iterator;
      }),
    };
    const { session, scope } = createSession(transport);
    const pending = session.send('query');
    scope.stop();
    await pending;
    await session.send('after-disposal');
    expect(signals[0]?.aborted).toBe(true);
    expect(transport.stream).toHaveBeenCalledTimes(1);
  });

  it('maps unexpected transport errors to a stable code without exposing response secrets', async () => {
    const { session } = createSession({
      stream() {
        throw new Error('secret-server-detail');
      },
    });
    await session.send('query');
    expect(session.error.value).toBe('CHAT_TRANSPORT_FAILED');
    expect(session.messages.value[1]?.replyError).toBe('CHAT_TRANSPORT_FAILED');
  });

  it('never persists merely because storage was injected, and ignores a late restore after a new send', async () => {
    const read = deferred<null>();
    const storage = { read: vi.fn(() => read.promise), write: vi.fn(async () => undefined) };
    const { session } = createSession(
      {
        async *stream() {
          yield { kind: 'text', text: 'answer' };
        },
      },
      { storage },
    );
    await session.send('query');
    await session.reset();
    expect(storage.read).not.toHaveBeenCalled();
    expect(storage.write).not.toHaveBeenCalled();
    const restoring = session.restore();
    await session.send('new-query');
    read.resolve(null);
    await restoring;
    expect(session.messages.value[0]?.content).toBe('new-query');
    await session.persist();
    expect(storage.write).toHaveBeenCalledTimes(1);
    expect(storage.write).toHaveBeenCalledWith({ version: 1, messages: session.messages.value });
  });
});
