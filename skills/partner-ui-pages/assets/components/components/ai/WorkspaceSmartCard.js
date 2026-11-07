import { defineComponent as _defineComponent } from "vue";
import { createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, renderList as _renderList, Fragment as _Fragment, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, unref as _unref, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = { class: "workspace-smart-card__header" };
const _hoisted_3 = { class: "workspace-smart-card__title" };
const _hoisted_4 = {
  key: 1,
  class: "workspace-smart-card__list"
};
const _hoisted_5 = {
  class: "workspace-smart-card__number",
  "aria-hidden": "true"
};
const _hoisted_6 = { class: "workspace-smart-card__sentence" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = {
  key: 2,
  class: "workspace-smart-card__footer"
};
import { computed } from "vue";
import { localIcons } from "../assets/ai-icons/localIcons";
import WorkspaceSmartIcon from "./WorkspaceSmartIcon.vue";
import WorkspaceSmartTag from "./WorkspaceSmartTag.vue";
import { intelligenceSentence } from "./workspaceIntelligence";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkspaceSmartCard",
  props: {
    title: {},
    items: {},
    variant: { default: "outlined" },
    tag: { default: void 0 },
    logo: { default: void 0 }
  },
  emits: ["navigate", "activate"],
  setup(__props) {
    const SmartActionArrow = localIcons.smartActionRight;
    const props = __props;
    const sentences = computed(() => props.items.map((item) => ({ ...item, fragments: intelligenceSentence(item.fragments) })));
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", {
        class: _normalizeClass(["workspace-smart-card", `workspace-smart-card--${__props.variant}`]),
        "aria-label": __props.title
      }, [
        _createElementVNode("header", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, [
            _createVNode(WorkspaceSmartIcon, { logo: __props.logo }, null, 8, ["logo"]),
            _createElementVNode(
              "h3",
              null,
              _toDisplayString(__props.title),
              1
              /* TEXT */
            )
          ]),
          __props.tag ? (_openBlock(), _createBlock(WorkspaceSmartTag, {
            key: 0,
            fragments: __props.tag.fragments,
            logo: __props.logo,
            onActivate: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("activate"))
          }, null, 8, ["fragments", "logo"])) : _createCommentVNode("v-if", true)
        ]),
        _ctx.$slots.body ? _renderSlot(_ctx.$slots, "body", {}, void 0, void 0, 0) : (_openBlock(), _createElementBlock("ol", _hoisted_4, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(sentences.value, (item, index) => {
              return _openBlock(), _createElementBlock("li", {
                key: item.id,
                class: "workspace-smart-card__item"
              }, [
                _createElementVNode(
                  "span",
                  _hoisted_5,
                  _toDisplayString(index + 1),
                  1
                  /* TEXT */
                ),
                _createElementVNode("p", _hoisted_6, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(item.fragments, (fragment, fragmentIndex) => {
                      return _openBlock(), _createElementBlock(
                        "span",
                        {
                          key: fragmentIndex,
                          class: _normalizeClass(["intelligence-fragment", fragment.emphasis && `intelligence-fragment--${fragment.emphasis}`])
                        },
                        _toDisplayString(fragment.text),
                        3
                        /* TEXT, CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  _cache[1] || (_cache[1] = _createTextVNode(
                    "\uFF1B",
                    -1
                    /* CACHED */
                  )),
                  item.action ? (_openBlock(), _createElementBlock("button", {
                    key: 0,
                    type: "button",
                    role: "link",
                    class: "workspace-smart-card__action",
                    onClick: ($event) => _ctx.$emit("navigate", item.action.navigation)
                  }, [
                    _createTextVNode(
                      _toDisplayString(item.action.label),
                      1
                      /* TEXT */
                    ),
                    _createVNode(_unref(SmartActionArrow), {
                      "aria-hidden": "true",
                      focusable: "false"
                    })
                  ], 8, _hoisted_7)) : _createCommentVNode("v-if", true)
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])),
        _ctx.$slots.footer ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
          _renderSlot(_ctx.$slots, "footer")
        ])) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-792c8c2c" });
