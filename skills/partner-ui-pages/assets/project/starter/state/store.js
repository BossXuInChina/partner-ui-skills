// 跨页状态唯一来源：查询条件、伙伴记录、编辑草稿与助手开关。
import { reactive } from 'vue';
import fixtures from '../fixtures/partners.json';

export const store = reactive({
  partners: fixtures.map(partner => ({ ...partner })),
  filterDraft: '', filterApplied: '', drafts: {}, assistantOpen: false,
});

export function draftFor(id) {
  const partner = store.partners.find(item => item.id === id);
  if (!partner) return null;
  return store.drafts[id] ?? (store.drafts[id] = { ...partner });
}

export function saveDraft(id) {
  const draft = store.drafts[id], partner = store.partners.find(item => item.id === id);
  if (!draft || !partner || !draft.name.trim()) return { ok: false, error: '请输入伙伴名称' };
  Object.assign(partner, draft, { name: draft.name.trim() });
  return { ok: true };
}
