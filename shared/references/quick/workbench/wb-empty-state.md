<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 空状态 EmptyState — `WorkbenchEmptyState`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-empty-state`](<../../workbench/wb-empty-state.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-empty-state",
  "kind": "component",
  "version": "1.0.0",
  "summary": "在局部、卡片或页面没有可展示内容时解释原因，并提供恢复操作。",
  "useWhen": ["空状态 Empty / EmptyState：局部信息、卡片或页面当前没有可展示内容","暂无数据、搜索无结果、网络异常、加载失败、无权限、内容已下架、内容已失效、敬请期待"],
  "avoidWhen": ["请求仍在加载时应使用Loading或Skeleton","已有有效内容时不以空状态覆盖现有数据","未经生产接入验证作为生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "usageStatus": "unavailable",
  "usageUnsupported": [{"code":"OFFICIAL_SFC_MISSING","reason":"No official usage SFC mentions this public asset. Scenario/story source was not substituted."}],
  "variantStatus": "unavailable",
  "variantUnsupported": [{"code":"VARIANT_VIEW_MISSING","reason":"No current declared variants view/readingPilot is available; source declarations are retained."}]
}
```

未声明或为空：unsupported、caseSemantics（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchEmptyState"},
  "props": {
    "type": {"type":"String","default":"no-data","enum":["no-data","no-results","network-error","load-failed","forbidden","removed","expired","coming-soon"]},
    "level": {"type":"String","default":"card","enum":["local","card","page"]},
    "size": {"type":"String","default":"auto","enum":["auto","small","default","large"]},
    "locale": {"type":"String","default":"zh-CN","enum":["zh-CN","en-US"]},
    "title": {"type":"String","default":""},
    "description": {"type":"String","default":{"kind":"undefined"}},
    "primaryText": {"type":"String","default":""},
    "secondaryText": {"type":"String","default":""},
    "retry": {"type":"Boolean","default":true},
    "busy": {"type":"Boolean","default":false},
    "live": {"type":"String","default":"off","enum":["off","polite"]}
  },
  "events": ["retry","primary","secondary"],
  "slots": ["illustration","title","description","actions"],
  "propNotes": {"type":"八类空状态语义。","level":"local / card / page。","size":"auto / small / default / large。","locale":"zh-CN / en-US。","busy":"禁用内建操作并暴露 aria-busy。"},
  "eventNotes": {"retry":{"payload":"type","timing":"点击内联重试入口。"},"primary":{"payload":"MouseEvent","timing":"点击主操作。"},"secondary":{"payload":"MouseEvent","timing":"点击次操作。"}},
  "slotNotes": {
    "illustration": {"scope":"{ type, size }","description":"替换卡片或页面插画。"},
    "title": {"description":"替换标题。"},
    "description": {"scope":"{ type }","description":"替换描述全文及内联操作。"},
    "actions": {"scope":"{ size, busy }","description":"替换操作区并管理忙碌态。"}
  }
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-empty-state-level",
      "title": "层级与结构",
      "text": "local只显示描述及错误内联重试；card与page可选插画、标题、说明、操作。组件不加外层padding或固定内容高度，由父容器负责空间和居中。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用空状态","empty state","EmptyState"],
      "references": []
    },
    {
      "id": "wb-empty-state-native-illustration",
      "title": "独立原档插画",
      "text": "复用WorkbenchEmptyIcon独立登记的24个SVG；按语义和64/120/240原档选择，不重绘、不改色、不以另一档缩放替代。auto在card取120、page取240；显式small/default/large取64/120/240。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用空状态","empty state","EmptyState"],
      "references": []
    },
    {
      "id": "wb-empty-state-request-boundary",
      "title": "请求与忙碌边界",
      "text": "加载中使用Loading或Skeleton；已有有效内容不被空状态覆盖。重试、创建、返回等业务由消费方处理；busy禁用内建重试及主次操作，自定义actions按插槽busy自行管理。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用空状态","empty state","EmptyState"],
      "references": []
    },
    {
      "id": "wb-empty-state-content",
      "title": "默认文案与自定义",
      "text": "8种语义提供中英文默认文案；network-error/load-failed默认末尾有可键盘访问的内联重试。description Prop或插槽替换整段默认内容，不再自动追加默认重试；local不显示按钮组。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用空状态","empty state","EmptyState"],
      "references": []
    }
  ],
  "dependencies": ["wb-button"],
  "foundationKeys": ["color-text-primary","color-text-secondary","color-text-action","color-text-disabled","color-border-focus","font-body-s","font-body-m","font-headline-xs","font-headline-s"],
  "intro": "在局部、卡片或页面没有可展示内容时解释原因，并提供恢复操作。",
  "sections": [
    {"id":"levels","title":"层级与选型","paragraphs":["local 仅展示描述；card 与 page 展示插画、可选标题及操作。加载过程使用 Loading 或 Skeleton。"]},
    {"id":"semantics","title":"语义、尺寸与语言","paragraphs":["支持暂无数据、搜索无结果、网络异常、加载失败、无权限、已下架、已失效、即将上线。插画使用已登记的独立原始尺寸；locale 切换中英文。"]},
    {"id":"interaction","title":"操作与职责","paragraphs":["网络异常和加载失败提供重试事件。busy 禁用内建操作；自定义 actions 插槽自行遵循 busy。请求、路由及恢复后的状态由调用方管理。"]}
  ]
}
```

未声明或为空：related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
