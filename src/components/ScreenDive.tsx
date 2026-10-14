import { useEffect, useRef, useState } from 'react'
import { useCopy } from '../i18n'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'

// The camera move into the laptop screen, played by scroll. Sources live in
// assets/intro (241 frames, 1940px); decoding all of them takes ~2 GB, which
// crashes iOS Safari, so phones get every 3rd frame as a 640x1068 centre crop
// (the only part a portrait screen shows, at full resolution) and desktops
// every 2nd frame at 1440px.
const FRAME_SETS = {
  mobile: { base: '/frames/m/', count: 81 },
  desktop: { base: '/frames/d/', count: 121 },
}

function pickFrames() {
  const small = typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
  const set = small ? FRAME_SETS.mobile : FRAME_SETS.desktop
  return Array.from({ length: set.count }, (_, i) => `${set.base}${String(i + 1).padStart(3, '0')}.webp`)
}

const RANGES = [
  [0.02, 0.1, 0.3, 0.4],
  [0.6, 0.68, 0.8, 0.86],
]
const COLORS = ['text-accent', 'text-coral']

const COPY = {
  tr: {
    lines: [
      { text: 'Her şey bir laptop', accent: 've bir fikirle başlıyor.' },
      { text: 'Hadi ekranın', accent: 'içine girelim.' },
    ],
    frame: 'KARE',
    label: 'Laptop ekranına giriş animasyonu',
  },
  en: {
    lines: [
      { text: 'It all starts with a laptop', accent: 'and an idea.' },
      { text: 'Let’s dive', accent: 'into the screen.' },
    ],
    frame: 'FRAME',
    label: 'Scroll animation diving into the laptop screen',
  },
}

function Line({
  line,
  index,
  progress,
}: {
  line: { text: string; accent: string }
  index: number
  progress: MotionValue<number>
}) {
  const range = RANGES[index]
  const opacity = useTransform(progress, range, [0, 1, 1, 0])
  const y = useTransform(progress, range, [40, 0, 0, -40])
  const filter = useTransform(progress, range, ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'])
  return (
    <motion.h2
      style={{ opacity, y, filter }}
      className="absolute inset-x-0 bottom-[14%] px-6 text-center font-display text-4xl font-bold leading-[1] tracking-tight text-cream sm:text-6xl lg:text-7xl"
    >
      {line.text}
      <br />
      <span className={`font-serif font-normal italic ${COLORS[index]}`}>{line.accent}</span>
    </motion.h2>
  )
}

export default function ScreenDive({ ready }: { ready: boolean }) {
  const c = useCopy(COPY)
  const ref = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const decodedRef = useRef<boolean[]>([])
  const currentRef = useRef(0)
  const [frame, setFrame] = useState(1)
  const [FRAMES] = useState(pickFrames)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 30, restDelta: 0.001 })
  const creamOpacity = useTransform(scrollYProgress, [0.84, 0.98], [0, 1])
  const vignette = useTransform(scrollYProgress, [0, 0.8], [0.7, 0.2])

  const draw = (index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: false })
    const images = imagesRef.current
    if (!canvas || !ctx || !images.length) return

    const target = Math.min(FRAMES.length - 1, Math.max(0, index))
    currentRef.current = target

    // Fall back to the nearest frame that has finished loading.
    let img: HTMLImageElement | undefined
    for (let o = 0; o < FRAMES.length && !img; o++) {
      for (const i of [target - o, target + o]) {
        const c = images[i]
        if (c && decodedRef.current[i]) {
          img = c
          break
        }
      }
    }
    if (!img) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const { width, height } = canvas.getBoundingClientRect()
    const w = Math.round(width * dpr)
    const h = Math.round(height * dpr)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
    const dw = img.naturalWidth * scale
    const dh = img.naturalHeight * scale
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
  }

  // Frames are fetched and decoded a few at a time, off the main thread, and
  // only after the hero has finished animating (or the visitor starts
  // scrolling). Creating all of them at once froze iOS Safari for seconds.
  useEffect(() => {
    if (!ready) return
    let cancelled = false
    let started = false
    const timers: number[] = []

    const start = () => {
      if (started || cancelled) return
      started = true
      window.removeEventListener('scroll', start)

      const images: HTMLImageElement[] = new Array(FRAMES.length)
      imagesRef.current = images
      decodedRef.current = new Array(FRAMES.length).fill(false)

      // Coarse pass first (every 4th frame) so scrubbing works early, then fill the gaps.
      const order = [
        ...FRAMES.map((_, i) => i).filter((i) => i % 4 === 0),
        ...FRAMES.map((_, i) => i).filter((i) => i % 4 !== 0),
      ]
      let next = 0
      const worker = async () => {
        while (!cancelled && next < order.length) {
          const i = order[next++]
          const img = new Image()
          img.decoding = 'async'
          img.src = FRAMES[i]
          images[i] = img
          try {
            await img.decode()
          } catch {
            continue
          }
          if (cancelled) return
          decodedRef.current[i] = true
          if (i === 0 || Math.abs(i - currentRef.current) <= 2) draw(currentRef.current)
        }
      }
      for (let k = 0; k < 4; k++) void worker()
    }

    window.addEventListener('scroll', start, { passive: true })
    timers.push(window.setTimeout(start, 2500))
    const onResize = () => draw(currentRef.current)
    window.addEventListener('resize', onResize)
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      window.removeEventListener('scroll', start)
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  useMotionValueEvent(smooth, 'change', (v) => {
    const index = Math.round(v * (FRAMES.length - 1))
    if (index === currentRef.current) return
    requestAnimationFrame(() => {
      draw(index)
      setFrame(index + 1)
    })
  })

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink" aria-label={c.label}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <motion.div
          style={{ opacity: vignette }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink"
        />

        {c.lines.map((l, i) => (
          <Line key={i} line={l} index={i} progress={scrollYProgress} />
        ))}

        <div className="absolute bottom-6 right-6 hidden items-center gap-2 rounded-full bg-black/50 px-4 py-2 font-mono text-[11px] text-cream/70 backdrop-blur-md md:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {c.frame} {String(frame).padStart(3, '0')} / {FRAMES.length}
        </div>

        <motion.div style={{ opacity: creamOpacity }} className="pointer-events-none absolute inset-0 bg-cream" />
      </div>
    </section>
  )
}
