import { defineComponent as _defineComponent } from "vue";
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, unref as _unref, createBlock as _createBlock, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, vShow as _vShow, withDirectives as _withDirectives, renderSlot as _renderSlot, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["id", "aria-selected", "aria-controls", "disabled", "tabindex", "onClick", "onKeydown"];
const _hoisted_3 = { class: "workspace-smart-tabs__label" };
const _hoisted_4 = ["id", "aria-labelledby"];
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, useSlots, watch } from "vue";
import WorkspaceSmartIcon from "./WorkspaceSmartIcon.vue";
import "./workspaceIntelligence.css";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkspaceSmartTabs",
  props: {
    modelValue: {},
    items: {},
    ariaLabel: { default: "\u667A\u6167\u9875\u7B7E" },
    align: { default: "center" }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots(), id = `workspace-tabs-${useId()}`;
    const port = ref(), track = ref(), indicator = ref();
    const active = computed(() => props.items.findIndex((item) => item.value === props.modelValue && !item.disabled));
    const entry = computed(() => active.value >= 0 ? active.value : props.items.findIndex((item) => !item.disabled));
    let observer, frame = 0;
    const tabId = (index) => `${id}-tab-${index}`, panelId = (index) => `${id}-panel-${index}`;
    function tab(index) {
      return track.value?.querySelectorAll("[role=tab]")[index];
    }
    function measure() {
      frame = 0;
      const node = tab(active.value);
      if (!node || !indicator.value) return;
      indicator.value.style.width = `${node.offsetWidth}px`;
      indicator.value.style.transform = `translateX(${node.offsetLeft}px)`;
      reveal(active.value);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }
    function reveal(index) {
      const node = tab(index), viewport = port.value;
      if (!node || !viewport) return;
      const left = node.offsetLeft, right = left + node.offsetWidth;
      if (left < viewport.scrollLeft) viewport.scrollLeft = left;
      else if (right > viewport.scrollLeft + viewport.clientWidth) viewport.scrollLeft = right - viewport.clientWidth;
    }
    function select(item, index, focus = false) {
      if (item.disabled) return;
      if (item.value !== props.modelValue) {
        emit("update:modelValue", item.value);
        emit("change", item);
      }
      if (focus) void nextTick(() => {
        tab(index)?.focus({ preventScroll: true });
        reveal(index);
      });
    }
    function keydown(event, index) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      const enabled = props.items.flatMap((item, i) => item.disabled ? [] : [i]);
      if (!enabled.length) return;
      event.preventDefault();
      const at = enabled.indexOf(index), direction = event.key === "ArrowRight" ? 1 : -1;
      const target = event.key === "Home" ? enabled[0] : event.key === "End" ? enabled.at(-1) : enabled[(Math.max(0, at) + direction + enabled.length) % enabled.length];
      select(props.items[target], target, true);
    }
    watch(() => [props.modelValue, props.items, props.align], () => {
      void nextTick(() => {
        schedule();
        if (active.value >= 0) reveal(active.value);
      });
    }, { deep: true });
    onMounted(() => {
      observer = new ResizeObserver(schedule);
      if (port.value) observer.observe(port.value);
      if (track.value) observer.observe(track.value);
      document.fonts?.addEventListener("loadingdone", schedule);
      schedule();
    });
    onBeforeUnmount(() => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      document.fonts?.removeEventListener("loadingdone", schedule);
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock(
        "div",
        {
          class: _normalizeClass(["workspace-smart-tabs", `workspace-smart-tabs--${__props.align}`])
        },
        [
          _createElementVNode(
            "div",
            {
              ref_key: "port",
              ref: port,
              class: "workspace-smart-tabs__viewport"
            },
            [
              _createElementVNode("div", {
                ref_key: "track",
                ref: track,
                class: "workspace-smart-tabs__list",
                role: "tablist",
                "aria-label": __props.ariaLabel
              }, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(__props.items, (item, index) => {
                    return _openBlock(), _createElementBlock("button", {
                      id: tabId(index),
                      key: item.value,
                      type: "button",
                      role: "tab",
                      class: "workspace-smart-tabs__tab",
                      "aria-selected": index === active.value,
                      "aria-controls": _unref(slots).panel ? panelId(index) : void 0,
                      disabled: item.disabled,
                      tabindex: index === entry.value ? 0 : -1,
                      onClick: ($event) => select(item, index),
                      onKeydown: ($event) => keydown($event, index)
                    }, [
                      _createElementVNode("span", _hoisted_3, [
                        item.smart ? (_openBlock(), _createBlock(WorkspaceSmartIcon, { key: 0 })) : _createCommentVNode("v-if", true),
                        _createTextVNode(
                          _toDisplayString(item.label),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 40, _hoisted_2);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                _withDirectives(_createElementVNode(
                  "span",
                  {
                    ref_key: "indicator",
                    ref: indicator,
                    class: "workspace-smart-tabs__indicator",
                    "aria-hidden": "true"
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [_vShow, active.value >= 0]
                ])
              ], 8, _hoisted_1)
            ],
            512
            /* NEED_PATCH */
          ),
          _unref(slots).panel ? (_openBlock(true), _createElementBlock(
            _Fragment,
            { key: 0 },
            _renderList(__props.items, (item, index) => {
              return _withDirectives((_openBlock(), _createElementBlock("section", {
                id: panelId(index),
                key: item.value,
                class: "workspace-smart-tabs__panel",
                role: "tabpanel",
                "aria-labelledby": tabId(index),
                tabindex: "0"
              }, [
                _renderSlot(_ctx.$slots, "panel", { item })
              ], 8, _hoisted_4)), [
                [_vShow, index === active.value]
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      );
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-74c473d3" });
