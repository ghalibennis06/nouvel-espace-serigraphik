import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getCategoryTree, getProducts } from '@/lib/woocommerce'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'
import ProductCard from '@/components/catalog/ProductCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Catalogue — Toutes les catégories',
  description: "Découvrez toutes nos catégories de fournitures professionnelles pour la sérigraphie, la sublimation et l'impression textile.",
}

const CAT_EMOJIS: Record<string, string> = {
  'les-presses-a-chaud': '🔥',
  'les-consommables-de-serigraphie': '🖨️',
  'les-consommables-de-sublimation': '🧪',
  'les-produits-sublimables': '👕',
  'les-machines-dimpression': '⚙️',
  'les-machines-de-serigraphie': '🏭',
}

const CAT_LANES: Record<string, { badge: string; title: string; text: string; orientation: string }> = {
  'les-presses-a-chaud': {
    badge: 'Démarrage et équipement',
    title: 'Trouvez la bonne presse selon votre budget, votre technique et votre cadence.',
    text: 'Cette famille sert à la fois aux débutants qui veulent se lancer et aux ateliers qui veulent améliorer leur production textile ou sublimation.',
    orientation: 'À voir si vous comparez votre première machine ou un format plus sérieux.',
  },
  'les-consommables-de-serigraphie': {
    badge: 'Réassort atelier',
    title: 'Réapprovisionnez votre atelier en bases, cadres, soies et accessoires essentiels.',
    text: 'Cette zone doit permettre à un acheteur déjà actif de retrouver rapidement les bons consommables pour continuer à produire sans rupture.',
    orientation: 'À privilégier quand l’atelier tourne déjà et que le temps compte.',
  },
  'les-consommables-de-sublimation': {
    badge: 'Réassort sublimation',
    title: 'Retrouvez les encres, papiers, flex et accessoires pour continuer à imprimer sans vous bloquer.',
    text: 'Cette famille parle surtout aux ateliers et vendeurs qui veulent un stock clair et rapide à commander.',
    orientation: 'Le bon chemin si vous voulez réassortir vite et proprement.',
  },
  'les-machines-dimpression': {
    badge: 'Montée en gamme atelier',
    title: 'Choisissez la machine d’impression qui correspond à votre vraie ambition de production.',
    text: 'Ici, un atelier doit pouvoir comprendre quelle capacité de production correspond vraiment à son besoin, avec un cadre de choix clair.',
    orientation: 'À ouvrir si vous passez du petit volume à une vraie logique atelier.',
  },
  'les-machines-de-serigraphie': {
    badge: 'Atelier pro',
    title: 'Passez d’un atelier artisanal à une vraie logique de production sérigraphique.',
    text: 'Cette famille parle aux professionnels qui veulent automatiser, structurer et produire plus sérieusement.',
    orientation: 'À parcourir si votre enjeu est la cadence, la structure et la montée en gamme.',
  },
  'les-produits-sublimables': {
    badge: 'Produits à vendre',
    title: 'Choisissez les supports les plus utiles pour lancer ou élargir votre offre commerciale.',
    text: 'Ces produits servent surtout à ceux qui veulent vendre des objets personnalisés avec de bonnes marges et une logique simple.',
    orientation: 'À regarder si vous réfléchissez en offre commerciale, pas seulement en matériel.',
  },
}

const ROUTER_PATHS = [
  {
    title: 'Je veux démarrer',
    text: 'Passez d’abord par les kits, les presses et les produits sublimables si vous cherchez une entrée plus simple.',
    href: (locale: string) => `/${locale}/kits`,
    cta: 'Voir les kits de départ',
  },
  {
    title: 'Je veux équiper mon atelier',
    text: 'Allez vers les machines, les presses plus sérieuses et les demandes de devis si vous structurez une vraie capacité de production.',
    href: (locale: string) => `/${locale}/devis-pro`,
    cta: 'Voir le parcours atelier',
  },
  {
    title: 'Je veux me réapprovisionner',
    text: 'Entrez rapidement dans les consommables si votre besoin est surtout de retrouver vite les bonnes bases pour continuer à produire.',
    href: (locale: string) => `/${locale}/categorie-produit/les-consommables-de-serigraphie`,
    cta: 'Voir les consommables',
  },
] as const

export default async function CatalogIndexPage({
  params,
  searchParams,
}: {
  params: { locale: string }
  searchParams?: { search?: string }
}) {
  const { locale } = params
  const searchQuery = searchParams?.search?.trim() ?? ''
  setRequestLocale(locale)

  const [{ root: categories, children: subCategories }, searchResults] = await Promise.all([
    getCategoryTree(),
    searchQuery
      ? getProducts({ search: searchQuery, per_page: 20 }).then((r) => r.products)
      : Promise.resolve(null),
  ])

  const waSearch = searchQuery
    ? whatsappGeneralLink(`Bonjour NES, je recherche "${searchQuery}" dans votre catalogue. Pouvez-vous m'aider ?`)
    : whatsappGeneralLink("Bonjour NES, je cherche la bonne famille de produits pour mon besoin. Pouvez-vous m'aider ?")

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,244,239,1) 100%)', borderBottom: '1px solid var(--border)', padding: '54px 6% 42px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link href={`/${locale}`} style={{ color: 'var(--text2)', textDecoration: 'none' }}>Accueil</Link>
            <span style={{ color: 'var(--border2)' }}>/</span>
            <span style={{ color: 'var(--text)' }}>Catalogue</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: '0.98fr 1.02fr', gap: 22, alignItems: 'start' }} className="grid lg:grid-cols-2 gap-6">
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: 12 }}>
                Catalogue NES · Maroc
              </span>
              <h1 style={{ fontSize: 'clamp(34px,4.3vw,58px)', fontWeight: 950, color: 'var(--text)', lineHeight: 0.98, letterSpacing: '-0.04em', marginBottom: 14 }}>
                {searchQuery ? `Résultats pour « ${searchQuery} »` : 'Entrez dans le catalogue par le bon besoin.'}
              </h1>
              <p style={{ fontSize: 15, color: 'var(--text2)', maxWidth: 760, lineHeight: 1.8, marginBottom: 18 }}>
                {searchQuery
                  ? `${searchResults?.length ?? 0} produit(s) trouvé(s). Si les résultats restent trop larges, NES peut vous orienter plus vite vers la bonne famille.`
                  : "Le catalogue NES ne doit pas juste lister des catégories. Il doit aider à démarrer, équiper un atelier ou réapprovisionner sans perdre du temps entre des pages trop plates."}
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={waSearch}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 20px', borderRadius: 14, background: 'var(--green)', color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 800 }}
                >
                  💬 Demander le bon chemin sur WhatsApp
                </a>
                {!searchQuery && (
                  <Link
                    href={`/${locale}/devis-pro`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 20px', borderRadius: 14, background: 'var(--card)', color: 'var(--text)', textDecoration: 'none', fontSize: 13, fontWeight: 800, border: '1px solid var(--border)' }}
                  >
                    Demander un devis atelier →
                  </Link>
                )}
              </div>
            </div>

            {!searchQuery && (
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ borderRadius: 24, border: '1px solid var(--border)', background: 'var(--card)', padding: 18, boxShadow: 'var(--shadow)' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: 8 }}>
                    Lecture rapide NES
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 8 }}>
                    Trois façons utiles d’entrer dans ce catalogue.
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
                    Débutant, atelier en équipement, ou atelier déjà en production, le bon chemin n’est pas le même. NES structure le catalogue autour de cette réalité.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }} className="grid md:grid-cols-3 gap-3">
                  {[
                    'Commencer par les kits si vous partez de zéro',
                    'Passer aux machines si vous structurez un atelier',
                    'Aller droit aux consommables si vous êtes en réassort',
                  ].map((item) => (
                    <div key={item} style={{ borderRadius: 16, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.78)', padding: '12px 12px 11px', fontSize: 12, color: 'var(--text2)', lineHeight: 1.55 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!searchQuery && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14 }} className="grid md:grid-cols-3 gap-4">
              {ROUTER_PATHS.map((item) => (
                <Link key={item.title} href={item.href(locale)} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,247,244,1) 100%)', border: '1px solid var(--border)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow)', minHeight: 190 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--orange)', marginBottom: 8 }}>Parcours NES</div>
                    <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 16 }}>{item.text}</p>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 14, background: 'rgba(242,99,22,0.08)', border: '1px solid rgba(242,99,22,0.12)', color: 'var(--text)', fontSize: 12, fontWeight: 800 }}>
                      {item.cta} →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {searchQuery && (
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 6%' }}>
          {searchResults && searchResults.length > 0 ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                {searchResults.map((p) => (
                  <ProductCard key={p.id} product={p} locale={locale} />
                ))}
              </div>
              <div style={{ marginTop: 28, padding: '18px 20px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 18 }}>
                <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12, lineHeight: 1.65 }}>
                  Si les résultats sont encore trop larges, NES peut vous orienter vers la bonne famille ou vous confirmer directement ce qu’il faut commander.
                </p>
                <a href={waSearch} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px', background: 'var(--green)', color: '#fff', borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
                  💬 Demander par WhatsApp
                </a>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>Aucun résultat pour « {searchQuery} »</h2>
              <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 24 }}>Essayez un autre terme ou laissez NES vous orienter vers la bonne famille.</p>
              <a href={waSearch} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--green)', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                💬 Demander à un expert
              </a>
            </div>
          )}
          <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', margin: '52px 0 24px' }}>
            Ou entrez par une famille de produits
          </h2>
        </div>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: searchQuery ? '0 6% 48px' : '48px 6%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 54 }}>
          {categories.map((cat) => {
            const subs = subCategories.get(cat.id) ?? []
            const emoji = CAT_EMOJIS[cat.slug] ?? '📦'
            const lane = CAT_LANES[cat.slug]

            return (
              <section key={cat.id}>
                <div style={{ display: 'grid', gridTemplateColumns: '0.88fr 1.12fr', gap: 18, alignItems: 'start', marginBottom: 20 }} className="grid lg:grid-cols-[0.88fr_1.12fr] gap-5">
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: 7 }}>
                      {lane?.badge ?? 'Catalogue NES'}
                    </div>
                    <h2 style={{ fontSize: 28, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.04, marginBottom: 8 }}>
                      {cat.name}
                    </h2>
                    <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 8 }}>
                      {lane?.title}
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
                      {lane?.orientation ?? `${cat.count} produits disponibles`}
                    </p>
                  </div>

                  <div style={{ borderRadius: 24, border: '1px solid var(--border)', background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,246,242,1) 100%)', padding: 18, boxShadow: 'var(--shadow)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 24 }}>{emoji}</span>
                        <div style={{ fontSize: 13, color: 'var(--text2)' }}>{cat.count} produits disponibles</div>
                      </div>
                      <Link href={categoryHref(cat.slug, locale)} style={{ fontSize: 13, color: 'var(--orange)', textDecoration: 'none', fontWeight: 800 }}>
                        Voir toute la famille →
                      </Link>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
                      {lane?.text}
                    </p>
                  </div>
                </div>

                {subs.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
                    <Link
                      href={categoryHref(cat.slug, locale)}
                      style={{ background: 'linear-gradient(180deg, rgba(242,99,22,0.10) 0%, rgba(255,255,255,0.96) 100%)', border: '1px solid rgba(242,99,22,0.18)', borderRadius: 18, padding: '18px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 150, textDecoration: 'none', boxShadow: 'var(--shadow)' }}
                    >
                      <span style={{ fontSize: 28 }}>{emoji}</span>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', lineHeight: 1.35 }}>{cat.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--orange)', marginTop: 4 }}>{cat.count} produits</div>
                        <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 10, lineHeight: 1.55 }}>
                          Entrer directement dans cette famille complète.
                        </div>
                      </div>
                    </Link>

                    {subs.map((sub) => (
                      <Link
                        key={sub.id}
                        href={categoryHref(sub.slug, locale)}
                        style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 18, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 150, textDecoration: 'none', boxShadow: 'var(--shadow)' }}
                      >
                        {sub.image ? (
                          <div style={{ position: 'relative', width: 42, height: 42, marginBottom: 10 }}>
                            <Image src={sub.image.src} alt={sub.name} fill className="object-contain" sizes="42px" />
                          </div>
                        ) : (
                          <span style={{ fontSize: 24, marginBottom: 10, display: 'block' }}>🔧</span>
                        )}
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.35 }}>{sub.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text2)', marginTop: 4 }}>{sub.count} produits</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={categoryHref(cat.slug, locale)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 18, padding: '20px 22px', textDecoration: 'none', boxShadow: 'var(--shadow)' }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: 15 }}>{cat.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4 }}>{cat.count} produits disponibles</div>
                    </div>
                    <svg style={{ width: 18, height: 18, color: 'var(--orange)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
