<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 标签 Tag — `WorkbenchTag`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-tag`](<../../workbench/wb-tag.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-tag",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用短文本标记属性、状态、分类或运营信息；标签可为静态内容，也可明确设为可交互按钮。",
  "useWhen": ["标记对象属性、短状态、分类或卡片运营信息"],
  "avoidWhen": ["表达长句、承载复杂操作或替代按钮","未经验证的生产目标"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "supported",
  "usageUnsupported": [],
  "variantStatus": "unsupported",
  "variantUnsupported": [
    {
      "code": "CUSTOM_VARIANT_GALLERY",
      "reason": "A custom gallery or indirect scenario factory owns the rendered cases; manifest declarations are preserved, but are not claimed as an exhaustive portable gallery."
    }
  ],
  "caseSemantics": null
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTag"},
  "props": {
    "label": {"type":["String","Number"],"required":true},
    "variant": {"type":"String","default":"basic","enum":["basic","status-subtle","status-dot","category","corner","status-primary"]},
    "size": {"type":"String","default":"medium","enum":["small","medium","large"]},
    "status": {"type":"String","default":"info","enum":["waiting","info","success","warning","alert","error","none"]},
    "categoryIndex": {
      "type": "Number",
      "default": 1,
      "validator": {"kind":"unknown","expression":"(value) => Number.isInteger(value) && value >= 1 && value <= 12"}
    },
    "cornerTone": {"type":"String","default":"new","enum":["new","hot","discount","off"]},
    "placement": {"type":"String","default":"top-left","enum":["top-left","top-right"]},
    "action": {"type":"String","default":"none","enum":["none","add","remove"]},
    "interactive": {"type":"Boolean","default":false},
    "selected": {"type":"Boolean","default":false},
    "disabled": {"type":"Boolean","default":false}
  },
  "events": ["select","add","remove"],
  "eventDetails": null,
  "slots": ["icon"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {
    "label": "标签显示文本或数字；必填，长内容按组件规则截断并保留全文提示。",
    "variant": "basic、状态、分类、角标等视觉语义。",
    "size": "small/medium/large三档尺寸。",
    "status": "status类标签的语义状态色。",
    "categoryIndex": "category类标签编号，支持1至12的整数。",
    "cornerTone": "corner标签的new/hot/discount/off语义。",
    "placement": "角标位于左上或右上。",
    "action": "Basic标签的none/add/remove动作形式。",
    "interactive": "是否渲染为可操作按钮；静态展示保持非聚焦。",
    "selected": "Basic交互标签的选中状态。",
    "disabled": "阻止交互并显示禁用状态。"
  },
  "eventNotes": {
    "select": {"payload":"{ label, selected, event }；selected仅在Basic类型中表示本次切换后的状态。","timing":"可交互标签激活时发出；selected仅在Basic中表示选中切换。"},
    "add": {"payload":"{ label, event }。","timing":"action为add的交互标签激活时发出。"},
    "remove": {"payload":"{ label, event }。","timing":"独立关闭按钮触发时发出；点击标签正文不删除。"}
  },
  "slotNotes": {"icon":{"scope":"标签前缀图标内容。","description":"用现有语义图标表达类别，不复制标签文字；Basic前置图标为10px，直接选择已登记的原生尺寸资产。"}}
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-tag-display-category",
      "title": "展示类归属",
      "text": "Tag属于展示类组件；表格、徽标、结构树、时间轴和头像在后续正式入库时也归入展示类。",
      "strength": "must",
      "status": "confirmed",
      "when": ["组织Workbench组件资产"],
      "references": []
    },
    {
      "id": "wb-tag-types",
      "title": "六种标签类型",
      "text": "支持基础、Subtle状态、点状状态、分类、角标和Primary状态六种类型。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用Tag"],
      "references": []
    },
    {
      "id": "wb-tag-controlled-actions",
      "title": "操作由父级受控",
      "text": "添加、删除和选择只发出事件，Tag不维护业务标签集合。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用可操作Tag"],
      "references": []
    },
    {
      "id": "wb-tag-truncation",
      "title": "七字符截断",
      "text": "超过7个用户可见字符时显示前7个字符加省略号，复用WorkbenchTooltip显示全文提示并绑定可访问描述；不使用原生title或伪元素提示。",
      "strength": "must",
      "status": "confirmed",
      "when": ["标签文本过长"],
      "references": []
    },
    {
      "id": "wb-tag-theme",
      "title": "独立主题颜色矩阵",
      "text": "Light与Dark使用本资产批准的颜色矩阵；Selected描边始终引用color-border-focus。",
      "strength": "must",
      "status": "confirmed",
      "when": ["展示Tag颜色与状态"],
      "references": []
    }
  ],
  "dependencies": ["wb-tooltip"],
  "foundationKeys": [
    "color-text-primary",
    "color-text-disabled",
    "color-icon-primary",
    "color-icon-disabled",
    "color-border-focus",
    "radius-sm",
    "font-body-s",
    "spacing-component-xs",
    "spacing-component-sm"
  ],
  "intro": "用短文本标记属性、状态、分类或运营信息；标签可为静态内容，也可明确设为可交互按钮。",
  "sections": [
    {
      "id": "selection",
      "title": "选型",
      "paragraphs": ["用于紧凑分类与状态标注；需要过滤集合时把interactive标签作为选择控件使用并由父级管理状态；多段说明不要塞入标签。"],
      "bullets": []
    },
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": [
        "variant决定基础、状态、分类或角标形态；size决定密度。Basic类型支持add/remove/selected；状态与分类标签可通过interactive触发操作并显示悬浮、按下和焦点，选中视觉仅属于Basic。角标用于静态附着展示。"
      ],
      "bullets": []
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": [
        "interactive时渲染原生按钮并支持键盘激活；disabled阻断事件。静态标签不进入Tab序列。超过7个可见字符时保留前7个字符并省略；全文提示复用WorkbenchTooltip，悬浮或键盘聚焦时显示，Escape关闭，不叠加原生title或伪元素提示。"
      ],
      "bullets": []
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchTag（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"标签 Tag组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "可筛选状态标签",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-tag",
    "scenarioId": "tag",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:d9fafd8bcc185f705b557e6a06871c156117e5319002e9483eb241320e42de96"
  },
  "description": "可筛选状态标签业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchTag } from '@workbench/ui-vue3'
const selected = ref(false)
</script>
<template>
  <WorkbenchTag label="已归档" variant="basic" interactive :selected="selected" @select="selected = !selected" />
</template>
```
