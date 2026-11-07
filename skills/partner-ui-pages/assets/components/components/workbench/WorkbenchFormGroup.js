import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "wb-form-group__content" };
const __sfc_main__ = {
  __name: "WorkbenchFormGroup",
  props: { label: { type: String, default: "" }, nested: Boolean },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "fieldset",
        {
          class: _normalizeClass(["wb-form-group", { "is-nested": __props.nested }])
        },
        [
          __props.label ? (_openBlock(), _createElementBlock(
            "legend",
            _hoisted_1,
            _toDisplayString(__props.label),
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true),
          _createElementVNode("div", _hoisted_2, [
            _renderSlot(_ctx.$slots, "default")
          ])
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-87e5c2f9" });
