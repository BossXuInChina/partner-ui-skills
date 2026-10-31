<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 选择器 Select — `WorkbenchSelect`

资产：`wb-select` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-SELECT-V1/select?view=preview)

用于从有限的候选项中选择一个或多个值。正式WorkbenchSelect v1保持已批准的基础合同；搜索、清除、标签删除和尺寸扩展只属于Studio候选验证。

公开入口：`@workbench/ui-vue3` → `WorkbenchSelect`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-SELECT-V1/select?view=variants)

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
      "id": "focus",
      "label": "聚焦"
    },
    {
      "id": "hover",
      "label": "悬浮"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "selected",
      "label": "已完成选择"
    }
  ],
  "controls": [
    {
      "id": "showGrid",
      "label": "显示栅格",
      "description": "显示统一栅格辅助层，检查Select在12列与24列容器中的默认跨度",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showPanel",
      "label": "展示选择面板",
      "description": "用于检查面板与选项的4px间距",
      "type": "boolean",
      "default": false
    },
    {
      "id": "longText",
      "label": "展示超长选中内容",
      "description": "检查省略与全文提示",
      "type": "boolean",
      "default": false
    },
    {
      "id": "size",
      "label": "扩展尺寸",
      "type": "select",
      "default": "medium",
      "options": [
        {
          "value": "small",
          "label": "小尺寸 28px"
        },
        {
          "value": "medium",
          "label": "默认 32px"
        },
        {
          "value": "large",
          "label": "大尺寸 40px"
        }
      ]
    },
    {
      "id": "tagsLayout",
      "label": "多选容纳方式",
      "type": "select",
      "default": "collapse",
      "options": [
        {
          "value": "collapse",
          "label": "单行折叠 +N"
        },
        {
          "value": "wrap",
          "label": "多行完整展示"
        }
      ]
    },
    {
      "id": "removable",
      "label": "标签可移除",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "kind",
      "label": "选择器类型",
      "type": "select",
      "default": "single",
      "options": [
        {
          "value": "single",
          "label": "正式 · 单选"
        },
        {
          "value": "multiple",
          "label": "正式 · 多选"
        },
        {
          "value": "extension-single",
          "label": "候选扩展 · 单选"
        },
        {
          "value": "extension-multiple",
          "label": "候选扩展 · 多选"
        }
      ],
      "group": "类型与尺寸"
    },
    {
      "id": "size",
      "label": "扩展尺寸",
      "type": "select",
      "default": "medium",
      "options": [
        {
          "value": "small",
          "label": "小尺寸 28px"
        },
        {
          "value": "medium",
          "label": "默认 32px"
        },
        {
          "value": "large",
          "label": "大尺寸 40px"
        }
      ],
      "group": "类型与尺寸",
      "when": {
        "kind": [
          "extension-single",
          "extension-multiple"
        ]
      }
    },
    {
      "id": "showPanel",
      "label": "展示选择面板",
      "type": "boolean",
      "default": false,
      "group": "状态与内容"
    },
    {
      "id": "longText",
      "label": "展示超长选中内容",
      "type": "boolean",
      "default": false,
      "group": "状态与内容"
    },
    {
      "id": "tagsLayout",
      "label": "多选容纳方式",
      "type": "select",
      "default": "collapse",
      "options": [
        {
          "value": "collapse",
          "label": "单行折叠 +N"
        },
        {
          "value": "wrap",
          "label": "多行完整展示"
        }
      ],
      "group": "结构与插槽",
      "when": {
        "kind": [
          "extension-multiple"
        ]
      }
    },
    {
      "id": "removable",
      "label": "标签可移除",
      "type": "boolean",
      "default": false,
      "group": "结构与插槽",
      "when": {
        "kind": [
          "extension-multiple"
        ]
      }
    },
    {
      "id": "searchable",
      "label": "启用搜索",
      "type": "boolean",
      "default": true,
      "group": "结构与插槽",
      "when": {
        "kind": [
          "extension-single",
          "extension-multiple"
        ]
      }
    },
    {
      "id": "clearable",
      "label": "显示清空操作",
      "type": "boolean",
      "default": true,
      "group": "结构与插槽",
      "when": {
        "kind": [
          "extension-single",
          "extension-multiple"
        ]
      }
    },
    {
      "id": "showGrid",
      "label": "显示栅格",
      "type": "boolean",
      "default": false,
      "group": "容器"
    },
    {
      "id": "previewWidth",
      "label": "预览容器宽度",
      "type": "range",
      "default": 1280,
      "min": 320,
      "max": 1600,
      "step": 1,
      "unit": "px",
      "target": "viewport-width",
      "group": "容器",
      "marks": [
        390,
        768,
        1280,
        1440
      ]
    }
  ],
  "presets": []
}
```

### 定制画廊来源清单（unsupported）

```json
{
  "literalData": {
    "kinds": [
      {
        "id": "single",
        "title": "正式 · 单选"
      },
      {
        "id": "multiple",
        "title": "正式 · 多选"
      },
      {
        "id": "extension-single",
        "title": "候选扩展 · 单选"
      },
      {
        "id": "extension-multiple",
        "title": "候选扩展 · 多选"
      }
    ],
    "states": [
      {
        "id": "default",
        "title": "默认"
      },
      {
        "id": "hover",
        "title": "悬浮"
      },
      {
        "id": "focus",
        "title": "聚焦"
      },
      {
        "id": "selected",
        "title": "已选择"
      },
      {
        "id": "disabled",
        "title": "禁用"
      }
    ]
  },
  "dynamicBindings": [],
  "explicitCaseIds": [],
  "loopExpressions": [
    "item in kinds",
    "size in ['small', 'medium', 'large']",
    "item in states",
    "layout in ['collapse', 'wrap']"
  ]
}
```

## 使用场景

[在 Studio 中查看](http://localhost:4173/preview/WB-SELECT-V1/select?view=examples)

**适用**：单选或多选已有选项

**不适用**：本版本范围外的交互或未经验证的内部框架生产实现

官方来源 SFC：supported。

### 示例：正式API：单选

id：`formal-single` · portability：`portable` · owner：`wb-select`

可直接运行的受控单选示例；值数组、候选项和显示结果均已定义。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchFormItem, WorkbenchSelect } from "@workbench/ui-vue3"

const category = ref([])
const options = [
  { value: "channel", label: "渠道合作" },
  { value: "service", label: "服务支持" },
  { value: "other", label: "其他", disabled: true },
]
</script>
<template>
  <WorkbenchFormItem label="合作类型">
    <WorkbenchSelect v-model="category" label="合作类型" :options="options" />
  </WorkbenchFormItem>
  <output>已选：{{ category[0] || "未选择" }}</output>
</template>
```

### 示例：正式API：多选

id：`formal-multiple` · portability：`portable` · owner：`wb-select`

通过multiple启用多选；仍只使用正式WorkbenchSelect公开属性。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchFormItem, WorkbenchSelect } from "@workbench/ui-vue3"

const regions = ref(["north"])
const regionOptions = [
  { value: "north", label: "北区" },
  { value: "south", label: "南区" },
  { value: "west", label: "西区" },
]
</script>
<template>
  <WorkbenchFormItem label="服务区域">
    <WorkbenchSelect v-model="regions" multiple label="服务区域" :options="regionOptions" />
  </WorkbenchFormItem>
  <output>已选区域数：{{ regions.length }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-SELECT-V1/select?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| label | String |  |  | 裸控件的可访问名称；字段可见标签由WorkbenchFormItem提供。 |
| modelValue | Array | {"kind":"function"} |  | 当前受控选值数组；单选同样使用数组。 |
| multiple | Boolean |  |  | 开启后允许选择多个选项。 |
| options * | Array |  |  | 正式选项数组；每项使用value、label和可选disabled。 |
| panelClass | String |  |  | 传递给面板的自定义类名。 |
| required | Boolean |  |  | 声明必填语义；字段场景的必填标记由表单项负责。 |
| showPanel | Boolean |  |  | 仅用于Studio预览强制展示面板，不是业务开关。 |
| state | String | default |  | 正式实现中用于disabled状态；focus和hover由用户交互产生。 |
| teleportPanel | Boolean |  |  | 控制浮层面板是否通过Teleport挂载。 |

### Events

- `update:modelValue`：新的选值数组；单选数组为零或一个值，多选为当前已选值。；用户选择可用选项后发出。正式WorkbenchSelect没有clear事件。

### 动态 Slots

- `unknown`；表达式：`slotName`。包内未解析为确定的公开 slot 名。

### 规则

### 支持单选、多选以及默认、悬浮、聚焦、禁用、已选择状态

id：`wb-select-rule-1` · must / confirmed

支持单选、多选以及默认、悬浮、聚焦、禁用、已选择状态。v-model始终使用值数组；options为{value,label,disabled?}数组。

**适用条件**：单选或多选已有选项

### 默认高度32px、默认宽度296px，一般对应4栅格

id：`wb-select-rule-2` · must / confirmed

默认高度32px；独立使用默认宽度296px，296px不是最小宽度。Modal/Drawer内容字段默认填满可用宽度；FormItem沿用字段的自适应宽度，四栅格由Form/Grid父容器决定。字段容器可通过--select-field-width提供宽度，显式width仍优先；工具栏行保留独立默认宽度，内联窄字段显式指定width。组件不自行推断页面位置。

**适用条件**：单选或多选已有选项

### 默认文案“请选择”，占位文本色；选中值用主文本色

id：`wb-select-rule-3` · must / confirmed

默认文案“请选择”，占位文本色；选中值用主文本色。默认左右内边距12px，箭头10×10px，默认次级文本色、展开激活色；展开本身不改变描边。

**适用条件**：单选或多选已有选项

### 多选标签高24px，在32px容器内垂直居中

id：`wb-select-rule-4` · must / confirmed

多选标签高24px，在32px容器内垂直居中。标签左外边距4px、标签自身左右内边距8px、标签间距8px；首个标签文字距左侧12px，箭头右边距12px。

**适用条件**：单选或多选已有选项

### 单个标签超过7字符显示前7字符加省略号，悬停显示全文；放不下的末尾标签收

id：`wb-select-rule-5` · must / confirmed

单个标签超过7字符显示前7字符加省略号，悬停显示全文；放不下的末尾标签收起为+N，保持已显示标签宽度。从+N到箭头前的剩余区域作为悬浮热区，在选择器上方用带下指箭头的气泡逐个展示被收起的标签；气泡内标签保留完整填充容器和全文提示。单选及选项长文省略并保留全文提示。

**适用条件**：单选或多选已有选项

### 面板距触发器4px、内部间距4px、无描边；选项仅悬浮或键盘聚焦时有弱填

id：`wb-select-rule-6` · must / confirmed

面板距触发器4px、内部间距4px、选项高36px、无描边；选项仅悬浮或键盘聚焦时有弱填充，选中项不叠加背景。单选选中显示勾，多选复用已批准Checkbox的ChoiceMark，图文间距8px，整行只有一个option交互入口。

**适用条件**：单选或多选已有选项

### 默认描边color-border，悬浮color-border-hove

id：`wb-select-rule-7` · must / confirmed

可见标签、必填标记、帮助文本和错误反馈统一由FormItem绘制；裸Select的label仅提供可访问名称，搜索筛选可直接使用裸Select。字段内实际combobox同时连接字段标签与完整选值名称，listbox连接字段标签。

**适用条件**：单选或多选已有选项

### 支持基本打开关闭、单选多选、方向键与Escape

id：`wb-select-rule-8` · must / confirmed

支持基本打开关闭、单选多选、方向键与Escape。选项级禁用独立于整体禁用，禁用项不响应选择且跳过键盘焦点。完整选值保留可访问名称。

**适用条件**：单选或多选已有选项

### 本版本不提供搜索、清空、全选、标签删除、远程选项、浮层翻转等额外能力；新

id：`wb-select-rule-9` · must / confirmed

本版本不提供搜索、清空、全选、标签删除、远程选项、浮层翻转等额外能力；新增交互与样式单独评审。showPanel仅供预览检查，不作为业务交互模式。

**适用条件**：单选或多选已有选项

### Select面板与+N明细的用户确认圆角

id：`wb-select-panel-radius-20261025` · must / confirmed

Select下拉面板主体使用Foundation radius-md（6px）；Select触发器与选项行保持各自既有圆角。正式Select不提供标签删除API，因此正式组件的静态+N明细使用Tooltip及radius-sm（4px）；Studio可删除扩展的+N明细使用Popover及radius-md（6px），不将删除能力加入正式Select API。保留4px标签内容内距与间距、宽度收紧、箭头锚定及扩展已有删除行为。

**适用条件**：Select下拉面板或多选标签+N明细

### 组件依赖

`wb-checkbox`、`wb-tooltip`

### Foundation 引用

`color-border`、`color-border-hover`、`color-border-focus`、`color-border-disabled`、`color-text-primary`、`color-text-placeholder`、`color-text-secondary`、`color-text-disabled`、`color-icon-disabled`、`color-fill-default`、`color-fill-hover`、`color-fill-subtle-disabled`、`color-surface-card-default`、`color-info-primary-subtle`、`color-text-action`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`radius-sm`、`radius-md`、`radius-lg`、`shadow-sm`、`font-body-m`、`font-body-s`、`font-headline-m`、`color-surface-overlay`、`shadow-base`

### 选型

选项数量较少且需要直接比较时，优先使用单选框或复选框；候选较多或表单布局需要节省空间时使用Select。

- 单选和多选均以数组形式传递modelValue；单选数组最多包含一个值。

- 正式WorkbenchSelect不提供搜索、清空、全选、标签删除、远程选项或浮层翻转。

- WorkbenchSelectExtensions.vue中的defaultValue、searchable、clearable、removable、size、tagsLayout、分组和缩略图等只服务于Studio候选演示，不属于公开WorkbenchSelect API。

### 设计结构与排版

正式选择框默认32px高，独立使用默认宽296px；296px不是最小宽度。Modal和Drawer中的字段填满可用宽度，Form/Grid父容器负责栅格宽度。

- 字段标签、必填标记、错误和辅助说明由WorkbenchFormItem负责；裸控件的label用于可访问名称。

- 选项使用value、label和可选disabled；整行只有一个选项交互入口。多选通过已批准复选标记表达选择。

- 正式组件按已批准规则收起溢出标签为+N并保留可访问的完整名称；不将Studio候选的多行、可删标签等行为描述为正式能力。

- 面板和字段沿用已批准的描边、状态色、圆角、阴影及图标规则；页面位置由容器决定，组件不自行推断。

### 交互与键盘

打开面板后使用方向键移动选项，Enter或Space选择；Escape关闭面板。焦点离开选择器或其字段区域时关闭面板。

- 单选选择后提交一个值的数组并关闭；多选选择后更新数组并保持多选流程。

- 整体禁用或单个选项disabled时不可选择；键盘移动跳过禁用项。

- 焦点和悬浮状态由真实交互产生；state="disabled"用于禁用，不通过state伪造focus或hover。

- showPanel仅供预览检查，不作为业务交互模式。

### 使用边界与职责

WorkbenchSelect只发出modelValue更新意图，不排序或远程加载候选数据，也不承担表单提交和裸控件验证。调用方负责维护候选项、提交和业务校验。

- 多选标签删除、搜索、清空等额外交互属于独立Studio候选扩展；不得从正式WorkbenchSelect导入或依赖这些候选属性。

- 通过WorkbenchFormItem组合字段时由表单项绘制标签和说明；独立使用时提供label作为可访问名称。

- WorkbenchSelect没有公开具名插槽；候选扩展也不改变正式Catalog API。

### 包内关联引用

```json
[
  {
    "label": "已批准Select规范",
    "href": "#rules"
  },
  {
    "label": "Studio候选扩展组件",
    "href": "/preview/select?view=examples"
  }
]
```
