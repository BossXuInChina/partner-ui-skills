import { defineComponent as _defineComponent } from "vue";
import { renderSlot as _renderSlot, unref as _unref, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, Teleport as _Teleport, openBlock as _openBlock, createBlock as _createBlock, Fragment as _Fragment, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["data-overlay-count"];
import { onBeforeUnmount, provide, ref, toRef, watch } from "vue";
import { businessOverlayKey } from "./businessOverlay";
import { useHostRegion } from "./useHostRegion";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "BusinessOverlayHost",
  props: {
    region: {},
    layer: {}
  },
  setup(__props) {
    const props = __props;
    const target = ref(), stack = ref([]);
    const { style } = useHostRegion(toRef(props, "region"));
    provide(businessOverlayKey, { target, stack });
    let restore;
    watch(() => [props.region, stack.value.length], ([region, count]) => {
      restore?.();
      restore = void 0;
      if (region && count) {
        const wasInert = region.inert;
        region.inert = true;
        restore = () => {
          region.inert = wasInert;
        };
      }
    }, { flush: "sync" });
    onBeforeUnmount(() => restore?.());
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        _Fragment,
        null,
        [
          _renderSlot(_ctx.$slots, "default"),
          (_openBlock(), _createBlock(_Teleport, { to: "body" }, [
            _createElementVNode("div", {
              ref_key: "target",
              ref: target,
              class: "partner-business-overlay-host",
              style: _normalizeStyle({ ..._unref(style), zIndex: __props.layer ?? 1e3 }),
              "data-overlay-count": stack.value.length
            }, null, 12, _hoisted_1)
          ]))
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
