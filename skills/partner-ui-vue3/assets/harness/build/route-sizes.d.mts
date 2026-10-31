export function routeChunkReport(options?: {
  root?: string;
  reportFile?: string;
  names?: string[];
  routes?: { route: string; file: string; business?: boolean }[];
}): import('vite').Plugin;
