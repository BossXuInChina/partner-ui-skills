import { effectScope } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { afterEach, expect, it, vi } from 'vitest';
import { createDeltaValidator, createPartValidator } from '@scaffold/chat/protocol';
import { useChatSession } from '@scaffold/chat/useChatSession';
import { createFetchChatTransport } from '@scaffold/chat/transport';
import type {
  ChatDelta,
  ChatRequest,
  ChatSessionOptions,
  ChatSnapshot,
  ChatTransport,
} from '@scaffold/chat/types';

interface RegionPart {
  type: 'region-table';
  rows: { region: string; amount: string; yoy: string }[];
}
const region: RegionPart = {
  type: 'region-table',
  rows: [{ region: 'East', amount: '12', yoy: '+2%' }],
};
function isRegion(value: unknown): value is RegionPart {
  if (
    !value ||
    typeof value !== 'object' ||
    !('type' in value) ||
    value.type !== 'region-table' ||
    !('rows' in value) ||
    !Array.isArray(value.rows)
  )
    return false;
  return value.rows.every(
    (row) =>
      row &&
      typeof row === 'object' &&
      typeof row.region === 'string' &&
      typeof row.amount === 'string' &&
      typeof row.yoy === 'string',
  );
}
const scopes: ReturnType<typeof effectScope>[] = [];
function session(
  transport: ChatTransport<RegionPart>,
  options: ChatSessionOptions<RegionPart> = {},
) {
  const scope = effectScope();
  scopes.push(scope);
  const result = scope.run(() =>
    useChatSession(transport, { partValidator: isRegion, ...options }),
  );
  if (!result) throw new Error('test scope unavailable');
  return result;
}
afterEach(() => {
  for (const scope of scopes.splice(0)) scope.stop();
});

it('accepts a typed custom table without changing text accumulation or first-output loading', async () => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const requests: ChatRequest<RegionPart>[] = [];
  const chat = session({
    async *stream(request) {
      requests.push(request);
      yield { kind: 'part', part: region };
      await gate;
      yield { kind: 'text', text: 'finished' };
    },
  });
  const pending = chat.send('regions');
  await flushPromises();
  expect(chat.processing.value).toBe(true);
  expect(chat.messages.value[1]).toMatchObject({ loading: false, uiParts: [region] });
  release();
  await pending;
  expect(chat.messages.value[1]?.uiParts).toEqual([region, { type: 'text', text: 'finished' }]);
  expect(requests[0]?.query).toBe('regions');
});

it('a loose extension cannot override malformed known public types or malformed text deltas', () => {
  const called = vi.fn();
  const extension = (value: unknown): value is RegionPart => {
    called(value);
    return true;
  };
  const isPart = createPartValidator(extension),
    isDelta = createDeltaValidator(extension);
  for (const value of [
    { type: 'text', text: 42 },
    { type: 'ai-summary', text: null },
    { type: 'unsupported' },
    { type: 'business-navigation', title: 'Bad', target: { target: 'x', params: { id: 1 } } },
    { type: 'agreement-table', total: 1, agreements: [{}] },
  ])
    expect(isPart(value)).toBe(false);
  expect(isDelta({ kind: 'text', text: 42 })).toBe(false);
  expect(called).not.toHaveBeenCalled();
  expect(
    createPartValidator(isRegion)({
      type: 'region-table',
      rows: [{ region: 'East', amount: 12, yoy: '+2%' }],
    }),
  ).toBe(false);
});

it('validates every session delta and restored part, and persists a custom snapshot only explicitly', async () => {
  const read = vi.fn(async (): Promise<ChatSnapshot<RegionPart>> => ({
    version: 1,
    messages: [{ id: 'saved', role: 'assistant', content: '', uiParts: [region] }],
  }));
  const write = vi.fn(async (snapshot: ChatSnapshot<RegionPart>) => {
    void snapshot;
  });
  const chat = session(
    {
      async *stream() {
        yield JSON.parse(
          '{"kind":"part","part":{"type":"region-table","rows":[{"region":"East","amount":12,"yoy":"+2%"}]}}',
        );
      },
    },
    { storage: { read, write } },
  );
  expect(read).not.toHaveBeenCalled();
  expect(write).not.toHaveBeenCalled();
  await chat.restore();
  expect(chat.messages.value[0]?.uiParts).toEqual([region]);
  await chat.persist();
  expect(write.mock.calls[0]?.[0].messages[0]?.uiParts).toEqual([region]);
  await chat.send('invalid');
  expect(chat.error.value).toBe('CHAT_INVALID_DELTA');
  const invalid = session(
    { async *stream() {} },
    {
      partValidator: (value: unknown): value is RegionPart => {
        void value;
        return true;
      },
      storage: {
        read: async () =>
          JSON.parse(
            '{"version":1,"messages":[{"id":"x","role":"assistant","content":"","uiParts":[{"type":"text","text":9}]}]}',
          ),
        write,
      },
    },
  );
  await invalid.restore();
  expect(invalid.storageError.value).toBe('CHAT_STORAGE_INVALID');
  await chat.reset();
  expect(chat.messages.value).toEqual([]);
});

it('keeps abort epochs and caller retry identity for extended streams', async () => {
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const requests: ChatRequest<RegionPart>[] = [];
  const chat = session({
    async *stream(request) {
      requests.push(request);
      yield { kind: 'part', part: region };
      if (requests.length === 1) {
        await gate;
        yield { kind: 'text', text: 'stale' };
      }
    },
  });
  const pending = chat.send('regions');
  await flushPromises();
  chat.abort();
  await pending;
  await chat.retry();
  release();
  await flushPromises();
  expect(requests[0]?.idempotencyKey).toBe(requests[1]?.idempotencyKey);
  expect(chat.messages.value).toHaveLength(2);
  expect(chat.messages.value[1]?.uiParts).toEqual([region]);
  expect(chat.messages.value[1]?.content).not.toContain('stale');
});

it('SSE uses the same extension guard after default JSON and custom decoders', async () => {
  const request: ChatRequest<RegionPart> = {
    requestId: 'r',
    idempotencyKey: 'i',
    query: 'q',
    context: { aiEnabled: true, mode: '' },
    messages: [],
  };
  const fetch = async () =>
    new Response('data: ' + JSON.stringify({ kind: 'part', part: region }) + '\n\n', {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  async function collect(source: AsyncIterable<ChatDelta<RegionPart>>) {
    const values = [];
    for await (const value of source) values.push(value);
    return values;
  }
  const transport = createFetchChatTransport<RegionPart>({
    url: '/host-api',
    fetch,
    partValidator: isRegion,
  });
  await expect(collect(transport.stream(request, new AbortController().signal))).resolves.toEqual([
    { kind: 'part', part: region },
  ]);
  for (const value of [
    { kind: 'part', part: { type: 'region-table', rows: [42] } },
    { kind: 'part', part: { type: 'text', text: 42 } },
    { kind: 'text', text: 42 },
  ]) {
    const invalid = createFetchChatTransport<RegionPart>({
      url: '/host-api',
      fetch,
      partValidator: isRegion,
      decodeEvent: () => JSON.parse(JSON.stringify(value)),
    });
    await expect(
      collect(invalid.stream(request, new AbortController().signal)),
    ).rejects.toMatchObject({ code: 'CHAT_INVALID_DELTA' });
  }
});
