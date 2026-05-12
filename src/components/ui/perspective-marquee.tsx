'use client'

// 21st.dev PerspectiveMarquee — 3D-rotated keyword tunnel.
// Mount behind a single hero section only (60fps subtree).

import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

export interface PerspectiveMarqueeProps {
  items?: string[]
  fontSize?: number
  color?: string
  fontWeight?: number
  pixelsPerSecond?: number
  rotateY?: number
  rotateX?: number
  perspective?: number
  fadeColor?: string
  background?: string
  speed?: number
  className?: string
  fontFamily?: string
}

const DEFAULT_FONT_FAMILY = "'Outfit', system-ui, sans-serif"

export function PerspectiveMarquee({
  items = ['Sérigraphie', 'Broderie', 'Flocage', 'DTF', 'Sublimation', 'Goodies'],
  fontSize = 56,
  color = 'rgba(248,234,242,0.92)',
  fontWeight = 700,
  pixelsPerSecond = 80,
  rotateY = -24,
  rotateX = 8,
  perspective = 1200,
  fadeColor = '#0a0a0a',
  background = '#0a0a0a',
  speed = 1,
  className,
  fontFamily = DEFAULT_FONT_FAMILY,
}: PerspectiveMarqueeProps) {
  const [offset, setOffset] = useState(0)
  const itemPadding = fontSize * 0.9
  const approxItemWidth = useMemo(
    () => items.reduce((acc, item) => acc + item.length * fontSize * 0.6 + itemPadding, 0) || 1,
    [fontSize, itemPadding, items],
  )

  useEffect(() => {
    let frameId = 0
    let last = performance.now()
    const tick = (now: number) => {
      const delta = now - last
      last = now
      setOffset((prev) => {
        const next = prev - (delta / 1000) * pixelsPerSecond * speed
        return next <= -approxItemWidth ? next + approxItemWidth : next
      })
      frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [approxItemWidth, pixelsPerSecond, speed])

  const rendered = [...items, ...items, ...items]
  const segmentWidth = approxItemWidth / Math.max(items.length, 1)

  return (
    <div
      className={cn('absolute inset-0 flex items-center justify-center overflow-hidden', className)}
      style={{ perspective: `${perspective}px`, background }}
      aria-hidden="true"
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            transform: `translateX(${offset}px)`,
          }}
        >
          {rendered.map((item, i) => {
            const itemCenter = i * segmentWidth + segmentWidth / 2 + offset
            const norm = (itemCenter - 640) / 640
            const distance = Math.min(1, Math.abs(norm))
            const blurPx = distance * 3
            const opacity = 1 - distance * 0.5
            return (
              <span
                key={`${item}-${i}`}
                style={{
                  display: 'inline-block',
                  fontFamily,
                  fontSize,
                  fontWeight,
                  color,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  paddingRight: itemPadding,
                  filter: `blur(${blurPx}px)`,
                  opacity,
                }}
              >
                {item}
              </span>
            )
          })}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 16%, transparent 84%, ${fadeColor} 100%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `linear-gradient(180deg, ${fadeColor} 0%, transparent 28%, transparent 72%, ${fadeColor} 100%)`,
        }}
      />
    </div>
  )
}

export default PerspectiveMarquee
