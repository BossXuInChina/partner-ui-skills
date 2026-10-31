<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 抽屉 Drawer — `WorkbenchDrawer`

资产：`wb-drawer` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=preview)

在页面边缘承载一项可独立完成的任务、扩展信息或配置内容；内容区可滚动，面板关闭受控。

公开入口：`@workbench/ui-vue3` → `WorkbenchDrawer`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 弹出方向 | 右侧 | placement-right | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 弹出方向 | 底部 | placement-bottom | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 长标题 | 关闭 | longTitle-false | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 长标题 | 开启 | longTitle-true | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 模态模式 | 关闭 | modal-false | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 模态模式 | 开启 | modal-true | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 显示底部操作 | 关闭 | showFooter-false | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 显示底部操作 | 开启 | showFooter-true | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 长内容 | 关闭 | longContent-false | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 长内容 | 开启 | longContent-true | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 自定义尺寸示例 | 关闭 | customSize-false | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 自定义尺寸示例 | 开启 | customSize-true | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 拦截关闭 | 关闭 | guardClose-false | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 拦截关闭 | 开启 | guardClose-true | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 自定义Footer插槽 | 关闭 | customFooter-false | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |
| 自定义Footer插槽 | 开启 | customFooter-true | [案例](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "placement-right",
    "group": "弹出方向",
    "label": "右侧",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "placement-bottom",
    "group": "弹出方向",
    "label": "底部",
    "controls": {
      "demoState": "open",
      "placement": "bottom",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "longTitle-false",
    "group": "长标题",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "longTitle-true",
    "group": "长标题",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": true,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "modal-false",
    "group": "模态模式",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": false,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "modal-true",
    "group": "模态模式",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "showFooter-false",
    "group": "显示底部操作",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": false,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "showFooter-true",
    "group": "显示底部操作",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "longContent-false",
    "group": "长内容",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "longContent-true",
    "group": "长内容",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": true,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "customSize-false",
    "group": "自定义尺寸示例",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "customSize-true",
    "group": "自定义尺寸示例",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": true,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "guardClose-false",
    "group": "拦截关闭",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "guardClose-true",
    "group": "拦截关闭",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": true,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "customFooter-false",
    "group": "自定义Footer插槽",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  },
  {
    "id": "customFooter-true",
    "group": "自定义Footer插槽",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "placement": "right",
      "longTitle": false,
      "modal": true,
      "showFooter": true,
      "longContent": false,
      "customSize": false,
      "guardClose": false,
      "customFooter": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-DRAWER-V1/drawer?view=variants"
  }
]
```

### 包内声明

```json
{
  "states": [
    {
      "id": "open",
      "label": "展开"
    },
    {
      "id": "closed",
      "label": "收起"
    }
  ],
  "controls": [
    {
      "id": "placement",
      "label": "弹出方向",
      "type": "select",
      "default": "right",
      "options": [
        {
          "value": "right",
          "label": "右侧"
        },
        {
          "value": "bottom",
          "label": "底部"
        }
      ]
    },
    {
      "id": "longTitle",
      "label": "长标题",
      "description": "验证标题单行截断和关闭按钮间距",
      "type": "boolean",
      "default": false
    },
    {
      "id": "modal",
      "label": "模态模式",
      "description": "显示遮罩并阻止原页面操作",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showFooter",
      "label": "显示底部操作",
      "description": "展示可配置的取消与应用操作",
      "type": "boolean",
      "default": true
    },
    {
      "id": "longContent",
      "label": "长内容",
      "description": "验证内容区独立滚动",
      "type": "boolean",
      "default": false
    },
    {
      "id": "customSize",
      "label": "自定义尺寸示例",
      "description": "使用任务内480px示例值验证panelSize",
      "type": "boolean",
      "default": false
    },
    {
      "id": "guardClose",
      "label": "拦截关闭",
      "description": "验证同步或异步beforeClose返回false",
      "type": "boolean",
      "default": false
    },
    {
      "id": "customFooter",
      "label": "自定义Footer插槽",
      "description": "覆盖默认actions按钮渲染",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "demoState",
      "label": "初始状态",
      "type": "select",
      "default": "closed",
      "options": [
        {
          "value": "open",
          "label": "展开"
        },
        {
          "value": "closed",
          "label": "收起"
        }
      ],
      "description": "实际打开与关闭请使用预览中的按钮；切换此项重新设置初始状态。",
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "placement",
      "label": "弹出方向",
      "type": "select",
      "default": "right",
      "options": [
        {
          "value": "right",
          "label": "右侧"
        },
        {
          "value": "bottom",
          "label": "底部"
        }
      ]
    },
    {
      "id": "longTitle",
      "label": "长标题",
      "description": "验证标题单行截断和关闭按钮间距",
      "type": "boolean",
      "default": false
    },
    {
      "id": "modal",
      "label": "模态模式",
      "description": "显示遮罩并阻止原页面操作",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showFooter",
      "label": "显示底部操作",
      "description": "展示可配置的取消与应用操作",
      "type": "boolean",
      "default": true
    },
    {
      "id": "longContent",
      "label": "长内容",
      "description": "验证内容区独立滚动",
      "type": "boolean",
      "default": false
    },
    {
      "id": "customSize",
      "label": "自定义尺寸示例",
      "description": "使用任务内480px示例值验证panelSize",
      "type": "boolean",
      "default": false
    },
    {
      "id": "guardClose",
      "label": "拦截关闭",
      "description": "验证同步或异步beforeClose返回false",
      "type": "boolean",
      "default": false
    },
    {
      "id": "customFooter",
      "label": "自定义Footer插槽",
      "description": "覆盖默认actions按钮渲染",
      "type": "boolean",
      "default": false,
      "when": {
        "showFooter": [
          true
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
      "id": "demoState-open",
      "label": "演示状态 · 展开",
      "controls": {
        "demoState": "open"
      }
    },
    {
      "id": "demoState-closed",
      "label": "演示状态 · 收起",
      "controls": {
        "demoState": "closed"
      }
    },
    {
      "id": "placement-right",
      "label": "弹出方向 · 右侧",
      "controls": {
        "placement": "right",
        "demoState": "open"
      }
    },
    {
      "id": "placement-bottom",
      "label": "弹出方向 · 底部",
      "controls": {
        "placement": "bottom",
        "demoState": "open"
      }
    },
    {
      "id": "longTitle-true",
      "label": "长标题 · 开启",
      "controls": {
        "longTitle": true,
        "demoState": "open"
      }
    },
    {
      "id": "longTitle-false",
      "label": "长标题 · 关闭",
      "controls": {
        "longTitle": false,
        "demoState": "open"
      }
    },
    {
      "id": "modal-true",
      "label": "模态模式 · 开启",
      "controls": {
        "modal": true,
        "demoState": "open"
      }
    },
    {
      "id": "modal-false",
      "label": "模态模式 · 关闭",
      "controls": {
        "modal": false,
        "demoState": "open"
      }
    },
    {
      "id": "showFooter-true",
      "label": "显示底部操作 · 开启",
      "controls": {
        "showFooter": true,
        "demoState": "open"
      }
    },
    {
      "id": "showFooter-false",
      "label": "显示底部操作 · 关闭",
      "controls": {
        "showFooter": false,
        "demoState": "open"
      }
    },
    {
      "id": "longContent-true",
      "label": "长内容 · 开启",
      "controls": {
        "longContent": true,
        "demoState": "open"
      }
    },
    {
      "id": "longContent-false",
      "label": "长内容 · 关闭",
      "controls": {
        "longContent": false,
        "demoState": "open"
      }
    },
    {
      "id": "customSize-true",
      "label": "自定义尺寸示例 · 开启",
      "controls": {
        "customSize": true,
        "demoState": "open"
      }
    },
    {
      "id": "customSize-false",
      "label": "自定义尺寸示例 · 关闭",
      "controls": {
        "customSize": false,
        "demoState": "open"
      }
    },
    {
      "id": "guardClose-true",
      "label": "拦截关闭 · 开启",
      "controls": {
        "guardClose": true,
        "demoState": "open"
      }
    },
    {
      "id": "guardClose-false",
      "label": "拦截关闭 · 关闭",
      "controls": {
        "guardClose": false,
        "demoState": "open"
      }
    },
    {
      "id": "customFooter-true",
      "label": "自定义Footer插槽 · 开启",
      "controls": {
        "customFooter": true,
        "showFooter": true,
        "demoState": "open"
      }
    },
    {
      "id": "customFooter-false",
      "label": "自定义Footer插槽 · 关闭",
      "controls": {
        "customFooter": false,
        "showFooter": true,
        "demoState": "open"
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：Drawer首版容器

**不适用**：嵌套、拖拽、手势及未经验证的内部框架生产场景

官方来源 SFC：supported。

### 示例：编辑设置抽屉

id：`project-filter-drawer` · portability：`portable` · owner：`wb-drawer`

编辑设置抽屉场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchDrawer, WorkbenchButton } from '@workbench/ui-vue3'
const open = ref(false)
const saved = ref(false)
const actions = [{ id: 'cancel', label: '取消', closeOnClick: true }, { id: 'apply', label: '应用', closeOnClick: true }]
function beforeClose() { return true }
function handleAction(action) { if (action.id === 'apply') saved.value = true }
</script>
<template>
  <WorkbenchButton appearance="secondary" @click="open = true">编辑配置</WorkbenchButton>
  <WorkbenchDrawer v-model="open" title="编辑通知规则" placement="right" :actions="actions" :before-close="beforeClose" @action="handleAction">
    <p>{{ saved ? '配置已应用' : '设置通知的接收范围。' }}</p>
  </WorkbenchDrawer>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-DRAWER-V1/drawer?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| actions | Array | {"kind":"function"} |  | 底部操作配置数组；只有配置为 closeOnClick 的操作会走关闭守卫。 |
| beforeClose | Function | {"kind":"undefined"} |  | 关闭守卫，可同步或异步返回 false 阻止关闭；应用于按钮、遮罩、Escape和关闭型Action。 |
| closeOnEsc | Boolean | true |  | 是否允许 Escape 发起关闭请求。 |
| closeOnMask | Boolean | true |  | 是否允许点击遮罩发起关闭请求。 |
| modal | Boolean | true |  | true 时显示遮罩、隔离背景并管理焦点和滚动；false 时页面其余区域仍可操作。 |
| modelValue | Boolean | false |  | 面板是否打开；父级通过 update:modelValue 接收关闭请求并更新状态。 |
| panelSize | String \| Number | {"kind":"undefined"} |  | 面板目标尺寸，数字按像素处理；有效CSS长度可用于任务内定宽，视口仍限制最大尺寸。 |
| placement | String | right | right / bottom | right 从页面右侧进入；bottom 从底部进入。 |
| title * | String |  |  | 面板标题；必填，超长时组件保留全文提示。 |

### Events

- `update:modelValue`：新的打开状态；关闭操作请求false。；关闭通过守卫后发出，调用方更新v-model。

- `close`：关闭原因。；关闭请求通过守卫并实际关闭时发出。

- `action`：被触发的Action数据。；点击面板配置的底部操作时发出。

### Slots

- `default`：面板正文，可放置表单、说明或业务内容。；正文区由面板管理滚动；输入数据和校验仍由宿主负责。

- `footer`：替代默认actions渲染的底部操作内容；插槽参数提供requestClose(reason)。；提供该插槽后自行管理操作按钮和业务回调；是否关闭由宿主逻辑控制。

### 实例成员

- `requestClose(reason?: string): Promise<boolean>;`

### 规则

### 预览入口 `/preview/WB-DRAWER-V1/drawer`。首版覆盖

id：`wb-drawer-rule-2` · must / confirmed

预览入口 `/preview/WB-DRAWER-V1/drawer`。首版覆盖右侧/底部与模态/非模态四种组合，标题、关闭按钮和内容区始终存在，底部操作区按配置展示。

**适用条件**：Drawer首版

### 右侧最小宽度 296px、底部最小高度 360px 为本轮人工确认的原型参数。面

id：`wb-drawer-rule-4` · must / confirmed

右侧最小宽度 296px、底部最小高度 360px 为本轮人工确认的原型参数。面板尺寸默认按内容自适应，`panelSize` 接受合法 CSS 长度或数字像素值，组件仍以视口作为上限。480px 仅为配置能力的预览示例，不是正式默认值。

**适用条件**：Drawer首版

### 面板统一管理左右 24px、上下 20px 内边距；存在 Action 时底部改

id：`wb-drawer-rule-6` · must / confirmed

面板统一管理左右 24px、上下 20px 内边距；存在 Action 时底部改为 24px。标题到内容区 16px，内容区到 Action 24px，三段之间不使用分割线。标题使用 `font-headline-s`（16px/24px/500），最长占位与 16px 关闭按钮保持 16px 间距；超长标题单行省略并通过 `title` 保留全文。示意表单复用现有 Workbench Input、Select 与 Checkbox，不模拟原生控件外观。

**适用条件**：Drawer首版

### 关闭按钮直接使用 16px 原生图标按钮，不叠加可见外容器，图标右缘与面板保持 

id：`wb-drawer-rule-8` · must / confirmed

关闭按钮直接使用 16px 原生图标按钮，不叠加可见外容器，图标右缘与面板保持 24px。内容区直接复用 `wb-scrollbar`：10px 轨道和 4px 可见滑块贴面板右边缘，通过稳定 gutter 与补偿后的内容内边距保证滚动条出现前后正文宽度不变。

**适用条件**：Drawer首版

### 模态模式使用遮罩、背景 inert、页面滚动锁定与焦点圈定；非模态模式仅允许面板

id：`wb-drawer-rule-10` · must / confirmed

模态模式使用遮罩、背景 inert、页面滚动锁定与焦点圈定；非模态模式仅允许面板自身接收浮层指针事件，面板以外仍由原页面响应。关闭按钮、Escape、遮罩和配置为 `closeOnClick` 的 Action 均经过 `beforeClose`。

**适用条件**：Drawer首版

### 动效时长、缓动和 Preview 层级尚无 Foundation 决策，保留 T

id：`wb-drawer-rule-12` · must / confirmed

动效时长、缓动和 Preview 层级尚无 Foundation 决策，保留 Task-local proposed Candidate；减少动态效果偏好下取消过渡。本版已批准为 prototype-validated / prototype-only，未验证内部框架生产适配。

**适用条件**：Drawer首版

### 正式实现位于[internal reference omitted]

id：`wb-drawer-rule-14` · must / confirmed

正式实现位于[internal reference omitted] `--overlay-layer` 提供层级；正式默认不设置动效，预览动效及层级候选不属于批准规则。模态开启时隔离当前面板与其aria-controls关联浮层以外的背景，关闭或卸载仅释放本实例持有的隔离和滚动锁。关闭状态挂载、非模态模式不修改页面滚动设置。

**适用条件**：Drawer首版

### 组件依赖

`wb-button`、`wb-scrollbar`

### Foundation 引用

`color-surface-overlay`、`color-surface-page`、`color-scrim-modal`、`color-text-primary`、`color-text-secondary`、`color-icon-primary`、`color-icon-hover`、`color-border-focus`、`color-border-separator`、`color-scrollbar-thumb-fill-hover`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`spacing-layout-container-block`、`spacing-layout-container-inline`、`spacing-layout-content-gap`、`spacing-layout-action-gap`、`spacing-dialog-padding-block-end-with-actions`、`radius-none`、`radius-full`、`shadow-l-base`、`shadow-t-m`、`font-body-m`、`font-body-s`、`font-headline-m`、`font-headline-s`、`icon-size-16`、`color-icon-active`

### 选型

编辑任务需要较大连续空间并保留当前页面上下文时使用 Drawer；短确认或小型单步操作使用 Modal。右侧适合纵向表单，底部适合横向工具面板。

### 设计结构与排版

标题、正文和可选操作区属于固定结构；右侧和底部位置共享内容层级。模态模式隔离背景并锁定页面滚动，非模态模式保留页面其余区域操作。

### 交互与键盘

关闭按钮与 Escape 可关闭；模态下焦点留在面板内，关闭后恢复触发点。遮罩关闭与 Action 关闭均先调用 beforeClose。

### 使用边界与职责

组件公开入口为 WorkbenchDrawer（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "抽屉 Drawer组件规范",
    "href": "#rules"
  }
]
```
