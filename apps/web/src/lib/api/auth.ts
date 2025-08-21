import { PostKakaoLoginRequest, PostKakaoLoginResponse } from "../dto/auth";
import { KakaoLogin } from "../model/auth";
import { camelizeKeys } from "../utils/camelizeKeys";
import { serverHttp } from "./base";
import { ENDPOINTS } from "./endpoint";

export const postKakaoLogin = async (
  params: PostKakaoLoginRequest,
): Promise<KakaoLogin> => {
  const res = await serverHttp.post<PostKakaoLoginResponse>(
    ENDPOINTS.authKakao,
    params,
  );
  return camelizeKeys<KakaoLogin>(res);
};
