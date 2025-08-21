"use client";

import { useEffect } from "react";
import useAuth from "../../../_hooks/useAuth";
import { motion } from "framer-motion";

interface AuthKakaoProps {
  accessToken: string | null;
  errorMessage: string | null;
}

export default function AuthKakao({
  accessToken,
  errorMessage,
}: AuthKakaoProps) {
  const { setAuthInfo } = useAuth();

  useEffect(() => {
    console.log("accessToken", accessToken);
    if (accessToken) {
      setAuthInfo(accessToken);
    }
  }, []);
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
