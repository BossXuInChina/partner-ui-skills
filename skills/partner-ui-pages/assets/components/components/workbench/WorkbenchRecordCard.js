import { createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, withCtx as _withCtx, createBlock as _createBlock, createTextVNode as _createTextVNode, Fragment as _Fragment, renderList as _renderList, renderSlot as _renderSlot, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = { class: "record-card__layout" };
const _hoisted_2 = {
  key: 0,
  class: "record-card__check"
};
const _hoisted_3 = { class: "record-card__content" };
const _hoisted_4 = { class: "record-card__header" };
const _hoisted_5 = { class: "record-card__identity" };
const _hoisted_6 = ["href"];
const _hoisted_7 = { class: "record-card__title-text" };
const _hoisted_8 = {
  key: 0,
  class: "record-card__meta"
};
const _hoisted_9 = {
  key: 0,
  class: "record-card__actions"
};
const _hoisted_10 = { class: "record-card__fields" };
const _hoisted_11 = {
  key: 0,
  class: "record-card__footer"
};
import { computed } from "vue";
import WorkbenchDropdown from "../dropdown/WorkbenchDropdown.vue";
import WorkbenchCard from "../card/WorkbenchCard.vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchCheckbox from "../choice/WorkbenchCheckbox.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchTag from "../tag/WorkbenchTag.vue";
const __sfc_main__ = {
  __name: "WorkbenchRecordCard",
  props: {
    title: { type: String, required: true },
    href: String,
    status: { type: String, default: "" },
    tone: { type: String, default: "info" },
    tags: { type: Array, default: () => [] },
    selectable: Boolean,
    selectDisabled: Boolean,
    selected: Boolean,
    selectLabel: { type: String, default: "" },
    favorite: Boolean,
    starred: Boolean,
    openOnTitle: Boolean,
    deletable: Boolean,
    actions: { type: Array, default: () => [] }
  },
  emits: ["select", "favorite", "open", "delete", "action"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const menuItems = computed(
      () => props.deletable ? [...props.actions, { id: "delete", label: "\u5220\u9664", type: "action" }] : props.actions
    );
    function chooseAction(item) {
      if (item.id === "delete") emit("delete");
      else emit("action", item);
    }
    function openTitle(event) {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      emit("open");
    }
    function openCard(event) {
      if (!props.href || event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      const controls = 'a,button,input,select,textarea,label,summary,[role="button"],[role="checkbox"],[tabindex]:not([data-record-field-text]),[contenteditable]';
      const path = event.composedPath();
      if (path.slice(0, path.indexOf(event.currentTarget)).some((node) => node instanceof Element && node.matches(controls)) || window.getSelection()?.toString())
        return;
      emit("open");
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "article",
        {
          class: _normalizeClass(["record-card-entry", { "is-interactive": __props.href }]),
          onClick: openCard
        },
        [
          _createVNode(WorkbenchCard, {
            variant: "operation",
            class: "record-card"
          }, {
            default: _withCtx(() => [
              _createElementVNode("div", _hoisted_1, [
                __props.selectable ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
                  _createVNode(WorkbenchCheckbox, {
                    "model-value": __props.selected,
                    disabled: __props.selectDisabled,
                    "aria-label": __props.selectLabel || `\u9009\u62E9BOQ ${__props.title}`,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("select", $event))
                  }, null, 8, ["model-value", "disabled", "aria-label"])
                ])) : _createCommentVNode("v-if", true),
                _createElementVNode("div", _hoisted_3, [
                  _createElementVNode("div", _hoisted_4, [
                    _createElementVNode("div", _hoisted_5, [
                      _createElementVNode("h3", null, [
                        __props.href ? (_openBlock(), _createElementBlock("a", {
                          key: 0,
                          class: "record-card__title-link",
                          href: __props.href,
                          onClick: openTitle
                        }, _toDisplayString(__props.title), 9, _hoisted_6)) : __props.openOnTitle ? (_openBlock(), _createBlock(WorkbenchButton, {
                          key: 1,
                          appearance: "text",
                          "text-layout": "inline",
                          onClick: _cache[1] || (_cache[1] = ($event) => emit("open"))
                        }, {
                          default: _withCtx(() => [
                            _createElementVNode(
                              "span",
                              _hoisted_7,
                              _toDisplayString(__props.title),
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 1
                          /* STABLE */
                        })) : (_openBlock(), _createElementBlock(
                          _Fragment,
                          { key: 2 },
                          [
                            _createTextVNode(
                              _toDisplayString(__props.title),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ]),
                      __props.status || __props.tags.length || __props.favorite ? (_openBlock(), _createElementBlock("div", _hoisted_8, [
                        __props.status ? (_openBlock(), _createBlock(WorkbenchTag, {
                          key: 0,
                          label: __props.status,
                          variant: "status-subtle",
                          status: __props.tone
                        }, null, 8, ["label", "status"])) : _createCommentVNode("v-if", true),
                        (_openBlock(true), _createElementBlock(
                          _Fragment,
                          null,
                          _renderList(__props.tags, (tag) => {
                            return _openBlock(), _createBlock(WorkbenchTag, {
                              key: typeof tag === "string" ? tag : tag.label,
                              label: typeof tag === "string" ? tag : tag.label,
                              "show-full": typeof tag === "object" && tag.showFull,
                              variant: "status-subtle",
                              status: typeof tag === "object" ? tag.tone || "info" : "info"
                            }, null, 8, ["label", "show-full", "status"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        __props.favorite ? (_openBlock(), _createBlock(WorkbenchButton, {
                          key: 1,
                          appearance: "icon",
                          "icon-layout": "container",
                          size: "24",
                          "aria-label": __props.starred ? "\u53D6\u6D88\u6536\u85CF" : "\u6536\u85CF",
                          "aria-pressed": __props.starred,
                          onClick: _cache[2] || (_cache[2] = ($event) => emit("favorite"))
                        }, {
                          icon: _withCtx(() => [
                            _createVNode(WorkbenchIcon, {
                              name: __props.starred ? "/ic_public_star_filed" : "/ic_public_star_line",
                              size: 14,
                              color: __props.starred ? "var(--wb-color-warning)" : "var(--wb-color-icon-primary)"
                            }, null, 8, ["name", "color"])
                          ]),
                          _: 1
                          /* STABLE */
                        }, 8, ["aria-label", "aria-pressed"])) : _createCommentVNode("v-if", true)
                      ])) : _createCommentVNode("v-if", true)
                    ]),
                    _ctx.$slots["header-actions"] || menuItems.value.length ? (_openBlock(), _createElementBlock("div", _hoisted_9, [
                      _renderSlot(_ctx.$slots, "header-actions", {}, () => [
                        _createVNode(WorkbenchDropdown, {
                          items: menuItems.value,
                          "aria-label": "\u64CD\u4F5C",
                          onAction: chooseAction
                        }, {
                          trigger: _withCtx(() => [..._cache[3] || (_cache[3] = [
                            _createTextVNode(
                              "\u64CD\u4F5C",
                              -1
                              /* CACHED */
                            )
                          ])]),
                          _: 1
                          /* STABLE */
                        }, 8, ["items"])
                      ])
                    ])) : _createCommentVNode("v-if", true)
                  ]),
                  _createElementVNode("div", _hoisted_10, [
                    _renderSlot(_ctx.$slots, "default")
                  ]),
                  _ctx.$slots.footer || _ctx.$slots.progress ? (_openBlock(), _createElementBlock("footer", _hoisted_11, [
                    _renderSlot(_ctx.$slots, "footer", {}, () => [
                      _renderSlot(_ctx.$slots, "progress")
                    ])
                  ])) : _createCommentVNode("v-if", true)
                ])
              ])
            ]),
            _: 3
            /* FORWARDED */
          })
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-a30f474e" });
