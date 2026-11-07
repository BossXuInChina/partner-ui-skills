import { unref as _unref, mergeProps as _mergeProps, createElementVNode as _createElementVNode, createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["data-controlled-checked", "aria-label", "aria-describedby", "name", "value", "checked", "disabled"];
const _hoisted_2 = { class: "wb-choice__copy" };
const _hoisted_3 = ["title"];
const _hoisted_4 = ["id"];
import { useFormDisabled } from "../form/useFormDisabled.js";
import { useFieldControl } from "../form/fieldContext.js";
import { computed, nextTick, ref, useId } from "vue";
import ChoiceMark from "../choice/ChoiceMark.vue";
const __sfc_main__ = {
  __name: "WorkbenchRadio",
  props: {
    modelValue: String,
    value: { type: String, required: true },
    name: { type: String, required: true },
    disabled: Boolean,
    hover: Boolean,
    label: { type: String, default: "" },
    ariaLabel: String,
    description: String,
    noWrap: Boolean
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const descriptionId = useId();
    const native = ref(null);
    const visibleLabel = computed(
      () => props.noWrap && Array.from(props.label).length > 20 ? `${Array.from(props.label).slice(0, 20).join("")}\u2026` : props.label
    );
    function change() {
      emit("update:modelValue", props.value);
      nextTick(() => {
        if (!native.value) return;
        const owner = native.value;
        const radios = owner.getRootNode().querySelectorAll('input[type="radio"][data-wb-controlled-radio]');
        radios.forEach((radio) => {
          if (radio.name === owner.name && radio.form === owner.form)
            radio.checked = radio.dataset.controlledChecked === "true";
        });
      });
    }
    const { attrs: fieldAttrs } = useFieldControl(() => props.modelValue, {
      nativeRequired: true,
      option: true,
      describedBy: () => props.description ? descriptionId : void 0,
      focus: () => native.value?.focus()
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "label",
        {
          class: _normalizeClass(["wb-choice", { "is-disabled": _unref(disabled), "is-no-wrap": __props.noWrap }])
        },
        [
          _createElementVNode("input", _mergeProps({
            ref_key: "native",
            ref: native,
            class: "wb-choice__input",
            type: "radio",
            "data-wb-controlled-radio": "",
            "data-controlled-checked": __props.modelValue === __props.value,
            "aria-label": __props.ariaLabel || __props.label,
            "aria-describedby": __props.description ? _unref(descriptionId) : void 0,
            name: __props.name,
            value: __props.value,
            checked: __props.modelValue === __props.value,
            disabled: _unref(disabled)
          }, _unref(fieldAttrs), { onChange: change }), null, 16, _hoisted_1),
          _createVNode(ChoiceMark, {
            radio: "",
            checked: __props.modelValue === __props.value,
            disabled: _unref(disabled),
            hover: __props.hover
          }, null, 8, ["checked", "disabled", "hover"]),
          _createElementVNode("span", _hoisted_2, [
            _createElementVNode("span", {
              class: "wb-choice__label",
              title: __props.noWrap ? __props.label : void 0
            }, _toDisplayString(visibleLabel.value), 9, _hoisted_3),
            __props.description ? (_openBlock(), _createElementBlock("span", {
              key: 0,
              id: _unref(descriptionId),
              class: "wb-choice__description"
            }, _toDisplayString(__props.description), 9, _hoisted_4)) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
