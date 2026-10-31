import { computed, reactive, ref } from 'vue';
import type { WorkbenchDashboardApi } from './api';
import type { DashboardAction, DashboardData, Todo } from './types';
import { useRequests } from './requests';
import { copy } from './locale/zh-CN';
import { useMessages } from '@scaffold/feedback/useMessages';

const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object';
export function usePage(api: WorkbenchDashboardApi) {
  const requests = useRequests(copy),
    feedback = useMessages();
  const nav = reactive({
    active: 'home',
    tabs: [
      { value: 'home', label: copy.text01 },
      { value: 'programs', label: copy.text02 },
      { value: 'marketing', label: copy.text03 },
      { value: 'sales', label: copy.text04 },
      { value: 'service', label: copy.text05 },
    ],
    sites: [{ value: 'partner', label: copy.text06 }],
  });
  const data = ref<DashboardData>({
    expiringAgreements: 0,
    expiryWindowDays: 0,
    greeting: '',
    organization: '',
    partnerLevel: '',
    updatedAt: '',
    metrics: [],
    apps: [],
    insights: [],
    series: [],
    rates: [],
    todos: [],
    notices: [],
  });
  const range = ref<string | number>('6'),
    todoTab = ref<string | number>('all');
  const todoTabs = [
    { value: 'all', label: copy.text07 },
    { value: 'approve', label: copy.text08 },
    { value: 'renew', label: copy.pendingRenewal },
  ];
  const chart = computed(() => {
    const count = Math.min(Number(range.value), data.value.series.length),
      w = 760,
      h = 240,
      top = 12,
      base = h - 24;
    const values = count ? data.value.series.slice(-count) : [],
      rates = count ? data.value.rates.slice(-count) : [];
    const maximum = Math.max(1, ...values) * 1.1,
      step = count ? w / count : 0,
      bw = Math.min(36, step * 0.5);
    const bars = values.map((value, index) => {
      const bh = (value / maximum) * (base - top);
      return {
        m: ((10 - count + index + 12) % 12) + 1 + copy.text09,
        x: index * step + (step - bw) / 2,
        y: base - bh,
        bw,
        bh,
      };
    });
    const line = rates
      .map((rate, index) => index * step + step / 2 + ',' + (base - (rate / 100) * (base - top)))
      .join(' ');
    return { w, h, bars, line };
  });
  const todos = computed(() =>
    data.value.todos.filter((todo) => todoTab.value === 'all' || todo.kind === todoTab.value),
  );
  function setRange(value: unknown) {
    if (value === '6' || value === '12' || value === 6 || value === 12) range.value = value;
  }
  function metricIcon(value: unknown) {
    return record(value)
      ? (data.value.metrics.find((item) => item.id === value.id)?.icon ?? '')
      : '';
  }
  async function perform(action: DashboardAction, message: string) {
    await requests.mutate(
      JSON.stringify(action),
      (context) => api.perform(action, context),
      () => feedback.show({ message, type: 'info' }),
    );
  }
  const onCardAction = () => perform({ type: 'report' }, copy.report);
  const onAllTodos = () => perform({ type: 'all-todos' }, copy.allTodos);
  const activateAssistant = () => perform({ type: 'assistant' }, copy.assistant);
  const processTodo = (todo: Todo) =>
    perform({ type: 'process-todo', id: todo.id }, copy.text10 + todo.title);
  async function onAppActivate(payload: unknown) {
    if (!record(payload) || !record(payload.item)) return;
    if (payload.event instanceof Event) payload.event.preventDefault();
    const app = data.value.apps.find(
      (item) => item.id === (payload.item as Record<string, unknown>).id,
    );
    if (!app || app.disabled) return;
    await perform({ type: 'app', id: app.id }, copy.text11 + app.label);
  }
  async function onNavigate(payload: unknown) {
    if (!record(payload) || typeof payload.target !== 'string') return;
    const action: DashboardAction = { type: 'navigate', target: payload.target };
    if (
      record(payload.params) &&
      Object.values(payload.params).every((value) => typeof value === 'string')
    )
      action.params = payload.params as Record<string, string>;
    await perform(action, copy.text12 + payload.target);
  }
  const reload = () =>
    requests.load(
      (signal) => api.load(signal),
      (value) => {
        data.value = value;
      },
    );
  const ready = reload();
  const setTodoTab = (value: unknown) => {
    if (value === 'all' || value === 'approve' || value === 'renew') todoTab.value = value;
  };
  const updateActiveTab = (value: unknown) => {
    if (typeof value === 'string') nav.active = value;
  };
  return {
    ...requests,
    setTodoTab,
    updateActiveTab,
    ready,
    reload,
    feedback,
    nav,
    data,
    range,
    setRange,
    chart,
    todoTab,
    todoTabs,
    todos,
    metricIcon,
    onCardAction,
    onAllTodos,
    activateAssistant,
    processTodo,
    onAppActivate,
    onNavigate,
  };
}
