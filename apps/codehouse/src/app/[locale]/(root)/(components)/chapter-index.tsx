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

/**
 * Numbered links to the chapters. The entry for the chapter crossing the middle of the viewport takes that
 * chapter's accent, so the pinned index on desktop always says what you are reading. Tracked with an
 * IntersectionObserver (works everywhere, unlike named scroll timelines across the tree).
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

  return (
    <nav aria-labelledby={labelledBy}>
      <ol className="font-digital grid gap-1 text-lg">
        {entries.map((entry, index) => (
          <li key={entry.target} className="ch-index-item" style={{ '--item': index } as CSSProperties}>
            <a
              href={`#${entry.target}`}
              aria-current={entry.target === current || undefined}
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
