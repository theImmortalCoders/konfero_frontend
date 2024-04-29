import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("path", path);

  const isRestrictedPath =
    path === "/myconference" || path.startsWith("/myconference/");

  const isLoginPath = path === "/login";

  const token = request.cookies.get("JSESSIONID")?.value;

  if (isRestrictedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isLoginPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/aboutus", "/conference/:path*", "/myconference/:path*", "/login"],
};
