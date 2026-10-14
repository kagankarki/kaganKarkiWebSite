import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { EASE_OUT } from '../lib/motion'
import { BrowserFrame } from './ui/Frames'
import { Eyebrow, FadeUp, RevealWords } from './ui/Reveal'
import { useCopy } from '../i18n'

const SYSTEM_META = [
  { url: 'gazisinavsoru.com', href: 'https://gazisinavsoru.com/', shot: '/shots/gazi-sinav.webp' },
  { url: 'tip.gazi.edu.tr/intern-karne', href: 'https://tip.gazi.edu.tr/intern-karne/', shot: '/shots/intern-karne.webp' },
]

const COPY = {
  tr: {
    eyebrow: 'Kurumsal Projeler · Gazi Üniversitesi',
    title: 'Bir tıp fakültesinin',
    accent: 'günlük işleyişi, kodumda.',
    intro: 'Gazi Üniversitesi Tıp Fakültesi için iki sistem tasarlayıp geliştirdim. İkisi de yayında; giriş ekranlarında imzam duruyor.',
    open: 'Aç',
    go: 'Sisteme git',
    shot: 'ekran görüntüsü',
    systems: [
      {
        name: 'Gazi Tıp Sınav Merkezi',
        description:
          'Tıp fakültesinin sınav süreçlerini yöneten merkezi platform. Öğretim üyesi, yönetici ve kontrol grubu kendi yetkileriyle giriyor; her oturum Google Authenticator ile iki aşamalı doğrulamadan geçiyor.',
        features: ['Rol tabanlı erişim: Öğretim Üyesi, Yönetici, Kontrol Grubu', 'TOTP ile iki aşamalı doğrulama ve QR kurulum', 'Sınav süreçlerinin uçtan uca yönetimi'],
      },
      {
        name: '6. Sınıf İntörn Karnesi',
        description:
          'İntörn hekimlerin kağıt staj karnesini dijitale taşıyan sistem. Öğrenci, eğitici, ana bilim dalı başkanı ve öğrenci işleri aynı akışta buluşuyor; QR kodla giriş ve Türkçe/İngilizce arayüz.',
        features: ['Logbook, staj ilerlemesi ve vaka girişleri', 'Eğitici onayı ve ana bilim dalı final değerlendirmesi', 'Mezuniyet kilidi, arşiv ve dış evrak yönetimi'],
      },
    ],
  },
  en: {
    eyebrow: 'Institutional Projects · Gazi University',
    title: 'A medical faculty’s',
    accent: 'daily operations, in my code.',
    intro: 'I designed and built two systems for Gazi University Faculty of Medicine. Both are live, with my signature on their login screens.',
    open: 'Open',
    go: 'Open the system',
    shot: 'screenshot',
    systems: [
      {
        name: 'Gazi Medical Exam Center',
        description:
          'The central platform that runs the faculty’s exam workflows. Faculty members, admins and the audit group sign in with their own permissions, and every session goes through Google Authenticator two-factor verification.',
        features: ['Role-based access: Faculty, Admin, Audit Group', 'TOTP two-factor authentication with QR setup', 'End-to-end exam workflow management'],
      },
      {
        name: '6th-Year Intern Logbook',
        description:
          'Moves intern doctors’ paper internship logbook online. Students, instructors, department heads and student affairs share one flow, with QR sign-in and a Turkish/English interface.',
        features: ['Logbook, internship progress and case entries', 'Instructor approvals and department final evaluation', 'Graduation lock, archive and external document management'],
      },
    ],
  },
}

export default function GaziSpotlight() {
  const c = useCopy(COPY)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.25, 1])
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="gazi" ref={ref} className="relative overflow-hidden bg-[#0b1530] text-white">
      {/* Campus photo backdrop */}
      <div className="absolute inset-x-0 top-0 h-[110vh] overflow-hidden">
        <motion.img
          src="/photos/gazi-besevler.webp"
          alt=""
          style={{ scale: bgScale, y: bgY }}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1530]/40 via-[#0b1530]/70 to-[#0b1530]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-40 sm:px-10 sm:pb-40 sm:pt-52">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Eyebrow className="text-white/60">{c.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              <RevealWords text={c.title} />
              <br />
              <span className="font-serif font-normal italic text-[#8fb4ff]">
                <RevealWords text={c.accent} delay={0.2} />
              </span>
            </h2>
            <FadeUp delay={0.3}>
              <p className="mt-6 max-w-xl text-lg text-white/70">{c.intro}</p>
            </FadeUp>
          </div>

          <motion.div
            initial={{ rotate: -200, scale: 0.4, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASE_OUT }}
            className="relative shrink-0"
          >
            <div className="absolute inset-0 rounded-full bg-[#8fb4ff]/30 blur-3xl" />
            <img src="/logos/gazi-logo.png" alt="Gazi Üniversitesi" className="relative h-36 w-36 sm:h-48 sm:w-48" />
          </motion.div>
        </div>

        <div className="mt-24 space-y-32">
          {c.systems.map((sys, i) => {
            const s = { ...SYSTEM_META[i], ...sys }
            const reversed = i % 2 === 1
            return (
              <div key={s.url} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={c.open}
                  initial={{ opacity: 0, x: reversed ? 120 : -120, rotate: reversed ? 4 : -4 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: 1.3, ease: EASE_OUT }}
                  className={`group block lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}
                >
                  <BrowserFrame src={s.shot} url={s.url} alt={`${s.name} ${c.shot}`} className="transition-transform duration-700 group-hover:scale-[1.02]" />
                </motion.a>

                <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
                  <FadeUp>
                    <p className="font-mono text-xs text-[#8fb4ff]">0{i + 1} / 02</p>
                    <h3 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{s.name}</h3>
                    <p className="mt-5 text-white/70">{s.description}</p>
                    <ul className="mt-6 space-y-3">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-white/85">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8fb4ff]/20 text-[#8fb4ff]">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-8 inline-flex items-center gap-2 border-b border-white/30 pb-1 text-sm font-medium transition-colors hover:border-[#8fb4ff] hover:text-[#8fb4ff]"
                    >
                      {c.go}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </FadeUp>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
