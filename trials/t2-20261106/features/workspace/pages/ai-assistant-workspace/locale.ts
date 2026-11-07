import type {
  WelcomeBusinessEntry,
  ChatSuggestionPill,
  MessagePromptsResolver,
} from 'huawei-partner-ai-ui';
export const text = {
  title: '协议续签工作台',
  description: '跟踪即将到期的协议并发起续签。',
  assistant: '企业AI助手',
  bulkRenew: '批量续签',
  insights: '智慧洞察',
  week: '本周 ',
  suggestions: ' 条建议',
  upcoming: '即将到期',
  tableCaption: '即将到期协议',
  rangeLabel: '到期范围',
  rangeItems: [
    { value: '30', label: '30 天内' },
    { value: '90', label: '90 天内' },
  ],
  tabs: [
    { value: 'home', label: '首页' },
    { value: 'sales', label: '销售' },
    { value: 'service', label: '服务' },
  ],
  sites: [{ value: 'partner', label: '企业伙伴网站' }],
  crumbs: [
    { id: 'home', label: '首页', href: '#' },
    { id: 'sales', label: '销售', href: '#' },
    { id: 'cur', label: '协议续签工作台' },
  ],
  columns: [
    { key: 'name', title: '协议名称', field: 'name', primary: true, fluid: true, ellipsis: true },
    { key: 'partner', title: '合作伙伴', field: 'partner', width: 120 },
    { key: 'endDate', title: '到期日期', field: 'endDate', width: 120 },
    { key: 'amount', title: '金额', field: 'amount', width: 130, align: 'end' as const },
    { key: 'status', title: '状态', field: 'status', width: 100 },
  ],
  rowActions: [
    { id: 'ask', label: '问问 AI' },
    { id: 'renew', label: '续签' },
  ],
  loading: '正在加载协议…',
  empty: '暂无即将到期的协议',
  loadError: '协议数据加载失败，请重试。',
  renewError: '续签申请提交失败，请重试。',
  retry: '重试',
  submitted: '续签申请已提交',
  navigationUnavailable: '该入口暂不可用',
  assistantBusy: '助手正在回复，请稍后重试。',
  assistantLoadError: '助手加载失败，请重试。',
  priorityQuery: '哪些协议需要优先续签',
  rowQuery: (name: string) => `${name}需要注意什么`,
};
export const welcome: WelcomeBusinessEntry[] = [
  {
    id: 'w1',
    title: '到期协议',
    description: '查看即将到期需要续签的协议',
    query: '哪些协议需要续签',
  },
  { id: 'w2', title: '续签总结', description: '总结本月续签进展', query: '总结本月续签情况' },
];
export const pills: ChatSuggestionPill[] = [
  { id: 'p1', label: '到期协议', query: '哪些协议需要续签' },
  { id: 'p2', label: '续签总结', query: '总结本月续签情况' },
];
export const prompts: MessagePromptsResolver = () => [
  { id: 'f1', label: '按金额排序' },
  { id: 'f2', label: '生成续签提醒' },
];
