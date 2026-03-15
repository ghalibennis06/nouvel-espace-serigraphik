import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { getFeaturedProducts, getCategoryTree } from '@/lib/woocommerce'
import ProductCard from '@/components/catalog/ProductCard'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'site' })
  return {
    title: t('name'),
    description: t('description'),
  }
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const [t, th, tc, tt, { root: categories }, featuredProducts] = await Promise.all([
    getTranslations('home'),
    getTranslations('trust'),
    getTranslations('cta'),
    getTranslations('site'),
    getCategoryTree(),
    getFeaturedProducts(8),
  ])

  // Category visual config (icons per category type)
  const categoryIcons: Record<string, string> = {
    default: '📦',
  }
  const categoryColors: string[] = [
    'from-navy-900 to-navy-800',
    'from-red-700 to-red-900',
    'from-gray-700 to-gray-900',
    'from-blue-700 to-blue-900',
    'from-emerald-700 to-emerald-900',
    'from-purple-700 to-purple-900',
  ]

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-navy-900 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand-red/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-red/20 border border-brand-red/30 rounded-full text-brand-red text-xs font-bold mb-6">
              <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
              {t('heroBadge')}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              {t('heroTitle')}
            </h1>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
              {t('heroSubtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/${locale}/categorie-produit`} className="btn-primary px-6 py-3 text-sm">
                🗂️ {t('heroCtaPrimary')}
              </Link>
              <a
                href={whatsappGeneralLink('Bonjour, je souhaite un devis professionnel.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-6 py-3 text-sm"
              >
                💬 {t('heroCtaSecondary')}
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { num: '40+', label: 'Produits' },
                { num: '6',   label: 'Marques' },
                { num: '48h', label: 'Livraison' },
                { num: '10+', label: 'Ans d\'expérience' },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-brand-amber">{s.num}</div>
                  <div className="text-2xs text-gray-500 uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ───────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {[
              { icon: '🏭', title: th('officialImporter'), sub: th('officialImporterDesc') },
              { icon: '🚚', title: th('fastDelivery'),      sub: th('fastDeliveryDesc') },
              { icon: '📦', title: th('localStock'),        sub: th('localStockDesc') },
              { icon: '💬', title: th('whatsappSupport'),   sub: th('whatsappSupportDesc') },
              { icon: '🧾', title: th('proInvoice'),         sub: th('proInvoiceDesc') },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="text-xs font-bold text-navy-900">{item.title}</div>
                  <div className="text-2xs text-gray-400">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-navy-900">{t('categoriesTitle')}</h2>
          <p className="text-sm text-gray-500 mt-1">{t('categoriesSubtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={categoryHref(cat.slug, locale)}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${
                categoryColors[i % categoryColors.length]
              } p-6 min-h-[140px] flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-card-hover`}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                {cat.image && (
                  <Image
                    src={cat.image.src}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}
              </div>

              <div className="relative">
                <span className="text-3xl mb-3 block">
                  {categoryIcons[cat.slug] ?? '📦'}
                </span>
                <h3 className="font-bold text-white text-sm leading-snug mb-1">{cat.name}</h3>
                <p className="text-2xs text-white/60">{cat.count} produits</p>
              </div>

              <div className="relative flex items-center gap-1 text-2xs font-bold text-white/80 group-hover:text-white transition-colors mt-4">
                {tc('viewCategory')}
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-navy-900">{t('featuredTitle')}</h2>
                <p className="text-sm text-gray-500 mt-1">{t('featuredSubtitle')}</p>
              </div>
              <Link href={`/${locale}/categorie-produit`} className="btn-ghost text-sm hidden sm:flex">
                {t('seeAll')} →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  priority={i < 4}
                />
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link href={`/${locale}/categorie-produit`} className="btn-outline text-sm">
                {t('seeAll')}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── B2B PRO QUOTE SECTION ──────────────────────────────────────── */}
      <section className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="badge-amber mb-4">ACHETEURS PROFESSIONNELS</div>
            <h2 className="text-2xl font-black text-white mb-3">
              Commandes en volume ? Nous avons vos tarifs.
            </h2>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Importateur direct, nous proposons des tarifs dégressifs à partir de 5 unités.
              Obtenez votre devis personnalisé en moins de 2 heures.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              {['-5% dès 5 unités', '-10% dès 10', '-15% dès 20', '-20% dès 50'].map(tier => (
                <div key={tier} className="bg-white/10 rounded-lg px-3 py-1.5 text-sm font-bold text-white">
                  {tier}
                </div>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col gap-3 w-full lg:w-auto">
            <a
              href={whatsappGeneralLink('Bonjour, je souhaite un devis pour une commande en volume.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-8 py-3 w-full lg:w-auto justify-center"
            >
              💬 Devis WhatsApp rapide
            </a>
            <Link href={`/${locale}/contact`} className="btn-outline border-gray-600 text-gray-300 hover:bg-white/10 px-8 py-3 justify-center">
              Formulaire de devis
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRANDS STRIP ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-2xs font-bold text-center text-gray-400 uppercase tracking-widest mb-6">
            Marques partenaires officielles
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['ANTEX', 'INKNOVATOR', 'FREESUB', 'IPRESS', 'SEF TEXTILE', 'EPSON'].map(brand => (
              <span key={brand} className="text-sm font-black text-gray-500 tracking-widest">{brand}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
