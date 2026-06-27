import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './matrix.css'

// Glyphs: katakana + a few digits/symbols, the classic rain alphabet.
const GLYPHS =
  'アカサタナハマヤラワabcdefghijklmnopqrstuvwxyz0123456789<>/\\|=+*'

// "Subtle" tuning. Sparse, slow, very low alpha so this reads as ambient
// texture behind the content rather than a hacker novelty.
const FONT_SIZE = 16 // px (CSS units) per glyph cell
const COLUMN_SPACING = 2.2 // multiplier on FONT_SIZE -> wide gaps, sparse columns
const TRAIL_FADE = 0.06 // per-frame black overlay alpha -> long, soft trails
const GLYPH_ALPHA = 0.28 // max opacity of a drawn glyph (kept faint)
const FRAME_INTERVAL = 90 // ms between glyph advances -> calm, slow rain
const RESET_CHANCE = 0.975 // higher -> drops reset less often (sparser streams)
const STATIC_ALPHA = 0.05 // reduced-motion: single faint static field

function randomGlyph(): string {
  return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length))
}

function readAccentRgb(canvas: HTMLCanvasElement): string {
  const value = getComputedStyle(canvas)
    .getPropertyValue('--matrix-color')
    .trim()
  return value || '34, 197, 94'
}

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rgb = readAccentRgb(canvas)
    const columnStep = FONT_SIZE * COLUMN_SPACING

    let width = 0
    let height = 0
    let columns = 0
    let drops: number[] = []

    const setup = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      // Reset transform before scaling so repeated resizes don't compound.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${FONT_SIZE}px monospace`
      ctx.textBaseline = 'top'

      columns = Math.ceil(width / columnStep)
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * height) / FONT_SIZE)
      )
    }

    // --- Reduced motion: paint one faint static field and stop. ----------
    if (prefersReducedMotion) {
      const paintStatic = () => {
        setup()
        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = `rgba(${rgb}, ${STATIC_ALPHA})`
        for (let i = 0; i < columns; i++) {
          const x = i * columnStep
          // Sparse static glyphs scattered down each column.
          for (let j = 0; j < height / FONT_SIZE; j += 4) {
            if (Math.random() > 0.85) {
              ctx.fillText(randomGlyph(), x, j * FONT_SIZE)
            }
          }
        }
      }

      paintStatic()
      window.addEventListener('resize', paintStatic)
      return () => window.removeEventListener('resize', paintStatic)
    }

    // --- Animated rain ---------------------------------------------------
    setup()

    let rafId = 0
    let lastFrame = 0
    let onScreen = true
    let tabVisible = !document.hidden

    const draw = (timestamp: number) => {
      rafId = requestAnimationFrame(draw)
      if (timestamp - lastFrame < FRAME_INTERVAL) return
      lastFrame = timestamp

      // Translucent black wash fades the previous frame into soft trails.
      ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE})`
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = `rgba(${rgb}, ${GLYPH_ALPHA})`
      for (let i = 0; i < columns; i++) {
        const x = i * columnStep
        const y = drops[i] * FONT_SIZE
        ctx.fillText(randomGlyph(), x, y)

        if (y > height && Math.random() > RESET_CHANCE) {
          drops[i] = 0
        } else {
          drops[i]++
        }
      }
    }

    const isRunning = () => rafId !== 0

    const start = () => {
      if (isRunning() || !onScreen || !tabVisible) return
      lastFrame = 0
      rafId = requestAnimationFrame(draw)
    }

    const stop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    const handleResize = () => {
      setup()
      ctx.clearRect(0, 0, width, height)
    }

    const handleVisibility = () => {
      tabVisible = !document.hidden
      if (tabVisible) start()
      else stop()
    }

    // Pause when the canvas is scrolled fully out of view.
    let observer: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            onScreen = entry.isIntersecting
            if (onScreen) start()
            else stop()
          }
        },
        { threshold: 0 }
      )
      observer.observe(canvas)
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)
    start()

    return () => {
      stop()
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (observer) observer.disconnect()
    }
  }, [prefersReducedMotion])

  return <canvas ref={canvasRef} className="matrix-bg" aria-hidden="true" />
}
