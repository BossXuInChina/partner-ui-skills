import { defineComponent as _defineComponent } from "vue";
import { createElementVNode as _createElementVNode, createVNode as _createVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["aria-label"];
import { computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref, watch } from "vue";
import WorkspaceSmartIcon from "./WorkspaceSmartIcon.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkspaceSmartTag",
  props: {
    fragments: {},
    logo: {},
    autoFollowHighlight: { type: Boolean, default: true }
  },
  emits: ["activate", "highlightCenter"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const tagElement = ref(), textElement = ref(), resolvedBackground = ref("");
    const resolvedStyle = computed(() => resolvedBackground.value ? { "--ov-smart-tag-bg-resolved": resolvedBackground.value } : {});
    let resizeObserver, mutationObserver, frame = 0, disposed = false;
    let defaultBackground = "", defaultCenter = { x: 45.1526, y: 49.1071 }, lastCenter = "";
    function withCenter(background, x, y) {
      const pattern = /^(\s*radial-gradient\(\s*(?:circle|ellipse)\s+[^,]*?\bat\s+)[^,]+/s;
      return background.replace(pattern, (_match, prefix) => `${prefix}${Number(x.toFixed(4))}% ${Number(y.toFixed(4))}%`);
    }
    function sourceBackground(element) {
      return getComputedStyle(element).getPropertyValue("--partner-ai-smart-tag-bg").trim() || defaultBackground;
    }
    function notifyCenter(x, y) {
      const center = { x: Number(x.toFixed(4)), y: Number(y.toFixed(4)) }, key = `${center.x}:${center.y}`;
      if (key === lastCenter) return;
      lastCenter = key;
      emit("highlightCenter", center);
    }
    function scheduleMeasure() {
      if (disposed || frame || !props.autoFollowHighlight) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        measureHighlight();
      });
    }
    function measureHighlight() {
      const element = tagElement.value, text = textElement.value;
      if (!element || !text || disposed || !props.autoFollowHighlight) return;
      const source = sourceBackground(element);
      if (!defaultBackground) {
        defaultBackground = source;
        const point = source.match(/^\s*radial-gradient\(\s*(?:circle|ellipse)\s+[^,]*?\bat\s+(-?\d*\.?\d+)%\s+(-?\d*\.?\d+)%/s);
        if (point) defaultCenter = { x: Number(point[1]), y: Number(point[2]) };
      }
      const box = element.getBoundingClientRect();
      const clip = text.getBoundingClientRect();
      const rects = [...text.querySelectorAll(".intelligence-fragment--data")].flatMap((node) => [...node.getClientRects()]).map((rect) => ({ left: Math.max(rect.left, clip.left), right: Math.min(rect.right, clip.right), top: Math.max(rect.top, clip.top), bottom: Math.min(rect.bottom, clip.bottom) })).filter((rect) => rect.right > rect.left && rect.bottom > rect.top);
      if (box.width <= 0 || box.height <= 0 || !rects.length) {
        resolvedBackground.value = withCenter(source, defaultCenter.x, defaultCenter.y);
        notifyCenter(defaultCenter.x, defaultCenter.y);
        return;
      }
      const left = Math.min(...rects.map((rect) => rect.left)), right = Math.max(...rects.map((rect) => rect.right));
      const top = Math.min(...rects.map((rect) => rect.top)), bottom = Math.max(...rects.map((rect) => rect.bottom));
      const x = ((left + right) / 2 - box.left) / box.width * 100;
      const y = ((top + bottom) / 2 - box.top) / box.height * 100;
      resolvedBackground.value = withCenter(source, x, y);
      notifyCenter(x, y);
    }
    function observeText() {
      if (!resizeObserver || !tagElement.value || !textElement.value) return;
      resizeObserver.disconnect();
      resizeObserver.observe(tagElement.value);
      resizeObserver.observe(textElement.value);
      textElement.value.querySelectorAll(".intelligence-fragment--data").forEach((node) => resizeObserver.observe(node));
    }
    function onWindowResize() {
      scheduleMeasure();
    }
    watch(() => props.autoFollowHighlight, (enabled) => {
      if (!enabled) {
        resolvedBackground.value = "";
        return;
      }
      lastCenter = "";
      scheduleMeasure();
    }, { immediate: true });
    onMounted(async () => {
      const element = tagElement.value;
      if (!element) return;
      resizeObserver = new ResizeObserver(scheduleMeasure);
      observeText();
      mutationObserver = new MutationObserver(scheduleMeasure);
      for (let ancestor = element; ancestor; ancestor = ancestor.parentElement) {
        mutationObserver.observe(ancestor, { attributes: true, attributeFilter: ["style", "class"] });
      }
      window.addEventListener("resize", onWindowResize, { passive: true });
      document.fonts?.addEventListener("loadingdone", scheduleMeasure);
      await document.fonts?.ready;
      if (!disposed) scheduleMeasure();
    });
    onUpdated(() => {
      void nextTick(() => {
        observeText();
        scheduleMeasure();
      });
    });
    onBeforeUnmount(() => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("resize", onWindowResize);
      document.fonts?.removeEventListener("loadingdone", scheduleMeasure);
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("button", {
        ref_key: "tagElement",
        ref: tagElement,
        type: "button",
        class: "workspace-smart-tag",
        style: _normalizeStyle(resolvedStyle.value),
        "aria-label": __props.fragments.map((fragment) => fragment.text).join(""),
        "aria-description": "\u6FC0\u6D3BAI\u4FA7\u8FB9\u680F",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("activate"))
      }, [
        _cache[1] || (_cache[1] = _createElementVNode(
          "span",
          {
            class: "workspace-smart-tag__paint",
            "aria-hidden": "true"
          },
          null,
          -1
          /* CACHED */
        )),
        _createVNode(WorkspaceSmartIcon, { logo: __props.logo }, null, 8, ["logo"]),
        _createElementVNode(
          "span",
          {
            ref_key: "textElement",
            ref: textElement,
            class: "workspace-smart-tag__text"
          },
          [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(__props.fragments, (fragment, index) => {
                return _openBlock(), _createElementBlock(
                  "span",
                  {
                    key: index,
                    class: _normalizeClass(["intelligence-fragment", fragment.emphasis && `intelligence-fragment--${fragment.emphasis}`])
                  },
                  _toDisplayString(fragment.text),
                  3
                  /* TEXT, CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          512
          /* NEED_PATCH */
        )
      ], 12, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-850d34cf" });
