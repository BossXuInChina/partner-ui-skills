import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, withCtx as _withCtx, createSlots as _createSlots, createVNode as _createVNode, createBlock as _createBlock } from "vue";
const _hoisted_1 = { class: "sectioned-editor" };
import WorkbenchCard from "../card/WorkbenchCard.vue";
import WorkbenchContentSection from "../content-section/WorkbenchContentSection.vue";
const __sfc_main__ = {
  __name: "WorkbenchSectionedEditor",
  props: {
    sections: { type: Array, required: true }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("div", _hoisted_1, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(__props.sections, (section) => {
            return _openBlock(), _createBlock(
              WorkbenchCard,
              {
                key: section.id
              },
              {
                default: _withCtx(() => [
                  _createVNode(WorkbenchContentSection, {
                    title: section.title
                  }, _createSlots({
                    default: _withCtx(() => [
                      _renderSlot(_ctx.$slots, section.id, { section }, () => [
                        _renderSlot(_ctx.$slots, "default", { section })
                      ])
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, [
                    _ctx.$slots[section.id + "-actions"] ? {
                      name: "actions",
                      fn: _withCtx(() => [
                        _renderSlot(_ctx.$slots, section.id + "-actions", { section })
                      ]),
                      key: "0"
                    } : void 0,
                    _ctx.$slots[section.id + "-footer"] ? {
                      name: "footer",
                      fn: _withCtx(() => [
                        _renderSlot(_ctx.$slots, section.id + "-footer", { section })
                      ]),
                      key: "1"
                    } : void 0
                  ]), 1032, ["title"])
                ]),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-c50e9e95" });
