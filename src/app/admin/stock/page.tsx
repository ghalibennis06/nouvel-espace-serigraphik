import { listProducts } from '@/lib/erp'
import { isDatabaseConfigured } from '@/lib/db'
import StockManager from './StockManager'

export const dynamic = 'force-dynamic'

export default async function StockPage() {
  if (!isDatabaseConfigured()) {
    return <div style={{ color: 'var(--text2)' }}>Base de données non configurée (DATABASE_URL).</div>
  }
  const products = await listProducts()
  return <StockManager initial={products} />
}
