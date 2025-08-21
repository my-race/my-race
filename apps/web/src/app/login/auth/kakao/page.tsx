import { postKakaoLogin } from "apps/web/src/lib/api/auth";
import AuthKakao from "./AuthKakao";
import { ApiError } from "apps/web/src/lib/api/ApiError";

interface AuthKakaoPageProps {
  searchParams: {
    code?: string;
  };
}

const loginByKakao = async (
  code?: string,
): Promise<{
  accessToken: string | null;
  errorMessage: string | null;
}> => {
  let accessToken: string | null;
  let errorMessage: string | null;
  if (code) {
    try {
      accessToken = (await postKakaoLogin({ access_token: code })).accessToken;
      errorMessage = null;
    } catch (err: unknown) {
      accessToken = null;
      if (err instanceof ApiError) {
        errorMessage = err.response.error ?? `status: ${err.status}`;
      } else {
        const errAny: any = err;
        errorMessage = (errAny?.message || errAny?.msg || errAny?.body) ?? null;
      }
    }
  } else {
    accessToken = null;
    errorMessage = "Kakao code not exist";
  }
  return {
    accessToken,
    errorMessage,
  };
};

export default async function AuthKakaoPage({
  searchParams,
}: AuthKakaoPageProps) {
  const { code } = await searchParams;

  const { accessToken, errorMessage } = await loginByKakao(code);

  return (
    <AuthKakao
      accessToken={accessToken}
      errorMessage={errorMessage ?? "code is not exist"}
    />
  );
}
