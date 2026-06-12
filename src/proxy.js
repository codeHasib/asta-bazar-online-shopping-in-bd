import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);
  const isApi = pathname.startsWith("/api");
  const isAdminApi = pathname.startsWith("/api");
  const isDashboard = pathname.startsWith("/dashboard");

  // 🔐 Protect admin routes + dashboard
  if (isAdminApi || isDashboard) {
    if (!sessionCookie) {
      // API → return JSON
      if (isApi) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      // Page → redirect
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
