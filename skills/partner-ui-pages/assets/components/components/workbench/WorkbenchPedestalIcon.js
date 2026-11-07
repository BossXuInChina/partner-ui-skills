import { openBlock as _openBlock, createBlock as _createBlock } from "vue";
import PedestalIcon from "../icons/pedestal/WorkbenchPedestalIcon.vue";
import { pedestalIcons } from "../icons/families/pedestal.js";
const __default__ = { inheritAttrs: false, pedestalIconManifest: pedestalIcons.manifest };
const __sfc_main__ = /* @__PURE__ */ Object.assign(__default__, {
  __name: "WorkbenchPedestalIcon",
  props: {
    name: { type: String, required: true },
    label: { type: String, default: "" },
    size: { type: Number, default: void 0, validator: (value) => [28, 48].includes(value) }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(PedestalIcon, {
        name: __props.name,
        label: __props.label,
        size: __props.size
      }, null, 8, ["name", "label", "size"]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
