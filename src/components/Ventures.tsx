import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Bot, Database, Layers } from 'lucide-react'
import { EASE_OUT } from '../lib/motion'
import { BrowserFrame, ExplorienceMark, PhoneFrame } from './ui/Frames'
import { Eyebrow } from './ui/Reveal'
import { useCopy } from '../i18n'

const COPY = {
  tr: {
    eyebrow: 'Girişimler',
    title: 'Sadece kod yazmıyorum,',
    accent: 'şirket kuruyorum.',
    intro: 'Ortağı olduğum yapay zeka stüdyosu ve kurduğum spor-mekan platformu. İkisi de gerçek müşterilerle, gerçek problemleri çözüyor.',
    keepScrolling: 'Kaydırmaya devam et',
    visit: 'Ziyaret',
    exp: {
      role: 'Ortak',
      kicker: 'Yapay zeka otomasyonu · entegrasyonu · ajan geliştirme',
      title: ['Net. Kesin.', 'Otomatik.'],
      body: 'Ankara merkezli, genç ve küresel hedefli dijital dönüşüm ve yazılım stüdyosu. Ekibimle işletmelere yapay zeka ajanları, kurumsal veriyle çalışan RAG sistemleri, veri altyapıları ve web & mobil ürünler geliştiriyoruz.',
      services: ['AI ajanları & asistanlar', 'Veri mühendisliği & ML', 'ERP / CRM entegrasyonu'],
      stat: 'otomatikleştirilen işletme',
    },
    nm: {
      role: 'Kurucu',
      title: ['Maçı nerede', 'izliyoruz?'],
      body: 'Galatasaray, Fenerbahçe, Beşiktaş ve Trabzonspor maçlarını veren mekanları bulduğun platform. Semtini seç, mekanı bul, yerini WhatsApp’tan tek mesajla ayırt.',
      shot2: 'neredemac.com · Bu haftanın maçları',
    },
  },
  en: {
    eyebrow: 'Ventures',
    title: 'I don’t just write code,',
    accent: 'I build companies.',
    intro: 'An AI studio I’m a partner in and a sports-venue platform I founded. Both solve real problems for real customers.',
    keepScrolling: 'Keep scrolling',
    visit: 'Visit',
    exp: {
      role: 'Partner',
      kicker: 'AI automation · integration · agent development',
      title: ['Clear. Precise.', 'Automated.'],
      body: 'A young, globally minded digital transformation and software studio based in Ankara. With my team we build AI agents, RAG systems on company data, data infrastructure and web & mobile products for businesses.',
      services: ['AI agents & assistants', 'Data engineering & ML', 'ERP / CRM integration'],
      stat: 'businesses automated',
    },
    nm: {
      role: 'Founder',
      title: ['Where are we', 'watching the match?'],
      body: 'The platform for finding venues that show Galatasaray, Fenerbahçe, Beşiktaş and Trabzonspor matches. Pick your district, find a spot and book it with a single WhatsApp message.',
      shot2: 'neredemac.com · This week’s matches',
    },
  },
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return desktop
}

function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative h-auto w-full shrink-0 overflow-hidden rounded-[2rem] lg:h-[82vh] lg:w-[78vw] lg:rounded-[2.5rem] ${className}`}>
      {children}
    </div>
  )
}

function IntroPanel() {
  const c = useCopy(COPY)
  return (
    <div className="flex w-full shrink-0 flex-col justify-center py-10 lg:h-[82vh] lg:w-[42vw] lg:py-0 lg:pr-10">
      <Eyebrow className="text-cream/60">{c.eyebrow}</Eyebrow>
      <h2 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
        {c.title}
        <br />
        <span className="font-serif font-normal italic text-violet">{c.accent}</span>
      </h2>
      <p className="mt-6 max-w-md text-cream/60">{c.intro}</p>
      <p className="mt-10 hidden items-center gap-3 font-mono text-xs uppercase tracking-widest text-cream/40 lg:flex">
        <span className="h-px w-10 bg-cream/30" /> {c.keepScrolling}
      </p>
    </div>
  )
}

function ExpleriencePanel() {
  const c = useCopy(COPY)
  const e = c.exp
  return (
    <Panel className="bg-[#141118]">
      <motion.div
        aria-hidden
        animate={{ x: ['0%', '8%', '0%'], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="fx-heavy absolute -right-[10%] -top-[20%] h-[90%] w-[60%] rounded-full bg-[#b06ae0]/40 blur-[120px]"
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.08]" />
      <div className="absolute bottom-[6%] right-[4%] hidden w-[46%] rotate-[3deg] xl:block">
        <BrowserFrame src="/shots/explorience.webp" url="explorience.com.tr" />
      </div>
      <div className="relative flex h-full flex-col justify-between gap-10 p-7 sm:p-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <ExplorienceMark className="h-8 w-8" />
            <span className="font-display text-2xl font-semibold tracking-tight">explorience</span>
          </div>
          <span className="rounded-full bg-[#c58cf2] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#1b0f26]">
            {e.role}
          </span>
        </div>

        <div className="max-w-xl text-white xl:max-w-[46%]">
          <p className="font-mono text-xs uppercase tracking-widest text-[#d7b4f5]">{e.kicker}</p>
          <h3 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            {e.title[0]}
            <br />
            {e.title[1]}
          </h3>
          <p className="mt-5 text-white/70">{e.body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Bot, t: e.services[0] },
              { icon: Database, t: e.services[1] },
              { icon: Layers, t: e.services[2] },
            ].map(({ icon: Icon, t }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur-md">
                <Icon className="mb-3 h-5 w-5 text-[#d7b4f5]" />
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-10 text-white">
          <div>
            <p className="font-display text-6xl font-extrabold tracking-tighter">100+</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/50">{e.stat}</p>
          </div>
          <a
            href="https://www.explorience.com.tr/tr/"
            target="_blank"
            rel="noreferrer"
            data-cursor={c.visit}
            className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-medium text-[#141118]"
          >
            explorience.com.tr
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#141118] text-white transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </Panel>
  )
}

const TEAMS = ['gs', 'fb', 'bjk', 'ts']

function NeredemacPanel() {
  const c = useCopy(COPY)
  const n = c.nm
  return (
    <Panel className="bg-[radial-gradient(circle_at_20%_0%,#1f6b45_0%,#101814_50%,#0b0f0d_100%)]">
      <div className="relative grid h-full grid-cols-1 gap-8 p-7 sm:p-12 lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-8 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logos/neredemac.svg" alt="" className="h-9 w-9" />
              <span className="font-display text-2xl font-bold tracking-tight">
                nerede<span className="text-[#3ccf86]">maç</span>
              </span>
            </div>
            <span className="rounded-full bg-[#3ccf86] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-[#06210f]">
              {n.role}
            </span>
          </div>

          <div>
            <h3 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
              {n.title[0]}
              <br />
              <span className="text-[#3ccf86]">{n.title[1]}</span>
            </h3>
            <p className="mt-5 max-w-md text-white/70">{n.body}</p>
            <div className="mt-6 flex gap-3">
              {TEAMS.map((t, i) => (
                <motion.div
                  key={t}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2 shadow-lg"
                >
                  <img src={`/logos/${t}.svg`} alt="" className="h-full w-full object-contain" />
                </motion.div>
              ))}
            </div>
            <a
              href="https://www.neredemac.com/"
              target="_blank"
              rel="noreferrer"
              data-cursor={c.visit}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#3ccf86] py-2 pl-5 pr-2 text-sm font-semibold text-[#06210f]"
            >
              neredemac.com
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#06210f] text-[#3ccf86] transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[320px] sm:block">
          <BrowserFrame src="/shots/neredemac.webp" url="neredemac.com" className="absolute right-0 top-0 w-[95%]" />
          <BrowserFrame src="/shots/neredemac-2.webp" url={n.shot2} className="absolute bottom-[4%] right-[10%] w-[70%]" />
          <PhoneFrame src="/shots/neredemac-m.webp" className="absolute -bottom-[2%] left-0 aspect-[9/19] w-[27%] rotate-[-6deg]" />
        </div>
      </div>
    </Panel>
  )
}

export default function Ventures() {
  const desktop = useIsDesktop()
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [desktop])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })
  const x = useTransform(smooth, [0, 1], [0, -distance])

  // One <section> for both layouts, so the scroll tracker is bound to it from the first render.
  return (
    <section
      id="girisimler"
      ref={ref}
      className={`relative bg-ink ${desktop ? '' : 'px-4 pb-20 pt-24 sm:px-8'}`}
      style={desktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      {desktop ? (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-8 pl-[6vw] pr-[6vw]">
            <IntroPanel />
            <ExpleriencePanel />
            <NeredemacPanel />
          </motion.div>
        </div>
      ) : (
        <>
          <IntroPanel />
          <div className="space-y-6">
            {[<ExpleriencePanel key="e" />, <NeredemacPanel key="n" />].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1, ease: EASE_OUT }}
              >
                {p}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
