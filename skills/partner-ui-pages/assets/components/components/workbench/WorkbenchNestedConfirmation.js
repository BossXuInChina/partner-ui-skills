import { renderSlot as _renderSlot, withCtx as _withCtx, createSlots as _createSlots, createVNode as _createVNode, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
import WorkbenchModal from "../modal/WorkbenchModal.vue";
const __sfc_main__ = {
  __name: "WorkbenchNestedConfirmation",
  props: {
    parentOpen: { type: Boolean, required: true },
    childOpen: { type: Boolean, required: true },
    parentTitle: { type: String, required: true },
    childTitle: { type: String, required: true },
    parentSize: { type: String, default: "l" },
    childSize: { type: String, default: "m" },
    parentBusy: { type: Boolean, default: false },
    childBusy: { type: Boolean, default: false }
  },
  emits: ["request-close-parent", "request-close-child"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function requestParentClose(value) {
      if (value === false && !props.childOpen && !props.parentBusy) emit("request-close-parent");
    }
    function requestChildClose(value) {
      if (value === false && !props.childBusy) emit("request-close-child");
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        _Fragment,
        null,
        [
          _createVNode(WorkbenchModal, {
            "model-value": __props.parentOpen,
            title: __props.parentTitle,
            size: __props.parentSize,
            "close-on-esc": !__props.childOpen,
            "close-on-mask": !__props.childOpen && !__props.parentBusy,
            "before-close": () => !__props.childOpen && !__props.parentBusy,
            "onUpdate:modelValue": requestParentClose
          }, _createSlots({
            default: _withCtx(() => [
              _renderSlot(_ctx.$slots, "parent")
            ]),
            _: 2
            /* DYNAMIC */
          }, [
            _ctx.$slots["parent-footer"] ? {
              name: "footer",
              fn: _withCtx(() => [
                _renderSlot(_ctx.$slots, "parent-footer")
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["model-value", "title", "size", "close-on-esc", "close-on-mask", "before-close"]),
          _createVNode(WorkbenchModal, {
            "model-value": __props.childOpen,
            title: __props.childTitle,
            size: __props.childSize,
            "before-close": () => !__props.childBusy,
            "onUpdate:modelValue": requestChildClose
          }, _createSlots({
            default: _withCtx(() => [
              _renderSlot(_ctx.$slots, "child")
            ]),
            _: 2
            /* DYNAMIC */
          }, [
            _ctx.$slots["child-footer"] ? {
              name: "footer",
              fn: _withCtx(() => [
                _renderSlot(_ctx.$slots, "child-footer")
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["model-value", "title", "size", "before-close"])
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
