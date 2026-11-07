import { defineComponent as _defineComponent } from "vue";
import { renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createVNode as _createVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx, createBlock as _createBlock, normalizeClass as _normalizeClass, mergeProps as _mergeProps } from "vue";
const _hoisted_1 = { "aria-hidden": "true" };
const _hoisted_2 = {
  key: 2,
  class: "wbc-empty"
};
import { useSlots } from "vue";
import { hasSlotContent } from "../card-block/slots";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import BlockFrame from "../card-block/BlockFrame.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchQuickAppCard",
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
    items: { type: Array, default: () => [] }
  },
  emits: {
    action: (_payload) => true,
    activate: (_payload) => true
  },
  setup(__props, { emit: __emit }) {
    const slots = useSlots();
    const has = (name, scope = {}) => hasSlotContent(slots, name, scope);
    const props = __props;
    const emit = __emit;
    function activate(item, event) {
      if (!item.disabled) emit("activate", { item, event });
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(BlockFrame, _mergeProps(_ctx.$props, {
        variant: "display-white",
        class: ["wbc-quick-card", { "wbc-card--narrow": __props.layout === "column" }],
        "data-card-block": "quick-app",
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
              class: _normalizeClass(["wbc-quick-grid", `wbc-quick-grid--${__props.layout}`])
            },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(__props.items, (item, index) => {
                  return _openBlock(), _createBlock(_resolveDynamicComponent(item.href && !item.disabled ? "a" : "button"), {
                    key: item.id || index,
                    class: "wbc-quick-app",
                    type: !item.href || item.disabled ? "button" : void 0,
                    href: !item.disabled ? item.href : void 0,
                    target: item.target,
                    rel: item.rel || (item.target === "_blank" ? "noopener noreferrer" : void 0),
                    disabled: item.disabled ? true : void 0,
                    title: item.label,
                    onClick: ($event) => activate(item, $event)
                  }, {
                    default: _withCtx(() => [
                      has("item", { item, index }) ? _renderSlot(_ctx.$slots, "item", {
                        item,
                        index
                      }, void 0, void 0, 0) : (_openBlock(), _createElementBlock(
                        _Fragment,
                        { key: 1 },
                        [
                          _createElementVNode("span", _hoisted_1, [
                            _createVNode(WorkbenchIcon, {
                              name: item.icon || "\u5E03\u5C40\u89C6\u56FE/\u89C6\u56FE=\u5BAB\u683C,\u5C3A\u5BF8=20,\u9762\u6027=off"
                            }, null, 8, ["name"])
                          ]),
                          _createElementVNode(
                            "strong",
                            null,
                            _toDisplayString(item.label),
                            1
                            /* TEXT */
                          )
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["type", "href", "target", "rel", "disabled", "title", "onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            2
            /* CLASS */
          )) : has("empty") ? _renderSlot(_ctx.$slots, "empty", {}, void 0, void 0, 1) : (_openBlock(), _createElementBlock("p", _hoisted_2, " \u6682\u65E0\u5E94\u7528 "))
        ]),
        _: 3
        /* FORWARDED */
      }, 16, ["class"]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
