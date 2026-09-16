import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Globe, Mail } from 'lucide-react'

const EMAIL = 'hello@prisma-studio.com'

const HUBS = [
  { city: 'Paris', timezone: 'CET (UTC+1)', lead: 'Film & Creative Direction' },
  { city: 'Berlin', timezone: 'CET (UTC+1)', lead: 'Post-Production & VFX' },
  { city: 'Tokyo', timezone: 'JST (UTC+9)', lead: 'Sound & Spatial Lab' },
  { city: 'Istanbul', timezone: 'TRT (UTC+3)', lead: 'Production & Optics' },
]

export default function StudioContact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer id="contact" className="relative w-full bg-black py-28 text-[#E1E0CC] sm:py-36 md:py-44">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 md:px-14">
        {/* Main CTA Block */}
        <div className="rounded-3xl border border-white/10 bg-neutral-950/80 p-8 sm:p-14 md:p-20">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-primary/80">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Initiate Collaboration</span>
          </div>

          <h2 className="mt-6 font-serif text-4xl font-light tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Have a bold story to tell? <br />
            <span className="italic font-normal text-primary">Let&apos;s build it together.</span>
          </h2>

          {/* Action Row */}
          <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="EMAIL"
              className="group flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-white sm:text-base"
            >
              <Mail className="h-4 w-4" />
              <span>Send Direct Inquiry</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={copyEmail}
              data-cursor="COPY"
              className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 sm:text-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-neutral-400" />
                  <span>{EMAIL}</span>
                </>
              )}
            </button>
          </div>

          {/* Global Studio Hubs */}
          <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-12 md:grid-cols-4">
            {HUBS.map((hub) => (
              <div key={hub.city} className="space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-white">
                  <Globe className="h-3 w-3 text-primary/70" />
                  <span>{hub.city}</span>
                </div>
                <p className="text-[11px] text-neutral-500">{hub.timezone}</p>
                <p className="text-xs text-neutral-400">{hub.lead}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 text-xs font-mono text-neutral-500 sm:flex-row">
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="font-sans font-medium text-white">PRISMA ATELIER</span>
            <span>© {new Date().getFullYear()} — All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Instagram
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Vimeo Pro
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Behance
            </a>
            <a href="#" className="transition-colors hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
