import type { WorkbenchDashboardApi } from '../api';
import type { DashboardData } from '../types';
export const dashboardSeed: DashboardData = {
  expiringAgreements: 3,
  expiryWindowDays: 30,
  greeting: '下午好，王敏',
  organization: '星河科技有限公司',
  partnerLevel: '金牌经销商',
  updatedAt: '2026-10-30 09:00',
  metrics: [
    {
      id: 'sales',
      label: '本月销售额（万元）',
      value: '1,286.4',
      icon: 'pedestal/circle/high/flow/48',
    },
    {
      id: 'orders',
      label: '新增订单（笔）',
      value: 342,
      icon: 'pedestal/circle/high/collect-files/48',
    },
    { id: 'opps', label: '在跟商机（个）', value: 57, icon: 'pedestal/circle/high/project/48' },
    {
      id: 'rate',
      label: '目标完成率',
      value: '86%',
      icon: 'pedestal/rounded-square/high/completed/48',
    },
  ],
  apps: [
    { id: 'orders', label: '订单中心', icon: '布局视图/视图=列表,尺寸=20,面性=off' },
    { id: 'report', label: '经营报表', icon: '图表/类型=柱状图,尺寸=20,面性=off' },
    { id: 'upload', label: '资料上传', icon: '上传/尺寸=20' },
    { id: 'download', label: '物料下载', icon: '下载/尺寸=20' },
    { id: 'qr', label: '伙伴码', icon: '二维码/尺寸=20' },
    { id: 'more', label: '暂未开放', disabled: true },
  ],
  insights: [
    {
      id: 'i1',
      fragments: [
        { text: '华东区' },
        { text: '分销框架协议', emphasis: 'bold' },
        { text: '将于 ' },
        { text: '11 月 30 日', emphasis: 'data' },
        { text: '到期，建议尽快发起续签' },
      ],
      action: { label: '去续签', navigation: { target: 'renewals' } },
    },
    {
      id: 'i2',
      fragments: [
        { text: '本月商机转化率 ' },
        { text: '18%', emphasis: 'data' },
        { text: '，高于区域平均' },
      ],
    },
    {
      id: 'i3',
      fragments: [{ text: '有 ' }, { text: '2 笔订单', emphasis: 'data' }, { text: '回款逾期' }],
      action: { label: '查看', navigation: { target: 'orders' } },
    },
  ],
  series: [620, 710, 680, 830, 790, 905, 880, 960, 1010, 1120, 1190, 1286],
  rates: [62, 66, 64, 70, 69, 74, 73, 77, 79, 82, 84, 86],
  todos: [
    {
      id: 1,
      kind: 'approve',
      type: '审批',
      tone: 'info',
      title: '远航数码 · 特价申请（¥286,000）',
      date: '今天 10:20',
    },
    {
      id: 2,
      kind: 'renew',
      type: '续签',
      tone: 'warning',
      title: '华东区分销框架协议 将于 11-30 到期',
      date: '昨天',
    },
    {
      id: 3,
      kind: 'approve',
      type: '审批',
      tone: 'info',
      title: '启明信息 · 新增联系人',
      date: '10-28',
    },
    {
      id: 4,
      kind: 'renew',
      type: '续签',
      tone: 'warning',
      title: '西南区服务框架协议 将于 12-15 到期',
      date: '10-27',
    },
  ],
  notices: [
    { id: 'n1', time: '10-29', title: '2027 年伙伴计划发布', description: '新增云服务专项激励' },
    { id: 'n2', time: '10-21', title: '第四季度返利政策调整说明' },
    { id: 'n3', time: '10-15', title: '伙伴工作台 11 月例行维护通知' },
  ],
};
export function createMockDashboardApi(
  initial: DashboardData = dashboardSeed,
): WorkbenchDashboardApi {
  return {
    async load(signal) {
      signal.throwIfAborted();
      return structuredClone(initial);
    },
    async perform(_action, context) {
      context.signal.throwIfAborted();
    },
  };
}
