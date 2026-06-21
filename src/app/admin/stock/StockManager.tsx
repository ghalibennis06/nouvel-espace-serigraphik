'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ErpProduct } from '@/lib/erp'

const inp: React.CSSProperties = { padding: '9px 11px', fontSize: 13, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 7, outline: 'none' }

export default function StockManager({ initial }: { initial: ErpProduct[] }) {
  const router = useRouter()
  const [active, setActive] = useState<string | null>(null)
  const [type, setType] = useState<'in' | 'out' | 'adjust'>('in')
  const [qty, setQty] = useState('')
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)
  const [q, setQ] = useState('')

  const lowCount = initial.filter(p => p.stock_qty <= (p.low_stock_threshold ?? 5)).length
  const totalUnits = initial.reduce((s, p) => s + p.stock_qty, 0)
  const stockValue = initial.reduce((s, p) => s + p.stock_qty * Number(p.cost_price ?? 0), 0)
  const filtered = initial.filter(p => p.name_fr.toLowerCase().includes(q.toLowerCase()) || (p.sku ?? '').toLowerCase().includes(q.toLowerCase()))

  async function submit(productId: string) {
    const n = Number(qty)
    if (!Number.isFinite(n) || n < 0) return
    setBusy(true)
    const res = await fetch('/api/admin/stock', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, type, qty: n, reason: reason || null }),
    })
    setBusy(false)
    if (res.ok) { setActive(null); setQty(''); setReason(''); router.refresh() }
  }

  const stat = (n: string | number, l: string, c: string) => (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', flex: 1, minWidth: 150 }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: c, lineHeight: 1 }}>{n}</div>
      <div style={{ fontSize: 11, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6 }}>{l}</div>
    </div>
  )

  return (
    <div>
      <h1 style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 30, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Stock</h1>
      <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 22 }}>Entrées, sorties et inventaire en temps réel</p>

      <div style={{ display: 'flex', gap: 14, marginBottom: 22, flexWrap: 'wrap' }}>
        {stat(totalUnits, 'Unités en stock', 'var(--teal)')}
        {stat(lowCount, 'Stock bas', lowCount ? 'var(--orange)' : 'var(--text2)')}
        {stat(`${stockValue.toLocaleString('fr-MA')} MAD`, 'Valeur stock (achat)', 'var(--blue)')}
        {stat(initial.length, 'Références', 'var(--text)')}
      </div>

      <input style={{ ...inp, width: '100%', marginBottom: 16 }} placeholder="Rechercher un produit / SKU…" value={q} onChange={e => setQ(e.target.value)} />

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: 'var(--surface)' }}>
            {['Produit', 'Stock actuel', 'Seuil', 'Mouvement', ''].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text2)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map((p, i) => {
              const low = p.stock_qty <= (p.low_stock_threshold ?? 5)
              return (
                <tr key={p.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 ? 'var(--surface)' : 'transparent' }}>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.name_fr}</div>
                    <div style={{ fontSize: 11, color: 'var(--text2)' }}>{p.sku || p.product_slug}</div>
                  </td>
                  <td style={{ padding: '11px 16px', fontSize: 16, fontWeight: 800, color: low ? 'var(--orange)' : 'var(--teal)' }}>{p.stock_qty} <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text2)' }}>{p.unit}</span></td>
                  <td style={{ padding: '11px 16px', fontSize: 12.5, color: 'var(--text2)' }}>{p.low_stock_threshold}</td>
                  <td style={{ padding: '11px 16px' }}>
                    {active === p.id ? (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <select style={inp} value={type} onChange={e => setType(e.target.value as 'in' | 'out' | 'adjust')}>
                          <option value="in">+ Entrée</option><option value="out">− Sortie</option><option value="adjust">= Ajuster</option>
                        </select>
                        <input style={{ ...inp, width: 80 }} type="number" placeholder="Qté" value={qty} onChange={e => setQty(e.target.value)} />
                        <input style={{ ...inp, width: 130 }} placeholder="Motif" value={reason} onChange={e => setReason(e.target.value)} />
                        <button onClick={() => submit(p.id)} disabled={busy} style={{ background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 7, padding: '9px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>OK</button>
                        <button onClick={() => setActive(null)} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', fontSize: 12 }}>✕</button>
                      </div>
                    ) : (
                      <button onClick={() => { setActive(p.id); setType('in'); setQty(''); setReason('') }} style={{ background: 'var(--bluesoft)', color: 'var(--blue)', border: '1px solid var(--blue)', borderRadius: 7, padding: '7px 13px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Ajuster</button>
                    )}
                  </td>
                  <td />
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
