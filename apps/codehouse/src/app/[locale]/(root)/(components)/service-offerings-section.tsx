import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { CSSProperties } from 'react';

import { SegmentLogo } from '@/components/segment-logo';

import { ServiceBand } from './service-band';
import { serviceOfferings } from './service-offerings';

import './service-offerings-section.css';

/** `--c1`…`--c4`: the four accents, read by the section-wide gradient on desktop. */
const accents = Object.fromEntries(serviceOfferings.map((offering, index) => [`--c${index + 1}`, offering.accent]));

/**
 * "Cohesive": one surface for the logo, the title and the four offerings.
 *
 * - Phones and tablets (below lg): the hero, then full-bleed bands that flow into each other.
 * - lg: a 2×2 grid on one continuous surface, the hero above it.
 * - 2xl: the section fills the fold under the header. Four full-height columns sit on a single gradient that runs
 *   from the first accent to the last; the hero is laid over the top, centered between the middle two columns,
 *   and the columns' content starts below it.
 *
 * Animation is CSS only (service-offerings-section.css, segment-logo.css): the server HTML is the final layout,
 * nothing waits on hydration, and painted surfaces never move — only the content on top of them.
 */
export function ServiceOfferingsSection() {
  const t = useTranslations('ServiceOfferingsSection');

  return (
    <section
      aria-labelledby="services-title"
      className={cn(
        'ch-services relative grid',
        'min-h-[calc(100dvh-(--spacing(11)))] sm:min-h-[calc(100dvh-(--spacing(16)))]',
        'lg:grid-rows-[auto_1fr] 2xl:grid-rows-1',
      )}
      style={{ ...accents, '--band-first': serviceOfferings[0].accent } as CSSProperties}
      id="services">
      <header
        className={cn(
          'ch-hero flex flex-col items-center pt-2 pb-10 sm:pt-6',
          'lg:pt-10 lg:pb-4',
          '2xl:absolute 2xl:top-0 2xl:left-1/2 2xl:z-10 2xl:-translate-x-1/2 2xl:px-16 2xl:pt-8',
        )}>
        <span className="sc-logo-glow mb-4 2xl:mb-2">
          <SegmentLogo label="Sander's CodeHouse" className="h-auto w-40 sm:w-32 2xl:w-28" />
        </span>
        <p
          className="ch-hero-tagline font-digital type-on type-on-caret text-primary dark:text-accent text-xl"
          style={{ '--chars': 13, '--type-delay': '0.55s' } as CSSProperties}>
          Let&apos;s code...
        </p>
        <h1 id="services-title" className="ch-hero-title mt-2 text-center text-5xl font-bold 2xl:mt-1">
          {t('title')}
        </h1>
      </header>
      <ul
        role="list"
        className={cn(
          'ch-band-list grid',
          'lg:grid-cols-2',
          '2xl:grid-cols-4 2xl:grid-rows-[var(--hero-space)_1fr_repeat(5,auto)_1fr] 2xl:gap-y-3',
        )}>
        {serviceOfferings.map((offering, index) => (
          <ServiceBand
            key={offering.id}
            offering={offering}
            index={index}
            previousAccent={serviceOfferings[index - 1]?.accent}
          />
        ))}
      </ul>
    </section>
  );
}
