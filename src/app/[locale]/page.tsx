import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Archivo } from 'next/font/google'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'
import { getHomepageControlState } from '@/lib/homepage-settings'
import { KITS } from '@/lib/data/kits'
import { GLOSS_COLORS } from '@/lib/data/carlas-gloss'
import DualDoorHero from '@/components/home/DualDoorHero'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-display',
})

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return {
    // Passe par le template racine → « … | Nouvel Espace Sérigraphik » sans doublon
    title: "Machines d'impression & covering auto au Maroc",
    description: "Un atelier, deux métiers à Casablanca : machines, kits et consommables d'impression (sérigraphie, sublimation, DTF) et covering automobile films Carlas. 2 000+ ateliers équipés, livraison 24–48h.",
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

const MARQUEE = ['Sérigraphie', 'Sublimation', 'DTF', 'Presses à chaud', 'Covering auto', 'Films Carlas', '2 000+ ateliers', 'Casablanca', 'Livraison 24–48h']

const STATS = [
  { value: '2 000+', label: 'ateliers équipés au Maroc' },
  { value: '2018',   label: "année de fondation" },
  { value: '24–48h', label: 'livraison partout au Maroc' },
  { value: '123',    label: 'coloris covering en stock' },
]

const WRAP_STRIP = GLOSS_COLORS.filter((c) => c.img).slice(8, 26)

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const control = await getHomepageControlState()

  const waImpression = whatsappGeneralLink('Bonjour NES, je veux équiper mon atelier d\'impression. Voici mon besoin :')
  const waCovering = whatsappGeneralLink('[Covering] Bonjour NES, je souhaite un devis covering pour mon véhicule.')

  return (
    <div className={archivo.variable} style={{ background: 'var(--bg)', paddingBottom: 'var(--mob-bar-h, 0)' }}>

      {/* HERO — deux portes */}
      <DualDoorHero locale={locale} title={control.heroTitle} subtitle={control.heroSubtitle} />

      {/* MARQUEE */}
      <div className="nes-marquee" aria-hidden>
        {[0, 1].map((track) => (
          <div key={track} className="nes-marquee-track">
            {MARQUEE.map((item) => (
              <span key={item} className="nes-marquee-item">{item}</span>
            ))}
          </div>
        ))}
      </div>

      {/* MÉTIER 01 — CATÉGORIES */}
      <section style={{ padding: 'clamp(48px,7vw,88px) 5%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 32 }}>
            <div>
              <p className="section-kicker">Métier 01 · Impression</p>
              <h2 className="section-title">Tout l&apos;atelier,<br />rayon par rayon.</h2>
            </div>
            <Link href={`/${locale}/categorie-produit`} style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)', textDecoration: 'none', paddingBottom: 6 }}>
              Tout le catalogue →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 12 }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.slug} href={`/${locale}/categorie-produit/${cat.slug}`} className="cat-card">
                <span className="cat-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-info">{cat.info}</span>
                <span className="cat-count">{cat.count} produits</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KITS */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: 'clamp(48px,7vw,88px) 5%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 32 }}>
            <p className="section-kicker">Kits de démarrage</p>
            <h2 className="section-title">Lancez votre atelier<br />en une commande.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 12 }}>
            {KITS.map((kit) => (
              <Link key={kit.id} href={`/${locale}/kits`} className="cat-card" style={{ gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="cat-num">{kit.packNum}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)' }}>{kit.tag}</span>
                </div>
                <span className="cat-name">{kit.name.replace('Kit ', '')}</span>
                <span className="cat-info">{kit.subtitle}</span>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span className="stat-big" style={{ fontSize: 'clamp(26px,2.6vw,36px)' }}>{kit.priceDisplay}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)' }}>MAD · ROI {kit.roi}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MÉTIER 02 — COVERING */}
      <section style={{ background: '#0b1016', padding: 'clamp(48px,7vw,88px) 5%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 30 }}>
            <div>
              <p className="section-kicker" style={{ color: '#ff9f6a' }}>Métier 02 · Covering auto</p>
              <h2 className="section-title" style={{ color: '#f6efe8' }}>123 coloris.<br />Une seule voiture : la vôtre.</h2>
            </div>
            <Link href={`/${locale}/covering`} style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ffb59a', textDecoration: 'none', paddingBottom: 6 }}>
              Tous les coloris →
            </Link>
          </div>
          <Link href={`/${locale}/covering`} aria-label="Voir tous les coloris covering" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 4, textDecoration: 'none' }}>
            {WRAP_STRIP.map((c) => (
              <span key={c.name} style={{ position: 'relative', aspectRatio: '1', display: 'block', overflow: 'hidden', border: '1px solid rgba(255,181,154,0.15)' }}>
                <Image src={c.img as string} alt={`Film covering ${c.name}`} fill sizes="90px" style={{ objectFit: 'cover' }} />
              </span>
            ))}
          </Link>
          <p style={{ fontSize: 13, color: 'rgba(221,227,235,0.6)', marginTop: 18, maxWidth: 560, lineHeight: 1.7 }}>
            Films Carlas Essential Series Gloss posés en atelier. Satin, chrome et PPF arrivent ensuite.
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
        <div style={{ maxWidth: 1240, margin: '0 auto', textAlign: 'left' }}>
          <p className="section-kicker">Un message suffit</p>
          <h2 className="section-title" style={{ maxWidth: 820 }}>Dites-nous ce que vous lancez, on s&apos;occupe du reste.</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 30 }}>
            <a
              href={waImpression}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
              style={{ padding: '15px 26px', fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              WhatsApp · Impression
            </a>
            <a
              href={waCovering}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 26px', background: '#0b1016', color: '#f6efe8', fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
            >
              WhatsApp · Covering
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
