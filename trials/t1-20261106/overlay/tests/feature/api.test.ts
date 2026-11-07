import { describe, expect, it } from 'vitest';
import { createAgreementApi } from '../../src/features/agreements/api';
describe('assistant transport', () => {
  it('passes abort to fetch and reuses the request identity on retry', async () => {
    const keys: string[] = [];
    let actual: AbortSignal | null | undefined;
    const transport: typeof fetch = async (_input, init) => {
      const body = JSON.parse(String(init?.body)) as { idempotencyKey: string };
      keys.push(body.idempotencyKey);
      actual = init?.signal;
      if (keys.length === 1)
        return new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('aborted', 'AbortError')),
          );
        });
      return new Response('data: {"kind":"text","text":"回答"}\n\ndata: [DONE]\n\n', {
        status: 200,
        headers: { 'content-type': 'text/event-stream' },
      });
    };
    const api = createAgreementApi('/api', transport);
    const controller = new AbortController();
    const first = api.assistant.stream('问题', controller.signal)[Symbol.asyncIterator]().next();
    controller.abort();
    await expect(first).rejects.toThrow();
    expect(actual?.aborted).toBe(true);
    const messages = [];
    for await (const item of api.assistant.stream('问题', new AbortController().signal))
      messages.push(item);
    expect(keys[1]).toBe(keys[0]);
    expect(messages).toEqual([{ kind: 'text', text: '回答' }]);
  });
});
