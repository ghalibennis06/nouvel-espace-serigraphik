import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import {
  getProductBySlug,
  getRelatedProducts,
  getVariations,
  getAllProductSlugs,
} from '@/lib/woocommerce'
import ProductCard from '@/components/catalog/ProductCard'
import {
  formatPrice,
  getDiscountPercent,
  getStockLabel,
  categoryHref,
  whatsappProductLink,
  stripHtml,
} from '@/lib/utils'

interface PageProps {
  params: { locale: string; slug: string }
}

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs()
    return slugs.flatMap(slug => [
      { locale: 'fr', slug },
      { locale: 'ar', slug },
    ])
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: product.name,
    description: stripHtml(product.short_description || product.description).slice(0, 160),
    openGraph: {
      title: product.name,
      description: stripHtml(product.short_description || product.description).slice(0, 160),
      images: product.images?.[0] ? [{ url: product.images[0].src, alt: product.images[0].alt }] : [],
    },
  }
}

const WA_SVG = (
  <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = params
  setRequestLocale(locale)
  const t = await getTranslations('product')

  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const [relatedProducts, variations] = await Promise.all([
    getRelatedProducts(product.id, 4),
    product.type === 'variable' ? getVariations(product.id) : Promise.resolve([]),
  ])

  const {
    name, price, regular_price, sale_price, on_sale,
    stock_status, stock_quantity, images, description, short_description,
    categories, attributes, sku, average_rating, rating_count,
  } = product

  const { label: stockLabel, color: stockColor } = getStockLabel(stock_status, stock_quantity)
  const discountPct = getDiscountPercent(regular_price, sale_price)

  const stockStyles = {
    green: { bg: 'var(--tealsoft)', color: 'var(--teal)', dot: 'var(--teal)' },
    amber: { bg: 'var(--orangesoft)', color: 'var(--orange)', dot: 'var(--orange)' },
    red:   { bg: 'rgba(220,38,38,0.10)', color: '#ef4444', dot: '#ef4444' },
  }
  const ss = stockStyles[stockColor]

  const whatsappUrl = whatsappProductLink(name)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '12px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text2)' }}>
            <Link href={`/${locale}`} className="link-blue" style={{ color: 'var(--text2)', textDecoration: 'none' }}>Accueil</Link>
            {categories[0] && (
              <>
                <span style={{ color: 'var(--border2)' }}>/</span>
                <Link href={categoryHref(categories[0].slug, locale)} className="link-blue" style={{ color: 'var(--text2)', textDecoration: 'none' }}>
                  {categories[0].name}
                </Link>
              </>
            )}
            <span style={{ color: 'var(--border2)' }}>/</span>
            <span style={{ color: 'var(--text)', fontWeight: 500, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 6%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 56, alignItems: 'start' }} className="lg:grid-cols-2 grid-cols-1">

          {/* ── Gallery ─────────────────────────────────────────────── */}
          <div>
            <div style={{ position: 'relative', background: 'var(--card)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '1/1', marginBottom: 12 }}>
              {images[0] ? (
                <Image
                  src={images[0].src}
                  alt={images[0].alt || name}
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)' }}>
                  <svg style={{ width: 64, height: 64 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {on_sale && discountPct > 0 && (
                <div style={{ position: 'absolute', top: 14, left: 14, background: 'var(--orange)', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 5 }}>
                  -{discountPct}%
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                {images.slice(0, 6).map((img, i) => (
                  <div key={i} style={{
                    position: 'relative', flexShrink: 0, width: 62, height: 62, borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                    border: `2px solid ${i === 0 ? 'var(--blue)' : 'var(--border)'}`,
                    background: 'var(--card)',
                  }}>
                    <Image src={img.src} alt={img.alt || name} fill className="object-contain p-1" sizes="62px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ─────────────────────────────────────────── */}
          <div>
            {/* Categories */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              {categories.map(cat => (
                <Link key={cat.id} href={categoryHref(cat.slug, locale)}
                  style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', textDecoration: 'none' }}
                  className="link-blue">
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Name */}
            <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginBottom: 14 }}>
              {name}
            </h1>

            {/* Rating */}
            {rating_count > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ display: 'flex' }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} style={{ width: 16, height: 16, color: i <= Math.round(Number(average_rating)) ? 'var(--orange)' : 'var(--border2)' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: 'var(--text2)' }}>({rating_count} {t('reviews')})</span>
              </div>
            )}

            {/* Short description */}
            {short_description && (
              <div
                style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 20 }}
                dangerouslySetInnerHTML={{ __html: short_description }}
              />
            )}

            {/* Price */}
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
                {on_sale && sale_price ? (
                  <>
                    <span style={{ fontSize: 30, fontWeight: 800, color: 'var(--text)' }}>{formatPrice(sale_price)}</span>
                    <span style={{ fontSize: 18, color: 'var(--text2)', textDecoration: 'line-through' }}>{formatPrice(regular_price)}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, background: 'var(--orange)', color: '#fff', padding: '2px 7px', borderRadius: 4 }}>-{discountPct}%</span>
                  </>
                ) : price && price !== '0' ? (
                  <span style={{ fontSize: 30, fontWeight: 800, color: 'var(--text)' }}>{formatPrice(price)}</span>
                ) : (
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue)' }}>Prix sur demande — Contactez-nous</span>
                )}
              </div>
              {sku && (
                <p style={{ fontSize: 11, color: 'var(--text2)' }}>{t('sku')} : <span style={{ fontFamily: 'monospace' }}>{sku}</span></p>
              )}
            </div>

            {/* Stock */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, marginBottom: 20, background: ss.bg, color: ss.color }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: ss.dot, flexShrink: 0 }} />
              {stockLabel}
            </div>

            {/* Variations */}
            {variations.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text2)', display: 'block', marginBottom: 10 }}>
                  {t('selectVariant')}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {variations.map(v => {
                    const label = v.attributes.map(a => a.option).join(' · ')
                    const isOut = v.stock_status === 'outofstock'
                    return (
                      <button
                        key={v.id}
                        disabled={isOut}
                        style={{
                          padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: isOut ? 'not-allowed' : 'pointer', transition: 'border-color .15s',
                          background: isOut ? 'transparent' : 'var(--card)',
                          color: isOut ? 'var(--border2)' : 'var(--text)',
                          border: `1px solid ${isOut ? 'var(--border)' : 'var(--border2)'}`,
                        }}
                      >
                        {label}{isOut && ' (N/A)'}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* CTA Block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none', transition: 'background .15s' }}
              >
                {WA_SVG}
                {t('contactWhatsApp')}
              </a>
              <Link
                href={`/${locale}/contact?product=${encodeURIComponent(name)}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px', border: '1px solid var(--bluesoft2)', color: 'var(--blue)', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'border-color .15s, background .15s' }}
                className="link-blue"
              >
                📋 {t('quoteRequest')}
              </Link>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? '+212522448090'}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', border: '1px solid var(--border)', color: 'var(--text2)', borderRadius: 8, fontSize: 13, textDecoration: 'none', transition: 'border-color .15s' }}
              >
                📞 Appeler pour commander
              </a>
            </div>

            {/* Micro-trust */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
              {['🚚 Livraison 48h', '📦 Stock local', '🧾 Facture pro', '🔄 Retour 14j'].map(item => (
                <span key={item} style={{ fontSize: 12, color: 'var(--text2)' }}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description & Attributes ───────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: attributes.length > 0 ? '2fr 1fr' : '1fr', gap: 20, marginBottom: 56 }} className="lg:grid-cols-3">
          {/* Description */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 28, gridColumn: attributes.length > 0 ? '1 / 3' : undefined }} className={attributes.length > 0 ? 'lg:col-span-2' : ''}>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
              {t('description')}
            </h2>
            <div
              style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.75 }}
              dangerouslySetInnerHTML={{ __html: description || '<p>Aucune description disponible.</p>' }}
            />
          </div>

          {/* Specifications */}
          {attributes.length > 0 && (
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 28 }}>
              <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
                {t('specifications')}
              </h2>
              <dl style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {attributes.map(attr => (
                  <div key={attr.id}>
                    <dt style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text2)', marginBottom: 3 }}>{attr.name}</dt>
                    <dd style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{attr.options.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* ── Related Products ───────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>
              {t('relatedProducts')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky mobile CTA ──────────────────────────────────────────── */}
      <div className="sm:hidden" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '12px 16px', display: 'flex', gap: 10, zIndex: 40, paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <Link
          href={`/${locale}/contact?product=${encodeURIComponent(name)}`}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px', border: '1px solid var(--bluesoft2)', color: 'var(--blue)', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
        >
          Devis
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
        >
          💬 Commander
        </a>
      </div>
    </div>
  )
}
