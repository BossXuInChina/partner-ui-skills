import { defineComponent as _defineComponent } from "vue";
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["href"];
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchPolicyLinks",
  props: {
    items: { type: Array, required: true },
    href: { type: String, default: "#" },
    ariaLabel: { type: String, default: "\u89C4\u5219\u4E0E\u653F\u7B56" }
  },
  setup(__props) {
    const label = (item) => typeof item === "string" ? item : item.label;
    const target = (item, fallback) => typeof item === "string" ? fallback : item.href ?? fallback;
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("nav", {
        class: "wb-policy-links",
        "aria-label": __props.ariaLabel
      }, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(__props.items, (item) => {
            return _openBlock(), _createElementBlock("a", {
              key: label(item),
              class: "wb-policy-links__item",
              href: target(item, __props.href)
            }, [
              _createVNode(WorkbenchIcon, { name: "\u6587\u4EF6/\u5C3A\u5BF8=14" }),
              _createElementVNode(
                "span",
                null,
                _toDisplayString(label(item)),
                1
                /* TEXT */
              ),
              _createVNode(WorkbenchIcon, { name: "/ic_arrow_right_line_12px" })
            ], 8, _hoisted_2);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 8, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
