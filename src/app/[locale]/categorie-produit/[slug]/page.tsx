import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import {
  getCategoryBySlug,
  getProducts,
  getCategories,
  getAllCategorySlugs,
} from '@/lib/woocommerce'
import type { ProductFilters } from '@/lib/types'
import ProductCard from '@/components/catalog/ProductCard'
import FilterSidebar from '@/components/catalog/FilterSidebar'
import { categoryHref, stripHtml, whatsappGeneralLink } from '@/lib/utils'

// ─── Category educational context ─────────────────────────────────────────────
const CAT_CONTEXT: Record<string, {
  who: string
  entry: string
  budget: string
  use: string[]
  lane: 'starter' | 'workshop' | 'restock'
  whatsappPrompt: string
  urgencyTitle: string
  urgencyPoints: string[]
}> = {
  'les-presses-a-chaud': {
    who: 'Entrepreneurs en démarrage, ateliers de personnalisation textile, photographes proposant des cadeaux personnalisés.',
    entry: 'Commencez par la presse 38×38cm pour tester la sublimation, puis montez en gamme vers le 40×50 auto-ouverture.',
    budget: 'Budget démarrage : 1 800–2 500 MAD. Budget pro : 3 200–8 000 MAD.',
    use: ['Sublimation sur t-shirts polyester', 'Transfert flex sur coton', 'Personnalisation mugs et objets rigides', 'Sérigraphie thermique'],
    lane: 'starter',
    whatsappPrompt: "Bonjour NES, je veux choisir une presse à chaud adaptée à mon projet et à mon budget. Pouvez-vous me guider ?",
    urgencyTitle: 'Vérifiez surtout ces points avant achat',
    urgencyPoints: ['la taille de presse adaptée à vos produits', 'si vous visez textile, mugs ou supports variés', 'votre budget réel de démarrage avec consommables'],
  },
  'les-consommables-de-serigraphie': {
    who: 'Ateliers de sérigraphie en production, imprimeurs textiles, designers faisant leurs propres runs.',
    entry: 'Commencez avec la base aqueuse Antex XP10 et des cadres 40×50cm. Prévoyez 3–5 cadres pour produire efficacement.',
    budget: 'Budget mensuel typique : 400–1 500 MAD selon volume de production.',
    use: ['Impression sur t-shirts coton', 'Séries associatifs & clubs sportifs', 'Personnalisation sweats et tote bags', 'Production en plusieurs couleurs'],
    lane: 'restock',
    whatsappPrompt: "Bonjour NES, je veux me réapprovisionner en consommables de sérigraphie. Pouvez-vous me recommander les bonnes références ?",
    urgencyTitle: 'Pour éviter les erreurs de réassort',
    urgencyPoints: ['vérifiez la compatibilité avec votre méthode actuelle', 'regroupez les références qui tournent le plus', 'précisez votre cadence et votre délai de rupture'],
  },
  'les-consommables-de-sublimation': {
    who: 'Ateliers de sublimation, side-business mugs et cadeaux, photographes, boutiques cadeaux personnalisés.',
    entry: 'Commencez par les encres + papier A4. Une bouteille 100ml encre CMYK = environ 200 impressions A4.',
    budget: 'Budget mensuel typique : 250–700 MAD selon production.',
    use: ['Mugs, cadres, coussins sublimés', 'T-shirts polyester plein couleur', 'Cadeaux personnalisés', 'Objets rigides avec revêtement sublimable'],
    lane: 'restock',
    whatsappPrompt: "Bonjour NES, je veux acheter des consommables de sublimation et j’ai besoin d’aide pour choisir les bons produits.",
    urgencyTitle: 'Pour continuer à produire sans blocage',
    urgencyPoints: ['vérifiez le papier et l’encre adaptés à votre imprimante', 'sécurisez les références qui tournent chaque semaine', 'prévenez NES si vous avez un délai client serré'],
  },
  'les-machines-dimpression': {
    who: 'Ateliers cherchant la production intensive, sous-traitants textile, revendeurs DTF.',
    entry: "Commencez par l'imprimante DTF A4 (la plus accessible). Vérifiez que vous avez une station poudrage et un tunnel séchage.",
    budget: 'Investissement machine seule : 6 000–15 000 MAD. Kit complet recommandé.',
    use: ['DTF tous textiles', 'Production 100+ transferts/heure', 'Sous-traitance pour autres ateliers', 'Impression photo sur textile'],
    lane: 'workshop',
    whatsappPrompt: "Bonjour NES, je cherche une machine d’impression adaptée à mon atelier. Pouvez-vous me conseiller ?",
    urgencyTitle: 'Avant d’investir dans une machine',
    urgencyPoints: ['comparez la vraie cadence utile, pas seulement le prix', 'vérifiez si vous avez tout l’écosystème autour de la machine', 'demandez à NES si votre volume justifie ce niveau d’investissement'],
  },
  'les-machines-de-serigraphie': {
    who: "Ateliers en croissance cherchant à automatiser, producteurs de t-shirts en grande série, ateliers B2B.",
    entry: 'Commencez par un carrousel 1 couleur 1 station, puis évoluez vers le 4 couleurs selon votre volume.',
    budget: 'Carrousel entrée de gamme : 4 000–8 000 MAD. Insolation : 2 000–5 000 MAD.',
    use: ['Production sérigraphie à grande échelle', 'Insolation de cadres professionnelle', 'Séchage tunnel encres', 'Atelier complet professionnel'],
    lane: 'workshop',
    whatsappPrompt: "Bonjour NES, je veux équiper ou faire évoluer mon atelier de sérigraphie. Pouvez-vous me recommander les bonnes machines ?",
    urgencyTitle: 'Pour ne pas surinvestir trop tôt',
    urgencyPoints: ['vérifiez votre nombre réel de commandes', 'choisissez selon vos formats et couleurs les plus fréquents', 'faites confirmer le bon palier d’équipement avant achat'],
  },
  'les-produits-sublimables': {
    who: "Ateliers de sublimation cherchant à diversifier leur offre, boutiques cadeaux, e-commerçants.",
    entry: 'Les mugs blancs 11oz sont le produit de démarrage le plus rentable. Ajoutez les coussins et cadres pour diversifier.',
    budget: 'Coût unitaire : 5–30 MAD selon support. Marge nette : 200–500%.',
    use: ['Mugs personnalisés entreprises & particuliers', 'Coussins photo', 'Cadres marbre & aluminium', 'Porte-clés et accessoires'],
    lane: 'starter',
    whatsappPrompt: "Bonjour NES, je veux vendre des produits sublimables et j’ai besoin d’aide pour choisir les meilleurs supports.",
    urgencyTitle: 'Pour mieux choisir vos premiers supports',
    urgencyPoints: ['commencez par les produits les plus faciles à vendre', 'comparez la marge et la facilité de production', 'demandez à NES quels supports tournent le mieux au Maroc'],
  },
}

interface PageProps {
  params: { locale: string; slug: string }
  searchParams: {
    page?: string
    orderby?: string
    in_stock?: string
    on_sale?: string
  }
}

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const slugs = await getAllCategorySlugs()
    return slugs.flatMap(slug => [
      { locale: 'fr', slug },
      { locale: 'ar', slug },
    ])
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)
  if (!category) return {}
  const desc = stripHtml(category.description)
  return {
    title: category.name,
    description: desc || `${category.name} — Fournitures professionnelles d'impression textile au Maroc.`,
    openGraph: {
      title: category.name,
      description: desc,
      images: category.image ? [{ url: category.image.src }] : [],
    },
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { locale, slug } = params
  setRequestLocale(locale)
  const t = await getTranslations('catalog')
  const catCtx = CAT_CONTEXT[slug] ?? null
  const laneCopy = catCtx?.lane === 'starter'
    ? {
        badge: 'Parcours démarrage',
        title: 'Commencez avec la bonne base pour éviter les mauvais achats.',
        text: 'Cette catégorie doit surtout aider un acheteur débutant à comprendre quoi choisir en premier, avec quel budget et pour quel type de produits à vendre.',
        cta: 'Voir aussi les kits de démarrage',
        href: `/${locale}/kits`,
      }
    : catCtx?.lane === 'workshop'
      ? {
          badge: 'Parcours atelier',
          title: 'Équipez votre atelier avec une logique de production claire.',
          text: 'Ici, le rôle commercial est d’aider un atelier à monter en gamme, gagner en cadence et choisir le bon matériel sans perdre du temps.',
          cta: 'Demander un devis atelier',
          href: `/${locale}/devis-pro`,
        }
      : catCtx?.lane === 'restock'
        ? {
            badge: 'Parcours réassort',
            title: 'Retrouvez rapidement les bonnes références pour continuer à produire.',
            text: 'Cette catégorie doit servir au réapprovisionnement rapide, avec des repères simples sur les produits qui tournent réellement dans un atelier.',
            cta: 'Voir le catalogue complet',
            href: `/${locale}/categorie-produit`,
          }
        : null

  const currentPage = parseInt(searchParams.page ?? '1', 10)
  const orderby     = (searchParams.orderby as ProductFilters['orderby']) ?? 'date'
  const in_stock    = searchParams.in_stock === 'true'
  const on_sale     = searchParams.on_sale  === 'true'

  const [category, allSubcategories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ])

  if (!category) notFound()

  const subcategories = allSubcategories.filter(c => c.parent === category.id)

  const filters: ProductFilters = {
    category: String(category.id),
    orderby,
    page: currentPage,
    per_page: 12,
    in_stock: in_stock || undefined,
    on_sale:  on_sale  || undefined,
  }

  const { products, pagination } = await getProducts(filters)

  const sortOptions = [
    { value: 'date',       label: t('sortNewest') },
    { value: 'popularity', label: t('sortPopular') },
    { value: 'price',      label: t('sortPriceAsc') },
    { value: 'price-desc', label: t('sortPriceDesc') },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* ── Category Header ─────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '40px 6% 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text2)', marginBottom: 16 }}>
            <Link href={`/${locale}`} className="link-blue" style={{ color: 'var(--text2)', textDecoration: 'none' }}>Accueil</Link>
            <span style={{ color: 'var(--border2)' }}>/</span>
            <Link href={`/${locale}/categorie-produit`} className="link-blue" style={{ color: 'var(--text2)', textDecoration: 'none' }}>Catalogue</Link>
            <span style={{ color: 'var(--border2)' }}>/</span>
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{category.name}</span>
          </nav>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 34, fontWeight: 700, color: 'var(--text)', marginBottom: 8, lineHeight: 1.15 }}>
                {category.name}
              </h1>
              {category.description && (
                <p style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 520, lineHeight: 1.65 }}>
                  {stripHtml(category.description).slice(0, 150)}
                </p>
              )}
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--blue)', lineHeight: 1 }}>
                {pagination.total}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text2)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
                {t('products')}
              </div>
            </div>
          </div>

          {/* Subcategory chips */}
          {subcategories.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
              <Link
                href={categoryHref(slug, locale)}
                style={{ padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: 'var(--bluesoft2)', color: 'var(--blue)', border: '1px solid var(--blue)', textDecoration: 'none' }}
              >
                Tout voir ({category.count})
              </Link>
              {subcategories.map(sub => (
                <Link
                  key={sub.id}
                  href={categoryHref(sub.slug, locale)}
                  style={{ padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: 'var(--border)', color: 'var(--text2)', border: '1px solid var(--border2)', textDecoration: 'none', transition: 'background .15s, color .15s' }}
                  className="link-blue"
                >
                  {sub.name} ({sub.count})
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Category educational context ─────────────────────────── */}
      {catCtx && (
        <div style={{ background: 'var(--bg)', padding: '32px 6%', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', marginBottom: 18 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--orange)', marginBottom: 8 }}>
                {laneCopy?.badge}
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                {laneCopy?.title}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 820, marginBottom: 14 }}>
                {laneCopy?.text}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href={laneCopy?.href ?? `/${locale}/categorie-produit`} className="btn-outline" style={{ padding: '12px 18px', fontSize: 13, fontWeight: 700 }}>
                  {laneCopy?.cta}
                </Link>
                <a
                  href={whatsappGeneralLink(catCtx.whatsappPrompt)}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 18px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
                >
                  💬 Poser la question sur WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            <div style={{ gridColumn: '1 / -1', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '18px 20px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: 8 }}>{catCtx.urgencyTitle}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
                {catCtx.urgencyPoints.map((point) => (
                  <div key={point} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: '18px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)', marginBottom: 8 }}>Pour qui ?</div>
              <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{catCtx.who}</p>
            </div>
            <div style={{ padding: '18px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--teal)', marginBottom: 8 }}>Par où commencer ?</div>
              <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{catCtx.entry}</p>
            </div>
            <div style={{ padding: '18px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: 8 }}>Budget orientatif</div>
              <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 8 }}>{catCtx.budget}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {catCtx.use.map(u => (
                  <span key={u} style={{ fontSize: 10, padding: '2px 8px', background: 'var(--orangesoft)', color: 'var(--orange)', borderRadius: 4, fontWeight: 600 }}>{u}</span>
                ))}
              </div>
            </div>
            <div style={{ padding: '18px', background: 'var(--greensoft)', border: '1px solid var(--green)', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--green)', marginBottom: 8 }}>Besoin d&apos;aide ?</div>
                <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>Nos experts vous conseillent le bon produit selon votre budget et votre activité.</p>
              </div>
              <a
                href={whatsappGeneralLink(catCtx.whatsappPrompt)}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, padding: '9px 14px', background: 'var(--green)', color: '#fff', borderRadius: 7, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}
              >
                💬 Demander par WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 6%' }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <FilterSidebar
            locale={locale}
            subcategories={subcategories}
            currentCategorySlug={slug}
            totalProducts={pagination.total}
          />

          {/* Product area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <p style={{ fontSize: 13, color: 'var(--text2)' }}>
                {t('showing')}{' '}
                <strong style={{ color: 'var(--text)' }}>{(currentPage - 1) * 12 + 1}–{Math.min(currentPage * 12, pagination.total)}</strong>
                {' '}{t('of')}{' '}
                <strong style={{ color: 'var(--text)' }}>{pagination.total}</strong>
                {' '}{t('products')}
              </p>

              <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 10 }}>
                <select
                  defaultValue={orderby}
                  name="orderby"
                  style={{ fontSize: 13, background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--border2)', borderRadius: 6, padding: '7px 12px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="">{t('sortDefault')}</option>
                  {sortOptions.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid */}
            {products.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    priority={i < 3}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontWeight: 700, color: 'var(--text)', fontSize: 18, marginBottom: 8 }}>{t('noProducts')}</h3>
                <p style={{ fontSize: 14, color: 'var(--text2)' }}>{t('noProductsHint')}</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
                {currentPage > 1 && (
                  <Link
                    href={`?page=${currentPage - 1}${orderby ? `&orderby=${orderby}` : ''}`}
                    style={{ padding: '8px 16px', border: '1px solid var(--border2)', borderRadius: 6, fontSize: 13, color: 'var(--text2)', textDecoration: 'none', background: 'var(--card)', transition: 'border-color .15s' }}
                    className="link-blue"
                  >
                    ← Précédent
                  </Link>
                )}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                  <Link
                    key={p}
                    href={`?page=${p}${orderby ? `&orderby=${orderby}` : ''}`}
                    style={{
                      width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'background .15s',
                      background: p === currentPage ? 'var(--blue)' : 'var(--card)',
                      color: p === currentPage ? '#fff' : 'var(--text2)',
                      border: `1px solid ${p === currentPage ? 'var(--blue)' : 'var(--border2)'}`,
                    }}
                  >
                    {p}
                  </Link>
                ))}
                {currentPage < pagination.totalPages && (
                  <Link
                    href={`?page=${currentPage + 1}${orderby ? `&orderby=${orderby}` : ''}`}
                    style={{ padding: '8px 16px', border: '1px solid var(--border2)', borderRadius: 6, fontSize: 13, color: 'var(--text2)', textDecoration: 'none', background: 'var(--card)', transition: 'border-color .15s' }}
                    className="link-blue"
                  >
                    Suivant →
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
