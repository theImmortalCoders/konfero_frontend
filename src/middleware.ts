import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const nextpath = request.nextUrl.pathname;

  const isRestrictedPath =
    nextpath === "/addconference" ||
    nextpath.startsWith("/addlecture/") ||
    nextpath.startsWith("/lecture/") ||
    nextpath === "/myconference" ||
    nextpath.startsWith("/myconference/") ||
    nextpath.startsWith("/updateconference/") ||
    nextpath.startsWith("/updatelecture/") ||
    nextpath === "/attend" ||
    nextpath === "/becomeorganizer";

  const isLoginPath = nextpath === "/login";

  const token = request.cookies.get("JSESSIONID")?.value;

  if (isRestrictedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isLoginPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: "/:path*",
};
