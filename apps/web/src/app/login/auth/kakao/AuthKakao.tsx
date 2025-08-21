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
  const { set } = useAuth();

  useEffect(() => {
    console.log("accessToken", accessToken);
    // if (accessToken) {
    //   set(accessToken);
    // }
  }, []);
  if (errorMessage)
    return (
      <div>
        <motion.p>로그인에 실패했습니다.</motion.p>
        <p>{errorMessage}</p>
      </div>
    );
  return (
    <div>
      <p>로그인 중</p>
    </div>
  );
}
