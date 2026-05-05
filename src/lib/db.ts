import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL

export const isDatabaseConfigured = () => Boolean(url)

// Returns a no-op tagged template that resolves to [] when DB is not configured.
// Build-time / dev safety only — production routes MUST call isDatabaseConfigured()
// and fail fast with 503 instead of silently dropping writes.
const noopSql = new Proxy(() => Promise.resolve([]), {
  apply: () => Promise.resolve([]),
  get: (target, prop) => prop === 'transaction' ? () => Promise.resolve([]) : target,
}) as unknown as ReturnType<typeof neon>

export const sql = url ? neon(url) : noopSql

if (process.env.NODE_ENV === 'production' && !url) {
  // Crash visibly in prod logs — do NOT pretend writes succeeded.
  console.error('[NES] FATAL: DATABASE_URL is not set in production. Lead capture disabled.')
}
