import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NEXT_PUBLIC_FRONT_BASE_URL } from "./utils/appENV";

export function middleware(request: NextRequest) {
  const nextpath = request.nextUrl.pathname;

  const isRestrictedPath =
    nextpath === "/myconference" || nextpath.startsWith("/myconference/");

  const isLoginPath = nextpath === "/login";

  const token = request.cookies.get("JSESSIONID")?.value;

  if (isRestrictedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isLoginPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  console.log(
    "-------------------------------------------------------------------"
  );
  const response = NextResponse.next();
  if (!token) {
    response.cookies.set(
      "redirectUrl",
      `${NEXT_PUBLIC_FRONT_BASE_URL}${nextpath}`,
      {
        path: "/",
      }
    );

    console.log("nextpath2", nextpath);
    console.log("Redirect URL Cookie:", response.cookies.get("redirectUrl"));
  }
  console.log(" Cookie:", response.cookies);
}

export const config = {
  matcher: ["/((?!assets|login|_next/static|_next/image|favicon.ico).*)"],
};
