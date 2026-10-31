import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import { routeChunkReport } from "./build/route-sizes.mjs";
import { productionMockGuard } from "./build/mock-guard.mjs";
export default defineConfig(({ command, mode }) => ({
  plugins: [
    vue(),
    {
      name: "vue-runtime-evidence",
      apply: "build",
      generateBundle(_options, bundle) {
        const modules = [
          ...new Set(
            Object.values(bundle).flatMap((output) =>
              output.type === "chunk"
                ? Object.keys(output.modules).filter((id) =>
                    /\/node_modules\/\.pnpm\/(?:@vue\+runtime-(?:core|dom)|vue)@/.test(
                      id,
                    ),
                  )
                : [],
            ),
          ),
        ].sort();
        this.emitFile({
          type: "asset",
          fileName: "vue-runtime-evidence.json",
          source: JSON.stringify(modules, null, 2),
        });
      },
    },
    routeChunkReport({
      routes: [
        { route: "/", file: "src/pages/HomePage.vue" },
        { route: "/agreements", file: "src/pages/AgreementsPage.vue" },
      ],
    }),
    productionMockGuard({
      production: command === "build",
      mocksEnabled: loadEnv(mode, ".", "VITE_").VITE_ENABLE_MOCKS === "true",
    }),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    dedupe: ["vue"],
  },
  optimizeDeps: { exclude: ["huawei-partner-ai-ui"] },
  test: {
    environment: "happy-dom",
    include: ["tests/unit/**/*.test.ts"],
    clearMocks: true,
    restoreMocks: true,
  },
}));
