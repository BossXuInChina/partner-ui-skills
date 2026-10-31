/**
 * Prototype helpers for the AI UI chat components. They only feed data into the public
 * ChatPanel / AgreementAssistantPanel APIs; they do not restyle anything.
 *
 * - chatRenderers: content renderers for ChatPanel `renderers` (TinyRobot BubbleContentRendererMatch)
 *     { type: 'ai-summary', text }                         → AiSummaryCard
 *     { type: 'business-navigation', title, description?, target } → BusinessNavigationCard
 *     { type: 'agreement-table', agreements }              → AgreementTable
 *     { type: 'pui-template', template, data? }            → any Vue template (pack components allowed)
 *     { type: 'pui-html', html }                           → sanitized static HTML
 * - createChatSession: reactive messages/processing/error state + send/abort/retry handlers for ChatPanel
 * - mockStream / mockAgreementAdapter: local fake streams for AgreementAssistantPanel demos
 */
import { defineComponent, h, reactive, ref, type Component, type PropType } from 'vue'
import DOMPurify from 'dompurify'
import { AiSummaryCard, BusinessNavigationCard, AgreementTable } from 'huawei-partner-ai-ui'
import { useMessageContent } from '@opentiny/tiny-robot'

type Item = Record<string, any>

const templateCache = new Map<string, Component>()
function templateComponent(template: string) {
  let comp = templateCache.get(template)
  if (!comp) {
    comp = defineComponent({ name: 'PuiTemplatePart', props: { data: Object, message: Object }, template })
    templateCache.set(template, comp)
  }
  return comp
}

// TinyRobot passes { message, contentIndex }; the item itself comes from useMessageContent.
const rendererProps = {
  message: { type: Object as PropType<Item>, default: () => ({}) },
  contentIndex: { type: Number, default: 0 },
}
const useItem = (props: any) => useMessageContent(props as any).content as unknown as { value: Item }

const TemplatePart = defineComponent({
  name: 'PuiTemplateRenderer',
  props: rendererProps,
  setup(props) {
    const c = useItem(props)
    return () => h('div', { class: 'pui-chat-part' }, [h(templateComponent(String(c.value?.template || '<div></div>')), { data: c.value?.data || {}, message: props.message })])
  },
})
const HtmlPart = defineComponent({
  name: 'PuiHtmlRenderer',
  props: rendererProps,
  setup(props) {
    const c = useItem(props)
    return () => h('div', { class: 'pui-chat-part pui-chat-html', innerHTML: DOMPurify.sanitize(String(c.value?.html || '')) })
  },
})
const SummaryPart = defineComponent({
  name: 'PuiSummaryRenderer',
  props: rendererProps,
  setup(props) { const c = useItem(props); return () => h(AiSummaryCard as Component, { text: String(c.value?.text || '') }) },
})
const NavigationPart = defineComponent({
  name: 'PuiNavigationRenderer',
  props: rendererProps,
  setup(props) {
    const c = useItem(props)
    return () => h(BusinessNavigationCard as Component, {
      title: c.value?.title, description: c.value?.description, target: c.value?.target || { target: '' },
      onNavigate: (t: unknown) => { c.value?.onNavigate?.(t); window.dispatchEvent(new CustomEvent('pui:navigate', { detail: t })) },
    })
  },
})
const AgreementPart = defineComponent({
  name: 'PuiAgreementRenderer',
  props: rendererProps,
  setup(props) {
    const c = useItem(props)
    return () => h(AgreementTable as Component, {
      agreements: c.value?.agreements || [],
      onOpen: (a: unknown) => { c.value?.onOpen?.(a); window.dispatchEvent(new CustomEvent('pui:open-agreement', { detail: a })) },
    })
  },
})

const byType = (type: string) => (_m: unknown, c: Item) => c?.type === type
export const chatRenderers = [
  { find: byType('pui-template'), renderer: TemplatePart, priority: -30 },
  { find: byType('pui-html'), renderer: HtmlPart, priority: -30 },
  { find: byType('ai-summary'), renderer: SummaryPart, priority: -30 },
  { find: byType('business-navigation'), renderer: NavigationPart, priority: -30 },
  { find: byType('agreement-table'), renderer: AgreementPart, priority: -30 },
]

const sleep = (ms: number, signal?: AbortSignal) => new Promise<void>((resolve, reject) => {
  const t = setTimeout(resolve, ms)
  signal?.addEventListener('abort', () => { clearTimeout(t); reject(new DOMException('aborted', 'AbortError')) }, { once: true })
})

type Reply = string | Item | Array<string | Item>
type Responder = (query: string, context?: unknown) => Reply | Promise<Reply>

function normalize(reply: Reply): Item[] {
  const list = Array.isArray(reply) ? reply : [reply]
  return list.map((r) => (typeof r === 'string' ? { type: 'text', text: r } : r))
}

/**
 * Reactive state for a ChatPanel prototype.
 * Template: <ChatPanel :messages="chat.messages" :processing="chat.processing" :error="chat.error"
 *   :aborted="chat.aborted" :renderers="PartnerUI.chatRenderers" @send="chat.send" @abort="chat.abort"
 *   @retry="chat.retry" @new-conversation="chat.reset" />
 */
export function createChatSession(options: { respond: Responder; delay?: number; initialMessages?: Item[] }) {
  const state = reactive({
    messages: [...(options.initialMessages || [])] as Item[],
    processing: false,
    error: '',
    aborted: false,
  })
  let controller: AbortController | undefined
  let lastQuery = ''
  let seq = 0

  async function run(query: string, context?: unknown) {
    lastQuery = query
    controller?.abort()
    controller = new AbortController()
    const signal = controller.signal
    state.error = ''
    state.aborted = false
    state.processing = true
    const reply = reactive<Item>({ id: `a${++seq}`, role: 'assistant', content: '', loading: true, state: {} })
    state.messages.push(reply)
    try {
      await sleep(options.delay ?? 700, signal)
      const items = normalize(await options.respond(query, context))
      reply.content = items
      reply.uiParts = items
      reply.uiPartsOrdered = true
      reply.loading = false
      reply.state = { completion: 'completed' }
    } catch (e: any) {
      reply.loading = false
      if (e?.name === 'AbortError') { reply.state = { completion: 'aborted' }; state.aborted = true }
      else { reply.state = { completion: 'error' }; reply.replyError = String(e?.message || e); state.error = reply.replyError }
    } finally {
      state.processing = false
    }
  }

  return Object.assign(state, {
    send(query: string, context?: unknown) {
      state.messages.push({ id: `u${++seq}`, role: 'user', content: query, state: { completion: 'completed' } })
      return run(query, context)
    },
    abort() { controller?.abort() },
    retry() {
      const last = state.messages[state.messages.length - 1]
      if (last?.role === 'assistant') state.messages.pop()
      return run(lastQuery)
    },
    reset() { controller?.abort(); state.messages.splice(0); state.error = ''; state.aborted = false; state.processing = false },
  })
}

/** Split text into small deltas and pass structured parts through, as an AsyncIterable<AssistantDelta>. */
export async function* mockStream(reply: Reply, signal?: AbortSignal, opts: { chunk?: number; interval?: number } = {}) {
  for (const item of normalize(reply)) {
    if (signal?.aborted) return
    if (item.type === 'text') {
      const text = String(item.text || '')
      const size = opts.chunk ?? 6
      for (let i = 0; i < text.length; i += size) {
        if (signal?.aborted) return
        await sleep(opts.interval ?? 40)
        yield { kind: 'text', text: text.slice(i, i + size) }
      }
    } else {
      await sleep(opts.interval ?? 120)
      yield { kind: 'part', part: item }
    }
  }
}

/**
 * Fake AgreementAssistantAdapter for AgreementAssistantPanel demos.
 * answers: [{ match: /续签/, reply: ['文字…', { type: 'agreement-table', agreements, total }] }]
 */
export function mockAgreementAdapter(options: { answers?: { match: RegExp | string; reply: Reply }[]; fallback?: Reply; agreements?: Item[] } = {}) {
  const agreements = ref<Item[]>((options.agreements || []).map((a) => ({ ...a })))
  const pick = (q: string) => options.answers?.find((a) => (typeof a.match === 'string' ? q.includes(a.match) : a.match.test(q)))?.reply
    ?? options.fallback ?? `已收到：「${q}」。这是本地演示回复，未连接真实服务。`
  return {
    stream(query: string, signal: AbortSignal) { return mockStream(pick(query), signal) },
    async updateAgreement(id: string, patch: Item) {
      await sleep(300)
      const a = agreements.value.find((x) => x.id === id) || { id }
      Object.assign(a, patch)
      return { ...a }
    },
    async renewAgreement(id: string) {
      await sleep(300)
      const a = agreements.value.find((x) => x.id === id) || { id }
      a.status = '已续签'
      return { ...a }
    },
  }
}
