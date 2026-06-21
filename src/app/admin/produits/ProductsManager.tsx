'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ErpProduct } from '@/lib/erp'

interface Cat { id: string; name_fr: string }
const TVA = [20, 14, 10, 7, 0]
const empty = {
  name_fr: '', sku: '', reference: '', category_id: '', public_price: '', cost_price: '',
  tva_rate: 20, stock_qty: 0, unit: 'unité', barcode: '', description: '', featured: false, active: true,
}

const inp: React.CSSProperties = { width: '100%', padding: '9px 11px', fontSize: 13, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 7, outline: 'none' }
const lbl: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text2)', marginBottom: 5, display: 'block' }
const card: React.CSSProperties = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12 }

export default function ProductsManager({ initial, categories }: { initial: ErpProduct[]; categories: Cat[] }) {
  const router = useRouter()
  const [editing, setEditing] = useState<null | 'new' | string>(null)
  const [form, setForm] = useState<Record<string, unknown>>(empty)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const catMap = Object.fromEntries(categories.map(c => [c.id, c.name_fr]))

  function openNew() { setForm(empty); setEditing('new'); setErr('') }
  function openEdit(p: ErpProduct) {
    setForm({
      name_fr: p.name_fr, sku: p.sku ?? '', reference: p.reference ?? '', category_id: p.category_id ?? '',
      public_price: p.public_price ?? '', cost_price: p.cost_price ?? '', tva_rate: Number(p.tva_rate ?? 20),
      stock_qty: p.stock_qty, unit: p.unit ?? 'unité', barcode: p.barcode ?? '', description: p.description ?? '',
      featured: p.featured, active: p.active,
    })
    setEditing(p.id); setErr('')
  }

  async function save() {
    setBusy(true); setErr('')
    const method = editing === 'new' ? 'POST' : 'PATCH'
    const payload = editing === 'new' ? form : { ...form, id: editing }
    const res = await fetch('/api/admin/products', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setBusy(false)
    if (!res.ok) { setErr((await res.json().catch(() => ({}))).error || 'Erreur'); return }
    setEditing(null); router.refresh()
  }

  async function remove(id: string) {
    if (!confirm('Supprimer ce produit ?')) return
    const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' })
    if (res.ok) router.refresh()
  }

  const [importing, setImporting] = useState(false)
  async function importCatalog() {
    if (!confirm('Importer le catalogue NES existant dans la base ? (idempotent — ne crée pas de doublons)')) return
    setImporting(true)
    const res = await fetch('/api/admin/import-catalog', { method: 'POST' })
    setImporting(false)
    if (res.ok) { const r = await res.json(); alert(`Importé : ${r.products} produits, ${r.categories} catégories.`); router.refresh() }
    else alert('Erreur lors de l’import.')
  }

  const set = (k: string, v: unknown) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 30, fontWeight: 700, color: 'var(--text)' }}>Produits</h1>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>{initial.length} produit{initial.length !== 1 ? 's' : ''} · gestion du catalogue</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {initial.length === 0 && (
            <button onClick={importCatalog} disabled={importing} style={{ background: 'transparent', color: 'var(--blue)', border: '1px solid var(--blue)', borderRadius: 8, padding: '11px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: importing ? 0.6 : 1 }}>
              {importing ? 'Import…' : '⬇ Importer le catalogue NES'}
            </button>
          )}
          <button onClick={openNew} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Nouveau produit</button>
        </div>
      </div>

      {editing && (
        <div style={{ ...card, padding: 22, marginBottom: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>{editing === 'new' ? 'Nouveau produit' : 'Modifier le produit'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            <div style={{ gridColumn: '1 / -1' }}><label style={lbl}>Nom *</label><input style={inp} value={String(form.name_fr)} onChange={e => set('name_fr', e.target.value)} /></div>
            <div><label style={lbl}>SKU</label><input style={inp} value={String(form.sku)} onChange={e => set('sku', e.target.value)} /></div>
            <div><label style={lbl}>Référence</label><input style={inp} value={String(form.reference)} onChange={e => set('reference', e.target.value)} /></div>
            <div><label style={lbl}>Catégorie</label>
              <select style={inp} value={String(form.category_id)} onChange={e => set('category_id', e.target.value)}>
                <option value="">—</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name_fr}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Prix public HT (MAD)</label><input style={inp} type="number" step="0.01" value={String(form.public_price)} onChange={e => set('public_price', e.target.value)} /></div>
            <div><label style={lbl}>Prix d&apos;achat (MAD)</label><input style={inp} type="number" step="0.01" value={String(form.cost_price)} onChange={e => set('cost_price', e.target.value)} /></div>
            <div><label style={lbl}>TVA %</label>
              <select style={inp} value={Number(form.tva_rate)} onChange={e => set('tva_rate', Number(e.target.value))}>
                {TVA.map(t => <option key={t} value={t}>{t}%</option>)}
              </select>
            </div>
            <div><label style={lbl}>Stock initial</label><input style={inp} type="number" value={String(form.stock_qty)} onChange={e => set('stock_qty', Number(e.target.value))} disabled={editing !== 'new'} /></div>
            <div><label style={lbl}>Unité</label><input style={inp} value={String(form.unit)} onChange={e => set('unit', e.target.value)} /></div>
            <div><label style={lbl}>Code-barres</label><input style={inp} value={String(form.barcode)} onChange={e => set('barcode', e.target.value)} /></div>
            <div style={{ gridColumn: '1 / -1' }}><label style={lbl}>Description</label><textarea style={{ ...inp, minHeight: 60, resize: 'vertical' }} value={String(form.description)} onChange={e => set('description', e.target.value)} /></div>
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 14 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--text2)', cursor: 'pointer' }}><input type="checkbox" checked={Boolean(form.active)} onChange={e => set('active', e.target.checked)} /> Actif</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--text2)', cursor: 'pointer' }}><input type="checkbox" checked={Boolean(form.featured)} onChange={e => set('featured', e.target.checked)} /> Mis en avant</label>
          </div>
          {err && <p style={{ color: 'var(--orange)', fontSize: 12, marginTop: 12 }}>{err}</p>}
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={save} disabled={busy} style={{ background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: busy ? 0.6 : 1 }}>{busy ? '...' : 'Enregistrer'}</button>
            <button onClick={() => setEditing(null)} style={{ background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border2)', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Annuler</button>
          </div>
        </div>
      )}

      <div style={{ ...card, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: 'var(--surface)' }}>
            {['Produit', 'Catégorie', 'Prix HT', 'TVA', 'Stock', 'Statut', ''].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text2)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {initial.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: 'var(--text2)', fontSize: 13 }}>Aucun produit. Cliquez sur « Nouveau produit ».</td></tr>
            ) : initial.map((p, i) => {
              const low = p.stock_qty <= (p.low_stock_threshold ?? 5)
              return (
                <tr key={p.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 ? 'var(--surface)' : 'transparent' }}>
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.name_fr}</div>
                    <div style={{ fontSize: 11, color: 'var(--text2)' }}>{p.sku || p.product_slug}</div>
                  </td>
                  <td style={{ padding: '11px 16px', fontSize: 12.5, color: 'var(--text2)' }}>{p.category_id ? catMap[p.category_id] ?? '—' : '—'}</td>
                  <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 600, color: 'var(--blue)' }}>{p.public_price ? `${p.public_price} MAD` : 'Sur devis'}</td>
                  <td style={{ padding: '11px 16px', fontSize: 12.5, color: 'var(--text2)' }}>{Number(p.tva_rate)}%</td>
                  <td style={{ padding: '11px 16px', fontSize: 13, fontWeight: 700, color: low ? 'var(--orange)' : 'var(--teal)' }}>{p.stock_qty} {low && '⚠'}</td>
                  <td style={{ padding: '11px 16px', fontSize: 12 }}>{p.active ? <span style={{ color: 'var(--teal)' }}>● Actif</span> : <span style={{ color: 'var(--text3)' }}>○ Inactif</span>}</td>
                  <td style={{ padding: '11px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button onClick={() => openEdit(p)} style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontSize: 12, fontWeight: 600, marginRight: 12 }}>Modifier</button>
                    <button onClick={() => remove(p.id)} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 12 }}>Suppr.</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
