import { Fragment, useEffect, useRef, type CSSProperties } from 'react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import WordsPullUpMultiStyle, { type Segment } from './WordsPullUpMultiStyle'

const HEADING: Segment[] = [
  { text: 'I am Marcus Chen,', className: 'font-normal' },
  { text: 'a self-taught director.', className: 'italic font-serif' },
  {
    text: 'I have skills in color grading, visual effects, and narrative design.',
    className: 'font-normal',
  },
]

const BODY =
  'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.'

export default function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  // One custom property drives every character. Each letter still has its own
  // reveal window, but it lives in `--start` (set once) and is resolved by CSS
  // rather than by a per-character subscription running on every scroll frame.
  const publish = (value: number) => {
    paragraphRef.current?.style.setProperty('--reveal', value.toFixed(4))
  }

  useMotionValueEvent(scrollYProgress, 'change', publish)
  useEffect(() => {
    publish(scrollYProgress.get())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalChars = BODY.length

  return (
    <section className="bg-black px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col items-center rounded-2xl bg-[#101010] px-5 py-16 text-center sm:px-10 sm:py-20 md:rounded-[2rem] md:py-28">
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary sm:text-xs">
          Visual arts
        </p>

        <WordsPullUpMultiStyle
          segments={HEADING}
          className="mx-auto mt-6 max-w-3xl text-3xl leading-[0.95] text-[#E1E0CC] sm:mt-8 sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
        />

        <p
          ref={paragraphRef}
          className="reveal-text mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-[#DEDBC8] sm:mt-12 sm:text-sm md:text-base"
        >
          {BODY.split('').map((char, i) =>
            char === ' ' ? (
              <Fragment key={i}>{' '}</Fragment>
            ) : (
              <span
                key={i}
                className="reveal-char"
                style={{ '--start': (i / totalChars - 0.1).toFixed(4) } as CSSProperties}
              >
                {char}
              </span>
            ),
          )}
        </p>
      </div>
    </section>
  )
}
