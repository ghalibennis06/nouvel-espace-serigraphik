import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getFeaturedProducts, getCategoryTree } from '@/lib/woocommerce'
import ProductCard from '@/components/catalog/ProductCard'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nouvel Espace Serigraphik — Équipement Impression Textile Maroc',
    description: 'Importateur officiel de machines et consommables pour la sérigraphie, sublimation et DTF au Maroc. Kits clé-en-main, livraison 48h, support WhatsApp.',
  }
}

const WA_KITS = (kitName: string) =>
  whatsappGeneralLink(`Bonjour, je suis intéressé par le ${kitName}. Pouvez-vous me donner plus d'informations ?`)

const KITS = [
  {
    id: 'starter',
    badge: null,
    emoji: '🖨️',
    name: 'Kit Sublimation Starter',
    tagline: 'Pour démarrer rapidement',
    price: '4 400',
    priceNum: 4400,
    monthlyEst: '~220',
    includes: [
      'Presse à chaud 38×38cm semi-auto',
      'Papier sublimation A4 × 100 feuilles',
      'Encres sublimation CMYK × 4 × 100ml',
      '10 mugs blancs sublimables',
      'Scotch thermique + feuille téflon',
      'Support WhatsApp 1 mois inclus',
    ],
    highlight: 'Idéal pour tester le marché',
    cta: 'Commander ce kit',
  },
  {
    id: 'pro',
    badge: '⭐ Le Plus Populaire',
    emoji: '🎨',
    name: 'Kit Sérigraphie Pro',
    tagline: 'Le choix des ateliers sérieux',
    price: '5 400',
    priceNum: 5400,
    monthlyEst: '~270',
    includes: [
      'Presse à chaud 40×50cm auto-open',
      'Cadre aluminium 40×50 × 2 unités',
      'Base aqueuse Antex XP10 1L × 2',
      'Films de transfert A3 × 20 feuilles',
      'Raclette + scotch thermique',
      'Formation en ligne offerte',
    ],
    highlight: 'ROI en moins de 30 commandes clients',
    cta: 'Commander ce kit',
  },
  {
    id: 'premium',
    badge: null,
    emoji: '🚀',
    name: 'Kit Impression Complète DTF',
    tagline: 'Production intensive, tous textiles',
    price: '8 400',
    priceNum: 8400,
    monthlyEst: '~420',
    includes: [
      'Imprimante DTF A4 + station poudrage',
      'Presse à chaud 40×60cm professionnelle',
      'Kit encres DTF CMYK+W 250ml × 5',
      'Poudre thermofusible 2kg',
      'Papier DTF A4 × 100 feuilles',
      'Support & formation 3 mois inclus',
    ],
    highlight: 'Le setup complet pour scaler',
    cta: 'Commander ce kit',
  },
]

const CATEGORIES_CONFIG: Record<string, { icon: string; color: string; desc: string }> = {
  'les-presses-a-chaud':              { icon: '🔥', color: 'bg-red-50 border-red-100',     desc: 'Sublimation & transfert thermique' },
  'les-consommables-de-serigraphie':  { icon: '🎨', color: 'bg-blue-50 border-blue-100',   desc: 'Bases, cadres, raclettes, films' },
  'les-consommables-de-sublimation':  { icon: '💧', color: 'bg-cyan-50 border-cyan-100',   desc: 'Encres, papiers, flex, scotch' },
  'les-machines-dimpression':         { icon: '⚙️', color: 'bg-purple-50 border-purple-100', desc: 'DTF, UV, traceurs grand format' },
  'les-machines-de-serigraphie':      { icon: '🖨️', color: 'bg-orange-50 border-orange-100', desc: 'Carrousels, insolation, séchoirs' },
  'les-produits-sublimables':         { icon: '🛍️', color: 'bg-green-50 border-green-100', desc: 'Mugs, cadres, coussins, textiles' },
}

const TESTIMONIALS = [
  {
    name: 'Karim B.',
    role: 'Gérant — Print Studio Casablanca',
    text: 'J\'ai démarré avec le Kit Sublimation Starter en janvier. Aujourd\'hui je fais 200+ mugs/semaine. Le support WhatsApp est vraiment réactif, ils m\'ont aidé à calibrer ma presse en 10 minutes.',
    rating: 5,
    avatar: 'K',
  },
  {
    name: 'Samira O.',
    role: 'Créatrice — Atelier Textile Rabat',
    text: 'Les consommables Antex sont de qualité constante, et la livraison en 48h me permet de ne jamais être en rupture. Je commande chaque semaine. Factures pro disponibles, c\'est essentiel pour ma comptabilité.',
    rating: 5,
    avatar: 'S',
  },
  {
    name: 'Youssef M.',
    role: 'Directeur — ImprimPro Marrakech',
    text: 'On a équipé tout notre atelier ici. 2 carrousels 6 couleurs, la machine d\'insolation et tous les consommables. Prix imbattables au Maroc, et ils connaissent vraiment leur métier.',
    rating: 5,
    avatar: 'Y',
  },
]

const ACADEMY_GUIDES = [
  {
    emoji: '📖',
    title: 'Guide Complet Sublimation',
    desc: 'Températures, temps de pression, supports compatibles. Tout ce qu\'il faut savoir pour imprimer parfaitement dès le premier jour.',
    tag: 'Débutant',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    emoji: '🎯',
    title: 'Lancer son atelier en 30 jours',
    desc: 'Business plan, liste d\'équipement, premiers clients, tarifs recommandés. Le plan d\'action complet pour créer votre activité.',
    tag: 'Business',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    emoji: '🔬',
    title: 'Maîtriser la Sérigraphie',
    desc: 'Insolation, émulsion, expositions, raclage. Les techniques professionnelles expliquées simplement avec les produits Antex.',
    tag: 'Technique',
    tagColor: 'bg-purple-100 text-purple-700',
  },
]

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const [{ root: categories }, featuredProducts] = await Promise.all([
    getCategoryTree(),
    getFeaturedProducts(8),
  ])

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          HERO — Split layout
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-navy-900 overflow-hidden hero-pattern">
        {/* Red accent gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-amber/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-red/15 border border-brand-red/25 rounded-full px-4 py-1.5 text-brand-red text-xs font-bold mb-6">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                Importateur Officiel · Stock Local · Livraison 48h
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
                Équipez votre<br />
                atelier en<br />
                <span className="gradient-text">48 heures.</span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Machines, consommables et kits clé-en-main pour la sérigraphie, la sublimation et le DTF.
                Le hub d&apos;équipement N°1 des ateliers d&apos;impression au Maroc.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href={`/${locale}/kits`} className="btn-amber text-base px-8 py-4">
                  Voir les Kits Démarrage →
                </Link>
                <a
                  href={whatsappGeneralLink('Bonjour, je veux démarrer une activité d\'impression. Pouvez-vous me conseiller ?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-base px-8 py-4"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
                  </svg>
                  Parler à un Expert
                </a>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/10">
                {[
                  { num: '500+', label: 'Ateliers équipés' },
                  { num: '10 ans', label: 'D\'expérience' },
                  { num: '48h',  label: 'Livraison' },
                  { num: '7j/7', label: 'Support WA' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-xl sm:text-2xl font-black text-brand-amber">{s.num}</div>
                    <div className="text-2xs text-gray-500 leading-tight mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: product visual */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Main product image */}
                <div className="relative aspect-square bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm">
                  <Image
                    src="https://nouvelespaceserigraphik.ma/wp-content/uploads/2024/12/presse-40x50autoopen-430x430.jpg"
                    alt="Presse à chaud professionnelle"
                    fill
                    className="object-contain p-8"
                    priority
                    sizes="(max-width: 1024px) 0px, 400px"
                  />
                </div>

                {/* Floating price badge */}
                <div className="absolute -bottom-4 -left-6 bg-brand-amber text-navy-900 rounded-2xl px-5 py-3 shadow-card-hover">
                  <div className="text-2xs font-bold uppercase tracking-wide">Kit Pro</div>
                  <div className="text-xl font-black">5 400 MAD</div>
                </div>

                {/* Floating trust badge */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-card-hover flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <div>
                    <div className="text-xs font-black text-navy-900">Livraison</div>
                    <div className="text-xs text-gray-500">sous 48h</div>
                  </div>
                </div>

                {/* Floating rating */}
                <div className="absolute top-1/2 -right-8 bg-white rounded-xl px-3 py-2 shadow-card-hover">
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-3 h-3 text-brand-amber" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="text-2xs text-gray-500 font-medium">500+ clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUST BAR
      ═══════════════════════════════════════════════════════════ */}
      <div className="bg-navy-950 border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4 text-center lg:text-left">
            {[
              { icon: '🏭', text: 'Importateur Direct Officiel' },
              { icon: '🚚', text: 'Livraison Maroc 48h' },
              { icon: '📦', text: 'Stock Permanent Local' },
              { icon: '💬', text: 'Support WhatsApp 7j/7' },
              { icon: '🧾', text: 'Facture Pro + Devis TVA' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs font-semibold text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          STARTER KITS — THE MONEY SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
              Kits Clé-en-Main
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-3">
              Lancez votre atelier<br />
              <span className="gradient-text-red">en moins de 48 heures.</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Tout inclus, rien à chercher. Commandez via WhatsApp et recevez votre kit complet,
              prêt à imprimer dès la livraison.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {KITS.map(kit => (
              <div key={kit.id} className={`kit-card ${kit.badge ? 'kit-card-popular' : ''}`}>
                {kit.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-amber text-navy-900 text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
                    {kit.badge}
                  </div>
                )}

                <div className="text-3xl mb-3">{kit.emoji}</div>
                <div className="text-2xs font-bold text-gray-400 uppercase tracking-widest mb-1">{kit.tagline}</div>
                <h3 className="text-lg font-black text-navy-900 mb-4">{kit.name}</h3>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-navy-900">{kit.price}</span>
                  <span className="text-sm font-bold text-gray-500">MAD HT</span>
                </div>
                <p className="text-xs text-gray-400 mb-6">≈ {kit.monthlyEst} MAD/mois remboursé en 3 semaines</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {kit.includes.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="bg-gray-50 rounded-xl px-4 py-2.5 mb-5 text-xs text-gray-600 font-medium text-center border border-gray-100">
                  💡 {kit.highlight}
                </div>

                <a
                  href={WA_KITS(kit.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-whatsapp w-full ${kit.badge ? 'py-4 text-base' : 'py-3'}`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
                  </svg>
                  {kit.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={`/${locale}/kits`} className="text-sm font-semibold text-brand-red hover:underline">
              Comparer tous nos kits en détail →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Comment ça marche</div>
            <h2 className="text-3xl font-black text-navy-900">
              De zéro à atelier opérationnel<br />en 3 étapes simples.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line — desktop */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-brand-amber to-brand-amber/30" />

            {[
              {
                step: '01',
                emoji: '🎯',
                title: 'Choisissez votre kit',
                desc: 'Comparez nos 3 kits et sélectionnez celui qui correspond à votre projet et budget. Des experts sont disponibles sur WhatsApp pour vous guider.',
              },
              {
                step: '02',
                emoji: '💬',
                title: 'Commandez en 5 min',
                desc: 'Envoyez-nous un message WhatsApp. Devis instantané, confirmation de commande, paiement flexible. Aucune démarche complexe.',
              },
              {
                step: '03',
                emoji: '🚀',
                title: 'Démarrez en 48h',
                desc: 'Livraison partout au Maroc sous 48h. Kit déballé, machines installées, premier test fait. Vous êtes prêt à prendre vos premières commandes.',
              },
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                <div className="relative z-10 w-20 h-20 bg-navy-900 rounded-2xl flex items-center justify-center mb-6 shadow-card-hover">
                  <span className="text-3xl">{step.emoji}</span>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-brand-amber text-navy-900 rounded-full flex items-center justify-center text-xs font-black">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-lg font-black text-navy-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={whatsappGeneralLink('Bonjour, j\'ai besoin de conseils pour démarrer mon atelier d\'impression.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex px-8 py-4 text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
              </svg>
              Je veux me lancer — Parler à un expert
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CATEGORIES — Visual grid
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-label">Catalogue Complet</div>
              <h2 className="text-3xl font-black text-navy-900">
                Tout pour votre atelier<br />d&apos;impression.
              </h2>
            </div>
            <Link href={`/${locale}/categorie-produit`} className="hidden sm:flex text-sm font-semibold text-navy-900 hover:text-brand-red transition-colors items-center gap-1">
              Voir tout →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(cat => {
              const cfg = CATEGORIES_CONFIG[cat.slug] ?? { icon: '📦', color: 'bg-gray-50 border-gray-100', desc: 'Fournitures professionnelles' }
              return (
                <Link
                  key={cat.id}
                  href={categoryHref(cat.slug, locale)}
                  className={`group relative overflow-hidden rounded-2xl border-2 ${cfg.color} p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover`}
                >
                  {cat.image && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity">
                      <Image src={cat.image.src} alt={cat.name} fill className="object-cover" sizes="300px" />
                    </div>
                  )}
                  <div className="relative">
                    <span className="text-4xl">{cfg.icon}</span>
                  </div>
                  <div className="relative">
                    <h3 className="font-black text-navy-900 text-base mb-1">{cat.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{cfg.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xs font-bold text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-100">
                        {cat.count} produits
                      </span>
                      <span className="text-xs font-bold text-navy-900 group-hover:text-brand-red transition-colors">
                        Voir →
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURED PRODUCTS — Bestsellers
      ═══════════════════════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="section-label">Nos Best-Sellers</div>
                <h2 className="text-3xl font-black text-navy-900">
                  Les produits<br />les plus commandés.
                </h2>
              </div>
              <Link href={`/${locale}/categorie-produit`} className="hidden sm:flex text-sm font-semibold text-navy-900 hover:text-brand-red transition-colors items-center gap-1">
                Tout voir →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} locale={locale} priority={i < 4} />
              ))}
            </div>

            <div className="text-center mt-10 sm:hidden">
              <Link href={`/${locale}/categorie-produit`} className="btn-outline text-sm">
                Voir tous les produits
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          RECURRING CONSUMABLES — Revenue model
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-amber/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-amber/15 border border-brand-amber/25 rounded-full px-4 py-1.5 text-brand-amber text-xs font-bold mb-6">
                🔄 Approvisionnement Régulier
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Ne tombez plus jamais<br />
                <span className="gradient-text">en rupture de stock.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Vos clients comptent sur vous. Comptez sur nous. Commandez vos consommables chaque semaine
                ou chaque mois via WhatsApp, et recevez-les en 48h. Même produit, même qualité,
                facture pro à chaque livraison.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '⚡', title: 'Commande express', desc: 'Un message WhatsApp suffit' },
                  { icon: '🏷️', title: 'Tarifs dégressifs', desc: 'Volume = meilleures marges' },
                  { icon: '🚚', title: 'Livraison 48h', desc: 'Partout au Maroc' },
                  { icon: '🧾', title: 'Facture mensuelle', desc: 'Groupez vos commandes' },
                ].map(item => (
                  <div key={item.title} className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-xl mb-2">{item.icon}</div>
                    <div className="text-sm font-bold text-white">{item.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappGeneralLink('Bonjour, je veux configurer une commande régulière de consommables.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp px-8 py-4"
                >
                  Configurer mon approvisionnement
                </a>
                <Link href={`/${locale}/categorie-produit/les-consommables-de-serigraphie`} className="btn-outline-white px-8 py-4">
                  Voir les consommables →
                </Link>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="text-white font-black text-xl mb-6">Exemple d&apos;atelier type</h3>
              <div className="space-y-4">
                {[
                  { label: 'Papier sublimation A4 × 500f', freq: 'mensuel', price: '340 MAD' },
                  { label: 'Encres sublimation CMYK × 4', freq: 'trimestriel', price: '380 MAD' },
                  { label: 'Base aqueuse Antex XP10 × 5L', freq: 'mensuel', price: '520 MAD' },
                  { label: 'Films transfert A3 × 50f', freq: 'mensuel', price: '145 MAD' },
                  { label: 'Mugs blancs × 50 unités', freq: 'mensuel', price: '1 000 MAD' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/10">
                    <div>
                      <div className="text-sm font-medium text-white">{item.label}</div>
                      <div className="text-2xs text-gray-400 capitalize">{item.freq}</div>
                    </div>
                    <div className="text-sm font-black text-brand-amber">{item.price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/10 flex justify-between items-center">
                <span className="text-gray-400 text-sm">Budget mensuel estimé</span>
                <span className="text-2xl font-black text-brand-amber">~2 400 MAD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS — Social proof
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-label justify-center">Témoignages Clients</div>
            <h2 className="text-3xl font-black text-navy-900">
              500 ateliers nous font confiance.<br />
              <span className="text-gray-400 font-normal text-2xl">Voici ce qu&apos;ils disent.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-4 h-4 text-brand-amber" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy-900 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-black text-navy-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ACADEMY — Education hub teaser
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-label">Académie NES</div>
              <h2 className="text-3xl font-black text-navy-900 mb-4">
                Apprenez, imprimez,<br />
                <span className="gradient-text">développez votre business.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Des guides gratuits rédigés par nos experts pour vous aider à maîtriser
                la sérigraphie, la sublimation et le DTF. De la théorie aux techniques avancées,
                pour tous les niveaux.
              </p>
              <Link href={`/${locale}/academie`} className="btn-secondary inline-flex px-8 py-3.5">
                Accéder aux guides gratuits →
              </Link>
            </div>

            <div className="grid gap-4">
              {ACADEMY_GUIDES.map((guide, i) => (
                <div key={i} className="flex gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-gray-200 hover:shadow-card transition-all group cursor-pointer">
                  <div className="text-3xl flex-shrink-0">{guide.emoji}</div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-black text-navy-900 text-sm">{guide.title}</h4>
                      <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${guide.tagColor}`}>
                        {guide.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{guide.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-navy-900 transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          B2B VOLUME — Pro buyers
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-navy-900 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <div className="badge-amber mb-4">Acheteurs Professionnels</div>
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-3">
                Commandes en volume ?<br />Nous avons vos tarifs.
              </h2>
              <p className="text-gray-400 text-sm max-w-lg leading-relaxed mb-6">
                Importateur direct, nous proposons des tarifs dégressifs à partir de 5 unités.
                Devis personnalisé en moins de 2 heures. Facture pro, livraison prioritaire.
              </p>
              <div className="flex flex-wrap gap-3">
                {['-5% dès 5 unités', '-10% dès 10 unités', '-15% dès 20 unités', '-20% dès 50 unités'].map(tier => (
                  <div key={tier} className="bg-white/10 border border-white/15 rounded-lg px-4 py-2 text-xs font-bold text-white">
                    {tier}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-3 w-full lg:w-auto min-w-[220px]">
              <a
                href={whatsappGeneralLink('Bonjour, je souhaite un devis pour une commande en volume professionnelle.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full py-4 text-base"
              >
                💬 Devis express WhatsApp
              </a>
              <Link href={`/${locale}/contact`} className="btn-outline-white w-full py-3 text-sm">
                Formulaire de devis pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BRANDS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-2xs font-bold text-center text-gray-400 uppercase tracking-widest mb-8">
            Marques partenaires officielles
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {['ANTEX', 'INKNOVATOR', 'FREESUB', 'IPRESS', 'SEF TEXTILE', 'EPSON'].map(brand => (
              <span key={brand} className="text-sm font-black text-gray-300 tracking-widest hover:text-gray-500 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
