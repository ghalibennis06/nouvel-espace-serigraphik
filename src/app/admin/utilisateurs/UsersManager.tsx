'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { AdminUser } from '@/lib/users'

interface Audit { actor: string | null; action: string; entity: string | null; detail: string | null; created_at: string }
const ROLE_LABEL: Record<string, string> = { super_admin: 'Super admin', admin: 'Admin', seller: 'Vendeur' }
const ROLE_COLOR: Record<string, string> = { super_admin: 'var(--orange)', admin: 'var(--blue)', seller: 'var(--teal)' }

const inp: React.CSSProperties = { width: '100%', padding: '9px 11px', fontSize: 13, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 7, outline: 'none' }
const lbl: React.CSSProperties = { fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text2)', marginBottom: 5, display: 'block' }

export default function UsersManager({ users, audit }: { users: AdminUser[]; audit: Audit[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ email: '', name: '', role: 'seller', password: '' })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function create() {
    setBusy(true); setErr('')
    const res = await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setBusy(false)
    if (!res.ok) { setErr((await res.json().catch(() => ({}))).error || 'Erreur'); return }
    setOpen(false); setForm({ email: '', name: '', role: 'seller', password: '' }); router.refresh()
  }
  async function patch(id: string, body: Record<string, unknown>) {
    const res = await fetch('/api/admin/users', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...body }) })
    if (res.ok) router.refresh(); else alert((await res.json().catch(() => ({}))).error || 'Erreur')
  }
  async function resetPw(u: AdminUser) {
    const p = prompt(`Nouveau mot de passe pour ${u.email} (≥ 8 caractères)`)
    if (p) patch(u.id, { password: p })
  }
  async function remove(u: AdminUser) {
    if (!confirm(`Supprimer ${u.email} ?`)) return
    const res = await fetch(`/api/admin/users?id=${u.id}`, { method: 'DELETE' })
    if (res.ok) router.refresh(); else alert((await res.json().catch(() => ({}))).error || 'Erreur')
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 30, fontWeight: 700, color: 'var(--text)' }}>Utilisateurs</h1>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>{users.length} compte{users.length !== 1 ? 's' : ''} · rôles & accès équipe</p>
        </div>
        <button onClick={() => { setOpen(o => !o); setErr('') }} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{open ? 'Fermer' : '+ Nouvel utilisateur'}</button>
      </div>

      {users.length === 0 && (
        <div style={{ background: 'var(--orangesoft)', border: '1px solid var(--orange)', borderRadius: 10, padding: '12px 16px', fontSize: 12.5, color: 'var(--text2)', marginBottom: 18 }}>
          Aucun compte : la connexion se fait encore via le mot de passe unique. Créez le premier compte (super admin) pour activer les rôles.
        </div>
      )}

      {open && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 22 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 14 }}>
            <div><label style={lbl}>Email *</label><input style={inp} type="email" value={form.email} onChange={e => set('email', e.target.value)} /></div>
            <div><label style={lbl}>Nom</label><input style={inp} value={form.name} onChange={e => set('name', e.target.value)} /></div>
            <div><label style={lbl}>Rôle</label>
              <select style={inp} value={form.role} onChange={e => set('role', e.target.value)}>
                <option value="seller">Vendeur (lecture + ventes)</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super admin</option>
              </select>
            </div>
            <div><label style={lbl}>Mot de passe * (≥ 8)</label><input style={inp} type="text" value={form.password} onChange={e => set('password', e.target.value)} /></div>
          </div>
          {err && <p style={{ color: 'var(--orange)', fontSize: 12, marginTop: 12 }}>{err}</p>}
          <button onClick={create} disabled={busy} style={{ marginTop: 16, background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: busy ? 0.6 : 1 }}>{busy ? '...' : 'Créer le compte'}</button>
        </div>
      )}

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr style={{ background: 'var(--surface)' }}>
            {['Utilisateur', 'Rôle', 'Statut', 'Dernière connexion', ''].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text2)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} style={{ borderTop: '1px solid var(--border)', background: i % 2 ? 'var(--surface)' : 'transparent' }}>
                <td style={{ padding: '11px 16px' }}><div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{u.name || u.email}</div><div style={{ fontSize: 11, color: 'var(--text2)' }}>{u.email}</div></td>
                <td style={{ padding: '11px 16px' }}>
                  <select value={u.role} onChange={e => patch(u.id, { role: e.target.value })} style={{ fontSize: 12, fontWeight: 700, color: ROLE_COLOR[u.role], background: 'transparent', border: '1px solid var(--border2)', borderRadius: 6, padding: '4px 8px', cursor: 'pointer' }}>
                    {Object.entries(ROLE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </td>
                <td style={{ padding: '11px 16px', fontSize: 12.5 }}>
                  <button onClick={() => patch(u.id, { is_active: !u.is_active })} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600, color: u.is_active ? 'var(--teal)' : 'var(--text3)' }}>
                    {u.is_active ? '● Actif' : '○ Désactivé'}
                  </button>
                </td>
                <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--text2)' }}>{u.last_login_at ? new Date(u.last_login_at).toLocaleString('fr-MA') : '—'}</td>
                <td style={{ padding: '11px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button onClick={() => resetPw(u)} style={{ background: 'none', border: 'none', color: 'var(--blue)', cursor: 'pointer', fontSize: 12, fontWeight: 600, marginRight: 12 }}>Mot de passe</button>
                  <button onClick={() => remove(u)} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 12 }}>Suppr.</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Journal d&apos;audit</h2>
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
        {audit.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', fontSize: 13, color: 'var(--text2)' }}>Aucune activité enregistrée.</div>
        ) : audit.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '9px 16px', borderTop: i ? '1px solid var(--border)' : 'none', fontSize: 12.5 }}>
            <span style={{ color: 'var(--text3)', minWidth: 130, flexShrink: 0 }}>{new Date(a.created_at).toLocaleString('fr-MA')}</span>
            <span style={{ fontWeight: 700, color: 'var(--blue)', minWidth: 110, flexShrink: 0 }}>{a.action}</span>
            <span style={{ color: 'var(--text2)', flex: 1 }}>{[a.entity, a.detail].filter(Boolean).join(' · ')}</span>
            <span style={{ color: 'var(--text3)' }}>{a.actor ?? '—'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
