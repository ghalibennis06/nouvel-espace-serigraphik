'use client'

import { useEffect, useRef } from 'react'

type TubesBackgroundProps = {
  colors?: string[]
  lightColors?: string[]
  lightIntensity?: number
  className?: string
}

// Background-only tube canvas for use behind hero sections
export function TubesBackground({
  colors = ['#F26316', '#4B7BEC', '#22C55E'],
  lightColors = ['#FF8C42', '#83f36e', '#FF0080', '#4B7BEC'],
  lightIntensity = 160,
  className = '',
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const appRef = useRef<any>(null)

  useEffect(() => {
    let destroyed = false

    ;(async () => {
      const mod = await import(
        /* webpackIgnore: true */
        'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js' as any
      )
      const TubesCursorCtor = (mod as any).default ?? mod

      if (!canvasRef.current || destroyed) return

      appRef.current = TubesCursorCtor(canvasRef.current, {
        tubes: {
          colors,
          lights: { intensity: lightIntensity, colors: lightColors },
        },
      })
    })()

    return () => {
      destroyed = true
      try {
        appRef.current?.dispose?.()
        appRef.current = null
      } catch { /* ignore */ }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.55 }}
    />
  )
}
