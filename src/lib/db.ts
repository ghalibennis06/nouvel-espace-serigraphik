import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL

export const isDatabaseConfigured = () => Boolean(url)

// Returns a no-op tagged template that resolves to [] when DB is not configured (build-time safety)
const noopSql = new Proxy(() => Promise.resolve([]), {
  apply: () => Promise.resolve([]),
  get: (target, prop) => prop === 'transaction' ? () => Promise.resolve([]) : target,
}) as unknown as ReturnType<typeof neon>

export const sql = url ? neon(url) : noopSql

if (process.env.NODE_ENV === 'production' && !url) {
  console.error('[NES] FATAL: DATABASE_URL is not set. Leads will NOT be saved.')
}
