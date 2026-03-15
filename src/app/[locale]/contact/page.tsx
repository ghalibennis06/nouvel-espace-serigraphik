import type { Metadata } from 'next'
import { whatsappGeneralLink } from '@/lib/utils'

export const metadata: Metadata = { title: 'Contact & Devis' }

export default function ContactPage({ params }: { params: { locale: string } }) {
  const phone   = process.env.NEXT_PUBLIC_PHONE   ?? '+212-522-44-80-90'
  const email   = process.env.NEXT_PUBLIC_EMAIL    ?? 'contact@nouvelespaceserigraphik.ma'
  const address = process.env.NEXT_PUBLIC_ADDRESS  ?? 'Bd Mohammed V, Casablanca 20250'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-navy-900 mb-3">Contact & Devis Professionnel</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Notre équipe est disponible du lundi au samedi, 9h–18h. Réponse garantie sous 2 heures.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Contact info */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-navy-900 rounded-2xl p-6 text-white">
            <h2 className="font-black text-lg mb-5">Contactez-nous directement</h2>
            <div className="space-y-4">
              <a href={`tel:${phone}`} className="flex items-start gap-3 hover:text-brand-amber transition-colors">
                <span className="text-xl flex-shrink-0">📞</span>
                <div>
                  <div className="text-2xs text-gray-400 uppercase tracking-wide">Téléphone</div>
                  <div className="font-semibold">{phone}</div>
                </div>
              </a>
              <a href={whatsappGeneralLink()} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-[#25D366] transition-colors">
                <span className="text-xl flex-shrink-0">💬</span>
                <div>
                  <div className="text-2xs text-gray-400 uppercase tracking-wide">WhatsApp</div>
                  <div className="font-semibold">Réponse en &lt; 5 min</div>
                </div>
              </a>
              <a href={`mailto:${email}`} className="flex items-start gap-3 hover:text-brand-amber transition-colors">
                <span className="text-xl flex-shrink-0">✉️</span>
                <div>
                  <div className="text-2xs text-gray-400 uppercase tracking-wide">E-mail</div>
                  <div className="font-semibold text-sm">{email}</div>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">📍</span>
                <div>
                  <div className="text-2xs text-gray-400 uppercase tracking-wide">Adresse</div>
                  <div className="font-semibold">{address}</div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <a href={whatsappGeneralLink('Bonjour, je souhaite un devis professionnel.')} target="_blank"
                rel="noopener noreferrer" className="btn-whatsapp w-full py-3 text-sm inline-flex items-center justify-center gap-2">
                💬 Démarrer sur WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-bold text-navy-900 mb-3">Horaires</h3>
            <div className="space-y-1.5 text-sm">
              {[
                ['Lundi – Vendredi', '9h – 18h'],
                ['Samedi',           '9h – 14h'],
                ['Dimanche',         'Fermé'],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-500">{day}</span>
                  <span className={`font-semibold ${hours === 'Fermé' ? 'text-gray-400' : 'text-navy-900'}`}>{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote form */}
        <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-black text-lg text-navy-900 mb-5">Demande de devis</h2>
          <form className="space-y-4" action="#" method="POST">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Nom complet *</label>
                <input name="name" required className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors" placeholder="Votre nom" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Société</label>
                <input name="company" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors" placeholder="Nom de votre société" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Téléphone *</label>
                <input name="phone" required type="tel" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors" placeholder="+212 6XX XXX XXX" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">E-mail</label>
                <input name="email" type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors" placeholder="email@example.com" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Produits & Quantités *</label>
              <textarea name="message" required rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors resize-none" placeholder="Ex: Cadre aluminium 40x50 × 10 unités, Base aqueuse Antex XP10 × 5..." />
            </div>
            <button type="submit" className="btn-primary w-full py-3 text-sm">
              Envoyer la demande →
            </button>
            <p className="text-2xs text-gray-400 text-center">
              Ou contactez-nous directement sur WhatsApp pour une réponse plus rapide.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
