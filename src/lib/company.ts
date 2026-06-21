// Identité légale NES — utilisée sur factures / devis (mentions obligatoires Maroc).
// ⚠️ Remplacer les valeurs « À COMPLÉTER » par les vrais identifiants de l'entreprise.
export const COMPANY = {
  name: 'Nouvel Espace Sérigraphik',
  legalForm: 'SARL',
  address: process.env.NEXT_PUBLIC_ADDRESS ?? 'Bd Mohammed V, Casablanca 20250',
  city: 'Casablanca',
  phone: process.env.NEXT_PUBLIC_PHONE ?? '+212 522 44 80 90',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'contact@nouvelespaceserigraphik.ma',
  website: 'nouvelespaceserigraphik.ma',
  // Identifiants fiscaux (à compléter avec les vraies valeurs)
  ice: process.env.NEXT_PUBLIC_COMPANY_ICE ?? 'À COMPLÉTER',
  rc: process.env.NEXT_PUBLIC_COMPANY_RC ?? 'À COMPLÉTER',
  if: process.env.NEXT_PUBLIC_COMPANY_IF ?? 'À COMPLÉTER',
  patente: process.env.NEXT_PUBLIC_COMPANY_PATENTE ?? 'À COMPLÉTER',
  cnss: process.env.NEXT_PUBLIC_COMPANY_CNSS ?? '',
  rib: process.env.NEXT_PUBLIC_COMPANY_RIB ?? '',
  bank: process.env.NEXT_PUBLIC_COMPANY_BANK ?? '',
} as const
