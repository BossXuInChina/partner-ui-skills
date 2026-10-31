<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 时间轴 Timeline — `WorkbenchTimeline`

资产：`wb-timeline` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TIMELINE-V1/timeline?view=preview)

按先后顺序呈现多个相关事件及其时间、标题和说明，帮助阅读者理解过程与进展。

公开入口：`@workbench/ui-vue3` → `WorkbenchTimeline`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-TIMELINE-V1/timeline?view=variants)

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
      "id": "long",
      "label": "长文本"
    },
    {
      "id": "empty",
      "label": "空列表"
    }
  ],
  "controls": [
    {
      "id": "variant",
      "label": "样式",
      "type": "select",
      "default": "basic",
      "options": [
        {
          "value": "basic",
          "label": "基础样式"
        },
        {
          "value": "status",
          "label": "状态圆点"
        },
        {
          "value": "icon",
          "label": "状态图标"
        },
        {
          "value": "image",
          "label": "带图片事件"
        }
      ]
    },
    {
      "id": "itemCount",
      "label": "事件数量",
      "type": "range",
      "default": 3,
      "min": 2,
      "max": 5,
      "step": 1
    },
    {
      "id": "focused",
      "label": "获焦圆点",
      "type": "boolean",
      "default": false
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "type": "range",
      "target": "viewport-width",
      "default": 1280,
      "min": 320,
      "max": 1920,
      "step": 1,
      "unit": "px"
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "type": "select",
      "label": "内容示例",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "long",
          "label": "长文本"
        },
        {
          "value": "empty",
          "label": "空列表"
        }
      ],
      "group": "状态与内容",
      "intent": "example"
    },
    {
      "id": "variant",
      "label": "样式",
      "type": "select",
      "default": "basic",
      "options": [
        {
          "value": "basic",
          "label": "基础样式"
        },
        {
          "value": "status",
          "label": "状态圆点"
        },
        {
          "value": "icon",
          "label": "状态图标"
        },
        {
          "value": "image",
          "label": "带图片事件"
        }
      ]
    },
    {
      "id": "itemCount",
      "label": "事件数量",
      "type": "range",
      "default": 3,
      "min": 2,
      "max": 6,
      "step": 1
    },
    {
      "id": "focused",
      "label": "获焦圆点",
      "type": "boolean",
      "default": false
    }
  ],
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "layoutItems": [
      {
        "key": "submitted",
        "time": "09:20",
        "title": "提交申请",
        "description": "合作资料已提交。",
        "status": "default"
      },
      {
        "key": "review",
        "time": "10:15",
        "title": "审核中",
        "description": "团队正在核验资料。",
        "status": "process"
      },
      {
        "key": "complete",
        "time": "11:40",
        "title": "审核通过",
        "description": "合作权限已开通。",
        "status": "success"
      }
    ]
  },
  "dynamicBindings": [
    "statusItems",
    "focusedItems"
  ],
  "explicitCaseIds": [
    "timeline-layout",
    "timeline-default-states",
    "timeline-focused-states"
  ],
  "loopExpressions": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：时间轴 Timeline相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：订单进度时间轴

id：`controlled-example` · portability：`portable` · owner：`wb-timeline`

订单进度时间轴业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchTimeline } from '@workbench/ui-vue3'
const items = [{ id: 'created', time: '09:00', title: '订单已创建', description: '等待付款' }, { id: 'paid', time: '09:12', title: '付款已完成', description: '订单进入处理中' }]
</script>
<template><WorkbenchTimeline :items="items" node-type="dot" label="订单进度" /></template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-TIMELINE-V1/timeline?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| items | Array | {"kind":"function"} |  | 按展示顺序排列的事件数据。 |
| label | String | 事件时间轴 |  | 时间轴区域的可访问名称。 |
| nodeType | String | dot | dot / icon | dot使用圆点节点；icon使用事件图标节点。 |

### Slots

- `node`：每项节点内容；参数为item与零基index。；只替换节点呈现，事件顺序仍由items决定。

- `time`：每项时间内容；参数为item与零基index。；保留清晰可读的时间文本。

- `image`：每项配图内容；参数为item与零基index。；由调用方提供图片替代文本和尺寸约束。

- `title`：每项标题内容；参数为item与零基index。；标题层级与完整文案由宿主控制。

- `description`：每项说明内容；参数为item与零基index。；适合展示单项补充信息，不承载复杂操作流程。

### 规则

包内未提供规则；不补写设计结论。

### Foundation 引用

`font-body-m`、`font-body-s`、`radius-full`、`color-text-primary`、`color-text-secondary`、`color-icon-tertiary`、`color-info-primary`、`color-error`、`color-success`、`color-border-separator`

### 选型

当事件顺序本身有意义时使用；若只需列举独立项目，使用列表；若强调必须完成的线性步骤，使用Steps。

### 设计结构与排版

items提供时间、标题、描述及可选图像等数据；nodeType选择点或图标节点。分区插槽可覆盖节点、时间、图片、标题和描述内容。

### 交互与键盘

时间轴为信息展示结构；插槽内若放交互内容，调用方需保证其键盘顺序和名称。

### 使用边界与职责

组件公开入口为 WorkbenchTimeline（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "时间轴 Timeline组件规范",
    "href": "#rules"
  }
]
```
