import { forwardRef, useEffect, useRef } from 'react'
import { OutputLine } from '../../terminal/types'
import TypewriterLine from './TypewriterLine'

interface TerminalOutputProps {
  output: OutputLine[]
  prefersReducedMotion: boolean
}

// Only command results and info lines type out. The user's echoed input and
// error lines render instantly — typing those would feel wrong.
const TYPEABLE_TYPES: ReadonlySet<OutputLine['type']> = new Set([
  'output',
  'info',
])

const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(
  ({ output, prefersReducedMotion }, ref) => {
    // Ids committed in a previous render. A line whose id is NOT here is "new"
    // and eligible to type. Reading is pure (no mutation during render, so
    // StrictMode's double render is stable); the set is updated in an effect
    // after commit. Once a line is recorded, it never types again — so
    // unrelated re-renders never re-type old lines.
    const seenIds = useRef<Set<string>>(new Set())

    const typingIds = new Set<string>()
    if (!prefersReducedMotion) {
      for (const line of output) {
        if (!seenIds.current.has(line.id) && TYPEABLE_TYPES.has(line.type)) {
          typingIds.add(line.id)
        }
      }
    }

    useEffect(() => {
      // Record exactly the currently-present ids. Resetting (rather than
      // unioning) keeps the set bounded so it shrinks when output is cleared.
      seenIds.current = new Set(output.map((line) => line.id))
    }, [output])

    return (
      <div
        ref={ref}
        className="terminal-output"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {output.map((line) => {
          const isTyping = typingIds.has(line.id)
          return (
            <div
              key={line.id}
              className={`output-line output-${line.type}`}
              style={{
                animation: prefersReducedMotion
                  ? 'none'
                  : 'fadeInTerminal 0.2s ease-in-out',
              }}
            >
              {line.type === 'input' && <span className="prompt">$ </span>}
              {line.type === 'error' && (
                <span className="error-prefix">✗ </span>
              )}
              {line.type === 'info' && <span className="info-prefix">→ </span>}
              <span className={`text text-${line.type}`}>
                {isTyping ? (
                  <>
                    {/* Full text for assistive tech via the live region; the
                        typewriter renders the visible, animated copy. */}
                    <span className="sr-only">{line.text}</span>
                    <TypewriterLine text={line.text} />
                  </>
                ) : (
                  line.text
                )}
              </span>
            </div>
          )
        })}
      </div>
    )
  }
)

TerminalOutput.displayName = 'TerminalOutput'

export default TerminalOutput
