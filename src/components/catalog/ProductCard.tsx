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

  const badge = on_sale && discountPct > 0
    ? { text: `-${discountPct}%`, bg: 'var(--orange)', color: '#fff' }
    : isBestseller
    ? { text: '⭐ Best-seller', bg: 'var(--bluesoft)', color: 'var(--blue)' }
    : isNew
    ? { text: 'Nouveau', bg: 'var(--teal)', color: '#fff' }
    : featured
    ? { text: 'PRO', bg: 'var(--blue)', color: '#fff' }
    : null

  return (
    <article
      className="group flex flex-col card-dark-hover"
      style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', transition: 'border-color .2s, transform .2s' }}
    >
      {/* ── Image zone ─────────────────────────────────────────── */}
      <div style={{ position: 'relative', background: 'var(--bg)', aspectRatio: '1/1', overflow: 'hidden' }}>
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

        {badge && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: badge.bg, color: badge.color, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4, letterSpacing: '0.05em' }}>
            {badge.text}
          </div>
        )}

        {!inStock && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,8,15,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text2)', background: 'var(--card)', border: '1px solid var(--border2)', padding: '4px 12px', borderRadius: 20 }}>
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
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', background: 'var(--green)', color: '#fff', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
          >
            {WA_ICON}
            Commander via WhatsApp
          </a>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────── */}
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {categories[0] && (
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 5 }}>
            {categories[0].name}
          </span>
        )}

        <Link
          href={href}
          className="link-blue"
          style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', lineHeight: 1.35, marginBottom: 8, textDecoration: 'none', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {name}
        </Link>

        {descText && (
          <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {descText}
          </p>
        )}

        {/* Price + Stock */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            {on_sale && sale_price ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>{formatPrice(sale_price)}</span>
                <span style={{ fontSize: 12, color: 'var(--text2)', textDecoration: 'line-through' }}>{formatPrice(regular_price)}</span>
              </div>
            ) : price && price !== '0' ? (
              <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>{formatPrice(price)}</span>
            ) : (
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)' }}>Sur devis</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: inStock ? 'var(--teal)' : 'var(--text2)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: inStock ? 'var(--teal)' : 'var(--text2)', flexShrink: 0 }} />
            {inStock ? 'En stock' : 'Indisponible'}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            href={href}
            style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '8px 10px', border: '1px solid var(--border2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, borderRadius: 6, textDecoration: 'none', transition: 'border-color .2s, color .2s' }}
            className="link-blue"
          >
            Voir le produit
          </Link>
          <a
            href={whatsappProductLink(name)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 38, height: 38, background: 'var(--green)', color: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, textDecoration: 'none' }}
            aria-label="Commander via WhatsApp"
          >
            {WA_ICON}
          </a>
        </div>
      </div>
    </article>
  )
}
