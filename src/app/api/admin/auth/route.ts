import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, buildAdminToken } from '@/lib/admin-auth'

const PASSWORD = process.env.ADMIN_PASSWORD
const MAX_AGE  = 60 * 60 * 8 // 8 hours

export async function POST(req: NextRequest) {
  if (!PASSWORD) return NextResponse.json({ error: 'ADMIN_PASSWORD not configured' }, { status: 500 })
  if (process.env.NODE_ENV === 'production' && !process.env.ADMIN_COOKIE_SECRET) {
    return NextResponse.json({ error: 'ADMIN_COOKIE_SECRET not configured' }, { status: 500 })
  }

  let body: { password?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }

  if (!body.password || body.password !== PASSWORD) {
    await new Promise(r => setTimeout(r, 400))
    return NextResponse.json({ error: 'invalid password' }, { status: 401 })
  }

  const token = buildAdminToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, token, {
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
  res.cookies.delete(ADMIN_COOKIE)
  return res
}
