'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { WCProduct } from '@/lib/types'
import { getProductImage, productHref, whatsappProductLink } from '@/lib/utils'
import ImageWithFallback from '@/components/ui/ImageWithFallback'

const CAT_MAP: Record<string, string> = {
  'les-presses-a-chaud': 'presses',
  'les-consommables-de-serigraphie': 'conso',
  'les-consommables-de-sublimation': 'conso',
  'les-machines-dimpression': 'mach',
  'les-machines-de-serigraphie': 'mach',
  'les-produits-sublimables': 'sub',
}

const CAT_LABELS: Record<string, string> = {
  presses: 'Presses à chaud',
  conso: 'Consommables',
  sub: 'Produits sublimables',
  mach: 'Machines',
  other: 'Fournitures',
}

const FILTERS = [
  {
    key: 'all',
    label: 'Tout voir',
    title: 'Références les plus consultées',
    text: 'Un point d’entrée rapide si vous voulez voir les produits qui reviennent le plus souvent dans les demandes.',
  },
  {
    key: 'presses',
    label: 'Presses',
    title: 'Pour produire vos premières séries',
    text: 'À privilégier si vous comparez des formats, des capacités ou une première machine de production.',
  },
  {
    key: 'conso',
    label: 'Consommables',
    title: 'Pour réassortir sans perdre de temps',
    text: 'Le bon point d’entrée quand l’atelier tourne déjà et qu’il faut retrouver vite les bonnes bases.',
  },
  {
    key: 'sub',
    label: 'Sublimables',
    title: 'Pour élargir ce que vous vendez',
    text: 'Pratique si vous cherchez des supports à personnaliser et à revendre plus facilement.',
  },
  {
    key: 'mach',
    label: 'Machines',
    title: 'Pour équiper un atelier plus sérieusement',
    text: 'À explorer si vous êtes en phase d’équipement ou d’upgrade avec une logique plus atelier.',
  },
] as const

function getCat(product: WCProduct): string {
  for (const c of product.categories ?? []) {
    const m = CAT_MAP[c.slug]
    if (m) return m
  }
  return 'other'
}

function getDecisionSummary(active: string) {
  return FILTERS.find((item) => item.key === active) ?? FILTERS[0]
}

export default function ProductsSection({
  products,
  locale = 'fr',
}: {
  products: WCProduct[]
  locale?: string
}) {
  const [active, setActive] = useState<string>('all')

  const visible = useMemo(() => {
    const base = active === 'all' ? products : products.filter((p) => getCat(p) === active)
    return base.slice(0, 8)
  }, [active, products])

  const summary = getDecisionSummary(active)

  return (
    <section id="products" style={{ background: 'var(--bg)', padding: '84px 5%', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.96fr 1.04fr', gap: 22, alignItems: 'end', marginBottom: 28 }} className="grid lg:grid-cols-2 gap-6">
          <div>
            <span className="stag">Réassort et références qui tournent</span>
            <h2 style={{ fontSize: 'clamp(30px,3.8vw,48px)', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.04, marginBottom: 10 }}>
              Les produits à revoir quand vous voulez avancer vite.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 700 }}>
              Au lieu d’un simple bloc catalogue, cette section aide à retrouver les références qui servent soit à démarrer, soit à produire, soit à réapprovisionner votre atelier sans tourner en rond.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ borderRadius: 22, border: '1px solid var(--border)', background: 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,1) 100%)', padding: 18, boxShadow: 'var(--shadow)' }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 7 }}>
                Lecture rapide NES
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.06, marginBottom: 8 }}>
                {summary.title}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
                {summary.text}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }} className="grid md:grid-cols-3 gap-3">
              {[
                'Filtres pensés comme des chemins de décision',
                'Accès rapide aux produits qui reviennent le plus',
                'Contact WhatsApp direct depuis chaque référence',
              ].map((item) => (
                <div key={item} style={{ borderRadius: 16, border: '1px solid var(--border)', background: 'var(--card)', padding: '12px 12px 11px', fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              style={{
                padding: '10px 16px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                transition: 'all .18s',
                background: active === key ? 'var(--orange)' : 'var(--card)',
                color: active === key ? '#fff' : 'var(--text2)',
                border: active === key ? '1px solid var(--orange)' : '1px solid var(--border2)',
                boxShadow: active === key ? '0 10px 28px rgba(242,99,22,0.18)' : 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginTop: 4 }}>
          {visible.map((p) => {
            const cat = getCat(p)
            const saleP = parseFloat(p.sale_price || '0')
            const regP = parseFloat(p.regular_price || '0')
            const dispP = parseFloat(p.price || '0')
            const isOnSale = p.on_sale && saleP > 0
            const discount = isOnSale && regP > 0 ? Math.round((1 - saleP / regP) * 100) : 0
            const finalP = isOnSale ? saleP : dispP
            const imgSrc = getProductImage(p)

            return (
              <Link
                key={p.id}
                href={productHref(p.slug, locale)}
                style={{
                  display: 'block',
                  background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(252,249,246,1) 100%)',
                  border: '1px solid var(--border)',
                  borderRadius: 20,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all .25s',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(242,99,22,0.30)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                }}
              >
                <div style={{ aspectRatio: '1.06', background: 'var(--card2)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.16) 100%)', zIndex: 1, pointerEvents: 'none' }} />
                  {discount > 0 && (
                    <div style={{ position: 'absolute', top: 11, left: 11, zIndex: 3, background: 'var(--orange)', color: '#fff', padding: '4px 9px', borderRadius: 999, fontSize: 10, fontWeight: 800 }}>
                      -{discount}%
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: 11, right: 11, zIndex: 3, padding: '5px 9px', borderRadius: 999, background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.65)', color: 'var(--text2)', fontSize: 10, fontWeight: 800, backdropFilter: 'blur(8px)' }}>
                    {CAT_LABELS[cat]}
                  </div>
                  <ImageWithFallback
                    src={imgSrc}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 260px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', lineHeight: 1.3, letterSpacing: '-0.02em', marginBottom: 10 }} className="line-clamp-2">
                    {p.name}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 14 }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: 'var(--orange)', letterSpacing: '-0.03em' }}>
                      {finalP > 0 ? `${Math.round(finalP)} MAD` : 'Sur devis'}
                    </span>
                    {isOnSale && regP > 0 && (
                      <span style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'line-through' }}>
                        {Math.round(regP)}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '9px 10px', borderRadius: 12, background: 'rgba(242,99,22,0.08)', border: '1px solid rgba(242,99,22,0.12)', color: 'var(--text2)', fontSize: 11, fontWeight: 700 }}>
                      Voir la fiche
                    </div>
                    <a
                      href={whatsappProductLink(p.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Commander via WhatsApp"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        background: 'var(--green)',
                        color: '#fff',
                        fontSize: 16,
                        textDecoration: 'none',
                        flexShrink: 0,
                      }}
                    >
                      💬
                    </a>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center', marginTop: 26, padding: '18px 20px', borderRadius: 22, border: '1px solid var(--border)', background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(249,246,243,1) 100%)' }} className="grid md:grid-cols-[1fr_auto] gap-4">
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 7 }}>
              Si vous n’avez pas trouvé en 30 secondes
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 5 }}>
              NES peut vous orienter directement vers la bonne famille ou préparer un devis plus sérieux.
            </div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>
              Utilisez le catalogue complet si vous voulez tout explorer, ou passez par NES si vous avez surtout besoin d’aller plus vite vers le bon choix.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href={`/${locale}/categorie-produit`}
              className="btn-outline"
              style={{ display: 'inline-flex', padding: '13px 20px', fontSize: 13, fontWeight: 800 }}
            >
              Voir le catalogue complet →
            </Link>
            <Link
              href={`/${locale}/devis-pro`}
              className="btn-orange"
              style={{ display: 'inline-flex', padding: '13px 20px', fontSize: 13, fontWeight: 800 }}
            >
              Demander un devis pro
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
