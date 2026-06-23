import { listDocuments, listClients, listProducts } from '@/lib/erp'
import { isDatabaseConfigured } from '@/lib/db'
import InvoicingManager from './InvoicingManager'

export const dynamic = 'force-dynamic'

export default async function FacturationPage() {
  if (!isDatabaseConfigured()) {
    return <div style={{ color: 'var(--text2)' }}>Base de données non configurée (DATABASE_URL).</div>
  }
  const [docs, clients, products] = await Promise.all([listDocuments(), listClients(), listProducts()])
  return <InvoicingManager
    docs={docs}
    clients={clients.map(c => ({ id: c.id, name: c.company || c.name, ice: c.ice }))}
    products={products.map(p => ({ id: p.id, name: p.name_fr, price: p.public_price, tva: p.tva_rate }))}
  />
}
