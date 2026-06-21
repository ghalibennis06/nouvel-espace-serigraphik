// NES ERP data layer — catalogue, stock, clients, facturation (Neon).
// Single source of truth for the admin back-office that replaces Manageo.
import { sql } from '@/lib/db'

type Row = Record<string, unknown>

// ─── Types ───────────────────────────────────────────────────────────────────
export interface ErpProduct {
  id: string
  product_slug: string
  name_fr: string
  sku: string | null
  reference: string | null
  description: string | null
  category_id: string | null
  cost_price: string | null
  public_price: string | null
  price: string | null
  tva_rate: string
  stock_qty: number
  low_stock_threshold: number
  unit: string
  barcode: string | null
  image_url: string | null
  stock_status: string
  active: boolean
  featured: boolean
  sort_order: number | null
  created_at: string
}

export interface ErpClient {
  id: string
  name: string
  company: string | null
  ice: string | null
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  payment_terms: string | null
  notes: string | null
  created_at: string
}

export type DocType = 'devis' | 'facture' | 'avoir'
export type DocStatus = 'draft' | 'sent' | 'accepted' | 'paid' | 'partial' | 'cancelled' | 'converted'

export interface DocItemInput {
  product_id?: string | null
  label: string
  qty: number
  unit_price_ht: number
  tva_rate: number
  discount?: number
}

export interface ErpDocument {
  id: string
  doc_type: DocType
  number: string
  client_id: string | null
  client_name: string
  client_ice: string | null
  status: DocStatus
  issue_date: string
  due_date: string | null
  currency: string
  subtotal_ht: string
  discount: string
  tva_amount: string
  total_ttc: string
  paid_amount: string
  notes: string | null
  created_at: string
}

// ─── Products ────────────────────────────────────────────────────────────────
export async function listProducts(): Promise<ErpProduct[]> {
  return (await sql`
    SELECT id, product_slug, name_fr, sku, reference, description, category_id,
           cost_price, public_price, price, tva_rate, stock_qty, low_stock_threshold,
           unit, barcode, image_url, stock_status, active, featured, sort_order, created_at
    FROM nes_products
    ORDER BY sort_order ASC NULLS LAST, name_fr ASC
  `) as unknown as ErpProduct[]
}

export async function createProduct(p: {
  name_fr: string; product_slug: string; sku?: string | null; reference?: string | null
  description?: string | null; category_id?: string | null; public_price?: number | null
  cost_price?: number | null; tva_rate?: number; stock_qty?: number; low_stock_threshold?: number
  unit?: string; barcode?: string | null; image_url?: string | null; featured?: boolean; active?: boolean
}): Promise<string> {
  const rows = (await sql`
    INSERT INTO nes_products
      (name_fr, product_slug, sku, reference, description, category_id, public_price, price,
       cost_price, tva_rate, stock_qty, low_stock_threshold, unit, barcode, image_url, featured, active, stock_status)
    VALUES
      (${p.name_fr}, ${p.product_slug}, ${p.sku ?? null}, ${p.reference ?? null}, ${p.description ?? null},
       ${p.category_id ?? null}, ${p.public_price ?? null}, ${p.public_price ?? null}, ${p.cost_price ?? null},
       ${p.tva_rate ?? 20}, ${p.stock_qty ?? 0}, ${p.low_stock_threshold ?? 5}, ${p.unit ?? 'unité'},
       ${p.barcode ?? null}, ${p.image_url ?? null}, ${p.featured ?? false}, ${p.active ?? true},
       ${(p.stock_qty ?? 0) > 0 ? 'instock' : 'outofstock'})
    RETURNING id
  `) as Row[]
  return rows[0].id as string
}

export async function updateProduct(id: string, fields: Record<string, string | number | boolean | null>): Promise<void> {
  const cols = Object.keys(fields)
  if (cols.length === 0) return
  const set = cols.map((c, i) => `${c} = $${i + 2}`).join(', ')
  await sql.query(`UPDATE nes_products SET ${set}, updated_at = now() WHERE id = $1`, [id, ...cols.map(c => fields[c])])
}

export async function deleteProduct(id: string): Promise<void> {
  await sql`DELETE FROM nes_products WHERE id = ${id}::uuid`
}

// ─── Stock ───────────────────────────────────────────────────────────────────
// Records a movement and updates the product balance atomically (single round-trip batch).
export async function adjustStock(opts: {
  product_id: string; type: 'in' | 'out' | 'adjust'; qty: number; reason?: string | null
  reference?: string | null; actor?: string | null
}): Promise<number> {
  const cur = (await sql`SELECT stock_qty FROM nes_products WHERE id = ${opts.product_id}::uuid`) as Row[]
  if (!cur[0]) throw new Error('product not found')
  const current = Number(cur[0].stock_qty ?? 0)
  const balance = opts.type === 'in' ? current + opts.qty
    : opts.type === 'out' ? current - opts.qty
    : opts.qty // adjust = set absolute
  await sql`
    INSERT INTO nes_stock_movements (product_id, type, qty, balance_after, reason, reference, actor)
    VALUES (${opts.product_id}::uuid, ${opts.type}, ${opts.qty}, ${balance}, ${opts.reason ?? null}, ${opts.reference ?? null}, ${opts.actor ?? null})
  `
  await sql`
    UPDATE nes_products
    SET stock_qty = ${balance}, stock_status = ${balance > 0 ? 'instock' : 'outofstock'}, updated_at = now()
    WHERE id = ${opts.product_id}::uuid
  `
  return balance
}

export async function listStockMovements(productId: string): Promise<Row[]> {
  return (await sql`
    SELECT type, qty, balance_after, reason, reference, actor, created_at
    FROM nes_stock_movements WHERE product_id = ${productId}::uuid
    ORDER BY created_at DESC LIMIT 50
  `) as Row[]
}

// ─── Clients ─────────────────────────────────────────────────────────────────
export async function listClients(): Promise<ErpClient[]> {
  return (await sql`
    SELECT id, name, company, ice, email, phone, address, city, payment_terms, notes, created_at
    FROM nes_clients ORDER BY created_at DESC
  `) as unknown as ErpClient[]
}

export async function createClient(c: Partial<ErpClient> & { name: string }): Promise<string> {
  const rows = (await sql`
    INSERT INTO nes_clients (name, company, ice, email, phone, address, city, payment_terms, notes)
    VALUES (${c.name}, ${c.company ?? null}, ${c.ice ?? null}, ${c.email ?? null}, ${c.phone ?? null},
            ${c.address ?? null}, ${c.city ?? null}, ${c.payment_terms ?? null}, ${c.notes ?? null})
    RETURNING id
  `) as Row[]
  return rows[0].id as string
}

export async function updateClient(id: string, fields: Record<string, string | null>): Promise<void> {
  const cols = Object.keys(fields)
  if (cols.length === 0) return
  const set = cols.map((c, i) => `${c} = $${i + 2}`).join(', ')
  await sql.query(`UPDATE nes_clients SET ${set} WHERE id = $1`, [id, ...cols.map(c => fields[c])])
}

export async function deleteClient(id: string): Promise<void> {
  await sql`DELETE FROM nes_clients WHERE id = ${id}::uuid`
}

// ─── Documents (devis / factures) ────────────────────────────────────────────
function computeTotals(items: DocItemInput[], headerDiscount = 0) {
  let subtotal = 0, tva = 0
  const lines = items.map(it => {
    const lineHt = it.qty * it.unit_price_ht - (it.discount ?? 0)
    subtotal += lineHt
    tva += lineHt * (it.tva_rate / 100)
    return { ...it, line_total_ht: Math.round(lineHt * 100) / 100 }
  })
  const subtotalR = Math.round(subtotal * 100) / 100
  const tvaR = Math.round(tva * 100) / 100
  const total = Math.round((subtotalR - headerDiscount + tvaR) * 100) / 100
  return { lines, subtotal: subtotalR, tva: tvaR, total }
}

export async function createDocument(input: {
  doc_type: DocType; client_id?: string | null; client_name: string; client_ice?: string | null
  issue_date?: string; due_date?: string | null; discount?: number; notes?: string | null
  items: DocItemInput[]
}): Promise<{ id: string; number: string }> {
  if (!input.items.length) throw new Error('au moins une ligne requise')
  const year = new Date(input.issue_date ?? Date.now()).getFullYear()
  const { lines, subtotal, tva, total } = computeTotals(input.items, input.discount ?? 0)

  const numRows = (await sql`SELECT nes_next_doc_number(${input.doc_type}, ${year}) AS number`) as Row[]
  const number = numRows[0].number as string

  const docRows = (await sql`
    INSERT INTO nes_documents
      (doc_type, number, client_id, client_name, client_ice, issue_date, due_date,
       subtotal_ht, discount, tva_amount, total_ttc, notes)
    VALUES
      (${input.doc_type}, ${number}, ${input.client_id ?? null}, ${input.client_name}, ${input.client_ice ?? null},
       ${input.issue_date ?? null}, ${input.due_date ?? null}, ${subtotal}, ${input.discount ?? 0},
       ${tva}, ${total}, ${input.notes ?? null})
    RETURNING id
  `) as Row[]
  const id = docRows[0].id as string

  let i = 0
  for (const ln of lines) {
    await sql`
      INSERT INTO nes_document_items
        (document_id, product_id, label, qty, unit_price_ht, tva_rate, discount, line_total_ht, sort_order)
      VALUES (${id}::uuid, ${ln.product_id ?? null}, ${ln.label}, ${ln.qty}, ${ln.unit_price_ht},
              ${ln.tva_rate}, ${ln.discount ?? 0}, ${ln.line_total_ht}, ${i++})
    `
  }
  return { id, number }
}

export async function listDocuments(docType?: DocType): Promise<ErpDocument[]> {
  if (docType) {
    return (await sql`
      SELECT id, doc_type, number, client_id, client_name, client_ice, status, issue_date, due_date,
             currency, subtotal_ht, discount, tva_amount, total_ttc, paid_amount, notes, created_at
      FROM nes_documents WHERE doc_type = ${docType} ORDER BY created_at DESC
    `) as unknown as ErpDocument[]
  }
  return (await sql`
    SELECT id, doc_type, number, client_id, client_name, client_ice, status, issue_date, due_date,
           currency, subtotal_ht, discount, tva_amount, total_ttc, paid_amount, notes, created_at
    FROM nes_documents ORDER BY created_at DESC
  `) as unknown as ErpDocument[]
}

export async function getDocument(id: string): Promise<ErpDocument | null> {
  const rows = (await sql`
    SELECT id, doc_type, number, client_id, client_name, client_ice, status, issue_date, due_date,
           currency, subtotal_ht, discount, tva_amount, total_ttc, paid_amount, notes, created_at
    FROM nes_documents WHERE id = ${id}::uuid
  `) as unknown as ErpDocument[]
  return rows[0] ?? null
}

export interface DocItemRow {
  product_id: string | null
  label: string
  qty: string
  unit_price_ht: string
  tva_rate: string
  discount: string
  line_total_ht: string
}

export async function getDocumentItemRows(documentId: string): Promise<DocItemRow[]> {
  return (await sql`
    SELECT product_id, label, qty, unit_price_ht, tva_rate, discount, line_total_ht
    FROM nes_document_items WHERE document_id = ${documentId}::uuid ORDER BY sort_order ASC
  `) as unknown as DocItemRow[]
}

export async function getDocumentItems(documentId: string): Promise<Row[]> {
  return (await sql`
    SELECT product_id, label, qty, unit_price_ht, tva_rate, discount, line_total_ht
    FROM nes_document_items WHERE document_id = ${documentId}::uuid ORDER BY sort_order ASC
  `) as Row[]
}

export async function setDocumentStatus(id: string, status: DocStatus): Promise<void> {
  await sql`UPDATE nes_documents SET status = ${status}, updated_at = now() WHERE id = ${id}::uuid`
}

// Records a payment and rolls the document status to partial/paid.
export async function recordPayment(opts: {
  document_id: string; amount: number; method?: string; reference?: string | null; actor?: string | null
}): Promise<{ paid: number; status: DocStatus }> {
  await sql`
    INSERT INTO nes_payments (document_id, amount, method, reference, actor)
    VALUES (${opts.document_id}::uuid, ${opts.amount}, ${opts.method ?? 'especes'}, ${opts.reference ?? null}, ${opts.actor ?? null})
  `
  const rows = (await sql`
    SELECT total_ttc, COALESCE((SELECT SUM(amount) FROM nes_payments WHERE document_id = ${opts.document_id}::uuid),0) AS paid
    FROM nes_documents WHERE id = ${opts.document_id}::uuid
  `) as Row[]
  const total = Number(rows[0].total_ttc), paid = Number(rows[0].paid)
  const status: DocStatus = paid >= total ? 'paid' : paid > 0 ? 'partial' : 'sent'
  await sql`UPDATE nes_documents SET paid_amount = ${paid}, status = ${status}, updated_at = now() WHERE id = ${opts.document_id}::uuid`
  return { paid, status }
}

// ─── Reporting comptable ─────────────────────────────────────────────────────
export interface AccountingKpis {
  ca_ttc: number; ca_ht: number; tva_collectee: number
  encaisse: number; encours: number
  factures_count: number; impayees_count: number
  devis_count: number; devis_acceptes: number; devis_montant: number
}

export async function accountingKpis(year: number): Promise<AccountingKpis> {
  const rows = (await sql`
    SELECT
      COALESCE(SUM(total_ttc)  FILTER (WHERE doc_type='facture' AND status <> 'cancelled'), 0) AS ca_ttc,
      COALESCE(SUM(subtotal_ht) FILTER (WHERE doc_type='facture' AND status <> 'cancelled'), 0) AS ca_ht,
      COALESCE(SUM(tva_amount) FILTER (WHERE doc_type='facture' AND status <> 'cancelled'), 0) AS tva,
      COALESCE(SUM(paid_amount) FILTER (WHERE doc_type='facture'), 0) AS encaisse,
      COALESCE(SUM(total_ttc - paid_amount) FILTER (WHERE doc_type='facture' AND status IN ('sent','partial','accepted')), 0) AS encours,
      COUNT(*) FILTER (WHERE doc_type='facture' AND status <> 'cancelled') AS factures_count,
      COUNT(*) FILTER (WHERE doc_type='facture' AND status IN ('sent','partial')) AS impayees_count,
      COUNT(*) FILTER (WHERE doc_type='devis') AS devis_count,
      COUNT(*) FILTER (WHERE doc_type='devis' AND status IN ('accepted','converted')) AS devis_acceptes,
      COALESCE(SUM(total_ttc) FILTER (WHERE doc_type='devis'), 0) AS devis_montant
    FROM nes_documents
    WHERE EXTRACT(YEAR FROM issue_date) = ${year}
  `) as Row[]
  const r = rows[0]
  return {
    ca_ttc: Number(r.ca_ttc), ca_ht: Number(r.ca_ht), tva_collectee: Number(r.tva),
    encaisse: Number(r.encaisse), encours: Number(r.encours),
    factures_count: Number(r.factures_count), impayees_count: Number(r.impayees_count),
    devis_count: Number(r.devis_count), devis_acceptes: Number(r.devis_acceptes), devis_montant: Number(r.devis_montant),
  }
}

export async function monthlyRevenue(year: number): Promise<{ month: number; ca_ttc: number }[]> {
  const rows = (await sql`
    SELECT EXTRACT(MONTH FROM issue_date)::int AS month, COALESCE(SUM(total_ttc),0) AS ca_ttc
    FROM nes_documents
    WHERE doc_type='facture' AND status <> 'cancelled' AND EXTRACT(YEAR FROM issue_date) = ${year}
    GROUP BY 1 ORDER BY 1
  `) as Row[]
  const map = new Map(rows.map(r => [Number(r.month), Number(r.ca_ttc)]))
  return Array.from({ length: 12 }, (_, i) => ({ month: i + 1, ca_ttc: map.get(i + 1) ?? 0 }))
}

export async function unpaidInvoices(): Promise<Row[]> {
  return (await sql`
    SELECT id, number, client_name, total_ttc, paid_amount, issue_date, due_date, status,
           (current_date - issue_date) AS age_days
    FROM nes_documents
    WHERE doc_type='facture' AND status IN ('sent','partial')
    ORDER BY issue_date ASC LIMIT 50
  `) as Row[]
}

export async function topClients(year: number): Promise<Row[]> {
  return (await sql`
    SELECT client_name, COUNT(*) AS nb, COALESCE(SUM(total_ttc),0) AS ca
    FROM nes_documents
    WHERE doc_type='facture' AND status <> 'cancelled' AND EXTRACT(YEAR FROM issue_date) = ${year}
    GROUP BY client_name ORDER BY ca DESC LIMIT 8
  `) as Row[]
}

// Convert an accepted devis into a facture (copies lines, links both).
export async function convertDevisToFacture(devisId: string): Promise<{ id: string; number: string }> {
  const docs = (await sql`SELECT * FROM nes_documents WHERE id = ${devisId}::uuid AND doc_type = 'devis'`) as Row[]
  if (!docs[0]) throw new Error('devis introuvable')
  const d = docs[0]
  const items = await getDocumentItems(devisId)
  const facture = await createDocument({
    doc_type: 'facture',
    client_id: (d.client_id as string) ?? null,
    client_name: d.client_name as string,
    client_ice: (d.client_ice as string) ?? null,
    discount: Number(d.discount),
    notes: (d.notes as string) ?? null,
    items: items.map(it => ({
      product_id: (it.product_id as string) ?? null,
      label: it.label as string,
      qty: Number(it.qty),
      unit_price_ht: Number(it.unit_price_ht),
      tva_rate: Number(it.tva_rate),
      discount: Number(it.discount),
    })),
  })
  await sql`UPDATE nes_documents SET status = 'converted', converted_to = ${facture.id}::uuid, updated_at = now() WHERE id = ${devisId}::uuid`
  return facture
}
