import { renderSlot as _renderSlot, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = { class: "wb-card-grid-container" };
const _hoisted_2 = {
  key: 0,
  class: "wb-card-grid__overlay",
  "data-wb-grid-overlay": "",
  "aria-hidden": "true"
};
const _hoisted_3 = { "data-wb-grid-label": "" };
import { onBeforeUnmount, onMounted, ref } from "vue";
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchCardGrid",
  props: {
    showGrid: { type: Boolean, default: false }
  },
  setup(__props) {
    const grid = ref(null);
    const columns = ref(1);
    let observer;
    function measureColumns() {
      if (!grid.value) return;
      columns.value = getComputedStyle(grid.value).gridTemplateColumns.split(" ").filter(Boolean).length;
    }
    onMounted(() => {
      observer = new ResizeObserver(measureColumns);
      observer.observe(grid.value);
      measureColumns();
    });
    onBeforeUnmount(() => observer?.disconnect());
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode(
          "div",
          {
            ref_key: "grid",
            ref: grid,
            class: _normalizeClass(["wb-card-grid", { "is-grid-visible": __props.showGrid }])
          },
          [
            _renderSlot(_ctx.$slots, "default"),
            __props.showGrid ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(columns.value, (column) => {
                  return _openBlock(), _createElementBlock("i", {
                    key: column,
                    "data-wb-grid-track": ""
                  }, [
                    _createElementVNode(
                      "span",
                      _hoisted_3,
                      _toDisplayString(column),
                      1
                      /* TEXT */
                    )
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : _createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
