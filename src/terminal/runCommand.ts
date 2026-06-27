import commands from './commands'
import { CommandResult } from './types'

export function parseInput(input: string): { command: string; args: string[] } {
  const trimmed = input.trim()
  const parts = trimmed.split(/\s+/)
  return {
    command: parts[0]?.toLowerCase() || '',
    args: parts.slice(1),
  }
}

export async function runCommand(input: string): Promise<CommandResult> {
  if (!input.trim()) {
    return { success: false, output: '', error: '' }
  }

  const { command, args } = parseInput(input)

  // Find command (by name or alias)
  const cmd = commands.find(
    (c) => c.name === command || c.aliases?.includes(command)
  )

  if (!cmd) {
    return {
      success: false,
      output: '',
      error: `command not found: ${command}. Try 'help' for available commands.`,
    }
  }

  try {
    const result = await cmd.handler(args)
    return result
  } catch (err) {
    return {
      success: false,
      output: '',
      error: `Error executing command: ${err instanceof Error ? err.message : 'Unknown error'}`,
    }
  }
}
