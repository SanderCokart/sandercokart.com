---
name: writing-skills
description: Guidelines for creating Agent Skills following the official Agent Skills specification. Use when creating new skills, validating skill structure, or understanding the SKILL.md format.
---

# Writing Agent Skills

This guide helps you create Agent Skills that follow the official [Agent Skills specification](https://agentskills.io/specification). Agent Skills are folders containing instructions, scripts, and resources that agents can discover and use to extend their capabilities.

## Overview

Agent Skills use **progressive disclosure** to manage context efficiently:
1. **Discovery**: Agents load only name and description at startup
2. **Activation**: When relevant, agents load the full `SKILL.md` instructions
3. **Execution**: Agents follow instructions and load referenced files as needed

## Quick Start

### Basic Structure

A skill is a directory containing at minimum a `SKILL.md` file:

```
skill-name/
└── SKILL.md          # Required
```

You can optionally include additional directories:

```
skill-name/
├── SKILL.md          # Required: instructions + metadata
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
└── assets/           # Optional: templates, resources
```

### Required Frontmatter

Every `SKILL.md` must start with YAML frontmatter:

```yaml
---
name: skill-name
description: A description of what this skill does and when to use it.
---
```

**Key requirements:**
- `name`: 1-64 characters, lowercase letters/numbers/hyphens only, must match directory name
- `description`: 1-1024 characters, describes what the skill does and when to use it

See [Frontmatter Specification](references/frontmatter.md) for complete field details.

### Creating a New Skill

1. Create directory: `mkdir -p .cursor/skills/your-skill-name`
2. Create `SKILL.md` with required frontmatter
3. Write instructions in Markdown
4. Add optional resources if needed (scripts, references, assets)
5. Validate your skill structure

See [Step-by-Step Guide](references/creation-guide.md) for detailed instructions.

## Content Guidelines

### Keep It Focused

- **Main file**: Keep `SKILL.md` under 500 lines
- **Move details**: Put detailed reference material in `references/` files
- **Progressive loading**: Agents load reference files only when needed

### File References

When referencing other files, use relative paths from the skill root:

```markdown
See [the frontmatter specification](references/frontmatter.md) for details.
```

Keep file references one level deep from `SKILL.md`.

## Reference Documentation

This skill includes detailed reference files that are loaded on demand:

- **[Frontmatter Specification](references/frontmatter.md)**: Complete details on all frontmatter fields (`name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`)
- **[Step-by-Step Creation Guide](references/creation-guide.md)**: Detailed walkthrough for creating new skills
- **[Best Practices & Patterns](references/best-practices.md)**: Content organization, common patterns, and writing guidelines
- **[Troubleshooting](references/troubleshooting.md)**: Common issues and solutions
- **[Validation Checklist](references/validation.md)**: Pre-flight checks before finalizing a skill

## Optional Directories

### `scripts/`

Contains executable code that agents can run. Scripts should be self-contained, include helpful error messages, and handle edge cases gracefully.

### `references/`

Contains additional documentation loaded on demand. Keep individual files focused - smaller files mean less context usage.

### `assets/`

Contains static resources like templates, images, or data files.

## External References

- [Agent Skills Home](https://agentskills.io/home)
- [What are Skills?](https://agentskills.io/what-are-skills)
- [Specification](https://agentskills.io/specification)
- [Integration Guide](https://agentskills.io/integrate-skills)
- [Example Skills on GitHub](https://github.com/agentskills/agentskills)
