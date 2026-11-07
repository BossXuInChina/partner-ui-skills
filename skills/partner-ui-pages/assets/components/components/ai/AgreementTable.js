import { defineComponent as _defineComponent } from "vue";
import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, renderSlot as _renderSlot, createTextVNode as _createTextVNode, normalizeStyle as _normalizeStyle, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode } from "vue";
const _hoisted_1 = { class: "table-clip agreement-table" };
const _hoisted_2 = ["onClick"];
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from "vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "AgreementTable",
  props: {
    agreements: {}
  },
  emits: ["open"],
  setup(__props) {
    const props = __props;
    const viewport = ref(), table = ref(), track = ref();
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
      if (!(event.target instanceof Element && event.target.closest(".agreement-table__thumb"))) el.scrollLeft = ((event.clientX - rect.left) / scale - thumbWidth.value / 2) / travel.value * range;
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
    watch(() => props.agreements, () => void nextTick(measure), { deep: true });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode(
          "div",
          {
            ref_key: "viewport",
            ref: viewport,
            class: "table-wrap agreement-table__viewport",
            role: "region",
            "aria-label": "\u534F\u8BAE\u5217\u8868\u6A2A\u5411\u6EDA\u52A8\u533A\u57DF",
            tabindex: "0",
            onScroll: measure,
            onKeydown: keydown
          },
          [
            _createElementVNode(
              "table",
              {
                ref_key: "table",
                ref: table
              },
              [
                _cache[1] || (_cache[1] = _createElementVNode(
                  "thead",
                  null,
                  [
                    _createElementVNode("tr", null, [
                      _createElementVNode("th", null, "\u534F\u8BAE\u540D\u79F0"),
                      _createElementVNode("th", null, "\u534F\u8BAE\u7F16\u53F7"),
                      _createElementVNode("th", null, "\u5408\u4F5C\u4F19\u4F34"),
                      _createElementVNode("th", null, "\u5230\u671F\u65E5\u671F"),
                      _createElementVNode("th", null, "\u534F\u8BAE\u91D1\u989D"),
                      _createElementVNode("th", null, "\u72B6\u6001"),
                      _createElementVNode("th", null, "\u64CD\u4F5C")
                    ])
                  ],
                  -1
                  /* CACHED */
                )),
                _createElementVNode("tbody", null, [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(__props.agreements, (item) => {
                      return _openBlock(), _createElementBlock("tr", {
                        key: item.id
                      }, [
                        _createElementVNode(
                          "td",
                          null,
                          _toDisplayString(item.name),
                          1
                          /* TEXT */
                        ),
                        _createElementVNode(
                          "td",
                          null,
                          _toDisplayString(item.id),
                          1
                          /* TEXT */
                        ),
                        _createElementVNode(
                          "td",
                          null,
                          _toDisplayString(item.partner),
                          1
                          /* TEXT */
                        ),
                        _createElementVNode(
                          "td",
                          null,
                          _toDisplayString(item.endDate),
                          1
                          /* TEXT */
                        ),
                        _createElementVNode(
                          "td",
                          null,
                          _toDisplayString(item.amount),
                          1
                          /* TEXT */
                        ),
                        _createElementVNode("td", null, [
                          _renderSlot(_ctx.$slots, "status", { agreement: item }, () => [
                            _createTextVNode(
                              _toDisplayString(item.status),
                              1
                              /* TEXT */
                            )
                          ])
                        ]),
                        _createElementVNode("td", null, [
                          _createElementVNode("button", {
                            class: "agreement-table__action",
                            type: "button",
                            onClick: ($event) => _ctx.$emit("open", item)
                          }, [..._cache[0] || (_cache[0] = [
                            _createElementVNode(
                              "span",
                              null,
                              "\u8BE6\u60C5",
                              -1
                              /* CACHED */
                            )
                          ])], 8, _hoisted_2)
                        ])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ],
              512
              /* NEED_PATCH */
            )
          ],
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ),
        overflow.value ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 0,
            ref_key: "track",
            ref: track,
            class: _normalizeClass(["agreement-table__track", { "is-dragging": dragging.value }]),
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
                class: "agreement-table__thumb",
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
      ]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-fd97b491" });
