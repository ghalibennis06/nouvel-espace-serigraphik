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
}

export default function ImageWithFallback({ src, alt, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc('/images/placeholder.svg')}
    />
  )
}
