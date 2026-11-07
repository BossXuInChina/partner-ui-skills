import { unref as _unref, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, withModifiers as _withModifiers, withKeys as _withKeys, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createVNode as _createVNode, createCommentVNode as _createCommentVNode, createTextVNode as _createTextVNode, withCtx as _withCtx, createBlock as _createBlock, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["data-preview-state"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["data-endpoint", "disabled", "aria-label", "aria-expanded", "aria-describedby", "aria-invalid", "onClick", "onKeydown"];
const _hoisted_4 = ["disabled", "aria-label", "aria-expanded", "aria-describedby", "aria-invalid"];
const _hoisted_5 = ["name", "value", "disabled"];
const _hoisted_6 = ["name", "value", "disabled"];
const _hoisted_7 = ["name", "value", "disabled"];
const _hoisted_8 = ["aria-label"];
const _hoisted_9 = { class: "wb-time-picker__columns" };
const _hoisted_10 = ["aria-label", "data-unit"];
const _hoisted_11 = ["aria-selected", "tabindex", "onClick", "onKeydown"];
const _hoisted_12 = {
  key: 0,
  class: "wb-time-picker__error",
  role: "alert"
};
const _hoisted_13 = { class: "wb-time-picker__footer" };
const _hoisted_14 = { class: "wb-time-picker__actions" };
import { useFormDisabled } from "../form/useFormDisabled.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
const __sfc_main__ = {
  __name: "WorkbenchTimePicker",
  props: {
    modelValue: { type: [String, Array], default: "" },
    range: Boolean,
    use12Hours: Boolean,
    showSeconds: { type: Boolean, default: true },
    showNow: Boolean,
    disabled: Boolean,
    name: String,
    ariaLabel: { type: String, default: "\u9009\u62E9\u65F6\u95F4" },
    ariaDescribedby: String,
    invalid: Boolean,
    placeholder: { type: String, default: "\u8BF7\u9009\u62E9\u65F6\u95F4" },
    previewState: { type: String, default: "default" },
    defaultOpen: Boolean,
    teleportPanel: Boolean,
    inline: Boolean
  },
  emits: ["update:modelValue", "change", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const root = ref(null);
    const panel = ref(null);
    let resizeObserver;
    const open = ref(false);
    const endpoint = ref(0);
    const draft = ref([]);
    const touched = ref([false, false]);
    const panelId = `wb-time-${useId().replace(/[^\w-]/g, "")}`;
    const pad = (value) => String(value).padStart(2, "0");
    const hours = computed(
      () => Array.from({ length: props.use12Hours ? 12 : 24 }, (_, i) => pad(props.use12Hours ? i + 1 : i))
    );
    const units = Array.from({ length: 60 }, (_, i) => pad(i));
    const columns = computed(() => [
      { key: "hour", label: "\u5C0F\u65F6", values: hours.value },
      { key: "minute", label: "\u5206\u949F", values: units },
      ...props.showSeconds ? [{ key: "second", label: "\u79D2", values: units }] : [],
      ...props.use12Hours ? [{ key: "period", label: "\u4E0A\u5348\u6216\u4E0B\u5348", values: ["AM", "PM"] }] : []
    ]);
    function parse(value) {
      if (typeof value !== "string" || !/^\d{2}:\d{2}(?::\d{2})?$/.test(value)) return null;
      const [hour, minute, second = 0] = value.split(":").map(Number);
      return hour < 24 && minute < 60 && second < 60 ? { hour, minute, second } : null;
    }
    function now() {
      const time = /* @__PURE__ */ new Date();
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: props.showSeconds ? time.getSeconds() : 0
      };
    }
    const committed = computed(
      () => props.range ? [
        parse(Array.isArray(props.modelValue) ? props.modelValue[0] : ""),
        parse(Array.isArray(props.modelValue) ? props.modelValue[1] : "")
      ] : [parse(props.modelValue), null]
    );
    const active = computed(() => draft.value[endpoint.value] ?? { hour: 0, minute: 0, second: 0 });
    function serialize(value) {
      return [value.hour, value.minute, ...props.showSeconds ? [value.second] : []].map(pad).join(":");
    }
    function display(index) {
      const value = open.value && touched.value[index] ? draft.value[index] : committed.value[index];
      if (!value) return props.range ? ["\u8BF7\u9009\u62E9\u5F00\u59CB\u65F6\u95F4", "\u8BF7\u9009\u62E9\u7ED3\u675F\u65F6\u95F4"][index] : props.placeholder;
      if (!props.use12Hours) return serialize(value);
      return `${[value.hour % 12 || 12, value.minute, ...props.showSeconds ? [value.second] : []].map(pad).join(":")} ${value.hour < 12 ? "AM" : "PM"}`;
    }
    function isPlaceholder(index) {
      return !(open.value && touched.value[index]) && !committed.value[index];
    }
    function selected(key) {
      if (key === "period") return active.value.hour < 12 ? "AM" : "PM";
      if (key === "hour" && props.use12Hours) return pad(active.value.hour % 12 || 12);
      return pad(active.value[key]);
    }
    const seconds = (value) => value.hour * 3600 + value.minute * 60 + (props.showSeconds ? value.second : 0);
    const invalidRange = computed(
      () => props.range && endpoint.value === 1 && draft.value.length === 2 && seconds(draft.value[1]) < seconds(draft.value[0])
    );
    function positionColumns(focus = false) {
      nextTick(() => {
        for (const column of panel.value?.querySelectorAll('[role="listbox"]') ?? []) {
          const option = column.querySelector('[aria-selected="true"]');
          if (!option) continue;
          column.scrollTop = option.offsetTop - (column.clientHeight - option.offsetHeight) / 2;
        }
        if (focus)
          panel.value?.querySelector('[role="option"][aria-selected="true"]')?.focus({ preventScroll: true });
      });
    }
    function begin(index = 0, focus = false) {
      if (disabled.value) return;
      if (!open.value) {
        const current = now();
        draft.value = committed.value.map((value) => ({ ...value ?? current }));
        touched.value = [false, false];
      }
      endpoint.value = index;
      open.value = true;
      positionColumns(focus);
    }
    function focusTrigger() {
      nextTick(
        () => root.value?.querySelector(
          props.range ? `[data-endpoint="${endpoint.value}"]` : ".wb-time-picker__trigger"
        )?.focus()
      );
    }
    function cancel(restoreFocus = false) {
      if (!open.value) return;
      open.value = false;
      emit("cancel");
      if (props.inline && !disabled.value) begin(endpoint.value);
      if (restoreFocus) focusTrigger();
    }
    function choose(key, value) {
      const index = endpoint.value;
      const next = touched.value[index] || committed.value[index] ? { ...active.value } : { hour: 0, minute: 0, second: 0 };
      if (key === "period") next.hour = next.hour % 12 + (value === "PM" ? 12 : 0);
      else if (key === "hour" && props.use12Hours)
        next.hour = Number(value) % 12 + (next.hour >= 12 ? 12 : 0);
      else next[key] = Number(value);
      draft.value[index] = next;
      touched.value[index] = true;
      positionColumns();
    }
    function publish(values) {
      const value = props.range ? values.map(serialize) : serialize(values[0]);
      open.value = false;
      emit("update:modelValue", value);
      emit("change", value);
      if (props.inline) nextTick(() => begin(endpoint.value));
      focusTrigger();
    }
    function confirm() {
      if (invalidRange.value) return;
      if (props.range && endpoint.value === 0) {
        touched.value[0] = true;
        begin(1, true);
        return;
      }
      publish(draft.value);
    }
    function chooseNow() {
      const value = now();
      if (!props.range) return publish([value]);
      draft.value[endpoint.value] = value;
      touched.value[endpoint.value] = true;
      if (endpoint.value === 0) begin(1, true);
      else if (!invalidRange.value) publish(draft.value);
      else positionColumns(true);
    }
    function optionKeydown(event, column, value) {
      const index = column.values.indexOf(value);
      const step = { ArrowUp: -1, ArrowDown: 1, PageUp: -5, PageDown: 5 }[event.key];
      if (step !== void 0 || event.key === "Home" || event.key === "End") {
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? column.values.length - 1 : Math.max(0, Math.min(column.values.length - 1, index + step));
        const targetColumn = event.currentTarget.closest('[role="listbox"]');
        choose(column.key, column.values[next]);
        nextTick(
          () => targetColumn.querySelector('[aria-selected="true"]')?.focus({ preventScroll: true })
        );
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        const lists = [...panel.value.querySelectorAll('[role="listbox"]')];
        const next = lists.indexOf(event.currentTarget.closest('[role="listbox"]')) + (event.key === "ArrowRight" ? 1 : -1);
        lists[next]?.querySelector('[aria-selected="true"]')?.focus({ preventScroll: true });
      }
    }
    function contains(target) {
      return root.value?.contains(target) || panel.value?.contains(target);
    }
    function positionPanel() {
      if (!panel.value) return;
      if (!props.teleportPanel || props.inline) {
        panel.value.style.removeProperty("left");
        panel.value.style.removeProperty("top");
        return;
      }
      if (!open.value || !root.value) return;
      const anchor = root.value.getBoundingClientRect();
      const box = panel.value.getBoundingClientRect();
      const style = getComputedStyle(root.value);
      const gap = parseFloat(style.getPropertyValue("--wb-asset-wb-time-picker-panel-offset"));
      const edge = parseFloat(style.getPropertyValue("--wb-spacing-component-sm"));
      const left = props.range && endpoint.value === 1 ? anchor.right - box.width : anchor.left;
      const top = anchor.bottom + gap + box.height <= window.innerHeight - edge ? anchor.bottom + gap : Math.max(edge, anchor.top - box.height - gap);
      Object.assign(panel.value.style, {
        left: `${Math.max(edge, Math.min(left, window.innerWidth - box.width - edge))}px`,
        top: `${top}px`
      });
    }
    function outside(event) {
      if (props.inline) return;
      if (!contains(event.target)) cancel();
    }
    function focusout(event) {
      if (props.inline) return;
      if (event.relatedTarget && !contains(event.relatedTarget)) cancel();
    }
    function escape(event) {
      if (event.key !== "Escape" || !open.value) return;
      event.preventDefault();
      event.stopPropagation();
      cancel(true);
    }
    watch(
      () => props.defaultOpen,
      (value) => {
        if (!props.inline) value ? begin() : cancel();
      }
    );
    watch(
      () => disabled.value,
      (value) => {
        if (value) cancel();
        else if (props.inline) begin();
      }
    );
    watch(
      () => [props.range, props.use12Hours, props.showSeconds],
      () => {
        cancel();
        if (props.inline && !open.value) begin();
      }
    );
    watch(
      () => props.inline,
      (value) => {
        if (value && !disabled.value) begin();
      }
    );
    watch(
      () => props.modelValue,
      () => {
        if (open.value) {
          open.value = false;
          begin(endpoint.value);
        }
      },
      { deep: true }
    );
    watch([open, endpoint, () => props.teleportPanel], () => nextTick(positionPanel));
    watch(
      panel,
      (node, previous) => {
        if (previous) resizeObserver?.unobserve(previous);
        if (node) resizeObserver?.observe(node);
        nextTick(positionPanel);
      },
      { flush: "post" }
    );
    onMounted(() => {
      document.addEventListener("pointerdown", outside);
      window.addEventListener("resize", positionPanel);
      document.addEventListener("scroll", positionPanel, true);
      resizeObserver = new ResizeObserver(positionPanel);
      if (root.value) resizeObserver.observe(root.value);
      if (props.defaultOpen || props.inline) begin();
    });
    onBeforeUnmount(() => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", positionPanel);
      document.removeEventListener("scroll", positionPanel, true);
      resizeObserver?.disconnect();
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-time-picker", { "is-range": __props.range, "is-open": open.value, "is-disabled": _unref(disabled), "is-invalid": __props.invalid }]),
        "data-preview-state": __props.previewState,
        onKeydown: escape,
        onFocusout: focusout
      }, [
        __props.range ? (_openBlock(), _createElementBlock("div", {
          key: 0,
          class: _normalizeClass(["wb-time-picker__trigger wb-time-picker__range", { "is-filled": committed.value[0] || committed.value[1] }]),
          role: "group",
          "aria-label": __props.ariaLabel,
          onClick: _cache[0] || (_cache[0] = ($event) => begin(endpoint.value))
        }, [
          (_openBlock(), _createElementBlock(
            _Fragment,
            null,
            _renderList([0, 1], (index) => {
              return _createElementVNode("button", {
                key: index,
                type: "button",
                class: _normalizeClass(["wb-time-picker__endpoint", {
                  "is-placeholder": isPlaceholder(index),
                  "is-active": open.value && (endpoint.value === index || index === 0 && !isPlaceholder(0))
                }]),
                "data-endpoint": index,
                disabled: _unref(disabled),
                "aria-label": `${__props.ariaLabel}\uFF1A${index ? "\u7ED3\u675F\u65F6\u95F4" : "\u5F00\u59CB\u65F6\u95F4"}`,
                "aria-haspopup": "dialog",
                "aria-expanded": open.value && endpoint.value === index,
                "aria-controls": panelId,
                "aria-describedby": __props.ariaDescribedby,
                "aria-invalid": __props.invalid || void 0,
                onClick: ($event) => begin(index),
                onKeydown: _withKeys(_withModifiers(($event) => begin(index, true), ["prevent"]), ["down"])
              }, _toDisplayString(display(index)), 43, _hoisted_3);
            }),
            64
            /* STABLE_FRAGMENT */
          )),
          _cache[6] || (_cache[6] = _createElementVNode(
            "span",
            {
              class: "wb-time-picker__separator",
              "aria-hidden": "true"
            },
            "-",
            -1
            /* CACHED */
          )),
          _createVNode(WorkbenchIcon, {
            class: "wb-time-picker__icon",
            name: "\u65F6\u95F4_14px"
          })
        ], 10, _hoisted_2)) : (_openBlock(), _createElementBlock("button", {
          key: 1,
          type: "button",
          class: "wb-time-picker__trigger",
          disabled: _unref(disabled),
          "aria-label": __props.ariaLabel,
          "aria-haspopup": "dialog",
          "aria-expanded": open.value,
          "aria-controls": panelId,
          "aria-describedby": __props.ariaDescribedby,
          "aria-invalid": __props.invalid || void 0,
          onClick: _cache[1] || (_cache[1] = ($event) => __props.inline ? begin() : open.value ? cancel() : begin()),
          onKeydown: _cache[2] || (_cache[2] = _withKeys(_withModifiers(($event) => begin(0, true), ["prevent"]), ["down"]))
        }, [
          _createElementVNode(
            "span",
            {
              class: _normalizeClass({ "is-placeholder": isPlaceholder(0) })
            },
            _toDisplayString(display(0)),
            3
            /* TEXT, CLASS */
          ),
          _createVNode(WorkbenchIcon, {
            class: "wb-time-picker__icon",
            name: "\u65F6\u95F4_14px"
          })
        ], 40, _hoisted_4)),
        __props.name ? (_openBlock(), _createElementBlock(
          _Fragment,
          { key: 2 },
          [
            __props.range ? (_openBlock(), _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                _createElementVNode("input", {
                  type: "hidden",
                  name: `${__props.name}[0]`,
                  value: Array.isArray(__props.modelValue) ? __props.modelValue[0] : "",
                  disabled: _unref(disabled)
                }, null, 8, _hoisted_5),
                _createElementVNode("input", {
                  type: "hidden",
                  name: `${__props.name}[1]`,
                  value: Array.isArray(__props.modelValue) ? __props.modelValue[1] : "",
                  disabled: _unref(disabled)
                }, null, 8, _hoisted_6)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (_openBlock(), _createElementBlock("input", {
              key: 1,
              type: "hidden",
              name: __props.name,
              value: __props.modelValue,
              disabled: _unref(disabled)
            }, null, 8, _hoisted_7))
          ],
          64
          /* STABLE_FRAGMENT */
        )) : _createCommentVNode("v-if", true),
        (_openBlock(), _createBlock(_Teleport, {
          to: "body",
          disabled: !__props.teleportPanel || __props.inline
        }, [
          open.value && !_unref(disabled) ? (_openBlock(), _createElementBlock("div", {
            key: 0,
            id: panelId,
            ref_key: "panel",
            ref: panel,
            class: _normalizeClass(["wb-time-picker__panel", {
              "is-end": __props.range && endpoint.value === 1,
              "is-teleported": __props.teleportPanel && !__props.inline,
              "is-inline": __props.inline
            }]),
            role: "dialog",
            "aria-label": __props.range ? `${__props.ariaLabel}\uFF1A${endpoint.value ? "\u7ED3\u675F\u65F6\u95F4" : "\u5F00\u59CB\u65F6\u95F4"}` : __props.ariaLabel,
            onKeydown: _cache[4] || (_cache[4] = ($event) => __props.teleportPanel && escape($event)),
            onFocusout: _cache[5] || (_cache[5] = ($event) => __props.teleportPanel && focusout($event))
          }, [
            _createElementVNode("div", _hoisted_9, [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(columns.value, (column) => {
                  return _openBlock(), _createElementBlock("div", {
                    key: column.key,
                    class: _normalizeClass(["wb-time-picker__column", { "wb-time-picker__column--period": column.key === "period" }]),
                    role: "listbox",
                    "aria-label": column.label,
                    "data-unit": column.key
                  }, [
                    (_openBlock(true), _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(column.values, (value) => {
                        return _openBlock(), _createElementBlock("button", {
                          key: value,
                          type: "button",
                          class: "wb-time-picker__option",
                          role: "option",
                          "aria-selected": selected(column.key) === value,
                          tabindex: selected(column.key) === value ? 0 : -1,
                          onClick: ($event) => choose(column.key, value),
                          onKeydown: ($event) => optionKeydown($event, column, value)
                        }, _toDisplayString(value), 41, _hoisted_11);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ], 10, _hoisted_10);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            invalidRange.value ? (_openBlock(), _createElementBlock("p", _hoisted_12, " \u7ED3\u675F\u65F6\u95F4\u4E0D\u80FD\u65E9\u4E8E\u5F00\u59CB\u65F6\u95F4 ")) : _createCommentVNode("v-if", true),
            _createElementVNode("div", _hoisted_13, [
              __props.showNow ? (_openBlock(), _createBlock(WorkbenchButton, {
                key: 0,
                class: "wb-time-picker__now",
                appearance: "text",
                size: "32",
                onClick: chooseNow
              }, {
                default: _withCtx(() => [..._cache[7] || (_cache[7] = [
                  _createTextVNode(
                    "\u6B64\u523B",
                    -1
                    /* CACHED */
                  )
                ])]),
                _: 1
                /* STABLE */
              })) : _createCommentVNode("v-if", true),
              _createElementVNode("div", _hoisted_14, [
                _createVNode(WorkbenchButton, {
                  appearance: "secondary",
                  size: "32",
                  onClick: _cache[3] || (_cache[3] = ($event) => cancel(true))
                }, {
                  default: _withCtx(() => [..._cache[8] || (_cache[8] = [
                    _createTextVNode(
                      "\u53D6\u6D88",
                      -1
                      /* CACHED */
                    )
                  ])]),
                  _: 1
                  /* STABLE */
                }),
                _createVNode(WorkbenchButton, {
                  class: "wb-time-picker__done",
                  size: "32",
                  disabled: invalidRange.value,
                  onClick: confirm
                }, {
                  default: _withCtx(() => [..._cache[9] || (_cache[9] = [
                    _createTextVNode(
                      "\u786E\u5B9A",
                      -1
                      /* CACHED */
                    )
                  ])]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled"])
              ])
            ])
          ], 42, _hoisted_8)) : _createCommentVNode("v-if", true)
        ], 8, ["disabled"]))
      ], 42, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-de2c60b2" });
