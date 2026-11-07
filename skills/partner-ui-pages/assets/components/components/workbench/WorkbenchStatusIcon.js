import { unref as _unref, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["data-icon-key", "data-icon-alias", "data-icon-native", "data-icon-error", "data-icon-loading", "role", "aria-label", "aria-hidden", "innerHTML"];
import { computed, useId, watchEffect } from "vue";
import { nativeIconStyle, nativeSvgStyle, reportIconError } from "./iconCore.js";
import { useIconAsset } from "./useIconAsset.js";
import { statusAssets } from "./loaders/status.js";
import { statusIcons } from "./families/status.js";
const __default__ = { inheritAttrs: false, iconManifest: statusIcons.manifest };
const __sfc_main__ = /* @__PURE__ */ Object.assign(__default__, {
  __name: "WorkbenchStatusIcon",
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: void 0 },
    label: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const resolution = computed(() => statusIcons.resolve(props.name, props.size, "status"));
    const icon = computed(() => resolution.value.icon);
    const {
      source: assetSource,
      error: assetError,
      status: assetStatus
    } = useIconAsset(
      computed(() => icon.value?.assetFile),
      statusAssets
    );
    const error = computed(() => resolution.value.error || assetError.value);
    watchEffect(() => reportIconError(error.value));
    const prefix = `wb-status-${useId().replace(/[^a-zA-Z0-9_-]/g, "_")}-`;
    const markup = computed(() => {
      const source = assetSource.value;
      if (!source) return "";
      const ids = /* @__PURE__ */ new Map();
      for (const match of source.matchAll(/\bid="([^"]+)"/g)) {
        if (!ids.has(match[1])) ids.set(match[1], `${prefix}${ids.size}`);
      }
      return source.replace(/\bid="([^"]+)"/g, (match, id) => `id="${ids.get(id)}"`).replace(/url\(#([^)]+)\)/g, (match, id) => `url(#${ids.get(id) ?? id})`).replace(
        /((?:xlink:)?href=")#([^"]+)"/g,
        (match, attribute, id) => `${attribute}#${ids.get(id) ?? id}"`
      );
    });
    const dimensions = computed(() => ({
      ...nativeIconStyle(icon.value),
      ...nativeSvgStyle(icon.value)
    }));
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("span", {
        class: "workbench-status-icon",
        "data-icon-key": icon.value?.key,
        "data-icon-alias": icon.value?.alias,
        "data-icon-native": icon.value ? `${icon.value.native.width}x${icon.value.native.height}` : void 0,
        "data-icon-error": error.value || void 0,
        "data-icon-loading": _unref(assetStatus) === "loading" ? "true" : void 0,
        style: _normalizeStyle(dimensions.value),
        role: __props.label ? "img" : void 0,
        "aria-label": __props.label || void 0,
        "aria-hidden": __props.label ? void 0 : "true",
        innerHTML: markup.value
      }, null, 12, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-a8222e56" });
