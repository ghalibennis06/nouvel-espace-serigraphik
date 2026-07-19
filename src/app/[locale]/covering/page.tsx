import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'
import GlossColorGrid from '@/components/covering/GlossColorGrid'
import { GLOSS_COLORS } from '@/lib/data/carlas-gloss'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const url = `${SITE_URL}/${params.locale}/covering`
  const title = 'Covering automobile Maroc — Films Carlas Essential Series Gloss, pose pro'
  const description = `Covering auto au Maroc avec les films Carlas : ${GLOSS_COLORS.length}+ coloris Essential Series Gloss, pose professionnelle en atelier. Devis WhatsApp rapide — Casablanca et partout au Maroc.`
  return {
    title, description,
    keywords: ['covering auto Maroc', 'wrapping voiture Casablanca', 'film covering Carlas Maroc', 'covering gloss voiture', 'pose covering Casablanca'],
    alternates: { canonical: url, languages: { 'fr-MA': `${SITE_URL}/fr/covering`, 'ar-MA': `${SITE_URL}/ar/covering` } },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

const WA_SVG = (
  <svg style={{ width: 20, height: 20, flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

const PROCESS_STEPS = [
  { code: 'STEP-01', title: 'Choix du coloris', text: `Vous parcourez les ${GLOSS_COLORS.length}+ coloris Essential Series Gloss et sélectionnez celui qui correspond à votre véhicule.` },
  { code: 'STEP-02', title: 'Devis & planification', text: 'NES qualifie le véhicule (modèle, surfaces, état de la carrosserie) et vous envoie un devis net avec délai de pose.' },
  { code: 'STEP-03', title: 'Pose en atelier', text: 'Pose professionnelle du film Carlas : préparation, application, finitions. Le film protège la peinture d\'origine.' },
] as const

const ADVANTAGES = [
  { code: 'ADV-01', title: 'Films Carlas', desc: 'Films de covering premium, coloris gloss profonds, durabilité extérieure éprouvée.' },
  { code: 'ADV-02', title: 'Réversible', desc: 'Le covering protège la peinture d\'origine et se retire sans dommage.' },
  { code: 'ADV-03', title: 'Pose maîtrisée', desc: 'Préparation, application et finitions réalisées en atelier par NES.' },
  { code: 'ADV-04', title: 'Devis rapide', desc: 'Réponse WhatsApp avec prix et délai, sans aller-retour inutile.' },
] as const

const COMING_SOON = [
  { name: 'Séries Satin & Matte', desc: 'Finitions satinées et mates premium' },
  { name: 'Séries Chrome & Color Shift', desc: 'Finitions chrome et caméléon' },
  { name: 'PPF — Protection de peinture', desc: 'Films transparents de protection' },
  { name: 'Vitres teintées', desc: 'Films solaires automobile' },
] as const

export default function CoveringPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const waDevis = whatsappGeneralLink('Bonjour NES, je souhaite un devis covering pour mon véhicule. Modèle : ... / Coloris souhaité : ...')

  return (
    <div style={{ minHeight: '100vh', background: '#0b1016', color: '#dde3eb' }}>
      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,181,154,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 82% 18%, rgba(242,99,22,0.16) 0%, rgba(242,99,22,0.04) 30%, rgba(0,0,0,0) 58%)' }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 6% 62px', position: 'relative', zIndex: 1 }}>
          <nav style={{ fontSize: 11, color: 'rgba(228,190,177,0.62)', marginBottom: 24, display: 'flex', gap: 6, alignItems: 'center', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <Link href={`/${locale}`} style={{ color: 'rgba(228,190,177,0.62)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span style={{ color: '#ffb59a' }}>Covering auto</span>
          </nav>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid rgba(255,92,0,0.34)', background: 'rgba(255,92,0,0.1)', color: '#ffb59a', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: '#ff5c00', display: 'inline-block' }} />
            Nouveau métier NES // Films Carlas
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
            <div>
              <h1 style={{ fontSize: 'clamp(38px,5vw,74px)', lineHeight: 1.03, letterSpacing: '-0.045em', color: '#f6efe8', fontWeight: 700, marginBottom: 18, maxWidth: 760 }}>
                Covering automobile. Films Carlas, pose atelier.
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(221,227,235,0.76)', lineHeight: 1.78, maxWidth: 660, marginBottom: 28 }}>
                NES lance son deuxième métier : le covering auto avec les films Carlas.
                On démarre avec l&apos;Essential Series Gloss — {GLOSS_COLORS.length}+ coloris brillants,
                du Pure White au Liquid Gold — posés en atelier avec le même niveau d&apos;exigence
                que notre activité impression. Les autres séries arrivent ensuite.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
                <a
                  href={waDevis}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', background: '#ff5c00', color: '#521800', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
                >
                  {WA_SVG} Devis covering
                </a>
                <a
                  href="#coloris"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 20px', border: '1px solid rgba(255,181,154,0.2)', background: 'rgba(255,255,255,0.03)', color: '#dde3eb', fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
                >
                  Voir les coloris
                </a>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
                {['Films Carlas', 'Pose atelier', 'Peinture protégée', 'Devis WhatsApp'].map((item) => (
                  <span key={item} style={{ fontSize: 12, color: 'rgba(221,227,235,0.72)', fontWeight: 700, letterSpacing: '0.04em' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 20 }}>
              <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Essential Series Gloss // Dispo maintenant</div>
              <p style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)', lineHeight: 1.65, marginBottom: 14 }}>
                La série d&apos;entrée de gamme Carlas : finition brillante profonde,
                {' '}{GLOSS_COLORS.length}+ coloris répartis en 7 familles (Crystal, Metallic, Liquid Metal, Diamond…).
              </p>
              <div style={{ borderTop: '1px solid rgba(171,137,125,0.14)', paddingTop: 14 }}>
                <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>Ensuite // Le reste du catalogue</div>
                {COMING_SOON.map((item, i) => (
                  <div key={item.name} style={{ display: 'flex', gap: 10, padding: '9px 0', borderTop: i > 0 ? '1px solid rgba(171,137,125,0.12)' : 'none' }}>
                    <span style={{ color: '#ffb59a', fontWeight: 800, flexShrink: 0, fontSize: 12 }}>{`0${i + 1}`}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#f6efe8' }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(221,227,235,0.6)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 6% 8px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROCESS_STEPS.map((step) => (
            <div key={step.code} style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 20 }}>
              <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>{step.code}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#f6efe8', lineHeight: 1.15, marginBottom: 8 }}>{step.title}</div>
              <p style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)', lineHeight: 1.7 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* COLOR GRID */}
      <div id="coloris" style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 6%', scrollMarginTop: 80 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Essential Series Gloss</div>
          <h2 style={{ fontSize: 'clamp(28px,3.8vw,46px)', fontWeight: 700, color: '#f6efe8', letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: 10 }}>
            {GLOSS_COLORS.length}+ coloris gloss, un seul devis WhatsApp.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(221,227,235,0.7)', lineHeight: 1.75, maxWidth: 720 }}>
            Cliquez sur un coloris pour demander directement un devis pose avec la référence pré-remplie.
          </p>
        </div>
        <GlossColorGrid />
      </div>

      {/* WHY */}
      <div style={{ borderTop: '1px solid rgba(255,181,154,0.08)', borderBottom: '1px solid rgba(255,181,154,0.08)', background: '#111820', padding: '56px 6%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Pourquoi NES</div>
            <h2 style={{ fontSize: 'clamp(26px,3.4vw,40px)', fontWeight: 700, color: '#f6efe8', letterSpacing: '-0.03em', lineHeight: 1.08 }}>Un covering posé comme un travail d&apos;atelier, pas comme un bricolage.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADVANTAGES.map((advantage) => (
              <div key={advantage.code} style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 18 }}>
                <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>{advantage.code}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#f6efe8', marginBottom: 8 }}>{advantage.title}</div>
                <p style={{ fontSize: 12, color: 'rgba(221,227,235,0.72)', lineHeight: 1.65 }}>{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 6% 72px' }}>
        <div style={{ border: '1px solid rgba(255,92,0,0.26)', background: 'linear-gradient(180deg, rgba(255,92,0,0.12) 0%, rgba(255,255,255,0.03) 100%)', padding: 28 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-8 items-start">
            <div>
              <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Lancer le projet</div>
              <h2 style={{ fontSize: 'clamp(28px,3.8vw,46px)', fontWeight: 700, color: '#f6efe8', letterSpacing: '-0.035em', lineHeight: 1.04, marginBottom: 12 }}>
                Envoyez le modèle du véhicule et le coloris, NES chiffre la pose.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(221,227,235,0.74)', lineHeight: 1.75, maxWidth: 620 }}>
                Modèle, coloris souhaité, ville — c&apos;est tout ce qu&apos;il faut pour recevoir un devis net avec délai de pose.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
              <a
                href={waDevis}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 22px', background: '#ff5c00', color: '#521800', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
              >
                {WA_SVG} Devis covering WhatsApp
              </a>
              <Link
                href={`/${locale}/contact`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 20px', border: '1px solid rgba(255,181,154,0.2)', background: 'rgba(255,255,255,0.03)', color: '#dde3eb', fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
              >
                Formulaire contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
