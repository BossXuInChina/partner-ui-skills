<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 顶部导航 Top Navigation — `WorkbenchTopNav`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-top-nav`](<../../workbench/wb-top-nav.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-top-nav",
  "kind": "component",
  "version": "1.0.2",
  "summary": "组织站点切换、业务页签、搜索、通知与账户入口，适配桌面、折叠桌面和移动宽度。",
  "useWhen": ["需要站点、业务页签、全局检索和账户入口的页首导航。"],
  "avoidWhen": ["局部卡片或页面内分段导航；使用 Tabs。"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchTopNav"},
  "props": {
    "mode": {"type":"String","default":"workbench","enum":["portal","workbench"]},
    "userState": {"type":"String","default":"authenticated","enum":["guest","authenticated"]},
    "activeTab": {"type":"String","default":"home"},
    "currentSite": {"type":"String","default":"partner"},
    "currentLanguage": {"type":"String","default":"zh-CN"},
    "tabs": {"type":"Array","default":{"kind":"function"}},
    "sites": {"type":"Array","default":{"kind":"function"}},
    "languages": {"type":"Array","default":{"kind":"function"}},
    "userMenuItems": {"type":"Array","default":{"kind":"function"}},
    "tabMenus": {"type":"Object","default":{"kind":"function"}},
    "actions": {"type":"Array","default":null}
  },
  "events": ["update:activeTab","select-site","select-language","select-user-action","select-tab-entry","navigate","search","notification","login","register","action"],
  "propNotes": {
    "mode": "workbench或portal导航模式。",
    "userState": "authenticated或guest账户呈现状态。",
    "activeTab": "受控当前业务页签。",
    "currentSite": "受控当前站点value。",
    "currentLanguage": "受控当前语言value。",
    "tabs": "页签项数组，支持value、label与可选href。",
    "sites": "站点选项数组，支持value、label与可选href。",
    "languages": "语言菜单项。",
    "tabMenus": "按tab value映射的分组入口菜单。",
    "userMenuItems": "账户菜单动作项。",
    "actions": "自定义顶部操作项。"
  },
  "eventNotes": {
    "update:activeTab": {"payload":"新的页签value。","timing":"用户选择业务页签后发出。"},
    "select-site": {"payload":"站点value。","timing":"用户选择站点后发出。"},
    "select-language": {"payload":"语言value。","timing":"用户选择语言后发出。"},
    "select-user-action": {"payload":"账户动作value。","timing":"用户选择账户菜单项后发出。"},
    "select-tab-entry": {"payload":"{ tab, value }。","timing":"用户选择分组页签菜单项后发出。"},
    "navigate": {"payload":"导航上下文，包含kind、value及可能的href。","timing":"用户激活导航入口时通知；href锚点仍由浏览器处理。"},
    "search": {"payload":"无参数；组件不在该事件中提交查询文本。","timing":"用户提交顶部搜索后发出。"},
    "notification": {"payload":"无。","timing":"用户激活通知入口后发出。"},
    "login": {"payload":"无。","timing":"访客激活登录入口后发出。"},
    "register": {"payload":"无。","timing":"访客激活注册入口后发出。"},
    "action": {"payload":"{ type, id, pressed }；pressed仅favorite动作提供当前布尔状态，其他动作该值为undefined。","timing":"用户激活自定义动作时发出。"}
  }
}
```

未声明或为空：eventDetails、slots、slotDetails、slotPatterns、exposed、family、slotNotes（不代表支持）

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-top-nav-navigation",
      "title": "真实导航与旁路事件",
      "text": "tabs、sites 与 tabMenus 条目的 href 为可选真实地址。提供 href 时渲染 a 并保留浏览器默认导航，同时发出 navigate({kind,value,href,...})；未提供 href 时保留受控选择事件。",
      "strength": "must",
      "status": "confirmed",
      "when": ["导航项带 href"],
      "references": []
    },
    {"id":"wb-top-nav-disclosure","title":"披露与动作边界","text":"站点、语言、账户、搜索、通知及移动菜单入口使用 button；它们仅披露面板或发出动作事件，不承担页面导航。","strength":"must","status":"confirmed","when":["使用顶部导航"],"references":[]},
    {
      "id": "wb-top-nav-typography-exceptions",
      "title": "人工批准的导航字体例外",
      "text": "品牌标题和移动菜单标题以 font-headline-m（18/500/0em）为基准，并保留本资产 brand-title-line-height=28px；Mega 大标题以 font-display-s（500/0em）为基准，并保留本资产 mega-heading-font-size=32px、mega-heading-line-height=48px。子业务标题完整使用 font-headline-s（16/24/500/0em）。",
      "strength": "must",
      "status": "confirmed",
      "when": ["渲染顶部导航标题"],
      "references": []
    },
    {
      "id": "wb-top-nav-menu-radius-20261025",
      "title": "Top Navigation普通与Mega菜单圆角",
      "text": "Top Navigation普通菜单主体与Mega菜单主体统一使用Foundation radius-md（6px）；站点切换面板及站点条目保持原值，菜单触发器保持原值。",
      "strength": "must",
      "status": "confirmed",
      "when": ["显示Top Navigation语言、账户、更多或Mega菜单"],
      "references": []
    }
  ],
  "dependencies": ["wb-avatar"],
  "foundationKeys": ["color-brand","color-fill-default","color-fill-hover","color-fill-subtle-default","color-text-primary","color-text-secondary","color-text-inverse","color-icon-primary","color-icon-secondary","color-icon-hover","color-border","color-border-focus","color-border-separator","color-border-separator-subtle","color-surface-overlay","color-scrim-modal","color-error","spacing-component-xs","spacing-component-sm","spacing-component-md","spacing-component-lg","spacing-layout-section-gap-large","spacing-screen-edge-compact","spacing-screen-edge-expanded","radius-full","radius-lg","radius-sm","radius-md","shadow-sm","font-body-s","font-body-m","font-body-l","icon-size-12","icon-size-16","icon-size-20","icon-size-24","icon-size-48","font-headline-m","font-headline-s","font-display-s","layout-grid-max-width","layout-grid-columns-medium","layout-grid-columns-wide"],
  "intro": "组织站点切换、业务页签、搜索、通知与账户入口，适配桌面、折叠桌面和移动宽度。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于应用或门户级全局导航；局部页面内导航应使用对应的侧边导航或页签组件。"],"bullets":["mode选择workbench或portal导航模式；userState区分authenticated与guest。","需要菜单分组时使用tabMenus，站点与语言菜单独立配置。"]},
    {"id":"structure","title":"设计结构与排版","paragraphs":["tabs、sites及languages以value和label描述；tabs/sites可带href成为真实锚点。"],"bullets":["有href时保留浏览器原生导航，不由组件拦截。","actions可自定义操作入口；账户、搜索与通知的动作交给消费方处理。"]},
    {"id":"interaction","title":"交互与键盘","paragraphs":["菜单入口负责披露或触发动作；链接仍遵循原生Enter导航。"],"bullets":["方向键、Escape与焦点恢复用于菜单披露，不改变链接默认行为。","activeTab、currentSite和currentLanguage为受控当前值，需响应对应更新或选择事件。"]},
    {"id":"responsibility","title":"使用边界与职责","paragraphs":["TopNav提供导航结构，不负责页面路由实现、账户认证、搜索服务或通知数据。"],"bullets":["href应使用宿主应用可访问的目标地址；navigate事件适合旁路监听或埋点。","头像账户入口复用WorkbenchAvatar；生产资格仍需按资产交付边界确认。"]}
  ],
  "related": [{"label":"顶部导航规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "site-navigation",
  "title": "站点与页签导航",
  "portability": "portable",
  "source": {"kind":"studio-official-usage","ownerAssetId":"wb-top-nav","scenarioId":"top-nav","exampleId":"site-navigation","codeSha256":"sha256:3ea1c9032f22957c17433aa5c8e3c85b6d03f0d042d741ba70bb5c36473d1ebd"},
  "description": "完整的受控导航值由调用方持有；链接由浏览器自然导航。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchTopNav } from "@workbench/ui-vue3"
const activeTab = ref('overview')
const currentSite = ref('partner')
const tabs = [{ value: 'overview', label: '总览', href: '/overview' }]
const sites = [{ value: 'partner', label: '伙伴中心' }]
function selectSite(value) { currentSite.value = value }
</script>
<template>
  <WorkbenchTopNav v-model:active-tab="activeTab" :current-site="currentSite" :tabs="tabs" :sites="sites" @select-site="selectSite" />
</template>
```
