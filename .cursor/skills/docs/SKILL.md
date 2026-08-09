---
name: docs
description: Index of internal monorepo documentation. Use when implementing or extending documented features (glossary, themes, etc.) or when component JSDoc @see links point here.
---

# Internal Documentation

Repo-internal docs for agents and developers - not user-facing product documentation.

## Document index

| Topic    | File                       | Summary                                                                |
| -------- | -------------------------- | ---------------------------------------------------------------------- |
| Glossary | [glossary.md](glossary.md) | Inline glossary terms in `next-intl` rich text via `@repo/toolbox`     |
| Themes   | [themes.md](themes.md)     | Dark/light mode via `@wrksz/themes` (replaces abandoned `next-themes`) |
| PPR      | [ppr.md](ppr.md)           | Partial Prerendering + `next-intl` in `apps/codehouse` (`cacheComponents`) |

## Conventions

- Topic docs live alongside this index in `.cursor/skills/docs/`.
- Add a new row to the index when introducing a new internal doc.
- For general i18n rules (key naming, locale sync), see the [translations skill](../translations/SKILL.md).
