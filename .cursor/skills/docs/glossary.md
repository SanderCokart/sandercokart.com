# Glossary (inline rich-text terms)

Explain jargon inline: **tooltip on desktop**, **bottom drawer on mobile**. Terms are auto-discovered from translation keys - no TypeScript changes when adding a term.

## Quick start

```tsx
'use client';

import { useGlossaryRichText } from '@repo/toolbox/glossary/use-glossary-rich-text';
import { useTranslations } from 'next-intl';

export function MySection() {
  const t = useTranslations('BespokeWhyChooseSection');
  const richText = useGlossaryRichText();

  return <p>{t.rich('faq_content_editing_answer', richText)}</p>;
}
```

## Adding a term (JSON only)

1. Add `{term}_description` under the `Glossary` namespace in **both** `messages/en.json` and `messages/nl.json`.
2. Wrap the term in your rich string with `<term>...</term>` (tag name must match the key prefix).

Example - adding `seo`:

```json
{
  "Glossary": {
    "cms_description": "A CMS lets you update website content without editing code.",
    "seo_description": "Search engine optimization improves visibility in search results."
  },
  "BespokeWhyChooseSection": {
    "faq_content_editing_answer": "We optimize your site for <seo>SEO</seo> and keep it <highlight>fast</highlight>."
  }
}
```

No code changes: `<seo>` is wired automatically from `seo_description`.

## Translation conventions

| Pattern | Purpose |
|---------|---------|
| `Glossary.{term}_description` | Tooltip/drawer body text |
| `<{term}>...</{term}>` | Glossary trigger in `t.rich()` strings |
| `<highlight>...</highlight>` | Emphasized text (not a glossary term) |

## API reference

**Package:** `@repo/toolbox/glossary/*`

### `useGlossaryRichText(options?)`

Returns handlers for `t.rich(key, richText)`:

| Option | Default | Description |
|--------|---------|-------------|
| `highlightClassName` | `text-primary dark:text-accent` | Classes for `<highlight>` and glossary triggers |
| `glossaryNamespace` | `Glossary` | Namespace containing `{term}_description` keys |

Handlers include `highlight` plus one handler per discovered term (e.g. `cms`, `seo`).

### `GlossaryTerm`

Lower-level component when not using `t.rich()`:

| Prop | Default | Description |
|------|---------|-------------|
| `term` | - | Key prefix; looks up `{term}_description` |
| `namespace` | `Glossary` | Translation namespace |
| `className` | - | Extra trigger classes |

## Example (codehouse)

**`messages/en.json`:**

```json
{
  "Glossary": {
    "cms_description": "A Content Management System (CMS) is software that lets you update website content-such as text, images, and certain sections-without editing code."
  },
  "BespokeWhyChooseSection": {
    "faq_content_editing_answer": "Yes, if you want. We can provide a <cms>content management system (CMS)</cms> so you can update text, images, and certain sections on your own. What you trade for that simplicity is a site that is <highlight>fully customizable</highlight> to your precise requirements."
  }
}
```

**Component:** `consumers-why-choose-section.tsx` - `useGlossaryRichText()` + `t.rich(faq.answer, richText)`.
