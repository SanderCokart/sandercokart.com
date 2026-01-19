# Best Practices & Patterns

Guidelines for writing effective Agent Skills with proper content organization.

## Writing Effective Descriptions

A good description helps agents identify when to use your skill. Include:

1. **What it does**: Clear statement of the skill's purpose
2. **When to use it**: Specific scenarios or keywords
3. **Key capabilities**: Main features or functions

**Good example:**
```yaml
description: Creates new packages in the monorepo with proper Turborepo, TypeScript, and ESLint configuration. Use when the user wants to create a new package, add a workspace, or set up a new library in the packages directory.
```

**Poor example:**
```yaml
description: Helps with packages.
```

## Content Organization Tips

1. **Start with overview**: Give context before diving into details
2. **Use clear headings**: Help agents navigate the content
3. **Include examples**: Show, don't just tell
4. **Break into sections**: Use logical groupings
5. **Reference external docs**: Link to official documentation
6. **Keep it focused**: One skill = one primary purpose
7. **Progressive disclosure**: Move details to `references/` files

## Common Patterns

### Pattern 1: Task-Oriented Skill

For skills that help with specific tasks:

```markdown
---
name: task-name
description: Performs [specific task]. Use when [scenario].
---

# Task Name

## Overview
Brief explanation of what this task accomplishes and why it's useful.

## Step-by-Step Guide
1. First step with clear instructions
2. Second step with details
3. Final step with validation

## Examples
[Code examples showing input and output]

## Best Practices
[Guidelines for using this skill effectively]
```

### Pattern 2: Reference Skill

For skills that provide knowledge or reference:

```markdown
---
name: reference-topic
description: Provides [knowledge area]. Use when [scenario].
---

# Reference Topic

## Overview
[Context and background information]

## Key Concepts
[Main ideas and principles]

## Examples
[Practical examples]

## References
[Links to official documentation]
```

### Pattern 3: Workflow Skill

For skills that guide multi-step processes:

```markdown
---
name: workflow-name
description: Guides [process]. Use when [scenario].
---

# Workflow Name

## Overview
[Process description and purpose]

## Prerequisites
[Requirements before starting]

## Workflow Steps
1. Step one with details
2. Step two with details
3. Final step with validation

## Validation
[How to verify success]
```

## Best Practices Checklist

1. **Naming**: Use kebab-case, be descriptive but concise
2. **Descriptions**: Include keywords agents can match against
3. **Structure**: Organize content logically with clear sections
4. **Examples**: Include practical, copy-pasteable examples
5. **References**: Link to official documentation when available
6. **Length**: Keep main file focused; move details to references/
7. **Clarity**: Write for both agents and humans (skills are self-documenting)
8. **Progressive disclosure**: Use `references/` for detailed content
9. **File organization**: Keep related files together, use clear names
10. **Testing**: Validate your skill structure before using

## Progressive Disclosure Strategy

Structure your skill for efficient context usage:

1. **Metadata** (~100 tokens): `name` and `description` loaded at startup
2. **Instructions** (< 5000 tokens recommended): Full `SKILL.md` body loaded when activated
3. **Resources** (as needed): Files in `scripts/`, `references/`, or `assets/` loaded only when required

**When to split content:**
- Detailed specifications → `references/specification.md`
- Multiple examples → `references/examples.md`
- Troubleshooting guide → `references/troubleshooting.md`
- Advanced topics → `references/advanced.md`

## Writing Style Guidelines

### For Agents

- Use clear, direct language
- Include specific keywords in descriptions
- Structure content with clear headings
- Provide step-by-step instructions
- Include validation steps

### For Humans

- Skills are self-documenting
- Write as if someone will read and maintain the skill
- Include context and rationale, not just steps
- Add comments in code examples
- Explain "why" not just "how"

## Example Structure

Here's an example of a well-organized skill:

```
skill-name/
├── SKILL.md                    # Main file (< 500 lines)
│   ├── Overview
│   ├── Quick Start
│   ├── Basic Usage
│   └── References to detailed docs
├── references/
│   ├── frontmatter.md          # Detailed spec
│   ├── advanced-usage.md        # Advanced topics
│   └── troubleshooting.md       # Common issues
├── scripts/
│   └── helper.sh                # Utility scripts
└── assets/
    └── template.json            # Example templates
```

## Content Length Guidelines

- **SKILL.md**: Keep under 500 lines, ideally 200-300 lines
- **Reference files**: 100-300 lines each, focused on single topics
- **Examples**: Include 2-3 practical examples in main file, more in `references/examples.md` if needed

## Common Content Sections

Consider including these sections when relevant:

- **Overview**: What and why
- **Prerequisites**: Requirements
- **Quick Start**: Get started quickly
- **Step-by-Step Guide**: Detailed procedures
- **Examples**: Practical examples
- **Best Practices**: Recommended approaches
- **Common Issues**: Troubleshooting
- **Advanced Usage**: Advanced topics (move to references/)
- **References**: External documentation

## File Naming Conventions

- **Reference files**: Use kebab-case, descriptive names
  - `frontmatter.md`
  - `best-practices.md`
  - `troubleshooting.md`
- **Scripts**: Use appropriate extensions
  - `setup.sh`
  - `validate.py`
  - `helper.js`
- **Assets**: Use descriptive names
  - `template.json`
  - `schema.yaml`
  - `example-config.toml`
