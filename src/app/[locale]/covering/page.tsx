import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'
import GlossColorGrid from '@/components/covering/GlossColorGrid'
import { GLOSS_COLORS } from '@/lib/data/carlas-gloss'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const url = `${SITE_URL}/${params.locale}/covering`
  const title = 'Films covering Carlas au Maroc — fournisseur des garages & poseurs'
  const description = `Grossiste films covering Carlas au Maroc : ${GLOSS_COLORS.length}+ coloris Essential Series Gloss au rouleau, en stock à Casablanca. Prix pro pour garages et poseurs, réassort 24–48h partout au Maroc.`
  return {
    title, description,
    keywords: ['fournisseur film covering Maroc', 'grossiste covering Casablanca', 'films Carlas Maroc', 'rouleau covering prix pro', 'distributeur wrap Maroc', 'film covering garage'],
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
  { code: '01', title: 'Choisissez vos coloris', text: `${GLOSS_COLORS.length}+ références Essential Series Gloss, du Pure White au Liquid Gold. Cliquez, la référence part sur WhatsApp.` },
  { code: '02', title: 'Recevez le prix rouleau', text: 'Tarif pro selon volume, dispo temps réel du stock Casablanca, conditions réassort. Réponse rapide, sans détour.' },
  { code: '03', title: 'Livré, vous posez', text: 'Livraison 24–48h partout au Maroc. Vous posez, vos clients roulent, vous recommandez quand vous voulez.' },
] as const

const ADVANTAGES = [
  { title: 'Films Carlas officiels', desc: 'La marque que les poseurs demandent : gloss profond, conformabilité, durabilité extérieure.' },
  { title: 'Stock local, pas d\'import', desc: 'Le rouleau part de Casablanca, pas d\'attente de conteneur ni de douane à gérer.' },
  { title: 'Prix pro au volume', desc: 'Tarifs grossiste dès le premier rouleau, dégressifs quand vous montez en cadence.' },
  { title: 'Réassort 24–48h', desc: 'Un chantier imprévu ? Le coloris manquant arrive avant la fin de la préparation.' },
] as const

const FAQ = [
  { q: 'Quels prix pour les rouleaux Carlas au Maroc ?', a: 'Tarif pro selon le coloris et le volume commandé, dégressif dès plusieurs rouleaux. Envoyez les références qui vous intéressent sur WhatsApp : vous recevez la grille tarifaire pro directement.' },
  { q: 'Vous livrez partout au Maroc ?', a: 'Oui — expédition depuis notre stock de Casablanca, livraison en 24–48h sur tout le territoire. Les garages de Casa peuvent aussi retirer sur place.' },
  { q: 'Quelles séries Carlas sont disponibles ?', a: `On démarre avec l'Essential Series Gloss (${GLOSS_COLORS.length}+ coloris en 7 familles : Crystal, Metallic, Liquid Metal, Diamond…). Les séries Satin & Matte, Chrome, PPF et vitres teintées arrivent ensuite.` },
  { q: 'Je débute dans la pose, vous accompagnez ?', a: 'Oui. NES fournit 2 000+ pros de l\'impression depuis 2018 avec le même principe : du matériel sérieux et un vrai support technique. On vous oriente sur les films, les outils et les bonnes pratiques.' },
  { q: 'Il y a un minimum de commande ?', a: 'Non — le prix pro s\'applique dès le premier rouleau. Le dégressif se déclenche sur le volume.' },
  { q: 'Comment ouvrir un compte pro NES ?', a: 'Un message WhatsApp suffit : nom du garage ou de l\'atelier, ville, et ce que vous posez. On vous enregistre et vous recevez les tarifs et dispos en priorité.' },
] as const

const COMING_SOON = [
  { name: 'Séries Satin & Matte', desc: 'Finitions satinées et mates premium' },
  { name: 'Séries Chrome & Color Shift', desc: 'Finitions chrome et caméléon' },
  { name: 'PPF — Protection de peinture', desc: 'Films transparents de protection' },
  { name: 'Vitres teintées', desc: 'Films solaires automobile' },
] as const

const card: React.CSSProperties = { border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', borderRadius: 20 }

export default function CoveringPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const waRouleau = whatsappGeneralLink('[Covering] Bonjour NES, je pose du covering. Envoyez-moi les prix rouleau Carlas. Garage/atelier : ... / Ville : ...')
  const waComptePro = whatsappGeneralLink('[Covering] Bonjour NES, je veux ouvrir un compte pro covering. Garage/atelier : ... / Ville : ... / Je pose : ...')

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Distribution de films covering Carlas',
    serviceType: 'Wholesale vehicle wrap film supply',
    provider: { '@id': `${SITE_URL}#organization` },
    areaServed: { '@type': 'Country', name: 'Morocco' },
    audience: { '@type': 'BusinessAudience', name: 'Garages, ateliers de pose et professionnels du covering' },
    description: `Fourniture de films covering Carlas Essential Series Gloss au rouleau — ${GLOSS_COLORS.length}+ coloris en stock à Casablanca, livraison 24–48h au Maroc.`,
    url: `${SITE_URL}/${locale}/covering`,
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0b1016', color: '#dde3eb' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,181,154,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 82% 18%, rgba(242,99,22,0.16) 0%, rgba(242,99,22,0.04) 30%, rgba(0,0,0,0) 58%)' }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 6% 56px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, border: '1px solid rgba(255,92,0,0.34)', background: 'rgba(255,92,0,0.1)', color: '#ffb59a', fontSize: 12, fontWeight: 700, marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: '#ff5c00', display: 'inline-block' }} />
            Distributeur films Carlas · Stock Casablanca
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
            <div>
              <h1 style={{ fontSize: 'clamp(34px,4.6vw,64px)', lineHeight: 1.06, letterSpacing: '-0.04em', color: '#f6efe8', fontWeight: 800, marginBottom: 18, maxWidth: 700 }}>
                Vous posez quoi, vous ?
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(221,227,235,0.76)', lineHeight: 1.75, maxWidth: 640, marginBottom: 28 }}>
                NES fournit les garages et poseurs du Maroc en films Carlas.
                {' '}{GLOSS_COLORS.length}+ coloris Essential Series Gloss au rouleau, prix pro,
                stock à Casablanca et réassort en 24–48h. Vous posez — on s&apos;occupe du reste.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
                <a
                  href={waRouleau}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 14, background: '#ff5c00', color: '#521800', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}
                >
                  {WA_SVG} Recevoir les prix rouleau
                </a>
                <a
                  href="#coloris"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 22px', borderRadius: 14, border: '1px solid rgba(255,181,154,0.2)', background: 'rgba(255,255,255,0.03)', color: '#dde3eb', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
                >
                  Parcourir les coloris
                </a>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
                {['Prix pro dès 1 rouleau', 'Stock Casablanca', 'Réassort 24–48h', 'Support technique'].map((item) => (
                  <span key={item} style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)', fontWeight: 600 }}>
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ ...card, padding: 24 }}>
              <div style={{ fontSize: 12, color: '#ff9f6a', fontWeight: 800, marginBottom: 8 }}>Essential Series Gloss — disponible maintenant</div>
              <p style={{ fontSize: 14, color: 'rgba(221,227,235,0.72)', lineHeight: 1.65, marginBottom: 16 }}>
                La série d&apos;entrée Carlas : gloss profond, {GLOSS_COLORS.length}+ coloris
                en 7 familles (Crystal, Metallic, Liquid Metal, Diamond…).
              </p>
              <div style={{ borderTop: '1px solid rgba(171,137,125,0.14)', paddingTop: 16 }}>
                <div style={{ fontSize: 12, color: '#ff9f6a', fontWeight: 800, marginBottom: 10 }}>Et ensuite, le reste du catalogue Carlas</div>
                {COMING_SOON.map((item, i) => (
                  <div key={item.name} style={{ display: 'flex', gap: 10, padding: '9px 0', borderTop: i > 0 ? '1px solid rgba(171,137,125,0.12)' : 'none' }}>
                    <span style={{ color: '#ffb59a', fontWeight: 800, flexShrink: 0, fontSize: 13 }}>{`0${i + 1}`}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#f6efe8' }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(221,227,235,0.6)' }}>{item.desc}</div>
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
            <div key={step.code} style={{ ...card, padding: 22 }}>
              <div style={{ fontSize: 13, color: '#ff9f6a', fontWeight: 800, marginBottom: 8 }}>{step.code}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#f6efe8', lineHeight: 1.2, marginBottom: 8 }}>{step.title}</div>
              <p style={{ fontSize: 14, color: 'rgba(221,227,235,0.72)', lineHeight: 1.7 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* COLOR GRID */}
      <div id="coloris" style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 6%', scrollMarginTop: 80 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 12, color: '#ff9f6a', fontWeight: 800, marginBottom: 8 }}>Essential Series Gloss</div>
          <h2 style={{ fontSize: 'clamp(26px,3.4vw,42px)', fontWeight: 800, color: '#f6efe8', letterSpacing: '-0.035em', lineHeight: 1.08, marginBottom: 10 }}>
            {GLOSS_COLORS.length}+ coloris. Le prix rouleau en un clic.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(221,227,235,0.7)', lineHeight: 1.75, maxWidth: 720 }}>
            Cliquez sur un coloris : la référence part sur WhatsApp et vous recevez le tarif pro et la dispo.
          </p>
        </div>
        <GlossColorGrid />
      </div>

      {/* VOS POSES */}
      <div id="realisations" style={{ maxWidth: 1240, margin: '0 auto', padding: '8px 6% 56px', scrollMarginTop: 80 }}>
        <div style={{ ...card, padding: 30 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-8 items-center">
            <div>
              <div style={{ fontSize: 12, color: '#ff9f6a', fontWeight: 800, marginBottom: 8 }}>Vos poses, notre vitrine</div>
              <h2 style={{ fontSize: 'clamp(24px,3vw,36px)', fontWeight: 800, color: '#f6efe8', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 10 }}>
                Vous posez du Carlas ? On vous met en avant.
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(221,227,235,0.72)', lineHeight: 1.75, maxWidth: 560 }}>
                Envoyez les photos de vos poses : les plus belles seront publiées ici avec le nom
                de votre garage. Vos clients vous trouvent, tout le monde y gagne.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={whatsappGeneralLink('[Covering] Bonjour NES, voici des photos de mes poses en films Carlas. Garage : ... / Ville : ...')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 14, border: '1px solid rgba(255,181,154,0.2)', background: 'rgba(255,255,255,0.03)', color: '#dde3eb', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
              >
                Envoyer mes poses
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div id="faq" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 6% 56px', scrollMarginTop: 80 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#ff9f6a', fontWeight: 800, marginBottom: 8 }}>Questions de poseurs</div>
          <h2 style={{ fontSize: 'clamp(24px,3.2vw,38px)', fontWeight: 800, color: '#f6efe8', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Ce qu&apos;on nous demande avant le premier rouleau.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQ.map((item) => (
            <div key={item.q} style={{ ...card, padding: 22 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#f6efe8', marginBottom: 8, lineHeight: 1.35 }}>{item.q}</h3>
              <p style={{ fontSize: 14, color: 'rgba(221,227,235,0.72)', lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY */}
      <div style={{ borderTop: '1px solid rgba(255,181,154,0.08)', borderBottom: '1px solid rgba(255,181,154,0.08)', background: '#111820', padding: '56px 6%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: '#ff9f6a', fontWeight: 800, marginBottom: 8 }}>Pourquoi les poseurs choisissent NES</div>
            <h2 style={{ fontSize: 'clamp(24px,3.2vw,38px)', fontWeight: 800, color: '#f6efe8', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Un fournisseur qui comprend le métier.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADVANTAGES.map((advantage) => (
              <div key={advantage.title} style={{ ...card, padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#f6efe8', marginBottom: 8 }}>{advantage.title}</div>
                <p style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)', lineHeight: 1.65 }}>{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 6% 72px' }}>
        <div style={{ border: '1px solid rgba(255,92,0,0.26)', borderRadius: 24, background: 'linear-gradient(180deg, rgba(255,92,0,0.12) 0%, rgba(255,255,255,0.03) 100%)', padding: 32 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-8 items-center">
            <div>
              <div style={{ fontSize: 12, color: '#ff9f6a', fontWeight: 800, marginBottom: 8 }}>Compte pro covering</div>
              <h2 style={{ fontSize: 'clamp(26px,3.4vw,42px)', fontWeight: 800, color: '#f6efe8', letterSpacing: '-0.035em', lineHeight: 1.06, marginBottom: 12 }}>
                Ouvrez votre compte pro, posez tranquille.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(221,227,235,0.74)', lineHeight: 1.75, maxWidth: 620 }}>
                Nom du garage, ville, ce que vous posez — c&apos;est tout. Vous recevez la grille
                tarifaire pro et les dispos stock en priorité.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href={waComptePro}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 24px', borderRadius: 14, background: '#ff5c00', color: '#521800', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}
              >
                {WA_SVG} Ouvrir mon compte pro
              </a>
              <Link
                href={`/${locale}/contact`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 22px', borderRadius: 14, border: '1px solid rgba(255,181,154,0.2)', background: 'rgba(255,255,255,0.03)', color: '#dde3eb', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
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
