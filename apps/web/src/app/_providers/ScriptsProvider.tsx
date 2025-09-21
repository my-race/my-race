"use client";

import Script from "next/script";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

// Context에서 공유할 값의 타입 정의
interface ScriptLoadStatus {
  isLoaded: boolean;
}

export interface ScriptContextType {
  kakao: ScriptLoadStatus;
}

const ScriptContext = createContext<ScriptContextType | null>(null);

export const useScriptLoadStatus = (): ScriptContextType => {
  const context = useContext(ScriptContext);
  if (!context) {
    throw new Error("Cannot use script status outside of a ScriptsProvider.");
  }
  return context;
};

interface ScriptProviderProps {
  children: ReactNode;
}

export default function ScriptsProvider({ children }: ScriptProviderProps) {
  const [scriptsLoadedStatus, setScriptLoadedStatus] =
    useState<ScriptContextType>({
      kakao: { isLoaded: false },
    });

  const updateStatusLoaded = useCallback(
    (scriptType: keyof ScriptContextType) => {
      if (scriptsLoadedStatus[scriptType].isLoaded) return;
      return setScriptLoadedStatus((status) => ({
        ...status,
        [scriptType]: { isLoaded: true },
      }));
    },
    [scriptsLoadedStatus],
  );

  return (
    <ScriptContext.Provider value={scriptsLoadedStatus}>
      {children}
      <KakaoScript
        onLoad={() => {
          updateStatusLoaded("kakao");
        }}
      />
    </ScriptContext.Provider>
  );
}

function KakaoScript({ onLoad }: { onLoad: () => void }) {
  const KAKAO_SDK_URL = `https://t1.kakaocdn.net/kakao_js_sdk/2.7.6/kakao.min.js`;
  const KAKAO_INTEGRITY =
    "sha384-WAtVcQYcmTO/N+C1N+1m6Gp8qxh+3NlnP7X1U7qP6P5dQY/MsRBNTh+e1ahJrkEm";

  return (
    <Script
      src={KAKAO_SDK_URL}
      integrity={KAKAO_INTEGRITY}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={onLoad}
    />
  );
}
