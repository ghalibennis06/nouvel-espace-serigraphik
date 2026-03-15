/**
 * WooCommerce REST API v3 client
 *
 * All fetches happen server-side (Next.js Server Components / Route Handlers).
 * Credentials are read from env vars and NEVER sent to the browser.
 *
 * ISR strategy:
 *   - Products / categories are cached with `next: { revalidate: 3600 }` (1 hour)
 *   - A webhook (POST /api/revalidate) can purge the cache on WC product update
 */

import type {
  WCProduct,
  WCCategory,
  WCVariation,
  ProductFilters,
  PaginationMeta,
} from './types'

// ─── Config ──────────────────────────────────────────────────────────────────

const BASE_URL   = process.env.WC_BASE_URL ?? ''
const CK         = process.env.WC_CONSUMER_KEY ?? ''
const CS         = process.env.WC_CONSUMER_SECRET ?? ''

const API_READY  = Boolean(BASE_URL && CK && CS)

if (!API_READY) {
  console.warn('[WooCommerce] Missing env vars: WC_BASE_URL, WC_CONSUMER_KEY, or WC_CONSUMER_SECRET — API calls will be skipped.')
}

// ─── Core fetch helper ────────────────────────────────────────────────────────

interface FetchOptions {
  revalidate?: number | false
  tags?: string[]
}

// Fallback empty Headers for when API is not configured
const EMPTY_HEADERS = new Headers({ 'X-WP-Total': '0', 'X-WP-TotalPages': '1' })

async function wcFetch<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  opts: FetchOptions = {},
): Promise<{ data: T; headers: Headers }> {
  // Skip API call entirely if credentials are not set (e.g. during CI build)
  if (!API_READY) {
    return { data: (Array.isArray([]) ? [] : {}) as T, headers: EMPTY_HEADERS }
  }

  const url = new URL(`${BASE_URL}${endpoint}`)

  // Auth via query params (basic auth alternative that works on most hosts)
  url.searchParams.set('consumer_key', CK)
  url.searchParams.set('consumer_secret', CS)

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, String(v))
    }
  })

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    next: {
      revalidate: opts.revalidate !== undefined ? opts.revalidate : 3600,
      tags: opts.tags,
    },
  })

  if (!res.ok) {
    const text = await res.text().catch(() => 'unknown error')
    throw new Error(`WooCommerce API error ${res.status} on ${endpoint}: ${text}`)
  }

  const data = (await res.json()) as T
  return { data, headers: res.headers }
}

// ─── Pagination helper ────────────────────────────────────────────────────────

function parsePagination(headers: Headers, currentPage: number, perPage: number): PaginationMeta {
  const total      = parseInt(headers.get('X-WP-Total') ?? '0', 10)
  const totalPages = parseInt(headers.get('X-WP-TotalPages') ?? '1', 10)
  return { total, totalPages, currentPage, perPage }
}

// ─── Categories ───────────────────────────────────────────────────────────────

export async function getCategories(parent?: number): Promise<WCCategory[]> {
  const params: Record<string, string | number | boolean> = {
    per_page: 100,
    orderby: 'menu_order',
    order: 'asc',
    hide_empty: true,
  }
  if (parent !== undefined) params.parent = parent

  const { data } = await wcFetch<WCCategory[]>('/categories', params, {
    tags: ['categories'],
  })
  return data
}

export async function getCategoryBySlug(slug: string): Promise<WCCategory | null> {
  const { data } = await wcFetch<WCCategory[]>('/categories', { slug }, {
    tags: [`category-${slug}`],
  })
  return data[0] ?? null
}

export async function getCategoryTree(): Promise<{ root: WCCategory[]; children: Map<number, WCCategory[]> }> {
  const all  = await getCategories()
  const root = all.filter(c => c.parent === 0)
  const children = new Map<number, WCCategory[]>()
  all.filter(c => c.parent !== 0).forEach(c => {
    const list = children.get(c.parent) ?? []
    list.push(c)
    children.set(c.parent, list)
  })
  return { root, children }
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(
  filters: ProductFilters = {},
): Promise<{ products: WCProduct[]; pagination: PaginationMeta }> {
  const {
    category,
    search,
    orderby = 'date',
    page = 1,
    per_page = 12,
    on_sale,
    in_stock,
    min_price,
    max_price,
  } = filters

  const params: Record<string, string | number | boolean> = {
    per_page,
    page,
    orderby: orderby === 'price-desc' ? 'price' : orderby,
    order:   orderby === 'price-desc' ? 'desc' : 'asc',
    status: 'publish',
  }

  if (category)  params.category  = category
  if (search)    params.search    = search
  if (on_sale)   params.on_sale   = true
  if (in_stock)  params.stock_status = 'instock'
  if (min_price) params.min_price = min_price
  if (max_price) params.max_price = max_price

  const tags = ['products', ...(category ? [`category-${category}`] : [])]

  const { data, headers } = await wcFetch<WCProduct[]>('/products', params, { tags })
  const pagination = parsePagination(headers, page, per_page)

  return { products: data, pagination }
}

export async function getProductBySlug(slug: string): Promise<WCProduct | null> {
  const { data } = await wcFetch<WCProduct[]>(
    '/products',
    { slug, status: 'publish' },
    { tags: [`product-${slug}`] },
  )
  return data[0] ?? null
}

export async function getFeaturedProducts(limit = 8): Promise<WCProduct[]> {
  const { data } = await wcFetch<WCProduct[]>(
    '/products',
    { featured: true, per_page: limit, status: 'publish' },
    { tags: ['products', 'featured'] },
  )
  // Fallback: if no featured products, return best-sellers
  if (data.length === 0) {
    const { data: popular } = await wcFetch<WCProduct[]>(
      '/products',
      { orderby: 'popularity', order: 'desc', per_page: limit, status: 'publish' },
      { tags: ['products', 'popular'] },
    )
    return popular
  }
  return data
}

export async function getRelatedProducts(productId: number, limit = 4): Promise<WCProduct[]> {
  // WooCommerce REST API doesn't expose related IDs directly in the list;
  // fetch the full product first, then its related_ids
  const { data: product } = await wcFetch<WCProduct>(
    `/products/${productId}`,
    {},
    { tags: [`product-${productId}`] },
  )
  if (!product.related_ids?.length) return []

  const ids = product.related_ids.slice(0, limit).join(',')
  const { data } = await wcFetch<WCProduct[]>(
    '/products',
    { include: ids, status: 'publish' },
    { tags: ['products'] },
  )
  return data
}

// ─── Variations ───────────────────────────────────────────────────────────────

export async function getVariations(productId: number): Promise<WCVariation[]> {
  const { data } = await wcFetch<WCVariation[]>(
    `/products/${productId}/variations`,
    { per_page: 100 },
    { tags: [`product-${productId}`, 'variations'] },
  )
  return data
}

// ─── Search ───────────────────────────────────────────────────────────────────

export async function searchProducts(query: string, limit = 10): Promise<WCProduct[]> {
  const { data } = await wcFetch<WCProduct[]>(
    '/products',
    { search: query, per_page: limit, status: 'publish' },
    { revalidate: 60, tags: ['products'] },
  )
  return data
}

// ─── Sitemap helpers ──────────────────────────────────────────────────────────

export async function getAllProductSlugs(): Promise<string[]> {
  const slugs: string[] = []
  let page = 1
  while (true) {
    const { data, headers } = await wcFetch<WCProduct[]>(
      '/products',
      { per_page: 100, page, fields: 'slug', status: 'publish' },
      { revalidate: 86400, tags: ['sitemap'] },
    )
    slugs.push(...data.map(p => p.slug))
    const totalPages = parseInt(headers.get('X-WP-TotalPages') ?? '1', 10)
    if (page >= totalPages) break
    page++
  }
  return slugs
}

export async function getAllCategorySlugs(): Promise<string[]> {
  const cats = await getCategories()
  return cats.map(c => c.slug)
}
