import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, vModelText as _vModelText, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, withDirectives as _withDirectives, createVNode as _createVNode, withModifiers as _withModifiers, toDisplayString as _toDisplayString, createBlock as _createBlock, createTextVNode as _createTextVNode, withCtx as _withCtx, Teleport as _Teleport } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "wb-date-picker__field"
};
const _hoisted_2 = {
  key: 0,
  class: "wb-date-picker__separator",
  "aria-hidden": "true"
};
const _hoisted_3 = ["onUpdate:modelValue", "aria-label", "aria-expanded", "aria-describedby", "aria-invalid", "disabled", "placeholder", "onBlur", "onKeydown"];
const _hoisted_4 = ["aria-label", "aria-hidden", "disabled", "tabindex"];
const _hoisted_5 = ["aria-label", "disabled", "aria-expanded"];
const _hoisted_6 = ["name", "value", "disabled"];
const _hoisted_7 = ["role", "aria-label"];
const _hoisted_8 = {
  key: 0,
  class: "wb-date-picker__shortcuts",
  "aria-label": "\u5FEB\u6377\u65E5\u671F"
};
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "wb-date-picker__main" };
const _hoisted_11 = { class: "wb-date-picker__calendars" };
const _hoisted_12 = {
  key: 0,
  class: "wb-date-picker__time"
};
const _hoisted_13 = { class: "wb-date-picker__time-heading" };
const _hoisted_14 = {
  key: 0,
  class: "wb-date-picker__time-ends"
};
const _hoisted_15 = ["aria-pressed", "onClick"];
const _hoisted_16 = { class: "wb-date-picker__time-columns" };
const _hoisted_17 = { class: "wb-date-picker__time-label" };
const _hoisted_18 = ["aria-label"];
const _hoisted_19 = ["aria-selected", "tabindex", "onClick", "onKeydown"];
const _hoisted_20 = {
  key: 0,
  class: "wb-date-picker__footer"
};
const _hoisted_21 = { class: "wb-date-picker__footer-actions" };
import { useFormDisabled } from "../form/useFormDisabled.js";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import "../scrollbar/scrollbar.css";
import WorkbenchDatePanel from "./WorkbenchDatePanel.vue";
import { addDays, dateKey, formatValue, localDate, monthStart, pad, parseDate } from "./dateUtils.js";
const __sfc_main__ = {
  __name: "WorkbenchDatePicker",
  props: {
    modelValue: { type: [String, Array], default: "" },
    type: { type: String, default: "date", validator: (value) => ["date", "month", "year", "datetime"].includes(value) },
    range: Boolean,
    showTime: Boolean,
    disabled: Boolean,
    size: { type: String, default: "default" },
    name: String,
    ariaLabel: { type: String, default: "\u9009\u62E9\u65E5\u671F" },
    ariaDescribedby: String,
    invalid: Boolean,
    placeholder: String,
    min: String,
    max: String,
    disabledDate: Function,
    shortcuts: { type: [Boolean, Array], default: false },
    inline: Boolean,
    defaultOpen: Boolean,
    dateMarkers: { type: Object, default: null },
    showEmptyMarkers: Boolean,
    fluid: Boolean,
    flatInline: Boolean,
    showInput: { type: Boolean, default: true },
    previewState: { type: String, default: "default" },
    today: { type: Date, default: () => /* @__PURE__ */ new Date() }
  },
  emits: ["update:modelValue", "change", "clear", "openChange"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const disabled = useFormDisabled(() => props.disabled);
    const emit = __emit;
    const root = ref(null), panel = ref(null), calendars = ref([]), inputs = ref([]), trigger = ref(null);
    const panelId = "wb-date-panel-" + useId(), open = ref(false);
    const unit = computed(() => props.type === "datetime" ? "date" : props.type);
    const withTime = computed(() => unit.value === "date" && (props.showTime || props.type === "datetime"));
    const inactive = computed(() => disabled.value || props.previewState === "disabled");
    const committed = computed(() => {
      const values = props.range ? Array.isArray(props.modelValue) ? props.modelValue : [] : [props.modelValue];
      return values.filter((value) => parseDate(value, unit.value)).slice(0, props.range ? 2 : 1);
    });
    const text = ref([]), draft = ref([]), hoverValue = ref(""), view = ref(unit.value);
    const visible = ref(monthStart(parseDate(committed.value[0], unit.value) || props.today));
    const yearStart = ref(visible.value.getFullYear() - 5);
    const activeTimeEnd = ref(0), timeParts = ref(["00", "00", "00"]);
    const hasValue = computed(() => committed.value.length > 0);
    const showPanel = computed(() => !inactive.value && (open.value || props.inline));
    const fluidPanel = computed(() => props.fluid && props.inline && !props.range && !withTime.value && !shortcutItems.value.length);
    const ready = computed(() => draft.value.length === (props.range ? 2 : 1) && draft.value.every((value) => {
      const date = parseDate(value, unit.value);
      return date && !isDisabled(date, unit.value);
    }));
    const dates = computed(() => Array.from({ length: props.range ? 2 : 1 }, (_, index) => view.value === "year" ? localDate(yearStart.value + index * 16) : view.value === "month" ? localDate(visible.value.getFullYear() + index) : monthStart(visible.value, index)));
    const defaultShortcuts = computed(() => [
      { label: "\u6628\u5929", date: addDays(props.today, -1) },
      { label: "\u8FC7\u53BB7\u5929", date: addDays(props.today, -6) },
      { label: "\u8FC7\u53BB14\u5929", date: addDays(props.today, -13) },
      { label: "\u8FC7\u53BB30\u5929", date: addDays(props.today, -29) },
      { label: "\u8FC7\u53BB90\u5929", date: addDays(props.today, -89) },
      { label: "\u672C\u5468\u4E94", date: addDays(props.today, 5 - (props.today.getDay() || 7)) },
      { label: "\u672C\u5468\u672B", date: addDays(props.today, 7 - (props.today.getDay() || 7)) },
      { label: "14\u5929\u540E", date: addDays(props.today, 14) }
    ]);
    const shortcutItems = computed(() => Array.isArray(props.shortcuts) ? props.shortcuts : props.shortcuts ? defaultShortcuts.value : []);
    const timeChoices = [Array.from({ length: 24 }, (_, index) => pad(index)), ...Array.from({ length: 2 }, () => Array.from({ length: 60 }, (_, index) => pad(index)))];
    const timeLabels = ["\u5C0F\u65F6", "\u5206\u949F", "\u79D2"];
    const fieldPlaceholder = computed(() => props.placeholder || (withTime.value ? "\u8BF7\u9009\u62E9\u65E5\u671F\u4E0E\u65F6\u95F4" : unit.value === "month" ? "\u8BF7\u9009\u62E9\u6708\u4EFD" : unit.value === "year" ? "\u8BF7\u9009\u62E9\u5E74\u4EFD" : "\u8BF7\u9009\u62E9\u65E5\u671F"));
    function isDisabled(date, displayUnit = unit.value) {
      if (date.getFullYear() < 1 || date.getFullYear() > 9999) return true;
      const key = dateKey(date, displayUnit), min = parseDate(props.min, unit.value), max = parseDate(props.max, unit.value);
      return !!(min && key < dateKey(min, displayUnit) || max && key > dateKey(max, displayUnit) || props.disabledDate?.(new Date(date), displayUnit));
    }
    function loadTime() {
      const date = parseDate(draft.value[activeTimeEnd.value], unit.value);
      timeParts.value = date ? [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())] : ["00", "00", "00"];
    }
    function resetDraft() {
      draft.value = [...committed.value];
      text.value = props.range ? [committed.value[0] || "", committed.value[1] || ""] : [committed.value[0] || ""];
      const date = parseDate(draft.value[0], unit.value) || props.today;
      visible.value = monthStart(date);
      yearStart.value = Math.max(1, Math.min(props.range ? 9968 : 9984, date.getFullYear() - 5));
      view.value = unit.value;
      activeTimeEnd.value = 0;
      hoverValue.value = "";
      loadTime();
    }
    function publish(values) {
      if (inactive.value) return;
      const next = props.range ? values : values[0] || "";
      emit("update:modelValue", next);
      emit("change", next);
    }
    async function setOpen(value, focusGrid = false) {
      if (inactive.value) return;
      if (value && !open.value) resetDraft();
      open.value = value;
      emit("openChange", value);
      await nextTick();
      if (value) {
        positionPanel();
        if (focusGrid) calendars.value[0]?.focusInitial();
      }
    }
    function close(restore = false) {
      open.value = false;
      hoverValue.value = "";
      emit("openChange", false);
      if (restore) nextTick(() => inputs.value[0]?.focus());
    }
    function cancel() {
      resetDraft();
      close(true);
    }
    function choose(date) {
      if (inactive.value || isDisabled(date, view.value)) return;
      if (view.value !== unit.value) {
        visible.value = monthStart(date);
        view.value = view.value === "year" && unit.value === "date" ? "month" : unit.value;
        return;
      }
      const value = withTime.value ? dateKey(date) + " " + timeParts.value.join(":") : formatValue(date, unit.value);
      if (props.range) {
        draft.value = draft.value.length === 1 ? [draft.value[0], value].sort() : [value];
        activeTimeEnd.value = 1;
      } else draft.value = [value];
      hoverValue.value = "";
      text.value = props.range ? [draft.value[0] || "", draft.value[1] || ""] : [...draft.value];
      loadTime();
      if (ready.value && !withTime.value) {
        publish([...draft.value]);
        close(true);
      }
    }
    function changeView(next) {
      view.value = next;
      yearStart.value = Math.max(1, Math.min(props.range ? 9968 : 9984, visible.value.getFullYear() - 5));
    }
    function navigate(change, index) {
      if (change.date) visible.value = monthStart(change.date, -index);
      else if (view.value === "year") yearStart.value = Math.max(1, Math.min(props.range ? 9968 : 9984, yearStart.value + change.years));
      else {
        const next = localDate(visible.value.getFullYear() + (change.years || 0), visible.value.getMonth() + (change.months || 0));
        if (next.getFullYear() >= 1 && next.getFullYear() <= (props.range ? 9998 : 9999)) visible.value = next;
      }
      nextTick(positionPanel);
    }
    function correctInput(index) {
      const value = text.value[index];
      if (!value?.trim()) {
        if (!props.range) {
          draft.value = [];
          publish([]);
        }
        return;
      }
      const parsed = parseDate(value, unit.value, true);
      if (!parsed || isDisabled(parsed, unit.value)) {
        text.value[index] = committed.value[index] || "";
        return;
      }
      text.value[index] = formatValue(parsed, unit.value, withTime.value);
      const all = text.value.map((value2) => parseDate(value2, unit.value));
      if (all.length === (props.range ? 2 : 1) && all.every((date) => date && !isDisabled(date, unit.value))) {
        draft.value = all.map((date) => formatValue(date, unit.value, withTime.value)).sort();
        text.value = [...draft.value];
        publish([...draft.value]);
        visible.value = monthStart(all[0]);
      }
    }
    function clear() {
      draft.value = [];
      text.value = props.range ? ["", ""] : [""];
      publish([]);
      emit("clear");
      close();
      nextTick(() => inputs.value[0]?.focus());
    }
    function selectShortcut(item) {
      const values = typeof item.value === "function" ? item.value() : item.value;
      let selected = values == null ? [item.date, ...props.range ? [props.today] : []] : Array.isArray(values) ? values : [values];
      selected = selected.map((value) => value instanceof Date ? new Date(value) : parseDate(value, unit.value)).filter(Boolean);
      if (selected.length !== (props.range ? 2 : 1) || selected.some((date) => isDisabled(date, unit.value))) return;
      draft.value = selected.map((date) => formatValue(date, unit.value, withTime.value)).sort();
      text.value = [...draft.value];
      visible.value = monthStart(selected[0]);
      loadTime();
      if (!withTime.value) {
        publish([...draft.value]);
        close(true);
      }
    }
    function now() {
      if (!isDisabled(props.today, unit.value)) selectShortcut({ value: props.range ? [props.today, props.today] : props.today });
    }
    function selectTime(index, value) {
      const position = props.range ? activeTimeEnd.value : 0;
      if (!draft.value[position]) return;
      timeParts.value[index] = value;
      const next = [...draft.value];
      next[position] = next[position].slice(0, 10) + " " + timeParts.value.join(":");
      draft.value = next;
      text.value = props.range ? [next[0] || "", next[1] || ""] : next;
    }
    function timeKey(event, column, index) {
      if (!["Home", "End", "ArrowDown", "ArrowUp"].includes(event.key)) return;
      event.preventDefault();
      const options = [...event.currentTarget.parentElement.querySelectorAll('[role="option"]')];
      const target = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : index + (event.key === "ArrowDown" ? 1 : -1);
      const next = Math.max(0, Math.min(options.length - 1, target));
      selectTime(column, timeChoices[column][next]);
      options[next]?.focus();
    }
    function confirm() {
      if (ready.value) {
        publish([...draft.value].sort());
        close(true);
      }
    }
    function onKey(event) {
      if (!event.isComposing && event.key === "Escape" && showPanel.value) {
        event.preventDefault();
        cancel();
      }
    }
    function inputKey(event, index) {
      if (event.isComposing) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setOpen(true, true);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        correctInput(index);
        close();
      }
    }
    function outside(event) {
      if (!root.value?.contains(event.target) && !panel.value?.contains(event.target)) {
        const activeInput = inputs.value.indexOf(document.activeElement);
        if (event.type === "pointerdown" && activeInput >= 0) correctInput(activeInput);
        resetDraft();
        close();
      }
    }
    function positionPanel() {
      if (!panel.value || props.inline || !root.value) return;
      const anchor = root.value.getBoundingClientRect(), box = panel.value.getBoundingClientRect();
      const style = getComputedStyle(root.value);
      const gap = parseFloat(style.getPropertyValue("--wb-spacing-component-xs"));
      const edge = parseFloat(style.getPropertyValue("--wb-spacing-component-sm"));
      const top = anchor.bottom + gap + box.height <= window.innerHeight - edge ? anchor.bottom + gap : Math.max(edge, anchor.top - box.height - gap);
      Object.assign(panel.value.style, { left: Math.max(edge, Math.min(anchor.left, window.innerWidth - box.width - edge)) + "px", top: top + "px" });
    }
    watch([() => props.modelValue, unit, () => props.range, withTime], resetDraft, { immediate: true, deep: true });
    watch(inactive, (value) => {
      if (value) close();
    });
    watch(showPanel, (value) => {
      const method = value && !props.inline ? "addEventListener" : "removeEventListener";
      document[method]("pointerdown", outside);
      document[method]("focusin", outside);
      window[method]("resize", positionPanel);
      window[method]("scroll", positionPanel, true);
      if (value) nextTick(positionPanel);
    }, { immediate: true });
    watch(() => props.defaultOpen, (value) => {
      if (value) setOpen(true);
    }, { immediate: true });
    onBeforeUnmount(() => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
      window.removeEventListener("resize", positionPanel);
      window.removeEventListener("scroll", positionPanel, true);
    });
    __expose({ focus: () => inputs.value[0] ? inputs.value[0].focus() : calendars.value[0]?.focusInitial(), open: () => setOpen(true), close });
    watch(disabled, (value) => {
      if (value) {
        close();
      }
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          ref_key: "root",
          ref: root,
          class: _normalizeClass(["wb-date-picker", ["wb-date-picker--" + __props.size, "is-" + __props.previewState, { "is-disabled": inactive.value, "is-open": showPanel.value, "is-invalid": __props.invalid, "has-value": hasValue.value, "is-range": __props.range, "is-fluid": fluidPanel.value }]]),
          onKeydown: onKey
        },
        [
          !__props.inline || __props.showInput ? (_openBlock(), _createElementBlock("div", _hoisted_1, [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(__props.range ? [0, 1] : [0], (index) => {
                return _openBlock(), _createElementBlock(
                  _Fragment,
                  { key: index },
                  [
                    index ? (_openBlock(), _createElementBlock("span", _hoisted_2, "-")) : _createCommentVNode("v-if", true),
                    _withDirectives(_createElementVNode("input", {
                      ref_for: true,
                      ref: (element) => {
                        inputs.value[index] = element;
                      },
                      "onUpdate:modelValue": ($event) => text.value[index] = $event,
                      type: "text",
                      class: _normalizeClass(["wb-date-picker__input", { "is-start": __props.range && index === 0 }]),
                      "aria-label": __props.ariaLabel + (__props.range ? index ? "\u7ED3\u675F\u65E5\u671F\u8F93\u5165" : "\u5F00\u59CB\u65E5\u671F\u8F93\u5165" : "\u8F93\u5165"),
                      role: "combobox",
                      "aria-haspopup": "dialog",
                      "aria-expanded": showPanel.value,
                      "aria-controls": panelId,
                      "aria-describedby": __props.ariaDescribedby,
                      "aria-invalid": __props.invalid || void 0,
                      disabled: inactive.value,
                      placeholder: __props.range ? index ? "\u8BF7\u9009\u62E9\u7ED3\u675F\u65E5\u671F" : "\u8BF7\u9009\u62E9\u5F00\u59CB\u65E5\u671F" : fieldPlaceholder.value,
                      autocomplete: "off",
                      onClick: _cache[0] || (_cache[0] = ($event) => setOpen(true)),
                      onBlur: ($event) => correctInput(index),
                      onKeydown: ($event) => inputKey($event, index)
                    }, null, 42, _hoisted_3), [
                      [_vModelText, text.value[index]]
                    ])
                  ],
                  64
                  /* STABLE_FRAGMENT */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            _createElementVNode("button", {
              type: "button",
              class: "wb-date-picker__clear",
              "aria-label": "\u6E05\u9664" + __props.ariaLabel,
              "aria-hidden": !hasValue.value || inactive.value,
              disabled: !hasValue.value || inactive.value,
              tabindex: hasValue.value && !inactive.value ? 0 : -1,
              onClick: _withModifiers(clear, ["stop"])
            }, [
              _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_14px" })
            ], 8, _hoisted_4),
            _createElementVNode("button", {
              ref_key: "trigger",
              ref: trigger,
              type: "button",
              class: "wb-date-picker__trigger",
              "aria-label": __props.ariaLabel,
              disabled: inactive.value,
              "aria-haspopup": "dialog",
              "aria-expanded": showPanel.value,
              "aria-controls": panelId,
              onClick: _cache[1] || (_cache[1] = ($event) => setOpen(!open.value, true))
            }, [
              _createVNode(WorkbenchIcon, { name: "\u65E5\u671F/\u5C3A\u5BF8=14" })
            ], 8, _hoisted_5)
          ])) : _createCommentVNode("v-if", true),
          __props.name ? (_openBlock(true), _createElementBlock(
            _Fragment,
            { key: 1 },
            _renderList(__props.range ? committed.value : [committed.value[0] || ""], (value, index) => {
              return _openBlock(), _createElementBlock("input", {
                key: index,
                type: "hidden",
                name: __props.range ? __props.name + "[" + index + "]" : __props.name,
                value,
                disabled: inactive.value
              }, null, 8, _hoisted_6);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : _createCommentVNode("v-if", true),
          (_openBlock(), _createBlock(_Teleport, {
            to: "body",
            disabled: __props.inline
          }, [
            showPanel.value ? (_openBlock(), _createElementBlock("div", {
              key: 0,
              id: panelId,
              ref_key: "panel",
              ref: panel,
              class: _normalizeClass(["wb-date-picker__panel wb-scrollbar", { "is-inline": __props.inline, "is-panel-only": __props.inline && !__props.showInput, "is-fluid": fluidPanel.value, "is-flat": __props.inline && __props.flatInline }]),
              role: __props.inline && !__props.showInput ? "group" : "dialog",
              "aria-label": __props.inline && !__props.showInput ? __props.ariaLabel : __props.ariaLabel + "\u9009\u62E9\u9762\u677F",
              onKeydown: onKey
            }, [
              shortcutItems.value.length && view.value === "date" ? (_openBlock(), _createElementBlock("aside", _hoisted_8, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(shortcutItems.value, (item) => {
                    return _openBlock(), _createElementBlock("button", {
                      key: item.label,
                      type: "button",
                      onClick: ($event) => selectShortcut(item)
                    }, _toDisplayString(item.label), 9, _hoisted_9);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : _createCommentVNode("v-if", true),
              _createElementVNode("div", _hoisted_10, [
                _createElementVNode("div", _hoisted_11, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(dates.value, (date, index) => {
                      return _openBlock(), _createBlock(WorkbenchDatePanel, {
                        key: index,
                        ref_for: true,
                        ref_key: "calendars",
                        ref: calendars,
                        "visible-date": date,
                        view: view.value,
                        "year-start": yearStart.value + index * 16,
                        selected: draft.value,
                        range: __props.range,
                        "hover-value": hoverValue.value,
                        today: __props.today,
                        "is-disabled": isDisabled,
                        "date-markers": __props.dateMarkers,
                        "show-empty-markers": __props.showEmptyMarkers,
                        "show-prev": index === 0,
                        "show-next": index === dates.value.length - 1,
                        fluid: fluidPanel.value,
                        onChoose: choose,
                        onNavigate: ($event) => navigate($event, index),
                        onChangeView: changeView,
                        onHover: _cache[2] || (_cache[2] = ($event) => hoverValue.value = $event)
                      }, null, 8, ["visible-date", "view", "year-start", "selected", "range", "hover-value", "today", "date-markers", "show-empty-markers", "show-prev", "show-next", "fluid", "onNavigate"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  withTime.value && view.value === "date" ? (_openBlock(), _createElementBlock("div", _hoisted_12, [
                    _createElementVNode(
                      "div",
                      _hoisted_13,
                      _toDisplayString(timeParts.value.join(" : ")),
                      1
                      /* TEXT */
                    ),
                    __props.range ? (_openBlock(), _createElementBlock("div", _hoisted_14, [
                      (_openBlock(), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList([0, 1], (index) => {
                          return _createElementVNode("button", {
                            key: index,
                            type: "button",
                            "aria-pressed": activeTimeEnd.value === index,
                            onClick: ($event) => {
                              activeTimeEnd.value = index;
                              loadTime();
                            }
                          }, _toDisplayString(index ? "\u7ED3\u675F" : "\u5F00\u59CB"), 9, _hoisted_15);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ])) : _createCommentVNode("v-if", true),
                    _createElementVNode("div", _hoisted_16, [
                      (_openBlock(), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(timeChoices, (choices, column) => {
                          return _createElementVNode("div", {
                            key: column,
                            class: "wb-date-picker__time-column"
                          }, [
                            _createElementVNode(
                              "div",
                              _hoisted_17,
                              _toDisplayString(["\u65F6", "\u5206", "\u79D2"][column]),
                              1
                              /* TEXT */
                            ),
                            _createElementVNode("div", {
                              role: "listbox",
                              "aria-label": timeLabels[column],
                              class: "wb-date-picker__time-list wb-scrollbar"
                            }, [
                              (_openBlock(true), _createElementBlock(
                                _Fragment,
                                null,
                                _renderList(choices, (value, index) => {
                                  return _openBlock(), _createElementBlock("button", {
                                    key: value,
                                    type: "button",
                                    role: "option",
                                    "aria-selected": timeParts.value[column] === value,
                                    tabindex: timeParts.value[column] === value ? 0 : -1,
                                    onClick: ($event) => selectTime(column, value),
                                    onKeydown: ($event) => timeKey($event, column, index)
                                  }, _toDisplayString(value), 41, _hoisted_19);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ], 8, _hoisted_18)
                          ]);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ])
                  ])) : _createCommentVNode("v-if", true)
                ]),
                withTime.value && view.value === "date" ? (_openBlock(), _createElementBlock("footer", _hoisted_20, [
                  _createVNode(WorkbenchButton, {
                    appearance: "text",
                    onClick: now
                  }, {
                    default: _withCtx(() => [..._cache[3] || (_cache[3] = [
                      _createTextVNode(
                        "\u6B64\u523B",
                        -1
                        /* CACHED */
                      )
                    ])]),
                    _: 1
                    /* STABLE */
                  }),
                  _createElementVNode("div", _hoisted_21, [
                    _createVNode(WorkbenchButton, {
                      appearance: "secondary",
                      onClick: cancel
                    }, {
                      default: _withCtx(() => [..._cache[4] || (_cache[4] = [
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
                      disabled: !ready.value,
                      onClick: confirm
                    }, {
                      default: _withCtx(() => [..._cache[5] || (_cache[5] = [
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
                ])) : _createCommentVNode("v-if", true)
              ])
            ], 42, _hoisted_7)) : _createCommentVNode("v-if", true)
          ], 8, ["disabled"]))
        ],
        34
        /* CLASS, NEED_HYDRATION */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-8c9e13e0" });
