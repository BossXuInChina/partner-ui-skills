import type { BlankActionContext } from './types';

/** Assumed action contract. The host supplies the operation, endpoint and authentication. */
export interface BlankApi {
  primary(context: BlankActionContext): Promise<void>;
}
