---
agent: agent
---
Follow these steps in order. Do not skip steps or reorder them.

## Step 1: Gather changes

Run `git status` and `git diff` to see all changes.

## Step 2: Plan commits

Split changes into logical commits (one per intent). Order: refactor first, then features/fixes, then docs/chore. Use the grouped commit format for each message (see reference below).

- Give every commit of one workstream the same lowercase kebab topic (reuse one from `git log --format=%s -30` when continuing).
- Group by intent; prefer smaller, focused commits when changes are unrelated.
- If everything is one logical change, use one commit.

## Step 3: Show a readable summary

Output a **nicely formatted summary** so the user can review the commits before copying or running. For each commit, show:

- The commit message (readable, not escaped).
- The files included in that commit (paths only).

Example format:

- **runtime-env | feat(packages/runtime-env): inject public env via a blocking head script.** - `env-script.tsx`
- **named-logo | fix(packages/ui): keep the named logo square in the header.** - `named-logo.tsx`

Keep this short and scannable. No code block in this step.

## Step 4: Output the copy-paste code block

**Directly under the summary**, output **exactly one** copy-pasteable bash code block. It must contain:

- For each commit: `git add <paths>` then `git commit -m "<message>"`, chained with ` && `.
- Line continuation with ` \` if you use multiple lines.
- End with `git push`.

Example shape (replace with real paths and messages):

```bash
git add path/to/file1 path/to/file2 && git commit -m "runtime-env | feat(packages/runtime-env): add thing." && \
git add path/to/file3 && git commit -m "runtime-env | docs(packages/runtime-env): document the other." && \
git push
```

- One `git add` per commit, only the paths for that commit.
- Use the grouped commit format (see reference). For multi-line bodies, use a HEREDOC `-m "$(cat <<'EOF' … EOF)"` or `-m "subject" -m "body"`.
- Quote messages so they paste safely; escape internal double quotes or use single-quoted `-m 'message'`.
- Include `git push` in the block.

## Step 5: Ask Y or N

Immediately after the code block, ask exactly:

**Run this? (Y / N)**

## Step 6: Act on answer

- **Y** - Run the same command sequence in the terminal (the exact commands from the code block).
- **N** - Do nothing. Do not run any git commands.

---

## Commit message format (reference)

`<topic> | type(folder): description.` (folder = `apps/codehouse`, `packages/ui`, … or `repo`) — full rules in [`.cursor/skills/git-commit/SKILL.md`](../skills/git-commit/SKILL.md). The `commit-msg` hook validates it.
