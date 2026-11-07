import { defineComponent as _defineComponent } from "vue";
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["aria-label"];
import WorkbenchTag from "../tag/WorkbenchTag.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchFilterChips",
  props: {
    modelValue: { type: String, required: true },
    items: { type: Array, required: true },
    ariaLabel: { type: String, default: "\u7B5B\u9009" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", {
        class: "wb-filter-chips",
        role: "group",
        "aria-label": __props.ariaLabel
      }, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(__props.items, (item) => {
            return _openBlock(), _createBlock(WorkbenchTag, {
              key: item.value,
              interactive: "",
              selected: __props.modelValue === item.value,
              label: item.count === void 0 ? item.label : `${item.label}(${item.count})`,
              onSelect: ($event) => emit("update:modelValue", item.value)
            }, null, 8, ["selected", "label", "onSelect"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 8, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
