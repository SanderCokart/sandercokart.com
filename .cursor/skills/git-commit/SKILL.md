---
name: conventional-commits
description: Guidelines for writing git commit messages using grouped conventional subjects (GROUPID | type(scope): …). Use when creating commits, writing commit messages, amending history, or looking up a feature/bug via its group ID.
---

# Guidelines for git commits

Every commit belongs to a **group ID** — a short token that ties the workstream together (feature, bug, issue). Same ID on every commit in that workstream. Index: [`.cursor/docs/git-group-ids.md`](../../docs/git-group-ids.md).

Lookup: `git log --grep='^MAILSC'`

## Subject

```
GROUPID | type(scope): description.
```

Optional prefixes, still separated by ` | `:

- `! | ` first if the commit is breaking
- `#123 | ` after the group ID when the branch carries an issue number

Examples:

```
MAILSC | feat(mail): queue contact mail through a React Email HTTP renderer sidecar.
NLOGO | fix(ui): keep the named logo square and padded in the header.
! | RTENV | feat(runtime-env): inject public env via a blocking head script.
DXAI | #14 | chore(repo): align lint-staged and @/* aliases.
```

Rules:

- **GROUPID**: 2–8 uppercase A–Z. Reuse an existing ID from the index if this continues that workstream. Otherwise mint one, add a row to the index in the same change (or the first commit that uses it).
- **type**: lowercase. One of: `feat`, `fix`, `docs`, `format`, `refactor`, `perf`, `test`, `docker`, `ci`, `chore`, `revert`.
- **scope**: workspace or area (`mail`, `mail-renderer`, `runtime-env`, `ui`, `main`, `repo`, `git`).
- **description**: starts lowercase, ends with a period. Why, not a file list.

## Body

Empty line after the subject. List paths under the sections that apply. Each line is `- path: reason.`

```
MAILSC | fix(mail-renderer): stop mise shims resolving php during Docker builds.

Files edited:
- apps/mail-renderer/Dockerfile: set MISE_DISABLE_TOOLS=php so prune/build ignore php@8.5 from root mise.toml.
```

Sections: `Files edited:`, `Files added:`, `Files removed:`, `Files moved:`. Omit empty ones. Group mechanical churn (import rewrites, snapshot PNGs) on one line when the reason is the same.

## Types

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation
- `format`: prettier / eslint-only formatting
- `refactor`: rename, move, simplify — no behavior change
- `perf`: performance
- `test`: unit / integration / e2e / visual
- `docker`: images, compose, container runtime
- `ci`: pipelines
- `chore`: deps, tooling, repo map
- `revert`: reverts a previous commit
