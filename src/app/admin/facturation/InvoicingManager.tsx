'use client'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ErpDocument } from '@/lib/erp'

interface ClientOpt { id: string; name: string; ice: string | null }
interface ProductOpt { id: string; name: string; price: string | null; tva: string }
interface Line { product_id: string | null; label: string; qty: number; unit_price_ht: number; tva_rate: number }

const inp: React.CSSProperties = { padding: '8px 10px', fontSize: 13, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 7, outline: 'none' }
const lbl: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text2)', marginBottom: 5, display: 'block' }
const money = (n: number) => `${n.toLocaleString('fr-MA', { minimumFractionDigits: 2 })} MAD`

const STATUS_COLOR: Record<string, string> = { draft: 'var(--text3)', sent: 'var(--blue)', accepted: 'var(--teal)', paid: 'var(--green)', partial: 'var(--orange)', cancelled: 'var(--text3)', converted: 'var(--text2)' }
const STATUS_LABEL: Record<string, string> = { draft: 'Brouillon', sent: 'Envoyé', accepted: 'Accepté', paid: 'Payé', partial: 'Partiel', cancelled: 'Annulé', converted: 'Converti' }

export default function InvoicingManager({ docs, clients, products }: { docs: ErpDocument[]; clients: ClientOpt[]; products: ProductOpt[] }) {
  const router = useRouter()
  const [tab, setTab] = useState<'facture' | 'devis'>('facture')
  const [creating, setCreating] = useState(false)
  const [clientId, setClientId] = useState('')
  const [clientName, setClientName] = useState('')
  const [lines, setLines] = useState<Line[]>([{ product_id: null, label: '', qty: 1, unit_price_ht: 0, tva_rate: 20 }])
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const totals = useMemo(() => {
    let ht = 0, tva = 0
    for (const l of lines) { const t = l.qty * l.unit_price_ht; ht += t; tva += t * (l.tva_rate / 100) }
    return { ht, tva, ttc: ht + tva }
  }, [lines])

  const shown = docs.filter(d => d.doc_type === tab)

  function setLine(i: number, patch: Partial<Line>) { setLines(ls => ls.map((l, j) => j === i ? { ...l, ...patch } : l)) }
  function pickProduct(i: number, pid: string) {
    const p = products.find(x => x.id === pid)
    if (p) setLine(i, { product_id: p.id, label: p.name, unit_price_ht: Number(p.price ?? 0), tva_rate: Number(p.tva ?? 20) })
    else setLine(i, { product_id: null })
  }
  function addLine() { setLines(ls => [...ls, { product_id: null, label: '', qty: 1, unit_price_ht: 0, tva_rate: 20 }]) }
  function rmLine(i: number) { setLines(ls => ls.length > 1 ? ls.filter((_, j) => j !== i) : ls) }
  function resetForm() { setClientId(''); setClientName(''); setLines([{ product_id: null, label: '', qty: 1, unit_price_ht: 0, tva_rate: 20 }]); setNotes(''); setErr('') }

  async function create() {
    setBusy(true); setErr('')
    const client = clients.find(c => c.id === clientId)
    const res = await fetch('/api/admin/documents', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doc_type: tab, client_id: clientId || null,
        client_name: client?.name || clientName, client_ice: client?.ice || null,
        notes: notes || null, items: lines,
      }),
    })
    setBusy(false)
    if (!res.ok) { setErr((await res.json().catch(() => ({}))).error || 'Erreur'); return }
    setCreating(false); resetForm(); router.refresh()
  }

  async function action(id: string, body: Record<string, unknown>) {
    const res = await fetch('/api/admin/documents', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...body }) })
    if (res.ok) router.refresh()
  }
  async function markPaid(d: ErpDocument) {
    const remaining = Number(d.total_ttc) - Number(d.paid_amount)
    const amt = prompt(`Montant encaissé (restant : ${money(remaining)})`, String(remaining))
    if (amt == null) return
    await action(d.id, { action: 'payment', amount: Number(amt) })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 30, fontWeight: 700, color: 'var(--text)' }}>Devis &amp; Factures</h1>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>Facturation conforme · numérotation auto · TVA · ICE</p>
        </div>
        <button onClick={() => { setCreating(c => !c); resetForm() }} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          {creating ? 'Fermer' : `+ Nouveau ${tab === 'facture' ? 'facture' : 'devis'}`}
        </button>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {(['facture', 'devis'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 700, borderRadius: 8, cursor: 'pointer', border: '1px solid ' + (tab === t ? 'var(--blue)' : 'var(--border2)'), background: tab === t ? 'var(--bluesoft)' : 'transparent', color: tab === t ? 'var(--blue)' : 'var(--text2)' }}>
            {t === 'facture' ? 'Factures' : 'Devis'} ({docs.filter(d => d.doc_type === t).length})
          </button>
        ))}
      </div>

      {creating && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 22 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14, marginBottom: 16 }}>
            <div><label style={lbl}>Client existant</label>
              <select style={{ ...inp, width: '100%' }} value={clientId} onChange={e => setClientId(e.target.value)}>
                <option value="">— Nouveau / ponctuel —</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            {!clientId && <div><label style={lbl}>Nom client (ponctuel)</label><input style={{ ...inp, width: '100%' }} value={clientName} onChange={e => setClientName(e.target.value)} /></div>}
          </div>

          <label style={lbl}>Lignes</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
            {lines.map((l, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr 2fr 0.7fr 1fr 0.8fr auto', gap: 8, alignItems: 'center' }}>
                <select style={inp} value={l.product_id ?? ''} onChange={e => pickProduct(i, e.target.value)}>
                  <option value="">Libre…</option>
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                <input style={inp} placeholder="Désignation" value={l.label} onChange={e => setLine(i, { label: e.target.value })} />
                <input style={inp} type="number" min="0" placeholder="Qté" value={l.qty} onChange={e => setLine(i, { qty: Number(e.target.value) })} />
                <input style={inp} type="number" step="0.01" placeholder="PU HT" value={l.unit_price_ht} onChange={e => setLine(i, { unit_price_ht: Number(e.target.value) })} />
                <select style={inp} value={l.tva_rate} onChange={e => setLine(i, { tva_rate: Number(e.target.value) })}>
                  {[20, 14, 10, 7, 0].map(t => <option key={t} value={t}>{t}%</option>)}
                </select>
                <button onClick={() => rmLine(i)} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 16 }}>✕</button>
              </div>
            ))}
          </div>
          <button onClick={addLine} style={{ background: 'var(--bluesoft)', color: 'var(--blue)', border: '1px dashed var(--blue)', borderRadius: 7, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Ajouter une ligne</button>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <div style={{ minWidth: 240, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: 'var(--text2)' }}><span>Total HT</span><b style={{ color: 'var(--text)' }}>{money(totals.ht)}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', color: 'var(--text2)' }}><span>TVA</span><b style={{ color: 'var(--text)' }}>{money(totals.tva)}</b></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 0', borderTop: '1px solid var(--border)', marginTop: 4, fontSize: 15 }}><span style={{ fontWeight: 700, color: 'var(--text)' }}>Total TTC</span><b style={{ color: 'var(--blue)' }}>{money(totals.ttc)}</b></div>
            </div>
          </div>

          <textarea style={{ ...inp, width: '100%', minHeight: 50, marginTop: 14, resize: 'vertical' }} placeholder="Notes / conditions" value={notes} onChange={e => setNotes(e.target.value)} />
          {err && <p style={{ color: 'var(--orange)', fontSize: 12, marginTop: 10 }}>{err}</p>}
          <div style={{ marginTop: 14 }}>
            <button onClick={create} disabled={busy} style={{ background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 22px', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: busy ? 0.6 : 1 }}>{busy ? '...' : `Créer le ${tab}`}</button>
          </div>
        </div>
      )}

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: 'var(--surface)' }}>
            {['N°', 'Client', 'Date', 'Total TTC', 'Encaissé', 'Statut', ''].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text2)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {shown.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: 'var(--text2)', fontSize: 13 }}>Aucun {tab}.</td></tr>
            ) : shown.map((d, i) => (
              <tr key={d.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 ? 'var(--surface)' : 'transparent' }}>
                <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{d.number}</td>
                <td style={{ padding: '11px 16px', fontSize: 12.5, color: 'var(--text2)' }}>{d.client_name}{d.client_ice && <div style={{ fontSize: 10.5, color: 'var(--text3)' }}>ICE {d.client_ice}</div>}</td>
                <td style={{ padding: '11px 16px', fontSize: 12.5, color: 'var(--text2)' }}>{new Date(d.issue_date).toLocaleDateString('fr-MA')}</td>
                <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>{money(Number(d.total_ttc))}</td>
                <td style={{ padding: '11px 16px', fontSize: 12.5, color: 'var(--text2)' }}>{money(Number(d.paid_amount))}</td>
                <td style={{ padding: '11px 16px', fontSize: 12 }}><span style={{ fontWeight: 700, color: STATUS_COLOR[d.status] }}>● {STATUS_LABEL[d.status]}</span></td>
                <td style={{ padding: '11px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {d.status !== 'paid' && d.status !== 'cancelled' && d.status !== 'converted' && (
                    <button onClick={() => markPaid(d)} style={{ background: 'none', border: 'none', color: 'var(--green)', cursor: 'pointer', fontSize: 12, fontWeight: 700, marginRight: 12 }}>Encaisser</button>
                  )}
                  {d.doc_type === 'devis' && d.status !== 'converted' && (
                    <button onClick={() => action(d.id, { action: 'convert' })} style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>→ Facture</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
