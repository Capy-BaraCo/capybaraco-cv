import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export interface UseTypewriterOptions {
  /** Milliseconds between revealing each character. */
  speed?: number
}

export interface UseTypewriterResult {
  /** The portion of `text` revealed so far. */
  displayed: string
  /** True once the full text has been revealed. */
  done: boolean
}

const DEFAULT_SPEED = 18

/**
 * Progressively reveals `text` one character at a time using a timeout loop.
 *
 * - Honours `prefers-reduced-motion`: when reduced motion is requested the
 *   full text is returned immediately with `done: true` and no animation runs.
 * - Resets and re-types whenever `text` changes, cleaning up the pending
 *   timer on change and on unmount.
 */
export function useTypewriter(
  text: string,
  options: UseTypewriterOptions = {}
): UseTypewriterResult {
  const { speed = DEFAULT_SPEED } = options
  const prefersReducedMotion = usePrefersReducedMotion()

  const [count, setCount] = useState(prefersReducedMotion ? text.length : 0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Reduced motion: show everything at once, no timers.
    if (prefersReducedMotion) {
      setCount(text.length)
      return
    }

    // Restart the reveal from the beginning whenever the text changes.
    setCount(0)
    let current = 0

    const tick = () => {
      current += 1
      setCount(current)
      if (current < text.length) {
        timerRef.current = setTimeout(tick, speed)
      }
    }

    if (text.length > 0) {
      timerRef.current = setTimeout(tick, speed)
    }

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [text, speed, prefersReducedMotion])

  return {
    displayed: text.slice(0, count),
    done: count >= text.length,
  }
}
