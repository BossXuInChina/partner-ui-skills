import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["data-list-type", "aria-label"];
import UploadFileItem from "./UploadFileItem.vue";
const __sfc_main__ = {
  __name: "UploadFileList",
  props: { files: { type: Array, default: () => [] }, listType: { type: String, default: "text" }, background: Boolean, disabled: Boolean, previewState: { type: String, default: "default" }, label: { type: String, default: "\u9644\u4EF6\u5217\u8868" } },
  emits: ["remove", "retry", "pause", "resume", "preview", "download"],
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("ul", {
        class: "upload-file-list",
        "data-list-type": __props.listType,
        "aria-label": __props.label
      }, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(__props.files, (file) => {
            return _openBlock(), _createBlock(UploadFileItem, {
              key: file.id,
              file,
              "list-type": __props.listType,
              background: __props.background,
              disabled: __props.disabled,
              "preview-state": __props.previewState,
              onRemove: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("remove", $event)),
              onRetry: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("retry", $event)),
              onPause: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("pause", $event)),
              onResume: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("resume", $event)),
              onPreview: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("preview", $event)),
              onDownload: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("download", $event))
            }, null, 8, ["file", "list-type", "background", "disabled", "preview-state"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 8, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-708489f4" });
