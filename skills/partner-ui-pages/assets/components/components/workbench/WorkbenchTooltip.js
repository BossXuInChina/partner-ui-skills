import { normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, unref as _unref, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, Fragment as _Fragment, Teleport as _Teleport, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["id"];
const _hoisted_2 = {
  key: 0,
  class: "wb-tooltip-debug__arrow",
  viewBox: "0 0 12 8",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  key: 1,
  class: "wb-tooltip__tags"
};
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchTooltip",
  props: {
    content: { type: String, default: "" },
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
    overflowOnly: Boolean,
    showArrow: { type: Boolean, default: true }
  },
  emits: ["update:open"],
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
    let contentObserver;
    let hideTimer;
    let triggerObserver;
    let observedTrigger;
    let pointerInside = false;
    let focusInside = false;
    let dismissed = false;
    const controlled = computed(() => props.open !== void 0);
    const isOverflowing = ref(false);
    const shown = computed(
      () => !props.disabled && (controlled.value ? props.open : internalOpen.value) && (!props.overflowOnly || isOverflowing.value)
    );
    const triggerSlotProps = computed(() => ({
      open: shown.value,
      aria: { "aria-describedby": shown.value ? `${id}-tooltip` : void 0 }
    }));
    function triggerElement() {
      return root.value?.firstElementChild ?? null;
    }
    function observeTriggerContent() {
      const element = triggerElement();
      if (observedTrigger === element) return;
      if (observedTrigger) observer?.unobserve(observedTrigger);
      observedTrigger = element;
      contentObserver?.disconnect();
      if (element) {
        observer?.observe(element);
        contentObserver?.observe(element, { childList: true, characterData: true, subtree: true });
      }
    }
    function measureOverflow() {
      const element = triggerElement();
      isOverflowing.value = Boolean(
        element && [element, ...element.querySelectorAll("*")].some(
          (node) => node.clientWidth > 0 && node.textContent?.trim() && (node.scrollWidth > node.clientWidth || node.scrollHeight > node.clientHeight)
        )
      );
    }
    function setOpen(value) {
      const next = Boolean(value) && !props.disabled;
      if (!controlled.value) internalOpen.value = next;
      emit("update:open", next);
      if (next)
        nextTick(() => {
          measureOverflow();
          updatePosition();
        });
    }
    function cancelHide() {
      window.clearTimeout(hideTimer);
    }
    function syncOpen() {
      measureOverflow();
      setOpen(!dismissed && (pointerInside || focusInside));
    }
    function enter() {
      cancelHide();
      pointerInside = true;
      syncOpen();
    }
    function leave() {
      pointerInside = false;
      hide();
    }
    function hide() {
      cancelHide();
      hideTimer = window.setTimeout(() => {
        if (!pointerInside && !focusInside) dismissed = false;
        syncOpen();
      }, 0);
    }
    function onFocusOut(event) {
      if (!root.value?.contains(event.relatedTarget)) {
        focusInside = false;
        hide();
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
    function positionCenterArrow(element, side, align, trigger, rect, left) {
      if (align !== "center" || !["top", "bottom"].includes(side)) {
        element.style.removeProperty("--tooltip-arrow-left");
        return;
      }
      const arrowWidth = parseFloat(getComputedStyle(element).getPropertyValue("--wb-asset-wb-popover-arrow-width")) || 12;
      const arrowLeft = Math.max(
        0,
        Math.min(rect.width - arrowWidth, trigger.left + trigger.width / 2 - left - arrowWidth / 2)
      );
      element.style.setProperty("--tooltip-arrow-left", `${arrowLeft}px`);
    }
    function tightenTextWidth(element) {
      element.style.removeProperty("--tooltip-content-width");
      const text = [...element.childNodes].find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      );
      if (text) {
        const range = document.createRange();
        range.selectNodeContents(text);
        const lines = [...range.getClientRects()];
        if (lines.length > 1) {
          const css = getComputedStyle(element);
          const width = Math.ceil(
            Math.max(...lines.map((line) => line.width)) + parseFloat(css.paddingLeft) + parseFloat(css.paddingRight)
          );
          element.style.setProperty("--tooltip-content-width", `${width}px`);
        }
      }
    }
    function updatePosition() {
      if (!shown.value || !root.value || !panel.value) return;
      const trigger = root.value.getBoundingClientRect();
      const element = panel.value;
      tightenTextWidth(element);
      const rect = element.getBoundingClientRect();
      const requested = splitPlacement(placements.includes(props.placement) ? props.placement : "top");
      let side = requested.side;
      const style = getComputedStyle(element);
      const value = (name, fallback) => parseFloat(style.getPropertyValue(`--wb-asset-wb-popover-${name}`)) || fallback;
      const offset = (props.showArrow ? value("arrow-height", 8) - value("arrow-overlap", 1) : 0) + value("trigger-gap", 4);
      const required = (side === "top" || side === "bottom" ? rect.height : rect.width) + offset;
      if (sideSpace(side, trigger) < required && sideSpace(opposite[side], trigger) > sideSpace(side, trigger))
        side = opposite[side];
      const { align } = requested;
      const edge = 4;
      let left;
      let top;
      if (side === "top" || side === "bottom") {
        left = align === "start" ? trigger.left : align === "end" ? trigger.right - rect.width : trigger.left + (trigger.width - rect.width) / 2;
        top = side === "top" ? trigger.top - rect.height - offset : trigger.bottom + offset;
      } else {
        top = align === "start" ? trigger.top : align === "end" ? trigger.bottom - rect.height : trigger.top + (trigger.height - rect.height) / 2;
        left = side === "left" ? trigger.left - rect.width - offset : trigger.right + offset;
      }
      const boundedLeft = Math.min(
        Math.max(edge, left),
        Math.max(edge, window.innerWidth - edge - rect.width)
      );
      const boundedTop = Math.min(
        Math.max(edge, top),
        Math.max(edge, window.innerHeight - edge - rect.height)
      );
      element.dataset.placement = `${side}${align === "center" ? "" : `-${align}`}`;
      element.style.setProperty("--tooltip-left", `${boundedLeft}px`);
      element.style.setProperty("--tooltip-top", `${boundedTop}px`);
      positionCenterArrow(element, side, align, trigger, rect, boundedLeft);
    }
    function onFocusIn(event) {
      if (event.target.matches(":focus-visible")) {
        cancelHide();
        if (!root.value?.contains(event.relatedTarget)) dismissed = false;
        focusInside = true;
        syncOpen();
      }
    }
    function onKeydown(event) {
      if (event.key === "Escape" && shown.value && (root.value?.contains(event.target) || pointerInside && (event.target === document.body || event.target === document.documentElement))) {
        event.preventDefault();
        event.stopPropagation();
        dismissed = true;
        setOpen(false);
      }
    }
    onMounted(() => {
      document.addEventListener("keydown", onKeydown);
      window.addEventListener("resize", measureOverflow);
      window.addEventListener("resize", updatePosition);
      document.addEventListener("scroll", updatePosition, true);
      observer = new ResizeObserver(() => {
        measureOverflow();
        updatePosition();
      });
      contentObserver = new MutationObserver(() => {
        measureOverflow();
        updatePosition();
      });
      if (root.value) observer.observe(root.value);
      triggerObserver = new MutationObserver(() => {
        observeTriggerContent();
        measureOverflow();
      });
      if (root.value) triggerObserver.observe(root.value, { childList: true });
      observeTriggerContent();
      measureOverflow();
    });
    watch(
      panel,
      (node, previous) => {
        if (previous) observer?.unobserve(previous);
        if (node) observer?.observe(node);
        nextTick(updatePosition);
      },
      { flush: "post" }
    );
    watch(
      () => [props.placement, props.disabled, props.overflowOnly, props.content, props.showArrow],
      () => {
        nextTick(() => {
          observeTriggerContent();
          measureOverflow();
          if (props.disabled) setOpen(false);
          else updatePosition();
        });
      }
    );
    onBeforeUnmount(() => {
      cancelHide();
      document.removeEventListener("keydown", onKeydown);
      window.removeEventListener("resize", measureOverflow);
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("scroll", updatePosition, true);
      observer?.disconnect();
      contentObserver?.disconnect();
      triggerObserver?.disconnect();
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
              class: _normalizeClass(["wb-tooltip wb-tooltip-debug", { "is-open": shown.value, "is-disabled": __props.disabled }]),
              onPointerenter: enter,
              onPointerleave: leave,
              onFocusin: onFocusIn,
              onFocusout: onFocusOut
            },
            [
              _renderSlot(_ctx.$slots, "trigger", _normalizeProps(_guardReactiveProps(triggerSlotProps.value)))
            ],
            34
            /* CLASS, NEED_HYDRATION */
          ),
          (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
            shown.value ? (_openBlock(), _createElementBlock("span", {
              key: 0,
              id: `${_unref(id)}-tooltip`,
              ref_key: "panel",
              ref: panel,
              onPointerenter: enter,
              onPointerleave: leave,
              class: _normalizeClass(["wb-tooltip-debug__panel", { "has-arrow": __props.showArrow, "has-tags": Boolean(_ctx.$slots.content) }]),
              role: "tooltip"
            }, [
              __props.showArrow ? (_openBlock(), _createElementBlock("svg", _hoisted_2, [..._cache[0] || (_cache[0] = [
                _createElementVNode(
                  "path",
                  { d: "M0 0h12L7.6 5.9C6.8 7 5.2 7 4.4 5.9L0 0Z" },
                  null,
                  -1
                  /* CACHED */
                )
              ])])) : _createCommentVNode("v-if", true),
              _ctx.$slots.content ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
                _renderSlot(_ctx.$slots, "content")
              ])) : (_openBlock(), _createElementBlock(
                _Fragment,
                { key: 2 },
                [
                  _createTextVNode(
                    _toDisplayString(__props.content),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ], 42, _hoisted_1)) : _createCommentVNode("v-if", true)
          ]))
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
