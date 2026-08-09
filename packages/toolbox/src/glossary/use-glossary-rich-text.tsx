'use client';

import { useMessages } from 'next-intl';

import { ReactNode, useMemo } from 'react';

import { GlossaryTerm } from './glossary-term';

type UseGlossaryRichTextOptions = {
  /** Tailwind classes applied to both `highlight` and glossary term triggers. */
  highlightClassName?: string;
  /** Translation namespace for `{term}_description` keys. Defaults to `Glossary`. */
  glossaryNamespace?: string;
};

function glossaryTermsFromMessages(glossary: Record<string, string> | undefined): string[] {
  if (!glossary) {
    return [];
  }

  return Object.keys(glossary)
    .filter(key => key.endsWith('_description'))
    .map(key => key.slice(0, -'_description'.length));
}

/**
 * Returns `t.rich()` handlers for `<highlight>` and auto-discovered glossary tags.
 *
 * @see `.cursor/skills/docs/glossary.md` - plug-and-play setup and examples
 */
export function useGlossaryRichText({
  highlightClassName = 'text-primary dark:text-accent',
  glossaryNamespace = 'Glossary',
}: UseGlossaryRichTextOptions = {}) {
  const messages = useMessages();
  const glossary = messages[glossaryNamespace] as Record<string, string> | undefined;

  const terms = useMemo(() => glossaryTermsFromMessages(glossary), [glossary]);

  return useMemo(() => {
    const glossaryTags = Object.fromEntries(
      terms.map(term => [
        term,
        (chunks: ReactNode) => (
          <GlossaryTerm term={term} className={highlightClassName} namespace={glossaryNamespace}>
            {chunks}
          </GlossaryTerm>
        ),
      ]),
    );

    return {
      highlight: (chunks: ReactNode) => <strong className={highlightClassName}>{chunks}</strong>,
      ...glossaryTags,
    };
  }, [terms, highlightClassName, glossaryNamespace]);
}
