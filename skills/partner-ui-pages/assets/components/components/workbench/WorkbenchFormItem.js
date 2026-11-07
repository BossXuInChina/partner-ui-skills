import { useCssVars as _useCssVars } from "vue";
import { createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, mergeProps as _mergeProps, createElementVNode as _createElementVNode, withCtx as _withCtx, renderSlot as _renderSlot, createTextVNode as _createTextVNode, Fragment as _Fragment, renderList as _renderList, normalizeClass as _normalizeClass, unref as _unref } from "vue";
const _hoisted_1 = { class: "wb-form-item__label-wrap" };
const _hoisted_2 = {
  key: 0,
  class: "wb-form-item__required",
  "aria-hidden": "true"
};
const _hoisted_3 = ["for", "aria-label", "id"];
const _hoisted_4 = ["aria-labelledby"];
const _hoisted_5 = { class: "wb-form-item__readonly-value" };
const _hoisted_6 = {
  key: 0,
  class: "wb-form-item__readonly-actions"
};
const _hoisted_7 = {
  key: 2,
  class: "wb-form-item__grid-overlay",
  "data-wb-grid-overlay": "",
  "aria-hidden": "true"
};
const _hoisted_8 = { "data-wb-grid-label": "" };
const _hoisted_9 = ["role", "aria-labelledby", "aria-describedby"];
const _hoisted_10 = { class: "wb-form-item__control" };
const _hoisted_11 = {
  key: 0,
  class: "wb-form-item__grid-overlay",
  "data-wb-grid-overlay": "",
  "aria-hidden": "true"
};
const _hoisted_12 = { "data-wb-grid-label": "" };
const _hoisted_13 = ["id"];
const _hoisted_14 = ["id"];
import {
  Comment,
  Fragment,
  Text,
  computed,
  inject,
  nextTick,
  onMounted,
  onBeforeUnmount,
  provide,
  ref,
  shallowReactive,
  useId,
  useSlots,
  watch
} from "vue";
import WorkbenchTooltip from "../tooltip/WorkbenchTooltip.vue";
import WorkbenchRequiredMark from "./WorkbenchRequiredMark.vue";
import { formContextKey, getPath } from "./formContext.js";
import { fieldContextKey } from "./fieldContext.js";
const __sfc_main__ = {
  __name: "WorkbenchFormItem",
  props: {
    prop: { type: String, default: "" },
    modelValue: { default: void 0 },
    required: Boolean,
    hint: { type: String, default: "" },
    labelPosition: {
      type: String,
      default: "top",
      validator: (value) => ["top", "left"].includes(value)
    },
    labelWidth: { type: String, default: "var(--wb-asset-wb-form-label-width)" },
    label: { type: String, required: true },
    mode: {
      type: String,
      default: "",
      validator: (value) => ["", "readonly", "editable"].includes(value)
    },
    size: {
      type: String,
      default: "",
      validator: (value) => ["", "s", "base", "m", "l", "xl"].includes(value)
    },
    rules: { type: Array, default: () => [] },
    validateStatus: {
      type: String,
      default: "",
      validator: (value) => ["", "error"].includes(value)
    },
    message: { type: String, default: "" },
    formatter: Function
  },
  setup(__props, { expose: __expose }) {
    _useCssVars((_ctx) => ({
      "e654b796": labelWidth.value
    }));
    const props = __props;
    const context = inject(formContextKey, null);
    const slots = useSlots();
    if (context && !props.prop) throw new Error("WorkbenchFormItem inside WorkbenchForm requires prop");
    const controls = shallowReactive(/* @__PURE__ */ new Map());
    const labelPosition = computed(() => context?.labelPosition.value || props.labelPosition);
    const labelWidth = computed(() => context?.labelWidth.value || props.labelWidth);
    const showGrid = computed(() => context?.showGrid.value || false);
    const customGrid = computed(() => context?.hasCustomSize.value || false);
    const labelElement = ref(null);
    const naturalLabelWidth = ref(0);
    const displayLabel = ref(props.label);
    const labelTruncated = computed(() => displayLabel.value !== props.label);
    let labelObserver;
    const id = `wb-field-${useId()}`;
    const root = ref(null);
    const localStatus = ref("");
    const localFeedback = ref("");
    const touched = ref(false);
    const status = computed(() => props.validateStatus || localStatus.value);
    const feedback = computed(() => props.validateStatus ? props.message : localFeedback.value);
    const disabled = computed(
      () => Boolean(context?.disabled?.value) && effectiveMode.value !== "readonly"
    );
    const effectiveMode = computed(
      () => context ? context.mode.value === "mixed" ? props.mode || "editable" : context.mode.value : props.mode || "editable"
    );
    const required = computed(
      () => effectiveMode.value !== "readonly" && (context ? props.rules.some((rule) => rule?.required) : props.required || props.rules.some((rule) => rule?.required))
    );
    const value = computed(
      () => context ? getPath(context.model.value, props.prop) : props.modelValue !== void 0 ? props.modelValue : [...controls.values()][0]?.value()
    );
    const model = computed(() => context?.model.value || { [props.prop || "field"]: value.value });
    const displayValue = computed(
      () => props.formatter ? props.formatter(value.value, model.value) : Array.isArray(value.value) ? value.value.join("\u3001") || "\u2014" : typeof value.value === "boolean" ? value.value ? "\u662F" : "\u5426" : value.value === "" || value.value == null ? "\u2014" : value.value
    );
    const span = computed(() => ({ s: 2, base: 4, m: 6, l: 8, xl: 10 })[props.size] ?? null);
    const describedBy = computed(
      () => feedback.value ? `${id}-feedback` : props.hint ? `${id}-hint` : void 0
    );
    const firstControl = computed(() => [...controls.values()][0]);
    const labelFor = computed(
      () => firstControl.value?.labelable ? firstControl.value.id : void 0
    );
    const invalid = computed(() => effectiveMode.value !== "readonly" && status.value === "error");
    const registeredStatus = computed(() => effectiveMode.value === "readonly" ? "" : status.value);
    function hasReadonlySlot(name) {
      function containsContent(nodes2) {
        return nodes2.some((node) => {
          if (node.type === Comment) return false;
          if (node.type === Text) return String(node.children ?? "").trim().length > 0;
          if (node.type === Fragment)
            return Array.isArray(node.children) && containsContent(node.children);
          return true;
        });
      }
      const nodes = slots[name]?.({
        value: value.value,
        displayValue: displayValue.value,
        prop: props.prop,
        model: model.value
      });
      return Boolean(nodes && containsContent(nodes));
    }
    function empty(input) {
      return input === false || input == null || typeof input === "string" && !input.trim() || Array.isArray(input) && input.length === 0;
    }
    function resultFrom(rule) {
      if (rule.required && empty(value.value)) return rule.message || "\u8BF7\u5B8C\u6210\u6B64\u9879";
      if (typeof rule.validator !== "function") return "";
      try {
        const result = rule.validator(value.value, model.value);
        if (result && typeof result.then === "function") {
          Promise.resolve(result).catch(() => {
          });
          return rule.message || "\u5F53\u524D\u7248\u672C\u4E0D\u652F\u6301\u5F02\u6B65\u6821\u9A8C";
        }
        if (result === false) return rule.message || "\u5185\u5BB9\u4E0D\u7B26\u5408\u8981\u6C42";
        if (typeof result === "string") return result;
      } catch {
        return rule.message || "\u6821\u9A8C\u6267\u884C\u5931\u8D25";
      }
      return "";
    }
    function validationResult() {
      return { prop: props.prop, status: status.value, message: feedback.value };
    }
    function validate(trigger = "submit") {
      touched.value = true;
      if (effectiveMode.value === "readonly") {
        localStatus.value = "";
        localFeedback.value = "";
        return { prop: props.prop, status: "", message: "" };
      }
      if (props.validateStatus) return validationResult();
      const rules = !context && props.required && !props.rules.some((rule) => rule.required) ? [{ required: true, message: "\u8BF7\u8F93\u5165\u5FC5\u586B\u5185\u5BB9" }, ...props.rules] : props.rules;
      const active = rules.filter(
        (rule) => trigger === "submit" || !rule.trigger || [].concat(rule.trigger).includes(trigger)
      );
      const issues = active.map((rule) => ({ rule, message: resultFrom(rule) })).filter((item) => item.message);
      const controlMessage = [...controls.values()].map((control) => control.validate?.()).find(Boolean);
      if (controlMessage) issues.push({ rule: { severity: "error" }, message: controlMessage });
      const issue = issues[0];
      if (issue) {
        localStatus.value = "error";
        localFeedback.value = issue.message;
      } else {
        localStatus.value = "";
        localFeedback.value = "";
      }
      return validationResult();
    }
    function reset() {
      touched.value = false;
      localStatus.value = "";
      localFeedback.value = "";
      controls.forEach((control) => control.reset?.());
    }
    function focus() {
      if (firstControl.value?.focus) {
        firstControl.value.focus();
        return;
      }
      const control = root.value?.querySelector(
        '.wb-form-item__control input:not([type=hidden]),.wb-form-item__control textarea,.wb-form-item__control select,.wb-form-item__control button,.wb-form-item__control [tabindex]:not([tabindex="-1"])'
      );
      (control || root.value?.querySelector('[tabindex]:not([tabindex="-1"])'))?.focus();
    }
    function touch(trigger, event) {
      if (trigger === "blur" && event?.relatedTarget && (root.value?.contains(event.relatedTarget) || [...controls.values()].some((control) => control.containsFocus?.(event.relatedTarget))))
        return;
      if (event?.isComposing || event?.target?.composing) return;
      if (effectiveMode.value !== "readonly") validate(trigger);
    }
    function measureLabelWidth() {
      if (!labelElement.value || typeof document === "undefined") return;
      const style = getComputedStyle(labelElement.value);
      const canvas = document.createElement("canvas");
      const context2d = canvas.getContext("2d");
      if (!context2d) return;
      context2d.font = style.font;
      const letterSpacing = Number.parseFloat(style.letterSpacing) || 0;
      const widthOf = (text) => context2d.measureText(text).width + Math.max(0, [...text].length - 1) * letterSpacing;
      const naturalWidth = Math.ceil(widthOf(props.label));
      if (naturalLabelWidth.value !== naturalWidth) {
        naturalLabelWidth.value = naturalWidth;
        context?.refreshLabelWidths?.();
      }
      const columnWidth = Number.parseFloat(getComputedStyle(root.value).gridTemplateColumns);
      const available = (columnWidth || labelElement.value.getBoundingClientRect().width) - (Number.parseFloat(style.paddingLeft) || 0) - (Number.parseFloat(style.paddingRight) || 0);
      if (labelPosition.value !== "left" || available <= 0 || widthOf(props.label) <= available) {
        displayLabel.value = props.label;
        return;
      }
      const characters = typeof Intl.Segmenter === "function" ? [...new Intl.Segmenter(void 0, { granularity: "grapheme" }).segment(props.label)].map(
        (item) => item.segment
      ) : Array.from(props.label);
      let start = 0;
      let end = characters.length;
      while (start < end) {
        const middle = Math.ceil((start + end) / 2);
        if (widthOf(`${characters.slice(0, middle).join("")}\u2026`) <= available) start = middle;
        else end = middle - 1;
      }
      displayLabel.value = `${characters.slice(0, start).join("")}\u2026`;
    }
    watch(
      () => [props.label, labelPosition.value, labelWidth.value],
      () => nextTick(measureLabelWidth),
      { flush: "post" }
    );
    onMounted(() => {
      measureLabelWidth();
      labelObserver = new ResizeObserver(measureLabelWidth);
      labelObserver.observe(labelElement.value);
      document.fonts?.ready.then(measureLabelWidth);
    });
    watch(
      value,
      () => {
        if (touched.value && effectiveMode.value !== "readonly") validate("change");
      },
      { deep: true, flush: "post" }
    );
    watch(
      () => props.validateStatus,
      (current, previous) => {
        if (previous && !current && touched.value) validate("change");
      },
      { flush: "post" }
    );
    provide(fieldContextKey, {
      label: computed(() => props.label),
      labelId: `${id}-label`,
      controlCount: computed(() => controls.size),
      required,
      invalid,
      describedBy,
      status,
      feedback,
      registerControl(control) {
        controls.set(control.id, control);
        return () => controls.delete(control.id);
      },
      validate: (trigger) => validate(trigger),
      blur: (event) => touch("blur", event)
    });
    const unregister = context?.registerField({
      get prop() {
        return props.prop;
      },
      get size() {
        return props.size;
      },
      get labelWidth() {
        return naturalLabelWidth.value;
      },
      status: registeredStatus,
      validate,
      reset,
      focus
    });
    onBeforeUnmount(() => {
      labelObserver?.disconnect();
      unregister?.();
    });
    __expose({ validate, reset, focus, status });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          ref_key: "root",
          ref: root,
          class: _normalizeClass(["wb-form-item", [
            `is-${status.value || "default"}`,
            `is-${effectiveMode.value}`,
            `is-label-${labelPosition.value}`,
            __props.size ? `is-size-${__props.size}` : "",
            { "has-size": span.value, "is-custom-grid": customGrid.value, "is-disabled": disabled.value }
          ]]),
          onFocusout: _cache[0] || (_cache[0] = ($event) => touch("blur", $event)),
          onInput: _cache[1] || (_cache[1] = ($event) => touch("change", $event)),
          onChange: _cache[2] || (_cache[2] = ($event) => touch("change", $event)),
          onClickCapture: _cache[3] || (_cache[3] = ($event) => touched.value = true)
        },
        [
          _createElementVNode("div", _hoisted_1, [
            required.value ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
              _createVNode(WorkbenchRequiredMark)
            ])) : _createCommentVNode("v-if", true),
            _createVNode(WorkbenchTooltip, {
              content: __props.label,
              "overflow-only": labelPosition.value !== "left",
              disabled: labelPosition.value === "left" && !labelTruncated.value,
              placement: "top-start"
            }, {
              trigger: _withCtx(({ aria }) => [
                _createElementVNode("label", _mergeProps({
                  ref_key: "labelElement",
                  ref: labelElement,
                  for: labelFor.value,
                  "aria-label": __props.label,
                  onClick: focus,
                  class: "wb-form-item__label",
                  id: `${id}-label`,
                  tabindex: "0"
                }, aria), _toDisplayString(displayLabel.value), 17, _hoisted_3)
              ]),
              _: 1
              /* STABLE */
            }, 8, ["content", "overflow-only", "disabled"])
          ]),
          effectiveMode.value === "readonly" ? (_openBlock(), _createElementBlock("div", {
            key: 0,
            class: _normalizeClass(["wb-form-item__readonly", {
              "has-richcontent": hasReadonlySlot("readonly") || hasReadonlySlot("readonly-actions")
            }]),
            role: "group",
            "aria-labelledby": `${id}-label`
          }, [
            hasReadonlySlot("readonly") || hasReadonlySlot("readonly-actions") ? (_openBlock(), _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                _createElementVNode("div", _hoisted_5, [
                  _renderSlot(_ctx.$slots, "readonly", {
                    value: value.value,
                    displayValue: displayValue.value,
                    prop: __props.prop,
                    model: model.value
                  }, () => [
                    _createTextVNode(
                      _toDisplayString(displayValue.value),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                hasReadonlySlot("readonly-actions") ? (_openBlock(), _createElementBlock("div", _hoisted_6, [
                  _renderSlot(_ctx.$slots, "readonly-actions", {
                    value: value.value,
                    displayValue: displayValue.value,
                    prop: __props.prop,
                    model: model.value
                  })
                ])) : _createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (_openBlock(), _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createTextVNode(
                  _toDisplayString(displayValue.value),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            showGrid.value ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
              (_openBlock(), _createElementBlock(
                _Fragment,
                null,
                _renderList(12, (column) => {
                  return _createElementVNode("i", {
                    key: column,
                    "data-wb-grid-track": ""
                  }, [
                    _createElementVNode(
                      "span",
                      _hoisted_8,
                      _toDisplayString(column),
                      1
                      /* TEXT */
                    )
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ])) : _createCommentVNode("v-if", true)
          ], 10, _hoisted_4)) : (_openBlock(), _createElementBlock("div", {
            key: 1,
            class: "wb-form-item__body",
            role: _unref(controls).size > 1 ? "group" : void 0,
            "aria-labelledby": _unref(controls).size > 1 ? `${id}-label` : void 0,
            "aria-describedby": describedBy.value
          }, [
            _createElementVNode("div", _hoisted_10, [
              _renderSlot(_ctx.$slots, "default", {
                status: status.value,
                message: feedback.value,
                describedBy: describedBy.value,
                invalid: invalid.value,
                required: required.value,
                labelledBy: `${id}-label`
              }),
              showGrid.value ? (_openBlock(), _createElementBlock("div", _hoisted_11, [
                (_openBlock(), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(12, (column) => {
                    return _createElementVNode("i", {
                      key: column,
                      "data-wb-grid-track": ""
                    }, [
                      _createElementVNode(
                        "span",
                        _hoisted_12,
                        _toDisplayString(column),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  64
                  /* STABLE_FRAGMENT */
                ))
              ])) : _createCommentVNode("v-if", true)
            ]),
            !feedback.value && __props.hint ? (_openBlock(), _createElementBlock("p", {
              key: 0,
              id: `${id}-hint`,
              class: "wb-form-item__hint"
            }, [
              _createElementVNode(
                "span",
                null,
                _toDisplayString(__props.hint),
                1
                /* TEXT */
              )
            ], 8, _hoisted_13)) : _createCommentVNode("v-if", true),
            feedback.value ? (_openBlock(), _createElementBlock("p", {
              key: 1,
              id: `${id}-feedback`,
              class: "wb-form-item__feedback",
              role: "alert"
            }, [
              _createElementVNode(
                "span",
                null,
                _toDisplayString(feedback.value),
                1
                /* TEXT */
              )
            ], 8, _hoisted_14)) : _createCommentVNode("v-if", true)
          ], 8, _hoisted_9))
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-1dd78a86" });
