import type { RouteLocationRaw } from 'vue-router';
import { decodeAgreements } from '@templates/workbench-list/api';
import type { WorkbenchListApi } from '@templates/workbench-list/api';
import { decodeAgreementDetail, decodeDetailPayload } from '@templates/workbench-detail/api';
import type { WorkbenchDetailApi } from '@templates/workbench-detail/api';
import { decodeDashboardData } from '@templates/workbench-dashboard/api';
import type { WorkbenchDashboardApi } from '@templates/workbench-dashboard/api';
import type { BlankApi } from '@templates/blank/api';
import { createFetchChatTransport } from '@scaffold/chat/transport';
import type { AiChatApi } from '@templates/ai-chat/api';
import { isRegionSalesPart } from '@templates/ai-chat/types';
import type { RegionSalesPart } from '@templates/ai-chat/types';
import type { AssistantWorkspaceApi } from '@templates/ai-assistant-workspace/api';
import {
  decodeAgreements as decodeWorkspaceAgreements,
  decodeInsights,
} from '@templates/ai-assistant-workspace/types';

/** Assumed harness endpoints. Hosts replace these bindings with their verified API contracts. */
export interface TemplateApiOptions {
  baseURL?: string;
  fetch?: typeof globalThis.fetch;
  navigate?: (location: RouteLocationRaw) => void | Promise<unknown>;
  agreementId?: string;
}
interface WriteContext {
  signal: AbortSignal;
  idempotencyKey: string;
}

export function templateEndpoint(baseURL: unknown, operation: string): string {
  if (typeof baseURL !== 'string' || !baseURL.trim()) throw new Error('TEMPLATE_API_BASE_REQUIRED');
  const base = baseURL.trim().replace(/\/+$/, '');
  if (
    (!base.startsWith('/') && !/^https?:\/\//i.test(base)) ||
    base.startsWith('//') ||
    /[\\?#\s]/.test(base) ||
    /(?:^|\/)\.\.(?:\/|$)/.test(base)
  )
    throw new Error('TEMPLATE_API_BASE_INVALID');
  if (!/^\/[a-z][a-z0-9/-]*$/.test(operation) || operation.includes('..'))
    throw new Error('TEMPLATE_API_OPERATION_INVALID');
  return base + operation;
}

function client(options: TemplateApiOptions) {
  const base = options.baseURL ?? (import.meta.env.VITE_TEMPLATE_API_BASE as unknown);
  const fetchRequest =
    options.fetch ?? ((...args: Parameters<typeof globalThis.fetch>) => globalThis.fetch(...args));
  async function request(
    operation: string,
    signal: AbortSignal,
    context?: WriteContext,
    body?: unknown,
    query?: URLSearchParams,
  ): Promise<Response> {
    signal.throwIfAborted();
    if (context && !context.idempotencyKey.trim()) throw new Error('TEMPLATE_IDEMPOTENCY_REQUIRED');
    const headers = new Headers({ Accept: 'application/json' });
    if (context) {
      headers.set('Content-Type', 'application/json');
      headers.set('Idempotency-Key', context.idempotencyKey);
    }
    const endpoint = templateEndpoint(base, operation);
    const suffix = query?.toString();
    const response = await fetchRequest(endpoint + (suffix ? '?' + suffix : ''), {
      method: context ? 'POST' : 'GET',
      headers,
      signal,
      credentials: 'same-origin',
      cache: 'no-store',
      ...(context ? { body: JSON.stringify(body) } : {}),
    });
    signal.throwIfAborted();
    if (!response.ok) {
      void response.body?.cancel().catch(() => undefined);
      throw new Error(`TEMPLATE_HTTP_ERROR:${response.status}`);
    }
    return response;
  }
  async function read<T>(
    operation: string,
    signal: AbortSignal,
    decode: (value: unknown) => T,
    query?: URLSearchParams,
  ): Promise<T> {
    const response = await request(operation, signal, undefined, undefined, query);
    const value: unknown = await response.json();
    signal.throwIfAborted();
    return decode(value);
  }
  async function write<T>(
    operation: string,
    body: unknown,
    context: WriteContext,
    decode: (value: unknown) => T,
  ): Promise<T> {
    const response = await request(operation, context.signal, context, body);
    const value: unknown = await response.json();
    context.signal.throwIfAborted();
    return decode(value);
  }
  async function action(operation: string, body: unknown, context: WriteContext): Promise<void> {
    const response = await request(operation, context.signal, context, body);
    if (response.status === 204) return;
    const value: unknown = await response.json();
    context.signal.throwIfAborted();
    if (!value || typeof value !== 'object' || (value as Record<string, unknown>).ok !== true)
      throw new Error('TEMPLATE_ACTION_RESPONSE_INVALID');
  }
  return { read, write, action };
}

export function templateNavigation(
  target: string,
  params: Record<string, string> = {},
): RouteLocationRaw {
  const id = params.id;
  switch (target) {
    case 'home':
      return { name: 'template-workbench-dashboard' };
    case 'agreement':
      return id
        ? { name: 'template-workbench-detail', query: { id } }
        : { name: 'template-workbench-list' };
    case 'agreements':
      return { name: 'template-workbench-list' };
    case 'renew':
    case 'renewals':
      return { name: 'template-workbench-list', query: { status: '待续签' } };
    case 'agreement-detail':
      return { name: 'template-workbench-detail', query: id ? { id } : {} };
    case 'dashboard':
    case 'report':
    case 'reports':
      return { name: 'template-workbench-dashboard' };
    case 'assistant':
      return { name: 'template-ai-assistant-workspace' };
    case 'chat':
      return { name: 'template-ai-chat' };
    default:
      throw new Error('TEMPLATE_NAVIGATION_UNSUPPORTED');
  }
}
async function navigate(options: TemplateApiOptions, destination: RouteLocationRaw) {
  if (!options.navigate) throw new Error('TEMPLATE_NAVIGATION_REQUIRED');
  await options.navigate(destination);
}
export function createBlankTemplateApi(options: TemplateApiOptions = {}): BlankApi {
  const http = client(options);
  return { primary: (context) => http.action('/blank/primary', {}, context) };
}
export function createWorkbenchListTemplateApi(options: TemplateApiOptions = {}): WorkbenchListApi {
  const http = client(options);
  return {
    load: (signal) => http.read('/agreements', signal, decodeAgreements),
    create: (input, context) =>
      http.write('/agreements/create', input, context, (value) => {
        const result = decodeAgreements([value])[0];
        if (!result) throw new Error('LIST_RESPONSE_INVALID');
        return result;
      }),
    renew: (ids, context) => http.write('/agreements/renew', { ids }, context, decodeAgreements),
    terminate: (id, context) => http.action('/agreements/terminate', { id }, context),
    exportRows: (rows, context) => http.action('/agreements/export', { rows }, context),
    openDetail: (row) => navigate(options, templateNavigation('agreement-detail', { id: row.id })),
  };
}
export function createWorkbenchDetailTemplateApi(
  options: TemplateApiOptions = {},
): WorkbenchDetailApi {
  const http = client(options);
  return {
    load: (signal) =>
      http.read(
        '/agreement-detail',
        signal,
        decodeDetailPayload,
        options.agreementId ? new URLSearchParams({ id: options.agreementId }) : undefined,
      ),
    save: (agreement, context) =>
      http.write('/agreement-detail/save', { agreement }, context, decodeAgreementDetail),
    renew: (id, context) =>
      http.write('/agreement-detail/renew', { id }, context, decodeAgreementDetail),
    copy: (id, context) =>
      http.write('/agreement-detail/copy', { id }, context, decodeAgreementDetail),
    exportPdf: (id, context) => http.action('/agreement-detail/export', { id }, context),
  };
}
export function createWorkbenchDashboardTemplateApi(
  options: TemplateApiOptions = {},
): WorkbenchDashboardApi {
  const http = client(options);
  return {
    load: (signal) => http.read('/dashboard', signal, decodeDashboardData),
    async perform(action, context) {
      context.signal.throwIfAborted();
      if (action.type === 'navigate')
        await navigate(options, templateNavigation(action.target, action.params));
      else if (action.type === 'assistant')
        await navigate(options, templateNavigation('assistant'));
      else if (action.type === 'all-todos')
        await navigate(options, templateNavigation('agreements'));
      else await http.action('/dashboard/action', action, context);
    },
  };
}

export function createAiChatTemplateApi(options: TemplateApiOptions = {}): AiChatApi {
  const base = options.baseURL ?? (import.meta.env.VITE_TEMPLATE_API_BASE as unknown);
  const transport = createFetchChatTransport<RegionSalesPart>({
    url: () => templateEndpoint(base, '/chat/stream'),
    credentials: 'same-origin',
    ...(options.fetch ? { fetch: options.fetch } : {}),
    partValidator: isRegionSalesPart,
  });
  return {
    stream(request, signal) {
      templateEndpoint(base, '/chat/stream');
      return transport.stream(request, signal);
    },
    async navigate(target, params) {
      await navigate(options, templateNavigation(target, params));
    },
  };
}

export function createAssistantWorkspaceTemplateApi(
  options: TemplateApiOptions = {},
): AssistantWorkspaceApi {
  const base = options.baseURL ?? (import.meta.env.VITE_TEMPLATE_API_BASE as unknown);
  const http = client(options);
  const transport = createFetchChatTransport({
    url: () => templateEndpoint(base, '/workspace/chat/stream'),
    credentials: 'same-origin',
    ...(options.fetch ? { fetch: options.fetch } : {}),
  });
  function decodeAgreement(value: unknown) {
    const agreement = decodeWorkspaceAgreements([value])[0];
    if (!agreement) throw new Error('WORKSPACE_INVALID_AGREEMENTS');
    return agreement;
  }
  return {
    listAgreements: (input, signal) =>
      http.read(
        '/workspace/agreements',
        signal,
        decodeWorkspaceAgreements,
        new URLSearchParams({ range: input.range }),
      ),
    listInsights: (signal) => http.read('/workspace/insights', signal, decodeInsights),
    assistant: {
      stream(query, signal, context = { aiEnabled: true, mode: '' }) {
        templateEndpoint(base, '/workspace/chat/stream');
        const requestId = globalThis.crypto.randomUUID();
        return transport.stream(
          { requestId, idempotencyKey: requestId, query, context, messages: [] },
          signal,
        );
      },
      updateAgreement: (id, patch, context) =>
        http.write('/workspace/agreements/update', { id, patch }, context, decodeAgreement),
      renewAgreement: (id, context) =>
        http.write('/workspace/agreements/renew-one', { id }, context, decodeAgreement),
    },
    renew: (ids, context) =>
      http.write('/workspace/agreements/renew', { ids }, context, decodeWorkspaceAgreements),
    async navigate(target, params) {
      await navigate(options, templateNavigation(target, params));
    },
  };
}
