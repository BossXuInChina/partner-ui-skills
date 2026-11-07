import type { Agreement, ConversationStorage, IntelligenceItem } from 'huawei-partner-ai-ui';
export type AgreementRange = '30' | '90';
export type WorkspaceNavigationTarget =
  'home' | 'sales' | 'service' | 'renew' | 'renewals' | 'agreement';
export interface WorkspaceData {
  agreements: Agreement[];
  insights: IntelligenceItem[];
}
export type WorkspaceHistoryStorage = ConversationStorage;
const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);
export function isAgreement(value: unknown): value is Agreement {
  return (
    record(value) &&
    ['id', 'name', 'partner', 'owner', 'endDate', 'amount'].every(
      (key) => typeof value[key] === 'string',
    ) &&
    typeof value.status === 'string' &&
    ['待续签', '审批中', '已续签'].includes(value.status)
  );
}
export function decodeAgreements(value: unknown): Agreement[] {
  if (!Array.isArray(value) || !value.every(isAgreement))
    throw new Error('WORKSPACE_INVALID_AGREEMENTS');
  return value;
}
export function decodeInsights(value: unknown): IntelligenceItem[] {
  if (
    !Array.isArray(value) ||
    !value.every(
      (item) =>
        record(item) &&
        typeof item.id === 'string' &&
        Array.isArray(item.fragments) &&
        item.fragments.every(
          (fragment) =>
            record(fragment) &&
            typeof fragment.text === 'string' &&
            (fragment.emphasis === undefined ||
              fragment.emphasis === 'bold' ||
              fragment.emphasis === 'data'),
        ) &&
        (item.action === undefined ||
          (record(item.action) &&
            typeof item.action.label === 'string' &&
            record(item.action.navigation) &&
            typeof item.action.navigation.target === 'string' &&
            (item.action.navigation.params === undefined ||
              (record(item.action.navigation.params) &&
                Object.values(item.action.navigation.params).every(
                  (param) => typeof param === 'string',
                ))))),
    )
  )
    throw new Error('WORKSPACE_INVALID_INSIGHTS');
  return value;
}
