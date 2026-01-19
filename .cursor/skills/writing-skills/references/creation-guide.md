# Step-by-Step: Creating a New Skill

Complete walkthrough for creating an Agent Skill from scratch.

## Prerequisites

- Understanding of the Agent Skills format (see main `SKILL.md`)
- Access to the `.cursor/skills/` directory
- Basic knowledge of YAML and Markdown

## Step 1: Create Directory Structure

Create a new directory for your skill. The directory name must:
- Use lowercase letters, numbers, and hyphens only
- Be 1-64 characters
- Not start or end with a hyphen
- Not contain consecutive hyphens

```bash
mkdir -p .cursor/skills/your-skill-name
cd .cursor/skills/your-skill-name
```

**Important:** The directory name will become the `name` field in your frontmatter. Choose a descriptive, kebab-case name.

**Examples:**
- ✅ `pdf-processing`
- ✅ `data-analysis`
- ✅ `code-review`
- ❌ `PDF-Processing` (uppercase)
- ❌ `pdf_processing` (underscores)
- ❌ `-pdf-processing` (starts with hyphen)

## Step 2: Create SKILL.md with Frontmatter

Create `SKILL.md` with the required frontmatter:

```markdown
---
name: your-skill-name
description: Brief description of what this skill does and when to use it.
---
```

**Key points:**
- The `name` field must exactly match the directory name
- The `description` should be 1-1024 characters
- Include keywords that help agents identify when to use the skill

See [Frontmatter Specification](frontmatter.md) for complete details on all fields.

## Step 3: Write Instructions

Add Markdown content after the frontmatter. Structure your content with:

- **Overview**: High-level explanation of the skill's purpose
- **Step-by-step guides**: Detailed procedures (if applicable)
- **Examples**: Input/output examples with code snippets
- **Best practices**: Recommended approaches
- **Common issues and solutions**: Troubleshooting guide (if applicable)
- **References**: Links to documentation, related files

**Content guidelines:**
- Keep the main `SKILL.md` under 500 lines
- Move detailed reference material to `references/` files
- Use clear headings to help agents navigate
- Include practical, copy-pasteable examples
- Write for both agents and humans (skills are self-documenting)

## Step 4: Add Optional Resources (if needed)

### Adding Scripts

If your skill includes executable code:

```bash
mkdir scripts
# Add executable files (Python, Bash, JavaScript, etc.)
```

Scripts should:
- Be self-contained or clearly document dependencies
- Include helpful error messages
- Handle edge cases gracefully

### Adding Reference Documentation

If you have detailed reference material:

```bash
mkdir references
# Add documentation files
```

Reference files should:
- Be focused on a single topic
- Be loaded on demand (agents won't load them unless referenced)
- Use clear, descriptive names

**Example structure:**
```
references/
├── frontmatter.md      # Detailed frontmatter spec
├── best-practices.md   # Best practices guide
└── troubleshooting.md  # Common issues
```

### Adding Assets

If you need templates, images, or data files:

```bash
mkdir assets
# Add static resources
```

## Step 5: Reference External Files

When referencing files in your skill, use relative paths from the skill root:

```markdown
See [the frontmatter specification](references/frontmatter.md) for details.

Run the extraction script:
scripts/extract.py
```

**Rules:**
- Use relative paths from the skill root
- Keep references one level deep from `SKILL.md`
- Avoid deeply nested reference chains

## Step 6: Validate Your Skill

### Manual Validation

Check the following:

- [ ] Directory name matches `name` field exactly (case-sensitive)
- [ ] `name` is valid (lowercase, hyphens, 1-64 chars, no consecutive hyphens)
- [ ] `description` is 1-1024 characters and describes what + when
- [ ] Frontmatter is valid YAML
- [ ] `SKILL.md` is well-structured with clear sections
- [ ] Examples are included and accurate
- [ ] File references use relative paths and are valid
- [ ] Optional directories are used appropriately
- [ ] Content is under 500 lines or properly split into references

### Using Validation Tools

If available, use the skills-ref library:

```bash
skills-ref validate ./your-skill-name
```

This checks:
- Frontmatter validity
- Naming conventions
- Required fields
- Format compliance

## Step 7: Test Your Skill

1. **Verify discovery**: Ensure the skill is discoverable by agents
2. **Check activation**: Verify the skill activates when relevant tasks are mentioned
3. **Test references**: Ensure referenced files load correctly
4. **Validate examples**: Test that code examples work as expected

## Example: Complete Skill Creation

Here's a complete example of creating a skill:

```bash
# Step 1: Create directory
mkdir -p .cursor/skills/pdf-processing
cd .cursor/skills/pdf-processing

# Step 2: Create SKILL.md
cat > SKILL.md << 'EOF'
---
name: pdf-processing
description: Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents.
---

# PDF Processing

## Overview
This skill helps you work with PDF files...

## How to Extract Text
[Instructions...]

See [detailed reference](references/extraction.md) for more information.
EOF

# Step 3: Create references directory
mkdir references

# Step 4: Add reference file
cat > references/extraction.md << 'EOF'
# PDF Text Extraction

Detailed instructions for extracting text...
EOF

# Step 5: Validate
# Check structure, frontmatter, and references
```

## Common Mistakes to Avoid

1. **Directory name mismatch**: Directory name doesn't match `name` field
2. **Invalid characters**: Using uppercase, underscores, or special characters in `name`
3. **Vague description**: Description doesn't help agents identify when to use the skill
4. **Too long**: Main `SKILL.md` exceeds 500 lines without splitting content
5. **Broken references**: File paths in references don't match actual files
6. **Missing frontmatter**: Forgetting required YAML frontmatter
7. **Invalid YAML**: Syntax errors in frontmatter

## Next Steps

After creating your skill:

1. Review [Best Practices & Patterns](best-practices.md) for content organization
2. Check [Troubleshooting](troubleshooting.md) if you encounter issues
3. Use [Validation Checklist](validation.md) before finalizing
4. Test the skill with actual tasks to ensure it works as expected
