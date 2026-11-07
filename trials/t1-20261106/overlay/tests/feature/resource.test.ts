import { effectScope, nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { useResource } from '../../src/features/agreements/useResource';
describe('agreement loading', () => {
  it('aborts and ignores obsolete requests, supports retry and disposal', async () => {
    const pending: Array<{ resolve: (v: string) => void; signal: AbortSignal }> = [];
    const scope = effectScope();
    const resource = scope.run(() =>
      useResource<string>((signal) => new Promise((resolve) => pending.push({ resolve, signal }))),
    );
    if (!resource) throw new Error('missing scope');
    const first = resource.reload();
    const second = resource.reload();
    expect(pending[0]?.signal.aborted).toBe(true);
    pending[1]?.resolve('new');
    await second;
    pending[0]?.resolve('old');
    await first;
    expect(resource.data.value).toBe('new');
    void resource.reload();
    scope.stop();
    expect(pending[2]?.signal.aborted).toBe(true);
  });
  it('reports errors then retries', async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce('ok');
    const scope = effectScope();
    const r = scope.run(() => useResource<string>(fn));
    if (!r) throw new Error('scope');
    await r.reload();
    expect(r.error.value).toBe(true);
    await r.reload();
    await nextTick();
    expect(r.data.value).toBe('ok');
    scope.stop();
  });
});
