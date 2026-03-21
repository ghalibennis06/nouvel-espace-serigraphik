import Link from 'next/link'
import { whatsappGeneralLink } from '@/lib/utils'

export default async function Footer({ locale }: { locale: string }) {
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '+212-522-44-80-90'

  const cols = [
    {
      title: 'Kits & Packs',
      links: [
        { label: 'Pack N°1 — Démarrage',    href: `/${locale}/kits` },
        { label: 'Pack N°2 — Professionnel', href: `/${locale}/kits` },
        { label: 'Pack N°3 — Avancé',        href: `/${locale}/kits` },
        { label: 'Kit Personnalisé',          href: `/${locale}/contact` },
      ],
    },
    {
      title: 'Catalogue',
      links: [
        { label: 'Presses à Chaud',      href: `/${locale}/categorie-produit/les-presses-a-chaud` },
        { label: 'Consommables',         href: `/${locale}/categorie-produit/les-consommables-de-serigraphie` },
        { label: 'Produits Sublimables', href: `/${locale}/categorie-produit/les-produits-sublimables` },
        { label: 'Machines',             href: `/${locale}/categorie-produit/les-machines-dimpression` },
      ],
    },
    {
      title: 'Académie',
      links: [
        { label: 'Guide de démarrage',      href: `/${locale}/academie/lancer-atelier-30-jours` },
        { label: 'Tutoriels sublimation',   href: `/${locale}/academie/guide-sublimation-debutant` },
        { label: 'Techniques sérigraphie',  href: `/${locale}/academie/bases-serigraphie` },
        { label: 'Calculateur rentabilité', href: `/${locale}/academie` },
      ],
    },
    {
      title: 'B2B & Services',
      links: [
        { label: 'Devis Pro & Tarifs Gros', href: `/${locale}/devis-pro` },
        { label: 'Kit Personnalisé',        href: `/${locale}/contact` },
        { label: 'Livraison & retours',     href: `/${locale}/livraison` },
        { label: 'Contact & showroom',      href: `/${locale}/contact` },
      ],
    },
  ]

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '64px 6% 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '3rem', marginBottom: 44 }}
             className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand col */}
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.03em' }}>
              NES<span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--orange)', marginLeft: 2, verticalAlign: 'middle', marginBottom: 3 }} />
            </div>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 22 }}>
              Le fournisseur de référence pour les professionnels de l&apos;impression au Maroc.
              Machines, consommables et kits complets livrés partout au Maroc en 24–48h depuis 2018.
            </p>
            <a
              href={whatsappGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--green)', color: '#fff', padding: '10px 22px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
            >
              💬 {phone}
            </a>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 18 }}>
                {col.title}
              </div>
              {col.links.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="link-blue"
                  style={{ display: 'block', fontSize: 13, color: 'var(--text2)', marginBottom: 9, textDecoration: 'none', transition: 'color .2s' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text2)' }}>
            © 2026 Nouvel Espace Sérigraphik · Casablanca, Maroc 🇲🇦
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 12, color: 'var(--text2)' }}>Tous droits réservés</span>
            <Link href="/admin" className="link-admin-footer">
              ⚙ Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
