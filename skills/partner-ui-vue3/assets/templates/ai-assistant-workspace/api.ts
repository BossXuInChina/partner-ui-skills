import type { Agreement, AgreementAssistantAdapter } from 'huawei-partner-ai-ui';
import type { BusinessActionContext } from '@scaffold/chat/types';
import type { AgreementRange, WorkspaceData, WorkspaceNavigationTarget } from './types';
/** Assumed business contracts; host supplies verified endpoint/auth/serialization/decoders. */
export interface AssistantWorkspaceApi {
  listAgreements(input: { range: AgreementRange }, signal: AbortSignal): Promise<Agreement[]>;
  listInsights(signal: AbortSignal): Promise<WorkspaceData['insights']>;
  assistant: AgreementAssistantAdapter;
  renew(ids: readonly string[], context: BusinessActionContext): Promise<Agreement[]>;
  navigate(
    target: WorkspaceNavigationTarget,
    params?: Readonly<Record<string, string>>,
  ): void | Promise<void>;
}
