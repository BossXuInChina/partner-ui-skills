<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 反馈对话框 Feedback Dialog — `WorkbenchFeedbackDialog`

资产：`wb-feedback-dialog` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=preview)

围绕一项操作反馈结果、补充信息并提供一个主要动作及可选次要动作；关闭与异步动作通过受控契约管理。

公开入口：`@workbench/ui-vue3` → `WorkbenchFeedbackDialog`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 组件状态 | 信息 | demoState-info | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 组件状态 | 成功提示 | demoState-success | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 组件状态 | 警告提示 | demoState-warning | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 组件状态 | 危险提示 | demoState-danger | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 组件状态 | 高危提示 | demoState-critical | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 组件状态 | 错误提示 | demoState-error | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 显示图标 | 关闭 | show-icon-false | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 显示图标 | 开启 | show-icon-true | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 显示复选框 | 关闭 | show-checkbox-false | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 显示复选框 | 开启 | show-checkbox-true | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 显示次按钮 | 关闭 | show-secondary-false | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 显示次按钮 | 开启 | show-secondary-true | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 长标题 | 关闭 | long-title-false | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 长标题 | 开启 | long-title-true | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 长内容 | 关闭 | long-content-false | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 长内容 | 开启 | long-content-true | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 拦截关闭 | 关闭 | guard-close-false | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |
| 拦截关闭 | 开启 | guard-close-true | [案例](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "demoState-info",
    "group": "组件状态",
    "label": "信息",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "demoState-success",
    "group": "组件状态",
    "label": "成功提示",
    "controls": {
      "demoState": "success",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "demoState-warning",
    "group": "组件状态",
    "label": "警告提示",
    "controls": {
      "demoState": "warning",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "demoState-danger",
    "group": "组件状态",
    "label": "危险提示",
    "controls": {
      "demoState": "danger",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "demoState-critical",
    "group": "组件状态",
    "label": "高危提示",
    "controls": {
      "demoState": "critical",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "demoState-error",
    "group": "组件状态",
    "label": "错误提示",
    "controls": {
      "demoState": "error",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "show-icon-false",
    "group": "显示图标",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": false,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "show-icon-true",
    "group": "显示图标",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "show-checkbox-false",
    "group": "显示复选框",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": false,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "show-checkbox-true",
    "group": "显示复选框",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "show-secondary-false",
    "group": "显示次按钮",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": false,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "show-secondary-true",
    "group": "显示次按钮",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "long-title-false",
    "group": "长标题",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "long-title-true",
    "group": "长标题",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": true,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "long-content-false",
    "group": "长内容",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "long-content-true",
    "group": "长内容",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": true,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "guard-close-false",
    "group": "拦截关闭",
    "label": "关闭",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": false
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
  },
  {
    "id": "guard-close-true",
    "group": "拦截关闭",
    "label": "开启",
    "controls": {
      "demoState": "info",
      "preview-width": 960,
      "show-icon": true,
      "show-checkbox": true,
      "show-secondary": true,
      "long-title": false,
      "long-content": false,
      "guard-close": true
    },
    "studioPath": "/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=variants"
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
      "label": "成功提示"
    },
    {
      "id": "warning",
      "label": "警告提示"
    },
    {
      "id": "danger",
      "label": "危险提示"
    },
    {
      "id": "critical",
      "label": "高危提示"
    },
    {
      "id": "error",
      "label": "错误提示"
    }
  ],
  "controls": [
    {
      "id": "showGrid",
      "label": "显示栅格",
      "description": "显示统一的24列固定版心辅助层，检查Feedback Dialog复用Modal S的6列宽度",
      "type": "boolean",
      "default": false
    },
    {
      "id": "preview-width",
      "type": "range",
      "target": "viewport-width",
      "label": "预览宽度",
      "description": "改变预览画布宽度以验证Modal S的窄屏安全边距",
      "default": 960,
      "min": 320,
      "max": 1280,
      "step": 1,
      "unit": "px",
      "marks": [
        320,
        400,
        640,
        960,
        1280
      ]
    },
    {
      "id": "show-icon",
      "label": "显示图标",
      "description": "在标题左侧显示16px状态图标",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-checkbox",
      "label": "显示复选框",
      "description": "在action区左侧显示不再提示选项",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-secondary",
      "label": "显示次按钮",
      "description": "在主按钮前显示可选次操作",
      "type": "boolean",
      "default": true
    },
    {
      "id": "long-title",
      "label": "长标题",
      "description": "验证标题截断和图标、关闭按钮间距",
      "type": "boolean",
      "default": false
    },
    {
      "id": "long-content",
      "label": "长内容",
      "description": "验证固定header/action区和内容独立滚动",
      "type": "boolean",
      "default": false
    },
    {
      "id": "guard-close",
      "label": "拦截关闭",
      "description": "验证关闭按钮和action继续经过beforeClose",
      "type": "boolean",
      "default": false
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
          "label": "成功提示"
        },
        {
          "value": "warning",
          "label": "警告提示"
        },
        {
          "value": "danger",
          "label": "危险提示"
        },
        {
          "value": "critical",
          "label": "高危提示"
        },
        {
          "value": "error",
          "label": "错误提示"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "preview-width",
      "type": "range",
      "target": "viewport-width",
      "label": "预览宽度",
      "description": "改变预览画布宽度以验证Modal S的窄屏安全边距",
      "default": 960,
      "min": 320,
      "max": 1280,
      "step": 1,
      "unit": "px",
      "marks": [
        320,
        400,
        640,
        960,
        1280
      ]
    },
    {
      "id": "show-icon",
      "label": "显示图标",
      "description": "在标题左侧显示16px状态图标",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-checkbox",
      "label": "显示复选框",
      "description": "在action区左侧显示不再提示选项",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-secondary",
      "label": "显示次按钮",
      "description": "在主按钮前显示可选次操作",
      "type": "boolean",
      "default": true
    },
    {
      "id": "long-title",
      "label": "长标题",
      "description": "验证标题截断和图标、关闭按钮间距",
      "type": "boolean",
      "default": false
    },
    {
      "id": "long-content",
      "label": "长内容",
      "description": "验证固定header/action区和内容独立滚动",
      "type": "boolean",
      "default": false
    },
    {
      "id": "guard-close",
      "label": "拦截关闭",
      "description": "验证关闭按钮和action继续经过beforeClose",
      "type": "boolean",
      "default": false
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
      "label": "演示状态 · 成功提示",
      "controls": {
        "demoState": "success"
      }
    },
    {
      "id": "demoState-warning",
      "label": "演示状态 · 警告提示",
      "controls": {
        "demoState": "warning"
      }
    },
    {
      "id": "demoState-danger",
      "label": "演示状态 · 危险提示",
      "controls": {
        "demoState": "danger"
      }
    },
    {
      "id": "demoState-critical",
      "label": "演示状态 · 高危提示",
      "controls": {
        "demoState": "critical"
      }
    },
    {
      "id": "demoState-error",
      "label": "演示状态 · 错误提示",
      "controls": {
        "demoState": "error"
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
      "id": "show-checkbox-true",
      "label": "显示复选框 · 开启",
      "controls": {
        "show-checkbox": true
      }
    },
    {
      "id": "show-checkbox-false",
      "label": "显示复选框 · 关闭",
      "controls": {
        "show-checkbox": false
      }
    },
    {
      "id": "show-secondary-true",
      "label": "显示次按钮 · 开启",
      "controls": {
        "show-secondary": true
      }
    },
    {
      "id": "show-secondary-false",
      "label": "显示次按钮 · 关闭",
      "controls": {
        "show-secondary": false
      }
    },
    {
      "id": "long-title-true",
      "label": "长标题 · 开启",
      "controls": {
        "long-title": true
      }
    },
    {
      "id": "long-title-false",
      "label": "长标题 · 关闭",
      "controls": {
        "long-title": false
      }
    },
    {
      "id": "long-content-true",
      "label": "长内容 · 开启",
      "controls": {
        "long-content": true
      }
    },
    {
      "id": "long-content-false",
      "label": "长内容 · 关闭",
      "controls": {
        "long-content": false
      }
    },
    {
      "id": "guard-close-true",
      "label": "拦截关闭 · 开启",
      "controls": {
        "guard-close": true
      }
    },
    {
      "id": "guard-close-false",
      "label": "拦截关闭 · 关闭",
      "controls": {
        "guard-close": false
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：需要用户阅读结果并作出明确决定的反馈对话框。

**不适用**：非阻断反馈优先 Message/Notification；一般表单弹窗使用 Modal。；未经验证的公司内部UI框架或生产交付

官方来源 SFC：supported。

### 示例：导入结果反馈对话框

id：`controlled-example` · portability：`portable` · owner：`wb-feedback-dialog`

导入结果反馈对话框业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchFeedbackDialog, WorkbenchButton } from '@workbench/ui-vue3'
const open = ref(false)
const pending = ref(false)
const primaryAction = { id: 'view', label: '查看报告' }
async function actionHandler(action) { pending.value = true; try { return action.id === 'view' } finally { pending.value = false } }
async function beforeClose() { return true }
</script>
<template>
  <WorkbenchButton appearance="secondary" @click="open = true">查看导入结果</WorkbenchButton>
  <WorkbenchFeedbackDialog v-model="open" type="success" title="导入完成" message="已导入12条联系人。" :primary-action="primaryAction" :pending="pending" :action-handler="actionHandler" :before-close="beforeClose" />
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-FEEDBACK-DIALOG-V1/feedback-dialog?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| actionHandler | Function | {"kind":"undefined"} |  | 异步动作处理函数；返回false会保持打开且不发action-error，抛错或Promise拒绝会发action-error。 |
| beforeClose | Function | {"kind":"undefined"} |  | 关闭守卫；返回false阻止关闭，支持异步检查。 |
| checkboxChecked | Boolean | false |  | 受控复选值。 |
| checkboxLabel | String |  |  | 可选复选项说明。 |
| message * | String |  |  | 补充说明，必填。 |
| modelValue | Boolean | false |  | 对话框打开状态。 |
| pending | Boolean | false |  | 动作处理中的状态，阻止重复触发。 |
| primaryAction * | Object |  |  | 主要动作配置对象，必填。 |
| secondaryAction | Object | null |  | 可选次要动作配置对象或null。 |
| showGrid | Boolean | false |  | 仅显示布局检查网格，不改变组件行为。 |
| showIcon | Boolean | true |  | 是否显示语义图标。 |
| title * | String |  |  | 结果标题，必填。 |
| type | String | info | info / success / warning / danger / critical / error | 反馈语义类型。 |

### Events

- `update:modelValue`：关闭请求的false状态。；Modal的关闭守卫通过并关闭后发出false；打开时由父级更新modelValue。

- `update:checkboxChecked`：新的复选值。；用户切换复选框时发出。

- `action`：动作id。；用户激活动作时通知宿主；此事件监听返回值不作为异步处理结果。

- `close`：关闭原因。；关闭请求通过beforeClose后发出。

- `action-error`：{action,error}对象。；actionHandler抛错或Promise拒绝时发出；返回false不视为错误。

- `close-error`：关闭守卫错误。；beforeClose抛错或拒绝时发出，面板继续保持打开。

### 规则

### 用途与边界

id：`wb-feedback-dialog-rule-1` · must / confirmed

需要用户阅读结果并作出明确决定的反馈对话框。 非阻断反馈优先 Message/Notification；一般表单弹窗使用 Modal。

**适用条件**：使用反馈对话框 Feedback Dialog

### 交互与状态

id：`wb-feedback-dialog-rule-2` · must / confirmed

复用 Modal 的焦点隔离、S尺寸、恢复焦点和关闭守卫；禁用遮罩与Escape关闭。确认操作仅发一次意图，异步期间复选框和两个按钮均禁用。

**适用条件**：使用反馈对话框 Feedback Dialog

### 公开API

id：`wb-feedback-dialog-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| modelValue | 默认false，受控显示 |
| title / message | 必填标题和正文 |
| type / showIcon | info（默认）、success、warning、danger、critical、error；图标默认true |
| checkboxLabel / checkboxChecked | 可选复选文案与受控布尔值 |
| primaryAction / secondaryAction | 主操作必填、次操作可选；{id,label,disabled?} |
| pending | 外部异步工作期间禁用按钮与关闭，默认false |
| actionHandler | 可选(action)=>boolean\|void\|Promise；false或抛错保持打开 |
| beforeClose | 可选(reason)=>boolean\|void\|Promise；false阻止关闭 |

事件：update:modelValue、update:checkboxChecked、action(id)、close(reason)、action-error({action,error})、close-error(error)。
action 是点击意图通知，不等待事件监听器返回值。需要等待业务请求请使用 actionHandler，成功后再执行 beforeClose。处理期间防重复，失败保持上下文并交由调用方展示错误。

**适用条件**：使用反馈对话框 Feedback Dialog

### 组件依赖

`wb-button`、`wb-checkbox`、`wb-modal`

### Foundation 引用

`color-info-primary`、`color-success`、`color-warning`、`color-alert`、`color-error`、`color-surface-page`、`color-surface-overlay`、`color-text-primary`、`color-text-secondary`、`color-text-inverse`、`color-scrim-modal`、`color-icon-primary`、`color-icon-hover`、`color-border-focus`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-lg`、`spacing-layout-action-gap`、`radius-full`、`font-body-m`、`font-body-s`、`font-headline-s`、`icon-size-16`

### 选型

适用于操作完成后的结果反馈、继续处理或关闭选择；一般确认用Popconfirm，编辑任务用Modal。

### 设计结构与排版

type决定反馈语义；title/message说明结果；primaryAction必填，secondaryAction可选。checkboxChecked受控，pending表示动作处理中。

### 交互与键盘

对话框遵循模态焦点管理；pending期间防止重复动作。异步业务用actionHandler，beforeClose控制关闭请求并可异步等待。

### 使用边界与职责

组件公开入口为 WorkbenchFeedbackDialog（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "反馈对话框 Feedback Dialog组件规范",
    "href": "#rules"
  }
]
```
