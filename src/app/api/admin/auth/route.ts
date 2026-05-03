import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const PASSWORD = process.env.ADMIN_PASSWORD
const SECRET   = process.env.ADMIN_COOKIE_SECRET ?? 'fallback-dev-secret-change-in-prod'
export const COOKIE  = 'nes-admin-session'
const MAX_AGE  = 60 * 60 * 8 // 8 hours

export function sign(value: string): string {
  return value + '.' + crypto.createHmac('sha256', SECRET).update(value).digest('base64url')
}

export function verify(signed: string): boolean {
  const dotIdx = signed.lastIndexOf('.')
  if (dotIdx < 0) return false
  const value = signed.slice(0, dotIdx)
  const sig   = signed.slice(dotIdx + 1)
  const expected = crypto.createHmac('sha256', SECRET).update(value).digest('base64url')
  try { return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected)) }
  catch { return false }
}

export async function POST(req: NextRequest) {
  if (!PASSWORD) return NextResponse.json({ error: 'ADMIN_PASSWORD not configured' }, { status: 500 })

  let body: { password?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }

  if (!body.password || body.password !== PASSWORD) {
    await new Promise(r => setTimeout(r, 400))
    return NextResponse.json({ error: 'invalid password' }, { status: 401 })
  }

  const token = sign('admin:' + Date.now())
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COOKIE)
  return res
}
