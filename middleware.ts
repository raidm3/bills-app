import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
// import { NextRequest } from 'next/server';
 
// alternative: https://docs.kinde.com/developer-tools/sdks/backend/nextjs-sdk/
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|manifest|.*\\.webp|.*\\.jpg|.*\\.png|.*\\.svg$).*)'],
};

// export function middleware(request: NextRequest) {
//   console.log('Middleware triggered');
// }
