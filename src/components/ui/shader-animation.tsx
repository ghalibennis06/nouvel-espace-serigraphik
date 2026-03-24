'use client'
import type { CSSProperties } from 'react'

interface ShaderAnimationProps {
  overlayOpacity?: number
  overlayColor?: string
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
}

export default function ShaderAnimation({
  overlayOpacity = 0.88,
  overlayColor = 'rgba(255,255,255,1)',
  className = '',
  style,
  children,
}: ShaderAnimationProps) {
  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {/* Animated gradient layer */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #F26316 0%, #D94F0A 25%, #C2410C 50%, #F59E0B 75%, #F26316 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease infinite',
        }}
      />
      {/* Overlay for readability */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          background: overlayColor,
          opacity: overlayOpacity,
          pointerEvents: 'none',
        }}
      />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
