import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Kits Démarrage Impression Textile — Nouvel Espace Serigraphik',
  description: 'Kits clé-en-main pour lancer votre atelier d\'impression textile au Maroc. Sublimation, sérigraphie, DTF. Livraison 48h, support inclus.',
}

const WA = (msg: string) => whatsappGeneralLink(msg)

const KITS = [
  {
    id: 'sublimation-starter',
    badge: null,
    tag: 'Idéal pour débuter',
    emoji: '🖨️',
    name: 'Kit Sublimation Starter',
    subtitle: 'Personnalisation mugs, t-shirts, cadres',
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
      { q: 'Ai-je besoin d\'une imprimante ?', a: 'Pour la sublimation oui — une imprimante Epson compatible encres sublimation (à partir de 800 MAD). Nous pouvons vous en recommander une.' },
      { q: 'Quels produits puis-je sublimer ?', a: 'Mugs, t-shirts en polyester, cadres en marbre, coussins, porte-clés, plaques alu — tout objet sublimable avec revêtement polyester.' },
      { q: 'Est-ce rentable rapidement ?', a: 'Un mug sublimé se vend entre 60 et 120 MAD. Coût matière ≈ 12 MAD. Avec 200 mugs/mois vous rentabilisez votre kit en 3 semaines.' },
    ],
    color: 'border-gray-200',
    ctaMsg: 'Bonjour, je veux commander le Kit Sublimation Starter à 4 400 MAD. Pouvez-vous confirmer la disponibilité ?',
  },
  {
    id: 'serigraphie-pro',
    badge: '⭐ Le Plus Populaire',
    tag: 'Meilleur rapport qualité/prix',
    emoji: '🎨',
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
      { q: 'Combien de t-shirts puis-je imprimer par heure ?', a: 'En rythme de croisière, 30 à 60 t-shirts/heure selon la complexité du motif. La presse auto-open accélère la cadence.' },
      { q: 'Quelle est la différence avec la sublimation ?', a: 'La sérigraphie fonctionne sur coton pur (matière préférée des clients), donne des couleurs plus vives et des impressions plus durables. Idéale pour les t-shirts et sweats.' },
      { q: 'Peut-on imprimer plusieurs couleurs ?', a: 'Oui, avec plusieurs cadres (un par couleur). Nous proposons des kits multi-cadres en option.' },
    ],
    color: 'border-brand-amber',
    ctaMsg: 'Bonjour, je veux commander le Kit Sérigraphie Pro à 5 400 MAD. Quelles sont les modalités de paiement et livraison ?',
  },
  {
    id: 'dtf-premium',
    badge: null,
    tag: 'Production intensive & tous textiles',
    emoji: '🚀',
    name: 'Kit Impression DTF Complet',
    subtitle: 'DTF sur coton, polyester, cuir, synthétique',
    price: '8 400',
    oldPrice: null,
    setupTime: '2 heures',
    roi: '5 semaines',
    target: 'Ateliers en production & revendeurs',
    includes: [
      { item: 'Imprimante DTF A4 tête Epson XP600', detail: 'Résolution 1440dpi' },
      { item: 'Station poudrage + tunnel séchage', detail: 'Application uniforme automatique' },
      { item: 'Presse à chaud 40×60cm professionnelle', detail: 'Format XL — grand tirages' },
      { item: 'Kit encres DTF CMYK+Blanc 250ml × 5', detail: 'Formule haute résistance lavage' },
      { item: 'Poudre thermofusible blanche 2kg', detail: 'Granulométrie fine pro' },
      { item: 'Papier DTF A4 × 100 feuilles', detail: 'Film PET traité' },
      { item: 'Formation DTF complète en ligne', detail: 'Accès 12 mois — Académie NES' },
      { item: 'Support technique prioritaire 3 mois', detail: 'Hotline + WhatsApp dédié' },
    ],
    faqs: [
      { q: 'Quelle est la différence entre DTF et sublimation ?', a: 'Le DTF fonctionne sur TOUS les textiles (coton, polyester, synthétique, cuir) contrairement à la sublimation qui nécessite 100% polyester. Les transferts DTF sont plus élastiques et résistants au lavage.' },
      { q: 'Quelle cadence de production ?', a: 'Environ 100-150 transferts A4/heure. Une fois pressés, chaque t-shirt prend 15 secondes. Un atelier bien organisé peut produire 300 à 500 pièces/jour.' },
      { q: 'Y a-t-il des coûts récurrents ?', a: 'Encres, poudre et papier DTF. Budget moyen : 1 à 2 MAD par transfert A4, vendu entre 15 et 40 MAD selon la taille et la complexité.' },
    ],
    color: 'border-gray-200',
    ctaMsg: 'Bonjour, je veux commander le Kit DTF Complet à 8 400 MAD. Pouvez-vous me donner plus de détails sur l\'installation et la formation ?',
  },
]

const COMPARISON = [
  { feature: 'Prix',                    starter: '4 400 MAD', pro: '5 400 MAD', premium: '8 400 MAD' },
  { feature: 'Type d\'impression',      starter: 'Sublimation', pro: 'Sérigraphie', premium: 'DTF' },
  { feature: 'Textiles compatibles',    starter: '100% polyester', pro: 'Coton & mélange', premium: 'Tous textiles' },
  { feature: 'Production/heure',        starter: '30–60 pièces', pro: '30–60 pièces', premium: '100–150 pièces' },
  { feature: 'Rentabilité estimée',     starter: '3 semaines', pro: '4 semaines', premium: '5 semaines' },
  { feature: 'Niveau requis',           starter: 'Débutant', pro: 'Intermédiaire', premium: 'Tous niveaux' },
  { feature: 'Imprimante nécessaire',   starter: 'Oui (non incluse)', pro: 'Non', premium: 'Incluse' },
  { feature: 'Support inclus',          starter: '1 mois', pro: '2 mois', premium: '3 mois' },
  { feature: 'Formation',              starter: 'Guide PDF', pro: 'Académie 6 mois', premium: 'Académie 12 mois' },
]

export default function KitsPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="bg-navy-900 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-brand-amber/15 border border-brand-amber/25 rounded-full px-4 py-1.5 text-brand-amber text-xs font-bold mb-6">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              Kits Clé-en-Main
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Tout pour démarrer.<br />
              <span className="gradient-text">Rien à chercher.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Choisissez votre kit, commandez via WhatsApp, et démarrez votre atelier en 48h.
              Support expert inclus, formation offerte, rentabilisé en moins d&apos;un mois.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
              {['✅ Livraison 48h partout au Maroc', '✅ Support WhatsApp inclus', '✅ Formation en ligne offerte', '✅ Facture pro + devis'].map(t => (
                <span key={t} className="font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── KITS ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

        <div className="grid lg:grid-cols-3 gap-8">
          {KITS.map(kit => (
            <div
              key={kit.id}
              className={`relative border-2 ${kit.color} rounded-3xl flex flex-col overflow-hidden ${kit.badge ? 'shadow-card-hover' : ''}`}
            >
              {kit.badge && (
                <div className="bg-brand-amber text-navy-900 text-xs font-black text-center py-2.5 px-4">
                  {kit.badge}
                </div>
              )}

              <div className="p-6 lg:p-8 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-6">
                  <div className="text-4xl mb-3">{kit.emoji}</div>
                  <div className="text-2xs font-bold text-brand-red uppercase tracking-widest mb-1">{kit.tag}</div>
                  <h2 className="text-xl font-black text-navy-900 mb-1">{kit.name}</h2>
                  <p className="text-sm text-gray-500">{kit.subtitle}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-navy-900">{kit.price}</span>
                    <span className="text-base font-bold text-gray-500">MAD HT</span>
                    {kit.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">{kit.oldPrice} MAD</span>
                    )}
                  </div>
                  <div className="flex gap-4 mt-3">
                    <div className="text-xs text-gray-500">
                      <span className="font-bold text-navy-900">⏱ Setup :</span> {kit.setupTime}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-bold text-navy-900">💰 ROI :</span> {kit.roi}
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-medium text-gray-400">
                    👤 Pour : {kit.target}
                  </div>
                </div>

                {/* Includes */}
                <div className="mb-6 flex-1">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Ce qui est inclus</h3>
                  <ul className="space-y-3">
                    {kit.includes.map(inc => (
                      <li key={inc.item} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <div>
                          <div className="text-sm font-semibold text-navy-900">{inc.item}</div>
                          <div className="text-xs text-gray-400">{inc.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <a
                    href={WA(kit.ctaMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-whatsapp w-full py-4 text-base ${kit.badge ? 'text-lg' : ''}`}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
                    </svg>
                    Commander ce kit
                  </a>
                  <Link href={`/${locale}/contact`} className="btn-outline w-full py-2.5 text-sm">
                    Demander un devis personnalisé
                  </Link>
                </div>

                {/* FAQs */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Questions fréquentes</h4>
                  {kit.faqs.map(faq => (
                    <div key={faq.q}>
                      <div className="text-xs font-bold text-navy-900 mb-1">❓ {faq.q}</div>
                      <div className="text-xs text-gray-500 leading-relaxed">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────── */}
      <div className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-label justify-center">Tableau Comparatif</div>
            <h2 className="text-3xl font-black text-navy-900">Comparez les kits en détail</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Caractéristique</th>
                  <th className="text-center px-6 py-4 text-sm font-black text-navy-900">🖨️ Starter<br /><span className="text-brand-red">4 400 MAD</span></th>
                  <th className="text-center px-6 py-4 text-sm font-black text-navy-900 bg-brand-amber/5 border-x border-brand-amber/20">🎨 Pro<br /><span className="text-brand-red">5 400 MAD</span></th>
                  <th className="text-center px-6 py-4 text-sm font-black text-navy-900">🚀 DTF<br /><span className="text-brand-red">8 400 MAD</span></th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                    <td className="px-6 py-3.5 text-sm font-semibold text-gray-700">{row.feature}</td>
                    <td className="px-6 py-3.5 text-sm text-center text-gray-600">{row.starter}</td>
                    <td className="px-6 py-3.5 text-sm text-center text-gray-600 bg-brand-amber/5 border-x border-brand-amber/10 font-medium">{row.pro}</td>
                    <td className="px-6 py-3.5 text-sm text-center text-gray-600">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────── */}
      <div className="py-16 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">
            Vous ne savez pas lequel choisir ?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Décrivez votre projet en 2 lignes sur WhatsApp. Nos experts vous répondent en moins de 5 minutes
            et vous recommandent le kit le plus adapté à votre budget et vos objectifs.
          </p>
          <a
            href={WA('Bonjour, j\'hésite entre plusieurs kits et j\'ai besoin de conseils pour choisir celui qui correspond à mon projet.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex px-10 py-5 text-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
            </svg>
            Je veux des conseils gratuits
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Réponse en &lt; 5 minutes · Aucun engagement · 100% gratuit
          </p>
        </div>
      </div>
    </div>
  )
}
