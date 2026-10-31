import { getCurrentScope, onScopeDispose, readonly, ref } from 'vue';
import type { BlankApi } from './api';
import { copy } from './locale';

export function usePage(api: BlankApi, createId: () => string = () => crypto.randomUUID()) {
  const count = ref(0);
  const busy = ref(false);
  const error = ref('');
  let active: AbortController | undefined;
  let disposed = false;
  let operationId: string | undefined;

  async function primary() {
    if (busy.value || disposed) return;
    const controller = new AbortController();
    active = controller;
    busy.value = true;
    error.value = '';
    try {
      operationId ??= createId();
      await api.primary({ signal: controller.signal, idempotencyKey: operationId });
      if (!controller.signal.aborted && !disposed) {
        count.value++;
        operationId = undefined;
      }
    } catch {
      if (!controller.signal.aborted && !disposed) error.value = copy.error;
    } finally {
      if (active === controller) active = undefined;
      if (!disposed) busy.value = false;
    }
  }

  if (getCurrentScope())
    onScopeDispose(() => {
      disposed = true;
      active?.abort();
    });

  return { count: readonly(count), busy: readonly(busy), error: readonly(error), primary };
}
