import { effectScope } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { usePage } from '../usePage';

describe('blank template action', () => {
  it('waits for the injected action, prevents duplicate submits and counts only successful actions', async () => {
    let finish!: () => void;
    const api = {
      primary: vi.fn(
        () =>
          new Promise<void>((resolve) => {
            finish = resolve;
          }),
      ),
    };
    const state = usePage(api, () => 'operation-1');
    const first = state.primary();
    await state.primary();
    expect(api.primary).toHaveBeenCalledTimes(1);
    expect(state.count.value).toBe(0);
    expect(state.busy.value).toBe(true);
    finish();
    await first;
    expect(state.count.value).toBe(1);
    expect(state.busy.value).toBe(false);
  });

  it('reports errors without counting and allows an explicit next attempt', async () => {
    const api = {
      primary: vi.fn().mockRejectedValueOnce(new Error('failed')).mockResolvedValueOnce(undefined),
    };
    const state = usePage(api);
    await state.primary();
    expect(state.count.value).toBe(0);
    expect(state.error.value).toBeTruthy();
    await state.primary();
    expect(state.count.value).toBe(1);
    expect(state.error.value).toBe('');
    expect(api.primary.mock.calls[1]?.[0].idempotencyKey).toBe(
      api.primary.mock.calls[0]?.[0].idempotencyKey,
    );
  });

  it('aborts on scope disposal and ignores late success', async () => {
    let finish!: () => void;
    let signal!: AbortSignal;
    const scope = effectScope();
    const state = scope.run(() =>
      usePage({
        primary: (context) => {
          signal = context.signal;
          return new Promise<void>((resolve) => {
            finish = resolve;
          });
        },
      }),
    )!;
    const operation = state.primary();
    scope.stop();
    expect(signal.aborted).toBe(true);
    finish();
    await operation;
    expect(state.count.value).toBe(0);
  });
});
