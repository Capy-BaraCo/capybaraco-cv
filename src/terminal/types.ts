export type OutputType = 'output' | 'error' | 'input' | 'info'

export interface OutputLine {
  id: string
  type: OutputType
  text: string
  timestamp: number
}

/**
 * Side-effects a command can request the React layer to perform.
 * Command handlers stay pure: they describe the effect, the Terminal
 * component carries it out (e.g. triggering a download or opening a tab).
 */
export type CommandAction =
  | { type: 'clear' }
  | { type: 'download'; url: string; filename: string }
  | { type: 'openLink'; url: string }

/**
 * Result returned by an individual command handler. `output` may be a
 * single line or several lines for ergonomics; it is normalised to
 * `string[]` at the runCommand boundary (see NormalizedCommandResult).
 */
export interface CommandResult {
  success: boolean
  output: string | string[]
  error?: string
  action?: CommandAction
}

/**
 * Result of running a command through `runCommand`. The `output` field is
 * always normalised to `string[]`, removing the need for callers to branch
 * on string-vs-array at runtime. `handled` is false for no-op input (e.g.
 * blank lines) so the caller can skip emitting an output line.
 */
export interface NormalizedCommandResult {
  handled: boolean
  success: boolean
  output: string[]
  error?: string
  action?: CommandAction
}

export type CommandHandler = (args: string[]) => CommandResult | Promise<CommandResult>

export interface Command {
  name: string
  description: string
  usage: string
  handler: CommandHandler
  aliases?: string[]
}
