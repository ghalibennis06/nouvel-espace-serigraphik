import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
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
  whatsappGeneralLink,
  stripHtml,
} from '@/lib/utils'

interface PageProps {
  params: { locale: string; slug: string }
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs()
  return slugs.flatMap(slug => [
    { locale: 'fr', slug },
    { locale: 'ar', slug },
  ])
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

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = params
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

  const stockColorMap = {
    green: 'text-brand-green bg-green-50',
    amber: 'text-orange-600 bg-orange-50',
    red:   'text-red-500 bg-red-50',
  }
  const stockDotMap = {
    green: 'bg-brand-green',
    amber: 'bg-brand-amber',
    red:   'bg-red-500',
  }

  const whatsappUrl = whatsappProductLink(name)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Breadcrumb ────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href={`/${locale}`} className="hover:text-navy-900 transition-colors">Accueil</Link>
            {categories[0] && (
              <>
                <span>/</span>
                <Link href={categoryHref(categories[0].slug, locale)} className="hover:text-navy-900 transition-colors">
                  {categories[0].name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-navy-900 font-medium truncate max-w-[200px]">{name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-10 mb-16">

          {/* ── Gallery ─────────────────────────────────────────────── */}
          <div>
            {/* Main image */}
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 aspect-square mb-3">
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
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              {/* Discount badge */}
              {on_sale && discountPct > 0 && (
                <div className="absolute top-4 left-4 badge-red text-sm px-3 py-1">
                  -{discountPct}%
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.slice(0, 6).map((img, i) => (
                  <div key={i} className={`relative flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer transition-colors ${
                    i === 0 ? 'border-brand-red' : 'border-gray-100 hover:border-gray-300'
                  }`}>
                    <Image src={img.src} alt={img.alt || name} fill className="object-contain p-1" sizes="64px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ─────────────────────────────────────────── */}
          <div>
            {/* Categories */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {categories.map(cat => (
                <Link key={cat.id} href={categoryHref(cat.slug, locale)}
                  className="text-2xs font-bold uppercase tracking-wider text-brand-red hover:text-red-700 transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Name */}
            <h1 className="text-2xl sm:text-3xl font-black text-navy-900 leading-tight mb-3">
              {name}
            </h1>

            {/* Rating */}
            {rating_count > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className={`w-4 h-4 ${i <= Math.round(Number(average_rating)) ? 'text-brand-amber' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">({rating_count} {t('reviews')})</span>
              </div>
            )}

            {/* Short description */}
            {short_description && (
              <div
                className="text-sm text-gray-600 leading-relaxed mb-5 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: short_description }}
              />
            )}

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <div className="flex items-baseline gap-3 mb-1">
                {on_sale && sale_price ? (
                  <>
                    <span className="text-3xl font-black text-navy-900">{formatPrice(sale_price)}</span>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(regular_price)}</span>
                    <span className="badge-red">-{discountPct}%</span>
                  </>
                ) : price && price !== '0' ? (
                  <span className="text-3xl font-black text-navy-900">{formatPrice(price)}</span>
                ) : (
                  <span className="text-lg font-bold text-brand-red">Prix sur demande — Contactez-nous</span>
                )}
              </div>
              {sku && (
                <p className="text-2xs text-gray-400">{t('sku')} : <span className="font-mono">{sku}</span></p>
              )}
            </div>

            {/* Stock */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-5 ${stockColorMap[stockColor]}`}>
              <span className={`stock-dot ${stockDotMap[stockColor]}`} />
              {stockLabel}
            </div>

            {/* Variations */}
            {variations.length > 0 && (
              <div className="mb-5">
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                  {t('selectVariant')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {variations.map(v => {
                    const label = v.attributes.map(a => a.option).join(' · ')
                    return (
                      <button
                        key={v.id}
                        disabled={v.stock_status === 'outofstock'}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-colors ${
                          v.stock_status === 'outofstock'
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50'
                            : 'border-gray-200 text-gray-700 hover:border-navy-900 hover:text-navy-900 bg-white'
                        }`}
                      >
                        {label}
                        {v.stock_status === 'outofstock' && ' (N/A)'}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* CTA Block */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full py-3.5 text-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
                </svg>
                {t('contactWhatsApp')}
              </a>
              <Link
                href={`/${locale}/contact?product=${encodeURIComponent(name)}`}
                className="btn-outline w-full py-3 text-sm"
              >
                📋 {t('quoteRequest')}
              </Link>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? '+212522448090'}`}
                className="btn-ghost w-full py-2 text-sm border border-gray-200 rounded-lg justify-center"
              >
                📞 Appeler pour commander
              </a>
            </div>

            {/* Micro-trust */}
            <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-gray-100">
              {['🚚 Livraison 48h', '📦 Stock local', '🧾 Facture pro', '🔄 Retour 14j'].map(item => (
                <span key={item} className="text-xs text-gray-500 flex items-center gap-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description & Attributes ───────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {/* Description */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-black text-navy-900 mb-4">{t('description')}</h2>
            <div
              className="prose prose-sm max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: description || '<p>Aucune description disponible.</p>' }}
            />
          </div>

          {/* Specifications */}
          {attributes.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-lg font-black text-navy-900 mb-4">{t('specifications')}</h2>
              <dl className="space-y-3">
                {attributes.map(attr => (
                  <div key={attr.id} className="flex flex-col gap-0.5">
                    <dt className="text-2xs font-bold uppercase tracking-wide text-gray-400">{attr.name}</dt>
                    <dd className="text-sm text-navy-900 font-medium">{attr.options.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* ── Related Products ───────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-navy-900 mb-6">{t('relatedProducts')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky mobile CTA ──────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-3 sm:hidden z-40" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <Link href={`/${locale}/contact?product=${encodeURIComponent(name)}`}
          className="flex-1 btn-outline py-2.5 text-sm">
          Devis
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-whatsapp py-2.5 text-sm"
        >
          💬 Commander
        </a>
      </div>
    </div>
  )
}
