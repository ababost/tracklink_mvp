import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  afterAuth(auth, req, evt) {
    // If user is signed in and trying to access public routes
    if (auth.userId && req.nextUrl.pathname === "/") {
      const dashboardUrl = new URL("/artists/dashboard", req.url);
      return Response.redirect(dashboardUrl);
    }
  },
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|_vercel|[^/]+\\.[^/]+$).*)"],
};
