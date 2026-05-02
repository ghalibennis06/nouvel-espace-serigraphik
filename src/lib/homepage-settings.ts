import { sql, isDatabaseConfigured } from '@/lib/db'
import { DEFAULT_HOMEPAGE_CONTROL, normalizeHomepageControlState, type HomepageControlState } from '@/lib/admin-homepage'

export async function getHomepageControlState(): Promise<HomepageControlState> {
  if (!isDatabaseConfigured()) {
    return DEFAULT_HOMEPAGE_CONTROL
  }

  try {
    const rows = (await sql`SELECT value FROM nes_admin_settings WHERE key = 'homepage' LIMIT 1`) as Record<string, unknown>[]
    const row = rows[0]
    return normalizeHomepageControlState((row?.value as Partial<HomepageControlState> | null) ?? null)
  } catch (err) {
    console.error('homepage settings read failed, using defaults:', err)
    return DEFAULT_HOMEPAGE_CONTROL
  }
}
