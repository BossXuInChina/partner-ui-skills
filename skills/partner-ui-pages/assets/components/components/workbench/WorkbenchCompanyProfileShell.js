import { createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, createElementBlock as _createElementBlock, renderSlot as _renderSlot, vShow as _vShow, withCtx as _withCtx, withDirectives as _withDirectives, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = { class: "wb-profile-shell" };
const _hoisted_2 = { class: "wb-profile-shell__main" };
const _hoisted_3 = { class: "wb-profile-shell__heading" };
const _hoisted_4 = { class: "wb-profile-shell__identity" };
const _hoisted_5 = {
  key: 0,
  class: "wb-profile-shell__identity-details"
};
const _hoisted_6 = {
  key: 0,
  class: "wb-profile-shell__footer"
};
import { computed, ref, watch } from "vue";
import WorkbenchBreadcrumb from "../breadcrumb/WorkbenchBreadcrumb.vue";
import WorkbenchCard from "../card/WorkbenchCard.vue";
import WorkbenchTag from "../tag/WorkbenchTag.vue";
import WorkbenchTabs from "../tabs/WorkbenchTabs.vue";
import WorkbenchTopNav from "../top-nav/WorkbenchTopNav.vue";
const __sfc_main__ = {
  __name: "WorkbenchCompanyProfileShell",
  props: {
    primaryItems: { type: Array, required: true },
    secondaryItems: { type: Array, default: () => [] },
    secondaryParent: { type: String, default: "" },
    initialPrimary: { type: String, default: "" },
    initialSecondary: { type: String, default: "" },
    navigation: { type: Object, required: true },
    breadcrumbs: { type: Array, default: () => [] },
    identity: { type: Object, required: true },
    primaryLabel: { type: String, default: "\u4E00\u7EA7\u680F\u76EE" },
    secondaryLabel: { type: String, default: "\u4E8C\u7EA7\u680F\u76EE" },
    contentLabel: { type: String, default: "\u8D44\u6599\u5185\u5BB9" },
    contentClass: { type: [String, Array, Object, Function], default: "" }
  },
  emits: [
    "update:primary",
    "update:secondary",
    "navigation-action",
    "breadcrumb-navigate"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const secondaryParentValue = computed(
      () => props.secondaryParent || props.primaryItems[0]?.value || ""
    );
    const primary = ref(props.initialPrimary || secondaryParentValue.value);
    const secondary = ref(props.initialSecondary || props.secondaryItems[0]?.value || "");
    const topTab = ref(props.navigation.initialTab || props.navigation.tabs?.[0]?.value || "");
    const currentSite = ref(props.navigation.initialSite || props.navigation.sites?.[0]?.value || "");
    const currentLanguage = ref(
      props.navigation.initialLanguage || props.navigation.languages?.[0]?.value || ""
    );
    watch(
      () => props.initialPrimary,
      (value) => {
        if (value) primary.value = value;
      }
    );
    watch(
      () => props.initialSecondary,
      (value) => {
        if (value) {
          secondary.value = value;
          if (!props.initialPrimary) primary.value = secondaryParentValue.value;
        }
      }
    );
    const primaryItem = computed(() => props.primaryItems.find((item) => item.value === primary.value));
    const secondaryItem = computed(
      () => props.secondaryItems.find((item) => item.value === secondary.value)
    );
    const resolvedContentClass = computed(
      () => typeof props.contentClass === "function" ? props.contentClass({ primary: primary.value, secondary: secondary.value }) : props.contentClass
    );
    function chooseTab(which, value) {
      if (which === "primary") {
        primary.value = value;
        emit("update:primary", value);
      } else {
        secondary.value = value;
        emit("update:secondary", value);
      }
    }
    function chooseNavigation(kind, value) {
      if (kind === "tab") topTab.value = value;
      if (kind === "site") currentSite.value = value;
      if (kind === "language") currentLanguage.value = value;
      emit("navigation-action", { kind, value });
    }
    function navigateBreadcrumb(payload) {
      payload?.preventDefault?.();
      emit("breadcrumb-navigate", payload);
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createVNode(WorkbenchTopNav, {
          mode: __props.navigation.mode || "workbench",
          "user-state": __props.navigation.userState || "authenticated",
          tabs: __props.navigation.tabs,
          "active-tab": topTab.value,
          sites: __props.navigation.sites,
          "current-site": currentSite.value,
          languages: __props.navigation.languages,
          "current-language": currentLanguage.value,
          "user-menu-items": __props.navigation.userMenuItems,
          "onUpdate:activeTab": _cache[0] || (_cache[0] = ($event) => chooseNavigation("tab", $event)),
          onSelectSite: _cache[1] || (_cache[1] = ($event) => chooseNavigation("site", $event)),
          onSelectLanguage: _cache[2] || (_cache[2] = ($event) => chooseNavigation("language", $event)),
          onSelectUserAction: _cache[3] || (_cache[3] = ($event) => chooseNavigation("user-action", $event)),
          onSearch: _cache[4] || (_cache[4] = ($event) => chooseNavigation("search", $event)),
          onNotification: _cache[5] || (_cache[5] = ($event) => chooseNavigation("notification", $event))
        }, null, 8, ["mode", "user-state", "tabs", "active-tab", "sites", "current-site", "languages", "current-language", "user-menu-items"]),
        _createElementVNode("main", _hoisted_2, [
          _createVNode(WorkbenchBreadcrumb, {
            items: __props.breadcrumbs,
            onNavigate: navigateBreadcrumb
          }, null, 8, ["items"]),
          _createElementVNode("header", _hoisted_3, [
            _createElementVNode("div", _hoisted_4, [
              _createElementVNode(
                "h1",
                null,
                _toDisplayString(__props.identity.name),
                1
                /* TEXT */
              ),
              __props.identity.tag ? (_openBlock(), _createBlock(WorkbenchTag, {
                key: 0,
                label: __props.identity.tag.label,
                variant: __props.identity.tag.variant || "basic"
              }, null, 8, ["label", "variant"])) : _createCommentVNode("v-if", true)
            ]),
            __props.identity.details?.length ? (_openBlock(), _createElementBlock("dl", _hoisted_5, [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(__props.identity.details, (detail) => {
                  return _openBlock(), _createElementBlock("div", {
                    key: detail.label
                  }, [
                    _createElementVNode(
                      "dt",
                      null,
                      _toDisplayString(detail.label),
                      1
                      /* TEXT */
                    ),
                    _createElementVNode(
                      "dd",
                      null,
                      _toDisplayString(detail.value),
                      1
                      /* TEXT */
                    )
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : _createCommentVNode("v-if", true)
          ]),
          _createVNode(WorkbenchCard, {
            variant: "display-white",
            class: _normalizeClass(["wb-profile-shell__content-card", resolvedContentClass.value]),
            "aria-label": __props.contentLabel
          }, {
            default: _withCtx(() => [
              _createVNode(WorkbenchTabs, {
                "model-value": primary.value,
                items: __props.primaryItems,
                variant: "rail",
                "aria-label": __props.primaryLabel,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = (value) => chooseTab("primary", value))
              }, {
                panel: _withCtx(() => [
                  __props.secondaryItems.length ? _withDirectives((_openBlock(), _createBlock(WorkbenchTabs, {
                    key: 0,
                    "model-value": secondary.value,
                    items: __props.secondaryItems,
                    variant: "divider",
                    "aria-label": __props.secondaryLabel,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = (value) => chooseTab("secondary", value))
                  }, {
                    panel: _withCtx(() => [
                      _renderSlot(_ctx.$slots, "secondary-content", {
                        primary: primary.value,
                        secondary: secondary.value,
                        primaryItem: primaryItem.value,
                        secondaryItem: secondaryItem.value
                      })
                    ]),
                    _: 3
                    /* FORWARDED */
                  }, 8, ["model-value", "items", "aria-label"])), [
                    [_vShow, primary.value === secondaryParentValue.value]
                  ]) : _createCommentVNode("v-if", true),
                  primary.value !== secondaryParentValue.value || !__props.secondaryItems.length ? _renderSlot(_ctx.$slots, "primary-content", {
                    primary: primary.value,
                    primaryItem: primaryItem.value
                  }, void 0, void 0, 1) : _createCommentVNode("v-if", true)
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["model-value", "items", "aria-label"])
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["class", "aria-label"]),
          _renderSlot(_ctx.$slots, "hint", {
            primary: primary.value,
            secondary: secondary.value
          })
        ]),
        _ctx.$slots.footer ? (_openBlock(), _createElementBlock("footer", _hoisted_6, [
          _renderSlot(_ctx.$slots, "footer")
        ])) : _createCommentVNode("v-if", true)
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
