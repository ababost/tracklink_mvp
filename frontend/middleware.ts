import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server';
 
export default withClerkMiddleware((req: NextRequest) => {
  const { userId } = getAuth(req);
  const publicPaths = ["/", "/sign-in*", "/sign-up*"];
  
  // Check if the current path is public
  const isPublic = publicPaths.find(path => 
    req.nextUrl.pathname.match(new RegExp(`^${path}$`.replace('*', '.*')))
  );

  // If the path is public or user is authenticated, allow the request
  if (isPublic || userId) {
    return NextResponse.next();
  }

  // Redirect unauthorized users to sign-in page
  const signInUrl = new URL('/sign-in', req.url);
  return NextResponse.redirect(signInUrl);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
