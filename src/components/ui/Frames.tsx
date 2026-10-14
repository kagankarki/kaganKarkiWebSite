import type { ReactNode } from 'react'

export function BrowserFrame({
  src,
  url,
  alt,
  className = '',
  children,
}: {
  src?: string
  url: string
  alt?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1f] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-2 py-0.5 text-center font-mono text-[10px] text-white/50">
          {url}
        </span>
      </div>
      {src ? (
        <img src={src} alt={alt ?? url} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
      ) : (
        children
      )}
    </div>
  )
}

export function PhoneFrame({
  src,
  alt = '',
  className = '',
  children,
}: {
  src?: string
  alt?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2.2rem] border-[6px] border-[#222] bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      {src ? <img src={src} alt={alt} loading="lazy" className="block h-full w-full object-cover object-top" /> : children}
    </div>
  )
}

/** Explorience's hexagon mark, redrawn so it stays crisp on dark backgrounds. */
export function ExplorienceMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 2.5 20.2 7.2v9.6L12 21.5 3.8 16.8V7.2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
