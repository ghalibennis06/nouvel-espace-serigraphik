import type { WCCategory } from '@/lib/types'

// ─── Static category data scraped from nouvelespaceserigraphik.ma ─────────────

export const CATEGORIES: WCCategory[] = [
  // ── ROOT ─────────────────────────────────────────────────────────────────
  {
    id: 1, name: 'Les Presses à Chaud', slug: 'les-presses-a-chaud',
    parent: 0, description: 'Presses à chaud professionnelles pour sublimation et transfert thermique.', display: 'default',
    image: { id: 101, src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2Fpresse-40x50autoopen.jpg', name: '', alt: 'Presses à Chaud' },
    menu_order: 1, count: 23,
  },
  {
    id: 2, name: 'Les Consommables de Sérigraphie', slug: 'les-consommables-de-serigraphie',
    parent: 0, description: 'Tout pour la sérigraphie : bases, cadres, raclettes, films, soies, poudres.', display: 'default',
    image: { id: 102, src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F61gC992Xr5L.jpg', name: '', alt: 'Consommables Sérigraphie' },
    menu_order: 2, count: 40,
  },
  {
    id: 3, name: 'Les Consommables de Sublimation', slug: 'les-consommables-de-sublimation',
    parent: 0, description: 'Encres, papiers, flex et scotch thermique pour sublimation professionnelle.', display: 'default',
    image: { id: 103, src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2025%2F01%2FINK-C.png', name: '', alt: 'Consommables Sublimation' },
    menu_order: 3, count: 31,
  },
  {
    id: 4, name: "Les Machines d'Impression", slug: 'les-machines-dimpression',
    parent: 0, description: "Imprimantes DTF, UV et traceurs grand format pour ateliers professionnels.", display: 'default',
    image: null, menu_order: 4, count: 8,
  },
  {
    id: 5, name: 'Les Machines de Sérigraphie', slug: 'les-machines-de-serigraphie',
    parent: 0, description: 'Carrousels, machines d\'insolation et séchoirs pour la sérigraphie.', display: 'default',
    image: { id: 105, src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2F4-couleurs-4-stations-pro.jpg', name: '', alt: 'Machines Sérigraphie' },
    menu_order: 5, count: 14,
  },
  {
    id: 6, name: 'Les Produits Sublimables', slug: 'les-produits-sublimables',
    parent: 0, description: 'Mugs, cadres, coussins et objets sublimables pour personnalisation.', display: 'default',
    image: { id: 106, src: '/api/img?u=https%3A%2F%2Fnouvelespaceserigraphik.ma%2Fwp-content%2Fuploads%2F2024%2F12%2FSH02.png', name: '', alt: 'Produits Sublimables' },
    menu_order: 6, count: 52,
  },

  // ── SOUS-CATÉGORIES Presses ───────────────────────────────────────────────
  { id: 11, name: 'Presse à Casquette', slug: 'presse-a-casquette', parent: 1, description: '', display: 'default', image: null, menu_order: 1, count: 4 },
  { id: 12, name: 'Presse à Mug', slug: 'presse-a-mug', parent: 1, description: '', display: 'default', image: null, menu_order: 2, count: 3 },

  // ── SOUS-CATÉGORIES Sérigraphie ───────────────────────────────────────────
  { id: 21, name: 'Antex', slug: 'antex', parent: 2, description: '', display: 'default', image: null, menu_order: 1, count: 6 },
  { id: 22, name: 'Inknovator', slug: 'inknovator', parent: 2, description: '', display: 'default', image: null, menu_order: 2, count: 5 },
  { id: 23, name: 'Les Cadres Aluminium', slug: 'les-cadres-aluminium', parent: 2, description: '', display: 'default', image: null, menu_order: 3, count: 3 },
  { id: 24, name: 'La Soie', slug: 'la-soie', parent: 2, description: '', display: 'default', image: null, menu_order: 4, count: 9 },
  { id: 25, name: 'Poudre de Transfert', slug: 'poudre-de-transfert', parent: 2, description: '', display: 'default', image: null, menu_order: 5, count: 5 },
  { id: 26, name: 'Papier et Film de Transfert', slug: 'papier-film-transfert', parent: 2, description: '', display: 'default', image: null, menu_order: 6, count: 8 },
  { id: 27, name: 'Raclettes', slug: 'raclettes', parent: 2, description: '', display: 'default', image: null, menu_order: 7, count: 3 },
  { id: 28, name: 'Flockage', slug: 'flockage', parent: 2, description: '', display: 'default', image: null, menu_order: 8, count: 3 },
  { id: 29, name: 'Mylar', slug: 'mylar', parent: 2, description: '', display: 'default', image: null, menu_order: 9, count: 1 },
  { id: 30, name: 'Paillette', slug: 'paillette', parent: 2, description: '', display: 'default', image: null, menu_order: 10, count: 1 },
  { id: 31, name: 'Strass', slug: 'strass', parent: 2, description: '', display: 'default', image: null, menu_order: 11, count: 1 },

  // ── SOUS-CATÉGORIES Sublimation ───────────────────────────────────────────
  { id: 41, name: 'Encre de Sublimation', slug: 'encre-de-sublimation', parent: 3, description: '', display: 'default', image: null, menu_order: 1, count: 4 },
  { id: 42, name: 'Papier de Sublimation', slug: 'papier-de-sublimation', parent: 3, description: '', display: 'default', image: null, menu_order: 2, count: 4 },
  { id: 43, name: 'Flex', slug: 'flex', parent: 3, description: '', display: 'default', image: null, menu_order: 3, count: 14 },
  { id: 44, name: 'Scotch Thermique & Téflon', slug: 'scotch-thermique', parent: 3, description: '', display: 'default', image: null, menu_order: 4, count: 3 },

  // ── SOUS-CATÉGORIES Machines Sérigraphie ──────────────────────────────────
  { id: 51, name: 'Les Carrousels', slug: 'les-carrousels', parent: 5, description: '', display: 'default', image: null, menu_order: 1, count: 8 },
  { id: 52, name: "Machine d'Insolation", slug: 'machine-dinsolation', parent: 5, description: '', display: 'default', image: null, menu_order: 2, count: 1 },
  { id: 53, name: 'Séchoirs', slug: 'sechoirs', parent: 5, description: '', display: 'default', image: null, menu_order: 3, count: 3 },

  // ── SOUS-CATÉGORIES Produits Sublimables ──────────────────────────────────
  { id: 61, name: 'Cadres en Marbre', slug: 'cadres-en-marbre', parent: 6, description: '', display: 'default', image: null, menu_order: 1, count: 11 },
  { id: 62, name: 'Mugs & Tasses', slug: 'mugs-tasses', parent: 6, description: '', display: 'default', image: null, menu_order: 2, count: 12 },
]
