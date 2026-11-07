<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 徽标 Badge — `WorkbenchBadge`

资产：`wb-badge` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-BADGE-V1/badge?view=preview)

在头像、图标或按钮附近提示未读数或存在新内容；徽标依附于默认插槽中的主体。

公开入口：`@workbench/ui-vue3` → `WorkbenchBadge`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-BADGE-V1/badge?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "default",
      "label": "默认"
    }
  ],
  "controls": [],
  "pilotControls": [
    {
      "id": "demoState",
      "label": "组件状态",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "type": "range",
      "target": "viewport-width",
      "default": 1280,
      "min": 390,
      "max": 1920,
      "step": 1,
      "unit": "px",
      "group": "布局"
    },
    {
      "id": "variant",
      "label": "徽标形态",
      "type": "select",
      "default": "number",
      "options": [
        {
          "value": "dot",
          "label": "点状提醒"
        },
        {
          "value": "number",
          "label": "数字计数"
        }
      ],
      "group": "状态与内容"
    },
    {
      "id": "value",
      "label": "未读数量",
      "type": "range",
      "default": 3,
      "min": 0,
      "max": 120,
      "step": 1,
      "group": "状态与内容"
    },
    {
      "id": "hidden",
      "label": "隐藏徽标",
      "type": "boolean",
      "default": false,
      "group": "状态与内容"
    },
    {
      "id": "placement",
      "label": "数字锚点",
      "type": "select",
      "default": "corner",
      "options": [
        {
          "value": "corner",
          "label": "角点"
        },
        {
          "value": "inline",
          "label": "内联"
        }
      ],
      "group": "布局"
    }
  ],
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "visibilityExamples": [
      {
        "id": "positive",
        "label": "3 条 · 可见",
        "value": 3
      },
      {
        "id": "zero",
        "label": "0 条 · 隐藏",
        "value": 0
      },
      {
        "id": "negative",
        "label": "−1 · 隐藏",
        "value": -1
      },
      {
        "id": "missing",
        "label": "无值 · 隐藏"
      },
      {
        "id": "hidden",
        "label": "8 条 · 显式隐藏",
        "value": 8,
        "hidden": true
      }
    ]
  },
  "dynamicBindings": [
    "dotVisible",
    "unreadCount",
    "feedback"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "count in [99, 100]",
    "example in visibilityExamples"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：附着在宿主上提示新状态或数量；内联筛选计数

**不适用**：代替操作按钮或承载完整业务状态说明；未经验证的生产目标

官方来源 SFC：supported。

### 示例：未读消息徽标

id：`controlled-example` · portability：`portable` · owner：`wb-badge`

未读消息徽标业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchBadge, WorkbenchButton, WorkbenchIcon } from '@workbench/ui-vue3'
const unreadCount = 3
</script>
<template>
  <WorkbenchBadge variant="number" :value="unreadCount" aria-label="3条未读消息"><WorkbenchButton appearance="icon" aria-label="消息"><template #icon><WorkbenchIcon name="WB-TOP-NAV/action/message_20px" size="20" /></template></WorkbenchButton></WorkbenchBadge>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-BADGE-V1/badge?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String |  |  | 徽标状态的可访问描述。 |
| hidden | Boolean | false |  | 隐藏徽标内容，同时保留默认插槽主体。 |
| placement | String | corner | corner / inline | corner附着主体角点；inline与主体行内排列。 |
| value | Number | {"kind":"undefined"} |  | number徽标的整数计数值。 |
| variant | String | dot | dot / number | dot显示点状提示；number显示计数。Workbench Studio readingPilot.variant 控件选择这两种真实Badge变体。 |

### Slots

- `default`：被徽标附着的头像、图标或按钮等主体。；交互语义由插槽主体提供，Badge不代替主体的可访问名称。

### 规则

### 尺寸与数值

id：`wb-badge-rule-1` · must / confirmed

点状最终外径7px；数字最终高度17px，超过99显示99+，保留完整可访问数值；非正整数或hidden隐藏数字徽标。

**适用条件**：使用徽标 Badge

### 交互边界

id：`wb-badge-rule-2` · must / confirmed

Badge不响应指针操作，点击焦点由宿主负责；非未读数量须通过ariaLabel声明用途。

**适用条件**：使用徽标 Badge

### 定位

id：`wb-badge-rule-3` · must / confirmed

角点数字右边缘固定，额外宽度向左增长；inline位于正常文档流，外部间距由父级负责。

**适用条件**：使用徽标 Badge

### Foundation 引用

`color-error`、`color-text-inverse`、`font-body-s`、`radius-full`

### 选型

有可展示的数字时使用number；只表达存在待处理内容时使用dot。更多上下文应通过相邻文字或可访问名称提供。

### 设计结构与排版

default插槽提供定位主体，placement控制角点或行内位置；hidden隐藏徽标但不移除主体。数字值由调用方保证为整数。

### 交互与键盘

徽标自身不是操作控件；键盘交互由插槽内主体承载。ariaLabel为辅助技术描述徽标状态。高级筛选使用WorkbenchButton文本操作、WorkbenchCheckbox状态、WorkbenchBadge选中计数及WorkbenchIcon披露箭头；按钮只展开/收起筛选，不触发消息清零。

### 高级筛选组合消费映射

WorkbenchCheckbox 的两个 v-model 值经过 selectedCount 计算后映射到 inline WorkbenchBadge.value；取消勾选会更新计数，计数为0时由真实 Badge 规则隐藏徽标。WorkbenchButton aria-expanded 控制筛选面板展开/收起，WorkbenchIcon 通过按钮 #icon 插槽提供注册箭头。该按钮只切换筛选面板，不触发消息清零。

### 使用边界与职责

组件公开入口为 WorkbenchBadge（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "徽标 Badge组件规范",
    "href": "#rules"
  }
]
```
