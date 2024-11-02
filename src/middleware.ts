import { NextResponse, NextRequest } from "next/server";
import { getCookie } from "cookies-next";

// public routes that are accessible without sign-in
const publicRoutes = ["/sign-in", "/sign-up"];

// after sign-in, user should not be able to access these routes
const restrictedRoutes = ["/sign-in", "/sign-up"];

const isPublicRoute = (pathname: string) => {
  return publicRoutes.includes(pathname);
};

export async function middleware(req: NextRequest) {
  const user_id = getCookie("user_id", { req });
  const url = req.nextUrl.clone();

  // Skip static files and _next paths
  if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // Redirect logic for public and restricted routes
  if (!isPublicRoute(url.pathname)) {
    if (!user_id) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (user_id) {
    if (restrictedRoutes.includes(url.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (url.pathname === "/dummy-page") {
      url.pathname = "/account-settings";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!favicon.ico).*)"],
};
