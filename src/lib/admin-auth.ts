import crypto from 'crypto'
import type { NextRequest } from 'next/server'

export const ADMIN_COOKIE = 'nes-admin-session'
export const ADMIN_TOKEN_TTL_MS = 8 * 60 * 60 * 1000 // 8 hours

function readSecret(): string {
  const s = process.env.ADMIN_COOKIE_SECRET
  if (!s || s.length < 16) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[NES] ADMIN_COOKIE_SECRET missing or too short in production')
    }
    return s || 'dev-only-not-for-prod-aaaaaaaa'
  }
  return s
}

// Token format: `admin:<issuedAtMs>.<base64url-hmac>`
export function signAdminToken(value: string): string {
  return value + '.' + crypto.createHmac('sha256', readSecret()).update(value).digest('base64url')
}

export function buildAdminToken(): string {
  return signAdminToken('admin:' + Date.now())
}

export type AdminRole = 'super_admin' | 'admin' | 'seller'

// Token utilisateur : u:<id>:<role>:<issuedAt>.<hmac>
export function buildUserToken(id: string, role: AdminRole): string {
  return signAdminToken(`u:${id}:${role}:${Date.now()}`)
}

// Renvoie l'acteur courant (pour audit + gating rôle). Null si non authentifié.
export function getAdminActor(req: NextRequest): { id: string | null; role: AdminRole; email?: string } | null {
  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (!token || !verifyAdminToken(token)) return null
  const value = token.slice(0, token.lastIndexOf('.'))
  const mu = /^u:([^:]+):(super_admin|admin|seller):\d+$/.exec(value)
  if (mu) return { id: mu[1], role: mu[2] as AdminRole }
  // Legacy single-password login → super_admin
  if (/^admin:\d+$/.test(value)) return { id: null, role: 'super_admin', email: 'admin' }
  return null
}

// Server-side verification: HMAC AND issued-at within TTL window.
export function verifyAdminToken(signed: string): boolean {
  const dotIdx = signed.lastIndexOf('.')
  if (dotIdx < 0) return false
  const value = signed.slice(0, dotIdx)
  const sig   = signed.slice(dotIdx + 1)

  const expected = crypto.createHmac('sha256', readSecret()).update(value).digest('base64url')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  let hmacOk = false
  try { hmacOk = crypto.timingSafeEqual(a, b) } catch { return false }
  if (!hmacOk) return false

  const m = /^admin:(\d+)$/.exec(value) || /^u:[^:]+:(?:super_admin|admin|seller):(\d+)$/.exec(value)
  if (!m) return false
  const issuedAt = Number(m[1])
  if (!Number.isFinite(issuedAt)) return false
  const age = Date.now() - issuedAt
  return age >= 0 && age <= ADMIN_TOKEN_TTL_MS
}

// Defense-in-depth: every admin/sensitive route handler should call this in
// addition to relying on middleware. Returns true if the request carries a
// valid admin session cookie.
export function isAdminRequest(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (!token) return false
  try { return verifyAdminToken(token) } catch { return false }
}

