import { defineComponent as _defineComponent } from "vue";
import { renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock, toDisplayString as _toDisplayString, renderList as _renderList, Fragment as _Fragment, normalizeClass as _normalizeClass, mergeProps as _mergeProps, withCtx as _withCtx, createSlots as _createSlots } from "vue";
const _hoisted_1 = {
  key: 1,
  class: "wbc-info-title-row"
};
const _hoisted_2 = {
  key: 1,
  class: "wbc-info-icon",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  key: 1,
  class: "wbc-info-content"
};
const _hoisted_4 = {
  key: 0,
  class: "wbc-title"
};
const _hoisted_5 = {
  key: 1,
  class: "wbc-tags"
};
const _hoisted_6 = {
  key: 1,
  class: "wbc-description"
};
import { useSlots } from "vue";
import { hasSlotContent } from "../card-block/slots";
import BlockFrame from "../card-block/BlockFrame.vue";
import BlockActions from "../card-block/BlockActions.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchInformationCard",
  props: {
    title: { type: String, default: "" },
    variant: {
      type: String,
      default: "display-white",
      validator: (value) => ["display-white", "display-tinted", "operation", "navigation"].includes(value)
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
    bodySize: {
      type: Number,
      default: 14,
      validator: (value) => [14].includes(value)
    },
    description: { type: String, default: "" },
    tags: { type: Array, default: () => [] },
    structure: {
      type: String,
      default: "icon",
      validator: (value) => ["icon", "text-action"].includes(value)
    }
  },
  emits: { action: (_payload) => true },
  setup(__props, { emit: __emit }) {
    const slots = useSlots();
    const has = (name) => hasSlotContent(slots, name);
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(BlockFrame, _mergeProps(_ctx.$props, {
        title: __props.structure === "icon" ? "" : __props.title,
        class: ["wbc-info-card", `wbc-info-card--${__props.structure}`],
        "data-card-block": "information",
        onAction: _cache[1] || (_cache[1] = ($event) => emit("action", $event))
      }), _createSlots({
        "header-actions": _withCtx(() => [
          has("header-actions") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "header-actions", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
        ]),
        footer: _withCtx(() => [
          has("footer") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "footer", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
        ]),
        actions: _withCtx(() => [
          has("actions") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "actions", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
        ]),
        default: _withCtx(() => [
          has("content") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "content", {}, void 0, void 0, 0) : __props.structure === "icon" && __props.title || __props.tags.length || __props.description ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
            __props.structure === "icon" && __props.title || __props.tags.length ? (_openBlock(), _createElementBlock(
              "div",
              {
                key: 0,
                class: _normalizeClass(__props.structure === "icon" ? "wbc-info-title-tags" : void 0)
              },
              [
                __props.structure === "icon" && __props.title ? (_openBlock(), _createElementBlock(
                  "h3",
                  _hoisted_4,
                  _toDisplayString(__props.title),
                  1
                  /* TEXT */
                )) : _createCommentVNode("v-if", true),
                __props.tags.length ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(__props.tags, (tag, i) => {
                      return _openBlock(), _createElementBlock(
                        "span",
                        { key: i },
                        _toDisplayString(tag),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : _createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )) : _createCommentVNode("v-if", true),
            __props.description ? (_openBlock(), _createElementBlock(
              "p",
              _hoisted_6,
              _toDisplayString(__props.description),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true)
          ])) : _createCommentVNode("v-if", true)
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        has("header") && __props.variant !== "navigation" || __props.structure === "icon" ? {
          name: "header",
          fn: _withCtx(() => [
            has("header") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "header", {}, void 0, void 0, 0) : (_openBlock(), _createElementBlock("div", _hoisted_1, [
              has("icon") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "icon", {}, void 0, void 0, 0) : (_openBlock(), _createElementBlock("span", _hoisted_2, "\u2726")),
              has("header-actions") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "header-actions", {}, void 0, void 0, 2) : __props.variant !== "navigation" && __props.headerActions.length ? (_openBlock(), _createBlock(BlockActions, {
                key: 3,
                header: "",
                items: __props.headerActions,
                onActivate: _cache[0] || (_cache[0] = (a, event) => emit("action", { id: a.id, source: "header", event }))
              }, null, 8, ["items"])) : _createCommentVNode("v-if", true)
            ]))
          ]),
          key: "0"
        } : void 0
      ]), 1040, ["title", "class"]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
