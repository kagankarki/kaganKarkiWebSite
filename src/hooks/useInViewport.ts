import { useEffect, useState, type RefObject } from 'react'

/** True while `ref` is within `rootMargin` of the viewport. */
export function useInViewport<T extends Element>(ref: RefObject<T>, rootMargin = '200px') {
  const [inViewport, setInViewport] = useState(true)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { rootMargin },
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inViewport
}

/**
 * Keeps a video decoding only while it is on screen. Three videos left running
 * at once cost several megapixels of decode per frame for nothing.
 */
export function usePauseWhenOffscreen(ref: RefObject<HTMLVideoElement>) {
  const inViewport = useInViewport(ref)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    if (inViewport) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [ref, inViewport])

  return inViewport
}
