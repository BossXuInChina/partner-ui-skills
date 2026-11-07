import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, resolveDynamicComponent as _resolveDynamicComponent, mergeProps as _mergeProps, withCtx as _withCtx, createBlock as _createBlock, renderList as _renderList, Fragment as _Fragment, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = {
  class: "wb-footer",
  role: "contentinfo",
  "aria-label": "\u7F51\u7AD9\u9875\u811A"
};
const _hoisted_2 = { class: "wb-footer__inner" };
const _hoisted_3 = {
  key: 0,
  class: "wb-footer__metadata"
};
const _hoisted_4 = {
  key: 0,
  class: "wb-footer__copyright"
};
const _hoisted_5 = {
  key: 1,
  class: "wb-footer__links",
  "aria-label": "\u9875\u811A\u6CD5\u5F8B\u4E0E\u652F\u6301"
};
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { footerCopyright, footerRegistration, footerLinks } from "./footerDefaults.js";
const __sfc_main__ = {
  __name: "WorkbenchFooter",
  props: {
    copyright: { type: String, default: footerCopyright },
    registration: {
      type: Object,
      default: () => ({ id: "registration", label: footerRegistration })
    },
    links: { type: Array, default: () => footerLinks.map((item) => ({ ...item })) },
    disabled: { type: Boolean, default: false }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isDisabled = (item) => props.disabled || item.disabled;
    const elementFor = (item) => item.href ? "a" : "button";
    const relFor = (item) => item.target === "_blank" ? [...new Set(`${item.rel ?? ""} noopener noreferrer`.trim().split(/\s+/))].join(" ") : item.rel;
    function attributesFor(item) {
      const disabled = isDisabled(item);
      return item.href ? {
        href: disabled ? void 0 : item.href,
        target: item.target,
        rel: relFor(item),
        role: disabled ? "link" : void 0,
        "aria-disabled": disabled || void 0,
        tabindex: disabled ? -1 : void 0
      } : { type: "button", disabled };
    }
    function select(item, event) {
      if (isDisabled(item)) {
        event.preventDefault();
        return;
      }
      emit("select", item);
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("footer", _hoisted_1, [
        _createElementVNode("div", _hoisted_2, [
          __props.copyright || _ctx.$slots.copyright || __props.registration?.label ? (_openBlock(), _createElementBlock("p", _hoisted_3, [
            __props.copyright || _ctx.$slots.copyright ? (_openBlock(), _createElementBlock("span", _hoisted_4, [
              _renderSlot(_ctx.$slots, "copyright", {}, () => [
                _createTextVNode(
                  _toDisplayString(__props.copyright),
                  1
                  /* TEXT */
                )
              ])
            ])) : _createCommentVNode("v-if", true),
            __props.registration?.label ? (_openBlock(), _createBlock(_resolveDynamicComponent(__props.registration.href || __props.registration.action ? elementFor(__props.registration) : "span"), _mergeProps({
              key: 1,
              class: ["wb-footer__registration", { "wb-footer__entry": __props.registration.href || __props.registration.action }]
            }, __props.registration.href || __props.registration.action ? attributesFor(__props.registration) : {}, {
              onClick: _cache[0] || (_cache[0] = ($event) => __props.registration.href || __props.registration.action ? select(__props.registration, $event) : void 0)
            }), {
              default: _withCtx(() => [
                _createTextVNode(
                  _toDisplayString(__props.registration.label),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 16, ["class"])) : _createCommentVNode("v-if", true)
          ])) : _createCommentVNode("v-if", true),
          __props.links.length ? (_openBlock(), _createElementBlock("nav", _hoisted_5, [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(__props.links, (item) => {
                return _openBlock(), _createBlock(_resolveDynamicComponent(elementFor(item)), _mergeProps({
                  key: item.id ?? item.label,
                  class: "wb-footer__entry"
                }, { ref_for: true }, attributesFor(item), {
                  onClick: ($event) => select(item, $event)
                }), {
                  default: _withCtx(() => [
                    _createTextVNode(
                      _toDisplayString(item.label),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 2
                  /* DYNAMIC */
                }, 1040, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : _createCommentVNode("v-if", true)
        ])
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-740686ca" });
