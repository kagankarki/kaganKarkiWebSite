import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Play } from 'lucide-react'
import WordsPullUp from './WordsPullUp'

// Eagerly load all extracted frame images in numerical order
const frameModules = import.meta.glob<string>(
  '../../assets/intro/*.jpg',
  { eager: true, import: 'default' }
)

const FRAME_URLS = Object.entries(frameModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url)

const NAV_ITEMS = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Selected Works', href: '#works' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Inquiries', href: '#contact' },
]

const CREAM = '#E1E0CC'
const CREAM_DIM = 'rgba(225, 224, 204, 0.75)'
const EASE = [0.16, 1, 0.3, 1] as const

interface HeroProps {
  onProgress?: (progress: number) => void
}

export default function Hero({ onProgress }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef<number>(0)
  const isDrawingRef = useRef<boolean>(false)
  const [activeFrameDisplay, setActiveFrameDisplay] = useState(1)

  // Track scroll through the pinned hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Smooth spring scroll interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    restDelta: 0.001,
  })

  // Fade out hero UI quickly as the camera begins zooming into the laptop screen
  const textOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 0.9, 0])
  const textY = useTransform(scrollYProgress, [0, 0.12, 0.22], [0, -10, -40])
  const textBlur = useTransform(scrollYProgress, [0, 0.12, 0.22], ['blur(0px)', 'blur(2px)', 'blur(8px)'])

  const topNavOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 0.8, 0])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0])

  // Pure white overlay at the very end when the screen fills the viewport
  const whiteTransitionOpacity = useTransform(scrollYProgress, [0.82, 0.97], [0, 1])

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const images = imagesRef.current
    if (!images.length) return

    const totalFrames = FRAME_URLS.length
    const targetIdx = Math.min(totalFrames - 1, Math.max(0, index))
    currentFrameRef.current = targetIdx

    // Find requested image or closest loaded frame
    let img = images[targetIdx]
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < totalFrames; offset++) {
        const prev = images[targetIdx - offset]
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev
          break
        }
        const next = images[targetIdx + offset]
        if (next && next.complete && next.naturalWidth > 0) {
          img = next
          break
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = canvas.getBoundingClientRect()
    const displayW = Math.round(rect.width * dpr)
    const displayH = Math.round(rect.height * dpr)

    if (canvas.width !== displayW || canvas.height !== displayH) {
      canvas.width = displayW
      canvas.height = displayH
    }

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth || img.width
    const ih = img.naturalHeight || img.height

    if (!iw || !ih) return

    // Object-fit: cover math
    const scale = Math.max(cw / iw, ch / ih)
    const nw = iw * scale
    const nh = ih * scale
    const nx = (cw - nw) / 2
    const ny = (ch - nh) / 2

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, nx, ny, nw, nh)
  }

  // Preload frames into memory & report progress
  useEffect(() => {
    const images: HTMLImageElement[] = []
    let loaded = 0
    const total = FRAME_URLS.length

    FRAME_URLS.forEach((url, i) => {
      const img = new Image()
      img.src = url
      img.onload = () => {
        loaded++
        onProgress?.(Math.round((loaded / total) * 100))
        if (i === 0 || currentFrameRef.current === i) {
          renderFrame(currentFrameRef.current)
        }
      }
      img.onerror = () => {
        loaded++
        onProgress?.(Math.round((loaded / total) * 100))
      }
      images.push(img)
    })

    imagesRef.current = images

    if (images[0]?.complete && images[0].naturalWidth > 0) {
      renderFrame(0)
    }

    const handleResize = () => {
      renderFrame(currentFrameRef.current)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [onProgress])

  // Scrub frame on scroll
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const totalFrames = FRAME_URLS.length
    if (totalFrames === 0) return

    const frameIdx = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(latest * (totalFrames - 1)))
    )

    if (!isDrawingRef.current) {
      isDrawingRef.current = true
      requestAnimationFrame(() => {
        renderFrame(frameIdx)
        setActiveFrameDisplay(frameIdx + 1)
        isDrawingRef.current = false
      })
    }
  })

  return (
    <section ref={containerRef} className="relative h-[290vh] w-full bg-black">
      {/* Sticky full-screen viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Scroll-scrubbed canvas background filling 100% edge-to-edge */}
        <canvas
          ref={canvasRef}
          data-cursor="SCROLL"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Subtle cinematic gradient overlay (only active in first phase) */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"
        />

        {/* Pure White Transition Overlay — cleanly bridges the zoom into the next white section */}
        <motion.div
          style={{ opacity: whiteTransitionOpacity }}
          className="pointer-events-none absolute inset-0 z-10 bg-white"
        />

        {/* Header / Navbar (fades out as zoom starts) */}
        <motion.header
          style={{
            opacity: topNavOpacity,
            pointerEvents: topNavOpacity.get() < 0.05 ? 'none' : 'auto',
          }}
          className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10 md:px-14 md:py-7"
        >
          {/* Logo & Status Badge */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#"
              data-cursor="PRISMA"
              className="flex items-center gap-1 text-base font-medium tracking-tight text-[#E1E0CC] transition-opacity hover:opacity-80 sm:text-lg"
            >
              <span>PRISMA</span>
              <span className="text-primary">*</span>
            </a>

            <div className="hidden items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[10px] tracking-wider text-[#E1E0CC]/70 backdrop-blur-md lg:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span>COLLECTIVE ACTIVE</span>
            </div>
          </div>

          {/* Center Floating Glass Island */}
          <nav className="hidden rounded-full bg-black/60 px-6 py-2.5 shadow-2xl backdrop-blur-xl md:block">
            <ul className="flex items-center gap-8 lg:gap-10">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    data-cursor="VIEW"
                    className="text-xs font-medium tracking-wide transition-all duration-300 hover:text-[#E1E0CC]"
                    style={{ color: CREAM_DIM }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              data-cursor="CONTACT"
              className="group flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-[#E1E0CC] backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <span>Initiate Project</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.header>

        {/* Main Hero UI — gracefully disappears as zoom starts */}
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
            filter: textBlur,
            pointerEvents: textOpacity.get() < 0.05 ? 'none' : 'auto',
          }}
          className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-8 sm:px-10 md:px-14 md:pb-12 lg:pb-14"
        >
          <div className="grid grid-cols-12 items-end gap-x-8 gap-y-8">
            {/* Left Col: Giant Cinematic Title */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              <div className="mb-2 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.3em] text-primary/90 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Visual Arts Atelier & Production</span>
              </div>

              <h1
                className="relative text-[24vw] font-medium leading-[0.82] tracking-[-0.07em] sm:text-[22vw] md:text-[20vw] lg:text-[18vw] xl:text-[17vw]"
                style={{ color: CREAM }}
              >
                <WordsPullUp text="Prisma" showAsterisk />
              </h1>
            </div>

            {/* Right Col: Studio Manifesto, Tags & Buttons */}
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-5 xl:col-span-4 lg:items-start">
              {/* Studio Manifesto / Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                className="space-y-3"
              >
                <p
                  className="max-w-lg text-sm font-normal text-primary/80 sm:text-base md:text-[17px]"
                  style={{ lineHeight: 1.4 }}
                >
                  Prisma is an independent collective of directors, cinematographers, and visual
                  architects sculpting boundary-pushing films, immersive narratives, and refined
                  sensory worlds.
                </p>

                {/* Subtle Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] tracking-wider text-primary/80 backdrop-blur-sm sm:text-[11px]">
                    4K Master Grade
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] tracking-wider text-primary/80 backdrop-blur-sm sm:text-[11px]">
                    Direction & VFX
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] tracking-wider text-primary/80 backdrop-blur-sm sm:text-[11px]">
                    Global Atelier
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons Cluster */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                {/* Primary Button */}
                <a
                  href="#manifesto"
                  data-cursor="ENTER"
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-primary py-2 pl-7 pr-2 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:bg-[#F2F1E4] hover:shadow-primary/20 sm:py-2.5 sm:pl-8 sm:pr-2.5 sm:text-base"
                >
                  <span>Explore The Studio</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[#E1E0CC] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-45 sm:h-11 sm:w-11">
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </a>

                {/* Secondary Button */}
                <a
                  href="#works"
                  data-cursor="REEL"
                  className="group flex items-center gap-2.5 rounded-full bg-black/40 px-5 py-3 text-xs font-medium text-[#E1E0CC] backdrop-blur-md transition-all duration-300 hover:bg-white/15 sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  <Play className="h-3.5 w-3.5 fill-current text-primary transition-transform duration-300 group-hover:scale-110" />
                  <span>Showreel &apos;26</span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Live Frame Counter & Scroll Prompt */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="pointer-events-none absolute bottom-8 right-8 z-30 hidden items-center gap-4 rounded-full bg-black/60 px-4 py-2 text-xs text-[#E1E0CC]/80 backdrop-blur-xl md:flex"
        >
          <div className="flex items-center gap-2 border-r border-white/10 pr-3 font-mono text-[11px] text-primary/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span>FRAME {String(activeFrameDisplay).padStart(3, '0')} / 241</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#E1E0CC]/90">
            <span>Scroll to enter screen</span>
            <ChevronDown className="h-3.5 w-3.5 animate-bounce text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
