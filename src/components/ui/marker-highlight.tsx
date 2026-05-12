'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export interface MarkerHighlightProps {
  before?: string
  highlight: string
  after?: string
  markerColor?: string
  baseColor?: string
  highlightedTextColor?: string
  className?: string
  delay?: number
}

export function MarkerHighlight({
  before = '',
  highlight,
  after = '',
  markerColor = '#facc15',
  baseColor = '#171717',
  highlightedTextColor = '#171717',
  className = '',
  delay = 0.2,
}: MarkerHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <span ref={ref} className={className} style={{ color: baseColor, letterSpacing: '-0.02em' }}>
      {before}
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            inset: '0 -0.1em',
            background: markerColor,
            transformOrigin: 'left center',
            zIndex: 0,
          }}
        />
        <motion.span
          initial={{ color: baseColor }}
          animate={inView ? { color: highlightedTextColor } : { color: baseColor }}
          transition={{ duration: 0.3, delay: delay + 0.3 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {highlight}
        </motion.span>
      </span>
      {after}
    </span>
  )
}
