import { NextRequest, NextResponse } from 'next/server'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { DEFAULT_HOMEPAGE_CONTROL, normalizeHomepageControlState } from '@/lib/admin-homepage'

const TABLE = 'nes_admin_settings'
const KEY = 'homepage'

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, settings: DEFAULT_HOMEPAGE_CONTROL, fallback: true, disconnected: true })
  }

  const { data, error } = await supabase
    .from(TABLE)
    .select('key, value')
    .eq('key', KEY)
    .maybeSingle()

  if (error) {
    console.error('homepage settings fetch error:', error)
    return NextResponse.json({ ok: true, settings: DEFAULT_HOMEPAGE_CONTROL, fallback: true })
  }

  return NextResponse.json({
    ok: true,
    settings: normalizeHomepageControlState((data?.value as Record<string, unknown> | null) as Partial<typeof DEFAULT_HOMEPAGE_CONTROL> | null),
    fallback: !data,
  })
}

export async function PATCH(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: 'supabase not configured' }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const settings = normalizeHomepageControlState(body)

  const { error } = await supabase
    .from(TABLE)
    .upsert({ key: KEY, value: settings }, { onConflict: 'key' })

  if (error) {
    console.error('homepage settings update error:', error)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, settings })
}
