import { NextRequest, NextResponse } from "next/server";
import { isProtectedRoute } from "./auth/matchers";
import { redirectToLogin } from "./auth/redirects";

export function handleAuthMiddleware(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const pathname = req.nextUrl.pathname;

  if (isProtectedRoute(pathname) && !token) {
    return redirectToLogin(req);
  }

  return NextResponse.next();
}
