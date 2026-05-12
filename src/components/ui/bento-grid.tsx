'use client'

import * as React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type BentoGridProps = React.HTMLAttributes<HTMLDivElement>

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(
        'grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[16rem]',
        className,
      )}
    >
      {children}
    </div>
  ),
)
BentoGrid.displayName = 'BentoGrid'

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  description: string
  Icon?: React.ComponentType<{ className?: string }>
  background?: React.ReactNode
  href?: string
  cta?: string
}

export const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, name, description, Icon, background, href, cta, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={cn(
        'group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-black/10 bg-white',
        'transition-all duration-300 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.35)]',
        className,
      )}
    >
      {background && <div className="pointer-events-none absolute inset-0">{background}</div>}
      <div className="pointer-events-none z-10 flex flex-col gap-1 p-6">
        {Icon && (
          <Icon className="h-10 w-10 text-neutral-700 transition-transform duration-300 group-hover:scale-105" />
        )}
        <h3 className="mt-2 text-xl text-neutral-900 font-medium">{name}</h3>
        <p className="text-sm leading-relaxed text-neutral-500">{description}</p>
      </div>
      {href && cta && (
        <div className="z-10 flex items-center justify-end p-6 pt-0">
          <a
            href={href}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            {cta} <ArrowRight size={12} />
          </a>
        </div>
      )}
    </div>
  ),
)
BentoCard.displayName = 'BentoCard'
