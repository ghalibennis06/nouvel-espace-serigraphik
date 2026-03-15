/**
 * ISR Revalidation Webhook
 *
 * Configure in WooCommerce Admin → WooCommerce → Settings → Advanced → Webhooks:
 *   - Topic:    product.updated / product.created / product.deleted
 *   - URL:      https://your-domain.vercel.app/api/revalidate
 *   - Secret:   match REVALIDATE_SECRET env var
 *   - API Version: WP REST API Integration v3
 */

import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET not set' }, { status: 500 })
  }

  // Verify WooCommerce webhook signature
  const signature = request.headers.get('x-wc-webhook-signature')
  const body      = await request.text()

  if (signature) {
    const expected = crypto.createHmac('sha256', secret).update(body).digest('base64')
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  }

  const topic = request.headers.get('x-wc-webhook-topic') ?? ''

  // Revalidate based on event type
  if (topic.startsWith('product.')) {
    revalidateTag('products')
    revalidateTag('featured')
    revalidateTag('popular')
    // If we have the resource (product ID), revalidate its tag too
    try {
      const payload = JSON.parse(body) as { id?: number; slug?: string }
      if (payload.id)   revalidateTag(`product-${payload.id}`)
      if (payload.slug) revalidateTag(`product-${payload.slug}`)
    } catch {}
  }

  if (topic.startsWith('category.')) {
    revalidateTag('categories')
  }

  return NextResponse.json({ revalidated: true, topic, ts: Date.now() })
}

// Health check
export function GET() {
  return NextResponse.json({ status: 'ok', ts: Date.now() })
}
