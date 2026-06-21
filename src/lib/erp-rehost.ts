// Ré-héberge les images produits encore servies depuis WordPress vers Vercel Blob,
// puis met à jour nes_products.image_url. Idempotent, traité par lots.
import { sql } from '@/lib/db'
import { uploadImage } from '@/lib/blob'

type Row = Record<string, unknown>
const WP_HOST = 'nouvelespaceserigraphik.ma'

// Extrait l'URL WordPress réelle depuis un image_url (proxy /api/img?u=... ou URL directe).
function resolveWpUrl(imageUrl: string): string | null {
  try {
    if (imageUrl.includes('/api/img')) {
      const q = imageUrl.split('?')[1] ?? ''
      const u = new URLSearchParams(q).get('u')
      return u ? decodeURIComponent(u) : null
    }
    if (imageUrl.includes(WP_HOST)) return imageUrl.startsWith('http') ? imageUrl : `https://${imageUrl.replace(/^\/\//, '')}`
    return null
  } catch { return null }
}

export async function rehostImages(limit = 20): Promise<{ processed: number; failed: number; remaining: number }> {
  const rows = (await sql`
    SELECT id, product_slug, image_url FROM nes_products
    WHERE image_url IS NOT NULL AND (image_url LIKE '%/api/img%' OR image_url LIKE ${'%' + WP_HOST + '%'})
    ORDER BY updated_at ASC NULLS FIRST
    LIMIT ${limit}
  `) as Row[]

  let processed = 0, failed = 0
  for (const r of rows) {
    const wp = resolveWpUrl(String(r.image_url))
    if (!wp) { failed++; continue }
    try {
      const res = await fetch(wp, { headers: { Referer: `https://${WP_HOST}/`, 'User-Agent': 'NES-rehost/1.0' } })
      if (!res.ok) { failed++; continue }
      const buf = await res.arrayBuffer()
      const ct = res.headers.get('content-type') ?? 'image/jpeg'
      const url = await uploadImage(`products/${r.product_slug}`, buf, ct)
      await sql`UPDATE nes_products SET image_url = ${url}, updated_at = now() WHERE id = ${r.id as string}::uuid`
      processed++
    } catch { failed++ }
  }

  const rem = (await sql`
    SELECT COUNT(*)::int AS n FROM nes_products
    WHERE image_url IS NOT NULL AND (image_url LIKE '%/api/img%' OR image_url LIKE ${'%' + WP_HOST + '%'})
  `) as Row[]

  return { processed, failed, remaining: Number(rem[0]?.n ?? 0) }
}
