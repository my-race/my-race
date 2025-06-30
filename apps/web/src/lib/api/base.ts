// lib/api.ts
import { headers } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

/**
 * 서버 컴포넌트 환경에서 Bearer 토큰을 자동 주입한 fetch
 */
export async function serverFetch<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const headersList = await headers();
  const token = headersList.get("authorization")?.replace("Bearer ", "");

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.statusText}`);
  }

  return res.json();
}
