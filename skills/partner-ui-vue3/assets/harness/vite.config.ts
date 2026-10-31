import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';
import { productionMockGuard } from './build/mock-guard.mjs';
import { routeChunkReport } from './build/route-sizes.mjs';

const root = fileURLToPath(new URL('.', import.meta.url));

function declaredModuleEntry(source: string, importer?: string) {
  const from = importer?.split('?')[0] ?? import.meta.url;
  const require = createRequire(from);
  const manifestFile = require.resolve(source + '/package.json');
  const manifest = JSON.parse(readFileSync(manifestFile, 'utf8')) as { module?: string };
  if (!manifest.module) throw new Error('TEST_PUBLIC_MODULE_ENTRY_MISSING: ' + source);
  const directory = dirname(manifestFile);
  const entry = resolve(directory, manifest.module);
  if (relative(directory, entry).startsWith('..')) throw new Error('TEST_PUBLIC_MODULE_ESCAPES');
  return entry;
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, root, 'VITE_');
  const mocksEnabled = (process.env.VITE_ENABLE_MOCKS ?? env.VITE_ENABLE_MOCKS) === 'true';

  return {
    root,
    resolve: {
      dedupe: ['vue', '@opentiny/tiny-robot'],
      alias: {
        '@scaffold': fileURLToPath(new URL('./src/scaffold', import.meta.url)),
        '@templates': fileURLToPath(new URL('./src/templates', import.meta.url)),
      },
    },
    // Preserve relative new URL() assets in the published package during dev serving.
    optimizeDeps: { exclude: ['huawei-partner-ai-ui'] },
    plugins: [
      vue(),
      productionMockGuard({ production: command === 'build', mocksEnabled }),
      routeChunkReport({ root }),
    ],
    test: {
      environment: 'happy-dom',
      server: { deps: { inline: [/@opentiny\//, 'huawei-partner-ai-ui'] } },
      // This published dependency declares only `module`; preserve each importer's version.
      alias: [
        {
          find: '@opentiny/tiny-robot-svgs',
          replacement: '@opentiny/tiny-robot-svgs',
          customResolver: declaredModuleEntry,
        },
      ],
      include: ['tests/unit/**/*.test.ts', 'src/templates/**/__tests__/**/*.test.ts'],
      clearMocks: true,
      restoreMocks: true,
    },
  };
});
