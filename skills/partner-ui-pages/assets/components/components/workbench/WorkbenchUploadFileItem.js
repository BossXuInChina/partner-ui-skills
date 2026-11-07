import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createBlock as _createBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, Fragment as _Fragment, createTextVNode as _createTextVNode, createVNode as _createVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["data-status", "data-disabled", "data-preview-state", "data-file-id", "tabindex", "aria-label"];
const _hoisted_2 = {
  key: 0,
  class: "upload-file__card-surface",
  "aria-hidden": "true"
};
const _hoisted_3 = { class: "upload-file__content" };
const _hoisted_4 = { class: "upload-file__copy" };
const _hoisted_5 = { class: "upload-file__title-row" };
const _hoisted_6 = ["title", "disabled"];
const _hoisted_7 = ["disabled", "aria-label"];
const _hoisted_8 = ["disabled", "aria-label"];
const _hoisted_9 = ["disabled", "aria-label"];
const _hoisted_10 = ["disabled", "aria-label"];
const _hoisted_11 = ["disabled", "aria-label"];
const _hoisted_12 = ["disabled", "aria-label"];
const _hoisted_13 = ["disabled", "aria-label"];
const _hoisted_14 = ["disabled", "aria-label"];
const _hoisted_15 = ["disabled", "aria-label"];
const _hoisted_16 = {
  key: 0,
  class: "upload-file__progress-row"
};
const _hoisted_17 = ["value", "aria-label", "aria-valuenow"];
const _hoisted_18 = {
  key: 0,
  class: "upload-file__percent"
};
const _hoisted_19 = {
  key: 1,
  class: "upload-file__meta"
};
const _hoisted_20 = {
  key: 0,
  class: "upload-file__error"
};
const _hoisted_21 = { key: 1 };
const _hoisted_22 = {
  key: 2,
  class: "upload-file__attribution"
};
const _hoisted_23 = {
  key: 2,
  class: "upload-file__sr-only",
  role: "status"
};
import { computed } from "vue";
import WorkbenchFileIcon from "../icons/file/WorkbenchFileIcon.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import { formatFileSize, progressOf } from "./uploadModel.js";
const __sfc_main__ = {
  __name: "UploadFileItem",
  props: {
    file: { type: Object, required: true },
    listType: { type: String, default: "text" },
    background: Boolean,
    disabled: Boolean,
    previewState: { type: String, default: "default" }
  },
  emits: ["remove", "retry", "pause", "resume", "preview", "download"],
  setup(__props) {
    const props = __props;
    const percent = computed(() => progressOf(props.file));
    const active = computed(() => ["uploading", "paused"].includes(props.file.status));
    const compact = computed(() => props.listType === "compact");
    const card = computed(() => props.listType === "card");
    const error = computed(() => props.file.status === "error");
    const sizeText = computed(
      () => active.value || card.value && error.value ? `${formatFileSize(props.file.size * percent.value / 100)}/${formatFileSize(props.file.size)}` : formatFileSize(props.file.size)
    );
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("li", {
        class: _normalizeClass(["upload-file", {
          "upload-file--card": card.value,
          "upload-file--compact": compact.value,
          "upload-file--background": __props.background
        }]),
        "data-status": __props.file.status,
        "data-disabled": __props.disabled,
        "data-preview-state": __props.previewState,
        "data-file-id": __props.file.id,
        tabindex: compact.value && active.value && !__props.disabled ? 0 : void 0,
        "aria-label": `${__props.file.name}\uFF0C${{ ready: "\u5F85\u4E0A\u4F20", uploading: "\u4E0A\u4F20\u4E2D", paused: "\u5DF2\u6682\u505C", success: "\u4E0A\u4F20\u6210\u529F", error: "\u4E0A\u4F20\u5931\u8D25" }[__props.file.status]}`
      }, [
        card.value ? (_openBlock(), _createElementBlock("div", _hoisted_2)) : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_3, [
          compact.value ? (_openBlock(), _createBlock(WorkbenchIcon, {
            key: 0,
            name: "/ic_public_link_line_14px"
          })) : (_openBlock(), _createBlock(WorkbenchFileIcon, {
            key: 1,
            filename: __props.file.name,
            type: error.value ? "unknown" : "",
            size: card.value ? 48 : 32
          }, null, 8, ["filename", "type", "size"])),
          _createElementVNode("div", _hoisted_4, [
            _createElementVNode("div", _hoisted_5, [
              _createElementVNode("button", {
                class: "upload-file__name",
                type: "button",
                title: __props.file.name,
                disabled: __props.disabled || __props.file.status !== "success",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("preview", __props.file))
              }, _toDisplayString(__props.file.name), 9, _hoisted_6),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass(["upload-file__actions", { "upload-file__actions--on-hover": __props.file.status === "success" }])
                },
                [
                  active.value ? (_openBlock(), _createElementBlock(
                    _Fragment,
                    { key: 0 },
                    [
                      _createElementVNode("button", {
                        type: "button",
                        disabled: __props.disabled,
                        "aria-label": `${__props.file.status === "paused" ? "\u7EE7\u7EED" : "\u6682\u505C"} ${__props.file.name}`,
                        onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit(__props.file.status === "paused" ? "resume" : "pause", __props.file))
                      }, _toDisplayString(__props.file.status === "paused" ? "\u7EE7\u7EED" : "\u6682\u505C"), 9, _hoisted_7),
                      _createElementVNode("button", {
                        type: "button",
                        disabled: __props.disabled,
                        "aria-label": `${card.value ? "\u53D6\u6D88" : "\u5220\u9664"} ${__props.file.name}`,
                        onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("remove", __props.file))
                      }, _toDisplayString(card.value ? "\u53D6\u6D88" : "\u5220\u9664"), 9, _hoisted_8)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : error.value ? (_openBlock(), _createElementBlock(
                    _Fragment,
                    { key: 1 },
                    [
                      _createElementVNode("button", {
                        type: "button",
                        disabled: __props.disabled,
                        "aria-label": `\u91CD\u65B0\u4E0A\u4F20 ${__props.file.name}`,
                        onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("retry", __props.file))
                      }, [
                        compact.value ? (_openBlock(), _createBlock(WorkbenchIcon, {
                          key: 0,
                          name: "\u5237\u65B0_14px"
                        })) : (_openBlock(), _createElementBlock(
                          _Fragment,
                          { key: 1 },
                          [
                            _createTextVNode("\u91CD\u65B0\u4E0A\u4F20")
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ], 8, _hoisted_9),
                      _createElementVNode("button", {
                        type: "button",
                        disabled: __props.disabled,
                        "aria-label": `\u5220\u9664 ${__props.file.name}`,
                        onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("remove", __props.file))
                      }, [
                        compact.value ? (_openBlock(), _createBlock(WorkbenchIcon, {
                          key: 0,
                          name: "/ic_public_trash_line_14px"
                        })) : (_openBlock(), _createElementBlock(
                          _Fragment,
                          { key: 1 },
                          [
                            _createTextVNode("\u5220\u9664")
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ], 8, _hoisted_10)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : __props.file.status === "success" ? (_openBlock(), _createElementBlock(
                    _Fragment,
                    { key: 2 },
                    [
                      !compact.value ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        type: "button",
                        disabled: __props.disabled,
                        "aria-label": `\u9884\u89C8 ${__props.file.name}`,
                        onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("preview", __props.file))
                      }, " \u9884\u89C8 ", 8, _hoisted_11)) : _createCommentVNode("v-if", true),
                      compact.value ? (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        type: "button",
                        disabled: __props.disabled,
                        "aria-label": `\u91CD\u65B0\u4E0A\u4F20 ${__props.file.name}`,
                        onClick: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("retry", __props.file))
                      }, [
                        _createVNode(WorkbenchIcon, { name: "\u5237\u65B0_14px" })
                      ], 8, _hoisted_12)) : (_openBlock(), _createElementBlock("button", {
                        key: 2,
                        type: "button",
                        disabled: __props.disabled,
                        "aria-label": `\u4E0B\u8F7D ${__props.file.name}`,
                        onClick: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("download", __props.file))
                      }, " \u4E0B\u8F7D ", 8, _hoisted_13)),
                      _createElementVNode("button", {
                        type: "button",
                        disabled: __props.disabled,
                        "aria-label": `\u5220\u9664 ${__props.file.name}`,
                        onClick: _cache[8] || (_cache[8] = ($event) => _ctx.$emit("remove", __props.file))
                      }, [
                        compact.value ? (_openBlock(), _createBlock(WorkbenchIcon, {
                          key: 0,
                          name: "/ic_public_trash_line_14px"
                        })) : (_openBlock(), _createElementBlock(
                          _Fragment,
                          { key: 1 },
                          [
                            _createTextVNode("\u5220\u9664")
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ], 8, _hoisted_14)
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : (_openBlock(), _createElementBlock("button", {
                    key: 3,
                    type: "button",
                    disabled: __props.disabled,
                    "aria-label": `\u5220\u9664 ${__props.file.name}`,
                    onClick: _cache[9] || (_cache[9] = ($event) => _ctx.$emit("remove", __props.file))
                  }, " \u5220\u9664 ", 8, _hoisted_15))
                ],
                2
                /* CLASS */
              )
            ]),
            (card.value || compact.value) && (active.value || error.value || card.value && __props.file.status === "success") ? (_openBlock(), _createElementBlock("div", _hoisted_16, [
              _createElementVNode("progress", {
                class: "upload-file__track",
                value: percent.value,
                max: "100",
                "aria-label": `${__props.file.name} \u4E0A\u4F20\u8FDB\u5EA6`,
                "aria-valuenow": percent.value,
                "aria-valuemin": "0",
                "aria-valuemax": "100"
              }, _toDisplayString(percent.value) + "% ", 9, _hoisted_17),
              !compact.value || !error.value ? (_openBlock(), _createElementBlock(
                "span",
                _hoisted_18,
                _toDisplayString(percent.value) + "%",
                1
                /* TEXT */
              )) : _createCommentVNode("v-if", true)
            ])) : _createCommentVNode("v-if", true),
            !compact.value ? (_openBlock(), _createElementBlock("div", _hoisted_19, [
              error.value ? (_openBlock(), _createElementBlock(
                "span",
                _hoisted_20,
                _toDisplayString(__props.file.error || "\u4E0A\u4F20\u5931\u8D25"),
                1
                /* TEXT */
              )) : (_openBlock(), _createElementBlock("span", _hoisted_21, [
                _createTextVNode(
                  _toDisplayString(sizeText.value),
                  1
                  /* TEXT */
                ),
                !card.value && active.value ? (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  [
                    _createTextVNode(
                      "\uFF0C" + _toDisplayString(percent.value) + "%",
                      1
                      /* TEXT */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : _createCommentVNode("v-if", true),
                __props.file.status === "paused" ? (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    _createTextVNode("\uFF08\u5DF2\u6682\u505C\uFF09")
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : _createCommentVNode("v-if", true)
              ])),
              !card.value && (__props.file.author || __props.file.date) ? (_openBlock(), _createElementBlock("span", _hoisted_22, [
                _createElementVNode(
                  "span",
                  null,
                  _toDisplayString(__props.file.author),
                  1
                  /* TEXT */
                ),
                _createElementVNode(
                  "span",
                  null,
                  _toDisplayString(__props.file.date),
                  1
                  /* TEXT */
                )
              ])) : _createCommentVNode("v-if", true)
            ])) : _createCommentVNode("v-if", true),
            compact.value && error.value ? (_openBlock(), _createElementBlock("span", _hoisted_23, "\u4E0A\u4F20\u5931\u8D25")) : _createCommentVNode("v-if", true)
          ])
        ])
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-e027e057" });
