import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, unref as _unref, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, createBlock as _createBlock, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, TransitionGroup as _TransitionGroup, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["onMouseenter", "onMouseleave", "onFocusin", "onFocusout", "role", "aria-live"];
const _hoisted_2 = { class: "wb-message__main" };
const _hoisted_3 = {
  key: 0,
  class: "wb-message__icon wb-message__icon--loading",
  "aria-hidden": "true"
};
const _hoisted_4 = ["data-status-icon"];
const _hoisted_5 = { class: "wb-message__body" };
const _hoisted_6 = { class: "wb-message__copy" };
const _hoisted_7 = ["onClick"];
import { messageNativeGeometry } from "./messageNativeGeometry.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import "./message-motion.css";
import { computed, onBeforeUnmount, watch } from "vue";
import { createAutoDismiss, normalizeDuration } from "../feedback/autoDismiss.js";
import { registerFeedbackHost } from "../overlay/isolation.js";
import WorkbenchCheckbox from "../choice/WorkbenchCheckbox.vue";
import WorkbenchLink from "../link/WorkbenchLink.vue";
import WorkbenchStatusIcon from "../icons/WorkbenchStatusIcon.vue";
import WorkbenchLoading from "../loading/WorkbenchLoading.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
const __sfc_main__ = {
  __name: "GlobalMessageStack",
  props: { items: { type: Array, default: () => [] }, autoClose: { type: Number, default: void 0 } },
  emits: ["dismiss", "link", "checkbox"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const statusIconSemantics = { info: "info", success: "success", warning: "warning", danger: "alert-orange", critical: "alert-red", error: "close_circle" };
    const visibleItems = computed(() => props.items.slice(0, 2));
    const statusIconName = (type) => `${statusIconSemantics[type]}/solid/16`;
    const timers = /* @__PURE__ */ new Map();
    const replacementTimers = /* @__PURE__ */ new Map();
    const dismissed = /* @__PURE__ */ new Set();
    const feedbackRefs = /* @__PURE__ */ new Map();
    const feedbackReleases = /* @__PURE__ */ new Map();
    function feedbackRef(id) {
      if (!feedbackRefs.has(id))
        feedbackRefs.set(id, (root) => {
          const previous = feedbackReleases.get(id);
          if (previous?.root === root) return;
          previous?.release();
          if (root) feedbackReleases.set(id, { root, release: registerFeedbackHost(root) });
          else feedbackReleases.delete(id);
        });
      return feedbackRefs.get(id);
    }
    function dismiss(item, reason) {
      if (!item || dismissed.has(item.id)) return;
      dismissed.add(item.id);
      timers.get(item.id)?.timer.dispose();
      clearTimeout(replacementTimers.get(item.id));
      replacementTimers.delete(item.id);
      emit("dismiss", { id: item.id, reason });
    }
    watch(() => props.items.map((item) => [item.id, item.messageKey, item.message, item.type, props.autoClose]), () => {
      const ids = new Set(props.items.map((item) => item.id));
      for (const id of feedbackRefs.keys()) if (!ids.has(id)) feedbackRefs.delete(id);
      for (const [id, entry] of timers) if (!ids.has(id)) {
        entry.timer.dispose();
        timers.delete(id);
      }
      for (const [id, replacementTimer] of replacementTimers) if (!ids.has(id)) {
        clearTimeout(replacementTimer);
        replacementTimers.delete(id);
      }
      for (const id of dismissed) if (!ids.has(id)) dismissed.delete(id);
      for (const item of props.items.slice(1)) {
        if (replacementTimers.has(item.id) || dismissed.has(item.id)) continue;
        replacementTimers.set(item.id, setTimeout(() => dismiss(item, "replaced"), 200));
      }
      for (const item of props.items.slice(0, 1)) {
        const signature = JSON.stringify([item.messageKey, item.message, item.type, props.autoClose]);
        const entry = timers.get(item.id);
        if (entry?.signature === signature) continue;
        dismissed.delete(item.id);
        const timer = entry?.timer || createAutoDismiss(() => dismiss(item, "timeout"));
        timers.set(item.id, { timer, signature });
        timer.reset(item.type === "loading" ? 0 : normalizeDuration(props.autoClose, 2e3));
      }
    }, { immediate: true });
    onBeforeUnmount(() => {
      for (const entry of feedbackReleases.values()) entry.release();
      feedbackReleases.clear();
      feedbackRefs.clear();
      for (const entry of timers.values()) entry.timer.dispose();
      for (const replacementTimer of replacementTimers.values()) clearTimeout(replacementTimer);
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(_Teleport, { to: "body" }, [
        _createVNode(_TransitionGroup, {
          appear: "",
          name: "message",
          tag: "section",
          class: "wb-message-stack",
          "aria-label": "\u5168\u5C40\u64CD\u4F5C\u53CD\u9988"
        }, {
          default: _withCtx(() => [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(visibleItems.value, (item, index) => {
                return _openBlock(), _createElementBlock("section", {
                  style: _normalizeStyle(_unref(messageNativeGeometry)),
                  key: item.id,
                  ref_for: true,
                  ref: feedbackRef(item.id),
                  onMouseenter: ($event) => _unref(timers).get(item.id)?.timer.pause("pointer"),
                  onMouseleave: ($event) => _unref(timers).get(item.id)?.timer.resume("pointer"),
                  onFocusin: ($event) => _unref(timers).get(item.id)?.timer.pause("focus"),
                  onFocusout: ($event) => !$event.currentTarget.contains($event.relatedTarget) && _unref(timers).get(item.id)?.timer.resume("focus"),
                  class: _normalizeClass(["wb-message wb-message--stack", [`wb-message--${item.type}`, { "has-icon": item.showIcon !== false, "has-close": item.showClose !== false, "is-replacing": index > 0 }]]),
                  role: ["critical", "error"].includes(item.type) ? "alert" : "status",
                  "aria-live": ["critical", "error"].includes(item.type) ? "assertive" : "polite"
                }, [
                  _createElementVNode("div", _hoisted_2, [
                    item.showIcon !== false && item.type === "loading" ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
                      _createVNode(WorkbenchLoading, { size: 14 })
                    ])) : item.showIcon !== false ? (_openBlock(), _createElementBlock("span", {
                      key: 1,
                      class: "wb-message__icon",
                      "data-status-icon": statusIconName(item.type)
                    }, [
                      _createVNode(WorkbenchStatusIcon, {
                        name: statusIconName(item.type)
                      }, null, 8, ["name"])
                    ], 8, _hoisted_4)) : _createCommentVNode("v-if", true),
                    _createElementVNode("div", _hoisted_5, [
                      _createElementVNode("p", _hoisted_6, [
                        _createTextVNode(
                          _toDisplayString(item.message),
                          1
                          /* TEXT */
                        ),
                        item.linkLabel && item.linkHref ? (_openBlock(), _createBlock(WorkbenchLink, {
                          key: 0,
                          href: item.linkHref,
                          class: "wb-message__link",
                          onClick: ($event) => emit("link", { id: item.id, href: item.linkHref })
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(
                              _toDisplayString(item.linkLabel),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["href", "onClick"])) : _createCommentVNode("v-if", true)
                      ]),
                      item.checkboxLabel ? (_openBlock(), _createBlock(WorkbenchCheckbox, {
                        key: 0,
                        class: "wb-message__checkbox",
                        "model-value": item.checkboxChecked === true,
                        label: item.checkboxLabel,
                        "no-wrap": true,
                        "onUpdate:modelValue": ($event) => emit("checkbox", { id: item.id, checked: $event })
                      }, null, 8, ["model-value", "label", "onUpdate:modelValue"])) : _createCommentVNode("v-if", true)
                    ])
                  ]),
                  item.showClose !== false ? (_openBlock(), _createElementBlock("button", {
                    key: 0,
                    class: "wb-message__close",
                    type: "button",
                    "aria-label": "\u5173\u95ED\u63D0\u793A",
                    onClick: ($event) => dismiss(item, "button")
                  }, [
                    _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_10px" })
                  ], 8, _hoisted_7)) : _createCommentVNode("v-if", true)
                ], 46, _hoisted_1);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          _: 1
          /* STABLE */
        })
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
