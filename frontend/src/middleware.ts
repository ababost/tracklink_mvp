import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
 
export default clerkMiddleware({
  // Specify routes that don't require authentication
  publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)"],
  // Ensure these routes are ignored by auth checks
  ignoredRoutes: ["/api/webhook"],
  // Handle authentication and redirects
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }

    // If user is logged in and on a public route (like homepage)
    // redirect them to their dashboard
    if (auth.userId && req.nextUrl.pathname === '/') {
      const dashboardUrl = new URL('/artists/dashboard', req.url);
      return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
  },
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
