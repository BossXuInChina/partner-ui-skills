import { computed, reactive, ref } from 'vue';
import type { WorkbenchDetailApi } from './api';
import type { AgreementDetail, DetailFile, HistoryItem } from './types';
import { useRequests } from './requests';
import { copy } from './locale/zh-CN';
import { useMessages } from '@scaffold/feedback/useMessages';

export function usePage(api: WorkbenchDetailApi) {
  const requests = useRequests(copy),
    feedback = useMessages();
  const nav = reactive({
    active: 'sales',
    tabs: [
      { value: 'home', label: copy.text01 },
      { value: 'sales', label: copy.text02 },
      { value: 'service', label: copy.text03 },
    ],
    sites: [{ value: 'partner', label: copy.text04 }],
  });
  const crumbs = [
    { id: 'home', label: copy.text01, href: '#' },
    { id: 'list', label: copy.text05, href: '#' },
    { id: 'cur', label: copy.text06 },
  ];
  const statusTone = {
    生效中: 'success',
    待续签: 'warning',
    审批中: 'info',
    已到期: 'none',
  } as const;
  const typeOptions = [
    { value: 'dist', label: copy.text10 },
    { value: 'service', label: copy.text11 },
    { value: 'solution', label: copy.text12 },
  ];
  const typeLabel: Record<string, string> = Object.fromEntries(
    typeOptions.map((option) => [option.value, option.label]),
  );
  const model = reactive<AgreementDetail>({
    updatedAt: '',
    renewalNotice: '',
    id: '',
    name: '',
    type: 'dist',
    endDate: '',
    amount: '',
    partner: '',
    owner: '',
    autoRenew: false,
    status: '生效中',
  });
  const original = ref<AgreementDetail | null>(null),
    editing = ref(false),
    tab = ref<string | number>('info'),
    renewOpen = ref(false),
    validation = ref('');
  const files = ref<DetailFile[]>([]),
    history = ref<HistoryItem[]>([]);
  const tabs = [
    { value: 'info', label: copy.text13 },
    { value: 'files', label: copy.text14 },
    { value: 'history', label: copy.text15 },
  ];
  const steps = [
    { title: copy.text16 },
    { title: copy.text17 },
    { title: copy.text18 },
    { title: copy.text19 },
    { title: copy.text20 },
  ];
  const stepIndex = computed(() => (model.status === '审批中' ? 4 : 3));
  const moreItems = [
    { id: 'copy', type: 'action' as const, label: copy.text21 },
    { id: 'export', type: 'action' as const, label: copy.text22 },
  ];
  function commit(value: AgreementDetail) {
    Object.assign(model, value);
    original.value = { ...value };
  }
  const reload = () =>
    requests.load(
      (signal) => api.load(signal),
      (payload) => {
        if (!payload) {
          original.value = null;
          files.value = [];
          history.value = [];
          return;
        }
        commit(payload.agreement);
        files.value = payload.files;
        history.value = payload.history;
        editing.value = false;
        validation.value = '';
      },
    );
  function startEdit() {
    if (!original.value || requests.busy.value) return;
    tab.value = 'info';
    validation.value = '';
    editing.value = true;
  }
  function cancelEdit() {
    if (requests.busy.value) return;
    if (original.value) Object.assign(model, original.value);
    validation.value = '';
    editing.value = false;
  }
  function setField(field: 'name' | 'owner' | 'amount', value: unknown) {
    if (typeof value !== 'string' && typeof value !== 'number') return;
    if (field === 'amount') model.amount = value;
    else model[field] = String(value);
  }
  function setType(value: unknown) {
    const type = Array.isArray(value) ? value[0] : undefined;
    if (type === 'dist' || type === 'service' || type === 'solution') model.type = type;
  }
  function setEndDate(value: unknown) {
    if (typeof value === 'string') model.endDate = value;
  }
  function formatType(value: unknown) {
    return typeof value === 'string' ? (typeLabel[value] ?? value) : '';
  }
  const formatAmount = (value: unknown) => Number(value).toLocaleString('zh-CN');
  const formatAutoRenew = (value: unknown) => (value ? copy.text23 : copy.text24);
  async function save() {
    if (!editing.value || !original.value) return false;
    validation.value = !model.name.trim()
      ? copy.requiredName
      : !model.owner.trim()
        ? copy.requiredOwner
        : '';
    if (validation.value) return false;
    const input = { ...model, name: model.name.trim(), owner: model.owner.trim() };
    return requests.mutate(
      'save:' + JSON.stringify(input),
      (context) => api.save(input, context),
      (saved) => {
        commit(saved);
        editing.value = false;
        feedback.show({ message: copy.saved });
      },
    );
  }
  async function renew(action: unknown) {
    if (!action || typeof action !== 'object' || !('id' in action) || action.id !== 'ok')
      return true;
    if (!original.value || editing.value || model.status !== '待续签') return false;
    return requests.mutate(
      'renew:' + model.id,
      (context) => api.renew(model.id, context),
      (saved) => {
        commit(saved);
        feedback.show({ message: copy.renewed });
      },
    );
  }
  async function onMore(action: unknown) {
    if (!original.value || !action || typeof action !== 'object' || !('id' in action)) return;
    const id = model.id;
    if (action.id === 'copy')
      await requests.mutate(
        'copy:' + id,
        (context) => api.copy(id, context),
        () => feedback.show({ message: copy.copied, type: 'info' }),
      );
    if (action.id === 'export')
      await requests.mutate(
        'export:' + id,
        (context) => api.exportPdf(id, context),
        () => feedback.show({ message: copy.exported, type: 'info' }),
      );
  }
  const ready = reload();
  const preventNavigation = (...args: unknown[]) => {
    for (const event of args) if (event instanceof Event) event.preventDefault();
  };
  const setTab = (value: unknown) => {
    if (value === 'info' || value === 'files' || value === 'history') tab.value = value;
  };
  const updateActiveTab = (value: unknown) => {
    if (typeof value === 'string') nav.active = value;
  };
  const setAutoRenew = (value: unknown) => {
    if (typeof value === 'boolean') model.autoRenew = value;
  };
  const setRenewOpen = (value: unknown) => {
    if (typeof value === 'boolean') renewOpen.value = value;
  };
  return {
    ...requests,
    setAutoRenew,
    setRenewOpen,
    setTab,
    updateActiveTab,
    ready,
    reload,
    feedback,
    nav,
    crumbs,
    statusTone,
    typeOptions,
    typeLabel,
    model,
    loaded: computed(() => original.value !== null),
    editing,
    tab,
    tabs,
    steps,
    stepIndex,
    files,
    history,
    moreItems,
    renewOpen,
    validation,
    startEdit,
    cancelEdit,
    setField,
    setType,
    setEndDate,
    formatType,
    formatAmount,
    formatAutoRenew,
    save,
    renew,
    onMore,
    preventNavigation,
  };
}
