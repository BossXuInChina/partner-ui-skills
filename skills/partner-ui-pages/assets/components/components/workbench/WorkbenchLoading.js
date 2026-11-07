import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["role", "aria-live", "aria-label", "aria-hidden"];
const _hoisted_2 = ["viewBox"];
const _hoisted_3 = ["cx", "cy", "r"];
const _hoisted_4 = { class: "wb-loading__phase" };
const _hoisted_5 = { class: "wb-loading__spin" };
const _hoisted_6 = ["cx", "cy", "r", "stroke-width"];
const _hoisted_7 = {
  key: 0,
  class: "wb-loading__sr-only"
};
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchLoading",
  props: {
    size: {
      type: Number,
      default: 20,
      validator: (value) => [64, 48, 24, 20, 14, 12].includes(value)
    },
    inverse: { type: Boolean, default: false },
    label: { type: String, default: "" },
    ariaLabel: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const resolvedSize = computed(
      () => [64, 48, 24, 20, 14, 12].includes(props.size) ? props.size : 20
    );
    const dotSize = computed(() => resolvedSize.value / 8);
    const center = computed(() => resolvedSize.value / 2);
    const radius = computed(() => center.value - dotSize.value / 2);
    const dots = computed(
      () => Array.from({ length: 8 }, (_, index) => {
        const angle = index * Math.PI / 4;
        return {
          x: center.value + radius.value * Math.sin(angle),
          y: center.value - radius.value * Math.cos(angle)
        };
      })
    );
    const statusLabel = computed(() => props.label || props.ariaLabel);
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("span", {
        class: _normalizeClass(["wb-loading", [
          `wb-loading--size-${resolvedSize.value}`,
          { "wb-loading--inverse": __props.inverse, "wb-loading--announced": Boolean(statusLabel.value) }
        ]]),
        role: statusLabel.value ? "status" : void 0,
        "aria-live": statusLabel.value ? "polite" : void 0,
        "aria-label": statusLabel.value || void 0,
        "aria-hidden": statusLabel.value ? void 0 : "true"
      }, [
        (_openBlock(), _createElementBlock("svg", {
          class: "wb-loading__svg",
          viewBox: `0 0 ${resolvedSize.value} ${resolvedSize.value}`,
          "aria-hidden": "true"
        }, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(dots.value, (dot, index) => {
              return _openBlock(), _createElementBlock("circle", {
                key: index,
                class: "wb-loading__dot",
                cx: dot.x,
                cy: dot.y,
                r: dotSize.value / 2
              }, null, 8, _hoisted_3);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          _createElementVNode("g", _hoisted_4, [
            _createElementVNode("g", _hoisted_5, [
              _createElementVNode("circle", {
                class: "wb-loading__arc",
                cx: center.value,
                cy: center.value,
                r: radius.value,
                pathLength: "100",
                fill: "none",
                "stroke-width": dotSize.value
              }, null, 8, _hoisted_6)
            ])
          ])
        ], 8, _hoisted_2)),
        statusLabel.value ? (_openBlock(), _createElementBlock(
          "span",
          _hoisted_7,
          _toDisplayString(statusLabel.value),
          1
          /* TEXT */
        )) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
