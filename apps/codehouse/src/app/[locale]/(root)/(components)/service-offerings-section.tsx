import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { CSSProperties, ReactNode } from 'react';
import type { ServiceId } from '@/lib/nav-links';

import { SegmentLogo } from '@/components/segment-logo';

import { ChapterIndex } from './chapter-index';
import { BlogPreview } from './previews/blog-preview';
import { DashboardPreview } from './previews/dashboard-preview';
import { FreelancePreview } from './previews/freelance-preview';
import { RepositoriesPreview } from './previews/repositories-preview';
import { ServiceChapter } from './service-chapter';
import { serviceOfferings } from './service-offerings';

import './service-offerings-section.css';

/** What each service looks like once built, shown beside its copy on desktop. */
const previews: Record<ServiceId, ReactNode> = {
  'consumer': <BlogPreview />,
  'commercial': <DashboardPreview />,
  'freelance': <FreelancePreview />,
  'open-source': <RepositoriesPreview />,
};

/**
 * Blend of "cohesive" and "colour field": chapters of one continuous surface, entering the way the cohesive bands
 * do (backgrounds stay put, content plays in with the intro or as it is reached).
 *
 * - Phones: the intro (logo, slogan, title, chapter index) fills the visible fold, then chapters with sticky
 *   numbered titles.
 * - lg+: split view. The intro and index stay pinned on the left and the index takes the color of the chapter in
 *   view; each chapter fills a screen with its copy and a preview of what that service builds.
 *
 * Animation is CSS only (service-offerings-section.css, segment-logo.css); the server HTML is the final layout.
 */
export function ServiceOfferingsSection() {
  const t = useTranslations('ServiceOfferingsSection');

  return (
    <section aria-labelledby="services-title" id="services" className="ch-field">
      <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12 lg:px-8">
        <header
          className={cn(
            'ch-intro flex flex-col items-center justify-center gap-5 px-6 py-8 text-center',
            // Below lg the intro owns the visible fold: viewport minus the site header and the fixed bottom nav.
            'min-h-[calc(100dvh-(--spacing(11))-(--spacing(14)))] sm:min-h-[calc(100dvh-(--spacing(16))-(--spacing(14)))]',
            'lg:sticky lg:top-16 lg:h-[calc(100dvh-(--spacing(16)))] lg:min-h-0 lg:items-start lg:px-0 lg:py-0 lg:text-left',
          )}>
          <span className="sc-logo-glow">
            <SegmentLogo label="Sander's CodeHouse" className="h-auto w-36 sm:w-40" />
          </span>
          <p
            className="font-digital type-on type-on-caret text-primary dark:text-accent text-xl"
            style={{ '--chars': 13, '--type-delay': '0.55s' } as CSSProperties}>
            Let&apos;s code...
          </p>
          <h1 id="services-title" className="ch-intro-title -mt-2 text-5xl font-bold lg:text-7xl">
            {t('title')}
          </h1>
          <ChapterIndex
            labelledBy="services-title"
            entries={serviceOfferings.map(offering => ({
              target: `service-${offering.id}`,
              accent: offering.accent,
              title: t(offering.title),
            }))}
          />
          <p className="text-muted-foreground hidden text-sm lg:block">
            {t.rich('keyboard_hint', {
              key: chunks => (
                <kbd className="border-border bg-muted/60 rounded border px-1.5 font-mono text-xs">{chunks}</kbd>
              ),
            })}
          </p>
        </header>
        <ol role="list" className="ch-chapters">
          {serviceOfferings.map((offering, index) => (
            <ServiceChapter
              key={offering.id}
              offering={offering}
              index={index}
              previousAccent={serviceOfferings[index - 1]?.accent}
              preview={previews[offering.id]}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
