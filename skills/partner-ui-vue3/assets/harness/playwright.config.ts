import { defineConfig } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.HARNESS_PORT ?? 5411);
const baseURL = `http://127.0.0.1:${port}`;
const shellQuote = (value: string) => "'" + value.replaceAll("'", "'\\''") + "'";
const previewCommand = [
  process.execPath,
  fileURLToPath(new URL('./node_modules/vite/bin/vite.js', import.meta.url)),
  'preview',
  '--host',
  '127.0.0.1',
  '--port',
  String(port),
  '--strictPort',
]
  .map(shellQuote)
  .join(' ');

export default defineConfig({
  testDir: './tests/browser',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  timeout: 30_000,
  use: { baseURL, headless: true, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    command: previewCommand,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
