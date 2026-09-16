import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  progress?: number
  onComplete: () => void
}

const PHRASES = [
  'INITIALIZING VISUAL ENGINE',
  'STREAMING 241 CINEMATIC FRAMES',
  'CALIBRATING COLOR SPACE',
  'READY FOR IMMERSION',
]

export default function Preloader({ progress = 100, onComplete }: PreloaderProps) {
  const [displayPercent, setDisplayPercent] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)

  // Smoothly increment the percentage towards target progress
  useEffect(() => {
    const target = Math.min(100, Math.max(0, Math.round(progress)))
    const timer = setInterval(() => {
      setDisplayPercent((prev) => {
        if (prev < target) {
          const step = Math.max(1, Math.floor((target - prev) * 0.2))
          return Math.min(target, prev + step)
        }
        return prev
      })
    }, 25)

    return () => clearInterval(timer)
  }, [progress])

  // Cycle phrases as progress grows
  useEffect(() => {
    if (displayPercent < 30) setPhraseIndex(0)
    else if (displayPercent < 65) setPhraseIndex(1)
    else if (displayPercent < 95) setPhraseIndex(2)
    else setPhraseIndex(3)

    if (displayPercent >= 100 && !isDone) {
      const timeout = setTimeout(() => {
        setIsDone(true)
        setTimeout(() => {
          onComplete()
        }, 800)
      }, 400)
      return () => clearTimeout(timeout)
    }
  }, [displayPercent, isDone, onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99990] flex flex-col justify-between bg-black p-6 sm:p-10 md:p-14"
        >
          {/* Noise overlay */}
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.4]" />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 animate-ping rounded-full bg-[#E1E0CC]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#E1E0CC]/70 sm:text-xs">
                Prisma Collective
              </span>
            </div>
            <div className="text-[11px] font-mono tracking-wider text-[#E1E0CC]/50 sm:text-xs">
              VOL. 2026 // ATELIER
            </div>
          </div>

          {/* Center Counter */}
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <div className="overflow-hidden">
              <motion.h1
                key={displayPercent}
                initial={{ y: 20, opacity: 0.8 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-serif text-[18vw] font-light leading-none tracking-tight text-[#E1E0CC] sm:text-[14vw] md:text-[11vw]"
              >
                {String(displayPercent).padStart(3, '0')}
                <span className="text-[0.4em] font-sans font-light text-[#E1E0CC]/40">%</span>
              </motion.h1>
            </div>

            <div className="mt-4 flex items-center gap-3 sm:mt-6">
              <span className="h-[1px] w-6 bg-[#E1E0CC]/30 sm:w-10" />
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-[10px] uppercase tracking-[0.3em] text-[#E1E0CC]/80 sm:text-xs md:text-sm"
              >
                {PHRASES[phraseIndex]}
              </motion.p>
              <span className="h-[1px] w-6 bg-[#E1E0CC]/30 sm:w-10" />
            </div>
          </div>

          {/* Bottom Progress Track */}
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[10px] tracking-widest text-[#E1E0CC]/50 sm:text-xs">
              <span>CINEMATIC ARCHIVE</span>
              <span>241 FRAMES • 60 FPS</span>
            </div>
            <div className="relative h-[2px] w-full overflow-hidden bg-[#E1E0CC]/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#E1E0CC]"
                style={{ width: `${displayPercent}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
