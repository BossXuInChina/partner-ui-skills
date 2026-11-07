import { normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, unref as _unref, openBlock as _openBlock, createElementBlock as _createElementBlock, Fragment as _Fragment, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withModifiers as _withModifiers, withCtx as _withCtx, createBlock as _createBlock, createVNode as _createVNode, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["id", "data-placement", "aria-busy", "aria-labelledby", "aria-describedby"];
const _hoisted_2 = { class: "wb-popconfirm__content" };
const _hoisted_3 = { class: "wb-popconfirm__heading" };
const _hoisted_4 = ["d"];
const _hoisted_5 = ["id"];
const _hoisted_6 = ["id"];
const _hoisted_7 = { class: "wb-popconfirm__actions" };
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { focusableElementsIn } from "../overlay/isolation.js";
import WorkbenchButton from "../button/WorkbenchButton.vue";
const __sfc_main__ = {
  __name: "WorkbenchPopconfirm",
  props: {
    placement: {
      type: String,
      default: "top",
      validator: (value) => [
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end"
      ].includes(value)
    },
    open: { type: Boolean, default: void 0 },
    disabled: Boolean,
    type: {
      type: String,
      default: "info",
      validator: (value) => ["info", "warning", "danger", "critical", "error"].includes(value)
    },
    showIcon: { type: Boolean, default: true },
    showCancel: { type: Boolean, default: true },
    title: { type: String, required: true },
    message: { type: String, default: "" },
    confirmText: { type: String, default: "\u786E\u8BA4" },
    cancelText: { type: String, default: "\u53D6\u6D88" },
    confirmDisabled: Boolean,
    cancelDisabled: Boolean,
    pending: Boolean,
    beforeConfirm: { type: Function, default: void 0 }
  },
  emits: ["update:open", "confirm", "cancel", "confirm-error"],
  setup(__props, { emit: __emit }) {
    const placements = [
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-start",
      "bottom",
      "bottom-end",
      "left-start",
      "left",
      "left-end"
    ];
    const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" };
    const props = __props;
    const emit = __emit;
    const id = useId();
    const root = ref(null);
    const panel = ref(null);
    const internalOpen = ref(false);
    let observer;
    const working = ref(false);
    let operation = 0;
    const controlled = computed(() => props.open !== void 0);
    const shown = computed(
      () => !props.disabled && (controlled.value ? props.open : internalOpen.value)
    );
    const triggerSlotProps = computed(() => ({
      open: shown.value,
      aria: {
        "aria-expanded": String(shown.value),
        "aria-controls": shown.value ? `${id}-popconfirm` : void 0,
        "aria-haspopup": "dialog"
      }
    }));
    function setOpen(value) {
      const next = Boolean(value) && !props.disabled;
      if (!controlled.value) internalOpen.value = next;
      emit("update:open", next);
      if (next) nextTick(updatePosition);
    }
    function triggerElement() {
      return root.value?.querySelector("button, [tabindex], a, input, select, textarea");
    }
    function dismiss(reason, restoreFocus = true) {
      if (!shown.value || working.value || props.pending) return;
      setOpen(false);
      emit("cancel", reason);
      if (restoreFocus)
        nextTick(() => {
          if (!shown.value) triggerElement()?.focus();
        });
    }
    async function confirm() {
      if (!shown.value || props.confirmDisabled || working.value || props.pending) return;
      working.value = true;
      const currentOperation = ++operation;
      try {
        if (await props.beforeConfirm?.() === false || currentOperation !== operation || !shown.value || props.pending || props.confirmDisabled)
          return;
        emit("confirm");
        setOpen(false);
        nextTick(() => {
          if (!shown.value) triggerElement()?.focus();
        });
      } catch (error) {
        if (currentOperation === operation && shown.value) emit("confirm-error", error);
      } finally {
        if (currentOperation === operation) working.value = false;
      }
    }
    function onTriggerClick(event) {
      if (props.disabled || working.value || props.pending || panel.value?.contains(event.target))
        return;
      setOpen(!shown.value);
    }
    function within(node) {
      return Boolean(node && (root.value?.contains(node) || panel.value?.contains(node)));
    }
    function onDocumentClick(event) {
      if (shown.value && !within(event.target)) dismiss("outside", false);
    }
    function onKeydown(event) {
      if (!shown.value || !within(event.target)) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        dismiss("escape");
      }
      if (event.key !== "Tab" || !panel.value?.contains(event.target)) return;
      const controls = focusableElementsIn(panel.value);
      event.preventDefault();
      event.stopPropagation();
      const nextIndex = controls.indexOf(event.target) + (event.shiftKey ? -1 : 1);
      if (controls[nextIndex]) {
        controls[nextIndex].focus();
        return;
      }
      if (event.shiftKey && event.target === controls[0] || !event.shiftKey && event.target === controls.at(-1) || !controls.length) {
        event.preventDefault();
        event.stopPropagation();
        if (working.value || props.pending) return;
        const trigger = triggerElement();
        const outside = focusableElementsIn(document.body).filter(
          (element) => !panel.value.contains(element)
        );
        const next = event.shiftKey ? trigger : outside[outside.indexOf(trigger) + 1];
        dismiss("tab", false);
        nextTick(() => {
          if (!shown.value) (next || trigger)?.focus();
        });
      }
    }
    function splitPlacement(value) {
      const [side, align = "center"] = value.split("-");
      return { side, align: align === "start" || align === "end" ? align : "center" };
    }
    function sideSpace(side, rect) {
      const edge = 4;
      return side === "top" ? rect.top - edge : side === "bottom" ? window.innerHeight - rect.bottom - edge : side === "left" ? rect.left - edge : window.innerWidth - rect.right - edge;
    }
    function updatePosition() {
      if (!shown.value || !root.value || !panel.value) return;
      const trigger = root.value.getBoundingClientRect();
      const element = panel.value;
      const rect = element.getBoundingClientRect();
      const requested = splitPlacement(placements.includes(props.placement) ? props.placement : "top");
      let side = requested.side;
      const arrowHeight = parseFloat(getComputedStyle(element).getPropertyValue("--popconfirm-arrow-height")) || 8;
      const arrowOverlap = parseFloat(getComputedStyle(element).getPropertyValue("--popconfirm-arrow-overlap")) || 1;
      const triggerGap = parseFloat(getComputedStyle(element).getPropertyValue("--popconfirm-trigger-gap")) || 4;
      const offset = arrowHeight - arrowOverlap + triggerGap;
      const required = (side === "top" || side === "bottom" ? rect.height : rect.width) + offset;
      const preferredSpace = sideSpace(side, trigger);
      const flippedSpace = sideSpace(opposite[side], trigger);
      if (preferredSpace < required && flippedSpace > preferredSpace) side = opposite[side];
      const { align } = requested;
      const edge = 4;
      const arrowExtent = arrowHeight - arrowOverlap;
      const topInset = edge + (side === "bottom" ? arrowExtent : 0);
      const bottomInset = edge + (side === "top" ? arrowExtent : 0);
      let { left, top } = positionOnSide(side, align, trigger, rect, offset);
      left = Math.min(Math.max(edge, left), Math.max(edge, window.innerWidth - edge - rect.width));
      top = Math.min(
        Math.max(topInset, top),
        Math.max(topInset, window.innerHeight - bottomInset - rect.height)
      );
      element.dataset.placement = `${side}${align === "center" ? "" : `-${align}`}`;
      element.style.setProperty("--popconfirm-left", `${left}px`);
      element.style.setProperty("--popconfirm-top", `${top}px`);
    }
    function positionOnSide(side, align, trigger, rect, offset) {
      let left;
      let top;
      if (side === "top" || side === "bottom") {
        left = align === "start" ? trigger.left : align === "end" ? trigger.right - rect.width : trigger.left + (trigger.width - rect.width) / 2;
        top = side === "top" ? trigger.top - rect.height - offset : trigger.bottom + offset;
      } else {
        top = align === "start" ? trigger.top : align === "end" ? trigger.bottom - rect.height : trigger.top + (trigger.height - rect.height) / 2;
        left = side === "left" ? trigger.left - rect.width - offset : trigger.right + offset;
      }
      return { left, top };
    }
    onMounted(() => {
      document.addEventListener("click", onDocumentClick, true);
      window.addEventListener("resize", updatePosition);
      document.addEventListener("scroll", updatePosition, true);
      observer = new ResizeObserver(updatePosition);
      if (root.value) observer.observe(root.value);
    });
    watch(
      shown,
      () => {
        operation += 1;
        working.value = false;
      },
      { flush: "sync" }
    );
    watch(
      shown,
      (value) => nextTick(() => {
        if (value && panel.value) {
          const content = panel.value.querySelector(".wb-popconfirm__content");
          const initialFocus = content && content.scrollHeight > content.clientHeight ? panel.value : panel.value.querySelector("button:not(:disabled)") || panel.value;
          initialFocus.focus({ preventScroll: true });
        }
        updatePosition();
      }),
      { immediate: true }
    );
    watch(
      panel,
      (node, previous) => {
        if (previous) observer?.unobserve(previous);
        if (node) observer?.observe(node);
      },
      { flush: "post" }
    );
    watch(
      () => [props.placement, props.disabled],
      () => {
        if (props.disabled) setOpen(false);
        else nextTick(updatePosition);
      }
    );
    onBeforeUnmount(() => {
      operation += 1;
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("scroll", updatePosition, true);
      observer?.disconnect();
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        _Fragment,
        null,
        [
          _createElementVNode(
            "span",
            {
              ref_key: "root",
              ref: root,
              class: _normalizeClass(["wb-popconfirm", { "is-open": shown.value, "is-disabled": __props.disabled }]),
              onClick: onTriggerClick,
              onKeydown
            },
            [
              _renderSlot(_ctx.$slots, "trigger", _normalizeProps(_guardReactiveProps(triggerSlotProps.value)))
            ],
            34
            /* CLASS, NEED_HYDRATION */
          ),
          (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
            shown.value ? (_openBlock(), _createElementBlock("section", {
              key: 0,
              id: `${_unref(id)}-popconfirm`,
              ref_key: "panel",
              ref: panel,
              onKeydown,
              class: "wb-popconfirm__panel",
              "data-placement": __props.placement,
              role: "dialog",
              "aria-modal": "false",
              tabindex: "-1",
              "aria-busy": working.value || __props.pending,
              "aria-labelledby": `${_unref(id)}-title`,
              "aria-describedby": __props.message ? `${_unref(id)}-message` : void 0
            }, [
              _cache[6] || (_cache[6] = _createElementVNode(
                "svg",
                {
                  class: "wb-popconfirm__arrow",
                  viewBox: "0 0 12 8",
                  "aria-hidden": "true"
                },
                [
                  _createElementVNode("path", { d: "M0 0h12L7.6 5.9C6.8 7 5.2 7 4.4 5.9L0 0Z" })
                ],
                -1
                /* CACHED */
              )),
              _createElementVNode("div", _hoisted_2, [
                _createElementVNode("div", _hoisted_3, [
                  __props.showIcon ? (_openBlock(), _createElementBlock(
                    "svg",
                    {
                      key: 0,
                      class: _normalizeClass(["wb-popconfirm__icon", `wb-popconfirm__icon--${__props.type}`]),
                      viewBox: "0 0 16 16",
                      "aria-hidden": "true"
                    },
                    [
                      __props.type === "danger" || __props.type === "critical" ? (_openBlock(), _createElementBlock(
                        _Fragment,
                        { key: 0 },
                        [
                          _cache[1] || (_cache[1] = _createElementVNode(
                            "path",
                            {
                              class: "wb-popconfirm__icon-fill",
                              d: "M8 1.3 15 14H1L8 1.3Z"
                            },
                            null,
                            -1
                            /* CACHED */
                          )),
                          _cache[2] || (_cache[2] = _createElementVNode(
                            "path",
                            {
                              class: "wb-popconfirm__icon-mark",
                              d: "M8 5v4.2M8 11.5v.1"
                            },
                            null,
                            -1
                            /* CACHED */
                          ))
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : __props.type === "error" ? (_openBlock(), _createElementBlock(
                        _Fragment,
                        { key: 1 },
                        [
                          _cache[3] || (_cache[3] = _createElementVNode(
                            "circle",
                            {
                              class: "wb-popconfirm__icon-fill",
                              cx: "8",
                              cy: "8",
                              r: "7"
                            },
                            null,
                            -1
                            /* CACHED */
                          )),
                          _cache[4] || (_cache[4] = _createElementVNode(
                            "path",
                            {
                              class: "wb-popconfirm__icon-mark",
                              d: "m5.3 5.3 5.4 5.4m0-5.4-5.4 5.4"
                            },
                            null,
                            -1
                            /* CACHED */
                          ))
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      )) : (_openBlock(), _createElementBlock(
                        _Fragment,
                        { key: 2 },
                        [
                          _cache[5] || (_cache[5] = _createElementVNode(
                            "circle",
                            {
                              class: "wb-popconfirm__icon-fill",
                              cx: "8",
                              cy: "8",
                              r: "7"
                            },
                            null,
                            -1
                            /* CACHED */
                          )),
                          _createElementVNode("path", {
                            class: "wb-popconfirm__icon-mark",
                            d: __props.type === "info" ? "M8 7v4m0-6.1v.1" : "M8 4.5v4.4m0 2.4v.1"
                          }, null, 8, _hoisted_4)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true),
                  _createElementVNode("h2", {
                    id: `${_unref(id)}-title`,
                    class: "wb-popconfirm__title"
                  }, _toDisplayString(__props.title), 9, _hoisted_5)
                ]),
                __props.message ? (_openBlock(), _createElementBlock("p", {
                  key: 0,
                  id: `${_unref(id)}-message`,
                  class: "wb-popconfirm__message"
                }, _toDisplayString(__props.message), 9, _hoisted_6)) : _createCommentVNode("v-if", true),
                _createElementVNode("div", _hoisted_7, [
                  __props.showCancel ? (_openBlock(), _createBlock(WorkbenchButton, {
                    key: 0,
                    appearance: "secondary",
                    size: "28",
                    disabled: __props.cancelDisabled || working.value || __props.pending,
                    onClick: _cache[0] || (_cache[0] = _withModifiers(($event) => dismiss("cancel"), ["stop"]))
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString(__props.cancelText),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"])) : _createCommentVNode("v-if", true),
                  _createVNode(WorkbenchButton, {
                    size: "28",
                    disabled: __props.confirmDisabled || working.value || __props.pending,
                    onClick: _withModifiers(confirm, ["stop"])
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString(__props.confirmText),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"])
                ])
              ])
            ], 40, _hoisted_1)) : _createCommentVNode("v-if", true)
          ]))
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
