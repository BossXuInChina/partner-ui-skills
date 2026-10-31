import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import { productionMockGuard } from './build/mock-guard.mjs';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, root, 'VITE_');
  const mocksEnabled = (process.env.VITE_ENABLE_MOCKS ?? env.VITE_ENABLE_MOCKS) === 'true';

  return {
    root,
    resolve: {
      dedupe: ['vue'],
    },
    plugins: [vue(), productionMockGuard({ production: command === 'build', mocksEnabled })],
    test: {
      environment: 'happy-dom',
      include: ['tests/unit/**/*.test.ts'],
      clearMocks: true,
      restoreMocks: true,
    },
  };
});
