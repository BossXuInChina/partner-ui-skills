import { openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, unref as _unref, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString } from "vue";
const _hoisted_1 = ["data-size", "data-color", "aria-label"];
const _hoisted_2 = ["src"];
const _hoisted_3 = {
  key: 1,
  class: "wb-avatar__icon",
  "aria-hidden": "true"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = {
  key: 2,
  class: "wb-avatar__text",
  "aria-hidden": "true"
};
import { computed, ref, watch } from "vue";
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import person from "./assets/avatar-person.svg";
const __sfc_main__ = {
  __name: "WorkbenchAvatar",
  props: {
    size: { type: [Number, String], default: 60 },
    color: { type: String, default: "default" },
    text: { type: String, default: "A" },
    src: { type: String, default: "" },
    icon: Boolean,
    label: { type: String, default: "" }
  },
  emits: ["error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const sizes = [24, 40, 48, 60, 80, 120];
    const colors = ["default", "blue", "cyan", "indigo", "green", "orange", "purple"];
    const resolvedSize = computed(() => sizes.includes(Number(props.size)) ? Number(props.size) : 60);
    const resolvedColor = computed(() => colors.includes(props.color) ? props.color : "default");
    const failed = ref(false);
    watch(
      () => props.src,
      () => {
        failed.value = false;
      }
    );
    const segmenter = new Intl.Segmenter("zh", { granularity: "grapheme" });
    const initials = computed(
      () => [...segmenter.segment(props.text.trim())].slice(0, 2).map((part) => part.segment).join("")
    );
    const accessibleName = computed(
      () => props.label || (props.icon ? "\u7528\u6237\u5934\u50CF" : initials.value) || "\u7528\u6237\u5934\u50CF"
    );
    function onError(event) {
      failed.value = true;
      emit("error", event);
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("span", {
        class: "wb-avatar",
        "data-size": resolvedSize.value,
        "data-color": resolvedColor.value,
        role: "img",
        "aria-label": accessibleName.value
      }, [
        __props.src && !failed.value ? (_openBlock(), _createElementBlock("img", {
          key: 0,
          class: "wb-avatar__image",
          src: __props.src,
          alt: "",
          "aria-hidden": "true",
          onError
        }, null, 40, _hoisted_2)) : __props.icon || !initials.value ? (_openBlock(), _createElementBlock("span", _hoisted_3, [
          _renderSlot(_ctx.$slots, "icon", {}, () => [
            _createElementVNode("img", {
              class: "wb-avatar__symbol",
              src: _unref(person),
              alt: "",
              "aria-hidden": "true"
            }, null, 8, _hoisted_4)
          ])
        ])) : (_openBlock(), _createElementBlock(
          "span",
          _hoisted_5,
          _toDisplayString(initials.value),
          1
          /* TEXT */
        ))
      ], 8, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-94a613ce" });
