# AGENTS.md

Guidance for AI agents and contributors working in this repo. Keep this file
accurate when structure, commands, or conventions change.

## Project

Terminal-inspired personal CV site for **Aaron Paterson** (`www.capybaraco.xyz`).
A single scrolling page that opens **premium and minimalist**, then reveals a
**functional terminal** where visitors type or click commands to retrieve the CV.
Goal: impress a technical employer without tipping into hacker-novelty kitsch.

The durable master plan (mission, tech rationale, sprint map) lives at
`~/.claude/plans/use-the-key-elements-precious-locket.md`. Progress notes are in
`.remember/`.

## Stack

- **Vite + React 18 + TypeScript** (output: `dist/`).
- **Plain CSS with design tokens** — no Tailwind, no CSS-in-JS. Palette/spacing/
  type/motion are CSS custom properties in `src/styles/tokens.css`.
- **No animation libraries.** Motion is hand-rolled (custom hooks + `<canvas>`).
- Node 22, npm. No pnpm.

## Commands

```bash
npm install        # install deps
npm run dev        # local dev server
npm run build      # tsc -b && vite build  -> dist/
npm run lint       # eslint, --max-warnings 0 (warnings fail)
npm run preview    # serve the production build
```

**Both `npm run build` and `npm run lint` must pass clean before any commit.**
Lint runs with `--max-warnings 0`; `tsconfig` has `noUnusedLocals`/
`noUnusedParameters`/`strict` on, so dead imports and unused params are errors.

## Layout

```
public/            # static, shipped as-is
  cv.html          # standalone printable HTML CV (JS-free)
  assets/cv.pdf    # placeholder PDF (replace with real CV)
  favicon.svg, robots.txt
src/
  main.tsx, App.tsx
  data/profile.ts  # SINGLE source of truth: name, email, links, summary
  styles/          # tokens.css (design tokens), global.css, app.css
  hooks/           # usePrefersReducedMotion, useCommandHistory, ...
  terminal/        # types.ts, commands.ts (registry), runCommand.ts (parser)
  components/
    Terminal/      # shell UI, input, output, chips, history
    Footer/        # contact + minimal footer
```

## Conventions

- **Component folders use a barrel:** `Component.tsx` holds the component,
  `index.ts` does `export { default } from './Component'`. Import as
  `./components/Component`. Do **not** name a component file `index.tsx` — it
  collides with the `index.ts` barrel. (See `Terminal/` and `Footer/`.)
- **No `.ts`/`.tsx` extensions in import paths.** `moduleResolution: "bundler"`
  + `tsc` reject explicit extensions; use extensionless imports.
- **Identity/content changes go through `src/data/profile.ts` only** — never
  hard-code the name, email, or links elsewhere.
- **Design values come from `tokens.css`** (e.g. `var(--color-accent)` =
  `#22c55e`, `var(--space-md)`). Don't introduce raw hex/px when a token exists.

## Terminal command architecture

Command handlers in `terminal/commands.ts` are **pure**: they return a
`CommandResult` and *describe* side-effects via an optional `CommandAction`
(`clear` | `download` | `openLink`). The `Terminal` component executes the
effect (download, open tab, clear). `runCommand.ts` parses input and normalises
`output` to `string[]`. Keep handlers free of DOM/side-effects — add a new
`CommandAction` variant instead. See `terminal/types.ts` for the contracts.

## Design non-negotiables (carry into every change)

1. First screen = clean/premium, not a novelty hacker page.
2. **Respect `prefers-reduced-motion`**: typing renders instantly, Matrix
   background falls back to a static dim layer, no transforms. The site must
   look professional with all motion disabled.
3. Palette: black / off-white / soft green; restrained type; glow only where
   useful; no neon overload.
4. Terminal stays **functional** (real parser, keyboard input, history) and
   offers both typing and click-chip paths.
5. Accessible: semantic landmarks, labelled input, `aria-live` output log,
   visible focus, AA contrast, ≥44px tap targets. Responsive at 360/768/1280px.

## Git discipline

- Work on `master`; **one commit per completed sprint** so history maps to the
  sprint log. No push unless asked.
- Build artifacts (`dist/`, `*.tsbuildinfo`, `vite.config.js/.d.ts`) and local
  scratch (`.claude/*.zip`, `.claude/settings.local.json`, `*:Zone.Identifier`)
  are gitignored — never commit them.

## Status (2026-06-27)

Built: scaffold, terminal core, static `cv.html`/`cv.pdf`/favicon/robots, SEO
meta. **Not yet done:** premium Landing screen, motion layer (`useTypewriter`,
`useInViewReveal`, `MatrixBackground`), `og-image.svg`, README/nginx, in-repo
`PLAN.md`/`SPRINT-LOG.md`. `App.tsx` currently renders only Terminal + Footer.
