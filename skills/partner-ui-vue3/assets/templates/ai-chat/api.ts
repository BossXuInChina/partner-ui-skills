import type { ChatTransport } from '@scaffold/chat/types';
import type { ChatNavigationTarget, RegionSalesPart } from './types';
/** Assumed stream envelope: ChatRequest -> SSE ChatDelta<RegionSalesPart>. Host owns URL/auth. */
export interface AiChatApi extends ChatTransport<RegionSalesPart> {
  navigate(
    target: ChatNavigationTarget,
    params?: Readonly<Record<string, string>>,
  ): void | Promise<void>;
}
