'use client'

import { type ReactNode, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CardsSliderProps {
  children: ReactNode
  className?: string
  padding?: number
}

export function CardsSlider({ children, className, padding = 8 }: CardsSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const x = useMotionValue(0)

  useEffect(() => {
    const measure = () => {
      const c = containerRef.current
      const t = trackRef.current
      if (!c || !t) return
      setWidth(Math.max(0, t.scrollWidth - c.offsetWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [children])

  const scrollTo = (dir: 'left' | 'right') => {
    const cw = containerRef.current?.offsetWidth ?? 0
    const amount = cw * 0.85
    const cur = x.get()
    let next = dir === 'left' ? cur + amount : cur - amount
    next = Math.max(Math.min(next, 0), -width)
    animate(x, next, { type: 'spring', stiffness: 300, damping: 30, mass: 1 })
  }

  return (
    <div className={cn('relative group/slider', className)}>
      <div className="absolute top-1/2 -translate-y-1/2 left-2 z-20 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={() => scrollTo('left')}
          className="h-11 w-11 rounded-full bg-white/85 backdrop-blur-md border border-black/10 shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all active:scale-95"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
        <button
          type="button"
          onClick={() => scrollTo('right')}
          className="h-11 w-11 rounded-full bg-white/85 backdrop-blur-md border border-black/10 shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <motion.div
        ref={containerRef}
        className="cursor-grab active:cursor-grabbing overflow-hidden"
        style={{
          paddingLeft: padding,
          paddingRight: padding,
          paddingTop: padding * 2,
          paddingBottom: padding * 2,
          marginLeft: -padding,
          marginRight: -padding,
          marginTop: -padding * 2,
          marginBottom: -padding * 2,
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
          style={{ x }}
          className="flex gap-5"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
