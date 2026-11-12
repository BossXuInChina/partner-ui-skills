<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 侧边导航 Side Navigation — `WorkbenchSideNavigation`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-side-navigation`](<../../workbench/wb-side-navigation.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-side-navigation",
  "kind": "component",
  "version": "1.0.0",
  "summary": "用于页面内的一级、二级导航及更深层级展开。当前选中页面由消费方控制；折叠与展开状态可受控。",
  "useWhen": ["管理应用多层级与频繁切换导航","可收起侧栏及三级四级面板"],
  "avoidWhen": ["移动端正式导航","超过四级或跨刷新持久化需求","未经验证的Vue2或内部框架生产调用"],
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
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchSideNavigation"},
  "props": {
    "title": {"type":"String","default":""},
    "topToggle": {"type":"Boolean","default":false},
    "width": {"type":"String","default":""},
    "panelMode": {"type":"String","default":"flyout","enum":["flyout","popup","columns"]},
    "panelDensity": {"type":"String","default":"default","enum":["small","default","large"]},
    "showFlyoutIcons": {"type":"Boolean","default":true},
    "showDivider": {"type":"Boolean","default":true},
    "ariaLabel": {"type":"String","default":"侧边导航"},
    "items": {"type":"Array","default":{"kind":"function"}},
    "collapsed": {"type":"Boolean","default":false},
    "activeItem": {"type":"String","default":""},
    "expandedItems": {"type":"Array","default":{"kind":"function"}},
    "panelItemId": {"type":"String","default":{"kind":"undefined"}},
    "panelExpandAll": {"type":"Boolean","default":false},
    "collapsible": {"type":"Boolean","default":true}
  },
  "events": ["update:collapsed","update:activeItem","update:expandedItems","update:panelItemId","select"],
  "eventDetails": null,
  "slots": [],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [
    {"name":"toggle","declaration":"toggle(): void;"},
    {"name":"closePanel","declaration":"closePanel(restoreFocus?: boolean): void;"}
  ],
  "family": [],
  "propNotes": {
    "items": "层级导航数据；每项使用id、label及可选children。",
    "activeItem": "受控当前选中项标识。",
    "expandedItems": "受控已展开项标识数组。",
    "panelItemId": "可选的受控深层面板触发项标识；空字符串关闭面板，未传时由组件管理。",
    "panelExpandAll": "弹出菜单中保持全部层级展开；默认关闭，适用于固定对照预览。",
    "collapsed": "受控整体折叠状态。",
    "panelMode": "深层面板模式：flyout、popup或columns。",
    "panelDensity": "弹出菜单密度：small、default或large。",
    "width": "指定侧栏宽度；为空时遵循组件默认栅格宽度。",
    "collapsible": "是否提供底部折叠操作。",
    "topToggle": "是否显示顶部折叠控制。",
    "showFlyoutIcons": "是否在flyout子菜单中展示图标。",
    "showDivider": "是否展示分隔线。",
    "ariaLabel": "导航区域的可访问名称。",
    "title": "侧边导航可选标题。"
  },
  "eventNotes": {
    "update:collapsed": {"payload":"新的布尔折叠状态。","timing":"用户切换整体折叠状态后发出。"},
    "update:activeItem": {"payload":"新的选中项标识。","timing":"用户选中导航项后发出。"},
    "update:expandedItems": {"payload":"新的展开项标识数组。","timing":"用户展开或收起层级时发出。"},
    "update:panelItemId": {"payload":"将要打开的二级菜单标识；请求关闭时为空字符串。","timing":"受控面板触发项被切换或请求关闭时发出。"},
    "select": {"payload":"被选中导航项。","timing":"用户激活导航项时发出。"}
  },
  "slotNotes": {}
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-side-navigation-dimensions",
      "title": "侧栏基础尺寸",
      "text": "主菜单与二级菜单固定48px；无标题时首行距顶部12px；标题展示时标题与一级图标左对齐，标题到水平分割线24px，分割线到首个一级菜单4px；内容左右16px、图文和箭头间距12px；一级统一显示16px线性图标，缺省使用宫格图标兜底；二级不显示图标，文字与一级文字对齐。箭头10px、文字font-body-m。默认宽度遵循页面栅格，在24列页面占4栅格，允许width指定更宽尺寸；收起宽48px。右侧纵向分割线默认显示，可用showDivider=false隐藏。",
      "strength": "must",
      "status": "confirmed",
      "when": ["侧边导航"],
      "references": []
    },
    {
      "id": "wb-side-navigation-states",
      "title": "选中和交互状态",
      "text": "Hover与焦点铺满整行且无圆角；选中使用color-fill-selected灰底。左侧2×12px品牌红胶囊只标识最终选中的叶子页面路径；仅打开带子级的菜单不显示红条，同一时间最多一个侧栏菜单项显示红条。展开态一级图标保持color-icon-primary；仅在整体折叠态，当前选中项及其所属一级菜单图标使用color-brand，其他一级图标保持默认色。箭头采用/ic_arrow_right_line#2:141 SVG。",
      "strength": "must",
      "status": "confirmed",
      "when": ["侧边导航"],
      "references": []
    },
    {
      "id": "wb-side-navigation-hierarchy",
      "title": "四级导航与面板",
      "text": "前两级在侧栏内展开，第三级及第四级用flyout双列描述面板、popup菜单面板、columns四列搜索面板展示。columns四级菜单默认文字使用color-text-secondary，悬浮时显示灰色底，选中后文字使用brand色；右侧收藏在off线性图标与on面性图标间切换，on使用color-warning。popup提供small/default/large密度；侧栏菜单48px不随密度改变。popup选中文字保持color-text-primary，右侧仅为当前选中项显示完成/尺寸=12图标，不为祖先重复显示勾选。",
      "strength": "must",
      "status": "confirmed",
      "when": ["侧边导航"],
      "references": []
    },
    {
      "id": "wb-side-navigation-state-ownership",
      "title": "受控状态与展开历史",
      "text": "collapsed、expandedItems、activeItem均受控；整体收起不清除已展开父级及选中叶子。topToggle可选或由宿主调用toggle方法；底部按钮collapsible可选。",
      "strength": "must",
      "status": "confirmed",
      "when": ["侧边导航"],
      "references": []
    },
    {
      "id": "wb-side-navigation-decoration",
      "title": "边线与阴影边界",
      "text": "基础侧栏无阴影且无圆角，只在内侧右边绘制0.5px color-border-separator线，亮色为DFDFDF。深层面板才使用shadow-r-sm或popup的shadow-base。",
      "strength": "must",
      "status": "confirmed",
      "when": ["侧边导航"],
      "references": []
    },
    {
      "id": "wb-side-navigation-keyboard",
      "title": "键盘与可访问性",
      "text": "使用nav、ul、button；aria-current与aria-expanded关联真实状态。方向键与Home/End移动同级焦点，Right打开、Left返回，Escape关闭面板并回焦点。",
      "strength": "must",
      "status": "confirmed",
      "when": ["侧边导航"],
      "references": []
    },
    {
      "id": "wb-side-navigation-eligibility",
      "title": "注册与交付资格",
      "text": "用户授权后正式注册Catalog和Vue3公共导出。交付范围为preview-vue3，Vue2及生产目标未验证。不得宣称生产可用。",
      "strength": "must",
      "status": "confirmed",
      "when": ["侧边导航"],
      "references": []
    }
  ],
  "dependencies": ["wb-button","wb-search"],
  "foundationKeys": [
    "color-brand",
    "color-fill-hover",
    "color-fill-selected",
    "color-surface-container",
    "color-text-primary",
    "color-text-secondary",
    "color-icon-primary",
    "color-icon-hover",
    "color-icon-active",
    "color-border-focus",
    "color-border-separator",
    "font-body-m",
    "font-body-s",
    "radius-xs",
    "radius-sm",
    "radius-md",
    "radius-full",
    "shadow-r-sm",
    "shadow-base",
    "spacing-component-xs",
    "spacing-component-sm",
    "spacing-component-md",
    "spacing-component-lg"
  ],
  "intro": "用于页面内的一级、二级导航及更深层级展开。当前选中页面由消费方控制；折叠与展开状态可受控。",
  "sections": [
    {
      "id": "selection",
      "title": "选型",
      "paragraphs": ["用于同一产品区域的层级页面导航；全站站点切换使用WorkbenchTopNav。"],
      "bullets": ["panelMode选择flyout、popup或columns深层面板呈现。","需要四级搜索及收藏入口时使用columns；简单层级使用flyout。"]
    },
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["items定义导航层级；width可指定侧栏宽度，默认按布局栅格计算。"],
      "bullets": ["主菜单48px行高；整体折叠时宽48px。","深层面板显示模式、密度与图标由panelMode及相关属性配置。","基础侧栏无阴影与圆角，右侧使用分隔线。"]
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["collapsed、expandedItems、activeItem与panelItemId支持受控；展开父项不会清除已选叶子。"],
      "bullets": ["方向键和Home/End移动同级焦点；Right展开、Left返回、Escape关闭面板。","topToggle控制顶部折叠入口；collapsible控制底部折叠能力。"]
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["侧边导航发出选中值，不执行宿主路由或权限判断。"],
      "bullets": ["消费方维护导航数据、当前页面及展开路径。","activeItem应表示最终选中的叶子页面；只展开父项不会显示叶子选中标记。","当前交付为preview-vue3；不声明Vue2或生产适配资格。"]
    }
  ],
  "related": [{"label":"侧边导航规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "controlled-sidebar",
  "title": "受控侧边导航",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-side-navigation",
    "scenarioId": "side-navigation",
    "exampleId": "controlled-sidebar",
    "codeSha256": "sha256:ff0a2f3e54d57426b376a580e33269e5a7551dca34d89c7e4e71daaa71369cbd"
  },
  "description": "调用方保存选中项和展开项，并接管路由。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from "vue"
import { WorkbenchSideNavigation } from "@workbench/ui-vue3"
const activeItem = ref('overview')
const expandedItems = ref(['workspace'])
const items = [{ id: 'workspace', label: '工作空间', children: [{ id: 'overview', label: '总览' }] }]
function selectItem(item) { activeItem.value = item.id }
</script>
<template>
  <WorkbenchSideNavigation v-model:active-item="activeItem" v-model:expanded-items="expandedItems" :items="items" @select="selectItem" />
</template>
```
