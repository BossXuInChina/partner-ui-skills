import { defineComponent as _defineComponent } from "vue";
import { createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, Fragment as _Fragment, toDisplayString as _toDisplayString, vShow as _vShow, mergeProps as _mergeProps, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["data-state", "aria-hidden", "role"];
const _hoisted_2 = {
  class: "ai-toast__icon",
  viewBox: "0 0 14 14",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_3 = {
  key: 0,
  fill: "var(--partner-ai-toast-success-color)",
  "fill-rule": "evenodd",
  d: "M7 0C3.1402 0 0 3.1402 0 7C0 10.8598 3.1402 14 7 14C10.8598 14 14 10.8598 14 7C14 3.1402 10.8598 0 7 0ZM6.65348 9.45357L10.8535 5.25357C11.0515 5.05558 11.0515 4.74445 10.8535 4.54646C10.6555 4.34847 10.3444 4.34847 10.1464 4.54646L6.29993 8.39291L4.20348 6.29646C4.00549 6.09847 3.69436 6.09847 3.49637 6.29646C3.29838 6.49445 3.29838 6.80558 3.49637 7.00357L5.94637 9.45357C6.06422 9.57142 6.18208 9.63035 6.29993 9.63035C6.41778 9.63035 6.53563 9.57142 6.65348 9.45357Z"
};
const _hoisted_4 = { class: "ai-toast__message" };
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
const activeToasts = /* @__PURE__ */ new WeakMap();
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  ...{ inheritAttrs: false },
  __name: "AiToast",
  props: {
    modelValue: { type: Boolean },
    message: {},
    type: { default: "success" },
    duration: { default: 2e3 }
  },
  emits: ["update:modelValue", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const origin = ref();
    const shown = ref(false);
    const portalTarget = ref("body");
    const tokens = ref({});
    const layout = reactive({});
    const displayedMessage = ref(props.message), displayedType = ref(props.type);
    let owner;
    let timer;
    let revision = 0, positionFrame = 0;
    function position() {
      const marker = origin.value;
      if (!marker?.isConnected) return false;
      const host = marker.closest(".chat-panel,[data-assistant-window]");
      const bounds = host?.getBoundingClientRect();
      if (marker.closest("[inert]") || host && (!host.getClientRects().length || getComputedStyle(host).visibility === "hidden")) {
        dismiss();
        return false;
      }
      const header = host?.querySelector(".chat-header")?.getBoundingClientRect();
      const viewport = marker.ownerDocument.documentElement;
      const left = Math.max(0, bounds?.left ?? 0), right = Math.min(viewport.clientWidth, bounds?.right ?? viewport.clientWidth);
      const top = header?.bottom ?? bounds?.top ?? 0;
      layout.left = `${(left + right) / 2}px`;
      layout.top = `calc(${top}px + var(--partner-ai-toast-top))`;
      layout.maxWidth = `max(0px,calc(${Math.max(0, right - left)}px - var(--partner-ai-toast-viewport-gutter)))`;
      layout.maxHeight = `max(0px,calc(${Math.min(bounds?.bottom ?? viewport.clientHeight, viewport.clientHeight) - top}px - var(--partner-ai-spacing-lg) - var(--partner-ai-toast-top)))`;
      return true;
    }
    function trackPosition() {
      if (!shown.value || !position()) return;
      positionFrame = requestAnimationFrame(trackPosition);
    }
    function stopTracking() {
      cancelAnimationFrame(positionFrame);
      positionFrame = 0;
    }
    function hide() {
      clearTimeout(timer);
      stopTracking();
      shown.value = false;
      if (owner && activeToasts.get(owner) === dismiss) activeToasts.delete(owner);
    }
    function dismiss() {
      hide();
      emit("update:modelValue", false);
      emit("close");
    }
    async function sync() {
      clearTimeout(timer);
      stopTracking();
      const current = ++revision;
      await nextTick();
      const marker = origin.value;
      if (current !== revision || !marker) return;
      if (!props.modelValue || !props.message) {
        hide();
        return;
      }
      owner = marker.ownerDocument;
      const previous = activeToasts.get(owner);
      if (previous && previous !== dismiss) previous();
      activeToasts.set(owner, dismiss);
      portalTarget.value = marker.closest("dialog[open]") ?? owner.body;
      const paint = getComputedStyle(marker), values = {};
      for (let index = 0; index < paint.length; index++) {
        const key = paint[index];
        if (key.startsWith("--partner-ai-")) values[key] = paint.getPropertyValue(key);
      }
      const family = paint.getPropertyValue("--partner-ai-font-family").trim();
      values["--partner-ai-font-family"] = family && family !== "inherit" ? family : paint.fontFamily;
      tokens.value = values;
      displayedMessage.value = props.message;
      displayedType.value = props.type;
      if (!position() || !props.modelValue) return;
      shown.value = true;
      positionFrame = requestAnimationFrame(trackPosition);
      if (props.duration > 0) timer = setTimeout(dismiss, props.duration);
    }
    onMounted(sync);
    watch(() => [props.modelValue, props.message, props.type, props.duration], sync);
    onBeforeUnmount(() => {
      revision++;
      hide();
    });
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
          (_openBlock(), _createBlock(_Teleport, { to: portalTarget.value }, [
            _createVNode(_Transition, {
              name: "ai-toast",
              persisted: ""
            }, {
              default: _withCtx(() => [
                _withDirectives(_createElementVNode("div", _mergeProps(_ctx.$attrs, {
                  class: "ai-toast",
                  "data-state": shown.value ? "open" : "closed",
                  style: [tokens.value, layout, _ctx.$attrs.style],
                  "aria-hidden": !shown.value,
                  role: displayedType.value === "error" ? "alert" : "status",
                  "aria-atomic": "true"
                }), [
                  (_openBlock(), _createElementBlock("svg", _hoisted_2, [
                    displayedType.value === "success" ? (_openBlock(), _createElementBlock("path", _hoisted_3)) : (_openBlock(), _createElementBlock(
                      _Fragment,
                      { key: 1 },
                      [
                        _cache[0] || (_cache[0] = _createElementVNode(
                          "circle",
                          {
                            cx: "7",
                            cy: "7",
                            r: "7",
                            fill: "var(--partner-ai-error,var(--partner-ai-toast-error-fallback-color))"
                          },
                          null,
                          -1
                          /* CACHED */
                        )),
                        _cache[1] || (_cache[1] = _createElementVNode(
                          "path",
                          {
                            d: "m4.8 4.8 4.4 4.4m0-4.4-4.4 4.4",
                            fill: "none",
                            stroke: "var(--partner-ai-color-white)",
                            "stroke-width": "1.2",
                            "stroke-linecap": "round"
                          },
                          null,
                          -1
                          /* CACHED */
                        ))
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ])),
                  _createElementVNode(
                    "span",
                    _hoisted_4,
                    _toDisplayString(displayedMessage.value),
                    1
                    /* TEXT */
                  )
                ], 16, _hoisted_1), [
                  [_vShow, shown.value]
                ])
              ]),
              _: 1
              /* STABLE */
            })
          ], 8, ["to"]))
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-4b846c4b" });
