import { unref as _unref, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createBlock as _createBlock, normalizeClass as _normalizeClass, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["id", "disabled", "aria-label", "aria-expanded", "aria-controls"];
const _hoisted_2 = {
  class: "wb-dropdown__arrow-frame",
  "aria-hidden": "true"
};
const _hoisted_3 = ["id", "aria-labelledby"];
const _hoisted_4 = {
  key: 0,
  role: "separator",
  class: "wb-dropdown__separator"
};
const _hoisted_5 = {
  key: 1,
  role: "presentation",
  class: "wb-dropdown__label"
};
const _hoisted_6 = ["role", "disabled", "aria-disabled", "aria-checked", "title", "onClick", "onKeydown"];
const _hoisted_7 = {
  key: 1,
  class: "wb-dropdown__item-leading",
  "aria-hidden": "true"
};
const _hoisted_8 = { class: "wb-dropdown__item-label" };
import { useFormDisabled } from "../form/useFormDisabled.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import ChoiceMark from "../choice/ChoiceMark.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchDropdown",
  props: {
    size: {
      type: String,
      default: "default",
      validator: (value) => ["small", "default", "large"].includes(value)
    },
    triggerType: {
      type: String,
      default: "button",
      validator: (value) => ["button", "text", "icon"].includes(value)
    },
    textIntent: {
      type: String,
      default: "drilldown",
      validator: (value) => ["action", "drilldown"].includes(value)
    },
    textLayout: {
      type: String,
      default: "container",
      validator: (value) => ["container", "inline"].includes(value)
    },
    panelWidth: {
      type: String,
      default: "auto",
      validator: (value) => ["auto", "min", "max"].includes(value)
    },
    items: { type: Array, required: true },
    radioValues: { type: Object, default: () => ({}) },
    checkboxValues: { type: Array, default: () => [] },
    disabled: Boolean,
    open: { type: Boolean, default: void 0 },
    ariaLabel: { type: String, default: "\u4E0B\u62C9\u83DC\u5355" }
  },
  emits: ["action", "update:radio", "update:checked", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const id = useId();
    const root = ref(null);
    const trigger = ref(null);
    const triggerContent = ref(null);
    const panel = ref(null);
    const internalOpen = ref(false);
    const isControlled = computed(() => props.open !== void 0);
    const expanded = computed(
      () => !disabled.value && (isControlled.value ? props.open : internalOpen.value)
    );
    const selectedItems = computed(
      () => props.items.filter(
        (item) => item.type === "radio" && props.radioValues[item.group] === item.value || item.type === "checkbox" && props.checkboxValues.includes(item.id)
      )
    );
    const summary = computed(() => selectedItems.value.map((item) => item.label).join("\u3001"));
    const triggerSlotProps = computed(() => ({
      open: expanded.value,
      selectedItems: selectedItems.value,
      summary: summary.value,
      toggle,
      aria: {
        "aria-haspopup": "menu",
        "aria-expanded": String(expanded.value),
        "aria-controls": expanded.value ? `${id}-menu` : void 0
      }
    }));
    function setOpen(value) {
      const next = Boolean(value) && !disabled.value;
      if (!isControlled.value) internalOpen.value = next;
      emit("update:open", next);
      if (next)
        nextTick(() => {
          updatePanelPosition();
          focusItem();
        });
    }
    function toggle() {
      setOpen(!expanded.value);
    }
    function itemNodes() {
      return [...panel.value?.querySelectorAll('[role^="menuitem"]:not(:disabled)') || []];
    }
    function focusItem(index = 0) {
      nextTick(() => {
        const nodes = itemNodes();
        nodes[Math.max(0, Math.min(index, nodes.length - 1))]?.focus();
      });
    }
    function restoreFocus() {
      nextTick(() => trigger.value?.focus());
    }
    function close({ restore = false } = {}) {
      setOpen(false);
      if (restore) restoreFocus();
    }
    function isChecked(item) {
      if (item.type === "radio") return props.radioValues[item.group] === item.value;
      if (item.type === "checkbox") return props.checkboxValues.includes(item.id);
      return false;
    }
    function activate(item, source = "click") {
      if (disabled.value || item.disabled) return;
      if (item.type === "action") {
        emit("action", { id: item.id });
        close({ restore: true });
      } else if (item.type === "radio") {
        if (!isChecked(item)) emit("update:radio", { groupId: item.group, value: item.value });
        if (source !== "space") close({ restore: true });
      } else if (item.type === "checkbox") {
        emit("update:checked", { id: item.id, checked: !isChecked(item) });
        if (source === "enter") close({ restore: true });
        else nextTick(updatePanelPosition);
      }
    }
    function handleItemKeydown(event, item) {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activate(item, event.key === " " ? "space" : "enter");
      }
    }
    function keydown(event) {
      if (event.key === "Escape") {
        if (!expanded.value) return;
        event.preventDefault();
        event.stopPropagation();
        close({ restore: true });
        return;
      }
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key) || disabled.value) return;
      event.preventDefault();
      if (!expanded.value) {
        setOpen(true);
        nextTick(
          () => focusItem(event.key === "ArrowUp" || event.key === "End" ? itemNodes().length - 1 : 0)
        );
        return;
      }
      const nodes = itemNodes();
      if (!nodes.length) return;
      const index = nodes.indexOf(document.activeElement);
      const target = event.key === "Home" ? 0 : event.key === "End" ? nodes.length - 1 : index < 0 ? event.key === "ArrowUp" ? nodes.length - 1 : 0 : (index + (event.key === "ArrowDown" ? 1 : -1) + nodes.length) % nodes.length;
      nodes[target]?.focus();
    }
    function withinDropdown(node) {
      return Boolean(node && (root.value?.contains(node) || panel.value?.contains(node)));
    }
    function handleOutside(event) {
      if (expanded.value && !withinDropdown(event.target)) close();
    }
    function handleFocusOut(event) {
      if (expanded.value && !withinDropdown(event.relatedTarget)) close();
    }
    function getPanelLeft(element, panelRect, triggerRect, gap) {
      const panelWidth = panelRect.width;
      const firstItem = element.querySelector(".wb-dropdown__item");
      const itemStart = element.querySelector(
        ".wb-dropdown__item .wb-choice-mark, .wb-dropdown__item-leading, .wb-dropdown__item-label"
      );
      const itemStartInset = itemStart ? itemStart.getBoundingClientRect().left - panelRect.left : 0;
      const firstItemStyle = firstItem ? getComputedStyle(firstItem) : null;
      const itemContentRight = firstItem ? firstItem.getBoundingClientRect().right - (parseFloat(firstItemStyle.paddingRight) || 0) : panelRect.right;
      const itemContentRightInset = panelRect.right - itemContentRight;
      const triggerContentRect = triggerContent.value?.getBoundingClientRect();
      const alignToContent = ["text", "icon"].includes(props.triggerType);
      const contentLeft = triggerContentRect?.left ?? triggerRect.left;
      const contentRight = triggerContentRect?.right ?? triggerRect.right;
      const leftAligned = alignToContent ? contentLeft - itemStartInset : triggerRect.left;
      const rightEdge = props.triggerType === "icon" ? contentRight : triggerRect.right;
      const rightAligned = rightEdge + (props.triggerType === "icon" ? itemContentRightInset : 0) - panelWidth;
      const left = leftAligned + panelWidth <= window.innerWidth - gap ? leftAligned : rightAligned;
      return Math.min(Math.max(gap, left), Math.max(gap, window.innerWidth - gap - panelWidth));
    }
    function updatePanelPosition() {
      if (!expanded.value || !trigger.value || !panel.value) return;
      const gap = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--wb-spacing-component-xs")
      ) || 4;
      const triggerRect = trigger.value.getBoundingClientRect();
      const element = panel.value;
      element.style.removeProperty("--dropdown-max-height");
      const naturalHeight = element.scrollHeight;
      const panelRect = element.getBoundingClientRect();
      const clampedLeft = getPanelLeft(element, panelRect, triggerRect, gap);
      const below = Math.max(0, window.innerHeight - triggerRect.bottom - gap * 2);
      const above = Math.max(0, triggerRect.top - gap * 2);
      const placement = naturalHeight <= below ? "bottom" : naturalHeight <= above ? "top" : below >= above ? "bottom" : "top";
      const available = placement === "bottom" ? below : above;
      const renderedHeight = Math.min(naturalHeight, available);
      const top = placement === "bottom" ? triggerRect.bottom + gap : triggerRect.top - gap - renderedHeight;
      element.dataset.placement = placement;
      element.style.setProperty("--dropdown-left", `${clampedLeft}px`);
      element.style.setProperty("--dropdown-top", `${Math.max(gap, top)}px`);
      element.style.setProperty("--dropdown-max-height", `${available}px`);
    }
    function handleDocumentScroll(event) {
      if (panel.value?.contains(event.target)) return;
      updatePanelPosition();
    }
    let resizeObserver;
    onMounted(() => {
      document.addEventListener("pointerdown", handleOutside);
      window.addEventListener("resize", updatePanelPosition);
      document.addEventListener("scroll", handleDocumentScroll, true);
      resizeObserver = new ResizeObserver(updatePanelPosition);
      if (trigger.value) resizeObserver.observe(trigger.value);
    });
    watch(
      panel,
      (node, previous) => {
        if (previous) resizeObserver?.unobserve(previous);
        if (node) resizeObserver?.observe(node);
        nextTick(updatePanelPosition);
      },
      { flush: "post" }
    );
    watch(
      () => disabled.value,
      (value) => {
        if (value) setOpen(false);
      }
    );
    onBeforeUnmount(() => {
      document.removeEventListener("pointerdown", handleOutside);
      window.removeEventListener("resize", updatePanelPosition);
      document.removeEventListener("scroll", handleDocumentScroll, true);
      resizeObserver?.disconnect();
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "span",
        {
          ref_key: "root",
          ref: root,
          class: _normalizeClass(["wb-dropdown", [
            `wb-dropdown--${__props.size}`,
            `wb-dropdown--trigger-${__props.triggerType}`,
            {
              [`wb-dropdown--text-${__props.textIntent}`]: __props.triggerType === "text",
              "is-text-inline": __props.triggerType === "text" && __props.textLayout === "inline",
              "is-open": expanded.value,
              "is-disabled": _unref(disabled)
            }
          ]]),
          onFocusout: handleFocusOut
        },
        [
          _createElementVNode("button", {
            id: `${_unref(id)}-trigger`,
            ref_key: "trigger",
            ref: trigger,
            type: "button",
            class: "wb-dropdown__trigger",
            disabled: _unref(disabled),
            "aria-label": __props.ariaLabel,
            "aria-haspopup": "menu",
            "aria-expanded": expanded.value,
            "aria-controls": expanded.value ? `${_unref(id)}-menu` : void 0,
            onClick: toggle,
            onKeydown: keydown
          }, [
            _createElementVNode(
              "span",
              {
                ref_key: "triggerContent",
                ref: triggerContent,
                class: "wb-dropdown__trigger-content"
              },
              [
                _renderSlot(_ctx.$slots, "trigger", _normalizeProps(_guardReactiveProps(triggerSlotProps.value)), () => [
                  _createTextVNode(
                    _toDisplayString(summary.value || __props.ariaLabel),
                    1
                    /* TEXT */
                  )
                ])
              ],
              512
              /* NEED_PATCH */
            ),
            _createElementVNode("span", _hoisted_2, [
              _createVNode(WorkbenchIcon, {
                class: "wb-dropdown__arrow",
                name: "/ic_arrow_right_line#2:141",
                size: 10
              })
            ])
          ], 40, _hoisted_1),
          (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
            expanded.value ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              id: `${_unref(id)}-menu`,
              ref_key: "panel",
              ref: panel,
              role: "menu",
              "aria-labelledby": `${_unref(id)}-trigger`,
              class: _normalizeClass(["wb-dropdown__panel", [`wb-dropdown__panel--${__props.size}`, `is-width-${__props.panelWidth}`]]),
              onKeydown: keydown,
              onFocusout: handleFocusOut
            }, [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(__props.items, (item) => {
                  return _openBlock(), _createElementBlock(
                    _Fragment,
                    {
                      key: item.id
                    },
                    [
                      item.type === "separator" ? (_openBlock(), _createElementBlock("div", _hoisted_4)) : item.type === "label" ? (_openBlock(), _createElementBlock(
                        "div",
                        _hoisted_5,
                        _toDisplayString(item.label),
                        1
                        /* TEXT */
                      )) : (_openBlock(), _createElementBlock("button", {
                        key: 2,
                        type: "button",
                        role: item.type === "radio" ? "menuitemradio" : item.type === "checkbox" ? "menuitemcheckbox" : "menuitem",
                        class: "wb-dropdown__item",
                        disabled: item.disabled,
                        "aria-disabled": item.disabled || void 0,
                        "aria-checked": item.type === "radio" || item.type === "checkbox" ? isChecked(item) : void 0,
                        title: item.label,
                        onClick: ($event) => activate(item, "click"),
                        onKeydown: ($event) => handleItemKeydown($event, item)
                      }, [
                        item.type === "checkbox" ? (_openBlock(), _createBlock(ChoiceMark, {
                          key: 0,
                          checked: isChecked(item),
                          disabled: item.disabled
                        }, null, 8, ["checked", "disabled"])) : item.icon ? (_openBlock(), _createElementBlock(
                          "span",
                          _hoisted_7,
                          _toDisplayString(item.icon),
                          1
                          /* TEXT */
                        )) : _createCommentVNode("v-if", true),
                        _createElementVNode(
                          "span",
                          _hoisted_8,
                          _toDisplayString(item.label),
                          1
                          /* TEXT */
                        ),
                        item.type === "radio" && isChecked(item) ? (_openBlock(), _createBlock(WorkbenchIcon, {
                          key: 2,
                          class: "wb-dropdown__selected-mark",
                          name: "\u5B8C\u6210_14px"
                        })) : _createCommentVNode("v-if", true)
                      ], 40, _hoisted_6))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 42, _hoisted_3)) : _createCommentVNode("v-if", true)
          ]))
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
