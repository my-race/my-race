import { headers } from "next/headers";
import { ApiError } from "./ApiError";

const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

async function _serverFetch<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const fullUrl = `${API_BASE_URL}${endpoint}`;

  if (process.env.NODE_ENV === "development") {
    const { method = "GET", body } = options;
    console.groupCollapsed(`[API Request] ${method} ${endpoint.split("?")[0]}`);
    console.log("➡️ URL:", fullUrl);
    console.log("➡️ Method:", method);
    if (body) {
      console.log("➡️ Body:", JSON.parse(body as string));
    }
  }

  try {
    const headersList = await headers();
    const token =
      headersList.get("authorization")?.replace("Bearer ", "") ?? "";

    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : {};

    if (process.env.NODE_ENV === "development") {
      console.log("⬅️ Status Code:", res.status);
      console.log("⬅️ Response:", json);
    }

    if (!res.ok) {
      throw new ApiError(
        `API 요청 실패: ${res.status} ${res.statusText}`,
        res.status,
        json,
      );
    }

    return json as T;
  } catch (error) {
    if (
      process.env.NODE_ENV === "development" &&
      !(error instanceof ApiError)
    ) {
      console.error("API Fetch Error:", error);
    }
    throw error;
  } finally {
    if (process.env.NODE_ENV === "development") {
      console.groupEnd();
    }
  }
}

async function get<T = any>(
  endpoint: string,
  query?: Record<string, any>,
): Promise<T> {
  let url = endpoint;
  if (query) {
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([, value]) => value != null),
    );
    const queryString = new URLSearchParams(filteredQuery).toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  return _serverFetch<T>(url, { method: "GET" });
}

async function post<T = any>(
  endpoint: string,
  body?: Record<string, any>,
): Promise<T> {
  return _serverFetch<T>(endpoint, {
    method: "POST",
    body: body ? JSON.stringify(body) : null,
  });
}

async function put<T = any>(
  endpoint: string,
  body?: Record<string, any>,
): Promise<T> {
  return _serverFetch<T>(endpoint, {
    method: "PUT",
    body: body ? JSON.stringify(body) : null,
  });
}

async function del<T = any>(
  endpoint: string,
  body?: Record<string, any>,
): Promise<T> {
  return _serverFetch<T>(endpoint, {
    method: "DELETE",
    body: body ? JSON.stringify(body) : null,
  });
}

export const serverHttp = {
  get,
  post,
  put,
  del,
};
