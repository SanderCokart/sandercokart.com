import { Button } from '@repo/ui/components/shadcn/button';
import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { CSSProperties } from 'react';
import type { ServiceOffering } from './service-offerings';

import { Link } from '@/i18n/navigation';
import { serviceHrefs } from '@/lib/nav-links';

type ServiceChapterProps = {
  offering: ServiceOffering;
  /** 1-based chapter number shown in the digital font. */
  number: number;
  /** Accent of the chapter above; this one's field starts in that color so the page never shows a seam. */
  previousAccent?: string;
};

export function chapterTimeline(offering: ServiceOffering) {
  return `--chapter-${offering.id}`;
}

/**
 * One offering as a chapter of a continuous colour field. On phones its number and title stick under the site
 * header while you read it and are pushed off by the next chapter; on desktop the sticky index on the left does
 * that job. The chapter exposes a named view timeline the index uses to light up the chapter you are reading.
 */
export function ServiceChapter({ offering, number, previousAccent }: ServiceChapterProps) {
  const t = useTranslations('ServiceOfferingsSection');
  const { icon: Icon } = offering;
  const titleId = `service-${offering.id}-title`;

  return (
    <li
      id={`service-${offering.id}`}
      aria-labelledby={titleId}
      className="ch-chapter relative scroll-mt-11 sm:scroll-mt-16 lg:grid lg:min-h-[70dvh] lg:content-center"
      style={
        {
          '--accent': offering.accent,
          '--accent-prev': previousAccent ?? 'transparent',
          '--timeline': chapterTimeline(offering),
        } as CSSProperties
      }>
      <div className="ch-chapter-head sticky top-11 z-10 flex items-baseline gap-4 px-6 py-4 sm:top-16 lg:static">
        <span aria-hidden className="ch-chapter-number font-digital text-4xl leading-none text-(--accent)">
          {String(number).padStart(2, '0')}
        </span>
        <h2 id={titleId} className="ch-chapter-title text-2xl font-bold sm:text-3xl">
          {t(offering.title)}
        </h2>
      </div>
      <Icon
        aria-hidden
        className="ch-chapter-mark pointer-events-none absolute top-16 right-3 size-28 text-(--accent) opacity-10 lg:top-10 lg:right-10 lg:size-40"
      />
      <div className="relative grid gap-6 px-6 pt-2 pb-16 lg:pb-8">
        <p className="ch-chapter-item max-w-prose text-xl leading-relaxed">{t(offering.description)}</p>
        <ul role="list" className="ch-chapter-item flex flex-wrap gap-2">
          {offering.features.map(feature => (
            <li
              key={feature}
              className="rounded-full border border-(--accent)/40 bg-(--accent)/10 px-3 py-1 text-sm leading-snug">
              {t(feature)}
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          size="lg"
          nativeButton={false}
          render={<Link href={serviceHrefs[offering.id]} aria-describedby={titleId} />}
          className={cn(
            'ch-chapter-item justify-self-start border-(--accent)/60 bg-transparent px-5 text-base font-semibold',
            'hover:bg-(--accent)/20 dark:bg-transparent dark:hover:bg-(--accent)/20',
          )}>
          {t('callToAction')}
          <span aria-hidden>→</span>
        </Button>
      </div>
    </li>
  );
}
