import { sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function ProduitsPage() {
  type Row = Record<string, unknown>
  const [products, categories] = (await Promise.all([
    sql`SELECT id, product_slug, name_fr, price, stock_status, active, featured, category_id, created_at FROM nes_products ORDER BY sort_order ASC NULLS LAST`,
    sql`SELECT id, name_fr FROM nes_categories`,
  ])) as Row[][]

  const catMap = Object.fromEntries(categories.map((c) => [c.id as string, c.name_fr as string]))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: '"Cormorant Garamond",Georgia,serif', fontSize: 32, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            Produits
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text2)' }}>
            {products.length} produit{products.length !== 1 ? 's' : ''} en base
          </p>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text2)', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 14px' }}>
          Import depuis le catalogue static →<br />
          <span style={{ fontSize: 11 }}>À implémenter prochainement</span>
        </div>
      </div>

      {products.length === 0 ? (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📦</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>
            Aucun produit en base
          </div>
          <p style={{ fontSize: 13, color: 'var(--text2)', maxWidth: 380, margin: '0 auto' }}>
            Les produits viennent du catalogue statique (<code>src/lib/data/products.ts</code>).
            Vous pourrez les importer ici pour les gérer via l&apos;admin.
          </p>
        </div>
      ) : (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--surface)' }}>
                {['Nom', 'Catégorie', 'Prix', 'Stock', 'Actif', 'Mis en avant'].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id as string} style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--surface)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.name_fr as string}</div>
                    <div style={{ fontSize: 11, color: 'var(--text2)' }}>{p.product_slug as string}</div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text2)' }}>
                    {p.category_id ? catMap[p.category_id as string] ?? '—' : '—'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: 'var(--blue)' }}>
                    {p.price ? `${p.price} MAD` : 'Sur devis'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12 }}>
                    <span style={{ color: p.stock_status === 'instock' ? 'var(--green)' : 'var(--orange)' }}>
                      {p.stock_status === 'instock' ? '● En stock' : '● Rupture'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: p.active ? 'var(--teal)' : 'var(--text2)' }}>
                    {p.active ? '✓' : '—'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: p.featured ? 'var(--orange)' : 'var(--text2)' }}>
                    {p.featured ? '★' : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
