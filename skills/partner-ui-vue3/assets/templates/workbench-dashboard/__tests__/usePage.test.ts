import { effectScope } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePage } from '../usePage';
import { createMockDashboardApi, dashboardSeed } from '../mocks';
import { decodeDashboardData, approvedDashboardIcons } from '../api';
import type { DashboardData } from '../types';
const scopes: ReturnType<typeof effectScope>[] = [];
const start = (api = createMockDashboardApi()) => {
  const scope = effectScope();
  scopes.push(scope);
  const page = scope.run(() => usePage(api));
  if (!page) throw new Error('scope');
  return { page, scope };
};
afterEach(() => scopes.splice(0).forEach((scope) => scope.stop()));
describe('dashboard data and typed intents', () => {
  it('keeps original six/twelve-month chart data, finite geometry and todo category filtering', async () => {
    const { page } = start();
    await page.ready;
    expect(page.chart.value.bars).toHaveLength(6);
    expect(page.chart.value.bars.every((bar) => Number.isFinite(bar.y) && bar.bh >= 0)).toBe(true);
    page.setRange('12');
    expect(page.chart.value.bars).toHaveLength(12);
    expect(page.chart.value.line.split(' ')).toHaveLength(12);
    page.todoTab.value = 'approve';
    expect(page.todos.value).toHaveLength(2);
    expect(page.todos.value.every((todo) => todo.kind === 'approve')).toBe(true);
    page.todoTab.value = 'renew';
    expect(page.todos.value).toHaveLength(2);
    page.setRange('invalid');
    expect(page.chart.value.bars).toHaveLength(12);
  });
  it('delegates actions/navigation and rejects a disabled app', async () => {
    const base = createMockDashboardApi(),
      perform = vi.fn(base.perform);
    const { page } = start({ ...base, perform });
    await page.ready;
    await page.onCardAction();
    await page.onAllTodos();
    await page.activateAssistant();
    await page.onNavigate({ target: 'renewals' });
    const todo = page.todos.value[0];
    if (!todo) throw new Error('seed');
    await page.processTodo(todo);
    const app = dashboardSeed.apps.find((item) => !item.disabled),
      disabled = dashboardSeed.apps.find((item) => item.disabled);
    if (!app || !disabled) throw new Error('seed');
    await page.onAppActivate({ item: app });
    const count = perform.mock.calls.length;
    await page.onAppActivate({ item: disabled });
    expect(perform).toHaveBeenCalledTimes(count);
    expect(perform.mock.calls.map(([action]) => action.type)).toEqual([
      'report',
      'all-todos',
      'assistant',
      'navigate',
      'process-todo',
      'app',
    ]);
  });
  it('does not announce a failed business action and represents an empty chart without NaN', async () => {
    const { page } = start({
      ...createMockDashboardApi(),
      perform: async () => {
        throw new Error('network');
      },
    });
    await page.ready;
    await page.onCardAction();
    expect(page.error.value).not.toBe('');
    expect(page.feedback.items.value).toHaveLength(0);
    page.data.value = { ...dashboardSeed, series: [], rates: [] };
    expect(page.chart.value).toMatchObject({ bars: [], line: '' });
  });
  it('cancels pending load and leaves a stopped scope unchanged', async () => {
    let finish!: (value: DashboardData) => void;
    let signal: AbortSignal | undefined;
    const pending = new Promise<DashboardData>((resolve) => {
      finish = resolve;
    });
    const { page, scope } = start({
      ...createMockDashboardApi(),
      load: (input) => {
        signal = input;
        return pending;
      },
    });
    scope.stop();
    finish(dashboardSeed);
    await page.ready;
    expect(signal?.aborted).toBe(true);
    expect(page.data.value.metrics).toEqual([]);
  });
  it('validates all consumed item shapes and registered icon choices before the UI receives data', () => {
    expect(approvedDashboardIcons).toHaveLength(9);
    expect(decodeDashboardData(dashboardSeed).metrics).toHaveLength(4);
    for (const field of ['metrics', 'apps', 'todos', 'notices', 'insights']) {
      const invalid: Record<string, unknown> = { ...dashboardSeed, [field]: [null] };
      expect(() => decodeDashboardData(invalid)).toThrow('DASHBOARD_RESPONSE_INVALID');
    }
    for (const invalid of [
      { ...dashboardSeed, metrics: [{ id: 'x', label: 'x', value: 1, icon: 'unregistered' }] },
      {
        ...dashboardSeed,
        todos: [{ id: 1, kind: 'unknown', type: '审批', tone: 'info', title: 'x', date: 'now' }],
      },
      { ...dashboardSeed, insights: [{ id: 'x', fragments: [{ text: 2 }] }] },
      { ...dashboardSeed, series: [Infinity], rates: [50] },
      { ...dashboardSeed, notices: [{ title: 'missing identity' }] },
      { ...dashboardSeed, expiringAgreements: Infinity },
      { ...dashboardSeed, expiryWindowDays: -1 },
    ])
      expect(() => decodeDashboardData(invalid)).toThrow('DASHBOARD_RESPONSE_INVALID');
  });
});
