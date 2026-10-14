import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Github, Instagram, Linkedin } from 'lucide-react'
import { EASE_IN_OUT, EASE_OUT, scrollToId } from '../lib/motion'
import { PROFILE, useCopy, useLang, type Lang } from '../i18n'

const COPY = {
  tr: {
    links: [
      { id: 'hakkimda', label: 'Hakkımda' },
      { id: 'gazi', label: 'Gazi' },
      { id: 'projeler', label: 'Projeler' },
      { id: 'girisimler', label: 'Girişimler' },
      { id: 'helix', label: 'H.E.L.I.X' },
      { id: 'iletisim', label: 'İletişim' },
    ],
    cta: 'Birlikte çalışalım',
    open: 'Menüyü aç',
    close: 'Menüyü kapat',
  },
  en: {
    links: [
      { id: 'hakkimda', label: 'About' },
      { id: 'gazi', label: 'Gazi' },
      { id: 'projeler', label: 'Projects' },
      { id: 'girisimler', label: 'Ventures' },
      { id: 'helix', label: 'H.E.L.I.X' },
      { id: 'iletisim', label: 'Contact' },
    ],
    cta: "Let's work together",
    open: 'Open menu',
    close: 'Close menu',
  },
}

function LangToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`relative flex rounded-full p-1 text-xs font-semibold ${dark ? 'bg-ink/10' : 'bg-white/10'}`}>
      {(['tr', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`relative z-10 rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === l ? (dark ? 'text-accent' : 'text-ink') : dark ? 'text-ink/60' : 'text-cream/60'
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId={dark ? 'lang-pill-dark' : 'lang-pill'}
              className={`absolute inset-0 -z-10 rounded-full ${dark ? 'bg-ink' : 'bg-accent'}`}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  )
}

export default function Nav() {
  const c = useCopy(COPY)
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
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-colors duration-500 sm:px-5 ${
            solid ? 'bg-ink/70 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl' : 'bg-ink/30 backdrop-blur-md'
          }`}
        >
          <button type="button" onClick={() => go('top')} className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm text-ink">K</span>
            <span className="hidden sm:inline">Kağan Karkı</span>
          </button>

          <nav className="hidden items-center lg:flex">
            {c.links.map((l) => (
              <button key={l.id} type="button" onClick={() => go(l.id)} className="group rounded-full px-3 py-2 text-sm text-cream/70 xl:px-4">
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
            <LangToggle />
            <button
              type="button"
              onClick={() => go('iletisim')}
              className="hidden whitespace-nowrap rounded-full bg-cream px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent xl:block"
            >
              {c.cta}
            </button>
            <button
              type="button"
              aria-label={open ? c.close : c.open}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full bg-white/10 lg:hidden"
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
            className="fixed inset-0 z-40 flex flex-col justify-end bg-accent px-6 pb-12 text-ink lg:hidden"
          >
            {c.links.map((l, i) => (
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
            <div className="mt-8 flex items-center justify-between gap-4">
              <LangToggle dark />
              <div className="flex gap-2">
                <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-accent">
                  <Github className="h-5 w-5" />
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-accent">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={PROFILE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-accent">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-ink/60">{PROFILE.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
