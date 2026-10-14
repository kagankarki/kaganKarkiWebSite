import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, FadeUp, RevealImage, RevealWords } from './ui/Reveal'
import { ExplorienceMark } from './ui/Frames'

const STORY =
  'Bir tıp fakültesinin sınav sürecini dijitale taşımak, bir taraftarın maçı izleyeceği mekanı bulmak, aracını kapında yıkatmak ya da sabah ne giyeceğine karar vermek. Hepsi aynı soruyla başlıyor: bunu daha iyi nasıl yaparız? TED Üniversitesinde öğrendiğimi ertesi gün gerçek ürünlerde kullanıyorum.'

const NOW = [
  {
    role: 'Öğrenci',
    name: 'TED Üniversitesi',
    detail: 'Yazılım Mühendisliği',
    logo: <img src="/logos/tedu.svg" alt="TED Üniversitesi" className="h-8" />,
    light: true,
  },
  {
    role: 'Ortak',
    name: 'Explorience',
    detail: 'Yapay zeka & dijital dönüşüm stüdyosu',
    href: 'https://www.explorience.com.tr/tr/',
    logo: <ExplorienceMark className="h-9 w-9 text-white" />,
    bg: 'bg-[radial-gradient(circle_at_70%_20%,#b06ae0_0%,#2a1f3a_55%,#141118_100%)]',
  },
  {
    role: 'Kurucu',
    name: 'NeredeMaç',
    detail: 'Maç izlenecek mekanları bulan platform',
    href: 'https://www.neredemac.com/',
    logo: <img src="/logos/neredemac.svg" alt="" className="h-10 w-10" />,
    bg: 'bg-[radial-gradient(circle_at_70%_20%,#2fa86a_0%,#13261b_55%,#0f1411_100%)]',
  },
]

const STATS = [
  { value: 7, label: 'Hayata geçen proje' },
  { value: 2, label: 'Gazi Üniversitesi sistemi' },
  { value: 2, label: 'Girişim' },
  { value: 2, label: 'Mobil uygulama' },
]

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  )
}

function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-5xl">
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  )
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return <span ref={ref}>{String(value).padStart(2, '0')}</span>
}

export default function About() {
  return (
    <section id="hakkimda" className="relative z-20 -mt-px bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 sm:py-32">
        <Eyebrow className="text-ink/60">Hakkımda</Eyebrow>

        <h2 className="mt-6 max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          <RevealWords text="Kod yazıyorum," />
          <br />
          <span className="font-serif font-normal italic">
            <RevealWords text="ama asıl işim problem çözmek." delay={0.2} />
          </span>
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Campus photo with TEDU badge */}
          <div className="relative lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <RevealImage
                src="/photos/tedu-kampus.webp"
                alt="TED Üniversitesi kampüsü, Ankara"
                className="aspect-[4/5] rounded-[2rem]"
              />
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                className="absolute -bottom-6 -right-2 rounded-2xl bg-[#292e6f] p-4 shadow-2xl sm:-right-6"
              >
                <img src="/logos/tedu.svg" alt="TED Üniversitesi" className="h-10" />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/70">Yazılım Mühendisliği</p>
              </motion.div>
              <p className="mt-10 font-mono text-[10px] uppercase tracking-widest text-ink/40">TED Üniversitesi · Ankara</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ScrollText text={STORY} />

            <div className="mt-16 space-y-4">
              <Eyebrow className="text-ink/60">Şu an</Eyebrow>
              {NOW.map((n, i) => {
                const Tag = n.href ? 'a' : 'div'
                return (
                  <FadeUp key={n.name} delay={i * 0.1}>
                    <Tag
                      {...(n.href ? { href: n.href, target: '_blank', rel: 'noreferrer', 'data-cursor': 'Ziyaret' } : {})}
                      className={`group relative flex items-center gap-5 overflow-hidden rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-1 sm:p-6 ${
                        n.light ? 'border border-ink/10 bg-white' : `${n.bg} text-white`
                      }`}
                    >
                      <div
                        className={`flex h-16 w-28 shrink-0 items-center justify-center rounded-2xl px-2 ${n.light ? 'bg-[#292e6f]' : 'bg-white/10 backdrop-blur'}`}
                      >
                        {n.logo}
                      </div>
                      <div className="flex-1">
                        <p className={`font-mono text-[10px] uppercase tracking-widest ${n.light ? 'text-ink/50' : 'text-white/60'}`}>{n.role}</p>
                        <p className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{n.name}</p>
                        <p className={`text-sm ${n.light ? 'text-ink/60' : 'text-white/70'}`}>{n.detail}</p>
                      </div>
                      {n.href && (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      )}
                    </Tag>
                  </FadeUp>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-28 grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] bg-ink/10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08} className="bg-cream p-6 sm:p-10">
              <p className="font-display text-6xl font-extrabold tracking-tighter sm:text-8xl">
                <Counter to={s.value} />
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink/50">{s.label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
