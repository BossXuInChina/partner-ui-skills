import { agreementStatuses } from './types';
import type { Agreement, CreateAgreementInput, OperationContext } from './types';

/** Assumed DTO/operation contract. The host supplies verified endpoints, auth and routing. */
export interface WorkbenchListApi {
  load(signal: AbortSignal): Promise<Agreement[]>;
  create(input: CreateAgreementInput, context: OperationContext): Promise<Agreement>;
  renew(ids: string[], context: OperationContext): Promise<Agreement[]>;
  terminate(id: string, context: OperationContext): Promise<void>;
  exportRows(rows: Agreement[], context: OperationContext): Promise<void>;
  openDetail(row: Agreement): void | Promise<void>;
}

export function decodeAgreements(value: unknown): Agreement[] {
  if (
    !Array.isArray(value) ||
    !value.every((item: unknown) => {
      if (!item || typeof item !== 'object') return false;
      const row = item as Record<string, unknown>;
      return (
        ['id', 'name', 'partner', 'endDate'].every((key) => typeof row[key] === 'string') &&
        typeof row.amount === 'number' &&
        Number.isFinite(row.amount) &&
        agreementStatuses.some((status) => status === row.status)
      );
    })
  )
    throw new Error('LIST_RESPONSE_INVALID');
  return value as Agreement[];
}
