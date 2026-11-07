import { onScopeDispose, ref, shallowRef } from 'vue';
export function useResource<T>(load: (signal: AbortSignal) => Promise<T>) {
  const data = shallowRef<T>();
  const loading = ref(false);
  const error = ref(false);
  let controller: AbortController | undefined;
  let epoch = 0;
  async function reload() {
    controller?.abort();
    const current = ++epoch;
    const next = new AbortController();
    controller = next;
    loading.value = true;
    error.value = false;
    data.value = undefined;
    try {
      const result = await load(next.signal);
      if (current === epoch && !next.signal.aborted) data.value = result;
    } catch {
      if (current === epoch && !next.signal.aborted) error.value = true;
    } finally {
      if (current === epoch) loading.value = false;
    }
  }
  onScopeDispose(() => {
    epoch++;
    controller?.abort();
  });
  return { data, loading, error, reload };
}
