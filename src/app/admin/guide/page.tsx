import { FileTree } from '@/components/ui/file-tree'

export const dynamic = 'force-dynamic'

const siteStructure = [
  {
    name: '🌐 Pages publiques',
    type: 'folder' as const,
    children: [
      { name: 'Accueil — vitrine + simulateur ROI', type: 'file' as const },
      { name: 'Catalogue produits (170+ références)', type: 'file' as const },
      { name: 'Catégories (presses, encres, sublimables…)', type: 'file' as const },
      { name: 'Kits de démarrage — packs prêts à l\'emploi', type: 'file' as const },
      { name: 'Académie — guides techniques par technique', type: 'file' as const },
      { name: 'Devis pro — formulaire BtoB', type: 'file' as const },
      { name: 'Contact — WhatsApp + formulaire', type: 'file' as const },
    ],
  },
  {
    name: '🔐 Administration (accès privé)',
    type: 'folder' as const,
    children: [
      { name: 'Dashboard — chiffres clés + agenda du jour', type: 'file' as const },
      { name: 'Pipeline leads — toutes les demandes clients', type: 'file' as const },
      { name: 'Reporting — statistiques commerciales', type: 'file' as const },
      { name: 'Produits — catalogue en base de données', type: 'file' as const },
      { name: 'Merchandising — gestion de la page d\'accueil', type: 'file' as const },
      { name: '👈 Ce guide', type: 'file' as const },
    ],
  },
  {
    name: '🔌 Intégrations & infrastructure',
    type: 'folder' as const,
    children: [
      { name: 'WooCommerce — source du catalogue produits', type: 'file' as const },
      { name: 'Neon Database — leads, CRM, paramètres', type: 'file' as const },
      { name: 'Vercel — hébergement + déploiement automatique', type: 'file' as const },
      { name: 'WhatsApp — liens directs depuis chaque page', type: 'file' as const },
    ],
  },
]

const SECTIONS = [
  {
    icon: '🌐',
    title: 'Site public',
    color: 'var(--blue)',
    items: [
      { label: 'Bilingue', detail: 'Français + Arabe — bascule automatique selon la langue' },
      { label: 'Catalogue live', detail: 'Synchronisé avec WooCommerce — prix et stocks en temps réel' },
      { label: 'Simulateur ROI', detail: 'Le visiteur projette son CA avant d\'acheter' },
      { label: 'Devis pro', detail: 'Formulaire spécifique BtoB — chaque envoi crée un lead dans le pipeline' },
    ],
  },
  {
    icon: '🔐',
    title: 'Admin',
    color: 'var(--orange)',
    items: [
      { label: 'Accès sécurisé', detail: 'Mot de passe + cookie de session — accès uniquement depuis /admin/login' },
      { label: 'Pipeline leads', detail: 'Chaque demande client est enregistrée avec statut, priorité, assignation' },
      { label: 'Activité', detail: 'Chaque action (contact, devis, note) est loguée dans l\'historique du lead' },
      { label: 'Merchandising', detail: 'Les sections de la page d\'accueil s\'activent/désactivent sans coder' },
    ],
  },
  {
    icon: '🔌',
    title: 'Infrastructure',
    color: 'var(--teal)',
    items: [
      { label: 'Hébergement', detail: 'Vercel — déploiement automatique à chaque mise à jour du code' },
      { label: 'Base de données', detail: 'Neon Postgres — leads et paramètres admin stockés de façon sécurisée' },
      { label: 'Catalogue', detail: 'WooCommerce reste la source unique pour les produits et les catégories' },
      { label: 'Domaine', detail: 'nouvelespaceserigraphik.ma — pointé vers Vercel' },
    ],
  },
]

export default function GuidePage() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
        Guide du site
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 36 }}>
        Vue d&apos;ensemble de ce qui compose votre site NES et comment tout fonctionne ensemble.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
        {/* Left — FileTree */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
            Structure
          </div>
          <FileTree data={siteStructure} />
        </div>

        {/* Right — Explained sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {SECTIONS.map((s) => (
            <div key={s.title} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: s.color }}>{s.title}</span>
              </div>
              <div style={{ padding: '10px 0' }}>
                {s.items.map((item) => (
                  <div key={item.label} style={{ padding: '8px 18px', display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12, alignItems: 'start' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap' }}>{item.label}</span>
                    <span style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
