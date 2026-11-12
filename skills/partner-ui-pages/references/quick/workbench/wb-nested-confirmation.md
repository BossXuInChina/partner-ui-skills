<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 嵌套确认 Pattern — `WorkbenchNestedConfirmation`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-nested-confirmation`](<../../workbench/wb-nested-confirmation.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-nested-confirmation",
  "kind": "pattern",
  "version": "1.0.0",
  "summary": "父级确认流程需要在子对话框收集补充信息，且子层结果先回填父层草稿",
  "avoidWhen": ["普通单层确认或表单","子层操作必须独立持久化或页面没有父级草稿"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchNestedConfirmation"},
  "props": {
    "parentOpen": {"type":"Boolean","required":true},
    "childOpen": {"type":"Boolean","required":true},
    "parentTitle": {"type":"String","required":true},
    "childTitle": {"type":"String","required":true},
    "parentSize": {"type":"String","default":"l"},
    "childSize": {"type":"String","default":"m"},
    "parentBusy": {"type":"Boolean","default":false},
    "childBusy": {"type":"Boolean","default":false}
  },
  "events": ["request-close-parent","request-close-child"],
  "slots": ["parent","parent-footer","child","child-footer"]
}
```

未声明或为空：eventDetails、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-nested-confirmation-top-layer",
      "title": "顶层对话框接收关闭意图",
      "text": "子对话框打开时，父对话框忽略 Escape 和遮罩关闭；顶层关闭后的焦点恢复由底层 WorkbenchModal 负责。",
      "strength": "must",
      "status": "confirmed",
      "when": ["父级对话框打开子级对话框"],
      "references": []
    },
    {
      "id": "wb-nested-confirmation-staged-result",
      "title": "子层结果由宿主暂存",
      "text": "Pattern 只发出子层关闭意图；宿主负责清除取消的子草稿或把确认结果暂存到父层草稿，最终提交仍由父层确认。",
      "strength": "must",
      "status": "confirmed",
      "when": ["子对话框收集父流程所需信息"],
      "references": []
    }
  ],
  "dependencies": ["wb-modal"],
  "foundationKeys": ["color-surface-page","spacing-layout-content-gap"]
}
```

未声明或为空：intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
