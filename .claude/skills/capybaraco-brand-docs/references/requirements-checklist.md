# Capybaraco Docs — Requirements Checklist

The verification spec distilled from the brief. Every document the
`capybaraco-docs` agent produces is checked against this list before it is
considered done. Each requirement is binary (met / not met) with evidence.

## Brand — colour

- **R1 — Palette fidelity.** Any colour-bearing element (shields/badges, inline
  swatches, diagrams) uses the capybaraco palette only:
  - `--color-bg` `#000000` (black)
  - `--color-fg` `#f5f5f5` (off-white)
  - `--color-accent` `#22c55e` (green) · dark `#16a34a` · light `#86efac`
  - `--color-border` `#2a2a2a` · `--color-secondary` `#888888`
- **R2 — Badge styling.** Badges use `labelColor=000000` and accent
  `color=22c55e` so the row reads black + green, not shields.io defaults.

## Brand — typography

- **R3 — Monospace-first vibe.** Terminal/monospace aesthetic is carried through
  formatting: fenced code blocks for every command, command examples shown with
  a `$` prompt, no screenshots-of-text where a code block works.
- **R4 — Type stack named.** Where typography is referenced, it cites the stack
  (`Monaco`/`Menlo`/`Ubuntu Mono`/`Courier New` mono; system sans fallback).

## Structure — modelled on top-tier repos

- **R5 — Title + one-line tagline** at the very top.
- **R6 — Badge row** directly under the title (build/license/stack/etc.).
- **R7 — Hero visual** near the top (OG image / screenshot) with alt text.
- **R8 — Features / Highlights** section with scannable bullets.
- **R9 — Tech stack** section.
- **R10 — Getting started** with copy-pasteable, fenced install/run commands.
- **R11 — Usage** section documenting the actual commands/API.
- **R12 — Project structure** (tree or table).
- **R13 — Footer**: contributing pointer, license, and contact/links.
- **R14 — Working internal anchors / table of contents** for any README over
  ~4 sections.

## Tone

- **R15 — Professional throughout.** Correct grammar, accurate technical claims,
  no filler. A hiring manager could read it without wincing.
- **R16 — Gamer terms present but sparse.** Tasteful gaming vocabulary appears to
  keep the vibe, but at most roughly one flourish per major section — never
  forced, never stacked.
- **R17 — Clarity is never sacrificed for vibe.** Gamer terms never appear inside
  install/run commands, version numbers, file paths, or any spot where they
  could create ambiguity. Cut the joke before cutting the clarity.

## Scoring

A document **passes** when every R# above is met. Report results as a table:
`Requirement | Status (✅/❌) | Evidence`. Any ❌ must be fixed and re-checked,
not waived.
