---
name: conventional-commits
description: Guidelines for writing git commit messages using the Conventional Commits specification. Use when creating commits, writing commit messages, or reviewing commit history.
---

# Guidelines for git commits

## Commit message format

First line contains vital information about the commit.
Seperate sections with " | ".
`Example: ! | #123 | FEAT | Add new feature`

Start with a ! if the commit is a breaking change.

Followed by an issue number if it exists in the current branch name.
`Example: #123`

Use tags for the type of commit.
Must be capitalized.
Available tags:

- FEAT: New feature
- FIX: Bug fix
- DOCS: Documentation
- FORMAT: Formatting like prettier or eslint
- REFACTOR: Code refactoring including but not limited to renaming variables, functions, files or moving them around or simplifying code.
- PERF: Performance improvements
- TEST: Tests including but not limited to unit tests, integration tests, e2e tests, performance tests, security tests, etc.
- DOCKER: Docker related changes including but not limited to building docker images, running docker containers, etc.
- CI: CI/CD including but not limited to setting up CI/CD pipelines, running CI/CD pipelines, etc.
- CHORE: Chores including but not limited to updating dependencies, updating documentation, updating readme, etc.
- REVERT: Reverts a previous commit

Followed by an empty line and then a more detailed description of the commit.
The details should be very literal and direct using bullet points.

Example:

```
! | #123 | FEAT | Add new feature

- Add new feature
- Add new test
- Add new documentation
```
