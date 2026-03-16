import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { getFeaturedProducts, getCategoryTree } from '@/lib/woocommerce'
import { categoryHref, whatsappGeneralLink, whatsappProductLink } from '@/lib/utils'
import RoiCalculator from '@/components/home/RoiCalculator'
import ProductsSection from '@/components/home/ProductsSection'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nouvel Espace Sérigraphik — Lancez votre atelier d\'impression en 24h',
    description: 'Machines professionnelles, kits complets, consommables de qualité. Plus de 2 000 ateliers lancés partout au Maroc — livraison 24–48h, support WhatsApp 7j/7.',
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const KITS = [
  {
    id: 'p1',
    badge: null,
    badgeStyle: {},
    level: 'Pack N°1',
    levelColor: '#C8891F',
    name: 'Kit Démarrage',
    desc: "L'essentiel pour lancer votre activité de personnalisation textile dès aujourd'hui.",
    price: '4 400',
    oldPrice: '5 200',
    priceColor: '#C8891F',
    featured: false,
    items: [
      'Presse à chaud manuelle 38×38cm',
      'Papiers transfert A4 × 50 feuilles',
      'Scotch thermique + téflon inclus',
      "Guide de démarrage NES offert",
      '1 mois support WhatsApp',
    ],
    conso: '250–400 MAD/mois · Papier transfert + scotch',
    consoColor: 'rgba(200,137,31,0.05)',
    consoAccent: '#C8891F',
    wa: "Bonjour NES, je veux commander le Pack N°1 Kit Démarrage à 4 400 MAD. Disponible ?",
    btnBg: '#25D366',
  },
  {
    id: 'p2',
    badge: '★ Plus populaire',
    badgeStyle: { background: '#0F9080', color: '#fff' },
    level: 'Pack N°2',
    levelColor: '#0F9080',
    name: 'Kit Professionnel',
    desc: 'Presse 5en1, sublimation multi-supports. Le kit le plus vendu au Maroc.',
    price: '5 400',
    oldPrice: '6 800',
    priceColor: '#C8891F',
    featured: true,
    items: [
      'Presse 5en1 Freesub 38×38cm',
      'Encres sublimation 4 couleurs 100ml',
      'Papier sublimation A4 × 100 feuilles',
      'Mugs sublimables blancs × 12',
      'Guide vidéo + 1 mois support WA',
    ],
    conso: '400–700 MAD/mois · Encres + papier + mugs',
    consoColor: 'rgba(15,144,128,0.06)',
    consoAccent: '#0F9080',
    wa: "Bonjour NES, je veux commander le Pack N°2 Professionnel à 5 400 MAD. Disponible à livrer dans ma ville ?",
    btnBg: '#0F9080',
  },
  {
    id: 'p3',
    badge: 'Atelier Complet',
    badgeStyle: { background: '#C8891F', color: '#0C0A08' },
    level: 'Pack N°3',
    levelColor: '#E06040',
    name: 'Kit Atelier Avancé',
    desc: "Sérigraphie + sublimation. L'équipement complet pour un atelier professionnel.",
    price: '8 400',
    oldPrice: '10 500',
    priceColor: '#E06040',
    featured: false,
    items: [
      'Presse 40×50cm auto-ouverture',
      'Carrousel 1 couleur 1 station',
      'Encres sublimation 1L × 4 couleurs',
      'Base aqueuse Antex XP50 1kg',
      'Cadres aluminium 40×50cm × 2',
    ],
    conso: '800–1 500 MAD/mois · Encres + bases + soie',
    consoColor: 'rgba(224,96,64,0.04)',
    consoAccent: '#E06040',
    wa: "Bonjour NES, je suis intéressé par le Pack N°3 Atelier Avancé à 8 400 MAD. Pouvez-vous me contacter ?",
    btnBg: '#D05030',
  },
]

const CATEGORIES = [
  { emoji: '🔥', name: 'Presses à Chaud',       info: 'Manuelles, auto-ouverture, 5en1, casquette, mug', count: '23', slug: 'les-presses-a-chaud',             recur: false },
  { emoji: '🧴', name: 'Consommables Sérigraphie',info: 'Antex, Inknovator, cadres alu, soies, raclettes', count: '40', slug: 'les-consommables-de-serigraphie', recur: true  },
  { emoji: '🖋️', name: 'Consommables Sublimation',info: 'Encres, papiers, flex 14 couleurs, scotch thermique',count: '31', slug: 'les-consommables-de-sublimation', recur: true  },
  { emoji: '🖨️', name: "Machines d'Impression",  info: 'DTF, UV, traceurs grand format professionnels',  count: '8',  slug: 'les-machines-dimpression',        recur: false },
  { emoji: '⚙️', name: 'Machines de Sérigraphie', info: 'Carrousels 1C à 4C, insolation, séchoirs tunnel', count: '14', slug: 'les-machines-de-serigraphie',      recur: false },
  { emoji: '☕', name: 'Produits Sublimables',    info: 'Mugs, cadres marbre, coussins, porte-clés',       count: '52', slug: 'les-produits-sublimables',         recur: false },
]

const ACADEMY_ARTICLES = [
  { icon: '🚀', title: 'Lancer son atelier de 0 à 10 000 MAD/mois',          tag: 'Guide complet', meta: '15 min · Débutant',    slug: 'lancer-atelier-30-jours'          },
  { icon: '☕', title: 'Sublimation sur mug : guide débutant étape par étape', tag: 'Tutoriel',      meta: '10 min · Avec photos', slug: 'guide-sublimation-debutant'       },
  { icon: '⚖️', title: 'Sérigraphie vs Sublimation : quelle technique choisir ?', tag: 'Comparatif', meta: '8 min · Interactif',  slug: 'sublimation-vs-transfert'         },
  { icon: '🔍', title: 'Comment choisir sa presse à chaud en 2026 ?',          tag: 'Guide achat',   meta: '12 min · Tableau',     slug: 'choisir-sa-presse-a-chaud'        },
  { icon: '🎓', title: 'Tout sur les encres de sublimation — choisir et doser', tag: 'Technique',    meta: '18 min · Avec vidéo',  slug: 'guide-sublimation-debutant'       },
]

const TESTIMONIALS = [
  {
    initial: 'Y',
    name: 'Youssef A.',
    city: 'Marrakech · Atelier personnalisation',
    text: "J'ai commandé le Pack N°2 et j'ai reçu en 24h à Marrakech. En 2 semaines, j'avais déjà remboursé le kit avec mes premières commandes de mugs personnalisés. Incroyable.",
  },
  {
    initial: 'F',
    name: 'Fatima Z.',
    city: 'Casablanca · Sérigraphie textile',
    text: 'Le support WhatsApp est exceptionnel. À chaque question on me répond en quelques minutes avec des conseils concrets. Une équipe vraiment professionnelle et disponible.',
  },
  {
    initial: 'K',
    name: 'Karim B.',
    city: 'Fès · Atelier complet',
    text: "Le Pack N°3 m'a permis de faire de la sérigraphie ET de la sublimation. Mon chiffre d'affaires a doublé en 3 mois. Je recommande NES à tous les entrepreneurs sérieux.",
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const [{ root: cats }, products] = await Promise.all([
    getCategoryTree(),
    getFeaturedProducts(12),
  ])

  const waCalc = whatsappGeneralLink("Bonjour NES, j'ai calculé ma rentabilité et je veux lancer mon atelier. Quel kit me recommandez-vous ?")
  const waExpert = whatsappGeneralLink("Bonjour NES, je souhaite lancer mon atelier d'impression. Pouvez-vous m'aider à choisir le bon kit ?")

  return (
    <div style={{ background: '#0C0A08' }}>

      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          minHeight: '91vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 6%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gold glow */}
        <div style={{ position: 'absolute', top: -300, right: -300, width: 900, height: 900, background: 'radial-gradient(circle, rgba(200,137,31,.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ display: 'grid', gap: '5rem', alignItems: 'center' }}>

            {/* Left: copy */}
            <div>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <div style={{ width: 36, height: 1, background: '#C8891F' }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8891F' }}>
                  Leader de l&apos;impression au Maroc depuis 2018
                </span>
              </div>

              <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(48px,6vw,82px)', fontWeight: 700, lineHeight: 1.03, color: '#F5EDD8', marginBottom: 22 }}>
                Lancez votre<br />
                <em style={{ fontStyle: 'italic', color: '#C8891F' }}>atelier d&apos;impression</em><br />
                en 24 heures.
              </h1>

              <p style={{ fontSize: 16, color: '#B8AA94', lineHeight: 1.75, marginBottom: 34, maxWidth: 500 }}>
                Machines professionnelles, kits complets, consommables de qualité.
                Plus de 2 000 ateliers lancés partout au Maroc — le vôtre commence aujourd&apos;hui.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
                <Link
                  href={`/${locale}/kits`}
                  className="btn-gold"
                  style={{ padding: '14px 28px', fontSize: 14, textDecoration: 'none' }}
                >
                  Voir les Kits &amp; Packs →
                </Link>
                <a
                  href={waExpert}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-wa"
                  style={{ padding: '14px 28px', fontSize: 14 }}
                >
                  💬 Parler à un expert
                </a>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
                {[
                  { val: '2 000+', lbl: 'ateliers lancés' },
                  { val: '24h',    lbl: 'délai livraison' },
                  { val: '80+',    lbl: 'produits en stock' },
                  { val: '6',      lbl: 'villes au Maroc' },
                ].map((s, i) => (
                  <div key={s.lbl} style={{ display: 'flex', alignItems: 'stretch', gap: 36 }}>
                    {i > 0 && <div style={{ width: 1, background: 'rgba(245,237,216,0.1)' }} />}
                    <div>
                      <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 34, fontWeight: 700, color: '#F5EDD8', lineHeight: 1 }}>
                        {s.val}
                      </div>
                      <div style={{ fontSize: 11, color: '#B8AA94', marginTop: 2 }}>{s.lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: ROI Calculator */}
            <div className="hidden lg:block">
              <RoiCalculator variant="hero" waLink={waCalc} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════════════════════ */}
      <div style={{ background: '#1A1612', borderTop: '1px solid rgba(200,137,31,0.1)', borderBottom: '1px solid rgba(200,137,31,0.1)', padding: '22px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '🚚', strong: 'Livraison 24–48h', text: ' partout au Maroc' },
              { icon: '🛡️', strong: 'Garantie 1 an',    text: ' toutes machines' },
              { icon: '💬', strong: 'Support WhatsApp', text: ' 7 jours / 7' },
              { icon: '💳', strong: 'Paiement',         text: ' à la livraison' },
              { icon: '⭐', strong: '+2 000 clients',   text: ' satisfaits' },
            ].map((item, i) => (
              <div
                key={item.strong}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 28px',
                  position: 'relative',
                  ...(i > 0 ? { borderLeft: '1px solid rgba(245,237,216,0.08)' } : {}),
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: '#B8AA94' }}>
                  <strong style={{ fontWeight: 600, color: '#F5EDD8' }}>{item.strong}</strong>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          KITS
      ═══════════════════════════════════════════════════════════ */}
      <section id="kits" style={{ background: '#0C0A08', padding: '90px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div>
            <span className="stag">Kits &amp; Packs — Démarrage Garanti</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 700, lineHeight: 1.08, color: '#F5EDD8', marginBottom: 10 }}>
              Choisissez votre<br />
              <em style={{ fontStyle: 'italic', color: '#C8891F' }}>kit de démarrage</em>
            </h2>
            <p style={{ fontSize: 15, color: '#B8AA94', lineHeight: 1.75, maxWidth: 540, marginBottom: 0 }}>
              Chaque kit est conçu pour se rembourser en moins de 30 jours. Économisez jusqu&apos;à 2 100 MAD vs l&apos;achat séparé. Livraison offerte incluse.
            </p>
          </div>

          {/* Kits grid */}
          <div
            className="grid md:grid-cols-3 gap-5"
            style={{ display: 'grid', gap: 22, marginTop: 52 }}
          >
            {KITS.map(kit => (
              <div
                key={kit.id}
                style={{
                  background: '#1A1612',
                  border: kit.featured ? '1px solid rgba(200,137,31,0.35)' : '1px solid rgba(245,237,216,0.07)',
                  boxShadow: kit.featured ? '0 0 50px rgba(200,137,31,0.07)' : 'none',
                  borderRadius: 18,
                  padding: 30,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Badge */}
                {kit.badge && (
                  <span style={{ position: 'absolute', top: 18, right: 18, padding: '4px 10px', borderRadius: 20, fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', ...kit.badgeStyle }}>
                    {kit.badge}
                  </span>
                )}

                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: kit.levelColor, marginBottom: 10 }}>
                  {kit.level}
                </div>
                <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 27, fontWeight: 700, color: '#F5EDD8', marginBottom: 7 }}>
                  {kit.name}
                </div>
                <p style={{ fontSize: 13, color: '#B8AA94', marginBottom: 22, lineHeight: 1.55 }}>
                  {kit.desc}
                </p>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
                  <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 38, fontWeight: 700, color: kit.priceColor }}>
                    {kit.price}
                  </span>
                  <span style={{ fontSize: 13, color: '#B8AA94' }}>MAD</span>
                  <span style={{ fontSize: 14, color: '#B8AA94', textDecoration: 'line-through' }}>{kit.oldPrice}</span>
                </div>

                {/* Items */}
                <ul style={{ listStyle: 'none', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {kit.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#B8AA94', lineHeight: 1.4 }}>
                      <span style={{ color: '#C8891F', fontWeight: 800, flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Conso */}
                <div style={{ marginTop: 16, padding: 12, background: kit.consoColor, border: `1px solid ${kit.consoAccent}22`, borderRadius: 8, fontSize: 11, color: '#B8AA94' }}>
                  <strong style={{ color: kit.consoAccent }}>♻ Conso mensuel estimé :</strong>{' '}{kit.conso}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 9, marginTop: 22 }}>
                  <a
                    href={whatsappGeneralLink(kit.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: kit.btnBg, color: '#fff', padding: '11px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', fontFamily: 'Outfit,sans-serif', transition: 'transform .15s' }}
                  >
                    💬 Commander
                  </a>
                  <Link
                    href={`/${locale}/kits`}
                    style={{ padding: '11px 14px', borderRadius: 6, fontSize: 13, color: '#B8AA94', textDecoration: 'none', border: '1px solid rgba(245,237,216,0.12)', background: 'transparent', fontFamily: 'Outfit,sans-serif', transition: 'border-color .15s, color .15s' }}
                  >
                    Détails
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Custom kit CTA */}
          <div style={{ marginTop: 28, textAlign: 'center', padding: 24, border: '1px dashed rgba(245,237,216,0.11)', borderRadius: 12 }}>
            <p style={{ fontSize: 14, color: '#B8AA94', marginBottom: 14 }}>
              Besoin d&apos;un kit sur mesure adapté à votre budget et votre activité&nbsp;?
            </p>
            <a
              href={whatsappGeneralLink("Bonjour NES, je souhaite un kit personnalisé pour mon atelier. Pouvez-vous m'aider ?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-wa"
              style={{ display: 'inline-flex', padding: '11px 22px' }}
            >
              💬 Configurer mon kit personnalisé
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRODUCTS (client component — filter tabs)
      ═══════════════════════════════════════════════════════════ */}
      <ProductsSection products={products} />

      {/* ═══════════════════════════════════════════════════════════
          CATEGORIES
      ═══════════════════════════════════════════════════════════ */}
      <section id="categories" style={{ background: '#0C0A08', padding: '90px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div>
            <span className="stag">6 Univers Produits</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 700, lineHeight: 1.08, color: '#F5EDD8' }}>
              Tout ce dont vous<br />
              <em style={{ fontStyle: 'italic', color: '#C8891F' }}>avez besoin pour imprimer</em>
            </h2>
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(245,237,216,0.05)', border: '1px solid rgba(245,237,216,0.05)', borderRadius: 18, overflow: 'hidden', marginTop: 52 }}
          >
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={categoryHref(cat.slug, locale)}
                className="cat-item"
                style={{
                  display: 'block',
                  background: '#0C0A08',
                  padding: 34,
                  textDecoration: 'none',
                  transition: 'background .2s',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: 38, marginBottom: 18, display: 'block' }}>{cat.emoji}</span>
                <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 23, fontWeight: 700, color: '#F5EDD8', marginBottom: 6 }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: 12, color: '#B8AA94' }}>
                  {cat.info}
                  <strong style={{ color: '#C8891F', fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 22, fontWeight: 700, display: 'block', marginTop: 9 }}>
                    {cat.count} produits
                  </strong>
                </div>
                {cat.recur && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 11, padding: '3px 9px', background: 'rgba(11,107,94,0.18)', border: '1px solid rgba(11,107,94,0.38)', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#0F9080', textTransform: 'uppercase' }}>
                    ♻ Abonnement mensuel
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ACADÉMIE
      ═══════════════════════════════════════════════════════════ */}
      <section id="academie" style={{ background: '#1A1612', padding: '90px 6%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -300, right: -300, width: 700, height: 700, background: 'radial-gradient(circle, rgba(200,137,31,.04), transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

          <div className="grid lg:grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Articles */}
            <div>
              <span className="stag">Académie NES — 100% Gratuit</span>
              <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 700, lineHeight: 1.08, color: '#F5EDD8', marginBottom: 10 }}>
                Apprenez et<br />
                <em style={{ fontStyle: 'italic', color: '#C8891F' }}>développez votre atelier</em>
              </h2>
              <p style={{ fontSize: 15, color: '#B8AA94', lineHeight: 1.75, maxWidth: 540 }}>
                Guides pratiques, tutoriels vidéo et outils de calcul pour maîtriser votre métier et maximiser vos profits dès le premier mois.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 34 }}>
                {ACADEMY_ARTICLES.map(a => (
                  <Link
                    key={a.slug}
                    href={`/${locale}/academie/${a.slug}`}
                    style={{
                      background: '#0C0A08',
                      border: '1px solid rgba(245,237,216,0.06)',
                      borderRadius: 11,
                      padding: '16px 18px',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      transition: 'border-color .2s, transform .2s',
                    }}
                    className="art-item"
                  >
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#F5EDD8', marginBottom: 3 }}>{a.title}</div>
                      <div style={{ fontSize: 11, color: '#B8AA94', display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ background: 'rgba(200,137,31,0.11)', color: '#C8891F', padding: '2px 8px', borderRadius: 3, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>
                          {a.tag}
                        </span>
                        {a.meta}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Calculator */}
            <RoiCalculator variant="academie" waLink={whatsappGeneralLink("Bonjour NES, j'ai simulé ma rentabilité et je veux lancer mon atelier. Quel kit me recommandez-vous ?")} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHATSAPP SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="whatsapp" style={{ background: '#0C0A08', padding: '90px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="grid lg:grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Features */}
            <div>
              <span className="stag">Commerce WhatsApp — Naturel &amp; Rapide</span>
              <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 700, lineHeight: 1.08, color: '#F5EDD8', marginBottom: 10 }}>
                Commandez en<br />
                <em style={{ fontStyle: 'italic', color: '#C8891F' }}>30 secondes</em>
              </h2>
              <p style={{ fontSize: 15, color: '#B8AA94', lineHeight: 1.75, marginBottom: 34 }}>
                Pas de panier compliqué. Un message WhatsApp suffit. Nos experts vous répondent en moins de 30 minutes, 7 jours sur 7.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '💬', title: 'Commande express pré-remplie',    desc: "Chaque bouton « Commander » ouvre un message WhatsApp avec le produit et le prix déjà saisis. Zéro friction." },
                  { icon: '🚚', title: 'Confirmation & suivi livraison',   desc: "Votre numéro de suivi dans les 2h. Livraison 24–48h partout au Maroc. Paiement à la livraison disponible." },
                  { icon: '♻️', title: 'Rappel de réapprovisionnement',   desc: "Chaque mois, on vous contacte avant que vos consommables s'épuisent. Un message pour renouveler votre stock." },
                  { icon: '🎯', title: 'Conseil expert personnalisé',      desc: "Un expert NES vous guide dans le choix de l'équipement idéal selon votre activité et votre budget." },
                ].map(f => (
                  <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 11, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>
                      {f.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#F5EDD8', marginBottom: 3 }}>{f.title}</div>
                      <div style={{ fontSize: 12, color: '#B8AA94', lineHeight: 1.55 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#1A1612', border: '2px solid rgba(245,237,216,0.1)', borderRadius: 30, padding: 22, maxWidth: 310, width: '100%' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 15, borderBottom: '1px solid rgba(245,237,216,0.07)', marginBottom: 15 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#C8891F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#0C0A08', fontFamily: '"Cormorant Garamond",serif', flexShrink: 0 }}>
                    N
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#F5EDD8' }}>Nouvel Espace Sérigraphik</div>
                    <div style={{ fontSize: 11, color: '#25D366', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25D366', display: 'inline-block' }} />
                      En ligne
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div style={{ maxWidth: '83%', padding: '10px 13px', background: '#2E2820', borderRadius: '3px 13px 13px 13px', fontSize: 12, lineHeight: 1.5, color: '#F5EDD8', alignSelf: 'flex-start' }}>
                    Bonjour ! Je veux le Pack N°2, disponible à Casablanca ?
                    <div style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>10:32</div>
                  </div>
                  <div style={{ maxWidth: '83%', padding: '10px 13px', background: '#005C4B', borderRadius: '13px 13px 3px 13px', fontSize: 12, lineHeight: 1.5, color: '#F5EDD8', alignSelf: 'flex-end', textAlign: 'right' }}>
                    Bonjour ! ✅ Pack N°2 en stock. Livraison Casa : 24h. Paiement à la livraison possible 🙌
                    <div style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>10:34 ✓✓</div>
                  </div>
                  <div style={{ maxWidth: '83%', padding: '10px 13px', background: '#2E2820', borderRadius: '3px 13px 13px 13px', fontSize: 12, lineHeight: 1.5, color: '#F5EDD8', alignSelf: 'flex-start' }}>
                    Parfait ! Je prends aussi des encres supplémentaires ?
                    <div style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>10:36</div>
                  </div>
                  <div style={{ maxWidth: '83%', padding: '10px 13px', background: '#005C4B', borderRadius: '13px 13px 3px 13px', fontSize: 12, lineHeight: 1.5, color: '#F5EDD8', alignSelf: 'flex-end', textAlign: 'right' }}>
                    Je vous recommande le lot 1L × 4 couleurs — ça dure 3 mois. Je prépare votre commande 📦
                    <div style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>10:37 ✓✓</div>
                  </div>
                  {/* Typing indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 13px', background: '#2E2820', borderRadius: '3px 13px 13px 13px', width: 'fit-content' }}>
                    <span className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#B8AA94', display: 'inline-block' }} />
                    <span className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#B8AA94', display: 'inline-block' }} />
                    <span className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#B8AA94', display: 'inline-block' }} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <a
                  href={whatsappGeneralLink('Bonjour NES, je souhaite passer une commande.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa-dark"
                  style={{ display: 'inline-flex', padding: '14px 30px', fontSize: 14 }}
                >
                  💬 Ouvrir WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════ */}
      <section id="testimonials" style={{ background: '#1A1612', padding: '90px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="stag">2 000+ Ateliers Lancés au Maroc</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 700, lineHeight: 1.08, color: '#F5EDD8' }}>
              Ils ont réussi avec <em style={{ fontStyle: 'italic', color: '#C8891F' }}>NES</em>
            </h2>
          </div>

          <div
            className="grid md:grid-cols-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, marginTop: 52 }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{ background: '#0C0A08', border: '1px solid rgba(245,237,216,0.07)', borderRadius: 15, padding: 26 }}
              >
                <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 52, color: '#C8891F', opacity: .25, lineHeight: .75, marginBottom: 12 }}>
                  &ldquo;
                </div>
                <p style={{ fontSize: 14, color: '#B8AA94', lineHeight: 1.75, marginBottom: 18, fontStyle: 'italic' }}>
                  {t.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#9B6A10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#0C0A08', fontFamily: '"Cormorant Garamond",serif', flexShrink: 0 }}>
                    {t.initial}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#F5EDD8' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: '#B8AA94' }}>{t.city}</div>
                    <div style={{ color: '#C8891F', fontSize: 12, marginTop: 2 }}>★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA BAND
      ═══════════════════════════════════════════════════════════ */}
      <section id="cta-band" style={{ background: '#C8891F', padding: '72px 6%', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4.2vw,58px)', fontWeight: 700, color: '#0C0A08', marginBottom: 14 }}>
            Votre atelier commence aujourd&apos;hui.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(12,10,8,0.7)', marginBottom: 30 }}>
            Rejoignez 2 000+ entrepreneurs marocains qui ont lancé leur activité avec NES.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/${locale}/kits`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#0C0A08', color: '#F5EDD8', padding: '14px 30px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', fontFamily: 'Outfit,sans-serif', transition: 'transform .15s' }}
            >
              Choisir mon kit →
            </Link>
            <a
              href={whatsappGeneralLink("Bonjour NES, je veux lancer mon atelier. Pouvez-vous m'aider à démarrer ?")}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '14px 30px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', fontFamily: 'Outfit,sans-serif', transition: 'transform .15s, box-shadow .15s' }}
            >
              💬 Parler à un expert maintenant
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
