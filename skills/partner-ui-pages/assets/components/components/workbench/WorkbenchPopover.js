import { normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, unref as _unref, createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Teleport as _Teleport, createBlock as _createBlock, Fragment as _Fragment } from "vue";
const _hoisted_1 = ["id", "aria-label"];
const _hoisted_2 = {
  key: 0,
  class: "wb-popover__title"
};
const _hoisted_3 = { class: "wb-popover__content" };
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import PopoverArrow from "./PopoverArrow.vue";
const __sfc_main__ = {
  __name: "WorkbenchPopover",
  props: {
    placement: { type: String, default: "top", validator: (value) => ["top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-start", "bottom", "bottom-end", "left-start", "left", "left-end"].includes(value) },
    title: { type: String, default: "" },
    open: { type: Boolean, default: void 0 },
    disabled: Boolean,
    ariaLabel: { type: String, default: "\u8BF4\u660E\u6C14\u6CE1" }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const placements = ["top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-start", "bottom", "bottom-end", "left-start", "left", "left-end"];
    const opposite = { top: "bottom", bottom: "top", left: "right", right: "left" };
    const props = __props;
    const emit = __emit;
    const id = useId();
    const root = ref(null);
    const panel = ref(null);
    const internalOpen = ref(false);
    let closeTimer;
    let observer;
    let ignoreNextFocusOpen = false;
    const controlled = computed(() => props.open !== void 0);
    const shown = computed(() => !props.disabled && (controlled.value ? props.open : internalOpen.value));
    const triggerSlotProps = computed(() => ({ open: shown.value, aria: { "aria-describedby": shown.value ? `${id}-popover` : void 0 } }));
    function setOpen(value) {
      const next = Boolean(value) && !props.disabled;
      if (!controlled.value) internalOpen.value = next;
      emit("update:open", next);
      if (next) nextTick(updatePosition);
    }
    function cancelClose() {
      window.clearTimeout(closeTimer);
    }
    function scheduleClose() {
      cancelClose();
      closeTimer = window.setTimeout(() => {
        if (!root.value?.matches(":hover") && !panel.value?.matches(":hover") && !within(document.activeElement)) setOpen(false);
      }, 0);
    }
    function within(node) {
      return Boolean(node && (root.value?.contains(node) || panel.value?.contains(node)));
    }
    function onFocusOut(event) {
      if (!within(event.relatedTarget)) scheduleClose();
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
        element.style.removeProperty("--popover-arrow-left");
        return;
      }
      const arrowWidth = parseFloat(getComputedStyle(element).getPropertyValue("--popover-arrow-width")) || 12;
      const arrowLeft = Math.max(0, Math.min(rect.width - arrowWidth, trigger.left + trigger.width / 2 - left - arrowWidth / 2));
      element.style.setProperty("--popover-arrow-left", `${arrowLeft}px`);
    }
    function updatePosition() {
      if (!shown.value || !root.value || !panel.value) return;
      const trigger = root.value.getBoundingClientRect();
      const element = panel.value;
      const rect = element.getBoundingClientRect();
      const requested = splitPlacement(props.placement);
      let side = requested.side;
      const arrowHeight = parseFloat(getComputedStyle(element).getPropertyValue("--popover-arrow-height")) || 8;
      const arrowOverlap = parseFloat(getComputedStyle(element).getPropertyValue("--popover-arrow-overlap")) || 1;
      const triggerGap = parseFloat(getComputedStyle(element).getPropertyValue("--popover-trigger-gap")) || 4;
      const offset = arrowHeight - arrowOverlap + triggerGap;
      const required = (side === "top" || side === "bottom" ? rect.height : rect.width) + offset;
      const preferredSpace = sideSpace(side, trigger);
      const flippedSpace = sideSpace(opposite[side], trigger);
      if (preferredSpace < required && flippedSpace > preferredSpace) side = opposite[side];
      const align = requested.align;
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
      left = Math.min(Math.max(edge, left), Math.max(edge, window.innerWidth - edge - rect.width));
      top = Math.min(Math.max(edge, top), Math.max(edge, window.innerHeight - edge - rect.height));
      element.dataset.placement = `${side}${align === "center" ? "" : `-${align}`}`;
      element.style.setProperty("--popover-left", `${left}px`);
      element.style.setProperty("--popover-top", `${top}px`);
      positionCenterArrow(element, side, align, trigger, rect, left);
    }
    function onTriggerFocusIn() {
      cancelClose();
      if (ignoreNextFocusOpen) {
        ignoreNextFocusOpen = false;
        return;
      }
      setOpen(true);
    }
    function onKeydown(event) {
      if (event.key === "Escape" && shown.value) {
        event.preventDefault();
        ignoreNextFocusOpen = true;
        setOpen(false);
        nextTick(() => root.value?.querySelector("[tabindex],button,a,input,select,textarea")?.focus());
      }
    }
    onMounted(() => {
      document.addEventListener("keydown", onKeydown);
      window.addEventListener("resize", updatePosition);
      document.addEventListener("scroll", updatePosition, true);
      observer = new ResizeObserver(updatePosition);
      if (root.value) observer.observe(root.value);
    });
    watch(panel, (node, previous) => {
      if (previous) observer?.unobserve(previous);
      if (node) observer?.observe(node);
      nextTick(updatePosition);
    }, { flush: "post" });
    watch(() => [props.placement, props.disabled], () => {
      if (props.disabled) setOpen(false);
      else nextTick(updatePosition);
    });
    onBeforeUnmount(() => {
      cancelClose();
      document.removeEventListener("keydown", onKeydown);
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
              class: _normalizeClass(["wb-popover", { "is-open": shown.value, "is-disabled": __props.disabled }]),
              onPointerenter: _cache[0] || (_cache[0] = ($event) => {
                cancelClose();
                setOpen(true);
              }),
              onPointerleave: scheduleClose,
              onFocusin: onTriggerFocusIn,
              onFocusout: onFocusOut
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
              id: `${_unref(id)}-popover`,
              ref_key: "panel",
              ref: panel,
              class: _normalizeClass(["wb-popover__panel", { "has-title": __props.title }]),
              "aria-label": __props.ariaLabel,
              onPointerenter: cancelClose,
              onPointerleave: scheduleClose,
              onFocusin: cancelClose,
              onFocusout: onFocusOut
            }, [
              _createVNode(PopoverArrow, { class: "wb-popover__arrow" }),
              __props.title ? (_openBlock(), _createElementBlock(
                "h2",
                _hoisted_2,
                _toDisplayString(__props.title),
                1
                /* TEXT */
              )) : _createCommentVNode("v-if", true),
              _createElementVNode("div", _hoisted_3, [
                _renderSlot(_ctx.$slots, "default")
              ])
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
