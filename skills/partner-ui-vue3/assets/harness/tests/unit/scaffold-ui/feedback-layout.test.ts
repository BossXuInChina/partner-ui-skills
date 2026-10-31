import { mount } from '@vue/test-utils';
import { defineComponent, h, type Component } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Agreement, AgreementAssistantAdapter } from 'huawei-partner-ai-ui';
import { GlobalMessageStack } from '@workbench/ui-vue3';
import { createAgreementAdapter } from '@scaffold/ai/agreementAdapter';
import { useMessages } from '@scaffold/feedback/useMessages';
import MessagesHost from '@scaffold/feedback/MessagesHost.vue';
import PageContainer from '@scaffold/layout/PageContainer.vue';
import PageGrid from '@scaffold/layout/PageGrid.vue';
import PageStack from '@scaffold/layout/PageStack.vue';

const wrappers: ReturnType<typeof mount>[] = [];
function render(component: Component, options: Parameters<typeof mount>[1] = {}) {
  const wrapper = mount(component, options);
  wrappers.push(wrapper);
  return wrapper;
}
afterEach(() => {
  for (const wrapper of wrappers.splice(0)) wrapper.unmount();
});
const agreement: Agreement = {
  id: 'a-1',
  name: 'Contract',
  partner: 'Partner',
  owner: 'Owner',
  endDate: '2027-01-01',
  amount: '100',
  status: '待续签',
};

describe('host-controlled feedback and layout', () => {
  it('consumes GlobalMessageStack items and updates controlled state by emitted id', async () => {
    const messages = useMessages();
    const first = messages.show({ message: 'Saved', type: 'success', checkboxLabel: 'Remember' });
    const latest = messages.show({ message: 'Updated', type: 'info' });
    const wrapper = render(MessagesHost, { props: { messages, autoClose: 0 } });
    const stack = wrapper.findComponent(GlobalMessageStack);
    expect(stack.props('items')).toMatchObject([{ id: latest }, { id: first }]);
    stack.vm.$emit('checkbox', { id: first, checked: true });
    expect(messages.items.value.find((item) => item.id === first)?.checkboxChecked).toBe(true);
    stack.vm.$emit('dismiss', { id: latest, reason: 'replaced' });
    expect(messages.items.value.map((item) => item.id)).toEqual([first]);
    expect(Reflect.set(messages.items.value, '0', { id: 'external edit' })).toBe(false);
    expect(messages.items.value).toHaveLength(1);
    messages.clear();
    expect(messages.items.value).toEqual([]);
  });

  it('composes real page layout wrappers and switches the published spacing choice', async () => {
    const layout = defineComponent({
      setup: () => () =>
        h(
          PageContainer,
          { 'aria-label': 'Page' },
          {
            default: () =>
              h(PageGrid, null, {
                default: () => h(PageStack, { space: 'sm' }, { default: () => h('p', 'Content') }),
              }),
          },
        ),
    });
    const wrapper = render(layout);
    expect(wrapper.get('.page-container').attributes('aria-label')).toBe('Page');
    expect(wrapper.get('.page-grid .page-stack--sm p').text()).toBe('Content');
    const stack = render(PageStack, {
      props: { space: 'lg' },
      slots: { default: '<span>Stack item</span>' },
    });
    await stack.setProps({ space: 'xl' });
    expect(stack.classes()).toContain('page-stack--xl');
    expect(stack.text()).toBe('Stack item');
  });
});

it('delegates real Agreement APIs with the same cancellation signal and caller idempotency key', async () => {
  const controller = new AbortController();
  const mutation = vi.fn(async () => agreement);
  const streamCalls = vi.fn();
  const api: AgreementAssistantAdapter = {
    async *stream(query, signal, context) {
      streamCalls(query, signal, context);
      yield { kind: 'text', text: 'Server delta' };
    },
    updateAgreement: mutation,
    renewAgreement: mutation,
  };
  const adapter = createAgreementAdapter(api);
  const context = { aiEnabled: true, mode: '' };
  const deltas = [];
  for await (const delta of adapter.stream('query', controller.signal, context)) deltas.push(delta);
  expect(streamCalls).toHaveBeenCalledExactlyOnceWith('query', controller.signal, context);
  expect(deltas).toEqual([{ kind: 'text', text: 'Server delta' }]);
  const action = { signal: controller.signal, idempotencyKey: 'caller-action-1' };
  await adapter.updateAgreement('a-1', { owner: 'Next owner' }, action);
  expect(mutation).toHaveBeenLastCalledWith('a-1', { owner: 'Next owner' }, action);
  await adapter.renewAgreement('a-1', action);
  expect(mutation).toHaveBeenLastCalledWith('a-1', action);
  expect(adapter.continueStream).toBeUndefined();
});
