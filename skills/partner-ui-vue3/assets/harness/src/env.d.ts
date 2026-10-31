/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_MOCKS?: string;
  readonly VITE_TEMPLATE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*mock-guard.mjs' {
  export function productionMockGuard(options: {
    production: boolean;
    mocksEnabled: boolean;
  }): import('vite').Plugin;
}
