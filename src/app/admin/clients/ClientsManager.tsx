'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ErpClient } from '@/lib/erp'

const inp: React.CSSProperties = { width: '100%', padding: '9px 11px', fontSize: 13, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 7, outline: 'none' }
const lbl: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text2)', marginBottom: 5, display: 'block' }
const empty = { name: '', company: '', ice: '', phone: '', email: '', city: '', address: '', payment_terms: '', notes: '' }

export default function ClientsManager({ initial }: { initial: ErpClient[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<Record<string, string>>(empty)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  function openNew() { setForm(empty); setEditId(null); setOpen(true); setErr('') }
  function openEdit(c: ErpClient) {
    setForm({ name: c.name, company: c.company ?? '', ice: c.ice ?? '', phone: c.phone ?? '', email: c.email ?? '', city: c.city ?? '', address: c.address ?? '', payment_terms: c.payment_terms ?? '', notes: c.notes ?? '' })
    setEditId(c.id); setOpen(true); setErr('')
  }

  async function save() {
    setBusy(true); setErr('')
    const res = await fetch('/api/admin/clients', {
      method: editId ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editId ? { ...form, id: editId } : form),
    })
    setBusy(false)
    if (!res.ok) { setErr((await res.json().catch(() => ({}))).error || 'Erreur'); return }
    setOpen(false); router.refresh()
  }
  async function remove(id: string) {
    if (!confirm('Supprimer ce client ?')) return
    const res = await fetch(`/api/admin/clients?id=${id}`, { method: 'DELETE' })
    if (res.ok) router.refresh()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 30, fontWeight: 700, color: 'var(--text)' }}>Clients</h1>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>{initial.length} client{initial.length !== 1 ? 's' : ''} · fichier commercial (ICE B2B)</p>
        </div>
        <button onClick={openNew} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Nouveau client</button>
      </div>

      {open && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 22 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>{editId ? 'Modifier le client' : 'Nouveau client'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            <div><label style={lbl}>Nom / Contact *</label><input style={inp} value={form.name} onChange={e => set('name', e.target.value)} /></div>
            <div><label style={lbl}>Société</label><input style={inp} value={form.company} onChange={e => set('company', e.target.value)} /></div>
            <div><label style={lbl}>ICE</label><input style={inp} value={form.ice} onChange={e => set('ice', e.target.value)} /></div>
            <div><label style={lbl}>Téléphone</label><input style={inp} value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
            <div><label style={lbl}>Email</label><input style={inp} value={form.email} onChange={e => set('email', e.target.value)} /></div>
            <div><label style={lbl}>Ville</label><input style={inp} value={form.city} onChange={e => set('city', e.target.value)} /></div>
            <div><label style={lbl}>Conditions paiement</label><input style={inp} placeholder="ex: 30 jours" value={form.payment_terms} onChange={e => set('payment_terms', e.target.value)} /></div>
            <div style={{ gridColumn: '1 / -1' }}><label style={lbl}>Adresse</label><input style={inp} value={form.address} onChange={e => set('address', e.target.value)} /></div>
          </div>
          {err && <p style={{ color: 'var(--orange)', fontSize: 12, marginTop: 12 }}>{err}</p>}
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <button onClick={save} disabled={busy} style={{ background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: busy ? 0.6 : 1 }}>{busy ? '...' : 'Enregistrer'}</button>
            <button onClick={() => setOpen(false)} style={{ background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border2)', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Annuler</button>
          </div>
        </div>
      )}

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: 'var(--surface)' }}>
            {['Client', 'ICE', 'Contact', 'Ville', ''].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text2)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {initial.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: 40, textAlign: 'center', color: 'var(--text2)', fontSize: 13 }}>Aucun client. Cliquez sur « Nouveau client ».</td></tr>
            ) : initial.map((c, i) => (
              <tr key={c.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 ? 'var(--surface)' : 'transparent' }}>
                <td style={{ padding: '11px 16px' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{c.company || c.name}</div>
                  {c.company && <div style={{ fontSize: 11, color: 'var(--text2)' }}>{c.name}</div>}
                </td>
                <td style={{ padding: '11px 16px', fontSize: 12.5, color: 'var(--text2)' }}>{c.ice || '—'}</td>
                <td style={{ padding: '11px 16px', fontSize: 12.5, color: 'var(--text2)' }}>{c.phone || c.email || '—'}</td>
                <td style={{ padding: '11px 16px', fontSize: 12.5, color: 'var(--text2)' }}>{c.city || '—'}</td>
                <td style={{ padding: '11px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button onClick={() => openEdit(c)} style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontSize: 12, fontWeight: 600, marginRight: 12 }}>Modifier</button>
                  <button onClick={() => remove(c.id)} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 12 }}>Suppr.</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
