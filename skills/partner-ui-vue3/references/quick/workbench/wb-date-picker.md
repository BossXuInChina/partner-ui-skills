<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 日期选择 DatePicker — `WorkbenchDatePicker`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-date-picker`](<../../workbench/wb-date-picker.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-date-picker",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于选择日期、月份、年份或日期时间；支持单值与日期范围。值通过受控modelValue提交。",
  "useWhen": ["日期选择器 DatePicker相关交互与状态展示"],
  "avoidWhen": ["未经独立生产接入与设计验收直接用于生产交付"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "usageStatus": "supported",
  "variantStatus": "unsupported",
  "variantUnsupported": [
    {
      "code": "CUSTOM_VARIANT_GALLERY",
      "reason": "A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery."
    }
  ]
}
```

未声明或为空：unsupported、usageUnsupported、caseSemantics（不代表支持）

## 公开 API

包内声明原样列出；null 与“未声明或为空”字段不代表支持，不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchDatePicker"},
  "props": {
    "modelValue": {"type":["String","Array"],"default":""},
    "type": {"type":"String","default":"date","enum":["date","month","year","datetime"]},
    "range": {"type":"Boolean"},
    "showTime": {"type":"Boolean"},
    "disabled": {"type":"Boolean"},
    "size": {"type":"String","default":"default"},
    "name": {"type":"String"},
    "ariaLabel": {"type":"String","default":"选择日期"},
    "ariaDescribedby": {"type":"String"},
    "invalid": {"type":"Boolean"},
    "placeholder": {"type":"String"},
    "min": {"type":"String"},
    "max": {"type":"String"},
    "disabledDate": {"type":"Function"},
    "shortcuts": {"type":["Boolean","Array"],"default":false},
    "inline": {"type":"Boolean"},
    "defaultOpen": {"type":"Boolean"},
    "dateMarkers": {"type":"Object","default":null},
    "showEmptyMarkers": {"type":"Boolean"},
    "fluid": {"type":"Boolean"},
    "flatInline": {"type":"Boolean"},
    "showInput": {"type":"Boolean","default":true},
    "previewState": {"type":"String","default":"default"},
    "today": {"type":"Date","default":{"kind":"function"}}
  },
  "events": ["update:modelValue","change","clear","openChange"],
  "exposed": [{"name":"focus","declaration":"focus(): void;"},{"name":"open","declaration":"open(): Promise<void>;"},{"name":"close","declaration":"close(restoreFocus?: boolean): void;"}],
  "family": [
    {
      "assetId": "wb-date-picker",
      "independentApproval": false,
      "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchDatePanel"},
      "props": {
        "visibleDate": {"type":"Date","required":true},
        "view": {"type":"String","default":"date"},
        "yearStart": {"type":"Number"},
        "selected": {"type":"Array","default":{"kind":"function"}},
        "range": {"type":"Boolean"},
        "hoverValue": {"type":"String","default":""},
        "today": {"type":"Date","required":true},
        "isDisabled": {"type":"Function","default":{"kind":"function"}},
        "showPrev": {"type":"Boolean","default":true},
        "showNext": {"type":"Boolean","default":true},
        "dateMarkers": {"type":"Object","default":null},
        "showEmptyMarkers": {"type":"Boolean"},
        "fluid": {"type":"Boolean"}
      },
      "events": ["choose","navigate","changeView","hover"],
      "slots": [],
      "slotPatterns": [],
      "exposed": [{"name":"focusInitial","declaration":"focusInitial(): void;"}]
    }
  ],
  "propNotes": {
    "modelValue": "受控日期值；range模式为起止值数组。",
    "type": "date、month、year或datetime，决定选择精度。",
    "range": "启用双端点范围选择。",
    "showTime": "在日期选择中启用时间选择。",
    "size": "default或small选择框尺寸。",
    "min": "可选日期下界。",
    "max": "可选日期上界。",
    "disabledDate": "同步日期判定函数；返回禁用结果时该日期不可选。",
    "shortcuts": "启用快捷项或提供快捷项配置。",
    "inline": "将面板固定嵌入而非作为普通浮层展开。",
    "name": "设置隐藏表单字段名。",
    "ariaLabel": "日期选择控件可访问名称。",
    "disabled": "禁用日期修改。",
    "ariaDescribedby": "关联辅助说明元素ID。",
    "invalid": "声明控件存在错误状态。",
    "placeholder": "未选择时的提示文本。",
    "defaultOpen": "非受控时的初始面板展开状态。",
    "previewState": "Studio预览状态参数。",
    "today": "今天的日期参考值，用于面板标识。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"选定日期值或范围数组。","timing":"选值完成并提交时发出。"},
    "change": {"payload":"已提交的日期值。","timing":"有效日期值发生提交后发出。"},
    "clear": {"payload":"无。","timing":"用户清除当前选择后发出。"},
    "openChange": {"payload":"布尔展开状态。","timing":"日期面板打开或关闭时发出。"}
  }
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "foundationKeys": ["spacing-component-sm"],
  "intro": "用于选择日期、月份、年份或日期时间；支持单值与日期范围。值通过受控modelValue提交。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["日期使用date；按月或年归档时使用month或year；需要日期和时分选择时使用datetime。"],"bullets":["单值场景将modelValue设为字符串；range=true时以两个端点组成数组。","日期筛选需要快捷范围时可配置shortcuts。"]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["单面板宽360px；范围选择并排显示两个面板。选择框默认32px，小尺寸28px。"],
      "bullets": ["日期面板固定周日开始并显示六周；月份、年份用各自精度网格。","min、max和disabledDate共同决定可选边界；快捷栏由shortcuts控制。","inline适用于固定嵌入面板；默认浮层由组件管理。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["日期、月份或年份选择后即提交；日期时间的时分秒先暂存，需确认后提交。"],
      "bullets": ["支持方向键、Home/End、PageUp/PageDown和Escape；禁用日期不能通过键盘选中。","手动输入在失焦或Enter时规范化；无法解析或不可选的值恢复原值。","选择、清除或取消后焦点返回输入触发器。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件输出标准化日期值并发出change；业务时区、保存、查询及校验由消费方负责。"],
      "bullets": ["提供name可加入隐藏表单字段；无可见标签时提供ariaLabel。","disabledDate用于同步判定单个日期，不承担远程可用性请求。","当前适配为preview-vue3，不能推断生产框架资格。"]
    }
  ],
  "related": [{"label":"日期选择规范","href":"#rules"}]
}
```

未声明或为空：rules、dependencies（不代表支持）

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "date-filter",
  "title": "日期筛选",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-date-picker",
    "scenarioId": "date-picker",
    "exampleId": "date-filter",
    "codeSha256": "sha256:11bed35ab3b73f3ffd1837e42e4b0ae95b171cae147e1ba547f3bed5002c72da"
  },
  "description": "受控日期过滤器；查询执行由消费方决定。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

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
