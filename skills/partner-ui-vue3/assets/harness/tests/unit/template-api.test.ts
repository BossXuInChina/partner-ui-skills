import { describe, expect, it, vi } from 'vitest';
import {
  createBlankTemplateApi,
  createAiChatTemplateApi,
  createAssistantWorkspaceTemplateApi,
  createWorkbenchDashboardTemplateApi,
  createWorkbenchDetailTemplateApi,
  createWorkbenchListTemplateApi,
  templateEndpoint,
  templateNavigation,
} from '../../src/template-api';

const baseURL = '/configured-api';
const agreement = {
  id: 'a-1',
  name: 'Agreement',
  partner: 'Partner',
  endDate: '2027-01-01',
  amount: 1000,
  status: '生效中' as const,
};
const detail = {
  ...agreement,
  type: 'dist' as const,
  owner: 'Owner',
  autoRenew: true,
  updatedAt: '2026-10-28',
  renewalNotice: 'Agreement expiry requires attention.',
};
const context = () => ({ signal: new AbortController().signal, idempotencyKey: 'intent-key-1' });
const json = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } });

describe('assumed harness API boundary', () => {
  it('requires configured endpoints and accepts only fixed relative operation paths', () => {
    expect(() => templateEndpoint(undefined, '/agreements')).toThrow('TEMPLATE_API_BASE_REQUIRED');
    expect(() => templateEndpoint('//foreign.example', '/agreements')).toThrow(
      'TEMPLATE_API_BASE_INVALID',
    );
    expect(() => templateEndpoint('/api?token=x', '/agreements')).toThrow(
      'TEMPLATE_API_BASE_INVALID',
    );
    expect(() => templateEndpoint('/api', '//foreign.example')).toThrow(
      'TEMPLATE_API_OPERATION_INVALID',
    );
    expect(templateEndpoint('/configured-api/', '/agreements')).toBe('/configured-api/agreements');
    expect(templateEndpoint('https://configured.example/api', '/agreements')).toBe(
      'https://configured.example/api/agreements',
    );
  });
  it('decodes list reads and propagates credentials and abort signals', async () => {
    const fetchRequest = vi.fn<typeof fetch>().mockResolvedValue(json([agreement]));
    const api = createWorkbenchListTemplateApi({ baseURL, fetch: fetchRequest });
    const signal = new AbortController().signal;
    await expect(api.load(signal)).resolves.toEqual([agreement]);
    expect(fetchRequest).toHaveBeenCalledWith(
      '/configured-api/agreements',
      expect.objectContaining({
        method: 'GET',
        signal,
        credentials: 'same-origin',
        cache: 'no-store',
      }),
    );
    fetchRequest.mockResolvedValueOnce(json([{ id: 'incomplete' }]));
    await expect(api.load(signal)).rejects.toThrow('LIST_RESPONSE_INVALID');
  });
  it('writes carry explicit idempotency keys, JSON inputs and verified DTOs', async () => {
    const fetchRequest = vi.fn<typeof fetch>().mockResolvedValue(json(agreement));
    const api = createWorkbenchListTemplateApi({ baseURL, fetch: fetchRequest });
    const input = { name: agreement.name, partner: agreement.partner, endDate: agreement.endDate };
    const operation = context();
    await expect(api.create(input, operation)).resolves.toEqual(agreement);
    const [, request] = fetchRequest.mock.calls[0]!;
    expect(request).toMatchObject({
      method: 'POST',
      signal: operation.signal,
      credentials: 'same-origin',
      body: JSON.stringify(input),
    });
    expect(new Headers(request?.headers).get('Idempotency-Key')).toBe(operation.idempotencyKey);
    expect(new Headers(request?.headers).get('Content-Type')).toBe('application/json');
    await expect(api.create(input, { ...operation, idempotencyKey: '' })).rejects.toThrow(
      'TEMPLATE_IDEMPOTENCY_REQUIRED',
    );
    expect(fetchRequest).toHaveBeenCalledTimes(1);
    fetchRequest.mockResolvedValueOnce(json({ id: 'bad' }));
    await expect(api.create(input, operation)).rejects.toThrow('LIST_RESPONSE_INVALID');
  });
  it('aborted reads and writes stop before sending requests', async () => {
    const fetchRequest = vi.fn<typeof fetch>();
    const controller = new AbortController();
    controller.abort();
    const api = createWorkbenchListTemplateApi({ baseURL, fetch: fetchRequest });
    await expect(api.load(controller.signal)).rejects.toHaveProperty('name', 'AbortError');
    await expect(
      api.terminate('a-1', { signal: controller.signal, idempotencyKey: 'key' }),
    ).rejects.toHaveProperty('name', 'AbortError');
    expect(fetchRequest).not.toHaveBeenCalled();
  });
  it('checks post-fetch aborts, HTTP failures and void response acknowledgements', async () => {
    const controller = new AbortController();
    const fetchRequest = vi.fn<typeof fetch>().mockImplementation(async () => {
      controller.abort();
      return json([agreement]);
    });
    const api = createWorkbenchListTemplateApi({ baseURL, fetch: fetchRequest });
    await expect(api.load(controller.signal)).rejects.toHaveProperty('name', 'AbortError');
    fetchRequest.mockResolvedValueOnce(json({ error: 'denied' }, 403));
    await expect(api.load(new AbortController().signal)).rejects.toThrow('TEMPLATE_HTTP_ERROR:403');
    fetchRequest.mockResolvedValueOnce(json({ ignored: true }));
    await expect(api.terminate('a-1', context())).rejects.toThrow(
      'TEMPLATE_ACTION_RESPONSE_INVALID',
    );
    fetchRequest.mockResolvedValueOnce(new Response(null, { status: 204 }));
    await expect(api.terminate('a-1', context())).resolves.toBeUndefined();
    fetchRequest.mockResolvedValueOnce(json({ ok: true }));
    await expect(api.exportRows([agreement], context())).resolves.toBeUndefined();
  });
  it('binds a detail identity in its closure and rejects malformed detail envelopes', async () => {
    const fetchRequest = vi
      .fn<typeof fetch>()
      .mockResolvedValue(json({ agreement: detail, files: [], history: [] }));
    const api = createWorkbenchDetailTemplateApi({
      baseURL,
      fetch: fetchRequest,
      agreementId: 'id /?#',
    });
    await expect(api.load(new AbortController().signal)).resolves.toEqual({
      agreement: detail,
      files: [],
      history: [],
    });
    expect(fetchRequest.mock.calls[0]?.[0]).toBe(
      '/configured-api/agreement-detail?id=id+%2F%3F%23',
    );
    fetchRequest.mockResolvedValueOnce(json(null));
    await expect(api.load(new AbortController().signal)).resolves.toBeNull();
    fetchRequest.mockResolvedValueOnce(json({ agreement: detail }));
    await expect(api.load(new AbortController().signal)).rejects.toThrow('DETAIL_RESPONSE_INVALID');
    fetchRequest.mockResolvedValueOnce(json(detail));
    await expect(api.save(detail, context())).resolves.toEqual(detail);
  });
  it('sends dashboard business intents and blank actions to the configured host', async () => {
    const fetchRequest = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 204 }));
    await createWorkbenchDashboardTemplateApi({ baseURL, fetch: fetchRequest }).perform(
      { type: 'process-todo', id: 42 },
      context(),
    );
    expect(fetchRequest.mock.calls[0]?.[0]).toBe('/configured-api/dashboard/action');
    expect(fetchRequest.mock.calls[0]?.[1]?.body).toBe(
      JSON.stringify({ type: 'process-todo', id: 42 }),
    );
    await createBlankTemplateApi({ baseURL, fetch: fetchRequest }).primary(context());
    expect(fetchRequest.mock.calls[1]?.[0]).toBe('/configured-api/blank/primary');
  });
  it('permits only finite typed navigation targets and never interprets URL strings', async () => {
    const go = vi.fn();
    const fetchRequest = vi.fn<typeof fetch>();
    const list = createWorkbenchListTemplateApi({ baseURL, fetch: fetchRequest, navigate: go });
    await list.openDetail({ ...agreement, id: 'https://foreign.example' });
    expect(go).toHaveBeenLastCalledWith({
      name: 'template-workbench-detail',
      query: { id: 'https://foreign.example' },
    });
    const dashboard = createWorkbenchDashboardTemplateApi({
      baseURL,
      fetch: fetchRequest,
      navigate: go,
    });
    await dashboard.perform({ type: 'navigate', target: 'assistant' }, context());
    expect(go).toHaveBeenLastCalledWith({ name: 'template-ai-assistant-workspace' });
    await expect(
      dashboard.perform({ type: 'navigate', target: 'https://foreign.example' }, context()),
    ).rejects.toThrow('TEMPLATE_NAVIGATION_UNSUPPORTED');
    await expect(
      dashboard.perform({ type: 'navigate', target: 'orders' }, context()),
    ).rejects.toThrow('TEMPLATE_NAVIGATION_UNSUPPORTED');
    expect(fetchRequest).not.toHaveBeenCalled();
    expect(() => templateNavigation('javascript:alert(1)')).toThrow(
      'TEMPLATE_NAVIGATION_UNSUPPORTED',
    );
  });
});

async function collect<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const result: T[] = [];
  for await (const item of iterable) result.push(item);
  return result;
}
function sse(...events: unknown[]) {
  return new Response(
    events.map((event) => 'data: ' + JSON.stringify(event) + '\n\n').join('') + 'data: [DONE]\n\n',
    { headers: { 'Content-Type': 'text/event-stream' } },
  );
}
const workspaceAgreement = {
  ...agreement,
  amount: '¥1,000',
  owner: 'Owner',
  status: '待续签' as const,
};
describe('AI template API boundary', () => {
  it('uses the strict region-part SSE transport and carries the caller operation identity', async () => {
    const part = { type: 'region-table', rows: [{ region: 'South', amount: '100', yoy: '+10%' }] };
    const fetchRequest = vi.fn<typeof fetch>().mockResolvedValue(sse({ kind: 'part', part }));
    const api = createAiChatTemplateApi({ baseURL, fetch: fetchRequest });
    const request = {
      requestId: 'chat-1',
      idempotencyKey: 'chat-key',
      query: 'region sales',
      context: { aiEnabled: true, mode: '' },
      messages: [],
    };
    const signal = new AbortController().signal;
    await expect(collect(api.stream(request, signal))).resolves.toEqual([{ kind: 'part', part }]);
    expect(fetchRequest.mock.calls[0]?.[0]).toBe('/configured-api/chat/stream');
    expect(fetchRequest.mock.calls[0]?.[1]).toMatchObject({
      signal,
      method: 'POST',
      credentials: 'same-origin',
    });
    expect(new Headers(fetchRequest.mock.calls[0]?.[1]?.headers).get('Idempotency-Key')).toBe(
      'chat-key',
    );
    fetchRequest.mockResolvedValueOnce(
      sse({ kind: 'part', part: { type: 'region-table', rows: [{ region: 'missing-fields' }] } }),
    );
    await expect(collect(api.stream(request, signal))).rejects.toThrow('CHAT_INVALID_DELTA');
  });
  it('validates workspace reads, individual mutations and bulk renew responses', async () => {
    const fetchRequest = vi.fn<typeof fetch>().mockResolvedValue(json([workspaceAgreement]));
    const api = createAssistantWorkspaceTemplateApi({ baseURL, fetch: fetchRequest });
    const signal = new AbortController().signal;
    await expect(api.listAgreements({ range: '90' }, signal)).resolves.toEqual([
      workspaceAgreement,
    ]);
    expect(fetchRequest.mock.calls[0]?.[0]).toBe('/configured-api/workspace/agreements?range=90');
    fetchRequest.mockResolvedValueOnce(json([{ id: 'bad', fragments: [{ text: 42 }] }]));
    await expect(api.listInsights(signal)).rejects.toThrow('WORKSPACE_INVALID_INSIGHTS');
    fetchRequest.mockResolvedValueOnce(json(workspaceAgreement));
    await expect(
      api.assistant.updateAgreement('a-1', { owner: 'Owner' }, context()),
    ).resolves.toEqual(workspaceAgreement);
    expect(fetchRequest.mock.calls[2]?.[0]).toBe('/configured-api/workspace/agreements/update');
    expect(fetchRequest.mock.calls[2]?.[1]?.body).toBe(
      JSON.stringify({ id: 'a-1', patch: { owner: 'Owner' } }),
    );
    fetchRequest.mockResolvedValueOnce(json([workspaceAgreement]));
    await expect(api.renew(['a-1'], context())).resolves.toEqual([workspaceAgreement]);
    fetchRequest.mockResolvedValueOnce(json({ id: 'bad' }));
    await expect(api.assistant.renewAgreement('a-1', context())).rejects.toThrow(
      'WORKSPACE_INVALID_AGREEMENTS',
    );
  });
  it('adapts agreement streaming without advertising an assumed resume capability', async () => {
    const fetchRequest = vi
      .fn<typeof fetch>()
      .mockResolvedValue(sse({ kind: 'text', text: 'Hello' }));
    const api = createAssistantWorkspaceTemplateApi({ baseURL, fetch: fetchRequest });
    const signal = new AbortController().signal;
    await expect(
      collect(api.assistant.stream('agreements', signal, { aiEnabled: true, mode: 'agreement' })),
    ).resolves.toEqual([{ kind: 'text', text: 'Hello' }]);
    expect(fetchRequest.mock.calls[0]?.[0]).toBe('/configured-api/workspace/chat/stream');
    const request = fetchRequest.mock.calls[0]?.[1];
    const body: unknown = JSON.parse(String(request?.body));
    expect(body).toMatchObject({
      query: 'agreements',
      context: { aiEnabled: true, mode: 'agreement' },
      messages: [],
    });
    expect(new Headers(request?.headers).get('Idempotency-Key')).toBeTruthy();
    expect(api.assistant.continueStream).toBeUndefined();
    fetchRequest.mockResolvedValueOnce(
      sse({ kind: 'part', part: { type: 'region-table', rows: [] } }),
    );
    await expect(collect(api.assistant.stream('invalid extension', signal))).rejects.toThrow(
      'CHAT_INVALID_DELTA',
    );
  });
  it('keeps route-only navigation finite and rejects missing stream configuration explicitly', async () => {
    const go = vi.fn();
    const api = createAiChatTemplateApi({ baseURL, navigate: go });
    await api.navigate('home');
    expect(go).toHaveBeenLastCalledWith({ name: 'template-workbench-dashboard' });
    await expect(api.navigate('service')).rejects.toThrow('TEMPLATE_NAVIGATION_UNSUPPORTED');
    const missing = createAssistantWorkspaceTemplateApi({ baseURL: '' });
    expect(() => missing.assistant.stream('query', new AbortController().signal)).toThrow(
      'TEMPLATE_API_BASE_REQUIRED',
    );
  });
});
