"use client";

import { useState, useEffect, useCallback } from "react";

import { useScriptLoadStatus } from "../_providers/ScriptsProvider";
import KakaoManager from "../_services/Kakao/KakaoManager";

interface UseKakaoResultLoaded {
  isLoaded: true;
  login: () => Promise<void>;
}

interface UseKakaoResultNotLoaded {
  isLoaded: false;
}

type UseKakaoResult = UseKakaoResultLoaded | UseKakaoResultNotLoaded;

const useKakao = (): UseKakaoResult => {
  const {
    kakao: { isLoaded },
  } = useScriptLoadStatus();
  const [manager, setManager] = useState<KakaoManager | null>(null);

  const login = useCallback(async () => {
    if (!manager) throw Error("Kakao SDK not initialized.");

    return manager.login();
  }, [manager]);

  useEffect(() => {
    if (isLoaded && !manager) {
      try {
        const kakaoManagerInstance = KakaoManager.getInstance();
        kakaoManagerInstance.init();
        setManager(kakaoManagerInstance);
      } catch (error) {
        console.error("Failed to initialize KakaoManager:", error);
      }
    }
  }, [isLoaded, manager]);

  return isLoaded ? { isLoaded, login } : { isLoaded };
};

export default useKakao;
