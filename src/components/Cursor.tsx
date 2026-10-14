import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Dot + trailing ring. Elements with data-cursor="..." grow it into a labelled bubble.
 * Inside data-cursor-theme="light" sections it turns dark so it stays visible.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hovering, setHovering] = useState(false)
  const [light, setLight] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const inspect = (target: Element | null) => {
      const tagged = target?.closest<HTMLElement>('[data-cursor]')
      setLabel(tagged?.dataset.cursor || null)
      setHovering(!!target?.closest('a, button'))
      // The nearest themed ancestor wins, so dark cards inside light sections stay light-on-dark.
      setLight(target?.closest('[data-cursor-theme]')?.getAttribute('data-cursor-theme') === 'light')
    }
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      inspect(e.target as Element | null)
    }
    // The page can scroll under a resting pointer, so re-check what is beneath it.
    const scroll = () => inspect(document.elementFromPoint(x.get(), y.get()))
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', scroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', scroll)
    }
  }, [x, y])

  if (!enabled) return null

  const size = label ? 88 : hovering ? 48 : 30
  const fill = light ? '10,10,12' : '212,255,63'
  const ring = light ? 'rgba(10,10,12,0.55)' : 'rgba(243,239,230,0.45)'

  return (
    <>
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${light ? 'bg-ink' : 'bg-accent'}`}
        style={{ x, y }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? `rgba(${fill},1)` : `rgba(${fill},0)`,
          borderColor: label ? `rgba(${fill},1)` : ring,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className={`font-mono text-[10px] font-medium uppercase tracking-wider ${light ? 'text-accent' : 'text-ink'}`}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
