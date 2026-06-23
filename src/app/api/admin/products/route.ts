import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import { createProduct, updateProduct, deleteProduct } from '@/lib/erp'

function slugify(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
}

const ALLOWED = new Set([
  'name_fr', 'sku', 'reference', 'description', 'category_id', 'public_price', 'price',
  'cost_price', 'tva_rate', 'stock_qty', 'low_stock_threshold', 'unit', 'barcode',
  'image_url', 'featured', 'active', 'stock_status', 'sort_order',
])

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }
  const name = String(b.name_fr ?? '').trim()
  if (name.length < 2) return NextResponse.json({ error: 'nom requis' }, { status: 400 })
  try {
    const id = await createProduct({
      name_fr: name,
      product_slug: String(b.product_slug || slugify(name)),
      sku: (b.sku as string) || null,
      reference: (b.reference as string) || null,
      description: (b.description as string) || null,
      category_id: (b.category_id as string) || null,
      public_price: b.public_price != null && b.public_price !== '' ? Number(b.public_price) : null,
      cost_price: b.cost_price != null && b.cost_price !== '' ? Number(b.cost_price) : null,
      tva_rate: b.tva_rate != null ? Number(b.tva_rate) : 20,
      stock_qty: b.stock_qty != null ? Number(b.stock_qty) : 0,
      unit: (b.unit as string) || 'unité',
      barcode: (b.barcode as string) || null,
      image_url: (b.image_url as string) || null,
      featured: Boolean(b.featured),
      active: b.active != null ? Boolean(b.active) : true,
    })
    return NextResponse.json({ ok: true, id })
  } catch (e) {
    console.error('product create:', e)
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
  const fields: Record<string, string | number | boolean | null> = {}
  for (const [k, v] of Object.entries(b)) {
    if (k === 'id' || !ALLOWED.has(k)) continue
    fields[k] = v as string | number | boolean | null
  }
  try {
    await updateProduct(id, fields)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('product update:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  const id = new URL(req.url).searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })
  try {
    await deleteProduct(id)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('product delete:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}
