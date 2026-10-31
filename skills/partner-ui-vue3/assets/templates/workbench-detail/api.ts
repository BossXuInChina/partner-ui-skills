import type { AgreementDetail, DetailPayload, OperationContext } from './types';

/** Assumed contract. Bind the current agreement ID in the host's API closure. */
export interface WorkbenchDetailApi {
  load(signal: AbortSignal): Promise<DetailPayload | null>;
  save(agreement: AgreementDetail, context: OperationContext): Promise<AgreementDetail>;
  renew(id: string, context: OperationContext): Promise<AgreementDetail>;
  copy(id: string, context: OperationContext): Promise<AgreementDetail>;
  exportPdf(id: string, context: OperationContext): Promise<void>;
}
export function decodeAgreementDetail(value: unknown): AgreementDetail {
  if (!value || typeof value !== 'object') throw new Error('DETAIL_RESPONSE_INVALID');
  const row = value as Record<string, unknown>;
  if (
    !['id', 'name', 'endDate', 'partner', 'owner', 'updatedAt', 'renewalNotice'].every(
      (key) => typeof row[key] === 'string',
    ) ||
    typeof row.type !== 'string' ||
    !['dist', 'service', 'solution'].includes(row.type) ||
    typeof row.status !== 'string' ||
    !['生效中', '待续签', '审批中', '已到期'].includes(row.status) ||
    !['string', 'number'].includes(typeof row.amount) ||
    !Number.isFinite(Number(row.amount)) ||
    typeof row.autoRenew !== 'boolean'
  )
    throw new Error('DETAIL_RESPONSE_INVALID');
  return value as AgreementDetail;
}
export function decodeDetailPayload(value: unknown): DetailPayload | null {
  if (value === null) return null;
  if (!value || typeof value !== 'object') throw new Error('DETAIL_RESPONSE_INVALID');
  const data = value as Record<string, unknown>;
  decodeAgreementDetail(data.agreement);
  if (
    !Array.isArray(data.files) ||
    !data.files.every((value: unknown) => {
      if (!value || typeof value !== 'object') return false;
      const file = value as Record<string, unknown>;
      return (
        typeof file.name === 'string' &&
        typeof file.id === 'string' &&
        typeof file.size === 'number' &&
        Number.isFinite(file.size) &&
        file.size >= 0 &&
        typeof file.status === 'string' &&
        ['ready', 'uploading', 'paused', 'success', 'error', 'cancelled'].includes(file.status)
      );
    }) ||
    !Array.isArray(data.history) ||
    !data.history.every((value: unknown) => {
      if (!value || typeof value !== 'object') return false;
      const event = value as Record<string, unknown>;
      return (
        typeof event.title === 'string' &&
        typeof event.time === 'string' &&
        (event.description === undefined || typeof event.description === 'string') &&
        typeof event.id === 'string'
      );
    })
  )
    throw new Error('DETAIL_RESPONSE_INVALID');
  return value as DetailPayload;
}
