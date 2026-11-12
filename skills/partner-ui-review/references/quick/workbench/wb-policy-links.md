<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 政策链接 PolicyLinks Block — `WorkbenchPolicyLinks`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-policy-links`](<../../workbench/wb-policy-links.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-policy-links",
  "kind": "block",
  "version": "1.0.0",
  "summary": "页签下方列出与当前分类相关的规则、政策或评估文档链接",
  "avoidWhen": ["正文中的普通文字链接（使用Link）","需要下载、预览等文件操作（使用Upload文件列表）","未经生产接入验证即宣称可生产交付"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchPolicyLinks"},
  "props": {"items":{"type":"Array","required":true},"href":{"type":"String","default":"#"},"ariaLabel":{"type":"String","default":"规则与政策"}}
}
```

未声明或为空：events、eventDetails、slots、slotDetails、slotPatterns、exposed、family、propNotes、eventNotes、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-policy-links-structure",
      "title": "文档图标+名称+右箭头",
      "text": "每项为原生链接：14px文件图标、14px文字、12px右箭头，图文间距4px；多项横向排列并换行，行间距8px、项间距24px；整体为带可访问名称的nav。",
      "strength": "must",
      "status": "confirmed",
      "when": ["政策链接"],
      "references": []
    }
  ],
  "foundationKeys": ["color-text-primary","color-link-hover","font-body-m","spacing-component-xs","spacing-component-sm","spacing-component-xl"]
}
```

未声明或为空：dependencies、intro、sections、related（不代表支持）

## 官方示例

官方来源 SFC 状态：`unavailable`。包内未提供可展开的官方可移植示例；不以场景源码、Studio cases 或手写代码补齐。
