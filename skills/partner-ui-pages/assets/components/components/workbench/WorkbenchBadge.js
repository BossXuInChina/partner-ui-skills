import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["role", "aria-label", "aria-hidden"];
const _hoisted_2 = {
  key: 0,
  class: "wb-badge__value",
  "aria-hidden": "true"
};
import { computed } from "vue";
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchBadge",
  props: {
    variant: {
      type: String,
      default: "dot",
      validator: (value) => ["dot", "number"].includes(value)
    },
    value: {
      type: Number,
      default: void 0,
      validator: (value) => Number.isInteger(value)
    },
    ariaLabel: { type: String, default: "" },
    hidden: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: "corner",
      validator: (value) => ["corner", "inline"].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const showBadge = computed(() => {
      if (props.hidden) return false;
      if (props.variant === "dot") return true;
      return Number.isInteger(props.value) && props.value > 0;
    });
    const displayValue = computed(() => props.value > 99 ? "99+" : String(props.value));
    const isSingleDigit = computed(() => props.variant === "number" && props.value > 0 && props.value < 10);
    const accessibleLabel = computed(() => props.ariaLabel || `${props.value} \u6761\u672A\u8BFB\u6D88\u606F`);
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "span",
        {
          class: _normalizeClass(["wb-badge", [`wb-badge--${__props.variant}`, `is-${__props.placement}`]])
        },
        [
          _renderSlot(_ctx.$slots, "default"),
          showBadge.value ? (_openBlock(), _createElementBlock("span", {
            key: 0,
            class: _normalizeClass(["wb-badge__mark", { "is-single-digit": isSingleDigit.value }]),
            role: __props.variant === "number" ? "status" : void 0,
            "aria-label": __props.variant === "number" ? accessibleLabel.value : void 0,
            "aria-hidden": __props.variant === "dot" ? "true" : void 0
          }, [
            __props.variant === "number" ? (_openBlock(), _createElementBlock(
              "span",
              _hoisted_2,
              _toDisplayString(displayValue.value),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true)
          ], 10, _hoisted_1)) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-ed62a59a" });
