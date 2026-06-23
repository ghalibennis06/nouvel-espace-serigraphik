import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import { adjustStock } from '@/lib/erp'

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }
  const product_id = String(b.product_id ?? '')
  const type = String(b.type ?? '')
  const qty = Number(b.qty)
  if (!product_id) return NextResponse.json({ error: 'product_id requis' }, { status: 400 })
  if (!['in', 'out', 'adjust'].includes(type)) return NextResponse.json({ error: 'type invalide' }, { status: 400 })
  if (!Number.isFinite(qty) || qty < 0) return NextResponse.json({ error: 'quantité invalide' }, { status: 400 })
  try {
    const balance = await adjustStock({
      product_id, type: type as 'in' | 'out' | 'adjust', qty,
      reason: (b.reason as string) || null, reference: (b.reference as string) || null,
      actor: (b.actor as string) || null,
    })
    return NextResponse.json({ ok: true, balance })
  } catch (e) {
    console.error('stock adjust:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}
