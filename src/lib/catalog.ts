/**
 * Catalogue — source de vérité NEON (autonome, zéro dépendance WordPress).
 *
 * Remplace l'ancien client WooCommerce. Les fonctions renvoient les mêmes formes
 * (WCProduct / WCCategory) pour que tout le storefront fonctionne sans modification.
 * Repli automatique sur le catalogue statique tant que Neon est vide / non
 * configuré / en erreur (voir useStatic) — le site public n'est jamais cassé.
 */
import type { WCProduct, WCCategory, WCVariation, ProductFilters, PaginationMeta } from './types'
import { sql, isDatabaseConfigured } from './db'
import * as StaticData from './data'

type Row = Record<string, unknown>

// Résilience démo/transition : tant que Neon n'est pas configuré OU que le
// catalogue n'a pas encore été importé (table vide), OU en cas d'erreur DB,
// on sert le catalogue statique (124 produits) — le site public n'est jamais vide.
async function useStatic(): Promise<boolean> {
  if (!isDatabaseConfigured()) return true
  try {
    const r = (await sql`SELECT EXISTS(SELECT 1 FROM nes_products WHERE active = true) AS e`) as Row[]
    return !r[0]?.e
  } catch {
    return true
  }
}

// Stable numeric id derived from the uuid (les types WC attendent un number).
// Le même hash md5→int28 est calculé dans les deux sens (mapping & related).

function mapProduct(r: Row): WCProduct {
  const price = r.public_price != null ? String(r.public_price) : (r.price != null ? String(r.price) : '')
  const img = r.image_url ? String(r.image_url) : ''
  return {
    id: Number(r.ref_id),
    name: String(r.name_fr ?? ''),
    slug: String(r.product_slug ?? ''),
    permalink: `/produit/${r.product_slug}`,
    type: 'simple',
    status: 'publish',
    description: String(r.description ?? ''),
    short_description: String(r.description ?? '').slice(0, 160),
    sku: String(r.sku ?? ''),
    price,
    regular_price: price,
    sale_price: '',
    on_sale: false,
    purchasable: true,
    total_sales: 0,
    stock_status: (String(r.stock_status ?? 'instock')) as WCProduct['stock_status'],
    stock_quantity: r.stock_qty != null ? Number(r.stock_qty) : null,
    manage_stock: true,
    featured: Boolean(r.featured),
    categories: r.cat_ref ? [{ id: Number(r.cat_ref), name: String(r.cat_name ?? ''), slug: String(r.cat_slug ?? '') }] : [],
    tags: [],
    images: img ? [{ id: 0, src: img, name: String(r.name_fr ?? ''), alt: String(r.name_fr ?? '') }] : [],
    attributes: [],
    variations: [],
    related_ids: [],
    average_rating: '0',
    rating_count: 0,
    date_created: String(r.created_at ?? ''),
    date_modified: String(r.created_at ?? ''),
  }
}

function mapCategory(r: Row): WCCategory {
  return {
    id: Number(r.ref_id),
    name: String(r.name_fr ?? ''),
    slug: String(r.slug ?? ''),
    parent: 0,
    description: '',
    display: 'default',
    image: null,
    menu_order: 0,
    count: Number(r.count ?? 0),
  }
}

// ─── Categories ───────────────────────────────────────────────────────────────
export async function getCategories(parent?: number): Promise<WCCategory[]> {
  if (await useStatic()) {
    const cats = StaticData.staticGetCategories()
    return parent !== undefined ? cats.filter(c => c.parent === parent) : cats
  }
  if (parent !== undefined && parent !== 0) return [] // catalogue plat pour l'instant
  const rows = (await sql`
    SELECT ('x' || substr(md5(c.id::text),1,7))::bit(28)::int AS ref_id, c.id, c.name_fr, c.slug,
           (SELECT COUNT(*)::int FROM nes_products p WHERE p.category_id = c.id AND p.active) AS count
    FROM nes_categories c ORDER BY c.name_fr
  `) as Row[]
  return rows.map(mapCategory)
}

export async function getCategoryBySlug(slug: string): Promise<WCCategory | null> {
  if (await useStatic()) return StaticData.staticGetCategoryBySlug(slug)
  const rows = (await sql`
    SELECT ('x' || substr(md5(c.id::text),1,7))::bit(28)::int AS ref_id, c.id, c.name_fr, c.slug,
           (SELECT COUNT(*)::int FROM nes_products p WHERE p.category_id = c.id AND p.active) AS count
    FROM nes_categories c WHERE c.slug = ${slug} LIMIT 1
  `) as Row[]
  return rows[0] ? mapCategory(rows[0]) : null
}

export async function getCategoryTree(): Promise<{ root: WCCategory[]; children: Map<number, WCCategory[]> }> {
  const all = await getCategories()
  return { root: all, children: new Map() }
}

// ─── Products ─────────────────────────────────────────────────────────────────
export async function getProducts(filters: ProductFilters = {}): Promise<{ products: WCProduct[]; pagination: PaginationMeta }> {
  if (await useStatic()) {
    const r = StaticData.staticGetProducts(filters)
    return { products: r.products, pagination: { total: r.pagination.total, totalPages: r.pagination.totalPages, currentPage: r.pagination.page ?? 1, perPage: r.pagination.per_page ?? 12 } }
  }
  const { category, search, orderby = 'date', page = 1, per_page = 12, in_stock } = filters
  const where: string[] = ['p.active = true']
  const params: (string | number)[] = []
  if (category) { params.push(category); where.push(`('x' || substr(md5(c.id::text),1,7))::bit(28)::int = $${params.length}`) }
  if (search)   { params.push(`%${search}%`); where.push(`p.name_fr ILIKE $${params.length}`) }
  if (in_stock) { where.push(`p.stock_qty > 0`) }
  const order = orderby === 'price' ? 'p.public_price ASC NULLS LAST'
    : orderby === 'price-desc' ? 'p.public_price DESC NULLS LAST'
    : orderby === 'popularity' ? 'p.featured DESC, p.created_at DESC'
    : 'p.created_at DESC'
  const whereSql = where.join(' AND ')

  const countRows = (await sql.query(`SELECT COUNT(*)::int AS n FROM nes_products p LEFT JOIN nes_categories c ON c.id = p.category_id WHERE ${whereSql}`, params)) as Row[]
  const total = Number(countRows[0]?.n ?? 0)

  const offset = (page - 1) * per_page
  const rows = (await sql.query(
    `SELECT ('x' || substr(md5(p.id::text),1,7))::bit(28)::int AS ref_id, p.id AS uuid, p.product_slug, p.name_fr, p.sku, p.description,
            p.public_price, p.price, p.stock_status, p.stock_qty, p.featured, p.image_url, p.tva_rate, p.created_at,
            c.name_fr AS cat_name, c.slug AS cat_slug, ('x' || substr(md5(c.id::text),1,7))::bit(28)::int AS cat_ref
     FROM nes_products p LEFT JOIN nes_categories c ON c.id = p.category_id
     WHERE ${whereSql} ORDER BY ${order} LIMIT ${per_page} OFFSET ${offset}`, params)) as Row[]

  return {
    products: rows.map(mapProduct),
    pagination: { total, totalPages: Math.max(1, Math.ceil(total / per_page)), currentPage: page, perPage: per_page },
  }
}

export async function getProductBySlug(slug: string): Promise<WCProduct | null> {
  if (await useStatic()) return StaticData.staticGetProductBySlug(slug)
  const rows = (await sql.query(
    `SELECT ('x' || substr(md5(p.id::text),1,7))::bit(28)::int AS ref_id, p.id AS uuid, p.product_slug, p.name_fr, p.sku, p.description,
            p.public_price, p.price, p.stock_status, p.stock_qty, p.featured, p.image_url, p.tva_rate, p.created_at,
            c.name_fr AS cat_name, c.slug AS cat_slug, ('x' || substr(md5(c.id::text),1,7))::bit(28)::int AS cat_ref
     FROM nes_products p LEFT JOIN nes_categories c ON c.id = p.category_id WHERE p.product_slug = $1 LIMIT 1`, [slug])) as Row[]
  return rows[0] ? mapProduct(rows[0]) : null
}

export async function getFeaturedProducts(limit = 8): Promise<WCProduct[]> {
  if (await useStatic()) return StaticData.staticGetFeaturedProducts(limit)
  const rows = (await sql.query(
    `SELECT ('x' || substr(md5(p.id::text),1,7))::bit(28)::int AS ref_id, p.id AS uuid, p.product_slug, p.name_fr, p.sku, p.description,
            p.public_price, p.price, p.stock_status, p.stock_qty, p.featured, p.image_url, p.tva_rate, p.created_at,
            c.name_fr AS cat_name, c.slug AS cat_slug, ('x' || substr(md5(c.id::text),1,7))::bit(28)::int AS cat_ref
     FROM nes_products p LEFT JOIN nes_categories c ON c.id = p.category_id
     WHERE p.active = true ORDER BY p.featured DESC, p.created_at DESC LIMIT $1`, [limit])) as Row[]
  return rows.map(mapProduct)
}

export async function getRelatedProducts(productId: number, limit = 4): Promise<WCProduct[]> {
  if (await useStatic()) {
    const product = StaticData.PRODUCTS_BY_ID.get(productId)
    return product ? StaticData.staticGetRelatedProducts(product, limit) : []
  }
  const rows = (await sql.query(
    `WITH target AS (
       SELECT category_id FROM nes_products p WHERE ('x' || substr(md5(p.id::text),1,7))::bit(28)::int = $1
     )
     SELECT ('x' || substr(md5(p.id::text),1,7))::bit(28)::int AS ref_id, p.id AS uuid, p.product_slug, p.name_fr, p.sku, p.description,
            p.public_price, p.price, p.stock_status, p.stock_qty, p.featured, p.image_url, p.tva_rate, p.created_at,
            c.name_fr AS cat_name, c.slug AS cat_slug, ('x' || substr(md5(c.id::text),1,7))::bit(28)::int AS cat_ref
     FROM nes_products p LEFT JOIN nes_categories c ON c.id = p.category_id
     WHERE p.active = true AND p.category_id = (SELECT category_id FROM target)
       AND ('x' || substr(md5(p.id::text),1,7))::bit(28)::int <> $1
     ORDER BY p.featured DESC, p.created_at DESC LIMIT $2`, [productId, limit])) as Row[]
  return rows.map(mapProduct)
}

// Pas de variations dans le modèle Neon (produits simples).
export async function getVariations(_productId: number): Promise<WCVariation[]> {
  return []
}

export async function searchProducts(query: string, limit = 10): Promise<WCProduct[]> {
  if (await useStatic()) return StaticData.staticSearchProducts(query, limit)
  const rows = (await sql.query(
    `SELECT ('x' || substr(md5(p.id::text),1,7))::bit(28)::int AS ref_id, p.id AS uuid, p.product_slug, p.name_fr, p.sku, p.description,
            p.public_price, p.price, p.stock_status, p.stock_qty, p.featured, p.image_url, p.tva_rate, p.created_at,
            c.name_fr AS cat_name, c.slug AS cat_slug, ('x' || substr(md5(c.id::text),1,7))::bit(28)::int AS cat_ref
     FROM nes_products p LEFT JOIN nes_categories c ON c.id = p.category_id
     WHERE p.active = true AND p.name_fr ILIKE $1 LIMIT $2`, [`%${query}%`, limit])) as Row[]
  return rows.map(mapProduct)
}

// ─── Sitemap helpers ──────────────────────────────────────────────────────────
export async function getAllProductSlugs(): Promise<string[]> {
  if (await useStatic()) return StaticData.staticGetAllProductSlugs()
  const rows = (await sql`SELECT product_slug FROM nes_products WHERE active = true`) as Row[]
  return rows.map(r => String(r.product_slug))
}

export async function getAllCategorySlugs(): Promise<string[]> {
  if (await useStatic()) return StaticData.staticGetAllCategorySlugs()
  const rows = (await sql`SELECT slug FROM nes_categories`) as Row[]
  return rows.map(r => String(r.slug))
}
