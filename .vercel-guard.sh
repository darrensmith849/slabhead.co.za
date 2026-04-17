#!/usr/bin/env bash
# Vercel build guard — prevents wasteful builds to save money.
#
# Vercel's ignoreCommand convention (confusing but real):
#   exit 0 = SKIP the build (no charge)
#   exit 1 = PROCEED with the build
#
# Override knobs (set as Vercel env vars if you need to force a build):
#   VERCEL_GUARD_ALLOW_DEV=1       → allow non-main branches to build
#   VERCEL_GUARD_SKIP_DOC_CHECK=1  → disable the docs-only skip
#   VERCEL_GUARD_FORCE=1           → always build, bypass all checks

set -uo pipefail

branch="${VERCEL_GIT_COMMIT_REF:-unknown}"
prev="${VERCEL_GIT_PREVIOUS_SHA:-}"

echo "🔍 vercel-guard: branch=$branch prev_sha=${prev:-none}"

# ─── Override: force build regardless ─────────────────────────────────
if [ "${VERCEL_GUARD_FORCE:-0}" = "1" ]; then
  echo "✅ VERCEL_GUARD_FORCE=1 — building"
  exit 1
fi

# ─── Check 1: only build main/master by default ───────────────────────
if [ "$branch" != "main" ] && [ "$branch" != "master" ]; then
  if [ "${VERCEL_GUARD_ALLOW_DEV:-0}" != "1" ]; then
    echo "🛑 skipping: branch '$branch' is not main/master"
    echo "   (set VERCEL_GUARD_ALLOW_DEV=1 on this project to allow)"
    exit 0
  fi
  echo "   VERCEL_GUARD_ALLOW_DEV=1 — allowing non-main branch"
fi

# ─── Check 2: skip docs-only changes ──────────────────────────────────
if [ "${VERCEL_GUARD_SKIP_DOC_CHECK:-0}" != "1" ] && [ -n "$prev" ]; then
  # Only run diff if git history actually has the previous SHA
  if git cat-file -e "$prev" 2>/dev/null; then
    changed=$(git diff --name-only "$prev" HEAD 2>/dev/null || true)
    if [ -n "$changed" ]; then
      # Filter out doc/comment files. Anything remaining = real code.
      non_doc=$(echo "$changed" | grep -Ev '(^|/)(\.md|\.MD|\.txt|\.rst|LICENSE|CHANGELOG|README|docs/|\.github/ISSUE_TEMPLATE)' || true)
      if [ -z "$non_doc" ]; then
        echo "🛑 skipping: only docs/markdown changed"
        echo "$changed" | sed 's/^/     /'
        exit 0
      fi
    fi
  fi
fi

# ─── All checks passed ────────────────────────────────────────────────
echo "✅ proceeding with build"
exit 1
