import { createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createVNode as _createVNode, mergeProps as _mergeProps, withCtx as _withCtx } from "vue";
const _hoisted_1 = {
  class: "followup",
  "aria-label": "\u65B0\u589E\u9057\u7559\u4EFB\u52A1"
};
const _hoisted_2 = { class: "followup__body" };
const _hoisted_3 = { class: "followup__fields" };
const _hoisted_4 = { class: "followup__actions" };
const _hoisted_5 = { class: "followup__action" };
const _hoisted_6 = { class: "followup__action" };
import { nextTick } from "vue";
import WorkbenchInput from "../input/WorkbenchInput.vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchTooltip from "../tooltip/WorkbenchTooltip.vue";
const __sfc_main__ = {
  __name: "WorkbenchFollowupRows",
  props: {
    rows: { type: Array, required: true },
    members: { type: Array, default: () => [] }
  },
  emits: ["add", "delete", "update-field"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const taskInputs = /* @__PURE__ */ new Map();
    function setTaskInput(id, element) {
      if (element) taskInputs.set(id, element);
      else taskInputs.delete(id);
    }
    function focusTask(id) {
      taskInputs.get(id)?.focus();
    }
    async function add(id) {
      const previous = new Set(props.rows.map((row) => row.id));
      emit("add", id);
      await nextTick();
      const inserted = props.rows.find((row) => !previous.has(row.id));
      if (inserted) focusTask(inserted.id);
    }
    async function remove(id) {
      if (props.rows.length <= 1) return;
      const index = props.rows.findIndex((row) => row.id === id);
      const adjacent = props.rows[index + 1] ?? props.rows[index - 1];
      emit("delete", id);
      await nextTick();
      if (adjacent && !props.rows.some((row) => row.id === id)) focusTask(adjacent.id);
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", _hoisted_1, [
        _cache[0] || (_cache[0] = _createElementVNode(
          "h2",
          null,
          "\u65B0\u589E\u9057\u7559\u4EFB\u52A1",
          -1
          /* CACHED */
        )),
        _createElementVNode("div", _hoisted_2, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(__props.rows, (row, index) => {
              return _openBlock(), _createElementBlock("div", {
                key: row.id,
                class: "followup__row"
              }, [
                _createElementVNode("div", _hoisted_3, [
                  _createVNode(WorkbenchInput, {
                    ref_for: true,
                    ref: (input) => setTaskInput(row.id, input),
                    "model-value": row.name,
                    "prefix-value": row.member?.[0] || "",
                    "prefix-options": __props.members,
                    "prefix-placeholder": "\u8BF7\u9009\u62E9\u6210\u5458",
                    "show-prefix-icon": false,
                    size: "32",
                    "onUpdate:modelValue": ($event) => emit("update-field", row.id, "name", $event),
                    "onUpdate:prefixValue": ($event) => emit("update-field", row.id, "member", $event ? [$event] : []),
                    "aria-label": `\u7B2C${index + 1}\u884C\u4EFB\u52A1`,
                    placeholder: "\u8BF7\u8F93\u5165\u8BE5\u6210\u5458\u5BF9\u5E94\u7684\u4EFB\u52A1"
                  }, null, 8, ["model-value", "prefix-value", "prefix-options", "onUpdate:modelValue", "onUpdate:prefixValue", "aria-label"])
                ]),
                _createElementVNode("div", _hoisted_4, [
                  _createElementVNode("span", _hoisted_5, [
                    _createVNode(WorkbenchTooltip, {
                      content: __props.rows.length === 1 ? "\u81F3\u5C11\u4FDD\u7559\u4E00\u6761\u4EFB\u52A1" : "\u5220\u9664\u6B64\u4EFB\u52A1"
                    }, {
                      trigger: _withCtx(({ aria }) => [
                        _createVNode(WorkbenchButton, _mergeProps({ ref_for: true }, aria, {
                          appearance: "icon",
                          "icon-layout": "container",
                          size: "24",
                          "aria-label": `\u5220\u9664\u7B2C${index + 1}\u884C`,
                          disabled: __props.rows.length === 1,
                          onClick: ($event) => remove(row.id)
                        }), {
                          icon: _withCtx(() => [
                            _createVNode(WorkbenchIcon, {
                              name: "/ic_public_minus_line_14px",
                              size: 14
                            })
                          ]),
                          _: 1
                          /* STABLE */
                        }, 16, ["aria-label", "disabled", "onClick"])
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["content"])
                  ]),
                  _createElementVNode("span", _hoisted_6, [
                    _createVNode(
                      WorkbenchTooltip,
                      { content: "\u5728\u4E0B\u65B9\u65B0\u589E\u4EFB\u52A1" },
                      {
                        trigger: _withCtx(({ aria }) => [
                          _createVNode(WorkbenchButton, _mergeProps({ ref_for: true }, aria, {
                            appearance: "icon",
                            "icon-layout": "container",
                            size: "24",
                            "aria-label": `\u5728\u7B2C${index + 1}\u884C\u540E\u65B0\u589E`,
                            onClick: ($event) => add(row.id)
                          }), {
                            icon: _withCtx(() => [
                              _createVNode(WorkbenchIcon, {
                                name: "/ic_public_plus_line_14px",
                                size: 14
                              })
                            ]),
                            _: 1
                            /* STABLE */
                          }, 16, ["aria-label", "onClick"])
                        ]),
                        _: 2
                        /* DYNAMIC */
                      },
                      1024
                      /* DYNAMIC_SLOTS */
                    )
                  ])
                ])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-73f7fd4b" });
