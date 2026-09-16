import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [cursorText, setCursorText] = useState('')

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for the trailing ring
  const ringX = useSpring(mouseX, { stiffness: 450, damping: 28, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 450, damping: 28, mass: 0.5 })

  useEffect(() => {
    // Only enable on pointer-capable devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    // Listen to mouseover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest('a, button, input, textarea, [role="button"], .clickable, canvas')
      if (interactive) {
        setIsHovered(true)
        const customLabel = interactive.getAttribute('data-cursor')
        if (customLabel) {
          setCursorText(customLabel)
        } else if (interactive.tagName.toLowerCase() === 'canvas') {
          setCursorText('SCROLL')
        } else {
          setCursorText('')
        }
      } else {
        setIsHovered(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isVisible, mouseX, mouseY])

  if (!isVisible) return null

  return (
    <>
      {/* Precision center dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E1E0CC] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          width: isHovered ? (cursorText ? 0 : 6) : 4,
          height: isHovered ? (cursorText ? 0 : 6) : 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing aesthetic ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E1E0CC]/50 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: cursorText ? 64 : isHovered ? 48 : isClicked ? 24 : 32,
          height: cursorText ? 64 : isHovered ? 48 : isClicked ? 24 : 32,
          backgroundColor: cursorText
            ? 'rgba(225, 224, 204, 0.15)'
            : isHovered
            ? 'rgba(225, 224, 204, 0.1)'
            : 'rgba(225, 224, 204, 0)',
          borderColor: isHovered ? '#E1E0CC' : 'rgba(225, 224, 204, 0.35)',
          scale: isClicked ? 0.9 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
          height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[9px] font-bold tracking-widest text-[#E1E0CC]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
