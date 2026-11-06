import type { WorkbenchListApi } from '../api';
import type { Agreement } from '../types';
const partners = [
  '星河科技',
  '远航数码',
  '启明信息',
  '海川智能',
  '北辰网络',
  '东篱电子',
  '南山云服务',
];
const statuses = ['生效中', '待续签', '审批中', '已到期'] as const;
export const listSeed: Agreement[] = Array.from({ length: 23 }, (_, i) => ({
  id: `HT-2026-${String(101 + i).padStart(4, '0')}`,
  name: `${['华东', '华南', '华北', '西南', '西北'][i % 5]}区${['分销', '服务', '解决方案', '云业务'][i % 4]}框架协议`,
  partner: partners[i % partners.length]!,
  endDate: `2026-${String((i % 12) + 1).padStart(2, '0')}-${String(((i * 7) % 28) + 1).padStart(2, '0')}`,
  amount: 200000 + ((i * 137) % 50) * 25000,
  status: statuses[i % statuses.length]!,
}));
export function createMockListApi(initial: Agreement[] = listSeed): WorkbenchListApi {
  let rows = structuredClone(initial);
  return {
    async load(signal) {
      signal.throwIfAborted();
      return structuredClone(rows);
    },
    async create(input, context) {
      context.signal.throwIfAborted();
      const row: Agreement = {
        ...input,
        id: 'HT-2026-' + String(rows.length + 200).padStart(4, '0'),
        amount: 0,
        status: '审批中',
      };
      rows.unshift(row);
      return structuredClone(row);
    },
    async renew(ids, context) {
      context.signal.throwIfAborted();
      rows = rows.map((row) =>
        ids.includes(row.id) && row.status !== '审批中' ? { ...row, status: '审批中' } : row,
      );
      return structuredClone(rows.filter((row) => ids.includes(row.id)));
    },
    async terminate(id, context) {
      context.signal.throwIfAborted();
      rows = rows.filter((row) => row.id !== id);
    },
    async exportRows(_rows, context) {
      context.signal.throwIfAborted();
    },
    openDetail() {},
  };
}
