import { useTranslations } from 'next-intl';

import type { CSSProperties, ReactNode } from 'react';
import type { ServiceOffering } from './service-offerings';

import { SellingPoints } from '@/components/selling-points';
import { ServiceCta } from '@/components/service-cta';

import { serviceHrefs } from '@/lib/nav-links';

type ServiceChapterProps = {
  offering: ServiceOffering;
  /** 0-based position; drives the number and the load cascade. */
  index: number;
  /** Accent of the chapter above; this one's field starts in that color so the page never shows a seam. */
  previousAccent?: string;
  /** Illustration of what this service produces, between the selling points and the call to action. */
  preview: ReactNode;
};

function item(index: number): CSSProperties {
  return { '--item': index } as CSSProperties;
}

/**
 * One offering as a chapter of the home services. On phones its number and title stick under the site header while
 * you read it; on desktop the pinned index does that and the chapter fills a screen. At every width a preview of the
 * kind of thing this service builds sits between the selling points and the call to action; it is not selectable.
 * Every row is a `.ch-chapter-item` so it can enter on its own.
 */
export function ServiceChapter({ offering, index, previousAccent, preview }: ServiceChapterProps) {
  const t = useTranslations('ServiceOfferingsSection');
  const titleId = `service-${offering.id}-title`;

  return (
    <li
      id={`service-${offering.id}`}
      aria-labelledby={titleId}
      tabIndex={-1}
      className="ch-chapter relative scroll-mt-11 outline-none sm:scroll-mt-16 md:grid md:min-h-[calc(100dvh-(--spacing(16))-(--spacing(14)))] md:grid-rows-[auto_1fr] lg:min-h-[calc(100dvh-(--spacing(16)))] lg:grid-rows-none lg:content-center lg:gap-8 lg:py-10"
      style={
        {
          '--accent': offering.accent,
          '--accent-prev': previousAccent ?? 'transparent',
          '--column': index,
        } as CSSProperties
      }>
      <div className="ch-chapter-head sticky top-11 z-10 flex items-baseline gap-4 px-6 py-4 sm:top-16 lg:static lg:py-0">
        <span
          aria-hidden
          className="ch-chapter-item font-digital text-4xl leading-none text-(--accent-ink)"
          style={item(0)}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 id={titleId} className="ch-chapter-item text-2xl font-bold sm:text-3xl" style={item(1)}>
          {t(offering.title)}
        </h2>
      </div>
      <div className="ch-chapter-body grid gap-6 px-6 pt-2 pb-16 md:content-center md:py-10 lg:pt-0 lg:pb-0">
        <p className="ch-chapter-item max-w-prose text-xl leading-relaxed" style={item(2)}>
          {t(offering.description)}
        </p>
        <SellingPoints
          className="ch-chapter-item"
          style={item(3)}
          points={offering.features.map(feature => t(feature))}
        />
        <div className="ch-chapter-item select-none" style={item(4)}>
          {preview}
        </div>
        <div className="ch-chapter-item" style={item(5)}>
          <ServiceCta
            href={serviceHrefs[offering.id]}
            aria-describedby={titleId}
            accent={offering.accent}
            label={t('callToAction')}
          />
        </div>
      </div>
    </li>
  );
}
