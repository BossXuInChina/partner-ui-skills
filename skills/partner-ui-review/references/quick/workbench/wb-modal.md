<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261106.7 (6dad97e7a215069b5841b1f4413f80c1c587c1cc) — do not edit. -->

# 对话框 Modal — `WorkbenchModal`

包：`@workbench/ui-vue3@0.2.0-prototype.20261106.7` · commit：`6dad97e7a215069b5841b1f4413f80c1c587c1cc` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

完整资料：[`wb-modal`](<../../workbench/wb-modal.md>)。本页省略 Studio controls/cases，不省略已声明的公开 API；预览配置不是 props。

## 资产与已知边界

```json
{
  "id": "wb-modal",
  "kind": "component",
  "version": "1.0.1",
  "summary": "在当前页面上方集中处理需要明确确认的短流程；通过尺寸和插槽承载内容，打开时管理模态焦点与背景。",
  "useWhen": ["Modal首版容器"],
  "avoidWhen": ["嵌套、拖拽、手势及未经验证的内部框架生产场景"],
  "status": {"maturity":"prototype-validated","deliveryEligibility":"prototype-only"},
  "source": {
    "package": "@workbench/ui-vue3",
    "version": "0.2.0-prototype.20261106.7",
    "commit": "6dad97e7a215069b5841b1f4413f80c1c587c1cc"
  },
  "unsupported": null,
  "usageStatus": "supported",
  "usageUnsupported": [],
  "variantStatus": "supported",
  "variantUnsupported": [],
  "caseSemantics": "Studio controls, not public component props"
}
```

## 公开 API

以下字段来自包内声明。null 表示来源为空或未声明，不代表支持；不猜测签名、嵌套类型或动态 slot 名。

```json
{
  "publicImport": {"moduleName":"@workbench/ui-vue3","exportName":"WorkbenchModal"},
  "props": {
    "modelValue": {"type":"Boolean","default":false},
    "title": {"type":"String","required":true},
    "ariaDescribedby": {"type":"String","default":{"kind":"undefined"}},
    "size": {"type":"String","default":"m","enum":["s","m","l","xl"]},
    "readonly": {"type":"Boolean","default":false},
    "topNavigationHeight": {"type":["String","Number"],"default":0},
    "closeOnMask": {"type":"Boolean","default":true},
    "closeOnEsc": {"type":"Boolean","default":true},
    "actions": {"type":"Array","default":{"kind":"function"}},
    "beforeClose": {"type":"Function","default":{"kind":"undefined"}},
    "showGrid": {"type":"Boolean","default":false}
  },
  "events": ["update:modelValue","close","action"],
  "eventDetails": null,
  "slots": ["close-icon","default","footer"],
  "slotDetails": null,
  "slotPatterns": [],
  "exposed": [{"name":"requestClose","declaration":"requestClose(reason?: string): Promise<boolean>;"}],
  "family": [],
  "propNotes": {
    "modelValue": "对话框是否打开；父级响应update:modelValue同步关闭状态。",
    "title": "对话框标题，必填。",
    "ariaDescribedby": "关联正文说明元素ID，绑定到dialog面板。",
    "size": "宽度档位s/m/l/xl，对应固定版心栅格宽度。",
    "readonly": "以只读信息呈现内容并隐藏底部操作区；默认插槽可读取readonly插槽参数。",
    "topNavigationHeight": "顶部导航实际高度，用于计算最大可用高度；宿主应传真实壳层值。",
    "closeOnMask": "是否允许点击遮罩关闭。",
    "closeOnEsc": "是否允许Escape关闭。",
    "actions": "底部操作描述数组；closeOnClick决定该操作成功后是否关闭。",
    "beforeClose": "同步或异步关闭守卫，返回false则维持打开。",
    "showGrid": "仅显示布局检查网格，不改变Modal尺寸或交互。"
  },
  "eventNotes": {
    "update:modelValue": {"payload":"新的打开状态；关闭请求为false。","timing":"关闭通过守卫并实际生效时发出。"},
    "close": {"payload":"关闭原因。","timing":"关闭操作完成后发出。"},
    "action": {"payload":"触发的Action描述。","timing":"点击底部操作时发出。"}
  },
  "slotNotes": {
    "close-icon": {"scope":"自定义关闭按钮内容。","description":"保留按钮语义和可访问名称；插槽仅替换图形内容。"},
    "default": {"scope":"对话框主体；插槽参数提供readonly。","description":"编辑和只读内容都由调用方组织，内容区负责纵向滚动。"},
    "footer": {"scope":"自定义底部操作区；插槽参数提供requestClose(reason)。","description":"提供后由宿主管理按钮、校验和动作；只读模式不显示操作区。"}
  }
}
```

## 规则与适用条件

```json
{
  "rules": [
    {
      "id": "wb-modal-rule-2",
      "title": "预览入口 `/preview/WB-MODAL-V1/modal`。Modal ",
      "text": "预览入口 `/preview/WB-MODAL-V1/modal`。Modal 复用 Drawer 已确认的内容结构与间距：左右 24px、上下 20px，有 Action 时底部 24px；标题到内容 16px、内容到 Action 24px，三段之间不使用分割线。标题使用 `font-headline-s`（16px/24px/500），最长占位与 16px 关闭按钮保持 16px 间距；超长标题单行省略并通过 `title` 保留全文。关闭按钮为 16px 图标且不增加可见外容器。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Modal首版"],
      "references": []
    },
    {
      "id": "wb-modal-rule-4",
      "title": "S、M、L、XL 分别占 Workbench 固定版心 24 栅格中的 6、8、",
      "text": "S、M、L、XL 分别占 Workbench 固定版心 24 栅格中的 6、8、12、16 列。按 1856px 版心和 16px gutter 换算，目标宽度分别为 452px、608px、920px、1232px；当视口不足以容纳目标宽度时，面板收敛至 `视口宽度 - 64px`，左右各保留 32px 安全距离。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Modal首版"],
      "references": []
    },
    {
      "id": "wb-modal-rule-6",
      "title": "最大高度为 `视口高度 - 顶部导航高度 - 64px`。顶部导航高度通过 `t",
      "text": "最大高度为 `视口高度 - 顶部导航高度 - 64px`。顶部导航高度通过 `topNavigationHeight` 配置；Preview 暂用 56px Proposed 示例值，等待真实产品壳层接入时传入实际高度。标题与 Action 固定，仅内容区滚动；滚动条复用 `wb-scrollbar` 并贴合面板右边缘。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Modal首版"],
      "references": []
    },
    {
      "id": "wb-modal-rule-8",
      "title": "面板使用 `color-surface-overlay`、`radius-lg`",
      "text": "面板使用 `color-surface-overlay`、`radius-lg` 和 Dialog 专属 `shadow-xl`，遮罩使用 `color-scrim-modal`。打开后锁定页面滚动、隔离背景交互、圈定焦点；关闭后恢复触发元素焦点。关闭按钮、Escape、遮罩和配置为 `closeOnClick` 的 Action 均经过 `beforeClose`。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Modal首版"],
      "references": []
    },
    {
      "id": "wb-modal-rule-10",
      "title": "编辑态示例中的“确认”和“取消”均配置 `closeOnClick: true`",
      "text": "编辑态示例中的“确认”和“取消”均配置 `closeOnClick: true`，业务校验通过后关闭。组件同时提供 `readonly` 布尔属性并将其作为默认插槽参数暴露；只读场景使用语义化标签–值信息组，不用 Disabled 表单控件模拟，并且不渲染底部操作区或 Action 按钮。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Modal首版"],
      "references": []
    },
    {
      "id": "wb-modal-rule-12",
      "title": "动效时长、缓动、层级和 56px 顶部导航示例尚无正式 Foundation 决",
      "text": "动效时长、缓动、层级和 56px 顶部导航示例尚无正式 Foundation 决策，保留 Task-local Proposed Candidate。本版已批准为 prototype-validated / prototype-only，未验证内部框架生产适配。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Modal首版"],
      "references": []
    },
    {
      "id": "wb-modal-rule-14",
      "title": "正式实现位于[internal reference omitted]",
      "text": "正式实现位于[internal reference omitted] `--overlay-layer` 提供层级；正式默认不设置动效，预览动效及层级候选不属于批准规则。模态开启时隔离当前面板与其aria-controls关联浮层以外的背景，关闭或卸载仅释放本实例持有的隔离和滚动锁。关闭状态挂载、非模态模式不修改页面滚动设置。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Modal首版"],
      "references": []
    },
    {
      "id": "wb-modal-rule-16",
      "title": "`topNavigationHeight` 由宿主传入实际导航高度；默认0表示无",
      "text": "`topNavigationHeight` 由宿主传入实际导航高度；默认0表示无导航，56px仅保留在Studio预览示例。",
      "strength": "must",
      "status": "confirmed",
      "when": ["Modal首版"],
      "references": []
    }
  ],
  "dependencies": ["wb-button","wb-scrollbar"],
  "foundationKeys": [
    "color-surface-overlay",
    "color-surface-page",
    "color-scrim-modal",
    "color-text-primary",
    "color-text-secondary",
    "color-icon-primary",
    "color-icon-hover",
    "color-border-focus",
    "color-scrollbar-thumb-fill-hover",
    "spacing-component-xs",
    "spacing-component-sm",
    "spacing-component-md",
    "spacing-component-lg",
    "spacing-layout-container-block",
    "spacing-layout-container-inline",
    "spacing-layout-action-gap",
    "spacing-dialog-padding-block-end-with-actions",
    "spacing-screen-edge-expanded",
    "radius-lg",
    "radius-full",
    "shadow-xl",
    "font-body-m",
    "font-body-s",
    "font-headline-m",
    "font-headline-s",
    "icon-size-16",
    "color-icon-active",
    "layout-grid-columns-wide",
    "layout-grid-gutter",
    "layout-grid-max-width"
  ],
  "intro": "在当前页面上方集中处理需要明确确认的短流程；通过尺寸和插槽承载内容，打开时管理模态焦点与背景。",
  "sections": [
    {"id":"selection","title":"选型","paragraphs":["用于需要用户完成或取消后才能继续的短任务、确认和只读信息；跨页面主流程或大量纵向内容使用Drawer或独立页面。"],"bullets":[]},
    {
      "id": "structure",
      "title": "设计结构与排版",
      "paragraphs": ["标题、内容、底部操作构成清晰的决策层级。size按固定版心栅格确定；内容区独立滚动，标题与操作保持可见。readonly用于信息展示，不用禁用表单模拟只读。"],
      "bullets": []
    },
    {
      "id": "interaction",
      "title": "交互与键盘",
      "paragraphs": ["打开后圈定焦点并锁定背景滚动；关闭后恢复触发元素。关闭按钮、Escape、遮罩以及closeOnClick Action遵循beforeClose。"],
      "bullets": []
    },
    {
      "id": "responsibility",
      "title": "使用边界与职责",
      "paragraphs": ["组件公开入口为 WorkbenchModal（@workbench/ui-vue3）。当前资格：prototype-only；业务数据、持久化和流程决策由宿主承担。"],
      "bullets": []
    }
  ],
  "related": [{"label":"对话框 Modal组件规范","href":"#rules"}]
}
```

## 官方示例

官方来源 SFC 状态：`supported`。仅展开首个可移植示例，不代表全部变体。

```json
{
  "id": "contact-edit-confirmation",
  "title": "联系人编辑对话框",
  "portability": "portable",
  "source": {
    "kind": "studio-official-usage",
    "ownerAssetId": "wb-modal",
    "scenarioId": "modal",
    "exampleId": "contact-edit-confirmation",
    "codeSha256": "sha256:76b6a49d8a03b3115f5244188ce17655b9c7ecb8e62cca0e01c8fe8df023dcf7"
  },
  "description": "联系人编辑对话框场景示例展示组件在该业务流程中的职责，并附可直接运行的Vue代码。",
  "dataBoundary": "Inline demonstration data only; the host owns business API, navigation, persistence and action handling. Static portability does not establish runtime or production acceptance.",
  "unsupported": []
}
```

```vue
<script setup>
import { ref } from 'vue'
import { WorkbenchModal, WorkbenchButton, WorkbenchInput } from '@workbench/ui-vue3'
const open = ref(false)
const contactName = ref('林青')
const actions = [{ id: 'cancel', label: '取消', closeOnClick: true }, { id: 'save', label: '保存', closeOnClick: true }]
function beforeClose() { return true }
</script>
<template>
  <WorkbenchButton appearance="secondary" @click="open = true">打开编辑</WorkbenchButton>
  <WorkbenchModal v-model="open" title="编辑联系人" size="m" :actions="actions" :before-close="beforeClose">
    <WorkbenchInput v-model="contactName" aria-label="姓名" />
  </WorkbenchModal>
</template>
```
