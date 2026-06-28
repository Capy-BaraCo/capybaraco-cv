# Capybaraco Brand Reference

Source of truth for these values is `src/styles/tokens.css` in the flagship repo
(`capybaraco-cv`). When that file changes, update this reference.

## Palette

| Token | Hex | Role |
|-------|-----|------|
| `--color-bg` | `#000000` | Background, badge label background |
| `--color-fg` | `#f5f5f5` | Primary text (off-white, never pure white) |
| `--color-accent` | `#22c55e` | Brand green — the signature colour |
| `--color-accent-dark` | `#16a34a` | Hover/active, deeper green |
| `--color-accent-light` | `#86efac` | Highlights, soft glow |
| `--color-border` | `#2a2a2a` | Hairline borders, dividers |
| `--color-secondary` | `#888888` | Muted/secondary text |

**Rule of thumb:** black canvas, off-white text, green for anything that should
draw the eye. Green is a spotlight, not a flood — restraint over neon overload.

## Badges

Use shields.io with the brand colours so the badge row reads black + green:

```
https://img.shields.io/badge/<label>-<message>-22c55e?style=flat-square&labelColor=000000
```

- `color=22c55e` (accent green) for the message half
- `labelColor=000000` (black) for the label half
- `style=flat-square` to match the clean, squared terminal aesthetic
- For "live/passing" states use accent green; for neutral facts use the same
  green message on black — keep the row monochromatic green-on-black.

## Typography

| Token | Stack |
|-------|-------|
| `--font-mono` | `'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace` |
| `--font-sans` | system stack (`-apple-system, Segoe UI, Roboto, …`) |

Monospace is the brand voice. In docs this means:
- Every command lives in a fenced code block.
- Commands are shown with a `$ ` prompt to evoke the terminal.
- Inline identifiers (filenames, flags, tokens) use `backticks`.

## Aesthetic non-negotiables (carried from the product)

1. Premium and minimalist first — clean, not novelty-hacker kitsch.
2. Terminal-functional vibe: real commands, real prompts, no fake screenshots.
3. Green glow only where useful; black/off-white/green, restrained type.
