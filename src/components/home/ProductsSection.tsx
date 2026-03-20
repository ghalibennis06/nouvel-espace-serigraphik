'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { WCProduct } from '@/lib/types'
import { getProductImage, productHref, whatsappProductLink } from '@/lib/utils'
import ImageWithFallback from '@/components/ui/ImageWithFallback'

const CAT_MAP: Record<string, string> = {
  'les-presses-a-chaud':             'presses',
  'les-consommables-de-serigraphie': 'conso',
  'les-consommables-de-sublimation': 'conso',
  'les-machines-dimpression':        'mach',
  'les-machines-de-serigraphie':     'mach',
  'les-produits-sublimables':        'sub',
}

const CAT_LABELS: Record<string, string> = {
  presses: 'Presses à chaud',
  conso:   'Consommables',
  sub:     'Produits Sublimables',
  mach:    'Machines',
  other:   'Fournitures',
}

const FILTERS = [
  { key: 'all',     label: 'Tout voir' },
  { key: 'presses', label: 'Presses' },
  { key: 'conso',   label: 'Consommables' },
  { key: 'sub',     label: 'Sublimables' },
  { key: 'mach',    label: 'Machines' },
]

function getCat(product: WCProduct): string {
  for (const c of product.categories ?? []) {
    const m = CAT_MAP[c.slug]
    if (m) return m
  }
  return 'other'
}

export default function ProductsSection({
  products,
  locale = 'fr',
}: {
  products: WCProduct[]
  locale?: string
}) {
  const [active, setActive] = useState('all')

  const visible = active === 'all'
    ? products.slice(0, 8)
    : products.filter(p => getCat(p) === active).slice(0, 8)

  return (
    <section id="products" style={{ background: 'var(--bg)', padding: '80px 6%' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div>
          <span className="stag">Catalogue Complet — 80+ Produits</span>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(34px,3.5vw,52px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.08, marginBottom: 0 }}>
            Nos meilleures<br />
            <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>ventes du moment</em>
          </h2>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap', marginTop: 36, marginBottom: 24 }}>
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              style={{
                padding: '8px 18px',
                borderRadius: 24,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
                transition: 'all .2s',
                background: active === key ? 'var(--blue)' : 'transparent',
                color:      active === key ? '#fff' : 'var(--text2)',
                border:     active === key ? '1px solid var(--blue)' : '1px solid var(--border2)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 17 }}>
          {visible.map(p => {
            const cat      = getCat(p)
            const saleP    = parseFloat(p.sale_price    || '0')
            const regP     = parseFloat(p.regular_price || '0')
            const dispP    = parseFloat(p.price         || '0')
            const isOnSale = p.on_sale && saleP > 0
            const discount = isOnSale && regP > 0 ? Math.round((1 - saleP / regP) * 100) : 0
            const finalP   = isOnSale ? saleP : dispP
            const imgSrc   = getProductImage(p)

            return (
              <Link
                key={p.id}
                href={productHref(p.slug, locale)}
                style={{
                  display: 'block',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 13,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform .2s, border-color .2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,110,247,0.30)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                }}
              >
                {/* Image area */}
                <div style={{ aspectRatio: '1', background: 'var(--card2)', position: 'relative', overflow: 'hidden' }}>
                  {discount > 0 && (
                    <div style={{ position: 'absolute', top: 9, left: 9, zIndex: 2, background: 'var(--orange)', color: '#fff', padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 800 }}>
                      -{discount}%
                    </div>
                  )}
                  <ImageWithFallback
                    src={imgSrc}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                    style={{ objectFit: 'cover' }}
                  />
                  {/* WhatsApp quick-order overlay */}
                  <a
                    href={whatsappProductLink(p.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    aria-label="Commander via WhatsApp"
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      zIndex: 3,
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'var(--green)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      textDecoration: 'none',
                    }}
                  >
                    💬
                  </a>
                </div>

                {/* Info */}
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 4 }}>
                    {CAT_LABELS[cat]}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', lineHeight: 1.35, marginBottom: 9 }} className="line-clamp-2">
                    {p.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                    <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 21, fontWeight: 700, color: 'var(--blue)' }}>
                      {finalP > 0 ? `${Math.round(finalP)} MAD` : 'Sur devis'}
                    </span>
                    {isOnSale && regP > 0 && (
                      <span style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'line-through' }}>
                        {Math.round(regP)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link
            href={`/${locale}/categorie-produit`}
            className="btn-primary"
            style={{ display: 'inline-flex', padding: '14px 28px' }}
          >
            Voir le catalogue complet (80+ produits) →
          </Link>
        </div>
      </div>
    </section>
  )
}
