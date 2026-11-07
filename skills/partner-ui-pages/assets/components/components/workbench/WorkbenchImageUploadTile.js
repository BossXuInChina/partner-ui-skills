import { unref as _unref, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createBlock as _createBlock, toDisplayString as _toDisplayString, createVNode as _createVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["data-status", "aria-label"];
const _hoisted_2 = { class: "image-upload-tile__picture" };
const _hoisted_3 = ["src", "alt"];
const _hoisted_4 = {
  key: 0,
  class: "image-upload-tile__status"
};
const _hoisted_5 = ["aria-label", "aria-valuenow"];
const _hoisted_6 = ["disabled", "aria-label"];
const _hoisted_7 = ["disabled", "aria-label"];
const _hoisted_8 = ["disabled", "aria-label"];
const _hoisted_9 = ["disabled", "aria-label"];
const _hoisted_10 = ["disabled", "aria-label"];
const _hoisted_11 = ["title"];
import { computed } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import placeholder from "./assets/placeholder.png";
const __sfc_main__ = {
  __name: "ImageUploadTile",
  props: {
    item: { type: Object, required: true },
    disabled: Boolean,
    showName: { type: Boolean, default: true },
    downloadable: Boolean,
    previewState: { type: String, default: "default" }
  },
  emits: ["preview", "download", "remove", "retry", "cancel"],
  setup(__props) {
    const props = __props;
    const uploading = computed(() => props.item.status === "uploading");
    const failed = computed(() => props.item.status === "error");
    const percentage = computed(() => Math.max(0, Math.min(100, Math.round(Number(props.item.progress) || 0))));
    const stateText = computed(() => uploading.value ? props.item.url ? `${percentage.value}%` : "\u4E0A\u4F20\u4E2D\u2026" : failed.value ? "\u4E0A\u4F20\u5931\u8D25" : "");
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("li", {
        class: _normalizeClass(["image-upload-tile", { "image-upload-tile--hover": __props.previewState === "hover", "is-disabled": __props.disabled }]),
        "data-status": __props.item.status,
        "aria-label": `${__props.item.name}\uFF0C${stateText.value || (__props.item.status === "ready" ? "\u5DF2\u9009\u62E9" : "\u4E0A\u4F20\u6210\u529F")}`
      }, [
        _createElementVNode("div", _hoisted_2, [
          _createElementVNode("img", {
            src: __props.item.url || _unref(placeholder),
            alt: __props.item.name,
            draggable: "false"
          }, null, 8, _hoisted_3),
          uploading.value || failed.value ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
            uploading.value ? (_openBlock(), _createElementBlock("svg", {
              key: 0,
              class: "image-upload-tile__ring",
              viewBox: "0 0 28 28",
              role: "progressbar",
              "aria-label": `${__props.item.name}\u4E0A\u4F20\u8FDB\u5EA6`,
              "aria-valuenow": percentage.value,
              "aria-valuemin": "0",
              "aria-valuemax": "100"
            }, [..._cache[5] || (_cache[5] = [
              _createElementVNode(
                "circle",
                {
                  class: "image-upload-tile__ring-track",
                  cx: "14",
                  cy: "14",
                  r: "12"
                },
                null,
                -1
                /* CACHED */
              ),
              _createElementVNode(
                "circle",
                {
                  class: "image-upload-tile__ring-arc",
                  cx: "14",
                  cy: "14",
                  r: "12",
                  pathLength: "100"
                },
                null,
                -1
                /* CACHED */
              )
            ])], 8, _hoisted_5)) : (_openBlock(), _createBlock(WorkbenchIcon, {
              key: 1,
              name: "\u63D0\u793A/\u9762\u6027=off_24px",
              color: "var(--wb-asset-wb-image-upload-white)"
            })),
            _createElementVNode(
              "span",
              null,
              _toDisplayString(stateText.value),
              1
              /* TEXT */
            )
          ])) : _createCommentVNode("v-if", true),
          !uploading.value ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 1,
              class: _normalizeClass(["image-upload-tile__actions", { "image-upload-tile__actions--disabled": __props.disabled }])
            },
            [
              failed.value ? (_openBlock(), _createElementBlock("button", {
                key: 0,
                type: "button",
                disabled: __props.disabled,
                "aria-label": `\u91CD\u65B0\u4E0A\u4F20${__props.item.name}`,
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("retry", __props.item))
              }, [
                _createVNode(WorkbenchIcon, { name: "\u5237\u65B0_24px" })
              ], 8, _hoisted_6)) : (_openBlock(), _createElementBlock("button", {
                key: 1,
                type: "button",
                disabled: __props.disabled || !__props.item.url,
                "aria-label": `\u9884\u89C8${__props.item.name}`,
                onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("preview", __props.item))
              }, [
                _createVNode(WorkbenchIcon, { name: "\u53EF\u89C1\u4E0D\u53EF\u89C1/\u53EF\u89C1=on_24px" })
              ], 8, _hoisted_7)),
              !failed.value && __props.downloadable ? (_openBlock(), _createElementBlock("button", {
                key: 2,
                type: "button",
                disabled: __props.disabled || !__props.item.url,
                "aria-label": `\u4E0B\u8F7D${__props.item.name}`,
                onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("download", __props.item))
              }, [
                _createVNode(WorkbenchIcon, { name: "\u4E0B\u8F7D_24px" })
              ], 8, _hoisted_8)) : _createCommentVNode("v-if", true),
              _createElementVNode("button", {
                type: "button",
                disabled: __props.disabled,
                "aria-label": `\u5220\u9664${__props.item.name}`,
                onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("remove", __props.item))
              }, [
                _createVNode(WorkbenchIcon, { name: "/ic_public_trash_line_24px" })
              ], 8, _hoisted_9)
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true),
          uploading.value ? (_openBlock(), _createElementBlock("button", {
            key: 2,
            type: "button",
            class: "image-upload-tile__cancel",
            disabled: __props.disabled,
            "aria-label": `\u53D6\u6D88\u4E0A\u4F20${__props.item.name}`,
            onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("cancel", __props.item))
          }, [
            _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_8px" })
          ], 8, _hoisted_10)) : _createCommentVNode("v-if", true)
        ]),
        __props.showName ? (_openBlock(), _createElementBlock("span", {
          key: 0,
          class: "image-upload-tile__name",
          title: __props.item.name
        }, _toDisplayString(__props.item.name), 9, _hoisted_11)) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-691eba5c" });
