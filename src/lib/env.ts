/**
 * Production env validation. Imported in `next.config` would be ideal, but to
 * avoid build-time coupling we expose `assertProductionEnv()` to call from
 * server entry points and a runtime warning fallback in dev.
 */

const REQUIRED_PROD = [
  'DATABASE_URL',
  'ADMIN_PASSWORD',
  'ADMIN_COOKIE_SECRET',
  'NEXT_PUBLIC_SITE_URL',
  'REVALIDATE_SECRET',
  'WC_BASE_URL',
  'WC_CONSUMER_KEY',
  'WC_CONSUMER_SECRET',
  'NEXT_PUBLIC_WHATSAPP_NUMBER',
  'NEXT_PUBLIC_PHONE',
  'NEXT_PUBLIC_EMAIL',
  'NEXT_PUBLIC_ADDRESS',
] as const

export function missingProdEnv(): string[] {
  return REQUIRED_PROD.filter((k) => !process.env[k] || process.env[k]!.trim() === '')
}

export function assertProductionEnv(): void {
  if (process.env.NODE_ENV !== 'production') return
  const missing = missingProdEnv()
  if (missing.length === 0) return
  // Log loudly; don't crash builds — Vercel's build env may differ from runtime.
  console.error(`[NES] Missing required production env vars: ${missing.join(', ')}`)
  if (
    missing.includes('ADMIN_PASSWORD') ||
    missing.includes('ADMIN_COOKIE_SECRET') ||
    missing.includes('DATABASE_URL')
  ) {
    throw new Error(`[NES] Refusing to boot — critical env missing: ${missing.join(', ')}`)
  }
}

if (process.env.NODE_ENV === 'production') {
  try { assertProductionEnv() } catch (e) { console.error(e) }
}
