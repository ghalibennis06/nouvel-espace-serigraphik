'use client'

import { cn } from '@/lib/utils'
import { motion, stagger, useAnimate, useInView } from 'framer-motion'
import { useEffect } from 'react'

type Word = { text: string; className?: string }

export function TypewriterEffect({
  words,
  className,
  cursorClassName,
}: {
  words: Word[]
  className?: string
  cursorClassName?: string
}) {
  const wordsArray = words.map((w) => ({ ...w, text: w.text.split('') }))
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        { display: 'inline-block', opacity: 1, width: 'fit-content' },
        { duration: 0.3, delay: stagger(0.1), ease: 'easeInOut' }
      )
    }
  }, [isInView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn('text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center', className)}>
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={idx} className="inline-block">
            {word.text.map((char, i) => (
              <motion.span
                key={i}
                initial={{}}
                className={cn('opacity-0 hidden', 'text-[var(--text)]', word.className)}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className={cn('inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-[var(--orange)]', cursorClassName)}
      />
    </div>
  )
}

export function TypewriterEffectSmooth({
  words,
  className,
  cursorClassName,
}: {
  words: Word[]
  className?: string
  cursorClassName?: string
}) {
  const wordsArray = words.map((w) => ({ ...w, text: w.text.split('') }))

  return (
    <div className={cn('flex space-x-1', className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: '0%' }}
        whileInView={{ width: 'fit-content' }}
        transition={{ duration: 2, ease: 'linear', delay: 0.4 }}
      >
        <div className="font-bold whitespace-nowrap">
          {wordsArray.map((word, idx) => (
            <div key={idx} className="inline-block">
              {word.text.map((char, i) => (
                <span key={i} className={cn('text-[var(--text)]', word.className)}>
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className={cn('block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-[var(--orange)]', cursorClassName)}
      />
    </div>
  )
}
