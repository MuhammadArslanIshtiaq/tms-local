import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/pm/session";

const LOGIN_PATH = "/projects/login";

/**
 * Gates the internal project tool. Everything under /projects requires a
 * valid session cookie; signed-in users are bounced away from the login page.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const user = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === LOGIN_PATH) {
    if (user) return NextResponse.redirect(new URL("/projects", request.url));
    return NextResponse.next();
  }

  if (!user) {
    const url = new URL(LOGIN_PATH, request.url);
    if (pathname !== "/projects") {
      url.searchParams.set("next", `${pathname}${search}`);
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/projects", "/projects/(.*)"],
};
