import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Collapse accidental repeated slashes (e.g. from an old locale switcher bug).
  if (pathname.includes('//')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/{2,}/g, '/');
    return NextResponse.redirect(url);
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
