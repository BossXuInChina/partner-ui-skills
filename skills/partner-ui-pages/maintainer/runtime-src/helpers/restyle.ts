/**
 * restyle(): converts an existing static HTML prototype to the pack components *in place*,
 * without touching the page's own script. Every converted control keeps its original element
 * (hidden) and forwards clicks to it, so `onclick`, data-* attributes and event delegation keep
 * working. A MutationObserver re-applies the rules when the page swaps innerHTML.
 *
 *   PartnerUI.restyle({
 *     root: '.product',                       // where to convert (default: document.body)
 *     rules: [ { selector: 'nav.crumb', as: 'breadcrumb' }, … ],
 *     tokens: true,                           // snap the page's own CSS inside root to Foundation tokens
 *     shield: true,                           // keep bare element CSS (button, table, h3…) off component internals
 *   })
 *
 * Converters (`as`): topnav, breadcrumb, tabs, alert, table, tag, button, smart-tag, smart-mark,
 * icon, footer, pedestal, avatar, input, select, checkbox, search. See references/restyle.md in the skill for options.
 */
import { createApp, h, ref, type Component } from 'vue'
import * as WB from '@workbench/ui-vue3'
import { WorkspaceSmartIcon, WorkspaceSmartTag, AiIcon, ChatPanel } from 'huawei-partner-ai-ui'
import { overlays } from './overlays'

type Rule = { selector: string; as: string; [k: string]: any }
type Options = { root?: string | Element; rules?: Rule[]; tokens?: boolean; shield?: boolean; observe?: boolean; skip?: string; inlineStyles?: boolean; keepSelector?: string; keep?: string; typeset?: boolean | { body?: string; caption?: string; heading?: string } }

const DONE = 'data-pui-done'
const AVATAR: string = (ChatPanel as any)?.props?.avatarSrc?.default || ''
const W = WB as Record<string, any>
let skipSel = '.pui-render, .pui-orig'
let keepSel = ''

const text = (el: Element | null | undefined) => (el?.textContent || '').replace(/\s+/g, ' ').trim()
// Modal bodies opened with overlays.modal() live inside a runtime host but hold page content: they stay convertible.
function skipped(el: Element) { const s = el.closest(skipSel); return !!s && !s.matches('.pui-overlays') }
const ARROW = /\s*(?:→|->|›|»|＞|>)\s*$/
const SPARK = /^\s*✦\s*/
function hideOriginal(el: Element) {
  el.setAttribute(DONE, '1'); el.classList.add('pui-orig'); (el as HTMLElement).hidden = true
}
const fire = (el: Element) => { el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })) }
const forward = (el: Element) => (ev?: Event) => { (ev as Event | undefined)?.preventDefault?.(); (el as HTMLElement).click() }
// Computed margins resolve `auto` to px; detect auto by re-measuring out of flow (auto margins become 0 there).
function specifiedMargin(el: HTMLElement) {
  const flow = getComputedStyle(el)
  const sides = ['Top', 'Right', 'Bottom', 'Left'].map((k) => (flow as any)['margin' + k] as string)
  const prev = el.style.position
  el.style.position = 'absolute'
  const abs = getComputedStyle(el)
  const out = ['Top', 'Right', 'Bottom', 'Left'].map((k, i) => ((abs as any)['margin' + k] === '0px' && sides[i] !== '0px' && (k === 'Left' || k === 'Right') ? 'auto' : sides[i]))
  el.style.position = prev
  return out.join(' ')
}
function mountBefore(anchor: Element, comp: Component, props: Record<string, unknown> = {}, slots?: Record<string, () => unknown>, tag = 'span', cls = '') {
  const host = document.createElement(tag)
  host.className = `pui-render ${cls}`.trim()
  // Keep the original element's place in the layout (outer margins incl. auto, grid/flex placement, float).
  const cs = getComputedStyle(anchor)
  host.style.margin = specifiedMargin(anchor as HTMLElement)
  for (const k of ['alignSelf', 'justifySelf', 'gridColumn', 'gridRow', 'order', 'float'] as const) {
    const v = cs[k] as string
    if (v && !['auto', 'normal', 'none', '0'].includes(v)) (host.style as any)[k] = v
  }
  if (tag === 'div') {
    // Block converters keep the original element's outer spacing so the page layout does not shift.
    if (/pui-crumb/.test(cls)) host.style.padding = cs.padding  // components bring their own inner spacing
    // Inline form controls stay inline at their original width.
    if (/pui-(input|select|search)/.test(cls)) {
      host.style.padding = '0'
      if (cs.display.startsWith('inline')) {
        host.style.display = 'inline-block'
        host.style.verticalAlign = 'middle'
        host.style.width = `${Math.max(160, (anchor as HTMLElement).offsetWidth)}px`
      } else if (cs.width.endsWith('px') && (anchor as HTMLElement).style.width) host.style.width = cs.width
    }
  }
  anchor.parentNode!.insertBefore(host, anchor)
  createApp({ render: () => h(comp, props, slots) }).mount(host)
  return host
}
function mountInside(el: Element, comp: Component, props: Record<string, unknown> = {}, cls = '') {
  const host = document.createElement('span')
  host.className = `pui-render ${cls}`.trim()
  el.appendChild(host)
  createApp({ render: () => h(comp, props) }).mount(host)
  return host
}
function select(scope: Element, sel: string): HTMLElement[] {
  const list = Array.from(scope.querySelectorAll<HTMLElement>(sel))
  if (scope.matches(sel)) list.unshift(scope as HTMLElement)
  return list.filter((el) => !el.hasAttribute(DONE) && !skipped(el))
}

const STATUS: Record<string, string> = { green: 'success', success: 'success', red: 'error', error: 'error', danger: 'error', amber: 'warning', warning: 'warning', orange: 'warning', gray: 'none', grey: 'none', blue: 'info', info: 'info' }
const statusOf = (el: Element, map: Record<string, string> = {}) => {
  const all = { ...STATUS, ...map }
  for (const c of Array.from(el.classList)) if (all[c]) return all[c]
  return 'info'
}

// ---------- converters ----------
const converters: Record<string, (el: HTMLElement, r: Rule) => void> = {
  topnav(nav, r) {
    const top = r.top ? nav.parentElement?.querySelector<HTMLElement>(r.top) ?? null : null
    const itemSel = r.items || 'a, button, span'
    const scope = r.menu ? Array.from(nav.querySelectorAll<HTMLElement>(r.menu)) : [nav]
    const items = scope.flatMap((m) => Array.from(m.querySelectorAll<HTMLElement>(itemSel)))
      .filter((n) => !n.querySelector(itemSel) && text(n))
    const activeSel = r.active || '.on, .active, [aria-current]'
    const tabs = items.map((n, i) => ({ value: 't' + i, label: text(n) }))
    const activeIndex = items.findIndex((n) => n.matches(activeSel) || !!n.closest(activeSel))
    const host = mountBefore(top || nav, W.WorkbenchTopNav, {
      tabs, activeTab: activeIndex >= 0 ? 't' + activeIndex : '',
      sites: r.sites || [{ value: 'partner', label: '企业伙伴网站' }], currentSite: r.currentSite || 'partner', languages: r.languages, currentLanguage: r.currentLanguage,
      mode: r.mode, userState: r.userState,
      'onUpdate:activeTab': (v: string) => { const t = items[Number(v.slice(1))]; (t?.closest('button, a') as HTMLElement | null)?.click() },
    }, undefined, 'div', 'pui-topnav')
    // `extras`: elements inside the hidden bars that must stay visible (e.g. a “场景演示” tag); moved onto the new nav.
    if (r.extras) {
      const box = document.createElement('span')
      box.className = 'pui-topnav-extras'
      ;[top, nav].forEach((bar) => bar?.querySelectorAll<HTMLElement>(r.extras).forEach((x) => box.appendChild(x)))
      if (box.childNodes.length) {
        // Sibling (not inside the component host) so later rules can convert the extras too.
        host.parentNode!.insertBefore(box, host.nextSibling)
        const place = () => { box.style.top = `${host.offsetTop}px` }
        place(); requestAnimationFrame(place)
      }
    }
    if (top) hideOriginal(top)
    hideOriginal(nav)
    if (r.fixHeight) requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(r.fixHeight.target)
      if (target) target.style.height = `${r.fixHeight.total - host.offsetHeight}px`
    })
  },
  breadcrumb(nav, r) {
    const parts = Array.from(nav.querySelectorAll<HTMLElement>(r.items || 'a, button, span')).filter((p) => text(p) && !p.querySelector('a, button, span'))
    const items = parts.map((p, i) => ({ id: 'c' + i, label: text(p), href: p.matches('a, button') ? (p.getAttribute('href') || '#') : undefined }))
    mountBefore(nav, W.WorkbenchBreadcrumb, {
      items,
      onNavigate: (item: any, ev?: Event) => { ev?.preventDefault?.(); parts[Number(String(item?.id).slice(1))]?.click() },
    }, undefined, 'div', 'pui-crumb')
    hideOriginal(nav)
  },
  tabs(bar, r) {
    const kids = Array.from(bar.querySelectorAll<HTMLElement>(r.items || ':scope > *'))
    const items = kids.map((k, i) => ({ value: 't' + i, label: text(k).replace(SPARK, ''), smart: SPARK.test(text(k)), disabled: k.hasAttribute('disabled') }))
    const tabSlot = items.some((it) => it.smart)
      ? { tab: ({ item }: any) => item.smart ? h('span', { class: 'partner-ai pui-inline-ai' }, [h(WorkspaceSmartIcon as Component), item.label]) : item.label }
      : undefined
    const activeSel = r.active || '.active, .on, [aria-selected="true"], [aria-current]'
    let idx = kids.findIndex((k) => k.matches(activeSel))
    if (idx < 0) idx = Math.max(0, kids.findIndex((k) => !k.matches('button, a')))
    const model = ref('t' + idx)
    mountBefore(bar, { render: () => h(W.WorkbenchTabs, {
      modelValue: model.value, items, variant: r.variant || 'basic', size: r.size || 'large',
      'onUpdate:modelValue': (v: string) => {
        const k = kids[Number(v.slice(1))]
        if (!k) return
        const target = k.matches('button, a') ? k : (k.querySelector<HTMLElement>('button, a') || k)
        target.click()
        // Follow the original's own active marker if its script updates it; otherwise select the clicked tab.
        setTimeout(() => {
          const now = kids.findIndex((x) => x.isConnected && x.matches(activeSel))
          if (now >= 0 && now !== idx) model.value = 't' + now
          else if (r.follow !== false) model.value = v
        })
      },
    }, tabSlot) }, {}, undefined, 'div', 'pui-tabs' + (r.center ? ' pui-center' : ''))
    hideOriginal(bar)
  },
  alert(box, r) {
    const link = box.querySelector<HTMLElement>(r.link || 'button, a')
    const clone = box.cloneNode(true) as HTMLElement
    if (link) clone.querySelector(r.link || 'button, a')?.remove()
    // `exclude`: children that are not part of the message (review labels, badges) stay visible next to the alert.
    const outside = r.exclude ? Array.from(box.querySelectorAll<HTMLElement>(r.exclude)) : []
    if (r.exclude) clone.querySelectorAll(r.exclude).forEach((n) => n.remove())
    outside.forEach((n) => box.parentNode!.insertBefore(n, box))
    mountBefore(box, W.WorkbenchAlert, {
      type: r.type || (() => { const m: Record<string, string> = { ...STATUS, ...(r.statusByClass || {}) }; const st = Array.from(box.classList).map((c) => m[c]).find(Boolean); return st && st !== 'none' ? st : r.defaultType || 'info' })(),
      surface: r.surface || 'neutral', placement: r.placement || 'page', showClose: !!r.showClose,
      message: text(clone), linkLabel: link ? text(link) : '', linkHref: link ? '#' : '',
      onLink: (e?: Event) => { e?.preventDefault?.(); link?.click() },
    }, undefined, 'div', 'pui-alert')
    hideOriginal(box)
  },
  table(table, r) {
    const rows = Array.from(table.querySelectorAll('tr'))
    const head = rows[0]
    if (!head || !head.querySelector('th')) return
    apply(table, ruleset.filter((x) => x.as === 'tag' || x.as === 'button'))
    const columns = Array.from(head.children).map((th, i) => ({ key: 'c' + i, title: text(th), align: (th as HTMLElement).style.textAlign || undefined }))
    const body = rows.slice(1)
    const data = body.map((tr, i) => Object.fromEntries([['id', i], ...Array.from(tr.children).map((_c, j) => ['c' + j, ''])]))
    const slots: Record<string, (s: any) => unknown> = {}
    columns.forEach((c) => { slots['cell-' + c.key] = (s: any) => h('span', { class: 'pui-cell', 'data-cell': `${s.rowIndex ?? s.row.id}-${c.key}` }) })
    const caption = r.caption || text(table.closest(r.captionFrom || 'section, article, .card, .white')?.querySelector('h1, h2, h3, h4, b')) || '数据表'
    const host = mountBefore(table, W.WorkbenchTable, { columns, rows: data, rowKey: 'id', ariaLabel: caption, striped: !!r.striped }, slots as any, 'div', 'pui-table')
    body.forEach((tr, i) => Array.from(tr.children).forEach((td, j) => {
      const slot = host.querySelector(`[data-cell="${i}-c${j}"]`)
      if (!slot) return
      const cls = (td as HTMLElement).className
      if (cls) slot.classList.add(...cls.split(/\s+/).filter(Boolean))
      // Cell-level emphasis from the page CSS (e.g. td.bad in red) is carried over as a token color.
      const tc = getComputedStyle(td).color, rc = getComputedStyle(tr).color
      if (tc !== rc) (slot as HTMLElement).style.color = tokenColor(tc, 'color') || tc
      const fw = getComputedStyle(td).fontWeight
      if (Number(fw) >= 500) (slot as HTMLElement).style.fontWeight = 'var(--wb-font-headline-s-font-weight)'
      while (td.firstChild) slot.appendChild(td.firstChild)
    }))
    hideOriginal(table)
  },
  tag(el, r) {
    mountBefore(el, W.WorkbenchTag, { label: text(el), size: r.size || 'small', variant: r.variant || 'status-subtle', status: r.status || statusOf(el, r.statusByClass) })
    hideOriginal(el)
  },
  button(btn, r) {
    let appearance = r.appearance || 'secondary'
    if (!r.appearance) {
      if (btn.matches('.primary, [type=submit]')) appearance = 'primary'
      else if (btn.matches('.link, .text, a')) appearance = 'text'
    }
    const size = r.size || '32'
    let label: string = r.label || text(btn)
    let intent = r.intent
    // Semantics from the label: a trailing arrow (→ › >) means drill-down; the component draws its own chevron.
    if (ARROW.test(label)) { label = label.replace(ARROW, ''); if (appearance === 'text' && !intent) intent = 'drilldown' }
    const smart = SPARK.test(label)
    label = label.replace(SPARK, '')
    const slots: Record<string, () => unknown> = { default: () => label }
    if (smart) slots.icon = () => h('span', { class: 'partner-ai pui-inline-ai' }, [h(WorkspaceSmartIcon as Component)])
    mountBefore(btn, W.WorkbenchButton, { appearance, size, intent, drilldown: r.drilldown, disabled: btn.hasAttribute('disabled'), onClick: forward(btn) }, slots, 'span', `pui-btn pui-btn--${appearance}`)
    hideOriginal(btn)
  },
  'smart-tag'(btn) {
    const fragments: { text: string; emphasis?: string }[] = []
    btn.childNodes.forEach((n) => {
      const t = (n.textContent || '').replace(/✦/g, '')
      if (!t.trim()) return
      const tag = n.nodeType === 1 ? (n as Element).tagName : ''
      fragments.push(tag === 'B' || tag === 'STRONG' ? { text: t, emphasis: 'data' } : { text: t })
    })
    mountBefore(btn, WorkspaceSmartTag as Component, { fragments, onActivate: forward(btn), onClick: forward(btn) }, undefined, 'span', 'pui-smart-tag partner-ai')
    hideOriginal(btn)
  },
  'smart-mark'(el, r) {
    const marker = r.marker || '✦'
    const first = el.firstChild
    if (!first || first.nodeType !== 3 || !(first.textContent || '').trimStart().startsWith(marker)) return
    first.textContent = (first.textContent || '').replace(marker, '').replace(/^\s+/, '')
    el.setAttribute(DONE, '1')
    const host = document.createElement('span')
    host.className = 'pui-render pui-mark partner-ai'
    el.insertBefore(host, first)
    createApp({ render: () => h(WorkspaceSmartIcon as Component) }).mount(host)
  },
  icon(btn, r) {
    btn.setAttribute(DONE, '1')
    if (!btn.getAttribute('aria-label')) btn.setAttribute('aria-label', r.label || text(btn))
    btn.textContent = ''
    mountInside(btn, AiIcon as Component, { name: r.icon }, 'pui-icon partner-ai')
  },
  footer(f, r) {
    const spans = f.querySelectorAll('span, p, div')
    const copyright = r.copyright || text(spans[0])
    const links = (r.links || (spans[1] ? text(spans[1]).split(/\s+/) : [])).filter(Boolean).map((l: string, i: number) => ({ id: 'l' + i, label: l }))
    mountBefore(f, W.WorkbenchFooter, { copyright, links, registration: r.registration || { id: 'registration', label: '' } }, undefined, 'div', 'pui-footer')
    hideOriginal(f)
  },
  pedestal(el, r) {
    const list: string[] = r.names || []
    const idx = Array.from(el.parentElement?.parentElement?.querySelectorAll(r.selector) || []).indexOf(el)
    const name = list.length ? list[Math.max(0, idx) % list.length] : r.name
    if (!name) return
    mountBefore(el, W.WorkbenchPedestalIcon, { name }, undefined, 'span', 'pui-pedestal')
    hideOriginal(el)
  },
  // ---- form controls: the component edits the original element and fires input/change on it,
  // so page scripts that read `.value` / `.checked` or listen for events keep working.
  input(el, r) {
    const inp = el as HTMLInputElement
    const model = ref(inp.value)
    inp.addEventListener('input', () => { if (inp.value !== model.value) model.value = inp.value })
    const label = r.label || inp.getAttribute('aria-label') || inp.placeholder || ''
    mountBefore(inp, { render: () => h(W.WorkbenchInput, {
      modelValue: model.value, type: inp.tagName === 'TEXTAREA' ? 'textarea' : inp.type === 'password' ? 'password' : 'text',
      placeholder: inp.placeholder || undefined, disabled: inp.disabled, ariaLabel: label, name: inp.name || undefined,
      'onUpdate:modelValue': (v: string) => { model.value = v; inp.value = v; fire(inp) },
    }) }, {}, undefined, 'div', 'pui-input')
    hideOriginal(inp)
  },
  search(el, r) {
    const inp = el as HTMLInputElement
    const model = ref(inp.value)
    mountBefore(inp, { render: () => h(W.WorkbenchSearch, {
      modelValue: model.value, placeholder: inp.placeholder || r.placeholder || undefined, disabled: inp.disabled,
      'onUpdate:modelValue': (v: string) => { model.value = v; inp.value = v; fire(inp) },
      onSearch: () => inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })),
    }) }, {}, undefined, 'div', 'pui-search')
    hideOriginal(inp)
  },
  select(el, r) {
    const sel = el as HTMLSelectElement
    const options = Array.from(sel.options).map((o) => ({ value: o.value, label: o.text, disabled: o.disabled }))
    const model = ref(sel.multiple ? Array.from(sel.selectedOptions).map((o) => o.value) : [sel.value])
    sel.addEventListener('change', () => { model.value = sel.multiple ? Array.from(sel.selectedOptions).map((o) => o.value) : [sel.value] })
    mountBefore(sel, { render: () => h(W.WorkbenchSelect, {
      modelValue: model.value, options, multiple: sel.multiple, label: r.label || sel.getAttribute('aria-label') || '', teleportPanel: true,
      'onUpdate:modelValue': (v: string[]) => {
        model.value = v
        Array.from(sel.options).forEach((o) => { o.selected = v.includes(o.value) })
        fire(sel)
      },
    }) }, {}, undefined, 'div', 'pui-select')
    hideOriginal(sel)
  },
  checkbox(el, r) {
    const box = el as HTMLInputElement
    const wrap = box.closest('label')
    const label = r.label ?? (wrap ? text(wrap) : '')
    const model = ref(box.checked)
    box.addEventListener('change', () => { model.value = box.checked })
    mountBefore(wrap || box, { render: () => h(W.WorkbenchCheckbox, {
      modelValue: model.value, label, ariaLabel: label || box.getAttribute('aria-label') || undefined, disabled: box.disabled,
      'onUpdate:modelValue': (v: boolean) => { model.value = v; if (box.checked !== v) box.click() },
    }) }, {}, undefined, 'span', 'pui-checkbox')
    hideOriginal(wrap || box)
  },
  // ---- AI surfaces in prototype DOM: AI UI tokens + AiSummaryCard / ChatPanel geometry, original content kept.
  'ai-surface'(el, r) {
    el.setAttribute(DONE, '1')
    el.classList.add('partner-ai', 'pui-ai-surface')
    if (r.title) el.querySelectorAll(r.title).forEach((t) => t.classList.add('pui-ai-title'))
  },
  'ai-panel'(panel, r) {
    panel.setAttribute(DONE, '1')
    panel.classList.add('partner-ai', 'pui-ai-panel')
    const part = (sel: string | undefined, cls: string) => sel && panel.querySelectorAll(sel).forEach((n) => n.classList.add(cls))
    const markParts = () => {
      part(r.head, 'pui-ai-head'); part(r.tools, 'pui-ai-tools'); part(r.topic, 'pui-ai-topic'); part(r.body, 'pui-ai-body')
      part(r.user, 'pui-ai-user'); part(r.answer, 'pui-ai-answer'); part(r.answerTitle, 'pui-ai-answer-title'); part(r.composer, 'pui-ai-composer')
      part(r.input, 'pui-ai-input'); part(r.disclaimer, 'pui-ai-disclaimer')
    }
    const extra = () => { part(r.notes, 'pui-ai-note'); part(r.cards, 'pui-ai-card'); part(r.cardInner, 'pui-ai-note') }
    markParts(); extra()
    new MutationObserver(extra).observe(panel, { childList: true, subtree: true })
    // Answers appended later by the page script (send, follow-ups) get the same skin.
    new MutationObserver(markParts).observe(panel, { childList: true, subtree: true })
    // Title: the AI UI default assistant avatar replaces a leading ✦ (same as the ChatPanel header).
    const title = r.title ? panel.querySelector<HTMLElement>(r.title) : null
    if (title && !title.querySelector('.pui-ai-avatar')) {
      title.classList.add('pui-ai-head-title')
      const first = title.firstChild
      if (first && first.nodeType === 3) first.textContent = (first.textContent || '').replace(/^\s*✦\s*/, '')
      const img = document.createElement('img')
      img.className = 'pui-ai-avatar'; img.alt = ''; img.src = AVATAR
      title.insertBefore(img, title.firstChild)
    }
    // Tool and send buttons keep their element (and handlers); only the glyph becomes the AI UI icon.
    const iconize = (btn: HTMLElement, name: string, label: string, cls: string) => {
      if (btn.querySelector('.pui-ai-icon')) return
      btn.setAttribute(DONE, '1'); btn.classList.add(cls)
      if (!btn.getAttribute('aria-label')) btn.setAttribute('aria-label', label || text(btn))
      if (!btn.title) btn.title = btn.getAttribute('aria-label') || ''
      btn.textContent = ''
      mountInside(btn, AiIcon as Component, { name }, 'pui-ai-icon partner-ai')
    }
    for (const [sel, spec] of Object.entries((r.icons || {}) as Record<string, { icon: string; label?: string }>)) {
      panel.querySelectorAll<HTMLElement>(sel).forEach((b) => iconize(b, spec.icon, spec.label || '', 'pui-ai-tool'))
    }
    if (r.send) panel.querySelectorAll<HTMLElement>(r.send).forEach((b) => iconize(b, 'composer.send', '发送', 'pui-ai-send'))
    // Composer = ChatPanel sender: send button inside the input box (bottom-right), disclaimer centred below.
    if (r.composer && r.input) panel.querySelectorAll<HTMLElement>(r.composer).forEach((c) => {
      const box = c.querySelector<HTMLElement>(r.input)
      const send = r.send ? c.querySelector<HTMLElement>(r.send) : null
      const field = box?.querySelector<HTMLTextAreaElement | HTMLInputElement>('textarea, input')
      if (box && send && !box.contains(send)) {
        const oldRow = send.parentElement
        const foot = document.createElement('span'); foot.className = 'pui-ai-input-foot'
        foot.appendChild(send); box.appendChild(foot)
        const disc = r.disclaimer ? c.querySelector<HTMLElement>(r.disclaimer) : null
        if (disc) { disc.classList.add('pui-ai-disclaimer'); c.appendChild(disc) }
        if (oldRow && oldRow !== c && !oldRow.children.length && !text(oldRow)) oldRow.hidden = true
      }
      if (field && send) {
        const sync = () => send.classList.toggle('is-empty', !field.value.trim())
        field.addEventListener('input', sync); sync()
        c.addEventListener('submit', () => setTimeout(sync)); send.addEventListener('click', () => setTimeout(sync))
      }
    })
    // Reply actions (ChatPanel answer footer): regenerate · copy · like · dislike under each completed answer.
    if (r.replyActions) {
      const add = () => panel.querySelectorAll<HTMLElement>(r.replyActions).forEach((ans) => {
        if (ans.querySelector(':scope > .pui-ai-reply-actions')) return
        const bar = document.createElement('div')
        bar.className = 'pui-ai-reply-actions'; bar.setAttribute('aria-label', '回复信息操作')
        const defs: [string, string][] = [['message.regenerate', '重新生成答案'], ['message.copy', '复制'], ['message.like', '有帮助'], ['message.dislike', '没帮助']]
        defs.forEach(([icon, label]) => {
          const b = document.createElement('button')
          b.type = 'button'; b.className = 'pui-ai-reply-action'; b.setAttribute('aria-label', label); b.title = label; b.setAttribute(DONE, '1')
          bar.appendChild(b)
          mountInside(b, AiIcon as Component, { name: icon }, 'pui-ai-icon partner-ai')
          b.addEventListener('click', () => {
            if (icon === 'message.copy') {
              const t = text(ans).replace(text(bar), '')
              navigator.clipboard?.writeText(t).catch(() => {})
              overlays.message('已复制', 'success')
            } else if (icon === 'message.regenerate') {
              if (typeof r.onRegenerate === 'function') r.onRegenerate(ans)
              else { ans.animate?.([{ opacity: 0.3 }, { opacity: 1 }], { duration: 400 }); overlays.message('已重新生成（演示）', 'success') }
            } else {
              const on = b.getAttribute('aria-pressed') !== 'true'
              bar.querySelectorAll('[aria-pressed]').forEach((x) => x.setAttribute('aria-pressed', 'false'))
              b.setAttribute('aria-pressed', String(on))
            }
          })
        })
        ans.appendChild(bar)
      })
      add()
      new MutationObserver(add).observe(panel, { childList: true, subtree: true })
    }
  },
  'ai-launcher'(btn) {
    if (btn.querySelector('.pui-mark')) return
    btn.setAttribute(DONE, '1'); btn.classList.add('partner-ai', 'pui-ai-launcher')
    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative'  // keep the page's own positioning
    const first = btn.firstChild
    if (first && first.nodeType === 3) first.textContent = (first.textContent || '').replace(/^\s*✦\s*/, '')
    const host = document.createElement('span')
    host.className = 'pui-render pui-mark partner-ai'
    btn.insertBefore(host, btn.firstChild)
    createApp({ render: () => h(WorkspaceSmartIcon as Component) }).mount(host)
  },
  // Skin only: give a prototype box the Workbench card look (display-white / display-tinted) and metric typography.
  // variant: white | tinted | operation (white + 1px border, holds its own buttons) | navigation (shadow, whole-card link).
  card(el, r) {
    el.setAttribute(DONE, '1')
    const v = ({ white: 'white', 'display-white': 'white', tinted: 'tinted', 'display-tinted': 'tinted', operation: 'operation', navigation: 'navigation' } as Record<string, string>)[r.variant || 'white'] || 'white'
    el.classList.add('pui-card', 'pui-card--' + v)
    const mark = (sel: string | undefined, cls: string) => sel && el.querySelectorAll(sel).forEach((n) => n.classList.add(cls))
    mark(r.title, 'pui-card-title'); mark(r.value, 'pui-metric-value'); mark(r.label, 'pui-metric-label'); mark(r.note, 'pui-metric-note')
    mark(r.actions, 'pui-card-actions')   // bottom action area: 24px gap above, 24px bottom padding (Card actions slot)
    mark(r.inner, 'pui-card-inner')       // nested info blocks → tinted surface
    if (r.actions && el.querySelector(r.actions)) el.classList.add('pui-card--with-actions')
  },
  // Pure structure (grid, columns, separators) — no component applies; borders/colours are snapped to tokens.
  layout(el) { el.setAttribute(DONE, '1'); el.classList.add('pui-layout') },
  // A visual block the packs cannot express: kept, token-snapped and listed for reviewers.
  custom(el, r) { el.setAttribute(DONE, '1'); el.classList.add('pui-custom'); el.dataset.puiName = r.name || el.dataset.puiName || el.className },
  // ---- semantic converters: static blocks whose meaning matches a pack component ----
  // Ordered stages / checklist (`ol` of title + description, milestone rows) → WorkbenchSteps.
  steps(el, r) {
    const read = () => {
      const nodes = Array.from(el.querySelectorAll<HTMLElement>(r.items || ':scope > *')).filter((n) => text(n))
      const pick = (n: HTMLElement, sel?: string) => (sel ? text(n.querySelector(sel)) : '')
      const items = nodes.map((n, i) => ({ key: 's' + i, title: pick(n, r.itemTitle) || text(n), description: pick(n, r.itemDescription) || undefined }))
      let current = typeof r.current === 'number' ? r.current : r.active ? nodes.findIndex((n) => n.matches(r.active) || !!n.querySelector(r.active)) : 0
      return { items, current: Math.max(0, current) }
    }
    const state = ref(read())
    if (!state.value.items.length) return
    // The page script may rewrite the original (e.g. a chosen project's date): mirror it.
    new MutationObserver(() => { state.value = read() }).observe(el, { childList: true, characterData: true, subtree: true })
    mountBefore(el, { render: () => h(W.WorkbenchSteps, { items: state.value.items, modelValue: state.value.current, current: state.value.current, variant: r.variant || 'horizontal', size: r.size || 'medium', readonly: true, ariaLabel: r.label || '流程步骤' }) }, {}, undefined, 'div', 'pui-steps')
    hideOriginal(el)
  },
  // Dated events (time + title + note) → WorkbenchTimeline.
  timeline(el, r) {
    const read = () => Array.from(el.querySelectorAll<HTMLElement>(r.items || ':scope > *')).filter((n) => text(n)).map((n, i) => ({ key: 'e' + i, time: text(n.querySelector(r.itemTime || 'time, span')), title: text(n.querySelector(r.itemTitle || 'b, strong, h4')), description: r.itemDescription ? text(n.querySelector(r.itemDescription)) : undefined, status: i === (r.current ?? -1) ? 'process' : 'default' }))
    const items = ref(read())
    if (!items.value.length) return
    new MutationObserver(() => { items.value = read() }).observe(el, { childList: true, characterData: true, subtree: true })
    mountBefore(el, { render: () => h(W.WorkbenchTimeline, { items: items.value, nodeType: 'dot', label: r.label || '事件时间轴' }) }, {}, undefined, 'div', 'pui-timeline')
    hideOriginal(el)
  },
  // Horizontal share bars (label · track/fill · value). No chart component in the packs: skin as a
  // marked custom block with Foundation colors and type (fill width stays from the page).
  meter(el, r) {
    el.setAttribute(DONE, '1')
    el.classList.add('pui-meter', 'pui-custom')
    if (!el.dataset.puiName) el.dataset.puiName = r.name || '横向占比条（包内无图表组件）'
    const mark = (sel: string | undefined, cls: string) => sel && el.querySelectorAll(sel).forEach((n) => n.classList.add(cls))
    mark(r.row || ':scope > *', 'pui-meter-row'); mark(r.label, 'pui-meter-label'); mark(r.track, 'pui-meter-track'); mark(r.fill, 'pui-meter-fill'); mark(r.value, 'pui-meter-value')
  },
  avatar(el, r) {
    mountBefore(el, W.WorkbenchAvatar, { text: text(el).slice(0, 1), size: r.size || 40, color: r.color || 'blue' }, undefined, 'span', 'pui-avatar')
    hideOriginal(el)
  },
}

let ruleset: Rule[] = []
function apply(scope: Element, rules: Rule[]) {
  for (const r of rules) {
    const fn = converters[r.as]
    if (!fn) { console.warn('[PartnerUI.restyle] unknown converter', r.as); continue }
    for (const el of select(scope, r.selector)) {
      if (r.not && el.matches(r.not)) continue
      try { fn(el, r) } catch (e) { console.error('[PartnerUI.restyle]', r, e) }
    }
  }
}

// ---------- scaled canvases ----------
// Prototype canvases are often scaled with `transform: scale()`. Workbench measures its TopNav/Tabs
// indicator with getBoundingClientRect (scaled) and writes it in local px, so it lands short.
// Re-express the written translate/width in local px. Only position/size, never visuals.
const INDICATORS = '.wb-top-nav__indicator, .wb-tabs__indicator, .wb-tabs__segment-highlight'
function fixScaledIndicators(root: Element) {
  const fix = (el: HTMLElement) => {
    const ref = el.parentElement
    if (!ref) return
    const ratio = ref.offsetWidth ? ref.getBoundingClientRect().width / ref.offsetWidth : 1
    const style = el.getAttribute('style') || ''
    if (Math.abs(ratio - 1) < 0.01 || el.dataset.puiFixed === style) return
    const next = style.replace(/(translateX\()(-?[\d.]+)px/, (_m, a, v) => `${a}${(+v / ratio).toFixed(2)}px`)
      .replace(/(width:\s*)([\d.]+)px/, (_m, a, v) => `${a}${(+v / ratio).toFixed(2)}px`)
    el.dataset.puiFixed = next
    el.setAttribute('style', next)
  }
  const mo = new MutationObserver((records) => records.forEach((r) => {
    const t = r.target as HTMLElement
    if (r.type === 'attributes' && t.matches?.(INDICATORS)) fix(t)
  }))
  mo.observe(root, { attributes: true, attributeFilter: ['style'], subtree: true })
  root.querySelectorAll<HTMLElement>(INDICATORS).forEach(fix)
}

// ---------- CSS: shield bare element rules, snap to Foundation tokens ----------
const BARE = /^(?:[a-z][a-z0-9]*)(?:\[[^\]]+\]|:[a-z-]+(?:\([^)]*\))?)*(?:\s+[a-z][a-z0-9]*)?$/
const EXCL = '.pui-render *, [class*="wb-"], [class*="wb-"] *, [class*="workbench"] *, [class*="tr-"], [class*="tr-"] *, .partner-ai *'
function eachRule(fn: (r: CSSStyleRule) => void) {
  for (const sheet of Array.from(document.styleSheets)) {
    const owner = sheet.ownerNode as Element | null
    if (owner?.hasAttribute?.('data-pui-runtime') || /partner-ui-runtime/.test(sheet.href || '')) continue
    let rules: CSSRuleList
    try { rules = sheet.cssRules } catch { continue }
    const walk = (list: CSSRuleList) => Array.from(list).forEach((r) => {
      if (r instanceof CSSStyleRule) fn(r)
      else if ('cssRules' in r) walk((r as CSSGroupingRule).cssRules)
    })
    walk(rules)
  }
}
// Component internals: never the target of page rules.
const INNER = '.pui-render *, [class*="wb-"] *, [class*="tr-"] *'
function shieldElementRules() {
  eachRule((rule) => {
    const parts = rule.selectorText.split(',').map((s) => s.trim())
    if (parts.every((p) => BARE.test(p))) { rule.selectorText = parts.map((p) => `:where(${p}:not(${EXCL}))`).join(','); return }
    // Scoped rules whose subject is a bare element (`.card th`, `.notice b`) would also reach into a component
    // mounted inside that scope (e.g. a WorkbenchTable header): keep them on the page's own elements.
    let changed = false
    const next = parts.map((p) => {
      if (p.includes('::') || p.includes(':not(.pui-render')) return p
      const subject = p.split(/\s*[\s>+~]\s*/).pop() || ''
      if (!/^[a-z][a-z0-9]*(?::[a-z-]+(?:\([^)]*\))?)*$/i.test(subject)) return p
      changed = true
      return `${p}:not(${INNER})`
    })
    if (changed) rule.selectorText = next.join(',')
  })
}

function parseRgb(v: string) {
  const m = v.match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?/)
  if (!m) return null
  const a = m[4] === undefined ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])
  return [+m[1], +m[2], +m[3], a] as const
}
function hsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [h * 60, s, l]
}
export function tokenColor(value: string, prop: string) {
  const c = parseRgb(value)
  if (!c) return null
  const [r, g, b, a] = c
  if (a < 0.35) return null
  const [hue, sat, l] = hsl(r, g, b)
  const spread = Math.max(r, g, b) - Math.min(r, g, b)
  // Grays, including the blue-grays prototypes use for text and borders, map to neutral tokens.
  const neutral = l >= 0.9 ? spread < 12 || sat < 0.3 : spread < 30 || sat < 0.22 || (l < 0.5 && sat < 0.36)
  const isText = prop === 'color'
  const isBorder = prop.startsWith('border') || prop.startsWith('outline')
  if (neutral) {
    if (isText) {
      if (l > 0.95) return null
      if (l < 0.3) return 'var(--wb-color-text-primary)'
      if (l < 0.52) return 'var(--wb-color-icon-hover)'
      if (l < 0.64) return 'var(--wb-color-text-secondary)'
      return 'var(--wb-color-text-placeholder)'
    }
    if (isBorder) return l >= 0.93 ? 'var(--wb-color-border-separator-subtle)' : l >= 0.8 ? 'var(--wb-color-border-separator)' : 'var(--wb-color-border)'
    if (l >= 0.985) return 'var(--wb-color-surface-container)'
    if (l >= 0.93) return 'var(--wb-color-surface-page)'
    if (l >= 0.8) return 'var(--wb-color-border-separator)'
    return null
  }
  const light = l >= 0.88
  if (hue >= 190 && hue < 255) return isText ? (l < 0.7 ? 'var(--wb-color-text-action)' : null) : light ? 'var(--wb-color-info-primary-subtler)' : 'var(--wb-color-info-primary)'
  if (hue >= 345 || hue < 15) return isText ? 'var(--wb-color-error)' : light ? 'var(--wb-color-error-subtle)' : 'var(--wb-color-brand)'
  if (hue >= 15 && hue < 60) return isText ? 'var(--wb-color-alert)' : light ? 'var(--wb-color-alert-subtle)' : 'var(--wb-color-alert)'
  if (hue >= 90 && hue < 175) return isText ? 'var(--wb-color-success)' : light ? 'var(--wb-color-success-primary-subtle)' : 'var(--wb-color-success)'
  return null
}
const FONT_STEPS: [number, number][] = [[11.5, 12], [13.5, 14], [14.5, 14], [16.5, 16], [18.5, 18], [21.5, 20], [25.5, 24], [29.5, 28]]
export const snapFont = (px: number) => (FONT_STEPS.find(([lim]) => px <= lim)?.[1] ?? 32)
// Foundation type scale pairs (font-size → line-height).
const LINE: Record<number, number> = { 10: 18, 12: 20, 14: 22, 16: 24, 18: 26, 20: 28, 24: 32, 28: 36, 32: 40 }
const snap4 = (px: number) => (px <= 2 ? px : Math.max(4, Math.round(px / 4) * 4))
const snapRadius = (px: number) => (px <= 1 || px >= 20 ? px : [2, 4, 6, 8, 12].reduce((a, b) => (Math.abs(b - px) < Math.abs(a - px) ? b : a)))
const COLOR_PROPS = ['color', 'background-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'outline-color']
const SPACE_PROPS = ['padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'row-gap', 'column-gap']
const RADIUS_PROPS = ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius']
function snapStyle(style: CSSStyleDeclaration) {
  for (const p of COLOR_PROPS) {
    const v = style.getPropertyValue(p)
    if (!v || v.includes('var(')) continue
    const t = tokenColor(v, p.startsWith('border') ? 'border' : p)
    if (t) style.setProperty(p, t, style.getPropertyPriority(p))
  }
  const fs = style.getPropertyValue('font-size')
  if (fs.endsWith('px')) {
    const size = snapFont(parseFloat(fs))
    style.setProperty('font-size', `${size}px`, style.getPropertyPriority('font-size'))
    style.setProperty('line-height', `${LINE[size] ?? Math.round(size * 1.4)}px`, style.getPropertyPriority('font-size'))
  }
  for (const p of SPACE_PROPS) {
    const v = style.getPropertyValue(p)
    if (/^-?[\d.]+px$/.test(v)) style.setProperty(p, `${Math.sign(parseFloat(v)) * snap4(Math.abs(parseFloat(v)))}px`, style.getPropertyPriority(p))
  }
  for (const p of RADIUS_PROPS) {
    const v = style.getPropertyValue(p)
    if (/^[\d.]+px$/.test(v)) style.setProperty(p, `${snapRadius(parseFloat(v))}px`, style.getPropertyPriority(p))
  }
  const sh = style.getPropertyValue('box-shadow')
  if (sh && sh !== 'none' && !sh.includes('var(') && !sh.includes('inset')) style.setProperty('box-shadow', 'var(--wb-shadow-sm)')
  const fw = style.getPropertyValue('font-weight')
  if (fw === '600' || fw === '700' || fw === 'bold') style.setProperty('font-weight', '500')
}
function tokenizeStyles(roots: Element[], keep: string) {
  const keepClasses = (keepSel.match(/\.[\w-]+/g) || []).map((c) => c.slice(1))
  const classes = new Set<string>()
  roots.forEach((r) => { r.classList.forEach((c) => classes.add(c)); r.querySelectorAll('[class]').forEach((el) => el.classList.forEach((c) => classes.add(c))) })
  eachRule((rule) => {
    const parts = rule.selectorText.split(',')
    const ok = parts.some((p) => {
      const cls = p.match(/\.[\w-]+/g)?.map((c) => c.slice(1)) || []
      const kept = (keep && p.match(new RegExp(keep))) || keepClasses.some((k) => cls.includes(k))
      return cls.length > 0 && cls.every((c) => classes.has(c)) && !kept
    })
    if (ok) snapStyle(rule.style)
  })
}
function snapInline(scope: Element) {
  select(scope, '[style]').forEach((el) => {
    if (el.dataset.puiStyled || el.closest('[data-pui-keep]') || (keepSel && el.closest(keepSel))) return
    el.dataset.puiStyled = '1'
    snapStyle(el.style)
  })
}

// ---------- typeset: semantic type roles on the page's own text ----------
// Prototypes set many sizes (10/11/12/13/15px…). Foundation has body 14/22, caption 12/20 and headline steps.
// Each text-bearing element gets a role: heading (h1–h6 / bold), body (main text → 14), caption (auxiliary → 12).
const CAPTION_HINT = /note|hint|caption|source|meta|label|desc|tip|muted|eyebrow|sub|time|date|unit|foot|aux|legend|baseline|context|small|owner/i
let typesetCfg: { body?: string; caption?: string; heading?: string } = {}
function ownText(el: Element) {
  for (const n of Array.from(el.childNodes)) if (n.nodeType === 3 && (n.textContent || '').trim()) return true
  return false
}
function headingStep(px: number) { return px >= 26 ? 'xxl' : px >= 22 ? 'xl' : px >= 19 ? 'l' : px >= 17 ? 'm' : px >= 15 ? 's' : px >= 13 ? 'xs' : 'xxs' }
function typeset(scope: Element) {
  const list = [scope, ...Array.from(scope.querySelectorAll('*'))].filter((el): el is HTMLElement =>
    el instanceof HTMLElement && !el.dataset.puiT && !skipped(el) && !el.closest('svg, [class*="wb-"], [class*="tr-"], [data-pui-keep], .pui-orig, .sr-only, .pui-render > *') &&
    !(keepSel && el.closest(keepSel)) && !['SCRIPT', 'STYLE', 'BUTTON', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION'].includes(el.tagName) && ownText(el))
  // Read everything first, then write, so em-based children are measured against the original sizes.
  const roles = list.map((el) => {
    const cs = getComputedStyle(el)
    const px = parseFloat(cs.fontSize), weight = Number(cs.fontWeight) || 400
    const cls = `${el.className} ${(el.parentElement?.className || '')}`
    if (typesetCfg.heading && el.matches(typesetCfg.heading)) return 'h-' + headingStep(px)
    if (typesetCfg.caption && el.matches(typesetCfg.caption)) return 'caption'
    if (typesetCfg.body && el.matches(typesetCfg.body)) return 'body'
    if (/^H[1-6]$/.test(el.tagName) || (weight >= 500 && px >= 13 && el.tagName !== 'TD')) return 'h-' + headingStep(px)
    if (px >= 15) return ''                                   // large numbers / display text: size already snapped
    if (el.tagName === 'SMALL' || el.tagName === 'FIGCAPTION' || el.tagName === 'TIME') return 'caption'
    if (px < 11.5) return 'caption'
    if (px < 13.5 && CAPTION_HINT.test(cls)) return 'caption'
    return weight >= 500 ? 'h-xs' : 'body'
  })
  // Text colours: prototype greys (often blue-tinted) → Foundation text tokens; semantic colours stay semantic.
  const colors = list.map((el) => { const c = getComputedStyle(el).color; const t = tokenColor(c, 'color'); return t && !el.closest('.partner-ai') ? t : null })
  list.forEach((el, i) => {
    el.dataset.puiT = roles[i] || '-'
    if (roles[i]) el.classList.add('pui-t-' + roles[i])
    if (colors[i] && !el.style.getPropertyPriority('color')) el.style.color = colors[i]!
  })
}

// ---------- audit: what is still prototype-styled ----------
// Lists visible blocks/controls inside the root that no converter, skin or pui-custom marker covers,
// so an agent (or reviewer) can map each to a component by meaning or justify it.
// Converted or explicitly custom: the whole subtree is accounted for. Skinned containers (pui-card, pui-ai-*)
// only cover themselves — styled blocks nested inside them still need a decision.
const OWNED = '.pui-render, .pui-orig, .pui-custom, .pui-meter, [data-pui-keep]'
const handled = (el: Element) => Array.from(el.classList).some((c) => c.startsWith('pui-') && !c.startsWith('pui-t-'))
export function audit(root: string | Element = document.body) {
  const roots = typeof root === 'string' ? Array.from(document.querySelectorAll(root)) : [root]
  const found: { kind: string; path: string; text: string }[] = []
  const path = (el: Element) => { const parts: string[] = []; let n: Element | null = el; for (let i = 0; n && i < 3; i++, n = n.parentElement) parts.unshift(n.tagName.toLowerCase() + (n.classList[0] ? '.' + n.classList[0] : '')); return parts.join(' > ') }
  const visible = (el: HTMLElement) => !!(el.offsetWidth || el.offsetHeight) && getComputedStyle(el).visibility !== 'hidden'
  roots.forEach((r) => r.querySelectorAll<HTMLElement>('*').forEach((el) => {
    if (el.closest(OWNED) || skipped(el) || (keepSel && el.closest(keepSel)) || !visible(el)) return
    const cs = getComputedStyle(el)
    if (el.matches('button, input:not([type=hidden]), select, textarea, table') && !handled(el) && !el.closest('.pui-ai-body, .pui-ai-input')) { found.push({ kind: 'native-control', path: path(el), text: text(el).slice(0, 40) }); return }
    if (/[✦⌕♧⌄→›☰▤●○◆]/.test(Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join(''))) found.push({ kind: 'glyph-icon', path: path(el), text: text(el).slice(0, 40) })
    const box = (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent') || cs.backgroundImage !== 'none' || parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0 || cs.boxShadow !== 'none'
    if (box && !handled(el) && el.offsetHeight >= 24 && el.children.length) found.push({ kind: 'styled-block', path: path(el), text: text(el).slice(0, 40) })
  }))
  return found
}

const DEFAULT_RULES: Rule[] = [
  { selector: 'nav[aria-label*="面包屑"], nav[aria-label*="readcrumb"], .breadcrumb', as: 'breadcrumb' },
  { selector: '[role=tablist]', as: 'tabs' },
  { selector: 'table', as: 'table' },
  { selector: '.tag, .badge', as: 'tag' },
  { selector: 'button.primary, .btn-primary', as: 'button', appearance: 'primary' },
  { selector: 'button.link, .btn-link', as: 'button', appearance: 'text' },
  { selector: 'button:not([class*=icon]):not([aria-label])', as: 'button' },
]

export function restyle(options: Options = {}) {
  document.documentElement.dataset.puiRestyled = '1'
  const roots = options.root
    ? (typeof options.root === 'string' ? Array.from(document.querySelectorAll(options.root)) : [options.root])
    : [document.body]
  if (options.skip) skipSel = `.pui-render, .pui-orig, ${options.skip}`
  keepSel = options.keep || ''
  const doType = options.typeset !== false && !!options.tokens
  if (typeof options.typeset === 'object') typesetCfg = options.typeset
  ruleset = options.rules || DEFAULT_RULES
  if (options.shield !== false) shieldElementRules()
  if (options.tokens) tokenizeStyles(roots, options.keepSelector || '')
  roots.forEach((root) => {
    root.setAttribute("data-pui-root", "")
    fixScaledIndicators(root)
    if (options.inlineStyles !== false && options.tokens) snapInline(root)
    apply(root, ruleset)
    if (doType) typeset(root)
    if (options.observe !== false) {
      const mo = new MutationObserver((records) => {
        const added: Element[] = []
        records.forEach((r) => r.addedNodes.forEach((n) => { if (n.nodeType === 1 && !skipped(n as Element)) added.push(n as Element) }))
        if (!added.length) return
        added.forEach((n) => { if (options.tokens && options.inlineStyles !== false) snapInline(n); apply(n, ruleset); if (doType) typeset(n) })
        mo.takeRecords()
      })
      mo.observe(root, { childList: true, subtree: true })
    }
  })
  // Indicators (TopNav/Tabs underline) are measured on mount; re-measure once the hidden originals are gone and fonts load.
  const remeasure = () => window.dispatchEvent(new Event('resize'))
  requestAnimationFrame(() => requestAnimationFrame(remeasure))
  document.fonts?.ready.then(remeasure)
  return { apply: (scope: Element) => { apply(scope, ruleset); if (doType) typeset(scope) }, audit: () => audit(roots[0]) }
}
restyle.audit = audit
