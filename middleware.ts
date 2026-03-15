import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './src/i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  // Always show the locale prefix in URLs: /fr/... and /ar/...
  localePrefix: 'always',
})

export const config = {
  // Match all paths EXCEPT Next.js internals and static files
  matcher: [
    '/((?!_next|_vercel|api|images|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
