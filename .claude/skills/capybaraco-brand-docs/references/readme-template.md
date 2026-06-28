# README Template — modelled on top-tier repos

The section order and conventions below are distilled from widely-admired
open-source READMEs (e.g. the structure popularised by projects like
`vercel/next.js`, `sindresorhus/*`, `tailwindlabs/tailwindcss`, and the
`awesome-readme` collection): title → tagline → badges → hero → TOC → features →
stack → getting started → usage → structure → footer.

Adapt sections to the repo; omit any that genuinely do not apply, but keep the
order. Fill the brand colours/typography from `references/brand.md` and verify
the result against `references/requirements-checklist.md`.

```markdown
<!-- Title + tagline (R5) -->
# <repo-name>

> <one-line tagline — what it is, in a single confident sentence>

<!-- Badge row (R6) — black + green, see brand.md -->
![build](https://img.shields.io/badge/build-passing-22c55e?style=flat-square&labelColor=000000)
![license](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square&labelColor=000000)
![stack](https://img.shields.io/badge/stack-Vite%20%2B%20React%20%2B%20TS-22c55e?style=flat-square&labelColor=000000)

<!-- Hero visual (R7) -->
![<alt text>](<path-to-og-or-screenshot>)

<!-- TOC (R14) -->
## Contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Usage](#usage)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **<verb-led highlight>** — <why it matters>
- ...

## Tech stack
- <runtime / framework / language, with the why in a clause>

## Getting started
\`\`\`bash
$ git clone <url>
$ cd <repo>
$ npm install
$ npm run dev
\`\`\`

## Usage
<!-- For a CLI/terminal product, document the real commands in a table + block -->

## Project structure
\`\`\`
<tree>
\`\`\`

## Contributing
<pointer to AGENTS.md / CONTRIBUTING, build+lint gates>

## License
<SPDX> © <year> <name>
```

## Section guidance

- **Tagline (R5):** one sentence, no hedging. State what it is, not what you hope
  it becomes.
- **Badges (R6):** 2–5 max. More than five reads as noise.
- **Hero (R7):** lead with the OG image if one exists (`public/og-image.svg` in
  capybaraco repos). Always include alt text.
- **Features (R8):** verb-led, scannable, value in the same line.
- **Getting started (R10):** every step copy-pasteable; never put prose inside a
  command block. Keep commands brand-clean — no gamer terms in commands (R17).
- **Usage (R11):** for the terminal CV, document the command registry
  (`help`, `cv --download-pdf`, `cv --view-html`, `contact --show`, `whoami`,
  `portfolio`, `clear`) as a table.
- **Footer (R13):** contributing pointer + license + contact in that order.
