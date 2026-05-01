'use client'

import type { CSSProperties } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_HOMEPAGE_CONTROL, type HomepageControlState } from '@/lib/admin-homepage'

type Option = {
  slug?: string
  id?: string
  name: string
}

function parseList(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function formatList(value: string[]) {
  return value.join('\n')
}

export default function HomepageControlForm({
  categories,
  products,
  kits,
}: {
  categories: Option[]
  products: Option[]
  kits: Option[]
}) {
  const [form, setForm] = useState<HomepageControlState>(DEFAULT_HOMEPAGE_CONTROL)
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'saved' | 'error'>('loading')
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/admin/homepage')
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'load failed')
        setForm(data.settings)
        setFallback(Boolean(data.fallback))
        setStatus('idle')
      } catch (error) {
        console.error(error)
        setStatus('error')
      }
    }

    load()
  }, [])

  async function save() {
    setStatus('saving')
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'save failed')
      setForm(data.settings)
      setFallback(false)
      setStatus('saved')
      window.setTimeout(() => setStatus('idle'), 1800)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  const lookup = useMemo(() => ({
    categories: Object.fromEntries(categories.map((item) => [item.slug, item.name])),
    products: Object.fromEntries(products.map((item) => [item.slug, item.name])),
    kits: Object.fromEntries(kits.map((item) => [item.id, item.name])),
  }), [categories, products, kits])

  return (
    <div style={{ display: 'grid', gap: 18 }}>
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Pilotage de la vitrine NES</div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>Modifiez les priorités publiques sans toucher au code des composants.</div>
          </div>
          <div style={{ fontSize: 11, color: fallback ? 'var(--orange)' : 'var(--teal)' }}>
            {fallback ? 'Mode fallback statique' : 'Réglages admin actifs'}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 18 }} className="grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
          <div style={{ display: 'grid', gap: 12 }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Hero title</span>
              <textarea value={form.heroTitle} onChange={(e) => setForm((prev) => ({ ...prev, heroTitle: e.target.value }))} rows={3} style={fieldStyle} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>Hero subtitle</span>
              <textarea value={form.heroSubtitle} onChange={(e) => setForm((prev) => ({ ...prev, heroSubtitle: e.target.value }))} rows={4} style={fieldStyle} />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }} className="grid md:grid-cols-2 gap-3">
              <label style={{ display: 'grid', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>CTA principal</span>
                <input value={form.heroPrimaryCtaLabel} onChange={(e) => setForm((prev) => ({ ...prev, heroPrimaryCtaLabel: e.target.value }))} style={fieldStyle} />
                <input value={form.heroPrimaryCtaHref} onChange={(e) => setForm((prev) => ({ ...prev, heroPrimaryCtaHref: e.target.value }))} style={fieldStyle} />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>CTA secondaire</span>
                <input value={form.heroSecondaryCtaLabel} onChange={(e) => setForm((prev) => ({ ...prev, heroSecondaryCtaLabel: e.target.value }))} style={fieldStyle} />
                <input value={form.heroSecondaryCtaHref} onChange={(e) => setForm((prev) => ({ ...prev, heroSecondaryCtaHref: e.target.value }))} style={fieldStyle} />
              </label>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Aperçu logique</div>
            <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 8, fontSize: 12, color: 'var(--text2)' }}>
              <li>{form.heroPrimaryCtaLabel} → {form.heroPrimaryCtaHref}</li>
              <li>{form.heroSecondaryCtaLabel} → {form.heroSecondaryCtaHref}</li>
              <li>{form.spotlightCategorySlugs.length} catégorie(s) prioritaire(s)</li>
              <li>{form.spotlightProductSlugs.length} produit(s) mis en avant</li>
              <li>{form.spotlightKitIds.length} kit(s) visible(s)</li>
              <li>{form.trustBullets.length} preuve(s) de réassurance</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }} className="grid lg:grid-cols-2 gap-4">
        <SelectionCard
          title="Catégories prioritaires"
          hint="Une ligne par slug"
          value={formatList(form.spotlightCategorySlugs)}
          onChange={(value) => setForm((prev) => ({ ...prev, spotlightCategorySlugs: parseList(value) }))}
          items={form.spotlightCategorySlugs.map((slug) => `${slug} · ${lookup.categories[slug] || 'hors liste'}`)}
        />
        <SelectionCard
          title="Produits prioritaires"
          hint="Une ligne par slug produit"
          value={formatList(form.spotlightProductSlugs)}
          onChange={(value) => setForm((prev) => ({ ...prev, spotlightProductSlugs: parseList(value) }))}
          items={form.spotlightProductSlugs.map((slug) => `${slug} · ${lookup.products[slug] || 'hors liste'}`)}
        />
        <SelectionCard
          title="Kits mis en avant"
          hint="Une ligne par id kit"
          value={formatList(form.spotlightKitIds)}
          onChange={(value) => setForm((prev) => ({ ...prev, spotlightKitIds: parseList(value) }))}
          items={form.spotlightKitIds.map((id) => `${id} · ${lookup.kits[id] || 'hors liste'}`)}
        />
        <SelectionCard
          title="Bullets de réassurance"
          hint="Une ligne par promesse"
          value={formatList(form.trustBullets)}
          onChange={(value) => setForm((prev) => ({ ...prev, trustBullets: parseList(value) }))}
          items={form.trustBullets}
        />
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Références utiles</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }} className="grid lg:grid-cols-3 gap-3">
          <ReferenceList title="Catégories" options={categories.map((item) => `${item.slug} · ${item.name}`)} />
          <ReferenceList title="Produits" options={products.slice(0, 12).map((item) => `${item.slug} · ${item.name}`)} />
          <ReferenceList title="Kits" options={kits.map((item) => `${item.id} · ${item.name}`)} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 12, color: status === 'error' ? '#ef4444' : 'var(--text2)' }}>
          {status === 'loading' && 'Chargement des réglages…'}
          {status === 'saving' && 'Enregistrement en cours…'}
          {status === 'saved' && 'Réglages enregistrés.'}
          {status === 'error' && 'Impossible de charger ou sauver les réglages.'}
          {status === 'idle' && 'Prêt à publier de nouvelles priorités merchandising.'}
        </div>
        <button onClick={save} disabled={status === 'loading' || status === 'saving'} style={{ padding: '11px 18px', borderRadius: 10, border: '1px solid var(--blue)', background: 'var(--blue)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          {status === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}

function SelectionCard({ title, hint, value, onChange, items }: { title: string; hint: string; value: string; onChange: (value: string) => void; items: string[] }) {
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{title}</div>
      <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4, marginBottom: 10 }}>{hint}</div>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={7} style={fieldStyle} />
      <div style={{ marginTop: 10, display: 'grid', gap: 6 }}>
        {items.map((item) => (
          <div key={item} style={{ fontSize: 11, color: 'var(--text2)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 9px' }}>{item}</div>
        ))}
      </div>
    </div>
  )
}

function ReferenceList({ title, options }: { title: string; options: string[] }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'grid', gap: 6 }}>
        {options.map((option) => (
          <div key={option} style={{ fontSize: 11, color: 'var(--text2)' }}>{option}</div>
        ))}
      </div>
    </div>
  )
}

const fieldStyle: CSSProperties = {
  width: '100%',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  padding: '10px 12px',
  fontSize: 13,
  color: 'var(--text)',
}
