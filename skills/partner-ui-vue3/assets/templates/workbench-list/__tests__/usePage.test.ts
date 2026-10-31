import { effectScope } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePage } from '../usePage';
import { createMockListApi, listSeed } from '../mocks';
import { decodeAgreements, type WorkbenchListApi } from '../api';
import type { Agreement, OperationContext } from '../types';
const scopes: ReturnType<typeof effectScope>[] = [];
const start = (api = createMockListApi()) => {
  const scope = effectScope();
  scopes.push(scope);
  const page = scope.run(() => usePage(api));
  if (!page) throw new Error('scope');
  return { page, scope };
};
afterEach(() => {
  scopes.splice(0).forEach((scope) => scope.stop());
});
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((yes) => {
    resolve = yes;
  });
  return { promise, resolve };
}

describe('list state and injected operations', () => {
  it('keeps draft separate, then filters, sorts, pages and clears selection on apply/reset', async () => {
    const { page } = start();
    await page.ready;
    expect(page.statusTone).toEqual({
      生效中: 'success',
      待续签: 'warning',
      审批中: 'info',
      已到期: 'none',
    });
    expect(page.filtered.value).toHaveLength(23);
    expect(page.pageRows.value).toHaveLength(10);
    page.draft.keyword = '星河';
    page.selected.value = ['HT-2026-0101'];
    page.page.value = 2;
    expect(page.filtered.value).toHaveLength(23);
    page.applyFilter();
    expect(page.filtered.value.every((row) => row.partner.includes('星河'))).toBe(true);
    expect(page.page.value).toBe(1);
    expect(page.selected.value).toEqual([]);
    page.resetFilter();
    page.updateSort({ key: 'amount', direction: 'desc' });
    const amounts = page.filtered.value.map((row) => row.amount);
    expect(amounts).toEqual([...amounts].sort((a, b) => b - a));
    page.pageSize.value = 5;
    page.page.value = 2;
    expect(page.pageRows.value).toEqual(page.filtered.value.slice(5, 10));
    page.setStatus(['待续签']);
    page.applyFilter();
    expect(page.filtered.value.every((row) => row.status === '待续签')).toBe(true);
  });
  it('validates before create, prevents duplicate submit and commits only server-returned identity', async () => {
    const pending = deferred<Agreement>(),
      create = vi.fn<WorkbenchListApi['create']>(() => pending.promise);
    const { page } = start({ ...createMockListApi(), create });
    await page.ready;
    page.openCreate();
    expect(await page.saveCreate()).toBe(false);
    expect(create).not.toHaveBeenCalled();
    Object.assign(page.form, { name: '新协议', partner: '新伙伴', endDate: '' });
    const first = page.saveCreate();
    expect(await page.saveCreate()).toBe(false);
    expect(create).toHaveBeenCalledTimes(1);
    pending.resolve({
      id: 'server-id',
      name: '新协议',
      partner: '新伙伴',
      endDate: '',
      amount: 0,
      status: '审批中',
    });
    await first;
    expect(page.rows.value[0]?.id).toBe('server-id');
    expect(page.createOpen.value).toBe(false);
  });
  it('renews eligible selection, confirms termination and delegates export before notifying success', async () => {
    const base = createMockListApi(),
      exported = vi.fn(base.exportRows),
      terminated = vi.fn(base.terminate);
    const { page } = start({ ...base, exportRows: exported, terminate: terminated });
    await page.ready;
    const ids = page.rows.value.slice(0, 3).map((row) => row.id);
    page.selected.value = ids;
    await page.batchRenew(ids);
    expect(
      page.rows.value.filter((row) => ids.includes(row.id)).every((row) => row.status === '审批中'),
    ).toBe(true);
    expect(page.selected.value).toEqual([]);
    const row = page.rows.value[0];
    if (!row) throw new Error('seed');
    page.onRowAction({ row, action: { id: 'stop' } });
    await page.confirmHandler({ id: 'cancel' });
    expect(terminated).not.toHaveBeenCalled();
    await page.confirmHandler({ id: 'ok' });
    expect(page.rows.value.some((item) => item.id === row.id)).toBe(false);
    await page.exportList();
    expect(exported).toHaveBeenCalledTimes(1);
    expect(page.feedback.items.value[0]?.message).toBe('已导出 22 条记录');
  });
  it('retains failed intent idempotency on explicit retry and never announces a failed export', async () => {
    const contexts: OperationContext[] = [];
    const base = createMockListApi();
    let failed = true;
    const { page } = start({
      ...base,
      create: async (input, context) => {
        contexts.push(context);
        if (failed) {
          failed = false;
          throw new Error('network');
        }
        return base.create(input, context);
      },
      exportRows: async () => {
        throw new Error('network');
      },
    });
    await page.ready;
    page.openCreate();
    Object.assign(page.form, { name: '协议', partner: '伙伴' });
    expect(await page.saveCreate()).toBe(false);
    expect(await page.saveCreate()).toBe(true);
    expect(contexts[0]?.idempotencyKey).toBe(contexts[1]?.idempotencyKey);
    page.feedback.clear();
    await page.exportList();
    expect(page.error.value).not.toBe('');
    expect(page.feedback.items.value).toHaveLength(0);
  });
  it('cancels on scope release and ignores late load results', async () => {
    const pending = deferred<Agreement[]>();
    let signal: AbortSignal | undefined;
    const { page, scope } = start({
      ...createMockListApi(),
      load: (input) => {
        signal = input;
        return pending.promise;
      },
    });
    scope.stop();
    pending.resolve(listSeed);
    await page.ready;
    expect(signal?.aborted).toBe(true);
    expect(page.rows.value).toEqual([]);
  });
  it('rejects malformed DTO rows instead of passing them to the table', () => {
    expect(decodeAgreements(listSeed)).toHaveLength(23);
    expect(() => decodeAgreements([{ id: 'bad' }])).toThrow('LIST_RESPONSE_INVALID');
    expect(() => decodeAgreements([{ ...listSeed[0], amount: Infinity }])).toThrow(
      'LIST_RESPONSE_INVALID',
    );
  });
});
