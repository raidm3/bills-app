import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const appPages = ['/dashboard', '/bills', '/recipes', '/groceries'];
      const isOnAppSite = appPages.findIndex(page => nextUrl.pathname.startsWith(page)) >= 0;
      if (isOnAppSite) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
  trustHost: true,
} satisfies NextAuthConfig;
