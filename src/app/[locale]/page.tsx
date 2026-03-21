import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getFeaturedProducts, getCategoryTree } from '@/lib/woocommerce'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'
import RoiCalculator from '@/components/home/RoiCalculator'
import ProductsSection from '@/components/home/ProductsSection'
import { KITS as KITS_DATA } from '@/lib/data/kits'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nouvel Espace Sérigraphik — Lancez votre atelier d\'impression en 24h',
    description: 'Machines professionnelles, kits complets, consommables de qualité. Plus de 2 000 ateliers lancés partout au Maroc — livraison 24–48h, support WhatsApp 7j/7.',
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

// Kit data from shared source — no duplication
const KITS = KITS_DATA

const CATEGORIES = [
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2Fpresse-40x50autoopen.jpg', name: 'Presses à Chaud',        info: 'Manuelles, auto-ouverture, 5en1, casquette, mug', count: '23', slug: 'les-presses-a-chaud',             recur: false },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F61gC992Xr5L.jpg',          name: 'Consommables Sérigraphie', info: 'Antex, Inknovator, cadres alu, soies, raclettes',   count: '40', slug: 'les-consommables-de-serigraphie', recur: true  },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2025%2F01%2FINK-C.png',               name: 'Consommables Sublimation', info: 'Encres, papiers, flex 14 couleurs, scotch thermique', count: '31', slug: 'les-consommables-de-sublimation', recur: true  },
  { img: null,                                                                                                                  name: "Machines d'Impression",   info: 'DTF, UV, traceurs grand format professionnels',     count: '8',  slug: 'les-machines-dimpression',        recur: false },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F4-couleurs-4-stations-pro.jpg', name: 'Machines de Sérigraphie', info: 'Carrousels 1C à 4C, insolation, séchoirs tunnel',  count: '14', slug: 'les-machines-de-serigraphie',      recur: false },
  { img: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2FSH02.png',                name: 'Produits Sublimables',     info: 'Mugs, cadres marbre, coussins, porte-clés',          count: '52', slug: 'les-produits-sublimables',         recur: false },
]

const ACADEMY_ARTICLES = [
  { icon: '🚀', title: 'Lancer son atelier de 0 à 10 000 MAD/mois',          tag: 'Guide complet', meta: '15 min · Débutant',    slug: 'lancer-atelier-30-jours'          },
  { icon: '☕', title: 'Sublimation sur mug : guide débutant étape par étape', tag: 'Tutoriel',      meta: '10 min · Avec photos', slug: 'guide-sublimation-debutant'       },
  { icon: '⚖️', title: 'Sérigraphie vs Sublimation : quelle technique choisir ?', tag: 'Comparatif', meta: '8 min · Interactif',  slug: 'sublimation-vs-transfert'         },
  { icon: '🔍', title: 'Comment choisir sa presse à chaud en 2026 ?',          tag: 'Guide achat',   meta: '12 min · Tableau',     slug: 'choisir-sa-presse-a-chaud'        },
  { icon: '🎓', title: 'Tout sur les encres de sublimation — choisir et doser', tag: 'Technique',    meta: '18 min · Avec vidéo',  slug: 'guide-sublimation-debutant'       },
]


// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)

  const [{ root: cats }, products] = await Promise.all([
    getCategoryTree(),
    getFeaturedProducts(12),
  ])

  const waExpert = whatsappGeneralLink("Bonjour NES, je souhaite lancer mon atelier d'impression. Pouvez-vous m'aider à choisir le bon kit ?")

  return (
    <div style={{ background: 'var(--bg)' }}>

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
        {/* Blue glow */}
        <div style={{ position: 'absolute', top: -300, right: -300, width: 900, height: 900, background: 'radial-gradient(circle, var(--bluesoft) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center" style={{ display: 'grid', gap: '5rem', alignItems: 'center' }}>

            {/* Left: copy */}
            <div>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <div style={{ width: 36, height: 1, background: 'var(--blue)' }} />
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue)' }}>
                  Leader de l&apos;impression au Maroc depuis 2018
                </span>
              </div>

              <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(48px,6vw,82px)', fontWeight: 700, lineHeight: 1.03, color: 'var(--text)', marginBottom: 22 }}>
                Lancez votre<br />
                <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>atelier d&apos;impression</em><br />
                en 24 heures.
              </h1>

              <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 34, maxWidth: 500 }}>
                Machines professionnelles, kits complets, consommables de qualité.
                Plus de 2 000 ateliers lancés partout au Maroc — le vôtre commence aujourd&apos;hui.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 44 }}>
                <Link
                  href={`/${locale}/kits`}
                  className="btn-orange"
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
                    {i > 0 && <div style={{ width: 1, background: 'var(--border2)' }} />}
                    <div>
                      <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 34, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                        {s.val}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 2 }}>{s.lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: ROI Calculator — desktop */}
            <div className="hidden lg:block">
              <RoiCalculator variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════════════════════ */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '22px 6%' }}>
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
                  ...(i > 0 ? { borderLeft: '1px solid var(--border)' } : {}),
                }}
              >
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: 'var(--text2)' }}>
                  <strong style={{ fontWeight: 600, color: 'var(--text)' }}>{item.strong}</strong>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MOBILE ROI CALCULATOR (hidden on lg+ — shown there in hero)
      ═══════════════════════════════════════════════════════════ */}
      <section className="lg:hidden" style={{ background: 'var(--surface)', padding: '52px 6%', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <RoiCalculator variant="academie" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BUYER JOURNEY — par où commencer ?
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--surface)', padding: '72px 6%', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="stag">Votre point de départ</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}>
              Quel est votre <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>profil ?</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { icon: '🚀', title: 'Je démarre de zéro', desc: 'Aucune expérience, budget serré. Je veux lancer rapidement.', cta: 'Kit Sublimation Starter', href: `/${locale}/kits`, color: 'var(--blue)' },
              { icon: '🎨', title: 'J\'ai déjà du matériel', desc: 'J\'ai une presse mais j\'ai besoin de consommables ou d\'un upgrade.', cta: 'Explorer le catalogue', href: `/${locale}/categorie-produit`, color: 'var(--teal)' },
              { icon: '🏭', title: 'Je veux produire en volume', desc: 'Atelier DTF, production intensive, sous-traitance textile.', cta: 'Kit DTF Complet', href: `/${locale}/kits`, color: 'var(--orange)' },
              { icon: '🏢', title: 'Achat B2B / École / Agence', desc: 'Commande pro, devis, facture, livraison entreprise.', cta: 'Demander un devis', href: `/${locale}/contact`, color: 'var(--green)' },
            ].map(p => (
              <Link key={p.title} href={p.href}
                style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '22px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, textDecoration: 'none', transition: 'border-color .2s, transform .2s' }}
                className="art-item"
              >
                <span style={{ fontSize: 28 }}>{p.icon}</span>
                <strong style={{ fontSize: 14, color: 'var(--text)', fontWeight: 700 }}>{p.title}</strong>
                <span style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55, flex: 1 }}>{p.desc}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: p.color }}>
                  {p.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          KITS
      ═══════════════════════════════════════════════════════════ */}
      <section id="kits" style={{ background: 'var(--bg)', padding: '90px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div>
            <span className="stag">Kits &amp; Packs — Démarrage Garanti</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 700, lineHeight: 1.08, color: 'var(--text)', marginBottom: 10 }}>
              Choisissez votre<br />
              <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>kit de démarrage</em>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 540, marginBottom: 0 }}>
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
                  background: 'var(--card)',
                  border: kit.featured ? `1px solid ${kit.accent}` : '1px solid var(--border)',
                  boxShadow: kit.featured ? `0 0 50px ${kit.accentSoft}` : 'none',
                  borderRadius: 18,
                  padding: 30,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Badge */}
                {kit.badge && (
                  <span style={{ position: 'absolute', top: 18, right: 18, padding: '4px 10px', borderRadius: 20, fontSize: 9, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', background: kit.accent, color: '#fff' }}>
                    {kit.badge}
                  </span>
                )}

                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: kit.accent, marginBottom: 10 }}>
                  {kit.packNum}
                </div>
                <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 27, fontWeight: 700, color: 'var(--text)', marginBottom: 7 }}>
                  {kit.name}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 22, lineHeight: 1.55 }}>
                  {kit.desc}
                </p>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
                  <span style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 38, fontWeight: 700, color: kit.accent }}>
                    {kit.priceDisplay}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>MAD</span>
                  <span style={{ fontSize: 14, color: 'var(--text2)', textDecoration: 'line-through' }}>{kit.oldPrice}</span>
                </div>

                {/* Items */}
                <ul style={{ listStyle: 'none', marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {kit.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'var(--text2)', lineHeight: 1.4 }}>
                      <span style={{ color: kit.accent, fontWeight: 800, flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Conso */}
                <div style={{ marginTop: 16, padding: 12, background: kit.accentSoft, border: `1px solid var(--border)`, borderRadius: 8, fontSize: 11, color: 'var(--text2)' }}>
                  <strong style={{ color: kit.accent }}>♻ Conso mensuel estimé :</strong>{' '}{kit.conso}
                </div>

                {/* ROI badge */}
                <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text2)' }}>
                  ⏱ Setup {kit.setupTime} · 💰 ROI estimé {kit.roi}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 9, marginTop: 18 }}>
                  <a
                    href={whatsappGeneralLink(kit.ctaMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, background: kit.btnBg, color: '#fff', padding: '11px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', fontFamily: 'Outfit,sans-serif', transition: 'transform .15s' }}
                  >
                    💬 Commander
                  </a>
                  <Link
                    href={`/${locale}/kits`}
                    style={{ padding: '11px 14px', borderRadius: 6, fontSize: 13, color: 'var(--text2)', textDecoration: 'none', border: '1px solid var(--border2)', background: 'transparent', fontFamily: 'Outfit,sans-serif', transition: 'border-color .15s, color .15s' }}
                  >
                    Détails
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Custom kit CTA */}
          <div style={{ marginTop: 28, textAlign: 'center', padding: 24, border: '1px dashed var(--border2)', borderRadius: 12 }}>
            <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 14 }}>
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
      <ProductsSection products={products} locale={locale} />

      {/* ═══════════════════════════════════════════════════════════
          CATEGORIES
      ═══════════════════════════════════════════════════════════ */}
      <section id="categories" style={{ background: 'var(--bg)', padding: '90px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div>
            <span className="stag">6 Univers Produits</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 700, lineHeight: 1.08, color: 'var(--text)' }}>
              Tout ce dont vous<br />
              <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>avez besoin pour imprimer</em>
            </h2>
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 52 }}
          >
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={categoryHref(cat.slug, locale)}
                className="cat-item"
                style={{
                  display: 'block',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  textDecoration: 'none',
                  transition: 'transform .2s, border-color .2s',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Photo */}
                <div style={{ aspectRatio: '16/9', background: 'var(--card2)', position: 'relative', overflow: 'hidden' }}>
                  {cat.img ? (
                    <Image
                      src={cat.img}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42 }}>🖨️</div>
                  )}
                  {cat.recur && (
                    <div style={{ position: 'absolute', top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 9px', background: 'var(--teal)', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: '#fff', textTransform: 'uppercase' }}>
                      ♻ Mensuel
                    </div>
                  )}
                </div>
                {/* Info */}
                <div style={{ padding: '18px 20px 20px' }}>
                  <div style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 21, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8 }}>
                    {cat.info}
                  </div>
                  <strong style={{ color: 'var(--blue)', fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 20, fontWeight: 700 }}>
                    {cat.count} produits →
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ACADÉMIE
      ═══════════════════════════════════════════════════════════ */}
      <section id="academie" style={{ background: 'var(--surface)', padding: '90px 6%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -300, right: -300, width: 700, height: 700, background: 'radial-gradient(circle, var(--bluesoft), transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

          <div className="grid lg:grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Articles */}
            <div>
              <span className="stag">Académie NES — 100% Gratuit</span>
              <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 700, lineHeight: 1.08, color: 'var(--text)', marginBottom: 10 }}>
                Apprenez et<br />
                <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>développez votre atelier</em>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, maxWidth: 540 }}>
                Guides pratiques, tutoriels vidéo et outils de calcul pour maîtriser votre métier et maximiser vos profits dès le premier mois.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 34 }}>
                {ACADEMY_ARTICLES.map(a => (
                  <Link
                    key={a.slug}
                    href={`/${locale}/academie/${a.slug}`}
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
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
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>{a.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text2)', display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ background: 'var(--bluesoft)', color: 'var(--blue)', padding: '2px 8px', borderRadius: 3, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>
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
            <RoiCalculator variant="academie" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHATSAPP SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section id="whatsapp" style={{ background: 'var(--bg)', padding: '90px 6%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="grid lg:grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

            {/* Features */}
            <div>
              <span className="stag">Commerce WhatsApp — Naturel &amp; Rapide</span>
              <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4vw,58px)', fontWeight: 700, lineHeight: 1.08, color: 'var(--text)', marginBottom: 10 }}>
                Commandez en<br />
                <em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>30 secondes</em>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 34 }}>
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
                    <div style={{ width: 44, height: 44, borderRadius: 11, background: 'var(--greensoft)', border: '1px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19, flexShrink: 0 }}>
                      {f.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>{f.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: 'var(--card)', border: '2px solid var(--border2)', borderRadius: 30, padding: 22, maxWidth: 310, width: '100%' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 15, borderBottom: '1px solid var(--border)', marginBottom: 15 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#fff', fontFamily: '"Cormorant Garamond",serif', flexShrink: 0 }}>
                    N
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Nouvel Espace Sérigraphik</div>
                    <div style={{ fontSize: 11, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                      En ligne
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <div style={{ maxWidth: '83%', padding: '10px 13px', background: 'var(--chat-in)', borderRadius: '3px 13px 13px 13px', fontSize: 12, lineHeight: 1.5, color: 'var(--text)', alignSelf: 'flex-start' }}>
                    Bonjour ! Je veux le Pack N°2, disponible à Casablanca ?
                    <div style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>10:32</div>
                  </div>
                  <div style={{ maxWidth: '83%', padding: '10px 13px', background: 'var(--chat-out)', borderRadius: '13px 13px 3px 13px', fontSize: 12, lineHeight: 1.5, color: 'var(--text)', alignSelf: 'flex-end', textAlign: 'right' }}>
                    Bonjour ! ✅ Pack N°2 en stock. Livraison Casa : 24h. Paiement à la livraison possible 🙌
                    <div style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>10:34 ✓✓</div>
                  </div>
                  <div style={{ maxWidth: '83%', padding: '10px 13px', background: 'var(--chat-in)', borderRadius: '3px 13px 13px 13px', fontSize: 12, lineHeight: 1.5, color: 'var(--text)', alignSelf: 'flex-start' }}>
                    Parfait ! Je prends aussi des encres supplémentaires ?
                    <div style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>10:36</div>
                  </div>
                  <div style={{ maxWidth: '83%', padding: '10px 13px', background: 'var(--chat-out)', borderRadius: '13px 13px 3px 13px', fontSize: 12, lineHeight: 1.5, color: 'var(--text)', alignSelf: 'flex-end', textAlign: 'right' }}>
                    Je vous recommande le lot 1L × 4 couleurs — ça dure 3 mois. Je prépare votre commande 📦
                    <div style={{ fontSize: 10, opacity: .55, marginTop: 4 }}>10:37 ✓✓</div>
                  </div>
                  {/* Typing indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 13px', background: 'var(--chat-in)', borderRadius: '3px 13px 13px 13px', width: 'fit-content' }}>
                    <span className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text2)', display: 'inline-block' }} />
                    <span className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text2)', display: 'inline-block' }} />
                    <span className="typing-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text2)', display: 'inline-block' }} />
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
          CTA BAND
      ═══════════════════════════════════════════════════════════ */}
      <section id="cta-band" style={{ background: 'var(--blue)', padding: '72px 6%', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 'clamp(36px,4.2vw,58px)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>
            Votre atelier commence aujourd&apos;hui.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 30 }}>
            Rejoignez 2 000+ entrepreneurs marocains qui ont lancé leur activité avec NES.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href={`/${locale}/kits`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: 'var(--blue)', padding: '14px 30px', borderRadius: 4, fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', fontFamily: 'Outfit,sans-serif', transition: 'transform .15s' }}
            >
              Choisir mon kit →
            </Link>
            <a
              href={whatsappGeneralLink("Bonjour NES, je veux lancer mon atelier. Pouvez-vous m'aider à démarrer ?")}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--green)', color: '#fff', padding: '14px 30px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', fontFamily: 'Outfit,sans-serif', transition: 'transform .15s, box-shadow .15s' }}
            >
              💬 Parler à un expert maintenant
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
