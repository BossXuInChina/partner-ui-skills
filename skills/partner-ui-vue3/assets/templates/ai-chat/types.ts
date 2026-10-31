import type { ChatSnapshot } from '@scaffold/chat/types';
export interface RegionSalesRow extends Record<string, unknown> {
  region: string;
  amount: string;
  yoy: string;
}
export interface RegionSalesPart {
  type: 'region-table';
  rows: RegionSalesRow[];
}
export type ChatNavigationTarget = 'home' | 'sales' | 'service' | 'report' | 'agreement';
export interface ChatHistoryStorage {
  read(namespace: string): Promise<ChatSnapshot<RegionSalesPart> | null>;
  write(namespace: string, snapshot: ChatSnapshot<RegionSalesPart>): Promise<void>;
}
export function isRegionSalesPart(value: unknown): value is RegionSalesPart {
  if (
    !value ||
    typeof value !== 'object' ||
    !('type' in value) ||
    value.type !== 'region-table' ||
    !('rows' in value) ||
    !Array.isArray(value.rows)
  )
    return false;
  return value.rows.every(
    (row) =>
      row &&
      typeof row === 'object' &&
      typeof row.region === 'string' &&
      typeof row.amount === 'string' &&
      typeof row.yoy === 'string',
  );
}
