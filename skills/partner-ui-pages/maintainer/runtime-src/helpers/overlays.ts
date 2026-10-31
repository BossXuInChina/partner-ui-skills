/**
 * Imperative Workbench dialogs and messages for pages that are not written in Vue
 * (for example when restyling an existing prototype whose script calls modal()/toast()).
 *
 *   PartnerUI.overlays.modal({ title, html, okText, cancelText, onOk, onCancel, size })
 *   PartnerUI.overlays.close()
 *   PartnerUI.overlays.message(text, type)   // info | success | warning | error | loading
 */
import { createApp, h, reactive, ref } from 'vue'
import { WorkbenchModal, GlobalMessageStack } from '@workbench/ui-vue3'

type ModalOptions = { title: string; html?: string; okText?: string; cancelText?: string | false; size?: string; onOk?: () => void | boolean; onCancel?: () => void; onClose?: () => void; onOpen?: (body: HTMLElement) => void }

const state = reactive({ open: false, key: 0, opts: { title: '' } as ModalOptions })
const items = ref<any[]>([])
let mounted = false

function ensure() {
  if (mounted) return
  mounted = true
  const host = document.createElement('div')
  host.className = 'pui-render pui-overlays'
  document.body.appendChild(host)
  createApp({
    render: () => [
      h(WorkbenchModal as any, {
        key: state.key,
        modelValue: state.open,
        title: state.opts.title,
        size: state.opts.size || 'm',
        actions: [
          ...(state.opts.cancelText === false ? [] : [{ id: 'cancel', label: state.opts.cancelText || '取消', appearance: 'secondary' }]),
          { id: 'ok', label: state.opts.okText || '确定', appearance: 'primary' },
        ],
        'onUpdate:modelValue': (v: boolean) => { state.open = v; if (!v) state.opts.onClose?.() },
        onAction: (e: any) => {
          const id = e?.id ?? e?.action?.id ?? e
          if (id === 'ok') { if (state.opts.onOk?.() === false) return }
          else state.opts.onCancel?.()
          state.open = false
          if (id !== 'ok') state.opts.onClose?.()
        },
      }, { default: () => h('div', { class: 'pui-modal-body', innerHTML: state.opts.html || '' }) }),
      h(GlobalMessageStack as any, { items: items.value, autoClose: 3200, onDismiss: (e: any) => { const id = e?.id ?? e; items.value = items.value.filter((m) => m.id !== id) } }),
    ],
  }).mount(host)
  // Navigation links inside a modal body close it.
  document.addEventListener('click', (e) => { if ((e.target as Element)?.closest?.('.pui-modal-body a, .pui-modal-body [data-go]')) state.open = false })
}

export const overlays = {
  /** onOk returning false keeps the dialog open (call close() yourself). onOpen receives the body element once rendered. */
  modal(opts: ModalOptions) {
    ensure(); state.opts = opts; state.key++; state.open = true
    if (opts.onOpen) { const key = state.key; const tick = (n: number) => { const b = document.querySelectorAll<HTMLElement>('.pui-modal-body'); const body = b[b.length - 1]; if (body && key === state.key) opts.onOpen!(body); else if (n > 0) requestAnimationFrame(() => tick(n - 1)) }; requestAnimationFrame(() => tick(30)) }
  },
  close() { state.open = false },
  message(text: string, type = 'info') { ensure(); items.value = [{ id: Date.now() + Math.random(), type, message: text }, ...items.value] },
}
