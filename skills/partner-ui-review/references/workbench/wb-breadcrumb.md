<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 面包屑 Breadcrumb — `WorkbenchBreadcrumb`

资产：`wb-breadcrumb` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-BREADCRUMB-V1/breadcrumb?view=preview)

用于展示当前页面在系统层级中的位置，并支持返回可导航的祖先页面。

公开入口：`@workbench/ui-vue3` → `WorkbenchBreadcrumb`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-BREADCRUMB-V1/breadcrumb?view=variants)

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
      "id": "collapsed",
      "label": "多层折叠"
    },
    {
      "id": "disabled",
      "label": "含禁用节点"
    }
  ],
  "controls": [
    {
      "id": "depth",
      "label": "路径层级",
      "type": "select",
      "default": "7",
      "options": [
        {
          "value": "1",
          "label": "1 层"
        },
        {
          "value": "3",
          "label": "3 层"
        },
        {
          "value": "6",
          "label": "6 层"
        },
        {
          "value": "7",
          "label": "7 层"
        },
        {
          "value": "10",
          "label": "10 层"
        }
      ]
    },
    {
      "id": "longLabel",
      "label": "超长节点文字",
      "description": "验证单行省略与完整可访问名称",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "depth",
      "label": "路径层级",
      "type": "select",
      "default": "7",
      "options": [
        {
          "value": "1",
          "label": "1 层"
        },
        {
          "value": "3",
          "label": "3 层"
        },
        {
          "value": "6",
          "label": "6 层"
        },
        {
          "value": "7",
          "label": "7 层"
        },
        {
          "value": "10",
          "label": "10 层"
        }
      ],
      "when": {
        "demoState": [
          "default",
          "disabled"
        ]
      }
    },
    {
      "id": "longLabel",
      "label": "超长节点文字",
      "description": "验证单行省略与完整可访问名称",
      "type": "boolean",
      "default": false
    },
    {
      "id": "demoState",
      "label": "组件状态",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认"
        },
        {
          "value": "collapsed",
          "label": "多层折叠"
        },
        {
          "value": "disabled",
          "label": "含禁用节点"
        }
      ],
      "group": "状态与内容",
      "intent": "state",
      "presentation": "state-buttons"
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
      "unit": "px",
      "group": "布局"
    }
  ],
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {},
  "dynamicBindings": [
    "feedback",
    "paths"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "path in paths"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：页面层级路径与祖先导航

**不适用**：侧栏树导航、业务步骤状态；未经验证的内部 UI 框架或生产交付

官方来源 SFC：supported。

### 示例：伙伴详情路径

id：`partner-detail-path` · portability：`portable` · owner：`wb-breadcrumb`

父级以navigate处理无href祖先项；提供href的祖先保留原生导航。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchBreadcrumb } from '@workbench/ui-vue3'
const currentPage = ref('基本信息')
const items = [
  { id: 'partners', label: '合作伙伴', href: '/partners' },
  { id: 'acme', label: '华辰科技' },
  { id: 'profile', label: '基本信息' },
]
function navigate(item, event) {
  event.preventDefault()
  currentPage.value = item.label
}
</script>
<template>
  <WorkbenchBreadcrumb :items="items" aria-label="伙伴详情路径" @navigate="navigate" />
  <output>当前页面：{{ currentPage }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-BREADCRUMB-V1/breadcrumb?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String | 面包屑 |  | 导航区域可访问名称，默认“面包屑”。 |
| collapseThreshold | Number | 6 |  | 折叠阈值，默认6且实际最小6。 |
| items | Array | {"kind":"function"} |  | 按层级顺序排列的{id,label,href?,disabled?}项目数组，id必须唯一。 |

### Events

- `navigate`：(item, event)：被激活的祖先项目与原生事件。；激活没有href的祖先项时发出；路由调用方可preventDefault并处理导航。

### 规则

### 选型边界

id：`wb-breadcrumb-rule-1` · must / confirmed

页面层级路径与祖先导航；不适用于侧栏树导航、业务步骤状态

**适用条件**：页面层级路径与祖先导航

### 交互与调用合同

id：`wb-breadcrumb-rule-2` · must / confirmed

`items` 为 {id,label,href?,disabled?} 数组，id 必须唯一。最后一项是当前页且不交互，祖先有 href 时保留原生链接，隐藏祖先也相同；无 href 时发出 navigate(item,event)。路由调用方可在事件中 preventDefault。collapseThreshold 默认6，最小6，以避免第一项和尾四项重复；每个菜单具有实例唯一 ID。Enter/Space/ArrowDown 打开，方向键/Home/End 移动，Escape 关闭回焦点，焦点离开或外点关闭。

**适用条件**：页面层级路径与祖先导航

### 复用边界

id：`wb-breadcrumb-rule-3` · must / confirmed

保留祖先节点的原生a/button与导航语义，但视觉使用Breadcrumb组件专属的中性层级合同：祖先和折叠入口默认color-text-secondary，Hover使用color-text-primary，当前节点使用color-text-primary，禁用使用color-text-disabled；不套用独立Link或文字按钮的蓝色状态链。

**适用条件**：页面层级路径与祖先导航

### Foundation 引用

`color-border-focus`、`color-fill-hover`、`color-surface-overlay`、`color-surface-page`、`color-text-disabled`、`color-text-primary`、`color-text-secondary`、`font-body-m`、`radius-sm`、`shadow-sm`、`spacing-component-md`、`spacing-component-sm`、`spacing-component-xs`

### 层级与折叠

items按从根节点到当前页的顺序排列，id唯一；最后一项始终是不可交互的当前页。超过折叠阈值时保留首项和末四项，中间项进入菜单。

- 祖先项提供href时保留原生链接；无href时通过navigate交给调用方。

- collapseThreshold有效下限为6。

### 键盘与职责

折叠菜单由组件管理打开、方向键导航和焦点返回。路由状态及导航结果由调用方负责。
