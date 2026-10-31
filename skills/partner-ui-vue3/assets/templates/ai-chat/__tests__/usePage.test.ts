import { afterEach, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { usePage, type AiChatPageOptions } from '../usePage';
import { makeAiChatMockApi, aiChatSeed } from '../mocks';
import type { AiChatApi } from '../api';
import type { ChatSnapshot } from '@scaffold/chat/types';
import { isRegionSalesPart, type RegionSalesPart } from '../types';
const wrappers: ReturnType<typeof mount>[] = [];
function setup(
  api: AiChatApi = makeAiChatMockApi(),
  options: AiChatPageOptions = { historyNamespace: 'unit:chat' },
) {
  let page: ReturnType<typeof usePage> | undefined;
  const wrapper = mount(
    defineComponent({
      setup() {
        page = usePage(api, options);
        return () => null;
      },
    }),
  );
  wrappers.push(wrapper);
  if (!page) throw new Error('setup failed');
  return { page, wrapper };
}
afterEach(() => {
  for (const wrapper of wrappers.splice(0)) wrapper.unmount();
});
it('streams the original regional table through the strict business extension', async () => {
  const { page } = setup();
  await page.session.send('各区域销售额排名');
  expect(page.session.messages.value[1]?.uiParts).toEqual([
    { type: 'text', text: aiChatSeed.regionIntroduction },
    { type: 'region-table', rows: aiChatSeed.rows },
  ]);
  expect(page.session.messages.value[1]?.loading).toBe(false);
  expect(page.session.processing.value).toBe(false);
  expect(
    isRegionSalesPart({ type: 'region-table', rows: [{ region: '华东', amount: 42, yoy: '+2%' }] }),
  ).toBe(false);
});
it('keeps storage namespace-bound and performs zero IO until explicit restore/persist', async () => {
  let stored: ChatSnapshot<RegionSalesPart> | null = null;
  const read = vi.fn(async (namespace: string) => {
    expect(namespace).toBe('customer:chat');
    return stored;
  });
  const write = vi.fn(async (namespace: string, snapshot: ChatSnapshot<RegionSalesPart>) => {
    expect(namespace).toBe('customer:chat');
    stored = snapshot;
  });
  const { page } = setup(makeAiChatMockApi(), {
    historyNamespace: 'customer:chat',
    storage: { read, write },
  });
  await page.session.send('各区域销售额排名');
  expect(read).not.toHaveBeenCalled();
  expect(write).not.toHaveBeenCalled();
  await page.session.persist();
  await page.session.reset();
  await page.session.restore();
  expect(read).toHaveBeenCalledOnce();
  expect(write).toHaveBeenCalledOnce();
  expect(page.session.messages.value).toHaveLength(2);
});
it('uses finite navigation callbacks and local feedback for rejected navigation', async () => {
  const navigate = vi.fn(async () => {
    throw new Error('route unavailable');
  });
  const { page } = setup({ ...makeAiChatMockApi(), navigate });
  page.navigateTab('home');
  await flushPromises();
  expect(navigate).toHaveBeenCalledWith('home', undefined);
  expect(page.feedback.items.value[0]?.type).toBe('warning');
  page.navigateTab('https://bad.invalid');
  expect(navigate).toHaveBeenCalledOnce();
});
it('keeps request identity on retry and rejects duplicate submissions while streaming', async () => {
  const keys: string[] = [];
  let fail = true;
  const api: AiChatApi = {
    navigate() {},
    async *stream(request) {
      keys.push(request.idempotencyKey);
      if (fail) {
        fail = false;
        throw new Error('network');
      }
      yield { kind: 'text', text: 'done' };
    },
  };
  const { page } = setup(api);
  await page.session.send('经营概况');
  expect(page.session.error.value).toBeTruthy();
  await page.session.retry();
  expect(keys[1]).toBe(keys[0]);
  expect(page.session.messages.value[1]?.uiParts).toEqual([{ type: 'text', text: 'done' }]);
});
it('aborts transport when the page scope leaves', async () => {
  let signal: AbortSignal | undefined;
  const api: AiChatApi = {
    navigate() {},
    async *stream(_request, value) {
      signal = value;
      await new Promise<void>((resolve) =>
        value.addEventListener('abort', () => resolve(), { once: true }),
      );
      value.throwIfAborted();
      yield { kind: 'text', text: 'late' };
    },
  };
  const { page, wrapper } = setup(api);
  const pending = page.session.send('stop');
  await flushPromises();
  wrapper.unmount();
  await pending;
  expect(signal?.aborted).toBe(true);
  expect(page.session.messages.value[1]?.uiParts).toEqual([]);
});
