import { openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = ["role", "aria-live", "aria-label", "aria-hidden"];
const _hoisted_2 = { class: "wb-skeleton__copy" };
const _hoisted_3 = { class: "wb-skeleton__lines" };
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed } from "vue";
import WorkbenchSkeletonBlock from "./WorkbenchSkeletonBlock.vue";
const __sfc_main__ = {
  __name: "WorkbenchSkeleton",
  props: {
    variant: { type: String, default: "title-text", validator: (value) => ["title-text", "text", "media-text", "item-text", "hero-text"].includes(value) },
    showTitle: { type: Boolean, default: true },
    lines: { type: Number, default: 3, validator: (value) => Number.isInteger(value) && value >= 1 && value <= 5 },
    animated: { type: Boolean, default: true },
    label: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const resolvedVariant = computed(() => ["title-text", "text", "media-text", "item-text", "hero-text"].includes(props.variant) ? props.variant : "title-text");
    const textLines = computed(() => Array.from({ length: Number.isFinite(props.lines) ? Math.min(5, Math.max(1, Math.floor(props.lines))) : 3 }, (_, index) => index));
    const statusLabel = computed(() => props.label.trim());
    const showResolvedTitle = computed(() => props.showTitle && resolvedVariant.value !== "text");
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("article", {
        class: _normalizeClass(["wb-skeleton", [`wb-skeleton--${resolvedVariant.value}`, { "is-announced": Boolean(statusLabel.value) }]]),
        role: statusLabel.value ? "status" : void 0,
        "aria-live": statusLabel.value ? "polite" : void 0,
        "aria-label": statusLabel.value || void 0,
        "aria-hidden": statusLabel.value ? void 0 : "true"
      }, [
        resolvedVariant.value === "hero-text" ? (_openBlock(), _createBlock(WorkbenchSkeletonBlock, {
          key: 0,
          class: "wb-skeleton__hero",
          radius: "lg",
          animated: __props.animated
        }, null, 8, ["animated"])) : _createCommentVNode("v-if", true),
        resolvedVariant.value === "media-text" ? (_openBlock(), _createBlock(WorkbenchSkeletonBlock, {
          key: 1,
          class: "wb-skeleton__media",
          radius: "lg",
          animated: __props.animated
        }, null, 8, ["animated"])) : _createCommentVNode("v-if", true),
        resolvedVariant.value === "item-text" ? (_openBlock(), _createBlock(WorkbenchSkeletonBlock, {
          key: 2,
          class: "wb-skeleton__item-icon",
          animated: __props.animated
        }, null, 8, ["animated"])) : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_2, [
          showResolvedTitle.value ? (_openBlock(), _createBlock(WorkbenchSkeletonBlock, {
            key: 0,
            class: "wb-skeleton__title",
            animated: __props.animated
          }, null, 8, ["animated"])) : _createCommentVNode("v-if", true),
          _createElementVNode("div", _hoisted_3, [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(textLines.value, (line) => {
                return _openBlock(), _createBlock(WorkbenchSkeletonBlock, {
                  key: line,
                  class: _normalizeClass(["wb-skeleton__line", { "is-last": line === textLines.value.length - 1 }]),
                  animated: __props.animated
                }, null, 8, ["class", "animated"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ])
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
