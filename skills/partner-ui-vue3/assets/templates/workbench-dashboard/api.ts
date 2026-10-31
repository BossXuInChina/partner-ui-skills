import type { DashboardAction, DashboardData, OperationContext } from './types';

// Verified against the locked package icons.json. This deliberately small template
// subset avoids shipping the full registry; hosts map service values to these keys.
export const approvedDashboardIcons = [
  'pedestal/circle/high/flow/48',
  'pedestal/circle/high/collect-files/48',
  'pedestal/circle/high/project/48',
  'pedestal/rounded-square/high/completed/48',
  '布局视图/视图=列表,尺寸=20,面性=off',
  '图表/类型=柱状图,尺寸=20,面性=off',
  '上传/尺寸=20',
  '下载/尺寸=20',
  '二维码/尺寸=20',
] as const;
const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);
const strings = (value: Record<string, unknown>, keys: string[]) =>
  keys.every((key) => typeof value[key] === 'string');
const finite = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);
const optionalString = (value: unknown) => value === undefined || typeof value === 'string';
const icon = (value: unknown) => approvedDashboardIcons.some((name) => name === value);
const navigation = (value: unknown) =>
  record(value) &&
  typeof value.target === 'string' &&
  (value.params === undefined ||
    (record(value.params) &&
      Object.values(value.params).every((param) => typeof param === 'string')));
const insight = (value: unknown) =>
  record(value) &&
  typeof value.id === 'string' &&
  Array.isArray(value.fragments) &&
  value.fragments.every(
    (fragment: unknown) =>
      record(fragment) &&
      typeof fragment.text === 'string' &&
      (fragment.emphasis === undefined ||
        fragment.emphasis === 'bold' ||
        fragment.emphasis === 'data'),
  ) &&
  (value.action === undefined ||
    (record(value.action) &&
      typeof value.action.label === 'string' &&
      navigation(value.action.navigation)));
/** Assumed read/action contract; the host maps typed intents to authorized routes or services. */
export interface WorkbenchDashboardApi {
  load(signal: AbortSignal): Promise<DashboardData>;
  perform(action: DashboardAction, context: OperationContext): Promise<void>;
}
export function decodeDashboardData(value: unknown): DashboardData {
  if (!record(value)) throw new Error('DASHBOARD_RESPONSE_INVALID');
  const data = value;
  if (
    !finite(data.expiringAgreements) ||
    data.expiringAgreements < 0 ||
    !finite(data.expiryWindowDays) ||
    data.expiryWindowDays < 0 ||
    !['greeting', 'organization', 'partnerLevel', 'updatedAt'].every(
      (key) => typeof data[key] === 'string',
    ) ||
    !['metrics', 'apps', 'insights', 'series', 'rates', 'todos', 'notices'].every((key) =>
      Array.isArray(data[key]),
    ) ||
    !(data.series as unknown[]).every(
      (number) => typeof number === 'number' && Number.isFinite(number),
    ) ||
    !(data.rates as unknown[]).every(
      (number) => typeof number === 'number' && Number.isFinite(number),
    ) ||
    (data.series as unknown[]).length !== (data.rates as unknown[]).length ||
    !(data.metrics as unknown[]).every(
      (item) =>
        record(item) &&
        strings(item, ['id', 'label']) &&
        (typeof item.value === 'string' || finite(item.value)) &&
        icon(item.icon),
    ) ||
    !(data.apps as unknown[]).every(
      (item) =>
        record(item) &&
        strings(item, ['id', 'label']) &&
        (item.icon === undefined || icon(item.icon)) &&
        (item.disabled === undefined || typeof item.disabled === 'boolean'),
    ) ||
    !(data.todos as unknown[]).every(
      (item) =>
        record(item) &&
        finite(item.id) &&
        strings(item, ['type', 'title', 'date']) &&
        (item.kind === 'approve' || item.kind === 'renew') &&
        (item.tone === 'info' || item.tone === 'warning'),
    ) ||
    !(data.notices as unknown[]).every(
      (item) =>
        record(item) && strings(item, ['id', 'time', 'title']) && optionalString(item.description),
    ) ||
    !(data.insights as unknown[]).every(insight)
  )
    throw new Error('DASHBOARD_RESPONSE_INVALID');
  return value as DashboardData;
}
