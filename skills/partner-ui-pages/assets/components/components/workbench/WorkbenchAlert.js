import { createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, withCtx as _withCtx, createBlock as _createBlock, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["role", "aria-live"];
const _hoisted_2 = { class: "wb-alert__main" };
const _hoisted_3 = ["data-status-icon"];
const _hoisted_4 = { class: "wb-alert__copy" };
const _hoisted_5 = { key: 0 };
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import WorkbenchCheckbox from "../choice/WorkbenchCheckbox.vue";
import WorkbenchLink from "../link/WorkbenchLink.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import WorkbenchStatusIcon from "../icons/WorkbenchStatusIcon.vue";
const __sfc_main__ = {
  __name: "Alert",
  props: {
    modelValue: { type: Boolean, default: true },
    type: {
      type: String,
      default: "info",
      validator: (value) => ["info", "success", "warning", "danger", "critical", "error"].includes(value)
    },
    message: { type: String, required: true },
    linkLabel: { type: String, default: "" },
    linkHref: { type: String, default: "" },
    showIcon: { type: Boolean, default: true },
    showClose: { type: Boolean, default: true },
    checkboxLabel: { type: String, default: "" },
    checkboxChecked: { type: Boolean, default: false },
    surface: {
      type: String,
      default: void 0,
      validator: (value) => ["semantic", "neutral"].includes(value)
    },
    placement: {
      type: String,
      default: "page",
      validator: (value) => ["product", "global", "page", "card", "dialog"].includes(value)
    }
  },
  emits: ["update:modelValue", "update:checkboxChecked", "link", "close"],
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
    const emit = __emit;
    const resolvedSurface = computed(
      () => props.surface ?? (["product", "global"].includes(props.placement) ? "neutral" : "semantic")
    );
    const statusIconName = computed(() => `${statusIconSemantics[props.type]}/solid/14`);
    const role = computed(() => ["critical", "error"].includes(props.type) ? "alert" : "status");
    const alertRef = ref(null);
    const measureRef = ref(null);
    const isWrapped = ref(false);
    let resizeObserver;
    function tokenNumber(styles, name) {
      return Number.parseFloat(styles.getPropertyValue(name)) || 0;
    }
    function updateWrapping() {
      const alert = alertRef.value;
      const measure = measureRef.value;
      if (!alert || !measure) return;
      const styles = getComputedStyle(alert);
      const compactGap = tokenNumber(styles, "--wb-spacing-component-sm");
      const looseGap = Number.parseFloat(styles.columnGap) || 0;
      const contentWidth = alert.clientWidth - Number.parseFloat(styles.paddingLeft) - Number.parseFloat(styles.paddingRight);
      const icon = alert.querySelector(".wb-alert__icon");
      const checkbox = alert.querySelector(".wb-alert__checkbox");
      const closeButton = alert.querySelector(".wb-alert__close");
      const iconWidth = icon ? icon.getBoundingClientRect().width + compactGap : 0;
      const checkboxWidth = checkbox ? checkbox.getBoundingClientRect().width + looseGap : 0;
      const closeWidth = closeButton ? closeButton.getBoundingClientRect().width + looseGap : 0;
      isWrapped.value = measure.getBoundingClientRect().width + iconWidth + checkboxWidth + closeWidth > contentWidth;
    }
    function activateLink() {
      emit("link", { href: props.linkHref });
    }
    function updateCheckbox(checked) {
      emit("update:checkboxChecked", checked);
    }
    function close() {
      emit("update:modelValue", false);
      emit("close", { reason: "button", checkboxChecked: props.checkboxChecked });
    }
    watch(
      () => [
        props.modelValue,
        props.message,
        props.linkLabel,
        props.linkHref,
        props.showIcon,
        props.showClose,
        props.checkboxLabel
      ],
      () => nextTick(updateWrapping)
    );
    watch(
      alertRef,
      (current, previous) => {
        if (previous) resizeObserver?.unobserve(previous);
        if (current) resizeObserver?.observe(current);
        nextTick(updateWrapping);
      },
      { flush: "post" }
    );
    onMounted(() => {
      resizeObserver = new ResizeObserver(updateWrapping);
      if (alertRef.value) resizeObserver.observe(alertRef.value);
      nextTick(updateWrapping);
    });
    onBeforeUnmount(() => resizeObserver?.disconnect());
    return (_ctx, _cache) => {
      return __props.modelValue ? (_openBlock(), _createElementBlock("section", {
        key: 0,
        ref_key: "alertRef",
        ref: alertRef,
        class: _normalizeClass(["wb-alert", [
          `wb-alert--${__props.type}`,
          `is-${resolvedSurface.value}`,
          `is-${__props.placement}-placement`,
          { "has-icon": __props.showIcon, "is-wrapped": isWrapped.value }
        ]]),
        role: role.value,
        "aria-live": role.value === "alert" ? "assertive" : "polite"
      }, [
        _createElementVNode("div", _hoisted_2, [
          __props.showIcon ? (_openBlock(), _createElementBlock("span", {
            key: 0,
            class: "wb-alert__icon",
            "data-status-icon": statusIconName.value,
            "aria-hidden": "true"
          }, [
            _createVNode(WorkbenchStatusIcon, { name: statusIconName.value }, null, 8, ["name"])
          ], 8, _hoisted_3)) : _createCommentVNode("v-if", true),
          _createElementVNode("p", _hoisted_4, [
            _createElementVNode(
              "span",
              null,
              _toDisplayString(__props.message),
              1
              /* TEXT */
            ),
            __props.linkLabel && __props.linkHref ? (_openBlock(), _createBlock(WorkbenchLink, {
              key: 0,
              href: __props.linkHref,
              class: "wb-alert__link",
              onClick: activateLink
            }, {
              default: _withCtx(() => [
                _createTextVNode(
                  _toDisplayString(__props.linkLabel),
                  1
                  /* TEXT */
                )
              ]),
              _: 1
              /* STABLE */
            }, 8, ["href"])) : _createCommentVNode("v-if", true)
          ])
        ]),
        __props.checkboxLabel ? (_openBlock(), _createBlock(WorkbenchCheckbox, {
          key: 0,
          class: "wb-alert__checkbox",
          "model-value": __props.checkboxChecked,
          label: __props.checkboxLabel,
          "onUpdate:modelValue": updateCheckbox
        }, null, 8, ["model-value", "label"])) : _createCommentVNode("v-if", true),
        __props.showClose ? (_openBlock(), _createElementBlock("button", {
          key: 1,
          class: "wb-alert__close",
          type: "button",
          "aria-label": "\u5173\u95ED\u516C\u544A",
          onClick: close
        }, [
          _createVNode(WorkbenchIcon, { name: "/ic_public_close_line_10px" })
        ])) : _createCommentVNode("v-if", true),
        _createElementVNode(
          "span",
          {
            ref_key: "measureRef",
            ref: measureRef,
            class: "wb-alert__measure",
            "aria-hidden": "true"
          },
          [
            _createElementVNode(
              "span",
              null,
              _toDisplayString(__props.message),
              1
              /* TEXT */
            ),
            __props.linkLabel && __props.linkHref ? (_openBlock(), _createElementBlock(
              "span",
              _hoisted_5,
              _toDisplayString(__props.linkLabel),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true)
          ],
          512
          /* NEED_PATCH */
        )
      ], 10, _hoisted_1)) : _createCommentVNode("v-if", true);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
