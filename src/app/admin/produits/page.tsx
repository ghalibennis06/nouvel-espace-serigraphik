import { listProducts } from '@/lib/erp'
import { sql, isDatabaseConfigured } from '@/lib/db'
import ProductsManager from './ProductsManager'

export const dynamic = 'force-dynamic'

export default async function ProduitsPage() {
  if (!isDatabaseConfigured()) {
    return <div style={{ color: 'var(--text2)' }}>Base de données non configurée (DATABASE_URL).</div>
  }
  const [products, categoriesRaw] = await Promise.all([
    listProducts(),
    sql`SELECT id, name_fr FROM nes_categories ORDER BY name_fr`,
  ])
  const categories = categoriesRaw as unknown as { id: string; name_fr: string }[]
  return <ProductsManager initial={products} categories={categories} />
}
