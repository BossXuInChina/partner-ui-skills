import { defineComponent as _defineComponent } from "vue";
import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, unref as _unref, createVNode as _createVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, renderSlot as _renderSlot } from "vue";
const _hoisted_1 = {
  class: "ai-summary-card",
  "aria-label": "\u667A\u80FD\u7EFC\u5408\u56DE\u590D"
};
const _hoisted_2 = {
  class: "ai-summary-card__logo",
  "aria-hidden": "true"
};
const _hoisted_3 = ["src"];
const _hoisted_4 = {
  key: 3,
  class: "ai-summary-card__gradient-logo",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
  focusable: "false"
};
const _hoisted_5 = ["mask"];
const _hoisted_6 = { class: "ai-summary-card__body" };
const _hoisted_7 = { class: "ai-summary-card__text" };
const _hoisted_8 = {
  key: 0,
  class: "ai-summary-card__tags"
};
import { useId } from "vue";
import { AiIcon, useAiIconDefinition } from "../ui/foundation/aiIcons";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "AiSummaryCard",
  props: {
    text: {},
    logo: {}
  },
  setup(__props) {
    const smartIcon = useAiIconDefinition("smart.mark");
    const logoMaskId = `summary-logo-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", _hoisted_1, [
        _createElementVNode("span", _hoisted_2, [
          typeof __props.logo === "string" ? (_openBlock(), _createElementBlock("img", {
            key: 0,
            src: __props.logo,
            alt: ""
          }, null, 8, _hoisted_3)) : __props.logo ? (_openBlock(), _createBlock(_resolveDynamicComponent(__props.logo), { key: 1 })) : _unref(smartIcon).color !== "gradient" ? (_openBlock(), _createBlock(_unref(AiIcon), {
            key: 2,
            name: "smart.mark"
          })) : (_openBlock(), _createElementBlock("svg", _hoisted_4, [
            _createElementVNode("defs", null, [
              _createElementVNode("mask", {
                id: logoMaskId,
                x: "0",
                y: "0",
                width: "24",
                height: "24",
                maskUnits: "userSpaceOnUse",
                style: { "mask-type": "alpha" }
              }, [
                _createVNode(_unref(AiIcon), {
                  name: "smart.mark",
                  width: "24",
                  height: "24",
                  style: { "width": "24px", "height": "24px" }
                })
              ])
            ]),
            (_openBlock(), _createElementBlock("foreignObject", {
              x: "0",
              y: "0",
              width: "24",
              height: "24",
              mask: `url(#${logoMaskId})`
            }, [..._cache[0] || (_cache[0] = [
              _createElementVNode(
                "div",
                {
                  xmlns: "http://www.w3.org/1999/xhtml",
                  class: "ai-summary-card__logo-paint"
                },
                null,
                -1
                /* CACHED */
              )
            ])], 8, _hoisted_5))
          ]))
        ]),
        _createElementVNode("div", _hoisted_6, [
          _createElementVNode(
            "p",
            _hoisted_7,
            _toDisplayString(__props.text),
            1
            /* TEXT */
          ),
          _ctx.$slots.tags ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
            _renderSlot(_ctx.$slots, "tags")
          ])) : _createCommentVNode("v-if", true)
        ])
      ]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-2aa2a03c" });
