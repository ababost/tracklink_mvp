import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
 
const publicPaths = ["/", "/sign-in*", "/sign-up*"];
 
// Create route matcher to check if path is public
const isPublic = createRouteMatcher(publicPaths);
 
export default clerkMiddleware((auth, req, evt) => {
  if (isPublic(req)) {
    // If user is signed in and trying to access public route (like homepage)
    // redirect them to their dashboard
    if (auth.userId) {
      const dashboard = new URL('/artists/dashboard', req.url);
      return NextResponse.redirect(dashboard);
    }
    return NextResponse.next();
  }
 
  // If user tries to access protected route and is not signed in
  // allow clerk to handle redirection to sign-in
  return NextResponse.next();
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/"],
};
