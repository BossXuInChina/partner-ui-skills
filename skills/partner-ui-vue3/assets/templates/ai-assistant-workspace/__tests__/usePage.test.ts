import { afterEach, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import type { Agreement } from 'huawei-partner-ai-ui';
import { usePage, type WorkspacePageOptions } from '../usePage';
import { makeWorkspaceMockApi, workspaceSeed } from '../mocks';
import type { AssistantWorkspaceApi } from '../api';
const wrappers: ReturnType<typeof mount>[] = [];
function setup(
  api: AssistantWorkspaceApi = makeWorkspaceMockApi(),
  options: WorkspacePageOptions = { historyNamespace: 'unit:workspace' },
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
it('loads original rows and insight fragments, cancels the prior range request', async () => {
  const api = makeWorkspaceMockApi(),
    signals: AbortSignal[] = [];
  const list = api.listAgreements;
  api.listAgreements = (input, signal) => {
    signals.push(signal);
    return list(input, signal);
  };
  const { page } = setup(api);
  await flushPromises();
  expect(page.agreements.value).toEqual(workspaceSeed.agreements);
  expect(page.insights.value).toEqual(workspaceSeed.insights);
  page.setRange('30');
  await flushPromises();
  expect(signals[0]?.aborted).toBe(true);
  expect(page.agreements.value).toHaveLength(1);
});
it('updates only from server acknowledgement and blocks duplicate renew requests', async () => {
  let acknowledge!: (rows: Agreement[]) => void;
  const renew = vi.fn(
    () =>
      new Promise<Agreement[]>((resolve) => {
        acknowledge = resolve;
      }),
  );
  const { page } = setup({ ...makeWorkspaceMockApi(), renew });
  await flushPromises();
  const pending = page.renew(['HT-2026-0101']);
  await page.renew(['HT-2026-0101']);
  expect(renew).toHaveBeenCalledOnce();
  expect(page.agreements.value[0]?.status).toBe('待续签');
  acknowledge([{ ...workspaceSeed.agreements[0]!, status: '审批中' }]);
  await pending;
  expect(page.agreements.value[0]?.status).toBe('审批中');
  expect(page.feedback.items.value[0]?.type).toBe('success');
});
it('keeps caller idempotency identity across an explicit failed-action retry', async () => {
  const api = makeWorkspaceMockApi();
  const success = api.renew;
  let first = true;
  const keys: string[] = [];
  api.renew = async (ids, context) => {
    keys.push(context.idempotencyKey);
    if (first) {
      first = false;
      throw new Error('network');
    }
    return success(ids, context);
  };
  const { page } = setup(api);
  await flushPromises();
  await page.renew(['HT-2026-0101']);
  expect(page.renewError.value).toBe(true);
  expect(page.agreements.value[0]?.status).toBe('待续签');
  await page.retryRenew();
  expect(keys[1]).toBe(keys[0]);
  expect(page.renewError.value).toBe(false);
});
it('binds explicit history namespace while persistence remains off by default', async () => {
  const read = vi.fn(async () => null),
    write = vi.fn(async () => {});
  const { page } = setup(makeWorkspaceMockApi(), {
    historyNamespace: 'customer:workspace',
    storage: { read, write },
  });
  expect(page.history.namespace).toBe('customer:workspace');
  await page.history.storage?.read('customer:workspace');
  expect(read).not.toHaveBeenCalled();
  expect(write).not.toHaveBeenCalled();
  const enabled = setup(makeWorkspaceMockApi(), {
    historyNamespace: 'customer:workspace:opt-in',
    storage: { read, write },
    persistHistory: true,
  });
  expect(enabled.page.history.storage?.read).toBe(read);
});
it('queues a row question until the lazy public assistant is ready and validates navigation targets', async () => {
  const navigate = vi.fn(async () => {
    throw new Error('no route');
  });
  const { page } = setup({ ...makeWorkspaceMockApi(), navigate });
  page.ai.open = false;
  page.ask('哪些协议需要优先续签');
  expect(page.ai.open).toBe(true);
  const sendQuery = vi.fn(async () => true);
  page.setPanel({ canSendQuery: () => true, sendQuery, applyBusinessUpdate() {} });
  await flushPromises();
  expect(sendQuery).toHaveBeenCalledWith('哪些协议需要优先续签');
  page.onNavigate({ target: 'https://bad.invalid' });
  expect(navigate).not.toHaveBeenCalled();
  page.onNavigate({ target: 'renewals' });
  await flushPromises();
  expect(navigate).toHaveBeenCalledWith('renewals', undefined);
  expect(page.feedback.items.value[0]?.type).toBe('warning');
});
it('reports list errors, retries explicitly, and aborts pending work when leaving', async () => {
  const base = makeWorkspaceMockApi();
  let fail = true;
  let signal: AbortSignal | undefined;
  const { page, wrapper } = setup({
    ...base,
    listAgreements: async (input, value) => {
      signal = value;
      if (fail) throw new Error('offline');
      return base.listAgreements(input, value);
    },
  });
  await flushPromises();
  expect(page.loadError.value).toBe(true);
  fail = false;
  await page.load();
  expect(page.loadError.value).toBe(false);
  expect(page.agreements.value).toHaveLength(3);
  wrapper.unmount();
  expect(signal?.aborted).toBe(true);
});
