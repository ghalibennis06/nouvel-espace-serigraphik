import crypto from 'crypto'

export const ADMIN_COOKIE = 'nes-admin-session'
const SECRET = process.env.ADMIN_COOKIE_SECRET ?? 'fallback-dev-secret-change-in-prod'

export function signAdminToken(value: string): string {
  return value + '.' + crypto.createHmac('sha256', SECRET).update(value).digest('base64url')
}

export function verifyAdminToken(signed: string): boolean {
  const dotIdx = signed.lastIndexOf('.')
  if (dotIdx < 0) return false
  const value = signed.slice(0, dotIdx)
  const sig   = signed.slice(dotIdx + 1)
  const expected = crypto.createHmac('sha256', SECRET).update(value).digest('base64url')
  try { return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) }
  catch { return false }
}
