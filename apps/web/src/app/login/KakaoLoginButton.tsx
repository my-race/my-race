"use client";

import Image from "next/image";
import useKakao from "../_hooks/useKakao";
import { useCallback } from "react";

export default function KakaoLoginButton() {
  const kakao = useKakao();
  const handleClickKakaoLogin = useCallback(() => {
    if (kakao.isLoaded) {
      return kakao.login();
    }
  }, [kakao]);

  return (
    <button
      onClick={handleClickKakaoLogin}
      className="border-0 bg-transparent p-0 cursor-pointer hover:opacity-80 transition-opacity"
      disabled={!kakao.isLoaded}
    >
      <Image
        src="/assets/auth/kakao_login_ko_large_wide.png"
        alt="카카오로 로그인"
        width={240}
        height={60}
        className="block"
        priority
      />
    </button>
  );
}
