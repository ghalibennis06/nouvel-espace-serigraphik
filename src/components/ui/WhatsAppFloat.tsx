'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { whatsappGeneralLink } from '@/lib/utils'

export default function WhatsAppFloat() {
  const t       = useTranslations('cta')
  const [show, setShow] = useState(true)

  if (!show) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <div className="bg-white rounded-xl shadow-card px-4 py-2.5 text-sm font-medium text-navy-900 border border-gray-100 max-w-[180px] text-right leading-snug">
        <div className="font-semibold">{t('whatsappFloat')}</div>
        <div className="text-xs text-[#25D366] font-bold">{t('whatsappResponse')}</div>
      </div>

      {/* Bubble */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShow(false)}
          className="w-7 h-7 bg-white rounded-full border border-gray-200 text-gray-400 hover:text-gray-600 flex items-center justify-center text-xs shadow"
          aria-label="Fermer"
        >
          ✕
        </button>
        <a
          href={whatsappGeneralLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] rounded-full shadow-lg transition-transform hover:scale-110"
          aria-label="Contacter via WhatsApp"
        >
          <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.554 4.107 1.523 5.83L0 24l6.341-1.509A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.726.887.926-3.625-.235-.373A9.818 9.818 0 1 1 12 21.818z"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
