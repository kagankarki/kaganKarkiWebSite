import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { EASE_IN_OUT, EASE_OUT, scrollToId } from '../lib/motion'

const LINKS = [
  { id: 'hakkimda', label: 'Hakkımda' },
  { id: 'gazi', label: 'Gazi' },
  { id: 'projeler', label: 'Projeler' },
  { id: 'girisimler', label: 'Girişimler' },
  { id: 'iletisim', label: 'İletişim' },
]

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 400 && !open)
    setSolid(y > 40)
  })

  const go = (id: string) => {
    setOpen(false)
    setTimeout(() => scrollToId(id), open ? 500 : 0)
  }

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-120%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-colors duration-500 sm:px-6 ${
            solid ? 'bg-ink/70 shadow-2xl backdrop-blur-xl ring-1 ring-white/10' : ''
          }`}
        >
          <button type="button" onClick={() => go('top')} className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm text-ink">K</span>
            <span className="hidden sm:inline">Kağan Karkı</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className="group rounded-full px-4 py-2 text-sm text-cream/70"
              >
                <span className="relative block h-5 overflow-hidden leading-5">
                  <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    <span className="block">{l.label}</span>
                    <span className="block text-accent">{l.label}</span>
                  </span>
                </span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go('iletisim')}
              className="hidden rounded-full bg-cream px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent sm:block"
            >
              Birlikte çalışalım
            </button>
            <button
              type="button"
              aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/10 md:hidden"
            >
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="h-px w-5 bg-cream" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0 }} className="h-px w-5 bg-cream" />
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="mx-auto mt-2 h-px max-w-7xl origin-left bg-accent/60" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-accent px-6 pb-14 text-ink md:hidden"
          >
            {LINKS.map((l, i) => (
              <div key={l.id} className="overflow-hidden">
                <motion.button
                  type="button"
                  onClick={() => go(l.id)}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 + i * 0.06 }}
                  className="block py-1 text-left font-display text-5xl font-bold tracking-tight"
                >
                  {l.label}
                </motion.button>
              </div>
            ))}
            <p className="mt-8 font-mono text-xs uppercase tracking-widest text-ink/60">kagankarki03@gmail.com</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
