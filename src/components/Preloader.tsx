import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion'
import { useCopy } from '../i18n'

const COPY = {
  tr: { words: ['Web', 'Mobil', 'Yapay Zeka', 'Girişim', 'Kağan Karkı'], label: 'Portfolyo — 2026', loading: 'Yükleniyor' },
  en: { words: ['Web', 'Mobile', 'AI', 'Startups', 'Kağan Karkı'], label: 'Portfolio — 2026', loading: 'Loading' },
}
const WORD_COUNT = 5

export default function Preloader({ onDone }: { onDone: () => void }) {
  const c = useCopy(COPY)
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const start = performance.now()
    const duration = 2200
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * 100))
      setWordIndex(Math.min(WORD_COUNT - 1, Math.floor(t * WORD_COUNT)))
      if (t < 1) frame = requestAnimationFrame(tick)
      else setTimeout(() => setLeaving(true), 350)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = ''
        onDone()
      }}
    >
      {!leaving && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col justify-between overflow-hidden bg-ink p-6 sm:p-10"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT }}
        >
          <div className="grain pointer-events-none absolute inset-0 opacity-[0.07]" />

          <div className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">
            <span>{c.label}</span>
            <span>Ankara, TR</span>
          </div>

          <div className="relative flex h-[1.4em] items-center justify-center overflow-hidden font-display leading-[1.3] text-5xl font-semibold tracking-tight text-cream sm:text-7xl">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={wordIndex}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className={wordIndex === WORD_COUNT - 1 ? 'text-accent' : ''}
              >
                {c.words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative">
            <div className="flex items-end justify-between">
              <span className="font-display text-[22vw] font-extrabold leading-[0.8] tracking-tighter text-cream/90 sm:text-[14vw]">
                {String(count).padStart(3, '0')}
              </span>
              <span className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/50">{c.loading}</span>
            </div>
            <div className="mt-4 h-px w-full bg-cream/10">
              <div className="h-px bg-accent" style={{ width: `${count}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
