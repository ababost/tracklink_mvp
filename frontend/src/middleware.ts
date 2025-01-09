<<<<<<< HEAD
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/artists(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()

  if (!userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting

    return redirectToSignIn()
  }
})

=======
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
 
const publicPaths = ["/", "/sign-in(.*)", "/sign-up(.*)"];
 
// Create route matcher to check if path is public
const isPublic = createRouteMatcher(publicPaths);

// Create matcher for setup page
const isSetupPage = createRouteMatcher(["/artists/profile/setup"]);
 
export default clerkMiddleware((auth, req, evt) => {
  if (isPublic(req)) {
    // If user is signed in and trying to access public route (like homepage)
    // redirect them to their dashboard if they've completed setup
    if (auth.userId) {
      // You might want to check if they've completed setup first
      const dashboard = new URL('/artists/dashboard', req.url);
      return NextResponse.redirect(dashboard);
    }
    return NextResponse.next();
  }

  // Allow access to setup page right after signup
  if (isSetupPage(req) && auth.userId) {
    return NextResponse.next();
  }
 
  // If user tries to access protected route and is not signed in
  // allow clerk to handle redirection to sign-in
  return NextResponse.next();
});
 
>>>>>>> 87c9d85ead189fb3c1e31a1faa41898cb34a2d71
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}