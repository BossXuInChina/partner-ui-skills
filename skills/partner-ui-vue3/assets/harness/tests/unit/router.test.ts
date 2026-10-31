import { mount, flushPromises } from '@vue/test-utils';
import { createMemoryHistory } from 'vue-router';
import { afterEach, describe, expect, it } from 'vitest';
import App from '../../src/App.vue';
import { createAppRouter } from '../../src/router';

const wrappers: ReturnType<typeof mount>[] = [];

afterEach(() => {
  for (const wrapper of wrappers.splice(0)) wrapper.unmount();
});

describe('application routing', () => {
  it('renders the actual blank route after an entry redirect and preserves accessible navigation', async () => {
    const router = createAppRouter(createMemoryHistory());
    await router.push('/');
    await router.isReady();
    const wrapper = mount(App, { global: { plugins: [router] } });
    wrappers.push(wrapper);
    await flushPromises();

    expect(router.currentRoute.value.name).toBe('blank');
    expect(wrapper.get('main[aria-labelledby="blank-page-title"]').isVisible()).toBe(true);
    expect(wrapper.get('#blank-page-title').text()).toBe('空白页面');
    expect(wrapper.get('nav[aria-label="页面导航"] a').attributes('href')).toBe('/blank');
  });

  it('recovers an unknown deep link through the real router instead of leaving an empty RouterView', async () => {
    const router = createAppRouter(createMemoryHistory());
    await router.push('/missing/deep-link?draft=1');
    await router.isReady();
    const wrapper = mount(App, { global: { plugins: [router] } });
    wrappers.push(wrapper);
    await flushPromises();

    expect(router.currentRoute.value.path).toBe('/blank');
    expect(wrapper.findAll('main')).toHaveLength(1);
    expect(wrapper.get('main').text()).toContain('空白页面');
  });
});
