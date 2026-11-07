import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createVNode as _createVNode } from "vue";
const _hoisted_1 = ["data-layout", "data-count", "aria-label"];
import { computed } from "vue";
import WorkbenchAvatar from "./WorkbenchAvatar.vue";
const __sfc_main__ = {
  __name: "WorkbenchAvatarGroup",
  props: {
    items: { type: Array, default: () => [] },
    layout: { type: String, default: "row" },
    label: { type: String, default: "\u5934\u50CF\u7EC4" }
  },
  setup(__props) {
    const props = __props;
    const multiline = computed(
      () => props.layout === "multiline" && [3, 4].includes(props.items.length)
    );
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("span", {
        class: "wb-avatar-group",
        "data-layout": multiline.value ? "multiline" : "row",
        "data-count": __props.items.length,
        role: "group",
        "aria-label": __props.label
      }, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(__props.items, (item, index) => {
            return _openBlock(), _createElementBlock("span", {
              key: item.id ?? index,
              class: "wb-avatar-group__member"
            }, [
              _createVNode(WorkbenchAvatar, {
                size: 24,
                text: item.text ?? "A",
                src: item.src,
                color: item.color,
                icon: item.icon,
                label: item.label
              }, null, 8, ["text", "src", "color", "icon", "label"])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 8, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-7e2145d7" });
