import { unref as _unref, mergeProps as _mergeProps, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue";
const _hoisted_1 = ["data-icon-key", "data-icon-alias", "data-icon-error", "data-icon-loading", "data-icon-source-node", "src", "width", "height", "alt", "aria-hidden", "data-empty-type", "data-icon-size"];
import { computed, useAttrs, watchEffect } from "vue";
import { iconAttributes, reportIconError } from "../iconCore.js";
import { useIconAsset } from "../useIconAsset.js";
import { emptyAssets } from "../loaders/empty.js";
import { emptyIcons } from "../families/empty.js";
const __default__ = {
  inheritAttrs: false,
  emptyIconManifest: emptyIcons.manifest
};
const __sfc_main__ = /* @__PURE__ */ Object.assign(__default__, {
  __name: "WorkbenchEmptyIcon",
  props: {
    name: { type: String, default: "" },
    type: { type: String, default: "no-data" },
    size: { type: [Number, String], default: void 0 },
    label: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const attrs = useAttrs();
    const iconByName = new Map(
      emptyIcons.index.icons.flatMap((icon2) => [
        [icon2.key, icon2],
        [icon2.alias, icon2]
      ])
    );
    const nativeSize = (value) => {
      const match = String(value).match(/^(\d+(?:\.\d+)?)(?:px)?$/);
      return match && Number(match[1]) > 0 ? Number(match[1]) : null;
    };
    const resolution = computed(() => {
      if (props.name) {
        const named = iconByName.get(props.name);
        if (!named) return { icon: null, error: `EMPTY_ICON_NOT_FOUND: ${props.name}` };
        if (props.size !== void 0 && nativeSize(props.size) !== named.size) {
          return { icon: null, error: `EMPTY_ICON_SIZE_MISMATCH: ${props.name} (${props.size})` };
        }
        return { icon: named, error: null };
      }
      const requestedSize = props.size === void 0 ? 120 : nativeSize(props.size);
      const icon2 = emptyIcons.index.icons.find(
        (item) => item.type === props.type && item.size === requestedSize
      );
      return icon2 ? { icon: icon2, error: null } : { icon: null, error: `EMPTY_ICON_VARIANT_MISSING: ${props.type}/${props.size}` };
    });
    const icon = computed(() => resolution.value.icon);
    const sourceIcon = computed(() => {
      if (!icon.value || props.name || icon.value.type === "network-error") return icon.value;
      return emptyIcons.index.icons.find((item) => item.type === icon.value.type && item.size === 64);
    });
    const sourceNode = computed(
      () => emptyIcons.manifest.icons.find((item) => item.key === icon.value?.key)?.nodeId
    );
    const {
      source,
      error: assetError,
      status: assetStatus
    } = useIconAsset(
      computed(() => sourceIcon.value?.assetFile),
      emptyAssets
    );
    const error = computed(() => resolution.value.error || assetError.value);
    watchEffect(() => reportIconError(error.value));
    return (_ctx, _cache) => {
      return icon.value ? (_openBlock(), _createElementBlock("img", _mergeProps({
        key: 0,
        class: "workbench-empty-icon"
      }, _unref(iconAttributes)(_unref(attrs)), {
        "data-icon-key": icon.value?.key,
        "data-icon-alias": icon.value?.alias,
        "data-icon-error": error.value || void 0,
        "data-icon-loading": _unref(assetStatus) === "loading" ? "true" : void 0,
        "data-icon-source-node": sourceNode.value,
        src: _unref(source) || void 0,
        width: icon.value?.size,
        height: icon.value?.size,
        alt: __props.label,
        "aria-hidden": __props.label ? void 0 : "true",
        "data-empty-type": icon.value?.type,
        "data-icon-size": icon.value?.size,
        draggable: "false"
      }), null, 16, _hoisted_1)) : _createCommentVNode("v-if", true);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-e88e3a2c" });
