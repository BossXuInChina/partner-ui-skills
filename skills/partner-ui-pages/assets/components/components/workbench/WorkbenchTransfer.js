import { unref as _unref, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, mergeProps as _mergeProps, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, createSlots as _createSlots, createVNode as _createVNode, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["aria-label", "aria-disabled"];
const _hoisted_2 = {
  key: 0,
  class: "wb-transfer__actions"
};
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = {
  class: "wb-transfer__announcement",
  "aria-live": "polite",
  "aria-atomic": "true"
};
import { useFormDisabled } from "../form/useFormDisabled.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, ref } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import TransferPanel from "./TransferPanel.vue";
import { indexItems, flattenItems, partitionItems, enabledLeaves } from "./transferModel.js";
const __sfc_main__ = {
  __name: "WorkbenchTransfer",
  props: {
    items: { type: Array, default: () => [] },
    modelValue: { type: Array, default: void 0 },
    defaultValue: { type: Array, default: () => [] },
    checkedKeys: { type: Object, default: void 0 },
    defaultCheckedKeys: { type: Object, default: () => ({ source: [], target: [] }) },
    mode: {
      type: String,
      default: "manual",
      validator: (value) => ["manual", "auto"].includes(value)
    },
    titles: { type: Array, default: () => ["\u53EF\u9009", "\u5DF2\u9009"] },
    searchable: Boolean,
    pagination: { type: Boolean, default: true },
    pageSize: { type: Number, default: 6 },
    defaultExpandedKeys: { type: Array, default: () => [] },
    disabled: Boolean,
    label: { type: String, default: "\u7A7F\u68AD\u6846" }
  },
  emits: [
    "update:modelValue",
    "update:checkedKeys",
    "change",
    "check",
    "search",
    "page-change"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const localValue = ref([...props.defaultValue]);
    const localChecks = ref({
      source: [...props.defaultCheckedKeys.source ?? []],
      target: [...props.defaultCheckedKeys.target ?? []]
    });
    const tree = computed(() => indexItems(props.items));
    const all = computed(() => flattenItems(tree.value));
    const values = computed(() => props.modelValue ?? localValue.value);
    const target = computed(() => {
      const keys = new Set(values.value);
      for (const item of all.value)
        if (keys.has(item.key)) item.leafKeys.forEach((key) => keys.add(key));
      return keys;
    });
    const panels = computed(
      () => Object.fromEntries(
        ["source", "target"].map((side) => [side, partitionItems(tree.value, target.value, side)])
      )
    );
    const checks = computed(() => props.checkedKeys ?? localChecks.value);
    function selected(side) {
      const keys = new Set(checks.value[side] ?? []);
      for (const item of all.value)
        if (keys.has(item.key)) item.leafKeys.forEach((key) => keys.add(key));
      return enabledLeaves(panels.value[side]).filter((item) => keys.has(item.key)).map((item) => item.key);
    }
    function check(side, keys) {
      const next = {
        source: [...checks.value.source ?? []],
        target: [...checks.value.target ?? []],
        [side]: keys
      };
      localChecks.value = next;
      emit("update:checkedKeys", next);
      emit("check", side, keys);
    }
    const announcement = ref("");
    function move(side, requested = selected(side)) {
      if (disabled.value) return;
      const eligible = new Set(enabledLeaves(panels.value[side]).map((item) => item.key));
      const moved = [...new Set(requested)].filter((key) => eligible.has(key));
      if (!moved.length) return;
      const next = new Set(target.value);
      moved.forEach((key) => side === "source" ? next.add(key) : next.delete(key));
      const known = new Set(all.value.map((item) => item.key));
      const result = all.value.filter((item) => !item.children.length && next.has(item.key)).map((item) => item.key);
      result.push(...values.value.filter((key) => !known.has(key)));
      localValue.value = result;
      emit("update:modelValue", result);
      emit("change", result, side === "source" ? "right" : "left", moved);
      check(
        side,
        (checks.value[side] ?? []).filter((key) => !moved.includes(key))
      );
      announcement.value = `${side === "source" ? "\u5DF2\u6DFB\u52A0" : "\u5DF2\u79FB\u56DE"} ${moved.length} \u9879`;
    }
    __expose({ move });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", {
        class: _normalizeClass(["wb-transfer", { "is-auto": __props.mode === "auto" }]),
        role: "group",
        "aria-label": __props.label,
        "aria-disabled": _unref(disabled)
      }, [
        (_openBlock(), _createElementBlock(
          _Fragment,
          null,
          _renderList(["source", "target"], (side, index) => {
            return _openBlock(), _createElementBlock(
              _Fragment,
              { key: side },
              [
                _createVNode(TransferPanel, {
                  items: panels.value[side],
                  title: __props.titles[index] ?? (index ? "\u5DF2\u9009" : "\u53EF\u9009"),
                  side,
                  mode: __props.mode,
                  "checked-keys": selected(side),
                  disabled: _unref(disabled),
                  searchable: __props.searchable,
                  pagination: __props.pagination && __props.mode === "manual",
                  "page-size": __props.pageSize,
                  "default-expanded-keys": __props.defaultExpandedKeys,
                  onCheck: ($event) => check(side, $event),
                  onMove: ($event) => move(side, $event),
                  onSearch: ($event) => emit("search", side, $event),
                  onPageChange: ($event) => emit("page-change", side, $event)
                }, _createSlots({
                  item: _withCtx((slotProps) => [
                    _renderSlot(_ctx.$slots, "item", _mergeProps({ ref_for: true }, slotProps), () => [
                      _createTextVNode(
                        _toDisplayString(slotProps.item.label),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, [
                  _ctx.$slots.empty ? {
                    name: "empty",
                    fn: _withCtx((slotProps) => [
                      _renderSlot(_ctx.$slots, "empty", _mergeProps({ ref_for: true }, slotProps))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1032, ["items", "title", "side", "mode", "checked-keys", "disabled", "searchable", "pagination", "page-size", "default-expanded-keys", "onCheck", "onMove", "onSearch", "onPageChange"]),
                index === 0 && __props.mode === "manual" ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
                  _createElementVNode("button", {
                    type: "button",
                    "aria-label": "\u6DFB\u52A0\u5230\u5DF2\u9009",
                    disabled: _unref(disabled) || !selected("source").length,
                    onClick: _cache[0] || (_cache[0] = ($event) => move("source"))
                  }, [
                    _createVNode(WorkbenchIcon, {
                      name: "/ic_arrow_right_line#2:141",
                      size: 10
                    })
                  ], 8, _hoisted_3),
                  _createElementVNode("button", {
                    type: "button",
                    "aria-label": "\u79FB\u56DE\u53EF\u9009",
                    disabled: _unref(disabled) || !selected("target").length,
                    onClick: _cache[1] || (_cache[1] = ($event) => move("target"))
                  }, [
                    _createVNode(WorkbenchIcon, {
                      name: "/ic_arrow_left_line#2:144",
                      size: 10
                    })
                  ], 8, _hoisted_4)
                ])) : _createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            );
          }),
          64
          /* STABLE_FRAGMENT */
        )),
        _createElementVNode(
          "span",
          _hoisted_5,
          _toDisplayString(announcement.value),
          1
          /* TEXT */
        )
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-a52b7be7" });
