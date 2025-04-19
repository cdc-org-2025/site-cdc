export function buildQueryParams<T extends Record<string, any>>(params: T): Partial<T> {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
  );
  return filtered as Partial<T>;
}
