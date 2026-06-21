import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import {
  createDocument, setDocumentStatus, recordPayment, convertDevisToFacture,
  type DocItemInput, type DocType, type DocStatus,
} from '@/lib/erp'

const STATUSES = ['draft', 'sent', 'accepted', 'paid', 'partial', 'cancelled', 'converted']

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }

  const doc_type = String(b.doc_type ?? '')
  if (!['devis', 'facture', 'avoir'].includes(doc_type)) return NextResponse.json({ error: 'type invalide' }, { status: 400 })
  const client_name = String(b.client_name ?? '').trim()
  if (client_name.length < 2) return NextResponse.json({ error: 'client requis' }, { status: 400 })
  const rawItems = Array.isArray(b.items) ? b.items : []
  const items: DocItemInput[] = rawItems
    .map((it: Record<string, unknown>) => ({
      product_id: (it.product_id as string) || null,
      label: String(it.label ?? '').trim(),
      qty: Number(it.qty),
      unit_price_ht: Number(it.unit_price_ht),
      tva_rate: it.tva_rate != null ? Number(it.tva_rate) : 20,
      discount: it.discount != null ? Number(it.discount) : 0,
    }))
    .filter(it => it.label && Number.isFinite(it.qty) && it.qty > 0 && Number.isFinite(it.unit_price_ht))
  if (!items.length) return NextResponse.json({ error: 'au moins une ligne valide requise' }, { status: 400 })

  try {
    const res = await createDocument({
      doc_type: doc_type as DocType,
      client_id: (b.client_id as string) || null,
      client_name,
      client_ice: (b.client_ice as string) || null,
      issue_date: (b.issue_date as string) || undefined,
      due_date: (b.due_date as string) || null,
      discount: b.discount != null ? Number(b.discount) : 0,
      notes: (b.notes as string) || null,
      items,
    })
    return NextResponse.json({ ok: true, ...res })
  } catch (e) {
    console.error('document create:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}

// Actions: status change, payment, devis→facture conversion.
export async function PATCH(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  let b: Record<string, unknown>
  try { b = await req.json() } catch { return NextResponse.json({ error: 'invalid body' }, { status: 400 }) }
  const id = String(b.id ?? '')
  const action = String(b.action ?? '')
  if (!id) return NextResponse.json({ error: 'id requis' }, { status: 400 })

  try {
    if (action === 'status') {
      const status = String(b.status ?? '')
      if (!STATUSES.includes(status)) return NextResponse.json({ error: 'statut invalide' }, { status: 400 })
      await setDocumentStatus(id, status as DocStatus)
      return NextResponse.json({ ok: true })
    }
    if (action === 'payment') {
      const amount = Number(b.amount)
      if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ error: 'montant invalide' }, { status: 400 })
      const res = await recordPayment({
        document_id: id, amount, method: (b.method as string) || 'especes',
        reference: (b.reference as string) || null, actor: (b.actor as string) || null,
      })
      return NextResponse.json({ ok: true, ...res })
    }
    if (action === 'convert') {
      const res = await convertDevisToFacture(id)
      return NextResponse.json({ ok: true, ...res })
    }
    return NextResponse.json({ error: 'action inconnue' }, { status: 400 })
  } catch (e) {
    console.error('document action:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}
