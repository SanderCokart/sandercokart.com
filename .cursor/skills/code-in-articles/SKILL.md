---
name: code-in-articles
description: Create and format code examples in articles using Shiki syntax highlighting. Use when writing articles with code blocks, focusing on proper language-specific comments, highlighting, and code presentation best practices.
---

# Shiki Transformers for Code Highlighting

## Overview

This skill guides the use of Shiki syntax highlighting with enabled transformers when creating articles and documentation. Shiki provides fast, accurate syntax highlighting with support for transformers that can highlight specific lines, focus on code sections, and add interactive features.

## Key Transformers

### Code Focus Transformer

The code focus transformer allows highlighting specific lines or ranges of code to draw attention to important sections.

#### Language-Specific Comment Syntax

**CRITICAL**: Always use comments appropriate for the target programming language. Do not use JavaScript-style `//` comments in non-JavaScript languages.

| Language | Comment Syntax | Example |
|----------|----------------|---------|
| JavaScript | `// [!code focus]` | `// [!code focus]`<br>`const important = "line";` |
| TypeScript | `// [!code focus]` | `// [!code focus]`<br>`const important: string = "line";` |
| TSX/JSX | `{/* [!code focus] */}` | `{/* [!code focus] */}`<br>`<Component prop="value" />` |
| HTML | `<!-- [!code focus] -->` | `<!-- [!code focus] -->`<br>`<div>important content</div>` |
| CSS | `/* [!code focus] */` | `/* [!code focus] */`<br>`.important { color: red; }` |
| Python | `# [!code focus]` | `# [!code focus]`<br>`important_variable = "value"` |
| PHP | `// [!code focus]` or `# [!code focus]` | `// [!code focus]`<br>`$important = "variable";` |
| Bash/Shell | `# [!code focus]` | `# [!code focus]`<br>`echo "important command"` |

#### Range Highlighting

For highlighting multiple consecutive lines:

```tsx
{/* [!code focus:1:3] */}
function Component() {
  const value = "highlighted"; // This line is highlighted
  return <div>{value}</div>;    // This line is highlighted
}                               // This line is highlighted
```

#### Multiple Focus Areas

You can have multiple focus areas in the same code block:

```tsx
function Example() {
  {/* [!code focus] */}
  const highlighted = "important";

  const normal = "not highlighted";

  {/* [!code focus] */}
  const anotherHighlight = "also important";
}
```

### Line Highlighting Transformer

For simpler line highlighting without the focus styling:

```javascript
function example() {
  console.log("normal line");
  // [!code highlight]
  console.log("highlighted line");
  console.log("normal line");
}
```

## Usage in Articles

### MDX Articles

When writing articles in MDX format, use proper code block syntax with language specification:

````markdown
```tsx
{/* [!code focus] */}
export default function MyComponent() {
  return <div>Hello World</div>;
}
```
````

### Blog Posts and Documentation

For technical blog posts, use focus highlighting to guide readers through code examples:

1. **Setup/Import statements**: Usually not focused
2. **Key implementation**: Use focus highlighting
3. **Important concepts**: Highlight to draw attention

### Best Practices

#### Do's
- ✅ Use language-appropriate comment syntax
- ✅ Focus on the most important 1-3 lines per code block
- ✅ Use consistent highlighting patterns across related examples
- ✅ Test highlighting in the actual rendered output

#### Don'ts
- ❌ Don't overuse highlighting (keep it sparse and meaningful)
- ❌ Don't use `// [!code focus]` in TSX/JSX - use `{/* [!code focus] */}` instead
- ❌ Don't highlight entire functions unless the whole function is the key point
- ❌ Don't mix comment styles within the same language block

## Common Patterns

### Component Examples
```tsx
import React from 'react';

export function UserProfile({ user }) {
  {/* [!code focus] */}
  const displayName = user.name || 'Anonymous';

  return (
    <div className="profile">
      {/* [!code focus] */}
      <h1>{displayName}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### API Integration
```typescript
export async function fetchUser(id: string) {
  try {
    // [!code focus]
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

### Configuration Objects
```javascript
const config = {
  api: {
    baseURL: process.env.API_URL,
    // [!code focus]
    timeout: 5000,
    retries: 3,
  },
  features: {
    darkMode: true,
    notifications: false,
  }
};
```

## Troubleshooting

### Common Issues

1. **Wrong comment syntax**: TSX code blocks render incorrectly when using `//` instead of `{/* */}`
2. **No highlighting visible**: Ensure the comment is on the exact line you want highlighted
3. **Multiple languages in one block**: Use the appropriate comment syntax for each language section

### Testing

Always preview your articles to verify:
- Syntax highlighting works correctly
- Focus highlighting appears as expected
- Code is readable and properly formatted

## Additional Transformers

### Other Available Transformers

- **Line Numbers**: Automatic line numbering for code blocks
- **Copy Button**: Adds copy-to-clipboard functionality
- **Word Highlight**: Highlight specific words or patterns
- **Error/Warning Indicators**: Mark lines with errors or warnings

Use these additional transformers sparingly to avoid cluttering the code presentation.