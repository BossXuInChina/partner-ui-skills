import type { AgreementAssistantAdapter } from 'huawei-partner-ai-ui';

/** The host supplies authenticated API implementations; no default transport or mock data exists. */
export function createAgreementAdapter(api: AgreementAssistantAdapter): AgreementAssistantAdapter {
  const continueStream = api.continueStream?.bind(api);
  return {
    stream: (query, signal, context) => api.stream(query, signal, context),
    ...(continueStream ? { continueStream } : {}),
    updateAgreement: (id, patch, context) => api.updateAgreement(id, patch, context),
    renewAgreement: (id, context) => api.renewAgreement(id, context),
  };
}
