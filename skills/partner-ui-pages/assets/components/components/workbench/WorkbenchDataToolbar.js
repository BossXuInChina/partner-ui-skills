import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderSlot as _renderSlot, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createBlock as _createBlock, normalizeClass as _normalizeClass, createVNode as _createVNode, createTextVNode as _createTextVNode, withCtx as _withCtx, unref as _unref, mergeProps as _mergeProps, renderList as _renderList } from "vue";
const _hoisted_1 = { class: "wb-data-toolbar__main" };
const _hoisted_2 = { class: "wb-data-toolbar__title" };
const _hoisted_3 = { class: "wb-data-toolbar__title-actions" };
const _hoisted_4 = { class: "wb-data-toolbar__primary-controls" };
const _hoisted_5 = {
  key: 0,
  class: "wb-data-toolbar__search"
};
const _hoisted_6 = {
  key: 0,
  class: "wb-data-toolbar__auxiliary"
};
const _hoisted_7 = { class: "wb-data-toolbar__sr-only" };
const _hoisted_8 = {
  class: "wb-data-toolbar__icon-actions",
  "aria-label": "\u9644\u5C5E\u64CD\u4F5C"
};
const _hoisted_9 = ["disabled"];
const _hoisted_10 = ["aria-label", "aria-pressed"];
const _hoisted_11 = {
  key: 1,
  class: "wb-data-toolbar__additional"
};
const _hoisted_12 = { class: "wb-data-toolbar__advanced-fields" };
const _hoisted_13 = { class: "wb-data-toolbar__advanced-actions" };
const _hoisted_14 = {
  key: 1,
  class: "wb-data-toolbar__applied",
  "aria-label": "\u5DF2\u751F\u6548\u7B5B\u9009\u6761\u4EF6"
};
const _hoisted_15 = {
  key: 0,
  class: "wb-data-toolbar__result"
};
import "../shared/disclosure-motion.css";
import { useId } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchButtonRadioGroup from "../button-radio-group/WorkbenchButtonRadioGroup.vue";
import WorkbenchTag from "../tag/WorkbenchTag.vue";
import WorkbenchTooltip from "../tooltip/WorkbenchTooltip.vue";
import WorkbenchBadge from "../badge/WorkbenchBadge.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchDataToolbar",
  props: {
    variant: {
      type: String,
      default: "compact",
      validator: (value) => ["title", "compact", "complex"].includes(value)
    },
    title: { type: String, default: "" },
    viewMode: {
      type: String,
      default: "table",
      validator: (value) => ["table", "list", "card"].includes(value)
    },
    filterTags: { type: Array, default: () => [] },
    filterResultText: { type: String, default: "" },
    advancedFilterExpanded: { type: Boolean, default: false },
    refreshing: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    showAdvancedFilter: { type: Boolean, default: true },
    showViewSwitch: { type: Boolean, default: true }
  },
  emits: [
    "update:viewMode",
    "view-change",
    "update:advancedFilterExpanded",
    "filter-confirm",
    "filter-cancel",
    "filter-remove",
    "filter-reset",
    "refresh",
    "settings",
    "fullscreen-change"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const advancedFilterId = `wb-data-toolbar-${useId()}-advanced-filter`;
    const viewItems = Object.freeze([
      { value: "table", label: "\u8868\u683C\u89C6\u56FE", icon: "\u5E03\u5C40\u89C6\u56FE/\u89C6\u56FE=\u5BFC\u822A,\u9762\u6027=off_12px" },
      { value: "card", label: "\u5361\u7247\u89C6\u56FE", icon: "\u5E03\u5C40\u89C6\u56FE/\u89C6\u56FE=\u5BAB\u683C,\u9762\u6027=off_12px" },
      { value: "list", label: "\u5217\u8868\u89C6\u56FE", icon: "\u5E03\u5C40\u89C6\u56FE/\u89C6\u56FE=\u5217\u8868,\u9762\u6027=off_12px" }
    ]);
    function toggleAdvancedFilter() {
      emit("update:advancedFilterExpanded", !props.advancedFilterExpanded);
    }
    function cancelFilter() {
      emit("filter-cancel");
      emit("update:advancedFilterExpanded", false);
    }
    function confirmFilter() {
      emit("filter-confirm");
      emit("update:advancedFilterExpanded", false);
    }
    function changeView(value) {
      emit("update:viewMode", value);
      emit("view-change", value);
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "section",
        {
          class: _normalizeClass(["wb-data-toolbar", `wb-data-toolbar--${__props.variant}`]),
          "aria-label": "\u6570\u636E\u64CD\u4F5C\u533A"
        },
        [
          _createElementVNode("div", _hoisted_1, [
            __props.variant === "title" ? (_openBlock(), _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                _createElementVNode(
                  "h2",
                  _hoisted_2,
                  _toDisplayString(__props.title),
                  1
                  /* TEXT */
                ),
                _createElementVNode("div", _hoisted_3, [
                  _renderSlot(_ctx.$slots, "secondary-actions"),
                  _renderSlot(_ctx.$slots, "primary-action"),
                  _renderSlot(_ctx.$slots, "additional-actions")
                ])
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (_openBlock(), _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createElementVNode("div", _hoisted_4, [
                  _renderSlot(_ctx.$slots, "primary-action"),
                  _renderSlot(_ctx.$slots, "secondary-actions"),
                  _ctx.$slots.search ? (_openBlock(), _createElementBlock("div", _hoisted_5, [
                    _renderSlot(_ctx.$slots, "search")
                  ])) : _createCommentVNode("v-if", true),
                  __props.showAdvancedFilter ? (_openBlock(), _createBlock(WorkbenchButton, {
                    key: 1,
                    class: "wb-data-toolbar__advanced-trigger",
                    appearance: "text",
                    size: "32",
                    "aria-expanded": String(__props.advancedFilterExpanded),
                    "aria-controls": advancedFilterId,
                    onClick: toggleAdvancedFilter
                  }, {
                    default: _withCtx(() => [
                      _cache[4] || (_cache[4] = _createTextVNode(
                        " \u9AD8\u7EA7\u7B5B\u9009 ",
                        -1
                        /* CACHED */
                      )),
                      __props.filterTags.length ? (_openBlock(), _createBlock(WorkbenchBadge, {
                        key: 0,
                        class: "wb-data-toolbar__filter-count",
                        variant: "number",
                        placement: "inline",
                        value: __props.filterTags.length,
                        "aria-label": `\u5DF2\u751F\u6548 ${__props.filterTags.length} \u4E2A\u7B5B\u9009\u6761\u4EF6`
                      }, null, 8, ["value", "aria-label"])) : _createCommentVNode("v-if", true),
                      _createVNode(WorkbenchIcon, {
                        class: _normalizeClass(["wb-disclosure-icon", { "is-expanded": __props.advancedFilterExpanded }]),
                        name: "\u7BAD\u5934/\u65B9\u5411=\u4E0B\u7BAD\u5934_14px"
                      }, null, 8, ["class"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["aria-expanded"])) : _createCommentVNode("v-if", true)
                ]),
                __props.variant === "complex" ? (_openBlock(), _createElementBlock("div", _hoisted_6, [
                  __props.showViewSwitch ? (_openBlock(), _createBlock(WorkbenchButtonRadioGroup, {
                    key: 0,
                    class: "wb-data-toolbar__view-switch",
                    "model-value": __props.viewMode,
                    items: _unref(viewItems),
                    "aria-label": "\u6570\u636E\u89C6\u56FE",
                    "onUpdate:modelValue": changeView
                  }, {
                    item: _withCtx(({ item }) => [
                      _createVNode(WorkbenchIcon, {
                        class: "wb-data-toolbar__view-icon",
                        name: item.icon
                      }, null, 8, ["name"]),
                      _createElementVNode(
                        "span",
                        _hoisted_7,
                        _toDisplayString(item.label),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["model-value", "items"])) : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_8, [
                    _createVNode(WorkbenchTooltip, { content: "\u5237\u65B0" }, {
                      trigger: _withCtx(({ aria }) => [
                        _createElementVNode("button", _mergeProps({
                          class: "wb-data-toolbar__utility-button",
                          type: "button",
                          "aria-label": "\u5237\u65B0",
                          disabled: __props.refreshing
                        }, aria, {
                          onClick: _cache[0] || (_cache[0] = ($event) => emit("refresh"))
                        }), [
                          _createVNode(WorkbenchIcon, {
                            class: "wb-data-toolbar__utility-icon",
                            name: "\u5237\u65B0_14px"
                          })
                        ], 16, _hoisted_9)
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    _createVNode(WorkbenchTooltip, { content: "\u8BBE\u7F6E" }, {
                      trigger: _withCtx(({ aria }) => [
                        _createElementVNode(
                          "button",
                          _mergeProps({
                            class: "wb-data-toolbar__utility-button",
                            type: "button",
                            "aria-label": "\u8BBE\u7F6E"
                          }, aria, {
                            onClick: _cache[1] || (_cache[1] = ($event) => emit("settings"))
                          }),
                          [
                            _createVNode(WorkbenchIcon, {
                              class: "wb-data-toolbar__utility-icon",
                              name: "/ic_public_setting_line_14px"
                            })
                          ],
                          16
                          /* FULL_PROPS */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    _createVNode(WorkbenchTooltip, {
                      content: __props.fullscreen ? "\u9000\u51FA\u5168\u5C4F" : "\u5168\u5C4F"
                    }, {
                      trigger: _withCtx(({ aria }) => [
                        _createElementVNode("button", _mergeProps({
                          class: "wb-data-toolbar__utility-button",
                          type: "button",
                          "aria-label": __props.fullscreen ? "\u9000\u51FA\u5168\u5C4F" : "\u5168\u5C4F",
                          "aria-pressed": __props.fullscreen
                        }, aria, {
                          onClick: _cache[2] || (_cache[2] = ($event) => emit("fullscreen-change", !__props.fullscreen))
                        }), [
                          _createVNode(WorkbenchIcon, {
                            class: "wb-data-toolbar__utility-icon",
                            name: "\u5168\u5C4F_14px"
                          })
                        ], 16, _hoisted_10)
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["content"])
                  ]),
                  _renderSlot(_ctx.$slots, "additional-actions")
                ])) : _ctx.$slots["additional-actions"] ? (_openBlock(), _createElementBlock("div", _hoisted_11, [
                  _renderSlot(_ctx.$slots, "additional-actions")
                ])) : _createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          __props.variant !== "title" && __props.showAdvancedFilter && __props.advancedFilterExpanded ? (_openBlock(), _createElementBlock("div", {
            key: 0,
            id: advancedFilterId,
            class: "wb-data-toolbar__advanced",
            "aria-label": "\u9AD8\u7EA7\u7B5B\u9009\u8868\u5355"
          }, [
            _createElementVNode("div", _hoisted_12, [
              _renderSlot(_ctx.$slots, "advanced-filter-form")
            ]),
            _createElementVNode("div", _hoisted_13, [
              _createVNode(WorkbenchButton, {
                appearance: "secondary",
                size: "32",
                onClick: cancelFilter
              }, {
                default: _withCtx(() => [..._cache[5] || (_cache[5] = [
                  _createTextVNode(
                    "\u53D6\u6D88",
                    -1
                    /* CACHED */
                  )
                ])]),
                _: 1
                /* STABLE */
              }),
              _createVNode(WorkbenchButton, {
                size: "32",
                onClick: confirmFilter
              }, {
                default: _withCtx(() => [..._cache[6] || (_cache[6] = [
                  _createTextVNode(
                    "\u786E\u5B9A",
                    -1
                    /* CACHED */
                  )
                ])]),
                _: 1
                /* STABLE */
              })
            ])
          ])) : _createCommentVNode("v-if", true),
          __props.variant !== "title" && __props.filterTags.length ? (_openBlock(), _createElementBlock("div", _hoisted_14, [
            __props.filterResultText ? (_openBlock(), _createElementBlock(
              "span",
              _hoisted_15,
              _toDisplayString(__props.filterResultText),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            _cache[8] || (_cache[8] = _createElementVNode(
              "span",
              { class: "wb-data-toolbar__applied-label" },
              "\u7B5B\u9009\u6761\u4EF6\uFF1A",
              -1
              /* CACHED */
            )),
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(__props.filterTags, (tag) => {
                return _openBlock(), _createBlock(WorkbenchTag, {
                  key: tag.key,
                  label: tag.label,
                  variant: "basic",
                  size: "medium",
                  action: "remove",
                  disabled: tag.disabled,
                  onRemove: ($event) => emit("filter-remove", tag)
                }, null, 8, ["label", "disabled", "onRemove"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            _createVNode(WorkbenchButton, {
              class: "wb-data-toolbar__reset",
              appearance: "text",
              size: "28",
              onClick: _cache[3] || (_cache[3] = ($event) => emit("filter-reset"))
            }, {
              icon: _withCtx(() => [
                _createVNode(WorkbenchIcon, { name: "\u5237\u65B0_14px" })
              ]),
              default: _withCtx(() => [
                _cache[7] || (_cache[7] = _createTextVNode(
                  " \u91CD\u7F6E ",
                  -1
                  /* CACHED */
                ))
              ]),
              _: 1
              /* STABLE */
            })
          ])) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-b720481f" });
