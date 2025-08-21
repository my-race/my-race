export const SessionStorageKey = {
  kakaoAuthCallbackUrl: "token",
} as const;

export type SessionStorageKey =
  (typeof SessionStorageKey)[keyof typeof SessionStorageKey];
