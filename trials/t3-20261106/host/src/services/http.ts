import axios from "axios";
export const http = axios.create({ baseURL: "/api", timeout: 15000 });
export interface RequestOptions {
  signal?: AbortSignal;
}
// The target host owns authentication/interceptors; feature modules use this instance.
export async function getJson<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await http.get<T>(path, { signal: options.signal });
  return response.data;
}
