import { useEffect, useRef } from 'react'
import { useInViewport } from '../../hooks/useInViewport'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4'

const SENSITIVITY = 0.8

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/**
 * Full-bleed background video that never plays on its own — horizontal mouse
 * movement scrubs it forward and backward instead.
 */
export default function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const inViewport = useInViewport(videoRef, '100px')

  useEffect(() => {
    const video = videoRef.current
    if (!video || !inViewport) return

    let prevX: number | null = null
    let pendingDelta = 0
    let frame = 0
    let targetTime = 0
    let seeking = false

    const seek = () => {
      if (seeking) return
      if (Math.abs(video.currentTime - targetTime) < 0.001) return
      seeking = true
      video.currentTime = targetTime
    }

    // Seeks are queued rather than fired per mousemove, so a fast drag never
    // floods the decoder with requests it has to drop.
    const handleSeeked = () => {
      seeking = false
      if (Math.abs(video.currentTime - targetTime) > 0.001) seek()
    }

    // A mouse reports at up to 1000Hz. Deltas sum linearly, so batching them
    // into one seek per animation frame is identical maths at a fraction of
    // the work.
    const flush = () => {
      frame = 0
      const duration = video.duration
      const delta = pendingDelta
      pendingDelta = 0
      if (!duration || Number.isNaN(duration) || delta === 0) return

      targetTime = clamp(
        targetTime + (delta / window.innerWidth) * SENSITIVITY * duration,
        0,
        duration,
      )
      seek()
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (prevX === null) {
        prevX = event.clientX
        return
      }

      pendingDelta += event.clientX - prevX
      prevX = event.clientX

      if (frame === 0) frame = requestAnimationFrame(flush)
    }

    video.addEventListener('seeked', handleSeeked)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      video.removeEventListener('seeked', handleSeeked)
      window.removeEventListener('mousemove', handleMouseMove)
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [inViewport])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
    />
  )
}
