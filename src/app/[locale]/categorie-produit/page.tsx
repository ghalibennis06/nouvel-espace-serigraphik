import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getCategoryTree } from '@/lib/woocommerce'
import { categoryHref } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catalogue — Toutes les catégories',
  description: 'Découvrez toutes nos catégories de fournitures professionnelles pour la sérigraphie, la sublimation et l\'impression textile.',
}

const CAT_EMOJIS: Record<string, string> = {
  'les-presses-a-chaud': '🔥',
  'les-consommables-de-serigraphie': '🖨️',
  'les-produits-sublimables': '👕',
  'les-machines-dimpression': '⚙️',
}

export default async function CatalogIndexPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)
  const { root: categories, children: subCategories } = await getCategoryTree()

  return (
    <div style={{ background: '#0C0A08', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#1A1612', borderBottom: '1px solid rgba(200,137,31,0.12)', padding: '48px 6% 36px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, color: '#B8AA94', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link href={`/${locale}`} className="link-gold" style={{ color: '#B8AA94', textDecoration: 'none' }}>Accueil</Link>
            <span style={{ color: 'rgba(245,237,216,0.3)' }}>/</span>
            <span style={{ color: '#F5EDD8' }}>Catalogue</span>
          </nav>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#C8891F', display: 'block', marginBottom: 10 }}>
            Fournitures professionnelles
          </span>
          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 38, fontWeight: 700, color: '#F5EDD8', lineHeight: 1.15, marginBottom: 10 }}>
            Tout notre catalogue
          </h1>
          <p style={{ fontSize: 14, color: '#B8AA94', maxWidth: 560 }}>
            Machines, consommables et produits sublimables pour les professionnels de l&apos;impression textile au Maroc.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 6%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          {categories.map(cat => {
            const subs = subCategories.get(cat.id) ?? []
            const emoji = CAT_EMOJIS[cat.slug] ?? '📦'
            return (
              <section key={cat.id}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: '#F5EDD8', marginBottom: 4 }}>
                      {cat.name}
                    </h2>
                    <p style={{ fontSize: 13, color: '#B8AA94' }}>{cat.count} produits disponibles</p>
                  </div>
                  <Link
                    href={categoryHref(cat.slug, locale)}
                    className="link-gold"
                    style={{ fontSize: 13, color: '#C8891F', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Voir tout →
                  </Link>
                </div>

                {subs.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                    {/* Parent card */}
                    <Link
                      href={categoryHref(cat.slug, locale)}
                      style={{ background: 'rgba(200,137,31,0.08)', border: '1px solid rgba(200,137,31,0.2)', borderRadius: 8, padding: '18px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 110, textDecoration: 'none', transition: 'background .15s, border-color .15s' }}
                      className="cat-item"
                    >
                      <span style={{ fontSize: 24 }}>{emoji}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#F5EDD8', lineHeight: 1.35 }}>{cat.name}</div>
                        <div style={{ fontSize: 11, color: '#C8891F', marginTop: 2 }}>{cat.count} produits</div>
                      </div>
                    </Link>

                    {subs.map(sub => (
                      <Link
                        key={sub.id}
                        href={categoryHref(sub.slug, locale)}
                        style={{ background: '#1A1612', border: '1px solid rgba(245,237,216,0.08)', borderRadius: 8, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 110, textDecoration: 'none', transition: 'border-color .15s, background .15s' }}
                        className="cat-item"
                      >
                        {sub.image ? (
                          <div style={{ position: 'relative', width: 38, height: 38, marginBottom: 8 }}>
                            <Image src={sub.image.src} alt={sub.name} fill className="object-contain" sizes="38px" />
                          </div>
                        ) : (
                          <span style={{ fontSize: 22, marginBottom: 8, display: 'block' }}>🔧</span>
                        )}
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#F5EDD8', lineHeight: 1.3 }}>{sub.name}</div>
                          <div style={{ fontSize: 11, color: '#B8AA94', marginTop: 2 }}>{sub.count} produits</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={categoryHref(cat.slug, locale)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#1A1612', border: '1px solid rgba(245,237,216,0.08)', borderRadius: 8, padding: '18px 20px', textDecoration: 'none', transition: 'border-color .15s' }}
                    className="cat-item"
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: '#F5EDD8', fontSize: 14 }}>{cat.name}</div>
                      <div style={{ fontSize: 12, color: '#B8AA94', marginTop: 3 }}>{cat.count} produits disponibles</div>
                    </div>
                    <svg style={{ width: 18, height: 18, color: '#C8891F' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
