---
name: conventional-commits
description: Guidelines for writing git commit messages using the Conventional Commits specification. Use when creating commits, writing commit messages, or reviewing commit history.
---

# Conventional Commits

Quick reference for writing git commit messages following the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

## Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code refactoring without bug fixes or features
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **build**: Build system or external dependencies
- **ci**: CI/CD configuration changes
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Examples

### Basic

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve memory leak in data processing"
git commit -m "docs: update API documentation"
```

### With Scope

```bash
git commit -m "feat(api): add user registration endpoint"
git commit -m "fix(ui): correct button alignment issue"
git commit -m "refactor(auth): simplify token validation logic"
```

### With Body

```bash
git commit -m "feat: add dark mode support

Implement theme switching with system preference detection.
Includes theme persistence in localStorage."
```

### Breaking Changes

```bash
git commit -m "feat(api)!: change authentication endpoint

BREAKING CHANGE: /auth/login endpoint now requires 2FA token"
```

Use `!` after type/scope or include `BREAKING CHANGE:` in footer.

## Scope (Optional)

Scope indicates the area of codebase affected:
- Component name: `feat(Button): ...`
- Package name: `feat(ui): ...`
- Module name: `fix(auth): ...`
- File area: `docs(api): ...`

## Best Practices

1. **Use imperative mood**: "add feature" not "added feature" or "adds feature"
2. **Lowercase description**: Start with lowercase (except after scope)
3. **No period**: Don't end description with a period
4. **Be specific**: Clear, concise description of what changed
5. **Use scope**: Include scope when it adds clarity

## Quick Reference

| Type | When to Use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting, style |
| `refactor` | Code restructuring |
| `perf` | Performance |
| `test` | Tests |
| `build` | Build system |
| `ci` | CI/CD |
| `chore` | Maintenance |

## Common Patterns

```bash
# Feature
git commit -m "feat: implement user dashboard"

# Bug fix
git commit -m "fix: prevent null pointer in user service"

# Documentation
git commit -m "docs: add setup instructions to README"

# Refactoring
git commit -m "refactor: extract validation logic to separate module"

# With scope
git commit -m "feat(ui): add loading spinner component"
git commit -m "fix(api): handle edge case in error handling"
```

## Breaking Changes

Indicate breaking changes with `!` after type/scope:

```bash
git commit -m "feat(api)!: change response format"
```

Or in the footer:

```bash
git commit -m "feat: update authentication flow

BREAKING CHANGE: Session tokens now expire after 1 hour instead of 24 hours"
```

## References

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
