import { defineComponent as _defineComponent } from "vue";
import { openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, unref as _unref, createVNode as _createVNode, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = {
  class: "workspace-smart-icon",
  "aria-hidden": "true"
};
const _hoisted_2 = ["src"];
const _hoisted_3 = {
  key: 3,
  viewBox: "0 0 24 24",
  focusable: "false"
};
const _hoisted_4 = ["mask"];
import { useId } from "vue";
import { AiIcon, useAiIconDefinition } from "../ui/foundation/aiIcons";
import "./workspaceIntelligence.css";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkspaceSmartIcon",
  props: {
    logo: {}
  },
  setup(__props) {
    const smartIcon = useAiIconDefinition("smart.mark");
    const maskId = `workspace-smart-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("span", _hoisted_1, [
        typeof __props.logo === "string" ? (_openBlock(), _createElementBlock("img", {
          key: 0,
          src: __props.logo,
          alt: ""
        }, null, 8, _hoisted_2)) : __props.logo ? (_openBlock(), _createBlock(_resolveDynamicComponent(__props.logo), { key: 1 })) : _unref(smartIcon).color !== "gradient" ? (_openBlock(), _createBlock(_unref(AiIcon), {
          key: 2,
          name: "smart.mark"
        })) : (_openBlock(), _createElementBlock("svg", _hoisted_3, [
          _createElementVNode("defs", null, [
            _createElementVNode("mask", {
              id: maskId,
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
            mask: `url(#${maskId})`
          }, [..._cache[0] || (_cache[0] = [
            _createElementVNode(
              "div",
              {
                xmlns: "http://www.w3.org/1999/xhtml",
                class: "workspace-smart-icon__paint"
              },
              null,
              -1
              /* CACHED */
            )
          ])], 8, _hoisted_4))
        ]))
      ]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-22ace8b0" });
