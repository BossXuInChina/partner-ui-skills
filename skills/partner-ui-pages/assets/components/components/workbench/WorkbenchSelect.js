import { normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, mergeProps as _mergeProps, withCtx as _withCtx, renderList as _renderList, createSlots as _createSlots, openBlock as _openBlock, createBlock as _createBlock } from "vue";
import { computed, getCurrentInstance, useAttrs } from "vue";
import WorkbenchSelectCore from "./WorkbenchSelectCore.vue";
const __sfc_main__ = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "WorkbenchSelect",
  props: {
    modelValue: { type: Array, default: () => [] },
    multiple: Boolean,
    label: String,
    required: Boolean,
    state: { type: String, default: "default" },
    showPanel: Boolean,
    options: { type: Array, required: true },
    teleportPanel: Boolean,
    panelClass: { type: String, default: "" },
    placeholder: { type: String, default: "\u8BF7\u9009\u62E9" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const attrs = useAttrs();
    const instance = getCurrentInstance();
    function portalOptions() {
      const supplied = instance.vnode.props || {};
      return Object.hasOwn(supplied, "teleportPanel") || Object.hasOwn(supplied, "teleport-panel") ? { teleportPanel: props.teleportPanel } : {};
    }
    const approvedOptions = computed(
      () => props.options.map((option) => ({
        value: option.value,
        label: option.label,
        disabled: option.disabled
      }))
    );
    const blockedExtensionAttrs = /* @__PURE__ */ new Set([
      "searchable",
      "clearable",
      "defaultValue",
      "default-value",
      "searchPlaceholder",
      "search-placeholder",
      "onClear"
    ]);
    function forwardedAttrs() {
      return Object.fromEntries(
        Object.entries(attrs).filter(([key]) => !blockedExtensionAttrs.has(key))
      );
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(WorkbenchSelectCore, _mergeProps({ ...forwardedAttrs(), ...portalOptions() }, {
        "model-value": __props.modelValue,
        multiple: __props.multiple,
        label: __props.label,
        required: __props.required,
        state: __props.state,
        "show-panel": __props.showPanel,
        options: approvedOptions.value,
        "panel-class": __props.panelClass,
        placeholder: __props.placeholder,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", $event))
      }), _createSlots({
        _: 2
        /* DYNAMIC */
      }, [
        _renderList(_ctx.$slots, (_, slotName) => {
          return {
            name: slotName,
            fn: _withCtx((slotProps) => [
              _renderSlot(_ctx.$slots, slotName, _normalizeProps(_guardReactiveProps(slotProps || {})))
            ])
          };
        })
      ]), 1040, ["model-value", "multiple", "label", "required", "state", "show-panel", "options", "panel-class", "placeholder"]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
