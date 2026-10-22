---
name: translations
description: "Codehouse translations with next-intl: reading and editing messages via script, key naming, locale sync, Zod messages, and i18n navigation imports."
---

# Translations (`apps/codehouse`)

Messages: `apps/codehouse/messages/{en,nl}.json`. Locales: `src/i18n/config.ts` (the root `i18n.config.ts` is unused).

## Use the script, not the files

The message files are ~45 KB each. Do not read them whole or page through them. Use [`scripts/i18n.mjs`](scripts/i18n.mjs) from the repo root (`node .cursor/skills/translations/scripts/i18n.mjs …`):

- `keys` — namespaces with key counts
- `get <Namespace[.key]>` — en + nl side by side
- `find <text>` — locate a key by key name or copy
- `set <Namespace.key> --en "…" --nl "…"` — write both locales at once
- `rm <path>` / `missing` — remove a key, or check the locales are in sync

## Keys

- First level: component name in `PascalCase` (`FreelanceHero`, `Footer`), or a shared namespace (`common`, `form`, `formMessages`, `zod`).
- Second level: descriptive names; nest deeper with `_` (`section_items_item_1_label`). Never use the copy itself as a key.
- Every key exists in **all** locales. Add, change and remove in both (`set` / `rm` do this). Use `TODO: <key>` only when a translation is truly unknown.

## Using messages

- Client/shared components: `const t = useTranslations('Namespace')`, then `t('key')`.
- Server components and metadata: `await getTranslations('Namespace')` from `next-intl/server`.
- Zod: build the schema inside the component and pass messages from the `zod` namespace, e.g. `tZod('errors.required', { name: tForm('contact') })` (see `consumer/(sections)/ask-for-a-quote.tsx`). There is no global error map.
- Types come from `global.d.ts` (`AppConfig.Messages = typeof en`), so a missing `en` key is a type error.

## Navigation

Import `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` from `@/i18n/navigation`, never from `next-intl/navigation` or `next/link` — the wrappers apply the locale routing.
