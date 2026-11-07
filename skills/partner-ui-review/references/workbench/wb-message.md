<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 全局提示 Message — `WorkbenchMessage`

资产：`wb-message` · 类型：`component` · 资产合同版本：`1.1.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-MESSAGE-V1/message?view=preview)

先用单条代表消息试用全局或对话框内位置，再并列比较七种语义与附件；此页保留完整公开API、业务边界和原专题说明。

公开入口：`@workbench/ui-vue3` → `WorkbenchMessage`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-MESSAGE-V1/message?view=variants)

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
    },
    {
      "id": "loading",
      "label": "加载"
    }
  ],
  "controls": [
    {
      "id": "show-icon",
      "label": "显示图标",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-link",
      "label": "显示文本链接",
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
      "id": "show-checkbox",
      "label": "显示不再提示",
      "type": "boolean",
      "default": false
    },
    {
      "id": "checkbox-checked",
      "label": "默认勾选",
      "type": "boolean",
      "default": false
    },
    {
      "id": "long-text",
      "label": "长文本检查",
      "type": "boolean",
      "default": false
    },
    {
      "id": "auto-close",
      "label": "自动关闭",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "按场景默认"
        },
        {
          "value": 0,
          "label": "关闭"
        },
        {
          "value": 1000,
          "label": "1秒（验证覆盖）"
        }
      ]
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
        },
        {
          "value": "loading",
          "label": "加载"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "show-icon",
      "label": "显示图标",
      "type": "boolean",
      "default": true
    },
    {
      "id": "show-link",
      "label": "显示文本链接",
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
      "id": "show-checkbox",
      "label": "显示不再提示",
      "type": "boolean",
      "default": false
    },
    {
      "id": "checkbox-checked",
      "label": "默认勾选",
      "type": "boolean",
      "default": false,
      "when": {
        "show-checkbox": [
          true
        ]
      }
    },
    {
      "id": "long-text",
      "label": "长文本检查",
      "type": "boolean",
      "default": false
    },
    {
      "id": "auto-close",
      "label": "自动关闭",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "按场景默认"
        },
        {
          "value": 0,
          "label": "关闭"
        },
        {
          "value": 1000,
          "label": "1秒（验证覆盖）"
        }
      ]
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
      "id": "demoState-loading",
      "label": "演示状态 · 加载",
      "controls": {
        "demoState": "loading"
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
      "label": "显示文本链接 · 开启",
      "controls": {
        "show-link": true
      }
    },
    {
      "id": "show-link-false",
      "label": "显示文本链接 · 关闭",
      "controls": {
        "show-link": false
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
      "id": "show-checkbox-true",
      "label": "显示不再提示 · 开启",
      "controls": {
        "show-checkbox": true
      }
    },
    {
      "id": "show-checkbox-false",
      "label": "显示不再提示 · 关闭",
      "controls": {
        "show-checkbox": false
      }
    },
    {
      "id": "checkbox-checked-true",
      "label": "默认勾选 · 开启",
      "controls": {
        "checkbox-checked": true,
        "show-checkbox": true
      }
    },
    {
      "id": "checkbox-checked-false",
      "label": "默认勾选 · 关闭",
      "controls": {
        "checkbox-checked": false,
        "show-checkbox": true
      }
    },
    {
      "id": "long-text-true",
      "label": "长文本检查 · 开启",
      "controls": {
        "long-text": true
      }
    },
    {
      "id": "long-text-false",
      "label": "长文本检查 · 关闭",
      "controls": {
        "long-text": false
      }
    },
    {
      "id": "auto-close-default",
      "label": "自动关闭 · 按场景默认",
      "controls": {
        "auto-close": "default"
      }
    },
    {
      "id": "auto-close-0",
      "label": "自动关闭 · 关闭",
      "controls": {
        "auto-close": 0
      }
    },
    {
      "id": "auto-close-1000",
      "label": "自动关闭 · 1秒（验证覆盖）",
      "controls": {
        "auto-close": 1000
      }
    }
  ]
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "semanticTypes": [
      {
        "id": "info",
        "label": "信息 Info"
      },
      {
        "id": "success",
        "label": "成功 Success"
      },
      {
        "id": "warning",
        "label": "警告 Warning"
      },
      {
        "id": "danger",
        "label": "危险 Danger"
      },
      {
        "id": "critical",
        "label": "高危 Critical"
      },
      {
        "id": "error",
        "label": "错误 Error"
      },
      {
        "id": "loading",
        "label": "加载 Loading"
      }
    ],
    "shortCopy": "消息示例：请查看当前操作结果。",
    "longCopy": "消息示例：请查看当前操作结果。此处补充一段较长说明，用于观察正文在空间不足时如何换行，以及链接和辅助选项如何与正文共同排布。"
  },
  "dynamicBindings": [
    "semanticSamples",
    "copySamples",
    "attachmentSamples"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "sample in semanticSamples",
    "sample in copySamples",
    "sample in attachmentSamples"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：用户操作后的短暂成功、错误或处理中反馈，无标题。

**不适用**：长期内容使用 Alert；右上角多条通知使用 Notification。；未经验证的公司内部UI框架或生产交付

官方来源 SFC：supported。

### 示例：设置保存成功提示

id：`controlled-example` · portability：`portable` · owner：`wb-message`

设置保存成功提示业务场景的完整Vue示例，包含公开组件导入和所需数据。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchMessage } from '@workbench/ui-vue3'
const visible = ref(true)
const checked = ref(false)
</script>
<template>
  <WorkbenchMessage v-model="visible" type="success" message="设置已保存" checkbox-label="不再提示" v-model:checkbox-checked="checked" :auto-close="0" />
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-MESSAGE-V1/message?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| autoClose | Number | {"kind":"undefined"} |  | 自动关闭毫秒数；0表示常驻，loading始终常驻。 |
| checkboxChecked | Boolean | false |  | 复选项当前值，变化由父级更新。 |
| checkboxLabel | String |  |  | 可选受控复选项文案。 |
| linkHref | String |  |  | 尾部链接真实导航地址。 |
| linkLabel | String |  |  | 尾部链接文案，需与linkHref配对。 |
| message * | String |  |  | 必需正文；保持短句。 |
| messageKey | String \| Number |  |  | 提示实例键；内容相同但键变化时重置计时。 |
| modelValue | Boolean | false |  | 单条提示是否显示。 |
| placement | String | global | global / dialog | global传送到全局层；dialog定位于对话框内。 |
| showClose | Boolean | true |  | 是否显示关闭入口。 |
| showIcon | Boolean | true |  | 是否显示类型图标。 |
| type | String | info | info / success / warning / danger / critical / error / loading | 反馈语义类型，如info、success、warning、danger、critical、error或loading。 |

### Events

- `update:modelValue`：新的可见状态。；关闭或超时后发出false。

- `update:checkboxChecked`：复选框新的布尔值。；用户切换“不再提示”选项时发出。

- `close`：关闭原因timeout或button。；超时或用户关闭后发出。

- `link`：包含href的导航信息对象。；用户激活链接时发出；不阻止浏览器原生导航。

### 同族导出：`GlobalMessageStack`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| autoClose | Number | {"kind":"undefined"} |  |  |
| items | Array | {"kind":"function"} |  |  |

### Events

- `dismiss`

- `link`

- `checkbox`

### 规则

### 用途与边界

id：`wb-message-rule-1` · must / confirmed

用户操作后的短暂成功、错误或处理中反馈，无标题。 长期内容使用 Alert；右上角多条通知使用 Notification。

**适用条件**：使用全局提示 Message

### 交互与状态

id：`wb-message-rule-2` · must / confirmed

悬停与焦点独立暂停计时，两者都离开才恢复剩余时间；更换消息内容、键、类型或时长重新计时。链接不关闭，卸载清理定时器。

**适用条件**：使用全局提示 Message

### 公开API

id：`wb-message-rule-3` · must / confirmed

| 参数 | 合同 |
| --- | --- |
| modelValue | Boolean，默认 false；受控显示 |
| type | info（默认）、success、warning、danger、critical、error、loading |
| message / messageKey | 必填正文；可选 String/Number 实例键，相同正文的新键重置完整停留时间 |
| linkLabel / linkHref / showIcon / showClose | 链接文案与真实地址成对提供；图标和关闭按钮默认true |
| checkboxLabel / checkboxChecked | 可选“不再提示”文案；受控选中值，默认false |
| placement | global（默认，Teleport到body）/ dialog（父级相对定位内容内） |
| autoClose | 毫秒；全局默认2000，对话框有关闭2000、无关闭7000；0常驻；loading始终常驻 |

事件：`update:modelValue(false)`、`update:checkboxChecked(boolean)`、`close('timeout'|'button')`、`link({href})`。非法时长回退该布局默认值。

GlobalMessageStack：items 按最新在前，id 必填且唯一；新项进入顶部时短暂保留前一项，使其按 Notification 的 move 动效下移，200ms 后发送 dismiss({id,reason:'replaced'}) 请求退出，稳定态只保留最新一条。条目含 id、message、messageKey、type、linkLabel、linkHref、checkboxLabel、checkboxChecked、showIcon、showClose；autoClose 默认2000，loading常驻。事件 dismiss({id,reason:'timeout'|'button'|'replaced'})、link({id,href})、checkbox({id,checked})。父级必须按id删除或更新受控复选值，不要依赖组件修改数组。

正文默认按内容保持单行，最大宽度452px；空间不足时正文自然换行，链接标签不可拆分，复选框整体换至下一行并与正文起点对齐。图标和关闭按钮始终对齐正文第一行中心。

**适用条件**：使用全局提示 Message

### 真实导航链接

id：`wb-message-real-navigation` · must / confirmed

链接文案与linkHref成对提供，复用WorkbenchLink和Link状态链；原生导航与link事件同时保留，事件不阻止默认导航。缺地址时不渲染伪链接。

**适用条件**：提示内容包含导航入口

### 组件依赖

`wb-link`、`wb-scrollbar`

### Foundation 引用

`color-info-primary`、`color-success`、`color-warning`、`color-alert`、`color-error`、`color-surface-overlay`、`color-surface-page`、`color-text-primary`、`color-text-inverse`、`color-icon-primary`、`color-icon-hover`、`color-border-focus`、`radius-lg`、`radius-full`、`shadow-lg`、`font-body-m`、`font-body-s`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`icon-size-16`、`color-icon-active`

### 选型

用于短时成功、错误或处理中反馈；持续可见的页面说明用Alert，右上角多条通知用Notification。

### 设计结构与排版

modelValue控制单条提示显示；GlobalMessageStack按id维护全局消息队列。链接需同时提供文案和真实地址，复选值由父级受控。

### 交互与键盘

关闭按钮与链接使用原生键盘语义；悬停或焦点暂停计时，离开后继续剩余时间。链接保留浏览器导航。

### 使用边界与职责

组件公开入口为 WorkbenchMessage（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "全局提示 Message组件规范",
    "href": "#rules"
  }
]
```
