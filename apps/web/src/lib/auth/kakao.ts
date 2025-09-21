import { postKakaoLogin } from "apps/web/src/lib/api/auth";
import { ApiError } from "apps/web/src/lib/api/ApiError";

export const loginByKakao = async (
    code?: string,
  ): Promise<{
    accessToken: string | null;
    errorMessage: string | null;
  }> => {
    let accessToken: string | null;
    let errorMessage: string | null;
    if (code) {
      try {
        accessToken = (await postKakaoLogin({
          code,
          redirect_uri: `${process.env.NEXT_PUBLIC_SERVICE_URL}login/auth/kakao`
        })).token;
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