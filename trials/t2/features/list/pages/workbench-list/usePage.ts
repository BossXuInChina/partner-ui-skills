import { computed, reactive, ref } from 'vue';
import type { WorkbenchListApi } from './api';
import { agreementStatuses } from './types';
import type { Agreement, AgreementStatus, CreateAgreementInput, Filter, Sort } from './types';
import { useRequests } from './requests';
import { copy } from './locale/zh-CN';
import { useMessages } from '../../scaffold/feedback/useMessages';

const record = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object';
export function usePage(api: WorkbenchListApi) {
  const requests = useRequests(copy),
    feedback = useMessages();
  const nav = reactive({
    active: 'sales',
    tabs: [
      { value: 'home', label: copy.text01 },
      { value: 'programs', label: copy.text02 },
      { value: 'marketing', label: copy.text03 },
      { value: 'sales', label: copy.text04 },
      { value: 'service', label: copy.text05 },
    ],
    sites: [{ value: 'partner', label: copy.text06 }],
  });
  const crumbs = [
    { id: 'home', label: copy.text01, href: '#' },
    { id: 'sales', label: copy.text04, href: '#' },
    { id: 'cur', label: copy.text07 },
  ];
  const rows = ref<Agreement[]>([]);
  const statusTone = {
    生效中: 'success',
    待续签: 'warning',
    审批中: 'info',
    已到期: 'none',
  } as const;
  const statusOptions = [
    { value: 'all', label: copy.text11 },
    ...agreementStatuses.map((status) => ({ value: status, label: status })),
  ];
  const columns = [
    { key: 'id', title: copy.text12, field: 'id', width: 150 },
    { key: 'name', title: copy.text13, field: 'name', primary: true, fluid: true, ellipsis: true },
    { key: 'partner', title: copy.text14, field: 'partner', width: 140 },
    { key: 'endDate', title: copy.text15, field: 'endDate', width: 130, sortable: true },
    {
      key: 'amount',
      title: copy.text16,
      field: 'amount',
      width: 140,
      align: 'end' as const,
      sortable: true,
    },
    { key: 'status', title: copy.text17, field: 'status', width: 110 },
  ];
  const draft = reactive<Filter>({ keyword: '', status: 'all' }),
    applied = reactive<Filter>({ keyword: '', status: 'all' });
  const sort = ref<Sort>(null),
    page = ref(1),
    pageSize = ref(10),
    selected = ref<Array<string | number>>([]);
  const filtered = computed(() => {
    const keyword = applied.keyword.trim();
    const list = rows.value.filter(
      (row) =>
        (!keyword || [row.id, row.name, row.partner].some((value) => value.includes(keyword))) &&
        (applied.status === 'all' || row.status === applied.status),
    );
    const order = sort.value;
    return order
      ? [...list].sort(
          (a, b) =>
            (a[order.key] > b[order.key] ? 1 : a[order.key] < b[order.key] ? -1 : 0) *
            (order.direction === 'asc' ? 1 : -1),
        )
      : list;
  });
  const pageRows = computed(() =>
    filtered.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value),
  );
  function applyFilter() {
    Object.assign(applied, draft);
    page.value = 1;
    selected.value = [];
  }
  function resetFilter() {
    Object.assign(draft, { keyword: '', status: 'all' });
    applyFilter();
  }
  function setStatus(value: unknown) {
    const status = Array.isArray(value) ? value[0] : undefined;
    draft.status = agreementStatuses.some((item) => item === status)
      ? (status as AgreementStatus)
      : 'all';
  }
  function updateSort(value: unknown) {
    sort.value =
      record(value) &&
      (value.key === 'endDate' || value.key === 'amount') &&
      (value.direction === 'asc' || value.direction === 'desc')
        ? { key: value.key, direction: value.direction }
        : null;
    page.value = 1;
  }
  function canonical(value: unknown) {
    return record(value) ? rows.value.find((row) => row.id === value.id) : undefined;
  }
  function statusLabel(value: unknown) {
    return canonical(value)?.status ?? '';
  }
  function rowTone(value: unknown) {
    const row = canonical(value);
    return row ? statusTone[row.status] : 'none';
  }
  function formatAmount(value: unknown) {
    return typeof value === 'number' ? value.toLocaleString('zh-CN') : '';
  }
  const rowActions = (value: Record<string, unknown>) => [
    { id: 'view', label: copy.text18 },
    { id: 'renew', label: copy.text19, disabled: value.status === '审批中' || requests.busy.value },
    { id: 'stop', label: copy.text20, disabled: requests.busy.value },
  ];
  async function openDetail(value: unknown) {
    const row = canonical(value);
    if (!row) return;
    try {
      await api.openDetail(row);
    } catch {
      requests.error.value = copy.actionError;
    }
  }
  const confirm = reactive<{ open: boolean; message: string; row: Agreement | null }>({
    open: false,
    message: '',
    row: null,
  });
  async function batchRenew(value: unknown) {
    const keys = Array.isArray(value)
      ? value.filter(
          (key): key is string | number => typeof key === 'string' || typeof key === 'number',
        )
      : [];
    const eligible = rows.value
      .filter((row) => keys.includes(row.id) && row.status !== '审批中')
      .map((row) => row.id);
    if (!eligible.length) return;
    await requests.mutate(
      'renew:' + JSON.stringify(eligible),
      (context) => api.renew(eligible, context),
      (updates) => {
        const byId = new Map(updates.map((row) => [row.id, row]));
        rows.value = rows.value.map((row) => byId.get(row.id) ?? row);
        feedback.show({ message: copy.text21 + eligible.length + copy.text22 });
        selected.value = [];
      },
    );
  }
  function onRowAction(payload: unknown) {
    if (!record(payload) || !record(payload.action)) return;
    const row = canonical(payload.row);
    if (!row) return;
    if (payload.action.id === 'view') void openDetail(row);
    if (payload.action.id === 'renew') void batchRenew([row.id]);
    if (payload.action.id === 'stop')
      Object.assign(confirm, { open: true, row, message: copy.text23 + row.name + copy.text24 });
  }
  async function confirmHandler(action: unknown) {
    if (!record(action) || action.id !== 'ok') return true;
    const row = confirm.row;
    if (!row) return false;
    return requests.mutate(
      'terminate:' + row.id,
      (context) => api.terminate(row.id, context),
      () => {
        rows.value = rows.value.filter((item) => item.id !== row.id);
        selected.value = selected.value.filter((id) => id !== row.id);
        page.value = Math.max(
          1,
          Math.min(page.value, Math.ceil(filtered.value.length / pageSize.value)),
        );
        feedback.show({ message: copy.terminated });
      },
    );
  }
  async function exportList() {
    const exported = [...filtered.value];
    await requests.mutate(
      'export:' + JSON.stringify(exported.map((row) => row.id)),
      (context) => api.exportRows(exported, context),
      () => feedback.show({ message: copy.text25 + exported.length + copy.text26 }),
    );
  }
  const createOpen = ref(false),
    form = reactive<CreateAgreementInput>({ name: '', partner: '', endDate: '' }),
    validation = ref('');
  function openCreate() {
    Object.assign(form, { name: '', partner: '', endDate: '' });
    validation.value = '';
    createOpen.value = true;
  }
  function setCreateField(field: 'name' | 'partner', value: unknown) {
    if (typeof value === 'string' || typeof value === 'number') form[field] = String(value);
  }
  function setCreateEndDate(value: unknown) {
    if (typeof value === 'string') form.endDate = value;
  }
  async function saveCreate() {
    validation.value = !form.name.trim()
      ? copy.requiredName
      : !form.partner.trim()
        ? copy.requiredPartner
        : '';
    if (validation.value) return false;
    const input = { ...form, name: form.name.trim(), partner: form.partner.trim() };
    return requests.mutate(
      'create:' + JSON.stringify(input),
      (context) => api.create(input, context),
      (row) => {
        rows.value = [row, ...rows.value];
        createOpen.value = false;
        page.value = 1;
        feedback.show({ message: copy.created });
      },
    );
  }
  const reload = () =>
    requests.load(
      (signal) => api.load(signal),
      (value) => {
        rows.value = value;
        selected.value = [];
        page.value = 1;
      },
    );
  const ready = reload();
  const preventNavigation = (...args: unknown[]) => {
    for (const event of args) if (event instanceof Event) event.preventDefault();
  };
  const setKeyword = (value: unknown) => {
    if (typeof value === 'string') draft.keyword = value;
  };
  const onKeywordKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') applyFilter();
  };
  const updateActiveTab = (value: unknown) => {
    if (typeof value === 'string') nav.active = value;
  };
  const setCreateOpen = (value: unknown) => {
    if (typeof value === 'boolean') createOpen.value = value;
  };
  const setConfirmOpen = (value: unknown) => {
    if (typeof value === 'boolean') confirm.open = value;
  };
  return {
    ...requests,
    setCreateOpen,
    setConfirmOpen,
    setKeyword,
    onKeywordKeydown,
    updateActiveTab,
    ready,
    reload,
    feedback,
    nav,
    crumbs,
    rows,
    columns,
    statusTone,
    statusOptions,
    draft,
    applied,
    sort,
    page,
    pageSize,
    selected,
    filtered,
    pageRows,
    applyFilter,
    resetFilter,
    setStatus,
    updateSort,
    rowActions,
    onRowAction,
    openDetail,
    statusLabel,
    rowTone,
    formatAmount,
    confirm,
    confirmHandler,
    batchRenew,
    exportList,
    createOpen,
    form,
    validation,
    openCreate,
    setCreateField,
    setCreateEndDate,
    saveCreate,
    preventNavigation,
  };
}
