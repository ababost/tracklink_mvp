import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/artists(.*)', '/forum(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth;

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Example: Redirect authenticated users from the homepage to the dashboard
  if (userId && req.nextUrl.pathname === '/') {
    const dashboardUrl = new URL('/artists/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
