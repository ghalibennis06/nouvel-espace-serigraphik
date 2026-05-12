'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface TestimonialItem {
  id: number | string
  quote: string
  author: string
  role: string
  avatar: string
}

const defaultTestimonials: TestimonialItem[] = [
  {
    id: 1,
    quote: 'This changed everything for me.',
    author: 'Sarah Chen',
    role: 'Designer at Figma',
    avatar:
      'https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop',
  },
  {
    id: 2,
    quote: 'Simply brilliant. Nothing else compares.',
    author: 'Marcus Johnson',
    role: 'Engineer at Vercel',
    avatar:
      'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1287&auto=format&fit=crop',
  },
  {
    id: 3,
    quote: 'The attention to detail is unmatched.',
    author: 'Elena Rodriguez',
    role: 'Founder at Craft',
    avatar:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop',
  },
]

export function Testimonials({ items = defaultTestimonials }: { items?: TestimonialItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(items[0].quote)
  const [displayedRole, setDisplayedRole] = useState(items[0].role)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setDisplayedQuote(items[index].quote)
      setDisplayedRole(items[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <div className="flex flex-col items-center gap-10 py-16">
      <div className="relative px-8">
        <span className="absolute -left-2 -top-6 text-7xl font-serif text-black/[0.06] select-none pointer-events-none">
          &ldquo;
        </span>
        <p
          className={cn(
            'text-2xl md:text-3xl font-light text-neutral-900 text-center max-w-lg leading-relaxed transition-all duration-400 ease-out',
            isAnimating ? 'opacity-0 blur-sm scale-[0.98]' : 'opacity-100 blur-0 scale-100',
          )}
        >
          {displayedQuote}
        </p>
        <span className="absolute -right-2 -bottom-8 text-7xl font-serif text-black/[0.06] select-none pointer-events-none">
          &rdquo;
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 mt-2">
        <p
          className={cn(
            'text-xs text-neutral-500 tracking-[0.2em] uppercase transition-all duration-500 ease-out',
            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0',
          )}
        >
          {displayedRole}
        </p>

        <div className="flex items-center justify-center gap-2">
          {items.map((t, index) => {
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
                  isActive ? 'bg-neutral-900 shadow-lg' : 'bg-transparent hover:bg-neutral-100',
                  showName ? 'pr-4 pl-2 py-2' : 'p-0.5',
                )}
              >
                <div className="relative flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className={cn(
                      'w-8 h-8 rounded-full object-cover',
                      'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                      isActive ? 'ring-2 ring-white/30' : 'ring-0',
                      !isActive && 'hover:scale-105',
                    )}
                  />
                </div>
                <div
                  className={cn(
                    'grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                    showName ? 'grid-cols-[1fr] opacity-100 ml-2' : 'grid-cols-[0fr] opacity-0 ml-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        'text-sm font-medium whitespace-nowrap block transition-colors duration-300',
                        isActive ? 'text-white' : 'text-neutral-900',
                      )}
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
