<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 徽标 Badge — `WorkbenchBadge`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-badge`](<../../workbench/wb-badge.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-badge",
  "kind": "component",
  "version": "1.0.0",
  "summary": "在头像、图标或按钮附近提示未读数或存在新内容；徽标依附于默认插槽中的主体。",
  "useWhen": ["附着在宿主上提示新状态或数量；内联筛选计数"],
  "avoidWhen": ["代替操作按钮或承载完整业务状态说明","未经验证的生产目标"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchBadge"},
  "props": {
    "variant": {"type":"String","default":"dot","enum":["dot","number"]},
    "value": {
      "type": "Number",
      "default": {"kind":"undefined"},
      "validator": {"kind":"unknown","expression":"value => Number.isInteger(value)"}
    },
    "ariaLabel": {"type":"String","default":""},
    "hidden": {"type":"Boolean","default":false},
    "placement": {"type":"String","default":"corner","enum":["corner","inline"]}
  },
  "events": [],
  "eventDetails": null,
  "slots": ["default"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {
    "variant": "dot显示点状提示；number显示计数。Workbench Studio readingPilot.variant 控件选择这两种真实Badge变体。",
    "value": "number徽标的整数计数值。",
    "ariaLabel": "徽标状态的可访问描述。",
    "hidden": "隐藏徽标内容，同时保留默认插槽主体。",
    "placement": "corner附着主体角点；inline与主体行内排列。"
  },
  "eventNotes": {},
  "slotNotes": {"default":{"scope":"被徽标附着的头像、图标或按钮等主体。","description":"交互语义由插槽主体提供，Badge不代替主体的可访问名称。"}}
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-badge-rule-1",
      "title": "尺寸与数值",
      "text": "点状最终外径7px；数字最终高度17px，超过99显示99+，保留完整可访问数值；非正整数或hidden隐藏数字徽标。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用徽标 Badge"],
      "references": []
    },
    {
      "id": "wb-badge-rule-2",
      "title": "交互边界",
      "text": "Badge不响应指针操作，点击焦点由宿主负责；非未读数量须通过ariaLabel声明用途。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用徽标 Badge"],
      "references": []
    },
    {
      "id": "wb-badge-rule-3",
      "title": "定位",
      "text": "角点数字右边缘固定，额外宽度向左增长；inline位于正常文档流，外部间距由父级负责。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用徽标 Badge"],
      "references": []
    }
  ],
  "dependencies": [],
  "foundationKeys": ["color-error","color-text-inverse","font-body-s","radius-full"],
  "intro": "在头像、图标或按钮附近提示未读数或存在新内容；徽标依附于默认插槽中的主体。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["有可展示的数字时使用number；只表达存在待处理内容时使用dot。更多上下文应通过相邻文字或可访问名称提供。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["default插槽提供定位主体，placement控制角点或行内位置；hidden隐藏徽标但不移除主体。数字值由调用方保证为整数。"],
      "bullets": []
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": [
        "徽标自身不是操作控件；键盘交互由插槽内主体承载。ariaLabel为辅助技术描述徽标状态。高级筛选使用WorkbenchButton文本操作、WorkbenchCheckbox状态、WorkbenchBadge选中计数及WorkbenchIcon披露箭头；按钮只展开/收起筛选，不触发消息清零。"
      ],
      "bullets": []
    },
    {
      "id": "advanced-filter-composition",
      "title": "高级筛选组合消费映射",
      "paragraphs": [
        "WorkbenchCheckbox 的两个 v-model 值经过 selectedCount 计算后映射到 inline WorkbenchBadge.value；取消勾选会更新计数，计数为0时由真实 Badge 规则隐藏徽标。WorkbenchButton aria-expanded 控制筛选面板展开/收起，WorkbenchIcon 通过按钮 #icon 插槽提供注册箭头。该按钮只切换筛选面板，不触发消息清零。"
      ],
      "bullets": []
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchBadge（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"徽标 Badge组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-example",
  "title": "未读消息徽标",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-badge",
    "scenarioId": "badge",
    "exampleId": "controlled-example",
    "codeSha256": "sha256:2b95a5c5f4b21978ee0eb302c8a87bde0deacc78bf6fba9252091023801525a9"
  },
  "description": "未读消息徽标业务场景的完整Vue示例，包含公开组件导入和所需数据。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { WorkbenchBadge, WorkbenchButton, WorkbenchIcon } from '@workbench/ui-vue3'
const unreadCount = 3
</script>
<template>
  <WorkbenchBadge variant="number" :value="unreadCount" aria-label="3条未读消息"><WorkbenchButton appearance="icon" aria-label="消息"><template #icon><WorkbenchIcon name="WB-TOP-NAV/action/message_20px" size="20" /></template></WorkbenchButton></WorkbenchBadge>
</template>
```
