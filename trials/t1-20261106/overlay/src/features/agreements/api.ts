import type { InjectionKey } from 'vue';
import type { AgreementAssistantAdapter, ConversationStorage } from 'huawei-partner-ai-ui';
import { createFetchChatTransport } from '@scaffold/chat/transport';

/** Assumed DTO and endpoints; host supplies URL, authentication and transport. */
export interface Agreement {
  id: string;
  name: string;
  partner: string;
  owner: string;
  status: string;
  startDate: string;
  endDate: string;
}
export interface ListQuery {
  keyword: string;
  status: string;
  page: number;
  pageSize: number;
}
export interface AgreementApi {
  list(query: ListQuery, signal: AbortSignal): Promise<{ items: Agreement[]; total: number }>;
  detail(id: string, signal: AbortSignal): Promise<Agreement>;
  assistant: AgreementAssistantAdapter;
  storage?: ConversationStorage;
}
export const agreementApiKey: InjectionKey<AgreementApi> = Symbol('agreement-api');
function decode(value: unknown): Agreement {
  if (!value || typeof value !== 'object') throw new Error('INVALID_AGREEMENT');
  const row = value as Record<string, unknown>;
  if (
    !['id', 'name', 'partner', 'owner', 'status', 'startDate', 'endDate'].every(
      (k) => typeof row[k] === 'string',
    )
  )
    throw new Error('INVALID_AGREEMENT');
  return row as unknown as Agreement;
}
export function createAgreementApi(base: string, transport: typeof fetch = fetch): AgreementApi {
  async function read(path: string, signal: AbortSignal): Promise<unknown> {
    const response = await transport(base + path, { signal, credentials: 'same-origin' });
    if (!response.ok) throw new Error('HTTP_ERROR');
    return response.json() as Promise<unknown>;
  }
  const chat = createFetchChatTransport({
    url: () => base + '/assistant',
    fetch: transport,
    credentials: 'same-origin',
  });
  let failed: { query: string; id: string } | undefined;
  return {
    async list(query, signal) {
      const params = new URLSearchParams({
        keyword: query.keyword,
        status: query.status,
        page: String(query.page),
        pageSize: String(query.pageSize),
      });
      const value = await read('/agreements?' + params, signal);
      if (!value || typeof value !== 'object') throw new Error('INVALID_LIST');
      const result = value as Record<string, unknown>;
      if (
        !Array.isArray(result.items) ||
        typeof result.total !== 'number' ||
        !Number.isInteger(result.total) ||
        result.total < 0
      )
        throw new Error('INVALID_LIST');
      return { items: result.items.map(decode), total: result.total };
    },
    async detail(id, signal) {
      return decode(await read('/agreements/' + encodeURIComponent(id), signal));
    },
    assistant: {
      async *stream(query, signal, context = { aiEnabled: true, mode: '' }) {
        const id = failed?.query === query ? failed.id : crypto.randomUUID();
        try {
          yield* chat.stream(
            { requestId: id, idempotencyKey: id, query, context, messages: [] },
            signal,
          );
          failed = undefined;
        } catch (error) {
          failed = { query, id };
          throw error;
        }
      },
      async updateAgreement() {
        throw new Error('UNSUPPORTED');
      },
      async renewAgreement() {
        throw new Error('UNSUPPORTED');
      },
    },
  };
}
