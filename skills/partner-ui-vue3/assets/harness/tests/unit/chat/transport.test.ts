import { flushPromises } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import {
  createFetchBusinessAction,
  createFetchChatTransport,
  readSSE,
} from '@scaffold/chat/transport';
import type { ChatRequest } from '@scaffold/chat/types';

const request: ChatRequest = {
  requestId: 'request-1',
  idempotencyKey: 'chat-operation-1',
  query: 'query',
  context: { aiEnabled: true, mode: '' },
  messages: [],
};

async function collect<T>(source: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const value of source) result.push(value);
  return result;
}

function chunks(text: string, size = 3) {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (let offset = 0; offset < bytes.length; offset += size)
        controller.enqueue(bytes.slice(offset, offset + size));
      controller.close();
    },
  });
}

describe('configured fetch/SSE transport', () => {
  it('handles UTF-8/chunk boundaries, multiline data and CRLF while forwarding auth and request identity', async () => {
    const body =
      ': heartbeat\r\nid: event-1\r\ndata: {"kind":"text",\r\ndata: "text":"你好"}\r\n\r\n' +
      'data: {"kind":"part","part":{"type":"empty-result"}}\r\n\r\ndata: [DONE]\r\n\r\n';
    const fetchRequest = vi.fn(
      async () =>
        new Response(chunks(body), {
          headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
        }),
    );
    const transport = createFetchChatTransport({
      url: '/host-configured-chat',
      fetch: fetchRequest,
      headers: async () => ({ Authorization: 'Bearer host-token' }),
    });
    const signal = new AbortController().signal;
    await expect(collect(transport.stream(request, signal))).resolves.toEqual([
      { kind: 'text', text: '你好' },
      { kind: 'part', part: { type: 'empty-result' } },
    ]);
    const call = fetchRequest.mock.calls[0] as Parameters<typeof fetch> | undefined;
    expect(call?.[0]).toBe('/host-configured-chat');
    const init = call?.[1];
    const headers = new Headers(init?.headers);
    expect(headers.get('Authorization')).toBe('Bearer host-token');
    expect(headers.get('Idempotency-Key')).toBe(request.idempotencyKey);
    expect(headers.get('Accept')).toBe('text/event-stream');
    expect(init?.signal).toBe(signal);
    expect(JSON.parse(String(init?.body))).toEqual(request);
  });

  it('preserves SSE event/id metadata across bare CR and EOF without a trailing separator', async () => {
    const events = await collect(
      readSSE(
        chunks('id: host-id\revent: custom\rdata: one\rdata: two\r\rdata: final'),
        new AbortController().signal,
      ),
    );
    expect(events).toEqual([
      { id: 'host-id', event: 'custom', data: 'one\ntwo' },
      { id: 'host-id', event: 'message', data: 'final' },
    ]);
  });

  it('stops at DONE and releases the live response instead of parsing later junk', async () => {
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('data: [DONE]\n\ndata: junk\n\n'));
      },
      cancel() {
        cancelled = true;
      },
    });
    const transport = createFetchChatTransport({
      url: '/chat',
      fetch: async () => new Response(body, { headers: { 'Content-Type': 'text/event-stream' } }),
    });
    await expect(collect(transport.stream(request, new AbortController().signal))).resolves.toEqual(
      [],
    );
    expect(cancelled).toBe(true);
  });

  it('rejects HTTP, content-type, JSON and public-union schema errors with stable codes', async () => {
    const cases = [
      {
        response: new Response('private server body', { status: 503 }),
        code: 'CHAT_HTTP_ERROR',
        status: 503,
      },
      {
        response: new Response('{}', { headers: { 'Content-Type': 'application/json' } }),
        code: 'CHAT_SSE_CONTENT_TYPE',
      },
      {
        response: new Response('{}', { headers: { 'Content-Type': 'text/event-stream-json' } }),
        code: 'CHAT_SSE_CONTENT_TYPE',
      },
      {
        response: new Response(chunks('event: error\ndata: [DONE]\n\n'), {
          headers: { 'Content-Type': 'text/event-stream' },
        }),
        code: 'CHAT_STREAM_ERROR',
      },
      {
        response: new Response(chunks('data: invalid\n\n'), {
          headers: { 'Content-Type': 'text/event-stream' },
        }),
        code: 'CHAT_SSE_JSON',
      },
      {
        response: new Response(
          chunks('data: {"kind":"part","part":{"type":"agreement-table"}}\n\n'),
          { headers: { 'Content-Type': 'text/event-stream' } },
        ),
        code: 'CHAT_INVALID_DELTA',
      },
    ];
    for (const entry of cases) {
      const transport = createFetchChatTransport({
        url: '/chat',
        fetch: async () => entry.response,
      });
      await expect(
        collect(transport.stream(request, new AbortController().signal)),
      ).rejects.toMatchObject({
        code: entry.code,
        ...(entry.status ? { status: entry.status } : {}),
      });
    }
  });

  it('cancels a blocked reader and never reports an AbortSignal stop as a server failure', async () => {
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      cancel() {
        cancelled = true;
      },
    });
    const transport = createFetchChatTransport({
      url: '/chat',
      fetch: async () => new Response(body, { headers: { 'Content-Type': 'text/event-stream' } }),
    });
    const controller = new AbortController();
    const pending = collect(transport.stream(request, controller.signal));
    const rejection = expect(pending).rejects.toMatchObject({ name: 'AbortError' });
    await flushPromises();
    controller.abort();
    await rejection;
    expect(cancelled).toBe(true);
  });

  it('requires caller-owned business identity and reuses the supplied key across explicit retries', async () => {
    const calls: RequestInit[] = [];
    const fetchRequest: typeof fetch = async (_url, init) => {
      if (init) calls.push(init);
      return new Response('{"accepted":true}', { headers: { 'Content-Type': 'application/json' } });
    };
    const action = createFetchBusinessAction<{ id: string }, boolean>({
      url: (input) => '/host-actions/' + encodeURIComponent(input.id),
      headers: { Authorization: 'Bearer host-token' },
      fetch: fetchRequest,
      parseResponse: async (response) => {
        const result = (await response.json()) as { accepted: boolean };
        return result.accepted;
      },
    });
    const context = {
      signal: new AbortController().signal,
      idempotencyKey: 'host-operation-stable-across-retry',
    };
    expect(await action({ id: 'agreement-1' }, context)).toBe(true);
    expect(await action({ id: 'agreement-1' }, context)).toBe(true);
    expect(calls.map((init) => new Headers(init.headers).get('Idempotency-Key'))).toEqual([
      context.idempotencyKey,
      context.idempotencyKey,
    ]);
    await expect(
      action({ id: 'agreement-1' }, { ...context, idempotencyKey: '' }),
    ).rejects.toMatchObject({ code: 'CHAT_IDEMPOTENCY_KEY_REQUIRED' });
    expect(calls).toHaveLength(2);
    const failedAction = createFetchBusinessAction({
      url: '/configured-action',
      fetch: async () => {
        throw new Error('private network detail');
      },
      parseResponse: async () => true,
    });
    await expect(failedAction({}, context)).rejects.toMatchObject({
      code: 'CHAT_TRANSPORT_FAILED',
      message: 'CHAT_TRANSPORT_FAILED',
    });
  });

  it('refuses an empty endpoint without falling back to the current document URL', async () => {
    const fetchRequest = vi.fn(async () => new Response());
    const transport = createFetchChatTransport({ url: '', fetch: fetchRequest });
    await expect(
      collect(transport.stream(request, new AbortController().signal)),
    ).rejects.toMatchObject({ code: 'CHAT_ENDPOINT_REQUIRED' });
    expect(fetchRequest).not.toHaveBeenCalled();
  });
});
