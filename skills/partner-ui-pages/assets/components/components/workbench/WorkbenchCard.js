import { unref as _unref, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, resolveDynamicComponent as _resolveDynamicComponent, normalizeClass as _normalizeClass, withCtx as _withCtx, createBlock as _createBlock } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "wb-card__header"
};
const _hoisted_2 = { class: "wb-card__body" };
const _hoisted_3 = {
  key: 1,
  class: "wb-card__footer"
};
const _hoisted_4 = {
  key: 2,
  class: "wb-card__actions"
};
import { computed, useSlots } from "vue";
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchCard",
  props: {
    variant: {
      type: String,
      default: "display-white",
      validator: (value) => ["display-white", "display-tinted", "operation", "navigation"].includes(value)
    },
    size: {
      type: String,
      default: "xxxl",
      validator: (value) => ["s", "m", "l", "xl", "xxl", "xxxl"].includes(value)
    },
    href: { type: String, default: void 0 },
    target: { type: String, default: void 0 },
    rel: { type: String, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const isNavigation = computed(() => props.variant === "navigation");
    const hasNavigationHref = computed(() => isNavigation.value && Boolean(props.href?.trim()));
    const rootTag = computed(() => hasNavigationHref.value ? "a" : "div");
    const visualVariant = computed(
      () => isNavigation.value && !hasNavigationHref.value ? "display-white" : props.variant
    );
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(_resolveDynamicComponent(rootTag.value), {
        class: _normalizeClass(["wb-card", [
          `wb-card--${visualVariant.value}`,
          `wb-card--size-${__props.size}`,
          { "has-actions": _unref(slots).actions && !isNavigation.value }
        ]]),
        "data-variant": __props.variant,
        "data-size": __props.size,
        href: hasNavigationHref.value ? __props.href : void 0,
        target: hasNavigationHref.value ? __props.target : void 0,
        rel: hasNavigationHref.value ? __props.rel : void 0
      }, {
        default: _withCtx(() => [
          _unref(slots).header ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
            _renderSlot(_ctx.$slots, "header")
          ])) : _createCommentVNode("v-if", true),
          _createElementVNode("div", _hoisted_2, [
            _renderSlot(_ctx.$slots, "default")
          ]),
          _unref(slots).footer ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
            _renderSlot(_ctx.$slots, "footer")
          ])) : _createCommentVNode("v-if", true),
          _unref(slots).actions && !isNavigation.value ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
            _renderSlot(_ctx.$slots, "actions")
          ])) : _createCommentVNode("v-if", true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["class", "data-variant", "data-size", "href", "target", "rel"]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
