import type { Plugin } from "vite";
export function productionMockGuard(options: {
  production: boolean;
  mocksEnabled: boolean;
}): Plugin;
