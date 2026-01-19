---
description: "Guidelines for managing translations in the monorepo, including file structure, key naming, Zod error handling, and synchronization across locales."
---

# Translation Management Guidelines

This skill outlines the recommended practices for managing translations across the monorepo, ensuring consistency, maintainability, and proper integration with `next-intl` and Zod validation.

## 1. Translation File Structure

Each application in `@apps` must maintain its translations in a `messages` folder at its root.

-   **Main translations:** `messages/{locale}.json` (This file will now also contain Zod validation translations under a top-level `zod` key).

**Example:**
-   `apps/codehouse/messages/en.json`
-   `apps/codehouse/messages/nl.json`

## 2. Translation Key Pattern

Translations are organized in a two-level structure:

-   **First Level:** Component name in `PascalCase` (e.g., `BespokeHeroSection`), or `zod` for shared Zod errors.
-   **Second Level (Nested):** Descriptive names (e.g., `title`, `description`). For deeper nesting, use `_` as a separator (e.g., `SubComponentName_key`).

**Do not use actual translation text as a key.**

**Example JSON Structure (including Zod errors):**

```json
{
  "ComponentName": {
    "title": "This is the title.",
    "section_subtitle": "A subtitle here.",
    "section_items_item_1_label": "Item 1 label."
  },
  "Footer": {
    "Address_kvk": "KvK number",
    "Copyright_message": "© Sander's CodeHouse {date} All rights reserved."
  },
  "zod": {
    "errors": {
      "string_min": "Must be at least {min} characters long",
      "string_max": "Must be at most {max} characters long",
      "string_email": "Invalid email address",
      "string_required": "This field is required",
      "number_min": "Must be at least {min}",
      "number_max": "Must be at most {max}",
      "invalid_type": "Invalid type for field"
    }
  }
}
```

## 3. Zod Error Translations

Zod error messages are handled via a custom error map and are stored directly within the main `messages/{locale}.json` files under a top-level `zod` key.

-   **Error Map:** Implement a custom error map (e.g., in a utility file like `apps/codehouse/utils/zod-error-map.ts`) that uses `next-intl` to retrieve localized messages from the `zod` namespace. This function should handle `ZodIssueCode` cases and retrieve corresponding messages (e.g., `t('zod.errors.string_min')`).
-   **Direct Messages (Optional):** For highly specific error messages tied to a particular component, you can embed them directly in the Zod schema using `message: t('your_key')` from that component's specific namespace.

## 4. Synchronization Rules

-   **Adding:** Add translation keys to ALL locale files (e.g., `en.json` and `nl.json`), including new Zod error keys. Use "TODO: [key]" as a placeholder if the translation is not yet available.
-   **Modifying:** Update the key in ALL locale files, maintaining consistent formatting and meaning.
-   **Removing:** Remove the key from ALL locale files.

## 5. Navigation Functions

When using navigation functions (`Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`, or `permanentRedirect`), always use the custom implementation from your app's i18n navigation module instead of importing directly from `next-intl/navigation`.

These custom functions are lightweight wrappers around Next.js' navigation APIs that properly consider the routing configuration.

**Import Pattern:**
```typescript
// ❌ Don't import from next-intl/navigation
import { Link } from 'next-intl/navigation';

// ✅ Import from your app's i18n navigation
import { Link } from '@/src/i18n/navigation';
```

**Location:** These functions are typically defined in `apps/{app-name}/src/i18n/navigation.ts`.

## 6. Usage and Best Practices

-   **`useTranslations` Hook:** Use `useTranslations` from `next-intl` in components, providing the component name as the namespace (e.g., `useTranslations('ComponentName')`) or `zod` for Zod errors.
-   **Reference:** Access translations using dot notation (e.g., `t('ComponentName.title')` or `t('zod.errors.string_min')`).
-   **TypeScript:** Use TypeScript for type safety by defining message types in `global.d.ts` with the `IntlMessages` interface.
-   **Configuration:**
    -   Define supported locales in `i18n.config.ts`.
    -   Use `getRequestConfig` for loading messages, ensuring both main and Zod messages are loaded (e.g., in a `request.ts` file within your app's i18n configuration).

By adhering to these guidelines, you will ensure a consistent, maintainable, and internationalized application experience.