import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["aria-label", "aria-describedby"];
import { ref, reactive, onMounted, onBeforeUnmount, watchPostEffect } from "vue";
import "./scrollbar.css";
const __sfc_main__ = {
  __name: "WorkbenchScrollbar",
  props: {
    label: { type: String, required: true },
    describedby: String,
    axis: { type: String, default: "vertical" },
    size: { type: String, default: "default" },
    state: String
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const viewport = ref(), content = ref(), track = ref(), thumb = ref();
    const metrics = reactive({ ratio: 1, position: 0 });
    const dragging = ref(false);
    watchPostEffect(() => {
      if (!thumb.value) return;
      thumb.value.style.setProperty("--scrollbar-thumb-length", `${metrics.ratio * 100}%`);
      thumb.value.style.setProperty("--scrollbar-thumb-position", `${metrics.position * 100}%`);
    });
    let observer, drag;
    const horizontal = () => props.axis === "horizontal";
    function measure() {
      const e = viewport.value;
      if (!e) return;
      const client = horizontal() ? e.clientWidth : e.clientHeight, total = horizontal() ? e.scrollWidth : e.scrollHeight;
      metrics.ratio = total ? Math.min(1, client / total) : 1;
      metrics.position = total ? (horizontal() ? e.scrollLeft : e.scrollTop) / total : 0;
    }
    function pointerDown(event) {
      if (event.button !== 0) return;
      const e = viewport.value;
      e.focus({ preventScroll: true });
      const rect = track.value.getBoundingClientRect();
      const length = horizontal() ? rect.width : rect.height;
      const total = horizontal() ? e.scrollWidth : e.scrollHeight;
      const point = horizontal() ? event.clientX : event.clientY;
      if (!event.target.closest(".wb-scrollarea__thumb")) {
        const offset = point - (horizontal() ? rect.left : rect.top);
        e[horizontal() ? "scrollLeft" : "scrollTop"] = (offset / length - metrics.ratio / 2) * total;
      }
      drag = { point, scroll: horizontal() ? e.scrollLeft : e.scrollTop, total, length };
      dragging.value = true;
      track.value.setPointerCapture(event.pointerId);
      event.preventDefault();
    }
    function pointerMove(event) {
      if (!drag) return;
      viewport.value[horizontal() ? "scrollLeft" : "scrollTop"] = drag.scroll + ((horizontal() ? event.clientX : event.clientY) - drag.point) * drag.total / drag.length;
    }
    function endDrag() {
      drag = null;
      dragging.value = false;
    }
    function keydown(event) {
      if (event.target !== viewport.value) return;
      const e = viewport.value;
      const amount = horizontal() ? e.clientWidth : e.clientHeight;
      const keys = horizontal() ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
      let delta;
      if (event.key === keys[0]) delta = -40;
      else if (event.key === keys[1]) delta = 40;
      else if (event.key === "PageUp") delta = -amount;
      else if (event.key === "PageDown") delta = amount;
      else if (event.key === "Home") delta = -Infinity;
      else if (event.key === "End") delta = Infinity;
      else return;
      event.preventDefault();
      const key = horizontal() ? "scrollLeft" : "scrollTop";
      e[key] = delta === -Infinity ? 0 : delta === Infinity ? horizontal() ? e.scrollWidth : e.scrollHeight : e[key] + delta;
    }
    onMounted(() => {
      observer = new ResizeObserver(measure);
      observer.observe(viewport.value);
      observer.observe(content.value);
      measure();
    });
    onBeforeUnmount(() => {
      observer?.disconnect();
      endDrag();
    });
    __expose({ viewport, measure });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          class: _normalizeClass(["wb-scrollbar wb-scrollarea", [
            __props.size === "small" ? "" : "wb-scrollbar--large",
            {
              "is-horizontal": __props.axis === "horizontal",
              "is-hover": __props.state === "hover",
              "is-dragging": dragging.value
            }
          ]])
        },
        [
          _createElementVNode("div", {
            ref_key: "viewport",
            ref: viewport,
            class: "wb-scrollarea__viewport",
            role: "region",
            "aria-label": __props.label,
            "aria-describedby": __props.describedby,
            tabindex: "0",
            onScroll: measure,
            onKeydown: keydown
          }, [
            _createElementVNode(
              "div",
              {
                ref_key: "content",
                ref: content,
                class: "wb-scrollarea__content"
              },
              [
                _renderSlot(_ctx.$slots, "default")
              ],
              512
              /* NEED_PATCH */
            )
          ], 40, _hoisted_1),
          metrics.ratio < 1 ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              ref_key: "track",
              ref: track,
              class: "wb-scrollarea__track",
              "aria-hidden": "true",
              onPointerdown: pointerDown,
              onPointermove: pointerMove,
              onPointerup: endDrag,
              onPointercancel: endDrag,
              onLostpointercapture: endDrag
            },
            [
              _createElementVNode(
                "div",
                {
                  ref_key: "thumb",
                  ref: thumb,
                  class: "wb-scrollarea__thumb"
                },
                null,
                512
                /* NEED_PATCH */
              )
            ],
            544
            /* NEED_HYDRATION, NEED_PATCH */
          )) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
