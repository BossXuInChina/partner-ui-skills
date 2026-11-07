import { createVNode as _createVNode, createElementVNode as _createElementVNode, unref as _unref, mergeProps as _mergeProps, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["disabled"];
const _hoisted_3 = ["name", "value", "disabled", "aria-label", "aria-valuenow", "aria-valuemin", "aria-valuemax"];
const _hoisted_4 = ["disabled"];
import { useFieldControl } from "../form/fieldContext.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, ref, watch } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
const __sfc_main__ = {
  __name: "WorkbenchNumberCount",
  props: { modelValue: { type: Number, default: 0 }, step: { type: Number, default: 1 }, min: { type: Number, default: void 0 }, max: { type: Number, default: void 0 }, disabled: Boolean, name: String, ariaLabel: { type: String, default: "\u6570\u91CF" } },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const native = ref(null);
    const emit = __emit;
    const hasMin = computed(() => Number.isFinite(props.min)), hasMax = computed(() => Number.isFinite(props.max));
    const safeStep = computed(() => Number.isFinite(props.step) && props.step > 0 ? props.step : 1);
    const places = (value) => String(value).split(".")[1]?.length ?? 0;
    const precision = computed(() => Math.max(places(safeStep.value), places(props.modelValue), hasMin.value ? places(props.min) : 0, hasMax.value ? places(props.max) : 0));
    const clamp = (value) => Math.min(hasMax.value ? props.max : Infinity, Math.max(hasMin.value ? props.min : -Infinity, value));
    const current = computed(() => clamp(Number.isFinite(props.modelValue) ? props.modelValue : 0));
    const format = (value) => Number(value.toFixed(precision.value)).toString();
    const draft = ref(format(current.value));
    watch(current, (value) => {
      draft.value = format(value);
    });
    const disabled = computed(() => props.disabled);
    const canDecrement = computed(() => !disabled.value && (!hasMin.value || current.value > props.min));
    const canIncrement = computed(() => !disabled.value && (!hasMax.value || current.value < props.max));
    function update(value, source) {
      const next = Number(clamp(Number(value)).toFixed(precision.value));
      if (next === current.value) {
        draft.value = format(current.value);
        return;
      }
      emit("update:modelValue", next);
      emit("change", { value: next, source });
      nextTick(() => {
        draft.value = format(current.value);
      });
    }
    function commit() {
      if (disabled.value) return;
      const value = Number(draft.value);
      if (!draft.value.trim() || !Number.isFinite(value)) {
        draft.value = format(current.value);
        return;
      }
      update(value, "input");
    }
    function handleKeydown(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        commit();
        return;
      }
      if (event.key === "ArrowDown" && canDecrement.value) {
        event.preventDefault();
        update(current.value - safeStep.value, "decrement");
      }
      if (event.key === "ArrowUp" && canIncrement.value) {
        event.preventDefault();
        update(current.value + safeStep.value, "increment");
      }
    }
    const { attrs: fieldAttrs } = useFieldControl(() => props.modelValue, { nativeRequired: true, focus: () => native.value?.focus() });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", {
        class: _normalizeClass(["wb-counter-input", { "is-disabled": disabled.value }]),
        role: "group",
        "aria-label": __props.ariaLabel
      }, [
        _createElementVNode("button", {
          class: "wb-counter-input__action",
          type: "button",
          disabled: !canDecrement.value,
          "aria-label": "\u51CF\u5C11",
          onClick: _cache[0] || (_cache[0] = ($event) => canDecrement.value && update(current.value - safeStep.value, "decrement"))
        }, [
          _createVNode(WorkbenchIcon, { name: "/ic_public_minus_line_14px" })
        ], 8, _hoisted_2),
        _cache[3] || (_cache[3] = _createElementVNode(
          "span",
          {
            class: "wb-counter-input__divider wb-counter-input__divider--start",
            "aria-hidden": "true"
          },
          null,
          -1
          /* CACHED */
        )),
        _createElementVNode("input", _mergeProps({
          ref_key: "native",
          ref: native
        }, _unref(fieldAttrs), {
          class: "wb-counter-input__value",
          type: "text",
          role: "spinbutton",
          name: __props.name,
          value: draft.value,
          disabled: disabled.value,
          inputmode: "decimal",
          autocomplete: "off",
          "aria-label": `${__props.ariaLabel}\u6570\u503C`,
          "aria-valuenow": current.value,
          "aria-valuemin": hasMin.value ? __props.min : void 0,
          "aria-valuemax": hasMax.value ? __props.max : void 0,
          onInput: _cache[1] || (_cache[1] = ($event) => draft.value = $event.target.value),
          onKeydown: handleKeydown,
          onBlur: commit
        }), null, 16, _hoisted_3),
        _cache[4] || (_cache[4] = _createElementVNode(
          "span",
          {
            class: "wb-counter-input__divider wb-counter-input__divider--end",
            "aria-hidden": "true"
          },
          null,
          -1
          /* CACHED */
        )),
        _createElementVNode("button", {
          class: "wb-counter-input__action",
          type: "button",
          disabled: !canIncrement.value,
          "aria-label": "\u589E\u52A0",
          onClick: _cache[2] || (_cache[2] = ($event) => canIncrement.value && update(current.value + safeStep.value, "increment"))
        }, [
          _createVNode(WorkbenchIcon, { name: "/ic_public_plus_line_14px" })
        ], 8, _hoisted_4)
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-2989040f" });
