/**
 * Static data adapter — mirrors the woocommerce.ts public API surface
 * Used when WooCommerce API credentials are not available (API_READY = false)
 */

import type { WCProduct, WCCategory } from '@/lib/types'
import { PRODUCTS, PRODUCTS_BY_SLUG, PRODUCTS_BY_ID, PRODUCTS_BY_CAT } from './products'
import { CATEGORIES } from './categories'

// ─── Categories ───────────────────────────────────────────────────────────────

export function staticGetCategories(): WCCategory[] {
  return CATEGORIES
}

export function staticGetCategoryBySlug(slug: string): WCCategory | null {
  return CATEGORIES.find(c => c.slug === slug) ?? null
}

export function staticGetAllCategorySlugs(): string[] {
  return CATEGORIES.map(c => c.slug)
}

// ─── Products ─────────────────────────────────────────────────────────────────

interface StaticProductFilters {
  category?: string
  orderby?: string
  page?: number
  per_page?: number
  in_stock?: boolean
  on_sale?: boolean
  search?: string
}

export function staticGetProducts(filters: StaticProductFilters = {}) {
  const {
    category,
    orderby = 'date',
    page = 1,
    per_page = 12,
    in_stock,
    on_sale,
    search,
  } = filters

  let results: WCProduct[] = category
    ? (PRODUCTS_BY_CAT.get(Number(category)) ?? [])
    : [...PRODUCTS]

  if (in_stock) results = results.filter(p => p.stock_status === 'instock')
  if (on_sale)  results = results.filter(p => p.on_sale)
  if (search) {
    const q = search.toLowerCase()
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.short_description.toLowerCase().includes(q)
    )
  }

  // Sorting
  switch (orderby) {
    case 'price':
      results = [...results].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      break
    case 'price-desc':
      results = [...results].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      break
    case 'popularity':
      results = [...results].sort((a, b) => (b.total_sales ?? 0) - (a.total_sales ?? 0))
      break
    case 'rating':
      results = [...results].sort((a, b) => parseFloat(b.average_rating ?? '0') - parseFloat(a.average_rating ?? '0'))
      break
    default: // date — featured first, then by id desc
      results = [...results].sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.id - a.id
      })
  }

  const total = results.length
  const totalPages = Math.ceil(total / per_page)
  const start = (page - 1) * per_page
  const products = results.slice(start, start + per_page)

  return {
    products,
    pagination: { total, totalPages, page, per_page },
  }
}

export function staticGetProductBySlug(slug: string): WCProduct | null {
  return PRODUCTS_BY_SLUG.get(slug) ?? null
}

export function staticGetFeaturedProducts(limit = 8): WCProduct[] {
  return PRODUCTS.filter(p => p.featured).slice(0, limit)
}

export function staticGetRelatedProducts(product: WCProduct, limit = 4): WCProduct[] {
  if (!product.categories.length) return []
  const catId = product.categories[0].id
  return (PRODUCTS_BY_CAT.get(catId) ?? [])
    .filter(p => p.id !== product.id)
    .slice(0, limit)
}

export function staticGetAllProductSlugs(): string[] {
  return PRODUCTS.map(p => p.slug)
}

export function staticSearchProducts(query: string, limit = 20): WCProduct[] {
  return staticGetProducts({ search: query, per_page: limit }).products
}

export { PRODUCTS, PRODUCTS_BY_SLUG, PRODUCTS_BY_ID, PRODUCTS_BY_CAT, CATEGORIES }
