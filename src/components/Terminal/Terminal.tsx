import { useEffect, useRef, useState } from 'react'
import { OutputLine } from '../../terminal/types'
import { runCommand } from '../../terminal/runCommand'
import { useCommandHistory } from '../../hooks/useCommandHistory'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import TerminalOutput from './TerminalOutput'
import TerminalInput from './TerminalInput'
import TerminalChips from './TerminalChips'
import './terminal.css'

export default function Terminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    {
      id: '0',
      type: 'info',
      text: 'Welcome to your terminal CV. Type "help" for available commands.',
      timestamp: Date.now(),
    },
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const { addToHistory, getPreviousCommand, getNextCommand } =
    useCommandHistory()
  const outputRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const addOutput = (
    text: string | string[],
    type: OutputLine['type'] = 'output'
  ) => {
    const lines = Array.isArray(text) ? text : [text]
    setOutput((prev) => [
      ...prev,
      ...lines.map((line, i) => ({
        id: `${Date.now()}-${i}`,
        type,
        text: line,
        timestamp: Date.now(),
      })),
    ])
  }

  const handleCommand = async (input: string) => {
    if (!input.trim()) return

    // Add user input to output
    addOutput(input, 'input')
    addToHistory(input)

    setIsProcessing(true)
    const result = await runCommand(input)

    if (result.output === '___CLEAR___') {
      setOutput([])
    } else {
      if (result.error) {
        addOutput(result.error, 'error')
      } else {
        addOutput(result.output, 'output')
      }
    }

    setIsProcessing(false)
  }

  // Scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  return (
    <div className="terminal" role="region" aria-label="Interactive terminal">
      <div className="terminal-header">
        <span className="terminal-title">terminal</span>
        <span className="terminal-user">user@capybaraco</span>
      </div>

      <TerminalOutput
        ref={outputRef}
        output={output}
        prefersReducedMotion={prefersReducedMotion}
      />

      <TerminalChips onCommand={handleCommand} disabled={isProcessing} />

      <TerminalInput
        onCommand={handleCommand}
        disabled={isProcessing}
        getPreviousCommand={getPreviousCommand}
        getNextCommand={getNextCommand}
      />
    </div>
  )
}
