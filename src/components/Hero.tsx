import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { EASE_OUT, scrollToId } from '../lib/motion'
import Magnetic from './ui/Magnetic'

const ROLES = ['web platformları', 'mobil uygulamalar', 'yapay zeka ürünleri', 'girişimler']

interface Shot {
  src: string
  className: string
  depth: number
  rotate: number
  phone?: boolean
}

// Real screenshots of the projects, scattered around the name.
const SHOTS: Shot[] = [
  { src: '/shots/gazi-sinav.webp', className: 'left-[-6%] top-[12%] w-[30vw] max-w-[440px] sm:left-[2%]', depth: 30, rotate: -8 },
  { src: '/shots/neredemac.webp', className: 'right-[-8%] top-[10%] w-[34vw] max-w-[480px] sm:right-[1%]', depth: 45, rotate: 6 },
  { src: '/shots/waxmobi-m.webp', className: 'left-[10%] bottom-[8%] hidden w-[11vw] max-w-[170px] md:block', depth: 60, rotate: -12, phone: true },
  { src: '/shots/minik-yildizlar.webp', className: 'right-[4%] bottom-[14%] hidden w-[26vw] max-w-[400px] md:block', depth: 25, rotate: -5 },
  { src: '/shots/explorience.webp', className: 'left-[28%] top-[-6%] hidden w-[18vw] max-w-[280px] lg:block', depth: 15, rotate: 4 },
  { src: '/shots/neredemac-m.webp', className: 'right-[30%] bottom-[-10%] hidden w-[10vw] max-w-[150px] lg:block', depth: 50, rotate: 10, phone: true },
]

function FloatingShot({
  shot,
  index,
  mx,
  my,
  scrollOut,
  ready,
}: {
  shot: Shot
  index: number
  mx: MotionValue<number>
  my: MotionValue<number>
  scrollOut: MotionValue<number>
  ready: boolean
}) {
  const x = useTransform(mx, (v) => v * shot.depth)
  const y = useTransform([my, scrollOut], ([m, s]: number[]) => m * shot.depth - s * shot.depth * 6)
  const scale = useTransform(scrollOut, [0, 1], [1, 0.85])

  return (
    <motion.div className={`absolute ${shot.className}`} style={{ x, y, scale }}>
      <motion.div
        initial={{ opacity: 0, y: 120, rotate: shot.rotate * 2 }}
        animate={ready ? { opacity: 1, y: 0, rotate: shot.rotate } : undefined}
        transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.5 + index * 0.1 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut' }}
          className={`overflow-hidden border border-white/10 opacity-60 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ${
            shot.phone ? 'aspect-[9/19] rounded-[1.6rem] border-[5px] border-[#222]' : 'aspect-[16/10] rounded-xl'
          }`}
        >
          <img src={shot.src} alt="" className="h-full w-full object-cover object-top" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function SplitLetters({ text, ready, delay, className }: { text: string; ready: boolean; delay: number; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.08em] ${className ?? ''}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: '110%' }}
          animate={ready ? { y: '0%' } : undefined}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: delay + i * 0.05 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const [role, setRole] = useState(0)

  const mxRaw = useMotionValue(0)
  const myRaw = useMotionValue(0)
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 20 })
  const my = useSpring(myRaw, { stiffness: 60, damping: 20 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={(e) => {
        mxRaw.set(e.clientX / window.innerWidth - 0.5)
        myRaw.set(e.clientY / window.innerHeight - 0.5)
      }}
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden bg-ink"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />

      {SHOTS.map((s, i) => (
        <FloatingShot key={s.src} shot={s} index={i} mx={mx} my={my} scrollOut={scrollYProgress} ready={ready} />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,12,0.85)_20%,rgba(10,10,12,0.2)_70%)]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" />

      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Yazılım Mühendisi · Girişimci · Ankara
        </motion.div>

        <h1 className="font-display font-extrabold leading-[0.85] tracking-[-0.05em] text-cream">
          <SplitLetters text="Kağan" ready={ready} delay={0.3} className="text-[22vw] sm:text-[17vw] lg:text-[14vw]" />
          <br />
          <SplitLetters
            text="Karkı"
            ready={ready}
            delay={0.5}
            className="font-serif text-[22vw] font-normal italic tracking-[-0.03em] text-accent sm:text-[17vw] lg:text-[14vw]"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 1, delay: 1.1 }}
          className="mx-auto mt-6 max-w-xl text-lg text-cream/70 sm:text-2xl"
        >
          <span className="block">Gerçek kullanıcılar için</span>
          <span className="relative block h-[1.4em] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={role}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className="absolute inset-x-0 block whitespace-nowrap"
              >
                <span className="font-serif text-[1.15em] italic text-cream">{ROLES[role]}</span> geliştiriyorum.
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE_OUT, delay: 1.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <button
              type="button"
              data-cursor="Keşfet"
              onClick={() => scrollToId('projeler')}
              className="group flex items-center gap-3 rounded-full bg-accent py-2 pl-6 pr-2 font-medium text-ink"
            >
              Projelerime bak
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-accent transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </button>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={() => scrollToId('iletisim')}
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-cream backdrop-blur-md transition-colors hover:bg-white/15"
            >
              İletişime geç
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToId('hakkimda')}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50"
      >
        Kaydır
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  )
}
