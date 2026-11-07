import { unref as _unref, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, mergeProps as _mergeProps, withKeys as _withKeys, createVNode as _createVNode, createBlock as _createBlock } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "wb-slider__ticks",
  "aria-hidden": "true"
};
const _hoisted_2 = {
  key: 1,
  class: "wb-slider__tick-label",
  "data-part": "tick-label"
};
const _hoisted_3 = {
  key: 0,
  class: "wb-slider__tick-unit"
};
const _hoisted_4 = { key: 0 };
const _hoisted_5 = ["name", "value", "min", "max", "step", "disabled", "aria-label", "aria-valuemax"];
const _hoisted_6 = {
  key: 1,
  class: "wb-slider__tooltip wb-slider__tooltip--lower",
  "data-part": "tooltip",
  "aria-hidden": "true"
};
const _hoisted_7 = ["name", "value", "min", "max", "step", "disabled", "aria-label", "aria-valuemin"];
const _hoisted_8 = {
  key: 0,
  class: "wb-slider__tooltip wb-slider__tooltip--upper",
  "data-part": "tooltip",
  "aria-hidden": "true"
};
const _hoisted_9 = {
  key: 0,
  class: "wb-slider__editor"
};
const _hoisted_10 = {
  key: 0,
  class: "wb-slider__input-group"
};
const _hoisted_11 = {
  key: 0,
  class: "wb-slider__separator",
  "aria-hidden": "true"
};
const _hoisted_12 = {
  key: 1,
  class: "wb-slider__value"
};
const _hoisted_13 = {
  key: 2,
  class: "wb-slider__unit",
  "data-part": "unit"
};
import { useFormDisabled } from "../form/useFormDisabled.js";
import { useFieldControl, fieldContextKey } from "../form/fieldContext.js";
import { provide } from "vue";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, ref, watch, watchEffect } from "vue";
import WorkbenchInput from "../input/WorkbenchInput.vue";
const __sfc_main__ = {
  __name: "WorkbenchSlider",
  props: {
    modelValue: { type: [Number, Array], default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    type: {
      type: String,
      default: "continuous",
      validator: (value) => ["continuous", "discrete"].includes(value)
    },
    range: Boolean,
    disabled: Boolean,
    name: String,
    ariaLabel: { type: String, default: "\u6ED1\u52A8\u6761" },
    ariaDescribedby: String,
    invalid: Boolean,
    showValue: Boolean,
    showTicks: Boolean,
    showTickLabels: Boolean,
    tickLabelMode: {
      type: String,
      default: "all",
      validator: (value) => ["all", "endpoints"].includes(value)
    },
    showInput: Boolean,
    wideInput: Boolean,
    unit: String,
    tickLabels: { type: [Array, Object], default: () => ({}) },
    showTooltip: Boolean
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const lower = ref(null), upper = ref(null);
    const { field, attrs: lowerFieldAttrs } = useFieldControl(() => props.modelValue, {
      describedBy: () => props.ariaDescribedby,
      invalid: () => props.invalid,
      option: true,
      focus: () => lower.value?.focus()
    });
    const { attrs: upperFieldAttrs } = useFieldControl(() => props.modelValue, {
      active: () => props.type === "discrete" && props.range,
      describedBy: () => props.ariaDescribedby,
      invalid: () => props.invalid,
      option: true,
      focus: () => upper.value?.focus()
    });
    provide(fieldContextKey, null);
    const controlLabel = computed(() => field?.label.value || props.ariaLabel);
    const emit = __emit;
    const activeThumb = ref("");
    const focusedThumb = ref("");
    const inputDrafts = ref(["", ""]);
    const editingInput = ref([false, false]);
    const lastInteractedThumb = ref("lower");
    watch(() => disabled.value, (disabled2) => {
      if (disabled2) {
        activeThumb.value = "";
        focusedThumb.value = "";
      }
    });
    const isRange = computed(() => props.type === "discrete" && props.range);
    const span = computed(() => Math.max(0, props.max - props.min));
    const safeStep = computed(() => Number.isFinite(props.step) && props.step > 0 ? props.step : 1);
    const precision = computed(() => String(safeStep.value).split(".")[1]?.length || 0);
    const displayUnit = computed(() => String(props.unit || "").toUpperCase());
    function normalize(value) {
      const numeric = Number(value);
      const safe = Number.isFinite(numeric) ? numeric : props.min;
      const stepped = props.min + Math.round((safe - props.min) / safeStep.value) * safeStep.value;
      return Number(Math.min(props.max, Math.max(props.min, stepped)).toFixed(precision.value));
    }
    const values = computed(() => {
      if (!isRange.value)
        return [normalize(Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue)];
      const source = Array.isArray(props.modelValue) ? props.modelValue : [props.min, props.modelValue];
      const lower2 = normalize(source[0]);
      const upper2 = normalize(source[1] ?? props.max);
      return lower2 <= upper2 ? [lower2, upper2] : [upper2, lower2];
    });
    const percentages = computed(
      () => values.value.map((value) => span.value ? (value - props.min) / span.value * 100 : 0)
    );
    watch(
      values,
      (value) => value.forEach((item, index) => {
        if (!editingInput.value[index]) inputDrafts.value[index] = String(item);
      }),
      { immediate: true }
    );
    const startPercent = computed(() => isRange.value ? percentages.value[0] : 0);
    const endPercent = computed(() => isRange.value ? percentages.value[1] : percentages.value[0]);
    const ticks = computed(() => {
      if (props.type !== "discrete" || !props.showTicks && !props.showTickLabels || span.value <= 0)
        return [];
      const count = Math.floor(span.value / safeStep.value);
      const result = Array.from(
        { length: count + 1 },
        (_, index) => normalize(props.min + index * safeStep.value)
      );
      if (result.at(-1) !== props.max) result.push(props.max);
      return result.map((value) => {
        const configured = Array.isArray(props.tickLabels) ? props.tickLabels.find((item) => Number(item?.value) === value) : props.tickLabels?.[value];
        const detail = typeof configured === "string" ? { text: configured } : configured || {};
        const percent = (value - props.min) / span.value * 100;
        return {
          value,
          percent,
          endpoint: value === props.min || value === props.max,
          selected: percent >= startPercent.value && percent <= endPercent.value,
          unit: String(detail.unit ?? displayUnit.value).toUpperCase(),
          text: detail.text || ""
        };
      });
    });
    const railArea = ref(null);
    watchEffect(() => {
      railArea.value?.style.setProperty("--slider-start", `${startPercent.value}%`);
      railArea.value?.style.setProperty("--slider-end", `${endPercent.value}%`);
    });
    function setTickPosition(element, percent) {
      element?.style.setProperty("--tick-position", `${percent}%`);
    }
    function updateThumb(index, rawValue) {
      if (disabled.value) return;
      lastInteractedThumb.value = index === 0 ? "lower" : "upper";
      let value = normalize(rawValue);
      if (!isRange.value) {
        emit("update:modelValue", value);
        return;
      }
      const next = [...values.value];
      value = index === 0 ? Math.min(value, next[1]) : Math.max(value, next[0]);
      next[index] = value;
      emit("update:modelValue", next);
    }
    function nativeInput(index, event) {
      updateThumb(index, event.target.value);
      nextTick(() => {
        event.target.value = String(values.value[index]);
      });
    }
    function beginInput(index) {
      editingInput.value[index] = true;
      inputDrafts.value[index] = String(values.value[index]);
    }
    function editInput(index, value) {
      inputDrafts.value[index] = value;
    }
    function commitInput(index, keepEditing = false, event) {
      if (event?.isComposing || event?.keyCode === 229) return;
      if (!editingInput.value[index]) return;
      if (keepEditing) event?.preventDefault();
      const draft = inputDrafts.value[index];
      editingInput.value[index] = keepEditing;
      if (draft.trim() && Number.isFinite(Number(draft))) updateThumb(index, draft);
      nextTick(() => {
        inputDrafts.value[index] = String(values.value[index]);
      });
    }
    function setActive(name) {
      if (!disabled.value) {
        activeThumb.value = name;
        lastInteractedThumb.value = name;
      }
    }
    function clearActive() {
      activeThumb.value = "";
    }
    function setFocused(name, event) {
      focusedThumb.value = event?.target?.matches(":focus-visible") ? name : "";
    }
    function clearFocused(name) {
      if (focusedThumb.value === name) focusedThumb.value = "";
    }
    function clearPointerTooltip(event) {
      if (!event.buttons) activeThumb.value = "";
    }
    function tooltipVisible(name) {
      return !disabled.value && props.showTooltip && (activeThumb.value === name || focusedThumb.value === name);
    }
    function tickLabelVisible(tick) {
      return props.showTickLabels && (props.tickLabelMode === "all" || tick.endpoint);
    }
    function chooseFromRail(event) {
      if (disabled.value || event.target.closest?.(".wb-slider__native")) return;
      const rail = event.currentTarget.querySelector(".wb-slider__rail");
      const rect = rail?.getBoundingClientRect();
      if (!rect?.width) return;
      const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const value = normalize(props.min + ratio * span.value);
      let index = 0;
      if (isRange.value) {
        const lowerDistance = Math.abs(value - values.value[0]);
        const upperDistance = Math.abs(value - values.value[1]);
        index = lowerDistance === upperDistance ? lastInteractedThumb.value === "upper" ? 1 : 0 : lowerDistance < upperDistance ? 0 : 1;
      }
      updateThumb(index, value);
      setActive(index === 0 ? "lower" : "upper");
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          class: _normalizeClass(["wb-slider", {
            "is-disabled": _unref(disabled),
            "is-discrete": __props.type === "discrete",
            "is-range": isRange.value,
            "has-tick-labels": __props.type === "discrete" && __props.showTickLabels
          }]),
          onPointerleave: clearPointerTooltip
        },
        [
          _createElementVNode(
            "div",
            {
              ref_key: "railArea",
              ref: railArea,
              class: "wb-slider__rail-area",
              onClick: chooseFromRail
            },
            [
              _cache[20] || (_cache[20] = _createElementVNode(
                "div",
                {
                  class: "wb-slider__rail",
                  "aria-hidden": "true"
                },
                [
                  _createElementVNode("span", {
                    class: "wb-slider__unselected",
                    "data-part": "unselected-track"
                  }),
                  _createElementVNode("span", {
                    class: "wb-slider__selected",
                    "data-part": "selected-track"
                  })
                ],
                -1
                /* CACHED */
              )),
              __props.type === "discrete" && (__props.showTicks || __props.showTickLabels) ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(ticks.value, (tick) => {
                    return _openBlock(), _createElementBlock("span", {
                      key: tick.value,
                      ref_for: true,
                      ref: (element) => setTickPosition(element, tick.percent),
                      class: "wb-slider__tick-position"
                    }, [
                      __props.showTicks && !tick.endpoint ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 0,
                          class: _normalizeClass(["wb-slider__tick", { "is-selected": tick.selected }]),
                          "data-part": "tick"
                        },
                        null,
                        2
                        /* CLASS */
                      )) : _createCommentVNode("v-if", true),
                      tickLabelVisible(tick) ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
                        _createElementVNode("span", null, [
                          _createTextVNode(
                            _toDisplayString(tick.value),
                            1
                            /* TEXT */
                          ),
                          tick.unit ? (_openBlock(), _createElementBlock(
                            "span",
                            _hoisted_3,
                            _toDisplayString(tick.unit),
                            1
                            /* TEXT */
                          )) : _createCommentVNode("v-if", true)
                        ]),
                        tick.text ? (_openBlock(), _createElementBlock(
                          "small",
                          _hoisted_4,
                          _toDisplayString(tick.text),
                          1
                          /* TEXT */
                        )) : _createCommentVNode("v-if", true)
                      ])) : _createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : _createCommentVNode("v-if", true),
              _createElementVNode("input", _mergeProps({
                ref_key: "lower",
                ref: lower
              }, _unref(lowerFieldAttrs), {
                class: ["wb-slider__native wb-slider__native--lower", {
                  "is-current": activeThumb.value === "lower" || focusedThumb.value === "lower",
                  "is-active": activeThumb.value === "lower"
                }],
                "data-part": "thumb",
                type: "range",
                name: isRange.value && __props.name ? `${__props.name}-min` : __props.name,
                value: values.value[0],
                min: __props.min,
                max: __props.max,
                step: safeStep.value,
                disabled: _unref(disabled),
                "aria-label": isRange.value ? `${controlLabel.value}\u6700\u5C0F\u503C` : controlLabel.value,
                "aria-valuemax": isRange.value ? values.value[1] : __props.max,
                onInput: _cache[0] || (_cache[0] = ($event) => nativeInput(0, $event)),
                onPointerenter: _cache[1] || (_cache[1] = ($event) => setActive("lower")),
                onPointerleave: clearActive,
                onPointerdown: _cache[2] || (_cache[2] = ($event) => setActive("lower")),
                onPointerup: clearActive,
                onPointercancel: clearActive,
                onFocus: _cache[3] || (_cache[3] = ($event) => setFocused("lower", $event)),
                onBlur: _cache[4] || (_cache[4] = ($event) => clearFocused("lower"))
              }), null, 16, _hoisted_5),
              tooltipVisible("lower") ? (_openBlock(), _createElementBlock("span", _hoisted_6, [
                _createElementVNode(
                  "span",
                  null,
                  _toDisplayString(values.value[0]) + _toDisplayString(displayUnit.value),
                  1
                  /* TEXT */
                ),
                _cache[18] || (_cache[18] = _createElementVNode(
                  "svg",
                  { viewBox: "0 0 12 8" },
                  [
                    _createElementVNode("path", { d: "M0 0h12L7.6 5.9C6.8 7 5.2 7 4.4 5.9L0 0Z" })
                  ],
                  -1
                  /* CACHED */
                ))
              ])) : _createCommentVNode("v-if", true),
              isRange.value ? (_openBlock(), _createElementBlock(
                _Fragment,
                { key: 2 },
                [
                  _createElementVNode("input", _mergeProps({
                    ref_key: "upper",
                    ref: upper
                  }, _unref(upperFieldAttrs), {
                    class: ["wb-slider__native wb-slider__native--upper", {
                      "is-current": activeThumb.value === "upper" || focusedThumb.value === "upper",
                      "is-active": activeThumb.value === "upper"
                    }],
                    "data-part": "thumb",
                    type: "range",
                    name: __props.name ? `${__props.name}-max` : void 0,
                    value: values.value[1],
                    min: __props.min,
                    max: __props.max,
                    step: safeStep.value,
                    disabled: _unref(disabled),
                    "aria-label": `${controlLabel.value}\u6700\u5927\u503C`,
                    "aria-valuemin": values.value[0],
                    onInput: _cache[5] || (_cache[5] = ($event) => nativeInput(1, $event)),
                    onPointerenter: _cache[6] || (_cache[6] = ($event) => setActive("upper")),
                    onPointerleave: clearActive,
                    onPointerdown: _cache[7] || (_cache[7] = ($event) => setActive("upper")),
                    onPointerup: clearActive,
                    onPointercancel: clearActive,
                    onFocus: _cache[8] || (_cache[8] = ($event) => setFocused("upper", $event)),
                    onBlur: _cache[9] || (_cache[9] = ($event) => clearFocused("upper"))
                  }), null, 16, _hoisted_7),
                  tooltipVisible("upper") ? (_openBlock(), _createElementBlock("span", _hoisted_8, [
                    _createElementVNode(
                      "span",
                      null,
                      _toDisplayString(values.value[1]) + _toDisplayString(displayUnit.value),
                      1
                      /* TEXT */
                    ),
                    _cache[19] || (_cache[19] = _createElementVNode(
                      "svg",
                      { viewBox: "0 0 12 8" },
                      [
                        _createElementVNode("path", { d: "M0 0h12L7.6 5.9C6.8 7 5.2 7 4.4 5.9L0 0Z" })
                      ],
                      -1
                      /* CACHED */
                    ))
                  ])) : _createCommentVNode("v-if", true)
                ],
                64
                /* STABLE_FRAGMENT */
              )) : _createCommentVNode("v-if", true)
            ],
            512
            /* NEED_PATCH */
          ),
          __props.showInput || __props.showValue || __props.unit ? (_openBlock(), _createElementBlock("div", _hoisted_9, [
            __props.showInput ? (_openBlock(), _createElementBlock("div", _hoisted_10, [
              _createVNode(WorkbenchInput, {
                class: _normalizeClass(["wb-slider__input", { "is-wide": __props.wideInput }]),
                "data-part": "input",
                "model-value": inputDrafts.value[0],
                disabled: _unref(disabled),
                "aria-label": isRange.value ? `${controlLabel.value}\u6700\u5C0F\u503C\u8F93\u5165` : `${controlLabel.value}\u8F93\u5165`,
                onFocusin: _cache[10] || (_cache[10] = ($event) => beginInput(0)),
                "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => editInput(0, $event)),
                onKeydown: _cache[12] || (_cache[12] = _withKeys(($event) => commitInput(0, true, $event), ["enter"])),
                onFocusout: _cache[13] || (_cache[13] = ($event) => commitInput(0))
              }, null, 8, ["class", "model-value", "disabled", "aria-label"]),
              isRange.value ? (_openBlock(), _createElementBlock("span", _hoisted_11, "\u81F3")) : _createCommentVNode("v-if", true),
              isRange.value ? (_openBlock(), _createBlock(WorkbenchInput, {
                key: 1,
                class: _normalizeClass(["wb-slider__input", { "is-wide": __props.wideInput }]),
                "data-part": "input",
                "model-value": inputDrafts.value[1],
                disabled: _unref(disabled),
                "aria-label": `${controlLabel.value}\u6700\u5927\u503C\u8F93\u5165`,
                onFocusin: _cache[14] || (_cache[14] = ($event) => beginInput(1)),
                "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => editInput(1, $event)),
                onKeydown: _cache[16] || (_cache[16] = _withKeys(($event) => commitInput(1, true, $event), ["enter"])),
                onFocusout: _cache[17] || (_cache[17] = ($event) => commitInput(1))
              }, null, 8, ["class", "model-value", "disabled", "aria-label"])) : _createCommentVNode("v-if", true)
            ])) : __props.showValue ? (_openBlock(), _createElementBlock(
              "output",
              _hoisted_12,
              _toDisplayString(isRange.value ? values.value.join(" \u2013 ") : values.value[0]),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            __props.unit ? (_openBlock(), _createElementBlock(
              "span",
              _hoisted_13,
              _toDisplayString(displayUnit.value),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true)
          ])) : _createCommentVNode("v-if", true)
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-e5739c65" });
