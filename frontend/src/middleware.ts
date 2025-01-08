import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ['/', '/contact', '/about'],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: ['/api/webhook'],
  afterAuth(auth, req, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ['/((?!.+\.[\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
