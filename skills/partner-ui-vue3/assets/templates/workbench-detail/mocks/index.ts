import type { WorkbenchDetailApi } from '../api';
import type { AgreementDetail, DetailPayload } from '../types';
export const detailSeed: DetailPayload = {
  agreement: {
    updatedAt: '2026-10-28',
    renewalNotice: '该协议将于 2026-11-30 到期，请在到期前 15 天完成续签审批。',
    id: 'HT-2026-0101',
    name: '华东区分销框架协议',
    type: 'dist',
    endDate: '2026-11-30',
    amount: '1280000',
    partner: '星河科技有限公司',
    owner: '王敏',
    autoRenew: false,
    status: '待续签',
  },
  files: [
    { id: 'f1', name: '华东区分销框架协议-V3.pdf', size: 2457600, status: 'success' },
    { id: 'f2', name: '附件一：价格表.xlsx', size: 184320, status: 'success' },
  ],
  history: [
    { id: 'h3', time: '2026-10-28 14:20', title: '王敏 更新了协议负责人' },
    { id: 'h2', time: '2026-03-01 09:00', title: '协议生效', description: '双方完成电子签署' },
    { id: 'h1', time: '2026-02-20 16:45', title: '李华 提交审批' },
  ],
};
export function createMockDetailApi(initial: DetailPayload = detailSeed): WorkbenchDetailApi {
  const data = structuredClone(initial);
  return {
    async load(signal) {
      signal.throwIfAborted();
      return structuredClone(data);
    },
    async save(agreement, context) {
      context.signal.throwIfAborted();
      data.agreement = structuredClone(agreement);
      return structuredClone(agreement);
    },
    async renew(_id, context) {
      context.signal.throwIfAborted();
      data.agreement.status = '审批中';
      return structuredClone(data.agreement);
    },
    async copy(_id, context) {
      context.signal.throwIfAborted();
      const copied: AgreementDetail = { ...data.agreement, id: data.agreement.id + '-copy' };
      return copied;
    },
    async exportPdf(_id, context) {
      context.signal.throwIfAborted();
    },
  };
}
