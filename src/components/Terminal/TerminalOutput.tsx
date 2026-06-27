import { forwardRef } from 'react'
import { OutputLine } from '../../terminal/types'

interface TerminalOutputProps {
  output: OutputLine[]
  prefersReducedMotion: boolean
}

const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(
  ({ output, prefersReducedMotion }, ref) => {
    return (
      <div
        ref={ref}
        className="terminal-output"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {output.map((line) => (
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
            {line.type === 'error' && <span className="error-prefix">✗ </span>}
            {line.type === 'info' && <span className="info-prefix">→ </span>}
            <span className={`text text-${line.type}`}>{line.text}</span>
          </div>
        ))}
      </div>
    )
  }
)

TerminalOutput.displayName = 'TerminalOutput'

export default TerminalOutput
