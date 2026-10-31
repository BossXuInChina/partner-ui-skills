import { abortable, isAbortError, throwIfAborted } from './abort';
import { ChatTransportError } from './errors';
import { createDeltaValidator } from './protocol';
import type {
  ChatDelta,
  ChatPart,
  PartValidator,
  BusinessActionContext,
  ChatRequest,
  ChatTransport,
} from './types';

export interface SSEEvent {
  event: string;
  data: string;
  id?: string;
}

export type HeaderSource<Input> =
  HeadersInit | ((input: Input, signal: AbortSignal) => HeadersInit | Promise<HeadersInit>);
type URLSource<Input> = string | URL | ((input: Input) => string | URL);

export interface FetchChatTransportOptions<Extension extends ChatPart = never> {
  url: URLSource<ChatRequest<Extension>>;
  headers?: HeaderSource<ChatRequest<Extension>>;
  credentials?: RequestCredentials;
  fetch?: typeof globalThis.fetch;
  serializeRequest?: (request: ChatRequest<Extension>) => unknown;
  decodeEvent?: (event: SSEEvent) => ChatDelta<Extension> | readonly ChatDelta<Extension>[] | null;
  partValidator?: PartValidator<Extension>;
  maxEventCharacters?: number;
}

export interface FetchBusinessActionOptions<Input, Output> {
  url: URLSource<Input>;
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: HeaderSource<Input>;
  credentials?: RequestCredentials;
  fetch?: typeof globalThis.fetch;
  serializeRequest?: (input: Input) => unknown;
  /** A verified business response decoder is mandatory; no response fields are guessed. */
  parseResponse: (response: Response) => Promise<Output>;
}

export const SSE_PROTOCOL_ASSUMPTION =
  'assumed: POST JSON ChatRequest; text/event-stream data contains one public AssistantDelta JSON value; ' +
  'multiline data joins with LF; [DONE] ends the stream; EOF flushes an unfinished final data event. ' +
  'Hosts must configure URL/auth and adapt serialization/decoding to their verified API.';

export async function* readSSE(
  stream: ReadableStream<Uint8Array>,
  signal: AbortSignal,
  maxEventCharacters = 1_048_576,
): AsyncIterable<SSEEvent> {
  if (!Number.isSafeInteger(maxEventCharacters) || maxEventCharacters < 1) {
    throw new ChatTransportError('CHAT_INVALID_CONFIG');
  }
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let data: string[] = [];
  let dataSize = 0;
  let name = 'message';
  let id: string | undefined;
  let ended = false;

  function line(value: string, events: SSEEvent[]) {
    if (!value) {
      if (data.length)
        events.push({
          event: name,
          data: data.join('\n'),
          ...(id === undefined ? {} : { id }),
        });
      data = [];
      dataSize = 0;
      name = 'message';
      return;
    }
    if (value.startsWith(':')) return;
    const colon = value.indexOf(':');
    const field = colon < 0 ? value : value.slice(0, colon);
    let content = colon < 0 ? '' : value.slice(colon + 1);
    if (content.startsWith(' ')) content = content.slice(1);
    if (field === 'data') {
      data.push(content);
      dataSize += content.length + 1;
    } else if (field === 'event') name = content || 'message';
    else if (field === 'id' && !content.includes('\0')) id = content;
    if (dataSize > maxEventCharacters) throw new ChatTransportError('CHAT_SSE_EVENT_TOO_LARGE');
  }

  function consume(value: string, final = false) {
    buffer += value;
    const events: SSEEvent[] = [];
    let start = 0;
    for (let index = 0; index < buffer.length; index++) {
      const char = buffer[index];
      if (char !== '\n' && char !== '\r') continue;
      if (char === '\r' && index + 1 === buffer.length && !final) break;
      line(buffer.slice(start, index), events);
      if (char === '\r' && buffer[index + 1] === '\n') index++;
      start = index + 1;
    }
    buffer = buffer.slice(start);
    if (buffer.length + dataSize > maxEventCharacters)
      throw new ChatTransportError('CHAT_SSE_EVENT_TOO_LARGE');
    if (final) {
      if (buffer) line(buffer, events);
      buffer = '';
      line('', events);
    }
    return events;
  }

  try {
    while (true) {
      throwIfAborted(signal);
      const result = await abortable(reader.read(), signal);
      if (result.done) {
        ended = true;
        for (const event of consume(decoder.decode(), true)) yield event;
        return;
      }
      for (const event of consume(decoder.decode(result.value, { stream: true }))) {
        throwIfAborted(signal);
        yield event;
      }
    }
  } finally {
    if (!ended) await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}

function decodeEvent(event: SSEEvent): unknown {
  if (event.event === 'error') throw new ChatTransportError('CHAT_STREAM_ERROR');
  let value: unknown;
  try {
    value = JSON.parse(event.data);
  } catch (cause) {
    throw new ChatTransportError('CHAT_SSE_JSON', undefined, { cause });
  }
  return value;
}

async function requestHeaders<Input>(
  source: HeaderSource<Input> | undefined,
  input: Input,
  signal: AbortSignal,
  key: string,
) {
  throwIfAborted(signal);
  if (typeof key !== 'string' || !key.trim())
    throw new ChatTransportError('CHAT_IDEMPOTENCY_KEY_REQUIRED');
  const value =
    typeof source === 'function'
      ? await abortable(Promise.resolve(source(input, signal)), signal)
      : source;
  throwIfAborted(signal);
  const headers = new Headers(value);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  headers.set('Idempotency-Key', key);
  return headers;
}

function endpoint<Input>(source: URLSource<Input>, input: Input) {
  const url = typeof source === 'function' ? source(input) : source;
  if ((typeof url !== 'string' && !(url instanceof URL)) || !String(url).trim())
    throw new ChatTransportError('CHAT_ENDPOINT_REQUIRED');
  return url;
}

export function createFetchChatTransport<Extension extends ChatPart = never>(
  options: FetchChatTransportOptions<Extension>,
): ChatTransport<Extension> {
  const isDelta = createDeltaValidator(options.partValidator);
  const fetchRequest = options.fetch ?? globalThis.fetch.bind(globalThis);
  return {
    async *stream(request, signal) {
      try {
        const headers = await requestHeaders(
          options.headers,
          request,
          signal,
          request.idempotencyKey,
        );
        headers.set('Accept', 'text/event-stream');
        const response = await abortable(
          fetchRequest(endpoint(options.url, request), {
            method: 'POST',
            headers,
            signal,
            credentials: options.credentials ?? 'same-origin',
            cache: 'no-store',
            body: JSON.stringify(
              options.serializeRequest ? options.serializeRequest(request) : request,
            ),
          }),
          signal,
        );
        if (!response.ok) {
          void response.body?.cancel().catch(() => undefined);
          throw new ChatTransportError('CHAT_HTTP_ERROR', response.status);
        }
        if (
          response.headers.get('Content-Type')?.split(';', 1)[0]?.trim().toLowerCase() !==
          'text/event-stream'
        ) {
          void response.body?.cancel().catch(() => undefined);
          throw new ChatTransportError('CHAT_SSE_CONTENT_TYPE');
        }
        if (!response.body) throw new ChatTransportError('CHAT_EMPTY_RESPONSE');
        for await (const event of readSSE(response.body, signal, options.maxEventCharacters)) {
          if (event.event === 'error') throw new ChatTransportError('CHAT_STREAM_ERROR');
          if (event.data.trim() === '[DONE]') return;
          const result: unknown = (options.decodeEvent ?? decodeEvent)(event);
          const deltas = result === null ? [] : Array.isArray(result) ? result : [result];
          for (const delta of deltas) {
            throwIfAborted(signal);
            if (!isDelta(delta)) throw new ChatTransportError('CHAT_INVALID_DELTA');
            yield delta;
          }
        }
      } catch (cause) {
        if (signal.aborted || isAbortError(cause) || cause instanceof ChatTransportError)
          throw cause;
        throw new ChatTransportError('CHAT_TRANSPORT_FAILED', undefined, {
          cause,
        });
      }
    },
  };
}

export function createFetchBusinessAction<Input, Output>(
  options: FetchBusinessActionOptions<Input, Output>,
) {
  const fetchRequest = options.fetch ?? globalThis.fetch.bind(globalThis);
  return async (input: Input, context: BusinessActionContext): Promise<Output> => {
    try {
      const headers = await requestHeaders(
        options.headers,
        input,
        context.signal,
        context.idempotencyKey,
      );
      const response = await abortable(
        fetchRequest(endpoint(options.url, input), {
          method: options.method ?? 'POST',
          headers,
          signal: context.signal,
          credentials: options.credentials ?? 'same-origin',
          cache: 'no-store',
          body: JSON.stringify(options.serializeRequest ? options.serializeRequest(input) : input),
        }),
        context.signal,
      );
      if (!response.ok) {
        void response.body?.cancel().catch(() => undefined);
        throw new ChatTransportError('CHAT_HTTP_ERROR', response.status);
      }
      return await abortable(options.parseResponse(response), context.signal);
    } catch (cause) {
      if (context.signal.aborted || isAbortError(cause) || cause instanceof ChatTransportError)
        throw cause;
      throw new ChatTransportError('CHAT_TRANSPORT_FAILED', undefined, { cause });
    }
  };
}
