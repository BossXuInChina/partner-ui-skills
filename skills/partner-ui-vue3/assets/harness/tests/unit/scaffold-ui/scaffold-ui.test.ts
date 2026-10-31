import { flushPromises, mount } from '@vue/test-utils';
import { isReactive, reactive, type Component } from 'vue';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { TrActionButton, type BubbleMessage } from '@opentiny/tiny-robot';
import {
  AiIcon,
  AiSummaryCard,
  BusinessNavigationCard,
  AgreementTable,
  ChatPanel,
  type Agreement,
  type AssistantPart,
} from 'huawei-partner-ai-ui';
import { WorkbenchPedestalIcon, WorkbenchSystemIcon } from '@workbench/ui-vue3';
import AssistantCloseButton from '@scaffold/ai/AssistantCloseButton.vue';
import { welcomeIcon } from '@scaffold/ai/welcomeIcon';
import { createBusinessRenderers } from '@scaffold/ai/renderers';
import SummaryRenderer from '@scaffold/ai/renderers/SummaryRenderer.vue';
import { zhCN } from '@scaffold/locale/zh-CN';

// The real HTML harness has an entry script. TinyVue's published SVG loader
// inspects that element during import; happy-dom starts with an empty document.
const entryScript = vi.hoisted(() => {
  const script = document.createElement('script');
  document.head.append(script);
  return script;
});
afterAll(() => entryScript.remove());

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
const message = (part: AssistantPart): BubbleMessage => ({ role: 'assistant', content: [part] });

describe('public assistant UI', () => {
  it('uses the real TinyRobot action and public panel.close icon, forwarding one click', async () => {
    const wrapper = render(AssistantCloseButton);
    const action = wrapper.findComponent(TrActionButton);
    expect(action.exists()).toBe(true);
    expect(action.props('icon')).toMatchObject({ type: AiIcon, props: { name: 'panel.close' } });
    expect(wrapper.get('button').attributes('aria-label')).toBe(zhCN.assistant.close);
    expect(wrapper.get('button').attributes('type')).toBe('button');
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
    await wrapper.setProps({ label: 'Close custom assistant' });
    expect(wrapper.get('button').attributes('aria-label')).toBe('Close custom assistant');
  });

  it('keeps welcome icons raw and uses public registered families without resizing pedestal artwork', () => {
    const system = welcomeIcon('/ic_public_search_line');
    expect(isReactive(reactive({ system }).system)).toBe(false);
    const icon = render(system).findComponent(WorkbenchSystemIcon);
    expect(icon.props('name')).toBe('/ic_public_search_line');
    const pedestal = render(welcomeIcon('pedestal/circle/high/add-switch/48', 'pedestal'));
    expect(pedestal.findComponent(WorkbenchPedestalIcon).props('name')).toBe(
      'pedestal/circle/high/add-switch/48',
    );
    expect(pedestal.findComponent(WorkbenchPedestalIcon).attributes('size')).toBeUndefined();
    const artwork = pedestal.get('img');
    expect(artwork.attributes('width')).toBe('48');
    expect(artwork.attributes('height')).toBe('48');
    const source = artwork.attributes('src') ?? '';
    expect(source).toMatch(/^data:image\/svg\+xml,/);
    expect(decodeURIComponent(source.split(',')[1] ?? '')).toMatch(/viewBox=['"]0 0 48 48['"]/);
  });

  it('renders public summary data and updates it through real useMessageContent', async () => {
    const wrapper = render(SummaryRenderer, {
      props: { message: message({ type: 'ai-summary', text: 'First summary' }), contentIndex: 0 },
    });
    expect(wrapper.findComponent(AiSummaryCard).props('text')).toBe('First summary');
    await wrapper.setProps({ message: message({ type: 'ai-summary', text: 'Second summary' }) });
    expect(wrapper.findComponent(AiSummaryCard).props('text')).toBe('Second summary');
    await wrapper.setProps({
      message: { role: 'assistant', content: [{ type: 'ai-summary', text: 42 }] },
    });
    expect(wrapper.findComponent(AiSummaryCard).exists()).toBe(false);
    expect(wrapper.get('[role="status"]').text()).toBe(zhCN.assistant.unsupportedContent);
  });

  it('routes only host-owned target keys and forwards the real agreement open event', async () => {
    const navigate = vi.fn(),
      unknown = vi.fn(),
      open = vi.fn();
    const renderers = createBusinessRenderers({
      targets: { agreements: navigate },
      unknownTarget: unknown,
      openAgreement: open,
    });
    const navigationPart: AssistantPart = {
      type: 'business-navigation',
      title: 'Agreements',
      target: { target: 'agreements', params: { id: 'a-1' } },
    };
    const nav = renderers.find((item) => item.find(message(navigationPart), navigationPart, 0));
    expect(nav).toBeDefined();
    const wrapper = render(nav!.renderer, {
      props: { message: message(navigationPart), contentIndex: 0 },
    });
    const card = wrapper.findComponent(BusinessNavigationCard);
    expect(card.props('target')).toEqual(navigationPart.target);
    card.vm.$emit('navigate', navigationPart.target);
    expect(navigate).toHaveBeenCalledExactlyOnceWith({ id: 'a-1' });
    card.vm.$emit('navigate', { target: 'https://unregistered.example/path' });
    expect(navigate).toHaveBeenCalledTimes(1);
    expect(unknown).toHaveBeenCalledExactlyOnceWith({
      target: 'https://unregistered.example/path',
    });
    const part: AssistantPart = { type: 'agreement-table', agreements: [agreement], total: 1 };
    const tableRenderer = renderers.find((item) => item.find(message(part), part, 0));
    const table = render(tableRenderer!.renderer, {
      props: { message: message(part), contentIndex: 0 },
    }).findComponent(AgreementTable);
    expect(table.props('agreements')).toEqual([agreement]);
    table.vm.$emit('open', agreement);
    expect(open).toHaveBeenCalledExactlyOnceWith(agreement);
  });

  it('consumes the real ChatPanel structured-content context rather than transport text', async () => {
    const renderers = createBusinessRenderers({ targets: {}, openAgreement: vi.fn() });
    const wrapper = render(ChatPanel, {
      props: {
        messages: [
          {
            id: 'structured-message',
            role: 'assistant',
            content: 'Transport text',
            uiParts: [{ type: 'ai-summary', text: 'Structured summary' }],
            uiPartsOrdered: true,
            state: { completion: 'completed' },
          },
        ],
        processing: false,
        error: '',
        aborted: false,
        renderers,
      },
      attrs: { class: 'partner-ai', style: 'height: 600px' },
    });
    await flushPromises();
    await vi.waitFor(() => {
      expect(wrapper.findComponent(AiSummaryCard).props('text')).toBe('Structured summary');
    });
  });
});
