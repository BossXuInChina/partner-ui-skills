import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, unref as _unref, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, Teleport as _Teleport, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = { class: "wb-breadcrumb__list" };
const _hoisted_3 = {
  key: 0,
  class: "wb-breadcrumb__separator",
  "aria-hidden": "true"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = ["aria-expanded", "aria-controls"];
const _hoisted_6 = ["title"];
const _hoisted_7 = ["title"];
const _hoisted_8 = ["href", "title", "onClick"];
const _hoisted_9 = ["title", "onClick"];
const _hoisted_10 = ["href", "title", "onClick"];
const _hoisted_11 = ["disabled", "title", "onClick"];
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import breadcrumbSeparator from "./assets/\u9762\u5305\u5C51_\u659C\u6760.svg";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchBreadcrumb",
  props: {
    items: { type: Array, default: () => [] },
    collapseThreshold: { type: Number, default: 6 },
    ariaLabel: { type: String, default: "\u9762\u5305\u5C51" }
  },
  emits: ["navigate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const menuId = `wb-breadcrumb-${useId()}-menu`;
    const root = ref(null);
    const trigger = ref(null);
    const panel = ref(null);
    const expanded = ref(false);
    const normalizedItems = computed(
      () => props.items.filter((item) => item && item.id != null && item.label != null)
    );
    const isCollapsed = computed(
      () => normalizedItems.value.length > Math.max(6, Math.floor(props.collapseThreshold) || 6)
    );
    const hiddenItems = computed(() => isCollapsed.value ? normalizedItems.value.slice(1, -4) : []);
    const visibleItems = computed(() => {
      if (!isCollapsed.value)
        return normalizedItems.value.map((item, index) => ({
          kind: "item",
          item,
          originalIndex: index
        }));
      const tailStart = normalizedItems.value.length - 4;
      return [
        { kind: "item", item: normalizedItems.value[0], originalIndex: 0 },
        { kind: "collapsed", id: "__collapsed__" },
        ...normalizedItems.value.slice(tailStart).map((item, index) => ({ kind: "item", item, originalIndex: tailStart + index }))
      ];
    });
    function setTrigger(element) {
      trigger.value = element;
    }
    function isCurrent(entry) {
      return entry.kind === "item" && entry.originalIndex === normalizedItems.value.length - 1;
    }
    function activate(item, event) {
      if (item.disabled) {
        event?.preventDefault();
        return;
      }
      emit("navigate", item, event);
    }
    function menuButtons() {
      return [...panel.value?.querySelectorAll('[role="menuitem"]:not(:disabled)') ?? []];
    }
    function focusMenu(index = 0) {
      nextTick(() => menuButtons()[index]?.focus());
    }
    function placePanel() {
      const rect = trigger.value?.getBoundingClientRect();
      const menuRect = panel.value?.getBoundingClientRect();
      if (!rect || !menuRect) return;
      const gap = Number.parseFloat(
        getComputedStyle(root.value).getPropertyValue("--wb-spacing-component-xs")
      );
      const viewportGap = gap;
      const width = menuRect.width;
      const below = window.innerHeight - rect.bottom - gap - viewportGap;
      const above = rect.top - gap - viewportGap;
      const placeBelow = below >= menuRect.height || below >= above;
      const availableHeight = Math.max(0, placeBelow ? below : above);
      const top = placeBelow ? rect.bottom + gap : Math.max(viewportGap, rect.top - gap - Math.min(menuRect.height, availableHeight));
      panel.value.style.setProperty(
        "--breadcrumb-menu-left",
        `${Math.max(viewportGap, Math.min(rect.left, window.innerWidth - width - viewportGap))}px`
      );
      panel.value.style.setProperty("--breadcrumb-menu-top", `${top}px`);
      panel.value.style.setProperty("--breadcrumb-menu-max-height", `${availableHeight}px`);
    }
    function openMenu(focus = false) {
      if (!hiddenItems.value.some((item) => !item.disabled)) return;
      expanded.value = true;
      nextTick(placePanel);
      if (focus) focusMenu();
    }
    function closeMenu({ restoreFocus = false } = {}) {
      if (!expanded.value) return;
      expanded.value = false;
      if (restoreFocus) nextTick(() => trigger.value?.focus());
    }
    function toggleMenu() {
      expanded.value ? closeMenu() : openMenu(false);
    }
    function selectHidden(item, event) {
      activate(item, event);
      if (!item.disabled) closeMenu({ restoreFocus: true });
    }
    function handleTriggerKeydown(event) {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openMenu(true);
      } else if (event.key === "Escape") closeMenu({ restoreFocus: true });
    }
    function handleMenuKeydown(event) {
      const buttons = menuButtons();
      const index = buttons.indexOf(document.activeElement);
      let nextIndex = null;
      if (event.key === "ArrowDown") nextIndex = (index + 1) % buttons.length;
      if (event.key === "ArrowUp") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      if (nextIndex != null) {
        event.preventDefault();
        buttons[nextIndex]?.focus();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeMenu({ restoreFocus: true });
      }
    }
    function handleDocumentPointer(event) {
      if (expanded.value && !root.value?.contains(event.target) && !panel.value?.contains(event.target))
        closeMenu();
    }
    function handleFocusOut(event) {
      if (!root.value?.contains(event.relatedTarget) && !panel.value?.contains(event.relatedTarget))
        closeMenu();
    }
    watch(hiddenItems, (items) => {
      if (!items.length) closeMenu();
      else nextTick(placePanel);
    });
    function handleViewportChange() {
      if (expanded.value) placePanel();
    }
    onMounted(() => {
      document.addEventListener("pointerdown", handleDocumentPointer);
      window.addEventListener("resize", handleViewportChange);
      window.addEventListener("scroll", handleViewportChange, true);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("pointerdown", handleDocumentPointer);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("nav", {
        ref_key: "root",
        ref: root,
        class: "wb-breadcrumb",
        "aria-label": __props.ariaLabel,
        onFocusout: handleFocusOut
      }, [
        _createElementVNode("ol", _hoisted_2, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(visibleItems.value, (entry, visibleIndex) => {
              return _openBlock(), _createElementBlock("li", {
                key: entry.kind === "item" ? entry.item.id : entry.id,
                class: "wb-breadcrumb__entry"
              }, [
                visibleIndex ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
                  _createElementVNode("img", {
                    src: _unref(breadcrumbSeparator),
                    alt: "",
                    width: "12",
                    height: "12"
                  }, null, 8, _hoisted_4)
                ])) : _createCommentVNode("v-if", true),
                entry.kind === "collapsed" ? (_openBlock(), _createElementBlock("button", {
                  key: 1,
                  ref_for: true,
                  ref: setTrigger,
                  type: "button",
                  class: "wb-breadcrumb__collapsed",
                  "aria-label": "\u663E\u793A\u6298\u53E0\u7684\u8DEF\u5F84",
                  "aria-haspopup": "menu",
                  "aria-expanded": expanded.value,
                  "aria-controls": expanded.value ? menuId : void 0,
                  onClick: toggleMenu,
                  onKeydown: handleTriggerKeydown
                }, " ... ", 40, _hoisted_5)) : isCurrent(entry) ? (_openBlock(), _createElementBlock("span", {
                  key: 2,
                  class: "wb-breadcrumb__current",
                  "aria-current": "page",
                  title: entry.item.label
                }, _toDisplayString(entry.item.label), 9, _hoisted_6)) : entry.item.disabled ? (_openBlock(), _createElementBlock("span", {
                  key: 3,
                  class: "wb-breadcrumb__node is-disabled",
                  "aria-disabled": "true",
                  title: entry.item.label
                }, _toDisplayString(entry.item.label), 9, _hoisted_7)) : entry.item.href ? (_openBlock(), _createElementBlock("a", {
                  key: 4,
                  class: "wb-breadcrumb__node",
                  href: entry.item.href,
                  title: entry.item.label,
                  onClick: ($event) => activate(entry.item, $event)
                }, _toDisplayString(entry.item.label), 9, _hoisted_8)) : (_openBlock(), _createElementBlock("button", {
                  key: 5,
                  type: "button",
                  class: "wb-breadcrumb__node",
                  title: entry.item.label,
                  onClick: ($event) => activate(entry.item, $event)
                }, _toDisplayString(entry.item.label), 9, _hoisted_9))
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
          expanded.value ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              id: menuId,
              ref_key: "panel",
              ref: panel,
              role: "menu",
              "aria-label": "\u6298\u53E0\u7684\u9762\u5305\u5C51\u8DEF\u5F84",
              class: "wb-breadcrumb__menu",
              onKeydown: handleMenuKeydown,
              onFocusout: handleFocusOut
            },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(hiddenItems.value, (item) => {
                  return _openBlock(), _createElementBlock(
                    _Fragment,
                    {
                      key: item.id
                    },
                    [
                      item.href && !item.disabled ? (_openBlock(), _createElementBlock("a", {
                        key: 0,
                        href: item.href,
                        role: "menuitem",
                        class: "wb-breadcrumb__menu-item",
                        title: item.label,
                        onClick: ($event) => selectHidden(item, $event)
                      }, _toDisplayString(item.label), 9, _hoisted_10)) : (_openBlock(), _createElementBlock("button", {
                        key: 1,
                        type: "button",
                        role: "menuitem",
                        class: "wb-breadcrumb__menu-item",
                        disabled: item.disabled,
                        title: item.label,
                        onClick: ($event) => selectHidden(item, $event)
                      }, _toDisplayString(item.label), 9, _hoisted_11))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            544
            /* NEED_HYDRATION, NEED_PATCH */
          )) : _createCommentVNode("v-if", true)
        ]))
      ], 40, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
