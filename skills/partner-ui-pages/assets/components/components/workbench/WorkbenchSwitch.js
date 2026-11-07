import { unref as _unref, mergeProps as _mergeProps, createElementVNode as _createElementVNode, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["aria-busy"];
const _hoisted_2 = ["name", "value", "checked", "disabled", "aria-label", "aria-describedby", "aria-invalid", "aria-busy"];
const _hoisted_3 = {
  class: "wb-switch__track",
  "aria-hidden": "true"
};
const _hoisted_4 = { class: "wb-switch__thumb" };
const _hoisted_5 = {
  key: 0,
  class: "wb-switch__label"
};
import { useFormDisabled } from "../form/useFormDisabled.js";
import { useFieldControl } from "../form/fieldContext.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import WorkbenchLoading from "../loading/WorkbenchLoading.vue";
import { nextTick, ref } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchSwitch",
  props: {
    modelValue: Boolean,
    disabled: Boolean,
    loading: Boolean,
    name: String,
    value: { type: String, default: "on" },
    label: { type: String, default: "" },
    ariaLabel: { type: String, default: "" },
    ariaDescribedby: String,
    invalid: Boolean
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const native = ref(null);
    function change(event) {
      emit("update:modelValue", event.target.checked);
      nextTick(() => {
        if (native.value) native.value.checked = props.modelValue;
      });
    }
    const { attrs: fieldAttrs } = useFieldControl(() => props.modelValue, {
      nativeRequired: true,
      describedBy: () => props.ariaDescribedby,
      invalid: () => props.invalid,
      focus: () => native.value?.focus()
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("label", {
        class: _normalizeClass(["wb-switch", { "is-disabled": _unref(disabled), "is-loading": __props.loading }]),
        "aria-busy": __props.loading || void 0
      }, [
        _createElementVNode("input", _mergeProps({
          ref_key: "native",
          ref: native,
          class: "wb-switch__input",
          type: "checkbox",
          role: "switch",
          name: __props.name,
          value: __props.value,
          checked: __props.modelValue,
          disabled: _unref(disabled) || __props.loading,
          "aria-label": __props.ariaLabel || __props.label || "\u5F00\u5173",
          "aria-describedby": __props.ariaDescribedby,
          "aria-invalid": __props.invalid || void 0,
          "aria-busy": __props.loading || void 0
        }, _unref(fieldAttrs), { onChange: change }), null, 16, _hoisted_2),
        _createElementVNode("span", _hoisted_3, [
          _createElementVNode("span", _hoisted_4, [
            __props.loading ? (_openBlock(), _createBlock(WorkbenchLoading, {
              key: 0,
              class: "wb-switch__loading",
              size: 12
            })) : _createCommentVNode("v-if", true)
          ])
        ]),
        __props.label ? (_openBlock(), _createElementBlock(
          "span",
          _hoisted_5,
          _toDisplayString(__props.label),
          1
          /* TEXT */
        )) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-ffafea33" });
