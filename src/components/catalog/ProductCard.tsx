import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { WCProduct } from '@/lib/types'
import {
  formatPrice,
  getDiscountPercent,
  getStockLabel,
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

export default function ProductCard({ product, locale, priority = false }: ProductCardProps) {
  const t = useTranslations('product')

  const {
    name, slug, price, regular_price, sale_price, on_sale,
    stock_status, stock_quantity, featured, total_sales,
    images, short_description, average_rating, rating_count,
    categories,
  } = product

  const href         = productHref(slug, locale)
  const imageSrc     = getProductImage(product)
  const { label: stockLabel, color: stockColor } = getStockLabel(stock_status, stock_quantity)
  const discountPct  = getDiscountPercent(regular_price, sale_price)
  const descText     = truncate(stripHtml(short_description || ''), 80)

  // Badge logic
  const isNew        = new Date(product.date_created) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const isBestseller = total_sales > 50
  const isPro        = categories.some(c => c.slug.includes('pro') || c.slug.includes('machine'))

  const stockColorMap = {
    green: 'bg-brand-green',
    amber: 'bg-brand-amber',
    red:   'bg-red-500',
  }

  return (
    <article className="product-card group flex flex-col">
      {/* Image zone */}
      <div className="relative bg-white overflow-hidden aspect-square">
        <Link href={href} className="block w-full h-full">
          <Image
            src={imageSrc}
            alt={images[0]?.alt || name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {on_sale && discountPct > 0 && (
            <span className="badge-red">-{discountPct}%</span>
          )}
          {isBestseller && !on_sale && (
            <span className="badge-navy">⭐ Best-seller</span>
          )}
          {isNew && !isBestseller && (
            <span className="badge-green">Nouveau</span>
          )}
          {isPro && (
            <span className="badge-amber">PRO</span>
          )}
        </div>

        {/* Quick WhatsApp overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 bg-navy-900/90 backdrop-blur-sm">
          <a
            href={whatsappProductLink(name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white"
          >
            <svg className="w-3.5 h-3.5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
            </svg>
            Commander via WhatsApp
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5 flex flex-col flex-1">
        {/* Category tag */}
        {categories[0] && (
          <span className="text-2xs font-bold uppercase tracking-wider text-gray-400 mb-1">
            {categories[0].name}
          </span>
        )}

        {/* Name */}
        <Link href={href} className="font-semibold text-sm text-navy-900 hover:text-brand-red transition-colors line-clamp-2 leading-snug mb-1.5">
          {name}
        </Link>

        {/* Rating */}
        {rating_count > 0 && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className={`w-3 h-3 ${i <= Math.round(Number(average_rating)) ? 'text-brand-amber' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="text-2xs text-gray-400">({rating_count})</span>
          </div>
        )}

        {/* Description */}
        {descText && (
          <p className="text-xs text-gray-500 leading-relaxed mb-2 line-clamp-2 flex-1">
            {descText}
          </p>
        )}

        {/* Stock */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className={`stock-dot ${stockColorMap[stockColor]}`} />
          <span className={`text-xs font-medium ${
            stockColor === 'green' ? 'text-brand-green' :
            stockColor === 'amber' ? 'text-orange-600' : 'text-red-500'
          }`}>
            {stockLabel}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          {on_sale && sale_price ? (
            <>
              <span className="text-lg font-black text-navy-900">{formatPrice(sale_price)}</span>
              <span className="text-sm text-gray-400 line-through">{formatPrice(regular_price)}</span>
            </>
          ) : price && price !== '0' ? (
            <span className="text-lg font-black text-navy-900">{formatPrice(price)}</span>
          ) : (
            <span className="text-sm font-semibold text-brand-red">Sur devis / Nous contacter</span>
          )}
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <Link
            href={href}
            className="flex-1 btn-secondary text-xs py-2 px-3"
          >
            {t('askPrice')}
          </Link>
          <a
            href={whatsappProductLink(name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg transition-colors flex-shrink-0"
            aria-label="Commander via WhatsApp"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}
