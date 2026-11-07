import { createElementVNode as _createElementVNode, createVNode as _createVNode, createTextVNode as _createTextVNode, toDisplayString as _toDisplayString, withModifiers as _withModifiers, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, withCtx as _withCtx, Fragment as _Fragment, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["data-mode", "data-disabled", "aria-label"];
const _hoisted_2 = ["accept", "multiple", "disabled", "aria-label"];
const _hoisted_3 = ["data-state", "disabled", "aria-label"];
const _hoisted_4 = { class: "workbench-upload__hint" };
const _hoisted_5 = {
  key: 1,
  class: "workbench-upload__trigger"
};
const _hoisted_6 = { class: "workbench-upload__hint" };
const _hoisted_7 = {
  key: 1,
  class: "workbench-upload__validation",
  role: "alert"
};
const _hoisted_8 = {
  key: 2,
  class: "workbench-upload__attachments"
};
const _hoisted_9 = {
  key: 4,
  class: "workbench-upload__empty"
};
const _hoisted_10 = {
  class: "workbench-upload__announcement",
  "aria-live": "polite",
  "aria-atomic": "true"
};
import { useFormDisabled } from "../form/useFormDisabled.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, markRaw, onBeforeUnmount, ref, useId, watch } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import UploadFileList from "./UploadFileList.vue";
import { acceptsFile, formatFileSize, normalizeUploadFile, progressOf } from "./uploadModel.js";
const __sfc_main__ = {
  __name: "WorkbenchUpload",
  props: {
    modelValue: { type: Array, default: () => [] },
    mode: { type: String, default: "click", validator: (value) => ["click", "drag"].includes(value) },
    listType: { type: String, default: "text", validator: (value) => ["text", "compact", "card"].includes(value) },
    accept: { type: String, default: ".doc,.xlsx,.pdf" },
    maxSize: { type: Number, default: 5 * 1024 * 1024 },
    limit: { type: Number, default: 0 },
    multiple: { type: Boolean, default: true },
    disabled: Boolean,
    background: Boolean,
    showTrigger: { type: Boolean, default: true },
    autoUpload: { type: Boolean, default: true },
    customRequest: { type: Function, default: void 0 },
    beforeUpload: { type: Function, default: void 0 },
    hint: { type: String, default: void 0 },
    label: { type: String, default: "\u6587\u4EF6\u4E0A\u4F20" },
    previewState: { type: String, default: "default" }
  },
  emits: ["update:modelValue", "change", "select", "progress", "success", "error", "reject", "remove", "pause", "resume", "preview", "download"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const instanceId = useId();
    let sequence = 0;
    let alive = true;
    const input = ref(null);
    const files = ref([]);
    const validationMessage = ref("");
    const dragging = ref(false);
    let dragDepth = 0;
    const jobs = /* @__PURE__ */ new Map();
    const effectiveDisabled = computed(() => disabled.value || props.previewState === "disabled");
    const actualListType = computed(() => props.mode === "drag" && props.listType === "text" ? "card" : props.listType);
    const hintText = computed(() => props.hint ?? `${props.maxSize > 0 ? `\u4E0D\u8D85\u8FC7${formatFileSize(props.maxSize)}\uFF0C` : ""}${props.accept ? `\u652F\u6301${props.accept.replaceAll(".", "").replaceAll(",", "\u3001")}` : "\u652F\u6301\u6240\u6709\u6587\u4EF6\u683C\u5F0F"}`);
    watch(() => props.modelValue, (value) => {
      const next = value.map((file) => normalizeUploadFile(file, `${instanceId}-${++sequence}`));
      for (const id of jobs.keys()) if (!next.some((file) => file.id === id)) abort(id);
      files.value = next;
    }, { immediate: true });
    watch(effectiveDisabled, (value) => {
      if (value) {
        dragging.value = false;
        dragDepth = 0;
      }
    });
    function publish(next) {
      if (!alive) return;
      files.value = next;
      emit("update:modelValue", next);
      emit("change", next);
    }
    function update(id, patch) {
      const next = files.value.map((file) => file.id === id ? { ...file, ...patch } : file);
      publish(next);
      return next.find((file) => file.id === id);
    }
    function abort(id) {
      const job = jobs.get(id);
      jobs.delete(id);
      job?.controller.abort();
    }
    function reject(file, reason, message) {
      validationMessage.value = message;
      emit("reject", { file, reason, message });
    }
    function validFile(raw) {
      if (!acceptsFile(raw, props.accept)) {
        reject(raw, "type", `${raw.name}\uFF1A\u6587\u4EF6\u683C\u5F0F\u4E0D\u652F\u6301`);
        return false;
      }
      if (props.maxSize > 0 && raw.size > props.maxSize) {
        reject(raw, "size", `${raw.name}\uFF1A\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7${formatFileSize(props.maxSize)}`);
        return false;
      }
      return true;
    }
    async function passesBeforeUpload(raw, selected) {
      if (!props.beforeUpload) return true;
      try {
        return await props.beforeUpload(raw, selected) !== false;
      } catch {
        if (alive) reject(raw, "before-upload", `${raw.name}\uFF1A\u6587\u4EF6\u6821\u9A8C\u5931\u8D25`);
        return false;
      }
    }
    async function selectFiles(source) {
      if (effectiveDisabled.value || !alive) return;
      validationMessage.value = "";
      const selected = Array.from(source ?? []);
      for (const raw of props.multiple ? selected : selected.slice(0, 1)) {
        if (!alive || effectiveDisabled.value) break;
        if (!validFile(raw) || !await passesBeforeUpload(raw, selected)) continue;
        if (!alive || effectiveDisabled.value) break;
        if (props.limit > 0 && files.value.length >= props.limit) {
          reject(raw, "limit", `\u6700\u591A\u4E0A\u4F20${props.limit}\u4E2A\u6587\u4EF6`);
          continue;
        }
        const record = normalizeUploadFile({ name: raw.name, size: raw.size, type: raw.type, raw: markRaw(raw), status: "ready", percentage: 0 }, `${instanceId}-${++sequence}`);
        publish([...files.value, record]);
        emit("select", record);
        if (props.autoUpload && props.customRequest) void upload(record);
      }
    }
    async function upload(file) {
      const current = files.value.find((item) => item.id === file.id);
      if (!alive || effectiveDisabled.value || !current || !props.customRequest || jobs.has(file.id)) return;
      const controller = new AbortController();
      const job = { controller };
      jobs.set(file.id, job);
      const isCurrent = () => alive && !controller.signal.aborted && jobs.get(file.id) === job && files.value.some((item) => item.id === file.id);
      const resumed = current.status === "paused";
      update(file.id, { status: "uploading", error: "", percentage: resumed ? progressOf(current) : 0 });
      try {
        const result = await props.customRequest({
          file: current.raw,
          record: current,
          signal: controller.signal,
          loaded: resumed ? current.size * progressOf(current) / 100 : 0,
          onProgress(progress) {
            if (!isCurrent()) return;
            const percentage = typeof progress === "number" ? progress : progress?.total > 0 ? progress.loaded / progress.total * 100 : 0;
            const record2 = update(file.id, { percentage: Math.max(0, Math.min(100, Number(percentage) || 0)) });
            emit("progress", record2);
          }
        });
        if (!isCurrent()) return;
        const record = update(file.id, { status: "success", percentage: 100, response: result, ...result?.url ? { url: result.url } : {} });
        emit("success", record, result);
      } catch (error) {
        if (!isCurrent()) return;
        const record = update(file.id, { status: "error", error: "\u4E0A\u4F20\u5931\u8D25" });
        emit("error", error, record);
      } finally {
        if (jobs.get(file.id) === job) jobs.delete(file.id);
      }
    }
    function remove(file) {
      if (effectiveDisabled.value) return;
      abort(file.id);
      publish(files.value.filter((item) => item.id !== file.id));
      emit("remove", file);
    }
    function pause(file) {
      if (effectiveDisabled.value || file.status !== "uploading") return;
      abort(file.id);
      const record = update(file.id, { status: "paused" });
      emit("pause", record);
    }
    function resume(file) {
      if (effectiveDisabled.value) return;
      emit("resume", file);
      void upload(file);
    }
    function retry(file) {
      if (effectiveDisabled.value) return;
      abort(file.id);
      void upload(file);
    }
    function onInput(event) {
      void selectFiles(event.target.files);
      event.target.value = "";
    }
    function choose() {
      if (!effectiveDisabled.value) input.value?.click();
    }
    function enter(event) {
      if (effectiveDisabled.value || !Array.from(event.dataTransfer?.types ?? []).includes("Files")) return;
      dragDepth += 1;
      dragging.value = true;
    }
    function leave() {
      dragDepth = Math.max(0, dragDepth - 1);
      if (!dragDepth) dragging.value = false;
    }
    function drop(event) {
      dragging.value = false;
      dragDepth = 0;
      void selectFiles(event.dataTransfer?.files);
    }
    function submit() {
      if (!effectiveDisabled.value) return Promise.all(files.value.filter((file) => ["ready", "error"].includes(file.status)).map(upload));
    }
    onBeforeUnmount(() => {
      alive = false;
      for (const id of [...jobs.keys()]) abort(id);
    });
    __expose({ selectFiles, submit, pause, resume, retry, remove });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", {
        class: "workbench-upload",
        "data-mode": __props.mode,
        "data-disabled": effectiveDisabled.value,
        "aria-label": __props.label
      }, [
        _createElementVNode("input", {
          ref_key: "input",
          ref: input,
          class: "workbench-upload__input",
          type: "file",
          accept: __props.accept,
          multiple: __props.multiple,
          disabled: effectiveDisabled.value,
          "aria-label": `\u9009\u62E9${__props.label}\u6587\u4EF6`,
          tabindex: "-1",
          onChange: onInput
        }, null, 40, _hoisted_2),
        __props.showTrigger ? (_openBlock(), _createElementBlock(
          _Fragment,
          { key: 0 },
          [
            __props.mode === "drag" ? (_openBlock(), _createElementBlock("button", {
              key: 0,
              class: "workbench-upload__drop",
              "data-state": dragging.value ? "active" : __props.previewState,
              type: "button",
              disabled: effectiveDisabled.value,
              "aria-label": `\u62D6\u62FD\u6216\u5355\u51FB${__props.label}`,
              onClick: choose,
              onDragenter: _withModifiers(enter, ["prevent"]),
              onDragleave: _withModifiers(leave, ["prevent"]),
              onDragover: _cache[0] || (_cache[0] = _withModifiers(() => {
              }, ["prevent"])),
              onDrop: _withModifiers(drop, ["prevent"])
            }, [
              _createVNode(WorkbenchIcon, {
                class: "workbench-upload__plus",
                name: "/ic_public_plus_line_20px"
              }),
              _cache[3] || (_cache[3] = _createElementVNode(
                "span",
                { class: "workbench-upload__drop-text" },
                [
                  _createTextVNode("\u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\u6216"),
                  _createElementVNode("span", { class: "workbench-upload__link" }, "\u5355\u51FB\u4E0A\u4F20")
                ],
                -1
                /* CACHED */
              )),
              _createElementVNode(
                "span",
                _hoisted_4,
                _toDisplayString(hintText.value),
                1
                /* TEXT */
              )
            ], 40, _hoisted_3)) : (_openBlock(), _createElementBlock("div", _hoisted_5, [
              _createVNode(WorkbenchButton, {
                appearance: "secondary",
                disabled: effectiveDisabled.value,
                onClick: choose
              }, {
                icon: _withCtx(() => [
                  _createVNode(WorkbenchIcon, { name: "/ic_public_plus_line_14px" })
                ]),
                default: _withCtx(() => [
                  _cache[4] || (_cache[4] = _createTextVNode(
                    "\u6587\u4EF6\u4E0A\u4F20",
                    -1
                    /* CACHED */
                  ))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["disabled"]),
              _createElementVNode(
                "span",
                _hoisted_6,
                _toDisplayString(hintText.value),
                1
                /* TEXT */
              )
            ]))
          ],
          64
          /* STABLE_FRAGMENT */
        )) : _createCommentVNode("v-if", true),
        validationMessage.value ? (_openBlock(), _createElementBlock(
          "p",
          _hoisted_7,
          _toDisplayString(validationMessage.value),
          1
          /* TEXT */
        )) : _createCommentVNode("v-if", true),
        __props.mode === "click" ? (_openBlock(), _createElementBlock("div", _hoisted_8, [..._cache[5] || (_cache[5] = [
          _createElementVNode(
            "span",
            {
              class: "workbench-upload__divider",
              "aria-hidden": "true"
            },
            null,
            -1
            /* CACHED */
          )
        ])])) : _createCommentVNode("v-if", true),
        files.value.length ? (_openBlock(), _createBlock(UploadFileList, {
          key: 3,
          files: files.value,
          "list-type": actualListType.value,
          background: __props.background,
          disabled: effectiveDisabled.value,
          "preview-state": __props.previewState,
          label: `${__props.label}\u9644\u4EF6\u5217\u8868`,
          onRemove: remove,
          onRetry: retry,
          onPause: pause,
          onResume: resume,
          onPreview: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("preview", $event)),
          onDownload: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("download", $event))
        }, null, 8, ["files", "list-type", "background", "disabled", "preview-state", "label"])) : __props.mode === "click" || !__props.showTrigger ? (_openBlock(), _createElementBlock("p", _hoisted_9, "\u6682\u65E0\u9644\u4EF6")) : _createCommentVNode("v-if", true),
        _createElementVNode(
          "span",
          _hoisted_10,
          _toDisplayString(files.value.filter((file) => file.status === "uploading").length) + "\u4E2A\u6587\u4EF6\u4E0A\u4F20\u4E2D\uFF0C" + _toDisplayString(files.value.filter((file) => file.status === "success").length) + "\u4E2A\u4E0A\u4F20\u6210\u529F\uFF0C" + _toDisplayString(files.value.filter((file) => file.status === "error").length) + "\u4E2A\u4E0A\u4F20\u5931\u8D25",
          1
          /* TEXT */
        )
      ], 8, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-870e9447" });
