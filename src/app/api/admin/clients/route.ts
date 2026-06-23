import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import { createClient, updateClient, deleteClient } from '@/lib/erp'

const ALLOWED = new Set(['name', 'company', 'ice', 'email', 'phone', 'address', 'city', 'payment_terms', 'notes'])

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }
  const name = String(b.name ?? '').trim()
  if (name.length < 2) return NextResponse.json({ error: 'nom requis' }, { status: 400 })
  try {
    const id = await createClient({
      name,
      company: (b.company as string) || null, ice: (b.ice as string) || null,
      email: (b.email as string) || null, phone: (b.phone as string) || null,
      address: (b.address as string) || null, city: (b.city as string) || null,
      payment_terms: (b.payment_terms as string) || null, notes: (b.notes as string) || null,
    })
    return NextResponse.json({ ok: true, id })
  } catch (e) {
    console.error('client create:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }
  const id = String(b.id ?? '')
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })
  const fields: Record<string, string | null> = {}
  for (const [k, v] of Object.entries(b)) {
    if (k === 'id' || !ALLOWED.has(k)) continue
    fields[k] = (v as string) ?? null
  }
  try {
    await updateClient(id, fields)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('client update:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })
  try {
    await deleteClient(id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('client delete:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}
