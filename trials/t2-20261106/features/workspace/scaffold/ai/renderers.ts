import { defineComponent, h, markRaw, provide, type Component, type PropType } from 'vue';
import type { BubbleMessage, BubbleContentRendererMatch } from '@opentiny/tiny-robot';
import type { Agreement, BusinessNavigationTarget } from 'huawei-partner-ai-ui';
import SummaryRenderer from './renderers/SummaryRenderer.vue';
import NavigationRenderer from './renderers/BusinessNavigationRenderer.vue';
import AgreementRenderer from './renderers/AgreementTableRenderer.vue';
import { businessRendererActions, type BusinessRendererActions } from './renderer-context';
import { isSummaryPart, isNavigationPart, isAgreementsPart } from './parts';

export type NavigationHandler = (params: Readonly<Record<string, string>> | undefined) => void;
export interface BusinessRendererOptions<Target extends string> {
  targets: Readonly<Record<Target, NavigationHandler>>;
  openAgreement(agreement: Agreement): void;
  unknownTarget?(target: BusinessNavigationTarget): void;
}
function withActions(component: Component, actions: BusinessRendererActions) {
  return markRaw(
    defineComponent({
      name: 'BusinessMessageRenderer',
      props: {
        message: { type: Object as PropType<BubbleMessage>, required: true },
        contentIndex: { type: Number, required: true },
      },
      setup(props) {
        provide(businessRendererActions, actions);
        return () => h(component, props);
      },
    }),
  );
}
export function createBusinessRenderers<Target extends string>(
  options: BusinessRendererOptions<Target>,
): BubbleContentRendererMatch[] {
  const actions: BusinessRendererActions = {
    navigate(target) {
      if (Object.prototype.hasOwnProperty.call(options.targets, target.target))
        options.targets[target.target as Target](target.params);
      else options.unknownTarget?.(target);
    },
    openAgreement: (agreement) => options.openAgreement(agreement),
  };
  return [
    {
      find: (_message, part) => isSummaryPart(part),
      renderer: markRaw(SummaryRenderer),
      priority: -30,
    },
    {
      find: (_message, part) => isNavigationPart(part),
      renderer: withActions(NavigationRenderer, actions),
      priority: -30,
    },
    {
      find: (_message, part) => isAgreementsPart(part),
      renderer: withActions(AgreementRenderer, actions),
      priority: -30,
    },
  ];
}
