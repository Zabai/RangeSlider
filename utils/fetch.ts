export function fetchJson<T>(...args: Parameters<typeof fetch>): Promise<T> {
  return fetch(...args).then((response) => response.json());
}
