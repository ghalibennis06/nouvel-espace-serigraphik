import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getFeaturedProducts, getCategoryTree } from '@/lib/woocommerce'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'
import ProductsSection from '@/components/home/ProductsSection'
import BuyerPathSection from '@/components/home/BuyerPathSection'
import MoroccoTrustSection from '@/components/home/MoroccoTrustSection'
import ProofFieldSection from '@/components/home/ProofFieldSection'
import { KITS as KITS_DATA } from '@/lib/data/kits'
import { getHomepageControlState } from '@/lib/homepage-settings'
import ShaderAnimation from '@/components/ui/shader-animation'
import RoiCalculator from '@/components/home/RoiCalculator'
import VoidCategoryShowcase from '@/components/home/VoidCategoryShowcase'
import FluidKitShowcase from '@/components/home/FluidKitShowcase'
import HeroIndustrialPanel from '@/components/home/HeroIndustrialPanel'
import ClosingDecisionStation from '@/components/home/ClosingDecisionStation'
import { ExpandableGallery } from '@/components/ui/expandable-gallery'

export const revalidate = 3600 // Refresh every hour; WC webhook purges on product changes

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nouvel Espace Sérigraphik — Machines & Kits d'impression au Maroc",
    description: 'Machines professionnelles, kits complets, consommables de qualité. Plus de 2 000 ateliers lancés partout au Maroc — livraison 24–48h, support WhatsApp 7j/7.',
  }
}

// ─── Static data ──────────────────────────────────────────────────────────────

const KITS = KITS_DATA

const CATEGORIES = [
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2Fpresse-40x50autoopen.jpg',         name: 'Presses à Chaud',          info: 'Manuelles, auto-ouverture, 5en1, casquette, mug',    count: 23, slug: 'les-presses-a-chaud',             recur: false },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F61gC992Xr5L.jpg',                  name: 'Consommables Sérigraphie', info: 'Antex, Inknovator, cadres alu, soies, raclettes',    count: 40, slug: 'les-consommables-de-serigraphie', recur: true  },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2025%2F01%2FINK-C.png',                        name: 'Consommables Sublimation', info: 'Encres, papiers, flex 14 couleurs, scotch thermique', count: 31, slug: 'les-consommables-de-sublimation', recur: true  },
  { img: null,                                                                                                                          name: "Machines d'Impression",   info: 'DTF, UV, traceurs grand format professionnels',      count: 8,  slug: 'les-machines-dimpression',        recur: false },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F4-couleurs-4-stations-pro.jpg',    name: 'Machines de Sérigraphie', info: 'Carrousels 1C à 4C, insolation, séchoirs tunnel',    count: 14, slug: 'les-machines-de-serigraphie',     recur: false },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2FSH02.png',                         name: 'Produits Sublimables',    info: 'Mugs, cadres marbre, coussins, porte-clés',           count: 52, slug: 'les-produits-sublimables',        recur: false },
]

// Hero product collage — 4 real product photos
const HERO_PHOTOS = [
  { src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2Fpresse-40x50autoopen.jpg', alt: 'Presse à chaud 40×50' },
  { src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2FSH02.png',                alt: 'Mug sublimable' },
  { src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2025%2F01%2FINK-C.png',               alt: 'Encres sublimation' },
  { src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F4-couleurs-4-stations-pro.jpg', alt: 'Carrousel sérigraphie' },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const [homepageControl, , products] = await Promise.all([
    getHomepageControlState(),
    getCategoryTree(),
    getFeaturedProducts(12),
  ])

  const categoriesBySlug = new Map(CATEGORIES.map((category) => [category.slug, category]))
  const spotlightCategories = homepageControl.spotlightCategorySlugs
    .map((slug) => categoriesBySlug.get(slug))
    .filter((category): category is (typeof CATEGORIES)[number] => Boolean(category))
  const visibleCategories = spotlightCategories.length > 0 ? spotlightCategories : CATEGORIES

  const productsBySlug = new Map(products.map((product) => [product.slug, product]))
  const spotlightProducts = homepageControl.spotlightProductSlugs
    .map((slug) => productsBySlug.get(slug))
    .filter((product): product is (typeof products)[number] => Boolean(product))
  const visibleProducts = spotlightProducts.length > 0 ? spotlightProducts : products

  const kitsById = new Map(KITS.map((kit) => [kit.id, kit]))
  const spotlightKits = homepageControl.spotlightKitIds
    .map((id) => kitsById.get(id))
    .filter((kit): kit is (typeof KITS)[number] => Boolean(kit))
  const visibleKits = spotlightKits.length > 0 ? spotlightKits : KITS

  return (
    <div style={{ background: 'var(--bg)' }}>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <ShaderAnimation
        overlayOpacity={0.82}
        overlayColor="rgba(255,255,255,1)"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <HeroIndustrialPanel
          locale={locale}
          photos={HERO_PHOTOS}
          title={homepageControl.heroTitle}
          subtitle={homepageControl.heroSubtitle}
          primaryCtaLabel={homepageControl.heroPrimaryCtaLabel}
          primaryCtaHref={homepageControl.heroPrimaryCtaHref}
          secondaryCtaLabel={homepageControl.heroSecondaryCtaLabel}
          secondaryCtaHref={homepageControl.heroSecondaryCtaHref}
          trustBullets={homepageControl.trustBullets}
        />
      </ShaderAnimation>

      {/* ══════════════════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
        <div className="scroll-x-hide md:flex md:justify-center" style={{ display: 'flex', alignItems: 'center', padding: '2px 5%' }}>
          {[
            { icon: '🚚', label: 'Livraison 24–48h', sub: 'partout au Maroc' },
            { icon: '🛡️', label: 'Support local', sub: 'avant et après achat' },
            { icon: '💬', label: 'Support WhatsApp', sub: 'rapide et direct' },
            { icon: '🎯', label: 'Packs de démarrage', sub: 'pour lancer' },
            { icon: '🏭', label: 'Débutants & ateliers', sub: 'premier achat au réassort' },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 18px', borderLeft: i > 0 ? '1px solid var(--border)' : 'none', flexShrink: 0 }}>
              <span style={{ fontSize: 17 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap' }}>{item.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text2)', whiteSpace: 'nowrap' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BuyerPathSection locale={locale} />

      <section style={{ background: 'var(--surface)', padding: 'clamp(44px,7vw,72px) 5%', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', alignItems: 'start' }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <span className="stag">Simulez avant d’acheter</span>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              Estimez ce que votre atelier peut réellement générer.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, marginTop: 14, maxWidth: 620 }}>
              Avant de choisir une technique ou un kit, projetez votre volume, votre prix moyen et votre rythme de travail. C’est une bonne manière de sortir du flou et de parler concret avec NES.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
              {[
                'comparez sublimation, sérigraphie et DTF',
                'visualisez une estimation simple de chiffre d’affaires',
                'transformez la simulation en message WhatsApp prêt à envoyer',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--green)', fontWeight: 800, flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <RoiCalculator variant="hero" />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 20, alignItems: 'center' }}>
            <Link
              href={`/${locale}/kits`}
              className="btn-orange"
              style={{ padding: '13px 22px', fontSize: 14, fontWeight: 800 }}
            >
              Voir les kits correspondants →
            </Link>
            <span style={{ fontSize: 13, color: 'var(--text2)' }}>
              ou{' '}
              <a
                href={whatsappGeneralLink("Bonjour NES, j'ai simulé mon activité et je voudrais en discuter pour choisir le bon kit.")}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--green)', fontWeight: 700, textDecoration: 'none' }}
              >
                discuter directement sur WhatsApp
              </a>
            </span>
          </div>
        </div>
      </section>

      <VoidCategoryShowcase locale={locale} categories={visibleCategories} />

      <MoroccoTrustSection locale={locale} />

      {/* ══════════════════════════════════════════════════════
          GALLERY
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--surface)', padding: 'clamp(40px,6vw,72px) 5%', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 28 }}>
            <span className="stag">Galerie produits</span>
            <h2 style={{ fontSize: 'clamp(26px,3vw,38px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
              Machines, kits et consommables NES
            </h2>
          </div>
          <ExpandableGallery
            images={[
              '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2Fpresse-40x50autoopen.jpg',
              '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2FSH02.png',
              '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2025%2F01%2FINK-C.png',
              '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F4-couleurs-4-stations-pro.jpg',
              '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F61gC992Xr5L.jpg',
              '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2FINK-C.png',
            ]}
          />
        </div>
      </section>

      <ProofFieldSection locale={locale} />

      {/* ══════════════════════════════════════════════════════
          BEST SELLERS (avec filtres)
      ══════════════════════════════════════════════════════ */}
      <ProductsSection products={visibleProducts} locale={locale} />

      <FluidKitShowcase locale={locale} kits={visibleKits} />

      <ClosingDecisionStation locale={locale} />

    </div>
  )
}
