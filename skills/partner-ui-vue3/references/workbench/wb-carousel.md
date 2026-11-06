<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 走马灯 Carousel — `WorkbenchCarousel`

资产：`wb-carousel` · 类型：`component` · 资产合同版本：`1.0.1`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-CAROUSEL-V1/carousel?view=preview)

在一个内容区域轮播少量相互相关的内容项，当前索引受控并提供键盘与自动轮播行为。

公开入口：`@workbench/ui-vue3` → `WorkbenchCarousel`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-CAROUSEL-V1/carousel?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "default",
      "label": "默认"
    },
    {
      "id": "single",
      "label": "单项"
    },
    {
      "id": "empty",
      "label": "空内容"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [
    {
      "id": "showGrid",
      "type": "boolean",
      "label": "显示栅格",
      "description": "显示统一栅格辅助层，检查调用方内容在12列与24列中的起始位置和跨度。",
      "default": false
    },
    {
      "id": "preview-width",
      "type": "range",
      "target": "viewport-width",
      "label": "预览断点",
      "description": "改变预览画布宽度，快速核对内容层在窄、12列、24列和超宽容器中的排版。",
      "default": 960,
      "min": 320,
      "max": 2560,
      "step": 1,
      "unit": "px",
      "marks": [
        640,
        768,
        1280,
        1920,
        2560
      ]
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "type": "select",
      "label": "组件状态",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "single",
          "label": "单项"
        },
        {
          "value": "empty",
          "label": "空内容"
        },
        {
          "value": "disabled",
          "label": "禁用"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "showGrid",
      "type": "boolean",
      "label": "显示栅格",
      "description": "显示统一栅格辅助层，检查调用方内容在12列与24列中的起始位置和跨度。",
      "default": false
    },
    {
      "id": "indicatorPlacement",
      "type": "select",
      "label": "指示器位置",
      "default": "overlay",
      "options": [
        {
          "value": "overlay",
          "label": "内容内叠加"
        },
        {
          "value": "below",
          "label": "内容下方"
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
    "brief": [
      {
        "key": "notice-a",
        "label": "服务公告"
      },
      {
        "key": "notice-b",
        "label": "维护通知"
      }
    ],
    "single": [
      {
        "key": "only",
        "label": "单条服务公告"
      }
    ]
  },
  "dynamicBindings": [
    "first",
    "second"
  ],
  "explicitCaseIds": [],
  "loopExpressions": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：在固定页面容器内循环展示多个图片或内容容器

**不适用**：需要同时展示多张内容、触控拖拽、懒加载或生产运行时交付

官方来源 SFC：supported。

### 示例：工作台公告轮播

id：`partner-announcement-carousel` · portability：`portable` · owner：`wb-carousel`

工作台公告轮播场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchCarousel } from '@workbench/ui-vue3'
const index = ref(0)
const items = [{ key: 'a', title: '服务公告', text: '本周服务时间调整。' }, { key: 'b', title: '产品更新', text: '工作台新增筛选能力。' }]
</script>
<template>
  <WorkbenchCarousel v-model="index" :items="items" aria-label="工作台公告">
    <template #slide="{ item }"><article><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article></template>
    <template #empty><p>暂无公告</p></template>
  </WorkbenchCarousel>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-CAROUSEL-V1/carousel?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 走马灯 |  | 轮播区域的可访问名称。 |
| autoplay | Boolean | true |  | 是否自动播放，默认开启；关闭后保留手动切换。 |
| contentMotion | Boolean | false |  | 是否启用内容切换动效；尊重减少动态效果偏好。 |
| disabled | Boolean | false |  | 禁用用户切换操作。 |
| indicatorPlacement | String | overlay | overlay / below | 指示器位置：overlay 位于内容内，below 位于内容下方并留出16px间距。 |
| items | Array | {"kind":"function"} |  | 轮播内容集合；每项须有稳定唯一key。 |
| modelValue | Number | 0 |  | 当前项目的零基索引，由父级通过update:modelValue接收切换。 |
| showNavigation | Boolean | true |  | 是否展示左右翻页按钮；关闭时保留指示器和键盘切换。 |
| transitionStyle | String | fade | fade / slide | 切换方式：fade为渐显，slide为水平滑动。 |

### Events

- `update:modelValue`：新的零基索引。；用户切换项目或自动轮播切换时发出。

- `change`：按参数顺序提供新的零基索引及对应项目数据。；当前项目切换后发出，供宿主同步业务状态。

### Slots

- `slide`：渲染当前项目内容；参数含item、index、selected。；负责单项内容排版，不改变轮播索引控制。

- `empty`：items为空时渲染空内容。；仅用于无项目状态，不承担错误或加载反馈。

### 规则

### 使用边界

id：`wb-carousel-rule-1` · must / confirmed

Carousel v1 每次只展示一个内容项，宽度由父页面容器决定，高度由调用方或 slide 内容提供。

**适用条件**：循环展示多个图片或内容容器

### 交互合同

id：`wb-carousel-rule-2` · must / confirmed

v-model 使用零基索引；存在多个内容项时每5秒循环，悬停、焦点、页面不可见和减少动态效果偏好会暂停。箭头、分页点、ArrowLeft、ArrowRight、Home 和 End 均可切换；首尾循环。分页指示器默认叠加在内容区内部，距底部24px；选择 below 变体时位于内容下方，间隔16px；可见标记间距恒为12px。每个轨道恰有一个16×8px选中胶囊，其余为8×8px圆点，因此内容总宽度在切换时不变：三项始终为56px。圆形翻页器定义为低强调导航图形：默认圆底为白色80%，悬停和按下为白色100%，禁用为白色50%；箭头默认使用 color-icon-secondary，悬停和按下使用 color-icon-primary，禁用使用 color-icon-disabled，并采用16px左右箭头图标。

**适用条件**：循环展示多个图片或内容容器

### 调用方内容栅格

id：`wb-carousel-rule-3` · must / confirmed

Carousel 不定义标题或副标题 API，调用方在 slide 内容层中提供业务文案。小于768px时内容层为单列并在两侧各保留80px翻页器避让带；768px起按16px沟槽与32px安全边距建立12列栅格，文案从第2列开始并占8列；1280px起改为24列并占12列。

**适用条件**：slide 包含主标题、副标题或业务文案

### Foundation 引用

`color-border-focus`、`color-icon-hover`、`color-icon-disabled`、`color-icon-primary`、`color-icon-secondary`、`color-none`、`color-text-inverse`、`font-body-s`、`font-body-m`、`font-headline-l`、`font-headline-xl`、`font-headline-xxl`、`radius-full`、`spacing-component-md`、`spacing-component-sm`、`layout-grid-breakpoint-medium`、`layout-grid-breakpoint-wide`、`layout-grid-breakpoint-fixed`、`layout-grid-columns-medium`、`layout-grid-columns-wide`、`layout-grid-gutter`、`layout-grid-safe-edge`、`layout-grid-max-width`

### 选型

用于精选内容、主视觉或关联卡片集合；内容需要同时比较、快速扫描或精确定位时优先使用列表、网格或分页。

### 设计结构与排版

items为稳定key的项目集合，modelValue是从0开始的当前索引。slide插槽接收item/index/selected，可用empty插槽自定义无数据状态。

### 交互与键盘

提供轮播原生控制键；autoplay默认开启，设为false后只允许手动切换。自动播放在鼠标悬停、键盘焦点、页面不可见或减少动态效果时暂停。

### 使用边界与职责

组件公开入口为 WorkbenchCarousel（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "走马灯 Carousel组件规范",
    "href": "#rules"
  }
]
```
