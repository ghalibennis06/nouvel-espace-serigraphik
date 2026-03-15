import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getCategoryTree } from '@/lib/woocommerce'
import { categoryHref, whatsappGeneralLink } from '@/lib/utils'

export default async function Footer({ locale }: { locale: string }) {
  const [t, { root }] = await Promise.all([
    getTranslations('footer'),
    getCategoryTree(),
  ])

  const phone   = process.env.NEXT_PUBLIC_PHONE   ?? '+212-522-44-80-90'
  const address = process.env.NEXT_PUBLIC_ADDRESS  ?? 'Bd Mohammed V, Casablanca 20250'
  const email   = process.env.NEXT_PUBLIC_EMAIL    ?? 'contact@nouvelespaceserigraphik.ma'

  return (
    <footer className="bg-navy-900 text-gray-300">
      {/* Trust strip */}
      <div className="border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { icon: '🏭', label: 'Importateur Officiel', sub: 'Antex · Inknovator' },
            { icon: '🚚', label: 'Livraison 48h',        sub: 'Casablanca & Maroc' },
            { icon: '📦', label: 'Stock Local',           sub: 'Disponible immédiatement' },
            { icon: '💬', label: 'Support WhatsApp',      sub: 'Réponse < 5 min' },
            { icon: '🔄', label: 'Retours 14j',           sub: 'Produits non ouverts' },
            { icon: '🧾', label: 'Facture Pro',            sub: 'TVA + devis' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <div className="text-white text-xs font-bold">{item.label}</div>
                <div className="text-gray-400 text-2xs">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand col */}
        <div>
          <div className="font-black text-white text-xl mb-2">
            Nouvel<span className="text-brand-red">Espace</span>
            <span className="block text-2xs font-semibold tracking-[3px] text-gray-500 mt-0.5">SERIGRAPHIK</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">{t('description')}</p>
          <div className="space-y-2 text-sm">
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span className="text-brand-red">📞</span> {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span className="text-brand-red">✉️</span> {email}
            </a>
            <div className="flex items-start gap-2 text-gray-400">
              <span className="text-brand-red mt-0.5">📍</span> {address}
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <a href="https://facebook.com/N.E.Serigraphik" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 bg-navy-800 hover:bg-brand-red rounded-lg flex items-center justify-center text-sm transition-colors">
              f
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 bg-navy-800 hover:bg-brand-red rounded-lg flex items-center justify-center text-xs font-bold transition-colors">
              in
            </a>
            <a href={whatsappGeneralLink()} target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 bg-[#25D366] hover:bg-[#20ba5a] rounded-lg flex items-center justify-center text-xs transition-colors">
              💬
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">{t('categories')}</h4>
          <ul className="space-y-2">
            {root.map(cat => (
              <li key={cat.id}>
                <Link
                  href={categoryHref(cat.slug, locale)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">{t('quickLinks')}</h4>
          <ul className="space-y-2">
            {[
              { label: t('about'),        href: `/${locale}/a-propos` },
              { label: t('deliveryInfo'), href: `/${locale}/livraison` },
              { label: t('faq'),          href: `/${locale}/faq` },
              { label: t('terms'),        href: `/${locale}/cgv` },
              { label: t('privacy'),      href: `/${locale}/confidentialite` },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wide">{t('support')}</h4>
          <div className="bg-navy-800 rounded-xl p-4 space-y-3">
            <p className="text-sm text-gray-400">Besoin d'aide ou d'un devis professionnel ?</p>
            <a
              href={whatsappGeneralLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full text-sm"
            >
              💬 WhatsApp
            </a>
            <Link href={`/${locale}/contact`} className="btn-outline border-gray-600 text-gray-300 hover:bg-gray-700 w-full text-sm">
              Formulaire de contact
            </Link>
          </div>

          <div className="mt-5">
            <h5 className="text-white font-bold text-xs mb-3 uppercase tracking-wide">{t('partners')}</h5>
            <div className="flex flex-wrap gap-2">
              {['ANTEX', 'INKNOVATOR', 'FREESUB', 'IPRESS', 'SEF', 'EPSON'].map(brand => (
                <span key={brand} className="text-2xs font-bold text-gray-500 bg-navy-800 px-2 py-1 rounded">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© 2024 Nouvel Espace Serigraphik. {t('rights')}</span>
          <span>🇲🇦 {t('madeIn')}</span>
        </div>
      </div>
    </footer>
  )
}
