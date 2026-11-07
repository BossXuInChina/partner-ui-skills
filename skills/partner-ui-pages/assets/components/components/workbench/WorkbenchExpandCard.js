import { defineComponent as _defineComponent } from "vue";
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, unref as _unref, createVNode as _createVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = { class: "wb-expand-card__head" };
const _hoisted_2 = {
  key: 0,
  class: "wb-expand-card__icon"
};
const _hoisted_3 = { class: "wb-expand-card__title" };
const _hoisted_4 = ["aria-label", "aria-expanded", "aria-controls"];
const _hoisted_5 = ["id", "inert"];
const _hoisted_6 = { class: "wb-expand-card__body" };
const _hoisted_7 = { class: "wb-expand-card__body-content" };
import { useId } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchExpandCard",
  props: {
    expanded: { type: Boolean, default: false },
    title: { type: String, required: true }
  },
  emits: ["update:expanded"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const id = useId();
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "section",
        {
          class: _normalizeClass(["wb-expand-card", { "is-expanded": __props.expanded }])
        },
        [
          _createElementVNode("header", _hoisted_1, [
            _ctx.$slots.icon ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
              _renderSlot(_ctx.$slots, "icon")
            ])) : _createCommentVNode("v-if", true),
            _createElementVNode("span", _hoisted_3, [
              _renderSlot(_ctx.$slots, "title", {}, () => [
                _createTextVNode(
                  _toDisplayString(__props.title),
                  1
                  /* TEXT */
                )
              ])
            ]),
            _createElementVNode("button", {
              type: "button",
              class: "wb-expand-card__toggle",
              "aria-label": (__props.expanded ? "\u6536\u8D77" : "\u5C55\u5F00") + __props.title,
              "aria-expanded": __props.expanded,
              "aria-controls": _unref(id),
              onClick: _cache[0] || (_cache[0] = ($event) => emit("update:expanded", !__props.expanded))
            }, [
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass(["wb-expand-card__arrow", { "is-expanded": __props.expanded }])
                },
                [
                  _createVNode(WorkbenchIcon, { name: "/ic_arrow_down_line_12px" })
                ],
                2
                /* CLASS */
              )
            ], 8, _hoisted_4)
          ]),
          _createElementVNode("div", {
            id: _unref(id),
            class: _normalizeClass(["wb-expand-card__body-wrap", { "is-expanded": __props.expanded }]),
            inert: !__props.expanded
          }, [
            _createElementVNode("div", _hoisted_6, [
              _createElementVNode("div", _hoisted_7, [
                _renderSlot(_ctx.$slots, "default")
              ])
            ])
          ], 10, _hoisted_5)
        ],
        2
        /* CLASS */
      );
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
