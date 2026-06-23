import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { COMPANY } from '@/lib/company'
import { whatsappGeneralLink } from '@/lib/utils'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'
const SLUG = 'materiel-impression-casablanca'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const url = `${SITE_URL}/${params.locale}/${SLUG}`
  return {
    title: "Matériel d'impression à Casablanca — sérigraphie, sublimation, DTF",
    description:
      "Fournisseur de matériel et consommables d'impression à Casablanca : sérigraphie, sublimation, DTF, presses à chaud. Stock local, livraison 48h, importateur officiel Antex & Inknovator. Devis WhatsApp.",
    alternates: { canonical: url, languages: { 'fr-MA': `${SITE_URL}/fr/${SLUG}` } },
    openGraph: { title: "Matériel d'impression à Casablanca | NES", description: 'Stock local Casablanca, livraison 48h partout au Maroc.', url, type: 'website' },
  }
}

const CITIES = ['Casablanca', 'Mohammedia', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir', 'Oujda', 'Kénitra', 'Tétouan']

const TECHNIQUES = [
  { l: 'Sérigraphie', d: 'Bases aqueuses Antex/Inknovator, cadres alu, soies, raclettes, films & poudres.', s: 'les-consommables-de-serigraphie' },
  { l: 'Sublimation', d: 'Encres, papiers transfert, flex, scotch thermique et supports sublimables.', s: 'les-consommables-de-sublimation' },
  { l: 'DTF & machines', d: 'Imprimantes DTF, traceurs et machines d’impression pour la production.', s: 'les-machines-dimpression' },
  { l: 'Presses à chaud', d: 'Presses manuelles, auto-ouverture, 5-en-1, mug et casquette.', s: 'les-presses-a-chaud' },
]

const FAQ = [
  { q: 'Où acheter du matériel de sérigraphie à Casablanca ?', a: `Nouvel Espace Sérigraphik est basé à Casablanca (${COMPANY.address}). Nous tenons en stock local les machines, presses et consommables sérigraphie, sublimation et DTF, avec conseil technique et devis par WhatsApp.` },
  { q: 'Livrez-vous en dehors de Casablanca ?', a: 'Oui — livraison 24–48h partout au Maroc (Rabat, Marrakech, Tanger, Fès, Agadir, Oujda…). Le stock part de Casablanca.' },
  { q: 'Proposez-vous des prix de gros / professionnels ?', a: 'Oui, tarifs dégressifs pour les ateliers et revendeurs. Demandez un devis volume par WhatsApp ou via la page Devis Pro.' },
  { q: 'Êtes-vous importateur officiel ?', a: 'Oui — importateur officiel des marques Antex et Inknovator, avec consommables d’origine et accompagnement.' },
]

export default function CasablancaPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  setRequestLocale(locale)
  const url = `${SITE_URL}/${locale}/${SLUG}`
  const wa = whatsappGeneralLink('Bonjour NES (Casablanca), je cherche du matériel / des consommables d’impression. Pouvez-vous me conseiller ?')

  const localBizJsonLd = {
    '@context': 'https://schema.org', '@type': 'Store', '@id': `${SITE_URL}#organization`,
    name: COMPANY.name, url, telephone: COMPANY.phone, email: COMPANY.email,
    image: `${SITE_URL}/og-default.jpg`,
    address: { '@type': 'PostalAddress', streetAddress: COMPANY.address, addressLocality: 'Casablanca', postalCode: '20250', addressCountry: 'MA' },
    areaServed: CITIES.map(c => ({ '@type': 'City', name: c })),
    currenciesAccepted: 'MAD', priceRange: '150 – 15000 MAD',
    sameAs: [`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '212522448090'}`],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Matériel d’impression à Casablanca', item: url },
    ],
  }
  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  const card: React.CSSProperties = { background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px' }

  return (
    <div style={{ background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 6% 40px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 14 }}>
            <Link href={`/${locale}`} style={{ color: 'var(--text2)', textDecoration: 'none' }}>Accueil</Link>
            <span style={{ margin: '0 6px', color: 'var(--border2)' }}>/</span>
            <span style={{ color: 'var(--text)' }}>Casablanca</span>
          </nav>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)' }}>Magasin & stock — Casablanca</span>
          <h1 style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.08, margin: '12px 0 14px', maxWidth: 760 }}>
            Matériel & consommables d’impression à Casablanca
          </h1>
          <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 660, marginBottom: 22 }}>
            Sérigraphie, sublimation, DTF et presses à chaud — <strong style={{ color: 'var(--text)' }}>en stock à Casablanca</strong>, livrés en 48h partout au Maroc. Importateur officiel Antex &amp; Inknovator. Conseil technique et devis par WhatsApp.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={wa} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--green)', color: '#fff', borderRadius: 8, padding: '13px 22px', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>💬 Demander un devis</a>
            <Link href={`/${locale}/categorie-produit`} className="btn-outline" style={{ padding: '13px 20px', fontSize: 14, fontWeight: 800 }}>Voir le catalogue</Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 6% 60px', display: 'flex', flexDirection: 'column', gap: 36 }}>
        {/* Techniques */}
        <section>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>Ce que nous fournissons à Casablanca</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 14 }}>
            {TECHNIQUES.map(t => (
              <Link key={t.s} href={`/${locale}/categorie-produit/${t.s}`} style={{ ...card, textDecoration: 'none', display: 'block' }} className="card-dark-hover">
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>{t.l}<span style={{ color: 'var(--orange)' }}>→</span></div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{t.d}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Pourquoi NES Casablanca */}
        <section style={card}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>Pourquoi acheter chez NES à Casablanca</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {[
              ['🏭', 'Stock local', 'Références en entrepôt à Casablanca — pas d’attente d’import.'],
              ['🚚', 'Livraison 48h', 'Expédition rapide partout au Maroc, retrait possible sur place.'],
              ['✅', 'Importateur officiel', 'Antex & Inknovator d’origine, qualité garantie.'],
              ['💬', 'Conseil + SAV', 'Accompagnement avant/après achat par WhatsApp.'],
            ].map(([ic, t, d]) => (
              <div key={t}>
                <div style={{ fontSize: 22 }}>{ic}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: '6px 0 3px' }}>{t}</div>
                <p style={{ fontSize: 12.5, color: 'var(--text2)', lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zones desservies */}
        <section>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>Livraison depuis Casablanca, partout au Maroc</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CITIES.map(c => (
              <span key={c} style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 999, padding: '6px 14px' }}>{c}</span>
            ))}
          </div>
        </section>

        {/* Coordonnées */}
        <section style={{ ...card, display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: 8 }}>Nous trouver</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{COMPANY.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginTop: 4 }}>
              {COMPANY.address}<br />
              Tél : {COMPANY.phone}<br />
              {COMPANY.email}<br />
              <span style={{ color: 'var(--text3)' }}>Horaires : Lun–Sam, 9h–19h</span>
            </div>
          </div>
          <a href={wa} target="_blank" rel="noopener noreferrer" style={{ alignSelf: 'center', background: 'var(--green)', color: '#fff', borderRadius: 8, padding: '13px 22px', fontSize: 14, fontWeight: 800, textDecoration: 'none' }}>💬 Contacter sur WhatsApp</a>
        </section>

        {/* FAQ */}
        <section>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 14 }}>Questions fréquentes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQ.map(f => (
              <div key={f.q} style={card}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{f.q}</div>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
