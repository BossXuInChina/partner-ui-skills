import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createTextVNode as _createTextVNode, withCtx as _withCtx, createBlock as _createBlock, normalizeClass as _normalizeClass, Transition as _Transition, createVNode as _createVNode, Teleport as _Teleport } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "wb-modal__grid-overlay",
  "data-wb-grid-overlay": "",
  "aria-hidden": "true"
};
const _hoisted_2 = { "data-wb-grid-label": "" };
const _hoisted_3 = ["data-readonly", "aria-describedby"];
const _hoisted_4 = { class: "wb-modal__header" };
const _hoisted_5 = ["title"];
const _hoisted_6 = { class: "wb-modal__content wb-scrollbar" };
const _hoisted_7 = {
  key: 0,
  class: "wb-modal__footer"
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
  __name: "WorkbenchModal",
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, required: true },
    ariaDescribedby: { type: String, default: void 0 },
    size: { type: String, default: "m", validator: (value) => ["s", "m", "l", "xl"].includes(value) },
    readonly: { type: Boolean, default: false },
    topNavigationHeight: { type: [String, Number], default: 0 },
    closeOnMask: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: true },
    actions: { type: Array, default: () => [] },
    beforeClose: { type: Function, default: void 0 },
    showGrid: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "close", "action"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const host = ref(null);
    const panel = ref(null);
    const gridColumnCount = ref(0);
    const titleId = `wb-modal-title-${useId().replaceAll(":", "")}`;
    const closing = ref(false);
    let previousFocus = null;
    let releaseIsolation = null;
    let activation = 0;
    let closeRequest = 0;
    const hasFooter = computed(
      () => !props.readonly && (Boolean(slots.footer) || props.actions.length > 0)
    );
    const sizeSpanProperties = {
      s: "--wb-asset-wb-modal-size-s-columns",
      m: "--wb-asset-wb-modal-size-m-columns",
      l: "--wb-asset-wb-modal-size-l-columns",
      xl: "--wb-asset-wb-modal-size-xl-columns"
    };
    function assetProperty(key) {
      return `--wb-asset-wb-modal-${key}`;
    }
    function resolvedNumber(style, key) {
      return parseFloat(style.getPropertyValue(assetProperty(key)));
    }
    function normalizedTopNavigationHeight(style) {
      if (props.topNavigationHeight === void 0 || props.topNavigationHeight === null || props.topNavigationHeight === "") {
        return "0px";
      }
      const value = typeof props.topNavigationHeight === "number" ? `${props.topNavigationHeight}px` : props.topNavigationHeight.trim();
      return CSS.supports("height", value) ? value : "0px";
    }
    function applyLayout() {
      if (!host.value || !panel.value) return;
      const rootStyle = getComputedStyle(document.documentElement);
      const gridColumns = resolvedNumber(rootStyle, "grid-columns");
      gridColumnCount.value = gridColumns;
      const gridWidth = resolvedNumber(rootStyle, "grid-max-width");
      const gutter = resolvedNumber(rootStyle, "grid-gutter");
      const span = parseFloat(rootStyle.getPropertyValue(sizeSpanProperties[props.size]));
      const safeEdge = parseFloat(rootStyle.getPropertyValue("--wb-spacing-screen-edge-expanded"));
      const columnWidth = (gridWidth - (gridColumns - 1) * gutter) / gridColumns;
      const targetWidth = span * columnWidth + (span - 1) * gutter;
      const safeWidth = Math.max(0, document.documentElement.clientWidth - safeEdge * 2);
      panel.value.style.setProperty("--modal-resolved-width", `${Math.min(targetWidth, safeWidth)}px`);
      host.value.style.setProperty(
        "--modal-top-navigation-height",
        normalizedTopNavigationHeight(rootStyle)
      );
    }
    function ownedOverlays() {
      return controlledOverlays(panel.value);
    }
    function focusableElements() {
      if (!panel.value) return [];
      const elements = focusableElementsIn(panel.value);
      ownedOverlays().forEach((overlay) => {
        const overlayElements = focusableElementsIn(overlay);
        const trigger = overlay.id ? panel.value.querySelector(`[aria-controls="${CSS.escape(overlay.id)}"]`) : null;
        const triggerIndex = elements.indexOf(trigger);
        if (triggerIndex >= 0) elements.splice(triggerIndex + 1, 0, ...overlayElements);
      });
      return [...elements, ...focusableFeedbackElements()];
    }
    function focusIsInside() {
      return panel.value?.contains(document.activeElement) || focusIsInFeedback() || ownedOverlays().some((overlay) => overlay.contains(document.activeElement));
    }
    function focusIsInOwnedOverlay() {
      return ownedOverlays().some((overlay) => overlay.contains(document.activeElement));
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
      applyLayout();
      enableModalIsolation();
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
      if (event.key !== "Tab") return;
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
      () => [props.size, props.topNavigationHeight],
      () => nextTick(applyLayout)
    );
    onMounted(() => {
      document.addEventListener("keydown", handleDocumentKeydown);
      window.addEventListener("resize", applyLayout);
    });
    onBeforeUnmount(() => {
      closeRequest += 1;
      closing.value = false;
      document.removeEventListener("keydown", handleDocumentKeydown);
      window.removeEventListener("resize", applyLayout);
      deactivate();
    });
    __expose({ requestClose });
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(_Teleport, { to: "body" }, [
        _createVNode(_Transition, { name: "wb-modal" }, {
          default: _withCtx(() => [
            __props.modelValue ? (_openBlock(), _createElementBlock(
              "div",
              {
                key: 0,
                ref_key: "host",
                ref: host,
                class: "wb-modal-host",
                "data-testid": "modal-host"
              },
              [
                _createElementVNode("div", {
                  class: "wb-modal__mask",
                  "aria-hidden": "true",
                  "data-testid": "modal-mask",
                  onClick: _cache[0] || (_cache[0] = ($event) => __props.closeOnMask && requestClose("mask"))
                }),
                __props.showGrid ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(gridColumnCount.value, (column) => {
                      return _openBlock(), _createElementBlock("i", {
                        key: column,
                        "data-wb-grid-track": ""
                      }, [
                        _createElementVNode(
                          "span",
                          _hoisted_2,
                          _toDisplayString(column),
                          1
                          /* TEXT */
                        )
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : _createCommentVNode("v-if", true),
                _createElementVNode("section", {
                  ref_key: "panel",
                  ref: panel,
                  class: _normalizeClass(["wb-modal", [`wb-modal--${__props.size}`, { "has-footer": hasFooter.value, "is-readonly": __props.readonly }]]),
                  "data-readonly": __props.readonly || void 0,
                  role: "dialog",
                  "aria-modal": "true",
                  "aria-labelledby": titleId,
                  "aria-describedby": __props.ariaDescribedby,
                  tabindex: "-1"
                }, [
                  _createElementVNode("header", _hoisted_4, [
                    _createElementVNode("h2", {
                      id: titleId,
                      class: "wb-modal__title",
                      title: __props.title
                    }, _toDisplayString(__props.title), 9, _hoisted_5),
                    _createElementVNode("button", {
                      class: "wb-modal__close",
                      type: "button",
                      "aria-label": "\u5173\u95ED\u5BF9\u8BDD\u6846",
                      onClick: _cache[1] || (_cache[1] = ($event) => requestClose("button"))
                    }, [
                      _renderSlot(_ctx.$slots, "close-icon", {}, () => [
                        _cache[2] || (_cache[2] = _createElementVNode(
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
                        ))
                      ])
                    ])
                  ]),
                  _createElementVNode("div", _hoisted_6, [
                    _renderSlot(_ctx.$slots, "default", { readonly: __props.readonly })
                  ]),
                  hasFooter.value ? (_openBlock(), _createElementBlock("footer", _hoisted_7, [
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
                ], 10, _hoisted_3)
              ],
              512
              /* NEED_PATCH */
            )) : _createCommentVNode("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        })
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
