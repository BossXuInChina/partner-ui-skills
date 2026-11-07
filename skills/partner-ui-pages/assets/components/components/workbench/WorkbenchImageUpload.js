import { unref as _unref, createVNode as _createVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, createElementBlock as _createElementBlock, renderList as _renderList, Fragment as _Fragment, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = ["aria-label", "aria-disabled"];
const _hoisted_2 = {
  key: 0,
  class: "wb-image-upload__toolbar"
};
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = {
  key: 0,
  class: "wb-image-upload__add-item"
};
const _hoisted_5 = ["disabled", "aria-label", "aria-describedby"];
const _hoisted_6 = ["aria-label", "multiple", "accept", "disabled"];
const _hoisted_7 = {
  key: 1,
  class: "wb-image-upload__error",
  role: "alert"
};
const _hoisted_8 = {
  class: "wb-image-upload__announcement",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_9 = ["src", "alt"];
import { useFormDisabled } from "../form/useFormDisabled.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from "vue";
import { zipSync } from "fflate";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchModal from "../modal/WorkbenchModal.vue";
import ImageUploadTile from "./ImageUploadTile.vue";
const __sfc_main__ = {
  __name: "WorkbenchImageUpload",
  props: {
    modelValue: { type: Array, default: void 0 },
    defaultValue: { type: Array, default: () => [] },
    multiple: { type: Boolean, default: true },
    maxCount: { type: Number, default: 5 },
    maxSize: { type: Number, default: 500 * 1024 },
    accept: { type: String, default: "image/jpeg,image/png" },
    disabled: Boolean,
    showNames: { type: Boolean, default: true },
    downloadable: Boolean,
    batchDownload: Boolean,
    hint: { type: String, default: void 0 },
    label: { type: String, default: "\u56FE\u7247\u4E0A\u4F20" },
    uploadRequest: { type: Function, default: void 0 },
    previewState: { type: String, default: "default" }
  },
  emits: ["update:modelValue", "change", "reject", "progress", "success", "error", "cancel", "remove", "retry", "preview", "download", "batch-download"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const localItems = ref(props.defaultValue.map((item) => ({ ...item })));
    const items = computed(() => props.modelValue ?? localItems.value);
    const limit = computed(() => props.multiple ? Math.max(1, Math.floor(props.maxCount) || 1) : 1);
    const input = ref(null);
    const uid = useId();
    const hintId = `image-upload-${uid}`;
    const message = ref("");
    const preview = ref(null);
    const downloading = ref(false);
    const jobs = /* @__PURE__ */ new Map();
    const urls = /* @__PURE__ */ new Map();
    let sequence = 0;
    let alive = true;
    let pendingItems = null;
    const currentItems = () => pendingItems ?? items.value;
    const successful = computed(() => items.value.filter((item) => ["success", "ready"].includes(item.status) && item.url));
    const help = computed(() => props.hint ?? `\u4E0D\u8D85\u8FC7${Math.round(props.maxSize / 1024)}KB\uFF0C\u652F\u6301${props.accept.split(",").map((type) => type.trim().replace("image/", "").replace("jpeg", "jpg")).join("\u3001")}\uFF0C\u6700\u591A\u4E0A\u4F20${limit.value}\u5F20\u56FE\u7247`);
    function commit(next) {
      const value = next.map((item) => ({ ...item }));
      if (props.modelValue === void 0) localItems.value = value;
      else {
        pendingItems = value;
        void nextTick(() => {
          if (pendingItems === value) pendingItems = null;
        });
      }
      emit("update:modelValue", value);
      emit("change", value);
    }
    function patch(id, values) {
      commit(currentItems().map((item) => item.id === id ? { ...item, ...values } : item));
    }
    function stop(id) {
      const job = jobs.get(id);
      jobs.delete(id);
      job?.abort();
    }
    function accepted(file) {
      const types = props.accept.split(",").map((type) => type.trim().toLowerCase()).filter(Boolean);
      const mime = file.type.toLowerCase();
      return types.length === 0 || types.some((type) => type.startsWith(".") ? file.name.toLowerCase().endsWith(type) : type.endsWith("/*") ? mime.startsWith(type.slice(0, -1)) : mime === type);
    }
    async function selectFiles(event) {
      const selected = Array.from(event.target.files ?? []);
      event.target.value = "";
      if (disabled.value) return;
      const next = [...currentItems()];
      const added = [];
      const rejected = [];
      for (const file of selected) {
        let reason = "";
        if (!accepted(file)) reason = "\u6587\u4EF6\u683C\u5F0F\u4E0D\u652F\u6301";
        else if (file.size > props.maxSize) reason = `\u6587\u4EF6\u4E0D\u80FD\u8D85\u8FC7${Math.round(props.maxSize / 1024)}KB`;
        else if (next.length >= limit.value) reason = `\u6700\u591A\u4E0A\u4F20${limit.value}\u5F20\u56FE\u7247`;
        if (reason) {
          rejected.push(`${file.name}\uFF1A${reason}`);
          emit("reject", { file, reason });
          continue;
        }
        const id = `${uid}-${++sequence}`;
        const url = URL.createObjectURL(file);
        urls.set(id, url);
        const item = { id, name: file.name, file, url, status: "ready", progress: 0 };
        added.push(item);
        next.push(item);
      }
      message.value = rejected.join("\uFF1B");
      if (!added.length) return;
      commit(next);
      await nextTick();
      for (const item of added) {
        if (items.value.some((current) => current.id === item.id)) {
          if (props.uploadRequest) void upload(item);
        } else {
          URL.revokeObjectURL(item.url);
          urls.delete(item.id);
        }
      }
    }
    async function upload(item) {
      if (disabled.value || !props.uploadRequest || jobs.has(item.id)) return;
      const current = currentItems().find((value) => value.id === item.id);
      if (!current) return;
      const controller = new AbortController();
      jobs.set(item.id, controller);
      const valid = () => alive && jobs.get(item.id) === controller && !controller.signal.aborted && items.value.some((value) => value.id === item.id);
      patch(item.id, { status: "uploading", progress: 0, error: "" });
      await nextTick();
      if (!valid() || items.value.find((value) => value.id === item.id)?.status !== "uploading") {
        stop(item.id);
        return;
      }
      try {
        const result = await props.uploadRequest(current.file, {
          item: { ...current },
          signal: controller.signal,
          onProgress(value) {
            if (!valid()) return;
            const progress = Math.max(0, Math.min(100, Number(value) || 0));
            patch(item.id, { progress });
            emit("progress", { id: item.id, progress });
          }
        });
        if (!valid()) return;
        patch(item.id, { status: "success", progress: 100, ...typeof result === "string" ? { url: result } : result?.url ? { url: result.url } : {} });
        emit("success", { id: item.id, result });
      } catch (error) {
        if (!valid()) return;
        patch(item.id, { status: "error", error: error?.message || "\u4E0A\u4F20\u5931\u8D25" });
        emit("error", { id: item.id, error });
      } finally {
        if (jobs.get(item.id) === controller) jobs.delete(item.id);
      }
    }
    function remove(item, cancel = false) {
      if (disabled.value) return;
      stop(item.id);
      commit(currentItems().filter((value) => value.id !== item.id));
      emit(cancel ? "cancel" : "remove", { ...item });
    }
    function retry(item) {
      if (disabled.value) return;
      emit("retry", { ...item });
      void upload(item);
    }
    function openPreview(item) {
      if (disabled.value || !item.url) return;
      preview.value = item;
      emit("preview", { ...item });
    }
    function saveBlob(blob, name) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
    }
    async function imageBlob(item, signal) {
      if (item.file instanceof Blob) return item.file;
      const response = await fetch(item.url, { signal });
      if (!response.ok) throw new Error("\u4E0B\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5");
      return response.blob();
    }
    const downloads = /* @__PURE__ */ new Set();
    async function download(item) {
      if (disabled.value) return;
      message.value = "";
      const controller = new AbortController();
      downloads.add(controller);
      try {
        const blob = await imageBlob(item, controller.signal);
        if (alive) {
          saveBlob(blob, item.name);
          emit("download", { ...item });
        }
      } catch (error) {
        if (alive && !controller.signal.aborted) message.value = error.message || "\u4E0B\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5";
      } finally {
        downloads.delete(controller);
      }
    }
    async function downloadAll() {
      if (disabled.value || downloading.value || !successful.value.length) return;
      message.value = "";
      downloading.value = true;
      const controller = new AbortController();
      downloads.add(controller);
      const selected = successful.value.map((item) => ({ ...item }));
      try {
        const entries = await Promise.all(selected.map(async (item, index) => [`${index + 1}-${item.name.replace(/[\\/]/g, "_")}`, new Uint8Array(await (await imageBlob(item, controller.signal)).arrayBuffer())]));
        if (!alive) return;
        saveBlob(new Blob([zipSync(Object.fromEntries(entries), { level: 0 })], { type: "application/zip" }), "\u56FE\u7247.zip");
        emit("batch-download", selected);
      } catch (error) {
        if (alive && !controller.signal.aborted) message.value = error.message || "\u6279\u91CF\u4E0B\u8F7D\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5";
      } finally {
        downloads.delete(controller);
        downloading.value = false;
      }
    }
    watch(items, (next) => {
      const ids = new Set(next.map((item) => item.id));
      for (const id of jobs.keys()) if (!ids.has(id)) stop(id);
      for (const [id, url] of urls) if (!ids.has(id)) {
        URL.revokeObjectURL(url);
        urls.delete(id);
      }
      if (preview.value && !ids.has(preview.value.id)) preview.value = null;
    }, { flush: "post" });
    onBeforeUnmount(() => {
      alive = false;
      for (const id of jobs.keys()) stop(id);
      for (const controller of downloads) controller.abort();
      for (const url of urls.values()) URL.revokeObjectURL(url);
      urls.clear();
    });
    __expose({ selectFiles: () => {
      if (!disabled.value && items.value.length < limit.value) input.value?.click();
    }, retry, cancel: (item) => remove(item, true) });
    watch(disabled, (value) => {
      if (value) {
        preview.value = null;
      }
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", {
        class: "wb-image-upload",
        "aria-label": __props.label,
        "aria-disabled": _unref(disabled) || void 0
      }, [
        __props.batchDownload || help.value ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
          __props.batchDownload ? (_openBlock(), _createBlock(WorkbenchButton, {
            key: 0,
            appearance: "secondary",
            disabled: _unref(disabled) || downloading.value || !successful.value.length,
            onClick: downloadAll
          }, {
            icon: _withCtx(() => [
              _createVNode(WorkbenchIcon, { name: "\u4E0B\u8F7D_12px" })
            ]),
            default: _withCtx(() => [
              _createTextVNode(
                _toDisplayString(downloading.value ? "\u6B63\u5728\u6253\u5305\u2026" : "\u6279\u91CF\u4E0B\u8F7D"),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["disabled"])) : _createCommentVNode("v-if", true),
          help.value ? (_openBlock(), _createElementBlock(
            "p",
            {
              key: 1,
              id: hintId,
              class: "wb-image-upload__hint"
            },
            _toDisplayString(help.value),
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true)
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode("ul", {
          class: "wb-image-upload__list",
          "aria-label": `${__props.label}\u56FE\u7247\u5217\u8868`
        }, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(items.value, (item) => {
              return _openBlock(), _createBlock(ImageUploadTile, {
                key: item.id,
                item,
                disabled: _unref(disabled),
                "show-name": __props.showNames,
                downloadable: __props.downloadable,
                "preview-state": __props.previewState,
                onRemove: remove,
                onCancel: (item2) => remove(item2, true),
                onRetry: retry,
                onPreview: openPreview,
                onDownload: download
              }, null, 8, ["item", "disabled", "show-name", "downloadable", "preview-state", "onCancel"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          items.value.length < limit.value ? (_openBlock(), _createElementBlock("li", _hoisted_4, [
            _createElementVNode("button", {
              type: "button",
              class: "wb-image-upload__add",
              disabled: _unref(disabled),
              "aria-label": `\u6DFB\u52A0\u56FE\u7247\uFF0C${__props.label}`,
              "aria-describedby": help.value ? hintId : void 0,
              onClick: _cache[0] || (_cache[0] = ($event) => input.value?.click())
            }, [
              _createVNode(WorkbenchIcon, { name: "\u4E0A\u4F20\u56FE\u7247_24px" }),
              _cache[2] || (_cache[2] = _createElementVNode(
                "span",
                null,
                "\u6DFB\u52A0\u56FE\u7247",
                -1
                /* CACHED */
              ))
            ], 8, _hoisted_5)
          ])) : _createCommentVNode("v-if", true)
        ], 8, _hoisted_3),
        _createElementVNode("input", {
          ref_key: "input",
          ref: input,
          class: "wb-image-upload__input",
          type: "file",
          tabindex: "-1",
          "aria-label": `\u9009\u62E9\u56FE\u7247\uFF0C${__props.label}`,
          multiple: __props.multiple,
          accept: __props.accept,
          disabled: _unref(disabled),
          onChange: selectFiles
        }, null, 40, _hoisted_6),
        message.value ? (_openBlock(), _createElementBlock(
          "p",
          _hoisted_7,
          _toDisplayString(message.value),
          1
          /* TEXT */
        )) : _createCommentVNode("v-if", true),
        _createElementVNode(
          "span",
          _hoisted_8,
          _toDisplayString(items.value.length) + "\u5F20\u56FE\u7247\uFF0C" + _toDisplayString(items.value.filter((item) => item.status === "uploading").length) + "\u5F20\u4E0A\u4F20\u4E2D\uFF0C" + _toDisplayString(items.value.filter((item) => item.status === "error").length) + "\u5F20\u4E0A\u4F20\u5931\u8D25",
          1
          /* TEXT */
        ),
        _createVNode(WorkbenchModal, {
          "model-value": Boolean(preview.value),
          title: preview.value?.name || "\u56FE\u7247\u9884\u89C8",
          readonly: "",
          size: "l",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = (open) => {
            if (!open) preview.value = null;
          })
        }, {
          default: _withCtx(() => [
            preview.value ? (_openBlock(), _createElementBlock("img", {
              key: 0,
              class: "wb-image-upload__preview",
              src: preview.value.url,
              alt: preview.value.name
            }, null, 8, _hoisted_9)) : _createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["model-value", "title"])
      ], 8, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-b6ea00e8" });
