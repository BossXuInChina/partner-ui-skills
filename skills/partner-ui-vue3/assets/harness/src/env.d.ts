/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_MOCKS?: string;
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
