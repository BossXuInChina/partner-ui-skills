<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 业务筛选 FilterChips Block — `WorkbenchFilterChips`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-filter-chips`](<../../workbench/wb-filter-chips.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-filter-chips",
  "kind": "block",
  "version": "1.0.0",
  "summary": "列表上方需要十项以上的单选业务筛选，并希望一眼看到全部选项与数量",
  "avoidWhen": ["多选或带复杂条件的筛选（使用查询表单或Select）","两到五项互斥切换（使用ButtonRadioGroup）","未经生产接入验证即宣称可生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchFilterChips"},
  "props": {"modelValue":{"type":"String","required":true},"items":{"type":"Array","required":true},"ariaLabel":{"type":"String","default":"筛选"}},
  "events": ["update:modelValue"]
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-filter-chips-selection",
      "title": "可点击标签单选",
      "text": "以可交互Tag表达单选筛选，选中态使用Tag selected；带数量时显示为“名称(数量)”；选项自动换行，间距8px，不收纳为更多。",
      "strength": "must",
      "status": "confirmed",
      "when": ["业务筛选"],
      "references": []
    }
  ],
  "dependencies": ["wb-tag"],
  "foundationKeys": ["spacing-component-sm"]
}
```

未声明或为空：intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
