<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 提示条 Alert — `WorkbenchAlert`

资产：`wb-alert` · 类型：`component` · 资产合同版本：`1.1.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-ALERT-V1/alert?view=preview)

在页面上下文中持续呈现需要用户阅读的状态、风险或操作说明，直到用户关闭或宿主更新状态。

公开入口：`@workbench/ui-vue3` → `WorkbenchAlert`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-ALERT-V1/alert?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

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
      "default": "semantic",
      "options": [
        {
          "value": "semantic",
          "label": "语义浅色"
        },
        {
          "value": "neutral",
          "label": "Neutral灰色"
        }
      ]
    },
    {
      "id": "placement",
      "label": "使用场景",
      "type": "select",
      "default": "page",
      "options": [
        {
          "value": "product",
          "label": "产品级"
        },
        {
          "value": "global",
          "label": "全局级"
        },
        {
          "value": "page",
          "label": "页面级"
        },
        {
          "value": "card",
          "label": "卡片内"
        },
        {
          "value": "dialog",
          "label": "弹窗级"
        }
      ]
    },
    {
      "id": "show-icon",
      "label": "显示图标",
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
      "id": "show-checkbox",
      "label": "显示复选框",
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
      "id": "long-content",
      "label": "长文本",
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
      "default": "semantic",
      "options": [
        {
          "value": "semantic",
          "label": "语义浅色"
        },
        {
          "value": "neutral",
          "label": "Neutral灰色"
        }
      ]
    },
    {
      "id": "placement",
      "label": "使用场景",
      "type": "select",
      "default": "page",
      "options": [
        {
          "value": "product",
          "label": "产品级"
        },
        {
          "value": "global",
          "label": "全局级"
        },
        {
          "value": "page",
          "label": "页面级"
        },
        {
          "value": "card",
          "label": "卡片内"
        },
        {
          "value": "dialog",
          "label": "弹窗级"
        }
      ]
    },
    {
      "id": "show-icon",
      "label": "显示图标",
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
      "id": "show-checkbox",
      "label": "显示复选框",
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
      "id": "long-content",
      "label": "长文本",
      "type": "boolean",
      "default": false
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
      "id": "surface-semantic",
      "label": "背景 · 语义浅色",
      "controls": {
        "surface": "semantic"
      }
    },
    {
      "id": "surface-neutral",
      "label": "背景 · Neutral灰色",
      "controls": {
        "surface": "neutral"
      }
    },
    {
      "id": "placement-product",
      "label": "使用场景 · 产品级",
      "controls": {
        "placement": "product"
      }
    },
    {
      "id": "placement-global",
      "label": "使用场景 · 全局级",
      "controls": {
        "placement": "global"
      }
    },
    {
      "id": "placement-page",
      "label": "使用场景 · 页面级",
      "controls": {
        "placement": "page"
      }
    },
    {
      "id": "placement-card",
      "label": "使用场景 · 卡片内",
      "controls": {
        "placement": "card"
      }
    },
    {
      "id": "placement-dialog",
      "label": "使用场景 · 弹窗级",
      "controls": {
        "placement": "dialog"
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
    },
    {
      "id": "long-content-true",
      "label": "长文本 · 开启",
      "controls": {
        "long-content": true
      }
    },
    {
      "id": "long-content-false",
      "label": "长文本 · 关闭",
      "controls": {
        "long-content": false
      }
    }
  ]
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "labels": {
      "info": "系统将在本周末进行例行升级。",
      "success": "新版服务已经发布。",
      "warning": "当前配置即将到期。",
      "danger": "部分业务能力将在近期调整。",
      "critical": "检测到重要安全风险。",
      "error": "部分服务当前不可用。"
    }
  },
  "dynamicBindings": [
    "props",
    "type",
    "placement",
    "surface",
    "dialogVisible",
    "open",
    "checked",
    "message",
    "body",
    "typeOptions",
    "placementOptions",
    "surfaceOptions",
    "selectedSurface",
    "selectedType",
    "selectedPlacement"
  ],
  "explicitCaseIds": [
    "alert-live"
  ],
  "loopExpressions": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：页面、卡片、对话框、产品区的持续提示；内容留在页面流中。

**不适用**：瞬时操作结果使用 Message；需要显式确认使用 Feedback Dialog。；未经验证的公司内部UI框架或生产交付

官方来源 SFC：supported。

### 示例：付款方式到期提示

id：`controlled-example` · portability：`portable` · owner：`wb-alert`

付款方式到期提示业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchAlert } from '@workbench/ui-vue3'
const visible = ref(true)
const checked = ref(false)
</script>
<template><WorkbenchAlert v-model="visible" type="warning" message="付款方式将在本月底失效。" link-label="更新付款方式" link-href="/billing" checkbox-label="我已知晓" v-model:checkbox-checked="checked" /></template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-ALERT-V1/alert?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| checkboxChecked | Boolean | false |  | 受控复选框状态。 |
| checkboxLabel | String |  |  | 可选复选项文案。 |
| linkHref | String |  |  | 真实导航地址。 |
| linkLabel | String |  |  | 链接文案，须与linkHref配对。 |
| message * | String |  |  | 必填提示正文。 |
| modelValue | Boolean | true |  | 是否显示；默认为true，父级通过update:modelValue更新。 |
| placement | String | page | product / global / page / card / dialog | 提示位于product、global、page、card或dialog上下文。 |
| showClose | Boolean | true |  | 是否显示关闭按钮。 |
| showIcon | Boolean | true |  | 是否显示语义图标。 |
| surface | String | {"kind":"undefined"} | semantic / neutral | semantic使用语义表面；neutral使用中性表面。 |
| type | String | info | info / success / warning / danger / critical / error | 提示语义类型。 |

### Events

- `update:modelValue`：新的显示状态。；用户关闭提示时发出false。

- `update:checkboxChecked`：新的复选状态。；用户切换复选框时发出。

- `link`：包含href的导航对象。；激活链接时发出；不会拦截浏览器导航。

- `close`：{reason:'button',checkboxChecked}关闭信息。；用户关闭提示时发出；偏好持久化由宿主实现。

### 规则

### 用途与边界

id：`wb-alert-rule-1` · must / confirmed

页面、卡片、对话框、产品区的持续提示；内容留在页面流中。 瞬时操作结果使用 Message；需要显式确认使用 Feedback Dialog。

**适用条件**：使用提示条 Alert

### 交互与状态

id：`wb-alert-rule-2` · must / confirmed

关闭发出受控更新及关闭事件；复选项使用原生键盘操作，链接不关闭提示。

**适用条件**：使用提示条 Alert

### 公开API

id：`wb-alert-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| modelValue | Boolean，默认 true；受控显示，父级消费 update:modelValue |
| type | info（默认）、success、warning、danger、critical、error |
| message / linkLabel / linkHref | 必填正文；链接文案与真实导航地址必须成对提供 |
| showIcon / showClose | Boolean，默认 true |
| checkboxLabel / checkboxChecked | 可选复选文案；受控选中值，默认 false |
| surface | semantic / neutral；未传时 product、global 为 neutral，其他为 semantic |
| placement | page（默认）、product、global、card、dialog |

事件：`update:modelValue(false)`、`close({reason:'button',checkboxChecked})`、`update:checkboxChecked(boolean)`、`link({href})`。链接保留浏览器默认导航，事件只用于埋点或旁路监听。关闭不负责持久化“不再提示”，业务方保存偏好。

**适用条件**：使用提示条 Alert

### 真实导航链接

id：`wb-alert-real-navigation` · must / confirmed

链接文案与linkHref成对提供，复用WorkbenchLink和Link状态链；原生导航与link事件同时保留，事件不阻止默认导航。缺地址时不渲染伪链接。

**适用条件**：提示内容包含导航入口

### 组件依赖

`wb-checkbox`、`wb-link`

### Foundation 引用

`color-info-primary`、`color-info-secondary-subtle`、`color-success`、`color-success-primary-subtle`、`color-warning`、`color-warning-subtle`、`color-alert`、`color-alert-subtle`、`color-error`、`color-error-subtle`、`color-none-subtle`、`color-text-primary`、`color-text-inverse`、`color-icon-primary`、`color-icon-hover`、`color-border-focus`、`radius-lg`、`icon-size-16`、`font-body-m`、`font-body-s`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`spacing-layout-container-inline`、`spacing-layout-container-block`、`spacing-layout-content-gap`、`spacing-layout-section-gap-large`、`spacing-screen-edge-compact`、`spacing-screen-edge-expanded`、`color-icon-active`

### 选型

用于长期可见的页面、卡片或对话框说明；短时操作反馈用Message，多条异步事件用Notification。

### 设计结构与排版

type表达语义，surface和placement确定承载位置和表面。链接、复选项和关闭入口独立呈现；关闭不保存“不再提示”偏好。

### 交互与键盘

关闭和复选框使用原生操作语义；链接执行浏览器默认导航。关闭会发出受控更新与close事件。

### 使用边界与职责

组件公开入口为 WorkbenchAlert（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "提示条 Alert组件规范",
    "href": "#rules"
  }
]
```
