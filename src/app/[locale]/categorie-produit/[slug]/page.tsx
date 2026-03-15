import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
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

// Pages not pre-generated at build time will be rendered on first request
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const slugs = await getAllCategorySlugs()
    return slugs.flatMap(slug => [
      { locale: 'fr', slug },
      { locale: 'ar', slug },
    ])
  } catch {
    // API not available at build time — pages will be rendered on demand
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
  const t = await getTranslations('catalog')

  const currentPage = parseInt(searchParams.page ?? '1', 10)
  const orderby     = (searchParams.orderby as ProductFilters['orderby']) ?? 'date'
  const in_stock    = searchParams.in_stock === 'true'
  const on_sale     = searchParams.on_sale  === 'true'

  // Fetch category + subcategories + products in parallel
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
    <div className="bg-gray-50 min-h-screen">
      {/* ── Category Header ─────────────────────────────────────────── */}
      <div className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
            <Link href={`/${locale}`} className="hover:text-gray-300 transition-colors">Accueil</Link>
            <span className="text-gray-600">/</span>
            <Link href={`/${locale}/categorie-produit`} className="hover:text-gray-300 transition-colors">Catalogue</Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300 font-medium">{category.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">{category.name}</h1>
              {category.description && (
                <p className="text-sm text-gray-400 max-w-xl leading-relaxed line-clamp-2">
                  {stripHtml(category.description)}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-center">
                <div className="text-2xl font-black text-brand-amber">{pagination.total}</div>
                <div className="text-2xs text-gray-500 uppercase tracking-wide">{t('products')}</div>
              </div>
            </div>
          </div>

          {/* Subcategory chips */}
          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              <Link
                href={categoryHref(slug, locale)}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-navy-900"
              >
                Tout voir ({category.count})
              </Link>
              {subcategories.map(sub => (
                <Link
                  key={sub.id}
                  href={categoryHref(sub.slug, locale)}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 hover:bg-white hover:text-navy-900 transition-colors"
                >
                  {sub.name} ({sub.count})
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6 items-start">

          {/* Sidebar */}
          <FilterSidebar
            locale={locale}
            subcategories={subcategories}
            currentCategorySlug={slug}
            totalProducts={pagination.total}
          />

          {/* Product area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <p className="text-sm text-gray-500">
                {t('showing')} <strong className="text-navy-900">{(currentPage - 1) * 12 + 1}–{Math.min(currentPage * 12, pagination.total)}</strong> {t('of')} <strong className="text-navy-900">{pagination.total}</strong> {t('products')}
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile filter — rendered inside FilterSidebar */}
                <select
                  defaultValue={orderby}
                  className="hidden lg:block text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-brand-red bg-white"
                  onChange={e => {
                    // Client-side sort — using a form submit pattern
                  }}
                  name="orderby"
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
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
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
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">{t('noProducts')}</h3>
                <p className="text-gray-500 text-sm">{t('noProductsHint')}</p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {currentPage > 1 && (
                  <Link
                    href={`?page=${currentPage - 1}${orderby ? `&orderby=${orderby}` : ''}`}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-navy-900 transition-colors bg-white"
                  >
                    ← Précédent
                  </Link>
                )}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(p => (
                  <Link
                    key={p}
                    href={`?page=${p}${orderby ? `&orderby=${orderby}` : ''}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors border ${
                      p === currentPage
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'border-gray-200 text-gray-600 hover:border-navy-900 bg-white'
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                {currentPage < pagination.totalPages && (
                  <Link
                    href={`?page=${currentPage + 1}${orderby ? `&orderby=${orderby}` : ''}`}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:border-navy-900 transition-colors bg-white"
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
