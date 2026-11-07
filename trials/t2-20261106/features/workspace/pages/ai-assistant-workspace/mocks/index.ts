import type { Agreement, AssistantDelta, IntelligenceItem } from 'huawei-partner-ai-ui';
import type { AssistantWorkspaceApi } from '../api';
import type { WorkspaceNavigationTarget } from '../types';
/** Fixed original HTML fixtures: QA/unit only; no production import. */
export const workspaceSeed: { agreements: Agreement[]; insights: IntelligenceItem[] } = {
  agreements: [
    {
      id: 'HT-2026-0101',
      name: '华东区分销框架协议',
      partner: '星河科技',
      owner: '王敏',
      endDate: '2026-11-30',
      amount: '¥1,280,000',
      status: '待续签',
    },
    {
      id: 'HT-2026-0107',
      name: '华南区解决方案框架协议',
      partner: '南山云服务',
      owner: '李华',
      endDate: '2026-12-15',
      amount: '¥750,000',
      status: '审批中',
    },
    {
      id: 'HT-2026-0113',
      name: '西南区服务框架协议',
      partner: '海川智能',
      owner: '赵磊',
      endDate: '2027-01-08',
      amount: '¥460,000',
      status: '待续签',
    },
  ],
  insights: [
    {
      id: 'i1',
      fragments: [
        { text: '华东区分销框架协议', emphasis: 'bold' },
        { text: ' 剩余 ' },
        { text: '31 天', emphasis: 'data' },
        { text: '，金额最高' },
      ],
      action: { label: '去续签', navigation: { target: 'renew', params: { id: 'HT-2026-0101' } } },
    },
    {
      id: 'i2',
      fragments: [
        { text: '西南区有 ' },
        { text: '2 份', emphasis: 'data' },
        { text: '协议尚未启动续签' },
      ],
    },
  ],
};
export function workspaceReply(
  query: string,
  agreements: Agreement[] = workspaceSeed.agreements,
): AssistantDelta[] {
  if (/续签|到期|优先/.test(query))
    return [
      {
        kind: 'text',
        text: '以下 **3 份协议**将在 90 天内到期，建议优先处理「华东区分销框架协议」（金额最高、剩余 31 天）：',
      },
      {
        kind: 'part',
        part: {
          type: 'agreement-table',
          agreements: agreements.map((row) => ({ ...row })),
          total: agreements.length,
        },
      },
      {
        kind: 'part',
        part: {
          type: 'business-navigation',
          title: '协议续签工作台',
          description: '批量发起续签',
          target: { target: 'renewals' },
        },
      },
    ];
  if (/注意|风险/.test(query))
    return [
      {
        kind: 'text',
        text: '这份协议需要关注三点：\n\n1. **到期时间**：剩余天数不足 60 天，需尽快启动续签审批；\n2. **价格条款**：附件价格表为 2025 版，续签时建议同步更新；\n3. **负责人**：确认负责人在岗，避免审批卡点。',
      },
    ];
  if (/总结|经营|摘要/.test(query))
    return [
      {
        kind: 'part',
        part: {
          type: 'ai-summary',
          text: '本月续签完成率 68%，较上月提升 9 个百分点；华东区贡献最大，西南区仍有 2 份协议未启动续签。',
        },
      },
    ];
  return [{ kind: 'text', text: '可以试试问“哪些协议需要续签”。' }];
}
export function makeWorkspaceMockApi(
  options: {
    navigate?: (
      target: WorkspaceNavigationTarget,
      params?: Readonly<Record<string, string>>,
    ) => void;
  } = {},
): AssistantWorkspaceApi {
  let rows = workspaceSeed.agreements.map((row) => ({ ...row }));
  function update(id: string, patch: Partial<Pick<Agreement, 'owner' | 'status'>>) {
    const row = rows.find((value) => value.id === id);
    if (!row) throw new Error('WORKSPACE_NOT_FOUND');
    const next = { ...row, ...patch };
    rows = rows.map((value) => (value.id === id ? next : value));
    return { ...next };
  }
  return {
    navigate: (target, params) => options.navigate?.(target, params),
    listAgreements: async (input, signal) => {
      signal.throwIfAborted();
      return (input.range === '30' ? rows.slice(0, 1) : rows).map((row) => ({ ...row }));
    },
    listInsights: async (signal) => {
      signal.throwIfAborted();
      return structuredClone(workspaceSeed.insights);
    },
    renew: async (ids, context) => {
      context.signal.throwIfAborted();
      return ids.map((id) => update(id, { status: '审批中' }));
    },
    assistant: {
      async *stream(query, signal) {
        for (const delta of workspaceReply(query, rows)) {
          signal.throwIfAborted();
          yield delta;
        }
      },
      updateAgreement: async (id, patch, context) => {
        context.signal.throwIfAborted();
        return update(id, patch);
      },
      renewAgreement: async (id, context) => {
        context.signal.throwIfAborted();
        return update(id, { status: '审批中' });
      },
    },
  };
}
