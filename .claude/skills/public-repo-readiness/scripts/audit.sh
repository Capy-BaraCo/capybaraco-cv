#!/usr/bin/env bash
# public-repo-readiness audit — read-only scan of a git repo before it goes public.
# Usage: audit.sh [repo-dir]   (defaults to current directory)
# Scans TRACKED files only (git ls-files) so node_modules/etc. on disk are ignored.
# Exit 0 = no blocking issues; exit 1 = at least one FAIL (secrets/artifacts).

set -uo pipefail
REPO="${1:-.}"
cd "$REPO" || { echo "FATAL: cannot cd into $REPO"; exit 2; }
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "FATAL: $REPO is not a git repository"; exit 2
fi

FAILS=0
WARNS=0
pass() { printf '  \033[32mPASS\033[0m  %s\n' "$1"; }
warn() { printf '  \033[33mWARN\033[0m  %s\n' "$1"; WARNS=$((WARNS+1)); }
fail() { printf '  \033[31mFAIL\033[0m  %s\n' "$1"; FAILS=$((FAILS+1)); }
hdr()  { printf '\n\033[1m== %s ==\033[0m\n' "$1"; }

FILES="$(git ls-files)"

# ----------------------------------------------------------------------------
hdr "1. Secrets & credentials"
SECRET_HITS=$(git grep -nIE \
  -e 'BEGIN (RSA|OPENSSH|DSA|EC|PGP) PRIVATE KEY' \
  -e 'AKIA[0-9A-Z]{16}' \
  -e 'xox[baprs]-[0-9A-Za-z-]{10,}' \
  -e 'AIza[0-9A-Za-z_-]{35}' \
  -e 'ghp_[0-9A-Za-z]{36}' \
  -e '(api[_-]?key|secret|token|password|passwd|access[_-]?key)["'"'"' ]*[:=][[:space:]]*["'"'"'][^"'"'"']{8,}' \
  -- $(git ls-files) 2>/dev/null | grep -vE '\.(md|lock)$|example|sample|placeholder|process\.env|import\.meta\.env')
if [ -n "$SECRET_HITS" ]; then
  fail "potential secrets in tracked files:"; echo "$SECRET_HITS" | sed 's/^/        /'
else
  pass "no high-signal secret patterns in tracked files"
fi
ENVFILES=$(printf '%s\n' "$FILES" | grep -E '(^|/)\.env($|\.)' | grep -vE '\.example$|\.sample$|\.template$' || true)
[ -n "$ENVFILES" ] && fail "tracked .env file(s): $ENVFILES" || pass "no tracked .env files"
KEYFILES=$(printf '%s\n' "$FILES" | grep -E '\.(pem|key|p12|pfx|keystore)$' || true)
[ -n "$KEYFILES" ] && fail "tracked key/cert file(s): $KEYFILES" || pass "no tracked key/cert files"

# Secret patterns in history (cheap heuristic across all commits)
HIST=$(git log -p --all -S 'PRIVATE KEY' --pretty=format: 2>/dev/null | grep -c 'PRIVATE KEY' || true)
[ "${HIST:-0}" -gt 0 ] && warn "the string 'PRIVATE KEY' appears in git history — review before publishing" || pass "no 'PRIVATE KEY' string in history"

# ----------------------------------------------------------------------------
hdr "2. Build artifacts & junk committed"
ART=$(printf '%s\n' "$FILES" | grep -E '(^|/)(node_modules|dist|build|coverage|\.next|\.cache)/|(^|/)\.DS_Store$|\.tsbuildinfo$|\.(log)$' || true)
[ -n "$ART" ] && fail "build/junk artifacts tracked:"$'\n'"$(echo "$ART" | sed 's/^/        /')" || pass "no build artifacts or junk tracked"

# ----------------------------------------------------------------------------
hdr "3. Code debris (left-behind dev scaffolding)"
DEBRIS=$(git grep -nIE -e 'console\.(log|debug)\(' -e '\bdebugger\b' -e '\b(TODO|FIXME|XXX|HACK)\b' \
  -- '*.ts' '*.tsx' '*.js' '*.jsx' '*.py' '*.go' '*.rs' 2>/dev/null || true)
if [ -n "$DEBRIS" ]; then
  N=$(echo "$DEBRIS" | wc -l | tr -d ' ')
  warn "$N debris marker(s) (console.log / debugger / TODO / FIXME):"
  echo "$DEBRIS" | head -15 | sed 's/^/        /'
  [ "$N" -gt 15 ] && echo "        ... ($((N-15)) more)"
else
  pass "no console.log / debugger / TODO / FIXME debris"
fi

# ----------------------------------------------------------------------------
hdr "4. Required project documents"
for f in README LICENSE; do
  if printf '%s\n' "$FILES" | grep -qiE "(^|/)$f(\.md|\.txt|\.rst)?$"; then pass "$f present"; else fail "$f missing"; fi
done
printf '%s\n' "$FILES" | grep -qE '(^|/)\.gitignore$' && pass ".gitignore present" || warn ".gitignore missing"
printf '%s\n' "$FILES" | grep -qiE '(^|/)(CONTRIBUTING|AGENTS)(\.md)?$' && pass "contributor guide present" || warn "no CONTRIBUTING/AGENTS guide"

# ----------------------------------------------------------------------------
hdr "5. Large binaries"
BIG=""
while IFS= read -r f; do
  [ -f "$f" ] || continue
  sz=$(wc -c <"$f" 2>/dev/null || echo 0)
  [ "$sz" -gt 1048576 ] && BIG="$BIG\n        $(printf '%5dKB  %s' $((sz/1024)) "$f")"
done <<< "$FILES"
[ -n "$BIG" ] && warn "tracked file(s) over 1MB (consider Git LFS or removal):"$'\n'"$(printf "$BIG")" || pass "no tracked files over 1MB"

# ----------------------------------------------------------------------------
hdr "6. Commit hygiene (last 15)"
BADMSG=$(git log -15 --pretty=%s 2>/dev/null | grep -ciE '^(wip|fix|update|stuff|asdf|test|temp|.|..)$' || true)
[ "${BADMSG:-0}" -gt 0 ] && warn "$BADMSG of last 15 commit subjects are low-information (wip/fix/single-char)" || pass "recent commit messages look descriptive"

# ----------------------------------------------------------------------------
hdr "Summary"
printf 'FAILS=%d  WARNS=%d\n' "$FAILS" "$WARNS"
[ "$FAILS" -gt 0 ] && { echo "RESULT: NOT READY — resolve FAILs before going public."; exit 1; }
[ "$WARNS" -gt 0 ] && { echo "RESULT: READY WITH NOTES — review WARNs."; exit 0; }
echo "RESULT: CLEAN — safe to publish."; exit 0
