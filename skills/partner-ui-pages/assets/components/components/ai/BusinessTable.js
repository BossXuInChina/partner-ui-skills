import { defineComponent as _defineComponent } from "vue";
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, unref as _unref, withDirectives as _withDirectives, renderSlot as _renderSlot, createTextVNode as _createTextVNode, normalizeStyle as _normalizeStyle, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["tabindex"];
const _hoisted_4 = { class: "business-table__content" };
const _hoisted_5 = ["tabindex"];
const _hoisted_6 = { class: "business-table__content" };
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from "vue";
import { vAiTooltip } from "../ui/foundation/aiTooltip";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "BusinessTable",
  props: {
    columns: {},
    rows: {},
    label: { default: "\u4E1A\u52A1\u6570\u636E" },
    rowKey: { default: "id" },
    minWidth: { default: void 0 },
    fit: { type: Boolean, default: false },
    ellipsis: { type: Boolean, default: false },
    cellText: { type: Function, default: void 0 }
  },
  setup(__props) {
    const props = __props;
    const viewport = ref(), table = ref(), track = ref();
    function textFor(row, column) {
      return props.cellText?.(row, column) ?? String(row[column.key] ?? "");
    }
    const width = ref(0), total = ref(0), left = ref(0), dragging = ref(false);
    let observer, drag;
    const overflow = computed(() => total.value - width.value > 1);
    const thumbWidth = computed(() => total.value ? width.value * width.value / total.value : 0);
    const travel = computed(() => Math.max(0, width.value - thumbWidth.value));
    const thumbLeft = computed(() => total.value > width.value ? left.value / (total.value - width.value) * travel.value : 0);
    function measure() {
      const el = viewport.value;
      if (!el) return;
      width.value = el.clientWidth;
      total.value = el.scrollWidth;
      left.value = el.scrollLeft;
    }
    function down(event) {
      const el = viewport.value, bar = track.value;
      if (!el || !bar || event.button !== 0 || !overflow.value || travel.value <= 0) return;
      el.focus({ preventScroll: true });
      const rect = bar.getBoundingClientRect(), scale = rect.width / bar.clientWidth || 1, range = total.value - width.value;
      if (!(event.target instanceof Element && event.target.closest(".business-table__thumb"))) el.scrollLeft = ((event.clientX - rect.left) / scale - thumbWidth.value / 2) / travel.value * range;
      drag = { x: event.clientX, scroll: el.scrollLeft, scale, travel: travel.value, range };
      dragging.value = true;
      bar.setPointerCapture(event.pointerId);
      event.preventDefault();
    }
    function move(event) {
      if (drag && viewport.value) viewport.value.scrollLeft = drag.scroll + (event.clientX - drag.x) / drag.scale / drag.travel * drag.range;
    }
    function end() {
      drag = void 0;
      dragging.value = false;
    }
    function keydown(event) {
      const el = viewport.value;
      if (!el || event.target !== el) return;
      const delta = event.key === "ArrowLeft" ? -40 : event.key === "ArrowRight" ? 40 : event.key === "PageUp" ? -el.clientWidth : event.key === "PageDown" ? el.clientWidth : void 0;
      if (delta !== void 0) {
        event.preventDefault();
        el.scrollLeft += delta;
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        el.scrollLeft = event.key === "Home" ? 0 : el.scrollWidth;
      }
    }
    onMounted(() => {
      observer = new ResizeObserver(measure);
      if (viewport.value) observer.observe(viewport.value);
      if (table.value) observer.observe(table.value);
      measure();
    });
    onBeforeUnmount(() => {
      observer?.disconnect();
      end();
    });
    watch(() => [props.rows, props.columns], () => void nextTick(measure), { deep: true });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          class: _normalizeClass(["table-clip business-table", { "is-fit": __props.fit, "is-ellipsis": __props.ellipsis }]),
          style: _normalizeStyle(__props.minWidth === void 0 ? void 0 : { "--business-table-min-width": `${Math.max(0, __props.minWidth)}px` })
        },
        [
          _createElementVNode("div", {
            ref_key: "viewport",
            ref: viewport,
            class: "table-wrap business-table__viewport",
            role: "region",
            "aria-label": `${__props.label}\u6A2A\u5411\u6EDA\u52A8\u533A\u57DF`,
            tabindex: "0",
            onScroll: measure,
            onKeydown: keydown
          }, [
            _createElementVNode("table", {
              ref_key: "table",
              ref: table,
              "aria-label": __props.label
            }, [
              _createElementVNode("thead", null, [
                _createElementVNode("tr", null, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(__props.columns, (column) => {
                      return _withDirectives((_openBlock(), _createElementBlock("th", {
                        key: column.key,
                        tabindex: __props.ellipsis ? 0 : void 0
                      }, [
                        _createElementVNode(
                          "span",
                          _hoisted_4,
                          _toDisplayString(column.title),
                          1
                          /* TEXT */
                        )
                      ], 8, _hoisted_3)), [
                        [_unref(vAiTooltip), { content: column.title, disabled: !__props.ellipsis, overflowOnly: true, overflowSelector: ".business-table__content" }]
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              _createElementVNode("tbody", null, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(__props.rows, (row, index) => {
                    return _openBlock(), _createElementBlock("tr", {
                      key: String(row[__props.rowKey] ?? index)
                    }, [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(__props.columns, (column) => {
                          return _withDirectives((_openBlock(), _createElementBlock("td", {
                            key: column.key,
                            tabindex: __props.ellipsis ? 0 : void 0
                          }, [
                            _createElementVNode("div", _hoisted_6, [
                              _renderSlot(_ctx.$slots, "cell", {
                                row,
                                column
                              }, () => [
                                _createTextVNode(
                                  _toDisplayString(row[column.key]),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ])
                          ], 8, _hoisted_5)), [
                            [_unref(vAiTooltip), { content: textFor(row, column), disabled: !__props.ellipsis, overflowOnly: true, overflowSelector: ".business-table__content, .business-table__content *" }]
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 8, _hoisted_2)
          ], 40, _hoisted_1),
          overflow.value ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              ref_key: "track",
              ref: track,
              class: _normalizeClass(["business-table__track", { "is-dragging": dragging.value }]),
              "aria-hidden": "true",
              onPointerdown: down,
              onPointermove: move,
              onPointerup: end,
              onPointercancel: end,
              onLostpointercapture: end
            },
            [
              _createElementVNode(
                "div",
                {
                  class: "business-table__thumb",
                  style: _normalizeStyle({ width: `${thumbWidth.value}px`, transform: `translateX(${thumbLeft.value}px)` })
                },
                null,
                4
                /* STYLE */
              )
            ],
            34
            /* CLASS, NEED_HYDRATION */
          )) : _createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      );
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-ed1b88bb" });
