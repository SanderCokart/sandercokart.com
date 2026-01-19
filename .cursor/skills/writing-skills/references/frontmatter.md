# Frontmatter Specification

Complete reference for all frontmatter fields in `SKILL.md`.

## Required Fields

### `name` (Required)

- **Constraints:**
  - Must be 1-64 characters
  - Lowercase letters, numbers, and hyphens only (`a-z`, `0-9`, `-`)
  - Must not start or end with a hyphen
  - Must not contain consecutive hyphens (`--`)
  - **Must match the parent directory name**

**Valid examples:**
- `pdf-processing`
- `data-analysis`
- `code-review`

**Invalid examples:**
- `PDF-Processing` (uppercase not allowed)
- `-pdf` (cannot start with hyphen)
- `pdf--processing` (consecutive hyphens not allowed)
- `pdf_processing` (underscores not allowed)

### `description` (Required)

- **Constraints:**
  - Must be 1-1024 characters
  - Non-empty
  - Should describe both **what** the skill does and **when** to use it
  - Should include specific keywords that help agents identify relevant tasks

**Good example:**
```yaml
description: Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.
```

**Poor example:**
```yaml
description: Helps with PDFs.
```

**Writing tips:**
1. Start with what the skill does
2. Include when to use it (specific scenarios or keywords)
3. Mention key capabilities or features
4. Use action verbs and be specific

## Optional Fields

### `license` (Optional)

Specifies the license applied to the skill. Keep it short (either the name of a license or reference to a bundled license file).

**Examples:**
```yaml
license: Apache-2.0
```

```yaml
license: MIT
```

```yaml
license: Proprietary. LICENSE.txt has complete terms
```

### `compatibility` (Optional)

- **Constraints:**
  - Must be 1-500 characters if provided
  - Should only be included if your skill has specific environment requirements
  - Can indicate intended product, required system packages, network access needs, etc.

**Examples:**
```yaml
compatibility: Designed for Claude Code (or similar products)
```

```yaml
compatibility: Requires git, docker, jq, and access to the internet
```

```yaml
compatibility: Works with Python 3.8+ and requires pandas library
```

**Note:** Most skills do not need the `compatibility` field. Only include it if your skill has specific requirements that might prevent it from working in certain environments.

### `metadata` (Optional)

A map from string keys to string values for additional properties not defined by the spec. Use reasonably unique key names to avoid conflicts.

**Examples:**
```yaml
metadata:
  author: example-org
  version: "1.0"
```

```yaml
metadata:
  author: my-team
  version: "2.1.0"
  category: development
  tags: typescript, monorepo
```

**Best practices:**
- Use lowercase keys with hyphens or underscores
- Keep values as strings (even for numbers or booleans)
- Use unique prefixes if creating custom metadata fields
- Document any custom metadata fields in your skill's documentation

### `allowed-tools` (Optional, Experimental)

A space-delimited list of tools that are pre-approved to run. Support may vary between agent implementations.

**Example:**
```yaml
allowed-tools: Bash(git:*) Bash(jq:*) Read
```

**Note:** This field is experimental and support varies. Check your agent's documentation before using this field.

## Complete Frontmatter Example

```yaml
---
name: pdf-processing
description: Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.
license: Apache-2.0
compatibility: Requires Python 3.8+ and pdfplumber library
metadata:
  author: example-org
  version: "1.0"
  category: document-processing
---
```

## Validation Rules Summary

| Field         | Required | Max Length | Allowed Characters | Other Constraints |
|---------------|----------|------------|-------------------|-------------------|
| `name`        | Yes      | 64         | `a-z`, `0-9`, `-` | No leading/trailing hyphens, no consecutive hyphens, must match directory |
| `description` | Yes      | 1024       | Any               | Non-empty         |
| `license`     | No       | -          | Any               | Keep it short     |
| `compatibility` | No    | 500        | Any               | Only if needed    |
| `metadata`    | No       | -          | String key-value  | Use unique keys   |
| `allowed-tools` | No    | -          | Space-delimited   | Experimental      |
