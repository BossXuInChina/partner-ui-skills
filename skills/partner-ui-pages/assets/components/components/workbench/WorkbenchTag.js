import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createVNode as _createVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, withModifiers as _withModifiers, mergeProps as _mergeProps, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx, createBlock as _createBlock } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "wb-tag__dot",
  "aria-hidden": "true"
};
const _hoisted_2 = {
  key: 1,
  class: "wb-tag__action-icon wb-tag__action-icon--add",
  "aria-hidden": "true"
};
const _hoisted_3 = {
  key: 2,
  class: "wb-tag__icon",
  "aria-hidden": "true"
};
const _hoisted_4 = ["disabled", "aria-pressed"];
const _hoisted_5 = {
  key: 4,
  class: "wb-tag__label"
};
const _hoisted_6 = ["disabled", "aria-label"];
import { computed, h, useSlots } from "vue";
import "./tag-surface.css";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchTooltip from "../tooltip/WorkbenchTooltip.vue";
const __sfc_main__ = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "WorkbenchTag",
  props: {
    label: { type: [String, Number], required: true },
    variant: {
      type: String,
      default: "basic",
      validator: (value) => ["basic", "status-subtle", "status-dot", "category", "corner", "status-primary"].includes(
        value
      )
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => ["small", "medium", "large"].includes(value)
    },
    status: {
      type: String,
      default: "info",
      validator: (value) => ["waiting", "info", "success", "warning", "alert", "error", "none"].includes(value)
    },
    categoryIndex: {
      type: Number,
      default: 1,
      validator: (value) => Number.isInteger(value) && value >= 1 && value <= 12
    },
    cornerTone: {
      type: String,
      default: "new",
      validator: (value) => ["new", "hot", "discount", "off"].includes(value)
    },
    placement: {
      type: String,
      default: "top-left",
      validator: (value) => ["top-left", "top-right"].includes(value)
    },
    action: {
      type: String,
      default: "none",
      validator: (value) => ["none", "add", "remove"].includes(value)
    },
    interactive: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ["select", "add", "remove"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const fullLabel = computed(() => String(props.label));
    const graphemes = computed(() => {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {
        return [
          ...new Intl.Segmenter("zh-CN", { granularity: "grapheme" }).segment(fullLabel.value)
        ].map((item) => item.segment);
      }
      return Array.from(fullLabel.value);
    });
    const truncated = computed(() => graphemes.value.length > 7);
    const TagTooltip = (_, { slots: tooltipSlots }) => truncated.value ? h(WorkbenchTooltip, { content: fullLabel.value }, { trigger: tooltipSlots.default }) : tooltipSlots.default({ aria: {} })[0];
    const displayLabel = computed(
      () => truncated.value ? `${graphemes.value.slice(0, 7).join("")}\u2026` : fullLabel.value
    );
    const semanticCategories = [
      { index: 5, terms: ["\u53D1\u751F\u9519\u8BEF", "\u7D27\u6025", "\u9519\u8BEF"] },
      { index: 1, terms: ["\u8BA1\u5212\u4E2D"] },
      { index: 2, terms: ["\u5DF2\u5B8C\u6210"] },
      { index: 3, terms: ["\u5F85\u5F00\u59CB"] },
      { index: 4, terms: ["\u8FDB\u884C\u4E2D"] },
      { index: 6, terms: ["\u5173\u673A"] },
      { index: 7, terms: ["\u6401\u7F6E\u4E2D"] },
      { index: 8, terms: ["\u5728\u9014\u4E2D", "\u7C7B\u578B\u4E00"] },
      { index: 9, terms: ["\u7F51\u7BA1\u7BA1\u7406", "\u7C7B\u578B\u4E8C"] },
      { index: 10, terms: ["\u8FD0\u529B\u603B\u89C8", "\u7C7B\u578B\u4E09"] },
      { index: 11, terms: ["\u526F\u8BBE\u5907", "\u7C7B\u578B\u56DB"] },
      { index: 12, terms: ["\u4E3B\u8BBE\u5907", "\u7C7B\u578B\u4E94"] }
    ];
    const resolvedStatus = computed(() => {
      if (props.variant === "status-primary") return props.status === "info" ? "waiting" : props.status;
      if (props.variant === "status-subtle" || props.variant === "status-dot")
        return props.status === "waiting" ? "info" : props.status;
      return props.status;
    });
    const statusTone = { info: 1, waiting: 1, success: 2, warning: 3, alert: 4, error: 5, none: 6 };
    const toneIndex = computed(() => {
      if (props.variant !== "category") return statusTone[resolvedStatus.value] ?? 1;
      return semanticCategories.find((item) => item.terms.some((term) => fullLabel.value.includes(term)))?.index ?? props.categoryIndex;
    });
    const effectiveAction = computed(() => props.variant === "basic" ? props.action : "none");
    const selectedAllowed = computed(() => props.variant === "basic" && props.selected);
    const actionable = computed(
      () => effectiveAction.value !== "remove" && (props.interactive || effectiveAction.value === "add")
    );
    const rootTag = computed(() => actionable.value ? "button" : "span");
    const ariaLabel = computed(() => {
      if (effectiveAction.value === "add")
        return fullLabel.value.startsWith("\u6DFB\u52A0") ? fullLabel.value : `\u6DFB\u52A0${fullLabel.value}`;
      if (effectiveAction.value === "remove") return `\u5220\u9664${fullLabel.value}`;
      return fullLabel.value;
    });
    const rootClasses = computed(() => [
      `wb-tag--${props.variant}`,
      `wb-tag--${props.size}`,
      `is-tone-${toneIndex.value}`,
      `is-status-${resolvedStatus.value}`,
      `is-corner-${props.cornerTone}`,
      `is-${props.placement}`,
      {
        "is-actionable": actionable.value,
        "is-selected": selectedAllowed.value,
        "is-disabled": props.disabled,
        "is-truncated": truncated.value,
        [`is-action-${effectiveAction.value}`]: effectiveAction.value !== "none"
      }
    ]);
    const showLeadingIcon = computed(() => effectiveAction.value === "none" && Boolean(slots.icon));
    function activate(event) {
      if (props.disabled) return;
      if (effectiveAction.value === "add") emit("add", { label: fullLabel.value, event });
      else if (props.interactive)
        emit("select", {
          label: fullLabel.value,
          selected: props.variant === "basic" ? !props.selected : void 0,
          event
        });
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(TagTooltip, null, {
        default: _withCtx(({ aria }) => [
          (_openBlock(), _createBlock(_resolveDynamicComponent(rootTag.value), _mergeProps(_ctx.$attrs, {
            class: ["wb-tag", rootClasses.value],
            type: actionable.value ? "button" : void 0,
            disabled: actionable.value ? __props.disabled : void 0,
            "aria-disabled": !actionable.value && __props.disabled ? "true" : void 0,
            "aria-pressed": __props.interactive && __props.variant === "basic" ? String(__props.selected) : void 0,
            "aria-label": actionable.value || truncated.value ? ariaLabel.value : void 0,
            "aria-describedby": [_ctx.$attrs["aria-describedby"], aria["aria-describedby"]].filter(Boolean).join(" ") || void 0,
            "data-full-label": truncated.value ? fullLabel.value : void 0,
            onClick: _cache[1] || (_cache[1] = ($event) => effectiveAction.value !== "remove" && activate($event))
          }), {
            default: _withCtx(() => [
              __props.variant === "status-dot" ? (_openBlock(), _createElementBlock("span", _hoisted_1)) : effectiveAction.value === "add" ? (_openBlock(), _createElementBlock("span", _hoisted_2, [
                _createVNode(WorkbenchIcon, { name: "/ic_public_plus_line_10px" })
              ])) : showLeadingIcon.value ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
                _renderSlot(_ctx.$slots, "icon")
              ])) : _createCommentVNode("v-if", true),
              effectiveAction.value === "remove" && __props.interactive ? (_openBlock(), _createElementBlock("button", _mergeProps({ key: 3 }, aria, {
                class: "wb-tag__label wb-tag__select",
                type: "button",
                disabled: __props.disabled,
                "aria-pressed": String(selectedAllowed.value),
                onClick: _withModifiers(activate, ["stop"])
              }), _toDisplayString(displayLabel.value), 17, _hoisted_4)) : (_openBlock(), _createElementBlock(
                "span",
                _hoisted_5,
                _toDisplayString(displayLabel.value),
                1
                /* TEXT */
              )),
              effectiveAction.value === "remove" ? (_openBlock(), _createElementBlock("button", _mergeProps({ key: 5 }, aria, {
                class: "wb-tag__action-icon wb-tag__remove wb-tag-surface__remove",
                type: "button",
                disabled: __props.disabled,
                "aria-label": `\u5220\u9664${fullLabel.value}`,
                onClick: _cache[0] || (_cache[0] = _withModifiers(($event) => !__props.disabled && emit("remove", { label: fullLabel.value, event: $event }), ["stop"]))
              }), [
                _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_8px" })
              ], 16, _hoisted_6)) : _createCommentVNode("v-if", true)
            ]),
            _: 2
            /* DYNAMIC */
          }, 1040, ["class", "type", "disabled", "aria-disabled", "aria-pressed", "aria-label", "aria-describedby", "data-full-label"]))
        ]),
        _: 3
        /* FORWARDED */
      });
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-41835eae" });
