'use client'

import { Warp } from '@paper-design/shaders-react'

type WarpBackgroundProps = {
  className?: string
  style?: React.CSSProperties
}

// Ink-through-mesh — checks shape mirrors a sérigraphie screen
export function WarpBackground({ className = '', style }: WarpBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`} style={style} aria-hidden>
      <Warp
        style={{ height: '100%', width: '100%' }}
        proportion={0.42}
        softness={0.9}
        distortion={0.28}
        swirl={0.7}
        swirlIterations={9}
        shape="checks"
        shapeScale={0.11}
        scale={1}
        rotation={0}
        speed={0.55}
        colors={['hsl(15,40%,6%)', 'hsl(22,88%,48%)', 'hsl(35,80%,55%)', 'hsl(10,60%,16%)']}
      />
    </div>
  )
}
