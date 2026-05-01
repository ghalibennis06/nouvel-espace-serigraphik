import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const hasSupabaseEnv = Boolean(url && anon)

const noopBuilder = new Proxy(
  {},
  {
    get() {
      return () => noopBuilder
    },
  },
)

export const supabase = hasSupabaseEnv
  ? createClient(url!, anon!)
  : ({
      from() {
        return noopBuilder
      },
    } as unknown as ReturnType<typeof createClient>)

export function isSupabaseConfigured() {
  return hasSupabaseEnv
}
