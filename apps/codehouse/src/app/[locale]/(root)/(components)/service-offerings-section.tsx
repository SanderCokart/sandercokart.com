import { cn } from '@repo/ui/lib/utils';
import { useTranslations } from 'next-intl';

import Image from 'next/image';

import logoMark from '@/app/[locale]/images/sc-logo.png';

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
 * Animation is CSS only (service-offerings-section.css): the server HTML is the final layout, nothing waits on
 * hydration, and painted surfaces never move — only the content on top of them.
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
      id="services">
      <div className="container w-full px-0 sm:max-w-(--breakpoint-sm) sm:px-4 xl:row-start-2 xl:max-w-[120rem]">
        <header className="flex flex-col items-center">
          <Image
            priority
            alt="Sander's CodeHouse"
            src={logoMark}
            className="ch-services-logo mx-auto mb-4 h-auto max-w-44 sm:mb-8 sm:max-w-32"
          />
          <h1
            id="services-title"
            className={cn(
              'ch-services-heading text-center text-5xl font-bold sm:mb-8',
              '[--band:var(--color-green-500)] max-sm:w-full max-sm:py-8',
            )}>
            <span className="ch-services-title block">{t('title')}</span>
          </h1>
        </header>
        <ul role="list" className="grid gap-0 sm:gap-8 xl:grid-cols-4 xl:gap-y-4">
          {serviceOfferings.map((offering, index) => (
            <ServiceBand key={offering.id} offering={offering} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
