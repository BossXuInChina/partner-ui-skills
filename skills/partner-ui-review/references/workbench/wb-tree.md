<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 结构树 Tree — `WorkbenchTree`

资产：`wb-tree` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TREE-V1/tree?view=preview)

用于展示父子层级内容，支持单选、多选、搜索、展开及可配置的节点操作。

公开入口：`@workbench/ui-vue3` → `WorkbenchTree`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-TREE-V1/tree?view=states)

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
      "id": "hover",
      "label": "悬浮"
    },
    {
      "id": "selected",
      "label": "选中"
    },
    {
      "id": "editing",
      "label": "编辑"
    },
    {
      "id": "disabled",
      "label": "含禁用节点"
    },
    {
      "id": "deep",
      "label": "五级层次"
    },
    {
      "id": "long",
      "label": "超长文本"
    },
    {
      "id": "empty",
      "label": "空列表"
    }
  ],
  "controls": [
    {
      "id": "checkable",
      "label": "可复选",
      "type": "boolean",
      "default": false
    },
    {
      "id": "searchable",
      "label": "搜索框",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showLine",
      "label": "辅助线",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showIcons",
      "label": "节点图标",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showTitle",
      "label": "标题",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showCount",
      "label": "数据统计",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showActions",
      "label": "节点操作",
      "type": "boolean",
      "default": true
    },
    {
      "id": "checkStrictly",
      "label": "父子独立复选",
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
  "pilotControls": [
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
          "value": "hover",
          "label": "悬浮"
        },
        {
          "value": "selected",
          "label": "选中"
        },
        {
          "value": "editing",
          "label": "编辑"
        },
        {
          "value": "disabled",
          "label": "含禁用节点"
        },
        {
          "value": "deep",
          "label": "五级层次"
        },
        {
          "value": "long",
          "label": "超长文本"
        },
        {
          "value": "empty",
          "label": "空列表"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "checkable",
      "label": "可复选",
      "type": "boolean",
      "default": false
    },
    {
      "id": "searchable",
      "label": "搜索框",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showLine",
      "label": "辅助线",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showIcons",
      "label": "节点图标",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showTitle",
      "label": "标题",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showCount",
      "label": "数据统计",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showActions",
      "label": "节点操作",
      "type": "boolean",
      "default": true
    },
    {
      "id": "checkStrictly",
      "label": "父子独立复选",
      "type": "boolean",
      "default": false,
      "when": {
        "checkable": [
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
      "id": "demoState-default",
      "label": "演示状态 · 默认",
      "controls": {
        "demoState": "default"
      }
    },
    {
      "id": "demoState-hover",
      "label": "演示状态 · 悬浮",
      "controls": {
        "demoState": "hover"
      }
    },
    {
      "id": "demoState-selected",
      "label": "演示状态 · 选中",
      "controls": {
        "demoState": "selected"
      }
    },
    {
      "id": "demoState-editing",
      "label": "演示状态 · 编辑",
      "controls": {
        "demoState": "editing"
      }
    },
    {
      "id": "demoState-disabled",
      "label": "演示状态 · 含禁用节点",
      "controls": {
        "demoState": "disabled"
      }
    },
    {
      "id": "demoState-deep",
      "label": "演示状态 · 五级层次",
      "controls": {
        "demoState": "deep"
      }
    },
    {
      "id": "demoState-long",
      "label": "演示状态 · 超长文本",
      "controls": {
        "demoState": "long"
      }
    },
    {
      "id": "demoState-empty",
      "label": "演示状态 · 空列表",
      "controls": {
        "demoState": "empty"
      }
    },
    {
      "id": "checkable-true",
      "label": "可复选 · 开启",
      "controls": {
        "checkable": true
      }
    },
    {
      "id": "checkable-false",
      "label": "可复选 · 关闭",
      "controls": {
        "checkable": false
      }
    },
    {
      "id": "searchable-true",
      "label": "搜索框 · 开启",
      "controls": {
        "searchable": true
      }
    },
    {
      "id": "searchable-false",
      "label": "搜索框 · 关闭",
      "controls": {
        "searchable": false
      }
    },
    {
      "id": "showLine-true",
      "label": "辅助线 · 开启",
      "controls": {
        "showLine": true
      }
    },
    {
      "id": "showLine-false",
      "label": "辅助线 · 关闭",
      "controls": {
        "showLine": false
      }
    },
    {
      "id": "showIcons-true",
      "label": "节点图标 · 开启",
      "controls": {
        "showIcons": true
      }
    },
    {
      "id": "showIcons-false",
      "label": "节点图标 · 关闭",
      "controls": {
        "showIcons": false
      }
    },
    {
      "id": "showTitle-true",
      "label": "标题 · 开启",
      "controls": {
        "showTitle": true
      }
    },
    {
      "id": "showTitle-false",
      "label": "标题 · 关闭",
      "controls": {
        "showTitle": false
      }
    },
    {
      "id": "showCount-true",
      "label": "数据统计 · 开启",
      "controls": {
        "showCount": true
      }
    },
    {
      "id": "showCount-false",
      "label": "数据统计 · 关闭",
      "controls": {
        "showCount": false
      }
    },
    {
      "id": "showActions-true",
      "label": "节点操作 · 开启",
      "controls": {
        "showActions": true
      }
    },
    {
      "id": "showActions-false",
      "label": "节点操作 · 关闭",
      "controls": {
        "showActions": false
      }
    },
    {
      "id": "checkStrictly-true",
      "label": "父子独立复选 · 开启",
      "controls": {
        "checkStrictly": true,
        "checkable": true
      }
    },
    {
      "id": "checkStrictly-false",
      "label": "父子独立复选 · 关闭",
      "controls": {
        "checkStrictly": false,
        "checkable": true
      }
    }
  ]
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {},
  "dynamicBindings": [
    "cases"
  ],
  "explicitCaseIds": [
    "item.id"
  ],
  "loopExpressions": [
    "item in cases"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：结构树 Tree相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：受控部门树

id：`controlled-tree` · portability：`portable` · owner：`wb-tree`

完整定义树数据及当前选择，由消费方处理选择结果。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchTree } from "@workbench/ui-vue3"
const selectedKey = ref('design')
const expandedKeys = ref(['company'])
const items = [{ key: 'company', label: '公司', children: [{ key: 'design', label: '设计部' }, { key: 'product', label: '产品部' }] }]
function selectNode(key) { selectedKey.value = key }
</script>
<template>
  <WorkbenchTree v-model="selectedKey" v-model:expanded-keys="expandedKeys" :items="items" title="组织架构" @select="selectNode" />
  <output>当前节点：{{ selectedKey }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-TREE-V1/tree?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| checkStrictly | Boolean |  |  | 是否取消父子勾选联动。 |
| checkable | Boolean |  |  | 是否启用节点复选。 |
| checkedKeys | Array | {"kind":"undefined"} |  | 受控勾选节点key数组。 |
| defaultCheckedKeys | Array | {"kind":"function"} |  | 非受控初始勾选节点key数组。 |
| defaultExpandedKeys | Array | {"kind":"function"} |  | 非受控初始展开节点key数组。 |
| disabled | Boolean |  |  | 禁用树节点交互。 |
| editable | Boolean | true |  | 是否允许编辑节点名称。 |
| emptyText | String | 暂无数据 |  | 节点为空时显示的文案。 |
| expandedKeys | Array | {"kind":"undefined"} |  | 受控展开节点key数组。 |
| items | Array | {"kind":"function"} |  | 递归节点数据；节点包含key、label和可选children。 |
| label | String | 结构树 |  | 树控件可访问名称。 |
| modelValue | String \| Number | {"kind":"undefined"} |  | 当前单选节点key。 |
| placeholder | String | 请输入搜索内容 |  | 搜索输入框的提示文案。 |
| search | String | {"kind":"undefined"} |  | 受控搜索文本；提供后需响应update:search。 |
| searchable | Boolean | true |  | 是否显示搜索框。 |
| showActions | Boolean | true |  | 是否显示节点操作入口。 |
| showCount | Boolean |  |  | 是否显示节点数量。 |
| showIcons | Boolean |  |  | 是否显示节点图标。 |
| showLine | Boolean |  |  | 是否显示层级辅助线。 |
| title | String | 主标题 |  | 树标题。 |
| titleIcon | String |  |  | 标题区图标标识。 |

### Events

- `update:modelValue`：选中的节点key。；用户选中节点后发出。

- `update:expandedKeys`：展开节点key数组。；展开或收起节点后发出。

- `update:checkedKeys`：勾选节点key数组。；勾选状态变化后发出。

- `update:search`：新的搜索文本。；搜索框文本变化时发出。

- `select`：节点key及节点数据。；用户选择节点后发出。

- `expand`：节点key、是否展开及节点数据。；节点展开状态变化时发出。

- `check`：新的勾选key数组及{ key, checked, node }变化上下文。；用户切换节点勾选后发出。

- `rename`：节点key、新名称及原节点数据。；用户确认编辑名称后发出。

- `delete`：待删除节点key及节点数据。；用户激活删除操作后发出。

- `more`：节点key及节点数据。；用户激活更多操作后发出。

### Slots

- `title-actions`：无插槽参数。；在树标题区域放置消费方操作。

- `label`：{ node, level }；node为节点数据，level为从1开始的层级。；自定义节点标签展示。

### 实例成员

- `focus(): Promise<void>;`

- `startEdit(key: string | number): void;`

### 规则

包内未提供规则；不补写设计结论。

### 组件依赖

`wb-checkbox`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-text-disabled`、`color-border`、`color-border-focus`、`color-border-separator`、`color-surface-container`、`color-fill-hover`、`color-text-placeholder`、`color-text-action`、`color-icon-secondary`、`color-icon-primary`、`color-error`、`font-body-m`、`font-body-s`、`font-headline-l`、`radius-sm`

### 选型

用于具有清晰父子关系的结构数据。若主要任务是从多级选项中提交末级值，使用Cascader。

- 单选使用modelValue；多选启用checkable并使用checkedKeys。

- 数据量较大时开启searchable；标题、图标、统计及节点操作可按需呈现。

### 设计结构与排版

items递归描述节点，每个节点使用稳定key和label，可带children、disabled。

- title与titleIcon控制树标题；emptyText定义无数据文案。

- showLine、showIcons、showCount控制辅助层级线、节点图标及数量。

- title-actions插槽用于标题区操作，label插槽用于自定义节点标签。

### 交互与键盘

展开、选择、勾选及节点操作分别发出独立事件。

- 多选默认父子联动；checkStrictly=true时父子勾选相互独立。

- 编辑节点需editable；showActions控制节点操作入口。

- 搜索受控时监听update:search同步search值。

### 使用边界与职责

组件负责树内展示和本地交互；消费方负责节点保存、删除确认及权限判断。

- modelValue、expandedKeys、checkedKeys与search可受控；default* props提供非受控初值。

- rename、delete、more仅发出用户动作，不自行保存后端数据。

- 节点计数、标题图标能力以正式API为准；Studio隐藏注释不构成新能力。

### 包内关联引用

```json
[
  {
    "label": "结构树规范",
    "href": "#rules"
  }
]
```
