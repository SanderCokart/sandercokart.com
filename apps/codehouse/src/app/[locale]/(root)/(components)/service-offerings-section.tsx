import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import type { CSSProperties } from 'react';

import { SegmentLogo } from '@/components/segment-logo';

import { ServiceBand } from './service-band';
import { serviceOfferings } from './service-offerings';

import './service-offerings-section.css';

/**
 * Breakpoints:
 * - sm: Targets small screens (typically phones) and adjusts the container width and grid gap.
 * - xl: the section fills the fold under the header; the hero sits on top and the four offerings become
 *   borderless full-height columns underneath, their content centered. Below xl the cards stack and the section
 *   grows with content.
 *
 * Logo and title share one hero surface lit in the logo's own violet and emerald, so they read as a unit instead
 * of a mark floating over a colored title band. On mobile the hero fades into the first band and every band fades
 * out of the one above it, so the column has no hard edges.
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
        'sm:mt-8 sm:mb-16 xl:my-0',
        'min-h-[calc(100dvh-(--spacing(11)))] sm:min-h-[calc(100dvh-(--spacing(16)))]',
        'grid justify-items-center',
      )}
      style={{ '--band-first': serviceOfferings[0].accent } as CSSProperties}
      id="services">
      <div className="container w-full px-0 sm:max-w-(--breakpoint-sm) sm:px-4 xl:grid xl:max-w-none xl:grid-rows-[auto_1fr] xl:px-0">
        <header className="ch-hero flex flex-col items-center pt-2 pb-10 sm:pt-0 sm:pb-8 xl:pt-6 xl:pb-2">
          <SegmentLogo label="Sander's CodeHouse" className="mb-4 h-auto w-40 sm:w-32 xl:mb-2 xl:w-24" />
          <p
            className="ch-hero-tagline font-digital type-on type-on-caret text-primary dark:text-accent text-xl"
            style={{ '--chars': 13, '--type-delay': '0.55s' } as CSSProperties}>
            Let&apos;s code...
          </p>
          <h1 id="services-title" className="ch-hero-title mt-2 text-center text-5xl font-bold xl:mt-1 xl:text-4xl">
            {t('title')}
          </h1>
          <span aria-hidden className="ch-hero-rule mt-5 h-1 w-20 rounded-full xl:mt-3" />
        </header>
        <ul
          role="list"
          className="grid gap-0 sm:gap-8 xl:grid-cols-4 xl:grid-rows-[1fr_repeat(5,auto)_1fr] xl:gap-x-0 xl:gap-y-3">
          {serviceOfferings.map((offering, index) => (
            <ServiceBand
              key={offering.id}
              offering={offering}
              index={index}
              previousAccent={serviceOfferings[index - 1]?.accent}
              nextAccent={serviceOfferings[index + 1]?.accent}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
