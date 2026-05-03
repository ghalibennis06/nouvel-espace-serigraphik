import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './src/i18n'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const COOKIE = 'nes-admin-session'
const SECRET = process.env.ADMIN_COOKIE_SECRET ?? 'fallback-dev-secret-change-in-prod'

function verifyAdminCookie(signed: string | undefined): boolean {
  if (!signed) return false
  const dotIdx = signed.lastIndexOf('.')
  if (dotIdx < 0) return false
  const value = signed.slice(0, dotIdx)
  const sig   = signed.slice(dotIdx + 1)
  const expected = crypto.createHmac('sha256', SECRET).update(value).digest('base64url')
  try { return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) }
  catch { return false }
}

const intlMiddleware = createMiddleware({ locales, defaultLocale, localePrefix: 'always' })

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect /admin/* except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get(COOKIE)?.value
    if (!verifyAdminCookie(token)) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect API routes (except /api/admin/auth and public /api/leads POST)
  if (
    (pathname.startsWith('/api/admin/') && pathname !== '/api/admin/auth') ||
    pathname.startsWith('/api/leads/status') ||
    pathname.startsWith('/api/leads/activity')
  ) {
    const token = req.cookies.get(COOKIE)?.value
    if (!verifyAdminCookie(token)) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|images|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
