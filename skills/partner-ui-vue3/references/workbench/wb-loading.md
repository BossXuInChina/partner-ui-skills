<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 加载 Loading — `WorkbenchLoading`

资产：`wb-loading` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-LOADING-V1/loading?view=preview)

在请求或内容准备期间显示轻量加载指示；组件只表达进行中状态，不管理请求生命周期。

公开入口：`@workbench/ui-vue3` → `WorkbenchLoading`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-LOADING-V1/loading?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "normal",
      "label": "默认"
    },
    {
      "id": "inverse",
      "label": "反色"
    }
  ],
  "controls": [
    {
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "64",
      "options": [
        {
          "value": "64",
          "label": "64px"
        },
        {
          "value": "48",
          "label": "48px"
        },
        {
          "value": "24",
          "label": "24px"
        },
        {
          "value": "20",
          "label": "20px"
        },
        {
          "value": "14",
          "label": "14px"
        },
        {
          "value": "12",
          "label": "12px"
        }
      ]
    },
    {
      "id": "show-label",
      "label": "播报操作文案",
      "description": "为独立Loading加入持续状态文案",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "64",
      "options": [
        {
          "value": "64",
          "label": "64px"
        },
        {
          "value": "48",
          "label": "48px"
        },
        {
          "value": "24",
          "label": "24px"
        },
        {
          "value": "20",
          "label": "20px"
        },
        {
          "value": "14",
          "label": "14px"
        },
        {
          "value": "12",
          "label": "12px"
        }
      ]
    },
    {
      "id": "show-label",
      "label": "播报操作文案",
      "description": "为独立Loading加入持续状态文案",
      "type": "boolean",
      "default": false
    },
    {
      "id": "demoState",
      "label": "明暗背景",
      "type": "select",
      "default": "normal",
      "options": [
        {
          "value": "normal",
          "label": "默认"
        },
        {
          "value": "inverse",
          "label": "反色"
        }
      ],
      "group": "状态与内容",
      "intent": "appearance"
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
    }
  ],
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "sizes": [
      64,
      48,
      24,
      20,
      14,
      12
    ],
    "selectOptions": [
      {
        "value": "cloud",
        "label": "华为云"
      },
      {
        "value": "terminal",
        "label": "华为终端"
      }
    ]
  },
  "dynamicBindings": [
    "selectValue",
    "fetching",
    "search",
    "processing"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "item in sizes"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：已知操作正在处理中，内容结构未知或适合用进度标识时。

**不适用**：已知内容结构优先 Skeleton；不要把 Loading 当作禁用逻辑。；未经验证的公司内部UI框架或生产交付

官方来源 SFC：supported。

### 示例：账户信息加载指示

id：`controlled-example` · portability：`portable` · owner：`wb-loading`

账户信息加载指示业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchLoading } from '@workbench/ui-vue3'
const loadingLabel = '正在读取账户信息'
</script>
<template><section aria-busy="true"><WorkbenchLoading :size="24" :aria-label="loadingLabel" /><span>{{ loadingLabel }}</span></section></template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-LOADING-V1/loading?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String |  |  | 加载图形的可访问名称。 |
| inverse | Boolean | false |  | 在深色背景上使用反色样式。 |
| label | String |  |  | 加载指示旁显示的可见文本。 |
| size | Number | 20 |  | 认可尺寸为64、48、24、20、14、12像素；默认20。 |

### 规则

### 用途与边界

id：`wb-loading-rule-1` · must / confirmed

已知操作正在处理中，内容结构未知或适合用进度标识时。 已知内容结构优先 Skeleton；不要把 Loading 当作禁用逻辑。

**适用条件**：使用加载 Loading

### 交互与状态

id：`wb-loading-rule-2` · must / confirmed

八个固定轨道圆点与旋转前景弧；减少动态效果偏好下停止动画，状态文案仍保留。

**适用条件**：使用加载 Loading

### 公开API

id：`wb-loading-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| size | 64 / 48 / 24 / 20 / 14 / 12，默认20；非法值回退20 |
| inverse | Boolean，默认 false；强调背景内使用反色 |
| label / ariaLabel | 默认为空；label 优先，有文案时输出 status/polite，无文案时装饰性 aria-hidden |

无业务事件。尺寸语境：64独立加载、48对话框、24大输入框、20默认输入框、14选择器/按钮、12紧凑场景。调用方负责 aria-busy、请求状态、阻止重复提交和超时错误。

**适用条件**：使用加载 Loading

### Foundation 引用

`color-brand`、`color-icon-primary`、`color-text-primary`、`color-text-secondary`、`color-fill-subtle-default`、`color-fill-hover`、`color-border`、`color-surface-card-default`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`radius-sm`、`font-body-m`、`font-body-s`

### 选型

用于短时等待和局部忙碌反馈；页面骨架结构尚未到达时使用Skeleton。调用方负责防重复提交、错误和超时。

### 设计结构与排版

size使用组件认可的离散像素尺寸；inverse用于深色背景上的反色显示。label提供可见说明，ariaLabel提供辅助技术名称。

### 交互与键盘

无键盘操作。父级应在忙碌区域设置aria-busy并在请求完成后移除指示。

### 使用边界与职责

组件公开入口为 WorkbenchLoading（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "加载 Loading组件规范",
    "href": "#rules"
  }
]
```
