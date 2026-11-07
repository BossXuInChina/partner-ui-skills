import { inject, type InjectionKey } from 'vue';
import type { Agreement, BusinessNavigationTarget } from 'huawei-partner-ai-ui';

export interface BusinessRendererActions {
  navigate(target: BusinessNavigationTarget): void;
  openAgreement(agreement: Agreement): void;
}
export const businessRendererActions: InjectionKey<BusinessRendererActions> = Symbol(
  'business-renderer-actions',
);
export function useBusinessRendererActions(): BusinessRendererActions {
  const actions = inject(businessRendererActions);
  if (!actions) throw new Error('BUSINESS_RENDERER_ACTIONS_REQUIRED');
  return actions;
}
