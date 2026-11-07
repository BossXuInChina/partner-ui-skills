import { unref as _unref, mergeProps as _mergeProps, createElementVNode as _createElementVNode, createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["checked", ".indeterminate", "disabled", "aria-label", "aria-describedby"];
const _hoisted_2 = {
  key: 0,
  class: "wb-choice__copy"
};
const _hoisted_3 = ["title"];
const _hoisted_4 = ["id"];
import { useFormDisabled } from "../form/useFormDisabled.js";
import { useFieldControl } from "../form/fieldContext.js";
import { computed, nextTick, ref, useId } from "vue";
import ChoiceMark from "./ChoiceMark.vue";
const __sfc_main__ = {
  __name: "WorkbenchCheckbox",
  props: {
    modelValue: Boolean,
    indeterminate: Boolean,
    disabled: Boolean,
    hover: Boolean,
    label: { type: String, default: "" },
    ariaLabel: String,
    description: String,
    noWrap: Boolean
  },
  emits: ["update:modelValue", "update:indeterminate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const descriptionId = useId();
    const native = ref(null);
    const visibleLabel = computed(
      () => props.noWrap && Array.from(props.label).length > 20 ? `${Array.from(props.label).slice(0, 20).join("")}\u2026` : props.label
    );
    function change(event) {
      if (disabled.value) return;
      const checked = props.indeterminate || event.target.checked;
      event.target.checked = checked;
      event.target.indeterminate = false;
      emit("update:modelValue", checked);
      emit("update:indeterminate", false);
      nextTick(() => {
        if (!native.value) return;
        native.value.checked = props.modelValue;
        native.value.indeterminate = props.indeterminate;
      });
    }
    const { attrs: fieldAttrs } = useFieldControl(() => props.modelValue, {
      nativeRequired: "single",
      option: true,
      describedBy: () => props.description ? descriptionId : void 0,
      focus: () => native.value?.focus()
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "label",
        {
          class: _normalizeClass(["wb-choice", {
            "is-disabled": _unref(disabled),
            "is-no-wrap": __props.noWrap,
            "is-icon-only": !__props.label && !__props.description
          }])
        },
        [
          _createElementVNode("input", _mergeProps({
            ref_key: "native",
            ref: native,
            class: "wb-choice__input",
            type: "checkbox",
            checked: __props.modelValue,
            ".indeterminate": __props.indeterminate,
            disabled: _unref(disabled),
            "aria-label": __props.ariaLabel || __props.label,
            "aria-describedby": __props.description ? _unref(descriptionId) : void 0
          }, _unref(fieldAttrs), { onChange: change }), null, 48, _hoisted_1),
          _createVNode(ChoiceMark, {
            checked: __props.modelValue,
            indeterminate: __props.indeterminate,
            disabled: _unref(disabled),
            hover: __props.hover
          }, null, 8, ["checked", "indeterminate", "disabled", "hover"]),
          __props.label || __props.description ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
            _createElementVNode("span", {
              class: "wb-choice__label",
              title: __props.noWrap ? __props.label : void 0
            }, _toDisplayString(visibleLabel.value), 9, _hoisted_3),
            __props.description ? (_openBlock(), _createElementBlock("span", {
              key: 0,
              id: _unref(descriptionId),
              class: "wb-choice__description"
            }, _toDisplayString(__props.description), 9, _hoisted_4)) : _createCommentVNode("v-if", true)
          ])) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
