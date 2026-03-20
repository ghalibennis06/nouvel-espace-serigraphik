/**
 * Image proxy – bypasses WordPress hotlink protection.
 *
 * WordPress hosting on nouvelespaceserigraphik.ma requires
 * `Referer: https://nouvelespaceserigraphik.ma/` to serve images.
 * Next.js image optimisation fetches without that header, so images
 * return 403.  This proxy adds the required header server-side.
 *
 * Usage: /api/img?u=<encoded image URL>
 *
 * Images are cached for 24h at the CDN edge.
 */

import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_HOST = 'nouvelespaceserigraphik.ma'

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get('u')
  if (!raw) {
    return NextResponse.json({ error: 'missing url' }, { status: 400 })
  }

  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return NextResponse.json({ error: 'invalid url' }, { status: 400 })
  }

  // Only proxy images from the allowed host
  if (url.hostname !== ALLOWED_HOST) {
    return NextResponse.json({ error: 'forbidden host' }, { status: 403 })
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Referer: `https://${ALLOWED_HOST}/`,
        'User-Agent':
          'Mozilla/5.0 (compatible; NES-imageproxy/1.0)',
      },
      // Cache the upstream fetch for 24h
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      return new NextResponse(null, { status: res.status })
    }

    const body = await res.arrayBuffer()
    const contentType = res.headers.get('content-type') ?? 'image/jpeg'

    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
        'X-Proxied-From': ALLOWED_HOST,
      },
    })
  } catch {
    return new NextResponse(null, { status: 502 })
  }
}
