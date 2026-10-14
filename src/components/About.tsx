import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin } from 'lucide-react'
import { Eyebrow, FadeUp, RevealImage, RevealWords } from './ui/Reveal'
import { ExplorienceMark } from './ui/Frames'
import { PROFILE, useCopy } from '../i18n'

const COPY = {
  tr: {
    eyebrow: 'Hakkımda',
    hello: 'Merhaba, ben',
    name: 'Kağan Karkı.',
    story:
      '2003 doğumluyum ve TED Üniversitesinde Yazılım Mühendisliği okuyorum. Kendimi geliştirmeyi hiç bırakmıyorum: öğrendiğim her şeyi ertesi gün gerçek bir üründe deniyorum. Gazi Üniversitesi için kurumsal sistemler yazdım, mobil uygulamalar geliştirdim, Explorience’ın ortağı oldum ve NeredeMaç’ı kurdum.',
    more:
      'Bir problemi bulmayı, onu sade bir ürüne dönüştürmeyi ve gerçek kullanıcıların elinde büyütmeyi seviyorum. Kodun yanında tasarımı, ürünü ve girişimciliği de aynı merakla öğreniyorum.',
    facts: [
      ['Doğum', '2003 · Ankara'],
      ['Eğitim', 'TED Üniversitesi'],
      ['Odak', 'Web · Mobil · Yapay Zeka'],
    ],
    photoAlt: 'TED Üniversitesi kampüsü, Ankara',
    dept: 'Yazılım Mühendisliği',
    campus: 'TED Üniversitesi · Ankara',
    now: 'Şu an',
    visit: 'Ziyaret',
    cards: {
      tedu: { role: 'Öğrenci', detail: 'Yazılım Mühendisliği' },
      exp: { role: 'Ortak', detail: 'Yapay zeka & dijital dönüşüm stüdyosu' },
      nm: { role: 'Kurucu', detail: 'Maç izlenecek mekanları bulan platform' },
    },
    stats: ['Hayata geçen proje', 'Gazi Üniversitesi sistemi', 'Girişim', 'Mobil uygulama'],
  },
  en: {
    eyebrow: 'About',
    hello: 'Hi, I’m',
    name: 'Kağan Karkı.',
    story:
      'I was born in 2003 and I study Software Engineering at TED University. I never stop pushing myself: whatever I learn, I try in a real product the next day. I’ve built institutional systems for Gazi University, developed mobile apps, became a partner at Explorience and founded NeredeMaç.',
    more:
      'I love finding a problem, turning it into a simple product and growing it in the hands of real users. Alongside code, I learn design, product and entrepreneurship with the same curiosity.',
    facts: [
      ['Born', '2003 · Ankara'],
      ['Education', 'TED University'],
      ['Focus', 'Web · Mobile · AI'],
    ],
    photoAlt: 'TED University campus, Ankara',
    dept: 'Software Engineering',
    campus: 'TED University · Ankara',
    now: 'Right now',
    visit: 'Visit',
    cards: {
      tedu: { role: 'Student', detail: 'Software Engineering' },
      exp: { role: 'Partner', detail: 'AI & digital transformation studio' },
      nm: { role: 'Founder', detail: 'Find where to watch the match' },
    },
    stats: ['Projects shipped', 'Gazi University systems', 'Ventures', 'Mobile apps'],
  },
}

const STAT_VALUES = [7, 2, 2, 2]

interface NowCard {
  key: string
  name: string
  role: string
  detail: string
  logo: ReactNode
  href?: string
  light?: boolean
  bg?: string
}

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
    <p ref={ref} className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
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
  const c = useCopy(COPY)

  const now: NowCard[] = [
    {
      key: 'tedu',
      name: c.campus.split(' · ')[0],
      ...c.cards.tedu,
      logo: <img src="/logos/tedu.svg" alt="" className="h-8" />,
      light: true,
    },
    {
      key: 'exp',
      name: 'Explorience',
      ...c.cards.exp,
      href: 'https://www.explorience.com.tr/tr/',
      logo: <ExplorienceMark className="h-9 w-9 text-white" />,
      bg: 'bg-[radial-gradient(circle_at_70%_20%,#b06ae0_0%,#2a1f3a_55%,#141118_100%)]',
    },
    {
      key: 'nm',
      name: 'NeredeMaç',
      ...c.cards.nm,
      href: 'https://www.neredemac.com/',
      logo: <img src="/logos/neredemac.svg" alt="" className="h-10 w-10" />,
      bg: 'bg-[radial-gradient(circle_at_70%_20%,#2fa86a_0%,#13261b_55%,#0f1411_100%)]',
    },
  ]

  return (
    <section id="hakkimda" className="relative z-20 -mt-px bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10 sm:py-32">
        <Eyebrow className="text-ink/60">{c.eyebrow}</Eyebrow>

        <h2 className="mt-6 max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          <RevealWords text={c.hello} />
          <br />
          <span className="font-serif font-normal italic text-coral">
            <RevealWords text={c.name} delay={0.2} />
          </span>
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Campus photo with TEDU badge */}
          <div className="relative lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <RevealImage src="/photos/tedu-kampus.webp" alt={c.photoAlt} className="aspect-[4/5] rounded-[2rem]" />
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -6 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                className="absolute -bottom-6 -right-2 rounded-2xl bg-[#292e6f] p-4 shadow-2xl sm:-right-6"
              >
                <img src="/logos/tedu.svg" alt="TED Üniversitesi" className="h-10" />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/70">{c.dept}</p>
              </motion.div>
              <p className="mt-10 font-mono text-[10px] uppercase tracking-widest text-ink/40">{c.campus}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ScrollText key={c.story} text={c.story} />

            <FadeUp className="mt-10">
              <p className="max-w-xl text-lg leading-relaxed text-ink/70">{c.more}</p>
            </FadeUp>

            <FadeUp className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-3">
              {c.facts.map(([k, v]) => (
                <div key={k} className="bg-cream p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink/50">{k}</p>
                  <p className="mt-1 font-display text-lg font-semibold">{v}</p>
                </div>
              ))}
            </FadeUp>

            <FadeUp className="mt-8 flex flex-wrap gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="GitHub"
                className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-2 pr-5 text-sm font-medium text-cream"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
                  <Github className="h-4 w-4" />
                </span>
                github.com/kagankarki
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="LinkedIn"
                className="group inline-flex items-center gap-3 rounded-full bg-[#0a66c2] py-2 pl-2 pr-5 text-sm font-medium text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0a66c2] transition-transform duration-500 group-hover:rotate-[360deg]">
                  <Linkedin className="h-4 w-4" />
                </span>
                linkedin.com/in/kagan-karki
              </a>
            </FadeUp>

            <div className="mt-16 space-y-4">
              <Eyebrow className="text-ink/60">{c.now}</Eyebrow>
              {now.map((n, i) => {
                const Tag = n.href ? 'a' : 'div'
                return (
                  <FadeUp key={n.key} delay={i * 0.1}>
                    <Tag
                      {...(n.href ? { href: n.href, target: '_blank', rel: 'noreferrer', 'data-cursor': c.visit } : {})}
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
          {c.stats.map((label, i) => (
            <FadeUp key={i} delay={i * 0.08} className="bg-cream p-6 sm:p-10">
              <p className={`font-display text-6xl font-extrabold tracking-tighter sm:text-8xl ${i === 0 ? 'text-coral' : ''}`}>
                <Counter to={STAT_VALUES[i]} />
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink/50">{label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
