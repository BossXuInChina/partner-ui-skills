import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Teleport as _Teleport, createBlock as _createBlock, withModifiers as _withModifiers, withKeys as _withKeys } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["disabled", "aria-expanded", "aria-controls"];
const _hoisted_3 = {
  class: "wb-pagination__size-arrow-frame",
  "aria-hidden": "true"
};
const _hoisted_4 = ["aria-checked", "onClick"];
const _hoisted_5 = ["title"];
const _hoisted_6 = {
  key: 0,
  class: "wb-pagination__selected-mark-slot",
  "aria-hidden": "true"
};
const _hoisted_7 = ["disabled"];
const _hoisted_8 = {
  key: 1,
  class: "wb-pagination__summary",
  "aria-live": "polite"
};
const _hoisted_9 = {
  key: 0,
  class: "wb-pagination__summary-select"
};
const _hoisted_10 = {
  key: 0,
  class: "wb-pagination__summary-input"
};
const _hoisted_11 = ["value", "disabled", "onKeydown"];
const _hoisted_12 = { key: 1 };
const _hoisted_13 = ["aria-label"];
const _hoisted_14 = {
  key: 2,
  class: "wb-pagination__pages",
  "aria-label": "\u9875\u7801"
};
const _hoisted_15 = ["aria-label", "disabled", "onClick"];
const _hoisted_16 = ["aria-label", "aria-current", "disabled", "onClick"];
const _hoisted_17 = ["disabled"];
const _hoisted_18 = {
  key: 3,
  class: "wb-pagination__jump",
  role: "group",
  "aria-label": "\u9875\u7801\u8DF3\u8F6C"
};
const _hoisted_19 = { class: "wb-pagination__jump-input" };
const _hoisted_20 = ["value", "disabled", "onKeydown"];
const _hoisted_21 = ["disabled"];
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchSelect from "../select/WorkbenchSelect.vue";
import "../shared/disclosure-motion.css";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchPagination",
  props: {
    variant: {
      type: String,
      default: "default",
      validator: (value) => ["default", "full", "simple"].includes(value)
    },
    total: { type: Number, required: true },
    modelValue: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    pageSizeOptions: { type: Array, default: () => [10, 20, 50, 100] },
    middlePageCount: {
      type: Number,
      default: 3,
      validator: (value) => Number.isInteger(value) && value > 0
    },
    simpleMode: {
      type: String,
      default: "click",
      validator: (value) => ["click", "select", "input"].includes(value)
    },
    simpleEditable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    ariaLabel: { type: String, default: "\u5206\u9875" }
  },
  emits: ["update:modelValue", "update:pageSize", "change", "page-size-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const sizeMenuId = `wb-pagination-${useId()}-size-menu`;
    const validPageSizes = computed(() => [
      ...new Set(props.pageSizeOptions.filter((value) => Number.isInteger(value) && value > 0))
    ]);
    const hasData = computed(() => Number.isFinite(props.total) && props.total > 0);
    const safePageSize = computed(
      () => Number.isInteger(props.pageSize) && props.pageSize > 0 ? props.pageSize : 10
    );
    const totalPages = computed(
      () => hasData.value ? Math.max(1, Math.ceil(props.total / safePageSize.value)) : 1
    );
    const currentPage = computed(
      () => Math.min(totalPages.value, Math.max(1, Math.floor(Number(props.modelValue) || 1)))
    );
    const interactionDisabled = computed(() => props.disabled || !hasData.value);
    const resolvedMiddlePageCount = computed(
      () => Number.isInteger(props.middlePageCount) && props.middlePageCount > 0 ? props.middlePageCount : 3
    );
    const resolvedSimpleMode = computed(() => props.simpleEditable ? "input" : props.simpleMode);
    const jumpValue = ref(String(currentPage.value));
    const sizeRoot = ref(null);
    const sizeTrigger = ref(null);
    const sizeMenu = ref(null);
    const sizeExpanded = ref(false);
    const pageItems = computed(() => {
      const count = totalPages.value;
      const current = currentPage.value;
      const middleCount = Math.min(resolvedMiddlePageCount.value, Math.max(1, count - 2));
      const edgePageCount = middleCount + 2;
      if (count <= middleCount + 4) return Array.from({ length: count }, (_, index) => index + 1);
      if (current <= middleCount + 1)
        return [
          ...Array.from({ length: edgePageCount }, (_, index) => index + 1),
          "ellipsis-end",
          count
        ];
      if (current >= count - middleCount - 1)
        return [
          1,
          "ellipsis-start",
          ...Array.from({ length: edgePageCount }, (_, index) => count - edgePageCount + index + 1)
        ];
      const middleStart = current - Math.floor((middleCount - 1) / 2);
      return [
        1,
        "ellipsis-start",
        ...Array.from({ length: middleCount }, (_, index) => middleStart + index),
        "ellipsis-end",
        count
      ];
    });
    const simplePageOptions = computed(
      () => Array.from({ length: totalPages.value }, (_, index) => {
        const page = index + 1;
        return { value: page, label: `${page}/${totalPages.value}` };
      })
    );
    watch(currentPage, (value) => {
      jumpValue.value = String(value);
    });
    watch(interactionDisabled, (disabled) => {
      if (disabled) sizeExpanded.value = false;
    });
    watch([() => props.modelValue, totalPages], () => {
      const requested = Math.floor(Number(props.modelValue) || 1);
      if (requested !== currentPage.value) emitPage(currentPage.value);
    });
    function emitPage(page) {
      if (page === currentPage.value && Number(props.modelValue) === page) return;
      emit("update:modelValue", page);
      emit("change", page);
      jumpValue.value = String(page);
    }
    function goTo(page) {
      if (interactionDisabled.value) return;
      const next = Math.min(totalPages.value, Math.max(1, Math.floor(Number(page) || 1)));
      emitPage(next);
    }
    function selectSimplePage(selection) {
      const [page] = Array.isArray(selection) ? selection : [];
      if (Number.isInteger(page)) goTo(page);
    }
    function onJumpInput(event) {
      jumpValue.value = event.target.value.replace(/[^0-9]/g, "");
      if (event.target.value !== jumpValue.value) event.target.value = jumpValue.value;
    }
    function commitJump() {
      if (interactionDisabled.value) return;
      if (!jumpValue.value) {
        jumpValue.value = String(currentPage.value);
        return;
      }
      const next = Math.min(totalPages.value, Math.max(1, Number.parseInt(jumpValue.value, 10)));
      jumpValue.value = String(next);
      goTo(next);
    }
    function changePageSize(nextSize) {
      if (interactionDisabled.value) return;
      nextSize = Number(nextSize);
      if (!Number.isInteger(nextSize) || nextSize <= 0 || nextSize === props.pageSize) return;
      emit("update:pageSize", nextSize);
      emit("page-size-change", nextSize);
      if (currentPage.value !== 1 || Number(props.modelValue) !== 1) emitPage(1);
    }
    function togglePageSize() {
      if (interactionDisabled.value) return;
      sizeExpanded.value = !sizeExpanded.value;
      if (sizeExpanded.value)
        nextTick(() => sizeMenu.value?.querySelector('[role="menuitemradio"]')?.focus());
    }
    function choosePageSize(option) {
      changePageSize(option);
      sizeExpanded.value = false;
      nextTick(() => sizeTrigger.value?.focus());
    }
    function onSizeKeydown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        sizeExpanded.value = false;
        nextTick(() => sizeTrigger.value?.focus());
        return;
      }
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (!sizeExpanded.value) {
        sizeExpanded.value = true;
        nextTick(() => sizeMenu.value?.querySelector('[role="menuitemradio"]')?.focus());
        return;
      }
      const options = [...sizeMenu.value.querySelectorAll('[role="menuitemradio"]')];
      const currentIndex = options.indexOf(document.activeElement);
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : event.key === "ArrowDown" ? (currentIndex + 1) % options.length : (currentIndex - 1 + options.length) % options.length;
      options[nextIndex]?.focus();
    }
    function dismissPageSizeFocus(event) {
      if (!sizeRoot.value?.contains(event.relatedTarget) && !sizeMenu.value?.contains(event.relatedTarget))
        sizeExpanded.value = false;
    }
    function dismissPageSize(event) {
      if (!sizeRoot.value?.contains(event.target) && !sizeMenu.value?.contains(event.target))
        sizeExpanded.value = false;
    }
    function positionSizeLayer(menu) {
      menu.style.removeProperty("z-index");
      let layer = Number(getComputedStyle(menu).zIndex) || 0;
      for (let node = sizeTrigger.value.parentElement; node && node !== document.body; node = node.parentElement) {
        const style = getComputedStyle(node);
        const positioned = style.position !== "static" || /flex|grid/.test(getComputedStyle(node.parentElement).display);
        if (positioned && style.zIndex !== "auto") layer = Math.max(layer, Number(style.zIndex) + 1);
      }
      menu.style.zIndex = String(layer);
    }
    function positionSizeMenu() {
      if (!sizeExpanded.value || !sizeMenu.value || !sizeTrigger.value) return;
      const rect = sizeTrigger.value.getBoundingClientRect();
      const menu = sizeMenu.value;
      const style = getComputedStyle(sizeRoot.value);
      positionSizeLayer(menu);
      for (const name of style)
        if (name.startsWith("--wb-")) menu.style.setProperty(name, style.getPropertyValue(name));
      menu.style.fontFamily = style.fontFamily;
      const gap = parseFloat(style.getPropertyValue("--wb-spacing-component-xs")) || 4;
      menu.style.width = `${rect.width}px`;
      const height = menu.scrollHeight;
      const above = Math.max(0, rect.top - gap * 2);
      const below = Math.max(0, innerHeight - rect.bottom - gap * 2);
      const top = above >= height || above >= below;
      const available = top ? above : below;
      menu.style.maxHeight = `${available}px`;
      const box = menu.getBoundingClientRect();
      menu.style.left = `${Math.max(gap, Math.min(rect.left, innerWidth - box.width - gap))}px`;
      menu.style.top = `${top ? rect.top - gap - box.height : rect.bottom + gap}px`;
      menu.dataset.placement = top ? "top" : "bottom";
    }
    watch(sizeExpanded, (value) => {
      if (value) nextTick(positionSizeMenu);
    });
    onMounted(() => {
      document.addEventListener("pointerdown", dismissPageSize);
      window.addEventListener("resize", positionSizeMenu);
      window.addEventListener("scroll", positionSizeMenu, true);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("pointerdown", dismissPageSize);
      window.removeEventListener("resize", positionSizeMenu);
      window.removeEventListener("scroll", positionSizeMenu, true);
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("nav", {
        class: _normalizeClass(["wb-pagination", `wb-pagination--${__props.variant}`]),
        "aria-label": __props.ariaLabel
      }, [
        __props.variant === "full" ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 0,
            ref_key: "sizeRoot",
            ref: sizeRoot,
            class: "wb-pagination__size",
            onKeydown: onSizeKeydown,
            onFocusout: dismissPageSizeFocus
          },
          [
            _createElementVNode("button", {
              ref_key: "sizeTrigger",
              ref: sizeTrigger,
              type: "button",
              class: "wb-pagination__size-trigger",
              disabled: interactionDisabled.value,
              "aria-label": "\u6BCF\u9875\u663E\u793A\u6570\u91CF",
              "aria-haspopup": "menu",
              "aria-expanded": sizeExpanded.value,
              "aria-controls": sizeExpanded.value ? sizeMenuId : void 0,
              onClick: togglePageSize
            }, [
              _createElementVNode(
                "span",
                null,
                _toDisplayString(safePageSize.value) + " \u6761/\u9875",
                1
                /* TEXT */
              ),
              _createElementVNode("span", _hoisted_3, [
                _createVNode(WorkbenchIcon, {
                  class: _normalizeClass(["wb-pagination__size-arrow wb-disclosure-icon", { "is-expanded": sizeExpanded.value }]),
                  name: "\u7BAD\u5934/\u5C3A\u5BF8=10, \u65B9\u5411=\u4E0B\u7BAD\u5934",
                  size: 10
                }, null, 8, ["class"])
              ])
            ], 8, _hoisted_2),
            (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
              sizeExpanded.value ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  ref_key: "sizeMenu",
                  ref: sizeMenu,
                  id: sizeMenuId,
                  onKeydown: onSizeKeydown,
                  onFocusout: dismissPageSizeFocus,
                  class: "wb-pagination__size-menu",
                  role: "menu",
                  "aria-label": "\u6BCF\u9875\u663E\u793A\u6570\u91CF\u9009\u9879"
                },
                [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(validPageSizes.value, (option) => {
                      return _openBlock(), _createElementBlock("button", {
                        key: option,
                        type: "button",
                        role: "menuitemradio",
                        "aria-checked": option === safePageSize.value,
                        class: _normalizeClass({ "is-selected": option === safePageSize.value }),
                        onClick: ($event) => choosePageSize(option)
                      }, [
                        _createElementVNode("span", {
                          class: "wb-pagination__size-option-label",
                          title: `${option} \u6761/\u9875`
                        }, _toDisplayString(option) + " \u6761/\u9875", 9, _hoisted_5),
                        option === safePageSize.value ? (_openBlock(), _createElementBlock("span", _hoisted_6, [
                          _createVNode(WorkbenchIcon, {
                            name: "\u5B8C\u6210/\u5C3A\u5BF8=14",
                            size: 14
                          })
                        ])) : _createCommentVNode("v-if", true)
                      ], 10, _hoisted_4);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                544
                /* NEED_HYDRATION, NEED_PATCH */
              )) : _createCommentVNode("v-if", true)
            ]))
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        )) : _createCommentVNode("v-if", true),
        _createElementVNode("button", {
          class: "wb-pagination__button wb-pagination__arrow",
          type: "button",
          "aria-label": "\u4E0A\u4E00\u9875",
          disabled: interactionDisabled.value || currentPage.value <= 1,
          onClick: _cache[0] || (_cache[0] = ($event) => goTo(currentPage.value - 1))
        }, [
          _createVNode(WorkbenchIcon, {
            name: "/ic_arrow_left_line#2:144",
            size: 10
          })
        ], 8, _hoisted_7),
        __props.variant === "simple" ? (_openBlock(), _createElementBlock("span", _hoisted_8, [
          resolvedSimpleMode.value === "select" ? (_openBlock(), _createElementBlock("span", _hoisted_9, [
            _createVNode(WorkbenchSelect, {
              "model-value": [currentPage.value],
              options: simplePageOptions.value,
              label: `\u5F53\u524D\u9875\uFF0C\u7B2C ${currentPage.value} \u9875\uFF0C\u5171 ${totalPages.value} \u9875`,
              state: interactionDisabled.value ? "disabled" : "default",
              class: "wb-pagination__page-select",
              "onUpdate:modelValue": selectSimplePage
            }, null, 8, ["model-value", "options", "label", "state"])
          ])) : (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              resolvedSimpleMode.value === "input" ? (_openBlock(), _createElementBlock("span", _hoisted_10, [
                _createElementVNode("input", {
                  value: jumpValue.value,
                  disabled: interactionDisabled.value,
                  inputmode: "numeric",
                  autocomplete: "off",
                  "aria-label": "\u5F53\u524D\u9875\u7801",
                  onInput: onJumpInput,
                  onKeydown: _withKeys(_withModifiers(commitJump, ["prevent"]), ["enter"]),
                  onBlur: _cache[1] || (_cache[1] = ($event) => jumpValue.value = String(currentPage.value))
                }, null, 40, _hoisted_11)
              ])) : (_openBlock(), _createElementBlock(
                "span",
                _hoisted_12,
                _toDisplayString(currentPage.value),
                1
                /* TEXT */
              )),
              _cache[3] || (_cache[3] = _createElementVNode(
                "span",
                { "aria-hidden": "true" },
                "/",
                -1
                /* CACHED */
              )),
              _createElementVNode("span", {
                "aria-label": `\u5171 ${totalPages.value} \u9875`
              }, _toDisplayString(totalPages.value), 9, _hoisted_13)
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ])) : (_openBlock(), _createElementBlock("div", _hoisted_14, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(pageItems.value, (item) => {
              return _openBlock(), _createElementBlock(
                _Fragment,
                { key: item },
                [
                  typeof item === "string" ? (_openBlock(), _createElementBlock("button", {
                    key: 0,
                    class: "wb-pagination__button wb-pagination__ellipsis",
                    type: "button",
                    "aria-label": `\u5411${item === "ellipsis-start" ? "\u524D" : "\u540E"}\u8DF3\u8F6C${resolvedMiddlePageCount.value}\u9875`,
                    disabled: interactionDisabled.value,
                    onClick: ($event) => goTo(
                      currentPage.value + (item === "ellipsis-start" ? -resolvedMiddlePageCount.value : resolvedMiddlePageCount.value)
                    )
                  }, [
                    _createVNode(WorkbenchIcon, {
                      class: "wb-pagination__ellipsis-more",
                      name: "\u66F4\u591A_20px"
                    }),
                    _createVNode(WorkbenchIcon, {
                      class: "wb-pagination__ellipsis-jump",
                      name: item === "ellipsis-start" ? "\u53CC\u7BAD\u5934/\u5927\u5C0F=10,\u65B9\u5411=\u5DE6" : "\u53CC\u7BAD\u5934/\u5927\u5C0F=10,\u65B9\u5411=\u53F3",
                      size: 10
                    }, null, 8, ["name"])
                  ], 8, _hoisted_15)) : (_openBlock(), _createElementBlock("button", {
                    key: 1,
                    class: _normalizeClass(["wb-pagination__button wb-pagination__page", { "is-current": item === currentPage.value }]),
                    type: "button",
                    "aria-label": `\u7B2C ${item} \u9875`,
                    "aria-current": item === currentPage.value ? "page" : void 0,
                    disabled: interactionDisabled.value,
                    onClick: ($event) => goTo(item)
                  }, _toDisplayString(item), 11, _hoisted_16))
                ],
                64
                /* STABLE_FRAGMENT */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])),
        _createElementVNode("button", {
          class: "wb-pagination__button wb-pagination__arrow",
          type: "button",
          "aria-label": "\u4E0B\u4E00\u9875",
          disabled: interactionDisabled.value || currentPage.value >= totalPages.value,
          onClick: _cache[2] || (_cache[2] = ($event) => goTo(currentPage.value + 1))
        }, [
          _createVNode(WorkbenchIcon, {
            name: "/ic_arrow_right_line#2:141",
            size: 10
          })
        ], 8, _hoisted_17),
        __props.variant !== "simple" ? (_openBlock(), _createElementBlock("div", _hoisted_18, [
          _createElementVNode("span", _hoisted_19, [
            _createElementVNode("input", {
              value: jumpValue.value,
              disabled: interactionDisabled.value,
              inputmode: "numeric",
              autocomplete: "off",
              "aria-label": "\u8DF3\u8F6C\u9875\u7801",
              onInput: onJumpInput,
              onKeydown: _withKeys(_withModifiers(commitJump, ["prevent"]), ["enter"]),
              onBlur: commitJump
            }, null, 40, _hoisted_20)
          ]),
          _createElementVNode("button", {
            type: "button",
            disabled: interactionDisabled.value,
            "aria-label": "\u8DF3\u8F6C\u5230\u8F93\u5165\u9875\u7801",
            onClick: commitJump
          }, " \u8DF3\u8F6C ", 8, _hoisted_21)
        ])) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-ec0e1118" });
