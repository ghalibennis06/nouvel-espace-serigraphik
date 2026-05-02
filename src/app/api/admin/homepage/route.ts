import { NextRequest, NextResponse } from 'next/server'
import { sql, isDatabaseConfigured } from '@/lib/db'
import { DEFAULT_HOMEPAGE_CONTROL, normalizeHomepageControlState } from '@/lib/admin-homepage'

const KEY = 'homepage'

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: true, settings: DEFAULT_HOMEPAGE_CONTROL, fallback: true, disconnected: true })
  }

  try {
    const rows = (await sql`SELECT value FROM nes_admin_settings WHERE key = ${KEY} LIMIT 1`) as Record<string, unknown>[]
    const row = rows[0]
    return NextResponse.json({
      ok: true,
      settings: normalizeHomepageControlState((row?.value as Partial<typeof DEFAULT_HOMEPAGE_CONTROL> | null) ?? null),
      fallback: !row,
    })
  } catch (err) {
    console.error('homepage settings fetch error:', err)
    return NextResponse.json({ ok: true, settings: DEFAULT_HOMEPAGE_CONTROL, fallback: true })
  }
}

export async function PATCH(req: NextRequest) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'database not configured' }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const settings = normalizeHomepageControlState(body)

  try {
    await sql`
      INSERT INTO nes_admin_settings (key, value)
      VALUES (${KEY}, ${JSON.stringify(settings)}::jsonb)
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `
  } catch (err) {
    console.error('homepage settings update error:', err)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, settings })
}
