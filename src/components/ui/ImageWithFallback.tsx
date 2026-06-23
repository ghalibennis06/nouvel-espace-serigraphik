'use client'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  style?: React.CSSProperties
  sizes?: string
  priority?: boolean
}

export default function ImageWithFallback({ src, alt, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src || '/images/placeholder.svg')
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc('/images/placeholder.svg')}
    />
  )
}
