import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// These routes are public, but shouldn't be accessible by authenticated users.
const nonAuthedPaths = ["/auth/login", "/auth/signup"];
// These routes are private, and should only be accessible by authenticated users.
const privatePaths = ["/myaccount"];
// These routes are public, and should be accessible by both authenticated and non-authenticated users.
const publicPaths = ["/", ...nonAuthedPaths];

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isAuthenticated = !!session?.user;

  if (
    (!isAuthenticated && publicPaths.includes(pathname)) ||
    (isAuthenticated && !nonAuthedPaths.includes(pathname))
  ) {
    return res;
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/";
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
