import { useTypewriter } from '../../hooks/useTypewriter'

interface TypewriterLineProps {
  text: string
}

/**
 * Renders a single string that types itself out character-by-character.
 * Purely presentational — used only for the newest output line(s). Under
 * reduced motion the hook returns the full text immediately, so this renders
 * exactly like a static line. The visible text is `aria-hidden`; the parent
 * line carries the full text to assistive tech via the live region, so screen
 * readers announce the whole line, not each character.
 */
export default function TypewriterLine({ text }: TypewriterLineProps) {
  const { displayed } = useTypewriter(text)
  return <span aria-hidden="true">{displayed}</span>
}
