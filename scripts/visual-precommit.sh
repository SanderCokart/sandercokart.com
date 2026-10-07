#!/usr/bin/env bash
# Runs Playwright visual regression for the Next.js apps affected by the staged changes.
# Skips entirely when no UI-relevant file is staged. Set SKIP_VISUAL=1 to bypass.
#
# Note: tests run against the working tree, not only the staged content.

set -euo pipefail

if [[ "${SKIP_VISUAL:-}" == "1" ]]; then
  echo "[visual] SKIP_VISUAL=1, skipping visual regression."
  exit 0
fi

staged="$(git diff --cached --name-only --diff-filter=ACMRD)"

# Files that can change what apps/main or apps/codehouse render.
app_pattern() {
  local app="$1"
  printf '^apps/%s/(src|public|e2e|messages|articles)/|^apps/%s/(next\\.config\\.ts|postcss\\.config\\.mjs|playwright\\.config\\.ts|package\\.json)$' "$app" "$app"
}
shared_pattern='^packages/(ui|toolbox|runtime-env|playwright-visual)/|^pnpm-lock\.yaml$'

filters=()
for app in main codehouse; do
  if grep -qE "$(app_pattern "$app")|${shared_pattern}" <<<"$staged"; then
    filters+=("--filter=${app}")
  fi
done

if [[ ${#filters[@]} -eq 0 ]]; then
  echo "[visual] No UI changes staged, skipping visual regression."
  exit 0
fi

echo "[visual] Running visual regression for: ${filters[*]#--filter=}"
pnpm exec turbo run test:visual "${filters[@]}" --concurrency=1 --ui=stream --output-logs=errors-only
