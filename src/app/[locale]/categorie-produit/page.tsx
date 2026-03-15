import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getCategoryTree } from '@/lib/woocommerce'
import { categoryHref } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Catalogue — Toutes les catégories',
  description: 'Découvrez toutes nos catégories de fournitures professionnelles pour la sérigraphie, la sublimation et l\'impression textile.',
}

export default async function CatalogIndexPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const { root: categories, children: subCategories } = await getCategoryTree()

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <nav className="text-xs text-gray-500 mb-4">
            <Link href={`/${locale}`} className="hover:text-gray-300">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Catalogue</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Tout notre catalogue</h1>
          <p className="text-gray-400 text-sm mt-2">Fournitures professionnelles pour la sérigraphie, sublimation et impression textile</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {categories.map(cat => {
          const subs = subCategories.get(cat.id) ?? []
          return (
            <section key={cat.id}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-black text-navy-900">{cat.name}</h2>
                  <p className="text-sm text-gray-500">{cat.count} produits</p>
                </div>
                <Link href={categoryHref(cat.slug, locale)} className="btn-ghost text-sm">
                  Voir tout →
                </Link>
              </div>

              {subs.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {/* Parent card */}
                  <Link
                    href={categoryHref(cat.slug, locale)}
                    className="bg-navy-900 rounded-xl p-4 flex flex-col items-start justify-between min-h-[110px] hover:bg-navy-800 transition-colors group"
                  >
                    <span className="text-2xl">📦</span>
                    <div>
                      <div className="text-xs font-bold text-white leading-snug line-clamp-2">{cat.name}</div>
                      <div className="text-2xs text-gray-400 mt-0.5">{cat.count} produits</div>
                    </div>
                  </Link>

                  {/* Subcategory cards */}
                  {subs.map(sub => (
                    <Link
                      key={sub.id}
                      href={categoryHref(sub.slug, locale)}
                      className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col items-start justify-between min-h-[110px] hover:border-navy-900 hover:shadow-card transition-all group"
                    >
                      {sub.image ? (
                        <div className="relative w-10 h-10 mb-2">
                          <Image src={sub.image.src} alt={sub.name} fill className="object-contain" sizes="40px" />
                        </div>
                      ) : (
                        <span className="text-2xl mb-2">🔧</span>
                      )}
                      <div>
                        <div className="text-xs font-semibold text-navy-900 leading-snug line-clamp-2 group-hover:text-brand-red transition-colors">
                          {sub.name}
                        </div>
                        <div className="text-2xs text-gray-400 mt-0.5">{sub.count} produits</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={categoryHref(cat.slug, locale)}
                  className="block bg-white rounded-xl p-5 border border-gray-100 hover:border-navy-900 hover:shadow-card transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-navy-900 group-hover:text-brand-red transition-colors">{cat.name}</div>
                      <div className="text-sm text-gray-500 mt-0.5">{cat.count} produits disponibles</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-brand-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
