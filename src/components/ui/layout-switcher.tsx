'use client'

import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, List, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

export type LayoutMode = 'list' | 'grid' | 'pack'

interface LayoutSwitcherProps {
  mode: LayoutMode
  onChange: (mode: LayoutMode) => void
  className?: string
  modes?: LayoutMode[]
}

const ICONS: Record<LayoutMode, typeof LayoutGrid> = {
  list: List,
  grid: LayoutGrid,
  pack: Package,
}

const LABELS: Record<LayoutMode, string> = {
  list: 'Liste',
  grid: 'Grille',
  pack: 'Pack',
}

export function LayoutSwitcher({
  mode,
  onChange,
  className,
  modes = ['list', 'grid', 'pack'],
}: LayoutSwitcherProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-black/10 bg-white p-1',
        className,
      )}
    >
      {modes.map((m) => {
        const Icon = ICONS[m]
        const active = m === mode
        return (
          <button
            key={m}
            type="button"
            onClick={() => onChange(m)}
            aria-pressed={active}
            aria-label={LABELS[m]}
            className={cn(
              'relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              active ? 'text-white' : 'text-neutral-600 hover:text-neutral-900',
            )}
          >
            {active && (
              <motion.span
                layoutId="layout-switcher-active"
                className="absolute inset-0 rounded-full bg-neutral-900"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <Icon className="relative z-10 w-3.5 h-3.5" />
            <span className="relative z-10 hidden sm:inline">{LABELS[m]}</span>
          </button>
        )
      })}
    </div>
  )
}

interface LayoutSwitcherViewProps<T> {
  mode: LayoutMode
  items: T[]
  renderList: (item: T, i: number) => ReactNode
  renderGrid: (item: T, i: number) => ReactNode
  renderPack: (items: T[]) => ReactNode
}

export function LayoutSwitcherView<T>({
  mode,
  items,
  renderList,
  renderGrid,
  renderPack,
}: LayoutSwitcherViewProps<T>) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className={
          mode === 'list'
            ? 'flex flex-col gap-3'
            : mode === 'grid'
            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
            : 'flex flex-wrap gap-3'
        }
      >
        {mode === 'pack'
          ? renderPack(items)
          : items.map((item, i) => (mode === 'list' ? renderList(item, i) : renderGrid(item, i)))}
      </motion.div>
    </AnimatePresence>
  )
}
