import { defineComponent as _defineComponent } from "vue";
import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["aria-label", "aria-describedby"];
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch, watchPostEffect } from "vue";
import "./scrollbar.css";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchScrollbar",
  props: {
    label: { type: String, required: true },
    describedby: String,
    axis: { type: String, default: "vertical" },
    size: { type: String, default: "default" },
    state: String,
    trackInsets: { type: Object }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const viewport = ref();
    const content = ref();
    const track = ref();
    const thumb = ref();
    const metrics = reactive({ ratio: 1, position: 0, width: 0, height: 0 });
    const dragging = ref(false);
    const horizontal = computed(() => props.axis === "horizontal");
    function inset(value, size) {
      return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(size, value)) : 0;
    }
    const blockEnd = computed(() => inset(props.trackInsets?.blockEnd, metrics.height));
    const inlineEnd = computed(() => inset(props.trackInsets?.inlineEnd, metrics.width));
    const reservedTail = computed(
      () => horizontal.value ? 0 : Math.max(0, inset(props.trackInsets?.blockEndReserve, metrics.height) - blockEnd.value)
    );
    const hasTrack = computed(
      () => metrics.ratio < 1 && (horizontal.value ? inlineEnd.value < metrics.width && blockEnd.value < metrics.height : blockEnd.value + reservedTail.value < metrics.height && inlineEnd.value < metrics.width)
    );
    watchPostEffect(() => {
      if (track.value) {
        const style = track.value.style;
        style.setProperty(
          "--scrollbar-track-block-end",
          props.trackInsets?.blockEnd === void 0 ? "" : blockEnd.value + "px"
        );
        style.setProperty(
          "--scrollbar-track-inline-end",
          props.trackInsets?.inlineEnd === void 0 ? "" : inlineEnd.value + "px"
        );
      }
      if (thumb.value) {
        thumb.value.style.setProperty(
          "--scrollbar-thumb-length",
          thumbLength(metrics.ratio, reservedTail.value)
        );
        thumb.value.style.setProperty(
          "--scrollbar-thumb-position",
          thumbLength(metrics.position, reservedTail.value)
        );
      }
    });
    function thumbLength(fraction, reserve) {
      return reserve ? `calc(${fraction * 100}% - ${fraction * reserve}px)` : `${fraction * 100}%`;
    }
    function dimensions(element) {
      return horizontal.value ? { total: element.scrollWidth, client: element.clientWidth } : { total: element.scrollHeight, client: element.clientHeight };
    }
    function horizontalScrollOrigin(element, range) {
      return horizontal.value && getComputedStyle(element).direction === "rtl" ? -range : 0;
    }
    function readScroll(element, origin) {
      return horizontal.value ? element.scrollLeft - origin : element.scrollTop;
    }
    function writeScroll(element, position, origin) {
      if (horizontal.value) element.scrollLeft = position + origin;
      else element.scrollTop = position;
    }
    function measure() {
      const element = viewport.value;
      if (!element) return;
      const { total, client } = dimensions(element);
      const range = Math.max(0, total - client);
      metrics.ratio = total ? Math.min(1, client / total) : 1;
      metrics.position = total ? readScroll(element, horizontalScrollOrigin(element, range)) / total : 0;
      metrics.width = element.clientWidth;
      metrics.height = element.clientHeight;
    }
    let observer;
    let drag;
    function geometry() {
      const element = viewport.value;
      const rect = track.value?.getBoundingClientRect();
      if (!element || !rect) return;
      const { total, client } = dimensions(element);
      const range = total - client;
      const length = (horizontal.value ? rect.width : rect.height) - reservedTail.value;
      if (range <= 0 || length <= 0) return;
      const origin = horizontalScrollOrigin(element, range);
      return {
        element,
        total,
        range,
        length,
        client,
        origin,
        edge: horizontal.value ? rect.left : rect.top,
        scroll: readScroll(element, origin)
      };
    }
    function pointerDown(event) {
      if (event.button !== 0 || drag) return;
      const g = geometry();
      if (!g) return;
      const point = horizontal.value ? event.clientX : event.clientY;
      g.element.focus({ preventScroll: true });
      if (!(event.target instanceof Node && thumb.value?.contains(event.target))) {
        const offset = point - g.edge;
        writeScroll(g.element, offset / g.length * g.total - g.client / 2, g.origin);
        measure();
      }
      const scroll = readScroll(g.element, g.origin);
      drag = { pointerId: event.pointerId, point, preciseScroll: scroll, appliedScroll: scroll };
      dragging.value = true;
      track.value?.setPointerCapture(event.pointerId);
      event.preventDefault();
    }
    function pointerMove(event) {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const g = geometry();
      if (!g) {
        endDrag();
        return;
      }
      const point = horizontal.value ? event.clientX : event.clientY;
      const previous = g.scroll === drag.appliedScroll ? drag.preciseScroll : g.scroll;
      const next = Math.max(
        0,
        Math.min(g.range, previous + (point - drag.point) * g.total / g.length)
      );
      writeScroll(g.element, next, g.origin);
      drag.point = point;
      drag.preciseScroll = next;
      drag.appliedScroll = readScroll(g.element, g.origin);
      measure();
    }
    function endDrag(event) {
      if (!drag || event && event.pointerId !== drag.pointerId) return;
      const { pointerId } = drag;
      drag = void 0;
      dragging.value = false;
      if (track.value?.hasPointerCapture(pointerId)) track.value.releasePointerCapture(pointerId);
    }
    function keydown(event) {
      if (event.target !== viewport.value || !viewport.value) return;
      const element = viewport.value;
      const { total, client } = dimensions(element);
      const keys = horizontal.value ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
      let delta;
      if (event.key === keys[0]) delta = -40;
      else if (event.key === keys[1]) delta = 40;
      else if (event.key === "PageUp") delta = -client;
      else if (event.key === "PageDown") delta = client;
      else if (event.key === "Home") delta = -Infinity;
      else if (event.key === "End") delta = Infinity;
      else return;
      event.preventDefault();
      const origin = horizontalScrollOrigin(element, Math.max(0, total - client));
      writeScroll(
        element,
        delta === -Infinity ? 0 : delta === Infinity ? total : readScroll(element, origin) + delta,
        origin
      );
    }
    watch(
      horizontal,
      () => {
        endDrag();
        measure();
      },
      { flush: "post" }
    );
    watch(hasTrack, (visible) => {
      if (!visible) endDrag();
    });
    onMounted(() => {
      observer = new ResizeObserver(measure);
      if (viewport.value) observer.observe(viewport.value);
      if (content.value) observer.observe(content.value);
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
          hasTrack.value ? (_openBlock(), _createElementBlock(
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
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
