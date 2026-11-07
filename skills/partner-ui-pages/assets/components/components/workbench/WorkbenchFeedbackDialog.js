import { createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createBlock as _createBlock, withCtx as _withCtx } from "vue";
const _hoisted_1 = ["aria-busy", "data-feedback-type"];
const _hoisted_2 = ["data-status-icon"];
const _hoisted_3 = { class: "feedback-dialog__buttons" };
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, onBeforeUnmount, ref, useId, watch } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchModal from "../modal/WorkbenchModal.vue";
import WorkbenchCheckbox from "../choice/WorkbenchCheckbox.vue";
import WorkbenchStatusIcon from "../icons/WorkbenchStatusIcon.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
const __sfc_main__ = {
  __name: "FeedbackDialog",
  props: {
    modelValue: { type: Boolean, default: false },
    type: { type: String, default: "info", validator: (value) => ["info", "success", "warning", "danger", "critical", "error"].includes(value) },
    title: { type: String, required: true },
    message: { type: String, required: true },
    showIcon: { type: Boolean, default: true },
    checkboxLabel: { type: String, default: "" },
    checkboxChecked: { type: Boolean, default: false },
    primaryAction: { type: Object, required: true },
    secondaryAction: { type: Object, default: null },
    pending: { type: Boolean, default: false },
    actionHandler: { type: Function, default: void 0 },
    beforeClose: { type: Function, default: void 0 },
    showGrid: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "update:checkboxChecked", "action", "close", "action-error", "close-error"],
  setup(__props, { emit: __emit }) {
    const statusIconSemantics = {
      info: "info",
      success: "success",
      warning: "warning",
      danger: "alert-orange",
      critical: "alert-red",
      error: "close_circle"
    };
    const props = __props;
    const messageId = `wb-feedback-message-${useId()}`;
    const statusIconName = computed(() => `${statusIconSemantics[props.type]}/solid/16`);
    const emit = __emit;
    const working = ref(false);
    let operation = 0;
    watch(() => props.modelValue, () => {
      operation += 1;
      working.value = false;
    }, { flush: "sync" });
    onBeforeUnmount(() => {
      operation += 1;
    });
    async function invokeAction(action, requestClose) {
      if (!action || action.disabled || working.value || props.pending) return;
      working.value = true;
      const currentOperation = ++operation;
      try {
        emit("action", action.id);
        if (await props.actionHandler?.(action) === false || currentOperation !== operation || !props.modelValue) return;
        await requestClose("action");
      } catch (error) {
        if (currentOperation === operation && props.modelValue) emit("action-error", { action, error });
      } finally {
        if (currentOperation === operation) working.value = false;
      }
    }
    async function guardClose(reason) {
      if (props.pending || working.value && reason !== "action") return false;
      const currentOperation = operation;
      try {
        const allowed = props.beforeClose ? await props.beforeClose(reason) : true;
        return allowed !== false && currentOperation === operation && props.modelValue && !props.pending;
      } catch (error) {
        if (currentOperation === operation && props.modelValue) emit("close-error", error);
        return false;
      }
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(WorkbenchModal, {
        "model-value": __props.modelValue,
        title: __props.title,
        "aria-describedby": messageId,
        size: "s",
        "close-on-mask": false,
        "close-on-esc": false,
        "before-close": guardClose,
        "show-grid": __props.showGrid,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => emit("update:modelValue", $event)),
        onClose: _cache[2] || (_cache[2] = ($event) => emit("close", $event))
      }, {
        "close-icon": _withCtx(() => [
          _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_14px" })
        ]),
        footer: _withCtx(({ requestClose }) => [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass(["feedback-dialog__actions", { "feedback-dialog__actions--with-icon": __props.showIcon }])
            },
            [
              __props.checkboxLabel ? (_openBlock(), _createBlock(WorkbenchCheckbox, {
                key: 0,
                class: "feedback-dialog__checkbox",
                disabled: working.value || __props.pending,
                "model-value": __props.checkboxChecked,
                label: __props.checkboxLabel,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("update:checkboxChecked", $event))
              }, null, 8, ["disabled", "model-value", "label"])) : _createCommentVNode("v-if", true),
              _createElementVNode("div", _hoisted_3, [
                __props.secondaryAction ? (_openBlock(), _createBlock(WorkbenchButton, {
                  key: 0,
                  appearance: "secondary",
                  disabled: __props.secondaryAction.disabled || working.value || __props.pending,
                  onClick: ($event) => invokeAction(__props.secondaryAction, requestClose)
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(
                      _toDisplayString(__props.secondaryAction.label),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "onClick"])) : _createCommentVNode("v-if", true),
                _createVNode(WorkbenchButton, {
                  disabled: __props.primaryAction.disabled || working.value || __props.pending,
                  onClick: ($event) => invokeAction(__props.primaryAction, requestClose)
                }, {
                  default: _withCtx(() => [
                    _createTextVNode(
                      _toDisplayString(__props.primaryAction.label),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["disabled", "onClick"])
              ])
            ],
            2
            /* CLASS */
          )
        ]),
        default: _withCtx(() => [
          _createElementVNode("div", {
            id: messageId,
            class: _normalizeClass(["feedback-dialog__message", [`feedback-dialog__message--${__props.type}`, { "feedback-dialog__message--with-icon": __props.showIcon }]]),
            "aria-busy": working.value || __props.pending,
            "data-feedback-type": __props.type
          }, [
            __props.showIcon ? (_openBlock(), _createElementBlock("span", {
              key: 0,
              class: "feedback-dialog__status-icon",
              "data-status-icon": statusIconName.value,
              "aria-hidden": "true"
            }, [
              _createVNode(WorkbenchStatusIcon, { name: statusIconName.value }, null, 8, ["name"])
            ], 8, _hoisted_2)) : _createCommentVNode("v-if", true),
            _createTextVNode(
              " " + _toDisplayString(__props.message),
              1
              /* TEXT */
            )
          ], 10, _hoisted_1)
        ]),
        _: 1
        /* STABLE */
      }, 8, ["model-value", "title", "show-grid"]);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
