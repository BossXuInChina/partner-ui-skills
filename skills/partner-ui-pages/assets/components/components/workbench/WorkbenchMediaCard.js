import { defineComponent as _defineComponent } from "vue";
import { renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock, createVNode as _createVNode, unref as _unref, toDisplayString as _toDisplayString, renderList as _renderList, Fragment as _Fragment, mergeProps as _mergeProps, withCtx as _withCtx } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "wbc-media wbc-media--custom"
};
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = {
  key: 1,
  class: "wbc-media-badge-host"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = {
  key: 3,
  class: "wbc-media-content"
};
const _hoisted_6 = {
  key: 0,
  class: "wbc-media-heading"
};
const _hoisted_7 = {
  key: 0,
  class: "wbc-info-title-row"
};
const _hoisted_8 = {
  key: 0,
  class: "wbc-title"
};
const _hoisted_9 = {
  key: 1,
  class: "wbc-tags"
};
const _hoisted_10 = {
  key: 1,
  class: "wbc-description"
};
import { useSlots } from "vue";
import { hasSlotContent } from "../card-block/slots";
import WorkbenchTag from "../tag/WorkbenchTag.vue";
import BlockFrame from "../card-block/BlockFrame.vue";
import BlockActions from "../card-block/BlockActions.vue";
import playIcon from "../card-block/assets/video-play.svg";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchMediaCard",
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
    mediaKind: {
      type: String,
      default: "image",
      validator: (value) => ["image", "video"].includes(value)
    },
    mediaLabel: { type: String, default: "" },
    badge: { type: String, default: "" }
  },
  emits: { action: (_payload) => true },
  setup(__props, { emit: __emit }) {
    const slots = useSlots();
    const has = (name) => hasSlotContent(slots, name);
    const emit = __emit;
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(
        BlockFrame,
        _mergeProps(_ctx.$props, {
          title: "",
          "header-actions": [],
          class: "wbc-media-card",
          "data-card-block": "media",
          onAction: _cache[1] || (_cache[1] = ($event) => emit("action", $event))
        }),
        {
          header: _withCtx(() => [
            has("header") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "header", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
          ]),
          footer: _withCtx(() => [
            has("footer") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "footer", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
          ]),
          actions: _withCtx(() => [
            has("actions") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "actions", {}, void 0, void 0, 0) : _createCommentVNode("v-if", true)
          ]),
          default: _withCtx(() => [
            has("media") && __props.variant !== "navigation" ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
              _renderSlot(_ctx.$slots, "media")
            ])) : (_openBlock(), _createElementBlock("div", {
              key: 1,
              class: "wbc-media",
              role: "img",
              "aria-label": __props.mediaLabel || __props.title || "\u5185\u5BB9\u5C01\u9762"
            }, [
              __props.mediaKind === "video" ? (_openBlock(), _createBlock(WorkbenchTag, {
                key: 0,
                class: "wbc-media-badge--regular",
                label: __props.badge || "\u89C6\u9891",
                variant: "basic",
                size: "small"
              }, null, 8, ["label"])) : __props.badge ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
                _createVNode(WorkbenchTag, {
                  label: __props.badge,
                  variant: "corner",
                  "corner-tone": "hot",
                  placement: "top-left",
                  size: "large"
                }, null, 8, ["label"])
              ])) : _createCommentVNode("v-if", true),
              __props.mediaKind === "video" ? (_openBlock(), _createElementBlock("img", {
                key: 2,
                class: "wbc-play",
                src: _unref(playIcon),
                alt: ""
              }, null, 8, _hoisted_4)) : _createCommentVNode("v-if", true)
            ], 8, _hoisted_2)),
            has("content") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "content", {}, void 0, void 0, 2) : __props.title || __props.tags.length || __props.description || __props.variant !== "navigation" && (__props.headerActions.length || has("header-actions")) ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
              __props.title || __props.tags.length || __props.headerActions.length || has("header-actions") ? (_openBlock(), _createElementBlock("div", _hoisted_6, [
                __props.title || __props.headerActions.length || has("header-actions") ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
                  __props.title ? (_openBlock(), _createElementBlock(
                    "h3",
                    _hoisted_8,
                    _toDisplayString(__props.title),
                    1
                    /* TEXT */
                  )) : _createCommentVNode("v-if", true),
                  has("header-actions") && __props.variant !== "navigation" ? _renderSlot(_ctx.$slots, "header-actions", {}, void 0, void 0, 1) : __props.variant !== "navigation" && __props.headerActions.length ? (_openBlock(), _createBlock(BlockActions, {
                    key: 2,
                    header: "",
                    items: __props.headerActions,
                    onActivate: _cache[0] || (_cache[0] = (a, event) => emit("action", { id: a.id, source: "header", event }))
                  }, null, 8, ["items"])) : _createCommentVNode("v-if", true)
                ])) : _createCommentVNode("v-if", true),
                __props.tags.length ? (_openBlock(), _createElementBlock("div", _hoisted_9, [
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
              ])) : _createCommentVNode("v-if", true),
              __props.description ? (_openBlock(), _createElementBlock(
                "p",
                _hoisted_10,
                _toDisplayString(__props.description),
                1
                /* TEXT */
              )) : _createCommentVNode("v-if", true)
            ])) : _createCommentVNode("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        },
        16
        /* FULL_PROPS */
      );
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
