import crypto from 'crypto'

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

  const m = /^admin:(\d+)$/.exec(value)
  if (!m) return false
  const issuedAt = Number(m[1])
  if (!Number.isFinite(issuedAt)) return false
  const age = Date.now() - issuedAt
  return age >= 0 && age <= ADMIN_TOKEN_TTL_MS
}
