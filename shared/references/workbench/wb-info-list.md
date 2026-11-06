<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 信息列表 InfoList Block — `WorkbenchInfoList`

资产：`wb-info-list` · 类型：`block` · 资产合同版本：`1.0.1`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-HOME-BLOCKS-REGISTER-20261104/info-list?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchInfoList`

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

**适用**：公告、资讯等信息流需要标题、状态标签与发布时间三层展示

**不适用**：需要排序、分页或批量操作的数据（使用Table）；带封面图的内容（使用MediaCard）；未经生产接入验证即宣称可生产交付

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| href | String | # |  |  |
| items * | Array |  |  |  |

### 规则

### 标题/标签/时间三层

id：`wb-info-list-structure` · must / confirmed

每项依次为：标题链接（14px body-m，单行省略）、subtle状态标签（small）、时间行（16px时钟图标+14px文字，间距4px，垂直居中）；三层间距8px，项上下8px，项间subtle分隔线。 时间使用用户确认的「首页 时间/time」原始16px图标。

**适用条件**：信息列表

### 组件依赖

`wb-tag`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-link-hover`、`color-border-separator-subtle`、`font-body-m`、`spacing-component-xs`、`spacing-component-sm`
