import Image from 'next/image'
import Link from 'next/link'
import type { WCProduct } from '@/lib/types'
import {
  formatPrice,
  getDiscountPercent,
  getProductImage,
  productHref,
  whatsappProductLink,
} from '@/lib/utils'

interface ProductCardProps {
  product: WCProduct
  locale: string
  priority?: boolean
}

const WA_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

export default function ProductCard({ product, locale, priority = false }: ProductCardProps) {
  const { name, slug, price, regular_price, sale_price, on_sale, stock_status, featured, total_sales, images, categories } = product

  const href        = productHref(slug, locale)
  const imageSrc    = getProductImage(product)
  const discountPct = getDiscountPercent(regular_price, sale_price)
  const inStock     = stock_status === 'instock'
  const isBestseller = (total_sales ?? 0) > 50

  const badge = on_sale && discountPct > 0
    ? { text: `-${discountPct}%`, bg: 'var(--orange)', color: '#fff' }
    : isBestseller
    ? { text: 'Best-seller', bg: 'var(--blue)', color: '#fff' }
    : featured
    ? { text: 'PRO', bg: 'var(--blue)', color: '#fff' }
    : null

  return (
    <article
      className="card-dark-hover"
      style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all .2s', boxShadow: 'var(--shadow)' }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', aspectRatio: '1/1', background: 'var(--surface)', overflow: 'hidden' }}>
        <Link href={href} style={{ display: 'block', width: '100%', height: '100%' }}>
          <Image
            src={imageSrc}
            alt={images[0]?.alt || name}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            style={{ objectFit: 'contain', padding: 12, transition: 'transform .3s' }}
            className="group-hover:scale-105"
            priority={priority}
          />
        </Link>

        {badge && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: badge.bg, color: badge.color, fontSize: 10, fontWeight: 800, padding: '3px 9px', borderRadius: 20, letterSpacing: '0.04em' }}>
            {badge.text}
          </div>
        )}

        {!inStock && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.80)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', background: 'var(--card)', border: '1px solid var(--border2)', padding: '5px 14px', borderRadius: 20 }}>
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {categories[0] && (
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 5 }}>
            {categories[0].name}
          </span>
        )}

        <Link
          href={href}
          style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', lineHeight: 1.35, marginBottom: 'auto', textDecoration: 'none', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {name}
        </Link>

        {/* Price + stock */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '12px 0', gap: 8 }}>
          <div>
            {on_sale && sale_price ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--orange)' }}>{formatPrice(sale_price)}</span>
                <span style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'line-through' }}>{formatPrice(regular_price)}</span>
              </div>
            ) : price && price !== '0' ? (
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{formatPrice(price)}</span>
            ) : (
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)' }}>Sur devis</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: inStock ? 'var(--green)' : 'var(--text3)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: inStock ? 'var(--green)' : 'var(--text3)', flexShrink: 0 }} />
            {inStock ? 'En stock' : 'Indisponible'}
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            href={href}
            style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '9px 10px', border: '1.5px solid var(--border2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, borderRadius: 8, textDecoration: 'none', transition: 'border-color .2s, color .2s', background: 'transparent' }}
            className="link-blue"
          >
            Voir le produit
          </Link>
          <a
            href={whatsappProductLink(name)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: 38, height: 38, background: 'var(--green)', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, textDecoration: 'none' }}
            aria-label="Commander via WhatsApp"
          >
            {WA_ICON}
          </a>
        </div>
      </div>
    </article>
  )
}
