import { defineComponent as _defineComponent } from "vue";
import { toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, Fragment as _Fragment, createElementBlock as _createElementBlock, createVNode as _createVNode, renderSlot as _renderSlot } from "vue";
const _hoisted_1 = { class: "wb-tabs-header" };
const _hoisted_2 = {
  key: 0,
  class: "wb-tabs-header__extra"
};
import WorkbenchTabs from "../tabs/WorkbenchTabs.vue";
import WorkbenchBadge from "../badge/WorkbenchBadge.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchTabsHeader",
  props: {
    modelValue: { type: [String, Number], required: true },
    items: { type: Array, required: true },
    size: {
      type: String,
      default: "large",
      validator: (value) => ["small", "large"].includes(value)
    },
    ariaLabel: { type: String, default: "\u9875\u7B7E" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createVNode(WorkbenchTabs, {
          class: "wb-tabs-header__tabs",
          variant: "rail",
          size: __props.size,
          "model-value": __props.modelValue,
          items: __props.items,
          "aria-label": __props.ariaLabel,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", $event))
        }, {
          tab: _withCtx(({ item }) => [
            item.badge ? (_openBlock(), _createBlock(WorkbenchBadge, {
              key: 0,
              variant: "number",
              placement: "corner",
              value: item.badge,
              "aria-label": `${item.label} ${item.badge} \u9879`
            }, {
              default: _withCtx(() => [
                _createTextVNode(
                  _toDisplayString(item.label),
                  1
                  /* TEXT */
                )
              ]),
              _: 2
              /* DYNAMIC */
            }, 1032, ["value", "aria-label"])) : (_openBlock(), _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createTextVNode(
                  _toDisplayString(item.label),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        }, 8, ["size", "model-value", "items", "aria-label"]),
        _ctx.$slots.extra ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
          _renderSlot(_ctx.$slots, "extra")
        ])) : _createCommentVNode("v-if", true)
      ]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
