<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 政策链接 PolicyLinks Block — `WorkbenchPolicyLinks`

资产：`wb-policy-links` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-HOME-BLOCKS-REGISTER-20261104/policy-links?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchPolicyLinks`

## 变体与状态

状态：`unavailable`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

包内未提供对应 Studio 路由。

unsupported：VARIANT_VIEW_MISSING：No current declared variants view/readingPilot is available; source declarations are retained.

### 包内声明

```json
{
  "states": [
    {
      "id": "ready",
      "label": "示例数据"
    }
  ],
  "controls": [],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：页签下方列出与当前分类相关的规则、政策或评估文档链接

**不适用**：正文中的普通文字链接（使用Link）；需要下载、预览等文件操作（使用Upload文件列表）；未经生产接入验证即宣称可生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 规则与政策 |  |  |
| href | String | # |  |  |
| items * | Array |  |  |  |

### 规则

### 文档图标+名称+右箭头

id：`wb-policy-links-structure` · must / confirmed

每项为原生链接：14px文件图标、14px文字、12px右箭头，图文间距4px；多项横向排列并换行，行间距8px、项间距24px；整体为带可访问名称的nav。

**适用条件**：政策链接

### Foundation 引用

`color-text-primary`、`color-link-hover`、`font-body-m`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-xl`
