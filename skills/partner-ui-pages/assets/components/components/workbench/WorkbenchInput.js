import { unref as _unref, renderSlot as _renderSlot, createVNode as _createVNode, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, mergeProps as _mergeProps, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = { class: "wb-input__body" };
const _hoisted_2 = { class: "wb-input__row" };
const _hoisted_3 = ["id", "name", "aria-label", "value", "placeholder", "disabled", "required", "aria-invalid"];
const _hoisted_4 = ["id", "name", "aria-label", "type", "value", "placeholder", "disabled", "required", "aria-invalid"];
const _hoisted_5 = {
  key: 2,
  class: "wb-input__counter"
};
const _hoisted_6 = ["disabled", "aria-label", "aria-pressed"];
const _hoisted_7 = {
  key: 4,
  class: "wb-input__trailing",
  "aria-hidden": "true"
};
const _hoisted_8 = {
  key: 0,
  class: "wb-input__unit"
};
import { useFormDisabled } from "../form/useFormDisabled.js";
import { useFieldControl } from "../form/fieldContext.js";
import SearchFilter from "../search/SearchFilter.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import "../../../../catalog/generated/asset.tokens.css";
import "../scrollbar/scrollbar.css";
import { computed, ref, useId, watch, watchEffect, onBeforeUnmount } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchInput",
  props: {
    modelValue: { type: String, default: "" },
    type: { type: String, default: "text" },
    size: { type: String, default: "32", validator: (value) => ["28", "32"].includes(value) },
    placeholder: { type: String, default: "\u8BF7\u8F93\u5165" },
    resizable: { type: Boolean, default: true },
    required: Boolean,
    disabled: Boolean,
    name: String,
    ariaLabel: String,
    state: { type: String, default: "default" },
    maxLength: Number,
    validate: Function,
    prefixValue: String,
    prefixPlaceholder: String,
    prefixOptions: { type: Array, default: () => [] },
    prefixDisabled: Boolean,
    showPrefixIcon: { type: Boolean, default: true },
    suffixDisabled: Boolean,
    showSuffixIcon: { type: Boolean, default: true },
    unit: String,
    unitFilterLabel: { type: String, default: "\u7B5B\u9009" },
    unitOptions: { type: Array, default: () => [] },
    showTrailingIcon: Boolean
  },
  emits: ["update:modelValue", "update:unit", "update:prefixValue", "validation"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const hasPrefix = computed(
      () => props.prefixOptions.length > 0 || Boolean(props.prefixPlaceholder)
    );
    const id = useId();
    const native = ref(null);
    const visible = ref(false);
    const touched = ref(false);
    const error = ref("");
    const composing = ref(false);
    const disabled = useFormDisabled(() => props.disabled || props.state === "disabled");
    const {
      field,
      attrs: fieldAttrs,
      required: controlRequired,
      invalid: fieldInvalid
    } = useFieldControl(() => props.modelValue, {
      id,
      nativeRequired: true,
      named: () => props.ariaLabel,
      required: () => props.required,
      invalid: () => !!message.value,
      focus: () => native.value?.focus(),
      validate: () => reason(native.value?.value ?? props.modelValue),
      reset: () => {
        touched.value = false;
        error.value = "";
      }
    });
    const count = computed(() => Array.from(props.modelValue).length);
    const over = computed(() => props.maxLength != null && count.value > props.maxLength);
    function reason(value) {
      if (disabled.value) return "";
      return (props.state === "error" ? "\u8F93\u5165\u5185\u5BB9\u4E0D\u7B26\u5408\u8981\u6C42" : "") || (!field && controlRequired.value && !value.trim() ? "\u8BF7\u8F93\u5165\u5FC5\u586B\u5185\u5BB9" : props.maxLength != null && Array.from(value).length > props.maxLength ? `\u6700\u591A\u5EFA\u8BAE\u8F93\u5165${props.maxLength}\u4E2A\u5B57\u7B26` : props.validate?.(value) || "");
    }
    const message = computed(
      () => disabled.value ? "" : props.state === "error" ? "\u8F93\u5165\u5185\u5BB9\u4E0D\u7B26\u5408\u8981\u6C42" : error.value
    );
    function check(value = props.modelValue) {
      error.value = reason(value);
      const message2 = validityMessage(error.value);
      native.value?.setCustomValidity(message2);
      emit("validation", { valid: !message2, message: message2 });
      return !message2;
    }
    function validityMessage(inputError) {
      if (disabled.value) return "";
      return field?.invalid.value ? field.feedback.value || inputError || "\u5185\u5BB9\u4E0D\u7B26\u5408\u8981\u6C42" : inputError;
    }
    function input(event) {
      if (composing.value || event.isComposing) {
        event.stopPropagation();
        return;
      }
      emit("update:modelValue", event.target.value);
      native.value?.setCustomValidity(reason(event.target.value));
      if (touched.value) check(event.target.value);
    }
    function compositionEnd(event) {
      composing.value = false;
      input(event);
    }
    function blur() {
      if (!disabled.value && !composing.value) {
        touched.value = true;
        check(native.value?.value ?? props.modelValue);
      }
    }
    function validate() {
      touched.value = true;
      field?.validate("submit");
      return check(native.value?.value ?? props.modelValue);
    }
    watch(
      [
        () => props.modelValue,
        () => props.state,
        disabled,
        () => props.required,
        () => props.maxLength,
        () => props.validate
      ],
      () => {
        if (touched.value && !composing.value) check();
      }
    );
    watchEffect(() => {
      if (native.value && !composing.value)
        native.value.setCustomValidity(validityMessage(reason(props.modelValue)));
    });
    let gutterObserver;
    watch(
      native,
      (element) => {
        gutterObserver?.disconnect();
        if (!element || element.tagName !== "TEXTAREA") return;
        const measure = () => element.style.setProperty(
          "--input-scrollbar-gutter",
          `${element.offsetWidth - element.clientWidth}px`
        );
        gutterObserver = new ResizeObserver(measure);
        gutterObserver.observe(element);
        measure();
      },
      { flush: "post" }
    );
    onBeforeUnmount(() => gutterObserver?.disconnect());
    __expose({ validate, focus: () => native.value?.focus() });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          class: _normalizeClass(["wb-input", [
            `is-${__props.state}`,
            `wb-input--size-${__props.size}`,
            { "is-disabled": _unref(disabled), "has-error": _unref(field) ? _unref(fieldInvalid) : !!message.value }
          ]])
        },
        [
          _createElementVNode("div", _hoisted_1, [
            _createElementVNode("div", _hoisted_2, [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass(["wb-input__shell wb-search", [
                    `is-${__props.state}`,
                    {
                      "is-disabled": _unref(disabled),
                      "wb-search--filter-both": hasPrefix.value && __props.unitOptions.length,
                      "wb-search--filter-prefix": hasPrefix.value,
                      "wb-search--filter-suffix": __props.unitOptions.length
                    }
                  ]])
                },
                [
                  hasPrefix.value && __props.type !== "textarea" ? (_openBlock(), _createBlock(SearchFilter, {
                    key: 0,
                    side: "prefix",
                    "filter-value": __props.prefixValue,
                    "filter-placeholder": __props.prefixPlaceholder,
                    "filter-options": __props.prefixOptions,
                    disabled: _unref(disabled) || __props.prefixDisabled || !__props.prefixOptions.length,
                    "show-icon": __props.showPrefixIcon,
                    "preview-state": __props.state,
                    "onUpdate:filterValue": _cache[0] || (_cache[0] = ($event) => emit("update:prefixValue", $event))
                  }, {
                    "filter-icon": _withCtx(() => [
                      _renderSlot(_ctx.$slots, "prefix-icon", {}, () => [
                        _createVNode(WorkbenchIcon, { name: "\u6587\u4EF6\u5939_14px" })
                      ])
                    ]),
                    _: 3
                    /* FORWARDED */
                  }, 8, ["filter-value", "filter-placeholder", "filter-options", "disabled", "show-icon", "preview-state"])) : _createCommentVNode("v-if", true),
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass(["wb-input__control", {
                        "wb-input__control--multiline": __props.type === "textarea",
                        "is-resizable": __props.type === "textarea" && __props.resizable && !_unref(disabled)
                      }])
                    },
                    [
                      __props.type === "textarea" ? (_openBlock(), _createElementBlock("textarea", _mergeProps({
                        key: 0,
                        id: _unref(id),
                        ref_key: "native",
                        ref: native,
                        name: __props.name,
                        "aria-label": __props.ariaLabel || void 0,
                        class: "wb-input__native wb-scrollbar",
                        value: __props.modelValue,
                        placeholder: __props.placeholder,
                        disabled: _unref(disabled),
                        required: _unref(controlRequired),
                        "aria-invalid": !!message.value
                      }, _unref(fieldAttrs), {
                        rows: "3",
                        onInput: input,
                        onBlur: blur,
                        onInvalid: validate,
                        onCompositionstart: _cache[1] || (_cache[1] = ($event) => composing.value = true),
                        onCompositionend: compositionEnd
                      }), null, 16, _hoisted_3)) : (_openBlock(), _createElementBlock("input", _mergeProps({
                        key: 1,
                        id: _unref(id),
                        ref_key: "native",
                        ref: native,
                        name: __props.name,
                        "aria-label": __props.ariaLabel || void 0,
                        class: "wb-input__native",
                        type: __props.type === "password" && !visible.value ? "password" : "text",
                        value: __props.modelValue,
                        placeholder: __props.placeholder,
                        disabled: _unref(disabled),
                        required: _unref(controlRequired),
                        "aria-invalid": !!message.value
                      }, _unref(fieldAttrs), {
                        onInput: input,
                        onBlur: blur,
                        onInvalid: validate,
                        onCompositionstart: _cache[2] || (_cache[2] = ($event) => composing.value = true),
                        onCompositionend: compositionEnd
                      }), null, 16, _hoisted_4)),
                      __props.type === "textarea" && __props.maxLength != null ? (_openBlock(), _createElementBlock("span", _hoisted_5, [
                        _createElementVNode(
                          "span",
                          {
                            class: _normalizeClass({ "is-over": over.value && !_unref(disabled) })
                          },
                          _toDisplayString(count.value),
                          3
                          /* TEXT, CLASS */
                        ),
                        _createTextVNode(
                          " / " + _toDisplayString(__props.maxLength),
                          1
                          /* TEXT */
                        )
                      ])) : _createCommentVNode("v-if", true),
                      __props.type === "password" ? (_openBlock(), _createElementBlock("button", {
                        key: 3,
                        type: "button",
                        class: "wb-input__icon-button",
                        disabled: _unref(disabled),
                        "aria-label": visible.value ? "\u9690\u85CF\u5BC6\u7801" : "\u663E\u793A\u5BC6\u7801",
                        "aria-pressed": visible.value,
                        onClick: _cache[3] || (_cache[3] = ($event) => visible.value = !visible.value)
                      }, [
                        _createVNode(WorkbenchIcon, {
                          name: visible.value ? "\u53EF\u89C1\u4E0D\u53EF\u89C1/\u53EF\u89C1=off_14px" : "\u53EF\u89C1\u4E0D\u53EF\u89C1/\u53EF\u89C1=on_14px"
                        }, null, 8, ["name"])
                      ], 8, _hoisted_6)) : __props.type !== "textarea" && __props.showTrailingIcon ? (_openBlock(), _createElementBlock("span", _hoisted_7, [
                        _renderSlot(_ctx.$slots, "trailing-icon", {}, () => [
                          _createVNode(WorkbenchIcon, { name: "\u9ED8\u8BA4/\u7C7B\u578B=\u5355\u56FE\u6807_14px" })
                        ])
                      ])) : _createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  __props.unitOptions.length && __props.type !== "textarea" ? (_openBlock(), _createBlock(SearchFilter, {
                    key: 1,
                    side: "suffix",
                    "filter-label": __props.unitFilterLabel,
                    "filter-value": __props.unit,
                    "filter-options": __props.unitOptions,
                    disabled: _unref(disabled) || __props.suffixDisabled,
                    "show-icon": __props.showSuffixIcon,
                    "preview-state": __props.state,
                    "onUpdate:filterValue": _cache[4] || (_cache[4] = ($event) => emit("update:unit", $event))
                  }, {
                    "filter-icon": _withCtx(() => [
                      _renderSlot(_ctx.$slots, "suffix-icon", {}, () => [
                        _createVNode(WorkbenchIcon, { name: "\u6587\u4EF6\u5939_14px" })
                      ])
                    ]),
                    _: 3
                    /* FORWARDED */
                  }, 8, ["filter-label", "filter-value", "filter-options", "disabled", "show-icon", "preview-state"])) : _createCommentVNode("v-if", true)
                ],
                2
                /* CLASS */
              ),
              __props.unit && !__props.unitOptions.length ? (_openBlock(), _createElementBlock(
                "span",
                _hoisted_8,
                _toDisplayString(__props.unit),
                1
                /* TEXT */
              )) : _createCommentVNode("v-if", true)
            ])
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
