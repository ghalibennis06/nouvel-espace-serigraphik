'use client'

import { motion } from 'framer-motion'
import { type LucideIcon, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface WorkflowNode {
  id: string
  label: string
  description?: string
  Icon?: LucideIcon
  status?: 'idle' | 'active' | 'done'
}

interface N8nWorkflowBlockProps {
  nodes: WorkflowNode[]
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

const STATUS_STYLES: Record<NonNullable<WorkflowNode['status']>, string> = {
  idle: 'border-black/10 bg-white text-neutral-600',
  active: 'border-orange-500 bg-orange-50 text-orange-700 shadow-[0_0_0_4px_rgba(249,115,22,0.12)]',
  done: 'border-emerald-500 bg-emerald-50 text-emerald-700',
}

export function N8nWorkflowBlock({
  nodes,
  className,
  orientation = 'horizontal',
}: N8nWorkflowBlockProps) {
  const isH = orientation === 'horizontal'
  return (
    <div
      className={cn(
        'flex gap-3',
        isH ? 'flex-row items-stretch overflow-x-auto' : 'flex-col items-stretch',
        className,
      )}
    >
      {nodes.map((n, i) => {
        const Icon = n.Icon
        const status = n.status ?? 'idle'
        return (
          <div
            key={n.id}
            className={cn(
              'flex items-center gap-3',
              isH ? 'flex-row' : 'flex-col',
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className={cn(
                'relative flex min-w-[180px] flex-col gap-1 rounded-xl border p-4 transition-all',
                STATUS_STYLES[status],
              )}
            >
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                <span className="text-sm font-medium">{n.label}</span>
              </div>
              {n.description && (
                <p className="text-xs leading-relaxed opacity-80">{n.description}</p>
              )}
            </motion.div>
            {i < nodes.length - 1 && (
              <ArrowRight
                className={cn(
                  'h-4 w-4 flex-shrink-0 text-neutral-400',
                  isH ? '' : 'rotate-90',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
