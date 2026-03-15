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
    next.delete('page') // reset to page 1
    router.push(`${pathname}?${next.toString()}`)
  }

  const inStock  = params.get('in_stock') === 'true'
  const onSale   = params.get('on_sale')  === 'true'

  // ── Sidebar body (shared between desktop sidebar and mobile drawer) ──
  const sidebarContent = (
    <div className="space-y-5">
      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div>
          <h3 className="text-2xs font-black uppercase tracking-widest text-gray-400 mb-2">
            {t('category')}
          </h3>
          <ul className="space-y-0.5">
            {subcategories.map(sub => {
              const active = pathname.includes(sub.slug)
              return (
                <li key={sub.id}>
                  <a
                    href={categoryHref(sub.slug, locale)}
                    className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-navy-900 text-white font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className={`text-2xs px-1.5 py-0.5 rounded-full ${
                      active ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
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
        <h3 className="text-2xs font-black uppercase tracking-widest text-gray-400 mb-2">
          {t('availability')}
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={inStock}
              onChange={e => updateFilter('in_stock', e.target.checked ? 'true' : null)}
              className="w-4 h-4 accent-brand-red rounded"
            />
            <span className="text-sm text-gray-700 group-hover:text-navy-900">
              {t('inStock')}
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={onSale}
              onChange={e => updateFilter('on_sale', e.target.checked ? 'true' : null)}
              className="w-4 h-4 accent-brand-red rounded"
            />
            <span className="text-sm text-gray-700 group-hover:text-navy-900">
              {t('onSale')}
            </span>
          </label>
        </div>
      </div>

      {/* Sort (mobile extra) */}
      <div className="md:hidden">
        <h3 className="text-2xs font-black uppercase tracking-widest text-gray-400 mb-2">
          Trier par
        </h3>
        <select
          value={params.get('orderby') ?? ''}
          onChange={e => updateFilter('orderby', e.target.value || null)}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-red"
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
          className="w-full text-xs text-gray-500 hover:text-brand-red underline text-left"
        >
          {t('clearFilters')}
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────────────────────── */}
      <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
        <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
          <h2 className="text-sm font-black text-navy-900 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-navy-900 transition-colors bg-white"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {t('filters')}
          {(inStock || onSale) && (
            <span className="w-2 h-2 bg-brand-red rounded-full" />
          )}
        </button>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 overflow-y-auto shadow-2xl animate-slide-in-right">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-black text-navy-900">{t('filters')}</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-navy-900">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">{sidebarContent}</div>
            <div className="p-5 border-t border-gray-100">
              <button
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
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
