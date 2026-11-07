import { openBlock as _openBlock, createBlock as _createBlock } from "vue";
import WorkbenchIcon from "./WorkbenchIcon.vue";
import { systemIcons } from "./families/system.js";
const __default__ = {
  inheritAttrs: false,
  components: { WorkbenchIcon },
  iconManifest: systemIcons.manifest
};
const __sfc_main__ = /* @__PURE__ */ Object.assign(__default__, {
  __name: "WorkbenchSystemIcon",
  props: {
    name: { type: String, required: true },
    size: { type: [Number, String], default: void 0 },
    color: { type: String, default: "currentColor" },
    label: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(WorkbenchIcon, {
        name: props.name,
        size: props.size,
        color: props.color,
        label: props.label
      }, null, 8, ["name", "size", "color", "label"]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
