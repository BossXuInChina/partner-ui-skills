import { computed, createVNode, defineComponent, h, inject, isVNode, provide } from "vue";
import { localIcons, LocalWindowModeIcon } from "../../assets/ai-icons/localIcons";
import "./aiIcons.css";
const defaults = {
  "assistant.fallback": { component: localIcons.ai },
  "panel.mode": { component: LocalWindowModeIcon },
  "panel.newConversation": { component: localIcons.newConversation },
  "panel.history": { component: localIcons.history },
  "panel.fullscreen": { component: localIcons.fullscreen },
  "panel.exitFullscreen": { component: localIcons.exitFullscreen },
  "panel.close": { component: localIcons.close },
  "composer.voice": { component: localIcons.voice },
  "composer.image": { component: localIcons.image },
  "composer.send": { component: localIcons.send },
  "composer.stop": { component: localIcons.stop },
  "composer.mode": { component: localIcons.thinking, color: "original" },
  "composer.expand": { component: localIcons.modeArrow },
  "composer.selected": { component: localIcons.check },
  "alert.error": { component: localIcons.error },
  "message.regenerate": { component: localIcons.regenerate },
  "message.copy": { component: localIcons.copy },
  "message.like": { component: localIcons.like },
  "message.dislike": { component: localIcons.dislike },
  "message.bookmark": { component: localIcons.bookmark },
  "message.followUp": { component: localIcons.right },
  "history.clear": { component: localIcons.clear },
  "history.search": { component: localIcons.search },
  "history.clearSearch": { component: localIcons.close },
  "history.pin": { component: localIcons.pin },
  "history.more": { component: localIcons.more },
  "welcome.entry": { component: localIcons.welcomePurple, color: "original" },
  "smart.mark": { component: localIcons.smartFilled, color: "gradient" },
  "business.navigate": { component: localIcons.businessNavigate },
  "business.close": { component: localIcons.close },
  "business.success": { component: localIcons.success, color: "original" }
};
for (const entry of Object.values(defaults)) Object.freeze(entry);
export const defaultAiIcons = Object.freeze(defaults);
const iconScope = Symbol("partner-ai-icons");
export function provideAiIcons(local) {
  const parent = inject(iconScope, void 0);
  const merged = computed(() => {
    const result = { ...parent?.value };
    for (const [name, value] of Object.entries(local.value ?? {})) if (value != null) result[name] = value;
    return result;
  });
  provide(iconScope, merged);
  return merged;
}
function definition(value, name) {
  const entry = typeof value === "object" && value && "component" in value ? value : { component: value };
  if (!entry.component || !["object", "function"].includes(typeof entry.component) || isVNode(entry.component)) throw new TypeError("AI icons require a trusted Vue component, not markup, URLs or VNodes");
  if (entry.color && !["inherit", "original", "gradient"].includes(entry.color)) throw new TypeError("Unknown AI icon color policy");
  if (entry.color === "gradient" && name !== "smart.mark") throw new TypeError("Gradient icons are supported only for smart.mark");
  return entry;
}
export function useAiIconDefinition(name) {
  const scope = inject(iconScope, void 0);
  return computed(() => definition(scope?.value[name] ?? defaultAiIcons[name], name));
}
export const AiIcon = defineComponent({
  name: "AiIcon",
  inheritAttrs: false,
  props: { name: { type: String, required: true } },
  setup(props, { attrs }) {
    const scope = inject(iconScope, void 0);
    return () => {
      const entry = definition(scope?.value[props.name] ?? defaultAiIcons[props.name], props.name);
      return h(entry.component, { ...attrs, "aria-hidden": "true", focusable: "false", "data-ai-icon": props.name, "data-ai-icon-color": entry.color ?? "inherit" });
    };
  }
});
export const AiIconProvider = defineComponent({
  name: "AiIconProvider",
  props: { icons: { type: Object, default: void 0 } },
  setup(props, { slots }) {
    provideAiIcons(computed(() => props.icons));
    return () => slots.default?.();
  }
});
export function aiIconVNode(name, attrs = {}) {
  return createVNode(AiIcon, { ...attrs, name }, null, 0, null, true);
}
