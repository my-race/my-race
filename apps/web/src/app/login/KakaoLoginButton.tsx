"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface KakaoLoginButtonProps {
  authUrl: string;
}

export default function KakaoLoginButton({ authUrl }: KakaoLoginButtonProps) {
  const router = useRouter();
  const handleLogin = () => {
    router.push(authUrl);
  };
  return (
    <button
      onClick={handleLogin}
      className="border-0 bg-transparent p-0 cursor-pointer hover:opacity-80 transition-opacity"
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
