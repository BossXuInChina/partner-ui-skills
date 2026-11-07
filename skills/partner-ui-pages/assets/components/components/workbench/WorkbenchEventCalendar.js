import { defineComponent as _defineComponent } from "vue";
import { createVNode as _createVNode, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, withCtx as _withCtx, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, createBlock as _createBlock } from "vue";
const _hoisted_1 = { class: "wb-event-calendar" };
const _hoisted_2 = { class: "wb-event-calendar__toggle" };
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = {
  key: 0,
  class: "wb-event-calendar__empty"
};
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "wb-event-calendar__title" };
const _hoisted_7 = { class: "wb-event-calendar__meta" };
const _hoisted_8 = { class: "wb-event-calendar__meta" };
import { computed, ref, watch } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchDatePicker from "../date-picker/WorkbenchDatePicker.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchScrollbar from "../scrollbar/WorkbenchScrollbar.vue";
import WorkbenchTag from "../tag/WorkbenchTag.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchEventCalendar",
  props: {
    events: { type: Array, required: true },
    initialDate: { type: String, required: true },
    today: { type: Date, default: () => /* @__PURE__ */ new Date() },
    ariaLabel: { type: String, default: "\u6D3B\u52A8\u65E5\u5386" },
    agendaLabel: { type: String, default: "\u5F53\u65E5\u6D3B\u52A8" },
    emptyText: { type: String, default: "\u5F53\u65E5\u6682\u65E0\u6D3B\u52A8" }
  },
  emits: ["open", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selected = ref(props.initialDate);
    const collapsed = ref(false);
    watch(selected, (date) => emit("select", date));
    const markers = computed(
      () => props.events.reduce(
        (all, event) => ({ ...all, [event.date]: (all[event.date] ?? 0) + 1 }),
        {}
      )
    );
    const agenda = computed(() => props.events.filter((event) => event.date === selected.value));
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createVNode(WorkbenchDatePicker, {
          modelValue: selected.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event),
          inline: "",
          fluid: "",
          "flat-inline": "",
          "show-input": false,
          "show-empty-markers": "",
          "date-markers": markers.value,
          today: __props.today,
          "aria-label": __props.ariaLabel
        }, null, 8, ["modelValue", "date-markers", "today", "aria-label"]),
        _createElementVNode("div", _hoisted_2, [
          _createVNode(WorkbenchButton, {
            class: "wb-event-calendar__toggle-button",
            appearance: "text",
            "text-layout": "inline",
            "aria-expanded": !collapsed.value,
            onClick: _cache[1] || (_cache[1] = ($event) => collapsed.value = !collapsed.value)
          }, {
            icon: _withCtx(() => [
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass(["wb-event-calendar__arrow", { "is-expanded": !collapsed.value }])
                },
                [
                  _createVNode(WorkbenchIcon, {
                    name: "/ic_arrow_right_line#2:141",
                    size: 10
                  })
                ],
                2
                /* CLASS */
              )
            ]),
            default: _withCtx(() => [
              _createTextVNode(
                _toDisplayString(collapsed.value ? "\u5C55\u5F00" : "\u6536\u8D77"),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["aria-expanded"])
        ]),
        !collapsed.value ? (_openBlock(), _createBlock(WorkbenchScrollbar, {
          key: 0,
          class: "wb-event-calendar__scroll",
          label: __props.agendaLabel,
          size: "small"
        }, {
          default: _withCtx(() => [
            _createElementVNode("ul", {
              class: "wb-event-calendar__agenda",
              "aria-label": __props.agendaLabel
            }, [
              !agenda.value.length ? (_openBlock(), _createElementBlock(
                "li",
                _hoisted_4,
                _toDisplayString(__props.emptyText),
                1
                /* TEXT */
              )) : _createCommentVNode("v-if", true),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(agenda.value, (event) => {
                  return _openBlock(), _createElementBlock("li", {
                    key: event.id
                  }, [
                    _createElementVNode("button", {
                      type: "button",
                      class: "wb-event-calendar__item",
                      onClick: ($event) => emit("open", event)
                    }, [
                      _createElementVNode("span", _hoisted_6, [
                        _createElementVNode(
                          "b",
                          null,
                          _toDisplayString(event.title),
                          1
                          /* TEXT */
                        ),
                        _createVNode(WorkbenchTag, {
                          size: "small",
                          label: event.type
                        }, null, 8, ["label"])
                      ]),
                      _createElementVNode("span", _hoisted_7, [
                        _createVNode(WorkbenchIcon, {
                          name: "\u9996\u9875 \u65F6\u95F4/time",
                          size: 16
                        }),
                        _createTextVNode(
                          _toDisplayString(event.time),
                          1
                          /* TEXT */
                        )
                      ]),
                      _createElementVNode("span", _hoisted_8, [
                        _createVNode(WorkbenchIcon, {
                          name: "\u5B9A\u4F4D/location",
                          size: 16
                        }),
                        _createTextVNode(
                          _toDisplayString(event.place),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 8, _hoisted_5)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ], 8, _hoisted_3)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["label"])) : _createCommentVNode("v-if", true)
      ]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
