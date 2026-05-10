import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { whatsappGeneralLink } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Devis Professionnel B2B — Nouvel Espace Sérigraphik',
  description: 'Commandes en gros, devis école / association / entreprise. Prix sur volume, facturation pro, livraison dédiée.',
}

const WA_SVG = (
  <svg style={{ width: 20, height: 20, flexShrink: 0 }} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
)

const SEGMENTS = [
  { icon: '🏫', title: 'Établissements scolaires', desc: 'T-shirts fin d\'année, uniformes personnalisés, goodies événements scolaires.', example: 'Ex : 200 t-shirts fin d\'année, orientation rapide sur la bonne technique et le bon délai.' },
  { icon: '⚽', title: 'Clubs & associations', desc: 'Maillots, t-shirts supporters, vêtements de campagne ou équipements d\'événement.', example: 'Ex : lot club de sport, avec quantité, personnalisation et livraison cadrées dès le départ.' },
  { icon: '🏨', title: 'Hôtels & restaurants', desc: 'Uniformes, tabliers, tenues de service, objets de marque et besoins récurrents.', example: 'Ex : série d\'uniformes ou de goodies avec suivi commercial et facturation pro.' },
  { icon: '🏢', title: 'Entreprises & agences', desc: 'Goodies corporate, activations, team building, événements, cadeaux B2B.', example: 'Ex : lot de mugs, tote bags ou vêtements avec devis clair et délais confirmés.' },
  { icon: '🎓', title: 'Universités & écoles sup', desc: 'Clubs étudiants, séminaires, promos, remises, événements campus.', example: 'Ex : sweats ou t-shirts promotion avec quantité, livraison et contraintes étudiantes prises en compte.' },
  { icon: '🏭', title: 'Ateliers & sous-traitants', desc: 'Consommables, machines, pièces et commandes de réassort métier.', example: 'Ex : besoin atelier urgent sur encres, films, papiers, flex ou accessoires de production.' },
] as const

const ADVANTAGES = [
  { code: 'ADV-01', title: 'Qualification rapide', desc: 'NES clarifie le besoin, la quantité, la technique et le délai avant de chiffrer.' },
  { code: 'ADV-02', title: 'Facture et logique pro', desc: 'Devis, facturation et relation commerciale adaptés aux organisations.' },
  { code: 'ADV-03', title: 'Support Maroc', desc: 'Un interlocuteur NES suit la demande avec un vrai niveau de réponse locale.' },
  { code: 'ADV-04', title: 'Réponse exploitable', desc: 'Vous recevez une proposition utile pour décider, pas une réponse vague.' },
] as const

const INTAKE_STEPS = [
  {
    code: 'STEP-01',
    title: 'Vous envoyez le besoin',
    text: 'Quantité, produit, ville, délai, visuel ou contrainte. Plus la base est claire, plus le devis est rapide et juste.',
  },
  {
    code: 'STEP-02',
    title: 'NES qualifie la demande',
    text: 'Technique, support, niveau de gamme, faisabilité, urgence, réassort ou production ponctuelle.',
  },
  {
    code: 'STEP-03',
    title: 'Vous recevez une proposition nette',
    text: 'Prix, délai, options, facturation, et prochaine étape pour lancer réellement la commande.',
  },
] as const

const REQUEST_CHECKLIST = [
  'quantité estimée',
  'produit ou famille de produit',
  'ville de livraison',
  'date limite ou urgence',
  'logo, visuel ou référence',
  'si possible, budget cible ou niveau de gamme',
]

const QUALIFICATION_FIELDS = [
  { label: 'TYPE DE BESOIN', value: 'commande volume / réassort / devis machine / goodies / textile' },
  { label: 'SUPPORT / TECHNIQUE', value: 'sérigraphie / sublimation / DTF / UV / broderie / autre' },
  { label: 'DÉLAI', value: 'urgent / cette semaine / ce mois / à planifier' },
  { label: 'PIÈCES JOINTES', value: 'logo, plan, visuel, format, référence, photo ou besoin libre' },
] as const

export default function DevisProPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const waB2B = whatsappGeneralLink("Bonjour NES, je représente une entreprise / école / association et je souhaite un devis professionnel structuré. Voici mon besoin :")
  const waGros = whatsappGeneralLink("Bonjour NES, je souhaite passer une commande en volume ou mettre en place un réassort régulier. Pouvez-vous me transmettre votre orientation tarifaire ?")

  return (
    <div style={{ minHeight: '100vh', background: '#0b1016', color: '#dde3eb' }}>
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,181,154,0.12)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 82% 18%, rgba(242,99,22,0.16) 0%, rgba(242,99,22,0.04) 30%, rgba(0,0,0,0) 58%)' }} />
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 6% 62px', position: 'relative', zIndex: 1 }}>
          <nav style={{ fontSize: 11, color: 'rgba(228,190,177,0.62)', marginBottom: 24, display: 'flex', gap: 6, alignItems: 'center', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <Link href={`/${locale}`} style={{ color: 'rgba(228,190,177,0.62)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span style={{ color: '#ffb59a' }}>Devis pro</span>
          </nav>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px solid rgba(255,92,0,0.34)', background: 'rgba(255,92,0,0.1)', color: '#ffb59a', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 18 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: '#ff5c00', display: 'inline-block' }} />
            B2B // Qualification NES
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
            <div>
              <h1 style={{ fontSize: 'clamp(38px,5vw,74px)', lineHeight: 1.03, letterSpacing: '-0.045em', color: '#f6efe8', fontWeight: 700, marginBottom: 18, maxWidth: 760 }}>
                Devis professionnel, cadrage rapide, réponse exploitable.
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(221,227,235,0.76)', lineHeight: 1.78, maxWidth: 660, marginBottom: 28 }}>
                Entreprises, écoles, associations et ateliers peuvent ici entrer dans un vrai parcours NES. Le but n&apos;est pas seulement de demander un prix, mais de cadrer le besoin pour recevoir une proposition utile, avec le bon produit, la bonne technique et le bon délai.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginBottom: 26 }}>
                {QUALIFICATION_FIELDS.map((field) => (
                  <div key={field.label} style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: '16px 14px 15px' }}>
                    <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 7 }}>{field.label}</div>
                    <div style={{ fontSize: 13, color: 'rgba(221,227,235,0.76)', lineHeight: 1.6 }}>{field.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
                <a
                  href={waB2B}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', background: '#ff5c00', color: '#521800', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
                >
                  {WA_SVG} Envoyer mon besoin
                </a>
                <Link
                  href={`/${locale}/contact`}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '14px 20px', border: '1px solid rgba(255,181,154,0.2)', background: 'rgba(255,255,255,0.03)', color: '#dde3eb', fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
                >
                  Ouvrir le formulaire NES
                </Link>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 24px' }}>
                {['Devis structuré', 'Facturation pro', 'Support local', 'Commandes récurrentes'].map((item) => (
                  <span key={item} style={{ fontSize: 12, color: 'rgba(221,227,235,0.72)', fontWeight: 700, letterSpacing: '0.04em' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 20 }}>
              <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>CHECKLIST // POUR ALLER VITE</div>
              <p style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)', lineHeight: 1.65, marginBottom: 14 }}>
                Si vous voulez une réponse rapide et exploitable, commencez par envoyer ces éléments. Plus la demande est propre, plus le traitement commercial est efficace.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REQUEST_CHECKLIST.map((item, index) => (
                  <div key={item} style={{ display: 'flex', gap: 10, padding: '11px 0', borderTop: index < 2 ? '1px solid rgba(171,137,125,0.14)' : '1px solid rgba(171,137,125,0.12)' }}>
                    <span style={{ color: '#ffb59a', fontWeight: 800, flexShrink: 0 }}>{`0${index + 1}`}</span>
                    <span style={{ fontSize: 12, color: 'rgba(221,227,235,0.76)', lineHeight: 1.55 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 6% 8px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INTAKE_STEPS.map((step) => (
            <div key={step.code} style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 20 }}>
              <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>{step.code}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#f6efe8', lineHeight: 1.15, marginBottom: 8 }}>{step.title}</div>
              <p style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)', lineHeight: 1.7 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 6%' }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Secteurs servis</div>
          <h2 style={{ fontSize: 'clamp(28px,3.8vw,46px)', fontWeight: 700, color: '#f6efe8', letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: 10 }}>
            NES traite des demandes réelles, secteur par secteur.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(221,227,235,0.7)', lineHeight: 1.75, maxWidth: 720 }}>
            L&apos;objectif n&apos;est pas de paraître premium dans le vide. Il faut comprendre le contexte, la quantité, la technique et la pression de délai propre à chaque organisation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {SEGMENTS.map((segment) => (
            <div key={segment.title} style={{ border: '1px solid rgba(171,137,125,0.18)', background: 'rgba(255,255,255,0.03)', padding: 22 }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{segment.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#f6efe8', marginBottom: 8 }}>{segment.title}</h3>
              <p style={{ fontSize: 13, color: 'rgba(221,227,235,0.72)', lineHeight: 1.65, marginBottom: 12 }}>{segment.desc}</p>
              <div style={{ borderTop: '1px solid rgba(171,137,125,0.14)', paddingTop: 12, fontSize: 12, color: '#ffb59a', lineHeight: 1.55 }}>
                {segment.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,181,154,0.08)', borderBottom: '1px solid rgba(255,181,154,0.08)', background: '#111820', padding: '56px 6%' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Pourquoi ce parcours</div>
            <h2 style={{ fontSize: 'clamp(26px,3.4vw,40px)', fontWeight: 700, color: '#f6efe8', letterSpacing: '-0.03em', lineHeight: 1.08 }}>Plus clair qu&apos;un simple contact, plus utile qu&apos;un formulaire vague.</h2>
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

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '56px 6% 72px' }}>
        <div style={{ border: '1px solid rgba(255,92,0,0.26)', background: 'linear-gradient(180deg, rgba(255,92,0,0.12) 0%, rgba(255,255,255,0.03) 100%)', padding: 28 }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-8 items-start">
            <div>
              <div style={{ fontSize: 10, color: '#ff9f6a', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Finaliser la demande</div>
              <h2 style={{ fontSize: 'clamp(28px,3.8vw,46px)', fontWeight: 700, color: '#f6efe8', letterSpacing: '-0.035em', lineHeight: 1.04, marginBottom: 12 }}>
                Envoyez votre besoin, NES qualifie et répond.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(221,227,235,0.74)', lineHeight: 1.75, maxWidth: 620 }}>
                Si vous avez déjà le contexte, la quantité ou un visuel, partez sur WhatsApp. Si vous voulez cadrer plus proprement votre demande, passez aussi par le formulaire NES.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
              <a
                href={waB2B}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '15px 22px', background: '#ff5c00', color: '#521800', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}
              >
                {WA_SVG} Devis WhatsApp
              </a>
              <a
                href={waGros}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 20px', border: '1px solid rgba(255,181,154,0.2)', background: 'rgba(255,255,255,0.03)', color: '#dde3eb', fontSize: 13, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}
              >
                Réassort / gros volume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
