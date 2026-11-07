import { renderSlot as _renderSlot, createVNode as _createVNode, createElementVNode as _createElementVNode, withKeys as _withKeys, normalizeClass as _normalizeClass, withCtx as _withCtx, createSlots as _createSlots, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, toDisplayString as _toDisplayString } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label", "aria-describedby", "disabled"];
const _hoisted_3 = {
  class: "wb-floating-button__icon",
  "aria-hidden": "true"
};
const _hoisted_4 = { class: "wb-floating-button__panel" };
const _hoisted_5 = ["onFocusin", "onFocusout"];
const _hoisted_6 = ["aria-label", "aria-describedby", "disabled", "onClick", "onKeydown"];
const _hoisted_7 = {
  class: "wb-floating-button__icon",
  "aria-hidden": "true"
};
const _hoisted_8 = {
  key: 0,
  class: "wb-floating-button__item wb-floating-button__toggle-item"
};
const _hoisted_9 = ["aria-label", "aria-expanded", "aria-describedby"];
const _hoisted_10 = {
  class: "wb-floating-button__icon",
  "aria-hidden": "true"
};
const _hoisted_11 = ["id"];
const _hoisted_12 = {
  key: 0,
  class: "wb-floating-button__back-to-top"
};
const _hoisted_13 = ["aria-describedby"];
const _hoisted_14 = {
  class: "wb-floating-button__icon",
  "aria-hidden": "true"
};
const _hoisted_15 = ["id"];
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, reactive, ref, useId } from "vue";
import FloatingButtonIcon from "./FloatingButtonIcon.vue";
import FloatingButtonPopover from "./FloatingButtonPopover.vue";
const __sfc_main__ = {
  __name: "FloatingButton",
  props: {
    variant: { type: String, default: "single", validator: (value) => ["single", "group"].includes(value) },
    items: { type: Array, default: () => [] },
    expanded: { type: Boolean, default: void 0 },
    ratings: { type: Object, default: void 0 },
    defaultVisibleCount: { type: Number, default: void 0 },
    showBackToTop: { type: Boolean, default: false },
    ariaLabel: { type: String, default: "\u60AC\u6D6E\u5FEB\u6377\u64CD\u4F5C" }
  },
  emits: ["update:expanded", "action", "back-to-top", "rating-change", "update:ratings"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const instanceId = `wb-floating-button-${useId()}`;
    const root = ref(null);
    const internalRatings = reactive({});
    const ratings = computed(() => props.ratings ?? internalRatings);
    const internalExpanded = ref(false);
    const resolvedExpanded = computed(() => props.expanded ?? internalExpanded.value);
    const dismissedPopover = ref(false);
    const focusedItemId = ref(null);
    function focusItem(event, item) {
      if (event.target.matches(":focus-visible") || event.target.closest(".wb-floating-button__tooltip")) focusedItemId.value = item.id;
    }
    function enterPopover(event, item) {
      if (event.shiftKey || item.disabled || dismissedPopover.value) return;
      const popup = event.currentTarget.parentElement.querySelector(".wb-floating-button__tooltip");
      const control = popup?.querySelector('button:not(:disabled)[tabindex="0"], a[href], input:not(:disabled)');
      if (!control) return;
      event.preventDefault();
      focusedItemId.value = item.id;
      nextTick(() => control.focus());
    }
    function blurItem(event, item) {
      const wrapper = event.currentTarget;
      nextTick(() => {
        if (!wrapper.contains(document.activeElement) && focusedItemId.value === item.id) focusedItemId.value = null;
      });
    }
    function dismissPopover(event) {
      if (event.key !== "Escape") return;
      dismissedPopover.value = true;
      const wrapper = event.target.closest(".wb-floating-button__item, .wb-floating-button__single, .wb-floating-button__back-to-top");
      wrapper?.querySelector(".wb-floating-button__action")?.focus();
      event.stopPropagation();
    }
    function resetPopover(event) {
      if (event.type === "focusin" && root.value?.contains(event.relatedTarget)) return;
      dismissedPopover.value = false;
    }
    const singleItem = computed(() => props.items[0]);
    const effectiveVariant = computed(() => props.variant === "group" && props.items.length < 2 ? "single" : props.variant);
    const collapsedCount = computed(() => {
      if (!Number.isFinite(props.defaultVisibleCount)) return props.items.length;
      return Math.min(props.items.length, Math.max(0, Math.floor(props.defaultVisibleCount)));
    });
    const hasOverflowItems = computed(() => props.items.length > collapsedCount.value);
    const visibleItems = computed(() => resolvedExpanded.value ? props.items : props.items.slice(0, collapsedCount.value));
    function tooltipId(item, suffix = "") {
      return `${instanceId}-${item?.id ?? "control"}${suffix}-tooltip`;
    }
    function activate(item) {
      if (!item?.disabled) emit("action", item);
    }
    function rate(item, score) {
      if (item.disabled || !Number.isInteger(score) || score < 0 || score > 10) return;
      if (props.ratings === void 0) internalRatings[item.id] = score;
      emit("update:ratings", { ...ratings.value, [item.id]: score });
      emit("rating-change", { item, score });
    }
    function toggleExpanded() {
      const next = !resolvedExpanded.value;
      if (props.expanded === void 0) internalExpanded.value = next;
      emit("update:expanded", next);
    }
    function nearestScrollContainer() {
      let element = root.value?.parentElement;
      while (element && element !== document.body) {
        const overflowY = getComputedStyle(element).overflowY;
        if (/(auto|scroll|overlay)/.test(overflowY) && element.scrollHeight > element.clientHeight) return element;
        element = element.parentElement;
      }
      return null;
    }
    function backToTop() {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const options = { top: 0, behavior: reduced ? "auto" : "smooth" };
      const scrollContainer = nearestScrollContainer();
      if (scrollContainer) scrollContainer.scrollTo(options);
      else window.scrollTo(options);
      emit("back-to-top");
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("aside", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-floating-button", [`wb-floating-button--${effectiveVariant.value}`, { "is-popover-dismissed": dismissedPopover.value }]]),
        onKeydown: dismissPopover,
        onPointerleave: resetPopover,
        onFocusin: resetPopover,
        "aria-label": __props.ariaLabel
      }, [
        effectiveVariant.value === "single" && singleItem.value ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 0,
            class: _normalizeClass(["wb-floating-button__single", { "is-focus-open": focusedItemId.value === singleItem.value.id }]),
            onFocusin: _cache[3] || (_cache[3] = ($event) => focusItem($event, singleItem.value)),
            onFocusout: _cache[4] || (_cache[4] = ($event) => blurItem($event, singleItem.value)),
            onPointerenter: _cache[5] || (_cache[5] = ($event) => dismissedPopover.value = false)
          },
          [
            _createElementVNode("button", {
              type: "button",
              class: _normalizeClass(["wb-floating-button__action", { "is-ai": singleItem.value.iconType === "ai" }]),
              "aria-label": singleItem.value.label,
              "aria-describedby": tooltipId(singleItem.value),
              disabled: singleItem.value.disabled,
              onClick: _cache[0] || (_cache[0] = ($event) => activate(singleItem.value)),
              onKeydown: _cache[1] || (_cache[1] = _withKeys(($event) => enterPopover($event, singleItem.value), ["tab"]))
            }, [
              _createElementVNode("span", _hoisted_3, [
                _renderSlot(_ctx.$slots, "icon", { item: singleItem.value }, () => [
                  _createVNode(FloatingButtonIcon, { item: singleItem.value }, null, 8, ["item"])
                ])
              ])
            ], 42, _hoisted_2),
            _createVNode(FloatingButtonPopover, {
              item: singleItem.value,
              "tooltip-id": tooltipId(singleItem.value),
              rating: ratings.value[singleItem.value.id],
              onRate: _cache[2] || (_cache[2] = ($event) => rate(singleItem.value, $event))
            }, _createSlots({
              _: 2
              /* DYNAMIC */
            }, [
              _ctx.$slots[singleItem.value.popoverType] ? {
                name: "default",
                fn: _withCtx(() => [
                  _renderSlot(_ctx.$slots, singleItem.value.popoverType, { item: singleItem.value })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["item", "tooltip-id", "rating"])
          ],
          34
          /* CLASS, NEED_HYDRATION */
        )) : effectiveVariant.value === "group" ? (_openBlock(), _createElementBlock(
          _Fragment,
          { key: 1 },
          [
            _createElementVNode("div", _hoisted_4, [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(visibleItems.value, (item) => {
                  return _openBlock(), _createElementBlock("div", {
                    key: item.id,
                    class: _normalizeClass(["wb-floating-button__item", { "is-focus-open": focusedItemId.value === item.id }]),
                    onFocusin: ($event) => focusItem($event, item),
                    onFocusout: ($event) => blurItem($event, item),
                    onPointerenter: _cache[6] || (_cache[6] = ($event) => dismissedPopover.value = false)
                  }, [
                    _createElementVNode("button", {
                      type: "button",
                      class: _normalizeClass(["wb-floating-button__action", { "is-ai": item.iconType === "ai" }]),
                      "aria-label": item.label,
                      "aria-describedby": tooltipId(item),
                      disabled: item.disabled,
                      onClick: ($event) => activate(item),
                      onKeydown: _withKeys(($event) => enterPopover($event, item), ["tab"])
                    }, [
                      _createElementVNode("span", _hoisted_7, [
                        _renderSlot(_ctx.$slots, "icon", { item }, () => [
                          _createVNode(FloatingButtonIcon, { item }, null, 8, ["item"])
                        ])
                      ])
                    ], 42, _hoisted_6),
                    _createVNode(FloatingButtonPopover, {
                      item,
                      "tooltip-id": tooltipId(item),
                      rating: ratings.value[item.id],
                      onRate: ($event) => rate(item, $event)
                    }, _createSlots({
                      _: 2
                      /* DYNAMIC */
                    }, [
                      _ctx.$slots[item.popoverType] ? {
                        name: "default",
                        fn: _withCtx(() => [
                          _renderSlot(_ctx.$slots, item.popoverType, { item })
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1032, ["item", "tooltip-id", "rating", "onRate"])
                  ], 42, _hoisted_5);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              hasOverflowItems.value ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
                _createElementVNode("button", {
                  type: "button",
                  class: "wb-floating-button__action wb-floating-button__toggle",
                  "aria-label": resolvedExpanded.value ? "\u6536\u8D77\u60AC\u6D6E\u6309\u94AE\u7EC4" : "\u5C55\u5F00\u60AC\u6D6E\u6309\u94AE\u7EC4",
                  "aria-expanded": resolvedExpanded.value,
                  "aria-describedby": tooltipId(null, "-toggle"),
                  onClick: toggleExpanded
                }, [
                  _createElementVNode("span", _hoisted_10, [
                    _createVNode(FloatingButtonIcon, {
                      item: { icon: resolvedExpanded.value ? "collapse" : "expand" }
                    }, null, 8, ["item"])
                  ])
                ], 8, _hoisted_9),
                _createElementVNode("span", {
                  id: tooltipId(null, "-toggle"),
                  class: "wb-floating-button__tooltip",
                  role: "tooltip"
                }, _toDisplayString(resolvedExpanded.value ? "\u6536\u8D77" : "\u5C55\u5F00"), 9, _hoisted_11)
              ])) : _createCommentVNode("v-if", true)
            ]),
            __props.showBackToTop ? (_openBlock(), _createElementBlock("div", _hoisted_12, [
              _createElementVNode("button", {
                type: "button",
                class: "wb-floating-button__action",
                "aria-label": "\u8FD4\u56DE\u9876\u90E8",
                "aria-describedby": tooltipId(null, "-top"),
                onClick: backToTop
              }, [
                _createElementVNode("span", _hoisted_14, [
                  _createVNode(FloatingButtonIcon, { item: { icon: "top" } })
                ])
              ], 8, _hoisted_13),
              _createElementVNode("span", {
                id: tooltipId(null, "-top"),
                class: "wb-floating-button__tooltip",
                role: "tooltip"
              }, "\u8FD4\u56DE\u9876\u90E8", 8, _hoisted_15)
            ])) : _createCommentVNode("v-if", true)
          ],
          64
          /* STABLE_FRAGMENT */
        )) : _createCommentVNode("v-if", true)
      ], 42, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-4a2f20e6" });
