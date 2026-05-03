import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './src/i18n'
import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'nes-admin-session'
const SECRET = process.env.ADMIN_COOKIE_SECRET ?? 'fallback-dev-secret-change-in-prod'

// Edge-compatible HMAC verify using Web Crypto API
async function verifyAdminCookie(signed: string | undefined): Promise<boolean> {
  if (!signed) return false
  const dotIdx = signed.lastIndexOf('.')
  if (dotIdx < 0) return false
  const value = signed.slice(0, dotIdx)
  const sig   = signed.slice(dotIdx + 1)

  try {
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false, ['verify']
    )
    // base64url → Uint8Array
    const sigBytes = Uint8Array.from(
      atob(sig.replace(/-/g, '+').replace(/_/g, '/')),
      c => c.charCodeAt(0)
    )
    return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(value))
  } catch {
    return false
  }
}

const intlMiddleware = createMiddleware({ locales, defaultLocale, localePrefix: 'always' })

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect /admin/* except /admin/login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = req.cookies.get(COOKIE)?.value
    if (!(await verifyAdminCookie(token))) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect sensitive API routes (except /api/admin/auth and public /api/leads POST)
  if (
    (pathname.startsWith('/api/admin/') && pathname !== '/api/admin/auth') ||
    pathname.startsWith('/api/leads/status') ||
    pathname.startsWith('/api/leads/activity')
  ) {
    const token = req.cookies.get(COOKIE)?.value
    if (!(await verifyAdminCookie(token))) {
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
