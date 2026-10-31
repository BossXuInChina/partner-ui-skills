import { effectScope } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePage } from '../usePage';
import { createMockDetailApi, detailSeed } from '../mocks';
import { decodeAgreementDetail, decodeDetailPayload, type WorkbenchDetailApi } from '../api';
import type { AgreementDetail, DetailPayload } from '../types';
const scopes: ReturnType<typeof effectScope>[] = [];
const start = (api = createMockDetailApi()) => {
  const scope = effectScope();
  scopes.push(scope);
  const page = scope.run(() => usePage(api));
  if (!page) throw new Error('scope');
  return { page, scope };
};
afterEach(() => scopes.splice(0).forEach((scope) => scope.stop()));
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((yes) => {
    resolve = yes;
  });
  return { promise, resolve };
}
describe('detail editing and server operations', () => {
  it('loads attachments/history, validates required fields and restores the last saved snapshot on cancel', async () => {
    const base = createMockDetailApi(),
      save = vi.fn(base.save);
    const { page } = start({ ...base, save });
    await page.ready;
    expect(page.statusTone).toEqual({
      生效中: 'success',
      待续签: 'warning',
      审批中: 'info',
      已到期: 'none',
    });
    expect(page.files.value).toHaveLength(2);
    expect(page.history.value).toHaveLength(3);
    page.startEdit();
    page.model.name = '';
    expect(await page.save()).toBe(false);
    expect(save).not.toHaveBeenCalled();
    page.cancelEdit();
    expect(page.model.name).toBe(detailSeed.agreement.name);
    page.startEdit();
    page.model.owner = '';
    expect(await page.save()).toBe(false);
    page.model.owner = '新负责人';
    expect(await page.save()).toBe(true);
    expect(page.editing.value).toBe(false);
    page.startEdit();
    page.model.owner = '未保存';
    page.cancelEdit();
    expect(page.model.owner).toBe('新负责人');
  });
  it('guards duplicate submit and keeps the edit open until the actual API result arrives', async () => {
    const pending = deferred<AgreementDetail>(),
      save = vi.fn<WorkbenchDetailApi['save']>(() => pending.promise);
    const { page } = start({ ...createMockDetailApi(), save });
    await page.ready;
    page.startEdit();
    const operation = page.save();
    expect(await page.save()).toBe(false);
    expect(save).toHaveBeenCalledTimes(1);
    expect(page.editing.value).toBe(true);
    pending.resolve({ ...detailSeed.agreement, owner: '服务器结果' });
    await operation;
    expect(page.model.owner).toBe('服务器结果');
    expect(page.editing.value).toBe(false);
  });
  it('requires renewal confirmation and delegates copy/export without pretending to complete them locally', async () => {
    const base = createMockDetailApi(),
      renew = vi.fn(base.renew),
      copy = vi.fn(base.copy),
      exportPdf = vi.fn(base.exportPdf);
    const { page } = start({ ...base, renew, copy, exportPdf });
    await page.ready;
    await page.renew({ id: 'cancel' });
    expect(renew).not.toHaveBeenCalled();
    await page.renew({ id: 'ok' });
    expect(page.model.status).toBe('审批中');
    expect(page.stepIndex.value).toBe(4);
    await page.onMore({ id: 'copy' });
    await page.onMore({ id: 'export' });
    expect(copy).toHaveBeenCalledTimes(1);
    expect(exportPdf).toHaveBeenCalledTimes(1);
  });
  it('exposes real error/empty states and ignores a late response after leaving', async () => {
    const failed = start({
      ...createMockDetailApi(),
      load: async () => {
        throw new Error('network');
      },
    });
    await failed.page.ready;
    expect(failed.page.error.value).not.toBe('');
    const empty = start({ ...createMockDetailApi(), load: async () => null });
    await empty.page.ready;
    expect(empty.page.loaded.value).toBe(false);
    expect(empty.page.error.value).toBe('');
    const pending = deferred<DetailPayload | null>();
    let signal: AbortSignal | undefined;
    const { page, scope } = start({
      ...createMockDetailApi(),
      load: (input) => {
        signal = input;
        return pending.promise;
      },
    });
    scope.stop();
    pending.resolve(detailSeed);
    await page.ready;
    expect(signal?.aborted).toBe(true);
    expect(page.loaded.value).toBe(false);
  });
  it('decodes current public DTOs and rejects invalid attachments/history/amounts', () => {
    expect(decodeDetailPayload(detailSeed)?.files).toHaveLength(2);
    expect(decodeDetailPayload(null)).toBeNull();
    for (const invalid of [
      { ...detailSeed, files: [null] },
      { ...detailSeed, history: [{ title: 3 }] },
      { ...detailSeed, history: [{ title: 'missing identity' }] },
      { ...detailSeed, files: [{ id: 1, name: 'file', size: 1, status: 'success' }] },
      { ...detailSeed, files: [{ id: 'f', name: 'file', size: NaN, status: 'success' }] },
    ])
      expect(() => decodeDetailPayload(invalid)).toThrow('DETAIL_RESPONSE_INVALID');
    expect(() => decodeAgreementDetail({ ...detailSeed.agreement, amount: 'not-money' })).toThrow(
      'DETAIL_RESPONSE_INVALID',
    );
    expect(() => decodeAgreementDetail({ ...detailSeed.agreement, updatedAt: undefined })).toThrow(
      'DETAIL_RESPONSE_INVALID',
    );
    expect(() =>
      decodeAgreementDetail({ ...detailSeed.agreement, status: { toString: () => '生效中' } }),
    ).toThrow('DETAIL_RESPONSE_INVALID');
  });
});
