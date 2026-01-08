import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's an admin route
  if (pathname.includes('/admin')) {
    const session = await auth();

    if (!session || !session.user) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Run the i18n middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
