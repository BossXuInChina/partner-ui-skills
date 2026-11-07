import { defineComponent as _defineComponent } from "vue";
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Fragment as _Fragment, unref as _unref, createVNode as _createVNode, withDirectives as _withDirectives, vModelText as _vModelText, createTextVNode as _createTextVNode, withModifiers as _withModifiers, withCtx as _withCtx, createBlock as _createBlock, vShow as _vShow, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["aria-labelledby"];
const _hoisted_2 = ["id"];
const _hoisted_3 = { class: "history-delete-title" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = {
  key: 1,
  class: "history-error",
  role: "alert"
};
const _hoisted_6 = { class: "history-confirm-actions" };
const _hoisted_7 = ["disabled"];
const _hoisted_8 = ["disabled"];
const _hoisted_9 = ["id"];
const _hoisted_10 = {
  key: 0,
  class: "history-error",
  role: "alert"
};
const _hoisted_11 = { class: "history-confirm-actions" };
const _hoisted_12 = ["disabled"];
const _hoisted_13 = ["disabled"];
const _hoisted_14 = { class: "history-browse" };
const _hoisted_15 = { class: "history-heading" };
const _hoisted_16 = ["id"];
const _hoisted_17 = ["disabled"];
const _hoisted_18 = { class: "history-search-core" };
const _hoisted_19 = {
  key: 0,
  class: "history-hint"
};
const _hoisted_20 = {
  key: 1,
  class: "history-error",
  role: "alert"
};
const _hoisted_21 = ["disabled"];
const _hoisted_22 = ["aria-busy"];
const _hoisted_23 = ["aria-label", "aria-pressed", "disabled", "onClick"];
const _hoisted_24 = ["aria-label", "aria-current", "disabled", "onClick"];
const _hoisted_25 = {
  key: 1,
  class: "history-empty"
};
const _hoisted_26 = ["aria-expanded"];
import { vAiTooltip } from "../foundation/aiTooltip";
import { useDeliveryMode } from "../foundation/deliveryMode";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import { default as TrHistory } from "robot/packages/components/src/history/index.ts";
import { AiIcon } from "../foundation/aiIcons";
import { useAutoScrollbars } from "../foundation/useAutoScrollbars";
import ConversationMoreMenu from "./ConversationMoreMenu.vue";
import { groupConversationHistory } from "./conversationHistory";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "ConversationHistoryPanel",
  props: {
    anchor: {},
    open: { type: Boolean },
    records: {},
    selected: {},
    busy: { type: Boolean },
    error: {},
    readFailed: { type: Boolean },
    blocked: { type: Boolean },
    clear: { type: Function },
    remove: { type: Function },
    select: { type: Function }
  },
  emits: ["close", "closed", "pin", "reload"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const delivery = useDeliveryMode();
    const id = `history-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
    let changingPane = false;
    const visible = ref(false), moreId = ref(""), deleting = ref(), deleteFailure = ref("");
    const query = ref(""), earlier = ref(false), confirming = ref(false), style = ref({});
    const search = ref(), cancel = ref(), clearButton = ref();
    const content = ref(), list = ref();
    useAutoScrollbars(() => content.value, [{ selector: ".history-list", axis: "y" }]);
    const now = ref(Date.now());
    const groups = computed(() => groupConversationHistory(props.records, query.value, earlier.value, now.value));
    const hasRecords = computed(() => props.records.some((item) => item.messages.length || item.view.draft));
    const hasEarlier = computed(() => props.records.some((item) => !item.pinned && item.updatedAt < now.value - 30 * 864e5 && (item.messages.length || item.view.draft)));
    let observer;
    let frame = 0, enterFrame = 0, leaveTimer = 0;
    function position() {
      const hostElement = props.anchor.closest(".chat-panel");
      const host = hostElement?.getBoundingClientRect() ?? props.anchor.getBoundingClientRect();
      const box = props.anchor.getBoundingClientRect(), viewportWidth = document.documentElement.clientWidth, viewportHeight = document.documentElement.clientHeight;
      const width = Math.max(0, Math.min(300, host.width - 24, viewportWidth - 24));
      const left = Math.max(12, host.left + 12, Math.min(box.right - width, host.right - width - 12, viewportWidth - width - 12));
      const top = Math.max(12, Math.min(box.bottom + 8, viewportHeight - 100));
      const composerTop = hostElement?.querySelector(".composer")?.getBoundingClientRect().top;
      const bottom = Math.min(host.bottom - 12, viewportHeight - 12, composerTop && composerTop - top >= 80 ? composerTop - 8 : Infinity);
      const next = { left: `${left}px`, top: `${top}px`, width: `${width}px`, maxHeight: `${Math.min(520, Math.max(80, bottom - top))}px` };
      const port = list.value;
      if (port) {
        const gutter = port.offsetWidth - port.clientWidth;
        const nativeTrack = parseFloat(getComputedStyle(port, "::-webkit-scrollbar").width);
        const track = gutter || (Number.isFinite(nativeTrack) ? nativeTrack : 14);
        Object.assign(next, { "--history-scroll-extension": `${(16 + track) / 2}px`, "--history-native-gutter": `${gutter}px` });
      }
      if (JSON.stringify(style.value) !== JSON.stringify(next)) style.value = next;
    }
    function followAnchor() {
      position();
      frame = requestAnimationFrame(followAnchor);
    }
    function close(restore = true) {
      if (!props.open || props.busy) return;
      if (deleting.value) void cancelDelete();
      else if (moreId.value) moreId.value = "";
      else if (confirming.value) void cancelClear();
      else {
        if (restore) props.anchor.focus({ preventScroll: true });
        emit("close");
      }
    }
    function outside(event) {
      if (!props.open) return;
      if (event.target instanceof Node && !content.value?.contains(event.target) && !props.anchor.contains(event.target)) {
        if (props.busy) return;
        if (content.value?.contains(document.activeElement)) props.anchor.focus({ preventScroll: true });
        emit("close");
      }
    }
    function focusOutside(event) {
      if (!props.open || changingPane) return;
      if (event.target instanceof Node && !content.value?.contains(event.target) && !props.anchor.contains(event.target) && !props.busy) emit("close");
    }
    function escape(event) {
      if (props.open && event.key === "Escape" && !document.querySelector("dialog[open]")) {
        event.preventDefault();
        event.stopPropagation();
        close();
      }
    }
    async function requestDelete(item) {
      if (!item.id || props.busy || props.blocked) return;
      changingPane = true;
      moreId.value = "";
      deleteFailure.value = "";
      deleting.value = item;
      await nextTick();
      cancel.value?.focus();
      changingPane = false;
    }
    async function cancelDelete() {
      changingPane = true;
      const recordId = deleting.value?.id;
      deleting.value = void 0;
      deleteFailure.value = "";
      await nextTick();
      const trigger = [...content.value?.querySelectorAll(".history-more") ?? []].find((button) => button.dataset.recordId === recordId);
      (trigger ?? search.value)?.focus({ preventScroll: true });
      changingPane = false;
    }
    async function deleteOne() {
      const item = deleting.value;
      if (!item?.id || props.busy || props.blocked) return;
      if (await props.remove(item.id)) {
        deleting.value = void 0;
        deleteFailure.value = "";
        await nextTick();
        search.value?.focus();
      } else deleteFailure.value = "\u5220\u9664\u5931\u8D25\uFF0C\u5BF9\u8BDD\u4ECD\u4FDD\u7559\uFF0C\u8BF7\u91CD\u8BD5\u3002";
    }
    async function confirmClear() {
      if (props.blocked || props.busy) return;
      confirming.value = true;
      await nextTick();
      cancel.value?.focus();
    }
    async function cancelClear() {
      confirming.value = false;
      await nextTick();
      clearButton.value?.focus();
    }
    async function clearAll() {
      if (!props.blocked && await props.clear()) {
        confirming.value = false;
        await nextTick();
        search.value?.focus();
      }
    }
    async function choose(item) {
      if (!item.id || props.busy || props.blocked) return;
      if (await props.select(item.id)) emit("close");
    }
    onMounted(async () => {
      if (!props.open) {
        emit("closed");
        return;
      }
      position();
      content.value?.showPopover();
      if (content.value) void content.value.offsetHeight;
      enterFrame = requestAnimationFrame(() => {
        visible.value = props.open;
      });
      props.anchor.setAttribute("aria-controls", id);
      document.addEventListener("pointerdown", outside, true);
      document.addEventListener("focusin", focusOutside);
      document.addEventListener("keydown", escape, true);
      followAnchor();
      observer = new ResizeObserver(position);
      const host = props.anchor.closest(".chat-panel");
      if (host) observer.observe(host);
      window.addEventListener("resize", position);
      window.addEventListener("scroll", position, true);
      await nextTick();
      search.value?.focus({ preventScroll: true });
    });
    function finishLeave(event) {
      if (event && (event.target !== content.value || event.propertyName !== "opacity")) return;
      if (!props.open) {
        window.clearTimeout(leaveTimer);
        emit("closed");
      }
    }
    watch(() => props.open, (open) => {
      cancelAnimationFrame(enterFrame);
      window.clearTimeout(leaveTimer);
      visible.value = open;
      if (!open) {
        moreId.value = "";
        const duration = content.value ? parseFloat(getComputedStyle(content.value).transitionDuration) * 1e3 : 0;
        leaveTimer = window.setTimeout(() => finishLeave(), duration + 20);
      } else void nextTick(() => search.value?.focus({ preventScroll: true }));
    });
    onBeforeUnmount(() => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(enterFrame);
      window.clearTimeout(leaveTimer);
      observer?.disconnect();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
      document.removeEventListener("pointerdown", outside, true);
      document.removeEventListener("focusin", focusOutside);
      document.removeEventListener("keydown", escape, true);
      if (content.value?.contains(document.activeElement)) props.anchor.focus({ preventScroll: true });
      if (props.anchor.getAttribute("aria-controls") === id) props.anchor.removeAttribute("aria-controls");
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", {
        id,
        ref_key: "content",
        ref: content,
        popover: "manual",
        class: _normalizeClass(["conversation-history-panel history-content", { "is-visible": visible.value }]),
        role: "dialog",
        "aria-modal": "false",
        "aria-labelledby": `${id}-${deleting.value || confirming.value ? "title" : "browse-title"}`,
        style: _normalizeStyle(style.value),
        onTransitionend: finishLeave
      }, [
        deleting.value ? (_openBlock(), _createElementBlock(
          _Fragment,
          { key: 0 },
          [
            _createElementVNode("h2", {
              id: `${id}-title`
            }, "\u5220\u9664\u8FD9\u6761\u5BF9\u8BDD\uFF1F", 8, _hoisted_2),
            _createElementVNode(
              "p",
              _hoisted_3,
              "\u300C" + _toDisplayString(deleting.value.title) + "\u300D",
              1
              /* TEXT */
            ),
            _cache[4] || (_cache[4] = _createElementVNode(
              "p",
              null,
              "\u5C06\u6C38\u4E45\u5220\u9664\u8FD9\u6761\u5BF9\u8BDD\u7684\u5168\u90E8\u6D88\u606F\u548C\u8F93\u5165\u8349\u7A3F\uFF0C\u65E0\u6CD5\u64A4\u9500\u3002",
              -1
              /* CACHED */
            )),
            deleting.value.id === __props.selected ? (_openBlock(), _createElementBlock("p", _hoisted_4, "\u5220\u9664\u5F53\u524D\u5BF9\u8BDD\u540E\u5C06\u56DE\u5230\u65B0\u5BF9\u8BDD\uFF1B\u6B63\u5728\u751F\u6210\u7684\u56DE\u590D\u5C06\u505C\u6B62\u3002")) : _createCommentVNode("v-if", true),
            deleteFailure.value ? (_openBlock(), _createElementBlock(
              "p",
              _hoisted_5,
              _toDisplayString(deleteFailure.value),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            _createElementVNode("div", _hoisted_6, [
              _createElementVNode("button", {
                ref_key: "cancel",
                ref: cancel,
                class: "button button--quiet",
                disabled: __props.busy,
                onClick: cancelDelete
              }, "\u53D6\u6D88", 8, _hoisted_7),
              _createElementVNode("button", {
                class: "button button--primary",
                disabled: __props.busy || __props.blocked,
                onClick: deleteOne
              }, _toDisplayString(__props.busy ? "\u5220\u9664\u4E2D\u2026" : "\u786E\u8BA4\u5220\u9664"), 9, _hoisted_8)
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        )) : confirming.value ? (_openBlock(), _createElementBlock(
          _Fragment,
          { key: 1 },
          [
            _createElementVNode("h2", {
              id: `${id}-title`
            }, "\u6E05\u7A7A\u5168\u90E8\u5386\u53F2\u5BF9\u8BDD\uFF1F", 8, _hoisted_9),
            _cache[5] || (_cache[5] = _createElementVNode(
              "p",
              null,
              "\u5C06\u5220\u9664\u672C\u4EA7\u54C1\u5168\u90E8\u5386\u53F2\u5BF9\u8BDD\uFF0C\u5305\u542B\u7F6E\u9876\u4F1A\u8BDD\u3001\u6240\u6709\u6D88\u606F\u548C\u8F93\u5165\u8349\u7A3F\u3002\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002",
              -1
              /* CACHED */
            )),
            __props.error ? (_openBlock(), _createElementBlock(
              "p",
              _hoisted_10,
              _toDisplayString(__props.error),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            _createElementVNode("div", _hoisted_11, [
              _createElementVNode("button", {
                ref_key: "cancel",
                ref: cancel,
                class: "button button--quiet",
                disabled: __props.busy,
                onClick: cancelClear
              }, "\u53D6\u6D88", 8, _hoisted_12),
              _createElementVNode("button", {
                class: "button button--primary",
                disabled: __props.busy || __props.blocked,
                onClick: clearAll
              }, _toDisplayString(__props.busy ? "\u6E05\u7A7A\u4E2D\u2026" : "\u786E\u8BA4\u6E05\u7A7A"), 9, _hoisted_13)
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        )) : _createCommentVNode("v-if", true),
        _withDirectives(_createElementVNode(
          "div",
          _hoisted_14,
          [
            _createElementVNode("header", _hoisted_15, [
              _createElementVNode("h2", {
                id: `${id}-browse-title`
              }, "\u5386\u53F2\u5BF9\u8BDD", 8, _hoisted_16),
              _withDirectives((_openBlock(), _createElementBlock("button", {
                ref_key: "clearButton",
                ref: clearButton,
                class: "history-clear",
                type: "button",
                "aria-label": "\u6E05\u7A7A\u5386\u53F2",
                disabled: __props.busy || __props.blocked || !hasRecords.value,
                onClick: confirmClear
              }, [
                _createVNode(_unref(AiIcon), {
                  name: "history.clear",
                  "aria-hidden": "true"
                })
              ], 8, _hoisted_17)), [
                [_unref(vAiTooltip), { content: "\u6E05\u7A7A\u5386\u53F2", disabled: !__props.open, closeOnPointerLeave: true }]
              ])
            ]),
            _createElementVNode("div", _hoisted_18, [
              _createVNode(_unref(AiIcon), {
                name: "history.search",
                class: "history-search-icon",
                "aria-hidden": "true"
              }),
              _withDirectives(_createElementVNode(
                "input",
                {
                  ref_key: "search",
                  ref: search,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => query.value = $event),
                  class: "history-search",
                  type: "search",
                  "aria-label": "\u641C\u7D22\u5386\u53F2\u5BF9\u8BDD\u6807\u9898",
                  placeholder: "\u641C\u7D22\u5386\u53F2\u5BF9\u8BDD",
                  autocomplete: "off"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [_vModelText, query.value]
              ]),
              query.value ? _withDirectives((_openBlock(), _createElementBlock("button", {
                key: 0,
                class: "history-search-clear",
                "aria-label": "\u6E05\u9664\u641C\u7D22",
                type: "button",
                onClick: _cache[1] || (_cache[1] = ($event) => {
                  query.value = "";
                  search.value?.focus();
                })
              }, [
                _createVNode(_unref(AiIcon), {
                  name: "history.clearSearch",
                  "aria-hidden": "true"
                })
              ])), [
                [_unref(vAiTooltip), { content: "\u6E05\u9664\u641C\u7D22", disabled: !__props.open, closeOnPointerLeave: true }]
              ]) : _createCommentVNode("v-if", true)
            ]),
            __props.blocked ? (_openBlock(), _createElementBlock("p", _hoisted_19, "\u8BF7\u5148\u5B8C\u6210\u6216\u53D6\u6D88\u5F53\u524D\u4E1A\u52A1\u7F16\u8F91\u3002")) : _createCommentVNode("v-if", true),
            __props.error ? (_openBlock(), _createElementBlock("p", _hoisted_20, [
              _createTextVNode(
                _toDisplayString(__props.error) + " ",
                1
                /* TEXT */
              ),
              _createElementVNode("button", {
                class: "text-button",
                disabled: __props.busy,
                onClick: _cache[2] || (_cache[2] = ($event) => emit("reload"))
              }, _toDisplayString(__props.readFailed ? "\u91CD\u65B0\u8BFB\u53D6" : "\u91CD\u8BD5\u4FDD\u5B58"), 9, _hoisted_21)
            ])) : _createCommentVNode("v-if", true),
            _createElementVNode("div", {
              ref_key: "list",
              ref: list,
              class: "history-list",
              "aria-busy": __props.busy
            }, [
              groups.value.length ? (_openBlock(), _createBlock(_unref(TrHistory), {
                key: 0,
                data: groups.value,
                selected: __props.selected,
                "menu-items": [],
                onItemClick: choose
              }, {
                "item-prefix": _withCtx(({ item }) => [
                  !_unref(delivery) ? _withDirectives((_openBlock(), _createElementBlock("button", {
                    key: 0,
                    class: "history-pin",
                    "aria-label": `${item.pinned ? "\u53D6\u6D88\u7F6E\u9876" : "\u7F6E\u9876"}\uFF1A${item.title}`,
                    "aria-pressed": item.pinned,
                    disabled: __props.busy,
                    onClick: _withModifiers(($event) => item.id && emit("pin", item.id), ["stop"])
                  }, [
                    _createVNode(_unref(AiIcon), {
                      name: "history.pin",
                      "aria-hidden": "true"
                    })
                  ], 8, _hoisted_23)), [
                    [_unref(vAiTooltip), { content: item.pinned ? "\u53D6\u6D88\u7F6E\u9876" : "\u7F6E\u9876", disabled: !__props.open, closeOnPointerLeave: true }]
                  ]) : _createCommentVNode("v-if", true),
                  _createVNode(ConversationMoreMenu, {
                    title: item.title,
                    "record-id": item.id ?? "",
                    open: moreId.value === item.id,
                    "parent-open": __props.open,
                    disabled: __props.busy || __props.blocked,
                    onToggle: ($event) => moreId.value = moreId.value === item.id ? "" : item.id ?? "",
                    onClose: ($event) => moreId.value === item.id && (moreId.value = ""),
                    onAction: (action) => action.id === "delete" && requestDelete(item)
                  }, null, 8, ["title", "record-id", "open", "parent-open", "disabled", "onToggle", "onClose", "onAction"])
                ]),
                "item-title": _withCtx(({ item }) => [
                  _withDirectives((_openBlock(), _createElementBlock("button", {
                    class: "history-title",
                    "aria-label": `\u5207\u6362\u4F1A\u8BDD\uFF1A${item.title}`,
                    "aria-current": item.id === __props.selected ? "true" : void 0,
                    disabled: __props.busy || __props.blocked,
                    onClick: _withModifiers(($event) => choose(item), ["stop"])
                  }, [
                    _createElementVNode(
                      "span",
                      null,
                      _toDisplayString(item.title),
                      1
                      /* TEXT */
                    )
                  ], 8, _hoisted_24)), [
                    [_unref(vAiTooltip), { content: item.title, overflowOnly: true, overflowSelector: "span", disabled: !__props.open }]
                  ])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["data", "selected"])) : (_openBlock(), _createElementBlock(
                "p",
                _hoisted_25,
                _toDisplayString(query.value.trim() ? "\u672A\u627E\u5230\u5339\u914D\u7684\u5386\u53F2\u5BF9\u8BDD" : "\u6682\u65E0\u5386\u53F2\u5BF9\u8BDD"),
                1
                /* TEXT */
              )),
              hasEarlier.value && !query.value.trim() ? (_openBlock(), _createElementBlock("button", {
                key: 2,
                class: "history-earlier text-button",
                "aria-expanded": earlier.value,
                onClick: _cache[3] || (_cache[3] = ($event) => earlier.value = !earlier.value)
              }, _toDisplayString(earlier.value ? "\u6536\u8D77\u66F4\u65E9\u5BF9\u8BDD" : "\u67E5\u770B\u66F4\u65E9\u5BF9\u8BDD"), 9, _hoisted_26)) : _createCommentVNode("v-if", true)
            ], 8, _hoisted_22)
          ],
          512
          /* NEED_PATCH */
        ), [
          [_vShow, !confirming.value && !deleting.value]
        ])
      ], 46, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-1a517edf" });
