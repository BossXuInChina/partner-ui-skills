<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 悬浮按钮 FloatingButton — `WorkbenchFloatingButton`

资产：`wb-floating-button` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=preview)

用于帮助、反馈、评价或返回顶部等全局辅助入口。不要替代主业务提交操作或持久化导航。

公开入口：`@workbench/ui-vue3` → `WorkbenchFloatingButton`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 示例与状态 | 普通单按钮 | demoState-single | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 示例与状态 | AI单按钮 | demoState-single-ai | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 示例与状态 | 按钮组 | demoState-group | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 示例与状态 | 收起 | demoState-collapsed | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 示例与状态 | 含禁用项 | demoState-disabled | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 功能按钮数量 | 2 | button-count-2 | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 功能按钮数量 | 6 | button-count-6 | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 默认显示数量 | 0 | default-visible-count-0 | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 默认显示数量 | 2 | default-visible-count-2 | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 默认显示数量 | 6 | default-visible-count-6 | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 显示返回顶部 | 关闭 | show-back-to-top-false | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |
| 显示返回顶部 | 开启 | show-back-to-top-true | [案例](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "demoState-single",
    "group": "示例与状态",
    "label": "普通单按钮",
    "controls": {
      "demoState": "single",
      "button-count": 6,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "demoState-single-ai",
    "group": "示例与状态",
    "label": "AI单按钮",
    "controls": {
      "demoState": "single-ai",
      "button-count": 6,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "demoState-group",
    "group": "示例与状态",
    "label": "按钮组",
    "controls": {
      "demoState": "group",
      "button-count": 6,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "demoState-collapsed",
    "group": "示例与状态",
    "label": "收起",
    "controls": {
      "demoState": "collapsed",
      "button-count": 6,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "demoState-disabled",
    "group": "示例与状态",
    "label": "含禁用项",
    "controls": {
      "demoState": "disabled",
      "button-count": 6,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "button-count-2",
    "group": "功能按钮数量",
    "label": "2",
    "controls": {
      "demoState": "single",
      "button-count": 2,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "button-count-6",
    "group": "功能按钮数量",
    "label": "6",
    "controls": {
      "demoState": "single",
      "button-count": 6,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "default-visible-count-0",
    "group": "默认显示数量",
    "label": "0",
    "controls": {
      "demoState": "single",
      "button-count": 6,
      "default-visible-count": 0,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "default-visible-count-2",
    "group": "默认显示数量",
    "label": "2",
    "controls": {
      "demoState": "single",
      "button-count": 6,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "default-visible-count-6",
    "group": "默认显示数量",
    "label": "6",
    "controls": {
      "demoState": "single",
      "button-count": 6,
      "default-visible-count": 6,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "show-back-to-top-false",
    "group": "显示返回顶部",
    "label": "关闭",
    "controls": {
      "demoState": "single",
      "button-count": 6,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": false
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  },
  {
    "id": "show-back-to-top-true",
    "group": "显示返回顶部",
    "label": "开启",
    "controls": {
      "demoState": "single",
      "button-count": 6,
      "default-visible-count": 2,
      "expanded": false,
      "show-back-to-top": true
    },
    "studioPath": "/preview/WB-FLOATING-BUTTON-V1/floating-button?view=variants"
  }
]
```

### 包内声明

```json
{
  "states": [
    {
      "id": "single",
      "label": "普通单按钮"
    },
    {
      "id": "single-ai",
      "label": "AI单按钮"
    },
    {
      "id": "group",
      "label": "按钮组"
    },
    {
      "id": "collapsed",
      "label": "收起"
    },
    {
      "id": "disabled",
      "label": "含禁用项"
    }
  ],
  "controls": [
    {
      "id": "button-count",
      "type": "range",
      "label": "功能按钮数量",
      "description": "默认业务入口共6个；按钮组只允许配置2至6个，单个入口使用独立单按钮形态。",
      "default": 6,
      "min": 2,
      "max": 6,
      "step": 1,
      "unit": "项",
      "marks": [
        2,
        5,
        6
      ]
    },
    {
      "id": "default-visible-count",
      "type": "range",
      "label": "默认显示数量",
      "description": "收起状态展示前N个功能项；配置为实际总数时全部显示且不出现展开按钮。",
      "default": 2,
      "min": 0,
      "max": 6,
      "step": 1,
      "unit": "项",
      "marks": [
        0,
        2,
        5,
        6
      ]
    },
    {
      "id": "expanded",
      "type": "boolean",
      "label": "初始展开",
      "description": "开启后首次渲染直接展示全部功能项。",
      "default": false
    },
    {
      "id": "show-back-to-top",
      "type": "boolean",
      "label": "显示返回顶部",
      "description": "独立控制返回顶部按钮，与功能按钮数量无关。",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "type": "select",
      "label": "示例与状态",
      "default": "single",
      "options": [
        {
          "value": "single",
          "label": "普通单按钮"
        },
        {
          "value": "single-ai",
          "label": "AI单按钮"
        },
        {
          "value": "group",
          "label": "按钮组"
        },
        {
          "value": "collapsed",
          "label": "收起"
        },
        {
          "value": "disabled",
          "label": "含禁用项"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "button-count",
      "type": "range",
      "label": "功能按钮数量",
      "description": "默认业务入口共6个；按钮组只允许配置2至6个，单个入口使用独立单按钮形态。",
      "default": 6,
      "min": 2,
      "max": 6,
      "step": 1,
      "unit": "项",
      "marks": [
        2,
        5,
        6
      ]
    },
    {
      "id": "default-visible-count",
      "type": "range",
      "label": "默认显示数量",
      "description": "收起状态展示前N个功能项；配置为实际总数时全部显示且不出现展开按钮。",
      "default": 2,
      "min": 0,
      "max": 6,
      "step": 1,
      "unit": "项",
      "marks": [
        0,
        2,
        5,
        6
      ]
    },
    {
      "id": "expanded",
      "type": "boolean",
      "label": "初始展开",
      "description": "开启后首次渲染直接展示全部功能项。",
      "default": false,
      "when": {
        "demoState": [
          "group",
          "disabled"
        ]
      }
    },
    {
      "id": "show-back-to-top",
      "type": "boolean",
      "label": "显示返回顶部",
      "description": "独立控制返回顶部按钮，与功能按钮数量无关。",
      "default": false
    }
  ],
  "presets": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：全局辅助入口、帮助、评分和返回顶部。

**不适用**：主业务提交放在页面操作区；不要用此组件替代导航或持久化业务状态。；未经验证的公司内部UI框架或生产交付

官方来源 SFC：supported。

### 示例：帮助与评价入口

id：`help-and-rating` · portability：`portable` · owner：`wb-floating-button`

受控展开与评分状态，入口项目、评分回调和结果反馈均由调用方定义。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchFloatingButton } from '@workbench/ui-vue3'
const expanded = ref(true)
const ratings = ref({})
const items = [
  { id: 'help', label: '帮助', icon: 'help', popoverType: 'info', title: '需要帮助？', description: '查看服务指南或联系支持团队。' },
  { id: 'rating', label: '评价', icon: 'rating', popoverType: 'rating', title: '评价本次服务' },
]
const message = ref('')
function onAction(item) { message.value = `已触发：${item.label}` }
function onRatingChange({ score }) { message.value = `当前评分：${score}` }
</script>
<template>
  <WorkbenchFloatingButton variant="group" :items="items" v-model:expanded="expanded" v-model:ratings="ratings" @action="onAction" @rating-change="onRatingChange" />
  <output aria-live="polite">{{ message }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-FLOATING-BUTTON-V1/floating-button?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 悬浮快捷操作 |  | 悬浮操作区域的可访问名称。 |
| defaultVisibleCount | Number | {"kind":"undefined"} |  | group默认显示数量；未传时显示全部。 |
| expanded | Boolean | {"kind":"undefined"} |  | 展开状态；传入时受控并响应update:expanded。 |
| items | Array | {"kind":"function"} |  | 悬浮入口项目数组；每项id唯一，包含label及icon等配置。 |
| ratings | Object | {"kind":"undefined"} |  | id到0–10整数分的受控评分映射。 |
| showBackToTop | Boolean | false |  | 是否显示独立的返回顶部入口。 |
| variant | String | single | single / group | single或group；group少于两项时退回single表现。 |

### Events

- `update:expanded`：boolean。；展开或收起分组时发出；受控调用方应同步状态。

- `action`：被激活的item对象。；启用的非评分入口被激活时发出。

- `back-to-top`：无。；触发返回顶部滚动后发出。

- `rating-change`：{ item, score }，其中score为0–10整数。；评分项改变时发出。

- `update:ratings`：新的id到分值映射对象。；评分变化后发出；受控调用方应保存映射。

### Slots

- `icon`：{ item }；自定义当前项目图标；保留按钮可访问名称。

### 动态 Slots

- `unknown`；表达式：`singleItem.popoverType`。包内未解析为确定的公开 slot 名。

- `unknown`；表达式：`item.popoverType`。包内未解析为确定的公开 slot 名。

### 规则

### 用途与边界

id：`wb-floating-button-rule-1` · must / confirmed

全局辅助入口、帮助、评分和返回顶部。 主业务提交放在页面操作区；不要用此组件替代导航或持久化业务状态。

**适用条件**：使用悬浮按钮 FloatingButton

### 交互与状态

id：`wb-floating-button-rule-2` · must / confirmed

主要点击区域48px，固定右32px/底178px；分组2–6项为已验证范围。返回顶部距离主组24px，滚动最近可滚动祖先。气泡支持hover/focus-visible及Escape；减少动态效果下停止动画和光滑滚动。

**适用条件**：使用悬浮按钮 FloatingButton

### 公开API

id：`wb-floating-button-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| variant | single（默认）/ group；group只有一项时回退圆形single |
| items | 默认[]；每项唯一id、label、disabled?、iconType?、icon?、popoverType?、title?、description? |
| expanded | 未传内部管理，传入后受控update:expanded |
| defaultVisibleCount | 未传显示全部；有限值取整限制0–items.length，非有限值显示全部 |
| showBackToTop | 默认false，独立于按钮数量，group内显示 |
| ratings | 可选{id:score}，受控评分；未传内部管理，分数0–10整数 |
| ariaLabel | 默认悬浮快捷操作 |

事件：update:expanded(boolean)、action(item)、back-to-top()、update:ratings(map)、rating-change({item,score})。
插槽：icon({item})替换图标；以popoverType命名的插槽({item})提供业务弹层，例如greeting/qrcode。内置label、info、rating；业务文案、二维码数据由调用方提供，无内置品牌与下载目标。

评分支持方向键、Home/End和单一Tab入口；ratings可外部初始化、修改、清空。禁用项不打开气泡或触发评分。

**适用条件**：使用悬浮按钮 FloatingButton

### Foundation 引用

`color-surface-page`、`color-surface-overlay`、`color-surface-card-default`、`color-fill-hover`、`color-icon-primary`、`color-icon-disabled`、`color-text-primary`、`color-text-secondary`、`color-border-separator-subtle`、`color-border-focus`、`radius-lg`、`radius-sm`、`radius-full`、`shadow-sm`、`shadow-lg`、`font-body-s`、`font-body-m`、`font-headline-xxl`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-xl`

### 场景与结构

single呈现单个入口，group呈现一组辅助入口。每项使用稳定且唯一的id、清晰label及已登记icon语义；popoverType可选择label、info或rating内容。

- 帮助、政策与客服可使用info说明；rating用于0至10分评价。

- 主按钮位置与页面滚动容器由调用方安排；返回顶部会滚动最近的可滚动祖先。

### 受控状态与键盘

expanded和ratings未传入时由组件内部维护；传入时调用方需响应对应update事件。禁用项目不触发操作或评分。

- 入口使用单一Tab点位；评分内部支持方向键、Home和End。

- 提供icon槽或按popoverType提供具名内容槽时，内容范围由调用方负责。
