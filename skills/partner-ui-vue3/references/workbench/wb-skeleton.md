<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 骨架屏 Skeleton — `WorkbenchSkeleton`

资产：`wb-skeleton` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-SKELETON-V1/skeleton?view=preview)

在数据加载期间预留真实内容的结构与空间，降低页面布局跳动；请求状态仍由宿主管理。

公开入口：`@workbench/ui-vue3` → `WorkbenchSkeleton`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-SKELETON-V1/skeleton?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "animated",
      "label": "扫光"
    },
    {
      "id": "static",
      "label": "静态"
    }
  ],
  "controls": [
    {
      "id": "animated",
      "label": "显示扫光",
      "description": "默认以横向白色扫光反馈加载；关闭后保留静态灰色占位。",
      "type": "boolean",
      "default": true
    }
  ],
  "pilotControls": [
    {
      "id": "example",
      "label": "内容结构",
      "type": "select",
      "default": "media-text",
      "options": [
        {
          "value": "title-text",
          "label": "标题 + 文本"
        },
        {
          "value": "text",
          "label": "纯文本"
        },
        {
          "value": "media-text",
          "label": "图片/图标 + 文本"
        },
        {
          "value": "item-text",
          "label": "项目/小图标 + 文本"
        },
        {
          "value": "hero-text",
          "label": "大图 + 文本"
        },
        {
          "value": "detail",
          "label": "通用详情页组合"
        }
      ],
      "group": "内容"
    },
    {
      "id": "animated",
      "label": "显示扫光",
      "description": "默认以横向白色扫光反馈加载；关闭后保留静态灰色占位。",
      "type": "boolean",
      "default": true,
      "when": {
        "demoState": [
          "animated"
        ]
      }
    },
    {
      "id": "demoState",
      "label": "动画模式",
      "type": "select",
      "default": "animated",
      "options": [
        {
          "value": "animated",
          "label": "扫光"
        },
        {
          "value": "static",
          "label": "静态"
        }
      ],
      "group": "状态与内容",
      "intent": "motion"
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
  "presets": [
    {
      "id": "title-text",
      "label": "标题 + 文本",
      "controls": {
        "example": "title-text",
        "demoState": "animated",
        "animated": true
      }
    },
    {
      "id": "text",
      "label": "纯文本",
      "controls": {
        "example": "text",
        "demoState": "animated",
        "animated": true
      }
    },
    {
      "id": "media-text",
      "label": "图片/图标 + 文本",
      "controls": {
        "example": "media-text",
        "demoState": "animated",
        "animated": true
      }
    },
    {
      "id": "item-text",
      "label": "项目/小图标 + 文本",
      "controls": {
        "example": "item-text",
        "demoState": "animated",
        "animated": true
      }
    },
    {
      "id": "hero-text",
      "label": "大图 + 文本",
      "controls": {
        "example": "hero-text",
        "demoState": "animated",
        "animated": true
      }
    },
    {
      "id": "detail",
      "label": "通用详情页组合",
      "controls": {
        "example": "detail",
        "demoState": "animated",
        "animated": true
      }
    },
    {
      "id": "static",
      "label": "静态",
      "controls": {
        "example": "media-text",
        "demoState": "static",
        "animated": false
      }
    }
  ]
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {},
  "dynamicBindings": [
    "samples"
  ],
  "explicitCaseIds": [
    "sample.id"
  ],
  "loopExpressions": [
    "sample in samples"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：加载前已知内容结构，以稳定骨架占位减少跳动。

**不适用**：未知进度用 Loading；静态布局说明不要被播报为正在加载。；未经验证的公司内部UI框架或生产交付

官方来源 SFC：supported。

### 示例：项目详情加载骨架

id：`controlled-example` · portability：`portable` · owner：`wb-skeleton`

项目详情加载骨架业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchSkeleton, WorkbenchSkeletonBlock } from '@workbench/ui-vue3'
const loading = true
</script>
<template>
  <section :aria-busy="loading">
    <WorkbenchSkeleton v-if="loading" variant="media-text" :lines="3" label="正在加载项目详情" />
    <WorkbenchSkeletonBlock v-else :radius="'lg'" label="媒体占位" />
  </section>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-SKELETON-V1/skeleton?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| animated | Boolean | true |  | 是否启用流光动画；尊重减少动态效果偏好。 |
| label | String |  |  | 加载区域的可访问文本。 |
| lines | Number | 3 |  | 正文占位行数，整数1至5。 |
| showTitle | Boolean | true |  | 是否显示标题占位。 |
| variant | String | title-text | title-text / text / media-text / item-text / hero-text | 预设内容结构：title-text、text、media-text、item-text或hero-text。 |

### 同族导出：`WorkbenchSkeletonBlock`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| animated | Boolean | true |  |  |
| label | String |  |  |  |
| radius | String | sm | sm / lg |  |

### 规则

### 用途与边界

id：`wb-skeleton-rule-1` · must / confirmed

加载前已知内容结构，以稳定骨架占位减少跳动。 未知进度用 Loading；静态布局说明不要被播报为正在加载。

**适用条件**：使用骨架屏 Skeleton

### 交互与状态

id：`wb-skeleton-rule-2` · must / confirmed

整体只播报一次；内部块不重复播报；每个变体复用同一块实现。

**适用条件**：使用骨架屏 Skeleton

### 公开API

id：`wb-skeleton-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| variant | title-text（默认）、text、media-text、item-text、hero-text；非法值回退默认 |
| showTitle | Boolean，默认 true；text 变体始终无标题 |
| lines | 默认3；有限数向下取整并限制1–5，NaN/Infinity回退3 |
| animated | Boolean，默认 true；关闭或 reduced-motion 时不动 |
| label | 默认空，装饰性隐藏；提供文案时单一 status/polite |

同时导出 WorkbenchSkeletonBlock：radius=sm/lg（默认sm，非法值回退sm），animated、label 同上。无业务事件。骨架不切换真实内容，父级负责请求成功、空、错误分支及 aria-busy。

**适用条件**：使用骨架屏 Skeleton

### Foundation 引用

`color-fill-default`、`color-fill-subtle-default`、`color-surface-page`、`color-surface-card-default`、`color-text-primary`、`color-text-secondary`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`spacing-component-xl`、`radius-sm`、`radius-lg`、`font-body-m`、`font-headline-s`、`font-headline-xl`

### 选型

内容结构已知且加载会持续一段时间时使用；仅短暂等待用Loading。无数据、失败和成功状态由父级分别切换。

### 设计结构与排版

variant选择标题、文本、媒体或条目结构；showTitle和lines控制骨架内容。WorkbenchSkeletonBlock可独立生成简单圆角占位块。

### 交互与键盘

无键盘操作。容器应标注aria-busy；骨架不替代真实内容状态，也不承载交互。

### 使用边界与职责

组件公开入口为 WorkbenchSkeleton（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "骨架屏 Skeleton组件规范",
    "href": "#rules"
  }
]
```
