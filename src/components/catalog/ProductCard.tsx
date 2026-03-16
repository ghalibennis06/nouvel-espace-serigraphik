import Image from 'next/image'
import Link from 'next/link'
import type { WCProduct } from '@/lib/types'
import {
  formatPrice,
  getDiscountPercent,
  getProductImage,
  productHref,
  stripHtml,
  truncate,
  whatsappProductLink,
} from '@/lib/utils'

interface ProductCardProps {
  product: WCProduct
  locale: string
  priority?: boolean
}

const WA_ICON = (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

export default function ProductCard({ product, locale, priority = false }: ProductCardProps) {
  const {
    name, slug, price, regular_price, sale_price, on_sale,
    stock_status, featured, total_sales, images, short_description, categories,
  } = product

  const href        = productHref(slug, locale)
  const imageSrc    = getProductImage(product)
  const discountPct = getDiscountPercent(regular_price, sale_price)
  const descText    = truncate(stripHtml(short_description || ''), 70)

  const isNew        = new Date(product.date_created) > new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
  const isBestseller = (total_sales ?? 0) > 50
  const inStock      = stock_status === 'instock'

  // Pick one badge (priority: sale > bestseller > new)
  const badge = on_sale && discountPct > 0
    ? { text: `-${discountPct}%`, cls: 'bg-brand-red text-white' }
    : isBestseller
    ? { text: '⭐ Best-seller', cls: 'bg-navy-900 text-brand-amber' }
    : isNew
    ? { text: 'Nouveau', cls: 'bg-brand-green text-white' }
    : featured
    ? { text: 'PRO', cls: 'bg-brand-amber text-navy-900' }
    : null

  return (
    <article className="product-card group flex flex-col bg-white">

      {/* ── Image zone ─────────────────────────────────────────── */}
      <div className="relative bg-white overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        <Link href={href} className="block w-full h-full">
          <Image
            src={imageSrc}
            alt={images[0]?.alt || name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        </Link>

        {/* Badge */}
        {badge && (
          <div className={`absolute top-2.5 left-2.5 text-2xs font-black px-2.5 py-1 rounded-lg ${badge.cls}`}>
            {badge.text}
          </div>
        )}

        {/* Stock out overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-black text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
              Rupture de stock
            </span>
          </div>
        )}

        {/* WhatsApp hover CTA */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <a
            href={whatsappProductLink(name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-colors"
          >
            {WA_ICON}
            Commander via WhatsApp
          </a>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div className="p-4 flex flex-col flex-1">

        {/* Category */}
        {categories[0] && (
          <span className="text-2xs font-bold uppercase tracking-widest text-gray-400 mb-1.5">
            {categories[0].name}
          </span>
        )}

        {/* Name */}
        <Link
          href={href}
          className="font-black text-sm text-navy-900 hover:text-brand-red transition-colors line-clamp-2 leading-snug mb-2"
        >
          {name}
        </Link>

        {/* Description */}
        {descText && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3 flex-1">
            {descText}
          </p>
        )}

        {/* Price + Stock row */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {on_sale && sale_price ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-navy-900">{formatPrice(sale_price)}</span>
                <span className="text-xs text-gray-400 line-through">{formatPrice(regular_price)}</span>
              </div>
            ) : price && price !== '0' ? (
              <span className="text-lg font-black text-navy-900">{formatPrice(price)}</span>
            ) : (
              <span className="text-sm font-bold text-brand-red">Sur devis</span>
            )}
          </div>

          <div className={`flex items-center gap-1 text-2xs font-semibold ${inStock ? 'text-brand-green' : 'text-gray-400'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-brand-green' : 'bg-gray-300'}`} />
            {inStock ? 'En stock' : 'Indisponible'}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-2">
          <Link
            href={href}
            className="flex-1 inline-flex items-center justify-center py-2.5 px-3 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white text-xs font-bold rounded-xl transition-all active:scale-95"
          >
            Voir le produit
          </Link>
          <a
            href={whatsappProductLink(name)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
            aria-label="Commander via WhatsApp"
          >
            {WA_ICON}
          </a>
        </div>
      </div>
    </article>
  )
}
