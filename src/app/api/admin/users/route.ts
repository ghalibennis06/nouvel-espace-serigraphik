import { NextRequest, NextResponse } from 'next/server'
import { getAdminActor } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import { createUser, updateUser, deleteUser, type AdminUser } from '@/lib/users'
import { logAudit } from '@/lib/audit'
import type { AdminRole } from '@/lib/admin-auth'

const ROLES = ['super_admin', 'admin', 'seller']

// Seuls super_admin / admin gèrent les comptes ; seul super_admin crée des super_admin.
function gate(req: NextRequest) {
  const actor = getAdminActor(req)
  if (!actor || (actor.role !== 'super_admin' && actor.role !== 'admin')) return null
  return actor
}

export async function POST(req: NextRequest) {
  const actor = gate(req)
  if (!actor) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }
  const email = String(b.email ?? '').trim()
  const password = String(b.password ?? '')
  const role = String(b.role ?? 'seller') as AdminRole
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: 'email invalide' }, { status: 400 })
  if (password.length < 8) return NextResponse.json({ error: 'mot de passe ≥ 8 caractères' }, { status: 400 })
  if (!ROLES.includes(role)) return NextResponse.json({ error: 'rôle invalide' }, { status: 400 })
  if (role === 'super_admin' && actor.role !== 'super_admin') return NextResponse.json({ error: 'seul un super admin crée un super admin' }, { status: 403 })
  try {
    const id = await createUser({ email, password, name: String(b.name ?? ''), role })
    await logAudit({ actor: actor.email ?? actor.id, action: 'user_create', entity: 'user', entity_id: id, detail: `${email} (${role})` })
    return NextResponse.json({ ok: true, id })
  } catch (e) {
    const msg = String((e as Error).message || '')
    if (msg.includes('unique') || msg.includes('duplicate')) return NextResponse.json({ error: 'email déjà utilisé' }, { status: 409 })
    console.error('user create:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const actor = gate(req)
  if (!actor) return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }
  const id = String(b.id ?? '')
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })
  const fields: { name?: string; role?: AdminRole; is_active?: boolean; password?: string } = {}
  if (b.name !== undefined) fields.name = String(b.name)
  if (b.role !== undefined) { if (!ROLES.includes(String(b.role))) return NextResponse.json({ error: 'rôle invalide' }, { status: 400 }); fields.role = b.role as AdminRole }
  if (b.is_active !== undefined) fields.is_active = Boolean(b.is_active)
  if (b.password) { if (String(b.password).length < 8) return NextResponse.json({ error: 'mot de passe ≥ 8 caractères' }, { status: 400 }); fields.password = String(b.password) }
  try {
    await updateUser(id, fields)
    await logAudit({ actor: actor.email ?? actor.id, action: 'user_update', entity: 'user', entity_id: id, detail: Object.keys(fields).join(',') })
    return NextResponse.json({ ok: true })
  } catch (e) { console.error('user update:', e); return NextResponse.json({ error: 'database error' }, { status: 500 }) }
}

export async function DELETE(req: NextRequest) {
  const actor = gate(req)
  if (!actor || actor.role !== 'super_admin') return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })
  try {
    await deleteUser(id)
    await logAudit({ actor: actor.email ?? actor.id, action: 'user_delete', entity: 'user', entity_id: id })
    return NextResponse.json({ ok: true })
  } catch (e) { console.error('user delete:', e); return NextResponse.json({ error: 'database error' }, { status: 500 }) }
}

export type { AdminUser }
