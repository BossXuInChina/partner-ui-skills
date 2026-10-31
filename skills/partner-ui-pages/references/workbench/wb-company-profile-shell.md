<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 公司资料外壳 Block — `WorkbenchCompanyProfileShell`

资产：`wb-company-profile-shell` · 类型：`block` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-P5-PATTERN-BLOCKS-20260929/p5-company-profile-shell-candidate?view=preview)

公开入口：`@workbench/ui-vue3` → `WorkbenchCompanyProfileShell`

## 变体与状态

状态：`unavailable`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

包内未提供对应 Studio 路由。

unsupported：VARIANT_VIEW_MISSING：No current declared variants view/readingPilot is available; source declarations are retained.

### 包内声明

```json
{
  "states": [
    {
      "id": "registration",
      "label": "注册信息插槽"
    },
    {
      "id": "contacts",
      "label": "联系人插槽"
    },
    {
      "id": "addresses",
      "label": "地址插槽"
    },
    {
      "id": "certificates",
      "label": "一级内容插槽"
    }
  ],
  "controls": [],
  "pilotControls": [],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：同一业务对象下的资料维护页共享身份区和两级栏目导航

**不适用**：跨产品导航、权限裁决或真实路由必须由区块承担；单页表单无需身份区或共享栏目导航

官方来源 SFC：unavailable。OFFICIAL_SFC_MISSING：No official usage SFC mentions this public asset. Scenario/story source was not substituted.

## 使用规范与API

包内未提供对应 Studio 路由。

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| breadcrumbs | Array | {"kind":"function"} |  |  |
| contentClass | String \| Array \| Object \| Function |  |  |  |
| contentLabel | String | 资料内容 |  |  |
| identity * | Object |  |  |  |
| initialPrimary | String |  |  |  |
| initialSecondary | String |  |  |  |
| navigation * | Object |  |  |  |
| primaryItems * | Array |  |  |  |
| primaryLabel | String | 一级栏目 |  |  |
| secondaryItems | Array | {"kind":"function"} |  |  |
| secondaryLabel | String | 二级栏目 |  |  |
| secondaryParent | String |  |  |  |

### Events

- `update:primary`

- `update:secondary`

- `navigation-action`

- `breadcrumb-navigate`

### Slots

- `secondary-content`

- `primary-content`

- `hint`

- `footer`

### 规则

### 外壳与业务内容分离

id：`wb-company-profile-shell-content-ownership` · must / confirmed

Block 提供公司身份、导航、一级／二级页签和内容 Card；页签内容、权限与业务数据由调用方通过插槽和事件提供。

**适用条件**：同一公司下多类资料维护

### 组件依赖

`wb-top-nav`、`wb-breadcrumb`、`wb-tag`、`wb-card`、`wb-tabs`

### Foundation 引用

`color-border-separator`、`color-surface-page`、`color-text-primary`、`color-text-secondary`、`font-body-m`、`font-headline-s`、`spacing-component-lg`、`spacing-component-sm`、`spacing-component-xl`、`spacing-layout-container-block`、`spacing-layout-content-gap`、`spacing-screen-edge-expanded`
