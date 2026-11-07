import { renderSlot as _renderSlot, createVNode as _createVNode, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Fragment as _Fragment, withCtx as _withCtx, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["data-level", "data-size", "data-empty-type", "role", "aria-live", "aria-busy"];
const _hoisted_2 = {
  class: "wb-empty-state__illustration",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  key: 0,
  class: "wb-empty-state__title"
};
const _hoisted_4 = {
  key: 1,
  class: "wb-empty-state__description"
};
const _hoisted_5 = ["disabled"];
const _hoisted_6 = {
  key: 2,
  class: "wb-empty-state__actions"
};
import { computed } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchEmptyIcon from "../icons/empty/WorkbenchEmptyIcon.vue";
import { emptyStateContent } from "./emptyStateContent.js";
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchEmptyState",
  props: {
    type: {
      type: String,
      default: "no-data",
      validator: (value) => [
        "no-data",
        "no-results",
        "network-error",
        "load-failed",
        "forbidden",
        "removed",
        "expired",
        "coming-soon"
      ].includes(value)
    },
    level: {
      type: String,
      default: "card",
      validator: (value) => ["local", "card", "page"].includes(value)
    },
    size: {
      type: String,
      default: "auto",
      validator: (value) => ["auto", "small", "default", "large"].includes(value)
    },
    locale: {
      type: String,
      default: "zh-CN",
      validator: (value) => ["zh-CN", "en-US"].includes(value)
    },
    title: { type: String, default: "" },
    description: { type: String, default: void 0 },
    primaryText: { type: String, default: "" },
    secondaryText: { type: String, default: "" },
    retry: { type: Boolean, default: true },
    busy: { type: Boolean, default: false },
    live: { type: String, default: "off", validator: (value) => ["off", "polite"].includes(value) }
  },
  emits: ["retry", "primary", "secondary"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const content = computed(() => emptyStateContent[props.locale] ?? emptyStateContent["zh-CN"]);
    const resolvedSize = computed(
      () => props.size === "auto" ? props.level === "page" ? "large" : "default" : props.size
    );
    const iconSize = computed(() => ({ small: 64, default: 120, large: 240 })[resolvedSize.value]);
    const buttonSize = computed(
      () => ({ small: "28", default: "32", large: "36" })[resolvedSize.value]
    );
    const retryable = computed(() => ["network-error", "load-failed"].includes(props.type));
    const descriptionText = computed(() => {
      if (props.description !== void 0) return props.description;
      const value = content.value[props.type] ?? content.value["no-data"];
      return retryable.value && !props.retry ? value.replace(/[，,]\s*$/, "") : value;
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", {
        class: "wb-empty-state",
        "data-level": __props.level,
        "data-size": resolvedSize.value,
        "data-empty-type": __props.type,
        role: __props.live === "polite" ? "status" : void 0,
        "aria-live": __props.live,
        "aria-busy": __props.busy || void 0
      }, [
        __props.level !== "local" ? (_openBlock(), _createElementBlock(
          _Fragment,
          { key: 0 },
          [
            _createElementVNode("div", _hoisted_2, [
              _renderSlot(_ctx.$slots, "illustration", {
                type: __props.type,
                size: iconSize.value
              }, () => [
                _createVNode(WorkbenchEmptyIcon, {
                  type: __props.type,
                  size: iconSize.value
                }, null, 8, ["type", "size"])
              ])
            ]),
            __props.title || _ctx.$slots.title ? (_openBlock(), _createElementBlock("p", _hoisted_3, [
              _renderSlot(_ctx.$slots, "title", {}, () => [
                _createTextVNode(
                  _toDisplayString(__props.title),
                  1
                  /* TEXT */
                )
              ])
            ])) : _createCommentVNode("v-if", true)
          ],
          64
          /* STABLE_FRAGMENT */
        )) : _createCommentVNode("v-if", true),
        descriptionText.value || _ctx.$slots.description ? (_openBlock(), _createElementBlock("p", _hoisted_4, [
          _renderSlot(_ctx.$slots, "description", { type: __props.type }, () => [
            _createTextVNode(
              _toDisplayString(descriptionText.value),
              1
              /* TEXT */
            ),
            retryable.value && __props.retry && __props.description === void 0 ? (_openBlock(), _createElementBlock("button", {
              key: 0,
              class: "wb-empty-state__retry",
              type: "button",
              disabled: __props.busy,
              onClick: _cache[0] || (_cache[0] = ($event) => emit("retry", __props.type))
            }, _toDisplayString(content.value.retry), 9, _hoisted_5)) : _createCommentVNode("v-if", true)
          ])
        ])) : _createCommentVNode("v-if", true),
        __props.level !== "local" && (__props.primaryText || __props.secondaryText || _ctx.$slots.actions) ? (_openBlock(), _createElementBlock("div", _hoisted_6, [
          _renderSlot(_ctx.$slots, "actions", {
            size: buttonSize.value,
            busy: __props.busy
          }, () => [
            __props.secondaryText ? (_openBlock(), _createBlock(WorkbenchButton, {
              key: 0,
              appearance: "secondary",
              size: buttonSize.value,
              disabled: __props.busy,
              onClick: _cache[1] || (_cache[1] = ($event) => emit("secondary", $event))
            }, {
              default: _withCtx(() => [
                _createTextVNode(
                  _toDisplayString(__props.secondaryText),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["size", "disabled"])) : _createCommentVNode("v-if", true),
            __props.primaryText ? (_openBlock(), _createBlock(WorkbenchButton, {
              key: 1,
              size: buttonSize.value,
              disabled: __props.busy,
              onClick: _cache[2] || (_cache[2] = ($event) => emit("primary", $event))
            }, {
              default: _withCtx(() => [
                _createTextVNode(
                  _toDisplayString(__props.primaryText),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["size", "disabled"])) : _createCommentVNode("v-if", true)
          ])
        ])) : _createCommentVNode("v-if", true)
      ], 8, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-5268d809" });
