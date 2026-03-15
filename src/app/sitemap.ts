import type { MetadataRoute } from 'next'
import { getAllProductSlugs, getAllCategorySlugs } from '@/lib/woocommerce'
import { locales } from '@/i18n'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nouvelespaceserigraphik.ma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categorySlugs] = await Promise.all([
    getAllProductSlugs().catch(() => [] as string[]),
    getAllCategorySlugs().catch(() => [] as string[]),
  ])

  const now = new Date()

  const entries: MetadataRoute.Sitemap = []

  // Static pages
  for (const locale of locales) {
    entries.push(
      { url: `${BASE}/${locale}`,         lastModified: now, priority: 1.0,  changeFrequency: 'weekly' },
      { url: `${BASE}/${locale}/contact`, lastModified: now, priority: 0.7,  changeFrequency: 'monthly' },
    )
  }

  // Category pages
  for (const slug of categorySlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}/categorie-produit/${slug}`,
        lastModified: now,
        priority: 0.9,
        changeFrequency: 'weekly',
      })
    }
  }

  // Product pages
  for (const slug of productSlugs) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE}/${locale}/produit/${slug}`,
        lastModified: now,
        priority: 0.8,
        changeFrequency: 'weekly',
      })
    }
  }

  return entries
}
