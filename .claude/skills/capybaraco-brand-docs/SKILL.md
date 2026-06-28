---
name: capybaraco-brand-docs
description: This skill should be used when the user asks to "document a capybaraco repo", "write a README for capybaraco", "create capybaraco branded docs", "generate a branded README", or otherwise produce documentation that must match the capybaraco brand (black/off-white/green palette, monospace/terminal typography) and voice (professional with a light gamer flourish). It supplies the palette, typography, top-repo README structure, tone rules, and a verification checklist.
version: 0.1.0
---

# Capybaraco Brand Docs

Produce documentation — primarily `README.md` files — for capybaraco GitHub
repos that look and sound on-brand: the black/off-white/green terminal palette,
monospace-first typography, a structure modelled on top-tier open-source repos,
and a voice that stays professional while landing the occasional, well-placed
gamer flourish.

## When to use

Use this skill when generating or revising any capybaraco-facing document: a
repo README, a docs page, a release note, or a project overview. It is the
companion knowledge for the `capybaraco-docs` agent.

## The four pillars

Every branded doc is built from four references. Load them as needed:

1. **Brand** — `references/brand.md`. The exact palette (accent green `#22c55e`
   on black `#000000`, off-white `#f5f5f5` text), badge styling, and the
   monospace type stack. Use these and only these colours for any colour-bearing
   element.
2. **Structure** — `references/readme-template.md`. The section order distilled
   from admired repos: title → tagline → badges → hero → TOC → features → stack
   → getting started → usage → structure → footer.
3. **Tone** — `references/tone.md`. Professional first; gamer terms are seasoning
   governed by the **rule of one** (≈ one flourish per major section, never in
   commands, never stacked).
4. **Requirements** — `references/requirements-checklist.md`. The binary spec
   (R1–R17) every doc is verified against before it ships.

## Workflow

To document a repo:

1. **Gather facts.** Read the repo: `package.json` (scripts, deps), source for
   the real feature set and commands, `AGENTS.md`/`CONTRIBUTING` for conventions,
   and `public/` for an OG image or screenshot to use as the hero. Never invent
   features, commands, or badges — document what exists.
2. **Pull brand values** from `references/brand.md`. Confirm palette and badge
   format (`color=22c55e`, `labelColor=000000`, `style=flat-square`).
3. **Lay out the structure** from `references/readme-template.md`, dropping any
   section that genuinely does not apply while keeping the order.
4. **Write in the calibrated voice** per `references/tone.md`. Draft
   professionally first, then add at most one gamer flourish per major section
   where it lands naturally. Keep all commands and technical claims clean.
5. **Verify against `references/requirements-checklist.md`.** Produce the
   `Requirement | Status | Evidence` table for R1–R17. Fix every ❌ and re-check
   — do not waive.

## Quality bar

- Monospace vibe is carried by fenced code blocks and `$ `-prefixed commands,
  not by screenshots of text.
- Badge row is black + green and short (2–5 badges).
- The hero visual leads with `public/og-image.svg` when present, with alt text.
- A hiring manager could read it end to end and trust every claim; the gaming
  references read as a confident wink, never as filler.

## Additional resources

- **`references/brand.md`** — palette, badges, typography, aesthetic rules.
- **`references/readme-template.md`** — section-by-section template + guidance.
- **`references/tone.md`** — professional + gamer-flourish calibration with
  good/bad examples.
- **`references/requirements-checklist.md`** — R1–R17 verification spec.
