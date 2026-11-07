import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, unref as _unref, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, createVNode as _createVNode, withModifiers as _withModifiers, resolveDynamicComponent as _resolveDynamicComponent, withKeys as _withKeys, normalizeClass as _normalizeClass, withCtx as _withCtx, createBlock as _createBlock, createElementVNode as _createElementVNode, vShow as _vShow, withDirectives as _withDirectives } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = {
  key: 0,
  class: "wb-tabs__divider",
  "aria-hidden": "true"
};
const _hoisted_3 = ["disabled", "aria-label", "onClick"];
const _hoisted_4 = {
  key: 0,
  class: "wb-tabs__more-wrap"
};
const _hoisted_5 = {
  key: 0,
  class: "wb-tabs__divider",
  "aria-hidden": "true"
};
const _hoisted_6 = ["id", "aria-description", "aria-expanded", "aria-controls", "onKeydown"];
const _hoisted_7 = ["id", "aria-labelledby"];
const _hoisted_8 = ["aria-checked", "disabled", "onClick", "onKeydown"];
const _hoisted_9 = ["disabled", "aria-label", "onClick"];
const _hoisted_10 = {
  key: 1,
  class: "wb-tabs__divider",
  "aria-hidden": "true"
};
const _hoisted_11 = {
  key: 0,
  class: "wb-tabs__close"
};
const _hoisted_12 = ["id", "aria-labelledby", "aria-label"];
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  ref,
  useSlots,
  useId,
  watch
} from "vue";
const __sfc_main__ = {
  __name: "WorkbenchTabs",
  props: {
    modelValue: { type: [String, Number], required: true },
    items: { type: Array, required: true },
    variant: {
      type: String,
      default: "basic",
      validator: (value) => ["basic", "divider", "rail", "segment"].includes(value)
    },
    size: {
      type: String,
      default: "small",
      validator: (value) => ["small", "large"].includes(value)
    },
    align: {
      type: String,
      default: "start",
      validator: (value) => ["start", "center"].includes(value)
    },
    ariaLabel: { type: String, default: "\u9875\u7B7E" },
    addable: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change", "add", "remove"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const slots = useSlots();
    const emit = __emit;
    const instanceId = `wb-tabs-${useId()}`;
    const rootElement = ref(null);
    const listElement = ref(null);
    const indicatorElement = ref(null);
    const segmentHighlightElement = ref(null);
    const moreElement = ref(null);
    const moreMeasureElement = ref(null);
    const measureContainerElement = ref(null);
    const measureElements = ref([]);
    onBeforeUpdate(() => {
      measureElements.value = [];
      tabElements.value = [];
    });
    const tabElements = ref([]);
    const visibleCount = ref(props.items.length);
    const menuOpen = ref(false);
    const supportsAdd = computed(
      () => props.addable && ["basic", "divider", "rail"].includes(props.variant)
    );
    const menuAlignRight = ref(false);
    const activeIndex = computed(
      () => props.items.findIndex((item) => item.value === props.modelValue)
    );
    const activeItem = computed(() => props.items[activeIndex.value] ?? null);
    const visibleItems = computed(() => props.items.slice(0, visibleCount.value));
    const overflowItems = computed(() => props.items.slice(visibleCount.value));
    const activeIsOverflow = computed(() => activeIndex.value >= visibleCount.value);
    const tabId = (index) => `${instanceId}-tab-${index}`;
    const panelId = (index) => `${instanceId}-panel-${index}`;
    let resizeObserver;
    function updateSelectionVisual() {
      if (activeIndex.value < 0) return;
      const tab = activeIsOverflow.value ? moreElement.value : tabElements.value[activeIndex.value];
      if (!tab) return;
      const visual = ["basic", "rail"].includes(props.variant) ? indicatorElement.value : segmentHighlightElement.value;
      if (!visual || !listElement.value) return;
      const tabRect = tab.getBoundingClientRect();
      const listRect = listElement.value.getBoundingClientRect();
      visual.style.width = `${tabRect.width}px`;
      visual.style.transform = `translateX(${tabRect.left - listRect.left}px)`;
    }
    function interItemSpace(styles) {
      if (["basic", "rail"].includes(props.variant))
        return Number.parseFloat(styles.getPropertyValue("--wb-asset-wb-tabs-basic-tab-gap")) || 0;
      if (props.variant === "divider") {
        const divider = Number.parseFloat(styles.getPropertyValue("--wb-asset-wb-tabs-divider-width")) || 0;
        const gap = Number.parseFloat(styles.getPropertyValue("--wb-spacing-component-sm")) || 0;
        return divider + gap * 2;
      }
      if (props.variant === "segment")
        return Number.parseFloat(styles.getPropertyValue("--wb-spacing-component-xs")) || 0;
      return 0;
    }
    function updateOverflow() {
      if (!rootElement.value || !measureElements.value.length || !moreMeasureElement.value) return;
      const rootStyles = getComputedStyle(rootElement.value);
      const segmentInset = props.variant === "segment" ? Number.parseFloat(rootStyles.getPropertyValue("--wb-asset-wb-tabs-segment-inset")) || 0 : 0;
      const available = Math.max(0, rootElement.value.clientWidth - segmentInset * 2);
      const widths = props.items.map((_, index) => measureElements.value[index]?.offsetWidth ?? 0);
      const styles = getComputedStyle(rootElement.value);
      const space = interItemSpace(styles);
      const addWidth = supportsAdd.value ? props.size === "large" ? 16 : 12 : 0;
      const addSpace = supportsAdd.value && widths.length ? space : 0;
      const fullWidth = widths.reduce((sum, width) => sum + width, 0) + space * Math.max(0, widths.length - 1) + addWidth + addSpace;
      if (fullWidth <= available) {
        visibleCount.value = props.items.length;
        menuOpen.value = false;
        nextTick(updateSelectionVisual);
        return;
      }
      const moreWidth = moreMeasureElement.value.offsetWidth;
      let used = moreWidth + (supportsAdd.value ? addWidth + space : 0);
      let count = 0;
      for (const width of widths) {
        const next = used + space + width;
        if (next > available) break;
        used = next;
        count += 1;
      }
      visibleCount.value = Math.min(count, Math.max(0, props.items.length - 1));
      nextTick(updateSelectionVisual);
    }
    function select(item, index, focus = false) {
      if (!item || item.disabled) return;
      if (item.value !== props.modelValue) {
        emit("update:modelValue", item.value);
        emit("change", item);
      }
      if (focus)
        nextTick(
          () => (index >= visibleCount.value ? moreElement.value : tabElements.value[index])?.focus()
        );
    }
    function canRemove(item) {
      return props.variant === "basic" && Boolean(item.closable) && !item.disabled;
    }
    function requestRemove(item) {
      if (!canRemove(item)) return;
      const index = props.items.indexOf(item);
      emit("remove", item);
      menuOpen.value = false;
      nextTick(async () => {
        updateOverflow();
        await nextTick();
        const target = activeIndex.value >= 0 ? activeIndex.value : Math.min(index, props.items.length - 1);
        const next = target >= visibleCount.value ? moreElement.value : document.getElementById(tabId(target));
        (next && !next.hasAttribute("disabled") ? next : rootElement.value)?.focus();
      });
    }
    function selectOverflow(item) {
      const index = props.items.indexOf(item);
      select(item, index);
      menuOpen.value = false;
      nextTick(() => moreElement.value?.focus());
    }
    function toggleMore() {
      menuOpen.value = !menuOpen.value;
      if (menuOpen.value)
        nextTick(() => {
          updateMenuAlignment();
          menuItems()[0]?.focus();
        });
    }
    function updateMenuAlignment() {
      if (!menuOpen.value || !moreElement.value) return;
      const menu = rootElement.value?.querySelector(".wb-tabs__menu");
      if (!menu) return;
      const triggerRect = moreElement.value.getBoundingClientRect();
      const menuWidth = menu.getBoundingClientRect().width;
      const menuTextInset = Number.parseFloat(
        getComputedStyle(rootElement.value).getPropertyValue("--wb-spacing-component-xs")
      ) + Number.parseFloat(
        getComputedStyle(rootElement.value).getPropertyValue("--wb-spacing-component-sm")
      );
      menuAlignRight.value = triggerRect.left + menuWidth - menuTextInset > window.innerWidth - 8;
    }
    function menuItems() {
      return [...rootElement.value?.querySelectorAll(".wb-tabs__menu button:not(:disabled)") ?? []];
    }
    function onMenuKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        menuOpen.value = false;
        nextTick(() => moreElement.value?.focus());
        return;
      }
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const nodes = menuItems();
      if (!nodes.length) return;
      const index = nodes.indexOf(document.activeElement);
      const target = event.key === "Home" ? 0 : event.key === "End" ? nodes.length - 1 : (Math.max(0, index) + (event.key === "ArrowDown" ? 1 : -1) + nodes.length) % nodes.length;
      nodes[target]?.focus();
    }
    function onFocusOut(event) {
      if (!rootElement.value?.contains(event.relatedTarget)) menuOpen.value = false;
    }
    function onDocumentPointerdown(event) {
      if (menuOpen.value && !rootElement.value?.contains(event.target)) menuOpen.value = false;
    }
    function enabledIndexes() {
      return props.items.map((item, index) => item.disabled ? -1 : index).filter((index) => index >= 0);
    }
    function onKeydown(event, index) {
      if (event.key === "Delete" && canRemove(props.items[index])) {
        event.preventDefault();
        requestRemove(props.items[index]);
        return;
      }
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      const enabled = enabledIndexes();
      if (!enabled.length) return;
      event.preventDefault();
      const position = enabled.indexOf(index);
      let target;
      if (event.key === "Home") target = enabled[0];
      else if (event.key === "End") target = enabled.at(-1);
      else if (event.key === "ArrowRight")
        target = enabled[(Math.max(position, -1) + 1) % enabled.length];
      else target = enabled[(position <= 0 ? enabled.length : position) - 1];
      select(props.items[target], target, true);
    }
    watch(visibleCount, () => {
      const focusedIndex = tabElements.value.indexOf(document.activeElement);
      const focusedMore = document.activeElement === moreElement.value;
      nextTick(() => {
        if (focusedIndex >= visibleCount.value && focusedIndex >= 0) moreElement.value?.focus();
        else if (focusedMore && !overflowItems.value.length)
          tabElements.value[activeIndex.value]?.focus();
      });
    });
    watch(
      () => [props.variant, props.size, props.items, props.addable],
      () => {
        visibleCount.value = props.items.length;
        nextTick(updateOverflow);
      },
      { deep: true }
    );
    watch(
      () => props.modelValue,
      () => nextTick(updateOverflow)
    );
    onMounted(() => {
      nextTick(updateOverflow);
      resizeObserver = new ResizeObserver(updateOverflow);
      if (rootElement.value) resizeObserver.observe(rootElement.value);
      if (measureContainerElement.value) resizeObserver.observe(measureContainerElement.value);
      document.addEventListener("pointerdown", onDocumentPointerdown);
      window.addEventListener("resize", updateMenuAlignment);
    });
    onBeforeUnmount(() => {
      resizeObserver?.disconnect();
      document.removeEventListener("pointerdown", onDocumentPointerdown);
      window.removeEventListener("resize", updateMenuAlignment);
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          ref_key: "rootElement",
          ref: rootElement,
          class: _normalizeClass(["wb-tabs", [`wb-tabs--${__props.variant}`, `wb-tabs--${__props.size}`, `wb-tabs--align-${__props.align}`]]),
          tabindex: "-1",
          onFocusout: onFocusOut
        },
        [
          _createElementVNode("div", {
            ref_key: "listElement",
            ref: listElement,
            class: "wb-tabs__list",
            role: "tablist",
            "aria-label": __props.ariaLabel
          }, [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(visibleItems.value, (item, index) => {
                return _openBlock(), _createElementBlock(
                  _Fragment,
                  {
                    key: item.value
                  },
                  [
                    __props.variant === "divider" && index > 0 ? (_openBlock(), _createElementBlock("span", _hoisted_2)) : _createCommentVNode("v-if", true),
                    (_openBlock(), _createBlock(_resolveDynamicComponent(__props.variant === "basic" && item.closable ? "div" : "button"), {
                      id: tabId(index),
                      ref_for: true,
                      ref: (element) => {
                        tabElements.value[index] = element;
                      },
                      class: _normalizeClass(["wb-tabs__tab", {
                        "is-selected": item.value === __props.modelValue,
                        "has-close": __props.variant === "basic" && item.closable,
                        "is-disabled": item.disabled
                      }]),
                      type: "button",
                      role: "tab",
                      "aria-selected": item.value === __props.modelValue,
                      "aria-disabled": item.disabled || void 0,
                      "aria-label": item.closable ? item.label : void 0,
                      "aria-controls": _unref(slots).panel && item.value === __props.modelValue ? panelId(index) : void 0,
                      tabindex: !item.disabled && item.value === __props.modelValue ? 0 : -1,
                      disabled: item.disabled,
                      onClick: ($event) => select(item, index),
                      onKeydown: [
                        ($event) => onKeydown($event, index),
                        _withKeys(_withModifiers(($event) => select(item, index), ["self", "prevent"]), ["enter"]),
                        _withKeys(_withModifiers(($event) => select(item, index), ["self", "prevent"]), ["space"])
                      ]
                    }, {
                      default: _withCtx(() => [
                        _renderSlot(_ctx.$slots, "tab", {
                          item,
                          selected: item.value === __props.modelValue
                        }, () => [
                          _createTextVNode(
                            _toDisplayString(item.label),
                            1
                            /* TEXT */
                          )
                        ]),
                        __props.variant === "basic" && item.closable ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          class: "wb-tabs__close",
                          type: "button",
                          disabled: item.disabled,
                          "aria-label": `\u5173\u95ED${item.label}`,
                          onClick: _withModifiers(($event) => requestRemove(item), ["stop"]),
                          onKeydown: _cache[0] || (_cache[0] = _withModifiers(() => {
                          }, ["stop"]))
                        }, [
                          _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_14px" })
                        ], 40, _hoisted_3)) : _createCommentVNode("v-if", true)
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1064, ["id", "class", "aria-selected", "aria-disabled", "aria-label", "aria-controls", "tabindex", "disabled", "onClick", "onKeydown"]))
                  ],
                  64
                  /* STABLE_FRAGMENT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            overflowItems.value.length ? (_openBlock(), _createElementBlock("span", _hoisted_4, [
              __props.variant === "divider" && visibleItems.value.length ? (_openBlock(), _createElementBlock("span", _hoisted_5)) : _createCommentVNode("v-if", true),
              _createElementVNode("button", {
                id: `${instanceId}-more`,
                ref_key: "moreElement",
                ref: moreElement,
                class: _normalizeClass(["wb-tabs__tab wb-tabs__more", { "is-selected": activeIsOverflow.value }]),
                type: "button",
                "aria-description": activeIsOverflow.value ? `\u5F53\u524D\u9875\u7B7E\uFF1A${activeItem.value.label}` : void 0,
                "aria-haspopup": "menu",
                "aria-expanded": menuOpen.value,
                "aria-controls": [
                  menuOpen.value ? `${instanceId}-menu` : null,
                  _unref(slots).panel && activeIsOverflow.value ? panelId(activeIndex.value) : null
                ].filter(Boolean).join(" ") || void 0,
                onClick: toggleMore,
                onKeydown: [
                  _withKeys(_withModifiers(toggleMore, ["prevent"]), ["down"]),
                  _cache[1] || (_cache[1] = ($event) => onKeydown($event, activeIsOverflow.value ? activeIndex.value : visibleCount.value - 1))
                ]
              }, " \u66F4\u591A ", 42, _hoisted_6),
              menuOpen.value ? (_openBlock(), _createElementBlock("div", {
                key: 1,
                id: `${instanceId}-menu`,
                class: _normalizeClass(["wb-tabs__menu", { "wb-tabs__menu--align-right": menuAlignRight.value }]),
                role: "menu",
                "aria-labelledby": `${instanceId}-more`,
                onKeydown: onMenuKeydown
              }, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(overflowItems.value, (item) => {
                    return _openBlock(), _createElementBlock("div", {
                      key: item.value,
                      class: "wb-tabs__menu-row",
                      role: "none"
                    }, [
                      _createElementVNode("button", {
                        class: "wb-tabs__menu-item",
                        type: "button",
                        role: "menuitemradio",
                        "aria-checked": item.value === __props.modelValue,
                        disabled: item.disabled,
                        onClick: ($event) => selectOverflow(item),
                        onKeydown: _withKeys(_withModifiers(($event) => requestRemove(item), ["prevent"]), ["delete"])
                      }, _toDisplayString(item.label), 41, _hoisted_8),
                      __props.variant === "basic" && item.closable ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        class: "wb-tabs__close",
                        type: "button",
                        role: "menuitem",
                        disabled: item.disabled,
                        "aria-label": `\u5173\u95ED${item.label}`,
                        onClick: ($event) => requestRemove(item)
                      }, [
                        _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_14px" })
                      ], 8, _hoisted_9)) : _createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 42, _hoisted_7)) : _createCommentVNode("v-if", true)
            ])) : _createCommentVNode("v-if", true),
            supportsAdd.value && __props.variant === "divider" && (visibleItems.value.length || overflowItems.value.length) ? (_openBlock(), _createElementBlock("span", _hoisted_10)) : _createCommentVNode("v-if", true),
            supportsAdd.value ? (_openBlock(), _createElementBlock("button", {
              key: 2,
              class: "wb-tabs__add",
              type: "button",
              "aria-label": "\u65B0\u589E\u9875\u7B7E",
              onClick: _cache[2] || (_cache[2] = ($event) => emit("add"))
            }, [
              _createVNode(WorkbenchIcon, {
                name: __props.size === "large" ? "/ic_public_plus_line#2:213" : "/ic_public_plus_line",
                size: __props.size === "large" ? 16 : 12
              }, null, 8, ["name", "size"])
            ])) : _createCommentVNode("v-if", true),
            __props.variant === "basic" || __props.variant === "rail" ? _withDirectives((_openBlock(), _createElementBlock(
              "span",
              {
                key: 3,
                ref_key: "indicatorElement",
                ref: indicatorElement,
                class: "wb-tabs__indicator",
                "aria-hidden": "true"
              },
              null,
              512
              /* NEED_PATCH */
            )), [
              [_vShow, activeIndex.value >= 0]
            ]) : _createCommentVNode("v-if", true),
            __props.variant === "segment" ? _withDirectives((_openBlock(), _createElementBlock(
              "span",
              {
                key: 4,
                ref_key: "segmentHighlightElement",
                ref: segmentHighlightElement,
                class: "wb-tabs__segment-highlight",
                "aria-hidden": "true"
              },
              null,
              512
              /* NEED_PATCH */
            )), [
              [_vShow, activeIndex.value >= 0]
            ]) : _createCommentVNode("v-if", true)
          ], 8, _hoisted_1),
          _createElementVNode(
            "div",
            {
              ref_key: "measureContainerElement",
              ref: measureContainerElement,
              class: "wb-tabs__measure",
              "aria-hidden": "true",
              inert: ""
            },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(__props.items, (item, index) => {
                  return _openBlock(), _createElementBlock(
                    "button",
                    {
                      key: item.value,
                      ref_for: true,
                      ref: (element) => {
                        measureElements.value[index] = element;
                      },
                      class: _normalizeClass(["wb-tabs__tab", {
                        "is-selected": item.value === __props.modelValue,
                        "has-close": __props.variant === "basic" && item.closable
                      }]),
                      type: "button",
                      tabindex: "-1"
                    },
                    [
                      _renderSlot(_ctx.$slots, "tab", {
                        item,
                        selected: item.value === __props.modelValue
                      }, () => [
                        _createTextVNode(
                          _toDisplayString(item.label),
                          1
                          /* TEXT */
                        )
                      ]),
                      __props.variant === "basic" && item.closable ? (_openBlock(), _createElementBlock("span", _hoisted_11, [
                        _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_14px" })
                      ])) : _createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              _createElementVNode(
                "button",
                {
                  ref_key: "moreMeasureElement",
                  ref: moreMeasureElement,
                  class: "wb-tabs__tab",
                  type: "button",
                  tabindex: "-1"
                },
                " \u66F4\u591A ",
                512
                /* NEED_PATCH */
              )
            ],
            512
            /* NEED_PATCH */
          ),
          activeItem.value && _unref(slots).panel ? (_openBlock(), _createElementBlock("section", {
            key: 0,
            id: panelId(activeIndex.value),
            class: "wb-tabs__panel",
            role: "tabpanel",
            "aria-labelledby": activeIsOverflow.value ? void 0 : tabId(activeIndex.value),
            "aria-label": activeIsOverflow.value ? activeItem.value.label : void 0,
            tabindex: "0"
          }, [
            _renderSlot(_ctx.$slots, "panel", { item: activeItem.value })
          ], 8, _hoisted_12)) : _createCommentVNode("v-if", true)
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-de9c5755" });
