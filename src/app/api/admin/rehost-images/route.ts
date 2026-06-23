import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { isDatabaseConfigured } from '@/lib/db'
import { isBlobConfigured } from '@/lib/blob'
import { rehostImages } from '@/lib/erp-rehost'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isDatabaseConfigured()) return NextResponse.json({ error: 'db unavailable' }, { status: 503 })
  if (!isBlobConfigured()) return NextResponse.json({ error: 'stockage non configuré (BLOB_READ_WRITE_TOKEN)' }, { status: 503 })
  const limit = Math.min(50, Math.max(1, Number(new URL(req.url).searchParams.get('limit')) || 20))
  try {
    const res = await rehostImages(limit)
    return NextResponse.json({ ok: true, ...res })
  } catch (e) {
    console.error('rehost:', e)
    return NextResponse.json({ error: 'database error' }, { status: 500 })
  }
}
