import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock, createElementVNode as _createElementVNode, createVNode as _createVNode, withModifiers as _withModifiers, withKeys as _withKeys, normalizeClass as _normalizeClass, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["data-overlay-kind", "onKeydown"];
const _hoisted_2 = ["id", "role", "aria-label"];
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import WorkbenchTag from "../tag/WorkbenchTag.vue";
import PopoverArrow from "../popover/PopoverArrow.vue";
const __sfc_main__ = {
  __name: "CascaderOverflow",
  props: {
    id: { type: String, required: true },
    anchor: { type: Object, required: true },
    items: { type: Array, required: true },
    removable: Boolean
  },
  emits: ["remove", "dismiss", "focusout"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const panel = ref(null);
    const content = ref(null);
    let observer;
    function removeItem(item) {
      const buttons = [...content.value.querySelectorAll("button:not(:disabled)")];
      const index = buttons.indexOf(document.activeElement);
      if (index >= 0) {
        const next = buttons[index + 1] || buttons[index - 1] || props.anchor.querySelector("button");
        next?.focus({ preventScroll: true });
      }
      emit("remove", [item.key]);
    }
    function dismiss() {
      props.anchor.querySelector("button")?.focus({ preventScroll: true });
      emit("dismiss");
    }
    function position() {
      if (!panel.value || !props.anchor) return;
      const styles = getComputedStyle(props.anchor);
      for (const property of styles) {
        if (property.startsWith("--wb-"))
          panel.value.style.setProperty(property, styles.getPropertyValue(property));
      }
      panel.value.style.fontFamily = styles.fontFamily;
      const token = (name) => parseFloat(styles.getPropertyValue(`--wb-asset-wb-cascader-${name}`));
      const edge = token("viewport-edge");
      const popoverToken = (name) => parseFloat(styles.getPropertyValue(`--wb-asset-wb-popover-${name}`));
      const arrowWidth = popoverToken("arrow-width");
      const gap = popoverToken("arrow-height") - popoverToken("arrow-overlap") + popoverToken("trigger-gap");
      const widthLimit = Math.min(token("tip-width"), window.innerWidth - edge * 2);
      const padding = parseFloat(styles.getPropertyValue("--wb-spacing-component-xs"));
      const spacing = padding;
      panel.value.style.width = `${widthLimit}px`;
      const available = widthLimit - padding * 2;
      let rowWidth = 0, widest = 0;
      for (const tag of content.value.children) {
        const width = tag.getBoundingClientRect().width;
        const next = rowWidth ? rowWidth + spacing + width : width;
        if (rowWidth && next > available) {
          widest = Math.max(widest, rowWidth);
          rowWidth = width;
        } else rowWidth = next;
      }
      panel.value.style.width = `${Math.min(widthLimit, Math.ceil(Math.max(widest, rowWidth) + padding * 2))}px`;
      panel.value.style.maxWidth = `${widthLimit}px`;
      const anchor = props.anchor.getBoundingClientRect();
      const limit = Math.max(0, window.innerHeight - edge * 2);
      const aboveSpace = Math.max(0, Math.min(limit, anchor.top - gap - edge));
      const belowSpace = Math.max(0, Math.min(limit, window.innerHeight - edge - anchor.bottom - gap));
      const height = content.value.scrollHeight;
      const useAbove = height <= aboveSpace || height > belowSpace && aboveSpace >= belowSpace;
      content.value.style.maxHeight = `${useAbove ? aboveSpace : belowSpace}px`;
      const box = panel.value.getBoundingClientRect();
      const preferred = useAbove ? anchor.top - gap - box.height : anchor.bottom + gap;
      const top = Math.max(edge, Math.min(preferred, window.innerHeight - edge - box.height));
      const left = Math.max(edge, Math.min(anchor.left + anchor.width / 2 - box.width / 2, window.innerWidth - edge - box.width));
      panel.value.dataset.placement = useAbove ? "top" : "bottom";
      const arrowLeft = Math.max(0, Math.min(box.width - arrowWidth, anchor.left + anchor.width / 2 - left - arrowWidth / 2));
      panel.value.style.setProperty("--cascader-overflow-arrow-left", `${arrowLeft}px`);
      panel.value.style.top = `${top}px`;
      panel.value.style.left = `${left}px`;
    }
    watch(() => [props.items, props.removable], () => nextTick(position), { deep: true });
    onMounted(() => {
      observer = new ResizeObserver(position);
      observer.observe(panel.value);
      observer.observe(props.anchor);
      window.addEventListener("resize", position);
      window.addEventListener("scroll", position, true);
      nextTick(position);
    });
    onBeforeUnmount(() => {
      observer?.disconnect();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
    });
    __expose({ contains: (target) => panel.value?.contains(target) });
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(_Teleport, { to: "body" }, [
        _createElementVNode("div", {
          ref_key: "panel",
          ref: panel,
          class: _normalizeClass(["wb-cascader__overflow-bubble", { "is-removable": __props.removable }]),
          "data-overlay-kind": __props.removable ? "popover" : "tooltip",
          onMouseleave: _cache[0] || (_cache[0] = ($event) => emit("dismiss")),
          onFocusout: _cache[1] || (_cache[1] = ($event) => emit("focusout", $event)),
          onKeydown: _withKeys(_withModifiers(dismiss, ["stop", "prevent"]), ["esc"])
        }, [
          _createElementVNode("div", {
            id: __props.id,
            ref_key: "content",
            ref: content,
            class: "wb-cascader__overflow-details",
            role: __props.removable ? "group" : "tooltip",
            "aria-label": __props.removable ? "\u8D85\u51FA\u90E8\u5206\u5DF2\u9009\u9879" : void 0
          }, [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(__props.items, (item) => {
                return _openBlock(), _createBlock(WorkbenchTag, {
                  key: item.key,
                  label: item.label,
                  action: __props.removable ? "remove" : "none",
                  disabled: item.disabled,
                  onRemove: ($event) => removeItem(item)
                }, null, 8, ["label", "action", "disabled", "onRemove"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 8, _hoisted_2),
          _createVNode(PopoverArrow, { class: "wb-cascader__overflow-arrow" })
        ], 42, _hoisted_1)
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-4e2a1494" });
