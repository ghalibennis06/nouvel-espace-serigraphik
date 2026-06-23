import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import { importCatalog } from '@/lib/erp-import'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  try {
    const res = await importCatalog()
    return NextResponse.json({ ok: true, ...res })
  } catch (e) {
    console.error('catalog import:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}
