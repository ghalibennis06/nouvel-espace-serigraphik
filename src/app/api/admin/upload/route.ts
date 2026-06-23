import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'
import { isBlobConfigured, uploadImage } from '@/lib/blob'

export const dynamic = 'force-dynamic'
const MAX = 8 * 1024 * 1024 // 8 Mo

export async function POST(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  if (!isBlobConfigured()) return NextResponse.json({ error: 'stockage non configuré (BLOB_READ_WRITE_TOKEN)' }, { status: 503 })

  let form: FormData
  try { form = await req.formData() } catch { return NextResponse.json({ error: 'invalid form' }, { status: 400 }) }
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'fichier requis' }, { status: 400 })
  if (file.size > MAX) return NextResponse.json({ error: 'fichier trop volumineux (max 8 Mo)' }, { status: 400 })
  if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'image requise' }, { status: 400 })

  try {
    const buf = await file.arrayBuffer()
    const url = await uploadImage('products/upload', buf, file.type)
    return NextResponse.json({ ok: true, url })
  } catch (e) {
    console.error('upload:', e)
    return NextResponse.json({ error: 'échec upload' }, { status: 500 })
  }
}
