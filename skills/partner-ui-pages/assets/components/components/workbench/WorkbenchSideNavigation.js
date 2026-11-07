import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createVNode as _createVNode, withCtx as _withCtx, createBlock as _createBlock, normalizeClass as _normalizeClass, renderList as _renderList, Fragment as _Fragment, createElementVNode as _createElementVNode, Transition as _Transition, withModifiers as _withModifiers, withKeys as _withKeys } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["title"];
const _hoisted_3 = { class: "wb-side-nav__list" };
const _hoisted_4 = ["aria-current", "aria-expanded", "aria-label", "title", "onClick", "onKeydown"];
const _hoisted_5 = {
  key: 0,
  class: "wb-side-nav__track",
  "aria-hidden": "true"
};
const _hoisted_6 = {
  key: 1,
  class: "wb-side-nav__label"
};
const _hoisted_7 = {
  key: 0,
  class: "wb-side-nav__children"
};
const _hoisted_8 = ["aria-current", "aria-expanded", "aria-controls", "data-parent-id", "data-child-id", "title", "onClick", "onKeydown"];
const _hoisted_9 = {
  key: 0,
  class: "wb-side-nav__track",
  "aria-hidden": "true"
};
const _hoisted_10 = { class: "wb-side-nav__label" };
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, useId } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import SideNavigationPanel from "./SideNavigationPanel.vue";
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchSideNavigation",
  props: {
    title: { type: String, default: "" },
    topToggle: { type: Boolean, default: false },
    width: { type: String, default: "" },
    panelMode: { type: String, default: "flyout", validator: (value) => ["flyout", "popup", "columns"].includes(value) },
    panelDensity: { type: String, default: "default", validator: (value) => ["small", "default", "large"].includes(value) },
    showFlyoutIcons: { type: Boolean, default: true },
    showDivider: { type: Boolean, default: true },
    ariaLabel: { type: String, default: "\u4FA7\u8FB9\u5BFC\u822A" },
    items: { type: Array, default: () => [] },
    collapsed: { type: Boolean, default: false },
    activeItem: { type: String, default: "" },
    expandedItems: { type: Array, default: () => [] },
    panelItemId: { type: String, default: void 0 },
    panelExpandAll: { type: Boolean, default: false },
    collapsible: { type: Boolean, default: true }
  },
  emits: ["update:collapsed", "update:activeItem", "update:expandedItems", "update:panelItemId", "select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const root = ref(null);
    const viewportWidth = ref(typeof window === "undefined" ? 1440 : window.innerWidth);
    const internalPanelItem = ref(null);
    const panelItem = computed(() => {
      if (props.panelItemId === void 0) return internalPanelItem.value;
      return props.items.flatMap((item) => item.children ?? []).find((child) => child.id === props.panelItemId && hasChildren(child)) ?? null;
    });
    const panelTrigger = ref(null);
    const panelId = `wb-side-panel-${useId()}`;
    const iconAliases = { home: "\u623F\u5B50/\u5C3A\u5BF8=16,\u9762\u6027=off", chart: "\u56FE\u8868/\u7C7B\u578B=\u67F1\u72B6\u56FE,\u5C3A\u5BF8=16,\u9762\u6027=off", users: "\u6587\u4EF6/\u5C3A\u5BF8=16", grid: "\u5E03\u5C40\u89C6\u56FE/\u89C6\u56FE=\u5BAB\u683C,\u5C3A\u5BF8=16,\u9762\u6027=off" };
    const iconName = (value) => iconAliases[value] ?? (value || "\u5E03\u5C40\u89C6\u56FE/\u89C6\u56FE=\u5BAB\u683C,\u5C3A\u5BF8=16,\u9762\u6027=off");
    const containsActive = (item) => item.id === props.activeItem || (item.children ?? []).some(containsActive);
    const expandedSet = computed(() => new Set(props.expandedItems));
    const sizeClass = computed(() => {
      if (viewportWidth.value < 768) return "is-size-undefined";
      if (viewportWidth.value >= 1921) return "is-size-ultrawide";
      if (viewportWidth.value >= 1280) return "is-size-wide";
      return "is-size-medium";
    });
    const hasChildren = (item) => Array.isArray(item.children) && item.children.length > 0;
    const hasActivePage = (item) => hasChildren(item) ? item.children.some(hasActivePage) : item.id === props.activeItem;
    const isExpanded = (item) => expandedSet.value.has(item.id);
    function updateExpanded(id, expanded) {
      const next = new Set(props.expandedItems);
      if (expanded) next.add(id);
      else next.delete(id);
      emit("update:expandedItems", [...next]);
    }
    function setPanel(item) {
      if (props.panelItemId === void 0) internalPanelItem.value = item;
      else emit("update:panelItemId", item?.id ?? "");
    }
    function activate(item, event, child = false) {
      if (child && hasChildren(item)) {
        if (panelItem.value?.id === item.id) closePanel();
        else {
          setPanel(item);
          panelTrigger.value = event?.currentTarget ?? null;
          measureViewport();
        }
        return;
      }
      closePanel(false);
      if (hasChildren(item)) {
        if (props.collapsed) {
          emit("update:collapsed", false);
          updateExpanded(item.id, true);
        } else {
          updateExpanded(item.id, !isExpanded(item));
        }
        return;
      }
      emit("update:activeItem", item.id);
      emit("select", item);
    }
    function sameLevelButtons(button) {
      const list = button.closest("ul");
      if (!list) return [];
      return [...list.children].map((entry) => entry.querySelector(":scope > button")).filter(Boolean);
    }
    function moveFocus(event, edge) {
      const buttons = sameLevelButtons(event.currentTarget);
      const current = buttons.indexOf(event.currentTarget);
      if (current < 0 || !buttons.length) return;
      event.preventDefault();
      const target = edge === "first" ? 0 : edge === "last" ? buttons.length - 1 : (current + edge + buttons.length) % buttons.length;
      buttons[target]?.focus();
    }
    function handleKeydown(event, item, child = false) {
      if (event.key === "ArrowDown") return moveFocus(event, 1);
      if (event.key === "ArrowUp") return moveFocus(event, -1);
      if (event.key === "Home") return moveFocus(event, "first");
      if (event.key === "End") return moveFocus(event, "last");
      if (event.key === "Escape") {
        closePanel();
        return;
      }
      if (child) return handleChildKeydown(event, item);
      if (!hasChildren(item)) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (props.collapsed) emit("update:collapsed", false);
        if (!isExpanded(item)) updateExpanded(item.id, true);
        nextTick(() => root.value?.querySelector(`[data-parent-id="${CSS.escape(item.id)}"]`)?.focus());
      }
      if (event.key === "ArrowLeft" && isExpanded(item)) {
        event.preventDefault();
        updateExpanded(item.id, false);
      }
    }
    function handleChildKeydown(event, item) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const parent = event.currentTarget.closest(".wb-side-nav__children")?.parentElement?.querySelector(":scope > button");
        closePanel(false);
        parent?.focus();
        return;
      }
      if (!hasChildren(item)) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        if (panelItem.value?.id !== item.id) activate(item, event, true);
        nextTick(() => root.value?.querySelector(".wb-side-nav__panel-option")?.focus());
        return;
      }
    }
    function toggleNavigation() {
      closePanel(false);
      emit("update:collapsed", !props.collapsed);
    }
    function beforeSubmenuEnter(element) {
      element.style.height = "0";
      element.style.overflow = "hidden";
    }
    function enterSubmenu(element) {
      requestAnimationFrame(() => {
        element.style.height = `${element.scrollHeight}px`;
      });
    }
    function afterSubmenuEnter(element) {
      element.style.height = "auto";
      element.style.overflow = "";
    }
    function beforeSubmenuLeave(element) {
      element.style.height = `${element.scrollHeight}px`;
      element.style.overflow = "hidden";
    }
    function leaveSubmenu(element) {
      requestAnimationFrame(() => {
        element.style.height = "0";
      });
    }
    function afterSubmenuLeave(element) {
      element.style.height = "";
      element.style.overflow = "";
    }
    function closePanel(restoreFocus = true) {
      setPanel(null);
      if (restoreFocus) nextTick(() => {
        if (!panelItem.value) panelTrigger.value?.focus();
      });
    }
    function selectPanelItem(item) {
      emit("update:activeItem", item.id);
      emit("select", item);
      closePanel();
    }
    function onOutsidePointer(event) {
      if (panelItem.value && !root.value?.contains(event.target)) closePanel(false);
    }
    function measureViewport() {
      viewportWidth.value = window.innerWidth;
      if (!root.value) return;
      const box = root.value.getBoundingClientRect();
      root.value.style.setProperty("--side-navigation-panel-available", `${Math.max(0, window.innerWidth - box.right)}px`);
      const y = Math.max(0, (panelTrigger.value?.getBoundingClientRect().top ?? box.top) - box.top);
      root.value.style.setProperty("--side-navigation-panel-anchor", `${y}px`);
    }
    watch(() => props.width, (value) => {
      if (value) root.value?.style.setProperty("--side-navigation-width", value);
      else root.value?.style.removeProperty("--side-navigation-width");
      nextTick(measureViewport);
    }, { flush: "post" });
    watch(() => props.collapsed, () => {
      closePanel(false);
      nextTick(measureViewport);
    });
    watch(() => props.panelMode, () => nextTick(measureViewport));
    watch(() => props.panelItemId, () => nextTick(() => {
      panelTrigger.value = panelItem.value ? root.value?.querySelector(`[data-child-id="${CSS.escape(panelItem.value.id)}"]`) ?? null : null;
      measureViewport();
    }));
    watch(() => props.items, () => closePanel(false));
    watch(() => props.expandedItems, () => {
      if (panelItem.value && !props.items.some((item) => isExpanded(item) && item.children?.some((child) => child.id === panelItem.value.id))) closePanel(false);
    });
    onMounted(() => {
      if (props.width) root.value.style.setProperty("--side-navigation-width", props.width);
      measureViewport();
      if (panelItem.value) nextTick(() => {
        panelTrigger.value = root.value?.querySelector(`[data-child-id="${CSS.escape(panelItem.value.id)}"]`) ?? null;
        measureViewport();
      });
      window.addEventListener("resize", measureViewport);
      document.addEventListener("pointerdown", onOutsidePointer);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", measureViewport);
      document.removeEventListener("pointerdown", onOutsidePointer);
    });
    __expose({ toggle: toggleNavigation, closePanel });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("nav", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-side-nav", [sizeClass.value, { "is-collapsed": __props.collapsed, "has-divider": __props.showDivider }]]),
        "aria-label": __props.ariaLabel,
        onKeydown: _cache[0] || (_cache[0] = _withKeys(_withModifiers(($event) => closePanel(), ["stop"]), ["esc"])),
        onTransitionend: _withModifiers(measureViewport, ["self"])
      }, [
        __props.title || __props.topToggle ? (_openBlock(), _createElementBlock(
          "header",
          {
            key: 0,
            class: _normalizeClass(["wb-side-nav__header", { "has-title": __props.title && !__props.collapsed }])
          },
          [
            __props.title && !__props.collapsed ? (_openBlock(), _createElementBlock("span", {
              key: 0,
              class: "wb-side-nav__label",
              title: __props.title
            }, _toDisplayString(__props.title), 9, _hoisted_2)) : _createCommentVNode("v-if", true),
            __props.topToggle ? (_openBlock(), _createBlock(WorkbenchButton, {
              key: 1,
              appearance: "icon",
              "icon-layout": "container",
              size: "32",
              "aria-label": __props.collapsed ? "\u5C55\u5F00\u4FA7\u8FB9\u5BFC\u822A\uFF08\u9876\u90E8\uFF09" : "\u6536\u8D77\u4FA7\u8FB9\u5BFC\u822A\uFF08\u9876\u90E8\uFF09",
              "aria-expanded": !__props.collapsed,
              onClick: toggleNavigation
            }, {
              icon: _withCtx(() => [
                _createVNode(WorkbenchIcon, {
                  name: __props.collapsed ? "\u5BFC\u822A/\u5C3A\u5BF8=20,\u7C7B\u578B=\u5C55\u5F00" : "\u5BFC\u822A/\u5C3A\u5BF8=20,\u7C7B\u578B=\u6298\u53E0"
                }, null, 8, ["name"])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["aria-label", "aria-expanded"])) : _createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : _createCommentVNode("v-if", true),
        _createElementVNode("ul", _hoisted_3, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(__props.items, (item) => {
              return _openBlock(), _createElementBlock("li", {
                key: item.id,
                class: "wb-side-nav__entry"
              }, [
                _createElementVNode("button", {
                  type: "button",
                  class: _normalizeClass(["wb-side-nav__item wb-side-nav__item--parent", { "is-selected": __props.activeItem === item.id, "is-active-path": containsActive(item) }]),
                  "aria-current": __props.activeItem === item.id ? "page" : void 0,
                  "aria-expanded": hasChildren(item) ? isExpanded(item) && !__props.collapsed : void 0,
                  "aria-label": item.label,
                  title: item.label,
                  onClick: ($event) => activate(item, $event),
                  onKeydown: ($event) => handleKeydown($event, item)
                }, [
                  !hasChildren(item) && __props.activeItem === item.id && !__props.collapsed ? (_openBlock(), _createElementBlock("span", _hoisted_5)) : _createCommentVNode("v-if", true),
                  _createVNode(WorkbenchIcon, {
                    class: "wb-side-nav__icon",
                    name: iconName(item.icon),
                    size: 16
                  }, null, 8, ["name"]),
                  !__props.collapsed ? (_openBlock(), _createElementBlock(
                    "span",
                    _hoisted_6,
                    _toDisplayString(item.label),
                    1
                    /* TEXT */
                  )) : _createCommentVNode("v-if", true),
                  !__props.collapsed ? (_openBlock(), _createBlock(WorkbenchIcon, {
                    key: 2,
                    class: _normalizeClass(["wb-side-nav__arrow", { "is-expanded": hasChildren(item) && isExpanded(item) }]),
                    name: "/ic_arrow_right_line#2:141"
                  }, null, 8, ["class"])) : _createCommentVNode("v-if", true)
                ], 42, _hoisted_4),
                _createVNode(
                  _Transition,
                  {
                    onBeforeEnter: beforeSubmenuEnter,
                    onEnter: enterSubmenu,
                    onAfterEnter: afterSubmenuEnter,
                    onBeforeLeave: beforeSubmenuLeave,
                    onLeave: leaveSubmenu,
                    onAfterLeave: afterSubmenuLeave
                  },
                  {
                    default: _withCtx(() => [
                      hasChildren(item) && isExpanded(item) && !__props.collapsed ? (_openBlock(), _createElementBlock("ul", _hoisted_7, [
                        (_openBlock(true), _createElementBlock(
                          _Fragment,
                          null,
                          _renderList(item.children, (child) => {
                            return _openBlock(), _createElementBlock("li", {
                              key: child.id,
                              class: "wb-side-nav__entry"
                            }, [
                              _createElementVNode("button", {
                                type: "button",
                                class: _normalizeClass(["wb-side-nav__item wb-side-nav__item--child", { "is-selected": containsActive(child) || panelItem.value?.id === child.id }]),
                                "aria-current": __props.activeItem === child.id ? "page" : void 0,
                                "aria-expanded": hasChildren(child) ? panelItem.value?.id === child.id : void 0,
                                "aria-controls": hasChildren(child) && panelItem.value?.id === child.id ? panelId : void 0,
                                "data-parent-id": item.id,
                                "data-child-id": child.id,
                                title: child.label,
                                onClick: ($event) => activate(child, $event, true),
                                onKeydown: ($event) => handleKeydown($event, child, true)
                              }, [
                                hasActivePage(child) ? (_openBlock(), _createElementBlock("span", _hoisted_9)) : _createCommentVNode("v-if", true),
                                _createElementVNode(
                                  "span",
                                  _hoisted_10,
                                  _toDisplayString(child.label),
                                  1
                                  /* TEXT */
                                ),
                                _createVNode(WorkbenchIcon, {
                                  class: "wb-side-nav__arrow",
                                  name: "/ic_arrow_right_line#2:141"
                                })
                              ], 42, _hoisted_8)
                            ]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])) : _createCommentVNode("v-if", true)
                    ]),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        __props.collapsible ? (_openBlock(), _createBlock(WorkbenchButton, {
          key: 1,
          appearance: "icon",
          "icon-layout": "container",
          size: "32",
          class: "wb-side-nav__collapse",
          "aria-label": __props.collapsed ? "\u5C55\u5F00\u4FA7\u8FB9\u5BFC\u822A" : "\u6536\u8D77\u4FA7\u8FB9\u5BFC\u822A",
          "aria-expanded": !__props.collapsed,
          onClick: toggleNavigation
        }, {
          icon: _withCtx(() => [
            _createVNode(WorkbenchIcon, {
              class: "wb-side-nav__collapse-icon",
              name: __props.collapsed ? "\u5BFC\u822A/\u5C3A\u5BF8=20,\u7C7B\u578B=\u5C55\u5F00" : "\u5BFC\u822A/\u5C3A\u5BF8=20,\u7C7B\u578B=\u6298\u53E0"
            }, null, 8, ["name"])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["aria-label", "aria-expanded"])) : _createCommentVNode("v-if", true),
        panelItem.value && !__props.collapsed ? (_openBlock(), _createBlock(SideNavigationPanel, {
          key: 2,
          id: panelId,
          item: panelItem.value,
          mode: __props.panelMode,
          density: __props.panelDensity,
          "show-flyout-icons": __props.showFlyoutIcons,
          "active-item": __props.activeItem,
          "expand-all": __props.panelExpandAll,
          onSelect: selectPanelItem,
          onClose: closePanel
        }, null, 8, ["item", "mode", "density", "show-flyout-icons", "active-item", "expand-all"])) : _createCommentVNode("v-if", true)
      ], 42, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-a5ff2c7e" });
