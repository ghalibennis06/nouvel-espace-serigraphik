'use client'
import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { WCCategory } from '@/lib/types'
import { categoryHref } from '@/lib/utils'

interface FilterSidebarProps {
  locale: string
  subcategories: WCCategory[]
  currentCategorySlug: string
  totalProducts: number
}

export default function FilterSidebar({
  locale,
  subcategories,
  currentCategorySlug,
  totalProducts,
}: FilterSidebarProps) {
  const t          = useTranslations('catalog')
  const router     = useRouter()
  const pathname   = usePathname()
  const params     = useSearchParams()
  const [open, setOpen] = useState(false)

  function updateFilter(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString())
    if (value === null || value === '') {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    next.delete('page')
    router.push(`${pathname}?${next.toString()}`)
  }

  const inStock  = params.get('in_stock') === 'true'
  const onSale   = params.get('on_sale')  === 'true'

  const labelStyle = { fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--text2)', marginBottom: 10, display: 'block' }

  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div>
          <span style={labelStyle}>{t('category')}</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {subcategories.map(sub => {
              const active = pathname.includes(sub.slug)
              return (
                <li key={sub.id}>
                  <a
                    href={categoryHref(sub.slug, locale)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '7px 10px', borderRadius: 6, fontSize: 13, textDecoration: 'none', transition: 'background .15s',
                      background: active ? 'var(--bluesoft)' : 'transparent',
                      color: active ? 'var(--blue)' : 'var(--text2)',
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    <span>{sub.name}</span>
                    <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 10, background: active ? 'var(--bluesoft2)' : 'var(--border)', color: active ? 'var(--blue)' : 'var(--text2)' }}>
                      {sub.count}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Availability */}
      <div>
        <span style={labelStyle}>{t('availability')}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--text2)' }}>
            <input
              type="checkbox"
              checked={inStock}
              onChange={e => updateFilter('in_stock', e.target.checked ? 'true' : null)}
              style={{ accentColor: 'var(--blue)', width: 15, height: 15 }}
            />
            {t('inStock')}
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--text2)' }}>
            <input
              type="checkbox"
              checked={onSale}
              onChange={e => updateFilter('on_sale', e.target.checked ? 'true' : null)}
              style={{ accentColor: 'var(--blue)', width: 15, height: 15 }}
            />
            {t('onSale')}
          </label>
        </div>
      </div>

      {/* Sort (mobile extra) */}
      <div className="md:hidden">
        <span style={labelStyle}>Trier par</span>
        <select
          value={params.get('orderby') ?? ''}
          onChange={e => updateFilter('orderby', e.target.value || null)}
          style={{ width: '100%', fontSize: 13, background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 6, padding: '8px 10px', outline: 'none' }}
        >
          <option value="">{t('sortDefault')}</option>
          <option value="popularity">{t('sortPopular')}</option>
          <option value="date">{t('sortNewest')}</option>
          <option value="price">{t('sortPriceAsc')}</option>
          <option value="price-desc">{t('sortPriceDesc')}</option>
        </select>
      </div>

      {/* Reset */}
      {(inStock || onSale) && (
        <button
          onClick={() => {
            const next = new URLSearchParams()
            router.push(pathname + (next.toString() ? `?${next}` : ''))
          }}
          style={{ fontSize: 12, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, textDecoration: 'underline' }}
        >
          {t('clearFilters')}
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────────────────────── */}
      <aside className="hidden lg:block" style={{ width: 220, flexShrink: 0 }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 20, position: 'sticky', top: 88 }}>
          <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 7 }}>
            <svg className="w-4 h-4" style={{ color: 'var(--blue)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {t('filters')}
          </h2>
          {sidebarContent}
        </div>
      </aside>

      {/* ── Mobile filter button ──────────────────────────────────────── */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid var(--border2)', borderRadius: 6, fontSize: 13, fontWeight: 500, color: 'var(--text)', background: 'var(--card)', cursor: 'pointer' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {t('filters')}
          {(inStock || onSale) && (
            <span style={{ width: 8, height: 8, background: 'var(--blue)', borderRadius: '50%' }} />
          )}
        </button>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40 }}
            onClick={() => setOpen(false)}
          />
          <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 280, background: 'var(--surface)', zIndex: 50, overflowY: 'auto', boxShadow: '4px 0 40px rgba(0,0,0,0.5)' }} className="animate-slide-in-right">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15 }}>{t('filters')}</h2>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer' }}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div style={{ padding: 20 }}>{sidebarContent}</div>
            <div style={{ padding: 20, borderTop: '1px solid var(--border)' }}>
              <button
                onClick={() => setOpen(false)}
                style={{ width: '100%', background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 6, padding: '11px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
              >
                {t('applyFilters')}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
