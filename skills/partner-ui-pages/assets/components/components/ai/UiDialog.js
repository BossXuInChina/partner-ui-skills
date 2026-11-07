import { defineComponent as _defineComponent } from "vue";
import { createElementVNode as _createElementVNode, unref as _unref, renderSlot as _renderSlot, withModifiers as _withModifiers, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, withDirectives as _withDirectives, Teleport as _Teleport, createBlock as _createBlock, Fragment as _Fragment } from "vue";
const _hoisted_1 = ["data-ai-theme", "data-tr-theme", "inert"];
const _hoisted_2 = ["aria-modal", "aria-labelledby"];
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, setTransitionHooks } from "vue";
import { createRegionDrawerMotion } from "./dialogMotion";
import { createGlobalDialogMotion } from "./globalDialogMotion";
import { businessOverlayKey } from "../../host/businessOverlay";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "UiDialog",
  props: {
    titleId: {},
    drawer: { type: Boolean },
    scope: {},
    theme: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const context = inject(businessOverlayKey, void 0);
    const regional = computed(() => props.scope !== "global" && !!context);
    const identity = Symbol("business-dialog");
    const active = computed(() => !regional.value || context?.stack.value.at(-1) === identity);
    const level = computed(() => context?.stack.value.indexOf(identity) ?? 0);
    const element = ref();
    const surface = ref();
    let motion;
    let cleaned = false;
    let paintedSurface;
    function release(superseded = false) {
      if (cleaned) return;
      cleaned = true;
      if (context) context.stack.value = context.stack.value.filter((item) => item !== identity);
      void nextTick(() => {
        if (superseded || !opener?.isConnected || opener.closest("[inert]")) return;
        if (context?.stack.value.length && !opener.closest(".partner-region-dialog")) return;
        const focus = opener.ownerDocument.activeElement;
        if (motion && focus && !["BODY", "HTML"].includes(focus.tagName) && focus !== opener && !paintedSurface?.contains(focus)) return;
        opener.focus({ preventScroll: true });
      });
    }
    const vDialogExit = {
      beforeUnmount(_surface, _binding, vnode) {
        if (!motion) return;
        const hooks = { mode: void 0, persisted: false, beforeEnter() {
        }, enter() {
        }, leave(_node, remove) {
          motion.leave(remove);
        }, clone() {
          return hooks;
        } };
        setTransitionHooks(vnode, hooks);
      }
    };
    const origin = ref();
    const tokens = ref({});
    let opener = null;
    onMounted(async () => {
      if (props.scope === "region" && !context) throw new Error('UiDialog scope="region" requires BusinessOverlayHost.');
      opener = document.activeElement;
      if (origin.value) {
        const paint = getComputedStyle(origin.value), values = {};
        for (let index = 0; index < paint.length; index++) {
          const token = paint[index];
          if (token.startsWith("--partner-ai-")) values[token] = paint.getPropertyValue(token);
        }
        const family = paint.getPropertyValue("--partner-ai-font-family").trim();
        values["--partner-ai-font-family"] = family && family !== "inherit" ? family : paint.fontFamily;
        tokens.value = values;
      }
      paintedSurface = surface.value;
      if (regional.value && props.drawer && surface.value && context?.target.value) motion = createRegionDrawerMotion(surface.value, element.value, context.target.value, props.titleId, release);
      if (!regional.value && surface.value && element.value) motion = createGlobalDialogMotion(surface.value, element.value, props.titleId, release, { nativeBackdrop: true, drawer: props.drawer });
      if (regional.value) {
        context.stack.value = [...context.stack.value, identity];
        element.value?.show();
      } else element.value?.showModal();
      await nextTick();
      motion?.enter();
      element.value?.querySelector("[data-initial-focus]")?.focus({ preventScroll: true });
    });
    onBeforeUnmount(() => {
      if (motion) return;
      element.value?.close();
      release();
    });
    function trap(event) {
      if (!active.value) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        emit("close");
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = [...element.value?.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]') ?? []].filter((item) => item.getClientRects().length);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first) {
        event.preventDefault();
        element.value?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    function backdrop(event) {
      if (!active.value || event.target !== element.value) return;
      const bounds = element.value.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) emit("close");
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        _Fragment,
        null,
        [
          _createElementVNode(
            "span",
            {
              ref_key: "origin",
              ref: origin,
              hidden: ""
            },
            null,
            512
            /* NEED_PATCH */
          ),
          (_openBlock(), _createBlock(_Teleport, {
            to: regional.value ? _unref(context)?.target.value ?? "body" : "body"
          }, [
            _withDirectives((_openBlock(), _createElementBlock("div", {
              ref_key: "surface",
              ref: surface,
              class: _normalizeClass(["partner-ai partner-dialog-scope", { "partner-region-dialog": regional.value }]),
              "data-ai-theme": __props.theme ?? "workbench",
              "data-tr-theme": __props.theme ?? "workbench",
              style: _normalizeStyle({ ...tokens.value, ...regional.value ? { zIndex: level.value } : {} }),
              inert: regional.value && !active.value,
              onClick: _cache[1] || (_cache[1] = _withModifiers(($event) => active.value && emit("close"), ["self"]))
            }, [
              _createElementVNode("dialog", {
                ref_key: "element",
                ref: element,
                tabindex: "-1",
                class: _normalizeClass(["ui-dialog", { "ui-dialog--drawer": __props.drawer, "ui-dialog--region": regional.value }]),
                "aria-modal": !regional.value,
                "aria-labelledby": __props.titleId,
                onCancel: _cache[0] || (_cache[0] = _withModifiers(($event) => emit("close"), ["prevent", "stop"])),
                onClick: backdrop,
                onKeydown: trap
              }, [
                _renderSlot(_ctx.$slots, "default")
              ], 42, _hoisted_2)
            ], 14, _hoisted_1)), [
              [vDialogExit]
            ])
          ], 8, ["to"]))
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
