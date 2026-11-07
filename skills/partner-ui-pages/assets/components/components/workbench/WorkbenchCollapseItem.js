import { useModel as _useModel, mergeModels as _mergeModels } from "vue";
import { normalizeClass as _normalizeClass, createVNode as _createVNode, createElementVNode as _createElementVNode, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString } from "vue";
const _hoisted_1 = { class: "wb-collapse-item__header" };
const _hoisted_2 = ["aria-expanded", "aria-controls", "aria-disabled", "disabled"];
const _hoisted_3 = {
  class: "wb-collapse-item__arrow",
  "aria-hidden": "true"
};
const _hoisted_4 = { class: "wb-collapse-item__title-group" };
const _hoisted_5 = {
  key: 0,
  class: "wb-collapse-item__title-icon",
  "aria-hidden": "true"
};
const _hoisted_6 = ["title"];
const _hoisted_7 = ["disabled"];
import "../shared/disclosure-motion.css";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import { inject, provide, useId } from "vue";
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchCollapseItem",
  props: /* @__PURE__ */ _mergeModels({
    title: { type: String, required: true },
    showIcon: { type: Boolean, default: false },
    actionLabel: { type: String, default: "" },
    actionDisabled: { type: Boolean, default: false }
  }, {
    "modelValue": { type: Boolean, default: false },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ _mergeModels(["action"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const expanded = _useModel(__props, "modelValue");
    const nestingDepth = inject("wb-collapse-nesting-depth", 0);
    const canExpand = nestingDepth < 2;
    provide("wb-collapse-nesting-depth", nestingDepth + 1);
    const id = useId();
    const triggerId = `${id}-trigger`;
    const titleId = `${id}-title`;
    const contentId = `${id}-content`;
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "section",
        {
          class: _normalizeClass(["wb-collapse-item", { "is-expanded": expanded.value }])
        },
        [
          _createElementVNode("div", _hoisted_1, [
            _createElementVNode("button", {
              id: triggerId,
              type: "button",
              class: "wb-collapse-item__trigger",
              "aria-expanded": expanded.value,
              "aria-controls": expanded.value ? contentId : void 0,
              "aria-disabled": !canExpand || void 0,
              disabled: !canExpand,
              onClick: _cache[0] || (_cache[0] = ($event) => canExpand && (expanded.value = !expanded.value))
            }, [
              _createElementVNode("span", _hoisted_3, [
                _createVNode(WorkbenchIcon, {
                  name: "/ic_arrow_right_line#2:142",
                  class: _normalizeClass(["wb-disclosure-icon wb-disclosure-icon--branch", { "is-expanded": expanded.value }]),
                  size: 8
                }, null, 8, ["class"])
              ]),
              _createElementVNode("span", _hoisted_4, [
                __props.showIcon || _ctx.$slots.icon ? (_openBlock(), _createElementBlock("span", _hoisted_5, [
                  _renderSlot(_ctx.$slots, "icon", {}, () => [
                    _createVNode(WorkbenchIcon, { name: "\u6587\u4EF6\u5939_14px" })
                  ])
                ])) : _createCommentVNode("v-if", true),
                _createElementVNode("span", {
                  id: titleId,
                  class: "wb-collapse-item__title",
                  title: __props.title
                }, _toDisplayString(__props.title), 9, _hoisted_6)
              ])
            ], 8, _hoisted_2),
            __props.actionLabel ? (_openBlock(), _createElementBlock("button", {
              key: 0,
              type: "button",
              class: "wb-collapse-item__action",
              disabled: __props.actionDisabled,
              onClick: _cache[1] || (_cache[1] = ($event) => emit("action"))
            }, _toDisplayString(__props.actionLabel), 9, _hoisted_7)) : _createCommentVNode("v-if", true)
          ]),
          expanded.value ? (_openBlock(), _createElementBlock("div", {
            key: 0,
            id: contentId,
            class: "wb-collapse-item__content",
            role: "region",
            "aria-labelledby": titleId
          }, [
            _renderSlot(_ctx.$slots, "default")
          ])) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
