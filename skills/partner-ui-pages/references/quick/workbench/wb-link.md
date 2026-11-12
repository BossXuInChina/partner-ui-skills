<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 文字链接 Link — `WorkbenchLink`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-link`](<../../workbench/wb-link.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-link",
  "kind": "component",
  "version": "1.1.0",
  "summary": "用于跳转到页面、资源或地址。提交、切换、展开和收起等状态操作应使用Button。",
  "useWhen": ["表格中的页面或资源跳转","正文中的内嵌链接","独立文字链接"],
  "avoidWhen": ["提交、切换、展开收起或其他状态操作","未经验证的内部框架生产实现"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchLink"},
  "props": {
    "href": {"type":"String","required":true},
    "target": {"type":"String","default":{"kind":"undefined"}},
    "rel": {"type":"String","default":{"kind":"undefined"}},
    "disabled": {"type":"Boolean","default":false}
  },
  "events": ["click"],
  "eventDetails": null,
  "slots": ["icon","default"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [],
  "family": [],
  "propNotes": {"href":"必填的原生链接地址。","target":"原生链接目标，例如_blank。","rel":"原生链接关系；使用_blank时建议由调用方设置noopener。","disabled":"禁用链接交互和点击事件。"},
  "eventNotes": {"click":{"payload":"原生MouseEvent。","timing":"启用状态下激活链接时发出；禁用状态不发出。"}},
  "slotNotes": {"default":{"scope":"无","description":"链接可见文字，应能独立说明导航目的。"},"icon":{"scope":"无","description":"可选左侧图标；组件不提供右侧图标入口。"}}
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-link-semantic-boundary",
      "title": "链接负责真实跳转",
      "text": "页面、资源或地址跳转使用Link；提交、切换、展开收起等状态操作使用Button，不以文字外观混淆两类语义。",
      "strength": "must",
      "status": "confirmed",
      "when": ["选择Link或Button"],
      "references": []
    },
    {
      "id": "wb-link-context-typography",
      "title": "字号跟随场景上下文",
      "text": "Link不提供尺寸档位，不覆盖字号、行高、字重或字间距；表格、内嵌文本和独立文本中的排版均继承父级上下文。",
      "strength": "must",
      "status": "confirmed",
      "when": ["使用Link"],
      "references": []
    },
    {
      "id": "wb-link-state-decoration",
      "title": "默认无下划线，交互态有下划线",
      "text": "默认态不带下划线；悬浮、按下、键盘聚焦和禁用态显示1px下划线，下划线偏移2px。默认使用color-link，悬浮使用color-link-hover，按下使用color-link-active，禁用使用color-link-disabled。",
      "strength": "must",
      "status": "confirmed",
      "when": ["展示Link交互状态"],
      "references": []
    },
    {
      "id": "wb-link-leading-icon",
      "title": "左侧图标12px",
      "text": "Link可配置左侧12px图标，图标无额外安全边距，与文字间距4px，并通过currentColor同步文字颜色。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Link配置图标"],
      "references": []
    },
    {
      "id": "wb-link-disabled",
      "title": "禁用链接不可交互",
      "text": "禁用Link移除有效href，设置aria-disabled且退出Tab顺序；不得导航或发出click事件。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Link禁用"],
      "references": []
    }
  ],
  "dependencies": [],
  "foundationKeys": [
    "color-link",
    "color-link-hover",
    "color-link-active",
    "color-link-disabled",
    "color-border-focus",
    "spacing-component-xs",
    "icon-size-12",
    "color-text-primary",
    "color-text-secondary",
    "color-border-separator",
    "color-fill-subtle-default",
    "color-surface-card-default",
    "radius-sm",
    "radius-lg",
    "shadow-sm",
    "font-body-s",
    "font-body-m",
    "font-headline-m"
  ],
  "intro": "用于跳转到页面、资源或地址。提交、切换、展开和收起等状态操作应使用Button。",
  "sections": [
    {
      "id": "semantics",
      "title": "链接语义",
      "paragraphs": ["WorkbenchLink渲染真实链接，必须提供href。target与rel透传原生链接能力；路由拦截和导航状态由调用方决定。"],
      "bullets": ["独立链接默认继承上下文排版，不提供尺寸属性。","仅在确有必要时通过icon槽放置左侧图标；禁用链接不可聚焦、跳转或发出click。"]
    },
    {"id":"accessibility","title":"可访问性","paragraphs":["链接文案应准确说明目的；避免使用“点击这里”等脱离上下文的名称。"],"bullets":["导航使用链接，执行动作使用按钮。"]}
  ],
  "related": null
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "resource-link",
  "title": "资源导航链接",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-link",
    "scenarioId": "link",
    "exampleId": "resource-link",
    "codeSha256": "sha256:afb090dbf8282ea117f733eed627acd52ab349925ee0cba80d51f2b20f658b94"
  },
  "description": "展示真实资源目标；如使用前端路由，可在click事件中接管导航。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchLink } from '@workbench/ui-vue3'
const notice = ref('')
function handleNavigation(event) {
  event.preventDefault()
  notice.value = '已请求打开申请详情'
}
</script>
<template>
  <WorkbenchLink href="/applications/42" @click="handleNavigation">查看申请详情</WorkbenchLink>
  <output aria-live="polite">{{ notice }}</output>
</template>
```
