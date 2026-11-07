import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, withCtx as _withCtx, normalizeClass as _normalizeClass, createSlots as _createSlots, createBlock as _createBlock } from "vue";
const _hoisted_1 = {
  key: 0,
  class: "transaction-field-status"
};
const _hoisted_2 = {
  key: 1,
  class: "transaction-field-value"
};
const _hoisted_3 = ["id"];
import { computed, onMounted, onBeforeUnmount, ref, useId } from "vue";
import WorkbenchForm from "../form/WorkbenchForm.vue";
import WorkbenchFormItem from "../form/WorkbenchFormItem.vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchTag from "../tag/WorkbenchTag.vue";
const __sfc_main__ = {
  __name: "WorkbenchReadonlyFields",
  props: {
    title: { type: String, required: true },
    titleVisible: { type: Boolean, default: false },
    model: { type: Object, required: true },
    fields: { type: Array, required: true },
    columns: { type: Number, default: 3 },
    labelPosition: { type: String, default: "left" },
    labelWidth: { type: String, default: "224px" },
    density: { type: String, default: "compact" }
  },
  emits: ["copy"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const copyLabelPrefix = `readonly-copy-${useId()}`;
    const root = ref(null);
    const width = ref(0);
    let observer;
    onMounted(() => {
      observer = new ResizeObserver(([entry]) => {
        width.value = entry.contentRect.width;
      });
      observer.observe(root.value);
    });
    onBeforeUnmount(() => observer?.disconnect());
    const values = computed(
      () => Object.fromEntries(
        props.fields.map((field) => [
          field.key,
          Object.hasOwn(field, "value") ? field.value : props.model[field.key]
        ])
      )
    );
    const activeColumns = computed(
      () => Math.min(
        Math.max(1, Math.min(4, props.columns || 1)),
        width.value < 656 ? 1 : width.value < 968 ? 2 : width.value < 1280 ? 3 : 4
      )
    );
    function sizeFor(field) {
      if (activeColumns.value === 1) return "";
      if (field.size) return field.size;
      if (activeColumns.value === 2) return "m";
      if (activeColumns.value === 3) return "base";
      return field.size || "";
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          ref_key: "root",
          ref: root,
          class: "readonly-fields",
          "data-readonly-fields": ""
        },
        [
          _createVNode(WorkbenchForm, {
            title: __props.title,
            "title-visible": __props.titleVisible,
            model: values.value,
            mode: "readonly",
            density: __props.density,
            "label-position": __props.labelPosition,
            "label-width": width.value < 656 ? "96px" : __props.labelWidth
          }, {
            default: _withCtx(() => [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(__props.fields, (field) => {
                  return _openBlock(), _createBlock(WorkbenchFormItem, {
                    key: field.key,
                    prop: field.key,
                    label: __props.labelPosition === "left" && !/[：:]$/.test(field.label) ? `${field.label}\uFF1A` : field.label,
                    size: sizeFor(field),
                    formatter: field.format,
                    class: _normalizeClass([
                      field.class,
                      {
                        "transaction-copy-field": field.copy,
                        "readonly-fields__full-row": activeColumns.value === 1
                      }
                    ]),
                    "data-field-key": field.key
                  }, _createSlots({
                    readonly: _withCtx(({ value, displayValue }) => [
                      _renderSlot(_ctx.$slots, `value-${field.key}`, {
                        value,
                        displayValue,
                        field
                      }, () => [
                        field.tone ? (_openBlock(), _createElementBlock("span", _hoisted_1, [
                          _createVNode(WorkbenchTag, {
                            label: String(displayValue),
                            variant: "status-subtle",
                            status: field.tone
                          }, null, 8, ["label", "status"])
                        ])) : (_openBlock(), _createElementBlock(
                          "span",
                          _hoisted_2,
                          _toDisplayString(displayValue),
                          1
                          /* TEXT */
                        ))
                      ])
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, [
                    field.copy ? {
                      name: "readonly-actions",
                      fn: _withCtx(({ value }) => [
                        _createElementVNode("span", {
                          id: `${copyLabelPrefix}-${field.key}`,
                          hidden: ""
                        }, "\u590D\u5236" + _toDisplayString(field.label), 9, _hoisted_3),
                        _createVNode(WorkbenchButton, {
                          appearance: "text",
                          "text-layout": "inline",
                          size: "28",
                          "aria-labelledby": `${copyLabelPrefix}-${field.key}`,
                          onClick: ($event) => emit("copy", { value, label: field.label, key: field.key })
                        }, {
                          default: _withCtx(() => [..._cache[0] || (_cache[0] = [
                            _createTextVNode(
                              "\u590D\u5236",
                              -1
                              /* CACHED */
                            )
                          ])]),
                          _: 1
                          /* STABLE */
                        }, 8, ["aria-labelledby", "onClick"])
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["prop", "label", "size", "formatter", "class", "data-field-key"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["title", "title-visible", "model", "density", "label-position", "label-width"])
        ],
        512
        /* NEED_PATCH */
      );
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-ea6adc83" });
