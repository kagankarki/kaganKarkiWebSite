import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

export interface Segment {
  text: string
  className?: string
  /** Forces the following segment onto a new line. */
  breakAfter?: boolean
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[]
  className?: string
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

type Token =
  | { kind: 'word'; word: string; className: string }
  | { kind: 'break' }

/**
 * Flattens segments into individual words while keeping each word's own styling,
 * then pulls them up one after another once the block scrolls into view.
 */
export default function WordsPullUpMultiStyle({
  segments,
  className = '',
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  const tokens = segments.flatMap<Token>((segment) => {
    const words = segment.text
      .split(' ')
      .filter(Boolean)
      .map<Token>((word) => ({
        kind: 'word',
        word,
        className: segment.className ?? '',
      }))

    return segment.breakAfter ? [...words, { kind: 'break' }] : words
  })

  let wordIndex = -1

  return (
    <div ref={ref} className={className}>
      <span className="inline-flex flex-wrap justify-center">
        {tokens.map((token, i) => {
          if (token.kind === 'break') {
            return <span key={`break-${i}`} className="basis-full" aria-hidden="true" />
          }

          wordIndex += 1

          return (
            <motion.span
              key={`${token.word}-${i}`}
              custom={wordIndex}
              variants={pullUpVariants}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              className={`mr-[0.22em] inline-block ${token.className}`}
            >
              {token.word}
            </motion.span>
          )
        })}
      </span>
    </div>
  )
}
