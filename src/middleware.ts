import {NextResponse } from 'next/server'
import { i18nConfig } from "@/i18n-config";
import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute  = createRouteMatcher([
  '/api/home(.*)',
  '/api/webhooks(.*)',
  '/api/user(.*)',
  '/api/stripe(.*)',
  '/api/prompt(.*)',
  '/api/upload(.*)',
  '/api/download(.*)',
  '/api/check-status(.*)',
  '/api/generateMusic(.*)',
]);

export default clerkMiddleware((auth, request, event) => { 
 
  if (isProtectedRoute (request)){
        return NextResponse.next();
  }
  const pathname = request.nextUrl.pathname
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return NextResponse.next();

  request.nextUrl.pathname = `/${i18nConfig.defaultLocale}${pathname}`
  return NextResponse.rewrite(request.nextUrl);

 }, {debug: false});

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|ads.txt|robots|sitemap|assets|favicon|posts).*)',
    '/', // Run middleware on index page
    '/(api|trpc)(.*)' // Run middleware on API routes
  ]
}
