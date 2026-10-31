export interface BlankActionContext {
  signal: AbortSignal;
  idempotencyKey: string;
}
