import path from 'node:path';

function sourcePath(id) {
  let value = String(id).replace(/^\0/, '').split(/[?#]/, 1)[0];
  try {
    value = decodeURIComponent(value);
  } catch {
    /* Keep a literal malformed URL path. */
  }
  return path.posix.normalize(value.replaceAll('\\', '/'));
}

function mockReference(id, importer) {
  let file = sourcePath(id);
  if (/^\.{1,2}\//.test(file) && importer)
    file = path.posix.resolve(path.posix.dirname(sourcePath(importer)), file);
  return (
    /(?:^|\/)src\/(?:[^/]+\/)*mocks(?:\/|$)/i.test(file) ||
    /(?:^|\/)[^/]*\.mock\.[^/]+$/i.test(file)
  );
}

/** Guard only modules in the actual import graph; unused fixture files are not scanned. */
export function productionMockGuard({ production, mocksEnabled } = {}) {
  if (typeof production !== 'boolean' || typeof mocksEnabled !== 'boolean')
    throw new Error('MOCK_GUARD_OPTIONS: production and mocksEnabled must be explicit booleans.');
  if (production && mocksEnabled)
    throw new Error('PRODUCTION_MOCK_FLAG: VITE_ENABLE_MOCKS must be false for production builds.');

  function check(context, id, importer) {
    if (!mockReference(id, importer)) return;
    if (production)
      context.error(
        'PRODUCTION_MOCK_IMPORT: production cannot import src/**/mocks or *.mock.* modules: ' +
          sourcePath(id),
      );
    if (!mocksEnabled)
      context.error(
        'DEV_MOCK_FLAG_REQUIRED: development mock imports require explicit VITE_ENABLE_MOCKS=true.',
      );
  }

  return {
    name: 'partner-production-mock-guard',
    enforce: 'pre',
    buildStart() {
      if (!production && mocksEnabled)
        this.warn(
          'DEV_MOCK_BOUNDARY: development fixtures are enabled; keep mock data separate and inject it through host contracts. Business components must not contain mock implementations.',
        );
    },
    resolveId(source, importer) {
      check(this, source, importer);
      return null;
    },
    load(id) {
      check(this, id);
      return null;
    },
    transform(_code, id) {
      check(this, id);
      return null;
    },
    moduleParsed(info) {
      check(this, info.id);
      for (const id of [...(info.importedIds ?? []), ...(info.dynamicallyImportedIds ?? [])])
        check(this, id, info.id);
    },
  };
}
