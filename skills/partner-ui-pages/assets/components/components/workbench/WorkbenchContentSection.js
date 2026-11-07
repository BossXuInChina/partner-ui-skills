import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = { class: "content-section" };
const _hoisted_2 = {
  key: 0,
  class: "content-section__header"
};
const _hoisted_3 = { class: "content-section__identity" };
const _hoisted_4 = {
  key: 0,
  class: "content-section__actions"
};
const _hoisted_5 = {
  key: 1,
  class: "content-section__meta"
};
const _hoisted_6 = { class: "content-section__body" };
const _hoisted_7 = {
  key: 1,
  class: "content-section__footer"
};
import { computed, useSlots, Comment, Fragment, Text } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchContentSection",
  props: {
    title: { type: String, default: "" },
    headingLevel: { type: Number, default: 2 }
  },
  setup(__props) {
    const props = __props;
    const headingTag = computed(
      () => `h${[1, 2, 3, 4, 5, 6].includes(props.headingLevel) ? props.headingLevel : 2}`
    );
    const slots = useSlots();
    const nonempty = (nodes) => nodes?.some(
      (node) => node.type === Comment ? false : node.type === Fragment ? nonempty(node.children) : node.type === Text ? Boolean(String(node.children).trim()) : true
    );
    const has = (name) => Boolean(slots[name] && nonempty(slots[name]()));
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", _hoisted_1, [
        __props.title || has("heading") || has("meta") || has("actions") ? (_openBlock(), _createElementBlock("header", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, [
            _renderSlot(_ctx.$slots, "heading", {}, () => [
              __props.title ? (_openBlock(), _createBlock(_resolveDynamicComponent(headingTag.value), {
                key: 0,
                class: "content-section__title"
              }, {
                default: _withCtx(() => [
                  _createTextVNode(
                    _toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              })) : _createCommentVNode("v-if", true)
            ])
          ]),
          has("actions") ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
            _renderSlot(_ctx.$slots, "actions")
          ])) : _createCommentVNode("v-if", true),
          has("meta") ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
            _renderSlot(_ctx.$slots, "meta")
          ])) : _createCommentVNode("v-if", true)
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_6, [
          _renderSlot(_ctx.$slots, "default")
        ]),
        has("footer") ? (_openBlock(), _createElementBlock("footer", _hoisted_7, [
          _renderSlot(_ctx.$slots, "footer")
        ])) : _createCommentVNode("v-if", true)
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-dac873ed" });
