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
    emoji: '🖨️',
    category: 'Sublimation',
    color: 'bg-blue-50 border-blue-100',
    tagColor: 'bg-blue-100 text-blue-700',
    articles: [
      {
        title: 'Guide Complet Sublimation Débutant',
        desc: 'Températures, temps de pression, supports compatibles, erreurs à éviter. Tout pour réussir dès la première impression.',
        level: 'Débutant',
        read: '8 min',
        slug: 'guide-sublimation-debutant',
      },
      {
        title: 'Choisir sa presse à chaud : comparatif complet',
        desc: '38×38 vs 40×50 vs 40×60 — quelle taille choisir selon votre activité et vos marges ?',
        level: 'Intermédiaire',
        read: '5 min',
        slug: 'choisir-sa-presse-a-chaud',
      },
      {
        title: 'Sublimation sur mugs : le guide zéro défaut',
        desc: 'Technique, température, pression, positionnement. Imprimez des mugs parfaits à chaque fois.',
        level: 'Débutant',
        read: '6 min',
        slug: 'sublimation-mugs-guide',
      },
      {
        title: 'T-shirts sublimés vs transfert : quel procédé choisir ?',
        desc: 'Analyse coût/qualité entre sublimation, flex et sérigraphie pour optimiser vos marges.',
        level: 'Avancé',
        read: '10 min',
        slug: 'sublimation-vs-transfert',
      },
    ],
  },
  {
    emoji: '🎨',
    category: 'Sérigraphie',
    color: 'bg-red-50 border-red-100',
    tagColor: 'bg-red-100 text-red-700',
    articles: [
      {
        title: 'Bases de la Sérigraphie : de zéro à première impression',
        desc: 'Insolation, émulsion, exposition, raclage — les étapes clés pour votre premier cadre réussi.',
        level: 'Débutant',
        read: '12 min',
        slug: 'bases-serigraphie',
      },
      {
        title: 'Choisir sa base d\'impression : aqueuse vs plastisol',
        desc: 'Comparatif Antex XP10 vs bases plastisol : résistance, prix, usage pro.',
        level: 'Intermédiaire',
        read: '6 min',
        slug: 'base-aqueuse-vs-plastisol',
      },
      {
        title: 'Soies et mailles : quel numéro pour quel motif ?',
        desc: 'N°43 halftone, N°77 texte fin, N°120 quadri — le guide complet des soies sérigraphiques.',
        level: 'Avancé',
        read: '7 min',
        slug: 'guide-soies-serigraphie',
      },
    ],
  },
  {
    emoji: '🚀',
    category: 'DTF',
    color: 'bg-purple-50 border-purple-100',
    tagColor: 'bg-purple-100 text-purple-700',
    articles: [
      {
        title: 'Introduction au DTF : révolution de l\'impression textile',
        desc: 'Comprendre le procédé DTF, ses avantages vs sublimation et sérigraphie, et son potentiel business.',
        level: 'Débutant',
        read: '8 min',
        slug: 'introduction-dtf',
      },
      {
        title: 'Paramétrer son imprimante DTF : guide technique',
        desc: 'ICC profiles, densité d\'encre blanche, vitesses. Les réglages pour des transferts parfaits.',
        level: 'Avancé',
        read: '15 min',
        slug: 'parametrer-imprimante-dtf',
      },
      {
        title: 'Calcul de rentabilité DTF : coûts et marges par transfert',
        desc: 'Calculez votre coût de revient réel et fixez vos tarifs pour maximiser vos marges.',
        level: 'Business',
        read: '6 min',
        slug: 'rentabilite-dtf',
      },
    ],
  },
  {
    emoji: '💼',
    category: 'Business & Entrepreneuriat',
    color: 'bg-amber-50 border-amber-100',
    tagColor: 'bg-amber-100 text-amber-700',
    articles: [
      {
        title: 'Lancer votre atelier d\'impression en 30 jours',
        desc: 'Business plan, liste d\'équipement, premiers clients, pricing. Le plan d\'action complet pour créer votre activité.',
        level: 'Business',
        read: '15 min',
        slug: 'lancer-atelier-30-jours',
      },
      {
        title: 'Fixer ses tarifs : grille de prix recommandée Maroc',
        desc: 'Mugs, t-shirts, sweats, cadres — les prix du marché et comment vous positionner pour être rentable.',
        level: 'Business',
        read: '8 min',
        slug: 'grille-tarifs-impression-maroc',
      },
      {
        title: 'Trouver ses premiers clients : guide complet réseaux sociaux',
        desc: 'Instagram, TikTok, WhatsApp Business, Facebook Marketplace — les canaux qui fonctionnent au Maroc.',
        level: 'Business',
        read: '10 min',
        slug: 'trouver-clients-impression',
      },
    ],
  },
]

const LEVEL_COLORS: Record<string, string> = {
  'Débutant': 'bg-green-100 text-green-700',
  'Intermédiaire': 'bg-blue-100 text-blue-700',
  'Avancé': 'bg-purple-100 text-purple-700',
  'Business': 'bg-amber-100 text-amber-700',
}

export default function AcademiePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  return (
    <div className="bg-white">

      {/* HERO */}
      <div className="bg-navy-900 hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-white text-xs font-bold mb-6">
              📖 Académie NES — Contenu 100% Gratuit
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Maîtrisez l&apos;impression<br />
              <span className="gradient-text">textile au Maroc.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Des guides gratuits rédigés par nos techniciens pour vous aider à maîtriser
              la sublimation, la sérigraphie et le DTF. De débutant à expert, à votre rythme.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <span>📚 {GUIDES.reduce((a, g) => a + g.articles.length, 0)} guides disponibles</span>
              <span>🎯 4 niveaux</span>
              <span>💬 Questions ? WhatsApp Expert</span>
            </div>
          </div>
        </div>
      </div>

      {/* GUIDES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-16">
          {GUIDES.map(section => (
            <div key={section.category}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{section.emoji}</span>
                <div>
                  <h2 className="text-2xl font-black text-navy-900">{section.category}</h2>
                  <p className="text-sm text-gray-400">{section.articles.length} guides</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {section.articles.map(article => (
                  <Link
                    key={article.slug}
                    href={`/${locale}/academie/${article.slug}`}
                    className={`group flex flex-col border-2 ${section.color} rounded-2xl p-5 hover:-translate-y-1 hover:shadow-card-hover transition-all`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-2xs font-bold px-2 py-0.5 rounded-full ${LEVEL_COLORS[article.level] ?? 'bg-gray-100 text-gray-600'}`}>
                        {article.level}
                      </span>
                      <span className="text-2xs text-gray-400">⏱ {article.read}</span>
                    </div>
                    <h3 className="font-black text-navy-900 text-sm mb-2 group-hover:text-brand-red transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
                      {article.desc}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold text-navy-900 mt-4 group-hover:text-brand-red transition-colors">
                      Lire le guide
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* BOTTOM CTA */}
      <div className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h2 className="text-3xl font-black text-navy-900 mb-3">
            Vous avez une question technique ?
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Nos techniciens répondent sur WhatsApp en moins de 5 minutes. Problème de calibration,
            réglage de presse, choix de consommables — posez-nous tout.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={whatsappGeneralLink('Bonjour, j\'ai une question technique sur mon équipement d\'impression.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-8 py-4 text-base"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
              </svg>
              Poser une question à un expert
            </a>
            <Link href={`/${locale}/kits`} className="btn-amber px-8 py-4 text-base">
              Voir les Kits Démarrage →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
