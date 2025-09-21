"use client";

import { KakaoAuthorizeParams, KakaoSDK } from "apps/web/types/KakaoSDK";
import SessionStorage from "../SessionStorage/SessionStorage";
import { SessionStorageKey } from "../SessionStorage/SessionStorage.type";

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

  public login(callbackUrl?: string): Promise<void> {
    const serviceUri = process.env.NEXT_PUBLIC_SERVICE_URL;
    let redirectUri = `${serviceUri}login/auth/kakao`;
    if (callbackUrl) {
      const sessionStorage = new SessionStorage();
      sessionStorage.setItem(
        SessionStorageKey.kakaoAuthCallbackUrl,
        callbackUrl,
      );
    }

    const settings: KakaoAuthorizeParams = {
      redirectUri: redirectUri,
    };

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

  // TODO: 사용자 정보 가져오기
  public getUserInfo(): Promise<any> {
    return this.sdk.API.request({
      url: "/v2/user/me",
    });
  }
}

export default KakaoManager;
