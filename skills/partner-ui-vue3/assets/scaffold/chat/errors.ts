export class ChatTransportError extends Error {
  constructor(
    readonly code: string,
    readonly status?: number,
    options?: ErrorOptions,
  ) {
    super(code, options);
    this.name = 'ChatTransportError';
  }
}

export function chatErrorCode(error: unknown): string {
  return error instanceof ChatTransportError ? error.code : 'CHAT_TRANSPORT_FAILED';
}
