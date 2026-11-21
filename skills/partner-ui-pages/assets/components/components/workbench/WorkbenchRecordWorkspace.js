import { renderSlot as _renderSlot, createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = { class: "record-workspace" };
const _hoisted_2 = { class: "record-toolbar__left" };
const _hoisted_3 = { class: "record-toolbar__selection" };
const _hoisted_4 = {
  key: 0,
  class: "record-toolbar__actions"
};
import WorkbenchCheckbox from "../choice/WorkbenchCheckbox.vue";
const __sfc_main__ = {
  __name: "WorkbenchRecordWorkspace",
  props: {
    toolbarClass: { type: String, default: "" },
    selectedCount: { type: Number, default: 0 },
    selectableCount: { type: Number, default: 0 },
    checked: Boolean,
    indeterminate: Boolean
  },
  emits: ["toggle-all"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", _hoisted_1, [
        _createElementVNode(
          "div",
          {
            class: _normalizeClass(["record-toolbar", __props.toolbarClass])
          },
          [
            _createElementVNode("div", _hoisted_2, [
              _renderSlot(_ctx.$slots, "filters"),
              _createElementVNode("div", _hoisted_3, [
                _createVNode(WorkbenchCheckbox, {
                  "model-value": __props.checked,
                  indeterminate: __props.indeterminate,
                  disabled: !__props.selectableCount,
                  label: "\u5168\u9009",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("toggle-all", $event))
                }, null, 8, ["model-value", "indeterminate", "disabled"]),
                _createElementVNode(
                  "span",
                  null,
                  "\u5DF2\u9009\u62E9 " + _toDisplayString(__props.selectedCount) + " \u9879",
                  1
                  /* TEXT */
                )
              ])
            ]),
            _ctx.$slots.actions ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
              _renderSlot(_ctx.$slots, "actions")
            ])) : _createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        ),
        _renderSlot(_ctx.$slots, "default"),
        _renderSlot(_ctx.$slots, "footer")
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-b84ae500" });
