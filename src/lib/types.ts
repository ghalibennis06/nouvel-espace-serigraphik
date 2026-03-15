// ─── WooCommerce API Response Types ──────────────────────────────────────────
// These match the WooCommerce REST API v3 schema exactly.

export interface WCImage {
  id: number
  src: string
  name: string
  alt: string
}

export interface WCCategory {
  id: number
  name: string
  slug: string
  parent: number
  description: string
  display: string
  image: WCImage | null
  menu_order: number
  count: number
}

export interface WCAttribute {
  id: number
  name: string
  position: number
  visible: boolean
  variation: boolean
  options: string[]
}

export interface WCVariation {
  id: number
  price: string
  regular_price: string
  sale_price: string
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  stock_quantity: number | null
  attributes: Array<{ id: number; name: string; option: string }>
  image: WCImage | null
}

export interface WCProduct {
  id: number
  name: string
  slug: string
  permalink: string
  type: 'simple' | 'variable' | 'grouped' | 'external'
  status: 'publish' | 'draft' | 'private'
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  stock_status: 'instock' | 'outofstock' | 'onbackorder'
  stock_quantity: number | null
  manage_stock: boolean
  featured: boolean
  categories: Array<{ id: number; name: string; slug: string }>
  tags: Array<{ id: number; name: string; slug: string }>
  images: WCImage[]
  attributes: WCAttribute[]
  variations: number[]
  related_ids: number[]
  average_rating: string
  rating_count: number
  date_created: string
  date_modified: string
}

// ─── App-level types ──────────────────────────────────────────────────────────

export type Locale = 'fr' | 'ar'

export interface Breadcrumb {
  label: string
  href?: string
}

export interface ProductFilters {
  category?: string
  search?: string
  orderby?: 'date' | 'popularity' | 'rating' | 'price' | 'price-desc'
  page?: number
  per_page?: number
  on_sale?: boolean
  in_stock?: boolean
  min_price?: string
  max_price?: string
  attribute?: string
  attribute_term?: string
}

export interface PaginationMeta {
  total: number
  totalPages: number
  currentPage: number
  perPage: number
}
