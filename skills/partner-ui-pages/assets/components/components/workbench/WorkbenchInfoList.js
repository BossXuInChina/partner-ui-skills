import { defineComponent as _defineComponent } from "vue";
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createVNode as _createVNode, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = { class: "wb-info-list" };
const _hoisted_2 = ["href"];
const _hoisted_3 = {
  key: 0,
  class: "wb-info-list__tags"
};
const _hoisted_4 = { class: "wb-info-list__time" };
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchTag from "../tag/WorkbenchTag.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchInfoList",
  props: {
    items: { type: Array, required: true },
    href: { type: String, default: "#" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("ul", _hoisted_1, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(__props.items, (item, index) => {
            return _openBlock(), _createElementBlock("li", {
              key: index,
              class: "wb-info-list__item"
            }, [
              _createElementVNode("a", {
                class: "wb-info-list__title",
                href: item.href ?? __props.href
              }, _toDisplayString(item.title), 9, _hoisted_2),
              item.tags?.length ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(item.tags, (tag) => {
                    return _openBlock(), _createBlock(WorkbenchTag, {
                      key: tag[0],
                      variant: "status-subtle",
                      size: "small",
                      status: tag[1],
                      label: tag[0]
                    }, null, 8, ["status", "label"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : _createCommentVNode("v-if", true),
              _createElementVNode("span", _hoisted_4, [
                _createVNode(WorkbenchIcon, {
                  name: "\u9996\u9875 \u65F6\u95F4/time",
                  size: 16
                }),
                _createTextVNode(
                  _toDisplayString(item.time),
                  1
                  /* TEXT */
                )
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
