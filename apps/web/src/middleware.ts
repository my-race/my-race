import { NextRequest, NextResponse } from "next/server";
import { handleAuthMiddleware } from "./middleware/auth";

export function middleware(req: NextRequest): NextResponse {
  return handleAuthMiddleware(req);
}
