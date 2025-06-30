// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("Kakao Profile:", profile);

      //  백엔드 회원가입/로그인 로직
      const res = await fetch("https://your-backend.com/api/auth/kakao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: account?.access_token }),
      });

      if (!res.ok) return false;

      return true;
    },
    async session({ session, token }) {
      // 세션 데이터 세팅
      session.user.id = token.sub ?? `guest-${Date.now()}`;
      return session;
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
