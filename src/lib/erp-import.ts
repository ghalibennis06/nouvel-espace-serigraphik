// Import idempotent du catalogue statique (scrapé du site) vers Neon.
// Permet de démarrer l'ERP avec le vrai catalogue NES, puis de tout gérer via l'admin.
import { sql } from '@/lib/db'
import { CATEGORIES, PRODUCTS } from '@/lib/data'

type Row = Record<string, unknown>

export async function importCatalog(): Promise<{ categories: number; products: number }> {
  // 1. Catégories — upsert par slug, renvoie la table slug → id
  const slugToId = new Map<string, string>()
  for (const c of CATEGORIES) {
    const rows = (await sql`
      INSERT INTO nes_categories (name_fr, slug)
      VALUES (${c.name}, ${c.slug})
      ON CONFLICT (slug) DO UPDATE SET name_fr = EXCLUDED.name_fr
      RETURNING id, slug
    `) as Row[]
    slugToId.set(rows[0].slug as string, rows[0].id as string)
  }

  // 2. Produits — upsert par product_slug
  let count = 0
  for (const p of PRODUCTS) {
    const catSlug = p.categories?.[0]?.slug
    const categoryId = catSlug ? slugToId.get(catSlug) ?? null : null
    const price = p.price && p.price !== '0' ? Number(p.price) : null
    const image = p.images?.[0]?.src ?? null
    await sql`
      INSERT INTO nes_products
        (product_slug, name_fr, sku, price, public_price, stock_status, featured, active,
         category_id, image_url, tva_rate, stock_qty)
      VALUES
        (${p.slug}, ${p.name}, ${p.sku ?? null}, ${price}, ${price},
         ${p.stock_status ?? 'instock'}, ${p.featured ?? false}, true,
         ${categoryId}, ${image}, 20, 0)
      ON CONFLICT (product_slug) DO UPDATE SET
        name_fr      = EXCLUDED.name_fr,
        price        = EXCLUDED.price,
        public_price = EXCLUDED.public_price,
        stock_status = EXCLUDED.stock_status,
        featured     = EXCLUDED.featured,
        category_id  = COALESCE(EXCLUDED.category_id, nes_products.category_id),
        image_url    = COALESCE(EXCLUDED.image_url, nes_products.image_url),
        updated_at   = now()
    `
    count++
  }

  return { categories: slugToId.size, products: count }
}
