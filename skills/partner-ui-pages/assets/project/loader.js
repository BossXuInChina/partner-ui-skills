/* Offline module registry: invoke registered factories; the browser loads classic scripts in order. */
(() => {
  'use strict';
  const factories = new Map(), cache = new Map();
  let external, started = false;
  function load(id) {
    if (Object.hasOwn(external, id)) return external[id];
    if (cache.has(id)) return cache.get(id).exports;
    const record = factories.get(id);
    if (!record) throw new Error('PROJECT_MODULE_MISSING: ' + id);
    const module = { exports: {} };
    cache.set(id, module);
    record.factory.call(undefined, module, module.exports, request => {
      if (!Object.hasOwn(record.dependencies, request)) throw new Error('PROJECT_IMPORT_UNDECLARED: ' + request);
      return load(record.dependencies[request]);
    });
    return module.exports;
  }
  window.__PartnerProject = {
    define(id, dependencies, factory) {
      if (started || factories.has(id)) throw new Error('PROJECT_MODULE_DUPLICATE: ' + id);
      factories.set(id, { dependencies, factory });
    },
    start(config) {
      if (started) throw new Error('PROJECT_ALREADY_STARTED');
      started = true;
      const kit = window.PartnerUI, Vue = kit.Vue;
      const pages = Object.freeze(config.pages.map(page => Object.freeze({ ...page })));
      const route = Vue.reactive({ page: config.startPage, params: {} });
      function routeFromHash() {
        let id = '', params = {};
        try {
          const [path, query = ''] = location.hash.slice(1).replace(/^\//, '').split('?');
          id = decodeURIComponent(path);
          params = Object.fromEntries(new URLSearchParams(query));
        } catch { /* Malformed or unknown deep links fall back to the declared start page. */ }
        const valid = pages.some(page => page.id === id);
        route.page = valid ? id : config.startPage;
        route.params = valid ? params : {};
      }
      function navigate(id, params = {}) {
        if (!pages.some(page => page.id === id)) throw new Error('PROJECT_PAGE_UNKNOWN: ' + id);
        const query = new URLSearchParams(Object.entries(params).sort(([a], [b]) => a.localeCompare(b))).toString();
        location.hash = '#/' + encodeURIComponent(id) + (query ? '?' + query : '');
        routeFromHash();
      }
      routeFromHash();
      window.addEventListener('hashchange', routeFromHash);
      const context = Object.freeze({ id: config.id, title: config.title, route: Vue.readonly(route), pages, navigate });
      const ProjectView = Vue.defineComponent({
        name: 'ProjectView',
        setup: () => () => {
          const page = pages.find(page => page.id === route.page);
          return Vue.h(load(page.module).default, { key: page.id });
        },
      });
      external = {
        vue: kit.Vue, '@workbench/ui-vue3': kit.Workbench, 'huawei-partner-ai-ui': kit.AI,
        'partner-ui': kit, 'partner-ui/project': { ProjectView, useProject: () => context },
      };
      try {
        const app = kit.createApp(load(config.entry).default);
        app.mount('#app');
        window.addEventListener('pagehide', event => {
          if (event.persisted) return;
          app.unmount();
          window.removeEventListener('hashchange', routeFromHash);
        });
      } catch (error) {
        window.removeEventListener('hashchange', routeFromHash);
        document.getElementById('app').textContent = '页面加载失败：' + error.message;
        throw error;
      }
    },
  };
})();
