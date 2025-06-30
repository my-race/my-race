import { GetAuthUrlResponse } from "../dto/auth";
import { AuthUrl } from "../model/auth";
import { camelizeKeys } from "../utils/camelizeKeys";
import { serverFetch } from "./base";
import { ENDPOINTS } from "./endpoint";

export const getAuthUrl = async (): Promise<AuthUrl> => {
  const res = await serverFetch<GetAuthUrlResponse>(ENDPOINTS.auth);
  return camelizeKeys<AuthUrl>(res);
};
