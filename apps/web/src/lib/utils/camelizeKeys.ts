import camelCase from "camelcase";

type PlainObject = Record<string, any>;

export function camelizeKeys<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map(camelizeKeys) as T;
  }

  if (obj !== null && typeof obj === "object") {
    const result: PlainObject = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = camelCase(key);
      result[newKey] = camelizeKeys(value);
    }
    return result as T;
  }

  return obj as T;
}
