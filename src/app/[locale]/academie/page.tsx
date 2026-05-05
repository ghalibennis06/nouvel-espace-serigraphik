import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Académie NES — Guides Impression Textile Maroc',
  description: 'Guides gratuits pour maîtriser la sublimation, la sérigraphie et le DTF. Apprenez les techniques pro et lancez votre atelier au Maroc.',
}

const GUIDES = [
  {
    icon: '🖨️',
    category: 'Sublimation',
    accent: 'var(--blue)',
    accentBg: 'var(--bluesoft)',
    articles: [
      { title: 'Guide Complet Sublimation Débutant', desc: 'Températures, temps de pression, supports compatibles, erreurs à éviter. Tout pour réussir dès la première impression.', level: 'Débutant', read: '8 min', slug: 'guide-sublimation-debutant' },
      { title: 'Choisir sa presse à chaud : comparatif complet', desc: '38×38 vs 40×50 vs 40×60 — quelle taille choisir selon votre activité et vos marges ?', level: 'Intermédiaire', read: '5 min', slug: 'choisir-sa-presse-a-chaud' },
      { title: 'Sublimation sur mugs : le guide zéro défaut', desc: 'Technique, température, pression, positionnement. Imprimez des mugs parfaits à chaque fois.', level: 'Débutant', read: '6 min', slug: 'sublimation-mugs-guide' },
      { title: 'T-shirts sublimés vs transfert : quel procédé ?', desc: 'Analyse coût/qualité entre sublimation, flex et sérigraphie pour optimiser vos marges.', level: 'Avancé', read: '10 min', slug: 'sublimation-vs-transfert' },
    ],
  },
  {
    icon: '🎨',
    category: 'Sérigraphie',
    accent: 'var(--orange)',
    accentBg: 'var(--orangesoft)',
    articles: [
      { title: 'Bases de la Sérigraphie : de zéro à première impression', desc: 'Insolation, émulsion, exposition, raclage — les étapes clés pour votre premier cadre réussi.', level: 'Débutant', read: '12 min', slug: 'bases-serigraphie' },
      { title: 'Choisir sa base d\'impression : aqueuse vs plastisol', desc: 'Comparatif Antex XP10 vs bases plastisol : résistance, prix, usage pro.', level: 'Intermédiaire', read: '6 min', slug: 'base-aqueuse-vs-plastisol' },
      { title: 'Soies et mailles : quel numéro pour quel motif ?', desc: 'N°43 halftone, N°77 texte fin, N°120 quadri — le guide complet des soies sérigraphiques.', level: 'Avancé', read: '7 min', slug: 'guide-soies-serigraphie' },
    ],
  },
  {
    icon: '🚀',
    category: 'DTF',
    accent: 'var(--teal)',
    accentBg: 'var(--tealsoft)',
    articles: [
      { title: 'Introduction au DTF : révolution de l\'impression textile', desc: 'Comprendre le procédé DTF, ses avantages vs sublimation et sérigraphie, et son potentiel business.', level: 'Débutant', read: '8 min', slug: 'introduction-dtf' },
      { title: 'Paramétrer son imprimante DTF : guide technique', desc: 'ICC profiles, densité d\'encre blanche, vitesses. Les réglages pour des transferts parfaits.', level: 'Avancé', read: '15 min', slug: 'parametrer-imprimante-dtf' },
      { title: 'Calcul de rentabilité DTF : coûts et marges par transfert', desc: 'Calculez votre coût de revient réel et fixez vos tarifs pour maximiser vos marges.', level: 'Business', read: '6 min', slug: 'rentabilite-dtf' },
    ],
  },
  {
    icon: '💼',
    category: 'Business & Entrepreneuriat',
    accent: 'var(--green)',
    accentBg: 'var(--greensoft)',
    articles: [
      { title: 'Lancer votre atelier d\'impression en 30 jours', desc: 'Business plan, liste d\'équipement, premiers clients, pricing. Le plan d\'action complet pour créer votre activité.', level: 'Business', read: '15 min', slug: 'lancer-atelier-30-jours' },
      { title: 'Fixer ses tarifs : grille de prix recommandée Maroc', desc: 'Mugs, t-shirts, sweats, cadres — les prix du marché et comment vous positionner pour être rentable.', level: 'Business', read: '8 min', slug: 'grille-tarifs-impression-maroc' },
      { title: 'Trouver ses premiers clients : réseaux sociaux Maroc', desc: 'Instagram, TikTok, WhatsApp Business, Facebook Marketplace — les canaux qui fonctionnent au Maroc.', level: 'Business', read: '10 min', slug: 'trouver-clients-impression' },
    ],
  },
]

const LEVEL_STYLES: Record<string, { bg: string; color: string }> = {
  'Débutant':      { bg: 'var(--tealsoft)',   color: 'var(--teal)' },
  'Intermédiaire': { bg: 'var(--bluesoft)',   color: 'var(--blue)' },
  'Avancé':        { bg: 'rgba(139,92,246,0.12)', color: '#A78BFA' },
  'Business':      { bg: 'var(--greensoft)',  color: 'var(--green)' },
}

const STATS = [
  { n: '13', label: 'guides disponibles' },
  { n: '4', label: 'technologies couvertes' },
  { n: '2K+', label: 'ateliers formés' },
  { n: '100%', label: 'contenu gratuit' },
]

export default function AcademiePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)
  const totalArticles = GUIDES.reduce((a, g) => a + g.articles.length, 0)

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '72px 6% 56px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--bluesoft)', border: '1px solid var(--bluesoft2)', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.08em' }}>📖 ACADÉMIE NES — CONTENU 100% GRATUIT</span>
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,5vw,58px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginBottom: 20 }}>
            Maîtrisez l&apos;impression<br />
            <span style={{ color: 'var(--blue)' }}>textile au Maroc.</span>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto 40px' }}>
            Des guides gratuits rédigés par nos techniciens pour vous aider à maîtriser
            la sublimation, la sérigraphie et le DTF. De débutant à expert, à votre rythme.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ margin: '0 auto 34px', maxWidth: 960 }}>
            {[
              {
                title: 'Je veux démarrer',
                text: 'Commencez par les guides débutants, puis basculez vers les kits et presses adaptées.',
                href: `/${locale}/kits`,
                cta: 'Voir les kits de départ',
              },
              {
                title: 'Je veux mieux produire',
                text: 'Utilisez les contenus techniques pour choisir la bonne machine, la bonne méthode et les bons réglages.',
                href: `/${locale}/categorie-produit`,
                cta: 'Explorer le catalogue',
              },
              {
                title: 'Je veux parler à NES',
                text: 'Si vous avez déjà une vraie question atelier, demandez un conseil ou un devis directement.',
                href: `/${locale}/contact`,
                cta: 'Contacter NES',
              },
            ].map((item) => (
              <div key={item.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, textAlign: 'left' }}>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: 8 }}>Parcours utile</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>{item.text}</p>
                <Link href={item.href} style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none' }}>{item.cta} →</Link>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px 40px' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 28, fontWeight: 700, color: 'var(--blue)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GUIDES ────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 6%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
          {GUIDES.map(section => (
            <div key={section.category}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: section.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {section.icon}
                </div>
                <div>
                  <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 24, fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>{section.category}</h2>
                  <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2 }}>{section.articles.length} guides</p>
                </div>
              </div>

              {/* Articles grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                {section.articles.map(article => (
                  <Link
                    key={article.slug}
                    href={`/${locale}/academie/${article.slug}`}
                    style={{ display: 'flex', flexDirection: 'column', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 22, textDecoration: 'none', transition: 'border-color .2s, transform .2s' }}
                    className="art-item"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 4,
                        background: LEVEL_STYLES[article.level]?.bg ?? 'var(--border)',
                        color: LEVEL_STYLES[article.level]?.color ?? 'var(--text2)',
                      }}>
                        {article.level}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text2)' }}>⏱ {article.read}</span>
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: 8, flex: 1 }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.desc}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: section.accent }}>
                      Lire le guide
                      <svg style={{ width: 13, height: 13 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '72px 6%' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 20 }}>💬</div>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 36, fontWeight: 700, color: 'var(--text)', marginBottom: 14, lineHeight: 1.2 }}>
            Vous avez une question technique ?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 36 }}>
            Nos techniciens répondent sur WhatsApp en moins de 5 minutes.
            Calibration, réglage de presse, choix de consommables, orientation d’achat ou besoin atelier, posez-nous une vraie question métier.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <a
              href={whatsappGeneralLink('Bonjour, j\'ai une question technique sur mon équipement d\'impression.')}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
            >
              <svg style={{ width: 20, height: 20 }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
              </svg>
              Poser une question à un expert
            </a>
            <Link
              href={`/${locale}/kits`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: 'var(--blue)', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
            >
              Voir les Kits Démarrage →
            </Link>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text2)', marginTop: 16 }}>
            {totalArticles} guides gratuits · Questions sans engagement · Support Lun–Sam 9h–18h
          </p>
        </div>
      </div>

    </div>
  )
}
