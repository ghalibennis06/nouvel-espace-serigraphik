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
  { icon: '🏫', title: 'Établissements scolaires', desc: 'T-shirts fin d\'année, uniformes personnalisés, goodies événements scolaires.', example: 'Ex : 200 t-shirts fin d\'année — 80 MAD/pièce (vs 120 MAD unité)' },
  { icon: '⚽', title: 'Clubs & Associations', desc: 'Maillots, t-shirts supporters, vêtements de campagne pour ONG.', example: 'Ex : Kit 100 t-shirts club de foot — livraison + facturation pro incluses' },
  { icon: '🏨', title: 'Hôtels & Restaurants', desc: 'Uniformes personnel, t-shirts de marque, cadeaux client.', example: 'Ex : 50 polos uniformes avec logo — prix dégressif à partir de 30 pièces' },
  { icon: '🏢', title: 'Entreprises & Agences', desc: 'Goodies corporate, team-building, événements, cadeaux B2B.', example: 'Ex : 150 mugs sublimés avec logo — facture TVA, délai prioritaire' },
  { icon: '🎓', title: 'Universités & Grandes Écoles', desc: 'Tenues étudiantes, events, remises de diplômes, séminaires.', example: 'Ex : 300 sweats avec logo promo — livraison sur campus' },
  { icon: '🏭', title: 'Ateliers & Sous-traitants', desc: 'Commandes en gros de consommables, machines, revente B2B.', example: 'Ex : 12 bouteilles encres DTF + 10kg poudre — prix grossiste' },
]

const ADVANTAGES = [
  { icon: '💰', title: 'Prix dégressifs', desc: 'À partir de 10 pièces, les prix baissent. Demandez votre grille tarifaire.' },
  { icon: '🧾', title: 'Facture + devis pro', desc: 'Document officiel pour vos dépenses entreprise, école ou association.' },
  { icon: '🚚', title: 'Livraison prioritaire', desc: 'Traitement prioritaire pour les commandes B2B. Suivi dédié.' },
  { icon: '💬', title: 'Interlocuteur dédié', desc: 'Un expert NES suit votre commande du devis à la livraison.' },
  { icon: '📦', title: 'Emballage professionnel', desc: 'Conditionnement adapté aux grandes quantités, palettes si nécessaire.' },
  { icon: '🔄', title: 'Commandes récurrentes', desc: 'Programme de réapprovisionnement mensuel pour les consommables.' },
]

const INTAKE_STEPS = [
  {
    title: '1. Vous envoyez votre besoin',
    text: 'Quantité, produit, délai, ville de livraison, logo ou contraintes techniques. Plus la demande est claire, plus le devis est rapide.',
  },
  {
    title: '2. NES qualifie la demande',
    text: 'Nous vérifions le produit, la technique, la quantité, les fichiers et le niveau de priorité avant de chiffrer.',
  },
  {
    title: '3. Vous recevez une proposition exploitable',
    text: 'Prix, délai, options, facturation et prochaines étapes. Vous recevez une réponse exploitable pour avancer réellement.',
  },
]

const REQUEST_CHECKLIST = [
  'quantité estimée',
  'produit ou famille de produit',
  'ville de livraison',
  'date limite ou urgence',
  'logo, visuel ou besoin de personnalisation',
  'si possible, budget cible ou niveau de gamme',
]

export default function DevisProPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const waB2B = whatsappGeneralLink("Bonjour NES, je représente une entreprise / école / association et je souhaite un devis professionnel. Pouvez-vous me contacter ?")
  const waGros = whatsappGeneralLink("Bonjour NES, je souhaite passer une commande en volume. Pouvez-vous me transmettre votre grille tarifaire grossiste ?")

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '72px 6% 56px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 24, display: 'flex', gap: 6, alignItems: 'center' }}>
            <Link href={`/${locale}`} className="link-blue" style={{ color: 'var(--text2)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span style={{ color: 'var(--text)' }}>Devis Professionnel</span>
          </nav>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--bluesoft)', border: '1px solid var(--bluesoft2)', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.08em' }}>🏢 COMMANDES PROFESSIONNELLES B2B</span>
          </div>

          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(32px,4.5vw,58px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginBottom: 20 }}>
            Prix entreprise.<br />
            <span style={{ color: 'var(--blue)' }}>Devis en moins de 2h.</span>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 700, marginBottom: 36 }}>
            Cette page rassure les entreprises, écoles, associations et ateliers qui ont besoin d’un vrai interlocuteur, d’un devis clair et d’une exécution sérieuse au Maroc.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={waB2B} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              {WA_SVG} Demander un devis maintenant
            </a>
            <Link href={`/${locale}/contact`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', border: '1px solid var(--bluesoft2)', color: 'var(--blue)', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              📋 Passer par le formulaire NES →
            </Link>
          </div>

          <div style={{ marginTop: 22, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 20px', maxWidth: 720 }}>
            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: 8 }}>Pour aller vite</div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, marginBottom: 12 }}>
              Si vous voulez un devis exploitable rapidement, envoyez directement ces éléments dans votre message.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }} className="grid md:grid-cols-2 gap-2">
              {REQUEST_CHECKLIST.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 28px', marginTop: 28 }}>
            {['✅ Devis sous 2h', '✅ Facture + TVA', '✅ Prix dégressifs', '✅ Livraison prioritaire'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'var(--text2)', fontWeight: 500 }}>{t}</span>
            ))}
          </div>

          <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }} className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: 'Je veux commander pour mon organisation',
                text: 'Vous avez un besoin clair en quantité, en délai et en facturation.',
              },
              {
                title: 'Je veux comparer plusieurs solutions',
                text: 'Vous hésitez entre plusieurs produits, techniques ou budgets et vous avez besoin d’un vrai échange.',
              },
              {
                title: 'Je veux une relation récurrente',
                text: 'Vous cherchez un partenaire de réassort ou de commandes répétées, avec une relation commerciale suivie.',
              },
            ].map((item) => (
              <div key={item.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, boxShadow: 'var(--shadow)' }}>
                <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--blue)', marginBottom: 8 }}>Parcours devis</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 6% 12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }} className="grid md:grid-cols-3 gap-4">
          {INTAKE_STEPS.map((step) => (
            <div key={step.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{step.title}</div>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.65 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Who we serve ─────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 6%' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--blue)' }}>Qui fait appel à NES B2B ?</span>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 34, fontWeight: 700, color: 'var(--text)', marginTop: 10 }}>
            Nous traitons des demandes concrètes, secteur par secteur
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {SEGMENTS.map(s => (
            <div key={s.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
              <span style={{ fontSize: 32, display: 'block', marginBottom: 14 }}>{s.icon}</span>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</p>
              <div style={{ fontSize: 11, color: 'var(--blue)', fontStyle: 'italic', padding: '8px 12px', background: 'var(--bluesoft)', borderRadius: 6 }}>
                {s.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── B2B advantages ───────────────────────────────────────── */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '64px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 34, fontWeight: 700, color: 'var(--text)' }}>
              Les avantages du compte B2B NES
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {ADVANTAGES.map(a => (
              <div key={a.title} style={{ display: 'flex', gap: 14, padding: '18px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Pricing tiers ────────────────────────────────────────── */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '64px 6%' }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 30, fontWeight: 700, color: 'var(--text)', marginBottom: 8, textAlign: 'center' }}>
          Exemple de tarification déguéssive
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text2)', textAlign: 'center', marginBottom: 32 }}>
          Exemple sur t-shirt coton sérigraphié 1 couleur — prix en MAD HT
        </p>
        <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
                {['Quantité', 'Prix unitaire', 'Total estimé', 'Remise'].map(h => (
                  <th key={h} style={{ padding: '14px 18px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text2)', textAlign: 'center' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { qty: '1–9 pièces',    price: '140 MAD', total: '—', discount: 'Tarif standard' },
                { qty: '10–49 pièces',  price: '110 MAD', total: '1 100–5 390 MAD', discount: '-21%' },
                { qty: '50–99 pièces',  price: '95 MAD',  total: '4 750–9 405 MAD', discount: '-32%' },
                { qty: '100–199 pièces',price: '80 MAD',  total: '8 000–15 920 MAD', discount: '-43%' },
                { qty: '200+ pièces',   price: 'Sur devis', total: 'Sur devis', discount: 'Max remise' },
              ].map((row, i) => (
                <tr key={row.qty} style={{ borderBottom: '1px solid var(--border)', background: i % 2 !== 0 ? 'var(--card)' : 'transparent' }}>
                  <td style={{ padding: '12px 18px', fontSize: 13, fontWeight: 600, color: 'var(--text)', textAlign: 'center' }}>{row.qty}</td>
                  <td style={{ padding: '12px 18px', fontSize: 13, color: 'var(--text)', textAlign: 'center', fontWeight: i >= 4 ? 700 : 400 }}>{row.price}</td>
                  <td style={{ padding: '12px 18px', fontSize: 13, color: 'var(--text2)', textAlign: 'center' }}>{row.total}</td>
                  <td style={{ padding: '12px 18px', fontSize: 12, fontWeight: 700, color: i === 0 ? 'var(--text2)' : 'var(--green)', textAlign: 'center' }}>{row.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text2)', marginTop: 12, textAlign: 'center' }}>
          * Prix indicatifs. Tarification exacte sur devis selon produit, couleurs, technique et localisation.
        </p>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <div style={{ background: 'var(--blue)', padding: '72px 6%', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 38, fontWeight: 700, color: '#fff', marginBottom: 14 }}>
            Votre devis en moins de 2 heures.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: 32 }}>
            Envoyez-nous votre besoin (quantité, type de produit, délai) et nous vous répondons avec une proposition détaillée.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={waB2B} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 32px', background: 'var(--green)', color: '#fff', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              {WA_SVG} Devis WhatsApp — réponse 2h
            </a>
            <a href={waGros} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 32px', background: '#fff', color: 'var(--blue)', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              📋 Tarifs grossiste
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
