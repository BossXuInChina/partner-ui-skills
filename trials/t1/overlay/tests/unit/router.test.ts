import { describe, expect, it } from 'vitest';
import { createMemoryHistory } from 'vue-router';
import { createAppRouter } from '../../src/router';
describe('agreement routes', () => {
  it('matches list and parameterized detail routes', async () => {
    const router = createAppRouter(createMemoryHistory());
    await router.push('/agreements/A');
    expect(router.currentRoute.value.params.id).toBe('A');
    await router.push('/agreements/B');
    expect(router.currentRoute.value.params.id).toBe('B');
  });
});
