/** Evidence of rendered Vue modules in this Vite build, not of hidden code in prebundled packages. */
export function vueEvidence() {
  return {
    name: 'trial-vue-evidence',
    generateBundle(_options, bundle) {
      const modules = {};
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk') continue;
        for (const [id, info] of Object.entries(output.modules)) {
          if (
            info.renderedLength &&
            /node_modules\/(?:\.pnpm\/[^/]+\/node_modules\/)?(?:vue|@vue\/(?:runtime-core|runtime-dom))\//.test(
              id,
            )
          ) {
            modules[id.replaceAll('\\', '/')] =
              (modules[id.replaceAll('\\', '/')] ?? 0) + info.renderedLength;
          }
        }
      }
      this.emitFile({
        type: 'asset',
        fileName: 'vue-modules.json',
        source: JSON.stringify(modules, null, 2),
      });
    },
  };
}
