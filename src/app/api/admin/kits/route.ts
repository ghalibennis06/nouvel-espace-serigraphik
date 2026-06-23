import { NextRequest, NextResponse } from 'next/server'
import { getAdminActor } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import { upsertOverride } from '@/lib/kits'
import { logAudit } from '@/lib/audit'

export async function PATCH(req: NextRequest) {
  const actor = getAdminActor(req)
  if (!actor) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }
  const kit_id = String(b.kit_id ?? '')
  if (!kit_id) return NextResponse.json({ error: 'kit_id requis' }, { status: 400 })
  try {
    await upsertOverride({
      kit_id,
      name: (b.name as string) || null,
      subtitle: (b.subtitle as string) || null,
      price: b.price != null && b.price !== '' ? Number(b.price) : null,
      old_price: (b.old_price as string) || null,
      badge: (b.badge as string) || null,
      items: Array.isArray(b.items) ? (b.items as string[]).map(String).filter(Boolean) : null,
      active: b.active != null ? Boolean(b.active) : true,
      sort_order: b.sort_order != null ? Number(b.sort_order) : null,
    })
    await logAudit({ actor: actor.email ?? actor.id, action: 'kit_update', entity: 'kit', entity_id: kit_id })
    return NextResponse.json({ ok: true })
  } catch (e) { console.error('kit update:', e); return NextResponse.json({ error: 'database error' }, { status: 500 }) }
}
