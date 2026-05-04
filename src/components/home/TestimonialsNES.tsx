'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Kit sublimation rentabilisé en 3 semaines. NES nous a guidés du choix de machine au premier client livré.",
    author: "Karim B.",
    role: "Atelier textile, Casablanca",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 2,
    quote: "Réassort toutes les 5 semaines, toujours à temps. La seule adresse sérieuse pour la sérigraphie au Maroc.",
    author: "Nadia R.",
    role: "Atelier sérigraphie, Rabat",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 3,
    quote: "Atelier DTF équipé en 2 commandes. Le suivi WhatsApp est plus rapide que n'importe quel support en ligne.",
    author: "Youssef M.",
    role: "Studio DTF, Marrakech",
    avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=80&h=80&fit=crop&crop=face",
  },
]

export function TestimonialsNES() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(TESTIMONIALS[0].quote)
  const [displayedRole, setDisplayedRole] = useState(TESTIMONIALS[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setDisplayedQuote(TESTIMONIALS[index].quote)
      setDisplayedRole(TESTIMONIALS[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <div className="flex flex-col items-start gap-8 py-4">
      <div className="relative px-2">
        <span className="absolute -left-1 -top-4 text-6xl font-serif select-none pointer-events-none" style={{ color: 'rgba(255,244,237,0.08)' }}>"</span>
        <p
          className={cn(
            'text-xl font-light text-center max-w-sm leading-relaxed transition-all duration-400 ease-out',
            isAnimating ? 'opacity-0 blur-sm scale-[0.98]' : 'opacity-100 blur-0 scale-100',
          )}
          style={{ color: 'rgba(255,244,237,0.88)' }}
        >
          {displayedQuote}
        </p>
        <span className="absolute -right-1 -bottom-6 text-6xl font-serif select-none pointer-events-none" style={{ color: 'rgba(255,244,237,0.08)' }}>"</span>
      </div>

      <div className="flex flex-col gap-5 mt-2 w-full">
        <p
          className={cn(
            'text-xs tracking-[0.18em] uppercase transition-all duration-500 ease-out',
            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0',
          )}
          style={{ color: 'rgba(255,244,237,0.5)' }}
        >
          {displayedRole}
        </p>

        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((t, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showName = isActive || isHovered

            return (
              <button
                key={t.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  'relative flex items-center gap-0 rounded-full cursor-pointer',
                  'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                  isActive ? 'shadow-lg' : 'bg-transparent',
                  showName ? 'pr-4 pl-2 py-2' : 'p-0.5',
                )}
                style={{ background: isActive ? 'rgba(242,99,22,0.22)' : 'transparent' }}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className={cn(
                      'w-8 h-8 rounded-full object-cover transition-all duration-500',
                      isActive ? 'ring-2' : 'ring-0',
                    )}
                    style={{ '--tw-ring-color': 'rgba(242,99,22,0.5)' } as React.CSSProperties}
                  />
                </div>
                <div
                  className={cn(
                    'grid transition-all duration-500',
                    showName ? 'grid-cols-[1fr] opacity-100 ml-2' : 'grid-cols-[0fr] opacity-0 ml-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className="text-sm font-medium whitespace-nowrap block transition-colors duration-300"
                      style={{ color: isActive ? 'rgba(255,244,237,0.9)' : 'rgba(255,244,237,0.6)' }}
                    >
                      {t.author}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
