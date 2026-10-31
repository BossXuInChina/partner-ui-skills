/**
 * Partner UI runtime: Vue 3 + every public component of the two consume packs, prebuilt for
 * plain HTML pages. Exposes `window.PartnerUI` (and `window.Vue` when the page has none).
 *
 *   @workbench/ui-vue3   — all Workbench components, blocks, patterns and icon helpers
 *   huawei-partner-ai-ui — all AI UI public components (ChatPanel, AgreementAssistantPanel, …)
 *   @opentiny/tiny-robot — only BubbleRenderers is re-exported, for custom chat content renderers
 *
 * Nothing here changes component visuals. Prototype helpers (chat session, mock adapter,
 * template renderer, restyle) live in this file or ./helpers and are clearly named as such.
 */
import * as Vue from 'vue'
import '@workbench/ui-vue3/styles.css'
import * as Workbench from '@workbench/ui-vue3'
import * as AI from 'huawei-partner-ai-ui'
import 'huawei-partner-ai-ui/styles.css'
import { BubbleRenderers, TrActionButton } from '@opentiny/tiny-robot'
import './base.css'
import { chatRenderers, createChatSession, mockAgreementAdapter, mockStream } from './helpers/chat'
import { restyle } from './helpers/restyle'
import { overlays } from './helpers/overlays'
import { VERSIONS } from './versions'

type AnyComponent = Vue.Component

function isComponent(name: string, value: unknown): value is AnyComponent {
  if (!/^[A-Z]/.test(name) || !value || (typeof value !== 'object' && typeof value !== 'function')) return false
  const v = value as Record<string, unknown>
  return 'setup' in v || 'render' in v || '__name' in v || 'template' in v || 'props' in v
}

function collect(ns: Record<string, unknown>) {
  const out: Record<string, AnyComponent> = {}
  for (const [k, v] of Object.entries(ns)) if (isComponent(k, v)) out[k] = v
  return out
}

const workbenchComponents = collect(Workbench as Record<string, unknown>)
const aiComponents = collect(AI as Record<string, unknown>)
/**
 * Close/collapse action for the AI panel's `#toolbar-end` slot. Same markup as the AI UI host demo
 * (TrActionButton + AiIcon 'panel.close' + .chat-toolbar-action), so it matches the panel toolbar.
 */
const PuiAssistantCloseButton = Vue.defineComponent({
  name: 'PuiAssistantCloseButton',
  props: { label: { type: String, default: '收起 AI 助手' } },
  emits: ['click'],
  setup(props, { emit }) {
    return () => Vue.h(TrActionButton as AnyComponent, {
      type: 'button', class: 'chat-toolbar-action chat-close-action', 'aria-label': props.label, title: props.label,
      icon: Vue.h((AI as any).AiIcon, { name: 'panel.close' }), onClick: (e: Event) => emit('click', e),
    })
  },
})

/** Business icon for ChatPanel/AgreementAssistantPanel `welcomeEntries[].icon`, using a registered Workbench icon. */
function welcomeIcon(name: string, kind: 'system' | 'pedestal' = 'system') {
  const W = Workbench as any
  return Vue.markRaw(Vue.defineComponent({
    name: 'PuiWelcomeIcon',
    render: () => kind === 'pedestal' ? Vue.h(W.WorkbenchPedestalIcon, { name }) : Vue.h(W.WorkbenchSystemIcon, { name }),
  }))
}

const helperComponents: Record<string, AnyComponent> = { PuiAssistantCloseButton }
const components: Record<string, AnyComponent> = { ...workbenchComponents, ...aiComponents, ...helperComponents }

let appCount = 0

/** Register every pack component on an existing Vue app. */
function install(app: Vue.App) {
  for (const [name, comp] of Object.entries(components)) app.component(name, comp)
  return app
}

/**
 * Create a Vue app with all pack components registered globally.
 * Each app gets its own `idPrefix` (required by AI UI when several apps share a page).
 */
function createApp(rootComponent: Vue.Component, rootProps?: Record<string, unknown>) {
  const app = Vue.createApp(rootComponent, rootProps)
  app.config.idPrefix = `pui${++appCount}`
  app.config.errorHandler = (err, _instance, info) => console.error('[PartnerUI]', info, err)
  install(app)
  return app
}

/** Create + mount in one call. `options.template` may be a string or '#id' of a text/x-template script. */
function mount(target: string | Element, options: Vue.Component, rootProps?: Record<string, unknown>) {
  const app = createApp(options, rootProps)
  return { app, vm: app.mount(target) }
}

const PartnerUI = {
  versions: VERSIONS,
  Vue,
  Workbench,
  AI,
  BubbleRenderers,
  components,
  workbenchComponents: Object.keys(workbenchComponents).sort(),
  aiComponents: Object.keys(aiComponents).sort(),
  helperComponents: Object.keys(helperComponents),
  welcomeIcon,
  install,
  createApp,
  mount,
  chatRenderers,
  createChatSession,
  mockAgreementAdapter,
  mockStream,
  restyle,
  overlays,
}

declare global {
  interface Window { PartnerUI: typeof PartnerUI; Vue?: typeof Vue }
}
window.PartnerUI = PartnerUI
if (!window.Vue) window.Vue = Vue

export default PartnerUI
