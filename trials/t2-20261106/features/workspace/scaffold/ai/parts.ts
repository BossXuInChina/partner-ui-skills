import type { Agreement, AssistantPart } from 'huawei-partner-ai-ui';

type SummaryPart = Extract<AssistantPart, { type: 'ai-summary' }>;
type NavigationPart = Extract<AssistantPart, { type: 'business-navigation' }>;
type AgreementsPart = Extract<AssistantPart, { type: 'agreement-table' }>;
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
export function isSummaryPart(value: unknown): value is SummaryPart {
  return record(value) && value.type === 'ai-summary' && typeof value.text === 'string';
}
export function isNavigationPart(value: unknown): value is NavigationPart {
  if (
    !record(value) ||
    value.type !== 'business-navigation' ||
    typeof value.title !== 'string' ||
    !record(value.target)
  )
    return false;
  return (
    typeof value.target.target === 'string' &&
    (value.description === undefined || typeof value.description === 'string') &&
    (value.target.params === undefined ||
      (record(value.target.params) &&
        Object.values(value.target.params).every((item) => typeof item === 'string')))
  );
}
function isAgreement(value: unknown): value is Agreement {
  return (
    record(value) &&
    ['id', 'name', 'partner', 'owner', 'endDate', 'amount'].every(
      (key) => typeof value[key] === 'string',
    ) &&
    typeof value.status === 'string' &&
    ['待续签', '审批中', '已续签'].includes(value.status)
  );
}
export function isAgreementsPart(value: unknown): value is AgreementsPart {
  return (
    record(value) &&
    value.type === 'agreement-table' &&
    typeof value.total === 'number' &&
    Number.isFinite(value.total) &&
    Array.isArray(value.agreements) &&
    value.agreements.every(isAgreement) &&
    (value.calculation === undefined ||
      (record(value.calculation) &&
        typeof value.calculation.formula === 'string' &&
        typeof value.calculation.note === 'string'))
  );
}
