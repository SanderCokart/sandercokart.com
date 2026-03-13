---
agent: agent
---
Use `git status` and `git diff` to gather all changes. **Split the changes into logical commits** (group by feature, fix, refactor, docs, etc.). Create one Conventional Commits–style message per group. Present the list of commits (files per commit + message) for review. Ask the user to approve (Y) or reject (N). Upon approval, **output a single copy-pasteable terminal block** containing all commands and messages so the user can run them in one go.

## Splitting into commits

- **Group by intent**: one commit per logical change (e.g. “add back-to-top button” vs “tweak article layout”).
- **Order**: foundational/refactor first, then features/fixes, then docs/chore.
- **Scope**: prefer smaller, focused commits over one large commit when changes are unrelated.
- If there is only one logical group, output a single commit.

## Conventional Commits Specification

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: a commit introducing a new feature (correlates with MINOR in SemVer)
- **fix**: a commit patching a bug (correlates with PATCH in SemVer)
- Other types: build, chore, ci, docs, style, refactor, perf, test, etc.

### Scope
An optional scope can be added to provide additional context, e.g., `feat(api): add user authentication`.

### Breaking Changes
- Indicate with `!` after type/scope: `feat(api)!: remove deprecated endpoint`
- Or use footer: `BREAKING CHANGE: description`

### Body and Footers
- Body: Additional contextual information, separated by a blank line.
- Footers: For metadata like `Reviewed-by:`, `Refs:`, or `BREAKING CHANGE:`.

## Output format after approval

Output **one copy-pasteable code block** the user can run in the terminal. For each commit: `git add <paths>`, then `git commit -m "<message>"`. Chain with ` && ` (and ` \` for line continuation if desired). End with `git push` so the full sequence runs in one paste.

Example (two commits):

```bash
git add apps/main/src/app/articles/\[slug\]/components/back-to-top-button.tsx && git commit -m "feat(articles): add back-to-top button" && \
git add apps/main/src/app/articles/\[slug\]/page.tsx && git commit -m "refactor(articles): simplify article page layout" && \
git push
```

- Use one `git add` per commit with only the paths that belong to that commit.
- Quote commit messages so they paste safely; escape internal double quotes in the shell (e.g. `-m \"feat: add thing\""` or use single-quoted messages where appropriate).
- Include `git push` only when the user has approved pushing.

Ensure each commit message accurately describes its grouped changes and follows the Conventional Commits format.