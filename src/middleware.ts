import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'
import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'nes-admin-session'
const TTL_MS = 8 * 60 * 60 * 1000 // keep in sync with ADMIN_TOKEN_TTL_MS

function readSecret(): string | null {
  const s = process.env.ADMIN_COOKIE_SECRET
  if (!s || s.length < 16) {
    if (process.env.NODE_ENV === 'production') {
      // Edge runtime: log loudly and treat all admin sessions as invalid
      // so the surface stays locked rather than world-open.
      console.error('[NES] ADMIN_COOKIE_SECRET missing/short — refusing all admin sessions.')
      return null
    }
    return s || 'dev-only-not-for-prod-aaaaaaaa'
  }
  return s
}

async function verifyAdminCookie(signed: string | undefined): Promise<boolean> {
  if (!signed) return false
  const secret = readSecret()
  if (!secret) return false

  const dotIdx = signed.lastIndexOf('.')
  if (dotIdx < 0) return false
  const value = signed.slice(0, dotIdx)
  const sig   = signed.slice(dotIdx + 1)

  try {
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false, ['sign']
    )
    const expectedBuf = await crypto.subtle.sign('HMAC', key, enc.encode(value))
    const bytes = new Uint8Array(expectedBuf)
    const expectedSig = btoa(Array.from(bytes, b => String.fromCharCode(b)).join(''))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    if (expectedSig.length !== sig.length) return false
    let diff = 0
    for (let i = 0; i < expectedSig.length; i++) {
      diff |= expectedSig.charCodeAt(i) ^ sig.charCodeAt(i)
    }
    if (diff !== 0) return false

    const m = /^admin:(\d+)$/.exec(value)
    if (!m) return false
    const issuedAt = Number(m[1])
    if (!Number.isFinite(issuedAt)) return false
    const age = Date.now() - issuedAt
    return age >= 0 && age <= TTL_MS
  } catch {
    return false
  }
}

const intlMiddleware = createMiddleware({ locales, defaultLocale, localePrefix: 'always' })

function noindex(res: NextResponse): NextResponse {
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  return res
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Admin + API: never run i18n middleware here.
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/')) {
    // Protect /admin/* (except the login page itself)
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
      const token = req.cookies.get(COOKIE)?.value
      if (!(await verifyAdminCookie(token))) {
        const loginUrl = new URL('/admin/login', req.url)
        loginUrl.searchParams.set('from', pathname)
        return noindex(NextResponse.redirect(loginUrl))
      }
    }

    // Sensitive APIs: 401 JSON (not redirect) for unauthenticated callers.
    // Public: /api/leads (POST capture), /api/admin/auth (login),
    //         /api/revalidate (HMAC-signed by Woo), /api/img (proxy).
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

    // Strip admin pages from search engines defensively.
    if (pathname.startsWith('/admin')) return noindex(NextResponse.next())
    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|images|favicon.ico|robots.txt|sitemap.xml|opengraph-image|twitter-image|icon|apple-icon|manifest.webmanifest|.*\\..*).*)',
  ],
}
