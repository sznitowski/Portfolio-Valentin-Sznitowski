import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const sessionSecret = process.env.ADMIN_SESSION_SECRET || "";
  const sessionCookie = request.cookies.get("admin_session")?.value;
  const session = await verifySession(sessionCookie, sessionSecret);

  const isLoginPage = pathname === "/admin/login";

  // Case 1: Trying to access login page while already authenticated
  if (isLoginPage && session) {
    const dashboardUrl = new URL("/admin/idea-radar", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Case 2: Allowing access to login page
  if (isLoginPage) {
    return NextResponse.next();
  }

  // Case 3: Accessing protected admin route without valid session
  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
