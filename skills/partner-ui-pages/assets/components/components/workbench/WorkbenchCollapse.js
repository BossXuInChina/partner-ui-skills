import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = { class: "wb-collapse" };
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchCollapse",
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
