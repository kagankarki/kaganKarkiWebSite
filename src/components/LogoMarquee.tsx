import { Star } from 'lucide-react'
import { ExplorienceMark } from './ui/Frames'
import { useCopy } from '../i18n'

const LOGOS = [
  { name: 'Gazi Üniversitesi', node: <img src="/logos/gazi-logo.png" alt="" className="h-9 w-9" /> },
  { name: 'TED Üniversitesi', node: <img src="/logos/tedu.svg" alt="TED Üniversitesi" className="h-7" />, hideName: true, dark: true },
  { name: 'Explorience', node: <ExplorienceMark className="h-7 w-7" /> },
  { name: 'NeredeMaç', node: <img src="/logos/neredemac.svg" alt="" className="h-8 w-8" /> },
  { name: 'WaxMobi', node: <img src="/logos/waxmobi.webp" alt="" className="h-8 w-8 rounded-lg" /> },
  { name: 'Minik Yıldızlar', node: <Star className="h-6 w-6 fill-[#C9A24A] text-[#C9A24A]" /> },
  { name: 'Letfash', node: <img src="/logos/letfash.webp" alt="" className="h-8 w-8 rounded-lg" /> },
]

const COPY = {
  tr: { words: ['Web', 'Flutter', 'Yapay Zeka', 'Ürün Tasarımı', 'Girişimcilik', 'Mobil', 'Kurumsal Sistemler', 'Startup'], label: 'Çalıştığım kurumlar ve markalar' },
  en: { words: ['Web', 'Flutter', 'AI', 'Product Design', 'Entrepreneurship', 'Mobile', 'Enterprise Systems', 'Startups'], label: 'Organizations and brands I work with' },
}

export default function LogoMarquee() {
  const c = useCopy(COPY)
  return (
    <section className="relative z-30 -my-16 overflow-hidden py-16" aria-label={c.label}>
      {/* Accent word band */}
      <div className="relative z-10 -rotate-2 bg-accent py-4 text-ink">
        <div className="marquee flex w-max gap-10 whitespace-nowrap" style={{ ['--marquee-duration' as string]: '30s' }}>
          {[...c.words, ...c.words].map((w, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-2xl font-bold uppercase tracking-tight sm:text-4xl">
              {w}
              <span className="text-xl">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Logo band */}
      <div className="marquee-paused relative rotate-1 border-y border-white/10 bg-coal py-5">
        <div className="marquee marquee-reverse flex w-max gap-4 whitespace-nowrap" style={{ ['--marquee-duration' as string]: '45s' }}>
          {[...LOGOS, ...LOGOS].map((l, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-full px-5 py-2.5 transition-transform duration-500 hover:-translate-y-1 ${
                'dark' in l ? 'bg-[#292e6f]' : 'bg-cream text-ink'
              }`}
            >
              {l.node}
              {!l.hideName && <span className="font-display text-lg font-semibold tracking-tight">{l.name}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
