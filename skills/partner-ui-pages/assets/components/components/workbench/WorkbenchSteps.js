import { defineComponent as _defineComponent } from "vue";
import { createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createBlock as _createBlock, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx } from "vue";
const _hoisted_1 = ["disabled"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["data-step-index", "aria-current"];
const _hoisted_4 = {
  key: 0,
  class: "wb-steps__number"
};
const _hoisted_5 = { class: "wb-steps__copy" };
const _hoisted_6 = ["title"];
const _hoisted_7 = ["title"];
const _hoisted_8 = {
  key: 0,
  class: "wb-steps__line",
  "aria-hidden": "true"
};
const _hoisted_9 = ["disabled"];
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import { stepIcons } from "./stepIcons.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchSteps",
  props: {
    items: { type: Array, required: true },
    modelValue: { type: Number, default: 0 },
    current: Number,
    variant: { type: String, default: "horizontal" },
    size: { type: String, default: "medium" },
    nodeType: { type: String, default: "number" },
    readonly: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    ariaLabel: { type: String, default: "\u6D41\u7A0B\u6B65\u9AA4" }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const viewport = ref();
    const list = ref();
    const canScrollBack = ref(false);
    const canScrollForward = ref(false);
    const overflow = computed(() => canScrollBack.value || canScrollForward.value);
    const active = computed(() => props.modelValue >= 0 && props.modelValue < props.items.length ? props.modelValue : -1);
    const progress = computed(() => props.current ?? props.modelValue);
    const labels = { finish: "\u5DF2\u5B8C\u6210", process: "\u8FDB\u884C\u4E2D", wait: "\u672A\u5F00\u59CB", error: "\u6B65\u9AA4\u5F02\u5E38", disabled: "\u65E0\u6743\u9650", unavailable: "\u4E0D\u53EF\u64CD\u4F5C", available: "\u53EF\u5F00\u59CB" };
    function iconName(index) {
      const size = props.variant === "arrow" || ["small", "mini"].includes(props.size) ? "\u5C0F\u5C3A\u5BF8" : props.size === "large" ? "\u5927\u5C3A\u5BF8" : "\u4E2D\u5C3A\u5BF8";
      const states = { finish: "\u5DF2\u5B8C\u6210", error: "\u5F02\u5E38\u56FE\u6807", disabled: "\u65E0\u6743\u9650\u56FE\u6807", unavailable: "\u672A\u5F00\u59CB\u56FE\u6807", available: "\u53EF\u5F00\u59CB\u56FE\u6807", process: "\u8FDB\u884C\u4E2D\u56FE\u6807", wait: "\u672A\u5F00\u59CB\u56FE\u6807" };
      const status = states[statusAt(index)];
      const focus = props.variant === "arrow" && statusAt(index) === "finish" ? "focus" : active.value === index ? "focus" : "default";
      return stepIcons[`${size}/${status}/${focus}`] ?? stepIcons[`${size}/${status}/default`];
    }
    function statusAt(index) {
      const item = props.items[index];
      if (!item || item.disabled || props.disabled) return "disabled";
      return item.status ?? (index < progress.value ? "finish" : index === progress.value ? "process" : "wait");
    }
    function navigable(index) {
      if (props.readonly || ["disabled", "unavailable"].includes(statusAt(index))) return false;
      if (props.items[index].clickable === false) return false;
      return props.items[index].clickable === true || ["finish", "process", "error", "available"].includes(statusAt(index));
    }
    const firstNavigable = computed(() => props.items.findIndex((_, index) => navigable(index)));
    const focusIndex = ref(-1);
    const tabStop = computed(() => navigable(focusIndex.value) ? focusIndex.value : navigable(active.value) ? active.value : firstNavigable.value);
    function select(index) {
      if (!navigable(index) || active.value === index) return;
      emit("update:modelValue", index);
      emit("change", index, props.items[index]);
    }
    function onKeydown(event, index) {
      const previous = props.variant === "vertical" ? "ArrowUp" : "ArrowLeft";
      const next = props.variant === "vertical" ? "ArrowDown" : "ArrowRight";
      if (![previous, next, "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const candidates = props.items.flatMap((_, i) => navigable(i) ? [i] : []);
      const position = candidates.indexOf(index);
      const target = event.key === "Home" ? candidates[0] : event.key === "End" ? candidates.at(-1) : candidates[position + (event.key === next ? 1 : -1)];
      if (target === void 0) return;
      const button = list.value?.querySelector(`[data-step-index="${target}"] button`);
      button?.focus();
      button?.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
    function measure() {
      const el = viewport.value;
      if (!el || props.variant === "vertical") {
        canScrollBack.value = false;
        canScrollForward.value = false;
        return;
      }
      canScrollBack.value = el.scrollLeft > 1;
      canScrollForward.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
    }
    function scroll(direction) {
      const el = viewport.value;
      if (!el) return;
      const target = el.scrollLeft + direction * Math.ceil(el.clientWidth * 0.75);
      el.scrollTo({ left: Math.max(0, Math.min(target, el.scrollWidth - el.clientWidth)), behavior: "auto" });
    }
    let observer;
    onMounted(() => {
      observer = new ResizeObserver(measure);
      if (viewport.value) observer.observe(viewport.value);
      if (list.value) observer.observe(list.value);
      measure();
    });
    onBeforeUnmount(() => observer?.disconnect());
    watch(() => [props.items, props.variant, props.size], async () => {
      await nextTick();
      measure();
    }, { deep: true });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          class: _normalizeClass(["wb-steps", [`wb-steps--${__props.variant}`, `wb-steps--${__props.size}`, { "wb-steps--overflow": overflow.value }]])
        },
        [
          overflow.value ? (_openBlock(), _createElementBlock("button", {
            key: 0,
            class: "wb-steps__scroll",
            type: "button",
            disabled: !canScrollBack.value,
            "aria-label": "\u67E5\u770B\u524D\u9762\u7684\u6B65\u9AA4",
            onClick: _cache[0] || (_cache[0] = ($event) => scroll(-1))
          }, [
            _createVNode(WorkbenchIcon, { name: "/ic_arrow_left_line#2:144" })
          ], 8, _hoisted_1)) : _createCommentVNode("v-if", true),
          _createElementVNode(
            "div",
            {
              ref_key: "viewport",
              ref: viewport,
              class: "wb-steps__viewport",
              onScrollPassive: measure
            },
            [
              _createElementVNode("ol", {
                ref_key: "list",
                ref: list,
                class: "wb-steps__list",
                "aria-label": __props.ariaLabel
              }, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(__props.items, (item, index) => {
                    return _openBlock(), _createElementBlock("li", {
                      key: item.key ?? index,
                      class: _normalizeClass(["wb-steps__item", [`wb-steps__item--${statusAt(index)}`, { "wb-steps__item--selected": active.value === index }]]),
                      "data-step-index": index,
                      "aria-current": active.value === index ? "step" : void 0
                    }, [
                      (_openBlock(), _createBlock(_resolveDynamicComponent(__props.readonly ? "div" : "button"), {
                        class: "wb-steps__content",
                        type: __props.readonly ? void 0 : "button",
                        disabled: __props.readonly ? void 0 : !navigable(index),
                        tabindex: __props.readonly ? void 0 : tabStop.value === index ? 0 : -1,
                        "aria-label": `${item.title}\uFF0C${labels[statusAt(index)]}${item.description ? `\uFF0C${item.description}` : ""}`,
                        onFocus: ($event) => focusIndex.value = index,
                        onClick: ($event) => select(index),
                        onKeydown: ($event) => onKeydown($event, index)
                      }, {
                        default: _withCtx(() => [
                          _createElementVNode(
                            "span",
                            {
                              class: _normalizeClass(["wb-steps__node", { "wb-steps__node--full-icon": !(__props.nodeType === "number" && ["process", "wait"].includes(statusAt(index))) && (__props.size !== "mini" || __props.variant === "arrow") }]),
                              "aria-hidden": "true"
                            },
                            [
                              _renderSlot(_ctx.$slots, "icon", {
                                item,
                                index,
                                status: statusAt(index)
                              }, () => [
                                (__props.size !== "mini" || __props.variant === "arrow") && __props.nodeType === "number" && ["process", "wait"].includes(statusAt(index)) ? (_openBlock(), _createElementBlock(
                                  "span",
                                  _hoisted_4,
                                  _toDisplayString(index + 1),
                                  1
                                  /* TEXT */
                                )) : __props.size !== "mini" || __props.variant === "arrow" ? (_openBlock(), _createBlock(WorkbenchIcon, {
                                  key: 1,
                                  name: iconName(index)
                                }, null, 8, ["name"])) : _createCommentVNode("v-if", true)
                              ])
                            ],
                            2
                            /* CLASS */
                          ),
                          _createElementVNode("span", _hoisted_5, [
                            _createElementVNode("span", {
                              class: "wb-steps__title",
                              title: item.title
                            }, [
                              _renderSlot(_ctx.$slots, "title", {
                                item,
                                index
                              }, () => [
                                _createTextVNode(
                                  _toDisplayString(item.title),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ], 8, _hoisted_6),
                            item.description && __props.variant !== "arrow" && (__props.size === "large" || __props.size === "medium") ? (_openBlock(), _createElementBlock("span", {
                              key: 0,
                              class: "wb-steps__description",
                              title: item.description
                            }, [
                              _renderSlot(_ctx.$slots, "description", {
                                item,
                                index
                              }, () => [
                                _createTextVNode(
                                  _toDisplayString(item.description),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ], 8, _hoisted_7)) : _createCommentVNode("v-if", true)
                          ])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1064, ["type", "disabled", "tabindex", "aria-label", "onFocus", "onClick", "onKeydown"])),
                      index < __props.items.length - 1 && __props.variant !== "arrow" ? (_openBlock(), _createElementBlock("span", _hoisted_8)) : _createCommentVNode("v-if", true)
                    ], 10, _hoisted_3);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 8, _hoisted_2)
            ],
            544
            /* NEED_HYDRATION, NEED_PATCH */
          ),
          overflow.value ? (_openBlock(), _createElementBlock("button", {
            key: 1,
            class: "wb-steps__scroll",
            type: "button",
            disabled: !canScrollForward.value,
            "aria-label": "\u67E5\u770B\u540E\u9762\u7684\u6B65\u9AA4",
            onClick: _cache[1] || (_cache[1] = ($event) => scroll(1))
          }, [
            _createVNode(WorkbenchIcon, { name: "/ic_arrow_right_line#2:141" })
          ], 8, _hoisted_9)) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-af030480" });
