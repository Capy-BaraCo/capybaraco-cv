# Public-Repo Readiness Checklist

Patterns distilled from how widely-respected public repos present themselves
(e.g. `sindresorhus/*`, `vercel/next.js`, `facebook/react`, the
`github/gitignore` and `awesome-readme` collections). Each item is severity
tagged: **BLOCK** (must fix before public), **WARN** (should fix), **NICE**
(polish that signals care).

## A. Secrets & sensitive data — BLOCK

- No credentials in tracked files: API keys, tokens, passwords, connection
  strings, private keys, `.env` files. See `secret-patterns.md`.
- No secrets in **git history** — a deleted secret still lives in old commits.
  Rotate the secret and rewrite history (`git filter-repo`) if found.
- No private/personal documents committed (CVs, contracts, internal docs).
  Gitignore them and keep them local.
- No internal infrastructure leaked: private hostnames, internal IPs, staging
  URLs, employer-internal package names.

## B. Repository cleanliness — BLOCK / WARN

- **BLOCK:** no build output or dependencies committed (`node_modules/`,
  `dist/`, `build/`, `coverage/`, `.next/`, `*.tsbuildinfo`, `.DS_Store`,
  `*.log`). These belong in `.gitignore`.
- **WARN:** no dead/commented-out code blocks, no scratch files
  (`test.js`, `scratch/`, `tmp/`, `Untitled`), no leftover scaffolding.
- **WARN:** no debris markers shipped — `console.log`, `debugger`, `TODO`,
  `FIXME`, `XXX`, `HACK`. A few intentional `TODO`s are fine; a pile reads as
  unfinished.
- **NICE:** consistent formatting (a formatter/linter config present and clean).

## C. Required documents — BLOCK / WARN

- **BLOCK:** `README.md` that explains what it is, how to run it, and how to use
  it within ~30 seconds of reading.
- **BLOCK:** `LICENSE` (an unlicensed repo is legally "all rights reserved" and
  unusable by others — a red flag on a portfolio).
- **WARN:** `.gitignore` appropriate to the stack.
- **NICE:** `CONTRIBUTING`/`AGENTS` guide, `CODE_OF_CONDUCT`, issue/PR templates.

## D. History & hygiene — WARN / NICE

- **WARN:** commit messages are descriptive, not `wip`/`fix`/`asdf`/single
  characters. History is part of the portfolio.
- **NICE:** linear, intentional history; no merge-commit noise from accidental
  pulls; tags/releases for milestones.
- **NICE:** no force-pushed secrets sitting in the reflog/remote.

## E. Polish that recruiters notice — NICE

- A hero image/screenshot/GIF in the README.
- Badges (build/license/stack) that actually reflect reality.
- Tests present and passing, or an honest note on coverage.
- CI config (`.github/workflows`) that lints/builds on push.
- No large binaries (use Git LFS or omit); repo clones fast.

## How to run

`scripts/audit.sh [repo-dir]` automates A–D and the large-binary check. Treat
its output as the evidence base; apply judgment for the WARN/NICE items the
script flags but cannot fully assess (e.g. whether a `TODO` is intentional).
