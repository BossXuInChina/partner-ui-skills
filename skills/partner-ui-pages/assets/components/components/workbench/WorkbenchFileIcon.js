import { unref as _unref, mergeProps as _mergeProps, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["data-icon-key", "data-icon-alias", "data-icon-error", "data-icon-loading", "src", "width", "height", "alt", "aria-hidden", "data-file-type", "data-icon-size"];
import { computed, useAttrs, watchEffect } from "vue";
import { nativeIconStyle, iconAttributes, reportIconError } from "../iconCore.js";
import { useIconAsset } from "../useIconAsset.js";
import { fileAssets } from "../loaders/file.js";
import { resolveFileIconType } from "./fileIconType.js";
import { fileIcons } from "../families/file.js";
const __default__ = { inheritAttrs: false, fileIconManifest: fileIcons.manifest };
const __sfc_main__ = /* @__PURE__ */ Object.assign(__default__, {
  __name: "WorkbenchFileIcon",
  props: {
    name: { type: String, default: "" },
    type: { type: String, default: "" },
    filename: { type: String, default: "" },
    size: { type: [Number, String], default: void 0 },
    label: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const attrs = useAttrs();
    const type = computed(() => resolveFileIconType(props.type || props.filename));
    const resolution = computed(
      () => props.name ? fileIcons.resolve(props.name, props.size, "file") : fileIcons.resolve(`${type.value}/${props.size ?? 32}`, void 0, "file")
    );
    const icon = computed(() => resolution.value.icon);
    const iconType = computed(() => icon.value?.key.split("/")[0] ?? type.value);
    const {
      source,
      error: assetError,
      status: assetStatus
    } = useIconAsset(
      computed(() => icon.value ? `${iconType.value}-48.svg` : void 0),
      fileAssets
    );
    const error = computed(() => resolution.value.error || assetError.value);
    watchEffect(() => reportIconError(error.value));
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("img", _mergeProps({ class: "workbench-file-icon" }, _unref(iconAttributes)(_unref(attrs)), {
        style: _unref(nativeIconStyle)(icon.value),
        "data-icon-key": icon.value?.key,
        "data-icon-alias": icon.value?.alias,
        "data-icon-error": error.value || void 0,
        "data-icon-loading": _unref(assetStatus) === "loading" ? "true" : void 0,
        src: _unref(source) || void 0,
        width: icon.value?.native.width,
        height: icon.value?.native.height,
        alt: __props.label,
        "aria-hidden": __props.label ? void 0 : "true",
        "data-file-type": type.value,
        "data-icon-size": icon.value?.size,
        draggable: "false"
      }), null, 16, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-0aba2bd4" });
