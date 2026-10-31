<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (1255ff9747cef05c6558318547e69acbbf71b928) — do not edit. -->

# 文本输入 Input — `WorkbenchInput`

资产：`wb-input` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`1255ff9747cef05c6558318547e69acbbf71b928` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-INPUT-V1/input?view=preview)

预览页聚焦一个可切换类型的输入实例，可试填、主动校验并查看事件反馈；变体页按输入类型和交互状态并排比较，原完整演示仍可展开查看。

公开入口：`@workbench/ui-vue3` → `WorkbenchInput`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-INPUT-V1/input?view=variants)

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
      "id": "focus",
      "label": "聚焦"
    },
    {
      "id": "disabled",
      "label": "禁用"
    },
    {
      "id": "error",
      "label": "错误"
    }
  ],
  "controls": [
    {
      "id": "showTrailingIcon",
      "label": "显示后置图标",
      "type": "boolean",
      "default": false
    },
    {
      "id": "leftLabel",
      "label": "标签放在左侧",
      "type": "boolean",
      "default": false
    },
    {
      "id": "showHint",
      "label": "显示帮助文本",
      "description": "关闭后不占空间，错误校验信息仍正常显示",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showPrefix",
      "label": "显示前缀筛选",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showSuffix",
      "label": "显示后缀筛选",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showPrefixIcon",
      "label": "显示前缀图标",
      "description": "前缀筛选文字左侧的14px图标",
      "type": "boolean",
      "default": true
    },
    {
      "id": "showSuffixIcon",
      "label": "显示后缀图标",
      "description": "后缀筛选文字左侧的14px图标",
      "type": "boolean",
      "default": true
    },
    {
      "id": "prefixDisabled",
      "label": "禁用前缀筛选",
      "type": "boolean",
      "default": false
    },
    {
      "id": "suffixDisabled",
      "label": "禁用后缀筛选",
      "type": "boolean",
      "default": false
    },
    {
      "id": "resizable",
      "label": "允许拖拽调整高度",
      "description": "多行输入框仅垂直缩放，最小高度88px；禁用时不可拖拽",
      "type": "boolean",
      "default": true
    }
  ],
  "pilotControls": [
    {
      "id": "inputMode",
      "label": "输入类型",
      "type": "select",
      "default": "text",
      "options": [
        {
          "value": "text",
          "label": "单行文本"
        },
        {
          "value": "textarea",
          "label": "多行文本"
        },
        {
          "value": "password",
          "label": "密码"
        },
        {
          "value": "fixed-unit",
          "label": "固定单位"
        },
        {
          "value": "prefix-unit",
          "label": "前缀与可选单位"
        }
      ],
      "group": "类型与尺寸"
    },
    {
      "id": "leftLabel",
      "label": "标签放在左侧",
      "type": "boolean",
      "default": false,
      "group": "结构与插槽"
    },
    {
      "id": "showHint",
      "label": "显示帮助文本",
      "type": "boolean",
      "default": true,
      "group": "结构与插槽"
    },
    {
      "id": "showTrailingIcon",
      "label": "显示后置图标",
      "type": "boolean",
      "default": false,
      "group": "结构与插槽",
      "when": {
        "inputMode": [
          "text"
        ]
      }
    },
    {
      "id": "resizable",
      "label": "允许拖拽调整高度",
      "type": "boolean",
      "default": true,
      "group": "结构与插槽",
      "when": {
        "inputMode": [
          "textarea"
        ]
      }
    },
    {
      "id": "showPrefix",
      "label": "显示前缀筛选",
      "type": "boolean",
      "default": true,
      "group": "结构与插槽",
      "when": {
        "inputMode": [
          "prefix-unit"
        ]
      }
    },
    {
      "id": "showSuffix",
      "label": "显示后缀筛选",
      "type": "boolean",
      "default": true,
      "group": "结构与插槽",
      "when": {
        "inputMode": [
          "prefix-unit"
        ]
      }
    },
    {
      "id": "showPrefixIcon",
      "label": "显示前缀图标",
      "type": "boolean",
      "default": true,
      "group": "结构与插槽",
      "when": {
        "inputMode": [
          "prefix-unit"
        ],
        "showPrefix": [
          true
        ]
      }
    },
    {
      "id": "showSuffixIcon",
      "label": "显示后缀图标",
      "type": "boolean",
      "default": true,
      "group": "结构与插槽",
      "when": {
        "inputMode": [
          "prefix-unit"
        ],
        "showSuffix": [
          true
        ]
      }
    },
    {
      "id": "prefixDisabled",
      "label": "禁用前缀筛选",
      "type": "boolean",
      "default": false,
      "group": "结构与插槽",
      "when": {
        "inputMode": [
          "prefix-unit"
        ],
        "showPrefix": [
          true
        ]
      }
    },
    {
      "id": "suffixDisabled",
      "label": "禁用后缀筛选",
      "type": "boolean",
      "default": false,
      "group": "结构与插槽",
      "when": {
        "inputMode": [
          "prefix-unit"
        ],
        "showSuffix": [
          true
        ]
      }
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
    "typeExamples": [
      {
        "id": "text",
        "label": "单行文本",
        "type": "text",
        "value": "伙伴中心名称",
        "description": "简短、单行内容。"
      },
      {
        "id": "textarea",
        "label": "多行文本",
        "type": "textarea",
        "value": "用于补充说明的多行内容",
        "description": "正文可换行并显示字符计数。"
      },
      {
        "id": "password",
        "label": "密码",
        "type": "password",
        "value": "example-pass",
        "description": "默认掩码，可切换明文。"
      },
      {
        "id": "fixed-unit",
        "label": "固定单位",
        "type": "text",
        "value": "120",
        "unit": "元",
        "description": "单位固定显示在输入值旁。"
      },
      {
        "id": "prefix-unit",
        "label": "前缀与可选单位",
        "type": "text",
        "value": "30",
        "unit": "天",
        "description": "前缀及单位从单选菜单中选择。"
      }
    ],
    "states": [
      {
        "id": "default",
        "label": "默认",
        "value": "可编辑内容",
        "message": ""
      },
      {
        "id": "hover",
        "label": "悬浮",
        "value": "指针悬停",
        "message": ""
      },
      {
        "id": "focus",
        "label": "聚焦",
        "value": "键盘焦点",
        "message": ""
      },
      {
        "id": "disabled",
        "label": "禁用",
        "value": "不可编辑",
        "message": ""
      },
      {
        "id": "error",
        "label": "错误",
        "value": "需要修正",
        "message": "输入内容不符合要求"
      }
    ]
  },
  "dynamicBindings": [
    "typeValues",
    "typePrefixes",
    "typeUnits",
    "stateValues"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "item in typeExamples",
    "item in states"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：单行、多行、密码及单位输入

**不适用**：未经适配验证的内部框架生产实现

官方来源 SFC：supported。

### 示例：受控文本字段

id：`controlled-text` · portability：`portable` · owner：`wb-input`

完整展示受控值、同步校验和字段语义；实际表单标签可由外层字段组件提供。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchInput } from "@workbench/ui-vue3"
const account = ref('')
const validateAccount = (value) => value ? "" : "请输入账号"
</script>
<template>
  <WorkbenchInput v-model="account" name="account" aria-label="账号" :max-length="24" :validate="validateAccount" />
  <output>已输入 {{ [...account].length }} 个字符</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-INPUT-V1/input?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaLabel | String |  |  | 控件可访问名称。 |
| disabled | Boolean |  |  | 禁用输入及其内部操作。 |
| maxLength | Number |  |  | 按Unicode码点计数并参与校验，不设置原生maxlength。 |
| modelValue | String |  |  | 受控文本值，通过update:modelValue同步更新。 |
| name | String |  |  | 加入同名原生表单字段。 |
| placeholder | String | 请输入 |  | 输入为空时显示的提示文案。 |
| prefixDisabled | Boolean |  |  | 仅禁用前缀选项并关闭其面板。 |
| prefixOptions | Array | {"kind":"function"} |  | 前缀单选项；为空时不显示前缀选择段。 |
| prefixValue | String |  |  | 前缀筛选受控值。 |
| required | Boolean |  |  | 输入原生必填约束；字段提示与错误展示由FormItem统一负责。 |
| resizable | Boolean | true |  | 多行文本是否可垂直调整高度，默认开启。 |
| showPrefixIcon | Boolean | true |  | 是否显示前缀筛选图标。 |
| showSuffixIcon | Boolean | true |  | 是否显示后缀单位图标。 |
| showTrailingIcon | Boolean |  |  | 是否显示尾随图标；图标内容可由trailing-icon插槽提供。 |
| state | String | default |  | 输入状态展示参数；业务字段校验状态由validate与FormItem管理。 |
| suffixDisabled | Boolean |  |  | 仅禁用后缀单位选项并关闭其面板。 |
| type | String | text |  | text、textarea或password，分别对应单行、多行和掩码文本。 |
| unit | String |  |  | 当前受控单位值。 |
| unitFilterLabel | String | 筛选 |  | 单位选项筛选入口的可访问/显示文案。 |
| unitOptions | Array | {"kind":"function"} |  | 后缀单位单选项；为空时不显示单位选择段。 |
| validate | Function |  |  | 同步校验函数；应无副作用并返回错误字符串或空字符串。 |

### Events

- `update:modelValue`：新的文本值。；用户编辑文本后发出；输入法组合过程中不会提交中间值。

- `update:unit`：新选择的单位值。；用户选择或取消单位选项后发出。

- `update:prefixValue`：新的前缀选择值。；用户选择或取消前缀选项后发出。

- `validation`：{ valid, message }，分别表示校验是否通过及当前错误文案。；同步校验状态发生变化时通知字段层。

### Slots

- `prefix-icon`：无插槽参数。；替换前缀选择文字左侧图标。

- `trailing-icon`：无插槽参数。；提供单行输入的尾随图标。

- `suffix-icon`：无插槽参数。；替换后缀选择文字左侧图标。

### 实例成员

- `validate(): boolean;`

- `focus(): void;`

### 规则

### `type`: text / textarea / passwo

id：`wb-input-rule-1` · must / confirmed

`type`: text / textarea / password；`v-model`保存文本；placeholder默认“请输入”。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：Input只提供裸输入和原生required

id：`wb-input-rule-2` · must / confirmed

Input只提供裸输入和原生required；可见label、labelPosition、必填星号、hint和message统一由WorkbenchFormItem配置，搜索筛选可继续使用裸Input。

**适用条件**：单行、多行、密码及单位输入

### `showTrailingIcon`与`trailing-ico

id：`wb-input-rule-3` · must / confirmed

`showTrailingIcon`与`trailing-icon` Slot配置单行后置图标。

**适用条件**：单行、多行、密码及单位输入

### 单行32px，多行88px。正文至少三行；独立滚动区不遮挡右下计

id：`wb-input-rule-4` · must / confirmed

单行32px，多行88px。正文至少三行；独立滚动区不遮挡右下计数器。

**适用条件**：单行、多行、密码及单位输入

### `maxLength`仅用于计数和校验，不设置原生maxleng

id：`wb-input-rule-5` · must / confirmed

`maxLength`仅用于计数和校验，不设置原生maxlength；按Unicode码点计数，超出后当前计数标红。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：首次失焦校验；之后随输入重新校验。valid

id：`wb-input-rule-6` · must / confirmed

首次失焦校验；之后随输入重新校验。validate(value)返回错误文案或空字符串；validation事件返回valid及message。位于字段内时反馈交由FormItem，reset清除已触发状态，初始必填不显示错误。

**适用条件**：单行、多行、密码及单位输入

### 密码默认掩码，按钮切换显示/隐藏；disabled禁止编辑和按钮

id：`wb-input-rule-7` · must / confirmed

密码默认掩码，按钮切换显示/隐藏；disabled禁止编辑和按钮交互。

**适用条件**：单行、多行、密码及单位输入

### `unit`显示外部固定单位；`unitOptions`提供单选

id：`wb-input-rule-8` · must / confirmed

`unit`显示外部固定单位；`unitOptions`提供单选单位后缀，通过`update:unit`回传。复用Search筛选：再次选择已选项取消，支持Hover、Focus、禁用、方向键及Escape。

**适用条件**：单行、多行、密码及单位输入

### 错误色沿用Foundation color-error；正文沿用

id：`wb-input-rule-9` · must / confirmed

错误色沿用Foundation color-error；正文沿用14px/22px，计数使用本组件专属12px/12px；14px图标与已批准Search尺寸一致，复用Search参数。

**适用条件**：单行、多行、密码及单位输入

### 当前为已批准设计与Vue 3原型验证；内部UI框架通过后续适配层

id：`wb-input-rule-10` · must / confirmed

当前为已批准设计与Vue 3原型验证；内部UI框架通过后续适配层实现以上API语义。

**适用条件**：单行、多行、密码及单位输入

### 多行顶部内边距4px，与32px单行中的22px正文对齐；计数器

id：`wb-input-rule-11` · must / confirmed

多行顶部内边距4px，与32px单行中的22px正文对齐；计数器固定右下，正文与计数器上下分区，不预留右侧整列空间。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：可见错误提示和必填红星由FormItem统一

id：`wb-input-rule-12` · must / confirmed

可见错误提示和必填红星由FormItem统一绘制；Input不重复提供标签、星号或反馈节点，控件通过共享字段上下文连接label、描述和错误。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：帮助文本由FormItem.hint统一配置

id：`wb-input-rule-13` · must / confirmed

帮助文本由FormItem.hint统一配置，与错误反馈共用字段样式；内容以控件槽宽度为限换行。Input不自绘帮助文本。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：标签、控件与反馈间距统一遵循FormItem

id：`wb-input-rule-14` · must / confirmed

标签、控件与反馈间距统一遵循FormItem现有样式，Input不追加字段padding或反馈间距。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：帮助文本由FormItem.hint配置，未

id：`wb-input-rule-15` · must / confirmed

帮助文本由FormItem.hint配置，未传或为空时不显示、不占空间；预览显示帮助文本开关控制字段hint，错误反馈独立于该开关。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：FormItem使用共享8×22必填星资源

id：`wb-input-rule-16` · must / confirmed

WorkbenchFormItem使用项目内共享WorkbenchRequiredMark SVG资源，原始画布8×22px，保留资源内红色与光学垂直位置；在标签行内垂直居中并挂在文字左侧，不影响标签与输入框左对齐。Input不绘制必填星。

**适用条件**：单行、多行、密码及单位输入

### 前后缀可独立配置：`prefixOptions` / `unit

id：`wb-input-rule-17` · must / confirmed

前后缀可独立配置：`prefixOptions` / `unitOptions`为空则不显示该侧；`prefixDisabled` / `suffixDisabled`独立禁用，保留选值并关闭面板，不影响正文输入或另一侧。`showPrefixIcon` / `showSuffixIcon`默认true，分别控制筛选文案左侧14px图标，并可用`prefix-icon` / `suffix-icon` Slot替换，默认图标为`文件夹/尺寸=14`。默认未选择时文字和图标为二级色；展开时二者为一级色；选择后收起，文字保留一级色、图标恢复二级色。整体disabled优先。预览右侧提供显示及禁用开关。

**适用条件**：单行、多行、密码及单位输入

### `resizable`默认true，多行框通过右下角原生手柄仅垂

id：`wb-input-rule-18` · must / confirmed

`resizable`默认true，多行框通过右下角原生手柄仅垂直调整；初始及最小高度88px，关闭或禁用时不可拖拽。计数器向左避让手柄，宽度仍由父布局决定。

**适用条件**：单行、多行、密码及单位输入

### 计数器专属豁免：12px字号/12px行高，右侧12px、底部2

id：`wb-input-rule-19` · must / confirmed

计数器专属豁免：12px字号/12px行高，右侧12px、底部2px；正文和计数器上下分区，取消右侧整列预留。垂直滚动条10px轨道，滑块4px、两侧3px，靠容器右边。豁免限定本组件计数器选择器。

**适用条件**：单行、多行、密码及单位输入

### 滚动条默认填充：浅色#191919/20%，深色#F3F3F3/

id：`wb-input-rule-20` · must / confirmed

滚动条默认填充：浅色#191919/20%，深色#F3F3F3/30%，悬浮使用color-scrollbar-thumb-fill-hover（浅色#AEAEAE）；默认色归wb-scrollbar批准合同，不借用文字或分隔线Token。

**适用条件**：单行、多行、密码及单位输入

### 滚动条滑块使用radius-full胶囊圆角，长度变化时两端保持

id：`wb-input-rule-21` · must / confirmed

滚动条滑块使用radius-full胶囊圆角，长度变化时两端保持半圆。

**适用条件**：单行、多行、密码及单位输入

### 支持`name`参与原生FormData；无可见标签时提供`ar

id：`wb-input-rule-22` · must / confirmed

支持`name`参与原生FormData；无可见标签时提供`ariaLabel`。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：validate(value)、requir

id：`wb-input-rule-23` · must / confirmed

validate(value)、required、maxLength及字段错误接入原生setCustomValidity；原生validationMessage与字段当前错误一致，无效时阻止原生表单提交。ref.validate()主动校验并返回布尔值，ref.focus()定位输入。

**适用条件**：单行、多行、密码及单位输入

### 统一字段职责：外部错误通过FormItem.validat

id：`wb-input-rule-24` · must / confirmed

外部错误通过FormItem.validateStatus/message设置和清除，优先于本地校验与hint，不在输入时擅自清空服务器错误。禁用输入不参与有效性阻断。

**适用条件**：单行、多行、密码及单位输入

### compositionstart到compositionend期

id：`wb-input-rule-25` · must / confirmed

compositionstart到compositionend期间不提交中间文本或运行校验；组合结束提交完整文本。自动化覆盖合成组合事件，真实系统输入法仍需人工检查。

**适用条件**：单行、多行、密码及单位输入

### 同步校验函数必须无副作用并返回字符串。不支持Promise验证、

id：`wb-input-rule-26` · must / confirmed

同步校验函数必须无副作用并返回字符串。不支持Promise验证、原生form.reset自动重置受控值、输入掩码或文件输入；这些能力单独评审。

**适用条件**：单行、多行、密码及单位输入

### 纵向滚动滑块四边均留3px透明边框，配合padding-box和

id：`wb-input-rule-27` · must / confirmed

纵向滚动滑块四边均留3px透明边框，配合padding-box和radius-full，使可见4px滑块上下端保持半圆，避免仅左右留白产生扁椭圆。

**适用条件**：单行、多行、密码及单位输入

### 多行正文内容区左右内边距均为12px：左侧由容器提供，右侧由te

id：`wb-input-rule-28` · must / confirmed

多行正文内容区左右内边距均为12px：左侧由容器提供，右侧由实际滚动槽加textarea内边距组成，合计12px，不重复叠加；滚动条继续位于容器右侧，计数器布局不变。

**适用条件**：单行、多行、密码及单位输入

### 多行正文始终预留滚动槽（scrollbar-gutter: st

id：`wb-input-rule-29` · must / confirmed

多行正文始终预留滚动槽（scrollbar-gutter: stable），出现或消失滚动条时正文可用宽度保持不变，不因滚动条挤压而重新换行；12px正文内边距、独立计数区与靠右滚动条规则保持。

**适用条件**：单行、多行、密码及单位输入

### Input前后缀筛选面板圆角

id：`wb-input-affix-panel-radius-20261025` · must / confirmed

Input前缀与单位后缀筛选面板主体使用Foundation radius-md（6px）；输入框与筛选触发器保持各自既有圆角。

**适用条件**：使用Input前缀或单位后缀筛选

### 组件依赖

`wb-search`、`wb-scrollbar`

### Foundation 引用

`color-border`、`color-border-hover`、`color-border-focus`、`color-border-disabled`、`color-text-primary`、`color-text-placeholder`、`color-text-secondary`、`color-text-disabled`、`color-icon-placeholder`、`color-icon-secondary`、`color-icon-primary`、`color-icon-active`、`color-icon-disabled`、`color-fill-hover`、`color-fill-subtle-default`、`color-fill-subtle-disabled`、`color-surface-card-default`、`color-info-primary-subtle`、`spacing-component-xs`、`spacing-component-sm`、`spacing-component-md`、`spacing-component-lg`、`spacing-layout-container-inline`、`radius-sm`、`radius-md`、`radius-lg`、`shadow-base`、`font-body-m`、`font-headline-m`、`color-error`、`font-body-s`、`color-scrollbar-thumb-fill-hover`、`radius-full`

### 选型

短文本使用 text；需要多行内容使用 textarea；敏感文本使用 password。独立筛选或搜索也可使用裸输入控件。

- 需要统一标签、必填、说明或错误反馈时，将 Input 放入 WorkbenchFormItem。

- 成功与警告反馈不属于该输入校验状态。

### 设计结构与排版

单行默认高32px，多行初始高88px；多行正文与右下计数器分区显示，容器宽度由父布局决定。

- maxLength仅供码点计数与校验，不会设置原生maxlength；超出后当前计数标红。

- 前缀、后缀及单位选项分别配置；对应选项为空时该侧不显示。

- 多行resizable默认开启，只允许垂直拖动，最小高度为88px。

### 交互与键盘

密码默认掩码，可通过内置按钮切换显示；disabled会阻止输入及相关按钮操作。

- 同步validate(value)校验和required、maxLength接入原生约束；ref.validate()可主动校验并返回布尔值。

- 输入法组合期间不提交中间文本或校验，组合结束后提交完整文本。

- 前后缀和单位选项使用单选菜单；Escape关闭面板，独立禁用不影响正文输入或另一侧。

### 使用边界与职责

WorkbenchInput只提供输入控件；字段标签、必填星、提示及错误文案由WorkbenchFormItem维护。

- modelValue由调用方受控；组件不提供异步校验、输入掩码、文件输入或原生form.reset自动更新受控值。

- validate(value)必须同步、无副作用并返回字符串；不支持Promise校验。

- 提供name可将值纳入原生FormData；无可见标签时提供ariaLabel。

### 包内关联引用

```json
[
  {
    "label": "文本输入批准规范",
    "href": "#rules"
  }
]
```
