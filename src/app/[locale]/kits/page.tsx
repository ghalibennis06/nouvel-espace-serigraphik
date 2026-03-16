import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Kits Démarrage Impression Textile — Nouvel Espace Serigraphik',
  description: 'Kits clé-en-main pour lancer votre atelier d\'impression textile au Maroc. Sublimation, sérigraphie, DTF. Livraison 48h, support inclus.',
}

const WA = (msg: string) => whatsappGeneralLink(msg)
const WA_SVG = (
  <svg style={{ width: 20, height: 20, flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

const KITS = [
  {
    id: 'sublimation-starter',
    popular: false,
    tag: 'Idéal pour débuter',
    icon: '🖨️',
    name: 'Kit Sublimation Starter',
    subtitle: 'Mugs, t-shirts, cadres personnalisés',
    price: '4 400',
    oldPrice: null,
    setupTime: '< 30 min',
    roi: '3 semaines',
    target: 'Débutants & side-business',
    includes: [
      { item: 'Presse à chaud 38×38cm semi-automatique', detail: 'Antex Pro 380' },
      { item: 'Papier sublimation A4 × 100 feuilles', detail: 'Grammage 100g/m²' },
      { item: 'Encres sublimation CMYK × 4 × 100ml', detail: 'Compatibles toutes imprimantes' },
      { item: '10 mugs blancs 11oz sublimables', detail: 'Prêts à personnaliser' },
      { item: 'Scotch thermique haute temp. + téflon', detail: 'Pack démarrage complet' },
      { item: 'Guide de démarrage offert', detail: 'PDF + vidéos' },
      { item: 'Support WhatsApp 1 mois', detail: 'Réponse < 5 min' },
    ],
    faqs: [
      { q: 'Ai-je besoin d\'une imprimante ?', a: 'Pour la sublimation oui — une imprimante Epson compatible à partir de 800 MAD. Nous pouvons vous en recommander une.' },
      { q: 'Quels produits puis-je sublimer ?', a: 'Mugs, t-shirts polyester, cadres marbre, coussins, porte-clés — tout objet avec revêtement sublimable.' },
      { q: 'Est-ce rentable rapidement ?', a: 'Un mug sublimé se vend 60–120 MAD. Coût matière ≈ 12 MAD. Avec 200 mugs/mois vous rentabilisez en 3 semaines.' },
    ],
    ctaMsg: 'Bonjour, je veux commander le Kit Sublimation Starter à 4 400 MAD. Pouvez-vous confirmer la disponibilité ?',
  },
  {
    id: 'serigraphie-pro',
    popular: true,
    tag: 'Meilleur rapport qualité/prix',
    icon: '🎨',
    name: 'Kit Sérigraphie Pro',
    subtitle: 'T-shirts, sweats, tote bags en séries',
    price: '5 400',
    oldPrice: '6 200',
    setupTime: '1 heure',
    roi: '4 semaines',
    target: 'Ateliers & entrepreneurs',
    includes: [
      { item: 'Presse à chaud 40×50cm auto-open', detail: 'Antex Pro 4050 — qualité pro' },
      { item: 'Cadre aluminium 40×50cm × 2', detail: 'Soie 90T incluse' },
      { item: 'Base aqueuse Antex XP10 1L × 2', detail: 'Idéale coton & polyester' },
      { item: 'Films de transfert A3 × 20 feuilles', detail: 'Transfert chaud + froid' },
      { item: 'Raclette professionnelle 50cm', detail: 'Dureté 75 Shore' },
      { item: 'Scotch thermique + feuille téflon', detail: 'Pack complet' },
      { item: 'Formation sérigraphie en ligne', detail: 'Accès 6 mois — Académie NES' },
      { item: 'Support WhatsApp 2 mois', detail: 'Suivi personnalisé' },
    ],
    faqs: [
      { q: 'Combien de t-shirts par heure ?', a: '30 à 60 t-shirts/heure en rythme de croisière. La presse auto-open accélère la cadence.' },
      { q: 'Différence avec la sublimation ?', a: 'La sérigraphie fonctionne sur coton pur, donne des couleurs plus vives et des impressions plus durables. Idéale pour t-shirts et sweats.' },
      { q: 'Peut-on imprimer plusieurs couleurs ?', a: 'Oui, avec plusieurs cadres (un par couleur). Nous proposons des kits multi-cadres en option.' },
    ],
    ctaMsg: 'Bonjour, je veux commander le Kit Sérigraphie Pro à 5 400 MAD. Quelles sont les modalités de paiement et livraison ?',
  },
  {
    id: 'dtf-premium',
    popular: false,
    tag: 'Production intensive & tous textiles',
    icon: '🚀',
    name: 'Kit Impression DTF Complet',
    subtitle: 'Coton, polyester, cuir, synthétique',
    price: '8 400',
    oldPrice: null,
    setupTime: '2 heures',
    roi: '5 semaines',
    target: 'Ateliers en production & revendeurs',
    includes: [
      { item: 'Imprimante DTF A4 tête Epson XP600', detail: 'Résolution 1440dpi' },
      { item: 'Station poudrage + tunnel séchage', detail: 'Application uniforme automatique' },
      { item: 'Presse à chaud 40×60cm professionnelle', detail: 'Format XL — grands tirages' },
      { item: 'Kit encres DTF CMYK+Blanc 250ml × 5', detail: 'Formule haute résistance lavage' },
      { item: 'Poudre thermofusible blanche 2kg', detail: 'Granulométrie fine pro' },
      { item: 'Papier DTF A4 × 100 feuilles', detail: 'Film PET traité' },
      { item: 'Formation DTF complète en ligne', detail: 'Accès 12 mois — Académie NES' },
      { item: 'Support technique prioritaire 3 mois', detail: 'Hotline + WhatsApp dédié' },
    ],
    faqs: [
      { q: 'Différence DTF vs sublimation ?', a: 'Le DTF fonctionne sur TOUS les textiles (coton, polyester, cuir) contrairement à la sublimation qui nécessite 100% polyester.' },
      { q: 'Quelle cadence de production ?', a: '100–150 transferts A4/heure. Chaque t-shirt prend 15 secondes. Un atelier peut produire 300–500 pièces/jour.' },
      { q: 'Coûts récurrents ?', a: 'Budget moyen : 1 à 2 MAD par transfert A4, vendu entre 15 et 40 MAD selon la taille.' },
    ],
    ctaMsg: 'Bonjour, je veux commander le Kit DTF Complet à 8 400 MAD. Pouvez-vous me donner plus de détails sur l\'installation et la formation ?',
  },
]

const COMPARISON = [
  { feature: 'Prix',                  starter: '4 400 MAD',      pro: '5 400 MAD',   premium: '8 400 MAD' },
  { feature: 'Type d\'impression',    starter: 'Sublimation',    pro: 'Sérigraphie', premium: 'DTF' },
  { feature: 'Textiles compatibles',  starter: '100% polyester', pro: 'Coton & mix', premium: 'Tous textiles' },
  { feature: 'Production/heure',      starter: '30–60 pièces',   pro: '30–60 pièces',premium: '100–150 pièces' },
  { feature: 'ROI estimé',            starter: '3 semaines',     pro: '4 semaines',  premium: '5 semaines' },
  { feature: 'Niveau requis',         starter: 'Débutant',       pro: 'Intermédiaire',premium: 'Tous niveaux' },
  { feature: 'Imprimante',            starter: 'Non incluse',    pro: 'Non requise', premium: 'Incluse' },
  { feature: 'Support inclus',        starter: '1 mois',         pro: '2 mois',      premium: '3 mois' },
  { feature: 'Formation',             starter: 'Guide PDF',      pro: 'Académie 6 mois', premium: 'Académie 12 mois' },
]

export default function KitsPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  return (
    <div style={{ background: '#0C0A08', minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ background: '#1A1612', borderBottom: '1px solid rgba(200,137,31,0.12)', padding: '72px 6% 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(200,137,31,0.1)', border: '1px solid rgba(200,137,31,0.25)', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
            <svg style={{ width: 14, height: 14, color: '#C8891F' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#C8891F', letterSpacing: '0.08em' }}>KITS CLÉ-EN-MAIN — LIVRAISON 48H</span>
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 700, color: '#F5EDD8', lineHeight: 1.1, marginBottom: 20 }}>
            Tout pour démarrer.<br />
            <span style={{ color: '#C8891F' }}>Rien à chercher.</span>
          </h1>
          <p style={{ fontSize: 17, color: '#B8AA94', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 32px' }}>
            Choisissez votre kit, commandez via WhatsApp, démarrez votre atelier en 48h.
            Support expert inclus, formation offerte, rentabilisé en moins d&apos;un mois.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px 28px' }}>
            {['✅ Livraison 48h au Maroc', '✅ Support WhatsApp inclus', '✅ Formation en ligne offerte', '✅ Facture pro + devis'].map(t => (
              <span key={t} style={{ fontSize: 13, color: '#B8AA94', fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── KITS GRID ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 6%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'stretch' }}>
          {KITS.map(kit => (
            <div
              key={kit.id}
              style={{
                background: '#1A1612',
                border: `1px solid ${kit.popular ? '#C8891F' : 'rgba(245,237,216,0.08)'}`,
                borderRadius: 14,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: kit.popular ? '0 0 40px rgba(200,137,31,0.12)' : 'none',
              }}
            >
              {/* Popular banner */}
              {kit.popular && (
                <div style={{ background: '#C8891F', color: '#0C0A08', fontSize: 12, fontWeight: 800, textAlign: 'center', padding: '10px 16px', letterSpacing: '0.05em' }}>
                  ⭐ LE PLUS POPULAIRE
                </div>
              )}

              <div style={{ padding: '28px 28px 0' }}>
                {/* Header */}
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>{kit.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8891F', display: 'block', marginBottom: 6 }}>{kit.tag}</span>
                  <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 26, fontWeight: 700, color: '#F5EDD8', marginBottom: 5, lineHeight: 1.2 }}>{kit.name}</h2>
                  <p style={{ fontSize: 13, color: '#B8AA94' }}>{kit.subtitle}</p>
                </div>

                {/* Price */}
                <div style={{ paddingBottom: 22, marginBottom: 22, borderBottom: '1px solid rgba(245,237,216,0.07)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 44, fontWeight: 700, color: '#F5EDD8', lineHeight: 1 }}>{kit.price}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#B8AA94' }}>MAD HT</span>
                    {kit.oldPrice && (
                      <span style={{ fontSize: 14, color: '#B8AA94', textDecoration: 'line-through' }}>{kit.oldPrice} MAD</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 20 }}>
                    <span style={{ fontSize: 12, color: '#B8AA94' }}>⏱ <strong style={{ color: '#F5EDD8' }}>Setup :</strong> {kit.setupTime}</span>
                    <span style={{ fontSize: 12, color: '#B8AA94' }}>💰 <strong style={{ color: '#F5EDD8' }}>ROI :</strong> {kit.roi}</span>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12, color: '#B8AA94' }}>👤 Pour : {kit.target}</div>
                </div>

                {/* Includes */}
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8AA94', display: 'block', marginBottom: 14 }}>Ce qui est inclus</span>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {kit.includes.map(inc => (
                      <li key={inc.item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <svg style={{ width: 16, height: 16, color: '#0F9080', flexShrink: 0, marginTop: 2 }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#F5EDD8', lineHeight: 1.3 }}>{inc.item}</div>
                          <div style={{ fontSize: 11, color: '#B8AA94', marginTop: 1 }}>{inc.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ padding: '0 28px 28px', marginTop: 'auto' }}>
                <a
                  href={WA(kit.ctaMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', padding: '15px', background: '#25D366', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none', marginBottom: 10, boxSizing: 'border-box' }}
                >
                  {WA_SVG}
                  Commander ce kit
                </a>
                <Link
                  href={`/${locale}/contact`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '11px', border: '1px solid rgba(200,137,31,0.25)', color: '#C8891F', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                  className="link-gold"
                >
                  Demander un devis personnalisé
                </Link>

                {/* FAQs */}
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(245,237,216,0.06)' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8AA94', display: 'block', marginBottom: 14 }}>Questions fréquentes</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {kit.faqs.map(faq => (
                      <div key={faq.q}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#F5EDD8', marginBottom: 3 }}>❓ {faq.q}</div>
                        <div style={{ fontSize: 12, color: '#B8AA94', lineHeight: 1.6 }}>{faq.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
      <div style={{ background: '#1A1612', borderTop: '1px solid rgba(245,237,216,0.06)', borderBottom: '1px solid rgba(245,237,216,0.06)', padding: '64px 6%' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: '#C8891F', display: 'block', marginBottom: 10 }}>Tableau Comparatif</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 34, fontWeight: 700, color: '#F5EDD8' }}>Comparez les kits en détail</h2>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid rgba(245,237,216,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(245,237,216,0.08)' }}>
                  <th style={{ textAlign: 'left', padding: '16px 20px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B8AA94' }}>Caractéristique</th>
                  <th style={{ textAlign: 'center', padding: '16px 20px', fontSize: 13, fontWeight: 700, color: '#F5EDD8' }}>🖨️ Starter<br /><span style={{ color: '#C8891F', fontSize: 13 }}>4 400 MAD</span></th>
                  <th style={{ textAlign: 'center', padding: '16px 20px', fontSize: 13, fontWeight: 700, color: '#F5EDD8', background: 'rgba(200,137,31,0.07)', borderLeft: '1px solid rgba(200,137,31,0.15)', borderRight: '1px solid rgba(200,137,31,0.15)' }}>🎨 Pro<br /><span style={{ color: '#C8891F', fontSize: 13 }}>5 400 MAD</span></th>
                  <th style={{ textAlign: 'center', padding: '16px 20px', fontSize: 13, fontWeight: 700, color: '#F5EDD8' }}>🚀 DTF<br /><span style={{ color: '#C8891F', fontSize: 13 }}>8 400 MAD</span></th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid rgba(245,237,216,0.04)', background: i % 2 !== 0 ? 'rgba(245,237,216,0.02)' : 'transparent' }}>
                    <td style={{ padding: '13px 20px', fontSize: 13, fontWeight: 600, color: '#B8AA94' }}>{row.feature}</td>
                    <td style={{ padding: '13px 20px', fontSize: 13, textAlign: 'center', color: '#F5EDD8' }}>{row.starter}</td>
                    <td style={{ padding: '13px 20px', fontSize: 13, textAlign: 'center', color: '#F5EDD8', background: 'rgba(200,137,31,0.05)', borderLeft: '1px solid rgba(200,137,31,0.1)', borderRight: '1px solid rgba(200,137,31,0.1)', fontWeight: 600 }}>{row.pro}</td>
                    <td style={{ padding: '13px 20px', fontSize: 13, textAlign: 'center', color: '#F5EDD8' }}>{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <div style={{ padding: '80px 6%', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(37,211,102,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            {WA_SVG}
          </div>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 36, fontWeight: 700, color: '#F5EDD8', marginBottom: 14, lineHeight: 1.2 }}>
            Vous ne savez pas lequel choisir ?
          </h2>
          <p style={{ fontSize: 15, color: '#B8AA94', lineHeight: 1.7, marginBottom: 32 }}>
            Décrivez votre projet en 2 lignes sur WhatsApp. Nos experts vous répondent
            en moins de 5 minutes et vous recommandent le kit le plus adapté.
          </p>
          <a
            href={WA('Bonjour, j\'hésite entre plusieurs kits et j\'ai besoin de conseils pour choisir celui qui correspond à mon projet.')}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '16px 36px', background: '#25D366', color: '#fff', borderRadius: 8, fontSize: 16, fontWeight: 700, textDecoration: 'none', marginBottom: 14 }}
          >
            {WA_SVG}
            Conseils gratuits — réponse en 5 min
          </a>
          <p style={{ fontSize: 13, color: '#B8AA94' }}>Aucun engagement · 100% gratuit · Lun–Sam 9h–18h</p>
        </div>
      </div>

    </div>
  )
}
