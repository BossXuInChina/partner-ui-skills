import { defineComponent as _defineComponent } from "vue";
import { unref as _unref, renderSlot as _renderSlot, withCtx as _withCtx, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, vModelText as _vModelText, withDirectives as _withDirectives, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = ["id", "data-ai-theme"];
const _hoisted_2 = {
  key: 1,
  class: "history-storage-warning",
  role: "alert"
};
const _hoisted_3 = { class: "drawer" };
const _hoisted_4 = ["id"];
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "drawer-body" };
const _hoisted_7 = { class: "status-pill" };
const _hoisted_8 = { class: "field" };
const _hoisted_9 = ["disabled"];
const _hoisted_10 = {
  key: 0,
  class: "error-box",
  role: "alert"
};
const _hoisted_11 = ["disabled"];
const _hoisted_12 = ["disabled"];
const _hoisted_13 = { class: "confirm-modal" };
const _hoisted_14 = ["id"];
const _hoisted_15 = {
  key: 0,
  class: "error-box",
  role: "alert"
};
const _hoisted_16 = { class: "modal-actions" };
const _hoisted_17 = ["disabled"];
const _hoisted_18 = ["disabled"];
const _hoisted_19 = { class: "confirm-modal" };
const _hoisted_20 = ["id"];
const _hoisted_21 = { class: "modal-actions" };
const _hoisted_22 = {
  key: 5,
  class: "toast",
  role: "status"
};
import assistantAvatar from "../assets/assistantAvatar";
import { default as TrThemeProvider } from "robot/packages/components/src/theme-provider/index.ts";
import { computed, toRef, ref } from "vue";
import { AiIcon, provideAiIcons } from "../ui/foundation/aiIcons";
import ChatPanel from "../ui/panel/ChatPanel.vue";
import UiDialog from "../ui/foundation/UiDialog.vue";
import { useAgreementPanel } from "./useAgreementPanel";
import ConversationHistoryPanel from "../ui/history/ConversationHistoryPanel.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "AgreementAssistantPanel",
  props: {
    icons: { default: void 0 },
    businessActionMode: { default: "default" },
    businessDialogScope: { default: void 0 },
    windowMode: { default: void 0 },
    fullscreen: { type: Boolean, default: void 0 },
    adapter: {},
    theme: { default: "workbench" },
    autoStart: { type: Boolean, default: false },
    avatarSrc: { default: assistantAvatar },
    toolbarActions: { default: () => [] },
    modeOptions: { default: () => [] },
    welcomeEntries: { default: () => [] },
    suggestionPills: { default: () => [] },
    messagePrompts: { type: Function, default: void 0 },
    historyOptions: { default: void 0 },
    contentRenderers: { default: () => [] }
  },
  emits: ["businessAction", "workspaceNavigate", "windowModeChange", "fullscreenChange", "windowDragStart", "windowDragKeydown", "status", "toolbarAction", "composerChange", "welcomeAction"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    provideAiIcons(toRef(props, "icons"));
    const emit = __emit;
    const { scopeId, messages, isProcessing, requestState, send, retry, abortRequest, resetting, activeRequestContext, error, selected, confirmation, discard, operationBusy, operationError, toast, dirty, renderers, currentStatus, discardDraft, applyBusinessUpdate, handleEvent, closeDrawer, saveEdit, confirmRenew, newConversation: clearConversation, history, switchConversation, clearHistory, removeConversation } = useAgreementPanel(props, emit, (action) => emit("businessAction", action), (navigation) => emit("workspaceNavigate", navigation));
    const allContentRenderers = computed(() => [...props.contentRenderers, ...renderers]);
    const chat = ref();
    const historyAnchor = ref(), historyShown = ref(false);
    function saveView() {
      if (chat.value) history.updateView(chat.value.captureView());
    }
    async function newConversation() {
      saveView();
      await clearConversation();
    }
    async function selectHistory(id) {
      saveView();
      return switchConversation(id);
    }
    async function removeHistory(id) {
      saveView();
      return removeConversation(id);
    }
    function openHistory(anchor) {
      saveView();
      historyShown.value = historyAnchor.value === anchor ? !historyShown.value : true;
      historyAnchor.value = anchor;
    }
    async function resetAll() {
      await newConversation();
      chat.value?.resetComposer();
    }
    function canSendQuery() {
      return history.ready.value && !history.busy.value && !resetting.value && !isProcessing.value && !operationBusy.value && !dirty.value;
    }
    async function sendQuery(query, context) {
      if (!canSendQuery() || !query.trim()) return false;
      await send(query, context);
      return true;
    }
    function getMessages() {
      return messages.value.map((message, index) => ({ ...message, id: message.id ?? `message-${index}` }));
    }
    __expose({ applyBusinessUpdate, currentStatus, discardDraft, reset: resetAll, newConversation, canSendQuery, sendQuery, getMessages, locateReply: (id) => chat.value?.locateReply(id), start: () => {
      if (!messages.value.length) void send("\u67E5\u8BE2\u5F85\u7EED\u7B7E\u534F\u8BAE");
    } });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", {
        id: _unref(scopeId),
        class: "partner-ai agreement-assistant-panel",
        "data-ai-theme": __props.theme
      }, [
        _createVNode(_unref(TrThemeProvider), {
          theme: __props.theme,
          "color-mode": "light",
          "target-element": `#${_unref(scopeId)}`
        }, {
          default: _withCtx(() => [
            _createVNode(ChatPanel, {
              ref_key: "chat",
              ref: chat,
              "window-mode": __props.windowMode,
              fullscreen: __props.fullscreen,
              messages: _unref(messages),
              processing: _unref(isProcessing) || _unref(resetting) || _unref(history).busy.value || !_unref(history).ready.value,
              "conversation-id": _unref(history).activeId.value,
              "conversation-view": _unref(history).view.value,
              "history-available": "",
              "history-open": historyShown.value,
              error: _unref(error),
              "continuation-available": !!__props.adapter.continueStream,
              aborted: _unref(requestState) === "aborted",
              renderers: allContentRenderers.value,
              "avatar-src": __props.avatarSrc,
              "toolbar-actions": __props.toolbarActions,
              "mode-options": __props.modeOptions,
              "welcome-entries": __props.welcomeEntries,
              "suggestion-pills": __props.suggestionPills,
              "message-prompts": __props.messagePrompts,
              "request-context": _unref(activeRequestContext),
              "new-conversation-disabled": _unref(operationBusy) || _unref(dirty) || _unref(resetting) || _unref(history).busy.value || !_unref(history).ready.value,
              onFullscreenChange: _cache[0] || (_cache[0] = ($event) => emit("fullscreenChange", $event)),
              onHistoryOpen: openHistory,
              onConversationViewChange: _unref(history).updateView,
              onNewConversation: newConversation,
              onComposerChange: _cache[1] || (_cache[1] = ($event) => emit("composerChange", $event)),
              onWelcomeAction: _cache[2] || (_cache[2] = ($event) => emit("welcomeAction", $event)),
              onWindowModeChange: _cache[3] || (_cache[3] = ($event) => emit("windowModeChange", $event)),
              onWindowDragStart: _cache[4] || (_cache[4] = ($event) => emit("windowDragStart", $event)),
              onWindowDragKeydown: _cache[5] || (_cache[5] = ($event) => emit("windowDragKeydown", $event)),
              onToolbarAction: _cache[6] || (_cache[6] = ($event) => emit("toolbarAction", $event)),
              onSend: _unref(send),
              onAbort: _unref(abortRequest),
              onRetry: _unref(retry),
              onEvent: _unref(handleEvent)
            }, {
              "toolbar-end": _withCtx(() => [
                _renderSlot(_ctx.$slots, "toolbar-end")
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["window-mode", "fullscreen", "messages", "processing", "conversation-id", "conversation-view", "history-open", "error", "continuation-available", "aborted", "renderers", "avatar-src", "toolbar-actions", "mode-options", "welcome-entries", "suggestion-pills", "message-prompts", "request-context", "new-conversation-disabled", "onConversationViewChange", "onSend", "onAbort", "onRetry", "onEvent"]),
            historyAnchor.value ? (_openBlock(), _createBlock(ConversationHistoryPanel, {
              key: 0,
              open: historyShown.value,
              anchor: historyAnchor.value,
              records: _unref(history).records.value,
              selected: _unref(history).activeId.value,
              busy: _unref(history).busy.value,
              error: _unref(history).storageError.value,
              "read-failed": _unref(history).readFailed.value,
              blocked: _unref(operationBusy) || _unref(dirty),
              clear: _unref(clearHistory),
              remove: removeHistory,
              select: selectHistory,
              onPin: _unref(history).pin,
              onReload: _cache[7] || (_cache[7] = ($event) => _unref(history).readFailed.value ? _unref(history).load() : _unref(history).flush()),
              onClose: _cache[8] || (_cache[8] = ($event) => historyShown.value = false),
              onClosed: _cache[9] || (_cache[9] = ($event) => !historyShown.value && (historyAnchor.value = void 0))
            }, null, 8, ["open", "anchor", "records", "selected", "busy", "error", "read-failed", "blocked", "clear", "onPin"])) : _createCommentVNode("v-if", true),
            _unref(history).storageError.value && !historyAnchor.value ? (_openBlock(), _createElementBlock(
              "p",
              _hoisted_2,
              _toDisplayString(_unref(history).storageError.value),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            _unref(selected) ? (_openBlock(), _createBlock(UiDialog, {
              key: 2,
              scope: __props.businessDialogScope,
              theme: __props.theme,
              "title-id": `${_unref(scopeId)}-detail`,
              drawer: "",
              onClose: _unref(closeDrawer)
            }, {
              default: _withCtx(() => [
                _createElementVNode("div", _hoisted_3, [
                  _createElementVNode("header", null, [
                    _createElementVNode("div", null, [
                      _cache[21] || (_cache[21] = _createElementVNode(
                        "p",
                        { class: "eyebrow" },
                        "\u534F\u8BAE\u8BE6\u60C5",
                        -1
                        /* CACHED */
                      )),
                      _createElementVNode("h2", {
                        id: `${_unref(scopeId)}-detail`
                      }, _toDisplayString(_unref(selected).name), 9, _hoisted_4)
                    ]),
                    _createElementVNode("button", {
                      class: "icon-button",
                      "aria-label": "\u5173\u95ED\u8BE6\u60C5",
                      "data-initial-focus": "",
                      disabled: _unref(operationBusy),
                      onClick: _cache[10] || (_cache[10] = //@ts-ignore
                      (...args) => _unref(closeDrawer) && _unref(closeDrawer)(...args))
                    }, [
                      _createVNode(_unref(AiIcon), { name: "business.close" })
                    ], 8, _hoisted_5)
                  ]),
                  _createElementVNode("div", _hoisted_6, [
                    _createElementVNode(
                      "span",
                      _hoisted_7,
                      _toDisplayString(_unref(selected).status),
                      1
                      /* TEXT */
                    ),
                    _createElementVNode("dl", null, [
                      _cache[22] || (_cache[22] = _createElementVNode(
                        "dt",
                        null,
                        "\u534F\u8BAE\u7F16\u53F7",
                        -1
                        /* CACHED */
                      )),
                      _createElementVNode(
                        "dd",
                        null,
                        _toDisplayString(_unref(selected).id),
                        1
                        /* TEXT */
                      ),
                      _cache[23] || (_cache[23] = _createElementVNode(
                        "dt",
                        null,
                        "\u5408\u4F5C\u4F19\u4F34",
                        -1
                        /* CACHED */
                      )),
                      _createElementVNode(
                        "dd",
                        null,
                        _toDisplayString(_unref(selected).partner),
                        1
                        /* TEXT */
                      ),
                      _cache[24] || (_cache[24] = _createElementVNode(
                        "dt",
                        null,
                        "\u5230\u671F\u65E5\u671F",
                        -1
                        /* CACHED */
                      )),
                      _createElementVNode(
                        "dd",
                        null,
                        _toDisplayString(_unref(selected).endDate),
                        1
                        /* TEXT */
                      ),
                      _cache[25] || (_cache[25] = _createElementVNode(
                        "dt",
                        null,
                        "\u534F\u8BAE\u91D1\u989D",
                        -1
                        /* CACHED */
                      )),
                      _createElementVNode(
                        "dd",
                        null,
                        _toDisplayString(_unref(selected).amount),
                        1
                        /* TEXT */
                      )
                    ]),
                    _createElementVNode("label", _hoisted_8, [
                      _cache[26] || (_cache[26] = _createElementVNode(
                        "span",
                        null,
                        "\u534F\u8BAE\u8D1F\u8D23\u4EBA",
                        -1
                        /* CACHED */
                      )),
                      _withDirectives(_createElementVNode("input", {
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _unref(selected).owner = $event),
                        maxlength: "40",
                        disabled: _unref(operationBusy),
                        onInput: _cache[12] || (_cache[12] = ($event) => operationError.value = "")
                      }, null, 40, _hoisted_9), [
                        [_vModelText, _unref(selected).owner]
                      ])
                    ]),
                    _cache[27] || (_cache[27] = _createElementVNode(
                      "p",
                      { class: "drawer-note" },
                      "\u8BF7\u6838\u5BF9\u8D1F\u8D23\u4EBA\u540E\u4FDD\u5B58\u3002\u7EED\u7B7E\u7533\u8BF7\u9700\u53E6\u884C\u786E\u8BA4\u3002",
                      -1
                      /* CACHED */
                    )),
                    _unref(operationError) ? (_openBlock(), _createElementBlock(
                      "p",
                      _hoisted_10,
                      _toDisplayString(_unref(operationError)),
                      1
                      /* TEXT */
                    )) : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode("footer", null, [
                    _createElementVNode("button", {
                      class: "button button--quiet",
                      disabled: _unref(operationBusy),
                      onClick: _cache[13] || (_cache[13] = //@ts-ignore
                      (...args) => _unref(closeDrawer) && _unref(closeDrawer)(...args))
                    }, "\u53D6\u6D88", 8, _hoisted_11),
                    _createElementVNode("button", {
                      class: "button button--primary",
                      disabled: _unref(operationBusy) || !_unref(dirty),
                      onClick: _cache[14] || (_cache[14] = //@ts-ignore
                      (...args) => _unref(saveEdit) && _unref(saveEdit)(...args))
                    }, _toDisplayString(_unref(operationBusy) ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58\u4FEE\u6539"), 9, _hoisted_12)
                  ])
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["scope", "theme", "title-id", "onClose"])) : _createCommentVNode("v-if", true),
            _unref(confirmation) ? (_openBlock(), _createBlock(UiDialog, {
              key: 3,
              scope: __props.businessDialogScope,
              theme: __props.theme,
              "title-id": `${_unref(scopeId)}-confirm`,
              onClose: _cache[17] || (_cache[17] = ($event) => !_unref(operationBusy) && (confirmation.value = null))
            }, {
              default: _withCtx(() => [
                _createElementVNode("section", _hoisted_13, [
                  _cache[28] || (_cache[28] = _createElementVNode(
                    "span",
                    { class: "confirm-icon" },
                    "\u21BB",
                    -1
                    /* CACHED */
                  )),
                  _createElementVNode("h2", {
                    id: `${_unref(scopeId)}-confirm`
                  }, "\u786E\u8BA4\u53D1\u8D77\u7EED\u7B7E\uFF1F", 8, _hoisted_14),
                  _createElementVNode(
                    "p",
                    null,
                    "\u5C06\u4E3A\u300C" + _toDisplayString(_unref(confirmation).name) + "\u300D\u521B\u5EFA\u7EED\u7B7E\u7533\u8BF7\u3002\u786E\u8BA4\u4FE1\u606F\u65E0\u8BEF\u540E\u7EE7\u7EED\u3002",
                    1
                    /* TEXT */
                  ),
                  _unref(operationError) ? (_openBlock(), _createElementBlock(
                    "p",
                    _hoisted_15,
                    _toDisplayString(_unref(operationError)),
                    1
                    /* TEXT */
                  )) : _createCommentVNode("v-if", true),
                  _createElementVNode("div", _hoisted_16, [
                    _createElementVNode("button", {
                      class: "button button--quiet",
                      "data-initial-focus": "",
                      disabled: _unref(operationBusy),
                      onClick: _cache[15] || (_cache[15] = ($event) => confirmation.value = null)
                    }, "\u518D\u60F3\u60F3", 8, _hoisted_17),
                    _createElementVNode("button", {
                      class: "button button--primary",
                      disabled: _unref(operationBusy),
                      onClick: _cache[16] || (_cache[16] = //@ts-ignore
                      (...args) => _unref(confirmRenew) && _unref(confirmRenew)(...args))
                    }, _toDisplayString(_unref(operationBusy) ? "\u63D0\u4EA4\u4E2D\u2026" : "\u786E\u8BA4\u53D1\u8D77"), 9, _hoisted_18)
                  ])
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["scope", "theme", "title-id"])) : _createCommentVNode("v-if", true),
            _unref(discard) ? (_openBlock(), _createBlock(UiDialog, {
              key: 4,
              scope: __props.businessDialogScope,
              theme: __props.theme,
              "title-id": `${_unref(scopeId)}-discard`,
              onClose: _cache[20] || (_cache[20] = ($event) => discard.value = false)
            }, {
              default: _withCtx(() => [
                _createElementVNode("section", _hoisted_19, [
                  _createElementVNode("h2", {
                    id: `${_unref(scopeId)}-discard`
                  }, "\u653E\u5F03\u672A\u4FDD\u5B58\u7684\u4FEE\u6539\uFF1F", 8, _hoisted_20),
                  _cache[29] || (_cache[29] = _createElementVNode(
                    "p",
                    null,
                    "\u79BB\u5F00\u540E\u5C06\u6062\u590D\u539F\u8D1F\u8D23\u4EBA\u3002",
                    -1
                    /* CACHED */
                  )),
                  _createElementVNode("div", _hoisted_21, [
                    _createElementVNode("button", {
                      class: "button button--quiet",
                      "data-initial-focus": "",
                      onClick: _cache[18] || (_cache[18] = ($event) => discard.value = false)
                    }, "\u7EE7\u7EED\u7F16\u8F91"),
                    _createElementVNode("button", {
                      class: "button button--primary",
                      onClick: _cache[19] || (_cache[19] = //@ts-ignore
                      (...args) => _unref(discardDraft) && _unref(discardDraft)(...args))
                    }, "\u653E\u5F03\u4FEE\u6539")
                  ])
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["scope", "theme", "title-id"])) : _createCommentVNode("v-if", true),
            _unref(toast) ? (_openBlock(), _createElementBlock("div", _hoisted_22, [
              _createVNode(_unref(AiIcon), { name: "business.success" }),
              _createTextVNode(
                _toDisplayString(_unref(toast)),
                1
                /* TEXT */
              )
            ])) : _createCommentVNode("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["theme", "target-element"])
      ], 8, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-b95a84b5" });
