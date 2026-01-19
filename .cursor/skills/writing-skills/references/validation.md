# Validation Checklist

Pre-flight checks before finalizing your Agent Skill.

## Pre-Creation Checklist

Before creating your skill, ensure:

- [ ] You understand the Agent Skills format
- [ ] You have a clear purpose for the skill
- [ ] You've checked if a similar skill already exists
- [ ] You have a good name in mind (kebab-case, descriptive)

## Directory Structure

- [ ] Directory created in `.cursor/skills/`
- [ ] Directory name uses kebab-case (lowercase, hyphens only)
- [ ] Directory name is 1-64 characters
- [ ] Directory name doesn't start or end with hyphen
- [ ] Directory name has no consecutive hyphens
- [ ] `SKILL.md` file exists in the directory

## Frontmatter Validation

### Required Fields

- [ ] `name` field exists
- [ ] `name` exactly matches directory name (case-sensitive)
- [ ] `name` is 1-64 characters
- [ ] `name` uses only lowercase letters, numbers, and hyphens
- [ ] `name` doesn't start or end with hyphen
- [ ] `name` has no consecutive hyphens
- [ ] `description` field exists
- [ ] `description` is 1-1024 characters
- [ ] `description` is non-empty
- [ ] `description` describes what the skill does
- [ ] `description` includes when to use the skill
- [ ] `description` includes relevant keywords

### Optional Fields (if used)

- [ ] `license` is short and clear (if provided)
- [ ] `compatibility` is 1-500 characters (if provided)
- [ ] `metadata` uses string key-value pairs (if provided)
- [ ] `allowed-tools` is space-delimited (if provided, experimental)

### YAML Format

- [ ] Frontmatter starts with `---`
- [ ] Frontmatter ends with `---`
- [ ] YAML syntax is valid
- [ ] No missing colons
- [ ] Correct indentation
- [ ] Special values are quoted (e.g., version numbers)

## Content Validation

### SKILL.md Structure

- [ ] Content is well-organized with clear headings
- [ ] Overview section explains the skill's purpose
- [ ] Instructions are clear and actionable
- [ ] Examples are included and practical
- [ ] File references use relative paths
- [ ] Content is under 500 lines (or properly split)

### Content Quality

- [ ] Writing is clear and concise
- [ ] Examples are tested and work
- [ ] Code snippets are properly formatted
- [ ] Links to external docs are valid
- [ ] References to other files are correct

## File References

- [ ] All file references use relative paths from skill root
- [ ] Referenced files actually exist
- [ ] File paths are one level deep (e.g., `references/file.md`)
- [ ] No broken links
- [ ] File extensions are correct

## Optional Directories

### scripts/ (if used)

- [ ] Scripts are self-contained or document dependencies
- [ ] Scripts include helpful error messages
- [ ] Scripts handle edge cases
- [ ] Scripts have appropriate file extensions

### references/ (if used)

- [ ] Reference files are focused on single topics
- [ ] Reference files have descriptive names
- [ ] Reference files are referenced from main `SKILL.md`
- [ ] Reference files are reasonably sized (< 500 lines each)

### assets/ (if used)

- [ ] Assets are necessary and useful
- [ ] Assets are referenced from `SKILL.md` or reference files
- [ ] Assets have descriptive names

## Progressive Disclosure

- [ ] Main `SKILL.md` is focused and concise
- [ ] Detailed content is in `references/` files
- [ ] File references are used appropriately
- [ ] Skill follows progressive disclosure principles

## Testing

- [ ] Skill is discoverable by agents
- [ ] Skill activates for relevant tasks
- [ ] Referenced files load correctly
- [ ] Examples work as expected
- [ ] Code snippets are valid

## Final Checks

- [ ] All validation items above are checked
- [ ] Skill follows best practices
- [ ] Skill is ready for use
- [ ] Documentation is complete

## Quick Validation Command

If you have access to validation tools:

```bash
# Validate skill structure
skills-ref validate ./your-skill-name
```

This checks:
- Frontmatter validity
- Naming conventions
- Required fields
- Format compliance

## Manual Validation Steps

1. **Check directory name:**
   ```bash
   ls -la .cursor/skills/your-skill-name
   ```

2. **Verify frontmatter:**
   ```bash
   head -10 .cursor/skills/your-skill-name/SKILL.md
   ```

3. **Check file references:**
   ```bash
   grep -r "references/" .cursor/skills/your-skill-name/SKILL.md
   # Verify each referenced file exists
   ```

4. **Validate YAML:**
   - Use a YAML validator or linter
   - Check for syntax errors

5. **Test examples:**
   - Run code examples
   - Verify they work as expected

## Common Validation Failures

### Name Field Issues

- ❌ Directory: `PDF-Processing`, name: `pdf-processing` → Case mismatch
- ❌ Directory: `pdf_processing`, name: `pdf-processing` → Invalid characters
- ❌ Directory: `pdf-processing`, name: `pdf--processing` → Consecutive hyphens

### Description Issues

- ❌ Too short: `description: Helps.`
- ❌ Too vague: `description: Does stuff.`
- ❌ Missing "when": `description: Processes files.` (should include when to use)

### File Reference Issues

- ❌ Absolute path: `/references/file.md`
- ❌ Wrong depth: `references/subdir/file.md`
- ❌ Missing file: References file that doesn't exist

## Post-Validation

After validation passes:

1. Test the skill with actual tasks
2. Monitor agent behavior when skill is used
3. Gather feedback and iterate
4. Update skill as needed
