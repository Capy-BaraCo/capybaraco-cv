# The Recruiter Lens

How a technical recruiter or hiring manager actually evaluates a portfolio repo.
They spend **30–90 seconds** on first contact and are pattern-matching for
signals of a professional engineer. The audit checks for cleanliness; this lens
translates cleanliness into the judgement a reviewer forms.

## The 30-second scan (what they look at, in order)

1. **README above the fold** — Can they tell what this is and why it is good
   without scrolling? A clear title, one-line value, and a hero image win here.
2. **Does it run?** — Is there an obvious, copy-pasteable getting-started? Could
   they clone and run it in under a minute?
3. **Repo surface** — File tree looks intentional, not a dumping ground. No
   `node_modules`, no `Untitled-1.js`, no `final_final_v2`.
4. **Commit list** — Skimmed, not read. Descriptive messages signal discipline;
   `wip`, `asdf`, `stuff` signal the opposite.
5. **Recency & finish** — Does it look shipped, or abandoned mid-thought
   (stray `TODO`s, broken links, empty sections)?

## Signal → impression mapping

| What they see | Impression formed |
|---------------|-------------------|
| Clean README with hero + usage | "This person can communicate and ship." |
| Secrets / `.env` committed | "Security-careless." (often an instant pass) |
| `node_modules`/`dist` committed | "Doesn't understand tooling basics." |
| Dead code, `console.log` everywhere | "Sloppy; doesn't clean up after themselves." |
| No LICENSE | "Doesn't understand open-source norms." |
| Descriptive commits, linear history | "Works like a professional." |
| Tests + CI badge | "Cares about correctness." |
| Large unexplained binaries | "Careless with repo health." |

## Scoring model (use for the agent's verdict)

Rate each dimension 0–5 and give an overall **Hire-signal** verdict.

- **First impression** (README, hero, clarity)
- **Professionalism** (cleanliness, no secrets/artifacts, history)
- **Runnability** (can a stranger run it fast)
- **Code quality signals** (structure, debris, tests/lint)
- **Open-source hygiene** (LICENSE, contributing, gitignore)

Overall verdict bands:
- **Strong portfolio piece** — would showcase confidently; no blockers, ≤2 minor
  notes.
- **Solid with fixes** — good bones; a few WARN-level items to polish first.
- **Not ready** — at least one BLOCK (secret, artifacts, no README/LICENSE) that
  a recruiter would read as a red flag.

## Tone for the report

Write the assessment as a **constructive review a candidate would want to
receive**: specific, prioritised, and honest. Lead with the verdict, then the
top fixes ranked by recruiter impact, then the dimension scorecard. Praise what
is genuinely strong — recruiters notice polish, and so should the report.
