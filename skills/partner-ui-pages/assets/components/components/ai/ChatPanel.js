import { defineComponent as _defineComponent } from "vue";
import { createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, unref as _unref, openBlock as _openBlock, createElementBlock as _createElementBlock, withDirectives as _withDirectives, vShow as _vShow, createCommentVNode as _createCommentVNode, createVNode as _createVNode, createBlock as _createBlock, renderList as _renderList, Fragment as _Fragment, toDisplayString as _toDisplayString, renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, withCtx as _withCtx } from "vue";
const _hoisted_1 = { class: "chat-handle-row" };
const _hoisted_2 = ["aria-hidden", "role", "tabindex", "aria-label"];
const _hoisted_3 = {
  key: 0,
  class: "chat-identity"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = {
  key: 1,
  class: "assistant-avatar"
};
const _hoisted_6 = {
  class: "chat-toolbar-actions",
  role: "group",
  "aria-label": "AI \u52A9\u624B\u64CD\u4F5C"
};
const _hoisted_7 = {
  key: 1,
  class: "chat-configurable-actions chat-configurable-actions--custom"
};
const _hoisted_8 = ["disabled", "onClick"];
const _hoisted_9 = {
  key: 2,
  class: "chat-configurable-actions"
};
const _hoisted_10 = { class: "composer" };
import assistantAvatar from "../../assets/assistantAvatar";
import { vAiTooltip } from "../foundation/aiTooltip";
import { useDeliveryMode } from "../foundation/deliveryMode";
import { computed, toRef, markRaw, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { ActionButton as TrActionButton } from "robot/packages/components/src/sender-actions/index.ts";
import { BubbleList as TrBubbleList } from "robot/packages/components/src/bubble/index.ts";
import { BubbleProvider as TrBubbleProvider } from "robot/packages/components/src/bubble/index.ts";
import { Layout as TrLayout } from "robot/packages/components/src/layout/index.ts";
import { BubbleRenderers } from "robot/packages/components/src/bubble/index.ts";
import { AiIcon, aiIconVNode, provideAiIcons } from "../foundation/aiIcons";
import { hasChatOutput, resolveChatContent } from "../messages/chatContent";
import FallbackRenderer from "../messages/FallbackRenderer.vue";
import AnswerBox from "../messages/AnswerBox.vue";
import DisplayedTextRenderer from "../messages/DisplayedTextRenderer.vue";
import { presentedRenderer } from "../messages/presentedRenderer";
import "../messages/messageStyles.css";
import "../foundation/aiTokens.css";
import ChatComposer from "../composer/ChatComposer.vue";
import ChatWelcome from "./ChatWelcome.vue";
import MessagePrompts from "../messages/MessagePrompts.vue";
import ComposerSuggestions from "../composer/ComposerSuggestions.vue";
import "../composer/suggestionStyles.css";
import "../foundation/scrollbarStyles.css";
import { useSuggestionShadows } from "../foundation/useSuggestionShadows";
import { useAutoScrollbars } from "../foundation/useAutoScrollbars";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "ChatPanel",
  props: {
    icons: { default: void 0 },
    windowMode: { default: void 0 },
    fullscreen: { type: Boolean, default: void 0 },
    messages: {},
    processing: { type: Boolean },
    continuationAvailable: { type: Boolean, default: false },
    error: {},
    aborted: { type: Boolean },
    renderers: { default: () => [] },
    avatarSrc: { default: assistantAvatar },
    toolbarActions: { default: () => [] },
    modeOptions: { default: () => [] },
    welcomeEntries: { default: () => [] },
    suggestionPills: { default: () => [] },
    messagePrompts: { type: Function, default: void 0 },
    requestContext: { default: void 0 },
    newConversationDisabled: { type: Boolean, default: false },
    conversationId: { default: void 0 },
    conversationView: { default: void 0 },
    historyAvailable: { type: Boolean, default: false },
    historyOpen: { type: Boolean, default: false },
    closable: { type: Boolean, default: false }
  },
  emits: ["close", "windowModeChange", "fullscreenChange", "windowDragStart", "windowDragKeydown", "send", "abort", "retry", "event", "toolbarAction", "newConversation", "historyOpen", "conversationViewChange", "composerChange", "welcomeAction"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    provideAiIcons(toRef(props, "icons"));
    const emit = __emit;
    const draft = ref("");
    const delivery = useDeliveryMode();
    const presenting = ref({}), displayStopped = ref({});
    const uiProcessing = computed(() => props.processing || Object.values(presenting.value).some((item) => item.busy));
    function stopPresentation() {
      const replies = displayMessages.value.filter((message2) => message2.role === "assistant");
      const message = replies.find((message2) => message2.recovering) ?? replies.reverse().find((message2) => presenting.value[message2.id]?.busy) ?? replies.find((message2) => !message2.state?.completion);
      if (!message) {
        if (props.processing) emit("abort");
        return;
      }
      const messageIndex = displayMessages.value.findIndex((item) => item.id === message.id);
      const source = props.messages[messageIndex];
      const thinking = source ? resolveChatContent(source).filter((part) => part.type === "thinking-content").map((part) => ({ ...part, status: "interrupted" })) : [];
      const parts = [...thinking, ...presenting.value[message.id]?.capture() ?? []].flatMap((part) => {
        try {
          return [JSON.parse(JSON.stringify(part))];
        } catch {
          return [];
        }
      });
      displayStopped.value = { ...displayStopped.value, [message.id]: true };
      emit("abort", { messageId: source?.id, messageIndex, parts });
    }
    const showSuggestionPills = computed(() => props.messages.length > 0 && props.suggestionPills.length > 0);
    const composer = ref();
    function sendSuggestion(item) {
      if (item.disabled) return;
      submit(item.query ?? item.label, { aiEnabled: aiEnabled.value, mode: mode.value });
    }
    const promptsByMessage = computed(() => props.messages.map((message) => message.role?.startsWith("assistant") && !message.loading && !message.recovering && !message.replyError && !(props.error && message === props.messages.at(-1)) && message.state?.completion === "completed" ? props.messagePrompts?.(message) ?? [] : []));
    const aiEnabled = ref(false), mode = ref(props.modeOptions.find((option) => !option.disabled)?.value ?? "");
    watch([aiEnabled, mode], () => emit("composerChange", { aiEnabled: aiEnabled.value, mode: mode.value }));
    watch(() => props.modeOptions, (options) => {
      if (!options.some((option) => option.value === mode.value && !option.disabled)) mode.value = options.find((option) => !option.disabled)?.value ?? "";
    }, { deep: true });
    function resetComposer() {
      draft.value = "";
      aiEnabled.value = false;
      mode.value = props.modeOptions.find((option) => !option.disabled)?.value ?? "";
    }
    __expose({ resetComposer, captureView, locateReply });
    watch(() => props.messages.length, (length, before) => {
      if (!props.conversationId && !length && before) resetComposer();
    });
    watch(() => props.conversationId, () => {
      displayStopped.value = {};
      presenting.value = {};
    });
    watch(() => props.messages.length, (length) => {
      if (!length) {
        displayStopped.value = {};
        presenting.value = {};
      }
    });
    const placeholderActions = [
      { id: "agent", label: "agent \u6A21\u5757\u5207\u6362", icon: "panel.mode" },
      { id: "new", label: "\u65B0\u5EFA\u5BF9\u8BDD", icon: "panel.newConversation" },
      { id: "history", label: "\u5386\u53F2\u5BF9\u8BDD\u8BB0\u5F55", icon: "panel.history" }
    ];
    const fullscreenLabel = computed(() => props.fullscreen ? "\u9000\u51FA\u5168\u5C4F" : "\u8FDB\u5165\u5168\u5C4F");
    const visiblePlaceholderActions = computed(() => placeholderActions.filter((action) => !props.fullscreen || action.id !== "agent"));
    const windowActionLabel = computed(() => props.windowMode === void 0 ? "agent \u6A21\u5757\u5207\u6362" : props.windowMode === "floating" ? "\u5207\u6362\u4E3A\u4FA7\u680F\u6A21\u5F0F" : "\u5207\u6362\u4E3A\u60AC\u6D6E\u6A21\u5F0F");
    function toggleWindowMode() {
      if (props.windowMode && !props.fullscreen) emit("windowModeChange", props.windowMode === "sidebar" ? "floating" : "sidebar");
    }
    function toolbarClick(id, event) {
      if (id === "agent") toggleWindowMode();
      else if (id === "new") emit("newConversation");
      else if (id === "history" && props.historyAvailable && event.currentTarget instanceof HTMLElement) emit("historyOpen", event.currentTarget);
    }
    const main = ref();
    const { suggestionShadows: contentEdgeShadows, scheduleSuggestionShadows: scheduleContentShadows, shadowClipStyle: contentShadowClip } = useSuggestionShadows(main, () => [props.messages, props.welcomeEntries, props.processing, props.conversationId], { itemSelector: ".chat-scroll .tr-bubble__box,.chat-scroll .dislike-feedback-card,.chat-scroll .message-prompt,.chat-welcome .chat-welcome-entry", portSelector: ".chat-scroll,.chat-welcome", nativeGutterOnly: true });
    useAutoScrollbars(() => main.value?.closest(".chat-panel") ?? void 0, [{ selector: ".chat-scroll,.chat-welcome", axis: "y" }, { selector: ".table-wrap:not(.agreement-table__viewport)", axis: "x" }]);
    const canScrollUp = ref(false), canScrollDown = ref(false);
    let resizeObserver;
    let observedScrollPort;
    const followBottom = ref(true);
    let lastFollowedScrollTop;
    let scrollFrame = 0;
    let modeScrollFrame = 0;
    let readingAnchor;
    function captureReadingAnchor(scroll) {
      if (!scroll || followBottom.value && scroll.matches(".chat-scroll")) return void 0;
      const viewportTop = scroll.getBoundingClientRect().top;
      const anchor = Array.from(scroll.querySelectorAll("p,li,h1,h2,h3,h4,pre,tr,[data-reply-key],.chat-welcome-entry")).map((node) => ({ node, box: node.getBoundingClientRect() })).filter((item) => item.box.height > 0 && item.box.bottom > viewportTop).sort((a, b) => Math.max(0, a.box.top - viewportTop) - Math.max(0, b.box.top - viewportTop) || a.box.height - b.box.height)[0];
      if (!anchor) return void 0;
      const offset = anchor.box.top - viewportTop;
      return { node: anchor.node, offset, fraction: offset < 0 ? -offset / anchor.box.height : 0 };
    }
    watch(() => [props.windowMode, props.fullscreen], ([, expanded], previous) => {
      const scroll = main.value?.querySelector(".chat-scroll,.chat-welcome");
      const input = composer.value?.$el.querySelector(".tr-sender-editor-scroll");
      const top = scroll?.scrollTop, inputTop = input?.scrollTop, following = followBottom.value;
      const reflow = expanded !== previous[1];
      const anchor = reflow ? readingAnchor : void 0;
      cancelAnimationFrame(modeScrollFrame);
      modeScrollFrame = requestAnimationFrame(() => {
        modeScrollFrame = 0;
        if (scroll && top !== void 0) {
          if (following && scroll.matches(".chat-scroll")) scroll.scrollTop = scroll.scrollHeight;
          else if (anchor?.node.isConnected) {
            const box = anchor.node.getBoundingClientRect();
            scroll.scrollTop += box.top - scroll.getBoundingClientRect().top - (anchor.fraction ? -anchor.fraction * box.height : anchor.offset);
          } else scroll.scrollTop = top;
          lastFollowedScrollTop = scroll.scrollTop;
        }
        if (input && inputTop !== void 0) input.scrollTop = inputTop;
        followBottom.value = following;
        updateFade();
        publishView();
      });
    }, { flush: "pre" });
    function onScroll(event) {
      scheduleContentShadows();
      if (modeScrollFrame) return;
      const scroll = main.value?.querySelector(".chat-scroll");
      if (scroll && event.target === scroll && scroll.scrollTop !== lastFollowedScrollTop) followBottom.value = scroll.scrollHeight - scroll.clientHeight - scroll.scrollTop <= 20;
      updateFade();
      publishView();
    }
    function followReply() {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        syncFollowReply();
      });
    }
    function syncFollowReply() {
      const scroll = main.value?.querySelector(".chat-scroll");
      if (scroll && followBottom.value) {
        scroll.scrollTop = scroll.scrollHeight;
        lastFollowedScrollTop = scroll.scrollTop;
      }
      updateFade();
    }
    function followRenderedReply() {
      void nextTick(() => {
        if (!modeScrollFrame) syncFollowReply();
      });
    }
    function updateFade() {
      for (const port of main.value?.querySelectorAll(".chat-scroll,.chat-welcome") ?? []) {
        if (observedScrollPort !== port) {
          if (observedScrollPort) resizeObserver?.unobserve(observedScrollPort);
          observedScrollPort = port;
          resizeObserver?.observe(port);
        }
        const gutter = `${port.offsetWidth - port.clientWidth}px`;
        if (port.style.getPropertyValue("--partner-ai-native-scrollbar-gutter") !== gutter) port.style.setProperty("--partner-ai-native-scrollbar-gutter", gutter);
      }
      const scroll = main.value?.querySelector(".chat-scroll");
      canScrollUp.value = !!scroll && scroll.scrollTop > 1;
      canScrollDown.value = !!scroll && scroll.scrollHeight - scroll.clientHeight - scroll.scrollTop > 1;
      if (!modeScrollFrame) readingAnchor = captureReadingAnchor(main.value?.querySelector(".chat-scroll,.chat-welcome"));
    }
    watch(() => {
      const users = props.messages.filter((message) => message.role === "user");
      return [props.conversationId, users.length, users.at(-1)?.id];
    }, ([conversationId, count, id], [previousConversationId, previousCount, previousId]) => {
      if (conversationId !== previousConversationId) return;
      if (!props.messages.length || count > previousCount || count > 0 && id !== previousId) {
        followBottom.value = true;
        lastFollowedScrollTop = void 0;
        syncFollowReply();
      }
    }, { flush: "post" });
    watch(() => [props.messages, props.processing, props.error, props.aborted, presenting.value], async () => {
      await nextTick();
      followReply();
    }, { deep: true, flush: "post" });
    let restoringView = false;
    function captureView() {
      return { draft: draft.value, aiEnabled: aiEnabled.value, mode: mode.value, scrollTop: main.value?.querySelector(".chat-scroll")?.scrollTop ?? 0, followBottom: followBottom.value };
    }
    async function locateReply(id) {
      await nextTick();
      const scroll = main.value?.querySelector(".chat-scroll");
      const reply = Array.from(scroll?.querySelectorAll("[data-reply-key]") ?? []).find((node) => node.dataset.replyKey === id);
      if (!scroll || !reply) return false;
      cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
      followBottom.value = false;
      reply.tabIndex = -1;
      reply.setAttribute("aria-label", "\u5173\u8054AI\u56DE\u7B54");
      reply.focus({ preventScroll: true });
      scroll.scrollTop += reply.getBoundingClientRect().top - scroll.getBoundingClientRect().top;
      lastFollowedScrollTop = scroll.scrollTop;
      updateFade();
      publishView();
      return true;
    }
    function publishView() {
      if (!restoringView && props.conversationId) emit("conversationViewChange", captureView());
    }
    watch([draft, aiEnabled, mode], publishView);
    watch(() => props.conversationId, async () => {
      if (!props.conversationId) return;
      restoringView = true;
      cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
      const state = props.conversationView;
      draft.value = state?.draft ?? "";
      aiEnabled.value = state?.aiEnabled ?? false;
      mode.value = props.modeOptions.some((option) => option.value === state?.mode && !option.disabled) ? state.mode : props.modeOptions.find((option) => !option.disabled)?.value ?? "";
      followBottom.value = state?.followBottom ?? true;
      await nextTick();
      const scroll = main.value?.querySelector(".chat-scroll");
      if (scroll) {
        scroll.scrollTop = followBottom.value ? scroll.scrollHeight : state?.scrollTop ?? 0;
        lastFollowedScrollTop = scroll.scrollTop;
      }
      updateFade();
      restoringView = false;
    }, { flush: "post", immediate: true });
    onMounted(() => {
      resizeObserver = new ResizeObserver(followReply);
      if (main.value) resizeObserver.observe(main.value);
      followReply();
    });
    onBeforeUnmount(() => {
      resizeObserver?.disconnect();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(modeScrollFrame);
    });
    const allRenderers = computed(() => [
      ...props.renderers.map((match) => ({ ...match, renderer: presentedRenderer(match.renderer) })),
      // Robot 0.5.1 handles text through its fallback, which our unknown-type notice
      // replaces. Register user text through the public renderer API; keep literal
      // newlines/markup and consumer priorities. Recheck default matching on upgrades.
      { find: (message, content) => message.role === "user" && content.type === "text", renderer: markRaw(BubbleRenderers.Text), priority: 5 },
      { find: (message, content) => message.role === "assistant" && content.type === "text" && !message.loading, renderer: markRaw(DisplayedTextRenderer), priority: 5 },
      { find: (message, content) => message.role === "assistant" && content.type === "image_url", renderer: presentedRenderer(BubbleRenderers.Image), priority: 5 }
    ]);
    const fallbackRenderer = presentedRenderer(FallbackRenderer);
    const displayMessages = computed(() => props.messages.map((message, index) => {
      const parts = resolveChatContent(message).filter((part) => part.type !== "thinking-content");
      const display = { ...message, content: parts.length ? parts : [{ type: "text", text: "" }], uiPartsOrdered: true, id: message.id ?? `message-${index}`, role: message.role?.startsWith("assistant") ? "assistant" : message.role || "assistant" };
      delete display.reasoning_content;
      delete display.uiParts;
      delete display.renderContent;
      return display;
    }));
    const groups = (messages) => messages.map((message, index) => ({ role: message.role ?? "assistant", messages: [message], messageIndexes: [index], startIndex: index }));
    const boxRenderers = computed(() => [{ find: (messages) => messages[0]?.role === "assistant", renderer: markRaw(AnswerBox), attributes: (messages) => {
      const id = messages[0]?.id ?? "";
      const index = displayMessages.value.findIndex((message2) => message2.id === id);
      const message = messages[0];
      const stopped = displayStopped.value[id] || message?.state?.completion === "aborted" || !message?.state?.completion && props.aborted && !props.processing && index === displayMessages.value.length - 1;
      const source = props.messages[index] ?? message;
      const hasOutput = !!source && hasChatOutput(source);
      const reasoning = source && resolveChatContent(source).find((part) => part.type === "thinking-content");
      const hasThinking = !!reasoning;
      const failure = message?.replyError || (index === displayMessages.value.length - 1 ? props.error : "") || (message?.state?.completion === "error" ? "\u672C\u6B21\u56DE\u7B54\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002" : "");
      const active = !!message?.recovering || props.processing && !message?.state?.completion && index === displayMessages.value.length - 1;
      return {
        replyKey: id,
        busy: uiProcessing.value,
        loading: !!message?.loading,
        stopped,
        hasOutput,
        failure,
        active,
        completion: message?.state?.completion,
        thinking: reasoning ? { content: String(reasoning.content ?? ""), status: reasoning.status } : void 0,
        expectedParts: Array.isArray(message?.content) ? message.content.flatMap((part, index2) => part.type === "text" ? part.text ? [{ index: index2, signature: String(part.text) }] : [] : [{ index: index2, signature: JSON.stringify(part) }]) : [],
        onDisplayBusy: (busy, capture) => {
          if (!capture) {
            if (presenting.value[id]) {
              const next = { ...presenting.value };
              delete next[id];
              presenting.value = next;
            }
            return;
          }
          if (presenting.value[id]?.busy !== busy || presenting.value[id]?.capture !== capture) presenting.value = { ...presenting.value, [id]: { busy, capture } };
        },
        onDisplayChange: followRenderedReply,
        onFeedback: (feedback) => emit("event", { name: "chat:feedback", payload: { index, messageId: id, ...feedback } }),
        canContinue: props.continuationAvailable && hasOutput && !!(failure || stopped),
        progressText: !hasThinking && !stopped && active ? "\u6B63\u5728\u601D\u8003\u4E2D..." : "",
        onRegenerate: () => {
          displayStopped.value = { ...displayStopped.value, [id]: false };
          if (failure && index === displayMessages.value.length - 1) emit("retry");
          else emit("event", { name: "chat:regenerate", payload: index });
        },
        onContinue: () => {
          displayStopped.value = { ...displayStopped.value, [id]: false };
          emit("event", { name: "chat:continue", payload: index });
        }
      };
    } }]);
    const submitting = ref(false);
    function submit(value, context, preserveDraft = false) {
      if (uiProcessing.value || submitting.value || !value.trim()) return;
      submitting.value = true;
      followBottom.value = true;
      try {
        emit("send", value, { ...context });
        if (!preserveDraft) draft.value = "";
      } finally {
        void nextTick(() => {
          submitting.value = false;
        });
      }
    }
    function sendPrompt(item, event) {
      if (item.disabled || event?.repeat) return;
      submit(item.query ?? item.label, { aiEnabled: aiEnabled.value, mode: mode.value }, true);
    }
    function welcome(entry) {
      if (props.processing) return;
      emit("welcomeAction", entry);
      if (entry.query) submit(entry.query, { aiEnabled: false, mode: mode.value });
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(_unref(TrLayout), {
        mode: "normal",
        class: _normalizeClass(["chat-panel", { "is-fullscreen": __props.fullscreen }])
      }, {
        header: _withCtx(() => [
          _withDirectives(_createElementVNode(
            "div",
            _hoisted_1,
            [
              _withDirectives((_openBlock(), _createElementBlock("div", {
                class: _normalizeClass(["chat-handle-area", { "is-draggable": !!__props.windowMode }]),
                "aria-hidden": !__props.windowMode ? true : void 0,
                role: __props.windowMode ? "button" : void 0,
                tabindex: __props.windowMode ? 0 : -1,
                "aria-label": __props.windowMode === "sidebar" ? "\u62D6\u52A8\u5C06 AI \u4FA7\u680F\u8F6C\u4E3A\u60AC\u6D6E\u7A97\uFF08\u4E5F\u53EF\u6309 Enter\uFF09" : __props.windowMode === "floating" ? "\u79FB\u52A8 AI \u60AC\u6D6E\u7A97\uFF08\u65B9\u5411\u952E\u79FB\u52A8\uFF0CShift \u52A0\u901F\uFF09" : void 0,
                onPointerdown: _cache[0] || (_cache[0] = ($event) => __props.windowMode && emit("windowDragStart", $event)),
                onKeydown: _cache[1] || (_cache[1] = ($event) => __props.windowMode && emit("windowDragKeydown", $event))
              }, [..._cache[8] || (_cache[8] = [
                _createElementVNode(
                  "span",
                  { class: "chat-handle" },
                  null,
                  -1
                  /* CACHED */
                )
              ])], 42, _hoisted_2)), [
                [_unref(vAiTooltip), { content: __props.windowMode === "sidebar" ? "\u6309\u4F4F\u62D6\u52A8\u53EF\u8F6C\u4E3A\u60AC\u6D6E\u7A97\uFF1B\u5355\u51FB\u4FDD\u6301\u4FA7\u680F\uFF0C\u4E5F\u53EF\u6309 Enter \u5207\u6362" : __props.windowMode === "floating" ? "\u62D6\u52A8\u79FB\u52A8\u7A97\u53E3\uFF1B\u4E5F\u53EF\u7528\u65B9\u5411\u952E\u79FB\u52A8\uFF0CShift \u52A0\u901F" : "", placement: "top" }]
              ])
            ],
            512
            /* NEED_PATCH */
          ), [
            [_vShow, !__props.fullscreen]
          ]),
          _createElementVNode(
            "header",
            {
              class: _normalizeClass(["chat-header", { "is-welcome": !__props.messages.length }])
            },
            [
              __props.messages.length ? (_openBlock(), _createElementBlock("div", _hoisted_3, [
                __props.avatarSrc ? (_openBlock(), _createElementBlock("img", {
                  key: 0,
                  class: "chat-identity-avatar",
                  src: __props.avatarSrc,
                  alt: "AI \u52A9\u624B"
                }, null, 8, _hoisted_4)) : (_openBlock(), _createElementBlock("span", _hoisted_5, [
                  _createVNode(_unref(AiIcon), { name: "assistant.fallback" })
                ])),
                _cache[9] || (_cache[9] = _createElementVNode(
                  "h2",
                  null,
                  "\u4F01\u4E1AAI\u52A9\u624B",
                  -1
                  /* CACHED */
                ))
              ])) : _createCommentVNode("v-if", true),
              _createElementVNode("div", _hoisted_6, [
                __props.toolbarActions.length && __props.windowMode && !__props.fullscreen ? _withDirectives((_openBlock(), _createBlock(_unref(TrActionButton), {
                  key: 0,
                  icon: _unref(aiIconVNode)("panel.mode", { windowMode: __props.windowMode }),
                  type: "button",
                  class: "chat-toolbar-action",
                  "aria-label": windowActionLabel.value,
                  "aria-pressed": __props.windowMode === "floating",
                  onClick: toggleWindowMode
                }, null, 8, ["icon", "aria-label", "aria-pressed"])), [
                  [_unref(vAiTooltip), { content: windowActionLabel.value, placement: "top" }]
                ]) : _createCommentVNode("v-if", true),
                __props.toolbarActions.length ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(__props.toolbarActions, (action) => {
                      return _openBlock(), _createElementBlock("button", {
                        key: action.id,
                        type: "button",
                        class: "chat-toolbar-action",
                        disabled: action.disabled,
                        onClick: ($event) => emit("toolbarAction", action)
                      }, _toDisplayString(action.label), 9, _hoisted_8);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : (_openBlock(), _createElementBlock("div", _hoisted_9, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(visiblePlaceholderActions.value, (action) => {
                      return _withDirectives((_openBlock(), _createBlock(_unref(TrActionButton), {
                        key: action.id,
                        icon: _unref(aiIconVNode)(action.icon, action.id === "agent" ? { windowMode: __props.windowMode } : {}),
                        type: "button",
                        class: "chat-toolbar-action",
                        disabled: action.id === "new" && __props.newConversationDisabled,
                        "aria-label": action.id === "agent" ? windowActionLabel.value : action.label,
                        "aria-pressed": action.id === "agent" && __props.windowMode ? __props.windowMode === "floating" : void 0,
                        "aria-haspopup": action.id === "history" && __props.historyAvailable ? "dialog" : void 0,
                        "aria-expanded": action.id === "history" && __props.historyAvailable ? __props.historyOpen : void 0,
                        onClick: ($event) => toolbarClick(action.id, $event)
                      }, null, 8, ["icon", "disabled", "aria-label", "aria-pressed", "aria-haspopup", "aria-expanded", "onClick"])), [
                        [_unref(vAiTooltip), { content: action.id === "agent" && __props.windowMode ? windowActionLabel.value : action.id === "new" || action.id === "history" && __props.historyAvailable ? action.label : `${action.label}\uFF08\u5C1A\u672A\u63A5\u5165\uFF09`, placement: "top", disabled: action.id === "history" && __props.historyOpen }]
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])),
                __props.fullscreen !== void 0 ? _withDirectives((_openBlock(), _createBlock(_unref(TrActionButton), {
                  key: 3,
                  icon: _unref(aiIconVNode)(__props.fullscreen ? "panel.exitFullscreen" : "panel.fullscreen"),
                  type: "button",
                  class: "chat-toolbar-action chat-fullscreen-action",
                  "aria-label": fullscreenLabel.value,
                  "aria-pressed": __props.fullscreen,
                  onClick: _cache[2] || (_cache[2] = ($event) => emit("fullscreenChange", !__props.fullscreen))
                }, null, 8, ["icon", "aria-label", "aria-pressed"])), [
                  [_vShow, !_unref(delivery)],
                  [_unref(vAiTooltip), { content: fullscreenLabel.value, placement: "top" }]
                ]) : _createCommentVNode("v-if", true),
                __props.closable ? _withDirectives((_openBlock(), _createBlock(_unref(TrActionButton), {
                  key: 4,
                  icon: _unref(aiIconVNode)("panel.close"),
                  type: "button",
                  class: "chat-close-action",
                  "aria-label": "\u6536\u8D77 AI \u4FA7\u680F",
                  onClick: _cache[3] || (_cache[3] = ($event) => emit("close"))
                }, null, 8, ["icon"])), [
                  [_unref(vAiTooltip), { content: "\u6536\u8D77 AI \u4FA7\u680F", placement: "top" }]
                ]) : _createCommentVNode("v-if", true),
                _renderSlot(_ctx.$slots, "toolbar-end")
              ])
            ],
            2
            /* CLASS */
          )
        ]),
        main: _withCtx(() => [
          _createElementVNode(
            "div",
            {
              ref_key: "main",
              ref: main,
              class: _normalizeClass(["chat-main", { "can-scroll-up": canScrollUp.value, "can-scroll-down": canScrollDown.value }]),
              onScrollCapture: onScroll
            },
            [
              _createElementVNode(
                "div",
                {
                  class: "content-edge-shadows",
                  style: _normalizeStyle(_unref(contentShadowClip)),
                  "aria-hidden": "true"
                },
                [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(_unref(contentEdgeShadows), (shadow) => {
                      return _openBlock(), _createElementBlock(
                        "span",
                        {
                          key: shadow.key,
                          style: _normalizeStyle(shadow.style)
                        },
                        null,
                        4
                        /* STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                4
                /* STYLE */
              ),
              !__props.messages.length ? (_openBlock(), _createBlock(ChatWelcome, {
                key: 0,
                fullscreen: __props.fullscreen,
                "avatar-src": __props.avatarSrc,
                entries: __props.welcomeEntries,
                onSelect: welcome
              }, null, 8, ["fullscreen", "avatar-src", "entries"])) : (_openBlock(), _createBlock(_unref(TrBubbleProvider), {
                key: 1,
                "content-renderer-matches": allRenderers.value,
                "box-renderer-matches": boxRenderers.value,
                "fallback-content-renderer": _unref(fallbackRenderer)
              }, {
                default: _withCtx(() => [
                  (_openBlock(), _createBlock(_unref(TrBubbleList), {
                    key: __props.conversationId,
                    class: _normalizeClass(["chat-scroll", { "is-following": followBottom.value }]),
                    messages: displayMessages.value,
                    "group-strategy": groups,
                    "auto-scroll": false,
                    "content-render-mode": "single",
                    "content-resolver": _unref(resolveChatContent),
                    "role-configs": { assistant: { shape: "rounded" }, user: { placement: "end", shape: "corner" } },
                    onBubbleEvent: _cache[4] || (_cache[4] = ($event) => emit("event", $event))
                  }, {
                    after: _withCtx(({ messageIndexes }) => [
                      promptsByMessage.value[messageIndexes[0]]?.length && !presenting.value[displayMessages.value[messageIndexes[0]]?.id ?? ""]?.busy ? (_openBlock(), _createBlock(MessagePrompts, {
                        key: 0,
                        items: promptsByMessage.value[messageIndexes[0]],
                        disabled: uiProcessing.value || submitting.value,
                        "data-message-id": displayMessages.value[messageIndexes[0]]?.id,
                        onSelect: sendPrompt
                      }, null, 8, ["items", "disabled", "data-message-id"])) : _createCommentVNode("v-if", true)
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["class", "messages", "content-resolver"]))
                ]),
                _: 1
                /* STABLE */
              }, 8, ["content-renderer-matches", "box-renderer-matches", "fallback-content-renderer"]))
            ],
            34
            /* CLASS, NEED_HYDRATION */
          )
        ]),
        footer: _withCtx(() => [
          _createElementVNode(
            "footer",
            {
              class: _normalizeClass(["chat-footer", { "has-suggestions": showSuggestionPills.value }])
            },
            [
              showSuggestionPills.value ? (_openBlock(), _createBlock(ComposerSuggestions, {
                key: 0,
                items: __props.suggestionPills,
                disabled: uiProcessing.value || submitting.value,
                onSelect: sendSuggestion
              }, null, 8, ["items", "disabled"])) : _createCommentVNode("v-if", true),
              _createElementVNode("div", _hoisted_10, [
                _createVNode(ChatComposer, {
                  ref_key: "composer",
                  ref: composer,
                  modelValue: draft.value,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => draft.value = $event),
                  "ai-enabled": aiEnabled.value,
                  "onUpdate:aiEnabled": _cache[6] || (_cache[6] = ($event) => aiEnabled.value = $event),
                  mode: mode.value,
                  "onUpdate:mode": _cache[7] || (_cache[7] = ($event) => mode.value = $event),
                  processing: uiProcessing.value,
                  "mode-options": __props.modeOptions,
                  onSubmit: submit,
                  onCancel: stopPresentation
                }, null, 8, ["modelValue", "ai-enabled", "mode", "processing", "mode-options"])
              ]),
              _cache[10] || (_cache[10] = _createElementVNode(
                "p",
                { class: "composer-note" },
                "\u5185\u5BB9\u7531AI\u751F\u6210\uFF0C\u65E0\u6CD5\u786E\u4FDD\u51C6\u786E\u6027\u548C\u5B8C\u6574\u6027\uFF0C\u4EC5\u4F9B\u53C2\u8003\u3002",
                -1
                /* CACHED */
              ))
            ],
            2
            /* CLASS */
          )
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["class"]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-35395413" });
