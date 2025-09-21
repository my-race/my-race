"use client";

import { motion } from "framer-motion";
import KakaoLoginButton from "./KakaoLoginButton";

interface LoginProps {
  callbackUrl?: string;
}

export default function Login({ callbackUrl }: LoginProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <motion.div
        className="flex flex-col items-center"
        initial={{ y: 0 }}
        animate={{ y: -50 }}
        transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl text-center font-bold mb-4"
          initial={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          My Race
        </motion.h1>
        <motion.p
          className="text-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        >
          카카오 계정으로 시작하기
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
      >
        <KakaoLoginButton callbackUrl={callbackUrl} />
      </motion.div>
    </div>
  );
}
