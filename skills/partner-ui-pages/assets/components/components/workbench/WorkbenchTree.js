import { openBlock as _openBlock, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createElementBlock as _createElementBlock, renderSlot as _renderSlot, createVNode as _createVNode, normalizeClass as _normalizeClass, renderList as _renderList, Fragment as _Fragment, withModifiers as _withModifiers, vModelText as _vModelText, withKeys as _withKeys, withDirectives as _withDirectives, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = {
  key: 0,
  class: "wb-tree__header"
};
const _hoisted_3 = { class: "wb-tree__heading" };
const _hoisted_4 = ["id"];
const _hoisted_5 = {
  key: 1,
  class: "wb-tree__count"
};
const _hoisted_6 = {
  key: 1,
  class: "wb-tree__search-wrap"
};
const _hoisted_7 = ["value", "disabled", "placeholder", "aria-label"];
const _hoisted_8 = ["disabled"];
const _hoisted_9 = ["aria-label", "aria-multiselectable", "aria-disabled", "tabindex"];
const _hoisted_10 = ["data-key", "aria-level", "aria-posinset", "aria-setsize", "aria-label", "aria-expanded", "aria-selected", "aria-checked", "aria-disabled", "tabindex", "onFocus", "onKeydown", "onClick", "onDblclick"];
const _hoisted_11 = ["disabled", "aria-label", "onClick"];
const _hoisted_12 = {
  key: 1,
  class: "wb-tree__toggle-space",
  "aria-hidden": "true"
};
const _hoisted_13 = { class: "wb-tree__content" };
const _hoisted_14 = ["checked", ".indeterminate", "disabled", "aria-label", "onChange"];
const _hoisted_15 = ["aria-label", "aria-invalid", "aria-describedby"];
const _hoisted_16 = ["title"];
const _hoisted_17 = { key: 0 };
const _hoisted_18 = {
  key: 4,
  class: "wb-tree__node-count"
};
const _hoisted_19 = {
  key: 5,
  class: "wb-tree__actions"
};
const _hoisted_20 = ["aria-label", "onClick"];
const _hoisted_21 = ["aria-label", "onClick"];
const _hoisted_22 = ["aria-label", "onClick"];
const _hoisted_23 = {
  key: 0,
  class: "wb-tree__empty",
  role: "status"
};
const _hoisted_24 = ["id"];
import "../shared/disclosure-motion.css";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, ref, useId, watch } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import ChoiceMark from "../choice/ChoiceMark.vue";
const __sfc_main__ = {
  __name: "WorkbenchTree",
  props: {
    items: { type: Array, default: () => [] },
    modelValue: { type: [String, Number], default: void 0 },
    expandedKeys: { type: Array, default: void 0 },
    defaultExpandedKeys: { type: Array, default: () => [] },
    checkedKeys: { type: Array, default: void 0 },
    defaultCheckedKeys: { type: Array, default: () => [] },
    title: { type: String, default: "\u4E3B\u6807\u9898" },
    titleIcon: { type: String, default: "" },
    showCount: Boolean,
    searchable: { type: Boolean, default: true },
    search: { type: String, default: void 0 },
    placeholder: { type: String, default: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9" },
    checkable: Boolean,
    checkStrictly: Boolean,
    showLine: Boolean,
    showIcons: Boolean,
    editable: { type: Boolean, default: true },
    showActions: { type: Boolean, default: true },
    disabled: Boolean,
    label: { type: String, default: "\u7ED3\u6784\u6811" },
    emptyText: { type: String, default: "\u6682\u65E0\u6570\u636E" }
  },
  emits: ["update:modelValue", "update:expandedKeys", "update:checkedKeys", "update:search", "select", "expand", "check", "rename", "delete", "more"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const treeId = `wb-tree-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
    const root = ref(null);
    const localExpanded = ref([...props.defaultExpandedKeys]);
    const localChecked = ref([...props.defaultCheckedKeys]);
    const localSearch = ref("");
    const localSelected = ref(null);
    const selectedKey = computed(() => props.modelValue === void 0 ? localSelected.value : props.modelValue);
    const expanded = computed(() => new Set(props.expandedKeys ?? localExpanded.value));
    const checked = computed(() => new Set(props.checkedKeys ?? localChecked.value));
    const searchValue = computed(() => props.search ?? localSearch.value);
    const query = computed(() => searchValue.value.trim().toLocaleLowerCase());
    const focusedKey = ref(null);
    const editingKey = ref(null);
    const editValue = ref("");
    const editError = ref("");
    const overrides = ref(/* @__PURE__ */ new Map());
    const meta = computed(() => {
      const byKey = /* @__PURE__ */ new Map();
      function visit(items, parent = null, level = 1, inheritedDisabled = false) {
        items.forEach((node, index) => {
          const entry = {
            node,
            key: node.key,
            parent,
            level,
            index,
            size: items.length,
            disabled: props.disabled || inheritedDisabled || Boolean(node.disabled),
            children: []
          };
          byKey.set(node.key, entry);
          entry.children = visit(node.children ?? [], entry, level + 1, entry.disabled);
        });
        return items.map((node) => byKey.get(node.key));
      }
      const roots = visit(props.items);
      return { byKey, roots };
    });
    function titleOf(entry) {
      return overrides.value.get(entry.key) ?? entry.node.label ?? entry.node.title ?? String(entry.key);
    }
    const matching = computed(() => {
      if (!query.value) return null;
      const keep = /* @__PURE__ */ new Set();
      for (const entry of meta.value.byKey.values()) {
        if (!titleOf(entry).toLocaleLowerCase().includes(query.value)) continue;
        for (let ancestor = entry; ancestor; ancestor = ancestor.parent) keep.add(ancestor.key);
      }
      return keep;
    });
    const rows = computed(() => {
      const result = [];
      function flatten(entries, lines = []) {
        const visible = entries.filter((entry) => !matching.value || matching.value.has(entry.key));
        visible.forEach((entry, index) => {
          const isLast = index === visible.length - 1;
          const isExpanded = query.value ? entry.children.some((child) => matching.value.has(child.key)) : expanded.value.has(entry.key);
          result.push({ ...entry, isExpanded, isLast, lines });
          if (isExpanded) flatten(entry.children, [...lines, !isLast]);
        });
      }
      flatten(meta.value.roots);
      return result;
    });
    const enabledRows = computed(() => rows.value.filter((row) => !row.disabled));
    const tabKey = computed(() => enabledRows.value.some((row) => row.key === focusedKey.value) ? focusedKey.value : enabledRows.value.find((row) => row.key === selectedKey.value)?.key ?? enabledRows.value[0]?.key);
    const checkStates = computed(() => {
      const states = /* @__PURE__ */ new Map();
      function state(entry) {
        const children = entry.children.filter((child) => !child.disabled).map(state);
        const result = props.checkStrictly || !children.length ? { checked: checked.value.has(entry.key), mixed: false } : { checked: children.every((child) => child.checked), mixed: children.some((child) => child.checked || child.mixed) && !children.every((child) => child.checked) };
        states.set(entry.key, result);
        for (const child of entry.children.filter((child2) => child2.disabled)) state(child);
        return result;
      }
      meta.value.roots.forEach(state);
      return states;
    });
    function rowElement(key) {
      return [...root.value?.querySelectorAll('[role="treeitem"]') ?? []].find((element) => element.dataset.key === String(key));
    }
    async function focusRow(key) {
      focusedKey.value = key;
      await nextTick();
      rowElement(key)?.focus();
    }
    function select(entry) {
      if (entry.disabled || editingKey.value !== null) return;
      focusedKey.value = entry.key;
      localSelected.value = entry.key;
      emit("update:modelValue", entry.key);
      emit("select", entry.key, entry.node);
    }
    function toggle(entry, force) {
      if (entry.disabled || !entry.children.length || query.value) return;
      const keys = new Set(expanded.value);
      const open = force ?? !keys.has(entry.key);
      if (open) keys.add(entry.key);
      else keys.delete(entry.key);
      localExpanded.value = [...keys];
      emit("update:expandedKeys", [...keys]);
      emit("expand", entry.key, open, entry.node);
      if (!open) {
        let focused = meta.value.byKey.get(focusedKey.value);
        while (focused?.parent) {
          if (focused.parent.key === entry.key) {
            focusRow(entry.key);
            break;
          }
          focused = focused.parent;
        }
      }
    }
    function check(entry, event) {
      if (entry.disabled) return;
      const next = new Set(checked.value);
      const value = !checkStates.value.get(entry.key)?.checked;
      function set(node) {
        if (node.disabled) return;
        if (value) next.add(node.key);
        else next.delete(node.key);
        if (!props.checkStrictly) node.children.forEach(set);
      }
      set(entry);
      if (!props.checkStrictly) {
        let normalize = function(node) {
          if (node.disabled) return next.has(node.key);
          const children = node.children.filter((child) => !child.disabled);
          const states = children.map(normalize);
          if (children.length) {
            if (states.every(Boolean)) next.add(node.key);
            else next.delete(node.key);
          }
          return next.has(node.key);
        };
        meta.value.roots.forEach(normalize);
      }
      localChecked.value = [...next];
      emit("update:checkedKeys", [...next]);
      emit("check", [...next], { key: entry.key, checked: value, node: entry.node });
      select(entry);
      if (event) nextTick(() => {
        event.target.checked = Boolean(checkStates.value.get(entry.key)?.checked);
        event.target.indeterminate = Boolean(checkStates.value.get(entry.key)?.mixed);
      });
    }
    function searchChanged(value) {
      localSearch.value = value;
      emit("update:search", value);
    }
    async function startEdit(entry) {
      if (entry.disabled || !props.editable || entry.node.editable === false) return;
      editingKey.value = entry.key;
      editValue.value = titleOf(entry);
      editError.value = "";
      await nextTick();
      const input = root.value?.querySelector(".wb-tree__editor");
      input?.focus();
      input?.select();
    }
    function cancelEdit() {
      const key = editingKey.value;
      editingKey.value = null;
      editError.value = "";
      if (key !== null) focusRow(key);
    }
    function commitEdit() {
      const entry = meta.value.byKey.get(editingKey.value);
      if (!entry) return;
      const value = editValue.value.trim();
      if (!value) {
        editError.value = "\u8282\u70B9\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A";
        return;
      }
      const previous = titleOf(entry);
      overrides.value = new Map(overrides.value).set(entry.key, value);
      editingKey.value = null;
      editError.value = "";
      if (value !== previous) emit("rename", entry.key, value, entry.node);
      focusRow(entry.key);
    }
    function navigateKey(event, row) {
      const current = enabledRows.value.findIndex((entry) => entry.key === row.key);
      let target;
      switch (event.key) {
        case "ArrowDown":
          target = enabledRows.value[Math.min(current + 1, enabledRows.value.length - 1)];
          break;
        case "ArrowUp":
          target = enabledRows.value[Math.max(current - 1, 0)];
          break;
        case "Home":
          target = enabledRows.value[0];
          break;
        case "End":
          target = enabledRows.value.at(-1);
          break;
        case "ArrowRight":
          if (!row.isExpanded) toggle(row, true);
          else target = enabledRows.value.find((entry) => entry.parent?.key === row.key);
          break;
        case "ArrowLeft":
          if (row.isExpanded && !query.value) toggle(row, false);
          else target = row.parent;
          break;
        default:
          return false;
      }
      event.preventDefault();
      if (target && !target.disabled) focusRow(target.key);
      return true;
    }
    function onKeydown(event, row) {
      const checkbox = event.target.matches('input[type="checkbox"]');
      if (event.target !== event.currentTarget && !checkbox || event.isComposing || row.disabled) return;
      if (navigateKey(event, row)) return;
      if (event.key === "Enter") select(row);
      else if (event.key === " " && !checkbox) {
        if (props.checkable) check(row);
        else select(row);
      } else if (event.key === "F2") startEdit(row);
      else return;
      event.preventDefault();
    }
    function highlighted(entry) {
      const text = titleOf(entry);
      const index = query.value ? text.toLocaleLowerCase().indexOf(query.value) : -1;
      return index < 0 ? [text, "", ""] : [text.slice(0, index), text.slice(index, index + query.value.length), text.slice(index + query.value.length)];
    }
    watch(() => props.items, () => {
      overrides.value = /* @__PURE__ */ new Map();
      if (!meta.value.byKey.has(editingKey.value)) editingKey.value = null;
    });
    watch([rows, () => props.disabled], () => {
      if (editingKey.value !== null && !rows.value.some((row) => row.key === editingKey.value && !row.disabled)) editingKey.value = null;
    });
    __expose({ focus: () => focusRow(tabKey.value), startEdit: (key) => {
      const entry = meta.value.byKey.get(key);
      if (entry) startEdit(entry);
    } });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-tree", { "wb-tree--lines": __props.showLine, "wb-tree--disabled": __props.disabled }]),
        "aria-label": __props.label
      }, [
        __props.title ? (_openBlock(), _createElementBlock("header", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, [
            __props.titleIcon ? (_openBlock(), _createBlock(WorkbenchIcon, {
              key: 0,
              name: __props.titleIcon
            }, null, 8, ["name"])) : _createCommentVNode("v-if", true),
            _createElementVNode("h3", {
              id: `${treeId}-title`
            }, _toDisplayString(__props.title), 9, _hoisted_4),
            __props.showCount ? (_openBlock(), _createElementBlock(
              "span",
              _hoisted_5,
              _toDisplayString(meta.value.byKey.size),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            _renderSlot(_ctx.$slots, "title-actions")
          ])
        ])) : _createCommentVNode("v-if", true),
        __props.searchable ? (_openBlock(), _createElementBlock("div", _hoisted_6, [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass(["wb-tree__search", { "wb-tree__search--disabled": __props.disabled }])
            },
            [
              _createVNode(WorkbenchIcon, {
                name: "\u641C\u7D22_14px",
                color: __props.disabled ? "var(--wb-color-icon-disabled)" : "var(--wb-color-icon-secondary)"
              }, null, 8, ["color"]),
              _createElementVNode("input", {
                type: "search",
                value: searchValue.value,
                disabled: __props.disabled,
                placeholder: __props.placeholder,
                "aria-label": `\u641C\u7D22${__props.label}`,
                onInput: _cache[0] || (_cache[0] = ($event) => searchChanged($event.target.value))
              }, null, 40, _hoisted_7),
              searchValue.value ? (_openBlock(), _createElementBlock("button", {
                key: 0,
                type: "button",
                disabled: __props.disabled,
                "aria-label": "\u6E05\u9664\u6811\u641C\u7D22",
                onClick: _cache[1] || (_cache[1] = ($event) => searchChanged(""))
              }, [
                _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_14px" })
              ], 8, _hoisted_8)) : _createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode("div", {
          class: "wb-tree__nodes",
          role: "tree",
          "aria-label": __props.label,
          "aria-multiselectable": __props.checkable || void 0,
          "aria-disabled": __props.disabled || void 0,
          tabindex: enabledRows.value.length ? void 0 : 0
        }, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(rows.value, (row) => {
              return _openBlock(), _createElementBlock("div", {
                key: row.key,
                class: _normalizeClass(["wb-tree__row", { "is-selected": selectedKey.value === row.key, "is-disabled": row.disabled, "is-editing": editingKey.value === row.key }]),
                role: "treeitem",
                "data-key": row.key,
                "aria-level": row.level,
                "aria-posinset": row.index + 1,
                "aria-setsize": row.size,
                "aria-label": titleOf(row),
                "aria-expanded": row.children.length ? row.isExpanded : void 0,
                "aria-selected": selectedKey.value === row.key,
                "aria-checked": __props.checkable ? checkStates.value.get(row.key)?.mixed ? "mixed" : Boolean(checkStates.value.get(row.key)?.checked) : void 0,
                "aria-disabled": row.disabled || void 0,
                tabindex: !row.disabled && row.key === tabKey.value ? 0 : -1,
                onFocus: _withModifiers(($event) => focusedKey.value = row.key, ["self"]),
                onKeydown: ($event) => onKeydown($event, row),
                onClick: ($event) => select(row),
                onDblclick: ($event) => startEdit(row)
              }, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(row.lines, (_, index) => {
                    return _openBlock(), _createElementBlock("span", {
                      key: index,
                      class: "wb-tree__indent",
                      "aria-hidden": "true"
                    }, [
                      __props.showLine ? (_openBlock(), _createElementBlock(
                        "span",
                        {
                          key: 0,
                          class: _normalizeClass(["wb-tree__guide", { "is-continuing": index < row.lines.length - 1 && row.lines[index + 1], "is-branch": index === row.lines.length - 1, "is-last": row.isLast }])
                        },
                        null,
                        2
                        /* CLASS */
                      )) : _createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                row.children.length ? (_openBlock(), _createElementBlock("button", {
                  key: 0,
                  class: "wb-tree__toggle",
                  type: "button",
                  tabindex: "-1",
                  disabled: row.disabled || Boolean(query.value),
                  "aria-label": `${row.isExpanded ? "\u6536\u8D77" : "\u5C55\u5F00"}${titleOf(row)}`,
                  onDblclick: _cache[2] || (_cache[2] = _withModifiers(() => {
                  }, ["stop"])),
                  onClick: _withModifiers(($event) => toggle(row), ["stop"])
                }, [
                  _createVNode(WorkbenchIcon, {
                    name: "/ic_arrow_right_line#2:142",
                    class: _normalizeClass(["wb-disclosure-icon wb-disclosure-icon--branch", { "is-expanded": row.isExpanded }]),
                    size: 8
                  }, null, 8, ["class"])
                ], 40, _hoisted_11)) : (_openBlock(), _createElementBlock("span", _hoisted_12)),
                _createElementVNode("div", _hoisted_13, [
                  __props.checkable && editingKey.value !== row.key ? (_openBlock(), _createElementBlock(
                    "label",
                    {
                      key: 0,
                      class: "wb-tree__check",
                      onClick: _cache[3] || (_cache[3] = _withModifiers(() => {
                      }, ["stop"])),
                      onDblclick: _cache[4] || (_cache[4] = _withModifiers(() => {
                      }, ["stop"]))
                    },
                    [
                      _createElementVNode("input", {
                        type: "checkbox",
                        tabindex: "-1",
                        checked: Boolean(checkStates.value.get(row.key)?.checked),
                        ".indeterminate": Boolean(checkStates.value.get(row.key)?.mixed),
                        disabled: row.disabled,
                        "aria-label": `\u9009\u62E9${titleOf(row)}`,
                        onChange: ($event) => check(row, $event)
                      }, null, 40, _hoisted_14),
                      _createVNode(ChoiceMark, {
                        checked: Boolean(checkStates.value.get(row.key)?.checked),
                        indeterminate: Boolean(checkStates.value.get(row.key)?.mixed),
                        disabled: row.disabled
                      }, null, 8, ["checked", "indeterminate", "disabled"])
                    ],
                    32
                    /* NEED_HYDRATION */
                  )) : _createCommentVNode("v-if", true),
                  __props.showIcons && editingKey.value !== row.key ? (_openBlock(), _createBlock(WorkbenchIcon, {
                    key: 1,
                    name: row.node.icon || "\u6587\u4EF6\u5939/\u5C3A\u5BF8=14",
                    size: 14
                  }, null, 8, ["name"])) : _createCommentVNode("v-if", true),
                  editingKey.value === row.key ? _withDirectives((_openBlock(), _createElementBlock("input", {
                    key: 2,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => editValue.value = $event),
                    class: "wb-tree__editor",
                    "aria-label": `\u7F16\u8F91${titleOf(row)}`,
                    "aria-invalid": Boolean(editError.value),
                    "aria-describedby": editError.value ? `${treeId}-edit-error` : void 0,
                    onClick: _cache[6] || (_cache[6] = _withModifiers(() => {
                    }, ["stop"])),
                    onDblclick: _cache[7] || (_cache[7] = _withModifiers(() => {
                    }, ["stop"])),
                    onKeydown: [
                      _cache[8] || (_cache[8] = _withModifiers(() => {
                      }, ["stop"])),
                      _cache[9] || (_cache[9] = _withKeys(($event) => !$event.isComposing && commitEdit(), ["enter"])),
                      _withKeys(cancelEdit, ["esc"])
                    ],
                    onBlur: cancelEdit
                  }, null, 40, _hoisted_15)), [
                    [_vModelText, editValue.value]
                  ]) : (_openBlock(), _createElementBlock("span", {
                    key: 3,
                    class: "wb-tree__label",
                    title: titleOf(row)
                  }, [
                    _renderSlot(_ctx.$slots, "label", {
                      node: row.node,
                      level: row.level
                    }, () => [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(highlighted(row), (part, index) => {
                          return _openBlock(), _createElementBlock(
                            _Fragment,
                            { key: index },
                            [
                              index === 1 && part ? (_openBlock(), _createElementBlock(
                                "mark",
                                _hoisted_17,
                                _toDisplayString(part),
                                1
                                /* TEXT */
                              )) : (_openBlock(), _createElementBlock(
                                _Fragment,
                                { key: 1 },
                                [
                                  _createTextVNode(
                                    _toDisplayString(part),
                                    1
                                    /* TEXT */
                                  )
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              ))
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ], 8, _hoisted_16)),
                  row.node.count !== void 0 && editingKey.value !== row.key ? (_openBlock(), _createElementBlock(
                    "span",
                    _hoisted_18,
                    _toDisplayString(row.node.count),
                    1
                    /* TEXT */
                  )) : _createCommentVNode("v-if", true),
                  __props.showActions && !row.disabled && editingKey.value !== row.key ? (_openBlock(), _createElementBlock("span", _hoisted_19, [
                    __props.editable && row.node.editable !== false ? (_openBlock(), _createElementBlock("button", {
                      key: 0,
                      type: "button",
                      "aria-label": `\u7F16\u8F91${titleOf(row)}`,
                      onDblclick: _cache[10] || (_cache[10] = _withModifiers(() => {
                      }, ["stop"])),
                      onClick: _withModifiers(($event) => startEdit(row), ["stop"])
                    }, [
                      _createVNode(WorkbenchIcon, { name: "/ic_public_brush_line_14px" })
                    ], 40, _hoisted_20)) : _createCommentVNode("v-if", true),
                    row.node.deletable !== false ? (_openBlock(), _createElementBlock("button", {
                      key: 1,
                      type: "button",
                      "aria-label": `\u5220\u9664${titleOf(row)}`,
                      onDblclick: _cache[11] || (_cache[11] = _withModifiers(() => {
                      }, ["stop"])),
                      onClick: _withModifiers(($event) => emit("delete", row.key, row.node), ["stop"])
                    }, [
                      _createVNode(WorkbenchIcon, { name: "/ic_public_trash_line_14px" })
                    ], 40, _hoisted_21)) : _createCommentVNode("v-if", true),
                    _createElementVNode("button", {
                      type: "button",
                      "aria-label": `${titleOf(row)}\u7684\u66F4\u591A\u64CD\u4F5C`,
                      onDblclick: _cache[12] || (_cache[12] = _withModifiers(() => {
                      }, ["stop"])),
                      onClick: _withModifiers(($event) => emit("more", row.key, row.node), ["stop"])
                    }, [
                      _createVNode(WorkbenchIcon, { name: "\u66F4\u591A_14px" })
                    ], 40, _hoisted_22)
                  ])) : _createCommentVNode("v-if", true)
                ])
              ], 42, _hoisted_10);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          !rows.value.length ? (_openBlock(), _createElementBlock(
            "p",
            _hoisted_23,
            _toDisplayString(query.value ? "\u672A\u627E\u5230\u5339\u914D\u8282\u70B9" : __props.emptyText),
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true)
        ], 8, _hoisted_9),
        editError.value ? (_openBlock(), _createElementBlock("p", {
          key: 2,
          id: `${treeId}-edit-error`,
          class: "wb-tree__error",
          role: "alert"
        }, _toDisplayString(editError.value), 9, _hoisted_24)) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-aa2950d7" });
