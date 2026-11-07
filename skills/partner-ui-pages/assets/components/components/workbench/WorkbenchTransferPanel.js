import { openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createVNode as _createVNode, Fragment as _Fragment, createElementBlock as _createElementBlock, renderList as _renderList, normalizeClass as _normalizeClass, unref as _unref, withCtx as _withCtx, renderSlot as _renderSlot, createTextVNode as _createTextVNode, withModifiers as _withModifiers } from "vue";
const _hoisted_1 = ["data-side", "aria-label", "aria-disabled"];
const _hoisted_2 = { class: "wb-transfer-panel__header" };
const _hoisted_3 = ["aria-label", "disabled"];
const _hoisted_4 = {
  key: 0,
  class: "wb-transfer-panel__search"
};
const _hoisted_5 = { class: "wb-transfer-panel__search-control" };
const _hoisted_6 = ["aria-label", "value", "disabled"];
const _hoisted_7 = ["aria-label", "disabled"];
const _hoisted_8 = { class: "wb-transfer-panel__body" };
const _hoisted_9 = ["role", "aria-label", "aria-multiselectable"];
const _hoisted_10 = ["data-key", "role", "tabindex", "aria-level", "aria-posinset", "aria-setsize", "aria-expanded", "aria-disabled", "aria-checked", "onFocus", "onKeydown"];
const _hoisted_11 = ["aria-label", "aria-expanded", "disabled", "onClick"];
const _hoisted_12 = {
  key: 1,
  class: "wb-transfer-panel__toggle-space"
};
const _hoisted_13 = { class: "wb-transfer-panel__text-tip" };
const _hoisted_14 = {
  key: 0,
  class: "wb-transfer-panel__highlight",
  "aria-hidden": "true"
};
const _hoisted_15 = ["aria-label", "disabled", "onClick"];
const _hoisted_16 = { class: "wb-transfer-panel__text-tip" };
const _hoisted_17 = { class: "wb-transfer-panel__label" };
const _hoisted_18 = {
  key: 1,
  class: "wb-transfer-panel__empty",
  role: "status"
};
const _hoisted_19 = ["src"];
const _hoisted_20 = {
  key: 1,
  class: "wb-transfer-panel__footer"
};
import "../shared/disclosure-motion.css";
import { computed, nextTick, ref, watch } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchTooltip from "../tooltip/WorkbenchTooltip.vue";
import WorkbenchCheckbox from "../choice/WorkbenchCheckbox.vue";
import WorkbenchPagination from "../pagination/WorkbenchPagination.vue";
import { enabledLeaves, filterItems, flattenItems } from "./transferModel.js";
import emptyData from "./assets/empty-data.png";
const __sfc_main__ = {
  __name: "TransferPanel",
  props: {
    items: { type: Array, required: true },
    title: { type: String, required: true },
    side: { type: String, required: true },
    mode: { type: String, required: true },
    checkedKeys: { type: Array, required: true },
    disabled: Boolean,
    searchable: Boolean,
    pagination: Boolean,
    pageSize: Number,
    defaultExpandedKeys: Array
  },
  emits: ["check", "move", "search", "page-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const root = ref(null);
    const search = ref("");
    const query = computed(() => search.value.trim().toLocaleLowerCase());
    const page = ref(1);
    const expanded = ref(new Set(props.defaultExpandedKeys));
    const focused = ref(null);
    const filtered = computed(() => filterItems(props.items, query.value));
    const safePageSize = computed(
      () => Number.isInteger(props.pageSize) && props.pageSize > 0 ? props.pageSize : 6
    );
    const pageCount = computed(
      () => Math.max(1, Math.ceil(filtered.value.length / safePageSize.value))
    );
    const currentPage = computed(() => Math.min(page.value, pageCount.value));
    const paged = computed(
      () => props.pagination ? filtered.value.slice(
        (currentPage.value - 1) * safePageSize.value,
        currentPage.value * safePageSize.value
      ) : filtered.value
    );
    const hasTree = computed(() => props.items.some((item) => item.children.length));
    const rows = computed(() => {
      const result = [];
      function walk(items, level = 1, parent = null) {
        items.forEach((item, index) => {
          const open = item.children.length > 0 && (Boolean(query.value) || expanded.value.has(item.key));
          result.push({ item, level, parent, index, size: items.length, open });
          if (open) walk(item.children, level + 1, item.key);
        });
      }
      walk(paged.value);
      return result;
    });
    const checks = computed(() => new Set(props.checkedKeys));
    const eligible = computed(() => enabledLeaves(filtered.value));
    const totalCount = computed(
      () => flattenItems(props.items).filter((item) => !item.children.length).length
    );
    const selectedCount = computed(
      () => enabledLeaves(props.items).filter((item) => checks.value.has(item.key)).length
    );
    const allChecked = computed(
      () => eligible.value.length > 0 && eligible.value.every((item) => checks.value.has(item.key))
    );
    const someChecked = computed(
      () => eligible.value.some((item) => checks.value.has(item.key)) && !allChecked.value
    );
    const tabKey = computed(
      () => rows.value.find((row) => row.item.key === focused.value && !row.item.disabled)?.item.key ?? rows.value.find((row) => !row.item.disabled)?.item.key
    );
    function state(item) {
      const eligibleKeys = enabledLeaves([item]).map((leaf) => leaf.key);
      const count = eligibleKeys.filter((key) => checks.value.has(key)).length;
      return {
        checked: eligibleKeys.length > 0 && count === eligibleKeys.length,
        mixed: count > 0 && count < eligibleKeys.length
      };
    }
    function check(item) {
      if (props.disabled || item.disabled) return;
      const keys = new Set(props.checkedKeys);
      const value = !state(item).checked;
      enabledLeaves([item]).forEach((leaf) => value ? keys.add(leaf.key) : keys.delete(leaf.key));
      emit("check", [...keys]);
    }
    function checkAll() {
      if (props.disabled) return;
      const keys = new Set(props.checkedKeys);
      eligible.value.forEach((item) => allChecked.value ? keys.delete(item.key) : keys.add(item.key));
      emit("check", [...keys]);
    }
    function toggle(row, value = !row.open) {
      if (props.disabled || row.item.disabled || query.value) return;
      const keys = new Set(expanded.value);
      if (value) keys.add(row.item.key);
      else keys.delete(row.item.key);
      expanded.value = keys;
    }
    async function focus(key) {
      focused.value = key;
      await nextTick();
      [...root.value?.querySelectorAll("[data-key]") ?? []].find((element) => element.dataset.key === String(key))?.focus();
    }
    function horizontalKey(key, row) {
      if (key === "ArrowRight" && row.item.children.length) {
        if (!row.open) toggle(row, true);
        else return row.item.children.find((item) => !item.disabled)?.key;
      }
      if (key === "ArrowLeft") {
        if (row.open) toggle(row, false);
        else return row.parent;
      }
    }
    function ignoresKey(event, row) {
      if (props.disabled || row.item.disabled || event.isComposing) return true;
      const checkbox = event.target.matches("input");
      return event.target !== event.currentTarget && !checkbox || event.key === " " && checkbox;
    }
    function onKeydown(event, row) {
      if (ignoresKey(event, row)) return;
      const enabled = rows.value.filter((item) => !item.item.disabled);
      const index = enabled.findIndex((item) => item.item.key === row.item.key);
      let next;
      switch (event.key) {
        case "ArrowDown":
          next = enabled[Math.min(index + 1, enabled.length - 1)]?.item.key;
          break;
        case "ArrowUp":
          next = enabled[Math.max(0, index - 1)]?.item.key;
          break;
        case "Home":
          next = enabled[0]?.item.key;
          break;
        case "End":
          next = enabled.at(-1)?.item.key;
          break;
        case "ArrowRight":
        case "ArrowLeft":
          next = horizontalKey(event.key, row);
          break;
        case " ":
        case "Enter":
          check(row.item);
          break;
        default:
          return;
      }
      event.preventDefault();
      if (next != null) focus(next);
    }
    function searchChanged(value) {
      search.value = value;
      page.value = 1;
      emit("search", value);
    }
    function setPage(value) {
      page.value = value;
      emit("page-change", value);
    }
    async function move(keys) {
      const oldButtons = [...root.value?.querySelectorAll(".wb-transfer-panel__auto-row") ?? []];
      const index = oldButtons.indexOf(document.activeElement);
      emit("move", keys);
      await nextTick();
      if (index < 0) return;
      const buttons = [...root.value.querySelectorAll(".wb-transfer-panel__auto-row:enabled")];
      (buttons[Math.min(index, buttons.length - 1)] ?? root.value.querySelector(".wb-transfer-panel__all"))?.focus();
    }
    function parts(label) {
      const index = query.value ? label.toLocaleLowerCase().indexOf(query.value) : -1;
      return index < 0 ? null : [
        label.slice(0, index),
        label.slice(index, index + query.value.length),
        label.slice(index + query.value.length)
      ];
    }
    watch(
      () => flattenItems(props.items).filter((item) => item.children.length).map((item) => item.key),
      (keys, oldKeys = []) => {
        if (props.side !== "target") return;
        const previous = new Set(oldKeys);
        const next = new Set(expanded.value);
        keys.forEach((key) => {
          if (!previous.has(key)) next.add(key);
        });
        expanded.value = next;
      },
      { immediate: true }
    );
    watch(query, () => {
      focused.value = null;
    });
    watch(pageCount, () => {
      if (page.value > pageCount.value) page.value = pageCount.value;
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-transfer-panel", { "is-disabled": __props.disabled }]),
        "data-side": __props.side,
        "aria-label": `${__props.side === "source" ? "\u53EF\u9009" : "\u5DF2\u9009"}\u5217\u8868`,
        "aria-disabled": __props.disabled
      }, [
        _createElementVNode("header", _hoisted_2, [
          __props.mode === "manual" ? (_openBlock(), _createBlock(WorkbenchCheckbox, {
            key: 0,
            label: `${__props.title}\uFF08${selectedCount.value}/${totalCount.value}\uFF09`,
            "aria-label": `${__props.side === "source" ? "\u53EF\u9009" : "\u5DF2\u9009"}\u5217\u8868\u5168\u9009`,
            "model-value": allChecked.value,
            indeterminate: someChecked.value,
            disabled: __props.disabled || !eligible.value.length,
            "onUpdate:modelValue": checkAll
          }, null, 8, ["label", "aria-label", "model-value", "indeterminate", "disabled"])) : (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              _createElementVNode(
                "span",
                null,
                _toDisplayString(__props.title),
                1
                /* TEXT */
              ),
              _createElementVNode("button", {
                type: "button",
                class: "wb-transfer-panel__all",
                "aria-label": __props.side === "source" ? "\u6DFB\u52A0\u5168\u90E8\u53EF\u9009\u9879" : "\u79FB\u56DE\u5168\u90E8\u5DF2\u9009\u9879",
                disabled: __props.disabled || !eligible.value.length,
                onClick: _cache[0] || (_cache[0] = ($event) => move(eligible.value.map((item) => item.key)))
              }, [
                _createVNode(WorkbenchIcon, {
                  name: `\u53CC\u7BAD\u5934/\u5927\u5C0F=14,\u65B9\u5411=${__props.side === "source" ? "\u53F3" : "\u5DE6"}`,
                  size: 14
                }, null, 8, ["name"])
              ], 8, _hoisted_3)
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        __props.searchable ? (_openBlock(), _createElementBlock("div", _hoisted_4, [
          _createElementVNode("div", _hoisted_5, [
            _createVNode(WorkbenchIcon, { name: "\u641C\u7D22_14px" }),
            _createElementVNode("input", {
              type: "search",
              "aria-label": `\u641C\u7D22${__props.side === "source" ? "\u53EF\u9009" : "\u5DF2\u9009"}\u9879`,
              placeholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
              value: search.value,
              disabled: __props.disabled,
              onInput: _cache[1] || (_cache[1] = ($event) => searchChanged($event.target.value))
            }, null, 40, _hoisted_6),
            search.value ? (_openBlock(), _createElementBlock("button", {
              key: 0,
              type: "button",
              "aria-label": `\u6E05\u9664${__props.side === "source" ? "\u53EF\u9009" : "\u5DF2\u9009"}\u641C\u7D22`,
              disabled: __props.disabled,
              onClick: _cache[2] || (_cache[2] = ($event) => searchChanged(""))
            }, [
              _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_10px" })
            ], 8, _hoisted_7)) : _createCommentVNode("v-if", true)
          ])
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode("div", _hoisted_8, [
          rows.value.length ? (_openBlock(), _createElementBlock("div", {
            key: 0,
            class: "wb-transfer-panel__list",
            role: hasTree.value && __props.mode === "manual" ? "tree" : "list",
            "aria-label": __props.title,
            "aria-multiselectable": hasTree.value && __props.mode === "manual" ? true : void 0
          }, [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(rows.value, (row) => {
                return _openBlock(), _createElementBlock("div", {
                  key: row.item.key,
                  class: _normalizeClass(["wb-transfer-panel__row", {
                    "is-disabled": __props.disabled || row.item.disabled,
                    "has-tree": hasTree.value && __props.mode === "manual"
                  }]),
                  "data-key": row.item.key,
                  role: hasTree.value && __props.mode === "manual" ? "treeitem" : "listitem",
                  tabindex: hasTree.value && __props.mode === "manual" && !__props.disabled && !row.item.disabled && row.item.key === tabKey.value ? 0 : void 0,
                  "aria-level": hasTree.value ? row.level : void 0,
                  "aria-posinset": hasTree.value ? row.index + 1 : void 0,
                  "aria-setsize": hasTree.value ? row.size : void 0,
                  "aria-expanded": hasTree.value && row.item.children.length ? row.open : void 0,
                  "aria-disabled": __props.disabled || row.item.disabled,
                  "aria-checked": hasTree.value && __props.mode === "manual" ? state(row.item).mixed ? "mixed" : state(row.item).checked : void 0,
                  onFocus: _withModifiers(($event) => focused.value = row.item.key, ["self"]),
                  onKeydown: ($event) => hasTree.value && __props.mode === "manual" && onKeydown($event, row)
                }, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(row.level - 1, (level) => {
                      return _openBlock(), _createElementBlock("span", {
                        key: level,
                        class: "wb-transfer-panel__indent",
                        "aria-hidden": "true"
                      });
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  __props.mode === "manual" ? (_openBlock(), _createElementBlock(
                    _Fragment,
                    { key: 0 },
                    [
                      hasTree.value && row.item.children.length ? (_openBlock(), _createElementBlock("button", {
                        key: 0,
                        type: "button",
                        class: "wb-transfer-panel__toggle",
                        "aria-label": `${row.open ? "\u6536\u8D77" : "\u5C55\u5F00"}${row.item.label}`,
                        "aria-expanded": row.open,
                        disabled: __props.disabled || row.item.disabled || Boolean(query.value),
                        tabindex: "-1",
                        onClick: ($event) => toggle(row)
                      }, [
                        _createVNode(WorkbenchIcon, {
                          name: "\u7ED3\u6784\u6811\u7BAD\u5934/\u65B9\u5411=\u5411\u53F3",
                          class: _normalizeClass(["wb-disclosure-icon wb-disclosure-icon--branch", { "is-expanded": row.open }]),
                          size: 16
                        }, null, 8, ["class"])
                      ], 8, _hoisted_11)) : hasTree.value ? (_openBlock(), _createElementBlock("span", _hoisted_12)) : _createCommentVNode("v-if", true),
                      _createElementVNode("span", _hoisted_13, [
                        _createVNode(WorkbenchTooltip, {
                          content: row.item.label,
                          "overflow-only": ""
                        }, {
                          trigger: _withCtx(() => [
                            _createElementVNode(
                              "div",
                              {
                                class: _normalizeClass(["wb-transfer-panel__content", { "is-checked": state(row.item).checked || state(row.item).mixed }])
                              },
                              [
                                _createVNode(WorkbenchCheckbox, {
                                  label: row.item.label,
                                  "aria-label": row.item.label,
                                  "model-value": state(row.item).checked,
                                  indeterminate: state(row.item).mixed,
                                  disabled: __props.disabled || row.item.disabled || !_unref(enabledLeaves)([row.item]).length,
                                  "onUpdate:modelValue": ($event) => check(row.item)
                                }, null, 8, ["label", "aria-label", "model-value", "indeterminate", "disabled", "onUpdate:modelValue"]),
                                query.value && parts(row.item.label) ? (_openBlock(), _createElementBlock("span", _hoisted_14, [
                                  _createElementVNode(
                                    "span",
                                    null,
                                    _toDisplayString(parts(row.item.label)[0]),
                                    1
                                    /* TEXT */
                                  ),
                                  _createElementVNode(
                                    "mark",
                                    null,
                                    _toDisplayString(parts(row.item.label)[1]),
                                    1
                                    /* TEXT */
                                  ),
                                  _createElementVNode(
                                    "span",
                                    null,
                                    _toDisplayString(parts(row.item.label)[2]),
                                    1
                                    /* TEXT */
                                  )
                                ])) : _createCommentVNode("v-if", true)
                              ],
                              2
                              /* CLASS */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        }, 1032, ["content"])
                      ])
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  )) : (_openBlock(), _createElementBlock("button", {
                    key: 1,
                    type: "button",
                    class: "wb-transfer-panel__auto-row",
                    "aria-label": `${__props.side === "source" ? "\u6DFB\u52A0" : "\u79FB\u56DE"}${row.item.label}`,
                    disabled: __props.disabled || row.item.disabled,
                    onClick: ($event) => move(row.item.leafKeys)
                  }, [
                    _createElementVNode("span", _hoisted_16, [
                      _createVNode(WorkbenchTooltip, {
                        content: row.item.label,
                        "overflow-only": ""
                      }, {
                        trigger: _withCtx(() => [
                          _createElementVNode("span", _hoisted_17, [
                            _renderSlot(_ctx.$slots, "item", {
                              item: row.item,
                              side: __props.side
                            }, () => [
                              _createTextVNode(
                                _toDisplayString(row.item.label),
                                1
                                /* TEXT */
                              )
                            ])
                          ])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["content"])
                    ]),
                    __props.side === "target" ? (_openBlock(), _createBlock(WorkbenchIcon, {
                      key: 0,
                      class: "wb-transfer-panel__remove",
                      name: "/ic_public_close_line_8px"
                    })) : _createCommentVNode("v-if", true)
                  ], 8, _hoisted_15))
                ], 42, _hoisted_10);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 8, _hoisted_9)) : (_openBlock(), _createElementBlock("div", _hoisted_18, [
            _renderSlot(_ctx.$slots, "empty", {
              side: __props.side,
              search: search.value
            }, () => [
              !query.value ? (_openBlock(), _createElementBlock("img", {
                key: 0,
                src: _unref(emptyData),
                alt: ""
              }, null, 8, _hoisted_19)) : _createCommentVNode("v-if", true),
              _createElementVNode(
                "span",
                null,
                _toDisplayString(query.value ? "\u672A\u627E\u5230\u5339\u914D\u9879" : "\u6682\u65E0\u6570\u636E"),
                1
                /* TEXT */
              )
            ])
          ]))
        ]),
        __props.pagination && filtered.value.length ? (_openBlock(), _createElementBlock("footer", _hoisted_20, [
          _createVNode(WorkbenchPagination, {
            variant: "simple",
            total: filtered.value.length,
            "page-size": safePageSize.value,
            "model-value": currentPage.value,
            disabled: __props.disabled,
            "aria-label": `${__props.side === "source" ? "\u53EF\u9009" : "\u5DF2\u9009"}\u5217\u8868\u5206\u9875`,
            "onUpdate:modelValue": setPage
          }, null, 8, ["total", "page-size", "model-value", "disabled", "aria-label"])
        ])) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-758fb066" });
