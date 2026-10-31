import type { AiChatApi } from '../api';
import type { ChatDelta } from '@scaffold/chat/types';
import type { ChatNavigationTarget, RegionSalesPart } from '../types';
/** QA/unit seed only. Never import this module from a production entry. */
export const aiChatSeed = {
  rows: [
    { region: '华东', amount: '412.6', yoy: '+18.2%' },
    { region: '华南', amount: '336.1', yoy: '+9.7%' },
    { region: '华北', amount: '298.4', yoy: '+4.1%' },
    { region: '西南', amount: '239.3', yoy: '-2.3%' },
  ],
  regionIntroduction: '10 月各区域销售额如下，**华东**同比增长最快：',
  summary:
    '10 月销售额 1,286.4 万元，环比 +8.0%；新增订单 342 笔；目标完成率 86%，预计 11 月中旬完成季度目标。',
  report: { title: '经营报表', description: '查看分区域、分产品明细' },
  fallback: '可以试试问“各区域销售额排名”或“总结本月经营概况”。',
};
export function aiChatReply(query: string): ChatDelta<RegionSalesPart>[] {
  if (/区域|排名/.test(query))
    return [
      { kind: 'text', text: aiChatSeed.regionIntroduction },
      {
        kind: 'part',
        part: { type: 'region-table', rows: aiChatSeed.rows.map((row) => ({ ...row })) },
      },
    ];
  if (/总结|经营|概况/.test(query))
    return [{ kind: 'part', part: { type: 'ai-summary', text: aiChatSeed.summary } }];
  if (/报表|明细/.test(query))
    return [
      { kind: 'text', text: '已为您定位到经营报表：' },
      {
        kind: 'part',
        part: { type: 'business-navigation', ...aiChatSeed.report, target: { target: 'report' } },
      },
    ];
  return [{ kind: 'text', text: aiChatSeed.fallback }];
}
export function makeAiChatMockApi(
  options: {
    navigate?: (target: ChatNavigationTarget, params?: Readonly<Record<string, string>>) => void;
  } = {},
): AiChatApi {
  return {
    navigate: (target, params) => options.navigate?.(target, params),
    async *stream(request, signal) {
      for (const delta of aiChatReply(request.query)) {
        signal.throwIfAborted();
        yield delta;
      }
    },
  };
}
