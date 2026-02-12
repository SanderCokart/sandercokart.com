---
name: code-in-articles-using-shiki
description: Guidelines for using Shiki to highlight code in articles.
---

# Functionalities

In mdx articles in apps/main we use [Shiki Transformers](https://shiki.style/packages/transformers) to highlight code or draw attention to specific lines of code.

## Highlighting Code

In order to highlicht code there are 3 ways.

1. commenting inline code with for example: `// [!code focus]`
2. using meta syntax like `tsx {1,5}`
3. using block syntax like /_[!code focus]_/, this is to be plcaed above the line you want to highlight.

### Example of highlighting code

#### JS or TS

This highlights only the variable1 declaration.

```
const variable1 = 'value'; // [!code focus]
const variable2 = 'value2';
```

#### JSX or TSX

This highlights only the p tag.

```
return (
  <div>
    {/*[!code focus]*/}
    <p>text</p>
  </div>
)
```

## Focusing on specific lines of code

### Example of inline focus
