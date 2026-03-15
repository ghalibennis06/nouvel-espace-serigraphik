import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { WCProduct } from './types'

// ─── Tailwind class merge ─────────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Price formatting ─────────────────────────────────────────────────────────
export function formatPrice(price: string | number | null | undefined, locale = 'fr-MA'): string {
  if (!price || price === '' || price === '0') return 'Sur devis'
  const num = typeof price === 'string' ? parseFloat(price) : price
  if (isNaN(num) || num === 0) return 'Sur devis'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 2,
  }).format(num)
}

// ─── Discount percentage ──────────────────────────────────────────────────────
export function getDiscountPercent(regular: string, sale: string): number {
  const reg  = parseFloat(regular)
  const sal  = parseFloat(sale)
  if (!reg || !sal || sal >= reg) return 0
  return Math.round(((reg - sal) / reg) * 100)
}

// ─── Stock label ──────────────────────────────────────────────────────────────
export function getStockLabel(
  status: WCProduct['stock_status'],
  qty: number | null,
): { label: string; color: 'green' | 'amber' | 'red' } {
  if (status === 'outofstock')   return { label: 'Rupture de stock', color: 'red' }
  if (status === 'onbackorder')  return { label: 'Sur commande',     color: 'amber' }
  if (qty !== null && qty <= 5)  return { label: `Dernières pièces (${qty})`, color: 'amber' }
  return { label: 'En stock',                                          color: 'green' }
}

// ─── Truncate HTML ────────────────────────────────────────────────────────────
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

// ─── WooCommerce image fallback ───────────────────────────────────────────────
export function getProductImage(product: WCProduct): string {
  return product.images?.[0]?.src ?? '/images/placeholder.png'
}

// ─── Slug utilities ───────────────────────────────────────────────────────────
export function categoryHref(slug: string, locale: string): string {
  return `/${locale}/categorie-produit/${slug}`
}

export function productHref(slug: string, locale: string): string {
  return `/${locale}/produit/${slug}`
}

// ─── WhatsApp helpers ─────────────────────────────────────────────────────────
export function whatsappProductLink(productName: string): string {
  const msg = encodeURIComponent(`Bonjour, je suis intéressé par : ${productName}. Pouvez-vous me donner plus d'informations ?`)
  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '212522448090'
  return `https://wa.me/${num}?text=${msg}`
}

export function whatsappGeneralLink(message?: string): string {
  const msg = encodeURIComponent(message ?? 'Bonjour, je souhaite obtenir des informations sur vos produits.')
  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '212522448090'
  return `https://wa.me/${num}?text=${msg}`
}
