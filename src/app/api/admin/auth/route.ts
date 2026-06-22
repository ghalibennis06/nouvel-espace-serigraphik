import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, buildAdminToken, buildUserToken } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import { findActiveByEmail, recordLogin } from '@/lib/users'
import { verifyPassword } from '@/lib/password'
import { logAudit } from '@/lib/audit'

const PASSWORD = process.env.ADMIN_PASSWORD
const MAX_AGE  = 60 * 60 * 8 // 8 hours

function setCookie(res: NextResponse, token: string) {
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  })
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production' && !process.env.ADMIN_COOKIE_SECRET) {
    return NextResponse.json({ error: 'ADMIN_COOKIE_SECRET not configured' }, { status: 500 })
  }
  let body: { email?: string; password?: string }
  try { body = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }
  const password = body.password ?? ''
  const email = (body.email ?? '').trim()

  // 1) Connexion multi-utilisateurs (email + mot de passe) si la base est dispo
  if (email && isDatabaseConfigured()) {
    try {
      const user = await findActiveByEmail(email)
      if (user && verifyPassword(password, user.password_hash)) {
        await recordLogin(user.id)
        await logAudit({ actor: user.email, action: 'login', entity: 'user', entity_id: user.id })
        const res = NextResponse.json({ ok: true, role: user.role, name: user.name })
        setCookie(res, buildUserToken(user.id, user.role))
        return res
      }
    } catch (e) { console.error('user login:', e) }
    await new Promise(r => setTimeout(r, 400))
    return NextResponse.json({ error: 'invalid credentials' }, { status: 401 })
  }

  // 2) Repli : mot de passe unique (super_admin) — compat existante
  if (!PASSWORD) return NextResponse.json({ error: 'ADMIN_PASSWORD not configured' }, { status: 500 })
  if (!password || password !== PASSWORD) {
    await new Promise(r => setTimeout(r, 400))
    return NextResponse.json({ error: 'invalid password' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true, role: 'super_admin' })
  setCookie(res, buildAdminToken())
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(ADMIN_COOKIE)
  return res
}
