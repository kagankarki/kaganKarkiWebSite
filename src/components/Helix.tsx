import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { EASE_OUT } from '../lib/motion'
import { Eyebrow, FadeUp, RevealWords } from './ui/Reveal'
import { useCopy } from '../i18n'

const COPY = {
  tr: {
    eyebrow: 'Kişisel Asistanım',
    title: 'H.E.L.I.X ile',
    accent: 'birlikte çalışıyoruz.',
    body: 'H.E.L.I.X, kendi geliştirdiğim kişisel yapay zeka asistanım. Kod yazarken, plan yaparken ve yeni fikirleri denerken birlikte çalışıyoruz.',
    greeting: 'Merhaba Kağan. Bugün neyi inşa ediyoruz?',
    status: 'Çevrimiçi',
    alt: 'H.E.L.I.X kişisel asistan görseli',
    tags: ['Kendi geliştirmem', 'Yapay zeka', 'Kişisel asistan'],
  },
  en: {
    eyebrow: 'My Personal Assistant',
    title: 'Working side by side',
    accent: 'with H.E.L.I.X.',
    body: 'H.E.L.I.X is the personal AI assistant I built myself. We work together while I code, plan and try out new ideas.',
    greeting: 'Hello Kağan. What are we building today?',
    status: 'Online',
    alt: 'H.E.L.I.X personal assistant visual',
    tags: ['Built by me', 'AI', 'Personal assistant'],
  },
}

function TypedLine({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
  }, [text])

  useEffect(() => {
    if (!inView || count >= text.length) return
    const id = setTimeout(() => setCount((c) => c + 1), 38)
    return () => clearTimeout(id)
  }, [inView, count, text])

  return (
    <p ref={ref} className="min-h-[1.5em] font-mono text-sm text-sky sm:text-base">
      {text.slice(0, count)}
      <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-sky" />
    </p>
  )
}

export default function Helix() {
  const c = useCopy(COPY)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1])
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.45], ['0%', '100%'])

  return (
    <section id="helix" ref={ref} className="relative overflow-hidden bg-[#070b12] py-28 text-cream sm:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="text-sky/80 [&>span:first-child]:bg-sky">{c.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              <RevealWords text={c.title} />
              <br />
              <span className="font-serif font-normal italic text-sky">
                <RevealWords text={c.accent} delay={0.2} />
              </span>
            </h2>
          </div>
          <FadeUp className="lg:col-span-5" delay={0.2}>
            <p className="text-lg leading-relaxed text-cream/70">{c.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span key={t} className="rounded-full border border-sky/30 bg-sky/10 px-3 py-1 text-xs text-sky">
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Banner with a breathing ring over the original glow */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-sky/15 shadow-[0_0_120px_-30px_rgba(124,196,255,0.45)] sm:rounded-[2.5rem]"
        >
          <motion.img src="/photos/helix.webp" alt={c.alt} style={{ scale: imgScale }} className="block aspect-[16/9] w-full object-cover sm:aspect-[2.75/1]" />

          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute left-1/2 top-[48.5%] aspect-square w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky/60 sm:w-[13%]"
          />
          <motion.div
            aria-hidden
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="fx-heavy pointer-events-none absolute left-1/2 top-[48.5%] aspect-square w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/20 blur-3xl"
          />

          {/* Chat bubble */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto sm:w-[420px]">
            <div className="rounded-2xl border border-white/10 bg-[#0b1220]/80 p-4 backdrop-blur-xl sm:p-5">
              <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cream/60">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-sky/70" />
                  <span className="relative h-2 w-2 rounded-full bg-sky" />
                </span>
                H.E.L.I.X · {c.status}
              </div>
              <TypedLine text={c.greeting} />
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex items-center gap-6">
          <div className="flex gap-3 font-display text-3xl font-bold tracking-[0.3em] text-cream/80 sm:text-5xl">
            {'HELIX'.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.08 }}
              >
                {ch}
                {i < 4 && <span className="text-sky">.</span>}
              </motion.span>
            ))}
          </div>
          <div className="h-px flex-1 bg-white/10">
            <motion.div style={{ width: lineWidth }} className="h-px bg-gradient-to-r from-sky to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
