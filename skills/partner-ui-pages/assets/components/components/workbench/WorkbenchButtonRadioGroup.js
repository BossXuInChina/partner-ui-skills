import { unref as _unref, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, mergeProps as _mergeProps } from "vue";
const _hoisted_1 = ["aria-disabled", "aria-label"];
const _hoisted_2 = ["aria-checked", "tabindex", "disabled", "onClick", "onKeydown"];
import { useFormDisabled } from "../form/useFormDisabled.js";
import { useFieldControl } from "../form/fieldContext.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchButtonRadioGroup",
  props: {
    modelValue: { type: [String, Number], required: true },
    items: { type: Array, required: true },
    size: { type: String, default: "small", validator: (value) => ["small", "large"].includes(value) },
    ariaLabel: { type: String, default: "\u5355\u9009\u7EC4" },
    fill: Boolean
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled();
    const emit = __emit;
    const rootElement = ref(null);
    const itemElements = ref([]);
    const highlightElement = ref(null);
    const selectedIndex = computed(() => props.items.findIndex((item) => item.value === props.modelValue));
    const enabledIndexes = computed(() => props.items.map((item, index) => disabled.value || item.disabled ? -1 : index).filter((index) => index >= 0));
    const focusIndex = computed(() => !disabled.value && selectedIndex.value >= 0 && !props.items[selectedIndex.value]?.disabled ? selectedIndex.value : enabledIndexes.value[0] ?? -1);
    let resizeObserver;
    function updateHighlight() {
      const selected = itemElements.value[selectedIndex.value];
      if (!selected || !highlightElement.value) {
        if (highlightElement.value) highlightElement.value.style.opacity = "0";
        return;
      }
      highlightElement.value.style.width = `${selected.offsetWidth}px`;
      highlightElement.value.style.transform = `translateX(${selected.offsetLeft}px)`;
      highlightElement.value.style.opacity = "1";
    }
    function select(item, index, focus = false) {
      if (disabled.value || !item || item.disabled) return;
      if (item.value !== props.modelValue) {
        emit("update:modelValue", item.value);
        emit("change", item);
      }
      if (focus) nextTick(() => itemElements.value[index]?.focus());
    }
    function onKeydown(event, index) {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
      const enabled = enabledIndexes.value;
      if (!enabled.length) return;
      event.preventDefault();
      const position = enabled.indexOf(index);
      let target;
      if (event.key === "Home") target = enabled[0];
      else if (event.key === "End") target = enabled.at(-1);
      else if (event.key === "ArrowRight" || event.key === "ArrowDown") target = enabled[(Math.max(position, -1) + 1) % enabled.length];
      else target = enabled[(position <= 0 ? enabled.length : position) - 1];
      select(props.items[target], target, true);
    }
    watch(() => [props.modelValue, props.size, props.items], () => nextTick(updateHighlight), { deep: true });
    onMounted(() => {
      nextTick(updateHighlight);
      resizeObserver = new ResizeObserver(updateHighlight);
      if (rootElement.value) resizeObserver.observe(rootElement.value);
    });
    onBeforeUnmount(() => resizeObserver?.disconnect());
    const { attrs: fieldAttrs } = useFieldControl(() => props.modelValue, { labelable: false, focus: () => itemElements.value?.find((el) => el?.tabIndex === 0)?.focus() });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _mergeProps({
        ref_key: "rootElement",
        ref: rootElement,
        class: ["wb-button-radio-group", [`wb-button-radio-group--${__props.size}`, { "is-fill": __props.fill }]],
        role: "radiogroup",
        "aria-disabled": _unref(disabled) || void 0
      }, _unref(fieldAttrs), { "aria-label": __props.ariaLabel }), [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(__props.items, (item, index) => {
            return _openBlock(), _createElementBlock("button", {
              key: item.value,
              ref_for: true,
              ref: (element) => {
                itemElements.value[index] = element;
              },
              class: _normalizeClass(["wb-button-radio-group__item", { "is-selected": item.value === __props.modelValue }]),
              type: "button",
              role: "radio",
              "aria-checked": item.value === __props.modelValue,
              tabindex: index === focusIndex.value ? 0 : -1,
              disabled: _unref(disabled) || item.disabled,
              onClick: ($event) => select(item, index),
              onKeydown: ($event) => onKeydown($event, index)
            }, [
              _renderSlot(_ctx.$slots, "item", {
                item,
                selected: item.value === __props.modelValue
              }, () => [
                _createTextVNode(
                  _toDisplayString(item.label),
                  1
                  /* TEXT */
                )
              ])
            ], 42, _hoisted_2);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        _createElementVNode(
          "span",
          {
            ref_key: "highlightElement",
            ref: highlightElement,
            class: "wb-button-radio-group__highlight",
            "aria-hidden": "true"
          },
          null,
          512
          /* NEED_PATCH */
        )
      ], 16, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-eaec6d5b" });
