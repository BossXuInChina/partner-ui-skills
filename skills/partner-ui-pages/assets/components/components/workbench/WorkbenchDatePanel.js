import { createVNode as _createVNode, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Fragment as _Fragment, toDisplayString as _toDisplayString, renderList as _renderList, unref as _unref, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = { class: "wb-date-calendar__header" };
const _hoisted_3 = { class: "wb-date-calendar__nav" };
const _hoisted_4 = ["aria-label"];
const _hoisted_5 = { class: "wb-date-calendar__title" };
const _hoisted_6 = { key: 1 };
const _hoisted_7 = { class: "wb-date-calendar__nav" };
const _hoisted_8 = ["aria-label"];
const _hoisted_9 = {
  key: 0,
  class: "wb-date-calendar__week"
};
const _hoisted_10 = ["data-date", "aria-label", "aria-pressed", "aria-current", "disabled", "tabindex", "onClick", "onMouseenter", "onFocus", "onKeydown"];
import { computed, nextTick, ref } from "vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import { addDays, dateKey, localDate, monthStart } from "./dateUtils.js";
const __sfc_main__ = {
  __name: "WorkbenchDatePanel",
  props: {
    visibleDate: { type: Date, required: true },
    view: { type: String, default: "date" },
    yearStart: Number,
    selected: { type: Array, default: () => [] },
    range: Boolean,
    hoverValue: { type: String, default: "" },
    today: { type: Date, required: true },
    isDisabled: { type: Function, default: () => false },
    showPrev: { type: Boolean, default: true },
    showNext: { type: Boolean, default: true },
    dateMarkers: { type: Object, default: null },
    showEmptyMarkers: Boolean,
    fluid: Boolean
  },
  emits: ["choose", "navigate", "changeView", "hover"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const root = ref(null);
    const weekdays = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
    const markerCount = (key) => {
      const value = props.dateMarkers ? props.dateMarkers[key] : void 0;
      return value === true ? 1 : Number(value) > 0 ? Number(value) : 0;
    };
    const showMarker = (key) => props.view === "date" && Boolean(props.dateMarkers) && (props.showEmptyMarkers || markerCount(key) > 0);
    const title = computed(() => props.view === "year" ? props.yearStart + " \u5E74 - " + (props.yearStart + 15) + " \u5E74" : props.visibleDate.getFullYear() + " \u5E74");
    const items = computed(() => {
      if (props.view === "month") return Array.from({ length: 12 }, (_, index) => {
        const date = localDate(props.visibleDate.getFullYear(), index);
        return { date, key: dateKey(date, "month"), label: index + 1 + "\u6708" };
      });
      if (props.view === "year") return Array.from({ length: 16 }, (_, index) => {
        const date = localDate(props.yearStart + index);
        return { date, key: dateKey(date, "year"), label: String(props.yearStart + index) };
      });
      const first = monthStart(props.visibleDate);
      const start = addDays(first, -first.getDay());
      return Array.from({ length: 42 }, (_, index) => {
        const date = addDays(start, index);
        return { date, key: dateKey(date), label: String(date.getDate()), outside: date.getMonth() !== props.visibleDate.getMonth() };
      });
    });
    const limits = computed(() => {
      const selected = props.selected.map((value) => value.slice(0, props.view === "year" ? 4 : props.view === "month" ? 7 : 10));
      if (props.range && selected.length === 1 && props.hoverValue) selected.push(props.hoverValue);
      return selected.sort();
    });
    const selectedKey = computed(() => {
      const selected = items.value.find((item) => limits.value.includes(item.key) && !props.isDisabled(item.date, props.view));
      return selected?.key || items.value.find((item) => !item.outside && !props.isDisabled(item.date, props.view))?.key;
    });
    function classes(item) {
      const [start, end] = limits.value;
      const inRange = props.range && !item.outside && end && item.key >= start && item.key <= end;
      const lastDay = props.view === "date" && new Date(item.date.getFullYear(), item.date.getMonth() + 1, 0).getDate();
      return {
        "is-outside": item.outside,
        "is-month-start": props.view === "date" && !item.outside && item.date.getDate() === 1,
        "is-month-end": props.view === "date" && !item.outside && item.date.getDate() === lastDay,
        "is-today": !props.range && item.key === dateKey(props.today, props.view),
        "is-selected": limits.value.includes(item.key),
        "is-in-range": inRange,
        "is-range-start": inRange && item.key === start,
        "is-range-end": inRange && item.key === end
      };
    }
    function move(amount, year = false) {
      emit("navigate", props.view === "date" ? { months: year ? amount * 12 : amount } : { years: amount * (props.view === "year" ? 16 : 1) });
    }
    function focusInitial() {
      root.value?.querySelector('[tabindex="0"]')?.focus();
    }
    async function keydown(event, item, index) {
      const columns = props.view === "date" ? 7 : props.view === "month" ? 3 : 4;
      const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -columns, ArrowDown: columns };
      if (event.key === "PageUp" || event.key === "PageDown") {
        event.preventDefault();
        move(event.key === "PageUp" ? -1 : 1, event.shiftKey);
        await nextTick();
        focusInitial();
        return;
      }
      if (!(event.key in offsets) && !["Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const targetIndex = event.key === "Home" ? index - index % columns : event.key === "End" ? index + columns - index % columns - 1 : index + offsets[event.key];
      await focusTarget(item, index, targetIndex);
    }
    async function focusTarget(item, index, targetIndex) {
      let target = items.value[targetIndex];
      if (props.view === "date") {
        let date = addDays(item.date, targetIndex - index);
        const direction = targetIndex < index ? -1 : 1;
        let attempts = 0;
        while (props.isDisabled(date, "date") && attempts++ < 366) date = addDays(date, direction);
        if (props.isDisabled(date, "date")) return;
        if (date.getMonth() !== props.visibleDate.getMonth() || date.getFullYear() !== props.visibleDate.getFullYear()) {
          emit("navigate", { date: monthStart(date) });
          await nextTick();
        }
        target = { key: dateKey(date) };
      } else {
        let nextIndex = Math.max(0, Math.min(items.value.length - 1, targetIndex));
        const direction = targetIndex < index ? -1 : 1;
        while (items.value[nextIndex] && props.isDisabled(items.value[nextIndex].date, props.view)) nextIndex += direction;
        target = items.value[nextIndex];
      }
      if (target) {
        const button = root.value?.querySelector('[data-date="' + target.key + '"]');
        root.value?.querySelectorAll("[data-date]").forEach((node) => {
          node.tabIndex = node === button ? 0 : -1;
        });
        button?.focus();
      }
    }
    __expose({ focusInitial });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-date-calendar", ["wb-date-calendar--" + __props.view, { "is-fluid": __props.fluid }]]),
        "aria-label": title.value + (__props.view === "date" ? " " + (__props.visibleDate.getMonth() + 1) + " \u6708" : "")
      }, [
        _createElementVNode("header", _hoisted_2, [
          _createElementVNode("div", _hoisted_3, [
            __props.showPrev ? (_openBlock(), _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                _createElementVNode("button", {
                  type: "button",
                  "aria-label": __props.view === "year" ? "\u524D16\u5E74" : "\u4E0A\u4E00\u5E74",
                  onClick: _cache[0] || (_cache[0] = ($event) => move(-1, true))
                }, [
                  _createVNode(WorkbenchIcon, { name: "\u53CC\u7BAD\u5934/\u5927\u5C0F=16,\u65B9\u5411=\u5DE6" })
                ], 8, _hoisted_4),
                __props.view === "date" ? (_openBlock(), _createElementBlock("button", {
                  key: 0,
                  type: "button",
                  "aria-label": "\u4E0A\u4E2A\u6708",
                  onClick: _cache[1] || (_cache[1] = ($event) => move(-1))
                }, [
                  _createVNode(WorkbenchIcon, { name: "\u7BAD\u5934/\u5C3A\u5BF8=16,\u65B9\u5411=\u5DE6\u7BAD\u5934" })
                ])) : _createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : _createCommentVNode("v-if", true)
          ]),
          _createElementVNode("div", _hoisted_5, [
            __props.view !== "year" ? (_openBlock(), _createElementBlock(
              "button",
              {
                key: 0,
                type: "button",
                "aria-label": "\u9009\u62E9\u5E74\u4EFD",
                onClick: _cache[2] || (_cache[2] = ($event) => emit("changeView", "year"))
              },
              _toDisplayString(title.value),
              1
              /* TEXT */
            )) : (_openBlock(), _createElementBlock(
              "span",
              _hoisted_6,
              _toDisplayString(title.value),
              1
              /* TEXT */
            )),
            __props.view === "date" ? (_openBlock(), _createElementBlock(
              "button",
              {
                key: 2,
                type: "button",
                "aria-label": "\u9009\u62E9\u6708\u4EFD",
                onClick: _cache[3] || (_cache[3] = ($event) => emit("changeView", "month"))
              },
              _toDisplayString(__props.visibleDate.getMonth() + 1) + " \u6708",
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true)
          ]),
          _createElementVNode("div", _hoisted_7, [
            __props.showNext ? (_openBlock(), _createElementBlock(
              _Fragment,
              { key: 0 },
              [
                __props.view === "date" ? (_openBlock(), _createElementBlock("button", {
                  key: 0,
                  type: "button",
                  "aria-label": "\u4E0B\u4E2A\u6708",
                  onClick: _cache[4] || (_cache[4] = ($event) => move(1))
                }, [
                  _createVNode(WorkbenchIcon, { name: "\u7BAD\u5934/\u5C3A\u5BF8=16,\u65B9\u5411=\u53F3\u7BAD\u5934" })
                ])) : _createCommentVNode("v-if", true),
                _createElementVNode("button", {
                  type: "button",
                  "aria-label": __props.view === "year" ? "\u540E16\u5E74" : "\u4E0B\u4E00\u5E74",
                  onClick: _cache[5] || (_cache[5] = ($event) => move(1, true))
                }, [
                  _createVNode(WorkbenchIcon, { name: "\u53CC\u7BAD\u5934/\u5927\u5C0F=16,\u65B9\u5411=\u53F3" })
                ], 8, _hoisted_8)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : _createCommentVNode("v-if", true)
          ])
        ]),
        __props.view === "date" ? (_openBlock(), _createElementBlock("div", _hoisted_9, [
          (_openBlock(), _createElementBlock(
            _Fragment,
            null,
            _renderList(weekdays, (day) => {
              return _createElementVNode(
                "span",
                { key: day },
                _toDisplayString(day),
                1
                /* TEXT */
              );
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode(
          "div",
          {
            class: _normalizeClass(["wb-date-calendar__grid", { "wb-date-picker__days": __props.view === "date", "has-markers": __props.view === "date" && Boolean(__props.dateMarkers) }]),
            onMouseleave: _cache[6] || (_cache[6] = ($event) => emit("hover", ""))
          },
          [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(items.value, (item, index) => {
                return _openBlock(), _createElementBlock(
                  "div",
                  {
                    key: item.key,
                    class: _normalizeClass(["wb-date-calendar__cell", classes(item)])
                  },
                  [
                    _createElementVNode("button", {
                      type: "button",
                      "data-date": item.key,
                      "aria-label": __props.view === "date" && markerCount(item.key) > 0 ? item.key + "\uFF0C\u6709\u65E5\u7A0B\u6807\u8BB0" : item.key,
                      "aria-pressed": limits.value.includes(item.key),
                      "aria-current": item.key === _unref(dateKey)(__props.today, __props.view) ? "date" : void 0,
                      disabled: __props.isDisabled(item.date, __props.view),
                      tabindex: item.key === selectedKey.value ? 0 : -1,
                      onClick: ($event) => emit("choose", item.date),
                      onMouseenter: ($event) => emit("hover", item.key),
                      onFocus: ($event) => emit("hover", item.key),
                      onKeydown: ($event) => keydown($event, item, index)
                    }, _toDisplayString(item.label), 41, _hoisted_10),
                    showMarker(item.key) ? (_openBlock(), _createElementBlock(
                      "span",
                      {
                        key: 0,
                        class: _normalizeClass(["wb-date-calendar__event-marker", { "has-events": markerCount(item.key) > 0 }]),
                        "aria-hidden": "true"
                      },
                      null,
                      2
                      /* CLASS */
                    )) : _createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          34
          /* CLASS, NEED_HYDRATION */
        )
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-6dd89c9f" });
