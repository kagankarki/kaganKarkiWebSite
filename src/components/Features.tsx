import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import WordsPullUpMultiStyle, { type Segment } from './WordsPullUpMultiStyle'
import { usePauseWhenOffscreen } from '../hooks/useInViewport'

const CREAM = '#E1E0CC'

const CARD_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4'

const HEADER: Segment[] = [
  {
    text: 'Studio-grade workflows for visionary creators.',
    className: 'text-[#E1E0CC]',
    breakAfter: true,
  },
  { text: 'Built for pure vision. Powered by art.', className: 'text-gray-500' },
]

interface FeatureCard {
  number: string
  title: string
  icon: string
  items: string[]
}

const CARDS: FeatureCard[] = [
  {
    number: '01',
    title: 'Project Storyboard.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    items: [
      'Drag-and-drop scene sequencing',
      'Frame-accurate shot annotations',
      'Version history on every cut',
      'Shared boards for the whole crew',
    ],
  },
  {
    number: '02',
    title: 'Smart Critiques.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    items: [
      'AI analysis of pacing, color and composition',
      'Creative notes written in your own voice',
      'Integrations with the tools you already cut in',
    ],
  },
  {
    number: '03',
    title: 'Immersion Capsule.',
    icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    items: [
      'Notification silencing for deep work blocks',
      'Ambient soundscapes tuned to your edit',
      'Schedule syncing across the collective',
    ],
  },
]

const cardTransition = (index: number) => ({
  duration: 0.8,
  delay: index * 0.15,
  ease: [0.22, 1, 0.36, 1] as const,
})

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const videoRef = useRef<HTMLVideoElement>(null)
  usePauseWhenOffscreen(videoRef)

  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:py-32">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <WordsPullUpMultiStyle
          segments={HEADER}
          className="mx-auto max-w-3xl text-center text-xl font-normal leading-tight sm:text-2xl md:text-3xl lg:text-4xl"
        />

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 gap-3 sm:gap-2 md:mt-16 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4"
        >
          {/* Card 01 — full-bleed video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={cardTransition(0)}
            className="relative h-full min-h-[320px] overflow-hidden rounded-2xl lg:min-h-0"
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={CARD_VIDEO}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p
              className="absolute bottom-5 left-5 right-5 text-base font-medium sm:text-lg"
              style={{ color: CREAM }}
            >
              Your creative canvas.
            </p>
          </motion.div>

          {CARDS.map((card, i) => (
            <motion.article
              key={card.number}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={cardTransition(i + 1)}
              className="flex h-full min-h-[320px] flex-col rounded-2xl bg-[#212121] p-5 sm:p-6 lg:min-h-0"
            >
              <img
                src={card.icon}
                alt=""
                loading="lazy"
                className="h-10 w-10 rounded-lg object-cover sm:h-12 sm:w-12"
              />

              <h3
                className="mt-5 flex items-baseline gap-2 text-base font-medium sm:mt-6 sm:text-lg"
                style={{ color: CREAM }}
              >
                {card.title}
                <span className="text-[10px] font-normal text-primary/40 sm:text-xs">
                  {card.number}
                </span>
              </h3>

              <ul className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:gap-3">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
                    <span className="text-xs leading-snug text-gray-400 sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="group mt-auto flex items-center gap-1.5 pt-6 text-xs font-medium text-primary transition-opacity duration-300 hover:opacity-70 sm:text-sm"
              >
                Learn more
                <ArrowRight
                  className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
