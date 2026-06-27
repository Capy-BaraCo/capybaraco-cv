import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export interface UseInViewRevealOptions {
  /** Fraction of the element that must be visible to trigger the reveal. */
  threshold?: number
  /** Root margin passed to the IntersectionObserver. */
  rootMargin?: string
}

export interface UseInViewRevealResult<T extends Element> {
  /** Ref to attach to the element that should reveal on scroll. */
  ref: React.RefObject<T>
  /** True once the element has entered the viewport (stays true thereafter). */
  revealed: boolean
}

/**
 * Reveal-on-scroll via IntersectionObserver. Returns a ref to attach plus a
 * `revealed` flag that latches true the first time the element enters view
 * (the observer is then disconnected — reveal once, stay revealed).
 *
 * Fails open to visible: when reduced motion is requested, or when
 * IntersectionObserver is unavailable, `revealed` starts true so content is
 * never left hidden.
 */
export function useInViewReveal<T extends Element = HTMLDivElement>(
  options: UseInViewRevealOptions = {}
): UseInViewRevealResult<T> {
  const { threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = options
  const prefersReducedMotion = usePrefersReducedMotion()
  const ref = useRef<T>(null)

  const supportsObserver =
    typeof window !== 'undefined' && 'IntersectionObserver' in window

  // Fail open: visible immediately under reduced motion or without IO support.
  const [revealed, setRevealed] = useState(
    prefersReducedMotion || !supportsObserver
  )

  useEffect(() => {
    if (prefersReducedMotion || !supportsObserver) {
      setRevealed(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [prefersReducedMotion, supportsObserver, threshold, rootMargin])

  return { ref, revealed }
}
