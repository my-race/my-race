"use client";

import { KakaoAuthorizeParams, KakaoSDK } from "apps/web/types/KakaoSDK";

class KakaoManager {
  private static instance: KakaoManager;
  private sdk: KakaoSDK;

  private constructor() {
    if (typeof window === "undefined" || !window.Kakao) {
      throw new Error("Kakao SDK is not loaded.");
    }
    this.sdk = window.Kakao;
  }

  public static getInstance(): KakaoManager {
    if (!KakaoManager.instance) {
      KakaoManager.instance = new KakaoManager();
    }
    return KakaoManager.instance;
  }

  public init(): void {
    if (!this.sdk.isInitialized()) {
      const jsKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
      if (!jsKey) {
        throw new Error(
          "Kakao JavaScript Key is not defined in environment variables.",
        );
      }
      this.sdk.init(jsKey);
      console.log("Kakao SDK initialized.");
    }
  }

  public login(): Promise<void> {
    const settings: KakaoAuthorizeParams = {
      redirectUri: "http://localhost:3000/login/auth/kakao",
    };
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    if (redirectUri) settings.redirectUri = redirectUri;

    // Kakao.Auth.authorize는 페이지를 리디렉션하므로 반환값이 사실상 없습니다.
    // Promise를 반환할 필요는 없지만, 비동기 작업임을 명시하기 위해 유지할 수 있습니다.
    this.sdk.Auth.authorize(settings);
    return Promise.resolve();
  }

  public logout(): Promise<boolean> {
    return new Promise((resolve) => {
      this.sdk.Auth.logout(() => {
        resolve(true);
      });
    });
  }

  // 사용자 정보 타입은 필요에 따라 더 구체적으로 정의할 수 있습니다.
  public getUserInfo(): Promise<any> {
    return this.sdk.API.request({
      url: "/v2/user/me",
    });
  }
}

export default KakaoManager;
