<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 认证详情 CertificationDetails Block — `WorkbenchCertificationDetails`

资产：`wb-certification-details` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-HOME-BLOCKS-REGISTER-20261104/certification-details?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchCertificationDetails`

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

**适用**：身份达标等状态卡片底部展示认证类型、归属与关键日期的只读信息

**不适用**：可编辑字段（使用Form）；超过五项或需要分组的详情（使用描述列表或表格）；未经生产接入验证即宣称可生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 认证详情 |  |  |
| details * | Object |  |  |  |

### 规则

### 只读认证事实

id：`wb-certification-details-structure` · must / confirmed

白色内卡，16px内边距、6px圆角，12px字号；首行为认证类型（alert状态subtle标签）与归属代表处/系统部，第二行为认证开始、结束、能力复核三项日期；宽度不足时自动换行，长文本断行。

**适用条件**：认证详情

### 组件依赖

`wb-tag`

### Foundation 引用

`color-surface-card-default`、`color-text-primary`、`color-text-secondary`、`font-body-s`、`radius-md`、`spacing-component-xs`、`spacing-component-md`、`spacing-component-lg`、`spacing-component-xl`
