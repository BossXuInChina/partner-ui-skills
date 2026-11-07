import { defineComponent as _defineComponent } from "vue";
import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, unref as _unref, createVNode as _createVNode } from "vue";
const _hoisted_1 = ["aria-label", "aria-describedby"];
const _hoisted_2 = { class: "business-navigation-card__content" };
const _hoisted_3 = { class: "business-navigation-card__title" };
import { useId } from "vue";
import { AiIcon } from "../ui/foundation/aiIcons";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "BusinessNavigationCard",
  props: {
    title: {},
    description: {},
    target: {}
  },
  emits: ["navigate"],
  setup(__props) {
    const descriptionId = `business-navigation-${useId()}`;
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("button", {
        type: "button",
        class: "business-navigation-card",
        "aria-label": __props.title,
        "aria-describedby": __props.description ? descriptionId : void 0,
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("navigate", __props.target))
      }, [
        _createElementVNode("span", _hoisted_2, [
          _createElementVNode(
            "span",
            _hoisted_3,
            _toDisplayString(__props.title),
            1
            /* TEXT */
          ),
          __props.description ? (_openBlock(), _createElementBlock(
            "span",
            {
              key: 0,
              id: descriptionId,
              class: "business-navigation-card__description"
            },
            _toDisplayString(__props.description),
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true)
        ]),
        _createVNode(_unref(AiIcon), {
          name: "business.navigate",
          class: "business-navigation-card__arrow",
          "aria-hidden": "true",
          focusable: "false"
        })
      ], 8, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-1dec71f5" });
