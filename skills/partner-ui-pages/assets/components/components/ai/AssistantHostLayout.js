import { defineComponent as _defineComponent } from "vue";
import { unref as _unref, renderSlot as _renderSlot, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, withCtx as _withCtx, createVNode as _createVNode } from "vue";
const _hoisted_1 = ["data-sidebar-behavior"];
const _hoisted_2 = { class: "partner-assistant-navigation" };
const _hoisted_3 = ["aria-hidden"];
const _hoisted_4 = ["data-window-mode", "data-fullscreen", "inert", "aria-hidden"];
const _hoisted_5 = { class: "partner-assistant-window-content" };
const _hoisted_6 = ["aria-valuemin", "aria-valuemax", "aria-valuenow"];
import { ref, toRef, watch } from "vue";
import BusinessOverlayHost from "./BusinessOverlayHost.vue";
import { useAssistantHostLayout } from "./useAssistantHostLayout";
import { useAssistantWindow } from "./useAssistantWindow";
import { useAssistantFullscreen } from "./useAssistantFullscreen";
import "./assistantWindow.css";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "AssistantHostLayout",
  props: {
    open: { type: Boolean },
    windowMode: { default: "sidebar" },
    sidebarBehavior: { default: "push" },
    fullscreen: { type: Boolean, default: false },
    viewportWidth: { default: void 0 },
    overlayLayer: { default: 1e3 },
    flow: { type: Boolean, default: false }
  },
  emits: ["update:windowMode", "update:fullscreen"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const workspace = ref(), business = ref();
    const mode = ref(props.windowMode), open = toRef(props, "open");
    const fullscreen = ref(props.fullscreen);
    watch(() => props.fullscreen, (value) => {
      fullscreen.value = value;
    });
    watch(fullscreen, (value) => emit("update:fullscreen", value), { flush: "sync" });
    const expansion = useAssistantFullscreen(open, fullscreen);
    watch(() => props.windowMode, (value) => {
      mode.value = value;
    });
    watch(mode, (value) => emit("update:windowMode", value), { flush: "sync" });
    const viewportWidth = toRef(props, "viewportWidth");
    const layout = useAssistantHostLayout(workspace, { open, mode, sidebarBehavior: toRef(props, "sidebarBehavior"), fullscreen, viewportWidth, flow: toRef(props, "flow") });
    const floating = useAssistantWindow(workspace, mode, open, fullscreen, toRef(props, "flow"));
    function switchMode() {
      if (!fullscreen.value) mode.value = mode.value === "sidebar" ? "floating" : "sidebar";
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", {
        class: _normalizeClass(["partner-assistant-host", { "is-open": open.value, "is-fullscreen": fullscreen.value, "is-floating": mode.value === "floating" && !fullscreen.value, "is-compact": _unref(floating).compact.value, "is-flow": __props.flow }]),
        "data-sidebar-behavior": __props.sidebarBehavior,
        onKeydownCapture: _cache[2] || (_cache[2] = //@ts-ignore
        (...args) => _unref(expansion).escape && _unref(expansion).escape(...args))
      }, [
        _createElementVNode("div", _hoisted_2, [
          _renderSlot(_ctx.$slots, "navigation")
        ]),
        _createVNode(BusinessOverlayHost, {
          region: business.value,
          layer: __props.overlayLayer
        }, {
          default: _withCtx(() => [
            _createElementVNode(
              "div",
              {
                ref_key: "workspace",
                ref: workspace,
                class: "partner-assistant-workspace",
                style: _normalizeStyle(_unref(layout).workspaceStyle.value)
              },
              [
                _createElementVNode("section", {
                  ref_key: "business",
                  ref: business,
                  class: "partner-assistant-business",
                  "aria-hidden": open.value && fullscreen.value || void 0
                }, [
                  _renderSlot(_ctx.$slots, "default")
                ], 8, _hoisted_3),
                _createElementVNode("aside", {
                  "data-assistant-window": "",
                  class: _normalizeClass(["partner-assistant-window", { "is-moving": _unref(floating).dragging.value || _unref(floating).resizing.value }]),
                  "data-window-mode": mode.value,
                  "data-fullscreen": fullscreen.value,
                  inert: !open.value,
                  "aria-hidden": !open.value,
                  style: _normalizeStyle({ ..._unref(layout).assistantStyle.value, ..._unref(floating).style.value })
                }, [
                  _createElementVNode("div", _hoisted_5, [
                    _renderSlot(_ctx.$slots, "assistant", {
                      windowMode: mode.value,
                      fullscreen: fullscreen.value,
                      toggleFullscreen: _unref(expansion).toggle,
                      switchMode,
                      dragStart: _unref(floating).start,
                      dragKeydown: _unref(floating).keyboard
                    })
                  ]),
                  mode.value === "floating" && !fullscreen.value ? (_openBlock(), _createElementBlock("div", {
                    key: 0,
                    class: "partner-assistant-resize",
                    role: "separator",
                    tabindex: "0",
                    "aria-label": "\u8C03\u6574 AI \u60AC\u6D6E\u7A97\u9AD8\u5EA6",
                    "aria-orientation": "horizontal",
                    "aria-valuemin": _unref(floating).minimumHeight.value,
                    "aria-valuemax": _unref(floating).resizeMaximum.value,
                    "aria-valuenow": _unref(floating).height.value,
                    onPointerdown: _cache[0] || (_cache[0] = //@ts-ignore
                    (...args) => _unref(floating).resizeStart && _unref(floating).resizeStart(...args)),
                    onKeydown: _cache[1] || (_cache[1] = //@ts-ignore
                    (...args) => _unref(floating).resizeKeyboard && _unref(floating).resizeKeyboard(...args))
                  }, null, 40, _hoisted_6)) : _createCommentVNode("v-if", true)
                ], 14, _hoisted_4)
              ],
              4
              /* STYLE */
            )
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["region", "layer"])
      ], 42, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-db31e3e9" });
