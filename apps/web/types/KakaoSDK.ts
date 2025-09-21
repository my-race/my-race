export type KakaoSDK = typeof window.Kakao;

export interface KakaoAuthorizeParams {
  redirectUri?: string | undefined;
  state?: string | undefined;
  scope?: string | undefined;
  throughTalk?: boolean | undefined;
  prompts?: string | undefined;
}
