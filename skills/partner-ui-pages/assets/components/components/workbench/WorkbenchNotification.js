import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createVNode as _createVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, createBlock as _createBlock, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, TransitionGroup as _TransitionGroup } from "vue";
const _hoisted_1 = ["aria-label", "role", "onMouseenter", "onMouseleave", "onFocusin", "onFocusout"];
const _hoisted_2 = ["data-status-icon"];
const _hoisted_3 = {
  key: 1,
  class: "notification-stack__title"
};
const _hoisted_4 = {
  key: 2,
  class: "notification-stack__header-copy"
};
const _hoisted_5 = {
  key: 0,
  class: "notification-stack__description"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 4,
  class: "notification-stack__description-row"
};
const _hoisted_8 = {
  key: 0,
  class: "notification-stack__description"
};
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { createAutoDismiss, normalizeDuration } from "../feedback/autoDismiss.js";
import { computed, onBeforeUnmount, watch } from "vue";
import WorkbenchLink from "../link/WorkbenchLink.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchStatusIcon from "../icons/WorkbenchStatusIcon.vue";
const __sfc_main__ = {
  __name: "NotificationStack",
  props: {
    items: { type: Array, default: () => [] },
    surface: {
      type: String,
      default: "default",
      validator: (value) => ["default", "subtle"].includes(value)
    },
    duration: { type: Number, default: 5e3 }
  },
  emits: ["dismiss", "link"],
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
    const timers = /* @__PURE__ */ new Map();
    const dismissed = /* @__PURE__ */ new Set();
    const visibleItems = computed(() => props.items.slice(0, 3));
    const statusIconName = (type) => `${statusIconSemantics[type]}/solid/16`;
    function dismiss(item, reason) {
      if (dismissed.has(item.id)) return;
      dismissed.add(item.id);
      timers.get(item.id)?.dispose();
      emit("dismiss", { id: item.id, reason });
    }
    function pause(item, reason) {
      timers.get(item.id)?.pause(reason);
    }
    function resume(item, reason) {
      timers.get(item.id)?.resume(reason);
    }
    function onFocusOut(event, item) {
      if (!event.currentTarget.contains(event.relatedTarget)) resume(item, "focus");
    }
    watch(
      () => [props.items.map((item) => item.id), props.duration],
      (_, previous) => {
        const ids = new Set(props.items.map((item) => item.id));
        for (const [id, timer] of timers)
          if (!ids.has(id)) {
            timer.dispose();
            timers.delete(id);
          }
        for (const id of dismissed) if (!ids.has(id)) dismissed.delete(id);
        for (const item of visibleItems.value) {
          if (dismissed.has(item.id)) continue;
          const existing = timers.get(item.id);
          const timer = existing || createAutoDismiss(() => dismiss(item, "timeout"));
          timers.set(item.id, timer);
          if (!existing || previous?.[1] !== props.duration)
            timer.reset(normalizeDuration(props.duration, 5e3));
        }
        for (const item of props.items.slice(3)) dismiss(item, "overflow");
      },
      { immediate: true }
    );
    onBeforeUnmount(() => {
      for (const timer of timers.values()) timer.dispose();
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(_TransitionGroup, {
        name: "notification",
        tag: "section",
        class: "notification-stack",
        "aria-label": "\u901A\u77E5\u63D0\u9192"
      }, {
        default: _withCtx(() => [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(visibleItems.value, (item, index) => {
              return _openBlock(), _createElementBlock("article", {
                key: item.id,
                class: _normalizeClass(["notification-stack__item", [
                  `notification-stack__item--${item.type}`,
                  `is-${__props.surface}`,
                  `stack-index-${index}`,
                  { "has-icon": item.showIcon !== false, "has-close": item.showClose !== false }
                ]]),
                "aria-label": item.title || item.description || item.linkLabel,
                role: item.type === "error" || item.type === "critical" ? "alert" : "status",
                onMouseenter: ($event) => pause(item, "pointer"),
                onMouseleave: ($event) => resume(item, "pointer"),
                onFocusin: ($event) => pause(item, "focus"),
                onFocusout: ($event) => onFocusOut($event, item)
              }, [
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass(["notification-stack__header", { "has-icon": item.showIcon !== false, "has-close": item.showClose !== false }])
                  },
                  [
                    item.showIcon !== false ? (_openBlock(), _createElementBlock("span", {
                      key: 0,
                      class: "notification-stack__icon",
                      "data-status-icon": statusIconName(item.type),
                      "aria-hidden": "true"
                    }, [
                      _createVNode(WorkbenchStatusIcon, {
                        name: statusIconName(item.type)
                      }, null, 8, ["name"])
                    ], 8, _hoisted_2)) : _createCommentVNode("v-if", true),
                    item.title ? (_openBlock(), _createElementBlock(
                      "strong",
                      _hoisted_3,
                      _toDisplayString(item.title),
                      1
                      /* TEXT */
                    )) : (_openBlock(), _createElementBlock("div", _hoisted_4, [
                      item.description ? (_openBlock(), _createElementBlock(
                        "p",
                        _hoisted_5,
                        _toDisplayString(item.description),
                        1
                        /* TEXT */
                      )) : _createCommentVNode("v-if", true),
                      item.linkLabel && item.linkHref ? (_openBlock(), _createBlock(WorkbenchLink, {
                        key: 1,
                        href: item.linkHref,
                        class: "notification-stack__link",
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
                    ])),
                    item.showClose !== false ? (_openBlock(), _createElementBlock("button", {
                      key: 3,
                      type: "button",
                      class: "notification-stack__close",
                      "aria-label": "\u5173\u95ED\u901A\u77E5",
                      onClick: ($event) => dismiss(item, "button")
                    }, [
                      _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_10px" })
                    ], 8, _hoisted_6)) : _createCommentVNode("v-if", true),
                    item.title && (item.description || item.linkLabel && item.linkHref) ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
                      item.description ? (_openBlock(), _createElementBlock(
                        "p",
                        _hoisted_8,
                        _toDisplayString(item.description),
                        1
                        /* TEXT */
                      )) : _createCommentVNode("v-if", true),
                      item.linkLabel && item.linkHref ? (_openBlock(), _createBlock(WorkbenchLink, {
                        key: 1,
                        href: item.linkHref,
                        class: "notification-stack__link",
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
                    ])) : _createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )
              ], 42, _hoisted_1);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      });
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
