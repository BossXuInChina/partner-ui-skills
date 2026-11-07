<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 级联选择 Cascader — `WorkbenchCascader`

资产：`wb-cascader` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-CASCADER-V1/cascader?view=preview)

用于从多层级选项中选择末级值；支持单选、末级多选和全层级多选。

公开入口：`@workbench/ui-vue3` → `WorkbenchCascader`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-CASCADER-V1/cascader?view=states)

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
      "id": "expanded",
      "label": "展开"
    },
    {
      "id": "selected",
      "label": "已选择"
    },
    {
      "id": "hover",
      "label": "悬浮"
    },
    {
      "id": "focus",
      "label": "聚焦"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "long",
      "label": "超长文本"
    },
    {
      "id": "empty",
      "label": "空数据"
    }
  ],
  "controls": [
    {
      "id": "mode",
      "label": "选择类型",
      "type": "select",
      "default": "single",
      "options": [
        {
          "value": "single",
          "label": "单选"
        },
        {
          "value": "leaf",
          "label": "多选末级复选"
        },
        {
          "value": "all",
          "label": "多选全层复选"
        }
      ]
    },
    {
      "id": "size",
      "label": "选择框尺寸",
      "type": "select",
      "default": "medium",
      "options": [
        {
          "value": "small",
          "label": "小28px"
        },
        {
          "value": "medium",
          "label": "默认32px"
        },
        {
          "value": "large",
          "label": "大40px"
        }
      ]
    },
    {
      "id": "depth",
      "label": "层级数量",
      "type": "select",
      "default": "3",
      "options": [
        {
          "value": "2",
          "label": "2级"
        },
        {
          "value": "3",
          "label": "3级"
        },
        {
          "value": "4",
          "label": "4级"
        }
      ]
    },
    {
      "id": "showPanel",
      "label": "展开面板",
      "type": "boolean",
      "default": true
    },
    {
      "id": "tagRemovable",
      "label": "标签可删除",
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
          "value": "expanded",
          "label": "初始展开"
        },
        {
          "value": "selected",
          "label": "已选择"
        },
        {
          "value": "hover",
          "label": "悬浮"
        },
        {
          "value": "focus",
          "label": "聚焦"
        },
        {
          "value": "disabled",
          "label": "禁用"
        },
        {
          "value": "long",
          "label": "超长文本"
        },
        {
          "value": "empty",
          "label": "空数据"
        }
      ],
      "intent": "state",
      "presentation": "state-buttons"
    },
    {
      "id": "mode",
      "label": "选择类型",
      "type": "select",
      "default": "single",
      "options": [
        {
          "value": "single",
          "label": "单选"
        },
        {
          "value": "leaf",
          "label": "多选末级复选"
        },
        {
          "value": "all",
          "label": "多选全层复选"
        }
      ]
    },
    {
      "id": "size",
      "label": "选择框尺寸",
      "type": "select",
      "default": "medium",
      "options": [
        {
          "value": "small",
          "label": "小28px"
        },
        {
          "value": "medium",
          "label": "默认32px"
        },
        {
          "value": "large",
          "label": "大40px"
        }
      ]
    },
    {
      "id": "depth",
      "label": "层级数量",
      "type": "select",
      "default": "3",
      "options": [
        {
          "value": "2",
          "label": "2级"
        },
        {
          "value": "3",
          "label": "3级"
        },
        {
          "value": "4",
          "label": "4级"
        }
      ]
    },
    {
      "id": "showPanel",
      "label": "展开面板",
      "type": "boolean",
      "default": true
    },
    {
      "id": "tagRemovable",
      "label": "标签可删除",
      "type": "boolean",
      "default": false,
      "when": {
        "mode": [
          "leaf",
          "all"
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
      "id": "demoState-expanded",
      "label": "演示状态 · 初始展开",
      "controls": {
        "demoState": "expanded"
      }
    },
    {
      "id": "demoState-selected",
      "label": "演示状态 · 已选择",
      "controls": {
        "demoState": "selected"
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
      "id": "demoState-focus",
      "label": "演示状态 · 聚焦",
      "controls": {
        "demoState": "focus"
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
      "id": "demoState-long",
      "label": "演示状态 · 超长文本",
      "controls": {
        "demoState": "long"
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
      "id": "mode-single",
      "label": "选择类型 · 单选",
      "controls": {
        "mode": "single"
      }
    },
    {
      "id": "mode-leaf",
      "label": "选择类型 · 多选末级复选",
      "controls": {
        "mode": "leaf"
      }
    },
    {
      "id": "mode-all",
      "label": "选择类型 · 多选全层复选",
      "controls": {
        "mode": "all"
      }
    },
    {
      "id": "size-small",
      "label": "选择框尺寸 · 小28px",
      "controls": {
        "size": "small"
      }
    },
    {
      "id": "size-medium",
      "label": "选择框尺寸 · 默认32px",
      "controls": {
        "size": "medium"
      }
    },
    {
      "id": "size-large",
      "label": "选择框尺寸 · 大40px",
      "controls": {
        "size": "large"
      }
    },
    {
      "id": "depth-2",
      "label": "层级数量 · 2级",
      "controls": {
        "depth": "2"
      }
    },
    {
      "id": "depth-3",
      "label": "层级数量 · 3级",
      "controls": {
        "depth": "3"
      }
    },
    {
      "id": "depth-4",
      "label": "层级数量 · 4级",
      "controls": {
        "depth": "4"
      }
    },
    {
      "id": "showPanel-true",
      "label": "展开面板 · 开启",
      "controls": {
        "showPanel": true
      }
    },
    {
      "id": "showPanel-false",
      "label": "展开面板 · 关闭",
      "controls": {
        "showPanel": false
      }
    },
    {
      "id": "tagRemovable-true",
      "label": "标签可删除 · 开启",
      "controls": {
        "tagRemovable": true,
        "mode": "leaf"
      }
    },
    {
      "id": "tagRemovable-false",
      "label": "标签可删除 · 关闭",
      "controls": {
        "tagRemovable": false,
        "mode": "leaf"
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
    "mode",
    "depth",
    "state"
  ],
  "explicitCaseIds": [
    "expanded-comparison"
  ],
  "loopExpressions": []
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：级联选择器 Cascader相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：区域选择

id：`region-cascader` · portability：`portable` · owner：`wb-cascader`

受控单选叶子key，层级节点及业务结果完整定义。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchCascader } from "@workbench/ui-vue3"
const region = ref('hz')
const options = [{ key: 'zj', label: '浙江', children: [{ key: 'hz', label: '杭州' }, { key: 'nb', label: '宁波' }] }]
const selectedPath = ref([])
function handleChange(value, paths) { selectedPath.value = paths[0] ?? [] }
</script>
<template>
  <WorkbenchCascader v-model="region" :options="options" mode="single" @change="handleChange" />
  <output>{{ selectedPath.join(" / ") || region }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-CASCADER-V1/cascader?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| clearable | Boolean |  |  | 是否允许清除全部选择。 |
| defaultExpandedKeys | Array | {"kind":"function"} |  | 默认展开的层级路径key。 |
| defaultOpen | Boolean |  |  | 非受控时的初始展开状态。 |
| defaultValue | String \| Number \| Array | null |  | 非受控初始选择值。 |
| disabled | Boolean |  |  | 禁用选择交互并保留当前值。 |
| inlinePanel | Boolean |  |  | 在当前布局内嵌展示面板。 |
| label | String | 级联选择器 |  | 选择器可访问名称。 |
| mode | String | single | single / leaf / all | single、leaf或all。 |
| modelValue | String \| Number \| Array | {"kind":"undefined"} |  | 受控值；single模式为叶子key，leaf/all模式为叶子key数组。 |
| open | Boolean | {"kind":"undefined"} |  | 受控浮层展开状态；省略时使用内部状态。 |
| options * | Array |  |  | 级联节点数组；节点由key/label及可选children组成。 |
| placeholder | String | 请选择 |  | 尚未选择时的提示文案。 |
| size | String | medium |  | 选择器尺寸small、medium或large。 |
| tagRemovable | Boolean |  |  | 是否允许删除已选标签。 |

### Events

- `update:modelValue`：单值或按模式返回的叶子key数组。；选择、移除或清空后发出。

- `update:open`：新的布尔展开状态。；面板打开或关闭时发出。

- `change`：新值及对应的完整选中路径数组。；选择值变化后发出。

- `expand`：被展开节点key及当前展开路径。；用户展开或切换级联层级时发出。

- `remove`：移除的节点key数组。；用户移除一个或多个已选标签时发出。

- `clear`：无。；用户清空全部选择后发出。

### 实例成员

- `focus(): void;`

- `close(): void;`

### 同族导出：`WorkbenchCascaderOverflow`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| anchor * | Object |  |  |  |
| id * | String |  |  |  |
| items * | Array |  |  |  |
| removable | Boolean |  |  |  |

### Events

- `remove`

- `dismiss`

- `focusout`

### 实例成员

- `contains(target: Node | null): boolean | undefined;`

### 同族导出：`WorkbenchCascaderPanel`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| columnSelection | Array | {"kind":"function"} | single / multiple / none |  |
| constrained | Boolean |  |  |  |
| index * | Map |  |  |  |
| label | String | 级联选项 |  |  |
| mode | String | single |  |  |
| options * | Array |  |  |  |
| selected * | Array |  |  |  |

### Events

- `expand`

- `choose`

- `toggle`

- `close`

### 实例成员

- `focusFirst(): void;`

### 规则

### 级联面板与+N明细的用户确认圆角

id：`wb-cascader-overlay-radius-20261025` · must / confirmed

级联主面板主体使用radius-md（6px）；触发器与选项行保持各自既有圆角。+N明细依据tagRemovable区分：可删除时为radius-md（6px）的Popover，静态时为radius-sm（4px）的Tooltip。保留4px标签内容内距与间距、宽度收紧、箭头锚定和删除交互。

**适用条件**：Cascader面板或标签溢出明细

### 组件依赖

`wb-select`、`wb-checkbox`、`wb-tag`、`wb-tooltip`

### Foundation 引用

`color-text-primary`、`color-text-secondary`、`color-text-disabled`、`color-text-placeholder`、`color-border`、`color-border-hover`、`color-border-focus`、`color-border-disabled`、`color-fill-hover`、`color-fill-disabled`、`color-surface-overlay`、`color-icon-primary`、`color-icon-secondary`、`color-icon-disabled`、`font-body-m`、`font-body-s`、`radius-sm`、`radius-md`、`color-fill-subtle-default`、`color-fill-subtle-disabled`、`color-fill-selected`、`color-border-separator`、`shadow-base`

### 选型

当选项本身具有父子层级且需要逐级定位时使用Cascader。平铺选项使用Select。

- single仅选择末级并存单值；leaf与all均启用多选，分别表达末级或全层级选择。

- 默认浮层适合常规页面；inlinePanel用于内容区内嵌面板。

### 设计结构与排版

options以key、label及可选children构成树；叶子选择值按mode变化。

- size支持small、medium、large；selected标签过多时折叠为+n，并可展开查看隐藏项。

- open可受控；未提供时由defaultOpen初始化内部展开状态。

- clearable控制整体清除，tagRemovable控制逐项移除。

### 交互与键盘

切换父级后级联面板随路径更新；已选路径在重新打开时保留。

- 单选只提交末级key；leaf/all模式输出末级key数组，父节点选择会展开为可选叶子。

- expand通知当前展开路径；移除标签发出remove，清空发出clear。

- 禁用节点不可选择；禁用状态保留当前值。

### 使用边界与职责

消费方维护options与受控modelValue，并根据change更新业务筛选或表单值。

- change附带完整层级路径；消费方可用路径构造面包屑或结果描述。

- 组件不负责远程加载层级；需要异步数据时由消费方更新options。

- 内置WorkbenchCascaderPanel/Overflow为辅助API，常规场景使用主组件。

### 包内关联引用

```json
[
  {
    "label": "级联选择注册规范",
    "href": "#rules"
  },
  {
    "label": "面板与溢出辅助组件API",
    "href": "#family"
  }
]
```
