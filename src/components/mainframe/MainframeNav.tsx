import { Fragment, useState } from 'react'

const NAV_LINKS = ['Labs', 'Studio', 'Openings', 'Shop']

export default function MainframeNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <div className="flex items-center gap-3">
          <span
            className="text-[21px] tracking-tight text-white sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe&#174;
          </span>
          <span
            className="select-none text-[25px] text-white sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            &#10035;&#65038;
          </span>
        </div>

        <nav className="hidden items-center text-[23px] text-white md:flex">
          {NAV_LINKS.map((link, i) => (
            <Fragment key={link}>
              <a href="#" className="transition-opacity hover:opacity-60">
                {link}
              </a>
              {/* whitespace-pre: flex items collapse a trailing space on their own */}
              {i < NAV_LINKS.length - 1 ? <span className="whitespace-pre">, </span> : null}
            </Fragment>
          ))}
        </nav>

        <a
          href="#"
          className="hidden text-[23px] text-white underline underline-offset-2 transition-opacity hover:opacity-60 md:inline"
        >
          Get in touch
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span
            className="h-[2px] w-6 bg-white transition-transform duration-300"
            style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }}
          />
          <span
            className="h-[2px] w-6 bg-white transition-opacity duration-300"
            style={{ opacity: open ? 0 : 1 }}
          />
          <span
            className="h-[2px] w-6 bg-white transition-transform duration-300"
            style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </header>

      <div
        className="absolute inset-0 z-[9] flex flex-col justify-center gap-8 bg-black/90 px-8 backdrop-blur-md transition-opacity duration-300 md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          // Without this the backdrop-filter stays live behind an invisible
          // layer, blurring the whole hero on every frame while closed.
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            onClick={() => setOpen(false)}
            className="text-[32px] font-medium text-white"
          >
            {link}
          </a>
        ))}
        <a
          href="#"
          onClick={() => setOpen(false)}
          className="text-[32px] font-medium text-white underline underline-offset-2"
        >
          Get in touch
        </a>
      </div>
    </>
  )
}
