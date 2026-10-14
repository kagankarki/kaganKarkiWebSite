import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, Shirt, Sparkles, Star, Wand2 } from 'lucide-react'
import { EASE_OUT } from '../lib/motion'
import { BrowserFrame, PhoneFrame } from './ui/Frames'
import { Eyebrow, RevealWords } from './ui/Reveal'

interface Project {
  key: string
  index: string
  name: string
  kind: string
  description: string
  tags: string[]
  href?: string
  status: string
  theme: string
  text: string
  muted: string
  chip: string
  visual: ReactNode
}

function WaxVisual() {
  return (
    <div className="relative h-full w-full">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        className="absolute right-0 top-[8%] w-[88%]"
      >
        <BrowserFrame src="/shots/waxmobi.webp" url="waxmobi.com" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100, rotate: -14 }}
        whileInView={{ opacity: 1, y: 0, rotate: -6 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.2 }}
        className="absolute bottom-[2%] left-0 w-[34%]"
      >
        <PhoneFrame src="/shots/waxmobi-m.webp" className="aspect-[9/19]" />
      </motion.div>
      <motion.img
        src="/logos/waxmobi.webp"
        alt="WaxMobi logosu"
        initial={{ scale: 0, rotate: -40 }}
        whileInView={{ scale: 1, rotate: 8 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.5 }}
        className="absolute bottom-[6%] right-[4%] w-24 rounded-3xl shadow-2xl sm:w-32"
      />
    </div>
  )
}

const LETFASH_SCREENS = [
  { src: '/letfash/wardrobe.webp', alt: 'Letfash dijital gardırop ekranı', cls: 'left-0 top-[8%] w-[38%] z-10', rotate: -9, d: 0.15 },
  { src: '/letfash/feed.webp', alt: 'Letfash moda sosyal ağı akışı', cls: 'left-1/2 top-0 w-[46%] -translate-x-1/2 z-20', rotate: 0, d: 0 },
  { src: '/letfash/outfit.webp', alt: 'Letfash kombin önizleme ekranı', cls: 'right-0 top-[10%] w-[38%] z-10', rotate: 9, d: 0.3 },
]

function LetfashVisual() {
  return (
    <div className="relative h-full w-full">
      {LETFASH_SCREENS.map((s) => (
        <div key={s.src} className={`absolute ${s.cls}`}>
          <motion.img
            src={s.src}
            alt={s.alt}
            loading="lazy"
            initial={{ opacity: 0, y: 120, rotate: s.rotate * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: s.rotate }}
            whileHover={{ y: -12, rotate: 0, scale: 1.04 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: s.d }}
            className="w-full rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
          />
        </div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        whileInView={{ scale: 1, rotate: -6 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.6 }}
        className="absolute bottom-[4%] left-[6%] z-30 flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-4 shadow-2xl"
      >
        <img src="/logos/letfash.webp" alt="Letfash logosu" className="h-12 w-12 rounded-xl" />
        <span className="font-serif text-2xl text-[#2f474d]">LetFash</span>
      </motion.div>

      {[
        { text: 'Dijital gardırop', icon: Shirt, cls: 'right-[4%] bottom-[22%]', d: 0.8 },
        { text: 'Hava durumuna göre kombin', icon: Wand2, cls: 'right-[10%] bottom-[8%]', d: 1 },
        { text: 'Moda sosyal ağı', icon: Sparkles, cls: 'left-[34%] bottom-[14%]', d: 1.2 },
      ].map(({ text, icon: Icon, cls, d }) => (
        <motion.div
          key={text}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: d }}
          className={`absolute z-30 hidden ${cls} items-center gap-2 rounded-full bg-[#1f3236]/90 px-4 py-2 text-xs font-medium text-white shadow-xl backdrop-blur sm:flex`}
        >
          <Icon className="h-4 w-4 text-[#b7cbc8]" /> {text}
        </motion.div>
      ))}
    </div>
  )
}

function MinikVisual() {
  return (
    <div className="relative h-full w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
        className="absolute left-0 top-0 w-[80%]"
      >
        <BrowserFrame src="/shots/minik-yildizlar.webp" url="minik-yildizlar-v2.vercel.app" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.25 }}
        className="absolute bottom-[4%] left-[18%] w-[60%]"
      >
        <BrowserFrame src="/shots/minik-yildizlar-2.webp" url="Sahne ışıkları animasyonu" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100, rotate: 14 }}
        whileInView={{ opacity: 1, y: 0, rotate: 6 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.4 }}
        className="absolute bottom-0 right-0 w-[28%]"
      >
        <PhoneFrame src="/shots/minik-m.webp" className="aspect-[9/19]" />
      </motion.div>
    </div>
  )
}

const PROJECTS: Project[] = [
  {
    key: 'waxmobi',
    index: '01',
    name: 'WaxMobi',
    kind: 'Flutter · Mobil Uygulama',
    description:
      'Aracı yıkamaya götürmek yerine ekibi aracın yanına getiren mobil uygulama. Hizmeti, günü, saati ve konumu seç; ev, iş yeri ya da otopark fark etmez. Ortalama 30 dakikada pırıl pırıl.',
    tags: ['Flutter', 'Randevu', 'Konum', '7/24'],
    href: 'https://www.waxmobi.com/',
    status: 'Mağazalara geliyor',
    theme: 'bg-[linear-gradient(135deg,#0fe7f7_0%,#1d4ed8_45%,#0a10e8_100%)]',
    text: 'text-white',
    muted: 'text-white/75',
    chip: 'bg-[#FFE500] text-[#0a10e8]',
    visual: <WaxVisual />,
  },
  {
    key: 'letfash',
    index: '02',
    name: 'Letfash',
    kind: 'Yapay Zeka · Mobil Uygulama',
    description:
      'Yapay zeka destekli moda uygulaması ve sosyal ağı. Gardırobunu dijitale taşı, kombinlerini kaydet, hava durumuna göre yapay zekadan öneri al ve stilini toplulukla paylaş.',
    tags: ['Yapay Zeka', 'Mobil', 'Dijital Gardırop', 'Sosyal Ağ'],
    status: 'Mobil uygulama',
    theme: 'bg-[linear-gradient(135deg,#a9bdba_0%,#6f8b89_40%,#2c4247_100%)]',
    text: 'text-white',
    muted: 'text-white/80',
    chip: 'bg-white text-[#2f474d]',
    visual: <LetfashVisual />,
  },
  {
    key: 'minik',
    index: '03',
    name: 'Minik Yıldızlar',
    kind: 'Web · Tasarım & Geliştirme',
    description:
      'Ankara’da organizasyon hizmeti veren Minik Yıldızlar için sinematik bir tanıtım sitesi. Sahne ışıkları, altın tonları ve teklif almaya yönlendiren sade bir akış.',
    tags: ['Web', 'Animasyon', 'Marka', 'Mobil öncelikli'],
    href: 'https://minik-yildizlar-v2.vercel.app/',
    status: 'Yayında',
    theme: 'bg-[radial-gradient(circle_at_80%_10%,#3b2f12_0%,#141210_50%,#0b0b0a_100%)]',
    text: 'text-[#f6ead0]',
    muted: 'text-[#f6ead0]/70',
    chip: 'bg-[#d6b25e] text-[#1a1408]',
    visual: <MinikVisual />,
  },
]

function ProjectCard({ project, i, total, progress }: { project: Project; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - i) * 0.06])
  const brightness = useTransform(progress, [start, 1], [1, 1 - (total - 1 - i) * 0.25])
  const filter = useTransform(brightness, (b) => `brightness(${b})`)

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center px-3 sm:px-6" style={{ paddingTop: `${4 + i * 1.5}rem` }}>
      <motion.article
        style={{ scale, filter }}
        className={`relative flex h-[min(86svh,820px)] w-full max-w-7xl origin-top flex-col overflow-hidden rounded-[2rem] ${project.theme} ${project.text} shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.6)] lg:flex-row sm:rounded-[2.5rem]`}
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.08]" />
        {project.key === 'minik' &&
          [...Array(14)].map((_, s) => (
            <motion.span
              key={s}
              className="absolute text-[#d6b25e]"
              style={{ left: `${(s * 37) % 100}%`, top: `${(s * 53) % 100}%` }}
              animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.6, 1.1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: s * 0.25 }}
            >
              <Star className="h-2.5 w-2.5 fill-current" />
            </motion.span>
          ))}

        <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:w-[42%] lg:p-12">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm opacity-70">{project.index} / 03</span>
              <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${project.chip}`}>{project.status}</span>
            </div>
            <p className={`mt-6 font-mono text-xs uppercase tracking-widest sm:mt-10 ${project.muted}`}>{project.kind}</p>
            <h3 className="mt-2 font-display text-5xl font-extrabold leading-none tracking-tighter sm:text-7xl">{project.name}</h3>
            <p className={`mt-5 max-w-md text-sm leading-relaxed sm:text-base ${project.muted}`}>{project.description}</p>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-current/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="Aç"
                className="group mt-6 hidden items-center gap-3 rounded-full bg-white/15 py-2 pl-5 pr-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/25 sm:inline-flex"
              >
                Siteyi ziyaret et
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            )}
          </div>
        </div>

        <div className="relative min-h-0 flex-1 p-4 sm:p-8 lg:p-10">{project.visual}</div>
      </motion.article>
    </div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="projeler" className="relative bg-ink">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 sm:px-10 sm:pt-40">
        <Eyebrow className="text-cream/60">Ürünler</Eyebrow>
        <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            <RevealWords text="Fikirden," />
            <br />
            <span className="font-serif font-normal italic text-accent">
              <RevealWords text="cebindeki uygulamaya." delay={0.2} />
            </span>
          </h2>
          <p className="max-w-sm text-cream/60">
            Mobil uygulamalar, yapay zeka ve markalar için web deneyimleri. Kaydırdıkça her proje bir
            öncekinin üstüne geliyor.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.key} project={p} i={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
