# Troubleshooting

Common issues when creating Agent Skills and how to resolve them.

## Skill Not Being Discovered

### Symptoms
- Skill doesn't appear in agent's available skills
- Agent doesn't recognize when to use the skill

### Possible Causes

1. **Directory name mismatch**
   - Directory name doesn't exactly match `name` field in frontmatter
   - Case sensitivity issues

2. **Invalid `name` field**
   - Contains invalid characters (uppercase, underscores, special chars)
   - Starts or ends with hyphen
   - Contains consecutive hyphens
   - Exceeds 64 characters

3. **Missing or invalid frontmatter**
   - `SKILL.md` missing required frontmatter
   - YAML syntax errors in frontmatter
   - Missing required fields (`name` or `description`)

### Solutions

1. **Verify directory name matches `name` field exactly:**
   ```bash
   # Check directory name
   ls -la .cursor/skills/
   
   # Check name field in SKILL.md
   head -5 .cursor/skills/your-skill/SKILL.md
   ```

2. **Validate `name` field:**
   - Use only lowercase letters, numbers, and hyphens
   - Ensure it's 1-64 characters
   - No leading/trailing hyphens
   - No consecutive hyphens

3. **Check frontmatter format:**
   ```yaml
   ---
   name: your-skill-name
   description: Your description here
   ---
   ```
   - Ensure YAML is valid
   - Check for missing colons, quotes, or indentation issues

## Description Too Vague

### Problem
Agents can't determine when to use the skill because the description lacks specific keywords or scenarios.

### Symptoms
- Skill rarely activates
- Agent doesn't recognize relevant tasks

### Solution

Include specific keywords and scenarios in the description:

**Poor:**
```yaml
description: Helps with PDFs.
```

**Good:**
```yaml
description: Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.
```

**Tips:**
- Start with what the skill does
- Include when to use it (specific scenarios)
- Mention key capabilities
- Use action verbs

## SKILL.md Too Long

### Problem
Large files consume too much context, making the skill inefficient.

### Symptoms
- Skill takes too long to load
- High token usage
- Agent performance issues

### Solution

Split detailed content into `references/` files:

1. **Identify detailed sections:**
   - Long specifications
   - Multiple examples
   - Detailed troubleshooting
   - Advanced topics

2. **Move to reference files:**
   ```bash
   mkdir references
   # Move detailed content to references/detailed-topic.md
   ```

3. **Reference from main file:**
   ```markdown
   See [detailed specification](references/specification.md) for complete details.
   ```

4. **Keep main file focused:**
   - Overview
   - Quick start
   - Basic usage
   - References to detailed docs

## File References Broken

### Problem
Referenced files can't be found when agents try to load them.

### Symptoms
- Errors when loading referenced files
- Missing documentation
- Broken links

### Solutions

1. **Use relative paths from skill root:**
   ```markdown
   ✅ Correct: [reference](references/frontmatter.md)
   ❌ Wrong: [reference](/references/frontmatter.md)
   ❌ Wrong: [reference](../references/frontmatter.md)
   ```

2. **Verify file exists:**
   ```bash
   # Check if file exists
   ls -la .cursor/skills/your-skill/references/frontmatter.md
   ```

3. **Keep references one level deep:**
   - ✅ `references/file.md`
   - ❌ `references/subdir/file.md` (too deep)

4. **Use correct file extensions:**
   - Ensure file extensions match (`.md`, not `.txt`)

## Invalid YAML Frontmatter

### Problem
YAML syntax errors prevent the skill from being parsed.

### Symptoms
- Skill fails to load
- Frontmatter parsing errors
- Missing metadata

### Common YAML Errors

1. **Missing colons:**
   ```yaml
   ❌ name your-skill
   ✅ name: your-skill
   ```

2. **Incorrect indentation:**
   ```yaml
   ❌ metadata:
      author: example
     version: "1.0"
   ✅ metadata:
     author: example
     version: "1.0"
   ```

3. **Unquoted special values:**
   ```yaml
   ❌ version: 1.0
   ✅ version: "1.0"
   ```

4. **Missing closing `---`:**
   ```yaml
   ❌ ---
   name: skill
   ✅ ---
   name: skill
   ---
   ```

### Solution

Validate YAML syntax:
```bash
# Use a YAML validator
yamllint .cursor/skills/your-skill/SKILL.md
```

Or use online YAML validators to check syntax.

## Skill Activates Too Often

### Problem
Skill activates for tasks it shouldn't handle.

### Solution

Make the description more specific:

**Too broad:**
```yaml
description: Helps with code.
```

**Better:**
```yaml
description: Reviews TypeScript code for common errors and suggests improvements. Use when the user asks for code review, wants to check code quality, or needs help finding bugs in TypeScript files.
```

Include:
- Specific technology/language
- Specific use cases
- When NOT to use it (if relevant)

## Examples Don't Work

### Problem
Code examples in the skill don't work as expected.

### Solutions

1. **Test examples:**
   - Run code examples before including them
   - Verify they work in the intended environment

2. **Include context:**
   - Show required imports
   - Include setup steps
   - Mention dependencies

3. **Update examples:**
   - Keep examples current with latest versions
   - Test after dependency updates

## Validation Checklist

Before reporting issues, verify:

- [ ] Directory name matches `name` field exactly
- [ ] `name` field is valid (lowercase, hyphens, 1-64 chars)
- [ ] `description` is 1-1024 characters
- [ ] Frontmatter is valid YAML
- [ ] All file references use relative paths
- [ ] Referenced files exist
- [ ] Examples are tested and working
- [ ] Content is properly organized

## Getting Help

If you've checked the above and still have issues:

1. Review the [Specification](https://agentskills.io/specification)
2. Check [Example Skills](https://github.com/agentskills/agentskills)
3. Validate your skill structure
4. Compare with working skills in `.cursor/skills/`
