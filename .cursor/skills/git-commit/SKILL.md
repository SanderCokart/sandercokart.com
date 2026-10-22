---
name: conventional-commits
description: Commit message format for this repo (topic | type(scope): description.). Use when creating commits, writing commit messages, amending history, or finding all commits of a workstream.
---

# Git commits

```
<topic> | type(scope): description.
```

- **topic**: lowercase kebab naming the workstream (`open-source`, `php-cve`, `staging-cache`). Every commit of that workstream uses the same topic, so it lines up in `git log --oneline --graph` even after a fast-forward. On a topic branch the `prepare-commit-msg` hook adds it from the branch name (`feat/codehouse-light-mode` → `codehouse-light-mode`); on `development` / `main` write it yourself. Reuse a topic from `git log --format=%s -30` when continuing a workstream.
- **type**: `feat`, `fix`, `docs`, `format` (prettier/eslint only), `refactor` (no behavior change), `perf`, `test`, `docker`, `ci`, `chore`, `revert`.
- **scope**: workspace or area (`codehouse`, `main`, `api`, `ui`, `mail`, `runtime-env`, `repo`).
- **description**: starts lowercase, ends with a period. Why, not a file list.
- Optional: `#123 | ` after the topic for an issue; `!` before the colon for a breaking change (`feat(ui)!: …`).

The `commit-msg` hook ([`scripts/commit-msg.mjs`](../../../scripts/commit-msg.mjs)) rejects a bad subject and lists recent topics — no need to re-read this skill to check a message. Older commits use uppercase group IDs (`MAILSC | …`); they stay valid, see [`.cursor/docs/git-group-ids.md`](../../docs/git-group-ids.md). Find a workstream: `git log --oneline --grep='^open-source |'`.

## Body

Blank line, then only the sections that apply, each line `- path: reason.`: `Files edited:`, `Files added:`, `Files removed:`, `Files moved:`. Put mechanical churn (import rewrites, snapshot PNGs) on one line.

```
open-source | feat(codehouse): list public repos with a split download button.

Files added:
- apps/codehouse/src/app/[locale]/(routes)/open-source/page.tsx: route with hero, projects and FAQ.

Files edited:
- apps/codehouse/messages/en.json, nl.json: OpenSource* namespaces.
```
