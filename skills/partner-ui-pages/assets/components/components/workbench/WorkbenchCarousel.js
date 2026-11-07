import { renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, Transition as _Transition, withCtx as _withCtx, createBlock as _createBlock, Fragment as _Fragment, createVNode as _createVNode, createElementVNode as _createElementVNode, renderList as _renderList, normalizeClass as _normalizeClass } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = { class: "wb-carousel__viewport" };
const _hoisted_3 = ["id", "aria-label"];
const _hoisted_4 = ["id", "aria-label"];
const _hoisted_5 = ["aria-controls", "disabled"];
const _hoisted_6 = ["aria-controls", "disabled"];
const _hoisted_7 = {
  key: 0,
  class: "wb-carousel__indicators",
  role: "group",
  "aria-label": "\u9009\u62E9\u56FE\u7247"
};
const _hoisted_8 = ["aria-label", "aria-current", "disabled", "onClick"];
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from "vue";
const __sfc_main__ = {
  __name: "WorkbenchCarousel",
  props: {
    modelValue: { type: Number, default: 0 },
    items: { type: Array, default: () => [] },
    ariaLabel: { type: String, default: "\u8D70\u9A6C\u706F" },
    disabled: { type: Boolean, default: false },
    autoplay: { type: Boolean, default: true },
    contentMotion: { type: Boolean, default: false },
    showNavigation: { type: Boolean, default: true },
    indicatorPlacement: { type: String, default: "overlay", validator: (value) => ["overlay", "below"].includes(value) },
    transitionStyle: { type: String, default: "fade", validator: (value) => ["fade", "slide"].includes(value) }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const instanceId = `wb-carousel-${useId()}`;
    const hovered = ref(false);
    const slideDirection = ref(1);
    const focused = ref(false);
    const documentHidden = ref(false);
    const reducedMotion = ref(false);
    let timer = null;
    let motionQuery = null;
    const contentAnimations = /* @__PURE__ */ new Set();
    function cancelContentMotion() {
      for (const animation of contentAnimations) animation.cancel();
      contentAnimations.clear();
    }
    function animateContent(element, entering, done) {
      if (!props.contentMotion || reducedMotion.value) {
        done?.();
        return;
      }
      const nodes = [...element.querySelectorAll("[data-wb-carousel-motion]")];
      const style = getComputedStyle(element);
      const token = (key) => parseFloat(style.getPropertyValue(`--wb-asset-wb-carousel-content-${key}`));
      const duration = token("duration"), stagger = token("stagger"), offset = token("offset");
      const animations = nodes.map((node, index) => {
        const animation = node.animate(
          entering ? [{ opacity: 0, transform: `translateY(${offset}px)` }, { opacity: 1, transform: "translateY(0)" }] : [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: `translateY(${offset}px)` }],
          { duration, delay: (entering ? index : nodes.length - index - 1) * stagger, easing: "ease-out", fill: "both" }
        );
        contentAnimations.add(animation);
        return animation;
      });
      Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
        for (const animation of animations) {
          animation.cancel();
          contentAnimations.delete(animation);
        }
        done?.();
      });
    }
    const motionSlide = ref(null);
    const displayedIndex = ref(Math.min(Math.max(Number.isInteger(props.modelValue) ? props.modelValue : 0, 0), Math.max(0, props.items.length - 1)));
    let motionRevision = 0;
    async function changeContent() {
      const revision = ++motionRevision;
      cancelContentMotion();
      if (props.contentMotion && motionSlide.value) await new Promise((done) => animateContent(motionSlide.value, false, done));
      if (revision !== motionRevision) return;
      displayedIndex.value = safeIndex.value;
      await nextTick();
      if (revision !== motionRevision || !props.contentMotion || !motionSlide.value) return;
      animateContent(motionSlide.value, true);
    }
    const itemCount = computed(() => props.items.length);
    const hasMultiple = computed(() => itemCount.value > 1);
    const safeIndex = computed(() => itemCount.value ? Math.min(Math.max(Number.isInteger(props.modelValue) ? props.modelValue : 0, 0), itemCount.value - 1) : 0);
    const activeItem = computed(() => props.items[safeIndex.value]);
    const shouldAutoplay = computed(() => hasMultiple.value && props.autoplay && !props.disabled && !hovered.value && !focused.value && !documentHidden.value && !reducedMotion.value);
    const slideId = (index) => `${instanceId}-slide-${index}`;
    function stopAutoplay() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }
    function syncAutoplay() {
      stopAutoplay();
      if (shouldAutoplay.value) timer = window.setInterval(() => goTo(safeIndex.value + 1), Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--wb-asset-wb-carousel-autoplay-interval")) || 5e3);
    }
    function normalized(index) {
      if (!itemCount.value) return 0;
      return (index % itemCount.value + itemCount.value) % itemCount.value;
    }
    function goTo(index, userInitiated = false) {
      if (!hasMultiple.value || props.disabled) return;
      const next = normalized(index);
      if (next !== safeIndex.value) slideDirection.value = index < safeIndex.value ? -1 : 1;
      if (next !== safeIndex.value) {
        emit("update:modelValue", next);
        emit("change", next, props.items[next]);
      }
      if (userInitiated) syncAutoplay();
    }
    function onKeydown(event) {
      if (props.disabled || !hasMultiple.value) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(safeIndex.value - 1, true);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(safeIndex.value + 1, true);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0, true);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(itemCount.value - 1, true);
      }
    }
    function onVisibilityChange() {
      documentHidden.value = document.hidden;
    }
    function onMotionChange(event) {
      reducedMotion.value = event.matches;
    }
    watch(() => [props.modelValue, itemCount.value], () => {
      if (itemCount.value && props.modelValue !== safeIndex.value) emit("update:modelValue", safeIndex.value);
    }, { immediate: true });
    watch([safeIndex, () => props.contentMotion, reducedMotion], changeContent);
    watch(shouldAutoplay, syncAutoplay, { immediate: true });
    watch(() => props.items, syncAutoplay, { deep: true });
    onMounted(() => {
      documentHidden.value = document.hidden;
      motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      reducedMotion.value = motionQuery.matches;
      document.addEventListener("visibilitychange", onVisibilityChange);
      motionQuery.addEventListener("change", onMotionChange);
      syncAutoplay();
    });
    onBeforeUnmount(() => {
      motionRevision += 1;
      cancelContentMotion();
      stopAutoplay();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery?.removeEventListener("change", onMotionChange);
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", {
        class: _normalizeClass(["wb-carousel", { "is-disabled": __props.disabled, "is-empty": !itemCount.value, "is-slide-reverse": slideDirection.value < 0, "wb-carousel--indicators-below": __props.indicatorPlacement === "below" }]),
        "aria-label": __props.ariaLabel,
        "aria-roledescription": "carousel",
        onMouseenter: _cache[2] || (_cache[2] = ($event) => hovered.value = true),
        onMouseleave: _cache[3] || (_cache[3] = ($event) => hovered.value = false),
        onFocusin: _cache[4] || (_cache[4] = ($event) => focused.value = true),
        onFocusout: _cache[5] || (_cache[5] = (event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) focused.value = false;
        }),
        onKeydown
      }, [
        _createElementVNode("div", _hoisted_2, [
          itemCount.value ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 0 },
            [
              __props.contentMotion ? (_openBlock(), _createElementBlock("div", {
                key: 0,
                ref_key: "motionSlide",
                ref: motionSlide,
                id: slideId(displayedIndex.value),
                class: "wb-carousel__slide",
                role: "group",
                "aria-roledescription": "slide",
                "aria-label": `${displayedIndex.value + 1} / ${itemCount.value}`
              }, [
                _renderSlot(_ctx.$slots, "slide", {
                  item: __props.items[displayedIndex.value],
                  index: displayedIndex.value,
                  selected: true
                }, () => [
                  _createTextVNode(
                    _toDisplayString(__props.items[displayedIndex.value]?.label),
                    1
                    /* TEXT */
                  )
                ])
              ], 8, _hoisted_3)) : (_openBlock(), _createBlock(_Transition, {
                key: 1,
                name: __props.transitionStyle === "slide" ? "wb-carousel-scroll" : "wb-carousel-slide"
              }, {
                default: _withCtx(() => [
                  (_openBlock(), _createElementBlock("div", {
                    id: slideId(safeIndex.value),
                    key: activeItem.value?.key ?? safeIndex.value,
                    class: "wb-carousel__slide",
                    role: "group",
                    "aria-roledescription": "slide",
                    "aria-label": `${safeIndex.value + 1} / ${itemCount.value}`
                  }, [
                    _renderSlot(_ctx.$slots, "slide", {
                      item: activeItem.value,
                      index: safeIndex.value,
                      selected: true
                    }, () => [
                      _createTextVNode(
                        _toDisplayString(activeItem.value?.label ?? activeItem.value?.key ?? `\u7B2C ${safeIndex.value + 1} \u9879`),
                        1
                        /* TEXT */
                      )
                    ])
                  ], 8, _hoisted_4))
                ]),
                _: 3
                /* FORWARDED */
              }, 8, ["name"]))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : _renderSlot(_ctx.$slots, "empty", {}, void 0, void 0, 1),
          hasMultiple.value ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 2 },
            [
              __props.showNavigation ? (_openBlock(), _createElementBlock("button", {
                key: 0,
                class: "wb-carousel__navigation wb-carousel__navigation--previous",
                type: "button",
                "aria-label": "\u4E0A\u4E00\u5F20",
                "aria-controls": slideId(safeIndex.value),
                disabled: __props.disabled,
                onClick: _cache[0] || (_cache[0] = ($event) => goTo(safeIndex.value - 1, true))
              }, [
                _createVNode(WorkbenchIcon, {
                  name: "\u7BAD\u5934/\u5C3A\u5BF8=16,\u65B9\u5411=\u5DE6\u7BAD\u5934",
                  size: 16
                })
              ], 8, _hoisted_5)) : _createCommentVNode("v-if", true),
              __props.showNavigation ? (_openBlock(), _createElementBlock("button", {
                key: 1,
                class: "wb-carousel__navigation wb-carousel__navigation--next",
                type: "button",
                "aria-label": "\u4E0B\u4E00\u5F20",
                "aria-controls": slideId(safeIndex.value),
                disabled: __props.disabled,
                onClick: _cache[1] || (_cache[1] = ($event) => goTo(safeIndex.value + 1, true))
              }, [
                _createVNode(WorkbenchIcon, {
                  name: "\u7BAD\u5934/\u5C3A\u5BF8=16,\u65B9\u5411=\u53F3\u7BAD\u5934",
                  size: 16
                })
              ], 8, _hoisted_6)) : _createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : _createCommentVNode("v-if", true)
        ]),
        hasMultiple.value ? (_openBlock(), _createElementBlock("div", _hoisted_7, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(__props.items, (item, index) => {
              return _openBlock(), _createElementBlock("button", {
                key: item.key,
                class: _normalizeClass(["wb-carousel__indicator", { "is-current": index === safeIndex.value }]),
                type: "button",
                "aria-label": `\u5207\u6362\u5230\u7B2C ${index + 1} \u5F20`,
                "aria-current": index === safeIndex.value ? "true" : void 0,
                disabled: __props.disabled,
                onClick: ($event) => goTo(index, true)
              }, [..._cache[6] || (_cache[6] = [
                _createElementVNode(
                  "span",
                  { class: "wb-carousel__indicator-mark" },
                  null,
                  -1
                  /* CACHED */
                )
              ])], 10, _hoisted_8);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : _createCommentVNode("v-if", true)
      ], 42, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});
