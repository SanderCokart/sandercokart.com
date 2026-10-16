'use client';

import { useEffect, useState } from 'react';

import type { CSSProperties } from 'react';

export type ChapterIndexEntry = {
  /** Id of the chapter element this entry links to and tracks. */
  target: string;
  accent: string;
  title: string;
};

type ChapterIndexProps = {
  entries: ChapterIndexEntry[];
  labelledBy: string;
};

/** Read by the header's ScrollProgressIndicator; falls back to the theme accent wherever it is not set. */
const PROGRESS_COLOR = '--scroll-progress';

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  );
}

/**
 * Numbered links to the chapters, plus what the numbers promise:
 * - The entry for the chapter crossing the middle of the viewport takes that chapter's accent, and so does the
 *   header's scroll progress bar while this page is mounted. Tracked with an IntersectionObserver.
 * - Pressing 1–4 (no modifiers, not while typing) scrolls to that chapter and moves focus to it.
 */
export function ChapterIndex({ entries, labelledBy }: ChapterIndexProps) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      records => {
        const crossing = records.filter(record => record.isIntersecting);
        if (crossing.length) setCurrent(crossing[crossing.length - 1]!.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );

    for (const { target } of entries) {
      const element = document.getElementById(target);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [entries]);

  useEffect(() => {
    const accent = entries.find(entry => entry.target === current)?.accent;
    const root = document.documentElement.style;

    if (accent) root.setProperty(PROGRESS_COLOR, accent);
    else root.removeProperty(PROGRESS_COLOR);
  }, [current, entries]);

  useEffect(
    () => () => {
      document.documentElement.style.removeProperty(PROGRESS_COLOR);
    },
    [],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || isTyping(event.target)) return;

      const entry = entries[Number(event.key) - 1];
      const chapter = entry && document.getElementById(entry.target);
      if (!chapter) return;

      event.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      chapter.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      chapter.focus({ preventScroll: true });
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entries]);

  return (
    <nav aria-labelledby={labelledBy}>
      <ol className="font-digital 3xl:gap-3 3xl:text-3xl grid gap-1 text-lg 2xl:gap-2 2xl:text-2xl">
        {entries.map((entry, index) => (
          <li key={entry.target} className="ch-index-item" style={{ '--item': index } as CSSProperties}>
            <a
              href={`#${entry.target}`}
              aria-current={entry.target === current || undefined}
              aria-keyshortcuts={String(index + 1)}
              className="ch-index-link flex items-baseline gap-3 rounded-md px-2 py-1"
              style={{ '--accent': entry.accent } as CSSProperties}>
              <span className="ch-index-number">{String(index + 1).padStart(2, '0')}</span>
              {entry.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
