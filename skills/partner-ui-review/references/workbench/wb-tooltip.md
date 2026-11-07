<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 文字提示 Tooltip — `WorkbenchTooltip`

资产：`wb-tooltip` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=preview)

在控件附近补充简短、非必要的说明文字；不承载交互内容或关键信息。

公开入口：`@workbench/ui-vue3` → `WorkbenchTooltip`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 示例与状态 | 输入框说明 | demoState-input-help | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 示例与状态 | 表格截断文本 | demoState-table-overflow | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 示例与状态 | 未截断文本 | demoState-table-fit | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 示例与状态 | 静态标签 | demoState-tags | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 示例与状态 | 禁用 | demoState-disabled | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 上方 · 起始 | placement-top-start | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 上方 · 居中 | placement-top | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 上方 · 末端 | placement-top-end | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 右方 · 起始 | placement-right-start | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 右方 · 居中 | placement-right | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 右方 · 末端 | placement-right-end | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 下方 · 起始 | placement-bottom-start | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 下方 · 居中 | placement-bottom | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 下方 · 末端 | placement-bottom-end | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 左方 · 起始 | placement-left-start | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 左方 · 居中 | placement-left | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 方向配置 | 左方 · 末端 | placement-left-end | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 显示箭头 | 关闭 | showArrow-false | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 显示箭头 | 开启 | showArrow-true | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 仅文本溢出时展示 | 关闭 | overflowOnly-false | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |
| 仅文本溢出时展示 | 开启 | overflowOnly-true | [案例](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "demoState-input-help",
    "group": "示例与状态",
    "label": "输入框说明",
    "controls": {
      "demoState": "input-help",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "demoState-table-overflow",
    "group": "示例与状态",
    "label": "表格截断文本",
    "controls": {
      "demoState": "table-overflow",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "demoState-table-fit",
    "group": "示例与状态",
    "label": "未截断文本",
    "controls": {
      "demoState": "table-fit",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "demoState-tags",
    "group": "示例与状态",
    "label": "静态标签",
    "controls": {
      "demoState": "tags",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "demoState-disabled",
    "group": "示例与状态",
    "label": "禁用",
    "controls": {
      "demoState": "disabled",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-top-start",
    "group": "方向配置",
    "label": "上方 · 起始",
    "controls": {
      "demoState": "input-help",
      "placement": "top-start",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-top",
    "group": "方向配置",
    "label": "上方 · 居中",
    "controls": {
      "demoState": "input-help",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-top-end",
    "group": "方向配置",
    "label": "上方 · 末端",
    "controls": {
      "demoState": "input-help",
      "placement": "top-end",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-right-start",
    "group": "方向配置",
    "label": "右方 · 起始",
    "controls": {
      "demoState": "input-help",
      "placement": "right-start",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-right",
    "group": "方向配置",
    "label": "右方 · 居中",
    "controls": {
      "demoState": "input-help",
      "placement": "right",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-right-end",
    "group": "方向配置",
    "label": "右方 · 末端",
    "controls": {
      "demoState": "input-help",
      "placement": "right-end",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-bottom-start",
    "group": "方向配置",
    "label": "下方 · 起始",
    "controls": {
      "demoState": "input-help",
      "placement": "bottom-start",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-bottom",
    "group": "方向配置",
    "label": "下方 · 居中",
    "controls": {
      "demoState": "input-help",
      "placement": "bottom",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-bottom-end",
    "group": "方向配置",
    "label": "下方 · 末端",
    "controls": {
      "demoState": "input-help",
      "placement": "bottom-end",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-left-start",
    "group": "方向配置",
    "label": "左方 · 起始",
    "controls": {
      "demoState": "input-help",
      "placement": "left-start",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-left",
    "group": "方向配置",
    "label": "左方 · 居中",
    "controls": {
      "demoState": "input-help",
      "placement": "left",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "placement-left-end",
    "group": "方向配置",
    "label": "左方 · 末端",
    "controls": {
      "demoState": "input-help",
      "placement": "left-end",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "showArrow-false",
    "group": "显示箭头",
    "label": "关闭",
    "controls": {
      "demoState": "input-help",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": false,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "showArrow-true",
    "group": "显示箭头",
    "label": "开启",
    "controls": {
      "demoState": "input-help",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "overflowOnly-false",
    "group": "仅文本溢出时展示",
    "label": "关闭",
    "controls": {
      "demoState": "table-overflow",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  },
  {
    "id": "overflowOnly-true",
    "group": "仅文本溢出时展示",
    "label": "开启",
    "controls": {
      "demoState": "table-overflow",
      "placement": "top",
      "defaultOpen": false,
      "showArrow": true,
      "overflowOnly": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TOOLTIP-V1/tooltip?view=variants"
  }
]
```

### 包内声明

```json
{
  "states": [
    {
      "id": "input-help",
      "label": "输入框说明"
    },
    {
      "id": "table-overflow",
      "label": "表格截断文本"
    },
    {
      "id": "table-fit",
      "label": "未截断文本"
    },
    {
      "id": "tags",
      "label": "静态标签"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [
    {
      "id": "placement",
      "type": "select",
      "label": "方向配置",
      "description": "比较四方向及首、中、尾尾巴位置。",
      "default": "top",
      "options": [
        {
          "value": "top-start",
          "label": "上方 · 起始"
        },
        {
          "value": "top",
          "label": "上方 · 居中"
        },
        {
          "value": "top-end",
          "label": "上方 · 末端"
        },
        {
          "value": "right-start",
          "label": "右方 · 起始"
        },
        {
          "value": "right",
          "label": "右方 · 居中"
        },
        {
          "value": "right-end",
          "label": "右方 · 末端"
        },
        {
          "value": "bottom-start",
          "label": "下方 · 起始"
        },
        {
          "value": "bottom",
          "label": "下方 · 居中"
        },
        {
          "value": "bottom-end",
          "label": "下方 · 末端"
        },
        {
          "value": "left-start",
          "label": "左方 · 起始"
        },
        {
          "value": "left",
          "label": "左方 · 居中"
        },
        {
          "value": "left-end",
          "label": "左方 · 末端"
        }
      ]
    },
    {
      "id": "defaultOpen",
      "type": "boolean",
      "label": "默认展示",
      "description": "开启后无需悬停即可检查方向、尾巴和拼缝。",
      "default": false
    },
    {
      "id": "showArrow",
      "type": "boolean",
      "label": "显示箭头",
      "description": "关闭后主体直接以4px间距定位。",
      "default": true
    },
    {
      "id": "overflowOnly",
      "type": "boolean",
      "label": "仅文本溢出时展示",
      "description": "表格文字实际被截断时才显示完整内容。",
      "default": true
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "label": "示例与状态",
      "type": "select",
      "default": "input-help",
      "options": [
        {
          "value": "input-help",
          "label": "输入框说明"
        },
        {
          "value": "table-overflow",
          "label": "表格截断文本"
        },
        {
          "value": "table-fit",
          "label": "未截断文本"
        },
        {
          "value": "tags",
          "label": "静态标签"
        },
        {
          "value": "disabled",
          "label": "禁用"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "placement",
      "type": "select",
      "label": "方向配置",
      "description": "比较四方向及首、中、尾尾巴位置。",
      "default": "top",
      "options": [
        {
          "value": "top-start",
          "label": "上方 · 起始"
        },
        {
          "value": "top",
          "label": "上方 · 居中"
        },
        {
          "value": "top-end",
          "label": "上方 · 末端"
        },
        {
          "value": "right-start",
          "label": "右方 · 起始"
        },
        {
          "value": "right",
          "label": "右方 · 居中"
        },
        {
          "value": "right-end",
          "label": "右方 · 末端"
        },
        {
          "value": "bottom-start",
          "label": "下方 · 起始"
        },
        {
          "value": "bottom",
          "label": "下方 · 居中"
        },
        {
          "value": "bottom-end",
          "label": "下方 · 末端"
        },
        {
          "value": "left-start",
          "label": "左方 · 起始"
        },
        {
          "value": "left",
          "label": "左方 · 居中"
        },
        {
          "value": "left-end",
          "label": "左方 · 末端"
        }
      ]
    },
    {
      "id": "defaultOpen",
      "type": "boolean",
      "label": "默认展示",
      "description": "开启后无需悬停即可检查方向、尾巴和拼缝。",
      "default": false
    },
    {
      "id": "showArrow",
      "type": "boolean",
      "label": "显示箭头",
      "description": "关闭后主体直接以4px间距定位。",
      "default": true
    },
    {
      "id": "overflowOnly",
      "type": "boolean",
      "label": "仅文本溢出时展示",
      "description": "表格文字实际被截断时才显示完整内容。",
      "default": true,
      "when": {
        "demoState": [
          "table-overflow",
          "table-fit"
        ]
      }
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
      "unit": "px"
    }
  ],
  "presets": [
    {
      "id": "demoState-input-help",
      "label": "演示状态 · 输入框说明",
      "controls": {
        "demoState": "input-help"
      }
    },
    {
      "id": "demoState-table-overflow",
      "label": "演示状态 · 表格截断文本",
      "controls": {
        "demoState": "table-overflow"
      }
    },
    {
      "id": "demoState-table-fit",
      "label": "演示状态 · 未截断文本",
      "controls": {
        "demoState": "table-fit"
      }
    },
    {
      "id": "demoState-tags",
      "label": "演示状态 · 静态标签",
      "controls": {
        "demoState": "tags"
      }
    },
    {
      "id": "demoState-disabled",
      "label": "演示状态 · 禁用",
      "controls": {
        "demoState": "disabled"
      }
    },
    {
      "id": "placement-top-start",
      "label": "方向配置 · 上方 · 起始",
      "controls": {
        "placement": "top-start"
      }
    },
    {
      "id": "placement-top",
      "label": "方向配置 · 上方 · 居中",
      "controls": {
        "placement": "top"
      }
    },
    {
      "id": "placement-top-end",
      "label": "方向配置 · 上方 · 末端",
      "controls": {
        "placement": "top-end"
      }
    },
    {
      "id": "placement-right-start",
      "label": "方向配置 · 右方 · 起始",
      "controls": {
        "placement": "right-start"
      }
    },
    {
      "id": "placement-right",
      "label": "方向配置 · 右方 · 居中",
      "controls": {
        "placement": "right"
      }
    },
    {
      "id": "placement-right-end",
      "label": "方向配置 · 右方 · 末端",
      "controls": {
        "placement": "right-end"
      }
    },
    {
      "id": "placement-bottom-start",
      "label": "方向配置 · 下方 · 起始",
      "controls": {
        "placement": "bottom-start"
      }
    },
    {
      "id": "placement-bottom",
      "label": "方向配置 · 下方 · 居中",
      "controls": {
        "placement": "bottom"
      }
    },
    {
      "id": "placement-bottom-end",
      "label": "方向配置 · 下方 · 末端",
      "controls": {
        "placement": "bottom-end"
      }
    },
    {
      "id": "placement-left-start",
      "label": "方向配置 · 左方 · 起始",
      "controls": {
        "placement": "left-start"
      }
    },
    {
      "id": "placement-left",
      "label": "方向配置 · 左方 · 居中",
      "controls": {
        "placement": "left"
      }
    },
    {
      "id": "placement-left-end",
      "label": "方向配置 · 左方 · 末端",
      "controls": {
        "placement": "left-end"
      }
    },
    {
      "id": "defaultOpen-true",
      "label": "默认展示 · 开启",
      "controls": {
        "defaultOpen": true
      }
    },
    {
      "id": "defaultOpen-false",
      "label": "默认展示 · 关闭",
      "controls": {
        "defaultOpen": false
      }
    },
    {
      "id": "showArrow-true",
      "label": "显示箭头 · 开启",
      "controls": {
        "showArrow": true
      }
    },
    {
      "id": "showArrow-false",
      "label": "显示箭头 · 关闭",
      "controls": {
        "showArrow": false
      }
    },
    {
      "id": "overflowOnly-true",
      "label": "仅文本溢出时展示 · 开启",
      "controls": {
        "overflowOnly": true,
        "demoState": "table-overflow"
      }
    },
    {
      "id": "overflowOnly-false",
      "label": "仅文本溢出时展示 · 关闭",
      "controls": {
        "overflowOnly": false,
        "demoState": "table-overflow"
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：悬停或键盘聚焦时显示短文本、溢出内容全文或静态标签。

**不适用**：需要链接使用Popover；操作确认使用Popconfirm；不要在Tooltip里放可交互元素。；未经验证的公司内部UI框架或生产交付

官方来源 SFC：supported。

### 示例：保存筛选提示

id：`controlled-example` · portability：`portable` · owner：`wb-tooltip`

保存筛选提示业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { WorkbenchTooltip, WorkbenchButton } from '@workbench/ui-vue3'
</script>
<template><WorkbenchTooltip content="保存当前筛选条件" placement="top"><template #trigger="{ aria }"><WorkbenchButton v-bind="aria" appearance="secondary" aria-label="保存筛选">保存</WorkbenchButton></template></WorkbenchTooltip></template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-TOOLTIP-V1/tooltip?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| content | String |  |  | 提示文本；可由content插槽替代。 |
| disabled | Boolean |  |  | 禁用提示显示。 |
| open | Boolean | {"kind":"undefined"} |  | 可选受控显示状态；变化通过update:open通知父级。 |
| overflowOnly | Boolean |  |  | 仅当触发内容发生文本溢出时显示。 |
| placement | String | top | top-start / top / top-end / right-start / right / right-end / bottom-start / bottom / bottom-end / left-start / left / left-end | 提示框优先方向及对齐方式。 |
| showArrow | Boolean | true |  | 是否显示指向触发器的箭头。 |

### Events

- `update:open`：新的显示状态。；受控或非受控显示状态发生变化时发出；受控调用方应同步更新open。

### Slots

- `trigger`：被解释的控件或文字；参数为open与aria对象，其中aria含aria-describedby。；提示不能替代控件可访问名称。

- `content`：自定义提示文案。；保持简短纯说明；不放链接或交互按钮。

### 规则

### 用途与边界

id：`wb-tooltip-rule-1` · must / confirmed

悬停或键盘聚焦时显示短文本、溢出内容全文或静态标签。需要链接使用Popover；操作确认使用Popconfirm；不要在Tooltip里放可交互元素。

**适用条件**：使用文字提示 Tooltip

### 交互与状态

id：`wb-tooltip-rule-2` · must / confirmed

使用Foundation正文排版、浮层背景/阴影、radius-sm（4px圆角）。文字内边距上下4px、左右8px；标签容器四周均4px、标签间距4px。尾巴样式与尺寸继续引用Popover参数。showArrow默认true；关闭后主体与触发对象保持4px间距，不保留尾巴占位。多实例描述ID隔离，弹层不可抢占焦点。

**适用条件**：使用文字提示 Tooltip

### 公开API

id：`wb-tooltip-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| content | 纯文本；使用content插槽时可省略 |
| placement | top（默认）、right、bottom、left及-start/-end，共12方向，非法值回退top |
| open | 可选受控值，未传内部管理；通过update:open更新 |
| disabled | 默认false，强制不显示 |
| overflowOnly | 默认false；true时只在触发内容实际横向/纵向溢出时显示 |
| showArrow | 默认true；false时隐藏箭头并移除箭头占位，主体与触发对象间距4px |

trigger插槽收到 {open,aria}；将aria绑定到单一可聚焦触发器。content插槽直接传入静态WorkbenchTag并覆盖content文本；组件提供四周4px内边距、4px标签间距，标签不得设置interactive或add/remove操作。唯一事件update:open(boolean)。content字符串不解析HTML。
尺寸、内容变化及触发节点替换时重新测量溢出；无溢出即不显示。hover或focus-visible开启，Escape关闭，离开后可重新触发。

**适用条件**：使用文字提示 Tooltip

### 组件依赖

`wb-popover`

### Foundation 引用

`color-surface-overlay`、`color-text-primary`、`font-body-m`、`radius-sm`、`shadow-lg`、`spacing-component-xs`、`spacing-component-sm`

### 选型

用于解释图标按钮或省略文本；说明内容较长、包含链接或必须主动阅读时使用Popover。

### 设计结构与排版

trigger插槽提供被说明对象；content可由字符串属性或content插槽提供。placement选择优先方向，showArrow控制箭头。

### 交互与键盘

悬停或键盘聚焦触发对象时显示；Escape可关闭。overflowOnly仅在触发文本实际溢出时展示提示。

### 使用边界与职责

组件公开入口为 WorkbenchTooltip（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "文字提示 Tooltip组件规范",
    "href": "#rules"
  }
]
```
