export const LocalStorageKey = {
  TOKEN: "token",
  TOKEN_EXPIRES: "token-expires",
} as const;

export type LocalStorageKey =
  (typeof LocalStorageKey)[keyof typeof LocalStorageKey];
