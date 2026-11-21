import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, mergeProps as _mergeProps, withCtx as _withCtx, createVNode as _createVNode, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["data-field-key"];
const _hoisted_3 = ["tabindex"];
const _hoisted_4 = { class: "record-fields__label wb-static-field__label" };
const _hoisted_5 = {
  key: 0,
  class: "record-fields__link"
};
const _hoisted_6 = { class: "record-fields__link-label" };
const _hoisted_7 = ["data-value-color"];
const _hoisted_8 = {
  key: 0,
  class: "record-fields__action"
};
const _hoisted_9 = {
  key: 1,
  class: "record-fields__copy"
};
import "../shared/static-field.css";
import { computed } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchLink from "../link/WorkbenchLink.vue";
import WorkbenchTooltip from "../tooltip/WorkbenchTooltip.vue";
const __sfc_main__ = {
  __name: "WorkbenchStaticFields",
  props: {
    label: { type: String, required: true },
    model: { type: Object, required: true },
    fields: { type: Array, required: true }
  },
  emits: ["copy"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function displayValue(value) {
      if (Array.isArray(value)) return value.join("\u3001") || "\u2014";
      if (typeof value === "boolean") return value ? "\u662F" : "\u5426";
      return value == null || value === "" ? "\u2014" : String(value);
    }
    const entries = computed(
      () => props.fields.map((field) => {
        const value = Object.hasOwn(field, "value") ? field.value : props.model[field.key];
        const label = /[：:]$/.test(field.label) ? field.label : `${field.label}\uFF1A`;
        const text = field.format ? String(field.format(value, props.model) ?? "\u2014") : displayValue(value);
        return { ...field, labelText: label, value, text };
      })
    );
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("ul", {
        class: "record-fields",
        "aria-label": __props.label,
        role: "list"
      }, [
        (_openBlock(true), _createElementBlock(
          _Fragment,
          null,
          _renderList(entries.value, (field) => {
            return _openBlock(), _createElementBlock("li", {
              key: field.key,
              class: "record-fields__item",
              "data-field-key": field.key
            }, [
              _createVNode(WorkbenchTooltip, {
                content: `${field.labelText}${field.text}`,
                "overflow-only": ""
              }, {
                trigger: _withCtx(({ aria }) => [
                  _createElementVNode("span", _mergeProps({
                    class: "record-fields__text wb-static-field",
                    tabindex: field.href ? void 0 : 0,
                    "data-record-field-text": ""
                  }, { ref_for: true }, field.href ? {} : aria), [
                    _createElementVNode(
                      "span",
                      _hoisted_4,
                      _toDisplayString(field.labelText),
                      1
                      /* TEXT */
                    ),
                    field.href ? (_openBlock(), _createElementBlock("span", _hoisted_5, [
                      _createVNode(WorkbenchLink, _mergeProps({
                        href: field.href,
                        target: field.target
                      }, { ref_for: true }, aria), {
                        default: _withCtx(() => [
                          _createElementVNode(
                            "span",
                            _hoisted_6,
                            _toDisplayString(field.text),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1040, ["href", "target"])
                    ])) : (_openBlock(), _createElementBlock("span", {
                      key: 1,
                      class: "record-fields__value",
                      "data-value-color": field.color
                    }, [
                      _renderSlot(_ctx.$slots, `value-${field.key}`, { field }, () => [
                        _createTextVNode(
                          _toDisplayString(field.text),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 8, _hoisted_7))
                  ], 16, _hoisted_3)
                ]),
                _: 2
                /* DYNAMIC */
              }, 1032, ["content"]),
              _ctx.$slots[`action-${field.key}`] ? (_openBlock(), _createElementBlock("span", _hoisted_8, [
                _renderSlot(_ctx.$slots, `action-${field.key}`, { field })
              ])) : _createCommentVNode("v-if", true),
              field.copy ? (_openBlock(), _createElementBlock("span", _hoisted_9, [
                _createVNode(WorkbenchButton, {
                  appearance: "icon",
                  size: "24",
                  "aria-label": `\u590D\u5236${field.label}`,
                  onClick: ($event) => emit("copy", { value: field.value, label: field.label, key: field.key })
                }, {
                  icon: _withCtx(() => [..._cache[0] || (_cache[0] = [
                    _createElementVNode(
                      "span",
                      {
                        class: "record-fields__copy-icon",
                        "aria-hidden": "true"
                      },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])]),
                  _: 1
                  /* STABLE */
                }, 8, ["aria-label", "onClick"])
              ])) : _createCommentVNode("v-if", true)
            ], 8, _hoisted_2);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ], 8, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-ae35d99f" });
