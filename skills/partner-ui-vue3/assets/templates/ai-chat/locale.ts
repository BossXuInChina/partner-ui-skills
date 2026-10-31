import type {
  WelcomeBusinessEntry,
  ChatSuggestionPill,
  MessagePromptsResolver,
} from 'huawei-partner-ai-ui';
export const text = {
  title: '智能问数',
  description: '用自然语言查询经营数据。',
  quickTitle: '常用问题',
  quick: ['各区域销售额排名', '总结本月经营概况', '打开报表明细'],
  tabs: [
    { value: 'home', label: '首页' },
    { value: 'sales', label: '销售' },
    { value: 'service', label: '服务' },
  ],
  sites: [{ value: 'partner', label: '企业伙伴网站' }],
  crumbs: [
    { id: 'home', label: '首页', href: '#' },
    { id: 'cur', label: '智能问数' },
  ],
  unsupported: '暂不支持此内容',
  navigationUnavailable: '该入口暂不可用',
  rendererError: '回复内容暂时无法加载，请重试。',
  retry: '重试',
  tableCaption: '区域销售额',
  columns: [
    { key: 'region', title: '区域', field: 'region' },
    { key: 'amount', title: '销售额（万元）', field: 'amount', align: 'end' as const },
    { key: 'yoy', title: '同比', field: 'yoy', align: 'end' as const },
  ],
};
export const welcome: WelcomeBusinessEntry[] = [
  { id: 'w1', title: '区域排名', description: '各区域销售额与同比', query: text.quick[0] },
  { id: 'w2', title: '经营概况', description: '一句话总结本月经营', query: text.quick[1] },
  { id: 'w3', title: '报表入口', description: '打开经营报表明细', query: text.quick[2] },
];
export const pills: ChatSuggestionPill[] = [
  { id: 'p1', label: '区域排名', query: text.quick[0] },
  { id: 'p2', label: '经营概况', query: text.quick[1] },
];
export const prompts: MessagePromptsResolver = () => [
  { id: 'f1', label: '按同比排序' },
  { id: 'f2', label: '导出为表格' },
];
