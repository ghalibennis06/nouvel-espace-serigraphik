export type HomepageControlState = {
  heroTitle: string
  heroSubtitle: string
  heroPrimaryCtaLabel: string
  heroPrimaryCtaHref: string
  heroSecondaryCtaLabel: string
  heroSecondaryCtaHref: string
  spotlightCategorySlugs: string[]
  spotlightProductSlugs: string[]
  spotlightKitIds: string[]
  trustBullets: string[]
}

export const DEFAULT_HOMEPAGE_CONTROL: HomepageControlState = {
  heroTitle: 'Vous imprimez. Vous posez. On vous fournit.',
  heroSubtitle:
    'NES fournit les pros du Maroc depuis 2018 : machines et consommables pour les ateliers d\'impression, films covering Carlas au rouleau pour les garages et poseurs. Stock Casablanca, livraison 24–48h.',
  heroPrimaryCtaLabel: 'Catalogue pro impression',
  heroPrimaryCtaHref: '/fr/categorie-produit',
  heroSecondaryCtaLabel: 'Films Carlas — prix rouleau',
  heroSecondaryCtaHref: '/fr/covering',
  spotlightCategorySlugs: ['les-presses-a-chaud', 'les-consommables-de-serigraphie', 'les-produits-sublimables'],
  spotlightProductSlugs: ['pack-n2', 'presse-a-chaud-40-x-50cm-avec-ouverture-automatique', 'base-aqueuse-antex-xp10'],
  spotlightKitIds: ['serigraphie-pro', 'dtf-premium'],
  trustBullets: [
    'Livraison 24–48h partout au Maroc',
    'Support WhatsApp avant et après achat',
    'Packs pour débutants, ateliers et réassort',
    'Orientation concrète par usage, budget et cadence',
  ],
}

export function normalizeHomepageControlState(input?: Partial<HomepageControlState> | null): HomepageControlState {
  const source = input ?? {}
  return {
    heroTitle: source.heroTitle?.trim() || DEFAULT_HOMEPAGE_CONTROL.heroTitle,
    heroSubtitle: source.heroSubtitle?.trim() || DEFAULT_HOMEPAGE_CONTROL.heroSubtitle,
    heroPrimaryCtaLabel: source.heroPrimaryCtaLabel?.trim() || DEFAULT_HOMEPAGE_CONTROL.heroPrimaryCtaLabel,
    heroPrimaryCtaHref: source.heroPrimaryCtaHref?.trim() || DEFAULT_HOMEPAGE_CONTROL.heroPrimaryCtaHref,
    heroSecondaryCtaLabel: source.heroSecondaryCtaLabel?.trim() || DEFAULT_HOMEPAGE_CONTROL.heroSecondaryCtaLabel,
    heroSecondaryCtaHref: source.heroSecondaryCtaHref?.trim() || DEFAULT_HOMEPAGE_CONTROL.heroSecondaryCtaHref,
    spotlightCategorySlugs: (source.spotlightCategorySlugs ?? DEFAULT_HOMEPAGE_CONTROL.spotlightCategorySlugs).filter(Boolean).slice(0, 4),
    spotlightProductSlugs: (source.spotlightProductSlugs ?? DEFAULT_HOMEPAGE_CONTROL.spotlightProductSlugs).filter(Boolean).slice(0, 6),
    spotlightKitIds: (source.spotlightKitIds ?? DEFAULT_HOMEPAGE_CONTROL.spotlightKitIds).filter(Boolean).slice(0, 3),
    trustBullets: (source.trustBullets ?? DEFAULT_HOMEPAGE_CONTROL.trustBullets).map((item) => item.trim()).filter(Boolean).slice(0, 6),
  }
}
