import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, withCtx as _withCtx, createVNode as _createVNode, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = { class: "transaction-stage-progress" };
const _hoisted_2 = { class: "transaction-stage-progress__title" };
const _hoisted_3 = { class: "transaction-stage-progress__label" };
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchSteps from "../steps/WorkbenchSteps.vue";
const __sfc_main__ = {
  __name: "WorkbenchTransactionStageProgress",
  props: {
    items: { type: Array, required: true },
    modelValue: { type: Number, default: 0 },
    current: Number,
    readonly: { type: Boolean, default: true },
    ariaLabel: { type: String, default: "\u4EA4\u6613\u8FDB\u5EA6" }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createVNode(WorkbenchSteps, {
          items: __props.items,
          "model-value": __props.modelValue,
          current: __props.current,
          readonly: __props.readonly,
          size: "medium",
          "node-type": "icon",
          "aria-label": __props.ariaLabel,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", $event)),
          onChange: _cache[1] || (_cache[1] = (index, item) => emit("change", index, item))
        }, {
          title: _withCtx(({ item, index }) => [
            _createElementVNode("span", _hoisted_2, [
              _createElementVNode(
                "span",
                _hoisted_3,
                _toDisplayString(item.title),
                1
                /* TEXT */
              ),
              index === __props.modelValue ? (_openBlock(), _createBlock(WorkbenchIcon, {
                key: 0,
                class: "transaction-stage-progress__pointer",
                name: "\u5B9A\u4F4D/\u6307\u9488",
                size: 16,
                "aria-hidden": "true"
              })) : _createCommentVNode("v-if", true)
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["items", "model-value", "current", "readonly", "aria-label"])
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-07e923f2" });
