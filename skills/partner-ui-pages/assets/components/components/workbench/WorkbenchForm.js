import { useCssVars as _useCssVars } from "vue";
import { unref as _unref, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue";
const _hoisted_1 = { class: "wb-form-container" };
const _hoisted_2 = ["aria-label", "aria-disabled"];
const _hoisted_3 = ["disabled"];
const _hoisted_4 = { class: "wb-form__grid" };
const _hoisted_5 = {
  key: 0,
  class: "wb-form__actions"
};
import "../../../../catalog/generated/asset.tokens.css";
import { computed, provide, ref } from "vue";
import { formContextKey } from "./formContext.js";
import { useFormDisabled } from "./useFormDisabled.js";
const __sfc_main__ = {
  __name: "WorkbenchForm",
  props: {
    title: { type: String, required: true },
    titleVisible: { type: Boolean, default: true },
    model: { type: Object, required: true },
    density: {
      type: String,
      default: "comfortable",
      validator: (value) => ["comfortable", "compact"].includes(value)
    },
    mode: {
      type: String,
      default: "editable",
      validator: (value) => ["readonly", "editable", "mixed"].includes(value)
    },
    labelPosition: {
      type: String,
      default: "top",
      validator: (value) => ["top", "left"].includes(value)
    },
    labelWidth: { type: String, default: "var(--wb-asset-wb-form-label-width)" },
    disabled: Boolean,
    singleLine: Boolean,
    showGrid: Boolean
  },
  emits: ["submit", "invalid"],
  setup(__props, { expose: __expose, emit: __emit }) {
    _useCssVars((_ctx) => ({
      "v2e850780": labelWidth.value
    }));
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const fields = [];
    const fieldVersion = ref(0);
    const submitting = ref(false);
    const labelWidth = computed(() => {
      fieldVersion.value;
      const widestLabel = Math.max(0, ...fields.map((field) => field.labelWidth || 0));
      return `min(${widestLabel}px, ${props.labelWidth})`;
    });
    const hasCustomSize = computed(() => {
      fieldVersion.value;
      return fields.some((field) => Boolean(field.size));
    });
    function registerField(field) {
      fields.push(field);
      fieldVersion.value += 1;
      return () => {
        const index = fields.indexOf(field);
        if (index >= 0) fields.splice(index, 1);
        fieldVersion.value += 1;
      };
    }
    async function validate() {
      const results = fields.map((field) => field.validate("submit"));
      const errors = results.filter((result) => result.status === "error");
      return { valid: errors.length === 0, errors };
    }
    function resetValidation() {
      fields.forEach((field) => field.reset());
    }
    function focusFirstInvalid() {
      fields.find((field) => field.status.value === "error")?.focus();
    }
    async function submit(event) {
      event?.preventDefault();
      if (disabled.value || submitting.value) return;
      submitting.value = true;
      try {
        const result = await validate();
        if (disabled.value) return result;
        if (!result.valid) {
          focusFirstInvalid();
          emit("invalid", result);
          return result;
        }
        emit("submit", { model: props.model });
        return result;
      } finally {
        submitting.value = false;
      }
    }
    provide(formContextKey, {
      disabled,
      model: computed(() => props.model),
      mode: computed(() => props.mode),
      labelPosition: computed(() => props.labelPosition),
      labelWidth,
      refreshLabelWidths() {
        fieldVersion.value += 1;
      },
      showGrid: computed(() => props.showGrid),
      hasCustomSize,
      registerField
    });
    __expose({ validate, resetValidation, focusFirstInvalid, submit });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode("form", {
          class: _normalizeClass(["wb-form", [
            { "has-custom-size": hasCustomSize.value, "is-single-line": __props.singleLine },
            `is-${__props.mode}`,
            `is-density-${__props.density}`,
            `is-label-${__props.labelPosition}`
          ]]),
          "aria-label": __props.title,
          "aria-disabled": _unref(disabled) || void 0,
          novalidate: "",
          onSubmit: submit
        }, [
          _createElementVNode(
            "h2",
            {
              class: _normalizeClass(["wb-form__title", { "is-visually-hidden": !__props.titleVisible }])
            },
            _toDisplayString(__props.title),
            3
            /* TEXT, CLASS */
          ),
          _createElementVNode("fieldset", {
            class: "wb-form__fieldset",
            disabled: _unref(disabled)
          }, [
            _createElementVNode("div", _hoisted_4, [
              _renderSlot(_ctx.$slots, "default"),
              _ctx.$slots.actions && __props.mode !== "readonly" ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
                _renderSlot(_ctx.$slots, "actions")
              ])) : _createCommentVNode("v-if", true)
            ])
          ], 8, _hoisted_3)
        ], 42, _hoisted_2)
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-3b472987" });
