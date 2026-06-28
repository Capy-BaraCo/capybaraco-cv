interface Chip {
  label: string
  command: string
}

const CHIPS: Chip[] = [
  { label: 'help', command: 'help' },
  { label: 'cv --view html', command: 'cv --view html' },
  { label: 'cv --download pdf', command: 'cv --download pdf' },
  { label: 'contact --show', command: 'contact --show' },
  { label: 'whoami', command: 'whoami' },
]

interface TerminalChipsProps {
  onCommand: (command: string) => void
  disabled: boolean
}

export default function TerminalChips({ onCommand, disabled }: TerminalChipsProps) {
  return (
    <div className="terminal-chips" role="group" aria-label="Quick commands">
      {CHIPS.map((chip) => (
        <button
          key={chip.command}
          className="chip"
          onClick={() => onCommand(chip.command)}
          disabled={disabled}
          type="button"
        >
          {chip.label}
        </button>
      ))}
    </div>
  )
}
