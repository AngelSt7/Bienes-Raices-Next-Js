import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAuth = !!req.nextauth.token;

    if (isAuth && pathname.includes("/auth/login")) {
      return NextResponse.redirect(new URL("/dashboard/properties?page=1", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
