"use client";

import { useEffect, useState } from "react";
import useAuth from "../../../_hooks/useAuth";
import { motion } from "framer-motion";
import SessionStorage from "../../../_services/SessionStorage/SessionStorage";
import { SessionStorageKey } from "../../../_services/SessionStorage/SessionStorage.type";
import { useRouter } from "next/router";

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
    if (accessToken) {
      setAuthInfo(accessToken);
    }

    if (typeof callbackUrl === "undefined") {
      const sessionStorage = new SessionStorage();
      const savedUrl = sessionStorage.getItem(
        SessionStorageKey.kakaoAuthCallbackUrl,
      );
      if (savedUrl) {
        setCallbackUrl(savedUrl);
      } else {
        setCallbackUrl("");
      }
    }
  }, []);

  useEffect(() => {
    if (!isCompleted) {
      return;
    }

    const moveTimer = setTimeout(() => {}, 3000);
  }, [isCompleted]);

  if (errorMessage)
    return (
      <div className="flex flex-col gap-2 items-center">
        <motion.p className="text-2xl">로그인에 실패했습니다.</motion.p>
        <motion.p
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 20 }}
          transition={{ duration: 0.8, ease: "easeIn" }}
        >
          {errorMessage}
        </motion.p>
      </div>
    );
  return (
    <div>
      <p>로그인 중</p>
    </div>
  );
}
