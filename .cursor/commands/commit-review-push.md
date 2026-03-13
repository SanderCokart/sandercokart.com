---
agent: agent
---
Follow these steps in order. Do not skip steps or reorder them.

## Step 1: Gather changes

Run `git status` and `git diff` to see all changes.

## Step 2: Plan commits

Split changes into logical commits (one per intent: feature, fix, refactor, docs, etc.). Order: refactor first, then features/fixes, then docs/chore. Use Conventional Commits for each message: `type(scope): description` (e.g. feat, fix, refactor, docs).

- Group by intent; prefer smaller, focused commits when changes are unrelated.
- If everything is one logical change, use one commit.

## Step 3: Show a readable summary

Output a **nicely formatted summary** so the user can review the commits before copying or running. For each commit, show:

- The commit message (readable, not escaped).
- The files included in that commit (paths only).

Example format:

- **feat(articles): add back-to-top button** — `back-to-top-button.tsx`
- **refactor(articles): simplify article page layout** — `page.tsx`

Keep this short and scannable. No code block in this step.

## Step 4: Output the copy-paste code block

**Directly under the summary**, output **exactly one** copy-pasteable bash code block. It must contain:

- For each commit: `git add <paths>` then `git commit -m "<message>"`, chained with ` && `.
- Line continuation with ` \` if you use multiple lines.
- End with `git push`.

Example shape (replace with real paths and messages):

```bash
git add path/to/file1 path/to/file2 && git commit -m "feat(scope): add thing" && \
git add path/to/file3 && git commit -m "refactor(scope): simplify other" && \
git push
```

- One `git add` per commit, only the paths for that commit.
- Quote messages so they paste safely; escape internal double quotes or use single-quoted `-m 'message'`.
- Include `git push` in the block.

## Step 5: Ask Y or N

Immediately after the code block, ask exactly:

**Run this? (Y / N)**

## Step 6: Act on answer

- **Y** — Run the same command sequence in the terminal (the exact commands from the code block).
- **N** — Do nothing. Do not run any git commands.

---

## Conventional Commits (reference)

- Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore.
- Optional scope: `feat(articles): add back-to-top`.
- Breaking: `feat(api)!: remove endpoint` or footer `BREAKING CHANGE: …`.
