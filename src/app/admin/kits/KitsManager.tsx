'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { KitOverride } from '@/lib/kits'

interface BaseKit { id: string; name: string; subtitle: string; priceDisplay: string; oldPrice: string | null; badge: string | null; items: readonly string[] }

const inp: React.CSSProperties = { width: '100%', padding: '8px 10px', fontSize: 13, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 7, outline: 'none' }
const lbl: React.CSSProperties = { fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text2)', marginBottom: 4, display: 'block' }

export default function KitsManager({ base, overrides }: { base: BaseKit[]; overrides: Record<string, KitOverride> }) {
  const router = useRouter()
  const init = Object.fromEntries(base.map(k => {
    const o = overrides[k.id]
    return [k.id, {
      name: o?.name ?? k.name,
      subtitle: o?.subtitle ?? k.subtitle,
      price: o?.price ?? k.priceDisplay.replace(/\s/g, ''),
      old_price: o?.old_price ?? (k.oldPrice ?? ''),
      badge: o?.badge ?? (k.badge ?? ''),
      items: (o?.items ?? k.items).join('\n'),
      active: o?.active ?? true,
      sort_order: o?.sort_order ?? 0,
    }]
  }))
  const [forms, setForms] = useState<Record<string, Record<string, unknown>>>(init)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const set = (id: string, k: string, v: unknown) => setForms(f => ({ ...f, [id]: { ...f[id], [k]: v } }))

  async function save(id: string) {
    setSaving(id); setSaved(null)
    const f = forms[id]
    const res = await fetch('/api/admin/kits', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kit_id: id, name: f.name, subtitle: f.subtitle, price: f.price,
        old_price: f.old_price, badge: f.badge, active: f.active, sort_order: Number(f.sort_order),
        items: String(f.items).split('\n').map(s => s.trim()).filter(Boolean),
      }),
    })
    setSaving(null)
    if (res.ok) { setSaved(id); router.refresh(); setTimeout(() => setSaved(null), 2000) }
    else alert((await res.json().catch(() => ({}))).error || 'Erreur')
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 30, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Kits</h1>
      <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 24 }}>Éditez nom, prix et contenu des packs affichés sur le site — sans toucher au code.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 16 }}>
        {base.map(k => {
          const f = forms[k.id]
          return (
            <div key={k.id} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <code style={{ fontSize: 11, color: 'var(--text3)' }}>{k.id}</code>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={Boolean(f.active)} onChange={e => set(k.id, 'active', e.target.checked)} /> Affiché
                </label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div><label style={lbl}>Nom</label><input style={inp} value={String(f.name)} onChange={e => set(k.id, 'name', e.target.value)} /></div>
                <div><label style={lbl}>Sous-titre</label><input style={inp} value={String(f.subtitle)} onChange={e => set(k.id, 'subtitle', e.target.value)} /></div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}><label style={lbl}>Prix (MAD)</label><input style={inp} type="number" value={String(f.price)} onChange={e => set(k.id, 'price', e.target.value)} /></div>
                  <div style={{ flex: 1 }}><label style={lbl}>Ancien prix</label><input style={inp} value={String(f.old_price)} onChange={e => set(k.id, 'old_price', e.target.value)} /></div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}><label style={lbl}>Badge</label><input style={inp} value={String(f.badge)} onChange={e => set(k.id, 'badge', e.target.value)} /></div>
                  <div style={{ width: 90 }}><label style={lbl}>Ordre</label><input style={inp} type="number" value={String(f.sort_order)} onChange={e => set(k.id, 'sort_order', e.target.value)} /></div>
                </div>
                <div><label style={lbl}>Contenu (1 ligne = 1 élément)</label><textarea style={{ ...inp, minHeight: 110, resize: 'vertical', fontFamily: 'inherit' }} value={String(f.items)} onChange={e => set(k.id, 'items', e.target.value)} /></div>
              </div>
              <button onClick={() => save(k.id)} disabled={saving === k.id} style={{ marginTop: 12, width: '100%', background: saved === k.id ? 'var(--teal)' : 'var(--green)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: saving === k.id ? 0.6 : 1 }}>
                {saving === k.id ? '...' : saved === k.id ? '✓ Enregistré' : 'Enregistrer'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
