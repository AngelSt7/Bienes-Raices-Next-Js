import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { serverGetCookie } from "./src/utils/backend/cookiesUtils";
import { userGetInfo } from "./src/services/client/user/UserGetInfo";
import { authCreateAccountGoogleSchema } from "@/src/schema/authSchema";

export default withAuth(
  async function middleware(req) {
    const token = await serverGetCookie();

    const pathname = req.nextUrl.pathname;
    const isAuth = !!req.nextauth.token;

    if (!isAuth && pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (isAuth) {
      const user = await userGetInfo({ token }); 
      if (user && user.authProvider === "google") {
        const validation = authCreateAccountGoogleSchema.safeParse(user);
        
          if (!validation.success) {
            return NextResponse.redirect(new URL("/auth/complete-profile", req.url));
          }
      } 

      if (pathname.includes("/auth/login")) {
        return NextResponse.redirect(new URL("/dashboard/properties?page=1", req.url));
      }
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
