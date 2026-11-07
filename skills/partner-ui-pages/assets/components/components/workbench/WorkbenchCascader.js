import { unref as _unref, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, withModifiers as _withModifiers, createBlock as _createBlock, withKeys as _withKeys, createVNode as _createVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["tabindex", "aria-label", "aria-disabled", "aria-expanded", "aria-controls"];
const _hoisted_2 = {
  key: 0,
  class: "wb-cascader__placeholder"
};
const _hoisted_3 = ["disabled", "aria-label", "aria-expanded", "aria-controls", "aria-describedby"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["title"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = ["id"];
import { useFormDisabled } from "../form/useFormDisabled.js";
import "../shared/disclosure-motion.css";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchTag from "../tag/WorkbenchTag.vue";
import CascaderPanel from "./CascaderPanel.vue";
import CascaderOverflow from "./CascaderOverflow.vue";
import { indexOptions, selectableLeaves } from "./cascaderModel.js";
const __sfc_main__ = {
  __name: "WorkbenchCascader",
  props: {
    options: { type: Array, required: true },
    modelValue: { type: [String, Number, Array], default: void 0 },
    defaultValue: { type: [String, Number, Array], default: null },
    mode: {
      type: String,
      default: "single",
      validator: (value) => ["single", "leaf", "all"].includes(value)
    },
    size: { type: String, default: "medium" },
    disabled: Boolean,
    label: { type: String, default: "\u7EA7\u8054\u9009\u62E9\u5668" },
    placeholder: { type: String, default: "\u8BF7\u9009\u62E9" },
    open: { type: Boolean, default: void 0 },
    defaultOpen: Boolean,
    defaultExpandedKeys: { type: Array, default: () => [] },
    inlinePanel: Boolean,
    clearable: Boolean,
    tagRemovable: Boolean
  },
  emits: [
    "update:modelValue",
    "update:open",
    "change",
    "expand",
    "remove",
    "clear"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const id = useId();
    const overflowPanel = ref(null);
    const overflowAnchor = ref(null);
    const root = ref(null), trigger = ref(null), values = ref(null), popup = ref(null), panel = ref(null), measure = ref(null);
    const localValue = ref(props.defaultValue);
    const localOpen = ref(props.defaultOpen);
    const path = ref([...props.defaultExpandedKeys]);
    const visibleCount = ref(0), overflowHover = ref(false);
    const index = computed(() => indexOptions(props.options));
    const multiple = computed(() => props.mode !== "single");
    const value = computed(
      () => props.modelValue === void 0 ? localValue.value : props.modelValue
    );
    const selected = computed(() => {
      const keys = Array.isArray(value.value) ? value.value : value.value == null ? [] : [value.value];
      return [...new Set(keys)].filter((key) => {
        const item = index.value.get(key);
        return item && !item.type && !item.children?.length;
      });
    });
    const selectedItems = computed(() => selected.value.map((key) => index.value.get(key)));
    const expanded = computed(
      () => !disabled.value && (props.open === void 0 ? localOpen.value : props.open)
    );
    const visibleItems = computed(() => selectedItems.value.slice(0, visibleCount.value));
    const hiddenItems = computed(() => selectedItems.value.slice(visibleCount.value));
    let resizeObserver;
    function setOpen(next) {
      if (disabled.value) return;
      if (props.open === void 0) localOpen.value = next;
      emit("update:open", next);
    }
    function publish(keys) {
      const next = multiple.value ? keys : keys[0] ?? null;
      if (props.modelValue === void 0) localValue.value = next;
      emit("update:modelValue", next);
      emit(
        "change",
        next,
        keys.map((key) => index.value.get(key)?.path ?? [])
      );
    }
    function expand(key, column) {
      path.value = [...path.value.slice(0, column), key];
      emit("expand", key, [...path.value]);
    }
    function choose(key) {
      const item = index.value.get(key);
      if (!item || item.disabled || item.type || item.children?.length) return;
      if (multiple.value) toggle(key);
      else {
        publish([key]);
        path.value = item.path.slice(0, -1);
        setOpen(false);
        trigger.value?.focus();
      }
    }
    function toggle(key) {
      if (disabled.value) return;
      const leaves = selectableLeaves(index.value.get(key), index.value);
      if (!leaves.length) return;
      const remove = leaves.every((leaf) => selected.value.includes(leaf));
      const result = new Set(selected.value);
      leaves.forEach((leaf) => remove ? result.delete(leaf) : result.add(leaf));
      publish([...index.value.keys()].filter((leaf) => result.has(leaf)));
    }
    function removeKeys(keys) {
      if (disabled.value) return;
      const removable = keys.filter((key) => !index.value.get(key)?.disabled);
      publish(selected.value.filter((key) => !removable.includes(key)));
      emit("remove", removable);
    }
    function clear() {
      removeKeys(selected.value);
      emit("clear");
    }
    function close() {
      setOpen(false);
      trigger.value?.focus();
    }
    function keydown(event) {
      if (disabled.value) return;
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        setOpen(true);
        nextTick(() => panel.value?.focusFirst());
      } else if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "Backspace" && props.tagRemovable && multiple.value && selected.value.length) {
        event.preventDefault();
        removeKeys(selected.value.slice(-1));
      }
    }
    function fitTags() {
      if (!values.value || !measure.value) return;
      const tags = [...measure.value.querySelectorAll("[data-measure-tag]")];
      const gap = parseFloat(getComputedStyle(values.value).gap) || 0;
      const available = values.value.clientWidth;
      let count = tags.length;
      while (count > 0) {
        const widths = tags.slice(0, count).reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
        const hidden = tags.length - count;
        const overflow = hidden ? measure.value.querySelector("[data-measure-overflow]").getBoundingClientRect().width : 0;
        if (widths + Math.max(0, count - 1) * gap + (hidden ? gap + overflow : 0) <= available) break;
        count -= 1;
      }
      visibleCount.value = count;
    }
    function positionPopup() {
      if (!expanded.value || props.inlinePanel || !popup.value || !trigger.value) return;
      const rect = trigger.value.getBoundingClientRect();
      const style = getComputedStyle(root.value);
      for (const name of style)
        if (name.startsWith("--wb-")) popup.value.style.setProperty(name, style.getPropertyValue(name));
      popup.value.style.fontFamily = style.fontFamily;
      const edge = parseFloat(style.getPropertyValue("--wb-asset-wb-cascader-viewport-edge")) || 8;
      const gap = parseFloat(style.getPropertyValue("--wb-asset-wb-cascader-popup-gap")) || 4;
      const box = popup.value.getBoundingClientRect();
      const left = Math.max(
        edge,
        Math.min(
          rect.left,
          window.innerWidth - Math.min(rect.width, window.innerWidth - edge * 2) - edge
        )
      );
      popup.value.style.left = `${left}px`;
      popup.value.style.maxWidth = `${Math.max(0, window.innerWidth - left - edge)}px`;
      popup.value.style.top = `${rect.bottom + gap + box.height > window.innerHeight - edge && rect.top > box.height ? rect.top - box.height - gap : rect.bottom + gap}px`;
      popup.value.style.maxHeight = `${Math.max(0, window.innerHeight - edge * 2)}px`;
    }
    function within(target) {
      return root.value?.contains(target) || popup.value?.contains(target) || overflowPanel.value?.contains(target);
    }
    function outside(event) {
      if (!within(event.target)) {
        setOpen(false);
        overflowHover.value = false;
      }
    }
    function focusout(event) {
      if (!within(event.relatedTarget)) {
        setOpen(false);
        overflowHover.value = false;
      }
    }
    watch([selected, () => props.mode, () => props.tagRemovable], () => nextTick(fitTags));
    watch(
      expanded,
      (next) => {
        if (next && !path.value.length && selected.value.length)
          path.value = index.value.get(selected.value[0]).path.slice(0, -1);
        nextTick(positionPopup);
      },
      { immediate: true }
    );
    watch(
      path,
      () => nextTick(() => {
        positionPopup();
        if (popup.value) popup.value.scrollLeft = popup.value.scrollWidth;
      })
    );
    watch(index, () => {
      path.value = path.value.filter((key) => index.value.has(key));
    });
    onMounted(() => {
      resizeObserver = new ResizeObserver(() => {
        fitTags();
        positionPopup();
      });
      if (values.value) resizeObserver.observe(values.value);
      if (measure.value) resizeObserver.observe(measure.value);
      document.addEventListener("pointerdown", outside);
      window.addEventListener("resize", positionPopup);
      window.addEventListener("scroll", positionPopup, true);
      nextTick(() => {
        fitTags();
        positionPopup();
      });
    });
    onBeforeUnmount(() => {
      resizeObserver?.disconnect();
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", positionPopup);
      window.removeEventListener("scroll", positionPopup, true);
    });
    __expose({ focus: () => trigger.value?.focus(), close });
    watch(disabled, (value2) => {
      if (value2) {
        localOpen.value = false;
        overflowHover.value = false;
      }
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          ref_key: "root",
          ref: root,
          class: _normalizeClass(["wb-cascader", [
            `wb-cascader--${__props.size}`,
            {
              "is-disabled": _unref(disabled),
              "is-open": expanded.value,
              "is-multiple": multiple.value && selected.value.length,
              "is-inline": __props.inlinePanel
            }
          ]]),
          onFocusout: focusout
        },
        [
          _createElementVNode("div", {
            ref_key: "trigger",
            ref: trigger,
            class: "wb-cascader__trigger",
            role: "combobox",
            tabindex: _unref(disabled) ? -1 : 0,
            "aria-label": __props.label,
            "aria-disabled": _unref(disabled) || void 0,
            "aria-haspopup": "tree",
            "aria-expanded": expanded.value,
            "aria-controls": expanded.value ? `${_unref(id)}-panel` : void 0,
            onClick: _cache[9] || (_cache[9] = ($event) => setOpen(!expanded.value)),
            onKeydown: _withModifiers(keydown, ["self"])
          }, [
            _createElementVNode(
              "div",
              {
                ref_key: "values",
                ref: values,
                class: "wb-cascader__values"
              },
              [
                !selected.value.length ? (_openBlock(), _createElementBlock(
                  "span",
                  _hoisted_2,
                  _toDisplayString(__props.placeholder),
                  1
                  /* TEXT */
                )) : multiple.value ? (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    (_openBlock(true), _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(visibleItems.value, (item) => {
                        return _openBlock(), _createBlock(WorkbenchTag, {
                          key: item.key,
                          label: item.label,
                          action: __props.tagRemovable ? "remove" : "none",
                          disabled: _unref(disabled) || item.disabled,
                          onClick: _cache[0] || (_cache[0] = _withModifiers(() => {
                          }, ["stop"])),
                          onRemove: ($event) => removeKeys([item.key])
                        }, null, 8, ["label", "action", "disabled", "onRemove"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    hiddenItems.value.length ? (_openBlock(), _createElementBlock(
                      "span",
                      {
                        key: 0,
                        ref_key: "overflowAnchor",
                        ref: overflowAnchor,
                        class: "wb-cascader__overflow-group wb-tag-surface"
                      },
                      [
                        hiddenItems.value.length ? (_openBlock(), _createElementBlock("button", {
                          key: 0,
                          type: "button",
                          class: "wb-cascader__overflow",
                          disabled: _unref(disabled),
                          "aria-label": `\u53E6\u6709${hiddenItems.value.length}\u4E2A\u5DF2\u9009\u9879`,
                          "aria-expanded": overflowHover.value,
                          "aria-controls": `${_unref(id)}-overflow`,
                          "aria-describedby": !__props.tagRemovable && overflowHover.value ? `${_unref(id)}-overflow` : void 0,
                          onClick: _cache[1] || (_cache[1] = _withModifiers(($event) => overflowHover.value = true, ["stop"])),
                          onMouseenter: _cache[2] || (_cache[2] = ($event) => overflowHover.value = true),
                          onFocus: _cache[3] || (_cache[3] = ($event) => overflowHover.value = true),
                          onKeydown: [
                            _cache[4] || (_cache[4] = _withKeys(_withModifiers(($event) => overflowHover.value = false, ["stop", "prevent"]), ["esc"])),
                            _cache[5] || (_cache[5] = _withModifiers(() => {
                            }, ["stop"]))
                          ]
                        }, " +" + _toDisplayString(hiddenItems.value.length), 41, _hoisted_3)) : _createCommentVNode("v-if", true),
                        __props.tagRemovable ? (_openBlock(), _createElementBlock("button", {
                          key: 1,
                          class: "wb-tag-surface__remove",
                          type: "button",
                          "aria-label": "\u6E05\u9664\u8D85\u51FA\u90E8\u5206\u5DF2\u9009\u9879",
                          disabled: _unref(disabled) || hiddenItems.value.every((item) => item.disabled),
                          onClick: _cache[6] || (_cache[6] = _withModifiers(($event) => removeKeys(hiddenItems.value.map((item) => item.key)), ["stop"])),
                          onKeydown: _cache[7] || (_cache[7] = _withModifiers(() => {
                          }, ["stop"]))
                        }, [
                          _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_8px" })
                        ], 40, _hoisted_4)) : _createCommentVNode("v-if", true)
                      ],
                      512
                      /* NEED_PATCH */
                    )) : _createCommentVNode("v-if", true)
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )) : (_openBlock(), _createElementBlock("span", {
                  key: 2,
                  class: "wb-cascader__text",
                  title: selectedItems.value[0].label
                }, _toDisplayString(selectedItems.value[0].label), 9, _hoisted_5))
              ],
              512
              /* NEED_PATCH */
            ),
            __props.clearable && selected.value.length ? (_openBlock(), _createElementBlock("button", {
              key: 0,
              class: "wb-cascader__clear",
              type: "button",
              "aria-label": "\u6E05\u7A7A\u5DF2\u9009\u9879",
              disabled: _unref(disabled),
              onClick: _withModifiers(clear, ["stop"]),
              onKeydown: _cache[8] || (_cache[8] = _withModifiers(() => {
              }, ["stop"]))
            }, [
              _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_10px" })
            ], 40, _hoisted_6)) : _createCommentVNode("v-if", true),
            _createVNode(WorkbenchIcon, {
              class: _normalizeClass(["wb-cascader__arrow wb-disclosure-icon", { "is-expanded": expanded.value }]),
              name: "\u7BAD\u5934/\u5C3A\u5BF8=10, \u65B9\u5411=\u4E0B\u7BAD\u5934",
              size: 10,
              color: _unref(disabled) ? "var(--wb-color-icon-disabled)" : "var(--wb-color-icon-primary)"
            }, null, 8, ["class", "color"])
          ], 40, _hoisted_1),
          multiple.value ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              ref_key: "measure",
              ref: measure,
              class: "wb-cascader__measure",
              "aria-hidden": "true"
            },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(selectedItems.value, (item) => {
                  return _openBlock(), _createBlock(WorkbenchTag, {
                    key: item.key,
                    label: item.label,
                    action: __props.tagRemovable ? "remove" : "none",
                    "data-measure-tag": ""
                  }, null, 8, ["label", "action"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              _createVNode(WorkbenchTag, {
                label: `+${selectedItems.value.length}`,
                action: __props.tagRemovable ? "remove" : "none",
                "data-measure-overflow": ""
              }, null, 8, ["label", "action"])
            ],
            512
            /* NEED_PATCH */
          )) : _createCommentVNode("v-if", true),
          overflowHover.value && hiddenItems.value.length && !_unref(disabled) ? (_openBlock(), _createBlock(CascaderOverflow, {
            key: 1,
            id: `${_unref(id)}-overflow`,
            ref_key: "overflowPanel",
            ref: overflowPanel,
            anchor: overflowAnchor.value,
            items: hiddenItems.value,
            removable: __props.tagRemovable,
            onRemove: removeKeys,
            onDismiss: _cache[10] || (_cache[10] = ($event) => overflowHover.value = false),
            onFocusout: focusout
          }, null, 8, ["id", "anchor", "items", "removable"])) : _createCommentVNode("v-if", true),
          (_openBlock(), _createBlock(_Teleport, {
            to: "body",
            disabled: __props.inlinePanel
          }, [
            expanded.value ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              id: `${_unref(id)}-panel`,
              ref_key: "popup",
              ref: popup,
              class: _normalizeClass(["wb-cascader__popup", { "is-portalled": !__props.inlinePanel }]),
              onFocusout: focusout
            }, [
              _createVNode(CascaderPanel, {
                ref_key: "panel",
                ref: panel,
                constrained: !__props.inlinePanel,
                options: __props.options,
                index: index.value,
                path: path.value,
                selected: selected.value,
                mode: __props.mode,
                label: `${__props.label}\u9009\u9879`,
                onExpand: expand,
                onChoose: choose,
                onToggle: toggle,
                onClose: close
              }, null, 8, ["constrained", "options", "index", "path", "selected", "mode", "label"])
            ], 42, _hoisted_7)) : _createCommentVNode("v-if", true)
          ], 8, ["disabled"]))
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-b35627be" });
