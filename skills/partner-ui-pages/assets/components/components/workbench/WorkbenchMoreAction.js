import { defineComponent as _defineComponent } from "vue";
import { toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchMoreAction",
  props: {
    label: { type: String, default: "\u66F4\u591A" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(WorkbenchButton, {
        class: "wb-more-action",
        appearance: "text",
        "text-layout": "inline",
        intent: "drilldown",
        drilldown: "more",
        disabled: __props.disabled,
        onClick: _cache[0] || (_cache[0] = ($event) => emit("click", $event))
      }, {
        default: _withCtx(() => [
          _createTextVNode(
            _toDisplayString(__props.label),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["disabled"]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
