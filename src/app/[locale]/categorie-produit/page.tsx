import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getCategoryTree, getProducts } from '@/lib/woocommerce'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'
import ProductCard from '@/components/catalog/ProductCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catalogue — Toutes les catégories',
  description: "Découvrez toutes nos catégories de fournitures professionnelles pour la sérigraphie, la sublimation et l'impression textile.",
}

const CAT_EMOJIS: Record<string, string> = {
  'les-presses-a-chaud': '🔥',
  'les-consommables-de-serigraphie': '🖨️',
  'les-produits-sublimables': '👕',
  'les-machines-dimpression': '⚙️',
}

export default async function CatalogIndexPage({
  params,
  searchParams,
}: {
  params: { locale: string }
  searchParams?: { search?: string }
}) {
  const { locale } = params
  const searchQuery = searchParams?.search?.trim() ?? ''
  setRequestLocale(locale)

  const [{ root: categories, children: subCategories }, searchResults] = await Promise.all([
    getCategoryTree(),
    searchQuery
      ? getProducts({ search: searchQuery, per_page: 20 }).then(r => r.products)
      : Promise.resolve(null),
  ])

  const waSearch = searchQuery
    ? whatsappGeneralLink(`Bonjour NES, je recherche "${searchQuery}" dans votre catalogue. Pouvez-vous m'aider ?`)
    : ''

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 6% 36px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link href={`/${locale}`} className="link-blue" style={{ color: 'var(--text2)', textDecoration: 'none' }}>Accueil</Link>
            <span style={{ color: 'var(--border2)' }}>/</span>
            <span style={{ color: 'var(--text)' }}>Catalogue</span>
          </nav>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 10 }}>
            Fournitures professionnelles
          </span>
          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 38, fontWeight: 700, color: 'var(--text)', lineHeight: 1.15, marginBottom: 10 }}>
            {searchQuery ? `Résultats pour « ${searchQuery} »` : 'Tout notre catalogue'}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 560 }}>
            {searchQuery
              ? `${searchResults?.length ?? 0} produit(s) trouvé(s)`
              : "Machines, consommables et produits sublimables pour les professionnels de l'impression textile au Maroc."}
          </p>
        </div>
      </div>

      {/* Search results */}
      {searchQuery && (
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 6%' }}>
          {searchResults && searchResults.length > 0 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                {searchResults.map(p => (
                  <ProductCard key={p.id} product={p} locale={locale} />
                ))}
              </div>
              <div style={{ marginTop: 28, textAlign: 'center', padding: '18px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>
                  Vous ne trouvez pas ce que vous cherchez ? Contactez nos experts.
                </p>
                <a href={waSearch} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--green)', color: '#fff', borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                  💬 Demander par WhatsApp
                </a>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Aucun résultat pour « {searchQuery} »</h2>
              <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 24 }}>Essayez un autre terme ou parcourez nos catégories ci-dessous.</p>
              <a href={waSearch} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                💬 Demander à un expert
              </a>
            </div>
          )}
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: 'var(--text)', margin: '52px 0 24px' }}>
            Ou parcourez nos catégories
          </h2>
        </div>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: searchQuery ? '0 6% 48px' : '48px 6%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          {categories.map(cat => {
            const subs = subCategories.get(cat.id) ?? []
            const emoji = CAT_EMOJIS[cat.slug] ?? '📦'
            return (
              <section key={cat.id}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                      {cat.name}
                    </h2>
                    <p style={{ fontSize: 13, color: 'var(--text2)' }}>{cat.count} produits disponibles</p>
                  </div>
                  <Link
                    href={categoryHref(cat.slug, locale)}
                    className="link-blue"
                    style={{ fontSize: 13, color: 'var(--blue)', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Voir tout →
                  </Link>
                </div>

                {subs.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                    {/* Parent card */}
                    <Link
                      href={categoryHref(cat.slug, locale)}
                      style={{ background: 'var(--bluesoft)', border: '1px solid var(--bluesoft2)', borderRadius: 8, padding: '18px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 110, textDecoration: 'none', transition: 'background .15s, border-color .15s' }}
                      className="cat-item"
                    >
                      <span style={{ fontSize: 24 }}>{emoji}</span>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', lineHeight: 1.35 }}>{cat.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--blue)', marginTop: 2 }}>{cat.count} produits</div>
                      </div>
                    </Link>

                    {subs.map(sub => (
                      <Link
                        key={sub.id}
                        href={categoryHref(sub.slug, locale)}
                        style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 110, textDecoration: 'none', transition: 'border-color .15s, background .15s' }}
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
                          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{sub.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{sub.count} produits</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={categoryHref(cat.slug, locale)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '18px 20px', textDecoration: 'none', transition: 'border-color .15s' }}
                    className="cat-item"
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{cat.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 3 }}>{cat.count} produits disponibles</div>
                    </div>
                    <svg style={{ width: 18, height: 18, color: 'var(--blue)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
