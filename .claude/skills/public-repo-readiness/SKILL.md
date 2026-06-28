---
name: public-repo-readiness
description: This skill should be used when the user asks to "check if a repo is ready to go public", "audit a repo before making it public", "scan for secrets before publishing", "make sure no secrets or extra code is exposed", "is this repo clean enough to publish", or wants a portfolio repo assessed from a recruiter's point of view. It provides a pattern-based pre-publication checklist, secret-scanning patterns, a runnable audit script, and the recruiter evaluation lens.
version: 0.1.0
---

# Public-Repo Readiness

Assess whether a git repository is ready to be made public — no secrets exposed,
no build artifacts or dead code committed, required documents present, clean
history — and translate that into how a recruiter would judge it as a portfolio
piece. The checks are distilled from how top-tier public repos present
themselves.

## When to use

Use this skill before flipping a repo to public, before adding a repo to a
portfolio, or whenever the user wants a cleanliness/security pass on a repo. It
backs the `recruiter-repo-review` agent.

## Workflow

1. **Run the automated audit.** Execute the bundled script against the repo:

   ```bash
   bash scripts/audit.sh <repo-dir>
   ```

   It scans **tracked files only** (`git ls-files`) across six areas — secrets,
   build artifacts/junk, code debris, required documents, large binaries, and
   commit hygiene — and prints `PASS`/`WARN`/`FAIL` lines plus a `RESULT`.
   Exit code is non-zero when a blocking `FAIL` (secret or artifact) is found.

2. **Review against the checklist.** Read `references/audit-checklist.md` and
   apply judgment to the WARN/NICE items the script flags but cannot fully
   assess (e.g. whether a `TODO` is intentional, whether a "secret" is actually
   a publishable key).

3. **Confirm no secrets in history.** For anything secret-shaped, follow
   `references/secret-patterns.md` — including the history-scan commands. A
   secret removed from the working tree still lives in old commits; if found,
   **rotate the credential first**, then rewrite history.

4. **Apply the recruiter lens.** Use `references/recruiter-lens.md` to convert
   findings into a 30-second-scan verdict and a 0–5 scorecard across first
   impression, professionalism, runnability, code quality, and OSS hygiene.

5. **Report.** Lead with the verdict (Strong / Solid with fixes / Not ready),
   list the top fixes ranked by recruiter impact, then the scorecard. Be
   specific and constructive — a review the candidate would want to receive.

## Severity model

- **BLOCK** — secrets, committed `node_modules`/`dist`, missing README/LICENSE.
  Must be fixed before public.
- **WARN** — dead code, debris markers, weak `.gitignore`, low-info commits.
- **NICE** — hero image, tests, CI, templates. Signals of care.

## Important

This skill **audits and reports**; it does not silently rewrite history or
delete files. Removing committed secrets, purging history, and rotating
credentials are destructive/outward-facing actions — surface them as
prioritised recommendations and let the user authorize each one.

## Additional resources

- **`scripts/audit.sh`** — read-only six-area scan; the evidence base.
- **`references/audit-checklist.md`** — full BLOCK/WARN/NICE pattern checklist.
- **`references/secret-patterns.md`** — secret regexes, false-positive rules,
  history-scanning and remediation.
- **`references/recruiter-lens.md`** — 30-second scan, signal→impression map,
  0–5 scoring model, report tone.
