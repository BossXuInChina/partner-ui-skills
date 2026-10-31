import type { BlankApi } from '../api';

/** Explicit test/development injection; never imported by Page or the production router. */
export function makeBlankMockApi(): BlankApi {
  return {
    primary: async ({ signal }) => {
      signal.throwIfAborted();
    },
  };
}
