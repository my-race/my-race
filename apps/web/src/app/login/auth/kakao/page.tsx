import { mockKakaoLogin } from "apps/web/src/lib/auth/mockAuth";
import AuthKakao from "./AuthKakao";

interface AuthKakaoPageProps {
  searchParams: {
    code?: string;
  };
}



export default async function AuthKakaoPage({
  searchParams,
}: AuthKakaoPageProps) {
  const { code } = searchParams;

  const { accessToken, errorMessage } = await mockKakaoLogin(code);
  // const { accessToken, errorMessage } = await loginByKakao(code);

  return (
    <AuthKakao
      accessToken={accessToken}
      errorMessage={errorMessage ?? "code is not exist"}
    />
  );
}
