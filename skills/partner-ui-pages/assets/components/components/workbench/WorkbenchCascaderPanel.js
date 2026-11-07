import { openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createVNode as _createVNode, withModifiers as _withModifiers, mergeProps as _mergeProps, withCtx as _withCtx, createBlock as _createBlock, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["aria-label", "aria-multiselectable"];
const _hoisted_2 = {
  key: 0,
  class: "wb-cascader-panel__empty",
  role: "status"
};
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = {
  key: 0,
  class: "wb-cascader-panel__divider",
  role: "separator"
};
const _hoisted_5 = {
  key: 1,
  class: "wb-cascader-panel__group"
};
const _hoisted_6 = ["aria-label", "data-key", "aria-level", "aria-expanded", "aria-selected", "aria-checked", "aria-disabled", "tabindex", "onClick", "onPointerdown", "onPointerleave", "onFocus", "onBlur", "onKeydown"];
const _hoisted_7 = ["aria-label", "checked", "indeterminate", "disabled", "onChange"];
const _hoisted_8 = { class: "wb-cascader-panel__label" };
const _hoisted_9 = ["title"];
import { computed, nextTick, ref, watch } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import ChoiceMark from "../choice/ChoiceMark.vue";
import WorkbenchTooltip from "../tooltip/WorkbenchTooltip.vue";
import { optionColumns, selectionState } from "./cascaderModel.js";
const __sfc_main__ = {
  __name: "CascaderPanel",
  props: {
    constrained: Boolean,
    options: { type: Array, required: true },
    index: { type: Map, required: true },
    path: { type: Array, required: true },
    selected: { type: Array, required: true },
    mode: { type: String, default: "single" },
    columnSelection: {
      type: Array,
      default: () => [],
      validator: (values) => values.every((value) => ["single", "multiple", "none"].includes(value))
    },
    label: { type: String, default: "\u7EA7\u8054\u9009\u9879" }
  },
  emits: ["expand", "choose", "toggle", "close"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const root = ref(null);
    const focusKey = ref(null);
    const focusedLabelKey = ref(null);
    const hoveredLabelKey = ref(null);
    const dismissedLabelKey = ref(null);
    const columns = computed(() => optionColumns(props.options, props.path, props.index));
    watch(columns, (visibleColumns) => {
      const visibleKeys = new Set(visibleColumns.flatMap((column) => column.map((item) => item.key)));
      for (const current of [focusedLabelKey, hoveredLabelKey, dismissedLabelKey])
        if (current.value !== null && !visibleKeys.has(current.value)) current.value = null;
    });
    function setTooltipHover(key, open) {
      if (open && dismissedLabelKey.value !== key) hoveredLabelKey.value = key;
      else if (!open && hoveredLabelKey.value === key) hoveredLabelKey.value = null;
    }
    function dismissLabel(key) {
      dismissedLabelKey.value = key;
      if (focusedLabelKey.value === key) focusedLabelKey.value = null;
      if (hoveredLabelKey.value === key) hoveredLabelKey.value = null;
    }
    function focusLabel(key) {
      focusKey.value = key;
      focusedLabelKey.value = dismissedLabelKey.value === key ? null : key;
    }
    function leaveLabel(key) {
      if (dismissedLabelKey.value === key) dismissedLabelKey.value = null;
    }
    function blurLabel(key) {
      if (focusedLabelKey.value === key) focusedLabelKey.value = null;
      if (dismissedLabelKey.value === key) dismissedLabelKey.value = null;
    }
    function entry(item) {
      return props.index.get(item.key);
    }
    function selectionMode(column) {
      return props.columnSelection[column] ?? props.mode;
    }
    function check(item) {
      if (props.columnSelection.length)
        return { checked: props.selected.includes(item.key), mixed: false };
      return selectionState(entry(item), props.index, props.selected);
    }
    function hasChildren(item) {
      return Boolean(item.children?.length);
    }
    function checkable(item, column) {
      const mode = selectionMode(column);
      return mode === "multiple" || mode === "all" || mode === "leaf" && !hasChildren(item);
    }
    function active(item, column) {
      return props.path.includes(item.key) || selectionMode(column) === "single" && props.selected.includes(item.key);
    }
    function activate(item, column) {
      if (entry(item).disabled || item.type) return;
      dismissLabel(item.key);
      if (hasChildren(item)) emit("expand", item.key, column);
      else emit("choose", item.key);
    }
    function changeCheckbox(event, item) {
      emit("toggle", item.key);
      nextTick(() => {
        event.target.checked = check(item).checked;
        event.target.indeterminate = check(item).mixed;
      });
    }
    function focusItem(key) {
      focusKey.value = key;
      nextTick(
        () => [...root.value?.querySelectorAll('[role="treeitem"]') ?? []].find((el) => el.dataset.key === String(key))?.focus()
      );
    }
    function columnItems(column) {
      return columns.value[column].filter((item) => !entry(item).disabled && !item.type);
    }
    function step(item, column, delta) {
      const items = columnItems(column);
      const next = Math.max(
        0,
        Math.min(items.length - 1, items.findIndex((node) => node.key === item.key) + delta)
      );
      if (items[next]) focusItem(items[next].key);
    }
    function keydown(event, item, column) {
      const key = event.key;
      if (![
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
        "Enter",
        " ",
        "Escape"
      ].includes(key))
        return;
      event.preventDefault();
      event.stopPropagation();
      if (key === "Escape") return emit("close");
      if (key === "ArrowDown" || key === "ArrowUp")
        return step(item, column, key === "ArrowDown" ? 1 : -1);
      if (key === "Home" || key === "End") {
        const items = columnItems(column);
        const target = key === "Home" ? items[0] : items.at(-1);
        if (target) focusItem(target.key);
        return;
      }
      if (key === "ArrowLeft" && column > 0) return focusItem(props.path[column - 1]);
      if (key === "ArrowRight" && hasChildren(item)) {
        dismissLabel(item.key);
        emit("expand", item.key, column);
        nextTick(() => {
          const first = item.children.find((node) => !entry(node).disabled && !node.type);
          if (first) focusItem(first.key);
        });
        return;
      }
      if (key === " " && checkable(item, column)) return emit("toggle", item.key);
      if (key === "Enter" || key === " ") activate(item, column);
    }
    function focusFirst() {
      const first = columnItems(0)[0];
      if (first) focusItem(first.key);
    }
    __expose({ focusFirst });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-cascader-panel", { "is-constrained": __props.constrained }]),
        role: "tree",
        "aria-label": __props.label,
        "aria-multiselectable": __props.columnSelection.includes("multiple") || __props.mode !== "single" || void 0
      }, [
        !__props.options.length ? (_openBlock(), _createElementBlock("div", _hoisted_2, " \u6682\u65E0\u6570\u636E ")) : (_openBlock(true), _createElementBlock(
          _Fragment,
          { key: 1 },
          _renderList(columns.value, (column, columnIndex) => {
            return _openBlock(), _createElementBlock("div", {
              key: columnIndex,
              class: "wb-cascader-panel__column",
              role: "group",
              "aria-label": `\u7B2C${columnIndex + 1}\u7EA7`
            }, [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(column, (item) => {
                  return _openBlock(), _createElementBlock(
                    _Fragment,
                    {
                      key: item.key
                    },
                    [
                      item.type === "divider" ? (_openBlock(), _createElementBlock("div", _hoisted_4)) : item.type === "group" ? (_openBlock(), _createElementBlock(
                        "div",
                        _hoisted_5,
                        _toDisplayString(item.label),
                        1
                        /* TEXT */
                      )) : (_openBlock(), _createElementBlock("div", {
                        key: 2,
                        class: _normalizeClass(["wb-cascader-panel__option", { "is-active": active(item, columnIndex), "is-disabled": entry(item).disabled }]),
                        role: "treeitem",
                        "aria-label": __props.columnSelection.length ? item.label : void 0,
                        "data-key": item.key,
                        "aria-level": columnIndex + 1,
                        "aria-expanded": hasChildren(item) ? props.path.includes(item.key) : void 0,
                        "aria-selected": selectionMode(columnIndex) === "single" ? __props.selected.includes(item.key) : void 0,
                        "aria-checked": checkable(item, columnIndex) ? check(item).mixed ? "mixed" : check(item).checked : void 0,
                        "aria-disabled": entry(item).disabled || void 0,
                        tabindex: entry(item).disabled ? -1 : focusKey.value === item.key || !focusKey.value && columnItems(0)[0]?.key === item.key ? 0 : -1,
                        onClick: ($event) => activate(item, columnIndex),
                        onPointerdown: ($event) => dismissLabel(item.key),
                        onPointerleave: ($event) => leaveLabel(item.key),
                        onFocus: ($event) => focusLabel(item.key),
                        onBlur: ($event) => blurLabel(item.key),
                        onKeydown: ($event) => keydown($event, item, columnIndex)
                      }, [
                        checkable(item, columnIndex) ? (_openBlock(), _createElementBlock("label", {
                          key: 0,
                          class: "wb-cascader-panel__checkbox",
                          onClick: _cache[0] || (_cache[0] = _withModifiers(() => {
                          }, ["stop"]))
                        }, [
                          _createElementVNode("input", {
                            type: "checkbox",
                            "aria-label": `\u9009\u62E9${item.label}`,
                            checked: check(item).checked,
                            indeterminate: check(item).mixed,
                            disabled: entry(item).disabled,
                            tabindex: "-1",
                            onChange: ($event) => changeCheckbox($event, item)
                          }, null, 40, _hoisted_7),
                          _createVNode(ChoiceMark, {
                            checked: check(item).checked,
                            indeterminate: check(item).mixed,
                            disabled: entry(item).disabled
                          }, null, 8, ["checked", "indeterminate", "disabled"])
                        ])) : _createCommentVNode("v-if", true),
                        _createElementVNode("span", _hoisted_8, [
                          _createVNode(WorkbenchTooltip, {
                            content: item.label,
                            open: dismissedLabelKey.value !== item.key && (focusedLabelKey.value === item.key || hoveredLabelKey.value === item.key),
                            "overflow-only": "",
                            placement: "top-start",
                            "onUpdate:open": ($event) => setTooltipHover(item.key, $event)
                          }, {
                            trigger: _withCtx(({ aria }) => [
                              _createElementVNode(
                                "span",
                                _mergeProps({ class: "wb-cascader-panel__text" }, { ref_for: true }, aria),
                                _toDisplayString(item.label),
                                17
                                /* TEXT, FULL_PROPS */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["content", "open", "onUpdate:open"])
                        ]),
                        item.description ? (_openBlock(), _createElementBlock("span", {
                          key: 1,
                          class: "wb-cascader-panel__description",
                          title: item.description
                        }, _toDisplayString(item.description), 9, _hoisted_9)) : _createCommentVNode("v-if", true),
                        hasChildren(item) ? (_openBlock(), _createBlock(WorkbenchIcon, {
                          key: 2,
                          name: "\u7BAD\u5934/\u5C3A\u5BF8=10, \u65B9\u5411=\u53F3\u7BAD\u5934",
                          size: 10,
                          color: entry(item).disabled ? "var(--wb-color-icon-disabled)" : "var(--wb-color-icon-primary)"
                        }, null, 8, ["color"])) : selectionMode(columnIndex) === "single" && __props.selected.includes(item.key) ? (_openBlock(), _createBlock(WorkbenchIcon, {
                          key: 3,
                          name: "\u5B8C\u6210_14px",
                          color: "var(--wb-color-icon-primary)"
                        })) : _createCommentVNode("v-if", true)
                      ], 42, _hoisted_6))
                    ],
                    64
                    /* STABLE_FRAGMENT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 8, _hoisted_3);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-fd283585" });
