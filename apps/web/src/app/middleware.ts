// middleware.ts
import { NextRequest } from "next/server";
import { handleAuthMiddleware } from "./middleware/auth";

export function middleware(req: NextRequest) {
  return handleAuthMiddleware(req);
}
