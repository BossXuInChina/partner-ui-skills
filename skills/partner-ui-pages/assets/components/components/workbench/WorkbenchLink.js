import { unref as _unref, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = ["href", "target", "rel", "aria-disabled", "tabindex"];
const _hoisted_2 = {
  key: 0,
  class: "wb-link__icon",
  "aria-hidden": "true"
};
const _hoisted_3 = { class: "wb-link__label" };
import { computed, useSlots } from "vue";
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchLink",
  props: {
    href: { type: String, required: true },
    target: { type: String, default: void 0 },
    rel: { type: String, default: void 0 },
    disabled: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const isDisabled = computed(() => props.disabled);
    function handleClick(event) {
      if (isDisabled.value) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      emit("click", event);
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("a", {
        class: "wb-link",
        href: isDisabled.value ? void 0 : __props.href,
        target: __props.target,
        rel: __props.rel,
        "aria-disabled": isDisabled.value ? "true" : void 0,
        tabindex: isDisabled.value ? -1 : void 0,
        onClick: handleClick
      }, [
        _unref(slots).icon ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
          _renderSlot(_ctx.$slots, "icon")
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode("span", _hoisted_3, [
          _renderSlot(_ctx.$slots, "default")
        ])
      ], 8, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
