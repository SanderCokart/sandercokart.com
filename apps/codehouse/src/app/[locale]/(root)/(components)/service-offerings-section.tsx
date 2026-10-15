import { useTranslations } from 'next-intl';

import type { CSSProperties } from 'react';

import { SegmentLogo } from '@/components/segment-logo';

import { ChapterIndex } from './chapter-index';
import { ServiceChapter } from './service-chapter';
import { serviceOfferings } from './service-offerings';

import './service-offerings-section.css';

/**
 * "Colour field": the services read as chapters of one continuous surface instead of four cards. There are no
 * card edges; the tint just shifts from one chapter's accent to the next as you scroll.
 *
 * - Phones: intro (logo, title, chapter index) then the chapters, each with a sticky numbered title.
 * - lg+: split view. The intro and index stay pinned on the left; the index entry for the chapter in view takes
 *   that chapter's color (ChapterIndex).
 *
 * Animation is CSS only (service-offerings-section.css, segment-logo.css). The server HTML is the final layout;
 * chapter content follows its own scroll position, so nothing plays off-screen.
 */
export function ServiceOfferingsSection() {
  const t = useTranslations('ServiceOfferingsSection');

  return (
    <section aria-labelledby="services-title" id="services" className="ch-field">
      <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:px-8">
        <header className="ch-intro flex flex-col items-center gap-6 px-6 pt-8 pb-12 text-center lg:sticky lg:top-16 lg:h-[calc(100dvh-(--spacing(16)))] lg:items-start lg:justify-center lg:px-0 lg:text-left">
          <SegmentLogo label="Sander's CodeHouse" className="h-auto w-36 sm:w-40" />
          <h1 id="services-title" className="ch-intro-title text-5xl font-bold lg:text-7xl">
            <span className="block">{t('title')}</span>
          </h1>
          <p
            className="font-digital type-on type-on-caret text-primary dark:text-accent -mt-3 text-xl"
            style={{ '--chars': 13, '--type-delay': '0.8s' } as CSSProperties}>
            Let&apos;s code...
          </p>
          <ChapterIndex
            labelledBy="services-title"
            entries={serviceOfferings.map(offering => ({
              target: `service-${offering.id}`,
              accent: offering.accent,
              title: t(offering.title),
            }))}
          />
        </header>
        <ol role="list" className="ch-chapters lg:py-16">
          {serviceOfferings.map((offering, index) => (
            <ServiceChapter
              key={offering.id}
              offering={offering}
              number={index + 1}
              previousAccent={serviceOfferings[index - 1]?.accent}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
