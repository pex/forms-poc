export function getInputs<T = Record<string, unknown>>(formData: FormData): T {
  const entries: Record<string, unknown> = {};
  const keys = new Set(formData.keys());
  for (const key of keys) {
    const values = formData.getAll(key);
    entries[key] = values.length > 1 ? values : values[0];
  }
  return entries as T;
}
