import { unref as _unref, renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createBlock as _createBlock, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["disabled", "aria-label"];
const _hoisted_2 = {
  key: 0,
  class: "wb-button__icon wb-button__icon--filled",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  key: 1,
  class: "wb-button__icon wb-button__icon--action",
  "aria-hidden": "true"
};
const _hoisted_4 = {
  key: 2,
  class: "wb-button__label wb-inline-label"
};
import { useFormDisabled } from "../form/useFormDisabled.js";
import { computed, useAttrs, useSlots } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import "../../../../catalog/generated/asset.tokens.css";
import "../layout/inline-label.css";
const __sfc_main__ = {
  __name: "WorkbenchButton",
  props: {
    appearance: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary", "text", "icon"].includes(value)
    },
    variant: {
      type: String,
      default: "default",
      validator: (value) => ["default", "dashed"].includes(value)
    },
    size: {
      type: String,
      default: "32"
    },
    textLayout: {
      type: String,
      default: "container",
      validator: (value) => ["inline", "container"].includes(value)
    },
    iconLayout: {
      type: String,
      default: "inline",
      validator: (value) => ["inline", "container"].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    intent: {
      type: String,
      default: "action",
      validator: (value) => ["action", "drilldown"].includes(value)
    },
    drilldown: {
      type: String,
      default: "more",
      validator: (value) => ["more", "expand", "collapse"].includes(value)
    },
    ariaLabel: {
      type: String,
      default: ""
    },
    previewState: {
      type: String,
      default: "default"
    }
  },
  setup(__props) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const slots = useSlots();
    const attrs = useAttrs();
    function arrowRotation() {
      if (attrs["aria-expanded"] !== void 0) {
        return attrs["aria-expanded"] === true || attrs["aria-expanded"] === "true" ? "-90deg" : "90deg";
      }
      return props.drilldown === "collapse" ? "-90deg" : props.drilldown === "expand" ? "90deg" : "0deg";
    }
    const isIconButton = computed(() => props.appearance === "icon");
    const isDrilldown = computed(() => props.appearance === "text" && props.intent === "drilldown");
    const hasDisclosureArrow = computed(
      () => ["text", "secondary"].includes(props.appearance) && props.intent === "drilldown"
    );
    function allowsLeadingIcon() {
      return ["primary", "secondary"].includes(props.appearance) && Boolean(slots.icon);
    }
    const buttonLabel = computed(() => isIconButton.value ? props.ariaLabel : void 0);
    const resolvedSize = computed(() => {
      const allowedSizes = props.appearance === "icon" ? ["32", "24"] : props.appearance === "text" ? ["32", "28"] : ["36", "32", "28"];
      return allowedSizes.includes(props.size) ? props.size : "32";
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("button", {
        class: _normalizeClass(["wb-button", [
          `wb-button--${__props.appearance}`,
          { "wb-button--dashed": __props.appearance === "secondary" && __props.variant === "dashed" },
          `wb-button--size-${resolvedSize.value}`,
          `is-${__props.previewState}`,
          { "wb-button--text-inline": __props.appearance === "text" && __props.textLayout === "inline" },
          { "wb-button--icon-inline": __props.appearance === "icon" && __props.iconLayout === "inline" },
          { "wb-button--drilldown": isDrilldown.value },
          { "wb-button--with-arrow": hasDisclosureArrow.value || __props.appearance === "text" && _ctx.$slots.icon }
        ]]),
        type: "button",
        disabled: _unref(disabled) || __props.previewState === "disabled",
        "aria-label": buttonLabel.value
      }, [
        allowsLeadingIcon() ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
          _renderSlot(_ctx.$slots, "icon")
        ])) : _createCommentVNode("v-if", true),
        isIconButton.value ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
          _renderSlot(_ctx.$slots, "icon")
        ])) : (_openBlock(), _createElementBlock("span", _hoisted_4, [
          _renderSlot(_ctx.$slots, "default")
        ])),
        hasDisclosureArrow.value || __props.appearance === "text" && _ctx.$slots.icon ? (_openBlock(), _createElementBlock(
          "span",
          {
            key: 3,
            class: _normalizeClass(["wb-button__icon wb-button__icon--trailing", {
              "is-arrow-up": arrowRotation() === "-90deg",
              "is-arrow-down": arrowRotation() === "90deg"
            }]),
            "aria-hidden": "true"
          },
          [
            hasDisclosureArrow.value ? (_openBlock(), _createBlock(WorkbenchIcon, {
              key: 0,
              name: "/ic_arrow_right_line#2:141",
              size: 10
            })) : _renderSlot(_ctx.$slots, "icon", {}, void 0, void 0, 1)
          ],
          2
          /* CLASS */
        )) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
