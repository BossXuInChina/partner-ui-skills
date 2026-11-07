import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, withCtx as _withCtx, createVNode as _createVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = { class: "wb-draft-list-filter" };
const _hoisted_2 = { class: "wb-draft-list-filter__fields" };
const _hoisted_3 = { class: "wb-draft-list-filter__actions" };
import WorkbenchButton from "../button/WorkbenchButton.vue";
const __sfc_main__ = {
  __name: "WorkbenchDraftListFilter",
  props: {
    fieldCount: {
      type: Number,
      default: 1,
      validator: (value) => Number.isInteger(value) && value >= 1 && value <= 4
    },
    applyLabel: { type: String, default: "\u67E5\u8BE2" },
    resetLabel: { type: String, default: "\u91CD\u7F6E" }
  },
  emits: ["apply", "reset"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function apply() {
      emit("apply");
    }
    function reset() {
      emit("reset");
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        _createElementVNode(
          "div",
          {
            class: _normalizeClass(["wb-draft-list-filter__layout", `has-${["one", "two", "three", "four"][props.fieldCount - 1]}-fields`])
          },
          [
            _createElementVNode("div", _hoisted_2, [
              _renderSlot(_ctx.$slots, "default")
            ]),
            _createElementVNode("div", _hoisted_3, [
              _renderSlot(_ctx.$slots, "actions", {
                apply,
                reset
              }, () => [
                _createVNode(WorkbenchButton, {
                  appearance: "secondary",
                  onClick: reset
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(
                      _toDisplayString(__props.resetLabel),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }),
                _createVNode(WorkbenchButton, { onClick: apply }, {
                  default: _withCtx(() => [
                    _createTextVNode(
                      _toDisplayString(__props.applyLabel),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ])
          ],
          2
          /* CLASS */
        )
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
