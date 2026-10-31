<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6) — do not edit. -->

# 日期选择 DatePicker — `WorkbenchDatePicker`

资产：`wb-date-picker` · 类型：`component` · 资产合同版本：`1.0.0`

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`75b8e1c367077ff9a0e50ac7cb115868a2a7b3f6` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

## 组件预览

[在 Studio 中查看](http://localhost:4173/preview/WB-DATE-PICKER-V1/date-picker?view=preview)

用于选择日期、月份、年份或日期时间；支持单值与日期范围。值通过受控modelValue提交。

公开入口：`@workbench/ui-vue3` → `WorkbenchDatePicker`

## 变体与状态

状态：`unsupported`。声明值属于 Studio 案例数据，不自动等于公开组件 props。

[在 Studio 中查看](http://localhost:4173/preview/WB-DATE-PICKER-V1/date-picker?view=variants)

unsupported：CUSTOM_VARIANT_GALLERY：A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery.

### 包内声明

```json
{
  "states": [
    {
      "id": "empty",
      "label": "未选择"
    },
    {
      "id": "hover",
      "label": "悬浮"
    },
    {
      "id": "focused",
      "label": "聚焦"
    },
    {
      "id": "selected",
      "label": "已选择"
    },
    {
      "id": "disabled",
      "label": "禁用"
    }
  ],
  "controls": [
    {
      "id": "pickerType",
      "label": "选择单位",
      "type": "select",
      "default": "date",
      "options": [
        {
          "value": "date",
          "label": "日期"
        },
        {
          "value": "month",
          "label": "月份"
        },
        {
          "value": "year",
          "label": "年份"
        },
        {
          "value": "datetime",
          "label": "日期与时间"
        }
      ]
    },
    {
      "id": "range",
      "label": "范围选择",
      "type": "boolean",
      "default": false
    },
    {
      "id": "size",
      "label": "组件尺寸",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认尺寸 32px"
        },
        {
          "value": "small",
          "label": "小尺寸 28px"
        }
      ]
    },
    {
      "id": "shortcuts",
      "label": "快捷日期",
      "type": "boolean",
      "default": false
    }
  ],
  "pilotControls": [
    {
      "id": "range",
      "label": "范围选择",
      "type": "boolean",
      "default": false,
      "group": "内容与选择"
    },
    {
      "id": "shortcuts",
      "label": "快捷日期",
      "type": "boolean",
      "default": false,
      "group": "内容与选择"
    },
    {
      "id": "pickerType",
      "label": "选择单位",
      "type": "select",
      "default": "date",
      "options": [
        {
          "value": "date",
          "label": "日期"
        },
        {
          "value": "month",
          "label": "月份"
        },
        {
          "value": "year",
          "label": "年份"
        },
        {
          "value": "datetime",
          "label": "日期与时间"
        }
      ],
      "group": "类型与尺寸"
    },
    {
      "id": "size",
      "label": "组件尺寸",
      "type": "select",
      "default": "default",
      "options": [
        {
          "value": "default",
          "label": "默认尺寸 32px"
        },
        {
          "value": "small",
          "label": "小尺寸 28px"
        }
      ],
      "group": "类型与尺寸"
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
    "today",
    "units",
    "single",
    "range",
    "regular",
    "small"
  ],
  "explicitCaseIds": [],
  "loopExpressions": [
    "item in units"
  ]
}
```

## 使用场景

包内未提供对应 Studio 路由。

**适用**：日期选择器 DatePicker相关交互与状态展示

**不适用**：未经独立生产接入与设计验收直接用于生产交付

官方来源 SFC：supported。

### 示例：日期筛选

id：`date-filter` · portability：`portable` · owner：`wb-date-picker`

受控日期过滤器；查询执行由消费方决定。

Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchDatePicker } from "@workbench/ui-vue3"
const selectedDate = ref('2026-10-24')
</script>
<template>
  <WorkbenchDatePicker v-model="selectedDate" type="date" aria-label="创建日期" />
  <output>当前筛选：{{ selectedDate }}</output>
</template>
```

## 使用规范与API

[在 Studio 中查看](http://localhost:4173/preview/WB-DATE-PICKER-V1/date-picker?view=usage)

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| ariaDescribedby | String |  |  | 关联辅助说明元素ID。 |
| ariaLabel | String | 选择日期 |  | 日期选择控件可访问名称。 |
| defaultOpen | Boolean |  |  | 非受控时的初始面板展开状态。 |
| disabled | Boolean |  |  | 禁用日期修改。 |
| disabledDate | Function |  |  | 同步日期判定函数；返回禁用结果时该日期不可选。 |
| inline | Boolean |  |  | 将面板固定嵌入而非作为普通浮层展开。 |
| invalid | Boolean |  |  | 声明控件存在错误状态。 |
| max | String |  |  | 可选日期上界。 |
| min | String |  |  | 可选日期下界。 |
| modelValue | String \| Array |  |  | 受控日期值；range模式为起止值数组。 |
| name | String |  |  | 设置隐藏表单字段名。 |
| placeholder | String |  |  | 未选择时的提示文本。 |
| previewState | String | default |  | Studio预览状态参数。 |
| range | Boolean |  |  | 启用双端点范围选择。 |
| shortcuts | Boolean \| Array | false |  | 启用快捷项或提供快捷项配置。 |
| showTime | Boolean |  |  | 在日期选择中启用时间选择。 |
| size | String | default |  | default或small选择框尺寸。 |
| today | Date | {"kind":"function"} |  | 今天的日期参考值，用于面板标识。 |
| type | String | date | date / month / year / datetime | date、month、year或datetime，决定选择精度。 |

### Events

- `update:modelValue`：选定日期值或范围数组。；选值完成并提交时发出。

- `change`：已提交的日期值。；有效日期值发生提交后发出。

- `clear`：无。；用户清除当前选择后发出。

- `openChange`：布尔展开状态。；日期面板打开或关闭时发出。

### 实例成员

- `focus(): void;`

- `open(): Promise<void>;`

- `close(restoreFocus?: boolean): void;`

### 同族导出：`WorkbenchDatePanel`

| 名称 | 类型 | 默认 | 可选值 | 说明 |
| --- | --- | --- | --- | --- |
| hoverValue | String |  |  |  |
| isDisabled | Function | {"kind":"function"} |  |  |
| range | Boolean |  |  |  |
| selected | Array | {"kind":"function"} |  |  |
| showNext | Boolean | true |  |  |
| showPrev | Boolean | true |  |  |
| today * | Date |  |  |  |
| view | String | date |  |  |
| visibleDate * | Date |  |  |  |
| yearStart | Number |  |  |  |

### Events

- `choose`

- `navigate`

- `changeView`

- `hover`

### 实例成员

- `focusInitial(): void;`

### 规则

包内未提供规则；不补写设计结论。

### Foundation 引用

`spacing-component-sm`

### 选型

日期使用date；按月或年归档时使用month或year；需要日期和时分选择时使用datetime。

- 单值场景将modelValue设为字符串；range=true时以两个端点组成数组。

- 日期筛选需要快捷范围时可配置shortcuts。

### 设计结构与排版

单面板宽360px；范围选择并排显示两个面板。选择框默认32px，小尺寸28px。

- 日期面板固定周日开始并显示六周；月份、年份用各自精度网格。

- min、max和disabledDate共同决定可选边界；快捷栏由shortcuts控制。

- inline适用于固定嵌入面板；默认浮层由组件管理。

### 交互与键盘

日期、月份或年份选择后即提交；日期时间的时分秒先暂存，需确认后提交。

- 支持方向键、Home/End、PageUp/PageDown和Escape；禁用日期不能通过键盘选中。

- 手动输入在失焦或Enter时规范化；无法解析或不可选的值恢复原值。

- 选择、清除或取消后焦点返回输入触发器。

### 使用边界与职责

组件输出标准化日期值并发出change；业务时区、保存、查询及校验由消费方负责。

- 提供name可加入隐藏表单字段；无可见标签时提供ariaLabel。

- disabledDate用于同步判定单个日期，不承担远程可用性请求。

- 当前适配为preview-vue3，不能推断生产框架资格。

### 包内关联引用

```json
[
  {
    "label": "日期选择规范",
    "href": "#rules"
  }
]
```
