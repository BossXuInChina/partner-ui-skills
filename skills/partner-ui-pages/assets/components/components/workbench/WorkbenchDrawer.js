import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderSlot as _renderSlot, renderList as _renderList, Fragment as _Fragment, createTextVNode as _createTextVNode, withCtx as _withCtx, createBlock as _createBlock, normalizeClass as _normalizeClass, Transition as _Transition, createVNode as _createVNode, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["aria-modal"];
const _hoisted_2 = { class: "wb-drawer__header" };
const _hoisted_3 = ["title"];
const _hoisted_4 = { class: "wb-drawer__content wb-scrollbar" };
const _hoisted_5 = {
  key: 0,
  class: "wb-drawer__footer"
};
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, useSlots, watch } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import {
  acquireModalIsolation,
  controlledOverlays,
  focusableElementsIn,
  focusableFeedbackElements,
  focusIsInFeedback,
  nextFocusIndex,
  isTopOverlay
} from "../overlay/isolation.js";
import "../scrollbar/scrollbar.css";
const __sfc_main__ = {
  __name: "WorkbenchDrawer",
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, required: true },
    placement: {
      type: String,
      default: "right",
      validator: (value) => ["right", "bottom"].includes(value)
    },
    modal: { type: Boolean, default: true },
    panelSize: { type: [String, Number], default: void 0 },
    closeOnMask: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: true },
    actions: { type: Array, default: () => [] },
    beforeClose: { type: Function, default: void 0 }
  },
  emits: ["update:modelValue", "close", "action"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const panel = ref(null);
    const titleId = `wb-drawer-title-${useId().replaceAll(":", "")}`;
    const closing = ref(false);
    let previousFocus = null;
    let releaseIsolation = null;
    let activation = 0;
    let closeRequest = 0;
    const transitionName = computed(() => `wb-drawer-${props.placement}`);
    const hasFooter = computed(() => Boolean(slots.footer) || props.actions.length > 0);
    function normalizedPanelSize() {
      if (props.panelSize === void 0 || props.panelSize === null || props.panelSize === "")
        return "";
      const value = typeof props.panelSize === "number" ? `${props.panelSize}px` : props.panelSize.trim();
      const property = props.placement === "right" ? "width" : "height";
      return CSS.supports(property, value) ? value : "";
    }
    function applyPanelSize() {
      if (!panel.value) return;
      const value = normalizedPanelSize();
      panel.value.style.removeProperty("--drawer-requested-size");
      if (value) {
        panel.value.style.setProperty("--drawer-requested-size", value);
        return;
      }
      if (props.placement === "right") {
        const resolvedWidth = panel.value.getBoundingClientRect().width;
        panel.value.style.setProperty("--drawer-requested-size", `${resolvedWidth}px`);
      }
    }
    function focusableElements() {
      if (!panel.value) return [];
      const elements = focusableElementsIn(panel.value);
      controlledOverlays(panel.value).forEach((overlay) => {
        const overlayElements = focusableElementsIn(overlay);
        const trigger = overlay.id ? panel.value.querySelector(`[aria-controls="${CSS.escape(overlay.id)}"]`) : null;
        const triggerIndex = elements.indexOf(trigger);
        if (triggerIndex >= 0) elements.splice(triggerIndex + 1, 0, ...overlayElements);
      });
      return [...elements, ...focusableFeedbackElements()];
    }
    function focusIsInside() {
      return panel.value?.contains(document.activeElement) || focusIsInFeedback() || controlledOverlays(panel.value).some((overlay) => overlay.contains(document.activeElement));
    }
    function focusIsInOwnedOverlay() {
      return controlledOverlays(panel.value).some(
        (overlay) => overlay.contains(document.activeElement)
      );
    }
    function enableModalIsolation() {
      if (!releaseIsolation)
        releaseIsolation = acquireModalIsolation(() => [
          panel.value?.parentElement,
          ...controlledOverlays(panel.value)
        ]);
    }
    function disableModalIsolation() {
      releaseIsolation?.();
      releaseIsolation = null;
    }
    async function activate() {
      const generation = ++activation;
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      await nextTick();
      if (generation !== activation || !props.modelValue || !panel.value) return;
      applyPanelSize();
      if (props.modal) enableModalIsolation();
      panel.value?.focus({ preventScroll: true });
    }
    function deactivate() {
      activation += 1;
      disableModalIsolation();
      if (previousFocus?.isConnected) previousFocus.focus();
      previousFocus = null;
    }
    async function requestClose(reason = "button") {
      if (closing.value || !props.modelValue) return false;
      closing.value = true;
      const request = ++closeRequest;
      try {
        const allowed = props.beforeClose ? await props.beforeClose(reason) : true;
        if (allowed === false || request !== closeRequest || !props.modelValue) return false;
        emit("update:modelValue", false);
        emit("close", reason);
        return true;
      } catch {
        return false;
      } finally {
        if (request === closeRequest) closing.value = false;
      }
    }
    async function invokeAction(action) {
      emit("action", action);
      if (action.closeOnClick === true) await requestClose("action");
    }
    function handleDocumentKeydown(event) {
      if (!props.modelValue || !isTopOverlay(releaseIsolation)) return;
      if (!event.defaultPrevented && event.key === "Escape" && props.closeOnEsc) {
        event.preventDefault();
        requestClose("escape");
        return;
      }
      if (!props.modal || event.key !== "Tab") return;
      trapTabFocus(event);
    }
    function trapTabFocus(event) {
      const elements = focusableElements();
      if (!elements.length) {
        event.preventDefault();
        panel.value?.focus();
        return;
      }
      const first = elements[0];
      const last = elements[elements.length - 1];
      const controlledId = document.activeElement?.getAttribute?.("aria-controls");
      const controlledOverlay = controlledId ? document.getElementById(controlledId) : null;
      const controlledTarget = controlledOverlay ? focusableElementsIn(controlledOverlay)[0] : null;
      if (document.activeElement === panel.value) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (!event.shiftKey && controlledTarget && controlledOverlays(panel.value).includes(controlledOverlay)) {
        event.preventDefault();
        controlledTarget.focus();
      } else if (focusIsInOwnedOverlay() || focusableFeedbackElements().length) {
        event.preventDefault();
        elements[nextFocusIndex(elements, event.shiftKey)].focus();
      } else if (!focusIsInside()) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    watch(
      () => props.modelValue,
      (open) => {
        closeRequest += 1;
        closing.value = false;
        return open ? activate() : deactivate();
      },
      { immediate: true, flush: "sync" }
    );
    watch(
      () => [props.panelSize, props.placement],
      () => nextTick(applyPanelSize)
    );
    watch(
      () => props.modal,
      (modal) => {
        if (!props.modelValue) return;
        disableModalIsolation();
        if (modal) enableModalIsolation();
      }
    );
    onMounted(() => document.addEventListener("keydown", handleDocumentKeydown));
    onBeforeUnmount(() => {
      closeRequest += 1;
      closing.value = false;
      document.removeEventListener("keydown", handleDocumentKeydown);
      deactivate();
    });
    __expose({ requestClose });
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(_Teleport, { to: "body" }, [
        _createVNode(_Transition, { name: transitionName.value }, {
          default: _withCtx(() => [
            __props.modelValue ? (_openBlock(), _createElementBlock(
              "div",
              {
                key: 0,
                class: _normalizeClass(["wb-drawer-host", [`wb-drawer-host--${__props.placement}`, { "is-modal": __props.modal }]]),
                "data-testid": "drawer-host"
              },
              [
                __props.modal ? (_openBlock(), _createElementBlock("div", {
                  key: 0,
                  class: "wb-drawer__mask",
                  "aria-hidden": "true",
                  "data-testid": "drawer-mask",
                  onClick: _cache[0] || (_cache[0] = ($event) => __props.closeOnMask && requestClose("mask"))
                })) : _createCommentVNode("v-if", true),
                _createElementVNode("section", {
                  ref_key: "panel",
                  ref: panel,
                  class: _normalizeClass(["wb-drawer", [`wb-drawer--${__props.placement}`, { "has-footer": hasFooter.value }]]),
                  role: "dialog",
                  "aria-modal": __props.modal ? "true" : void 0,
                  "aria-labelledby": titleId,
                  tabindex: "-1"
                }, [
                  _createElementVNode("header", _hoisted_2, [
                    _createElementVNode("h2", {
                      id: titleId,
                      class: "wb-drawer__title",
                      title: __props.title
                    }, _toDisplayString(__props.title), 9, _hoisted_3),
                    _createElementVNode("button", {
                      class: "wb-drawer__close",
                      type: "button",
                      "aria-label": "\u5173\u95ED\u62BD\u5C49",
                      onClick: _cache[1] || (_cache[1] = ($event) => requestClose("button"))
                    }, [..._cache[2] || (_cache[2] = [
                      _createElementVNode(
                        "svg",
                        {
                          viewBox: "0 0 16 16",
                          "aria-hidden": "true"
                        },
                        [
                          _createElementVNode("path", { d: "m3 3 10 10M13 3 3 13" })
                        ],
                        -1
                        /* CACHED */
                      )
                    ])])
                  ]),
                  _createElementVNode("div", _hoisted_4, [
                    _renderSlot(_ctx.$slots, "default")
                  ]),
                  hasFooter.value ? (_openBlock(), _createElementBlock("footer", _hoisted_5, [
                    _renderSlot(_ctx.$slots, "footer", { requestClose }, () => [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(__props.actions, (action) => {
                          return _openBlock(), _createBlock(WorkbenchButton, {
                            key: action.id,
                            appearance: action.appearance === "secondary" ? "secondary" : "primary",
                            disabled: action.disabled,
                            onClick: ($event) => invokeAction(action)
                          }, {
                            default: _withCtx(() => [
                              _createTextVNode(
                                _toDisplayString(action.label),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["appearance", "disabled", "onClick"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ])) : _createCommentVNode("v-if", true)
                ], 10, _hoisted_1)
              ],
              2
              /* CLASS */
            )) : _createCommentVNode("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name"])
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
