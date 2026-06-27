import { ReactNode } from 'react'
import { useInViewReveal } from '../../hooks/useInViewReveal'
import './reveal.css'

interface RevealOnScrollProps {
  children: ReactNode
  /** Optional id forwarded to the wrapper element (e.g. scroll anchor). */
  id?: string
  /** Optional extra class names for the wrapper. */
  className?: string
}

/**
 * Wraps content in a div that fades + slides up the first time it scrolls into
 * view. Fails open to visible: under reduced motion or without
 * IntersectionObserver support, content is shown immediately (handled by the
 * hook), and the CSS reveal class applies no transform/opacity transition in
 * that case.
 */
export default function RevealOnScroll({
  children,
  id,
  className,
}: RevealOnScrollProps) {
  const { ref, revealed } = useInViewReveal<HTMLDivElement>()

  const classes = ['reveal', revealed ? 'reveal-visible' : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={ref} id={id} className={classes}>
      {children}
    </div>
  )
}
