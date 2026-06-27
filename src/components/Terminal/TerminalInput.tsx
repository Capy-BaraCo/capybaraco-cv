import { useRef, useState, useEffect } from 'react'
import commands from '../../terminal/commands'

interface TerminalInputProps {
  onCommand: (input: string) => void
  disabled: boolean
  getPreviousCommand: () => string | null
  getNextCommand: () => string | null
}

export default function TerminalInput({
  onCommand,
  disabled,
  getPreviousCommand,
  getNextCommand,
}: TerminalInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onCommand(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = getPreviousCommand()
      if (prev) setInput(prev)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = getNextCommand()
      setInput(next || '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple autocomplete for commands
      const currentCmd = input.split(' ')[0]
      const matches = commands.filter((c) =>
        c.name.startsWith(currentCmd.toLowerCase())
      )
      if (matches.length === 1) {
        setInput(matches[0].name + ' ')
      }
    }
  }

  return (
    <form className="terminal-input-form" onSubmit={handleSubmit}>
      <div className="input-line">
        <span className="prompt">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="terminal-input"
          placeholder="Type command or press Tab for autocomplete..."
          autoComplete="off"
          spellCheck="false"
          aria-label="Terminal input"
        />
        <span className="caret" aria-hidden="true" />
      </div>
    </form>
  )
}
