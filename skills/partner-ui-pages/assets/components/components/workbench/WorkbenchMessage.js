import { unref as _unref, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, createBlock as _createBlock, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, Transition as _Transition, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["role", "aria-live"];
const _hoisted_2 = { class: "wb-message__main" };
const _hoisted_3 = {
  key: 0,
  class: "wb-message__icon wb-message__icon--loading",
  "aria-hidden": "true"
};
const _hoisted_4 = ["data-status-icon"];
const _hoisted_5 = { class: "wb-message__body" };
const _hoisted_6 = { class: "wb-message__copy" };
const _hoisted_7 = ["role", "aria-live"];
const _hoisted_8 = { class: "wb-message__main" };
const _hoisted_9 = {
  key: 0,
  class: "wb-message__icon wb-message__icon--loading",
  "aria-hidden": "true"
};
const _hoisted_10 = ["data-status-icon"];
const _hoisted_11 = { class: "wb-message__body" };
const _hoisted_12 = { class: "wb-message__copy" };
import { messageNativeGeometry } from "./messageNativeGeometry.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import "./message-motion.css";
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { createAutoDismiss, normalizeDuration } from "../feedback/autoDismiss.js";
import { registerFeedbackHost } from "../overlay/isolation.js";
import WorkbenchCheckbox from "../choice/WorkbenchCheckbox.vue";
import WorkbenchLink from "../link/WorkbenchLink.vue";
import WorkbenchStatusIcon from "../icons/WorkbenchStatusIcon.vue";
import WorkbenchLoading from "../loading/WorkbenchLoading.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
const __sfc_main__ = {
  __name: "Message",
  props: {
    modelValue: { type: Boolean, default: false },
    type: { type: String, default: "info", validator: (value) => ["info", "success", "warning", "danger", "critical", "error", "loading"].includes(value) },
    message: { type: String, required: true },
    messageKey: { type: [String, Number], default: "" },
    linkLabel: { type: String, default: "" },
    linkHref: { type: String, default: "" },
    checkboxLabel: { type: String, default: "" },
    checkboxChecked: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    showClose: { type: Boolean, default: true },
    placement: { type: String, default: "global", validator: (value) => ["global", "dialog"].includes(value) },
    autoClose: { type: Number, default: void 0 }
  },
  emits: ["update:modelValue", "update:checkboxChecked", "close", "link"],
  setup(__props, { emit: __emit }) {
    const statusIconSemantics = {
      info: "info",
      success: "success",
      warning: "warning",
      danger: "alert-orange",
      critical: "alert-red",
      error: "close_circle"
    };
    const props = __props;
    const emit = __emit;
    const globalHost = ref(null);
    let releaseFeedback = null;
    watch(
      globalHost,
      (root) => {
        releaseFeedback?.();
        releaseFeedback = root ? registerFeedbackHost(root) : null;
      },
      { flush: "post" }
    );
    const timer = createAutoDismiss(() => dismiss("timeout"));
    const effectiveDuration = computed(() => {
      if (props.type === "loading") return 0;
      const fallback = props.placement === "global" || props.showClose ? 2e3 : 7e3;
      return normalizeDuration(props.autoClose, fallback);
    });
    const role = computed(() => ["critical", "error"].includes(props.type) ? "alert" : "status");
    const isLoading = computed(() => props.type === "loading");
    const statusIconName = computed(() => `${statusIconSemantics[props.type]}/solid/16`);
    function clearTimer() {
      timer.dispose();
    }
    function dismiss(reason) {
      clearTimer();
      if (!props.modelValue) return;
      emit("update:modelValue", false);
      emit("close", reason);
    }
    function schedule() {
      if (!props.modelValue) {
        timer.dispose();
        return;
      }
      timer.reset(effectiveDuration.value);
    }
    function activateLink() {
      emit("link", { href: props.linkHref });
    }
    watch(() => [props.modelValue, props.messageKey, props.message, props.type, props.showClose, props.placement, props.autoClose], schedule, { immediate: true });
    onBeforeUnmount(() => {
      clearTimer();
      releaseFeedback?.();
    });
    return (_ctx, _cache) => {
      return __props.placement === "global" ? (_openBlock(), _createBlock(_Teleport, {
        key: 0,
        to: "body"
      }, [
        _createVNode(_Transition, {
          name: "message",
          appear: ""
        }, {
          default: _withCtx(() => [
            __props.modelValue ? (_openBlock(), _createElementBlock("section", {
              style: _normalizeStyle(_unref(messageNativeGeometry)),
              ref_key: "globalHost",
              ref: globalHost,
              key: __props.messageKey || __props.message,
              class: _normalizeClass(["wb-message wb-message--global", [`wb-message--${__props.type}`, { "has-icon": __props.showIcon, "has-close": __props.showClose }]]),
              onMouseenter: _cache[2] || (_cache[2] = ($event) => _unref(timer).pause("pointer")),
              onMouseleave: _cache[3] || (_cache[3] = ($event) => _unref(timer).resume("pointer")),
              onFocusin: _cache[4] || (_cache[4] = ($event) => _unref(timer).pause("focus")),
              onFocusout: _cache[5] || (_cache[5] = ($event) => !$event.currentTarget.contains($event.relatedTarget) && _unref(timer).resume("focus")),
              role: role.value,
              "aria-live": role.value === "status" ? "polite" : "assertive"
            }, [
              _createElementVNode("div", _hoisted_2, [
                __props.showIcon && isLoading.value ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
                  _createVNode(WorkbenchLoading, { size: 14 })
                ])) : __props.showIcon ? (_openBlock(), _createElementBlock("span", {
                  key: 1,
                  class: "wb-message__icon",
                  "data-status-icon": statusIconName.value
                }, [
                  _createVNode(WorkbenchStatusIcon, { name: statusIconName.value }, null, 8, ["name"])
                ], 8, _hoisted_4)) : _createCommentVNode("v-if", true),
                _createElementVNode("div", _hoisted_5, [
                  _createElementVNode("p", _hoisted_6, [
                    _createTextVNode(
                      _toDisplayString(__props.message),
                      1
                      /* TEXT */
                    ),
                    __props.linkLabel && __props.linkHref ? (_openBlock(), _createBlock(WorkbenchLink, {
                      key: 0,
                      href: __props.linkHref,
                      class: "wb-message__link",
                      onClick: activateLink
                    }, {
                      default: _withCtx(() => [
                        _createTextVNode(
                          _toDisplayString(__props.linkLabel),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["href"])) : _createCommentVNode("v-if", true)
                  ]),
                  __props.checkboxLabel ? (_openBlock(), _createBlock(WorkbenchCheckbox, {
                    key: 0,
                    class: "wb-message__checkbox",
                    "model-value": __props.checkboxChecked,
                    label: __props.checkboxLabel,
                    "no-wrap": true,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("update:checkboxChecked", $event))
                  }, null, 8, ["model-value", "label"])) : _createCommentVNode("v-if", true)
                ])
              ]),
              __props.showClose ? (_openBlock(), _createElementBlock("button", {
                key: 0,
                class: "wb-message__close",
                type: "button",
                "aria-label": "\u5173\u95ED\u63D0\u793A",
                onClick: _cache[1] || (_cache[1] = ($event) => dismiss("button"))
              }, [
                _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_10px" })
              ])) : _createCommentVNode("v-if", true)
            ], 46, _hoisted_1)) : _createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        })
      ])) : (_openBlock(), _createBlock(_Transition, {
        key: 1,
        name: "message",
        appear: ""
      }, {
        default: _withCtx(() => [
          __props.modelValue ? (_openBlock(), _createElementBlock("section", {
            style: _normalizeStyle(_unref(messageNativeGeometry)),
            key: __props.messageKey || __props.message,
            class: _normalizeClass(["wb-message wb-message--dialog", [`wb-message--${__props.type}`, { "has-icon": __props.showIcon, "has-close": __props.showClose }]]),
            onMouseenter: _cache[8] || (_cache[8] = ($event) => _unref(timer).pause("pointer")),
            onMouseleave: _cache[9] || (_cache[9] = ($event) => _unref(timer).resume("pointer")),
            onFocusin: _cache[10] || (_cache[10] = ($event) => _unref(timer).pause("focus")),
            onFocusout: _cache[11] || (_cache[11] = ($event) => !$event.currentTarget.contains($event.relatedTarget) && _unref(timer).resume("focus")),
            role: role.value,
            "aria-live": role.value === "status" ? "polite" : "assertive"
          }, [
            _createElementVNode("div", _hoisted_8, [
              __props.showIcon && isLoading.value ? (_openBlock(), _createElementBlock("span", _hoisted_9, [
                _createVNode(WorkbenchLoading, { size: 14 })
              ])) : __props.showIcon ? (_openBlock(), _createElementBlock("span", {
                key: 1,
                class: "wb-message__icon",
                "data-status-icon": statusIconName.value
              }, [
                _createVNode(WorkbenchStatusIcon, { name: statusIconName.value }, null, 8, ["name"])
              ], 8, _hoisted_10)) : _createCommentVNode("v-if", true),
              _createElementVNode("div", _hoisted_11, [
                _createElementVNode("p", _hoisted_12, [
                  _createTextVNode(
                    _toDisplayString(__props.message),
                    1
                    /* TEXT */
                  ),
                  __props.linkLabel && __props.linkHref ? (_openBlock(), _createBlock(WorkbenchLink, {
                    key: 0,
                    href: __props.linkHref,
                    class: "wb-message__link",
                    onClick: activateLink
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString(__props.linkLabel),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["href"])) : _createCommentVNode("v-if", true)
                ]),
                __props.checkboxLabel ? (_openBlock(), _createBlock(WorkbenchCheckbox, {
                  key: 0,
                  class: "wb-message__checkbox",
                  "model-value": __props.checkboxChecked,
                  label: __props.checkboxLabel,
                  "no-wrap": true,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => emit("update:checkboxChecked", $event))
                }, null, 8, ["model-value", "label"])) : _createCommentVNode("v-if", true)
              ])
            ]),
            __props.showClose ? (_openBlock(), _createElementBlock("button", {
              key: 0,
              class: "wb-message__close",
              type: "button",
              "aria-label": "\u5173\u95ED\u63D0\u793A",
              onClick: _cache[7] || (_cache[7] = ($event) => dismiss("button"))
            }, [
              _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_10px" })
            ])) : _createCommentVNode("v-if", true)
          ], 46, _hoisted_7)) : _createCommentVNode("v-if", true)
        ]),
        _: 1
        /* STABLE */
      }));
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
