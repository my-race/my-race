export const SessionStorageKey = {
  kakaoAuthCallbackUrl: "kakaoAuthCallbackUrl",
} as const;

export type SessionStorageKey =
  (typeof SessionStorageKey)[keyof typeof SessionStorageKey];
