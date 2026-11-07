import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, withCtx as _withCtx, createSlots as _createSlots, openBlock as _openBlock, createBlock as _createBlock } from "vue";
import WorkbenchModal from "../modal/WorkbenchModal.vue";
const __sfc_main__ = {
  __name: "WorkbenchManagementFormModal",
  props: {
    modelValue: Boolean,
    title: { type: String, required: true },
    size: { type: String, default: "l", validator: (value) => ["m", "l"].includes(value) },
    contentClass: { type: String, default: "" }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(WorkbenchModal, {
        "model-value": __props.modelValue,
        title: __props.title,
        size: __props.size,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event))
      }, _createSlots({
        default: _withCtx(() => [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass(["wb-management-form-modal__content", __props.contentClass])
            },
            [
              _renderSlot(_ctx.$slots, "notice"),
              _renderSlot(_ctx.$slots, "default"),
              _renderSlot(_ctx.$slots, "supplement")
            ],
            2
            /* CLASS */
          )
        ]),
        _: 2
        /* DYNAMIC */
      }, [
        _ctx.$slots.footer ? {
          name: "footer",
          fn: _withCtx(() => [
            _renderSlot(_ctx.$slots, "footer")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["model-value", "title", "size"]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
