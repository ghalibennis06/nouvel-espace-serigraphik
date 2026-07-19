import type { Metadata } from 'next'
import Link from 'next/link'
import { Archivo } from 'next/font/google'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'
import { getHomepageControlState } from '@/lib/homepage-settings'
import { KITS } from '@/lib/data/kits'
import DualDoorHero from '@/components/home/DualDoorHero'
import { HomeMarquee, CategoryShowcase, KitShowcase, WrapColorShowcase } from '@/components/home/HomeShowcase'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-display',
})

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Grossiste impression & films covering Carlas au Maroc',
    description: 'NES fournit les pros au Maroc : machines et consommables d\'impression pour les ateliers (sérigraphie, sublimation, DTF), films covering Carlas au rouleau pour les garages et poseurs. Stock Casablanca, livraison 24–48h.',
  }
}

// ─── Static data ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: 'Presses à Chaud',          info: 'Manuelles, auto-ouverture, 5en1, casquette, mug',     count: 23, slug: 'les-presses-a-chaud' },
  { name: 'Machines de Sérigraphie',  info: 'Carrousels 1C à 4C, insolation, séchoirs tunnel',     count: 14, slug: 'les-machines-de-serigraphie' },
  { name: "Machines d'Impression",    info: 'DTF, UV, traceurs grand format professionnels',       count: 8,  slug: 'les-machines-dimpression' },
  { name: 'Consommables Sérigraphie', info: 'Antex, Inknovator, cadres alu, soies, raclettes',     count: 40, slug: 'les-consommables-de-serigraphie' },
  { name: 'Consommables Sublimation', info: 'Encres, papiers, flex 14 couleurs, scotch thermique', count: 31, slug: 'les-consommables-de-sublimation' },
  { name: 'Produits Sublimables',     info: 'Mugs, cadres marbre, coussins, porte-clés',           count: 52, slug: 'les-produits-sublimables' },
]

const STATS = [
  { value: '2 000+', label: 'pros fournis au Maroc' },
  { value: '2018',   label: 'année de fondation' },
  { value: '24–48h', label: 'livraison partout au Maroc' },
  { value: '123',    label: 'coloris Carlas en stock' },
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const control = await getHomepageControlState()

  const waAtelier = whatsappGeneralLink('Bonjour NES, je gère un atelier d\'impression. Voici ce qu\'il me faut :')
  const waPoseur = whatsappGeneralLink('[Covering] Bonjour NES, je pose du covering. Envoyez-moi les prix rouleau Carlas.')

  return (
    <div className={archivo.variable} style={{ background: 'var(--bg)', paddingBottom: 'var(--mob-bar-h, 0)' }}>

      {/* HERO — deux portes pros */}
      <DualDoorHero locale={locale} title={control.heroTitle} subtitle={control.heroSubtitle} />

      {/* MARQUEE 3D */}
      <HomeMarquee />

      {/* MÉTIER 01 — CATÉGORIES */}
      <CategoryShowcase locale={locale} categories={CATEGORIES} />

      {/* KITS REVENTE */}
      <KitShowcase locale={locale} kits={KITS} />

      {/* MÉTIER 02 — FILMS CARLAS POUR POSEURS */}
      <section style={{ background: '#0b1016', padding: 'clamp(48px,7vw,88px) 5%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 30 }}>
            <div>
              <p className="section-kicker" style={{ color: '#ff9f6a' }}>Pour les garages &amp; poseurs</p>
              <h2 className="section-title" style={{ color: '#f6efe8' }}>Vous posez quoi, vous ?</h2>
              <p style={{ fontSize: 15, color: 'rgba(221,227,235,0.7)', lineHeight: 1.7, maxWidth: 560, marginTop: 12 }}>
                Films Carlas Essential Series Gloss au rouleau, en stock à Casablanca.
                Vous posez, on fournit — prix pro, réassort en 24–48h.
              </p>
            </div>
            <Link href={`/${locale}/covering`} style={{ fontSize: 13, fontWeight: 800, color: '#ffb59a', textDecoration: 'none', paddingBottom: 6 }}>
              Les 123 coloris →
            </Link>
          </div>
          <WrapColorShowcase locale={locale} />
          <p style={{ fontSize: 13, color: 'rgba(221,227,235,0.55)', marginTop: 16 }}>
            Et 100+ autres coloris — Crystal, Metallic, Liquid Metal, Diamond, Rainbow.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: 'clamp(48px,7vw,80px) 5%', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 45%), 1fr))', maxWidth: 1240, margin: '0 auto', gap: 'clamp(24px,4vw,40px)' }}>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="stat-big">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: 'clamp(56px,8vw,100px) 5%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <p className="section-kicker">Compte pro NES</p>
          <h2 className="section-title" style={{ maxWidth: 820 }}>Dites-nous ce que vous produisez, on vous fait les prix pro.</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 30 }}>
            <a
              href={waAtelier}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
              style={{ padding: '15px 26px', fontSize: 14, fontWeight: 800, borderRadius: 14 }}
            >
              Je gère un atelier
            </a>
            <a
              href={waPoseur}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 26px', background: '#0b1016', color: '#f6efe8', fontSize: 14, fontWeight: 800, textDecoration: 'none', borderRadius: 14 }}
            >
              Je pose du covering
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
