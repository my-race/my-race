"use client";

import { useEffect, useState } from "react";
import useAuth from "../../../_hooks/useAuth";
import { motion } from "framer-motion";
import SessionStorage from "../../../_services/SessionStorage/SessionStorage";
import { SessionStorageKey } from "../../../_services/SessionStorage/SessionStorage.type";
import { useRouter } from "next/navigation";

interface AuthKakaoProps {
  accessToken: string | null;
  errorMessage: string | null;
}

export default function AuthKakao({
  accessToken,
  errorMessage,
}: AuthKakaoProps) {
  const router = useRouter();
  const { setAuthInfo } = useAuth();
  const [callbackUrl, setCallbackUrl] = useState<string>();
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const sessionStorage = new SessionStorage();
    
    if (accessToken) {
      setAuthInfo(accessToken);
      setIsCompleted(true);
    }

    // callbackUrl 초기화
    if (typeof callbackUrl === "undefined") {
      const savedUrl = sessionStorage.getItem(
        SessionStorageKey.kakaoAuthCallbackUrl,
      );
      if (savedUrl) {
        setCallbackUrl(savedUrl);
      } else {
        setCallbackUrl("");
      }
    }

    // 에러가 있는 경우 즉시 cleanup
    if (errorMessage) {
      sessionStorage.removeItem(SessionStorageKey.kakaoAuthCallbackUrl);
    }

    // cleanup 함수 - 컴포넌트 unmount 시 실행
    return () => {
      sessionStorage.removeItem(SessionStorageKey.kakaoAuthCallbackUrl);
    };
  }, [accessToken, errorMessage]);

  useEffect(() => {
    if (!isCompleted) {
      return;
    }

    // 성공 시 1초 후 이동 (사용자가 성공 메시지를 볼 시간)
    const moveTimer = setTimeout(() => {
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push("/");
      }
    }, 1000);
    
    return () => clearTimeout(moveTimer);
  }, [isCompleted, callbackUrl, router]);

  if (errorMessage)
    return (
      <div className="flex flex-col gap-4 items-center">
        <motion.p className="text-2xl">로그인에 실패했습니다.</motion.p>
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        >
          {errorMessage}
        </motion.p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          뒤로 가기
        </button>
      </div>
    );
  if (isCompleted) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <motion.p className="text-2xl">로그인 성공!</motion.p>
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        >
          잠시 후 {callbackUrl ? "이전 페이지로" : "홈으로"} 이동합니다...
        </motion.p>
      </div>
    );
  }

  return (
    <div>
      <p>로그인 중</p>
    </div>
  );
}
