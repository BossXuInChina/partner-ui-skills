<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 气泡框 Popover — `WorkbenchPopover`

资产：`wb-popover` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=preview)

在触发元素附近展示需要阅读的补充说明，可包含正文链接；不用于操作菜单或确认任务。

公开入口：`@workbench/ui-vue3` → `WorkbenchPopover`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 示例与状态 | 正文 | demoState-default | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 示例与状态 | 含标题 | demoState-with-title | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 示例与状态 | 含链接 | demoState-with-link | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 示例与状态 | 禁用 | demoState-disabled | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 示例与状态 | 关联标签 | demoState-associated-tags | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 上方 · 起始 | placement-top-start | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 上方 · 居中 | placement-top | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 上方 · 末端 | placement-top-end | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 右方 · 起始 | placement-right-start | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 右方 · 居中 | placement-right | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 右方 · 末端 | placement-right-end | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 下方 · 起始 | placement-bottom-start | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 下方 · 居中 | placement-bottom | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 下方 · 末端 | placement-bottom-end | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 左方 · 起始 | placement-left-start | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 左方 · 居中 | placement-left | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 方向配置 | 左方 · 末端 | placement-left-end | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 包含文本链接 | 关闭 | showLink-false | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |
| 包含文本链接 | 开启 | showLink-true | [案例](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "demoState-default",
    "group": "示例与状态",
    "label": "正文",
    "controls": {
      "demoState": "default",
      "placement": "top",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "demoState-with-title",
    "group": "示例与状态",
    "label": "含标题",
    "controls": {
      "demoState": "with-title",
      "placement": "top",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "demoState-with-link",
    "group": "示例与状态",
    "label": "含链接",
    "controls": {
      "demoState": "with-link",
      "placement": "top",
      "defaultOpen": false,
      "showLink": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "demoState-disabled",
    "group": "示例与状态",
    "label": "禁用",
    "controls": {
      "demoState": "disabled",
      "placement": "top",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "demoState-associated-tags",
    "group": "示例与状态",
    "label": "关联标签",
    "controls": {
      "demoState": "associated-tags",
      "placement": "top",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-top-start",
    "group": "方向配置",
    "label": "上方 · 起始",
    "controls": {
      "demoState": "default",
      "placement": "top-start",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-top",
    "group": "方向配置",
    "label": "上方 · 居中",
    "controls": {
      "demoState": "default",
      "placement": "top",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-top-end",
    "group": "方向配置",
    "label": "上方 · 末端",
    "controls": {
      "demoState": "default",
      "placement": "top-end",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-right-start",
    "group": "方向配置",
    "label": "右方 · 起始",
    "controls": {
      "demoState": "default",
      "placement": "right-start",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-right",
    "group": "方向配置",
    "label": "右方 · 居中",
    "controls": {
      "demoState": "default",
      "placement": "right",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-right-end",
    "group": "方向配置",
    "label": "右方 · 末端",
    "controls": {
      "demoState": "default",
      "placement": "right-end",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-bottom-start",
    "group": "方向配置",
    "label": "下方 · 起始",
    "controls": {
      "demoState": "default",
      "placement": "bottom-start",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-bottom",
    "group": "方向配置",
    "label": "下方 · 居中",
    "controls": {
      "demoState": "default",
      "placement": "bottom",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-bottom-end",
    "group": "方向配置",
    "label": "下方 · 末端",
    "controls": {
      "demoState": "default",
      "placement": "bottom-end",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-left-start",
    "group": "方向配置",
    "label": "左方 · 起始",
    "controls": {
      "demoState": "default",
      "placement": "left-start",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-left",
    "group": "方向配置",
    "label": "左方 · 居中",
    "controls": {
      "demoState": "default",
      "placement": "left",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "placement-left-end",
    "group": "方向配置",
    "label": "左方 · 末端",
    "controls": {
      "demoState": "default",
      "placement": "left-end",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "showLink-false",
    "group": "包含文本链接",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "placement": "top",
      "defaultOpen": false,
      "showLink": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  },
  {
    "id": "showLink-true",
    "group": "包含文本链接",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "placement": "top",
      "defaultOpen": false,
      "showLink": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-POPOVER-V1/popover?view=variants"
  }
]
```

### 包内声明

```json
{
  "states": [
    {
      "id": "default",
      "label": "正文"
    },
    {
      "id": "with-title",
      "label": "含标题"
    },
    {
      "id": "with-link",
      "label": "含链接"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "associated-tags",
      "label": "关联标签"
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
      "description": "开启后不需要悬停即可检查气泡位置与尾巴。",
      "default": false
    },
    {
      "id": "showLink",
      "type": "boolean",
      "label": "包含文本链接",
      "description": "开启后在正文中展示可交互的文字链接。",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "label": "示例与状态",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "正文"
        },
        {
          "value": "with-title",
          "label": "含标题"
        },
        {
          "value": "with-link",
          "label": "含链接"
        },
        {
          "value": "disabled",
          "label": "禁用"
        },
        {
          "value": "associated-tags",
          "label": "关联标签"
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
      "description": "开启后不需要悬停即可检查气泡位置与尾巴。",
      "default": false
    },
    {
      "id": "showLink",
      "type": "boolean",
      "label": "包含文本链接",
      "description": "选择内容示例时载入其默认值；之后可即时显示或隐藏当前气泡中的文字链接。",
      "default": false,
      "when": {
        "demoState": [
          "default",
          "with-title",
          "with-link",
          "disabled"
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
      "id": "demoState-default",
      "label": "演示状态 · 正文",
      "controls": {
        "demoState": "default",
        "showLink": false
      }
    },
    {
      "id": "demoState-with-title",
      "label": "演示状态 · 含标题",
      "controls": {
        "demoState": "with-title",
        "showLink": false
      }
    },
    {
      "id": "demoState-with-link",
      "label": "演示状态 · 含链接",
      "controls": {
        "demoState": "with-link",
        "showLink": true
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
      "id": "demoState-associated-tags",
      "label": "演示状态 · 关联标签",
      "controls": {
        "demoState": "associated-tags"
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
      "id": "showLink-true",
      "label": "包含文本链接 · 开启",
      "controls": {
        "showLink": true,
        "demoState": "default"
      }
    },
    {
      "id": "showLink-false",
      "label": "包含文本链接 · 关闭",
      "controls": {
        "showLink": false,
        "demoState": "default"
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：在触发元素附近提供可含链接的补充说明

**不适用**：仅需纯文本悬停提示；需要点击触发的菜单或确认操作；未经验证的内部 UI 框架或生产交付

官方来源 SFC：supported。

### 示例：同步状态说明气泡

id：`controlled-example` · portability：`portable` · owner：`wb-popover`

同步状态说明气泡业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchPopover, WorkbenchButton } from '@workbench/ui-vue3'
const open = ref(false)
</script>
<template>
  <WorkbenchPopover v-model:open="open" title="同步说明" placement="bottom-start" aria-label="同步状态说明">
    <template #trigger="{ aria }"><WorkbenchButton appearance="secondary" v-bind="aria">同步状态</WorkbenchButton></template>
    <p>最近一次同步于今天 09:30 完成。</p>
  </WorkbenchPopover>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-POPOVER-V1/popover?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 说明气泡 |  | 说明面板的可访问名称。 |
| disabled | Boolean |  |  | 禁用并强制关闭气泡。 |
| open | Boolean | {"kind":"undefined"} |  | 可选受控打开状态；不传时内部管理，传入时响应update:open。 |
| placement | String | top | top-start / top / top-end / right-start / right / right-end / bottom-start / bottom / bottom-end / left-start / left / left-end | 首选面板方向及对齐方式；空间不足会翻转或夹紧。 |
| title | String |  |  | 可选说明标题；空字符串表示无标题。 |

### Events

- `update:open`：新的打开状态。；受控或非受控打开状态发生变化时发出；受控调用方应同步更新open。

### Slots

- `trigger`：触发气泡的元素；插槽参数含open与aria。；将aria属性绑定到可操作触发元素以保持关联和状态。

- `default`：说明面板正文，可包含内嵌链接。；提供可读说明内容；复杂操作请改用专门交互组件。

### 规则

### 内容与视觉合同

id：`wb-popover-rule-1` · must / confirmed

正文默认插槽必填，可在其中嵌入正式 WorkbenchLink；title 可选。标题使用 font-headline-s（16/24、500），标题与正文间距8px；无标题时正文使用 color-text-primary，有标题时正文使用 color-text-secondary，正文排版为 font-body-m（14/22、400）。主体使用 color-surface-overlay、radius-md、shadow-lg、16px 内边距，最大宽度452px。

**适用条件**：展示气泡说明

### 方向与尾巴合同

id：`wb-popover-rule-2` · must / confirmed

placement 支持 top/right/bottom/left 的 start/center/end 三档。尾巴沿边缘宽12px、外伸8px，仅尖端使用4px圆角，与主体连接的两侧保持直角；start/end 尾巴中心距对应主体边缘16px，center 居中。指定方向空间不足时自动翻转到对侧，横轴或纵轴不足时夹紧于视口。

**适用条件**：指定气泡方向

### 悬停与键盘合同

id：`wb-popover-rule-3` · must / confirmed

触发器和面板任一悬停或获得焦点时保持打开；离开二者且焦点不在组合内时关闭。open 未传时内部控制，传入时响应 update:open；disabled 强制关闭。Esc 关闭并将焦点返回触发器。

**适用条件**：使用 Popover

### 组件依赖

`wb-link`

### Foundation 引用

`color-surface-overlay`、`color-text-primary`、`color-text-secondary`、`font-headline-s`、`font-body-m`、`radius-md`、`shadow-lg`、`spacing-component-lg`、`spacing-component-sm`

### 选型

内容较长、需要阅读或包含内嵌链接时用Popover；短文本提示用Tooltip；操作选择用菜单或Popconfirm。

### 设计结构与排版

trigger插槽是触发元素，default插槽是说明面板；title可选。面板按指定方向展示，空间不足会翻转并保持在视口内。

### 交互与键盘

触发器或面板悬停、聚焦时保持打开；Esc关闭并把焦点还给触发器。面板内链接可正常聚焦与导航。

### 使用边界与职责

组件公开入口为 WorkbenchPopover（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "气泡框 Popover组件规范",
    "href": "#rules"
  }
]
```
