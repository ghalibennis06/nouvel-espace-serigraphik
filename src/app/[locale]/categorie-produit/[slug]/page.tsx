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
import { categoryHref, stripHtml } from '@/lib/utils'

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
