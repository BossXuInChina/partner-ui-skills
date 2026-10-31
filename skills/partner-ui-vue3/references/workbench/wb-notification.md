<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 通知提醒 Notification — `WorkbenchNotification`

资产：`wb-notification` · 类型：`component` · 资产合同版本：`1.1.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=preview)

在页面固定通知区域呈现需要用户留意的异步事件，支持短时自动消失、链接和队列管理。

公开入口：`@workbench/ui-vue3` → `WorkbenchNotification`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 组件状态 | 信息 | demoState-info | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 组件状态 | 成功 | demoState-success | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 组件状态 | 警告 | demoState-warning | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 组件状态 | 危险 | demoState-danger | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 组件状态 | 高危 | demoState-critical | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 组件状态 | 错误 | demoState-error | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 背景 | 白色 | surface-default | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 背景 | 语义浅色 | surface-subtle | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 自动关闭 | 5秒 | duration-5000 | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 自动关闭 | 关闭 | duration-0 | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示标题 | 关闭 | show-title-false | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示标题 | 开启 | show-title-true | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示辅助文本 | 关闭 | show-description-false | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示辅助文本 | 开启 | show-description-true | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示链接 | 关闭 | show-link-false | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示链接 | 开启 | show-link-true | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示图标 | 关闭 | show-icon-false | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示图标 | 开启 | show-icon-true | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示关闭按钮 | 关闭 | show-close-false | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |
| 显示关闭按钮 | 开启 | show-close-true | [案例](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "demoState-info",
    "group": "组件状态",
    "label": "信息",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "demoState-success",
    "group": "组件状态",
    "label": "成功",
    "controls": {
      "demoState": "success",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "demoState-warning",
    "group": "组件状态",
    "label": "警告",
    "controls": {
      "demoState": "warning",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "demoState-danger",
    "group": "组件状态",
    "label": "危险",
    "controls": {
      "demoState": "danger",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "demoState-critical",
    "group": "组件状态",
    "label": "高危",
    "controls": {
      "demoState": "critical",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "demoState-error",
    "group": "组件状态",
    "label": "错误",
    "controls": {
      "demoState": "error",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "surface-default",
    "group": "背景",
    "label": "白色",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "surface-subtle",
    "group": "背景",
    "label": "语义浅色",
    "controls": {
      "demoState": "info",
      "surface": "subtle",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "duration-5000",
    "group": "自动关闭",
    "label": "5秒",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "duration-0",
    "group": "自动关闭",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 0,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-title-false",
    "group": "显示标题",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": false,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-title-true",
    "group": "显示标题",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-description-false",
    "group": "显示辅助文本",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": false,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-description-true",
    "group": "显示辅助文本",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-link-false",
    "group": "显示链接",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": false,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-link-true",
    "group": "显示链接",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-icon-false",
    "group": "显示图标",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": false,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-icon-true",
    "group": "显示图标",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-close-false",
    "group": "显示关闭按钮",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  },
  {
    "id": "show-close-true",
    "group": "显示关闭按钮",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "surface": "default",
      "duration": 5000,
      "show-title": true,
      "show-description": true,
      "show-link": true,
      "show-icon": true,
      "show-close": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-NOTIFICATION-V1/notification?view=variants"
  }
]
```

### 包内声明

```json
{
  "states": [
    {
      "id": "info",
      "label": "信息"
    },
    {
      "id": "success",
      "label": "成功"
    },
    {
      "id": "warning",
      "label": "警告"
    },
    {
      "id": "danger",
      "label": "危险"
    },
    {
      "id": "critical",
      "label": "高危"
    },
    {
      "id": "error",
      "label": "错误"
    }
  ],
  "controls": [
    {
      "id": "surface",
      "label": "背景",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "白色"
        },
        {
          "value": "subtle",
          "label": "语义浅色"
        }
      ]
    },
    {
      "id": "duration",
      "label": "自动关闭",
      "type": "select",
      "default": 5000,
      "options": [
        {
          "value": 5000,
          "label": "5秒"
        },
        {
          "value": 0,
          "label": "关闭"
        }
      ]
    },
    {
      "id": "show-title",
      "label": "显示标题",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-description",
      "label": "显示辅助文本",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-link",
      "label": "显示链接",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-icon",
      "label": "显示图标",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-close",
      "label": "显示关闭按钮",
      "type": "boolean",
      "default": true
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "label": "组件状态",
      "type": "select",
      "default": "info",
      "options": [
        {
          "value": "info",
          "label": "信息"
        },
        {
          "value": "success",
          "label": "成功"
        },
        {
          "value": "warning",
          "label": "警告"
        },
        {
          "value": "danger",
          "label": "危险"
        },
        {
          "value": "critical",
          "label": "高危"
        },
        {
          "value": "error",
          "label": "错误"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "surface",
      "label": "背景",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "白色"
        },
        {
          "value": "subtle",
          "label": "语义浅色"
        }
      ]
    },
    {
      "id": "duration",
      "label": "自动关闭",
      "type": "select",
      "default": 5000,
      "options": [
        {
          "value": 5000,
          "label": "5秒"
        },
        {
          "value": 0,
          "label": "关闭"
        }
      ]
    },
    {
      "id": "show-title",
      "label": "显示标题",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-description",
      "label": "显示辅助文本",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-link",
      "label": "显示链接",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-icon",
      "label": "显示图标",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-close",
      "label": "显示关闭按钮",
      "type": "boolean",
      "default": true
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
      "id": "demoState-info",
      "label": "演示状态 · 信息",
      "controls": {
        "demoState": "info"
      }
    },
    {
      "id": "demoState-success",
      "label": "演示状态 · 成功",
      "controls": {
        "demoState": "success"
      }
    },
    {
      "id": "demoState-warning",
      "label": "演示状态 · 警告",
      "controls": {
        "demoState": "warning"
      }
    },
    {
      "id": "demoState-danger",
      "label": "演示状态 · 危险",
      "controls": {
        "demoState": "danger"
      }
    },
    {
      "id": "demoState-critical",
      "label": "演示状态 · 高危",
      "controls": {
        "demoState": "critical"
      }
    },
    {
      "id": "demoState-error",
      "label": "演示状态 · 错误",
      "controls": {
        "demoState": "error"
      }
    },
    {
      "id": "surface-default",
      "label": "背景 · 白色",
      "controls": {
        "surface": "default"
      }
    },
    {
      "id": "surface-subtle",
      "label": "背景 · 语义浅色",
      "controls": {
        "surface": "subtle"
      }
    },
    {
      "id": "duration-5000",
      "label": "自动关闭 · 5秒",
      "controls": {
        "duration": 5000
      }
    },
    {
      "id": "duration-0",
      "label": "自动关闭 · 关闭",
      "controls": {
        "duration": 0
      }
    },
    {
      "id": "show-title-true",
      "label": "显示标题 · 开启",
      "controls": {
        "show-title": true
      }
    },
    {
      "id": "show-title-false",
      "label": "显示标题 · 关闭",
      "controls": {
        "show-title": false
      }
    },
    {
      "id": "show-description-true",
      "label": "显示辅助文本 · 开启",
      "controls": {
        "show-description": true
      }
    },
    {
      "id": "show-description-false",
      "label": "显示辅助文本 · 关闭",
      "controls": {
        "show-description": false
      }
    },
    {
      "id": "show-link-true",
      "label": "显示链接 · 开启",
      "controls": {
        "show-link": true
      }
    },
    {
      "id": "show-link-false",
      "label": "显示链接 · 关闭",
      "controls": {
        "show-link": false
      }
    },
    {
      "id": "show-icon-true",
      "label": "显示图标 · 开启",
      "controls": {
        "show-icon": true
      }
    },
    {
      "id": "show-icon-false",
      "label": "显示图标 · 关闭",
      "controls": {
        "show-icon": false
      }
    },
    {
      "id": "show-close-true",
      "label": "显示关闭按钮 · 开启",
      "controls": {
        "show-close": true
      }
    },
    {
      "id": "show-close-false",
      "label": "显示关闭按钮 · 关闭",
      "controls": {
        "show-close": false
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：右上角非阻断操作通知，可以包含标题、描述和链接。

**不适用**：阻断确认使用 Feedback Dialog；只需短句操作结果使用 Message。；未经验证的公司内部UI框架或生产交付

官方来源 SFC：supported。

### 示例：同步完成通知

id：`controlled-example` · portability：`portable` · owner：`wb-notification`

同步完成通知业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchNotification } from '@workbench/ui-vue3'
const items = ref([{ id: 'sync-1', message: '同步已完成', type: 'success', linkLabel: '查看结果', linkHref: '/results' }])
function dismiss({ id }) { items.value = items.value.filter(item => item.id !== id) }
</script>
<template><WorkbenchNotification :items="items" :duration="5000" @dismiss="dismiss" /></template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-NOTIFICATION-V1/notification?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| duration | Number | 5000 |  | 可见通知的停留毫秒数；修改后可见项重新计时。 |
| items | Array | {"kind":"function"} |  | 通知数据数组；每项需要唯一稳定id。 |
| surface | String | default | default / subtle | default或subtle通知表面样式。 |

### Events

- `dismiss`：{id,reason}，reason为button、timeout或overflow。；关闭、超时或超出可见数量时发出；父级负责从items移除。

- `link`：{id,href}导航信息。；通知链接激活时发出，原生导航继续执行。

### 规则

### 用途与边界

id：`wb-notification-rule-1` · must / confirmed

右上角非阻断操作通知，可以包含标题、描述和链接。 阻断确认使用 Feedback Dialog；只需短句操作结果使用 Message。

**适用条件**：使用通知提醒 Notification

### 交互与状态

id：`wb-notification-rule-2` · must / confirmed

鼠标和键盘焦点任一位于通知内均暂停，离开后续计剩余时长；无关条目变化不重启计时；删除与卸载清理计时。

**适用条件**：使用通知提醒 Notification

### 公开API

id：`wb-notification-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| items | 默认[]；按新到旧排列，id必填且唯一 |
| 条目 | id、type(info/success/warning/danger/critical/error)、title、description、linkLabel、linkHref；链接文案与真实导航地址成对提供；showIcon/showClose未传视为true |
| surface | default（默认浮层背景）/ subtle（语义浅色） |
| duration | 默认5000毫秒；0常驻，负数或非有限值回退5000 |

事件：`dismiss({id,reason:'button'|'timeout'|'overflow'})`、`link({id,href})`。链接保留浏览器默认导航，事件只用于埋点或旁路监听。最多显示前三条，所有越界条目各发一次 overflow；父级负责移除。id在存续期间代表同一通知，发送新通知请用新id。修改duration对当前可见条目重置完整时长，同时保留悬停/焦点暂停。

**适用条件**：使用通知提醒 Notification

### 真实导航链接

id：`wb-notification-real-navigation` · must / confirmed

链接文案与linkHref成对提供，复用WorkbenchLink和Link状态链；原生导航与link事件同时保留，事件不阻止默认导航。缺地址时不渲染伪链接。

**适用条件**：提示内容包含导航入口

### 组件依赖

`wb-link`

### Foundation 引用

`color-info-primary`、`color-info-secondary-subtle`、`color-success`、`color-success-primary-subtle`、`color-warning`、`color-warning-subtle`、`color-alert`、`color-alert-subtle`、`color-error`、`color-error-subtle`、`color-surface-overlay`、`color-text-primary`、`color-text-secondary`、`color-text-inverse`、`color-icon-primary`、`color-icon-hover`、`color-border-focus`、`radius-lg`、`shadow-lg`、`font-body-m`、`font-body-s`、`font-headline-s`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-lg`、`color-icon-active`

### 选型

用于异步任务完成、后台更新等可并列事件；单次即时反馈用Message，页面内持续说明用Alert。

### 设计结构与排版

items为带稳定id的受控通知集合；最多呈现前三条，溢出通过事件通知父级清理。surface选择默认或浅色表面，duration控制停留时间。

### 交互与键盘

通知内悬停或焦点均暂停计时；链接保留原生导航。卸载和移除条目会清理计时。

### 使用边界与职责

组件公开入口为 WorkbenchNotification（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "通知提醒 Notification组件规范",
    "href": "#rules"
  }
]
```
