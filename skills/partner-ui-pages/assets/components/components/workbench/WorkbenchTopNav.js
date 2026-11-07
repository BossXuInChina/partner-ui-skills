import { createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDynamicComponent as _resolveDynamicComponent, withCtx as _withCtx, createBlock as _createBlock, createCommentVNode as _createCommentVNode, Transition as _Transition, unref as _unref, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = { class: "wb-top-nav__utility" };
const _hoisted_3 = { class: "wb-top-nav__grid wb-top-nav__utility-grid" };
const _hoisted_4 = ["aria-expanded"];
const _hoisted_5 = ["aria-expanded"];
const _hoisted_6 = {
  key: 0,
  id: "wb-top-nav-site-panel",
  class: "wb-top-nav__site-panel",
  role: "menu",
  "aria-label": "\u5207\u6362\u5B98\u7F51"
};
const _hoisted_7 = { class: "wb-top-nav__grid wb-top-nav__site-grid" };
const _hoisted_8 = { class: "wb-top-nav__site-current" };
const _hoisted_9 = { class: "wb-top-nav__site-list" };
const _hoisted_10 = { class: "wb-top-nav__site-entry-content" };
const _hoisted_11 = { class: "wb-top-nav__site-label" };
const _hoisted_12 = {
  key: 0,
  id: "wb-top-nav-language-panel",
  class: "wb-top-nav__menu wb-top-nav__language-panel",
  role: "menu",
  "aria-label": "\u5207\u6362\u8BED\u8A00"
};
const _hoisted_13 = ["aria-checked", "onClick", "onKeydown"];
const _hoisted_14 = { class: "wb-top-nav__business" };
const _hoisted_15 = { class: "wb-top-nav__grid wb-top-nav__business-grid" };
const _hoisted_16 = ["src"];
const _hoisted_17 = {
  class: "wb-top-nav__tabs",
  "aria-label": "\u4E1A\u52A1\u5BFC\u822A"
};
const _hoisted_18 = ["role"];
const _hoisted_19 = {
  key: 0,
  class: "wb-top-nav__more-wrap"
};
const _hoisted_20 = ["aria-expanded", "role", "aria-selected"];
const _hoisted_21 = {
  key: 0,
  id: "wb-top-nav-more-panel",
  class: "wb-top-nav__menu wb-top-nav__more-panel",
  role: "menu",
  "aria-label": "\u66F4\u591A\u4E1A\u52A1\u5BFC\u822A"
};
const _hoisted_22 = {
  class: "wb-top-nav__tab-measurer",
  "aria-hidden": "true"
};
const _hoisted_23 = ["aria-label"];
const _hoisted_24 = { class: "wb-top-nav__mega-reveal-content" };
const _hoisted_25 = { class: "wb-top-nav__grid wb-top-nav__mega-grid" };
const _hoisted_26 = { class: "wb-top-nav__mega-overview" };
const _hoisted_27 = { class: "wb-top-nav__mega-content" };
const _hoisted_28 = ["aria-label"];
const _hoisted_29 = {
  key: 1,
  id: "wb-top-nav-user-panel",
  class: "wb-top-nav__menu wb-top-nav__user-panel",
  role: "menu",
  "aria-label": "\u6211\u7684\u5165\u53E3"
};
const _hoisted_30 = { key: 0 };
const _hoisted_31 = ["onClick", "onKeydown"];
const _hoisted_32 = {
  key: 2,
  id: "wb-top-nav-user-panel",
  class: "wb-top-nav__menu wb-top-nav__user-panel wb-top-nav__guest-panel",
  role: "menu",
  "aria-label": "\u672A\u767B\u5F55\u8D26\u6237"
};
const _hoisted_33 = {
  key: 3,
  id: "wb-top-nav-mobile-panel",
  class: "wb-top-nav__menu wb-top-nav__mobile-panel",
  role: "menu",
  "aria-label": "\u4E1A\u52A1\u5BFC\u822A\u83DC\u5355"
};
const _hoisted_34 = { class: "wb-top-nav__mobile-current" };
const _hoisted_35 = { class: "wb-top-nav__mobile-current" };
const _hoisted_36 = ["aria-checked", "onClick", "onKeydown"];
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import TopNavAction from "./TopNavAction.vue";
import huaweiLogo from "./assets/huawei-logo.png";
const __sfc_main__ = {
  __name: "WorkbenchTopNav",
  props: {
    mode: {
      type: String,
      default: "workbench",
      validator: (value) => ["portal", "workbench"].includes(value)
    },
    userState: {
      type: String,
      default: "authenticated",
      validator: (value) => ["guest", "authenticated"].includes(value)
    },
    activeTab: { type: String, default: "home" },
    currentSite: { type: String, default: "partner" },
    currentLanguage: { type: String, default: "zh-CN" },
    tabs: { type: Array, default: () => [] },
    sites: { type: Array, default: () => [] },
    languages: { type: Array, default: () => [] },
    userMenuItems: { type: Array, default: () => [] },
    tabMenus: { type: Object, default: () => ({}) },
    actions: { type: Array, default: null }
  },
  emits: [
    "update:activeTab",
    "select-site",
    "select-language",
    "select-user-action",
    "select-tab-entry",
    "navigate",
    "search",
    "notification",
    "login",
    "register",
    "action"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const root = ref(null);
    const actionsElement = ref(null);
    const pressedActions = ref(/* @__PURE__ */ new Set());
    const primary = ref(null);
    const brand = ref(null);
    const indicatorElement = ref(null);
    const moreTrigger = ref(null);
    const moreMeasure = ref(null);
    const activePanel = ref(null);
    const mobileView = ref("main");
    const megaTab = ref(null);
    const viewportWidth = ref(typeof window === "undefined" ? 1440 : window.innerWidth);
    const visibleTabCount = ref(props.tabs.length);
    const tabRefs = /* @__PURE__ */ new Map();
    const measureRefs = /* @__PURE__ */ new Map();
    const triggerRefs = /* @__PURE__ */ new Map();
    const openedTriggers = /* @__PURE__ */ new Map();
    const optionRefs = {
      site: [],
      language: [],
      user: [],
      more: [],
      mobile: [],
      mobileSite: [],
      mobileLanguage: []
    };
    let resizeObserver;
    let megaCloseTimer;
    let suppressMegaFocus = false;
    const currentLabel = (items, value) => items.find((item) => item.value === value)?.label ?? value;
    const visibleTabs = computed(() => props.tabs.slice(0, visibleTabCount.value));
    const overflowTabs = computed(() => props.tabs.slice(visibleTabCount.value));
    const hasLocalTabs = computed(() => props.tabs.some((tab) => !tab.href));
    const activeTabIsOverflow = computed(
      () => overflowTabs.value.some((tab) => tab.value === props.activeTab)
    );
    const megaMenu = computed(() => props.tabMenus[megaTab.value] ?? null);
    const megaVisible = computed(
      () => megaMenu.value && (activePanel.value === "mega" || activePanel.value === "more")
    );
    const compactActions = computed(() => viewportWidth.value <= 1024);
    const configuredActions = computed(
      () => props.actions ?? [
        { type: "search" },
        ...props.mode === "workbench" && props.userState === "authenticated" ? [{ type: "message" }] : [],
        { type: props.userState === "guest" ? "login-register" : "certified" }
      ]
    );
    const visibleActions = computed(() => {
      const items = configuredActions.value.filter(
        (item) => !item.hidden && (!compactActions.value || item.compact === true || [
          "search",
          "login-register",
          "certified",
          "pending",
          "login",
          "register",
          "menu",
          "close"
        ].includes(item.type))
      );
      const result = items.map((item, index) => ({ ...item, key: item.id ?? `${item.type}-${index}` }));
      if (compactActions.value && !result.some((item) => item.type === "menu"))
        result.push({ type: "menu", key: "compact-menu" });
      if (compactActions.value)
        result.sort((a, b) => Number(a.type === "menu") - Number(b.type === "menu"));
      return result;
    });
    const actionPanel = (item) => {
      if (["certified", "pending", "login-register"].includes(item.type)) return "user";
      if (item.type === "language") return "language";
      if (item.type === "menu") return "mobile";
      return null;
    };
    function activateAction(item, event) {
      if (item.disabled) return;
      const panel = actionPanel(item);
      if (panel) {
        setTriggerRef(panel, event.currentTarget);
        togglePanel(panel);
      } else {
        closePanel();
        if (item.type === "favorite") {
          const next = new Set(pressedActions.value);
          item.pressed ?? next.has(item.key) ? next.delete(item.key) : next.add(item.key);
          pressedActions.value = next;
        }
        if (item.type === "search") emit("search");
        else if (item.type === "message") emit("notification");
        else if (item.type === "login") emit("login");
        else if (item.type === "register") emit("register");
      }
      emit("action", {
        type: item.type,
        id: item.id ?? item.type,
        pressed: item.type === "favorite" ? pressedActions.value.has(item.key) : void 0
      });
    }
    function actionKeydown(item, event) {
      const panel = actionPanel(item);
      if (!panel || item.disabled) return;
      setTriggerRef(panel, event.currentTarget);
      triggerKeydown(event, panel);
    }
    const setTabRef = (value, element) => element ? tabRefs.set(value, element) : tabRefs.delete(value);
    const setMeasureRef = (value, element) => element ? measureRefs.set(value, element) : measureRefs.delete(value);
    const setTriggerRef = (panel, element) => element ? triggerRefs.set(panel, element) : triggerRefs.delete(panel);
    const setMoreTrigger = (element) => {
      moreTrigger.value = element;
      setTriggerRef("more", element);
    };
    const setOptionRef = (panel, index, element) => {
      optionRefs[panel][index] = element;
    };
    function updateIndicator() {
      const directTab = tabRefs.get(props.activeTab);
      const tab = activeTabIsOverflow.value ? moreTrigger.value : directTab?.isConnected ? directTab : null;
      const list = indicatorElement.value?.parentElement;
      if (!tab || !list) return;
      const tabBox = tab.getBoundingClientRect();
      const listBox = list.getBoundingClientRect();
      if (!indicatorElement.value) return;
      indicatorElement.value.style.transform = `translateX(${tabBox.left - listBox.left}px)`;
      indicatorElement.value.style.width = `${tabBox.width}px`;
    }
    function measuredTabWidth(tab) {
      return measureRefs.get(tab.value)?.getBoundingClientRect().width ?? 0;
    }
    function updateResponsiveLayout() {
      if (typeof window === "undefined") return;
      viewportWidth.value = window.innerWidth;
      root.value?.style.setProperty(
        "--wb-top-nav-actions-width",
        `${actionsElement.value?.offsetWidth ?? 0}px`
      );
      positionPanel(activePanel.value);
      if (viewportWidth.value < 1024 && ["site", "language"].includes(activePanel.value))
        activePanel.value = null;
      if (viewportWidth.value > 1024 && activePanel.value === "mobile") activePanel.value = null;
      if (viewportWidth.value <= 1024 || !primary.value || !brand.value) {
        visibleTabCount.value = props.tabs.length;
        nextTick(updateIndicator);
        return;
      }
      const styles = getComputedStyle(root.value);
      const brandGap = Number.parseFloat(
        styles.getPropertyValue("--wb-asset-wb-top-nav-brand-to-tabs-gap")
      );
      const gap = Number.parseFloat(styles.getPropertyValue("--wb-spacing-layout-section-gap-large"));
      const available = primary.value.clientWidth - brand.value.getBoundingClientRect().width - brandGap;
      const moreWidth = moreMeasure.value?.getBoundingClientRect().width ?? 0;
      const widths = props.tabs.map(measuredTabWidth);
      const totalWidth = widths.reduce((sum, width) => sum + width, 0) + Math.max(0, widths.length - 1) * gap;
      if (viewportWidth.value >= 1440 && totalWidth <= available) {
        visibleTabCount.value = props.tabs.length;
        nextTick(updateIndicator);
        return;
      }
      let used = 0;
      let count = 0;
      for (const tab of props.tabs) {
        const width = measuredTabWidth(tab);
        const next = used + (count ? gap : 0) + width;
        const reserve = gap + moreWidth;
        if (next + reserve > available) break;
        used = next;
        count += 1;
      }
      visibleTabCount.value = Math.max(1, Math.min(count, props.tabs.length - 1));
      nextTick(updateIndicator);
    }
    function reportNavigation(kind, item, extra = {}) {
      if (item?.href) emit("navigate", { kind, value: item.value, href: item.href, ...extra });
    }
    function positionPanel(panel) {
      if (!["language", "user", "mobile"].includes(panel) || !root.value) return;
      const trigger = openedTriggers.get(panel);
      if (!trigger?.isConnected) return;
      const bounds = root.value.getBoundingClientRect();
      const anchor = trigger.getBoundingClientRect();
      const gap = Number.parseFloat(
        getComputedStyle(root.value).getPropertyValue("--wb-spacing-component-xs")
      );
      root.value.style.setProperty(
        `--wb-top-nav-${panel}-top`,
        `${anchor.bottom - bounds.top + gap}px`
      );
      root.value.style.setProperty(
        `--wb-top-nav-${panel}-right`,
        `${Math.max(0, bounds.right - anchor.right)}px`
      );
    }
    async function togglePanel(panel, focusFirst = false) {
      if (panel === "mobile" && activePanel.value !== "mobile") mobileView.value = "main";
      if (panel === "more" && activePanel.value !== "more") megaTab.value = null;
      const opening = activePanel.value !== panel;
      if (opening) openedTriggers.set(panel, triggerRefs.get(panel));
      activePanel.value = opening ? panel : null;
      if (opening) positionPanel(panel);
      if (activePanel.value && focusFirst) {
        await nextTick();
        optionRefs[panel].find(Boolean)?.focus();
      }
    }
    function closePanel({ restoreFocus = false } = {}) {
      const panel = activePanel.value;
      const trigger = openedTriggers.get(panel) ?? triggerRefs.get(panel);
      activePanel.value = null;
      if (restoreFocus && panel)
        nextTick(() => {
          suppressMegaFocus = panel === "mega";
          trigger?.focus();
          suppressMegaFocus = false;
        });
    }
    function cancelMegaClose() {
      if (typeof window !== "undefined") window.clearTimeout(megaCloseTimer);
    }
    function openMega(tab) {
      if (suppressMegaFocus) return;
      if (viewportWidth.value <= 1024 || !props.tabMenus[tab.value]) return;
      cancelMegaClose();
      megaTab.value = tab.value;
      activePanel.value = "mega";
      triggerRefs.set("mega", tabRefs.get(tab.value));
    }
    function openMegaFromMore(tab) {
      if (!props.tabMenus[tab.value]) return;
      cancelMegaClose();
      megaTab.value = tab.value;
    }
    function scheduleMegaClose() {
      cancelMegaClose();
      if (typeof window === "undefined") return;
      megaCloseTimer = window.setTimeout(() => {
        if (activePanel.value === "mega") activePanel.value = null;
        else if (activePanel.value === "more") megaTab.value = null;
      }, 120);
    }
    function selectTabHome(tab) {
      if (!tab) return;
      emit("update:activeTab", tab.value);
      activePanel.value = null;
    }
    async function openMobileView(view) {
      mobileView.value = view;
      await nextTick();
      optionRefs[view === "site" ? "mobileSite" : "mobileLanguage"].find(Boolean)?.focus();
    }
    function handleEscape(event) {
      if (activePanel.value === "mobile" && mobileView.value !== "main") {
        event.preventDefault();
        event.stopPropagation();
        const previousView = mobileView.value;
        mobileView.value = "main";
        nextTick(() => root.value?.querySelector(`[data-mobile-view="${previousView}"]`)?.focus());
        return true;
      }
      return false;
    }
    function triggerKeydown(event, panel) {
      if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
      event.preventDefault();
      togglePanel(panel, true);
    }
    function menuKeydown(event, panel, index) {
      const items = optionRefs[panel].filter(Boolean);
      if (!items.length) return;
      if (event.key === "Escape") {
        if (!handleEscape(event)) {
          event.preventDefault();
          closePanel({ restoreFocus: true });
        }
        return;
      }
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const current = Math.max(0, items.indexOf(optionRefs[panel][index]));
      const target = event.key === "Home" ? 0 : event.key === "End" ? items.length - 1 : (current + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items[target]?.focus();
    }
    function choose(panel, item) {
      if (panel === "site") emit("select-site", item.value);
      if (panel === "language") emit("select-language", item.value);
      if (panel === "mobileSite") emit("select-site", item.value);
      if (panel === "mobileLanguage") emit("select-language", item.value);
      if (panel === "user") emit("select-user-action", item.value);
      if (panel === "more" || panel === "mobile") emit("update:activeTab", item.value);
      closePanel({ restoreFocus: true });
    }
    function chooseGuest(action) {
      emit(action);
      closePanel({ restoreFocus: true });
    }
    function handleDocumentPointer(event) {
      if (activePanel.value && !root.value?.contains(event.target)) closePanel();
    }
    function handleRootFocusOut() {
      requestAnimationFrame(() => {
        if (activePanel.value && !root.value?.contains(document.activeElement)) closePanel();
      });
    }
    function handleRootKeydown(event) {
      if (event.key === "Escape" && activePanel.value) {
        if (!handleEscape(event)) {
          event.preventDefault();
          closePanel({ restoreFocus: true });
        }
      }
    }
    watch(
      () => props.activeTab,
      () => nextTick(updateIndicator)
    );
    watch(
      () => props.tabs,
      () => nextTick(updateResponsiveLayout),
      { deep: true }
    );
    watch(
      () => [props.mode, props.userState, props.actions],
      () => {
        closePanel();
        pressedActions.value = /* @__PURE__ */ new Set();
        nextTick(updateResponsiveLayout);
      },
      { deep: true }
    );
    onMounted(() => {
      nextTick(updateResponsiveLayout);
      document.addEventListener("pointerdown", handleDocumentPointer);
      resizeObserver = new ResizeObserver(updateResponsiveLayout);
      if (root.value) resizeObserver.observe(root.value);
      if (actionsElement.value) resizeObserver.observe(actionsElement.value);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("pointerdown", handleDocumentPointer);
      cancelMegaClose();
      resizeObserver?.disconnect();
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("header", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-top-nav", [`is-${__props.mode}`, `is-${__props.userState}`]]),
        role: "banner",
        "aria-label": __props.mode === "workbench" ? "\u4F19\u4F34\u5DE5\u4F5C\u53F0\u9876\u90E8\u5BFC\u822A" : "\u95E8\u6237\u5B98\u7F51\u9876\u90E8\u5BFC\u822A",
        onFocusout: handleRootFocusOut,
        onKeydown: handleRootKeydown
      }, [
        _createElementVNode("div", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, [
            _createElementVNode("button", {
              ref: (element) => setTriggerRef("site", element),
              class: "wb-top-nav__utility-trigger",
              type: "button",
              "aria-haspopup": "menu",
              "aria-expanded": activePanel.value === "site",
              "aria-controls": "wb-top-nav-site-panel",
              onClick: _cache[0] || (_cache[0] = ($event) => togglePanel("site")),
              onKeydown: _cache[1] || (_cache[1] = ($event) => triggerKeydown($event, "site"))
            }, [
              _createVNode(WorkbenchIcon, {
                class: "wb-top-nav__utility-icon",
                name: "WB-TOP-NAV/\u4F01\u4E1A\u4F19\u4F34\u7F51\u7AD9_12px"
              }),
              _createElementVNode(
                "span",
                null,
                _toDisplayString(currentLabel(__props.sites, __props.currentSite)),
                1
                /* TEXT */
              ),
              _createVNode(WorkbenchIcon, {
                class: "wb-top-nav__utility-arrow",
                name: "/ic_arrow_down_line#103:85",
                size: 8
              })
            ], 40, _hoisted_4),
            _createElementVNode("button", {
              ref: (element) => setTriggerRef("language", element),
              class: "wb-top-nav__utility-trigger",
              type: "button",
              "aria-haspopup": "menu",
              "aria-expanded": activePanel.value === "language",
              "aria-controls": "wb-top-nav-language-panel",
              onClick: _cache[2] || (_cache[2] = ($event) => togglePanel("language")),
              onKeydown: _cache[3] || (_cache[3] = ($event) => triggerKeydown($event, "language"))
            }, [
              _createVNode(WorkbenchIcon, {
                class: "wb-top-nav__utility-icon",
                name: "WB-TOP-NAV/\u8BED\u8A00\u5730\u7403_12px"
              }),
              _createElementVNode(
                "span",
                null,
                _toDisplayString(currentLabel(__props.languages, __props.currentLanguage)),
                1
                /* TEXT */
              ),
              _createVNode(WorkbenchIcon, {
                class: "wb-top-nav__utility-arrow",
                name: "/ic_arrow_down_line#103:85",
                size: 8
              })
            ], 40, _hoisted_5)
          ])
        ]),
        _createVNode(_Transition, { name: "wb-top-nav-site-reveal" }, {
          default: _withCtx(() => [
            activePanel.value === "site" ? (_openBlock(), _createElementBlock("section", _hoisted_6, [
              _createElementVNode("div", _hoisted_7, [
                _createElementVNode("div", _hoisted_8, [
                  _createVNode(WorkbenchIcon, {
                    class: "wb-top-nav__site-current-arrow",
                    name: "\u7BAD\u5934/\u65B9\u5411=\u53F3\u7BAD\u5934_16px",
                    color: "var(--wb-color-brand)"
                  }),
                  _createElementVNode(
                    "span",
                    null,
                    "\u5F53\u524D\u7AD9\u70B9\uFF1A" + _toDisplayString(currentLabel(__props.sites, __props.currentSite)),
                    1
                    /* TEXT */
                  )
                ]),
                _createElementVNode("div", _hoisted_9, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(__props.sites.filter((item) => item.value !== __props.currentSite), (site, index) => {
                      return _openBlock(), _createBlock(_resolveDynamicComponent(site.href ? "a" : "button"), {
                        key: site.value,
                        ref_for: true,
                        ref: (element) => setOptionRef("site", index, element),
                        type: "button",
                        role: "menuitem",
                        href: site.href,
                        onClick: ($event) => {
                          choose("site", site);
                          reportNavigation("site", site);
                        },
                        onKeydown: ($event) => menuKeydown($event, "site", index)
                      }, {
                        default: _withCtx(() => [
                          _createElementVNode("span", _hoisted_10, [
                            _createVNode(WorkbenchIcon, {
                              class: "wb-top-nav__site-icon",
                              name: site.icon || "\u623F\u5B50/\u5C3A\u5BF8=24,\u9762\u6027=off",
                              size: 24,
                              color: "var(--wb-color-icon-secondary)"
                            }, null, 8, ["name"]),
                            _createElementVNode(
                              "span",
                              _hoisted_11,
                              _toDisplayString(site.label),
                              1
                              /* TEXT */
                            ),
                            _createVNode(WorkbenchIcon, {
                              class: "wb-top-nav__site-arrow",
                              name: "\u7BAD\u5934/\u65B9\u5411=\u53F3\u7BAD\u5934_16px",
                              color: "var(--wb-color-icon-secondary)"
                            })
                          ])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1064, ["href", "onClick", "onKeydown"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])
            ])) : _createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        }),
        activePanel.value === "language" ? (_openBlock(), _createElementBlock("section", _hoisted_12, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(__props.languages, (language, index) => {
              return _openBlock(), _createElementBlock("button", {
                key: language.value,
                ref_for: true,
                ref: (element) => setOptionRef("language", index, element),
                type: "button",
                role: "menuitemradio",
                "aria-checked": language.value === __props.currentLanguage,
                onClick: ($event) => choose("language", language),
                onKeydown: ($event) => menuKeydown($event, "language", index)
              }, [
                _createElementVNode(
                  "span",
                  null,
                  _toDisplayString(language.label),
                  1
                  /* TEXT */
                ),
                language.value === __props.currentLanguage ? (_openBlock(), _createBlock(WorkbenchIcon, {
                  key: 0,
                  class: "wb-top-nav__checkmark",
                  name: "/ic_public_checkmark_line_16px"
                })) : _createCommentVNode("v-if", true)
              ], 40, _hoisted_13);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_14, [
          _createElementVNode("div", _hoisted_15, [
            _createElementVNode(
              "div",
              {
                ref_key: "primary",
                ref: primary,
                class: "wb-top-nav__primary"
              },
              [
                _createElementVNode(
                  "div",
                  {
                    ref_key: "brand",
                    ref: brand,
                    class: "wb-top-nav__brand"
                  },
                  [
                    _createElementVNode("img", {
                      class: "wb-top-nav__logo",
                      src: _unref(huaweiLogo),
                      alt: "Huawei"
                    }, null, 8, _hoisted_16),
                    _cache[18] || (_cache[18] = _createElementVNode(
                      "span",
                      {
                        class: "wb-top-nav__divider",
                        "aria-hidden": "true"
                      },
                      null,
                      -1
                      /* CACHED */
                    )),
                    _cache[19] || (_cache[19] = _createElementVNode(
                      "span",
                      { class: "wb-top-nav__title" },
                      "\u4F19\u4F34\u5DE5\u4F5C\u53F0",
                      -1
                      /* CACHED */
                    ))
                  ],
                  512
                  /* NEED_PATCH */
                ),
                _createElementVNode("nav", _hoisted_17, [
                  _createElementVNode("div", {
                    class: "wb-top-nav__tab-list",
                    role: hasLocalTabs.value ? "tablist" : void 0,
                    onMouseenter: cancelMegaClose,
                    onMouseleave: scheduleMegaClose
                  }, [
                    (_openBlock(true), _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(visibleTabs.value, (tab) => {
                        return _openBlock(), _createBlock(_resolveDynamicComponent(tab.href ? "a" : "button"), {
                          key: tab.value,
                          ref_for: true,
                          ref: (element) => setTabRef(tab.value, element),
                          type: "button",
                          role: tab.href ? void 0 : "tab",
                          "aria-selected": tab.href ? void 0 : tab.value === __props.activeTab,
                          "aria-current": tab.href && tab.value === __props.activeTab ? "page" : void 0,
                          tabindex: tab.href ? void 0 : tab.value === __props.activeTab ? 0 : -1,
                          "aria-expanded": __props.tabMenus[tab.value] ? activePanel.value === "mega" && megaTab.value === tab.value : void 0,
                          onMouseenter: ($event) => openMega(tab),
                          onFocus: ($event) => openMega(tab),
                          href: tab.href,
                          onClick: ($event) => {
                            selectTabHome(tab);
                            reportNavigation("tab", tab);
                          }
                        }, {
                          default: _withCtx(() => [
                            _createTextVNode(
                              _toDisplayString(tab.label),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1064, ["role", "aria-selected", "aria-current", "tabindex", "aria-expanded", "onMouseenter", "onFocus", "href", "onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    overflowTabs.value.length ? (_openBlock(), _createElementBlock("div", _hoisted_19, [
                      _createElementVNode("button", {
                        ref: setMoreTrigger,
                        class: "wb-top-nav__more-trigger",
                        type: "button",
                        "aria-haspopup": "menu",
                        "aria-expanded": activePanel.value === "more",
                        "aria-controls": "wb-top-nav-more-panel",
                        role: hasLocalTabs.value ? "tab" : void 0,
                        "aria-selected": hasLocalTabs.value ? activeTabIsOverflow.value : void 0,
                        onClick: _cache[4] || (_cache[4] = ($event) => togglePanel("more")),
                        onKeydown: _cache[5] || (_cache[5] = ($event) => triggerKeydown($event, "more"))
                      }, [..._cache[20] || (_cache[20] = [
                        _createElementVNode(
                          "span",
                          null,
                          "\u66F4\u591A",
                          -1
                          /* CACHED */
                        )
                      ])], 40, _hoisted_20),
                      activePanel.value === "more" ? (_openBlock(), _createElementBlock("section", _hoisted_21, [
                        (_openBlock(true), _createElementBlock(
                          _Fragment,
                          null,
                          _renderList(overflowTabs.value, (tab, index) => {
                            return _openBlock(), _createBlock(_resolveDynamicComponent(tab.href ? "a" : "button"), {
                              key: tab.value,
                              ref_for: true,
                              ref: (element) => setOptionRef("more", index, element),
                              type: "button",
                              role: tab.href ? "menuitem" : "menuitemradio",
                              "aria-checked": tab.href ? void 0 : tab.value === __props.activeTab,
                              "aria-current": tab.href && tab.value === __props.activeTab ? "page" : void 0,
                              "aria-expanded": megaTab.value === tab.value && megaVisible.value,
                              onMouseenter: ($event) => openMegaFromMore(tab),
                              onFocus: ($event) => openMegaFromMore(tab),
                              href: tab.href,
                              onClick: ($event) => {
                                choose("more", tab);
                                reportNavigation("tab", tab);
                              },
                              onKeydown: ($event) => menuKeydown($event, "more", index)
                            }, {
                              default: _withCtx(() => [
                                _createTextVNode(
                                  _toDisplayString(tab.label),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1064, ["role", "aria-checked", "aria-current", "aria-expanded", "onMouseenter", "onFocus", "href", "onClick", "onKeydown"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])) : _createCommentVNode("v-if", true)
                    ])) : _createCommentVNode("v-if", true),
                    _createElementVNode(
                      "span",
                      {
                        ref_key: "indicatorElement",
                        ref: indicatorElement,
                        class: "wb-top-nav__indicator",
                        "aria-hidden": "true"
                      },
                      null,
                      512
                      /* NEED_PATCH */
                    )
                  ], 40, _hoisted_18)
                ]),
                _createElementVNode("div", _hoisted_22, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(__props.tabs, (tab) => {
                      return _openBlock(), _createElementBlock(
                        "span",
                        {
                          key: tab.value,
                          ref_for: true,
                          ref: (element) => setMeasureRef(tab.value, element)
                        },
                        _toDisplayString(tab.label),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  _createElementVNode(
                    "span",
                    {
                      ref_key: "moreMeasure",
                      ref: moreMeasure,
                      class: "wb-top-nav__more-measure"
                    },
                    "\u66F4\u591A",
                    512
                    /* NEED_PATCH */
                  )
                ])
              ],
              512
              /* NEED_PATCH */
            ),
            _createElementVNode(
              "div",
              {
                ref_key: "actionsElement",
                ref: actionsElement,
                class: "wb-top-nav__actions"
              },
              [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(visibleActions.value, (item) => {
                    return _openBlock(), _createBlock(TopNavAction, {
                      key: item.key,
                      class: _normalizeClass({
                        "wb-top-nav__action": true,
                        "wb-top-nav__desktop-search": item.type === "search",
                        "wb-top-nav__user-trigger": ["certified", "pending", "login-register"].includes(
                          item.type
                        ),
                        "wb-top-nav__hamburger": item.type === "menu"
                      }),
                      type: item.type,
                      label: item.label,
                      badge: item.badge,
                      initial: item.initial,
                      "avatar-url": item.avatarUrl,
                      compact: compactActions.value,
                      disabled: item.disabled,
                      pressed: item.type === "favorite" ? item.pressed ?? pressedActions.value.has(item.key) : void 0,
                      expanded: actionPanel(item) ? activePanel.value === actionPanel(item) : void 0,
                      controls: actionPanel(item) ? `wb-top-nav-${actionPanel(item)}-panel` : void 0,
                      onClick: ($event) => activateAction(item, $event),
                      onKeydown: ($event) => actionKeydown(item, $event)
                    }, null, 8, ["class", "type", "label", "badge", "initial", "avatar-url", "compact", "disabled", "pressed", "expanded", "controls", "onClick", "onKeydown"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ],
              512
              /* NEED_PATCH */
            )
          ]),
          _createVNode(_Transition, { name: "wb-top-nav-mega-scrim" }, {
            default: _withCtx(() => [
              megaVisible.value ? (_openBlock(), _createElementBlock("div", {
                key: 0,
                class: "wb-top-nav__mega-scrim",
                "aria-hidden": "true",
                onClick: _cache[6] || (_cache[6] = ($event) => closePanel())
              })) : _createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          }),
          _createVNode(_Transition, { name: "wb-top-nav-mega-reveal" }, {
            default: _withCtx(() => [
              megaVisible.value ? (_openBlock(), _createElementBlock("section", {
                key: 0,
                class: "wb-top-nav__mega-panel",
                "aria-label": `${megaMenu.value.label}\u4E1A\u52A1\u83DC\u5355`,
                onMouseenter: cancelMegaClose,
                onMouseleave: scheduleMegaClose
              }, [
                _createElementVNode("div", _hoisted_24, [
                  _createElementVNode("div", _hoisted_25, [
                    _createElementVNode("div", _hoisted_26, [
                      _createElementVNode(
                        "h2",
                        null,
                        _toDisplayString(megaMenu.value.label),
                        1
                        /* TEXT */
                      ),
                      (_openBlock(), _createBlock(_resolveDynamicComponent(__props.tabs.find((tab) => tab.value === megaTab.value)?.href ? "a" : "button"), {
                        type: "button",
                        href: __props.tabs.find((tab) => tab.value === megaTab.value)?.href,
                        onClick: _cache[7] || (_cache[7] = ($event) => {
                          selectTabHome(__props.tabs.find((tab) => tab.value === megaTab.value));
                          reportNavigation(
                            "home",
                            __props.tabs.find((tab) => tab.value === megaTab.value),
                            { tab: megaTab.value }
                          );
                        })
                      }, {
                        default: _withCtx(() => [..._cache[21] || (_cache[21] = [
                          _createElementVNode(
                            "span",
                            null,
                            "\u8FDB\u5165\u9996\u9875",
                            -1
                            /* CACHED */
                          ),
                          _createElementVNode(
                            "svg",
                            {
                              viewBox: "0 0 16 16",
                              "aria-hidden": "true"
                            },
                            [
                              _createElementVNode("path", { d: "m6 3 5 5-5 5" })
                            ],
                            -1
                            /* CACHED */
                          )
                        ])]),
                        _: 1
                        /* STABLE */
                      }, 8, ["href"]))
                    ]),
                    _createElementVNode("div", _hoisted_27, [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(megaMenu.value.groups, (group) => {
                          return _openBlock(), _createElementBlock("section", {
                            key: group.title,
                            class: "wb-top-nav__mega-group"
                          }, [
                            _createElementVNode(
                              "h3",
                              null,
                              _toDisplayString(group.title),
                              1
                              /* TEXT */
                            ),
                            _createElementVNode("nav", {
                              "aria-label": group.title
                            }, [
                              (_openBlock(true), _createElementBlock(
                                _Fragment,
                                null,
                                _renderList(group.items, (item) => {
                                  return _openBlock(), _createBlock(_resolveDynamicComponent(item.href ? "a" : "button"), {
                                    key: item.value,
                                    type: "button",
                                    href: item.href,
                                    onClick: ($event) => {
                                      emit("select-tab-entry", { tab: megaTab.value, value: item.value });
                                      reportNavigation("mega-entry", item, { tab: megaTab.value });
                                      closePanel();
                                    }
                                  }, {
                                    default: _withCtx(() => [
                                      _createElementVNode(
                                        "span",
                                        null,
                                        _toDisplayString(item.label),
                                        1
                                        /* TEXT */
                                      )
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  }, 1032, ["href", "onClick"]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ], 8, _hoisted_28)
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ])
                ])
              ], 40, _hoisted_23)) : _createCommentVNode("v-if", true)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        activePanel.value === "user" && __props.userState === "authenticated" ? (_openBlock(), _createElementBlock("section", _hoisted_29, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(__props.userMenuItems, (item, index) => {
              return _openBlock(), _createElementBlock(
                _Fragment,
                {
                  key: item.value
                },
                [
                  item.type === "separator" ? (_openBlock(), _createElementBlock("hr", _hoisted_30)) : (_openBlock(), _createElementBlock("button", {
                    key: 1,
                    ref_for: true,
                    ref: (element) => setOptionRef("user", index, element),
                    type: "button",
                    role: "menuitem",
                    class: _normalizeClass({ "is-danger": item.danger }),
                    onClick: ($event) => choose("user", item),
                    onKeydown: ($event) => menuKeydown($event, "user", index)
                  }, _toDisplayString(item.label), 43, _hoisted_31))
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : _createCommentVNode("v-if", true),
        activePanel.value === "user" && __props.userState === "guest" ? (_openBlock(), _createElementBlock("section", _hoisted_32, [
          _cache[22] || (_cache[22] = _createElementVNode(
            "div",
            { class: "wb-top-nav__guest-message" },
            "\u767B\u5F55\u540E\u53EF\u8BBF\u95EE\u4F19\u4F34\u670D\u52A1",
            -1
            /* CACHED */
          )),
          _createElementVNode(
            "button",
            {
              ref: (element) => setOptionRef("user", 0, element),
              class: "wb-top-nav__guest-login",
              type: "button",
              role: "menuitem",
              onClick: _cache[8] || (_cache[8] = ($event) => chooseGuest("login")),
              onKeydown: _cache[9] || (_cache[9] = ($event) => menuKeydown($event, "user", 0))
            },
            " \u767B\u5F55 ",
            544
            /* NEED_HYDRATION, NEED_PATCH */
          ),
          _createElementVNode(
            "button",
            {
              ref: (element) => setOptionRef("user", 1, element),
              type: "button",
              role: "menuitem",
              onClick: _cache[10] || (_cache[10] = ($event) => chooseGuest("register")),
              onKeydown: _cache[11] || (_cache[11] = ($event) => menuKeydown($event, "user", 1))
            },
            " \u6CE8\u518C ",
            544
            /* NEED_HYDRATION, NEED_PATCH */
          )
        ])) : _createCommentVNode("v-if", true),
        activePanel.value === "mobile" ? (_openBlock(), _createElementBlock("section", _hoisted_33, [
          mobileView.value === "main" ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 0 },
            [
              _cache[26] || (_cache[26] = _createElementVNode(
                "div",
                { class: "wb-top-nav__mobile-title" },
                [
                  _createElementVNode("span", null, "\u4F19\u4F34\u5DE5\u4F5C\u53F0")
                ],
                -1
                /* CACHED */
              )),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(__props.tabs, (tab, index) => {
                  return _openBlock(), _createBlock(_resolveDynamicComponent(tab.href ? "a" : "button"), {
                    key: tab.value,
                    ref_for: true,
                    ref: (element) => setOptionRef("mobile", index, element),
                    type: "button",
                    role: tab.href ? "menuitem" : "menuitemradio",
                    "aria-checked": tab.href ? void 0 : tab.value === __props.activeTab,
                    "aria-current": tab.href && tab.value === __props.activeTab ? "page" : void 0,
                    href: tab.href,
                    onClick: ($event) => {
                      choose("mobile", tab);
                      reportNavigation("tab", tab);
                    },
                    onKeydown: ($event) => menuKeydown($event, "mobile", index)
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString(tab.label),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1064, ["role", "aria-checked", "aria-current", "href", "onClick", "onKeydown"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              viewportWidth.value < 1024 ? (_openBlock(), _createElementBlock(
                _Fragment,
                { key: 0 },
                [
                  _cache[25] || (_cache[25] = _createElementVNode(
                    "hr",
                    null,
                    null,
                    -1
                    /* CACHED */
                  )),
                  _createElementVNode(
                    "button",
                    {
                      ref: (element) => setOptionRef("mobile", __props.tabs.length, element),
                      type: "button",
                      "data-mobile-view": "site",
                      role: "menuitem",
                      onClick: _cache[12] || (_cache[12] = ($event) => openMobileView("site")),
                      onKeydown: _cache[13] || (_cache[13] = ($event) => menuKeydown($event, "mobile", __props.tabs.length))
                    },
                    [
                      _cache[23] || (_cache[23] = _createElementVNode(
                        "span",
                        null,
                        "\u5207\u6362\u5B98\u7F51",
                        -1
                        /* CACHED */
                      )),
                      _createElementVNode(
                        "span",
                        _hoisted_34,
                        _toDisplayString(currentLabel(__props.sites, __props.currentSite)) + " \u203A",
                        1
                        /* TEXT */
                      )
                    ],
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  ),
                  _createElementVNode(
                    "button",
                    {
                      ref: (element) => setOptionRef("mobile", __props.tabs.length + 1, element),
                      type: "button",
                      "data-mobile-view": "language",
                      role: "menuitem",
                      onClick: _cache[14] || (_cache[14] = ($event) => openMobileView("language")),
                      onKeydown: _cache[15] || (_cache[15] = ($event) => menuKeydown($event, "mobile", __props.tabs.length + 1))
                    },
                    [
                      _cache[24] || (_cache[24] = _createElementVNode(
                        "span",
                        null,
                        "\u5207\u6362\u8BED\u8A00",
                        -1
                        /* CACHED */
                      )),
                      _createElementVNode(
                        "span",
                        _hoisted_35,
                        _toDisplayString(currentLabel(__props.languages, __props.currentLanguage)) + " \u203A",
                        1
                        /* TEXT */
                      )
                    ],
                    544
                    /* NEED_HYDRATION, NEED_PATCH */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : _createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : mobileView.value === "site" ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              _createElementVNode("button", {
                class: "wb-top-nav__mobile-back",
                type: "button",
                role: "menuitem",
                onClick: _cache[16] || (_cache[16] = ($event) => mobileView.value = "main")
              }, " \u2039 \u8FD4\u56DE "),
              _cache[27] || (_cache[27] = _createElementVNode(
                "div",
                { class: "wb-top-nav__mobile-title" },
                "\u5207\u6362\u5B98\u7F51",
                -1
                /* CACHED */
              )),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(__props.sites, (site, index) => {
                  return _openBlock(), _createBlock(_resolveDynamicComponent(site.href ? "a" : "button"), {
                    key: site.value,
                    ref_for: true,
                    ref: (element) => setOptionRef("mobileSite", index, element),
                    type: "button",
                    role: site.href ? "menuitem" : "menuitemradio",
                    "aria-checked": site.href ? void 0 : site.value === __props.currentSite,
                    "aria-current": site.href && site.value === __props.currentSite ? "page" : void 0,
                    href: site.href,
                    onClick: ($event) => {
                      choose("mobileSite", site);
                      reportNavigation("site", site);
                    },
                    onKeydown: ($event) => menuKeydown($event, "mobileSite", index)
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString(site.label),
                        1
                        /* TEXT */
                      ),
                      site.value === __props.currentSite ? (_openBlock(), _createBlock(WorkbenchIcon, {
                        key: 0,
                        class: "wb-top-nav__checkmark",
                        name: "/ic_public_checkmark_line_16px"
                      })) : _createCommentVNode("v-if", true)
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1064, ["role", "aria-checked", "aria-current", "href", "onClick", "onKeydown"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 2 },
            [
              _createElementVNode("button", {
                class: "wb-top-nav__mobile-back",
                type: "button",
                role: "menuitem",
                onClick: _cache[17] || (_cache[17] = ($event) => mobileView.value = "main")
              }, " \u2039 \u8FD4\u56DE "),
              _cache[28] || (_cache[28] = _createElementVNode(
                "div",
                { class: "wb-top-nav__mobile-title" },
                "\u5207\u6362\u8BED\u8A00",
                -1
                /* CACHED */
              )),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(__props.languages, (language, index) => {
                  return _openBlock(), _createElementBlock("button", {
                    key: language.value,
                    ref_for: true,
                    ref: (element) => setOptionRef("mobileLanguage", index, element),
                    type: "button",
                    role: "menuitemradio",
                    "aria-checked": language.value === __props.currentLanguage,
                    onClick: ($event) => choose("mobileLanguage", language),
                    onKeydown: ($event) => menuKeydown($event, "mobileLanguage", index)
                  }, [
                    _createTextVNode(
                      _toDisplayString(language.label),
                      1
                      /* TEXT */
                    ),
                    language.value === __props.currentLanguage ? (_openBlock(), _createBlock(WorkbenchIcon, {
                      key: 0,
                      class: "wb-top-nav__checkmark",
                      name: "/ic_public_checkmark_line_16px"
                    })) : _createCommentVNode("v-if", true)
                  ], 40, _hoisted_36);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ])) : _createCommentVNode("v-if", true)
      ], 42, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-bb91c40a" });
