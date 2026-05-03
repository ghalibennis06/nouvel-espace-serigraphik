import { unstable_cache } from 'next/cache'
import { sql, isDatabaseConfigured } from '@/lib/db'
import { DEFAULT_HOMEPAGE_CONTROL, normalizeHomepageControlState, type HomepageControlState } from '@/lib/admin-homepage'

async function fetchHomepageControlState(): Promise<HomepageControlState> {
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

export const getHomepageControlState = unstable_cache(
  fetchHomepageControlState,
  ['homepage-control'],
  { revalidate: 3600, tags: ['homepage-control'] }
)
