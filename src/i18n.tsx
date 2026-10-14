import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'tr' | 'en'

const META: Record<Lang, { title: string; description: string }> = {
  tr: {
    title: 'Kağan Karkı — Yazılım Mühendisi & Girişimci',
    description:
      'Kağan Karkı: TED Üniversitesi Yazılım Mühendisliği öğrencisi, Explorience ortağı ve NeredeMaç kurucusu.',
  },
  en: {
    title: 'Kağan Karkı — Software Engineer & Entrepreneur',
    description:
      'Kağan Karkı: Software Engineering student at TED University, partner at Explorience and founder of NeredeMaç.',
  },
}

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'tr', setLang: () => {} })

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'tr' || saved === 'en') return saved
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('tr') ? 'tr' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = META[lang].title
    document.querySelector('meta[name="description"]')?.setAttribute('content', META[lang].description)
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {
      /* storage unavailable */
    }
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

/** Picks the copy block for the active language. */
export function useCopy<T>(copy: Record<Lang, T>): T {
  return copy[useContext(LangContext).lang]
}

export const PROFILE = {
  email: 'kagankarki03@gmail.com',
  github: 'https://github.com/kagankarki',
  linkedin: 'https://www.linkedin.com/in/kagan-karki/',
  instagram: 'https://www.instagram.com/kagankarki/',
}
