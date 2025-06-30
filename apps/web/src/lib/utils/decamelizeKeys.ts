// lib/utils/decamelizeKeys.ts
import decamelize from "decamelize";

type PlainObject = Record<string, any>;

export function decamelizeKeys<T>(obj: unknown): T {
  if (Array.isArray(obj)) {
    return obj.map(decamelizeKeys) as T;
  }

  if (obj !== null && typeof obj === "object") {
    const result: PlainObject = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = decamelize(key);
      result[newKey] = decamelizeKeys(value);
    }
    return result as T;
  }

  return obj as T;
}
