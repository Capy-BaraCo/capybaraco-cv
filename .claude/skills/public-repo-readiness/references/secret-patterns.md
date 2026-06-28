# Secret-Scanning Patterns

High-signal patterns for detecting credentials in a repo. The `audit.sh` script
greps tracked files for these; this reference documents them for manual review
and for scanning history.

## Pattern catalogue

| Secret type | Regex (grep -E) |
|-------------|-----------------|
| Private key block | `BEGIN (RSA\|OPENSSH\|DSA\|EC\|PGP) PRIVATE KEY` |
| AWS access key id | `AKIA[0-9A-Z]{16}` |
| GitHub personal token | `ghp_[0-9A-Za-z]{36}` |
| Google API key | `AIza[0-9A-Za-z_-]{35}` |
| Slack token | `xox[baprs]-[0-9A-Za-z-]{10,}` |
| Generic assignment | `(api[_-]?key\|secret\|token\|password\|access[_-]?key)["' ]*[:=]\s*["'][^"']{8,}` |

## Reducing false positives

The generic assignment pattern fires on legitimate code. Treat as **not** a
secret when the value is:

- `process.env.X` / `import.meta.env.X` (read from environment, correct pattern)
- `<your-key-here>`, `example`, `sample`, `placeholder`, `changeme`, `xxxx`
- inside `*.md`, `*.example`, `*.sample`, `*.template`, or lockfiles
- a public/publishable key (e.g. a Stripe **publishable** key, a frontend
  analytics id that is designed to be public) — confirm before clearing

## Scanning git history

A secret removed from the working tree still lives in history. Check:

```bash
# Search all history for a string
git log -p --all -S 'PRIVATE KEY' --pretty=oneline

# Search across every blob ever committed
git rev-list --all | xargs -I{} git grep -nIE 'AKIA[0-9A-Z]{16}' {} 2>/dev/null
```

If a real secret is found in history:

1. **Rotate the credential immediately** — assume it is already compromised.
2. Purge it from history with `git filter-repo` (preferred) or BFG.
3. Force-push and have collaborators re-clone.

## What to do with a finding

- **Working tree, real secret:** remove, move value to `.env` (gitignored),
  rotate, then re-scan history.
- **History, real secret:** rotate first, then rewrite history.
- **False positive:** leave it, and consider adding an inline note or a
  `.gitleaksignore`-style allowlist entry so future scans stay quiet.
