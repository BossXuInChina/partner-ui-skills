import { unref as _unref, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createVNode as _createVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, mergeProps as _mergeProps } from "vue";
const _hoisted_1 = ["aria-readonly", "aria-label", "aria-describedby", "aria-invalid"];
const _hoisted_2 = ["aria-checked", "aria-label", "disabled", "tabindex", "onClick"];
const _hoisted_3 = {
  class: "wb-rating__star",
  "aria-hidden": "true"
};
const _hoisted_4 = {
  key: 0,
  class: "wb-rating__label"
};
const _hoisted_5 = {
  key: 0,
  class: "wb-rating__description"
};
const _hoisted_6 = ["name", "value"];
import { useFormDisabled } from "../form/useFormDisabled.js";
import { useFieldControl } from "../form/fieldContext.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, ref } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
const __sfc_main__ = {
  __name: "WorkbenchRating",
  props: {
    modelValue: { type: Number, default: 0 },
    max: { type: Number, default: 5, validator: (value) => Number.isInteger(value) && value > 0 },
    step: { type: Number, default: 1, validator: (value) => value === 1 || value === 0.5 },
    disabled: Boolean,
    name: String,
    ariaLabel: { type: String, default: "\u8BC4\u5206" },
    ariaDescribedby: String,
    invalid: Boolean,
    readOnly: Boolean,
    descriptionMode: { type: String, default: "per-star", validator: (value) => ["none", "text", "numeric", "per-star"].includes(value) },
    descriptionPlacement: { type: String, default: "right", validator: (value) => ["right", "bottom"].includes(value) },
    descriptions: { type: Array, default: () => ["\u5F88\u5DEE", "\u8F83\u5DEE", "\u4E00\u822C", "\u8F83\u597D", "\u5F88\u597D"] }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const items = ref([]);
    const values = computed(() => Array.from({ length: props.max }, (_, index) => index + 1));
    const focusValue = computed(() => Math.max(1, Math.min(props.max, Math.ceil(props.modelValue) || 1)));
    const isHalfStep = computed(() => props.step === 0.5);
    const normalize = (value) => Math.max(0, Math.min(props.max, Math.round(value / props.step) * props.step));
    const scoreText = computed(() => props.descriptionMode === "numeric" ? props.modelValue.toFixed(1) : props.descriptions[Math.max(0, Math.ceil(props.modelValue) - 1)] || "\u672A\u8BC4\u5206");
    function choose(value) {
      if (!disabled.value && !props.readOnly) emit("update:modelValue", normalize(value));
    }
    function chooseByPointer(event, value) {
      if (!isHalfStep.value) return choose(value);
      const rect = event.currentTarget.getBoundingClientRect();
      choose(value - (event.clientX - rect.left < rect.width / 2 ? 0.5 : 0));
    }
    function keydown(event) {
      if (disabled.value || props.readOnly || !["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const next = normalize(event.key === "Home" ? 0 : event.key === "End" ? props.max : props.modelValue + (["ArrowRight", "ArrowUp"].includes(event.key) ? props.step : -props.step));
      choose(next);
      nextTick(() => items.value[Math.max(0, Math.ceil(next) - 1)]?.focus());
    }
    function fill(value) {
      return Math.max(0, Math.min(1, props.modelValue - value + 1));
    }
    const { attrs: fieldAttrs } = useFieldControl(() => props.modelValue, { labelable: false, describedBy: () => props.ariaDescribedby, invalid: () => props.invalid, focus: () => items.value?.find((el) => el?.tabIndex === 0)?.focus() });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          class: _normalizeClass(["wb-rating-wrap", [`is-${__props.descriptionPlacement}`, { "has-description": __props.descriptionMode !== "none" && __props.descriptionMode !== "per-star" }]])
        },
        [
          _createElementVNode("div", _mergeProps({
            class: ["wb-rating", { "has-per-star-label": __props.descriptionMode === "per-star", "is-readonly": __props.readOnly }],
            role: "radiogroup",
            "aria-readonly": __props.readOnly || void 0,
            "aria-label": __props.ariaLabel,
            "aria-describedby": __props.ariaDescribedby,
            "aria-invalid": __props.invalid || void 0
          }, _unref(fieldAttrs), { onKeydown: keydown }), [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(values.value, (value) => {
                return _openBlock(), _createElementBlock("div", {
                  key: value,
                  class: "wb-rating__entry"
                }, [
                  _createElementVNode("button", {
                    ref_for: true,
                    ref_key: "items",
                    ref: items,
                    type: "button",
                    role: "radio",
                    class: _normalizeClass(["wb-rating__item", { "is-selected": fill(value) > 0 }]),
                    "aria-checked": __props.modelValue === value || isHalfStep.value && __props.modelValue === value - 0.5,
                    "aria-label": isHalfStep.value ? `${value - 0.5}\u81F3${value}.0\u5206` : `${value}.0\u5206`,
                    disabled: _unref(disabled),
                    tabindex: value === focusValue.value ? 0 : -1,
                    onClick: ($event) => chooseByPointer($event, value)
                  }, [
                    _createElementVNode("span", _hoisted_3, [
                      _createVNode(WorkbenchIcon, {
                        name: "\u6536\u85CF/\u9762\u6027=on_12px",
                        "color-split": { ratio: fill(value), startColor: _unref(disabled) ? "var(--wb-color-icon-disabled)" : "var(--wb-color-warning)", endColor: _unref(disabled) ? "var(--wb-color-icon-disabled)" : "var(--wb-asset-wb-rating-unselected-color)" }
                      }, null, 8, ["color-split"])
                    ])
                  ], 10, _hoisted_2),
                  __props.descriptionMode === "per-star" ? (_openBlock(), _createElementBlock(
                    "span",
                    _hoisted_4,
                    _toDisplayString(__props.descriptions[value - 1]),
                    1
                    /* TEXT */
                  )) : _createCommentVNode("v-if", true)
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 16, _hoisted_1),
          __props.descriptionMode !== "none" && __props.descriptionMode !== "per-star" ? (_openBlock(), _createElementBlock(
            "output",
            _hoisted_5,
            _toDisplayString(scoreText.value),
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true),
          __props.name ? (_openBlock(), _createElementBlock("input", {
            key: 1,
            type: "hidden",
            name: __props.name,
            value: __props.modelValue
          }, null, 8, _hoisted_6)) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-936ffd86" });
