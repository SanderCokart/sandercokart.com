---
agent: agent
---
Follow these steps in order. Do not skip steps or reorder them.

## Step 1: Gather changes

Run `git status` and `git diff` to see all changes.

## Step 2: Plan commits

Split changes into logical commits (one per intent). Order: refactor first, then features/fixes, then docs/chore. Use the grouped commit format for each message (see reference below).

- Reuse a group ID from [`.cursor/docs/git-group-ids.md`](../docs/git-group-ids.md) if this continues that workstream; otherwise mint 2–8 A–Z and add a row.
- Group by intent; prefer smaller, focused commits when changes are unrelated.
- If everything is one logical change, use one commit.

## Step 3: Show a readable summary

Output a **nicely formatted summary** so the user can review the commits before copying or running. For each commit, show:

- The commit message (readable, not escaped).
- The files included in that commit (paths only).

Example format:

- **RTENV | feat(runtime-env): inject public env via a blocking head script.** - `env-script.tsx`
- **NLOGO | fix(ui): keep the named logo square in the header.** - `named-logo.tsx`

Keep this short and scannable. No code block in this step.

## Step 4: Output the copy-paste code block

**Directly under the summary**, output **exactly one** copy-pasteable bash code block. It must contain:

- For each commit: `git add <paths>` then `git commit -m "<message>"`, chained with ` && `.
- Line continuation with ` \` if you use multiple lines.
- End with `git push`.

Example shape (replace with real paths and messages):

```bash
git add path/to/file1 path/to/file2 && git commit -m "RTENV | feat(runtime-env): add thing." && \
git add path/to/file3 && git commit -m "RTENV | docs(runtime-env): document the other." && \
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

Full rules: [`.cursor/skills/git-commit/SKILL.md`](../skills/git-commit/SKILL.md). Group IDs: [`.cursor/docs/git-group-ids.md`](../docs/git-group-ids.md).

```
GROUPID | type(scope): description.
```

Optional `! | ` first if breaking; optional `#123 | ` after the group ID. Reuse an existing group ID or mint 2–8 A–Z and add a row to the index.

**Types (lowercase):** feat, fix, docs, format, refactor, perf, test, docker, ci, chore, revert.

**Body:** `Files edited:` / `Files added:` / `Files removed:` / `Files moved:` with `- path: reason.`

Example:

```
MAILSC | feat(mail): queue contact mail through a React Email HTTP renderer sidecar.

Files edited:
- apps/api/app/Mail/ContactFormMail.php: queue and render via MailRenderer instead of Blade.

Files added:
- apps/mail-renderer/src/server.ts: POST /render that calls @repo/mail renderTemplate.
```
