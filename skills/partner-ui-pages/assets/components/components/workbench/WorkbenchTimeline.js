import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createBlock as _createBlock, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["data-status"];
const _hoisted_3 = {
  key: 0,
  class: "wb-timeline__connector",
  "aria-hidden": "true"
};
const _hoisted_4 = ["aria-label", "data-focused"];
const _hoisted_5 = { class: "wb-timeline__content" };
const _hoisted_6 = ["datetime"];
const _hoisted_7 = { class: "wb-timeline__event" };
const _hoisted_8 = {
  key: 0,
  class: "wb-timeline__image"
};
const _hoisted_9 = ["src", "alt"];
const _hoisted_10 = { class: "wb-timeline__copy" };
const _hoisted_11 = {
  key: 0,
  class: "wb-timeline__title"
};
const _hoisted_12 = {
  key: 1,
  class: "wb-timeline__description"
};
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchStatusIcon from "../icons/WorkbenchStatusIcon.vue";
import placeholder from "./assets/thumbnail-placeholder.svg";
const __sfc_main__ = {
  __name: "WorkbenchTimeline",
  props: {
    items: { type: Array, default: () => [] },
    nodeType: { type: String, default: "dot", validator: (value) => ["dot", "icon"].includes(value) },
    label: { type: String, default: "\u4E8B\u4EF6\u65F6\u95F4\u8F74" }
  },
  setup(__props) {
    const statusLabels = {
      default: "\u9ED8\u8BA4",
      loading: "\u52A0\u8F7D\u4E2D",
      disabled: "\u7981\u7528",
      error: "\u5931\u8D25",
      process: "\u8FDB\u884C\u4E2D",
      success: "\u6210\u529F"
    };
    function status(item) {
      return Object.hasOwn(statusLabels, item.status) ? item.status : "default";
    }
    function focused(item) {
      return Boolean(item.focused) && !["loading", "disabled"].includes(status(item));
    }
    function imageSource(image) {
      return image === true ? placeholder : typeof image === "string" ? image : image?.src;
    }
    function datetime(item) {
      return item.datetime || (/^\d{4}-\d{2}-\d{2}[ T]\d{2}:\d{2}:\d{2}$/.test(item.time ?? "") ? item.time.replace(" ", "T") : void 0);
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("ol", {
        class: "wb-timeline",
        "aria-label": __props.label
      }, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(__props.items, (item, index) => {
            return _openBlock(), _createElementBlock("li", {
              key: item.key ?? index,
              class: "wb-timeline__item",
              "data-status": status(item)
            }, [
              index < __props.items.length - 1 ? (_openBlock(), _createElementBlock("span", _hoisted_3)) : _createCommentVNode("v-if", true),
              _createElementVNode("span", {
                class: "wb-timeline__node",
                role: "img",
                "aria-label": statusLabels[status(item)],
                "data-focused": focused(item)
              }, [
                _renderSlot(_ctx.$slots, "node", {
                  item,
                  index
                }, () => [
                  (item.nodeType ?? __props.nodeType) === "icon" && ["process", "success", "error"].includes(status(item)) ? (_openBlock(), _createElementBlock(
                    _Fragment,
                    { key: 0 },
                    [
                      status(item) === "process" ? (_openBlock(), _createBlock(WorkbenchIcon, {
                        key: 0,
                        name: "\u65F6\u95F4_14px",
                        color: "var(--wb-color-info-primary)"
                      })) : (_openBlock(), _createBlock(WorkbenchStatusIcon, {
                        key: 1,
                        name: `${status(item) === "error" ? "close_circle" : "success"}/outline/14`
                      }, null, 8, ["name"]))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : (_openBlock(), _createElementBlock(
                    "span",
                    {
                      key: 1,
                      class: _normalizeClass(["wb-timeline__dot", { "wb-timeline__dot--loading": status(item) === "loading" }]),
                      "aria-hidden": "true"
                    },
                    null,
                    2
                    /* CLASS */
                  ))
                ])
              ], 8, _hoisted_4),
              _createElementVNode("div", _hoisted_5, [
                item.time || _ctx.$slots.time ? (_openBlock(), _createElementBlock("time", {
                  key: 0,
                  class: "wb-timeline__time",
                  datetime: datetime(item)
                }, [
                  _renderSlot(_ctx.$slots, "time", {
                    item,
                    index
                  }, () => [
                    _createTextVNode(
                      _toDisplayString(item.time),
                      1
                      /* TEXT */
                    )
                  ])
                ], 8, _hoisted_6)) : _createCommentVNode("v-if", true),
                _createElementVNode("div", _hoisted_7, [
                  item.image || _ctx.$slots.image ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
                    _renderSlot(_ctx.$slots, "image", {
                      item,
                      index
                    }, () => [
                      _createElementVNode("img", {
                        src: imageSource(item.image),
                        alt: item.image?.alt ?? ""
                      }, null, 8, _hoisted_9)
                    ])
                  ])) : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_10, [
                    item.title || _ctx.$slots.title ? (_openBlock(), _createElementBlock("p", _hoisted_11, [
                      _renderSlot(_ctx.$slots, "title", {
                        item,
                        index
                      }, () => [
                        _createTextVNode(
                          _toDisplayString(item.title),
                          1
                          /* TEXT */
                        )
                      ])
                    ])) : _createCommentVNode("v-if", true),
                    item.description || _ctx.$slots.description ? (_openBlock(), _createElementBlock("p", _hoisted_12, [
                      _renderSlot(_ctx.$slots, "description", {
                        item,
                        index
                      }, () => [
                        _createTextVNode(
                          _toDisplayString(item.description),
                          1
                          /* TEXT */
                        )
                      ])
                    ])) : _createCommentVNode("v-if", true)
                  ])
                ])
              ])
            ], 8, _hoisted_2);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 8, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-876c723c" });
