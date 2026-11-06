import { getCurrentScope, onScopeDispose, ref } from 'vue';
import { abortable, isAbortError } from '../../scaffold/chat/abort';
import type { OperationContext } from './types';

/** Product-owned request lifecycle: explicit retries, one mutation, and no stale commits. */
export function useRequests(copy: { loadError: string; actionError: string }) {
  const loading = ref(false);
  const busy = ref(false);
  const error = ref('');
  let disposed = false;
  let generation = 0;
  let loadController: AbortController | undefined;
  let actionController: AbortController | undefined;
  const keys = new Map<string, string>();
  async function load<T>(request: (signal: AbortSignal) => Promise<T>, commit: (value: T) => void) {
    if (disposed || busy.value) return;
    loadController?.abort();
    const controller = new AbortController();
    loadController = controller;
    const current = ++generation;
    loading.value = true;
    error.value = '';
    try {
      const value = await abortable(request(controller.signal), controller.signal);
      if (!disposed && current === generation) commit(value);
    } catch (cause) {
      if (!disposed && current === generation && !controller.signal.aborted && !isAbortError(cause))
        error.value = copy.loadError;
    } finally {
      if (!disposed && current === generation) loading.value = false;
    }
  }
  async function mutate<T>(
    intent: string,
    request: (context: OperationContext) => Promise<T>,
    commit: (value: T) => void,
  ) {
    if (disposed || busy.value || loading.value) return false;
    const controller = new AbortController();
    actionController = controller;
    const idempotencyKey = keys.get(intent) ?? crypto.randomUUID();
    keys.set(intent, idempotencyKey);
    busy.value = true;
    error.value = '';
    try {
      const value = await abortable(
        request({ signal: controller.signal, idempotencyKey }),
        controller.signal,
      );
      if (disposed || controller.signal.aborted) return false;
      commit(value);
      keys.delete(intent);
      return true;
    } catch (cause) {
      if (!disposed && !controller.signal.aborted && !isAbortError(cause))
        error.value = copy.actionError;
      return false;
    } finally {
      if (!disposed) busy.value = false;
    }
  }
  if (getCurrentScope())
    onScopeDispose(() => {
      disposed = true;
      generation++;
      loadController?.abort();
      actionController?.abort();
    });
  return { loading, busy, error, load, mutate };
}
