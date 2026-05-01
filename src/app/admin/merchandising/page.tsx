import { getCategories, getFeaturedProducts } from '@/lib/woocommerce'
import { KITS } from '@/lib/data/kits'
import HomepageControlForm from './HomepageControlForm'

export const dynamic = 'force-dynamic'

export default async function MerchandisingPage() {
  const [categories, products] = await Promise.all([
    getCategories(0),
    getFeaturedProducts(16),
  ])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            Merchandising homepage
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 760 }}>
            Contrôlez les messages forts, les catégories mises en avant, les produits prioritaires et les kits visibles pour orienter la vitrine publique selon la saison, la demande et le stock.
          </p>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text2)', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 14px' }}>
          Contrôle admin léger<br />
          <span style={{ fontSize: 11 }}>fallback statique si la table settings est vide</span>
        </div>
      </div>

      <HomepageControlForm
        categories={categories.map((category) => ({ slug: category.slug, name: category.name }))}
        products={products.map((product) => ({ slug: product.slug, name: product.name }))}
        kits={KITS.map((kit) => ({ id: kit.id, name: kit.name }))}
      />
    </div>
  )
}
