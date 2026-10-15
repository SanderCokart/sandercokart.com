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
 * - xl: Four columns so the four offerings sit in a single row on desktop.
 *
 * Vertical placement (xl): a frozen top track centers the English-sized cluster
 * (logo + title + cards). Taller locale copy grows the auto track downward into
 * the leftover 1fr instead of shrinking the top track — so the heading does not
 * jump. `--services-cluster` is that English cluster height (~heading 15rem +
 * cards 36rem). Below xl the cards stack and the section just grows with content.
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
        'sm:mt-8 sm:mb-16 xl:mt-0',
        'min-h-[calc(100dvh-(--spacing(11)))] sm:min-h-[calc(100dvh-(--spacing(16)))]',
        'grid justify-items-center',
        '[--services-cluster:51rem]',
        'xl:grid-rows-[max(0px,calc((100dvh-(--spacing(16))-var(--services-cluster))/2))_auto_1fr]',
      )}
      style={{ '--band-first': serviceOfferings[0].accent } as CSSProperties}
      id="services">
      <div className="container w-full px-0 sm:max-w-(--breakpoint-sm) sm:px-4 xl:row-start-2 xl:max-w-[120rem]">
        <header className="ch-hero flex flex-col items-center pt-2 pb-10 sm:pt-0 sm:pb-8">
          <SegmentLogo label="Sander's CodeHouse" className="mb-6 h-auto w-40 sm:mb-6 sm:w-32" />
          <h1 id="services-title" className="ch-hero-title text-center text-5xl font-bold">
            {t('title')}
          </h1>
          <span aria-hidden className="ch-hero-rule mt-5 h-1 w-20 rounded-full" />
        </header>
        <ul role="list" className="grid gap-0 sm:gap-8 xl:grid-cols-4 xl:gap-y-4">
          {serviceOfferings.map((offering, index) => (
            <ServiceBand
              key={offering.id}
              offering={offering}
              index={index}
              previousAccent={serviceOfferings[index - 1]?.accent}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
