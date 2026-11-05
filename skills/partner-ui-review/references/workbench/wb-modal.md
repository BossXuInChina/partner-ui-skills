<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 对话框 Modal — `WorkbenchModal`

资产：`wb-modal` · 类型：`component` · 资产合同版本：`1.0.1`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-MODAL-V1/modal?view=preview)

在当前页面上方集中处理需要明确确认的短流程；通过尺寸和插槽承载内容，打开时管理模态焦点与背景。

公开入口：`@workbench/ui-vue3` → `WorkbenchModal`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 尺寸 | S · 6栅格 | size-s | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 尺寸 | M · 8栅格 | size-m | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 尺寸 | L · 12栅格 | size-l | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 尺寸 | XL · 16栅格 | size-xl | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 长标题 | 关闭 | longTitle-false | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 长标题 | 开启 | longTitle-true | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 只读模式 | 关闭 | readonly-false | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 只读模式 | 开启 | readonly-true | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 显示底部操作 | 关闭 | showFooter-false | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 显示底部操作 | 开启 | showFooter-true | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 长内容 | 关闭 | longContent-false | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 长内容 | 开启 | longContent-true | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 拦截关闭 | 关闭 | guardClose-false | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 拦截关闭 | 开启 | guardClose-true | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 自定义Footer插槽 | 关闭 | customFooter-false | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |
| 自定义Footer插槽 | 开启 | customFooter-true | [案例](http://localhost:4173/preview/WB-MODAL-V1/modal?view=variants) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "size-s",
    "group": "尺寸",
    "label": "S · 6栅格",
    "controls": {
      "demoState": "open",
      "size": "s",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "size-m",
    "group": "尺寸",
    "label": "M · 8栅格",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "size-l",
    "group": "尺寸",
    "label": "L · 12栅格",
    "controls": {
      "demoState": "open",
      "size": "l",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "size-xl",
    "group": "尺寸",
    "label": "XL · 16栅格",
    "controls": {
      "demoState": "open",
      "size": "xl",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "longTitle-false",
    "group": "长标题",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "longTitle-true",
    "group": "长标题",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": true,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "readonly-false",
    "group": "只读模式",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "readonly-true",
    "group": "只读模式",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": true,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "showFooter-false",
    "group": "显示底部操作",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": false,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "showFooter-true",
    "group": "显示底部操作",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "longContent-false",
    "group": "长内容",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "longContent-true",
    "group": "长内容",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": true,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "guardClose-false",
    "group": "拦截关闭",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "guardClose-true",
    "group": "拦截关闭",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": true,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "customFooter-false",
    "group": "自定义Footer插槽",
    "label": "关闭",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
  },
  {
    "id": "customFooter-true",
    "group": "自定义Footer插槽",
    "label": "开启",
    "controls": {
      "demoState": "open",
      "size": "m",
      "longTitle": false,
      "readonly": false,
      "showFooter": true,
      "longContent": false,
      "guardClose": false,
      "customFooter": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-MODAL-V1/modal?view=variants"
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
      "id": "showGrid",
      "label": "显示栅格",
      "description": "显示统一的24列固定版心辅助层，检查Modal的6／8／12／16列宽度",
      "type": "boolean",
      "default": false
    },
    {
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "m",
      "options": [
        {
          "value": "s",
          "label": "S · 6栅格"
        },
        {
          "value": "m",
          "label": "M · 8栅格"
        },
        {
          "value": "l",
          "label": "L · 12栅格"
        },
        {
          "value": "xl",
          "label": "XL · 16栅格"
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
      "id": "readonly",
      "label": "只读模式",
      "description": "以标签和值展示内容，不展示底部操作区",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showFooter",
      "label": "显示底部操作",
      "description": "展示可配置的取消与确认操作",
      "type": "boolean",
      "default": true
    },
    {
      "id": "longContent",
      "label": "长内容",
      "description": "验证最大高度与内容区独立滚动",
      "type": "boolean",
      "default": false
    },
    {
      "id": "guardClose",
      "label": "拦截关闭",
      "description": "验证beforeClose返回false",
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
      "id": "size",
      "label": "尺寸",
      "type": "select",
      "default": "m",
      "options": [
        {
          "value": "s",
          "label": "S · 6栅格"
        },
        {
          "value": "m",
          "label": "M · 8栅格"
        },
        {
          "value": "l",
          "label": "L · 12栅格"
        },
        {
          "value": "xl",
          "label": "XL · 16栅格"
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
      "id": "readonly",
      "label": "只读模式",
      "description": "以标签和值展示内容，不展示底部操作区",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showFooter",
      "label": "显示底部操作",
      "description": "展示可配置的取消与确认操作",
      "type": "boolean",
      "default": true,
      "when": {
        "readonly": [
          false
        ]
      }
    },
    {
      "id": "longContent",
      "label": "长内容",
      "description": "验证最大高度与内容区独立滚动",
      "type": "boolean",
      "default": false
    },
    {
      "id": "guardClose",
      "label": "拦截关闭",
      "description": "验证beforeClose返回false",
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
        ],
        "readonly": [
          false
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
      "id": "size-s",
      "label": "尺寸 · S · 6栅格",
      "controls": {
        "size": "s",
        "demoState": "open"
      }
    },
    {
      "id": "size-m",
      "label": "尺寸 · M · 8栅格",
      "controls": {
        "size": "m",
        "demoState": "open"
      }
    },
    {
      "id": "size-l",
      "label": "尺寸 · L · 12栅格",
      "controls": {
        "size": "l",
        "demoState": "open"
      }
    },
    {
      "id": "size-xl",
      "label": "尺寸 · XL · 16栅格",
      "controls": {
        "size": "xl",
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
      "id": "readonly-true",
      "label": "只读模式 · 开启",
      "controls": {
        "readonly": true,
        "demoState": "open"
      }
    },
    {
      "id": "readonly-false",
      "label": "只读模式 · 关闭",
      "controls": {
        "readonly": false,
        "demoState": "open"
      }
    },
    {
      "id": "showFooter-true",
      "label": "显示底部操作 · 开启",
      "controls": {
        "showFooter": true,
        "readonly": false,
        "demoState": "open"
      }
    },
    {
      "id": "showFooter-false",
      "label": "显示底部操作 · 关闭",
      "controls": {
        "showFooter": false,
        "readonly": false,
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
        "readonly": false,
        "demoState": "open"
      }
    },
    {
      "id": "customFooter-false",
      "label": "自定义Footer插槽 · 关闭",
      "controls": {
        "customFooter": false,
        "showFooter": true,
        "readonly": false,
        "demoState": "open"
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：Modal首版容器

**不适用**：嵌套、拖拽、手势及未经验证的内部框架生产场景

官方来源 SFC：supported。

### 示例：联系人编辑对话框

id：`contact-edit-confirmation` · portability：`portable` · owner：`wb-modal`

联系人编辑对话框场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchModal, WorkbenchButton, WorkbenchInput } from '@workbench/ui-vue3'
const open = ref(false)
const contactName = ref('林青')
const actions = [{ id: 'cancel', label: '取消', closeOnClick: true }, { id: 'save', label: '保存', closeOnClick: true }]
function beforeClose() { return true }
</script>
<template>
  <WorkbenchButton appearance="secondary" @click="open = true">打开编辑</WorkbenchButton>
  <WorkbenchModal v-model="open" title="编辑联系人" size="m" :actions="actions" :before-close="beforeClose">
    <WorkbenchInput v-model="contactName" aria-label="姓名" />
  </WorkbenchModal>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-MODAL-V1/modal?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| actions | Array | {"kind":"function"} |  | 底部操作描述数组；closeOnClick决定该操作成功后是否关闭。 |
| ariaDescribedby | String | {"kind":"undefined"} |  | 关联正文说明元素ID，绑定到dialog面板。 |
| beforeClose | Function | {"kind":"undefined"} |  | 同步或异步关闭守卫，返回false则维持打开。 |
| closeOnEsc | Boolean | true |  | 是否允许Escape关闭。 |
| closeOnMask | Boolean | true |  | 是否允许点击遮罩关闭。 |
| modelValue | Boolean | false |  | 对话框是否打开；父级响应update:modelValue同步关闭状态。 |
| readonly | Boolean | false |  | 以只读信息呈现内容并隐藏底部操作区；默认插槽可读取readonly插槽参数。 |
| showGrid | Boolean | false |  | 仅显示布局检查网格，不改变Modal尺寸或交互。 |
| size | String | m | s / m / l / xl | 宽度档位s/m/l/xl，对应固定版心栅格宽度。 |
| title * | String |  |  | 对话框标题，必填。 |
| topNavigationHeight | String \| Number | 0 |  | 顶部导航实际高度，用于计算最大可用高度；宿主应传真实壳层值。 |

### Events

- `update:modelValue`：新的打开状态；关闭请求为false。；关闭通过守卫并实际生效时发出。

- `close`：关闭原因。；关闭操作完成后发出。

- `action`：触发的Action描述。；点击底部操作时发出。

### Slots

- `close-icon`：自定义关闭按钮内容。；保留按钮语义和可访问名称；插槽仅替换图形内容。

- `default`：对话框主体；插槽参数提供readonly。；编辑和只读内容都由调用方组织，内容区负责纵向滚动。

- `footer`：自定义底部操作区；插槽参数提供requestClose(reason)。；提供后由宿主管理按钮、校验和动作；只读模式不显示操作区。

### 实例成员

- `requestClose(reason?: string): Promise<boolean>;`

### 规则

### 预览入口 `/preview/WB-MODAL-V1/modal`。Modal 

id：`wb-modal-rule-2` · must / confirmed

预览入口 `/preview/WB-MODAL-V1/modal`。Modal 复用 Drawer 已确认的内容结构与间距：左右 24px、上下 20px，有 Action 时底部 24px；标题到内容 16px、内容到 Action 24px，三段之间不使用分割线。标题使用 `font-headline-s`（16px/24px/500），最长占位与 16px 关闭按钮保持 16px 间距；超长标题单行省略并通过 `title` 保留全文。关闭按钮为 16px 图标且不增加可见外容器。

**适用条件**：Modal首版

### S、M、L、XL 分别占 Workbench 固定版心 24 栅格中的 6、8、

id：`wb-modal-rule-4` · must / confirmed

S、M、L、XL 分别占 Workbench 固定版心 24 栅格中的 6、8、12、16 列。按 1856px 版心和 16px gutter 换算，目标宽度分别为 452px、608px、920px、1232px；当视口不足以容纳目标宽度时，面板收敛至 `视口宽度 - 64px`，左右各保留 32px 安全距离。

**适用条件**：Modal首版

### 最大高度为 `视口高度 - 顶部导航高度 - 64px`。顶部导航高度通过 `t

id：`wb-modal-rule-6` · must / confirmed

最大高度为 `视口高度 - 顶部导航高度 - 64px`。顶部导航高度通过 `topNavigationHeight` 配置；Preview 暂用 56px Proposed 示例值，等待真实产品壳层接入时传入实际高度。标题与 Action 固定，仅内容区滚动；滚动条复用 `wb-scrollbar` 并贴合面板右边缘。

**适用条件**：Modal首版

### 面板使用 `color-surface-overlay`、`radius-lg`

id：`wb-modal-rule-8` · must / confirmed

面板使用 `color-surface-overlay`、`radius-lg` 和 Dialog 专属 `shadow-xl`，遮罩使用 `color-scrim-modal`。打开后锁定页面滚动、隔离背景交互、圈定焦点；关闭后恢复触发元素焦点。关闭按钮、Escape、遮罩和配置为 `closeOnClick` 的 Action 均经过 `beforeClose`。

**适用条件**：Modal首版

### 编辑态示例中的“确认”和“取消”均配置 `closeOnClick: true`

id：`wb-modal-rule-10` · must / confirmed

编辑态示例中的“确认”和“取消”均配置 `closeOnClick: true`，业务校验通过后关闭。组件同时提供 `readonly` 布尔属性并将其作为默认插槽参数暴露；只读场景使用语义化标签–值信息组，不用 Disabled 表单控件模拟，并且不渲染底部操作区或 Action 按钮。

**适用条件**：Modal首版

### 动效时长、缓动、层级和 56px 顶部导航示例尚无正式 Foundation 决

id：`wb-modal-rule-12` · must / confirmed

动效时长、缓动、层级和 56px 顶部导航示例尚无正式 Foundation 决策，保留 Task-local Proposed Candidate。本版已批准为 prototype-validated / prototype-only，未验证内部框架生产适配。

**适用条件**：Modal首版

### 正式实现位于[internal reference omitted]

id：`wb-modal-rule-14` · must / confirmed

正式实现位于[internal reference omitted] `--overlay-layer` 提供层级；正式默认不设置动效，预览动效及层级候选不属于批准规则。模态开启时隔离当前面板与其aria-controls关联浮层以外的背景，关闭或卸载仅释放本实例持有的隔离和滚动锁。关闭状态挂载、非模态模式不修改页面滚动设置。

**适用条件**：Modal首版

### `topNavigationHeight` 由宿主传入实际导航高度；默认0表示无

id：`wb-modal-rule-16` · must / confirmed

`topNavigationHeight` 由宿主传入实际导航高度；默认0表示无导航，56px仅保留在Studio预览示例。

**适用条件**：Modal首版

### 组件依赖

`wb-button`、`wb-scrollbar`

### Foundation 引用

`color-surface-overlay`、`color-surface-page`、`color-scrim-modal`、`color-text-primary`、`color-text-secondary`、`color-icon-primary`、`color-icon-hover`、`color-border-focus`、`color-scrollbar-thumb-fill-hover`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`spacing-layout-container-block`、`spacing-layout-container-inline`、`spacing-layout-action-gap`、`spacing-dialog-padding-block-end-with-actions`、`spacing-screen-edge-expanded`、`radius-lg`、`radius-full`、`shadow-xl`、`font-body-m`、`font-body-s`、`font-headline-m`、`font-headline-s`、`icon-size-16`、`color-icon-active`、`layout-grid-columns-wide`、`layout-grid-gutter`、`layout-grid-max-width`

### 选型

用于需要用户完成或取消后才能继续的短任务、确认和只读信息；跨页面主流程或大量纵向内容使用Drawer或独立页面。

### 设计结构与排版

标题、内容、底部操作构成清晰的决策层级。size按固定版心栅格确定；内容区独立滚动，标题与操作保持可见。readonly用于信息展示，不用禁用表单模拟只读。

### 交互与键盘

打开后圈定焦点并锁定背景滚动；关闭后恢复触发元素。关闭按钮、Escape、遮罩以及closeOnClick Action遵循beforeClose。

### 使用边界与职责

组件公开入口为 WorkbenchModal（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。

### 包内关联引用

```json
[
  {
    "label": "对话框 Modal组件规范",
    "href": "#rules"
  }
]
```
