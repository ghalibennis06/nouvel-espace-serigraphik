import { supabase } from '@/lib/supabase'
import { DEFAULT_HOMEPAGE_CONTROL, normalizeHomepageControlState, type HomepageControlState } from '@/lib/admin-homepage'

const TABLE = 'nes_admin_settings'
const KEY = 'homepage'

export async function getHomepageControlState(): Promise<HomepageControlState> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('value')
    .eq('key', KEY)
    .maybeSingle()

  if (error) {
    console.error('homepage settings read failed, using defaults:', error)
    return DEFAULT_HOMEPAGE_CONTROL
  }

  return normalizeHomepageControlState((data?.value as Partial<HomepageControlState> | null) ?? null)
}
