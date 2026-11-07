import { defineComponent as _defineComponent } from "vue";
import { renderSlot as _renderSlot, unref as _unref, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["role"];
const _hoisted_2 = {
  key: 0,
  class: "ai-alert__icon",
  "aria-hidden": "true"
};
const _hoisted_3 = { class: "ai-alert__content" };
const _hoisted_4 = { class: "ai-alert__message" };
const _hoisted_5 = {
  key: 0,
  class: "ai-alert__description"
};
import { AiIcon } from "../foundation/aiIcons";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "AiAlert",
  props: {
    type: { default: "neutral" },
    message: {},
    description: { default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", {
        class: _normalizeClass(["ai-alert", `ai-alert--${__props.type}`]),
        role: __props.type === "error" ? "alert" : "status",
        "aria-atomic": "true"
      }, [
        _ctx.$slots.icon || __props.type === "error" ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
          _renderSlot(_ctx.$slots, "icon", {}, () => [
            _createVNode(_unref(AiIcon), { name: "alert.error" })
          ])
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_3, [
          _createElementVNode(
            "div",
            _hoisted_4,
            _toDisplayString(__props.message),
            1
            /* TEXT */
          ),
          __props.description ? (_openBlock(), _createElementBlock(
            "div",
            _hoisted_5,
            _toDisplayString(__props.description),
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true)
        ])
      ], 10, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-89c3b567" });
