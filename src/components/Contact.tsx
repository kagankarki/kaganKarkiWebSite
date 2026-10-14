import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { scrollToId } from '../lib/motion'
import Magnetic from './ui/Magnetic'
import { Eyebrow, RevealWords } from './ui/Reveal'

const EMAIL = 'kagankarki03@gmail.com'

const LINKS = [
  { label: 'Explorience', href: 'https://www.explorience.com.tr/tr/' },
  { label: 'NeredeMaç', href: 'https://www.neredemac.com/' },
  { label: 'WaxMobi', href: 'https://www.waxmobi.com/' },
  { label: 'Minik Yıldızlar', href: 'https://minik-yildizlar-v2.vercel.app/' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    void navigator.clipboard?.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer id="iletisim" className="relative overflow-hidden rounded-t-[2.5rem] bg-accent text-ink sm:rounded-t-[4rem]">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.1]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-24 sm:px-10 sm:pt-36">
        <Eyebrow className="text-ink/60 [&>span:first-child]:bg-ink">İletişim · Yeni projelere açığım</Eyebrow>

        <h2 className="mt-8 font-display text-[15vw] font-extrabold leading-[0.85] tracking-[-0.05em] lg:text-[11vw]">
          <RevealWords text="Hadi bir şey" />
          <br />
          <span className="font-serif font-normal italic tracking-[-0.03em]">
            <RevealWords text="inşa edelim." delay={0.15} />
          </span>
        </h2>

        <div className="mt-16 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-md text-lg text-ink/70">
            Web platformu, mobil uygulama, yapay zeka entegrasyonu ya da sıfırdan bir girişim fikri. Bir mesaj
            at, kahve eşliğinde konuşalım.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Magnetic strength={0.5}>
              <a
                href={`mailto:${EMAIL}`}
                data-cursor="Yaz"
                className="group flex h-36 w-36 flex-col items-center justify-center rounded-full bg-ink text-center text-cream transition-transform duration-500 hover:scale-105 sm:h-44 sm:w-44"
              >
                <ArrowUpRight className="h-7 w-7 text-accent transition-transform duration-500 group-hover:rotate-45" />
                <span className="mt-2 font-display text-lg font-semibold">E-posta at</span>
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 font-mono text-sm transition-colors hover:bg-ink hover:text-accent"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Kopyalandı' : EMAIL}
            </button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-ink/15 pt-10 text-sm sm:grid-cols-4">
          {[
            ['Konum', 'Ankara, Türkiye'],
            ['Eğitim', 'TED Üniversitesi'],
            ['Ortaklık', 'Explorience'],
            ['Girişim', 'NeredeMaç'],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink/50">{k}</p>
              <p className="mt-1 font-display text-lg font-semibold">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="group relative">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>
          <motion.button
            type="button"
            onClick={() => scrollToId('top')}
            whileHover={{ y: -4 }}
            className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-accent"
          >
            Başa dön <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <div className="relative select-none overflow-hidden pb-4">
        <motion.p
          initial={{ y: '60%' }}
          whileInView={{ y: '0%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap text-center font-display text-[19vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-ink"
        >
          KAĞAN KARKI
        </motion.p>
        <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-widest text-ink/50">© {new Date().getFullYear()} · Ankara</p>
      </div>
    </footer>
  )
}
