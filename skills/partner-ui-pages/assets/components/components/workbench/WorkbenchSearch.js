import { unref as _unref, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createVNode as _createVNode, withCtx as _withCtx, withKeys as _withKeys, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, createElementBlock as _createElementBlock, Fragment as _Fragment } from "vue";
const _hoisted_1 = ["data-grid-span"];
const _hoisted_2 = ["value", "placeholder", "disabled"];
const _hoisted_3 = {
  key: 1,
  class: "wb-search__actions"
};
const _hoisted_4 = ["disabled"];
const _hoisted_5 = {
  key: 0,
  class: "wb-search__actions-separator",
  "aria-hidden": "true"
};
const _hoisted_6 = ["disabled"];
import { useFormDisabled } from "../form/useFormDisabled.js";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, ref } from "vue";
import SearchFilter from "./SearchFilter.vue";
import ComprehensiveSearch from "./ComprehensiveSearch.vue";
const __sfc_main__ = {
  __name: "WorkbenchSearch",
  props: {
    conditions: { type: Array, default: () => [] },
    fields: { type: Array, default: () => [] },
    wrapConditions: Boolean,
    helpText: String,
    modelValue: { type: String, default: "" },
    searchIconPosition: { type: String, default: "left", validator: (value) => ["left", "right"].includes(value) },
    variant: { type: String, default: "outlined", validator: (value) => ["outlined", "filled"].includes(value) },
    appearance: { type: String, default: "standard", validator: (value) => ["standard", "global"].includes(value) },
    type: { type: String, default: "basic" },
    placeholder: { type: String, default: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9" },
    disabled: Boolean,
    prefixDisabled: Boolean,
    suffixDisabled: Boolean,
    showPrefixIcon: { type: Boolean, default: true },
    showSuffixIcon: { type: Boolean, default: true },
    previewState: { type: String, default: "default" },
    filterValue: { type: String, default: "" },
    filterOptions: { type: Array, default: () => [] },
    prefixValue: { type: String, default: "" },
    suffixValue: { type: String, default: "" },
    prefixOptions: { type: Array, default: () => [] },
    suffixOptions: { type: Array, default: () => [] },
    showPanel: Boolean
  },
  emits: ["update:modelValue", "update:filterValue", "update:prefixValue", "update:suffixValue", "search", "clear", "filter-change", "update:conditions", "condition-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const input = ref(null);
    const composing = ref(false);
    const both = computed(() => props.type === "filter-both");
    const isDisabled = computed(() => disabled.value || props.previewState === "disabled");
    let lastLiveValue;
    function searchLive(value) {
      if (props.searchIconPosition !== "left" || isDisabled.value || composing.value || value === lastLiveValue) return;
      lastLiveValue = value;
      emit("search", value);
    }
    function updateValue(event) {
      if (isDisabled.value) return;
      emit("update:modelValue", event.target.value);
      if (!event.isComposing) searchLive(event.target.value);
    }
    function endComposition(event) {
      composing.value = false;
      searchLive(event.target.value);
    }
    function submitSearch(event) {
      if (!isDisabled.value && !composing.value && !event.isComposing && event.keyCode !== 229) {
        event.preventDefault();
        emit("search", props.modelValue);
      }
    }
    function clear() {
      if (isDisabled.value) return;
      emit("update:modelValue", "");
      emit("clear");
      searchLive("");
      nextTick(() => input.value?.focus());
    }
    return (_ctx, _cache) => {
      return __props.type === "comprehensive" ? (_openBlock(), _createBlock(ComprehensiveSearch, {
        key: 0,
        "model-value": __props.modelValue,
        conditions: __props.conditions,
        fields: __props.fields,
        "wrap-conditions": __props.wrapConditions,
        "help-text": __props.helpText,
        disabled: _unref(disabled),
        "preview-state": __props.previewState,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", $event)),
        "onUpdate:conditions": _cache[1] || (_cache[1] = ($event) => emit("update:conditions", $event)),
        onSearch: _cache[2] || (_cache[2] = ($event) => emit("search", $event)),
        onClear: _cache[3] || (_cache[3] = ($event) => emit("clear")),
        onConditionChange: _cache[4] || (_cache[4] = ($event) => emit("condition-change", $event))
      }, null, 8, ["model-value", "conditions", "fields", "wrap-conditions", "help-text", "disabled", "preview-state"])) : (_openBlock(), _createElementBlock("div", {
        key: 1,
        class: _normalizeClass(["wb-search", [`wb-search--${__props.type}`, `is-${__props.previewState}`, { "is-disabled": isDisabled.value, "wb-search--global": __props.appearance === "global", "wb-search--filled": __props.variant === "filled", "is-populated": Boolean(__props.modelValue) }]]),
        "data-grid-span": both.value ? 6 : 4
      }, [
        __props.type === "filter-prefix" || both.value ? (_openBlock(), _createBlock(SearchFilter, {
          key: 0,
          side: "prefix",
          "show-icon": __props.showPrefixIcon,
          "filter-value": both.value ? __props.prefixValue : __props.filterValue,
          "filter-options": both.value ? __props.prefixOptions : __props.filterOptions,
          disabled: isDisabled.value || __props.prefixDisabled,
          "preview-state": __props.previewState,
          "show-panel": __props.showPanel,
          "onUpdate:filterValue": _cache[5] || (_cache[5] = ($event) => emit(both.value ? "update:prefixValue" : "update:filterValue", $event)),
          onFilterChange: _cache[6] || (_cache[6] = ($event) => emit("filter-change", $event))
        }, {
          "filter-icon": _withCtx(() => [
            _renderSlot(_ctx.$slots, "prefix-icon", {}, () => [
              _renderSlot(_ctx.$slots, "filter-icon", {}, () => [
                _createVNode(WorkbenchIcon, { name: "\u6587\u4EF6\u5939_14px" })
              ])
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["show-icon", "filter-value", "filter-options", "disabled", "preview-state", "show-panel"])) : _createCommentVNode("v-if", true),
        _createElementVNode(
          "div",
          {
            class: _normalizeClass(["wb-search__core", `wb-search__core--icon-${__props.searchIconPosition}`])
          },
          [
            __props.searchIconPosition === "left" ? (_openBlock(), _createBlock(WorkbenchIcon, {
              key: 0,
              class: "wb-search__search-icon wb-search__search-icon--left",
              name: __props.appearance === "global" ? "WB-TOP-NAV/action/search_20px" : "\u641C\u7D22_14px"
            }, null, 8, ["name"])) : _createCommentVNode("v-if", true),
            _createElementVNode("input", {
              ref_key: "input",
              ref: input,
              class: "wb-search__input",
              type: "search",
              value: __props.modelValue,
              placeholder: __props.placeholder,
              disabled: isDisabled.value,
              onInput: updateValue,
              onCompositionstart: _cache[7] || (_cache[7] = ($event) => composing.value = true),
              onCompositionend: endComposition,
              onKeydown: _withKeys(submitSearch, ["enter"])
            }, null, 40, _hoisted_2),
            __props.modelValue || __props.searchIconPosition === "right" ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
              __props.modelValue ? (_openBlock(), _createElementBlock("button", {
                key: 0,
                class: _normalizeClass(["wb-search__clear", { "wb-search__clear--left": __props.searchIconPosition === "left" }]),
                type: "button",
                disabled: isDisabled.value,
                "aria-label": "\u6E05\u9664\u641C\u7D22\u5185\u5BB9",
                onClick: clear
              }, [
                _createVNode(WorkbenchIcon, {
                  name: __props.appearance === "global" ? "/ic_public_close_line_16px" : "/ic_public_close_line_14px"
                }, null, 8, ["name"])
              ], 10, _hoisted_4)) : _createCommentVNode("v-if", true),
              __props.searchIconPosition === "right" ? (_openBlock(), _createElementBlock(
                _Fragment,
                { key: 1 },
                [
                  __props.modelValue ? (_openBlock(), _createElementBlock("span", _hoisted_5)) : _createCommentVNode("v-if", true),
                  _createElementVNode("button", {
                    class: "wb-search__submit",
                    type: "button",
                    "aria-label": "\u6267\u884C\u641C\u7D22",
                    disabled: isDisabled.value,
                    onClick: submitSearch
                  }, [
                    _createVNode(WorkbenchIcon, {
                      class: "wb-search__search-icon",
                      name: __props.appearance === "global" ? "WB-TOP-NAV/action/search_20px" : "\u641C\u7D22_14px"
                    }, null, 8, ["name"])
                  ], 8, _hoisted_6)
                ],
                64
                /* STABLE_FRAGMENT */
              )) : _createCommentVNode("v-if", true)
            ])) : _createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        ),
        __props.type === "filter-suffix" || both.value ? (_openBlock(), _createBlock(SearchFilter, {
          key: 1,
          side: "suffix",
          "show-icon": __props.showSuffixIcon,
          "filter-value": both.value ? __props.suffixValue : __props.filterValue,
          "filter-options": both.value ? __props.suffixOptions : __props.filterOptions,
          disabled: isDisabled.value || __props.suffixDisabled,
          "preview-state": __props.previewState,
          "show-panel": __props.showPanel,
          "onUpdate:filterValue": _cache[8] || (_cache[8] = ($event) => emit(both.value ? "update:suffixValue" : "update:filterValue", $event)),
          onFilterChange: _cache[9] || (_cache[9] = ($event) => emit("filter-change", $event))
        }, {
          "filter-icon": _withCtx(() => [
            _renderSlot(_ctx.$slots, "suffix-icon", {}, () => [
              _renderSlot(_ctx.$slots, "filter-icon", {}, () => [
                _createVNode(WorkbenchIcon, { name: "\u6587\u4EF6\u5939_14px" })
              ])
            ])
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["show-icon", "filter-value", "filter-options", "disabled", "preview-state", "show-panel"])) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1));
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
