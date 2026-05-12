'use client'

import { useRef, useState, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface ImageHoverItem {
  id: string | number
  label: string
  image: string
  href?: string
}

interface ImageHoverProps {
  items: ImageHoverItem[]
  className?: string
}

export function ImageHover({ items, className }: ImageHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 300, damping: 30 })
  const y = useSpring(my, { stiffness: 300, damping: 30 })

  const handleMove = (e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(e.clientX - rect.left + 16)
    my.set(e.clientY - rect.top + 16)
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative isolate', className)}
      onMouseLeave={() => setHovered(null)}
    >
      <ul className="flex flex-col divide-y divide-black/10">
        {items.map((it, i) => {
          const Tag = it.href ? 'a' : 'div'
          return (
            <li key={it.id}>
              <Tag
                href={it.href}
                onMouseMove={handleMove}
                onMouseEnter={() => setHovered(i)}
                className={cn(
                  'group flex items-center justify-between py-6 transition-all duration-300',
                  'text-3xl md:text-5xl font-medium tracking-tight cursor-pointer',
                  hovered !== null && hovered !== i ? 'opacity-30' : 'opacity-100',
                )}
              >
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  {it.label}
                </span>
                <span className="text-sm opacity-50">0{i + 1}</span>
              </Tag>
            </li>
          )
        })}
      </ul>

      <motion.div
        style={{ x, y, opacity: hovered !== null ? 1 : 0 }}
        className="pointer-events-none absolute left-0 top-0 z-10 h-56 w-72 overflow-hidden rounded-xl shadow-2xl"
      >
        {hovered !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={items[hovered].image}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </motion.div>
    </div>
  )
}
