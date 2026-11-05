<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 穿梭框 Transfer — `WorkbenchTransfer`

资产：`wb-transfer` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=preview)

用于在可选集合与已选集合之间转移项目，支持手动确认与自动移动模式。

公开入口：`@workbench/ui-vue3` → `WorkbenchTransfer`

## 变体与状态

状态：`supported`。Studio controls, not public component props

[在 Studio 中查看](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states)

| 分组 | 案例 | id | Studio |
| --- | --- | --- | --- |
| 组件状态 | 默认 | demoState-default | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 组件状态 | 已勾选待穿梭 | demoState-checked | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 组件状态 | 已有已选项 | demoState-transferred | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 组件状态 | 层级树 | demoState-tree | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 组件状态 | 树形展开与搜索 | demoState-expanded | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 组件状态 | 自动穿梭 | demoState-auto | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 组件状态 | 禁用 | demoState-disabled | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 组件状态 | 空数据 | demoState-empty | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 组件状态 | 超长文本 | demoState-long | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 搜索框 | 关闭 | searchable-false | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 搜索框 | 开启 | searchable-true | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 分页 | 关闭 | pagination-false | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |
| 分页 | 开启 | pagination-true | [案例](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=states) |

### Studio 案例值（不是 props 映射）

```json
[
  {
    "id": "demoState-default",
    "group": "组件状态",
    "label": "默认",
    "controls": {
      "demoState": "default",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "demoState-checked",
    "group": "组件状态",
    "label": "已勾选待穿梭",
    "controls": {
      "demoState": "checked",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "demoState-transferred",
    "group": "组件状态",
    "label": "已有已选项",
    "controls": {
      "demoState": "transferred",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "demoState-tree",
    "group": "组件状态",
    "label": "层级树",
    "controls": {
      "demoState": "tree",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "demoState-expanded",
    "group": "组件状态",
    "label": "树形展开与搜索",
    "controls": {
      "demoState": "expanded",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "demoState-auto",
    "group": "组件状态",
    "label": "自动穿梭",
    "controls": {
      "demoState": "auto",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "demoState-disabled",
    "group": "组件状态",
    "label": "禁用",
    "controls": {
      "demoState": "disabled",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "demoState-empty",
    "group": "组件状态",
    "label": "空数据",
    "controls": {
      "demoState": "empty",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "demoState-long",
    "group": "组件状态",
    "label": "超长文本",
    "controls": {
      "demoState": "long",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "searchable-false",
    "group": "搜索框",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "searchable-true",
    "group": "搜索框",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "searchable": true,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "pagination-false",
    "group": "分页",
    "label": "关闭",
    "controls": {
      "demoState": "default",
      "searchable": false,
      "pagination": false,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  },
  {
    "id": "pagination-true",
    "group": "分页",
    "label": "开启",
    "controls": {
      "demoState": "default",
      "searchable": false,
      "pagination": true,
      "previewWidth": 1280
    },
    "studioPath": "/preview/WB-TRANSFER-V1/transfer?view=states"
  }
]
```

### 包内声明

```json
{
  "states": [
    {
      "id": "default",
      "label": "默认"
    },
    {
      "id": "checked",
      "label": "已勾选待穿梭"
    },
    {
      "id": "transferred",
      "label": "已有已选项"
    },
    {
      "id": "tree",
      "label": "层级树"
    },
    {
      "id": "expanded",
      "label": "树形展开与搜索"
    },
    {
      "id": "auto",
      "label": "自动穿梭"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "empty",
      "label": "空数据"
    },
    {
      "id": "long",
      "label": "超长文本"
    }
  ],
  "controls": [
    {
      "id": "searchable",
      "label": "搜索框",
      "type": "boolean",
      "default": false
    },
    {
      "id": "pagination",
      "label": "分页",
      "type": "boolean",
      "default": true
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "type": "range",
      "target": "viewport-width",
      "default": 1280,
      "min": 760,
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
          "value": "checked",
          "label": "已勾选待穿梭"
        },
        {
          "value": "transferred",
          "label": "已有已选项"
        },
        {
          "value": "tree",
          "label": "层级树"
        },
        {
          "value": "expanded",
          "label": "树形展开与搜索"
        },
        {
          "value": "auto",
          "label": "自动穿梭"
        },
        {
          "value": "disabled",
          "label": "禁用"
        },
        {
          "value": "empty",
          "label": "空数据"
        },
        {
          "value": "long",
          "label": "超长文本"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "searchable",
      "label": "搜索框",
      "type": "boolean",
      "default": false
    },
    {
      "id": "pagination",
      "label": "分页",
      "type": "boolean",
      "default": true
    },
    {
      "id": "previewWidth",
      "label": "预览宽度",
      "type": "range",
      "target": "viewport-width",
      "default": 1280,
      "min": 760,
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
      "id": "demoState-checked",
      "label": "演示状态 · 已勾选待穿梭",
      "controls": {
        "demoState": "checked"
      }
    },
    {
      "id": "demoState-transferred",
      "label": "演示状态 · 已有已选项",
      "controls": {
        "demoState": "transferred"
      }
    },
    {
      "id": "demoState-tree",
      "label": "演示状态 · 层级树",
      "controls": {
        "demoState": "tree"
      }
    },
    {
      "id": "demoState-expanded",
      "label": "演示状态 · 树形展开与搜索",
      "controls": {
        "demoState": "expanded"
      }
    },
    {
      "id": "demoState-auto",
      "label": "演示状态 · 自动穿梭",
      "controls": {
        "demoState": "auto"
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
      "id": "demoState-empty",
      "label": "演示状态 · 空数据",
      "controls": {
        "demoState": "empty"
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
      "id": "pagination-true",
      "label": "分页 · 开启",
      "controls": {
        "pagination": true
      }
    },
    {
      "id": "pagination-false",
      "label": "分页 · 关闭",
      "controls": {
        "pagination": false
      }
    }
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：穿梭框 Transfer相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：团队成员选择

id：`team-transfer` · portability：`portable` · owner：`wb-transfer`

受控的已选key数组和候选项本地定义。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchTransfer } from "@workbench/ui-vue3"
const members = ref(['lin'])
const items = [{ key: 'lin', label: '林晓' }, { key: 'chen', label: '陈宁' }, { key: 'zhou', label: '周敏' }]
</script>
<template>
  <WorkbenchTransfer v-model="members" :items="items" :pagination="false" />
  <output>已选 {{ members.length }} 人</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-TRANSFER-V1/transfer?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| checkedKeys | Object | {"kind":"undefined"} |  | 受控的source/target已勾选key对象。 |
| defaultCheckedKeys | Object | {"kind":"function"} |  | 非受控两侧初始勾选状态。 |
| defaultExpandedKeys | Array | {"kind":"function"} |  | 树形项目的初始展开key。 |
| defaultValue | Array | {"kind":"function"} |  | 非受控目标值初始数组。 |
| disabled | Boolean |  |  | 禁用勾选与项目转移。 |
| items | Array | {"kind":"function"} |  | 候选树形项目；每个节点需有稳定key与label，可嵌套children。 |
| label | String | 穿梭框 |  | 穿梭框可访问名称。 |
| mode | String | manual | manual / auto | manual先勾选后移动；auto勾选时自动移动。 |
| modelValue | Array | {"kind":"undefined"} |  | 受控目标侧叶子key数组。 |
| pageSize | Number | 6 |  | 每页项目数。 |
| pagination | Boolean | true |  | 是否在手动模式显示分页。 |
| searchable | Boolean |  |  | 是否显示面板搜索。 |
| titles | Array | {"kind":"function"} |  | 左右面板标题数组。 |

### Events

- `update:modelValue`：更新后的目标侧叶子key数组。；项目移动后发出。

- `update:checkedKeys`：{ source, target }两侧勾选key对象。；任一侧勾选状态改变后发出。

- `change`：新目标key数组、方向right/left及移动key数组。；项目从一侧成功移动到另一侧后发出。

- `check`：侧别source/target及该侧勾选key数组。；该侧勾选状态更新后发出。

- `search`：侧别及搜索文本。；任一侧搜索内容变化时发出。

- `page-change`：侧别及页码信息。；任一侧分页变化时发出。

### Slots

- `item`：{ item, side }；side为source或target。；自定义每个候选或已选项内容。

- `empty`：{ side, search }；side为source或target，search为该侧当前搜索文本。；自定义某一侧无数据时的内容。

### 实例成员

- `move(side: 'source' | 'target', requested?: (string | number)[]): void;`

### 同族导出：`WorkbenchTransferPanel`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| checkedKeys * | Array |  |  |  |
| defaultExpandedKeys | Array |  |  |  |
| disabled | Boolean |  |  |  |
| items * | Array |  |  |  |
| mode * | String |  |  |  |
| pageSize | Number |  |  |  |
| pagination | Boolean |  |  |  |
| searchable | Boolean |  |  |  |
| side * | String |  |  |  |
| title * | String |  |  |  |

### Events

- `check`

- `move`

- `search`

- `page-change`

### Slots

- `item`

- `empty`

### 规则

包内未提供规则；不补写设计结论。

### 组件依赖

`wb-checkbox`、`wb-pagination`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-text-disabled`、`color-text-placeholder`、`color-text-action`、`color-border`、`color-border-hover`、`color-border-focus`、`color-border-disabled`、`color-border-separator`、`color-fill-hover`、`color-fill-disabled`、`color-surface-container`、`color-icon-primary`、`color-icon-secondary`、`font-body-m`、`font-body-s`、`radius-sm`、`radius-lg`、`font-headline-s`、`color-fill-subtle-disabled`

### 选型

当用户需要同时查看候选项和已选项并进行迁移时使用Transfer。少量选项的直接选择优先使用多选控件。

- manual允许先勾选再确认移动；auto在勾选时立即移动。

- items支持树形结构；searchable与pagination分别控制搜索和分页。

### 设计结构与排版

modelValue保存目标侧叶子key数组；面板标题由titles设置。

- 默认页大小为6；pagination仅在manual模式中生效。

- expandedKeys适用于树形数据的初始展开路径。

- item与empty插槽可自定义行内容及空列表。

### 交互与键盘

选择操作更新checkedKeys；执行移动后change提供新目标值、移动方向和项目key。

- 输出按原始items数据顺序稳定排列，不按用户勾选顺序排序。

- 树形父项移动会包含可用叶子；禁用项不能移动。

- search与page-change带有source/target侧别，供消费方分别处理。

### 使用边界与职责

消费方提供稳定key与显示label，并持有目标值及可选的受控勾选状态。

- modelValue省略时用defaultValue初始化非受控目标值；checkedKeys可单独受控。

- 组件不负责查询远程数据或持久化选择结果。

- WorkbenchTransferPanel是辅助面板API，通常直接使用主组件。

### 包内关联引用

```json
[
  {
    "label": "穿梭框规范",
    "href": "#rules"
  },
  {
    "label": "单侧面板API",
    "href": "#family"
  }
]
```
