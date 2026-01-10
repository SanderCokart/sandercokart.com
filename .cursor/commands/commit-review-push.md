---
agent: agent
---
Create a commit message following the Conventional Commits specification (https://www.conventionalcommits.org/en/v1.0.0/). Use git status and git diff to gather information about the changes. Present the commit message for review. Ask the user to approve (Y) or reject (N). Upon approval, push the changes.

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

## Examples

### Simple feature commit
```
feat: add user authentication
```

### Bug fix with scope
```
fix(auth): resolve login timeout issue
```

### Breaking change with !
```
feat(api)!: remove deprecated endpoint
```

### Breaking change with footer
```
feat: allow config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

### Commit with body and footers
```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

### Documentation update
```
docs: correct spelling of CHANGELOG
```

Ensure the commit message accurately describes the changes made and follows this format.