import { unref as _unref, mergeProps as _mergeProps, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["data-icon-key", "data-icon-alias", "data-icon-replaced-key", "data-icon-native", "data-icon-error", "data-icon-loading", "role", "aria-label", "aria-hidden", "innerHTML"];
import { computed, useId, useAttrs, watchEffect } from "vue";
import { nativeIconStyle, nativeSvgStyle, iconAttributes, reportIconError } from "./iconCore.js";
import { useIconAsset } from "./useIconAsset.js";
import { systemAssets } from "./loaders/system.js";
import { systemIcons } from "./families/system.js";
const __default__ = { inheritAttrs: false, iconManifest: systemIcons.manifest };
const __sfc_main__ = /* @__PURE__ */ Object.assign(__default__, {
  __name: "WorkbenchIcon",
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: void 0 },
    color: { type: String, default: "currentColor" },
    // A hard color boundary within a monochrome icon; geometry is left untouched.
    colorSplit: { type: Object, default: null },
    label: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const attrs = useAttrs();
    const resolution = computed(() => systemIcons.resolve(props.name, props.size));
    const icon = computed(() => resolution.value.icon);
    const {
      source: assetSource,
      error: assetError,
      status: assetStatus
    } = useIconAsset(
      computed(() => icon.value?.assetFile),
      systemAssets
    );
    const error = computed(() => resolution.value.error || assetError.value);
    watchEffect(() => reportIconError(error.value));
    const split = computed(
      () => props.colorSplit && icon.value?.colorMode === "monochrome" ? { ...props.colorSplit, ratio: Math.max(0, Math.min(1, Number(props.colorSplit.ratio) || 0)) } : null
    );
    const prefix = `wb-icon-${useId().replace(/[^a-zA-Z0-9_-]/g, "_")}-`;
    const markup = computed(() => {
      const source = assetSource.value;
      if (!source) return "";
      const viewBox = source.match(/<svg\b[^>]*\bviewBox="([^"]+)"/i)?.[1]?.trim().split(/[\s,]+/).map(Number);
      const drawableSource = source.replace(/<rect\b([^>]*)\/>/gi, (rect, attributes) => {
        const values = Object.fromEntries(
          [...attributes.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], match[2]])
        );
        const isCanvasRect = viewBox?.length === 4 && Math.abs(Number(values.x ?? 0) - viewBox[0]) < 0.02 && Math.abs(Number(values.y ?? 0) - viewBox[1]) < 0.02 && Math.abs(Number(values.width) - viewBox[2]) < 0.02 && Math.abs(Number(values.height) - viewBox[3]) < 0.02 && (!values.fill || values.fill === "none" || values.opacity === "0");
        return isCanvasRect ? "" : rect;
      });
      const ids = /* @__PURE__ */ new Map();
      for (const match of drawableSource.matchAll(/\bid="([^"]+)"/g)) {
        if (!ids.has(match[1])) ids.set(match[1], `${prefix}${ids.size}`);
      }
      const occurrences = /* @__PURE__ */ new Map();
      const rendered = drawableSource.replace(/\bid="([^"]+)"/g, (match, id) => {
        const occurrence = occurrences.get(id) ?? 0;
        occurrences.set(id, occurrence + 1);
        return `id="${ids.get(id)}${occurrence ? `-${occurrence}` : ""}"`;
      }).replace(/url\(#([^)]+)\)/g, (match, id) => `url(#${ids.get(id) ?? id})`).replace(
        /((?:xlink:)?href=")#([^"]+)"/g,
        (match, attribute, id) => `${attribute}#${ids.get(id) ?? id}"`
      ).replace(
        /<svg\b([^>]*)>/,
        (match, attributes) => `<svg${attributes} aria-hidden="true" focusable="false">`
      );
      if (!split.value) return rendered;
      const gradientId = `${prefix}color-split`;
      const offset = `${split.value.ratio * 100}%`;
      return rendered.replace(/currentColor/g, `url(#${gradientId})`).replace(
        /(<svg\b[^>]*>)/,
        `$1<defs><linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="0"><stop offset="${offset}" stop-color="var(--workbench-icon-split-start)"/><stop offset="${offset}" stop-color="var(--workbench-icon-split-end)"/></linearGradient></defs>`
      );
    });
    const style = computed(() => {
      return {
        ...nativeIconStyle(icon.value),
        ...nativeSvgStyle(icon.value),
        ...props.color === "currentColor" ? {} : { color: props.color },
        ...split.value ? {
          "--workbench-icon-split-start": split.value.startColor ?? "currentColor",
          "--workbench-icon-split-end": split.value.endColor ?? "currentColor"
        } : {}
      };
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("span", _mergeProps({ class: "workbench-icon" }, _unref(iconAttributes)(_unref(attrs)), {
        "data-icon-key": icon.value?.key,
        "data-icon-alias": icon.value?.alias,
        "data-icon-replaced-key": resolution.value.replacedKey || void 0,
        "data-icon-native": icon.value ? `${icon.value.native.width}x${icon.value.native.height}` : void 0,
        "data-icon-error": error.value || void 0,
        "data-icon-loading": _unref(assetStatus) === "loading" ? "true" : void 0,
        style: style.value,
        role: __props.label ? "img" : void 0,
        "aria-label": __props.label || void 0,
        "aria-hidden": __props.label ? void 0 : "true",
        innerHTML: markup.value
      }), null, 16, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-0f55698d" });
