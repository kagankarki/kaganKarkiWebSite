import { useEffect, useState } from 'react'
import { useTypewriter } from '../../hooks/useTypewriter'
import MainframeNav from './MainframeNav'
import ScrubVideo from './ScrubVideo'

const TYPED_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?'

const EMAIL = 'hello@mainframe.co'

const ACTIONS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
]

const PILL_BASE =
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] transition-colors duration-200'

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="7.5"
        height="7.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect
        x="4"
        y="4"
        width="7.5"
        height="7.5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  )
}

export default function MainframeHero() {
  const { displayed, done } = useTypewriter(TYPED_TEXT)
  const [pillsVisible, setPillsVisible] = useState(false)

  // Independent of the typewriter — the pills land while the line is still typing.
  useEffect(() => {
    const timeout = window.setTimeout(() => setPillsVisible(true), 400)
    return () => window.clearTimeout(timeout)
  }, [])

  const copyEmail = () => {
    void navigator.clipboard?.writeText(EMAIL)
  }

  return (
    <section className="mainframe relative h-screen overflow-hidden bg-black">
      <ScrubVideo />
      <MainframeNav />

      <div className="relative z-[1] flex h-full flex-col justify-end px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
        <div className="relative z-10 max-w-xl">
          <div
            className="pointer-events-none mb-5 select-none sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              color: '#fff',
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet A.R.I.A,
            <br />
            Mainframe&#39;s Adaptive Response Interface Agent
          </div>

          <p
            className="mb-5 text-white sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: '54px',
            }}
          >
            {displayed}
            {!done && (
              <span
                className="ml-[2px] inline-block h-[1.1em] w-[2px] bg-white align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            )}
          </p>

          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {ACTIONS.map((action) => (
              <button
                key={action}
                type="button"
                className={`${PILL_BASE} border border-black/10 bg-white text-black hover:bg-black hover:text-white`}
              >
                {action}
              </button>
            ))}

            <button
              type="button"
              onClick={copyEmail}
              className={`${PILL_BASE} gap-2 border border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}
            >
              <span>
                Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
              </span>
              <CopyIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
