import { normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["role", "aria-live", "aria-label", "aria-hidden"];
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchSkeletonBlock",
  props: {
    radius: { type: String, default: "sm", validator: (value) => ["sm", "lg"].includes(value) },
    animated: { type: Boolean, default: true },
    label: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const resolvedRadius = computed(() => ["sm", "lg"].includes(props.radius) ? props.radius : "sm");
    const statusLabel = computed(() => props.label.trim());
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("span", {
        class: _normalizeClass(["wb-skeleton-block", [
          `wb-skeleton-block--radius-${resolvedRadius.value}`,
          { "is-animated": __props.animated, "is-announced": Boolean(statusLabel.value) }
        ]]),
        role: statusLabel.value ? "status" : void 0,
        "aria-live": statusLabel.value ? "polite" : void 0,
        "aria-label": statusLabel.value || void 0,
        "aria-hidden": statusLabel.value ? void 0 : "true"
      }, null, 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
