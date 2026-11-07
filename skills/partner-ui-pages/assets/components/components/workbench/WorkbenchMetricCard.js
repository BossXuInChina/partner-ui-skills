import { defineComponent as _defineComponent } from "vue";
import { renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, mergeProps as _mergeProps, withCtx as _withCtx, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["title"];
const _hoisted_2 = ["title"];
const _hoisted_3 = {
  key: 2,
  class: "wbc-empty"
};
import { useSlots } from "vue";
import { hasSlotContent } from "../card-block/slots";
import BlockFrame from "../card-block/BlockFrame.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchMetricCard",
  props: {
    title: { type: String, default: "" },
    variant: {
      type: String,
      default: "display-white",
      validator: (value) => ["display-white"].includes(value)
    },
    size: {
      type: String,
      default: "xxxl",
      validator: (value) => ["s", "m", "l", "xl", "xxl", "xxxl"].includes(value)
    },
    href: { type: String, default: void 0 },
    target: { type: String, default: void 0 },
    rel: { type: String, default: void 0 },
    headerActions: { type: Array, default: () => [] },
    footer: { type: Object, default: null },
    actions: { type: Array, default: () => [] },
    layout: {
      type: String,
      default: "row",
      validator: (value) => ["row", "multi", "column"].includes(value)
    },
    labelPosition: {
      type: String,
      default: "below",
      validator: (value) => ["above", "below"].includes(value)
    },
    items: { type: Array, default: () => [] }
  },
  emits: { action: (_payload) => true },
  setup(__props, { emit: __emit }) {
    const slots = useSlots();
    const has = (name, scope = {}) => hasSlotContent(slots, name, scope);
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(BlockFrame, _mergeProps(_ctx.$props, {
        variant: "display-white",
        class: ["wbc-metric-card", { "wbc-card--narrow": __props.layout === "column" }],
        "data-card-block": "metrics",
        onAction: _cache[0] || (_cache[0] = ($event) => emit("action", $event))
      }), {
        header: _withCtx(() => [
          has("header") ? _renderSlot(_ctx.$slots, "header", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
        ]),
        "header-actions": _withCtx(() => [
          has("header-actions") ? _renderSlot(_ctx.$slots, "header-actions", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
        ]),
        footer: _withCtx(() => [
          has("footer") ? _renderSlot(_ctx.$slots, "footer", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
        ]),
        actions: _withCtx(() => [
          has("actions") ? _renderSlot(_ctx.$slots, "actions", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
        ]),
        default: _withCtx(() => [
          __props.items.length ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass(["wbc-metrics", `wbc-metrics--${__props.layout}`])
            },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(__props.items, (item, index) => {
                  return _openBlock(), _createElementBlock("div", {
                    key: item.id || index,
                    class: "wbc-metric"
                  }, [
                    has("item", { item, index }) ? _renderSlot(_ctx.$slots, "item", {
                      item,
                      index
                    }, void 0, void 0, 0) : (_openBlock(), _createElementBlock(
                      _Fragment,
                      { key: 1 },
                      [
                        has("icon", { item, index }) ? _renderSlot(_ctx.$slots, "icon", {
                          item,
                          index
                        }, void 0, void 0, 0) : _createCommentVNode("v-if", true),
                        _createElementVNode(
                          "div",
                          {
                            class: _normalizeClass(["wbc-metric-copy", {
                              "wbc-metric-copy--truncate": item.truncate,
                              "wbc-metric-copy--label-above": __props.labelPosition === "above"
                            }])
                          },
                          [
                            _createElementVNode("strong", {
                              title: String(item.value ?? "\u2014")
                            }, _toDisplayString(item.value ?? "\u2014"), 9, _hoisted_1),
                            _createElementVNode("span", {
                              title: item.label
                            }, _toDisplayString(item.label), 9, _hoisted_2)
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )) : has("empty") ? _renderSlot(_ctx.$slots, "empty", {}, void 0, void 0, 1) : (_openBlock(), _createElementBlock("p", _hoisted_3, " \u6682\u65E0\u6570\u636E "))
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["class"]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
