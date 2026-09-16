import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

interface WordsPullUpProps {
  text: string
  className?: string
  /** Renders a superscript asterisk hanging off the final "a" of the last word. */
  showAsterisk?: boolean
}

const pullUpVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function WordsPullUp({
  text,
  className = '',
  showAsterisk = false,
}: WordsPullUpProps) {
  const words = text.split(' ')
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <span ref={ref} className="inline-block overflow-visible">
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        const decorate = showAsterisk && isLast && word.length > 0

        return (
          <motion.span
            key={`${word}-${i}`}
            custom={i}
            variants={pullUpVariants}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            className={`inline-block ${isLast ? '' : 'mr-[0.22em]'} ${className}`}
          >
            {decorate ? (
              <>
                {word.slice(0, -1)}
                <span className="relative inline-block">
                  {word.slice(-1)}
                  <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
                </span>
              </>
            ) : (
              word
            )}
          </motion.span>
        )
      })}
    </span>
  )
}
